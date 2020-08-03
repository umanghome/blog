---
layout: post
title:  "A love letter to Svelte"
date:   2019-08-05 19:00:00
categories: [software, javascript]
comments: true
keywords: [javascript, svelte]
excerpt: An appreciation post for [Svelte](https://svelte.dev).
---

I started writing HTML about fourteen years ago. Just plain, old HTML. Then about six years ago, I learned CSS and found the web to be a really, really cool platform to build things upon. I learned JavaScript and PHP and all that jazz and built [Picture Band](https://pictureband.co). Picture Band's frontend had a lot JavaScript, and all of it was jQuery.

Then I met with someone who wanted to discuss about Picture Band, and they recommended I port Picture Band to a mobile app using Cordova and React. "React"? I'd read that word a lot on the Internet but I was so intimidated from the hype around it that I never really felt comfortable learning it.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Friendly reminder that the quickest way to learn something is to just get started.<br><br>Three and a half years ago, I was so intimidated by the hype around Node.js and React.js that it prevented me from exploring them.</p>&mdash; Umang Galaiya (@umanghome) <a href="https://twitter.com/umanghome/status/966211981064769538?ref_src=twsrc%5Etfw">February 21, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

But I eventually did. And I fell in love. It was just *so* damn easy to build things with React. And fun too. It was a total game-changer at the time. It wouldn't be a stretch if someone thought I got into writing frontend apps just because of React. Over the next couple of years, I had built a lot of shit with React. And it was fun.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I will forever be grateful to <a href="https://twitter.com/facebook?ref_src=twsrc%5Etfw">@facebook</a> for giving the world React and React Native.</p>&mdash; Umang Galaiya (@umanghome) <a href="https://twitter.com/umanghome/status/658658179660668928?ref_src=twsrc%5Etfw">October 26, 2015</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

About a year ago, our team at [Razorpay](https://razorpay.com) decided we were going to write all new apps in [Svelte](https://svelte.dev). Svelte is built by Rich Harris, who has also written [rollup.js](https://rollupjs.org) (our bundler of choice at Razorpay). I didn't have any strong feelings about the decision.

> Svelte is a framework for building frontend apps. It compiles everything down to native DOM calls at build-time.

Svelte was at [v2](https://v2.svelte.dev) when we started using it. It felt a lot like React. `setState` became `set`, and a lot of APIs looked kinda similar with some changes sprinkled here and there.

I kinda started liking Svelte more and more as we kept using it. OVer a couple of weeks, I had completely stopped writing React and would prefer writing Vanilla or Svelte. But it wasn't _love_ yet. But I was impressed with Svelte. So much that I'd decided I was going to talk about it at [JSFoo 2019](https://hasgeek.com/jsfoo/2019/). I started preparing a proposal built on Svelte v2. I knew v3 was in the works and had read a couple RFCs, but I didn't think it would be released exactly a day after I had finished preparing my proposal based on Svelte v2. Had to scrap the proposal, go through v3 docs and tutorial, and rebuild everything from scratch. Wasn't bad.

v3 looked really cool with reactivity being it's core idea. We thought about upgrading one of our apps to v3. There's this really cool thing called [svelte-upgrade](https://github.com/sveltejs/svelte-upgrade) that converts v2 templates to v3 and saves a lot of effort. We decided not to go ahead with the upgrade and stuck to v2. All good.

Then, this weekend, Razorpay had an internal Hackathon where my team and I decided to build something that would let your phone and computer talk to each other for Payments. This needed a UI, both on the phone and on the computer. I don't really know how to build UIs in Android and decided to use a WebView instead. We forked the Svelte v3 [template](https://github.com/sveltejs/template) and got around to building the UI. This was the first time I was building something full-fledged with Svelte v3. Everything else I'd written with v3 were just things I was trying out in the framework.

By the end of the Hackathon, we had built a UI that looked production-grade. Transitions and all that jazz. And never once during the time did I feel I had to wrestle with Svelte. Things fell right into place, and so beautifully at that! This is when I fell in love with Svelte. It's the same exact feeling I had when I had fallen in love with React after using jQuery for years.

v3 has some quirks, especially if you're coming from v2, but they're okay and never felt like deal-breakers. It's a relatively new framework and I'm sure it's going to be a lot better once it matures. But even at this point in time, when v3 is less than six months old, writing Svelte feels like a breeze.

I would never consider myself a transitions guy. I suck at writing animations. I make do with `transform`s and `transition`s. But Svelte's baked-in support for transitions enabled me to create something that looks like this, and performs without a glitch.

<iframe width="560" height="315" src="https://www.youtube.com/embed/0TMNf-2ubD0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/qH2Hk8V5RL4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Things in Svelte are reactive by default. No more invoking `setState` or `set` every time you need to change something. Reassign the variable and watch things _react_.

I love computed props and how you never have to worry about updating props that depend on other props. Everything takes care of itself.

I love scoped CSS.

I love how writing Svelte templates feels just like writing plain, old HTML.

I'd gone through the [Sapper](https://sapper.svelte.dev/) docs a couple of days ago, and even that felt well-thought, easy to get started with. Much easier than fighting with react-router and watching the API change every six months.

If you've never given Svelte a try, now is the time. It won't solve all your problems, maybe your app would be better off written in React/Vue/Angular/whatever. But Svelte really shines at times and is _extremely_ pleasant to write. It's like writing Python after years of C++.

I'll be [talking about Svelte at JSFoo this year](https://hasgeek.com/jsfoo/2019/schedule/rethinking-frontend-apps-with-svelte-wgXuufqr6bvB2Zt8gDnCRj). If you're around and would like to hear me fanboy-ing over Svelte, drop by!