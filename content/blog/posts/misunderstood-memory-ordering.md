---
layout: Post
title: "The plight of the misunderstood memory ordering"
date: 2025-06-17
featured: true
---
[Rust Atomics and Locks](https://marabos.nl/atomics/), the [Rustonomicon's page on atomics](https://doc.rust-lang.org/stable/nomicon/atomics.html), much of the standard library's [documentation](https://doc.rust-lang.org/stable/std/sync/atomic/index.html), and many more sources already provide a wealth of great information about writing fast and correct concurrent programs in Rust.

I want to talk about a specific and very important part of concurrent programming, one which I misunderstood for a long time, and one which I now see commonly misunderstood and misused when reading Rust code that uses atomics: memory [`Ordering`](https://doc.rust-lang.org/stable/std/sync/atomic/enum.Ordering.html).

# wtf is a memory ordering?

Most atomic memory access operations require specifying one or more memory orderings, which modify the behavior of the access. From your current knowledge, which of the following is the purpose of these orderings?

A. To specify which atomic accesses must come before others
B. To determine whether or not there is a consistent ordering of modifications to the memory location being accessed atomically, no matter which thread is doing the access
C. To determine with which priority (i.e. how "quickly") the atomic access must be performed

The answer: none of the above!

For option (A), the specified memory ordering *has no effect* on whether an atomic access  performed on one thread will come before or after another atomic access of the same memory on another thread[\`^1\`].

For option (B), simply the act of using atomic accesses on a single piece of memory, even with only `Relaxed` ordering, already ensures that there is only a single "total modification order," agreed upon by all threads, of that piece of memory[\`^2\`].

And for option (C), the ordering once again *has no effect*—**all** atomic accesses occur with the exact same priority or "speed" (namely, "as fast as possible"). A `Relaxed` atomic write will propagate to other threads exactly as fast as a `SeqCst` write.

### So what *is* the point of all those memory `Ordering`s?

Memory `Ordering`s only do *one thing*: synchronize between the *atomic accesses* made to *one atomic value*[\`^3\`] with memory accesses (atomic or not) made to any *other* value. Memory `Ordering` *has no effect* on the specified behavior of a program if the only thing being shared between threads is a single atomic value[\`^3\`]. But what does that mean in practice?

Consider the following program:

```rust
use core::sync::atomic::AtomicUsize;
use core::sync::atomic::Ordering;

static FOO: AtomicUsize = AtomicUsize::new(0);

fn thread1() {
    FOO.store(1, Ordering::SeqCst);
}

fn thread2() {
    loop {
        if FOO.load(Ordering::SeqCst) == 1 {
            println!("Found 1!");
            break;
        }
    }
}

fn main() {
    let t1 = std::thread::spawn(thread1);
    let t2 = std::thread::spawn(thread2);
    t1.join().unwrap();
    t2.join().unwrap();
}
```

We create a shared `FOO`, initialized to `0` statically. We then spawn two threads in an unsynchronized fashion, and join on the completion of each. `thread1` writes `1` to `FOO`, and `thread2` spins until it reads `1`, then prints "Found 1!"

In this version, both the `load` and `store` on `FOO` use the strongest memory ordering, `SeqCst`. But is that necessary? Consider the following version (where we only change the `Ordering`s):

```rust
static FOO: AtomicUsize = AtomicUsize::new(0);

fn thread1() {
    FOO.store(1, Ordering::Relaxed);
}

fn thread2() {
    loop {
        if FOO.load(Ordering::Relaxed) == 1 {
            println!("Found 1!");
            break;
        }
    }
}

fn main() {
    let t1 = std::thread::spawn(thread1);
    let t2 = std::thread::spawn(thread2);
    t1.join().unwrap();
    t2.join().unwrap();
}
```

Does this program behave any differently than before?

The answer is that *no, it does not.* We're only sharing a single atomic value between the threads, so `Ordering`s have no effect. In both cases, we are guaranteed exactly the same things:

a. Our program will not successfully reach the end of `main` without printing "Found 1!"
b. Once thread 2 loads a `1`, it will not load a `0` again
c. Once thread 1 writes the `1`, it will not load a `0` again
d. The implementation will *do its best* to make the store on `FOO` in thread 1 visible to the load by thread 2 "as fast as it can"

If the fact that even `Relaxed` stores and loads obey the last point makes you a bit puzzled, as it did for me, you may also be a terminally GPU-brained games programmer >:) (or perhaps destined to be one? 👀)

Yes, simply using atomic accesses--even `Relaxed` ones!--obliges the implementation to always do its best to flush stores and make them visible to other threads as soon as possible. Extremely importantly, though, (foreshadowing!) it only obliges the implementation to do this for *specifically the single atomic that was accessed*[\`^3\`].

Alright, let's up the ante of our example program a little bit

```rust
use core::sync::atomic::AtomicUsize;
use core::sync::atomic::Ordering;

static FOO: AtomicUsize = AtomicUsize::new(0);

fn thread1() {
    for i in 0..200 {
        let _ = FOO.store(i, Ordering::SeqCst);
    }
}

fn thread2() {
    let mut i = 0;
    loop {
        let val = FOO.load(Ordering::SeqCst);
        if val >= 100 {
            println!("Found {val} after {i} iters!");
            break;
        }
    }
}

fn main() {
    let t1 = std::thread::spawn(thread1);
    let t2 = std::thread::spawn(thread2);
    t1.join().unwrap();
    t2.join().unwrap();
}
```

We have a very similar program structure to before. This time, however, on `thread1` we loop from `0..200` and store that value to `FOO`, while on `thread2`, we loop until we find `FOO >= 100`, and count how many iterations we've executed until we find that value.

This time, would changing those `Ordering::SeqCst`s to `Relaxed` change the defined behavior of our program?

Once again, *no it wouldn't!* (Sorry, I promise I'm done baiting you now...)

We still only have a single atomic shared between threads, so, as before, the memory `Ordering`s will have no effect. I wanted to show this example, however, because it shows another semi-common misconception I've seen, which is the notion that "using `SeqCst` memory ordering stops the optimizer from removing those atomic stores". If that were the case, the compiler would be obliged to leave the `for` loop in `thread1` and actually perform 200 stores to `FOO`, in order. This is in fact not true at all, and the compiler is free to change `fn thread1()` to simply store `199` once:

```rust
fn thread1() {
    let _ = FOO.store(199, Ordering::SeqCst);
}
```

This transformation can be justified using the following thought experiment, one which is extremely useful and important when writing asynchronous code in general:

*Is there **any** valid execution of the original program which would result in the transformed program's behavior, i.e. that no other thread observes the value of `FOO` between the first iteration and the final iteration of the `for` loop, leaving only the final value of `199` to be observed? **Yes,** that is very much a valid possible execution of the original program. Therefore, the transformation is justified*.

This mindset of thinking in terms of "does there exist an execution of the program where the following happens..." is a very useful pattern. It also gets us thinking in terms of *what are the actual guarantees* about my program's behavior, and which are undefined?

## No really, when does `Ordering` actually matter?

Okay, let's finally get to an example where memory ordering matters. Suppose we want to load some data on one thread, put it a buffer shared with another thread, and then tell that other thread that we're done loading and that it can now read that data. If we were doing that in its most raw form, we may write something like the following:

```rust
#![feature(sync_unsafe_cell)]
use core::sync::atomic::AtomicBool;
use core::sync::atomic::Ordering;
use core::cell::SyncUnsafeCell;

static DONE_LOADING: AtomicBool = AtomicBool::new(false);
static BUFFER: SyncUnsafeCell<Vec<u8>> = SyncUnsafeCell::new(Vec::new());

fn thread1() {
    {
        // SAFETY: nobody else accesses the buffer until we say we're done loading
        let buffer = unsafe { &mut* BUFFER.get() };
        *buffer = vec![10; 256];
    }
    let _ = DONE_LOADING.store(true, Ordering::Relaxed);
}

fn thread2() {
    loop {
        if DONE_LOADING.load(Ordering::Relaxed) {
            break;
        }
    }
    // SAFETY: thread1 is done accessing the buffer since we loaded a true!
    let buffer = unsafe { &* BUFFER.get() };
    println!("Loaded buffer: {:?}", buffer)
}

fn main() {
    let t1 = std::thread::spawn(thread1);
    let t2 = std::thread::spawn(thread2);
    t1.join().unwrap();
    t2.join().unwrap();
}
```

Is this a sound implementation, as currently written?

**No**, it's not! We have an unsynchronized read and write access to `BUFFER` across threads, which is a *data race* and therefore *undefined behavior*!

But how is that possible? We used the `DONE_LOADING` atomic to synchronize the accesses, right? If we loaded `true`on `thread2` then `thread1` must already have written to the buffer, since we only write `true` once we're done writing, even making sure our `buffer` temporary reference is out of scope!

In fact, we *haven't* properly synchronized our access using the `DONE_LOADING` atomic, because we only used `Ordering::Relaxed`.

*This* is the purpose of memory orderings, and why they're called *memory* orderings! They tell the implementation how we require accesses to *other* memory locations to be ordered *relative to* the atomic access.

When we use `Ordering::Relaxed`, we're telling the language that we don't care at all about when accesses to other memory locations happen relative to the atomic access. In fact, it would be an entirely valid transformation of the program to change `fn thread1()` to the following, if the compiler wanted to do so (note the ordering of the store and load relative to the write to the buffer!)

```rust
fn thread1() {
    let _ = DONE_LOADING.store(true, Ordering::Relaxed);

    {
        let buffer = unsafe { &mut* BUFFER.get() };
        *buffer = vec![10; 256];
    }
}
```

If `BUFFER` were not shared between threads, this transformation would have no impact on the end result of the program, and thus the compiler is free to do it. And indeed, by using `Ordering::Relaxed`, we've told the compiler exactly that we're *not* using those atomic accesses to synchronize other memory access, so it's free to reorder them relative to other memory accesses as it pleases.

In order to make our program sound, we need to use memory `Ordering`s which *do* create a memory synchronization. We can use `Acquire` and `Release` for this, like so (note this is the same as the original program, with only the `Ordering`s changed.

```rust
#![feature(sync_unsafe_cell)]
use core::sync::atomic::AtomicBool;
use core::sync::atomic::Ordering;
use core::cell::SyncUnsafeCell;

static DONE_LOADING: AtomicBool = AtomicBool::new(false);
static BUFFER: SyncUnsafeCell<Vec<u8>> = SyncUnsafeCell::new(Vec::new());

fn thread1() {
    {
        // SAFETY: nobody else accesses the buffer until we say we're done loading
        let buffer = unsafe { &mut* BUFFER.get() };
        *buffer = vec![10; 256];
    }
    let _ = DONE_LOADING.store(true, Ordering::Release);
}

fn thread2() {
    loop {
        if DONE_LOADING.load(Ordering::Acquire) {
            break;
        }
    }
    // SAFETY: thread1 is done accessing the buffer since we loaded a true!
    let buffer = unsafe { &* BUFFER.get() };
    println!("Loaded buffer: {:?}", buffer)
}

fn main() {
    let t1 = std::thread::spawn(thread1);
    let t2 = std::thread::spawn(thread2);
    t1.join().unwrap();
    t2.join().unwrap();
}
```

We've now told the compiler that any accesses that happened in source-order before the "`Release`-store" on thread 1 *must* also happen-before a subsequent "`Acquire`-load" of that stored value on thread 2. This is exactly the condition we need to ensure our program is valid.

There's a lot more to be said about specific, tricky situations where certain memory orderings are needed to ensure correct program behavior, and I won't try to enumerate them here. Instead I wanted to plant this core seed in your head when thinking about memory orderings: the `Ordering` is about what we expect to happen *around* the atomic being accessed, **not** about the *atomic access itself*. With this premise in mind, I think you're in an excellent spot to go on to read [Mara's chapter on memory ordering](https://marabos.nl/atomics/memory-ordering.html) (and the rest of the book in general). The [Common Misconceptions](https://marabos.nl/atomics/memory-ordering.html#common-misconceptions) listed there are a great addendum to this post as well.
# But why?

This is a bit of a tangent, but it's about something I think is really important to talk about. A this point, many readers may be thinking something along the lines of, "Ugh, why do compiler engineers make this crap so hard?! Why doesn't the program just work like I wrote it??"

In my mind there's at least three important reasons for this.

1. In the case of concurrency and memory ordering in particular, the problem is inherently incredibly complex, even [purely from a hardware perspective](https://research.swtch.com/hwmm). The C++20 memory model which Rust and other languages have adopted [is not a holy grail](https://research.swtch.com/plmm), but...
2. You want your program to run fast, and you want your compiler to help you make it fast. Admit it. [No really, you do](https://nitter.net/pcwalton/status/1759697043910774961).
3. You want your program to run (fast) on multiple targets, with different operating systems, hardware architectures, etc.
4. You want to be able to write programs that optimize in ways *you* know are correct, even when the compiler can't prove it

Enter *undefined behavior*. Contrary to somewhat-popular belief, *undefined behavior* is **not**  "holes in the language where the designers just haven't bothered to specify behavior" Instead, these are [carefully crafted, artisan holes](https://i0.wp.com/mediachomp.com/wp-content/uploads/2024/04/amigara-fault-20.png?resize=768%2C1145&ssl=1) that have been *purposely left void*. These voids allow the compiler to justify implementation in a way that satisfies the points above. Without undefined behavior, the compiler wouldn't be able to provide the combination of flexibility, portability, and speed that we've come to expect. I highly recommend reading Ralf Jung's blog post about this, ["Undefined Behavior deserves a better reputation"](https://www.ralfj.de/blog/2021/11/18/ub-good-idea.html).

That being said, undefined behavior is a double-edged sword. It is extremely helpful to use it with care in the design of a language, but [going overboard has led to its current terrible reputation](https://raphlinus.github.io/programming/rust/2018/08/17/undefined-behavior.html). The fact that it is only possible to invoke undefined behavior by using `unsafe` Rust is a superpower. Wield it with the necessary care (and use the right memory `Ordering`)!

## Footnotes

[\`^1\`]: Well, at least not directly. Ordering *could* indirectly affect the relative ordering of the actual atomic accesses, as we'll see later

[\`^2\`]: This order is *different per atomically-accessed memory location*, however. See [the relevant piece of the C++ memory model spec](https://timsong-cpp.github.io/cppwp/n4868/intro.multithread#intro.races-note-3), from which [Rust inherits its own model](https://doc.rust-lang.org/stable/std/sync/atomic/index.html#memory-model-for-atomic-accesses).

[\`^3\`]: More formally in Rust's model, "a specific value in memory being accessed atomically" since [there's no actual notion](https://doc.rust-lang.org/stable/std/sync/atomic/index.html#memory-model-for-atomic-accesses) of an "atomic object" or "atomic value" as there is in C/++
