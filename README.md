# EduPlayo (eduplayo.fun)

> **"Learn It. Play It. Master It."**
> A premium, production-oriented gamified learning platform for school students, featuring NCERT/CBSE-aligned interactive learning games, practice questions, daily challenges, and rewards.

---

## 1. Project Overview

**EduPlayo** is an educational platform designed to make foundational school concepts intuitive and anxiety-free through play. Instead of static quizzes or textbook scans, learners interact with concrete manipulatives (apples, stars, trains, number cards) to develop deep conceptual understanding.

- **Intended Domain:** `eduplayo.fun`
- **Initial Pilot Focus:** Class 1 Mathematics (Joyful Mathematics syllabus: Numbers and Counting 1–9)
- **Architecture:** Expandable to Classes 2–12, competitive examinations (SSC, Railway), and additional subjects (English, Hindi, EVS, Science).
- **Zero Third-Party Cost:** Runs 100% locally in the browser with no required paid database or API dependencies for core gameplay.

---

## 2. Key Features

1. **Three Playable Educational Games:**
   - **Count the Objects (`count-objects`):** Interactive group counting with visual highlights, supportive feedback, and randomized sets.
   - **Number Matching (`number-matching`):** Tap-to-select matching between numerals and illustrated item collections with duplicate-scoring prevention.
   - **Number Order Train (`number-order`):** Ascending sequence puzzle with accessible arrow shift and swap controls.
2. **Concept Practice & Revision:** Step-by-step practice quizzes with immediate feedback and visual number line explorer.
3. **Daily Challenges & Streaks:** Deterministic daily missions that award bonus XP and track learner streaks.
4. **Local Gamification & Rewards:**
   - Versioned local storage schema (`eduplayo_progress_v1`)
   - XP, Learner Levels, Badges, and High Scores
   - Progress reset with confirmation modal
5. **English & Hindi Language Switch:** Complete translation dictionary for all primary UI labels and feedback messages.
6. **Accessible Audio Synthesizer:** Built-in Web Audio API tone generator (chimes, gentle hints, victory fanfares) with global mute toggle. No external MP3 files to break or lag.
7. **Production SEO & Vercel SPA Fallback:** Structured JSON-LD schema, canonical tags, `sitemap.xml`, `robots.txt`, and `vercel.json` rewrites.
8. **Child Safety by Design:** Minimum data collection, no accounts required to play, no public chats, and disabled-by-default ad placeholders.

---

## 3. Technology Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite
- **Styling:** Tailwind CSS (v4)
- **Routing:** React Router v7
- **Icons:** Lucide React
- **Audio:** Browser Web Audio API (Synthesizer)
- **Confetti:** `canvas-confetti` (with `prefers-reduced-motion` compliance)

---

## 4. Project Folder Structure

```
eduplayo/
├── public/
│   ├── robots.txt              # Search engine crawler permissions
│   ├── sitemap.xml             # XML sitemap with all core routes
│   └── assets/                 # Brand and educational assets
├── src/
│   ├── components/
│   │   ├── cards/              # ClassCard, SubjectCard, ChapterCard, GameCard
│   │   ├── common/             # Header, Footer, Logo, AnnouncementStrip, BadgeModal, ResetModal, AdBanner
│   │   ├── games/              # CountObjectsGame, NumberMatchingGame, NumberOrderGame
│   │   └── practice/           # QuestionCard with hints and visual manipulatives
│   ├── context/
│   │   ├── LanguageContext.tsx # English / Hindi dictionary and persistence
│   │   ├── ProgressContext.tsx # LocalStorage progress, XP, badges, streaks
│   │   └── SoundContext.tsx    # Audio preferences and trigger bindings
│   ├── data/
│   │   └── curriculum.ts       # Central curriculum data, pilot chapter, challenges, badges
│   ├── pages/                  # 17 routed pages (Home, Classes, Subject, Chapter, Game, Legal, etc.)
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   ├── utils/
│   │   ├── audio.ts            # Web Audio API synthesizer
│   │   └── confetti.ts         # Lightweight celebration helper
│   ├── App.tsx                 # Master router and providers
│   ├── main.tsx                # React DOM entry point
│   └── index.css               # Tailwind CSS and global base styles
├── index.html                  # HTML entry point, SEO meta, JSON-LD Schema
├── package.json                # Project dependencies and build scripts
├── tsconfig.json               # TypeScript compiler configuration
├── vercel.json                 # Vercel SPA rewrite fallback configuration
├── vite.config.ts              # Vite build setup
└── README.md                   # Complete deployment and maintenance guide
```

