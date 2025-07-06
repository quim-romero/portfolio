---
title: 'NebulaOS Terminal: Designing an Interactive Web Experience'
date: '2025-07-22'
tags: [ux, interaction, javascript, creativity]
description: "How I built a web terminal that's functional, animated, and a little unexpected."
---

**NebulaOS** started as an experiment.

I wanted to create a unique way to interact with a website — something that felt different from typical UIs, but still intuitive. A kind of "developer desktop" where you could explore content, run commands, and get instant feedback.

In the end, it became one of the most expressive parts of my portfolio.

---

## Why a terminal?

Because it breaks the pattern.

Most portfolios follow the same flow: hero, projects, about, contact. I wanted to add a layer that would stop people and make them _engage_. Something that felt alive.

A terminal felt like the right mix of retro, modern, and technical — and it allowed me to build a small language of commands, feedback, animations, and even humor.

Also: it’s just fun to build.

---

## Designed to feel real

From the first boot message to the fake memory check and glitch mode, everything is designed to feel like an OS booting up.

There’s a simulated loading sequence, theme toggles (`theme matrix`, anyone?), and even recruiter detection (`👁️ Recruiter detected.`). It’s playful, but every detail has a reason.

The goal: create **an immersive experience** that shows skill _and_ personality.

---

## Under the hood

NebulaOS is built with:

- **React** for structure
- **Framer Motion** and **GSAP** for animations
- **Zustand** for managing mission mode and internal state
- **Custom event dispatching** for effects like theme changes and glitches
- **Keyboard-first UX** and clean accessibility patterns

Every line typed into the terminal is parsed, interpreted, and displayed in sync. There’s state history, error handling, dynamic commands (`open trackforge`), and even some fake hacking going on.

---

## UX with a twist

One of the hardest parts wasn’t the tech — it was **designing the flow**.

- How much text is too much?
- How do you guide the user without real UI controls?
- How do you balance surprise with clarity?

I used pacing (delayed typing), boot sequences, emoji cues, and a few "try this" hints to help users discover commands without needing a manual.

Even recruiters get a custom boot line — which often sparks a smile.

---

## My favorite part: the tone

NebulaOS isn’t just code — it has a _voice_. Some commands are useful (`open visionary`, `submit resume`), others are just for fun (`sudo hack-recruiter`).

That’s intentional.

I wanted the whole thing to feel light, creative, and a bit cheeky — because frontend is not just about logic. It’s also about **tone, emotion, and personality**.

---

## Why this matters

This terminal shows what I care about:

- Clean architecture
- Smooth animations
- State management
- Creative UI
- User-focused design
- Attention to small things most people overlook

It’s not about gimmicks — it’s about demonstrating that I can take an idea and build it with craft, speed, and purpose.

---

Thanks for reading. If you haven’t tried the terminal yet, go to NebulaOS in Projects, click Start Demo and type `help`. You’ll know what to do.

> — Quim
