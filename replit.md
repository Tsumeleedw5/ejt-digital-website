# EJT Digital Website

## Overview

High-converting landing page website for EJT Digital — a brand scaling agency (SMMA) that builds systems for small businesses. Tagline: "etched into reality."

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite (artifacts/ejt-digital)
- **API framework**: Express 5 (artifacts/api-server)
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **UI**: Tailwind CSS v4, shadcn/ui, Radix UI, Framer Motion

## Website Features

- Full-page landing site with 7-9 sections
- Dark, cinematic brand aesthetic matching EJT Digital brand system
- Brand colors: Pure Black (#111111), Dark Grey (#3A3A3A), Mid Grey (#9A9A9A), Off White (#F4F4F2)
- Fonts: Playfair Display (display/serif), Inter (body)
- Services: Websites, Social Media, Brand Strategy, Ads & Client Acquisition
- Working contact form (name, email, phone, business name, service, message)
- Contact info: 067 007 0229 | ejtdigital19@gmail.com
- Framer Motion scroll animations

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Database Schema

- `contacts` — stores contact form submissions (name, email, phone, businessName, service, message, createdAt)

## API Endpoints

- `GET /api/healthz` — health check
- `POST /api/contact` — submit contact form enquiry

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
