---
layout: Post
title: "ultraviolet 0.4 Released"
date: 2019-12-9
featured: false
---

## Introduction

For those unfamiliar, [ultraviolet](https://github.com/termhn/ultraviolet) is a crate to do computer-graphics and games-related linear algebra, but *fast*,
both in terms of productivity and in terms of runtime performance. In terms of productivity, ultraviolet uses
no generics and is designed to be as straightforward of an interface as possible, resulting in fast compilation
times and clear code. In addition, the lack of generics and Rust type-system "hacks" results in clear and concise
errors that are easy to parse and fix for the user. In terms of runtime performance, ultraviolet was designed from
the start with performance in mind. To do so, it provides two separate kinds of each type, one with usual scalar f32 values,
and the other a 'wide' type which uses SIMD 'f32x4' vector types for each value. Both kinds of each type provide essentially
equivalent operations, while the wide types offer some functionality unique to them to facilitate performant SIMD algorithm design.
This design is clearn and explicit in intent, and it also allows code to take full advantage of SIMD, offering the
possibility of large performance gains for some workloads.

## 0.4 changelog

Version 0.4 represents a somewhat large milestone in that it is what I would call the minimal-viable-product for a game math
library. It has gained support for several essential and/or convenient pieces of functionality in the context of games/3d
computer graphics math, including:

* Several upgrades to the homogeneous Mat4 and Mat3 types, including several helper functions for creating translation, scale,
rotation matrices, 'look-at' matrices, and inverses.
* A [transform](https://docs.rs/ultraviolet/0.4.3/ultraviolet/transform/index.html) module which contains Isometry/Similarity
types (also known as "rigid body transformations"). These types encapsulate a rotation (+ scaling) followed by a translation in
a more memory- and time-efficient package than a full homogeneous Mat4.
* A [projection](https://docs.rs/ultraviolet/0.4.3/ultraviolet/projection/index.html) module which contains projection matrix
constructors for all the most common 'source' coordinate spaces that are designed to work directly with specific graphics APIs
(i.e OpenGL, DirectX, and Vulkan), which each have their own little quirks. Includes orthographic and several variants of projection
matrices including reversed and infinite variants which can improve depth fighting performance with floating point depth buffers.
* Several quality of life improvements to all types, including functions for easily converting them to slices of their inner type,
byte slices, and raw pointers, to facilitate passing them to graphics APIs.

If you're interested, go [check it out on crates.io](https://crates.io/crates/ultraviolet), use it, and let me know if you have
any issues or other feedback!