---

## 5. Local Development Instructions

### Step 1: Install Dependencies
Open your terminal in the project directory and run:
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```
The server will start on `http://localhost:3000` (or the port specified in terminal output).

### Step 3: Run Production Build Locally
Verify that compilation and asset bundling succeed with zero errors:
```bash
npm run build
```

---

## 6. How to Deploy to GitHub and Vercel

### Step A: Upload Source Code to GitHub

1. If you haven't initialized Git yet:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: EduPlayo learning platform"
   ```
2. Create a new repository on [GitHub](https://github.com/new) named `eduplayo` (set to Public or Private).
3. Link your local repository and push:
   ```bash
   git remote add origin https://github.com/<your-username>/eduplayo.git
   git branch -M main
   git push -u origin main
   ```

### Step B: Import and Deploy on Vercel

1. Log into [Vercel](https://vercel.com).
2. Click **Add New...** → **Project**.
3. Select your `eduplayo` GitHub repository and click **Import**.
4. Configure Project Settings:
   - **Framework Preset:** `Vite`
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Click **Deploy**. Vercel will build the project and provide a preview URL (e.g., `eduplayo-xxxx.vercel.app`).

The included `vercel.json` ensures that deep URLs like `/chapters/class-1-maths-counting` and `/games/count-objects` refresh correctly without 404 errors.

---

## 7. Connecting Your Custom Domain (`eduplayo.fun`)

Once your app is deployed on Vercel:

1. In your Vercel Dashboard, go to your project → **Settings** → **Domains**.
2. Enter `eduplayo.fun` and click **Add**.
3. Vercel will automatically generate the DNS records required for your domain.
4. Go to your domain registrar (e.g., Namecheap, Hostinger, GoDaddy, Cloudflare) and add the exact DNS records provided in your Vercel dashboard:
   - **For apex domain (`eduplayo.fun`):**
     - Type: `A`
     - Name: `@`
     - Value: `76.76.21.21`
   - **For www subdomain (`www.eduplayo.fun`):**
     - Type: `CNAME`
     - Name: `www`
     - Value: `cname.vercel-dns.com`
5. Wait a few minutes for DNS propagation. Vercel will automatically provision a free, auto-renewing SSL certificate (HTTPS).

---

## 8. How to Expand Content

### Adding a New Class
In `src/data/curriculum.ts`, locate the `CLASSES` array. Add or update a class entry:
```typescript
{
  id: 'class-2',
  number: 2,
  name: 'Class 2',
  nameHi: 'कक्षा 2',
  ageRange: '6–7 Years',
  description: 'Two-digit numbers, addition, subtraction, and reading.',
  descriptionHi: 'दो अंकों की संख्याएं, जोड़, घटाव और पठन।',
  isAvailable: true, // change from false to true when ready
  subjects: [ ... ]
}
```

### Adding a New Subject or Chapter
In `src/data/curriculum.ts`, define your chapter under the relevant subject:
```typescript
export const CLASS_2_MATHS_ADDITION: ChapterInfo = {
  id: 'class-2-maths-addition',
  classId: 'class-2',
  subjectId: 'maths',
  chapterNumber: 1,
  title: 'Addition up to 20',
  titleHi: '20 तक जोड़',
  // ... learning objectives, games, and practice questions
};
```

### Creating a New Game
1. Add game metadata to the chapter's `games` array in `src/data/curriculum.ts`.
2. Create an interactive React component in `src/components/games/` (e.g., `AdditionBlocksGame.tsx`).
3. Connect the component in `src/pages/GamePlayerPage.tsx`.

### Updating Translations
Open `src/context/LanguageContext.tsx` and add your keys to both `en` and `hi` dictionaries in `translations`.

---

## 9. Pre-Launch Checklist

- [ ] Purchase and verify ownership of domain `eduplayo.fun`.
- [ ] Connect Vercel project to `eduplayo.fun` and confirm DNS records.
- [ ] Update placeholder support emails in `src/pages/ContactPage.tsx` and `src/pages/PrivacyPolicyPage.tsx`.
- [ ] Verify that sound plays nicely across iOS and Android browsers.
- [ ] Run `npm run lint` and `npm run build` to confirm clean builds.

---

## 10. License & Attribution

- **Syllabus Reference:** Aligned with official NCERT Class 1 *Joyful Mathematics* learning outcomes.
- **Copyright:** © EduPlayo. All rights reserved.
