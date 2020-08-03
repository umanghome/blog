---
layout: post
title:  "Reconnect - An experiment to reconnect"
date:   2018-02-24 12:00:00
categories: [technology, experiments, software, product]
comments: true
excerpt: In the final quarter of 2017, I set out to validate a personal idea I had been sitting on for a while - a service that reminds me to reconnect with the people I know but don't meet on a regular basis.
---

The number of people I know keeps on increasing, and being busy adults (debatable) living in different parts of the world, I don't get to catch up with each and every person I'd like to. This is partly because there are way too many people for me to remember and I'm _terrible_ with names. I figured every once a while, I should drop a text that said something along the lines of "Hey! What's up? How have you been?"

Once a month sounded good enough to catch up with people. I went through my contact-book and started writing the names of people on my text editor. I then wrote a script ([GitHub repo](https://github.com/umanghome/reconnect)) that would remind me to _reconnect_ with certain people every day at a certain time.

Since this was supposed to be just an experiment, I didn't want to spend too much time building an application. The script that I ended up writing would send me an email every day at 6:30 PM, reading names from a file. I religiously followed these reminder emails for about two months, after that I would dismiss the notifications from my phone and forget about it until the weekend, when I would send the "Hey! What's up?" texts to all the people I was supposed to reconnect with over the week.

Here's what I learned from the experiment:

- **Time** - The time I set (6:30 PM) didn't work very well. During weekdays, I would probably be focused on work and would ignore the notifications on my phone. By the time I got to check my phone, it would be overflowing with notifications and I would probably dismiss them all. The time at which I would be reminded should have been some time when there was a high chance of me already being on my phone. During the commute to work, maybe?

- **Emails** - Email is probably not the best medium to deliver the reminders. My inbox got cluttered up, and I would have multiple emails in a single notification on my phone, which would only show the most recent two unless I make an effort to see the entire list, which of course I rarely would. This throws the "reminder" part of the experiment out of the window. I'll admit if there was just a single notification with not lots of extra clutter, I would pay heed.

- **When to reconnect with whom** - The script I wrote would pick multiple people to reconnect with every day, in a way that everyone would be picked exactly once each month. However, there are multiple people each much whom I would already have reconnected over a birthday wish. If the service reminds me to reconnect with a person two days after their birthday, it doesn't make much sense too. The service should have a feature that accounts for people's birthday. Maybe in v2?

- **Modifications** - The time at which I received the email and the list of people would require about two minutes of effort to update, but two minutes is a bit too much to update something so trivial. Hence, I haven't updated anything so far. There should have been an easier way to update the list of people and the time at which I want to be reminded.

Taking these learnings into consideration, I reckon it would be a better idea to make something accessible from a mobile phone that would allow me to update the people-list and the time at which I want to be reminded. The medium of these reminders should be something other than emails as well. Push notifications, maybe? Building a mobile app takes too much time of which there's a growing scarcity.

Would you use a mobile app that reminded you to reconnect with the people you care about every day? Let me know. If enough people show interest, I might just invest a bit of time to build something usable by everyone. ✌🏼

---

There's a list of enhancements at the [GitHub repo](https://github.com/umanghome/reconnect) if you'd like to build something on this idea.
