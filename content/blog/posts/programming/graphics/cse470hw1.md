---
layout: Post
title: "Twirly Sierpinski Gaskets in WebGL -- CSE 470 Assignment 1"
date: 2018-01-19
featured: false
---

I am taking a class on Computer Graphics programming this semester, and we were recently given our first assignment. It's fairly basic, but since I've done some graphics programming in the past, I decided I'd try to spruce it up a little bit. The idea is to create a Sierpinski Gasket (in this case a triangle) and then apply a coordinate transformation to warp it. First this is just done in 2d and ends up like so:

<iframe id="base" src="/assets/cse470/hw1/assignment1.html" scrolling="no" style="border: 0px none transparent; background-color: transparent; width: 100%; height: 512px; overflow: none;"></iframe>

I then made a modified version that makes a pyramid of these triangles and then warps that. I think it ended up looking pretty cool.

<iframe id="over" src="/assets/cse470/hw1/assignment1_over.html" scrolling="no" style="border: 0px none transparent; background-color: transparent; width: 100%; height: 480px; overflow: none;"></iframe>