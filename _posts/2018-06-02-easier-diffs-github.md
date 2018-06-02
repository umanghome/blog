---
layout: post
title:  "Making viewing diffs on GitHub a bit better"
date:   2018-06-02 00:00:00
categories: [technology, software, product]
comments: true
---
Viewing large diffs on GitHub is a bit of a pain in the ass. I made a Chrome extension to make it slightly better.

<!--more-->

If you spend quite some time comparing commits or branches or just reviewing large PRs in general, you might have noticed your browser taking a performance hit while you are in GitHub's compare view and there are just a bit too many files in the diff. Folding some files helps, but that's a lot of manual effort. Let's automate it.

There are exactly two reasons why I prefer files to be folded:

1. My browser doesn't take a performance it.
2. If there is only one file open, I know I have looked at all the files above it and need to look at all the files below it. _Kind of like a bookmark, maybe?_

I messed around with DevTools a bit and wrote some JS that I can execute in the console to fold all the files, but then I had to press the up arrow key multiple times to reach the command, or if it's been a long time, look for it wherever I had stored it. Again, too much effort to do something trivial.

I got a little annoyed and decided it shouldn't be this difficult and time consuming. So, I spent some time building a [Chrome extension](https://chrome.google.com/webstore/detail/fold-github-files/gihbbindmbgaabmockjcmlghaphecage) to do this. _Ironic, I know._

<img src="{{ site.url }}/img/fold-github-files-interface.png" alt="Fold GitHub Files" style="margin-left: 0; margin-right: 0;">

It's a simple enough tool that does something _extremely_ trivial that GitHub should support by default. Until they do, this Chrome Extension will have to do. Download it from [here](https://chrome.google.com/webstore/detail/fold-github-files/gihbbindmbgaabmockjcmlghaphecage), and view the [source code on GitHub](https://github.com/umanghome/fold-unfold-github/).

<img src="https://media.giphy.com/media/2UBzh5JhVEKyNRaMml/giphy.gif" alt="Fold GitHub Files in action" style="margin-left: 0; margin-right: 0;">

Here's to making using the web better.