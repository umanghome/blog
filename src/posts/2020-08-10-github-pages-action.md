---
layout: post
title:  "Using GitHub Actions to build GitHub Pages"
date:   2020-08-10 15:00:00
categories: [software]
comments: true
keywords: [github, pages, actions, build, gh-pages]
excerpt: Use GitHub Actions to generate builds for GitHub Pages
---

I like [GitHub Pages](https://pages.github.com/) a lot. For someone who does not have a file server, GitHub Pages is godsend. If you don't know what GitHub Pages is — you put some static files in your repository and GitHub will serve them for you. Works great for shipping websites. GitHub Pages gives you HTTPS out-of-the-box too, so that's one less thing to worry about.

Every time you create a new repository and [set up GitHub Pages](https://docs.github.com/en/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) for it, you get a URL that is of the format `https://{username}.github.io/{repository}`. I like this a lot because it ties my repository and username together. You can also set up a custom domain and have things hosted at `https://{yourdomain}/{repository}` - all without needing a file server. Neat.

At the time of this writing, there is one constraint on setting up GitHub Pages: You can only serve files from the root directory (`/`) or a `/docs` directory. Which is a bummer if you use a library to generate your static files, your build typically lives in a `/build` or `/public` directory.

You can, however, tell GitHub Pages to pick files from a specific branch. You can leverage this and possibly put your build in a branch named `gh-pages` or `build` in the root directory. Then configure your repository to use that branch as the source for the GitHub page, and you're set. If you do this manually, the steps kind of look like this:
1. `npm run build`
1. `cd build`
1. `git init`
1. `git remote add origin https://github.com/{username}/{repository}.git`
1. `git checkout build`
1. `git add .`
1. `git commit -m {message}`
1. `git push origin build`

That's ... quite a bit.

## What about Vercel/Netlify/X?

These services let you set up something similar. Most of the times you won't even need to add a configuration to your repo. Click some buttons on their website, and you will have a working URL where your project is hosted. You might even get preview builds for all of your branches as an added bonus, which is pretty useful.

But I, personally, do not prefer to go use a third-party service to do this for me if GitHub does the job just fine. If I need preview builds or if I need something that's not just serving static files, I might use one of these services. For most projects, though, GitHub Pages serves the purpose.

## GitHub Actions

[GitHub Actions](https://github.com/features/actions) lets you add workflows to your project/repository. In simpler terms, you can trigger _actions_ on events. An example would be "when something is pushed to the `master` branch, generate a build and push it to a `build` branch" - which is exactly what we are trying to do. You can create complex workflows too, but let's just talk about what we need right now.

## Generate and serve assets for GitHub Pages using GitHub Actions

If you use a [create-react-app](https://github.com/facebook/create-react-app) template, a [Svelte template](https://github.com/sveltejs/template), or any template in your framework/library of choice, you probably have a `build` command. This command generates the static assets for your: HTML, CSS, JavaScript, images, etc. The generated assets are placed in a folder: `/public`, `/build`, or whatever. You want to serve this directory using GitHub pages. Your choices are:
1. Make sure your build is in the `/docs` directory. This will need some changes in the build process and is completely doable. You can then use the `master` branch as your GitHub Pages branch.
1. Make sure your build is in the root (`/`) directory. This will need changes in the build process too. And it makes the root directory very cluttered. Would not recommend.
1. Have another branch (for example, `build`) that contains the assets in the root directory. Use the `build` branch as your GitHub Pages branch.

I like the last option a lot. It keeps my `master` branch clean. I don't have to use a `/docs` directory, whose name is misleading because it does not necessarily contain my project's documentation.

GitHub Actions is the perfect way to automate this. We can create a workflow that, on every push to `master`, runs a command to generate a build and then pushes files from the build directory to another branch. The workflow looks like this and lives in the **`.github/workflows/publish.yml`** file:

<script src="https://gist.github.com/umanghome/30527c68cd605dfef8702a832ff14fd5.js"></script>

Let's take a closer view at some relevant parts:

```yml
on:
  push:
    branches:
      - master
```

This bit tells GitHub Actions to run this workflow when something is pushed to the `master` branch.

```yml
jobs:
  build:
    runs-on: ubuntu-latest
    name: Build and Push
```

This bit specifies the `build` job that we are defining. It will run on an Ubuntu OS. There are more options available [in the docs](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idruns-on) - you can pick something else if your project requires it.

```yml
steps:
  - name: git-checkout
    uses: actions/checkout@v2

  - name: Install all dependencies
    run: npm install

  - name: Build
    run: npm run build # The build command of your project
```

These steps do the following things, in order: Checkout your repo+branch, run `npm install`, and then run `npm run build`. If your build command is something else, make sure you modify the line.

```yml
- name: Push
  uses: s0/git-publish-subdir-action@develop
  env:
    REPO: self
    BRANCH: build # The directory where your assets are generated
    FOLDER: build # The branch name where you want to push the assets
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} # GitHub will automatically add this - you don't need to bother getting a token
    MESSAGE: "Build: ({sha}) {msg}" # The commit message
```

This step is interesting. We are using another action: [s0/git-publish-subdir-action](https://github.com/s0/git-publish-subdir-action). This action pushes the directory we specify to a branch we specify. In this case, it pushes the `build` directory to the `build` branch. It's worthwhile looking at the documentation of this action to understand the other configuration options it provides.

That's it. Once this workflow is active (which it will be as soon as you push the `publish.yml` file), all pushes to `master` will lead to their corresponding builds to be pushed to the `build` branch. You can configure your repository to pick the `build` branch's root (`/`) directory as the source of your GitHub Pages.

I'm going to start using it in most projects I make that output static files.