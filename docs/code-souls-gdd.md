# 🎮 CODE SOULS
## Game Design Document (GDD)
### Version 1.0 | Studio-Grade Documentation

---

# 📋 Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Technical Stack Overview](#2-technical-stack-overview)
3. [Authentication Flow](#3-authentication-flow)
4. [Core Game Loop](#4-core-game-loop)
5. [Player Statistics System](#5-player-statistics-system)
6. [World Design](#6-world-design)
7. [Stage Structure](#7-stage-structure)
8. [Documentation System](#8-documentation-system)
9. [Challenge System](#9-challenge-system)
10. [Economy System](#10-economy-system)
11. [Items & Store](#11-items--store)
12. [Boss Systems](#12-boss-systems)
13. [Multiplayer Modes](#13-multiplayer-modes)
14. [UI/UX Breakdown](#14-uiux-breakdown)
15. [Animation & Visual Direction](#15-animation--visual-direction)
16. [Sound Design](#16-sound-design)
17. [World Map Layout](#17-world-map-layout)
18. [Final Notes](#18-final-notes)

---

# 1. Executive Summary

## 1.1 Project Overview

**Code Souls** is a story-driven, gamified front-end development learning platform that transforms the journey of mastering web development into an immersive RPG-style adventure. The platform combines progressive skill-building with engaging gameplay mechanics, creating a unique educational experience that motivates learners through narrative, competition, and tangible rewards.

## 1.2 Core Concept

| Attribute | Description |
|-----------|-------------|
| **Genre** | Educational RPG / Gamified Learning Platform |
| **Platform** | Web Application (Desktop & Mobile Responsive) |
| **Target Audience** | Aspiring front-end developers (Beginner to Advanced) |
| **Learning Path** | Based on [roadmap.sh/frontend](https://roadmap.sh/frontend) |
| **Visual Style** | Pixel-art aesthetic inspired by Undertale |
| **Gameplay Inspirations** | Habitica, Duolingo, Score Hero, Undertale |

## 1.3 Unique Value Proposition

Code Souls differentiates itself through:

- **Narrative-Driven Learning**: A compelling story about restoring a corrupted digital world
- **Progressive World System**: Four distinct themed worlds representing skill levels
- **IQ Evolution System**: Unique intelligence metric replacing traditional XP
- **Competitive Multiplayer**: 1v1 and 5v5 modes for collaborative and competitive learning
- **Integrated Documentation**: In-stage tutorials aligned with industry-standard curricula

## 1.4 Mission Statement

> *"Transform the challenging journey of learning front-end development into an epic adventure where every line of code brings you closer to becoming a digital hero."*

---

# 2. Technical Stack Overview

## 2.1 Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 14+ | Full-stack React framework with App Router |
| **TypeScript** | 5.0+ | Type-safe development and code reliability |
| **TailwindCSS** | 4.0+ | Utility-first styling and responsive design |
| **Shadcn UI** | Latest | Accessible, customizable component library |
| **Framer Motion** | Latest | Fluid animations and transitions |

## 2.2 Technology Integration Map

### Next.js Implementation

\`\`\`
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (game)/
│   │   ├── intro/page.tsx
│   │   ├── world/[worldId]/page.tsx
│   │   ├── stage/[stageId]/page.tsx
│   │   └── boss/[bossId]/page.tsx
│   ├── store/page.tsx
│   ├── multiplayer/page.tsx
│   └── profile/page.tsx
├── components/
│   ├── ui/              # Shadcn components
│   ├── game/            # Game-specific components
│   ├── hud/             # HUD elements
│   └── animations/      # Framer Motion wrappers
└── lib/
    ├── game-state/      # State management
    └── api/             # API utilities
\`\`\`

### Component Architecture

| System | Technologies Used | Implementation Details |
|--------|-------------------|------------------------|
| **World Map** | Next.js + Framer Motion + Canvas | Interactive map with animated path transitions, parallax backgrounds |
| **Stage Previews** | Shadcn Dialog + Framer Motion | Modal overlays with staggered content animations |
| **Dialogue System** | Framer Motion + Custom Hooks | Typewriter effect with sound synchronization |
| **HUD Elements** | Shadcn UI + TailwindCSS | Responsive stat bars, currency displays, quick-access menus |
| **Code Editor** | Monaco Editor + Custom Styling | Integrated IDE with syntax highlighting and auto-completion |
| **Transitions** | Framer Motion AnimatePresence | Smooth world/stage transitions with loading states |

### Animation Specifications

\`\`\`typescript
// Example: World Transition Animation
const worldTransition = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.1 },
  transition: { duration: 0.5, ease: "easeInOut" }
};

// Example: Typewriter Dialogue
const typewriterVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { delay: i * 0.03 }
  })
};
\`\`\`

---

# 3. Authentication Flow

## 3.1 Flow Diagram

\`\`\`
┌─────────────────┐
│   Landing Page  │
└────────┬────────┘
         │
    ┌────▼────┐
    │ New User?│
    └────┬────┘
         │
    ┌────┴────┐
    │         │
   Yes        No
    │         │
    ▼         ▼
┌───────┐  ┌───────┐
│Signup │  │ Login │
└───┬───┘  └───┬───┘
    │          │
    └────┬─────┘
         │
         ▼
┌─────────────────┐
│ Pixel Onboarding│
│   Animation     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Game Intro     │
│  (First Time)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Main Game     │
└─────────────────┘
\`\`\`

## 3.2 Login Page Specifications

| Element | Description | Visual Style |
|---------|-------------|--------------|
| **Background** | Animated pixel-art digital landscape | Dark theme with glowing elements |
| **Logo** | "CODE SOULS" in pixel font | Glowing effect with subtle animation |
| **Form Container** | Centered card with glass-morphism | Semi-transparent with pixel borders |
| **Input Fields** | Email & Password | Pixel-styled inputs with glow on focus |
| **Login Button** | Primary CTA | Pixel button with hover animation |
| **Social Login** | Optional OAuth providers | Pixel-styled provider icons |
| **Links** | "Forgot Password" / "Create Account" | Subtle underline animations |

## 3.3 Signup Page Specifications

| Element | Description | Validation |
|---------|-------------|------------|
| **Username** | Player display name | 3-20 characters, alphanumeric |
| **Email** | Account email | Valid email format |
| **Password** | Account password | Min 8 chars, 1 uppercase, 1 number |
| **Confirm Password** | Password verification | Must match password |
| **Terms Checkbox** | Agreement to ToS | Required |

## 3.4 Onboarding Animation Sequence

**Duration**: 8-12 seconds

1. **Screen Fade** (0-2s): Black screen fades in with particle effects
2. **Avatar Appearance** (2-4s): Pixel avatar materializes on left side
3. **Text Reveal** (4-10s): Stylized Arabic text appears with typewriter effect
4. **CTA Reveal** (10-12s): "Begin Your Journey" button fades in

---

# 4. Core Game Loop

## 4.1 Primary Loop Structure

\`\`\`
┌─────────────────────────────────────────────────────┐
│                    CORE LOOP                        │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐        │
│  │  Learn  │───▶│Practice │───▶│ Reward  │        │
│  │  (Docs) │    │(Challenge)   │ (Loot)  │        │
│  └─────────┘    └─────────┘    └────┬────┘        │
│       ▲                              │             │
│       │                              │             │
│       └──────────────────────────────┘             │
│                                                     │
└─────────────────────────────────────────────────────┘
\`\`\`

## 4.2 Session Flow

| Phase | Duration | Activities |
|-------|----------|------------|
| **Entry** | 1-2 min | Login → World Map → Stage Selection |
| **Preparation** | 2-3 min | Read Documentation → Review Objectives |
| **Challenge** | 8-30 min | Complete 3 coding challenges |
| **Resolution** | 1-2 min | Receive rewards → View progress |
| **Progression** | Variable | Unlock next stage or face boss |

## 4.3 Engagement Mechanics

- **Daily Streaks**: Consecutive day bonuses
- **Achievement System**: Unlockable badges and titles
- **Leaderboards**: Global and friend rankings
- **Events**: Limited-time challenges and rewards

---

# 5. Player Statistics System

## 5.1 Core Stats Overview

| Stat | Icon | Starting Value | Maximum | Description |
|------|------|----------------|---------|-------------|
| **Health (HP)** | ❤️ | 100 | Upgradeable | Depletes on failed challenges |
| **IQ** | 🧠 | 85 | 160 | Intelligence quotient, increases via boss defeats |
| **Gold** | 🪙 | 0 | Unlimited | Common currency for store purchases |
| **Diamonds** | 💎 | 0 | Unlimited | Premium currency, earned by beating timers |

## 5.2 Health System

\`\`\`
Health Mechanics:
├── Starting HP: 100
├── HP Loss Events:
│   ├── Failed challenge: -10 HP
│   ├── Timer expiration: -5 HP
│   └── Boss defeat (loss): -25 HP
├── HP Recovery:
│   ├── Health Potion: +50 HP
│   ├── Daily login: +10 HP
│   └── Stage completion: +5 HP
└── HP = 0 Consequence:
    └── Cannot attempt stages until recovered
\`\`\`

## 5.3 IQ System

The IQ system replaces traditional XP, representing the player's growing intelligence and mastery.

| IQ Range | Title | Unlocks |
|----------|-------|---------|
| 85-95 | Novice | Basic stages |
| 96-110 | Apprentice | Intermediate content |
| 111-130 | Scholar | Advanced challenges |
| 131-145 | Expert | Senior-level projects |
| 146-160 | Genius | Hero-level content + all features |

**IQ Increase Conditions**:
- Mini Boss Defeat: +3-5 IQ
- Final Boss Defeat: +10-15 IQ
- Special Events: +1-2 IQ

## 5.4 Level Selection System

| Selected Level | Prerequisite | Success Path | Failure Path |
|----------------|--------------|--------------|--------------|
| **Beginner** | None | Start World 1 | N/A |
| **Intermediate** | Beat Beginner Final Boss OR Pass Test | Start World 2 | → Beginner Final Boss |
| **Senior** | Beat Intermediate Final Boss OR Pass Test | Start World 3 | → Intermediate Final Boss |
| **Hero** | Beat Senior Final Boss OR Pass Test | Start World 4 | → Senior Final Boss |

---

# 6. World Design

## 6.1 World Overview

Code Souls features four distinct worlds, each representing a skill level and featuring unique visual themes, enemies, and challenges.

\`\`\`
                    🌍 WORLD PROGRESSION MAP
    
    ╔═══════════════════════════════════════════════════╗
    ║                                                   ║
    ║   🔴 WORLD 1        🔵 WORLD 2        🟡 WORLD 3 ║
    ║   BEGINNER          INTERMEDIATE      SENIOR     ║
    ║   "Inferno Gate"    "Abyssal Depths"  "Scorched  ║
    ║                                        Sands"    ║
    ║        │                  │               │      ║
    ║        └──────────────────┴───────────────┘      ║
    ║                         │                        ║
    ║                         ▼                        ║
    ║                    🟢 WORLD 4                    ║
    ║                       HERO                       ║
    ║                  "Eden Protocol"                 ║
    ║                                                  ║
    ╚═══════════════════════════════════════════════════╝
\`\`\`

## 6.2 World Specifications

### 🔴 World 1: Inferno Gate (Beginner)

| Attribute | Value |
|-----------|-------|
| **Theme** | Hell / Fire / Corruption |
| **Color Palette** | Deep reds, oranges, black |
| **Environment** | Volcanic landscapes, burning servers, corrupted data streams |
| **Ambient SFX** | Crackling flames, digital distortion, low rumbles |
| **Music** | Intense, rhythmic chiptune with ominous undertones |
| **Stages** | 60-80 |
| **Content Focus** | HTML fundamentals, basic CSS, intro to programming concepts |

**Visual Elements**:
- Pixel-art lava flows
- Burning circuit boards
- Corrupted file icons as enemies
- Red fog/particle effects

### 🔵 World 2: Abyssal Depths (Intermediate)

| Attribute | Value |
|-----------|-------|
| **Theme** | Ocean / Water / Mystery |
| **Color Palette** | Deep blues, teals, bioluminescent accents |
| **Environment** | Underwater data centers, sunken servers, digital coral |
| **Ambient SFX** | Bubbling, sonar pings, whale-like data transmissions |
| **Music** | Flowing, mysterious chiptune with echoing melodies |
| **Stages** | 60-80 |
| **Content Focus** | Advanced CSS, JavaScript fundamentals, responsive design |

**Visual Elements**:
- Floating data bubbles
- Bioluminescent code fragments
- Sunken server racks
- Blue particle currents

### 🟡 World 3: Scorched Sands (Senior)

| Attribute | Value |
|-----------|-------|
| **Theme** | Desert / Earth / Endurance |
| **Color Palette** | Golds, browns, warm yellows |
| **Environment** | Digital desert, ancient code ruins, sandstorm data |
| **Ambient SFX** | Wind howling, sand shifting, ancient machinery |
| **Music** | Epic, adventurous chiptune with Middle Eastern influences |
| **Stages** | 60-80 |
| **Content Focus** | Advanced JavaScript, frameworks introduction, APIs |

**Visual Elements**:
- Pixel sandstorms
- Ancient code temples
- Solar-powered servers
- Golden data oases

### 🟢 World 4: Eden Protocol (Hero)

| Attribute | Value |
|-----------|-------|
| **Theme** | Nature / Peace / Mastery |
| **Color Palette** | Vibrant greens, soft whites, natural tones |
| **Environment** | Restored digital paradise, harmonious code gardens |
| **Ambient SFX** | Birds chirping, gentle streams, peaceful data flow |
| **Music** | Triumphant, serene chiptune with orchestral elements |
| **Stages** | 60-80 |
| **Content Focus** | Full-stack concepts, performance optimization, deployment |

**Visual Elements**:
- Flourishing code trees
- Crystal-clear data streams
- Harmonious server ecosystems
- Green restoration particles

---

# 7. Stage Structure

## 7.1 Stage Composition

Each stage in Code Souls follows a consistent structure designed for optimal learning and engagement.

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    STAGE STRUCTURE                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │              📖 DOCUMENTATION PANEL               │ │
│  │  • Topic overview                                 │ │
│  │  • Code examples                                  │ │
│  │  • Key concepts                                   │ │
│  │  • "Read Before Starting" section                │ │
│  └───────────────────────────────────────────────────┘ │
│                          │                              │
│                          ▼                              │
│  ┌───────────────────────────────────────────────────┐ │
│  │              ⚔️ CHALLENGE SECTION                 │ │
│  │                                                   │ │
│  │  Challenge 1 ──▶ Challenge 2 ──▶ Challenge 3     │ │
│  │  (HTML/CSS)      (CSS/JS)        (Combined)      │ │
│  │                                                   │ │
│  └───────────────────────────────────────────────────┘ │
│                          │                              │
│                          ▼                              │
│  ┌───────────────────────────────────────────────────┐ │
│  │              🏆 REWARDS SCREEN                    │ │
│  │  • Stars earned                                   │ │
│  │  • Gold coins                                     │ │
│  │  • Diamonds (if timer beaten)                    │ │
│  │  • Items dropped                                  │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
\`\`\`

## 7.2 Stage Preview Screen

Before entering any stage, players see a comprehensive preview:

| Element | Description | UI Component |
|---------|-------------|--------------|
| **Stage Name** | Descriptive title | Header with pixel font |
| **Learning Objectives** | What skills will be gained | Bulleted list |
| **Rewards Preview** | Potential gold, items | Icon grid |
| **Required IQ** | Minimum IQ to attempt | IQ badge |
| **Required Stars** | Stars from previous stage | Star display |
| **Difficulty Rating** | 1-5 skull icons | Difficulty meter |
| **Recommended Items** | Helpful items for this stage | Item cards |
| **Environment Preview** | Thumbnail of stage aesthetic | Pixel art preview |
| **Estimated Time** | Expected completion time | Timer icon + text |

## 7.3 Star System

Each stage contains 3 challenges, and each challenge awards 1-3 stars based on performance.

| Performance | Stars Awarded | Criteria |
|-------------|---------------|----------|
| **Perfect** | ⭐⭐⭐ | Correct solution + optimal code + fast completion |
| **Good** | ⭐⭐ | Correct solution + reasonable time |
| **Passing** | ⭐ | Correct solution (any time/quality) |
| **Failed** | ☆ | Incorrect or incomplete solution |

**Progression Requirement**: Minimum 2 stars per challenge (6 total) to unlock next stage.

**Bonus**: Achieving 3 stars on all challenges = +10 Gold Coins

## 7.4 Timer System

| World/Difficulty | Base Timer | Notes |
|------------------|------------|-------|
| **Beginner** | 8-10 minutes | Per challenge |
| **Intermediate** | 12-15 minutes | Per challenge |
| **Senior** | 18-22 minutes | Per challenge |
| **Hero** | 25-30 minutes | Per challenge |

**Timer Mechanics**:
- Visible countdown during challenge
- Warning at 25% time remaining
- Beating timer = +1 Diamond
- Timer expiration = No rewards (but can still complete)

---

# 8. Documentation System

## 8.1 Documentation Panel Structure

Every stage includes a comprehensive documentation panel that must be reviewed before attempting challenges.

\`\`\`
┌─────────────────────────────────────────────────────────┐
│               📖 DOCUMENTATION PANEL                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  📌 READ BEFORE STARTING                        │   │
│  │  ─────────────────────────────────────────────  │   │
│  │  This stage covers [TOPIC]. Make sure you       │   │
│  │  understand the following concepts before       │   │
│  │  proceeding to the challenges.                  │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  📚 TOPIC OVERVIEW                              │   │
│  │  ─────────────────────────────────────────────  │   │
│  │  [Detailed explanation of the concept]          │   │
│  │  [Why it matters in front-end development]      │   │
│  │  [Real-world applications]                      │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  💻 CODE EXAMPLES                               │   │
│  │  ─────────────────────────────────────────────  │   │
│  │  ```html                                        │   │
│  │  <!-- Example code with syntax highlighting --> │   │
│  │  <div class="example">                         │   │
│  │    <p>Hello, World!</p>                        │   │
│  │  </div>                                         │   │
│  │  ```                                            │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  🔑 KEY CONCEPTS                                │   │
│  │  ─────────────────────────────────────────────  │   │
│  │  • Concept 1: [Brief explanation]               │   │
│  │  • Concept 2: [Brief explanation]               │   │
│  │  • Concept 3: [Brief explanation]               │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  💡 PRO TIPS                                    │   │
│  │  ─────────────────────────────────────────────  │   │
│  │  [Industry best practices and shortcuts]        │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│           [ ✅ I've Read This - Start Challenge ]       │
│                                                         │
└─────────────────────────────────────────────────────────┘
\`\`\`

## 8.2 Documentation Content by World

### World 1: Beginner Topics

| Stage Range | Topics Covered |
|-------------|----------------|
| 1-15 | HTML basics, document structure, semantic tags |
| 16-30 | HTML forms, tables, media elements |
| 31-45 | CSS fundamentals, selectors, box model |
| 46-60 | CSS colors, typography, units |
| 61-80 | CSS layout basics, positioning, display |

### World 2: Intermediate Topics

| Stage Range | Topics Covered |
|-------------|----------------|
| 1-20 | CSS Flexbox, Grid fundamentals |
| 21-40 | Responsive design, media queries |
| 41-55 | JavaScript basics, variables, data types |
| 56-70 | JavaScript functions, control flow |
| 71-80 | DOM manipulation basics |

### World 3: Senior Topics

| Stage Range | Topics Covered |
|-------------|----------------|
| 1-20 | Advanced DOM, events, event delegation |
| 21-40 | Asynchronous JavaScript, Promises, async/await |
| 41-55 | APIs, fetch, HTTP methods |
| 56-70 | Modern JavaScript (ES6+), modules |
| 71-80 | Introduction to frameworks (React basics) |

### World 4: Hero Topics

| Stage Range | Topics Covered |
|-------------|----------------|
| 1-20 | React components, state, props |
| 21-40 | React hooks, context, routing |
| 41-55 | State management, performance optimization |
| 56-70 | Testing, debugging, DevTools |
| 71-80 | Build tools, deployment, CI/CD |

---

# 9. Challenge System

## 9.1 Challenge Types

| Type | Description | Editor Mode |
|------|-------------|-------------|
| **HTML Only** | Structure and semantic markup challenges | HTML editor |
| **CSS Only** | Styling and layout challenges | CSS editor (HTML provided) |
| **HTML + CSS** | Combined structure and styling | Split editor |
| **JavaScript** | Logic and interactivity (World 2+) | JS editor |
| **Full Stack** | Combined HTML/CSS/JS (World 3+) | Multi-file editor |

## 9.2 Challenge Interface

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│  ⚔️ CHALLENGE 1 of 3                    ⏱️ 08:42 remaining      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────┬─────────────────────────────┐ │
│  │      📝 INSTRUCTIONS        │       👁️ PREVIEW           │ │
│  │  ─────────────────────────  │  ─────────────────────────  │ │
│  │                             │                             │ │
│  │  Create a navigation bar    │  ┌─────────────────────┐   │ │
│  │  with the following:        │  │   [Live Preview]    │   │ │
│  │                             │  │                     │   │ │
│  │  • A logo on the left       │  │   Your code renders │   │ │
│  │  • 4 navigation links       │  │   here in real-time │   │ │
│  │  • A CTA button on right    │  │                     │   │ │
│  │                             │  └─────────────────────┘   │ │
│  │  Expected output shown →    │                             │ │
│  │                             │  ┌─────────────────────┐   │ │
│  └─────────────────────────────┤  │  [Expected Output]  │   │ │
│                                │  │                     │   │ │
│  ┌─────────────────────────────┤  │   Target design to  │   │ │
│  │      💻 CODE EDITOR         │  │   match             │   │ │
│  │  ─────────────────────────  │  │                     │   │ │
│  │                             │  └─────────────────────┘   │ │
│  │  1 │ <!DOCTYPE html>        │                             │ │
│  │  2 │ <html>                 │                             │ │
│  │  3 │   <head>               │                             │ │
│  │  4 │     |                  │                             │ │
│  │  5 │                        │                             │ │
│  │                             │                             │ │
│  └─────────────────────────────┴─────────────────────────────┘ │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  💊 Hint Potion (3 left)  │  ✅ Submit  │  ⏭️ Skip     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

## 9.3 Auto-Checking System

The platform uses an intelligent auto-checking system:

| Check Type | Description | Weight |
|------------|-------------|--------|
| **Structural** | Correct HTML elements and hierarchy | 40% |
| **Styling** | CSS properties match expected output | 30% |
| **Visual** | Rendered output matches target design | 20% |
| **Code Quality** | Clean, semantic, best practices | 10% |

## 9.4 Reward Distribution

| Condition | Reward |
|-----------|--------|
| Correct solution | 3-5 Gold Coins |
| 3 stars achieved | +10 Gold Coins (bonus) |
| Beat timer | +1 Diamond |
| Perfect stage (9 stars) | Chance for rare item drop |

---

# 10. Economy System

## 10.1 Currency Overview

\`\`\`
    💰 ECONOMY SYSTEM
    
    ┌─────────────────────────────────────────┐
    │                                         │
    │   🪙 GOLD COINS                         │
    │   ─────────────────                     │
    │   Common currency                       │
    │   Earned through:                       │
    │   • Stage completion                    │
    │   • Boss defeats                        │
    │   • Daily rewards                       │
    │   • Achievements                        │
    │                                         │
    │   Used for:                             │
    │   • Basic items                         │
    │   • Consumables                         │
    │   • Common cosmetics                    │
    │                                         │
    ├─────────────────────────────────────────┤
    │                                         │
    │   💎 DIAMONDS                           │
    │   ─────────────────                     │
    │   Premium currency                      │
    │   Earned through:                       │
    │   • Beating timers                      │
    │   • Rare achievements                   │
    │   • Special events                      │
    │   • Multiplayer victories               │
    │                                         │
    │   Used for:                             │
    │   • Exclusive items                     │
    │   • Premium cosmetics                   │
    │   • Powerful consumables                │
    │   • Shortcuts (optional)                │
    │                                         │
    └─────────────────────────────────────────┘
\`\`\`

## 10.2 Earning Rates

| Activity | Gold Earned | Diamonds Earned |
|----------|-------------|-----------------|
| Stage completion | 3-5 | 0 |
| 3-star bonus | +10 | 0 |
| Beat timer | 0 | +1 |
| Mini Boss defeat | 20-50 | 1-3 |
| Final Boss defeat | 100-200 | 10-20 |
| Daily login | 5-20 | 0-1 |
| Weekly streak | 50 | 5 |
| 1v1 victory | 10-30 | 0-2 |
| 5v5 victory | 50-100 | 5-10 |

---

# 11. Items & Store

## 11.1 Store Interface

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                        🛒 STORE                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [ All ] [ Clothing ] [ Weapons ] [ Consumables ] [ Special ]   │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  👕         │  │  ⚔️         │  │  🧪         │             │
│  │  Pixel Tee  │  │  Code Sword │  │  Hint Potion│             │
│  │             │  │             │  │             │             │
│  │  🪙 50      │  │  🪙 200     │  │  🪙 30      │             │
│  │  [ BUY ]    │  │  [ BUY ]    │  │  [ BUY ]    │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  🎭         │  │  ❤️         │  │  ⭐         │             │
│  │  Rare Mask  │  │  Health Pot │  │  Lucky Charm│             │
│  │  💎 ONLY    │  │             │  │             │             │
│  │  💎 25      │  │  🪙 25      │  │  💎 15      │             │
│  │  [ BUY ]    │  │  [ BUY ]    │  │  [ BUY ]    │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

## 11.2 Item Categories

### Clothing (Cosmetic)

| Item | Price | Description |
|------|-------|-------------|
| Pixel Tee | 🪙 50 | Basic outfit |
| Developer Hoodie | 🪙 150 | Cool hoodie |
| Elite Cloak | 💎 30 | Rare cosmetic |
| Legendary Armor | 💎 100 | Ultra-rare outfit |

### Weapons (Cosmetic + Minor Stats)

| Item | Price | Effect |
|------|-------|--------|
| Code Sword | 🪙 200 | +2% gold drops |
| Debug Dagger | 🪙 300 | +5% hint effectiveness |
| Syntax Staff | 💎 50 | +3% XP gain |
| Legendary Blade | 💎 150 | +5% all bonuses |

### Consumables

| Item | Price | Effect |
|------|-------|--------|
| Hint Potion | 🪙 30 | Reveals 1 hint |
| Health Potion | 🪙 25 | Restores 50 HP |
| Time Extender | 💎 10 | +3 minutes on timer |
| Shield Scroll | 💎 15 | Prevents 1 HP loss |

### Stat-Boost Items

| Item | Price | Effect | Duration |
|------|-------|--------|----------|
| Lucky Charm | 💎 15 | +10% item drop rate | 1 hour |
| Focus Crystal | 🪙 100 | +1 star bonus | 3 stages |
| Wisdom Scroll | 💎 20 | +2 IQ on next boss | Single use |

---

# 12. Boss Systems

## 12.1 Mini Boss System

Mini Bosses appear every 5-9 stages, serving as skill checkpoints.

\`\`\`
    ⚔️ MINI BOSS ENCOUNTER
    
    ┌─────────────────────────────────────────┐
    │                                         │
    │         👾 [BOSS NAME]                  │
    │         Level: [X]                      │
    │         Type: [Category]                │
    │                                         │
    │    ████████████████████  HP: 100%       │
    │                                         │
    │    Challenge: [Special coding task]     │
    │    Difficulty: ⭐⭐⭐⭐☆                 │
    │    Time Limit: 15:00                    │
    │                                         │
    │    Rewards:                             │
    │    • 🪙 30-50 Gold                      │
    │    • 🧠 +3-5 IQ                         │
    │    • 📦 Rare Item (chance)              │
    │                                         │
    └─────────────────────────────────────────┘
\`\`\`

### Mini Boss Difficulty Scaling

| Factor | Influence |
|--------|-----------|
| Player IQ | Higher IQ = harder boss |
| Items Owned | More items = slightly harder |
| Performance | Better performance = harder |
| World Level | Base difficulty per world |

### Mini Boss Types per World

| World | Boss Types |
|-------|------------|
| **Inferno Gate** | Corrupted Tags, Syntax Demons, Style Breakers |
| **Abyssal Depths** | Layout Leviathans, Responsive Krakens |
| **Scorched Sands** | Logic Serpents, Async Sphinxes |
| **Eden Protocol** | Framework Guardians, Performance Titans |

## 12.2 Final Boss System

Each World concludes with a Final Boss that requires completing a major project.

\`\`\`
    👹 FINAL BOSS - [WORLD NAME]
    
    ┌─────────────────────────────────────────────────────────┐
    │                                                         │
    │              🔥 [FINAL BOSS NAME] 🔥                    │
    │                                                         │
    │                    👿                                   │
    │               [Boss Sprite]                             │
    │                                                         │
    │    ██████████████████████████████  HP: 100%            │
    │                                                         │
    │    PROJECT CHALLENGE:                                   │
    │    ─────────────────                                    │
    │    Build [Project Name] from roadmap.sh                │
    │                                                         │
    │    Requirements:                                        │
    │    • [Requirement 1]                                    │
    │    • [Requirement 2]                                    │
    │    • [Requirement 3]                                    │
    │                                                         │
    │    Time Limit: 2-4 hours                                │
    │                                                         │
    │    REWARDS ON VICTORY:                                  │
    │    • 🌍 Unlock Next World                               │
    │    • 🪙 100-200 Gold                                    │
    │    • 💎 10-20 Diamonds                                  │
    │    • 📦 Rare/Legendary Item                             │
    │    • 📚 Knowledge Book                                  │
    │    • 🎁 Bonus Lesson                                    │
    │    • 🗺️ Next World Roadmap                              │
    │                                                         │
    └─────────────────────────────────────────────────────────┘
\`\`\`

### Final Boss Projects (from roadmap.sh/frontend/projects)

| World | Final Boss | Project |
|-------|------------|---------|
| **Beginner** | Inferno Lord | Personal Portfolio Page |
| **Intermediate** | Abyssal King | Responsive Dashboard Layout |
| **Senior** | Desert Emperor | Interactive Web Application |
| **Hero** | Digital Overlord | Full-Stack Application |

### Victory Cinematic Sequence

Upon defeating a Final Boss:

1. **Boss Defeat Animation** (3s): Boss pixel-art disintegrates
2. **Reward Reveal** (5s): Items and currencies appear one by one
3. **Knowledge Book** (10s): Summary document with learned concepts
4. **Bonus Lesson** (Optional): Special content (e.g., AI tools like v0)
5. **Gate Opening** (5s): Dramatic animation of next world's entrance
6. **World Reveal** (8s): Panoramic view of new world with fog clearing
7. **Roadmap Display** (10s): Overview of upcoming content

---

# 13. Multiplayer Modes

## 13.1 1v1 Mode

\`\`\`
    ⚔️ 1v1 DUEL
    
    ┌─────────────────────────────────────────────────────────┐
    │                                                         │
    │   [Player 1]            VS            [Player 2]        │
    │   👤 Username1                        👤 Username2      │
    │   🧠 IQ: 105                          🧠 IQ: 108        │
    │                                                         │
    │   ┌───────────────────┐  ┌───────────────────┐         │
    │   │  Problems: 3/5    │  │  Problems: 2/5    │         │
    │   │  ⏱️ 12:34         │  │  ⏱️ 12:34         │         │
    │   └───────────────────┘  └───────────────────┘         │
    │                                                         │
    │   ═══════════════════════════════════════════          │
    │                                                         │
    │   CHALLENGE: Solve 5 problems                          │
    │   WINNER: Most correct solutions when time ends        │
    │   STAKES: Winner takes 1 item from loser               │
    │           (same-level items only)                      │
    │                                                         │
    └─────────────────────────────────────────────────────────┘
\`\`\`

### 1v1 Rules

| Rule | Description |
|------|-------------|
| **Matchmaking** | Based on IQ level (±10 IQ range) |
| **Challenge Count** | 5 problems per match |
| **Time Limit** | 30 minutes total |
| **Victory Condition** | Most problems solved correctly |
| **Tiebreaker** | Faster total completion time |
| **Stakes** | Winner claims 1 item from loser (same tier) |
| **Forfeit** | Counts as loss, item forfeited |

## 13.2 5v5 Mode

\`\`\`
    🏆 5v5 TEAM BATTLE
    
    ┌─────────────────────────────────────────────────────────┐
    │                                                         │
    │   TEAM ALPHA                    TEAM OMEGA              │
    │   ──────────                    ──────────              │
    │   👤 Player1 (Lead)             👤 Player6 (Lead)       │
    │   👤 Player2                    👤 Player7              │
    │   👤 Player3                    👤 Player8              │
    │   👤 Player4                    👤 Player9              │
    │   👤 Player5                    👤 Player10             │
    │                                                         │
    │   Team IQ: 520                  Team IQ: 515            │
    │                                                         │
    │   ═══════════════════════════════════════════          │
    │                                                         │
    │   PROJECT CHALLENGE:                                    │
    │   Build [Complex Project Name]                         │
    │                                                         │
    │   Requirements:                                         │
    │   • Multiple frameworks/libraries                      │
    │   • Advanced features                                   │
    │   • Collaborative code                                  │
    │                                                         │
    │   TIME LIMIT: 1 day - 1 week                           │
    │   (Timer continues offline)                            │
    │                                                         │
    └─────────────────────────────────────────────────────────┘
\`\`\`

### 5v5 Rules

| Rule | Description |
|------|-------------|
| **Team Formation** | 5 players, balanced by average IQ |
| **Project Scope** | Complex, multi-feature application |
| **Technologies** | Multiple tools, libraries, languages |
| **Time Limit** | 1 day to 1 week (configurable) |
| **Timer Behavior** | Continues even when players offline |
| **Scoring** | Based on: functionality, code quality, complexity, design |
| **Victory Rewards** | Gold, Diamonds, exclusive team items |

### Scoring Criteria

| Criteria | Weight | Description |
|----------|--------|-------------|
| **Functionality** | 40% | Does it work as specified? |
| **Code Quality** | 25% | Clean, readable, best practices |
| **Complexity** | 20% | Advanced features implemented |
| **Design** | 15% | Visual polish and UX |

---

# 14. UI/UX Breakdown

## 14.1 HUD (Heads-Up Display)

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│  HUD LAYOUT                                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌────────────────────────────────────────────────────────────┐│
│  │                                                            ││
│  │  👤 [Avatar]  Username123                                  ││
│  │                                                            ││
│  │  ❤️ ████████████░░░░  HP: 75/100                          ││
│  │  🧠 ████████░░░░░░░░  IQ: 105/160                         ││
│  │                                                            ││
│  │  🪙 1,250        💎 42                                    ││
│  │                                                            ││
│  │  [🎒 Items] [👥 Friends] [📨 Invite] [☰ Menu]             ││
│  │                                                            ││
│  └────────────────────────────────────────────────────────────┘│
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

### HUD Elements Specification

| Element | Position | Behavior |
|---------|----------|----------|
| **Avatar** | Top-left | Clickable → Profile |
| **Username** | Next to avatar | Display only |
| **HP Bar** | Below avatar | Animated on change, red pulse when low |
| **IQ Bar** | Below HP | Animated on increase, glow effect |
| **Gold Counter** | Below stats | Animated increment |
| **Diamond Counter** | Next to gold | Sparkle effect on gain |
| **Items Button** | Bottom row | Opens inventory modal |
| **Friends Button** | Bottom row | Opens friends list |
| **Invite Button** | Bottom row | Opens invite modal |
| **Menu Button** | Bottom row | Opens settings/options |

## 14.2 World Map Interface

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│  WORLD MAP                                                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│    Background: [World-specific parallax pixel art]              │
│                                                                 │
│    Path Layout:                                                 │
│    ─────────────                                                │
│                    ☁️ [Mini Boss - Stage 15]                    │
│                   /                                             │
│          ○───○───○                                              │
│         /         \                                             │
│    ○───○           ○───○───○                                    │
│    1   2           10  11  12                                   │
│    ⭐⭐⭐ ⭐⭐☆                                                  │
│                                                                 │
│    Legend:                                                      │
│    ○ = Completed stage (shows stars below)                     │
│    ◉ = Current stage (glowing)                                 │
│    🔒 = Locked stage                                            │
│    ☁️ = Mini Boss node (larger, unique shape)                   │
│    👹 = Final Boss (end of path)                                │
│    ─── = Dotted path line                                       │
│                                                                 │
│    Interactions:                                                │
│    • Tap stage → Stage Preview modal                           │
│    • Swipe/drag → Pan map                                      │
│    • Pinch → Zoom                                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

## 14.3 Stage Button Design

\`\`\`
    STAGE NODE STATES
    
    ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
    │             │  │             │  │             │
    │      5      │  │      6      │  │     🔒      │
    │             │  │     ◉       │  │             │
    │   ⭐⭐⭐    │  │   Current   │  │   Locked    │
    │  Completed  │  │   (Glow)    │  │             │
    └─────────────┘  └─────────────┘  └─────────────┘
    
    Mini Boss Node:
    ┌─────────────────┐
    │    ☁️           │
    │   MINI BOSS     │
    │   [Boss Icon]   │
    │                 │
    └─────────────────┘
\`\`\`

## 14.4 Navigation Flow

\`\`\`
    📱 NAVIGATION STRUCTURE
    
    ┌─────────────┐
    │   Login     │
    └──────┬──────┘
           │
           ▼
    ┌─────────────┐
    │   Intro     │──────────────┐
    │  (First Time)              │
    └──────┬──────┘              │
           │                      │
           ▼                      ▼
    ┌─────────────┐        ┌─────────────┐
    │   Level     │        │  World Map  │◄────────┐
    │  Selection  │───────▶│   (Main)    │         │
    └─────────────┘        └──────┬──────┘         │
                                  │                 │
              ┌───────────────────┼─────────────┐  │
              │                   │             │  │
              ▼                   ▼             ▼  │
       ┌─────────────┐    ┌─────────────┐  ┌─────────────┐
       │    Store    │    │    Stage    │  │ Multiplayer │
       └─────────────┘    │   Preview   │  └─────────────┘
                          └──────┬──────┘
                                 │
                                 ▼
                          ┌─────────────┐
                          │   Stage     │
                          │  (Gameplay) │
                          └──────┬──────┘
                                 │
                                 ▼
                          ┌─────────────┐
                          │   Results   │─────────┘
                          └─────────────┘
\`\`\`

---

# 15. Animation & Visual Direction

## 15.1 Animation Principles

| Principle | Implementation |
|-----------|----------------|
| **Anticipation** | Button press indicators before actions |
| **Follow-through** | Overshoots on UI element appearances |
| **Easing** | Natural ease-in-out on all transitions |
| **Pixel Fidelity** | Animations respect pixel grid |

## 15.2 Core Animations

### Dialogue System (Undertale-Style)

\`\`\`typescript
// Typewriter Configuration
const typewriterConfig = {
  characterDelay: 30,  // ms between characters
  punctuationDelay: 150,  // ms for . , ! ?
  soundEffect: "dialogue_blip.wav",
  soundPitch: "varies_by_character"
};
\`\`\`

**Dialogue Box Specifications**:
- Black background with white pixel border
- Character portrait on left (animated expressions)
- Text appears character-by-character
- Sound plays per character (pitch varies by speaker)
- Player advances with tap/click/spacebar

### World Transitions

| Transition | Duration | Effect |
|------------|----------|--------|
| **Enter World** | 1.5s | Fade in with parallax reveal |
| **Exit World** | 1s | Fade out with blur |
| **Boss Gate** | 3s | Gate opening animation with particles |
| **Fog Clear** | 2s | New world gradually revealed |

### UI Animations

| Element | Animation | Duration |
|---------|-----------|----------|
| **Stage Node** | Pulse glow (current) | Loop |
| **Star Earn** | Pop + sparkle | 0.5s |
| **HP Change** | Bar slide + flash | 0.3s |
| **Gold Gain** | Number increment + shine | 0.4s |
| **Item Drop** | Fall + bounce | 0.6s |
| **Button Press** | Scale down → up | 0.15s |

## 15.3 Visual Style Guide

### Pixel Art Specifications

| Attribute | Value |
|-----------|-------|
| **Resolution** | 16x16, 32x32, 64x64 base sprites |
| **Color Depth** | Limited palette per world (12-16 colors) |
| **Outline** | 1px dark outline on sprites |
| **Anti-aliasing** | None (crisp pixels) |
| **Scaling** | Integer scaling only (2x, 3x, 4x) |

### World Color Palettes

**Inferno Gate (Red)**:
\`\`\`
Primary:   #FF4136 (Fire Red)
Secondary: #FF851B (Orange)
Dark:      #85144b (Deep Crimson)
Accent:    #FFDC00 (Flame Yellow)
\`\`\`

**Abyssal Depths (Blue)**:
\`\`\`
Primary:   #0074D9 (Ocean Blue)
Secondary: #7FDBFF (Aqua)
Dark:      #001f3f (Deep Navy)
Accent:    #39CCCC (Teal)
\`\`\`

**Scorched Sands (Yellow)**:
\`\`\`
Primary:   #FFDC00 (Sand Gold)
Secondary: #FF851B (Sunset Orange)
Dark:      #8B4513 (Earth Brown)
Accent:    #F4D03F (Light Gold)
\`\`\`

**Eden Protocol (Green)**:
\`\`\`
Primary:   #2ECC40 (Nature Green)
Secondary: #01FF70 (Bright Green)
Dark:      #3D9970 (Forest)
Accent:    #FFFFFF (Pure White)
\`\`\`

---

# 16. Sound Design

## 16.1 Audio Categories

| Category | Description | Format |
|----------|-------------|--------|
| **Music** | Background tracks per world | .ogg (loop) |
| **SFX** | UI interactions, actions | .wav |
| **Ambient** | Environmental sounds | .ogg (loop) |
| **Voice** | Dialogue blips (no voice acting) | .wav |

## 16.2 Music Specifications

| World | Style | BPM | Key | Mood |
|-------|-------|-----|-----|------|
| **Inferno Gate** | Intense chiptune | 140 | D minor | Urgent, dangerous |
| **Abyssal Depths** | Mysterious chiptune | 90 | E minor | Mysterious, flowing |
| **Scorched Sands** | Epic chiptune | 120 | A major | Adventurous, vast |
| **Eden Protocol** | Triumphant chiptune | 100 | C major | Peaceful, victorious |

### Additional Tracks

| Context | Style |
|---------|-------|
| **Boss Battle** | Intense, faster BPM, dramatic |
| **Victory** | Triumphant fanfare |
| **Defeat** | Somber, short |
| **Store** | Upbeat, commercial |
| **Multiplayer** | Competitive, energetic |

## 16.3 Sound Effects Library

| Action | Sound |
|--------|-------|
| **Button Click** | Pixel "click" |
| **Star Earn** | Chime + sparkle |
| **Gold Collect** | Coin jingle |
| **Diamond Collect** | Crystal shimmer |
| **HP Loss** | Low thud + crack |
| **HP Gain** | Healing chime |
| **IQ Increase** | Brain power-up |
| **Level Complete** | Success fanfare |
| **Boss Appear** | Dramatic sting |
| **Typing** | Keyboard clicks |
| **Error** | Buzz/wrong sound |
| **Correct** | Success ding |

## 16.4 Ambient Sounds

| World | Ambient Elements |
|-------|------------------|
| **Inferno Gate** | Crackling flames, rumbling, digital distortion |
| **Abyssal Depths** | Bubbles, sonar, deep currents |
| **Scorched Sands** | Wind, sand shifting, distant machinery |
| **Eden Protocol** | Birds, streams, gentle breeze |

---

# 17. World Map Layout

## 17.1 Map Structure

\`\`\`
    🗺️ WORLD MAP LAYOUT
    
    ┌─────────────────────────────────────────────────────────┐
    │                                                         │
    │  WORLD: [World Name]                    [World Selector]│
    │                                                         │
    │  ════════════════════════════════════════════════════  │
    │                                                         │
    │     Stage Layout (Example - 20 stages shown):          │
    │                                                         │
    │                        👹                               │
    │                       /  FINAL                          │
    │                    19○    BOSS                          │
    │                   /                                     │
    │               18○                                       │
    │              /                                          │
    │          17○───16○                                      │
    │         /                                               │
    │     ☁️15 (MINI BOSS)                                    │
    │    /                                                    │
    │  14○───13○───12○                                        │
    │              /                                          │
    │          11○                                            │
    │         /                                               │
    │     10○───9○                                            │
    │         /                                               │
    │     ☁️8 (MINI BOSS)                                     │
    │    /                                                    │
    │   7○───6○───5○                                          │
    │            /                                            │
    │        4○                                               │
    │       /                                                 │
    │   3○───2○───1○ (START)                                  │
    │                                                         │
    │  [HUD at bottom]                                        │
    │                                                         │
    └─────────────────────────────────────────────────────────┘
\`\`\`

## 17.2 Map Interaction Design

| Interaction | Action |
|-------------|--------|
| **Tap Stage** | Open Stage Preview modal |
| **Tap Mini Boss** | Open Boss Preview modal |
| **Tap Final Boss** | Open Final Boss modal |
| **Drag/Swipe** | Pan map |
| **Pinch (Mobile)** | Zoom in/out |
| **Scroll (Desktop)** | Pan map |
| **World Selector** | Switch between unlocked worlds |

## 17.3 Visual Layers

| Layer | Content | Parallax Speed |
|-------|---------|----------------|
| **Background (Far)** | Sky/environment | 0.2x |
| **Midground** | Environmental elements | 0.5x |
| **Path Layer** | Dotted lines, stage nodes | 1x (static) |
| **Foreground** | Decorative elements | 1.2x |
| **UI Layer** | HUD, buttons | Fixed |

---

# 18. Final Notes

## 18.1 Development Priorities

| Priority | Feature | Rationale |
|----------|---------|-----------|
| **P0 (Critical)** | Auth, Core Loop, Stage System | Foundation of gameplay |
| **P1 (High)** | World 1 Content, Documentation | Complete beginner experience |
| **P2 (Medium)** | Store, Boss System | Engagement mechanics |
| **P3 (Lower)** | Multiplayer, Worlds 2-4 | Expansion content |

## 18.2 Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Daily Active Users** | Growth | Analytics |
| **Session Length** | 20+ minutes | Time tracking |
| **Stage Completion Rate** | >70% | Completion data |
| **Return Rate** | >40% next-day | Cohort analysis |
| **Learning Progress** | Measurable skill gain | Skill assessments |

## 18.3 Future Considerations

- **Mobile Native Apps**: iOS and Android versions
- **Additional Worlds**: Backend, DevOps, Mobile development paths
- **Community Features**: User-generated challenges, forums
- **Certification**: Industry-recognized completion certificates
- **Enterprise**: Team/company learning programs

## 18.4 Legal & Compliance

- User data handled per GDPR/CCPA requirements
- Age-appropriate content (PEGI 3 / ESRB E equivalent)
- Accessibility compliance (WCAG 2.1 AA target)
- Terms of Service and Privacy Policy required

---

## Document Information

| Field | Value |
|-------|-------|
| **Document Version** | 1.0 |
| **Last Updated** | December 2025 |
| **Status** | Complete |
| **Confidentiality** | Internal |

---

*This Game Design Document serves as the comprehensive blueprint for Code Souls development. All features, systems, and specifications outlined herein are final and should be implemented as described without addition, removal, or modification of gameplay elements.*

---

**END OF DOCUMENT**
