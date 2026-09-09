# EJT Digital — Deploy Checklist

Do these in order. Tick as you go. Everything else is already done in code.

---

## PHASE 1 — Third-party accounts (10 min)

- [ ] **EmailJS** — Sign in at [dashboard.emailjs.com](https://dashboard.emailjs.com)
  - Confirm the service, template, and public key already match what's in `contact.html`
  - **Account → Security → turn ON "Allow EmailJS API for specific domains"**
  - Add these domains: `ejtdigital.co.za`, `www.ejtdigital.co.za`, `*.netlify.app`
  - Save
  - *Why this matters: without a domain allowlist, anyone who views the site's source can copy your Public Key and burn through your monthly quota.*
- [ ] **Gmail** — Turn on 2FA on `ejtdigital19@gmail.com` (Google Account → Security → 2-Step Verification)
- [ ] **Test the form once** — Locally: `python -m http.server 8000`, open `http://localhost:8000/contact.html`, submit a real entry. Confirm the email arrives.

---

## PHASE 2 — GitHub (5 min)

- [ ] Create a **private** repo at [github.com/new](https://github.com/new) named `ejtdigital-website`
- [ ] Turn on 2FA on GitHub if you haven't (Settings → Password and authentication)
- [ ] From this website folder in PowerShell:
  ```powershell
  cd "C:\Users\User\Desktop\EJT\EJT Digital — Master Brand Folder (Google Drive or Local)\0_3 OPERATIONS\0_2 EJT Website\EJTDIGITAL 6 (BRAND SYSTEM V1)"
  git init
  git add .
  git commit -m "Initial commit — EJT Digital website V1.2"
  git branch -M main
  git remote add origin https://github.com/YOUR-USERNAME/ejtdigital-website.git
  git push -u origin main
  ```
- [ ] Verify on github.com that the repo is populated + private

---

## PHASE 3 — Netlify (10 min)

- [ ] Sign in at [app.netlify.com](https://app.netlify.com), turn on 2FA
- [ ] **Add new site → Import from Git → GitHub** → authorise → pick `ejtdigital-website`
- [ ] Build settings: leave **completely blank**
  - Build command: *(empty)*
  - Publish directory: `.`
- [ ] Click **Deploy site**
- [ ] Netlify assigns a random URL like `radiant-lion-abc123.netlify.app`. Open it — everything should render
- [ ] **Test the contact form** on the live URL. Email should arrive within 30 seconds

---

## PHASE 4 — Custom domain (30 min including DNS wait)

- [ ] Netlify → **Site settings → Domain management → Add custom domain** → `ejtdigital.co.za`
- [ ] Netlify shows you 4 A records + 1 CNAME. Copy them
- [ ] Log into your **domain registrar** (whoever you bought `ejtdigital.co.za` from)
- [ ] Add the DNS records exactly as Netlify shows them
- [ ] Wait 5–30 min. Netlify shows "Awaiting DNS", then "Netlify DNS", then "SSL provisioned"
- [ ] Once green: Netlify → **Domain settings → Force HTTPS: ON**
- [ ] Visit `https://ejtdigital.co.za` — should load with padlock icon

---

## PHASE 5 — Post-launch (15 min)

- [ ] **Google Search Console** — [search.google.com/search-console](https://search.google.com/search-console)
  - Add property → `https://ejtdigital.co.za`
  - Verify (Netlify makes this easy — DNS or HTML file)
  - Submit `https://ejtdigital.co.za/sitemap.xml`
- [ ] **Test on real phone** — not just DevTools. Send yourself the link on WhatsApp, tap through every page
- [ ] **Test the WhatsApp float** button
- [ ] **Test every external link** (IG, FB, LinkedIn, WhatsApp) actually goes to your profiles
- [ ] **Screenshot the WhatsApp preview** by pasting the URL into a WhatsApp chat — the preview image should be the concrete architecture render (that's your temporary OG image)

---

## PHASE 6 — Nice-to-haves (do later, when there's time)

- [ ] Create a proper **1200×630 branded OG image** and replace `assets/images/architecture.png` reference in the `og:image` meta tag on `index.html`. Do the same for other pages (currently only home has full OG tags)
- [ ] Add **Plausible** or **Simple Analytics** for privacy-first traffic (avoids GDPR/POPIA cookie banner requirements — GA4 would need a cookie notice)
- [ ] Once ≥100 form submissions arrive per month, evaluate **reCAPTCHA v3** if spam appears
- [ ] Add **case study 002** to `work.html` once the second client wraps
- [ ] Add **apple-touch-icon** (180×180 PNG) for iOS home-screen bookmarks

---

## What's already handled in code (no action needed)

- HTTPS enforcement + HSTS
- Content Security Policy
- Clickjacking + MIME sniffing protection
- All external links have `rel="noopener noreferrer"`
- Form honeypot to catch bots
- Explicit POPIA consent checkbox on intake form
- Privacy Policy + Terms of Service pages
- Legal footer links on every page
- Sitemap + robots.txt correctly point to `ejtdigital.co.za`
- 404 fallback
- `www` → apex redirect
- Long-cache on static assets, short-cache on HTML

---

## If something breaks after deploy

| Problem | First thing to check |
|---|---|
| Form doesn't send | EmailJS dashboard → check your quota, check the domain allowlist matches your live URL |
| Images broken | File paths are case-sensitive on Netlify but not on Windows — check `architecture.png` vs `Architecture.png` |
| 404 on a page you know exists | Netlify build log — did the file get uploaded? |
| WhatsApp button not clickable | Check `whatsapp.png` uploaded and CSS loaded |
| Site says "not secure" | Wait longer for SSL — up to 60 min. If still failing, contact Netlify support |
| Someone's using your EmailJS quota you didn't authorise | Rotate the Public Key: EmailJS dashboard → **regenerate** → update `contact.html` → commit + push |

---

*Version: V1.2 · Sep 2026. Update this file whenever the deploy process changes.*
