# Peck or Pass — Theme Guide

This document defines the visual theme for **Peck or Pass**. The goal is a **cool, confident, slightly irreverent** vibe that feels modern and social — not childish, not corporate.

---

## Brand Vibe

**Keywords**

* cool
* restrained
* opinionated
* modern
* minimal

Mental model:

> *This app quietly judges food choices.*

The app should feel confident and calm, with personality used sparingly for impact.

---

## Color System

### Base Colors (Foundation)

These colors form the core dark theme. Do not substitute them casually.

```text
Background (primary):  #0F1115   // near-black, not pure black
Surface / cards:       #181B22
Divider / borders:     #2A2F3A
Text (primary):        #F2F3F5
Text (secondary):      #A1A6B3
```

Why:

* Works beautifully on OLED screens
* Screenshots well for App Store
* Feels premium and intentional

---

### Brand Accent (Primary)

```text
Accent red: #E04F3F
```

Usage:

* Peck action (primary vote)
* Selected states
* Winning option highlight
* Key emphasis moments

Rules:

* Use sparingly
* Never as a background wash
* No gradients

---

### Secondary Accent (Optional)

Only introduce if a second accent is absolutely necessary.

```text
Muted amber: #F2A93B
```

Usage:

* Neutral states
* Ties
* Waiting indicators

If it’s not clearly needed — skip it.

---

## Mascot (Attitude Chicken)

The chicken is a **supporting character**, not the star.

### Mascot Colors

```text
Feathers:   #F4F5F7   // off-white
Eyes:       #0F1115
Comb/beak:  #E04F3F   // same as brand accent
```

Rules:

* Flat colors only
* No gradients
* No glossy highlights
* Minimal detail

The chicken should feel:

* observant
* slightly judgmental
* calm

Not:

* excited
* loud
* childish

---

## Typography

### Recommended Fonts

Primary choices:

* Inter
* SF Pro
* Space Grotesk (if slightly more edge is desired)

Rules:

* Medium weight for headings
* Regular for body text
* Tight tracking
* No rounded or playful fonts

Lowercase wordmarks are encouraged:

> peck or pass

---

## Motion & Interaction

Motion should communicate confidence, not excitement.

Rules:

* No bouncy animations
* Fast, decisive transitions
* Motion reinforces action clarity

Interaction semantics:

* **Peck** → firm highlight, confident confirmation
* **Pass** → subtle fade, de-emphasis

---

## Mascot Usage Guidelines

The chicken appears only in high-impact moments:

Allowed:

* Onboarding (brief)
* Empty states
* Decision outcomes
* Rare announcements

Avoid:

* Constant narration
* Tooltips
* Navigation instructions
* Overuse across screens

Rule of thumb:

> *If removing the chicken breaks usability, it’s being overused.*

---

## Explicitly Avoid

* Bright yellow backgrounds
* Teal + orange candy palettes
* Gradients
* Heavy drop shadows
* Emoji-filled UI
* Excessive jokes or copy

These push the product toward a childish or game-like feel.

---

## Default Mode Recommendation

Start **dark-mode only**.

Reasons:

* Strong brand alignment
* Fewer early design decisions
* Easier to keep the UI cool and restrained

Light mode can be added later if needed.

---

## Summary

Peck or Pass should feel:

* calm
* confident
* modern
* lightly opinionated

Personality is present — but controlled.

Minimalism is a feature, not a limitation.


chicken faces are in /apps/web/src/assets/chicken_faces.png
logo is in apps/web/src/assets/logo.png