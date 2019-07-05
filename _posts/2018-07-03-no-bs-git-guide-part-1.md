---
layout: post
title:  "The no-bullshit guide to getting started with Git: Part 1"
date:   2018-06-16 00:00:00
categories: [technology, software]
comments: true
keywords: [git, guide, simple, no, bullshit]
---
Learning Git has a little bit of a steep learning curve. But it does not have to be this difficult. Here's a no-bullshit guide to getting started with Git.

<!--more-->

When I was getting my hands dirty with Git back in college, there were very limited guides and all of them were _extremely_ technical and not very dummy-friendly. Then, guides to Git for dummies started to pop up, but they were full of extra BS that served no purpose except to confuse the reader. Here's my attempt at making a guide that my past self would have vastly benefitted from.

Let's get started.

### What is git?

[git-scm.com](https://git-scm.com/) has the following definition:

> Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.

Let's remove all the extra jargon and simplify the definition a bit.

> Git is a free and open-source version control system.

### Okay, but what is a Version Control System?

Good question. Let's figure out what a version control system really means.

Version Control System (VCS for short) has two different meanings. One is what VCSes are on a human-level, and the other is what VCSes mean in the Software Industry. We'll start by understanding what a VCS means on a human-level.

Each of us has some sort of an intuitive version management system, which follows something along the lines of having different copies of the same project, each with different (and mostly incremental) changes. It looks something like this.

!["Version Control on a human level"]({{ site.url }}/img/git-guide/human-vcs.png "Version Control on a human level")

A version management system like this works, but it starts showing some inherent problems when you are working with multiple people on the same project.

- What changes does `Final 2` contain? Why were the changes made? When were they made? Who made them? Alice made some changes and named them `Final 2`. So did Bob. Whose `Final 2` do we consider?
- Bob wants to make some changes on top of Alice's `final june 2018`. So, Alice sent Bob the entire directory `final june 2018`. Oops, Bob just realized that the changes Alice made weren't up to the specifications and are completely wrong. He decides to discard the last changes Alice made and make his own changes to fix the project. He goes to Alice.
!["Problems with the Intuitive VCS"]({{ site.url }}/img/git-guide/comics/comic-1.png "Problems with the Intuitive VCS")

Let's try to fix these problems.

- Instead of names like `final`, `Final 2`, etc., we can instead use numbers. Or timestamps. Or anything that's a unique identifier. Let's go with numbers.
- We can keep a `CHANGES.txt` within each copy of the project, where the author of the changes in that copy will describe all the changes made within that copy along with the reasoning for it.
- We can also keep a master `LOG.txt` file which contains the time when a copy was published, who made the copy, and the logical order of copies.

These fixes sound pretty trivial and should easily fix our problems, but anyone who has tried to enforce standards on a bunch of human entities knows this is close to impossible to achieve across teams, let alone across the industry. Nevertheless, we just devised our own version control system.

Now that we understand what a version control system is and why we need it, let's answer the next question.

### Why Git?

There are lots of version control systems out there. A simple [Google search](https://www.google.com/search?q=version+control+systems) lists more than ten version control systems. To add to it, why not use the version control system we just devised? Why would someone want to use Git over everything else?

!["Version Control Systems from Google Search"]({{ site.url }}/img/git-guide/vcs-list.png "Version Control Systems from Google Search")

There's a long answer too, but I'm going to go with the shorter one: Git is everywhere. Chances are, if you work at any of the startups spawned within the last three to five years, you will end up using Git. And GitHub is a pretty popular place to host source code of open source projects as well as a great way to showcase your programming prowess.

_Wait, are Git and GitHub different?_

Yes. Git is a protocol - a VCS. GitHub is where you can store the project. A good (although a _tiny_ bit flawed) analogy can be seen in the difference between Pizza and Pizza places like Dominos and Pizza Hut. Food = VCS, Pizza = Git, Dominos = GitHub.

There are alternatives to GitHub too, like GitLab and BitBucket. They too use Git as the protocol. However, for the rest of the guide, I will be using GitHub as the example while talking about Git hosting providers.

### Let's go over some terms.

##### What is a repository?

A repository is a project in terms of Git. If you were building Uber, the entire project could be one repository, say `uber`. Or, if you decide to separate different parts of the project into their own sub-projects, you could come up with multiple repositories like `uber-backend`, `uber-android`, `uber-ios`, `uber-web`.

"repo" is an alias for "repository".

##### What is a repository URL?

A Git project exists at a certain URL. Think of this URL as the copy of the project that is the source-of-truth. All the changes you make get saved here, and all the changes that someone else made that you want to incorporate into your own copy will be fetched from here.

Let us consider this repository: [https://github.com/github/explore](https://github.com/github/explore). If you click on the green "Clone or Download" button, you will see a URL for the repo.

!["Repository URL"]({{ site.url }}/img/git-guide/repo-url.png "Repository URL")

You might see any of the following two URLS:
- [`git@github.com:github/explore.git`](git@github.com:github/explore.git)
- [`https://github.com/github/explore.git`](https://github.com/github/explore.git)

The first is the SSH URL, while the second is the HTTPS URL. The text that says "Use SSH" and "Use HTTPS" can be used to switch between the two.

##### What are the differences between HTTPS URL and SSH URL?

This answer requires you to be familiar with SSH. If you are not, consider SSH to be a proof-of-identity that says, "Hey, this device belongs to John." There is an SSH key I can set up on my computer and tell GitHub that for any requests that have this key, assume the user to be me. That SSH key then becomes a way to identify my computer.

Repos can be fetched over HTTPS as well as SSH. Fetching changes from a public repository doesn't require your identity, but adding changes to the repository does. The repository needs to know which user intends to save the user. Fetching changes from a private repository requries your identity, though, due to access-control.

If you use SSH, your SSH key acts as the identifier. If you use HTTPS, you will need to use your email and password to identify yourself.

I personally prefer using SSH because I don't need to enter my email and password every time I need to identify myself, the SSH key handles it automatically. However, SSH requires a setup. If you are just starting out, I would recommend you use HTTPS.

To fetch a repository, you would need to use the following command:

`git clone <repo-url>`

For the example above, one would use `git clone https://github.com/github/explore.git`. This would make a directory named `explore` containing the contents of the repository.

This is also known as "cloning" a repository.

### Exercises for the reader

* Set up Git.
* Clone 3 repositories.

### What's coming in the next parts

- What are diffs?
- What is staging?
- What are commits?
- What are branches?
- What is a merge?
- What are merge conflicts?
- How does one fix merge conflicts?
- What is a pull request?
- Commonly used patterns for Git.

If there's something that you would like to add to this list, please leave a comment and if it is beginner friendly, I will make sure to add it to the upcoming parts.

If there is something in this part that you feel could be explained in simpler terms, please let me know and I shall update this.