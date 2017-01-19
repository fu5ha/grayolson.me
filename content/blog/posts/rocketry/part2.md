---
layout: Post
title: "Rocketry Part 2: Open Rocket Simulation & Final Design"
date: 2017-01-18
featured: true
---

Continuing on from [last time](https://www.grayolson.me/blog/posts/rocketry/part1/), the next thing to do was to create these loose concepts in a piece of software called [Open Rocket](http://openrocket.sourceforge.net/) which allows you to quickly ideate and refine rocket designs based on the results of simulations with different motors and recovery devices. My rocket ended up looking like this:

![Rocket design](/assets/img/rocket/design1.png)

The payload in the nose cone is a small altimeter that the rocket will carry. The simulation ended up quite close to what I want, while leaving myself a little room to do small tweaks with extra mass to really zero it in:

![Simulation results](/assets/img/rocket/simulation1.png)
![Simulation results](/assets/img/rocket/simulation2.png)
![Simulation results](/assets/img/rocket/simulation3.png)

This simulation is fairly rudimentary, and so the next step will be to crete a model of the hull of the rocket in Onshape, a cad program, and then run it through Autodesk FlowDesign to get a coefficient of drag which can then be used in an Excel (well, Google Sheets) model which will take into account more variables and in theory be more accurate. I'll be posting the results of that in my next post.