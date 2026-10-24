<div align="center">

# Footnote

**A writing and reading platform for essays, poetry and stories, with an AI writing assistant, music pairing and reading trails.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=nextdotjs)](https://nextjs.org)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-000000?style=flat-square&logo=threedotjs)](https://threejs.org)
[![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-88ce02?style=flat-square&logo=greensock&logoColor=black)](https://gsap.com)
[![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47a248?style=flat-square&logo=mongodb&logoColor=white)](https://mongoosejs.com)
[![Gemini](https://img.shields.io/badge/Gemini-2.5_Flash-4285f4?style=flat-square&logo=googlegemini&logoColor=white)](https://ai.google.dev)
[![Stripe](https://img.shields.io/badge/Stripe-Billing-635bff?style=flat-square&logo=stripe&logoColor=white)](https://stripe.com)

</div>

---

## Overview

Footnote is a home for long-form writing that is meant to be *felt*, not skimmed.
Writers build pieces from typed blocks (paragraph, poetry, quote, image, music,
heading) and can attach real footnotes. Readers follow curated **reading trails**.
The landing page is a scroll-driven 3D vinyl record player.

## Features

**Writing**
- Block-based editor with paragraph, poetry, quote, image, music and heading blocks, plus inline footnotes
- Drafts, scheduled publishing, and **version history with one-click restore**
- **AI writing assistant (Gemini 2.5 Flash).** It drafts a piece from a prompt and
  tone, and falls back to genre-based templates when no API key is set or the free
  tier's rate limit is hit
- **AI cover and music suggestions** that pair a piece with matching artwork and a soundtrack from curated catalogues
- Cover image uploads (Multer)

**Reading**
- Explore feed, article pages and author profiles with pinned articles
- **Reading trails**: curated sequences of articles
- Reading-time tracking and per-user reading statistics

**Accounts and billing**
- JWT authentication with bcrypt-hashed passwords
- Author subscriptions
- **Stripe Checkout and Customer Portal** for premium plans, with a webhook endpoint

**Landing page**
- A 3D vinyl record and tonearm rendered with React Three Fiber, animated by GSAP
  ScrollTrigger, with Lenis smooth scrolling

## Architecture

```
┌────────────────────────────┐        ┌──────────────────────────────┐
│  nextjs-app/  (port 8080)  │  REST  │  backend/  Express 5 (5001)  │
│  • 3D vinyl landing (R3F)  │ ─────► │  • /api/auth  /api/articles  │
│  • app pages in public/    │        │  • /api/users /api/trails    │
│                            │        │  • /api/billing  /api-docs   │
└────────────────────────────┘        │  • Stripe webhook            │
                                      └──────┬──────────┬────────────┘
                                             │          │
                                       MongoDB      Gemini · Stripe
```

The `frontend/` folder holds the original Vite build of the pages. The live app is
served from `nextjs-app/`.

## API overview

| Area | Endpoints |
|---|---|
| Auth | `POST /api/auth/signup`, `POST /api/auth/login`, `GET /api/auth/me`, `POST /api/auth/subscribe` |
| Articles | CRUD on `/api/articles`, `GET /drafts`, `POST /generate` (AI), `GET /music-suggestions`, `GET /cover-suggestions`, `GET /:id/versions`, `POST /:id/restore`, `POST /publish-scheduled` |
| Users | `GET /api/users/:id`, `PUT /:id/profile`, `PUT /:id/pinned`, `GET /:id/reading-stats` |
| Trails | CRUD on `/api/trails` |
| Billing | `POST /api/billing/create-checkout-session`, `POST /api/billing/create-portal-session`, `POST /api/billing/webhook` |

Interactive Swagger docs are at **`http://localhost:5001/api-docs`**.

## Getting started

```bash
git clone https://github.com/shak5hi/footnote.git
cd footnote

# Backend
cd backend
cp .env.example .env       # MONGO_URI, JWT_SECRET, GEMINI_API_KEY, STRIPE_* keys
npm install
npm run dev                # http://localhost:5001

# Frontend (new terminal)
cd ../nextjs-app
npm install
npm run dev                # http://localhost:8080
```

Without a Gemini key the AI assistant uses its template fallback, and without a Stripe
key billing is turned off instead of crashing, so the app runs locally with only
MongoDB.

## Tech stack

Next.js 16 · React 19 · React Three Fiber / drei · Three.js · GSAP · Lenis ·
Node.js · Express 5 · MongoDB / Mongoose · JWT · bcrypt · Multer · Google Gemini ·
Stripe · Swagger

## Team

Built by [Shakshi Sharma](https://github.com/shak5hi) and [Aadya Gupta](https://github.com/aadya197).

**My work:** the 3D vinyl landing page (R3F + GSAP scroll rig), the dashboard, the
login and signup experience, the Gemini integration and its fallback, the move of all
pages onto Next.js, and stability fixes across the backend (environment loading, JWT
and Stripe startup).
