---
layout: post
title:  "Building LeapDrop"
date:   2017-12-07 12:22:19
categories: [technology, hackathons]
comments: true
keywords: [leapdrop, leap motion, websockets, gestures]
excerpt: Hi, there. I’ve been meaning to write a post about how we built LeapDrop at the [InOut](https://hackinout.co/) 3.0 Hackathon. We eventually won Best Hardware Hack sponsored by [Hackster.io](https://www.hackster.io/).
---

Team TheGeekBros has three bros in it: [Siddharth
Goswami](http://siddharth.xyz/), [Soham Dodia](https://sohamdodia.in/), and
[I](https://umanggalaiya.in/).

InOut had lots of tracks this time around, so we got to dabble around various
ideas — eventually settling onto building something in the
Virtual-Reality/Augmented-Reality track — something that’s been an interest of
ours for a really long time.

We had a couple of ideas: a zombie-shooter FPS based on AR, a VR desktop
experience (sort of like [this](https://cindori.org/vrdesktop/)). We had a
[LeapMotion](https://www.leapmotion.com/), a borrowed [Google
Cardboard](https://vr.google.com/cardboard/) knock-off, and some two-way tape to
piece it all together.

Now, none of us really knew how to proceed with any of the ideas. We didn’t have
experience writing code to build VR/AR experiences — just some ideas in our
heads — results of all those hours of sci-fi entertainment. So we sat there for
two hours, cracking jokes and Googling stuff. It became evident after
inefficiently sharing links back-and-forth for a while that it would be
practically impossible for us to work on any of our ideas so far. Then it hit
us.

We’d been sharing links really inefficiently. I don’t remember how, but maybe it
was a Messenger group? We recalled this scene from the first Iron Man movie
where Tony Stark movies stuff across computers (and onto a hologram) using just
his hands:

<iframe width="560" height="315" src="https://www.youtube.com/embed/WNu6fRo_7fg?start=4" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
*Watch 0:05 to 0:20*

Why couldn’t we do this for sharing web pages? We had a LeapMotion that could
very well detect hand gestures to do something like this. And thus, we set off
to build LeapDrop.

> LeapDrop allows people to share webpages between computers by using a simple
> pinch-and-release hand gesture.

The “stack” consisted of the following:

* A Chrome Extension for interacting with the browser.
* A Node.js server with socket.io [Web Sockets] for inter-device communication.
* A LeapMotion and its JS SDK.
* An Android app.
* Lots of jokes and quite a bit of [9GAG](https://9gag.com/).

The end result looked something like this.

<iframe width="560" height="315" src="https://www.youtube.com/embed/ptT3npbsaRg" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>

At the beginning when we were discussing this idea and ironing out the details
of how it’s supposed to work, it seemed that this would be a fairly simple
project and could be done in a couple of hours — maybe even in half the time of
the entire duration of the Hackathon. There’s a(n unspoken?) rule of Software
Engineering that almost nothing will ever be built in the time a developer
claims it to be. But we did manage to catch some sleep and tweak LeapDrop to
work better, so.. ¯\_(ツ)_/¯

It was one hell of an experience — nerd jokes, memes, working with the coolest
team, and working on things which have no proper set path or guides to develop
(those are the best kind). I wouldn’t trade it for anything else. Anyway, here’s
a checkpoint. The stuff that follows now is mostly about how LeapDrop works, so
if you’re not interested in the nitty-gritty, drop a like by clicking a heart
button somewhere on this page if you liked this post so far, and have a great
day/night/whatever. 😄

*****

We didn’t have a set path or a guide on how to build LeapDrop. We knew how
things are supposed to work in tandem, but had no experience building anything
like this — ever.

I had built a tiny (totally unrelated) Chrome Extension earlier, and had written
some socket.io code. Siddharth and Soham had experience building Android apps.
Siddharth and I had been playing with LeapMotion the previous summer. So we got
to working. In an ideal world, I would be building the Chrome Extension, but
Siddharth had already started working on it by the time Soham and I started
reading the documentation. Soham picked up Android and I got to writing
JavaScript for the server.

Here’s a breakdown of what each part of the stack was doing:

### Google Cardboard + LeapMotion

We stuck a LeapMotion onto a Google Cardboard. The LeapMotion would detect hand
gestures. A phone running the Android app went into the Google Cardboard.

### **Node.js Server with socket.io**

The server is the “controller” of sorts. Each device would be connected to it
using Web Socket. The server emits and listens to events. It tells the Chrome
Extension to show QR Codes, read URLs, and open URLs. It tells the Android App
to decode the QR Code in front of it. It listens to gestures from the
LeapMotion.

### Chrome Extension

The Chrome Extension is installed on all the participating computers. It
connects to the socket.io server. It listens for events and emits them. It shows
a QR Code when asked, it sends the URL of the last active tab when asked, and it
opens up a URL when asked.

### Android App

The Android app connects to the socket.io server as well. (It’s a pattern,
really. Everything connects to the socket.io server.) The Android app displays
what the camera sees, and occasionally decodes QR Codes. It was supposed to be a
stereoscopic view, but Android only allows one resource to access the camera at
a given time, so we ended up with having the camera-view only in the right part
of the stereoscopic view. It was (very) lousy UX, but that’s all that we could
come up with at the time. The Android phone goes into the Google Cardboard.

### LeapMotion and its JS SDK

If you haven’t figured out by now, the LeapMotion also connects to the socket.io
server. However, since LeapMotion cannot directly connect to anything except the
SDK, the JS SDK is running on a webpage and the webpage is connected to the
socket.io server using Web Sockets. This webpage listens for the *pinch* and
*release* gestures and notifies the server when they are performed.

*****

### Connecting it all

Abbreviations of devices:

* C1 — Computer 1 with a Chrome Extension
* C2 — Computer 2 with a Chrome Extension
* PH — Android Phone running the LeapDrop app
* LMC — LeapMotion-connected Computer
* LM — LeapMotion
* Server — A Node.js + socket.io server.

!["How LeapDrop works"]({{ site.url }}/img/LeapDrop.png "How LeapDrop works")
*Siddharth is a really great designer as well. He’s the one who created this
sweet illustration.*

1.  *C1* registers with the *Server*. An ID is assigned to *C1*.
1.  *C2* registers with the *Server*. An ID is assigned to *C2*.
1.  *PH* registers with the *Server*.
1.  *LMC* registers with the *Server*.
1.  *LM* detects a pinch gesture.
1.  *LM* notifies *LMC* about the detected pinch gesture.
1.  *LMC* notifies the *Server* about the detected pinch gesture.
1.  *Server* asks *C1* to show its QR Code. This QR Code has encoded within itself
the ID assigned to it in Step 1.
1.  *Server* asks *C2* to show its QR Code. This QR Code has encoded within itself
the ID assigned to it in Step 2.
1.  *Server* asks *PH* to detect the QR Code it sees, and send whatever the QR Code
has encoded within itself. [This works because when the user makes a pinch
gesture in front of a computer, the head-mounted mobile-phone camera will see
the QR Code of the source computer.]
1.  *PH* sends the decoded ID of the source computer to the Server. [*C1* in this
case.]
1.  *Server* asks the computer to which the ID belongs [*C1* in this case] to send
it’s last visited URL.
1.  *C1* sends the last visited URL to the *Server*.
1.  *LM* detects a release gesture.
1.  *LM* notifies *LMC* about the detected release gesture.
1.  *LMC* notifies the *Server* about the detected release gesture.
1.  *Server* asks *PH* to detect the QR Code it sees, and send whatever the QR code
has encoded within itself. [This works because when the user makes a release
gesture in front of a computer, the head-mounted mobile-phone camera will the
the QR Code of the target computer.]
1.  *PH* sends the decoded ID of the target computer to the *Server*. [*C2* in this
case.]
1.  *Server* asks *C1* to stop showing its QR Code.
1.  *Server* asks *C2* to stop showing its QR Code.
1.  *Server* asks the target computer [*C2* in this case] to open the URL obtained
in Step 13.

*****

We got a *bit* of attention from the judges and fellow hackers around us, but
unfortunately didn’t get selected to demo on-stage. This was a real bummer,
since I can’t help but think to this date, how **rad** it would have been to
grab a webpage from the projector-screen and put it on a laptop on a totally
different side of the room.

Anyway, when the prizes were being announced for the Hardware category, I
thought maybe we were deserving of the third prize. The third prize was
announced and it wasn’t us. I thought maybe we were second since LeapDrop was
really cool. The second prize wasn’t us either. I gave up on winning a Hackathon
prize this time around. (*Paging* Imposter Syndrome!) TheGeekBros flashed on the
screen as the first prize, and we took a jolly ride to Cloud 9. I had been to
the first two versions of InOut as well, but like they say: *Third time’s the
charm*.

Anyway, that’s it for this *reeeeally* long post. If you’re still reading,
thanks for sticking around for this long. 😄

[GitHub repo for LeapDrop.](https://github.com/TheGeekBros/leapdrop)

*Originally posted to [Medium](https://hackernoon.com/building-leapdrop-f4191ff2f36d) on June 29, 2017.*