---
layout: Post
title: "ultraviolet 0.6 Released"
date: 2020-09-11
featured: false
---

## Introduction

For those unfamiliar, [ultraviolet](https://github.com/termhn/ultraviolet) is a crate to do computer-graphics and games-related linear algebra, but *fast*,
both in terms of productivity and in terms of runtime performance. In terms of productivity, ultraviolet uses
no generics and is designed to be as straightforward of an interface as possible, resulting in fast compilation
times and clear code. In addition, the lack of generics and Rust type-system "hacks" results in clear and concise
errors that are easy to parse and fix for the user. In terms of runtime performance, ultraviolet was designed from
the start with performance in mind. To do so, it provides two separate kinds of each type, one with usual scalar f32 values,
and the other a 'wide' type which uses SIMD vector types for each value. Both kinds of each type provide essentially
equivalent operations, while the wide types offer some functionality unique to them to facilitate performant SIMD algorithm design.
This design is clearn and explicit in intent, and it also allows code to take full advantage of SIMD, offering the
possibility of large performance gains for some workloads.

## 0.6 Changes

0.6 is the first major release since 0.4 several months ago; 0.5 was mostly incremental changes, though it did bring `serde` support which was exciting.

The headlining features are

* Support for 256-bit wide AVX vectors and instructions as well as 128-bit wide SSE instructions which were already supported.
* Support for f64/double precision floats under the `f64` feature, including `f64x2` and `f64x4` SIMD-accelerated types.

These are two features that have been at the top of 'the wishlist' for some time now, and I'm excited to finally land them! 256-bit/AVX support is particularly exciting for me, as some workloads that I'm interested in (namely [rayn](https://github.com/termhn/rayn), my pathtracing renderer) should be able to get a fairly significant performance boost. In a test of purely the ray-sphere intersection test (which may be used in a renderer), you can see this starting to take shape (glam here is used to represent an optimized 'scalar' implementation, i.e. SIMD accelerated but horizontally rather than vertically as ultraviolet does):

#### ray-sphere intersection x 80,000 rays
* `glam` - 917.0 *us*
* `ultraviolet_f32x4` - 170.3 *us*
* __`ultraviolet_f32x8` - 100.9 *us*__

*Note: benchmarks performed on an i5 Mid-2014 Macbook Pro, and may vary significantly per processor/computer*

In addition, there's been various other improvements, bug fixes, and enhancements, including significant performance improvements for Rotor-transform-vector operations. Here's the relevant benchmark:

#### scalar rotation3 mul vector3 x 1
* `glam` - 6.4543 *ns*
* `ultraviolet` 0.5 - 7.4728 *ns*
* __`ultraviolet` 0.6 - 6.1521 *ns*__

Finally, support for [mint](https://github.com/kvark/mint) landed for most scalar types, which is great for interoperation between `ultraviolet` and other Rust math crates, as well as making it easier to use `ultraviolet` with [ggez](https://github.com/ggez/ggez).

### Full Changelog

- Add support for f64/double precision floats under `f64` feature. Naming convention is `D[TypeName]` for the f64 versions.
- Rename `W[TypeName]` to `[TypeName]x4`, allowing room for `[TypeName]x8`.
- Add support for 256 bit AVX vectors.
- Add support for `mint` for scalar types
- Add `wgpu`-specfic notes to `projection` module (adds `_wgpu` to some function names)
- Significantly improve performance of Rotors and transform types (Isometry, Similarity)
- Add `Rotor3::rotate_vecs()` for improved performance on rotating multiple vecs with the same rotor
- Add spherical linear interpolation and better docs around interpolation
- Rename `[WideType]::merge()` to `[WideType]::blend()`
- Add `Into<Vec2; N> for Vec2xN` implementations
- Fix some doc comments not appearing properly on Vec and Mat types.
- Make most initializers `const`
- Various performance improvements, especially for Rotor-transform-vector and some matrix operations
- Add `MatN::determinant()`
- Add `Mat2::inverse()`

If you're interested, go [check it out on crates.io](https://crates.io/crates/ultraviolet), use it, and let me know if you have
any issues or other feedback by visiting the [GitHub issue tracker](https://github.com/termhn/ultraviolet/)!