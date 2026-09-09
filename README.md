# EJT DIGITAL — ejtdigital.co.za

Production-ready static website. Built from the Brand System V1.1.

Vanilla HTML / CSS / JS. No build step. No framework. Zero runtime dependencies.

---

## What's inside

```
EJTDIGITAL 6 (BRAND SYSTEM V1)/
├── index.html          Home
├── services.html       Packages (Signal · Engine · Command)
├── work.html           Case studies index
├── about.html          Founder story + values
├── contact.html        Intake form (EmailJS)
├── privacy.html        Privacy Policy (POPIA)
├── terms.html          Terms of Service
├── 404.html            Not-found fallback
├── sitemap.xml         For search engines
├── robots.txt          For crawlers
├── netlify.toml        Netlify config: headers, cache, redirects
├── .gitignore          What must NEVER be committed
└── assets/
    ├── css/main.css    Full design system, ~1150 lines
    ├── js/main.js      Mobile menu, scroll reveal, counters, nav-scroll
    └── images/         Logo lockups, founder portrait, backgrounds, icons
```

---

## Preview locally

Open `index.html` in your browser. Everything works from `file://` except one thing: the contact form (EmailJS needs an HTTP context to hit its API — it silently fails on `file://`). To test the form locally:

```bash
# From this folder
python -m http.server 8000
# Then visit http://localhost:8000
```

Or install the **Live Server** extension in VSCode → right-click `index.html` → "Open with Live Server."

---

## Contact form — how it works

The intake form posts through **EmailJS** (client-side email delivery, no backend required). Configuration lives at the bottom of `contact.html`:

```
Service ID:  service_bcnwuj7
Template ID: template_vf7266v
Public Key:  VRIKELfmjcT3IIgrt
```

The Public Key is meant to be exposed — that's how EmailJS is designed. But you **must lock down which domains can use it**, otherwise anyone can abuse your quota by copying the key:

1. Go to [dashboard.emailjs.com](https://dashboard.emailjs.com) → **Account → Security**
2. Turn on **"Allow EmailJS API for specific domains"**
3. Add: `ejtdigital.co.za`, `www.ejtdigital.co.za`, and your Netlify preview domain (`*.netlify.app`)
4. Save.

That's the one manual step outside the code that keeps the form from being abused.

Submissions land in `ejtdigital19@gmail.com` (whatever email your EmailJS template targets).

---

## Deploy to Netlify from GitHub

### One-time GitHub setup

1. Create a new **private** repo on GitHub named `ejtdigital-website` (or anything).
2. From this folder, initialise Git and push:
   ```bash
   git init
   git add .
   git commit -m "Initial commit — EJT Digital website V1"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/ejtdigital-website.git
   git push -u origin main
   ```

### One-time Netlify setup

1. Sign in at [app.netlify.com](https://app.netlify.com).
2. **Add new site → Import from Git → GitHub → pick your repo.**
3. Build settings — leave everything blank:
   - Build command: *(empty)*
   - Publish directory: `.`
4. **Deploy site.** Netlify assigns you a random `*.netlify.app` URL.
5. Open the site — nav, hero, packages, contact should all render.
6. Test the contact form by submitting a real entry — it should land in your Gmail within ~30 seconds.

### Attach your custom domain

1. Netlify → **Site settings → Domain management → Add custom domain** → `ejtdigital.co.za`.
2. Netlify shows you the DNS records to set at your registrar (usually 4 A records + 1 CNAME).
3. Set them at your domain registrar (whoever you bought `ejtdigital.co.za` from).
4. Wait 5–30 minutes for DNS propagation. Netlify provisions SSL automatically once DNS resolves.
5. When it's live, tick **"Force HTTPS"** in Netlify → Domain settings.

Every `git push` from now on auto-deploys.

---

## Security summary — what's already done

- ✅ **HTTPS enforced** (`Strict-Transport-Security` header)
- ✅ **Clickjacking protection** (`X-Frame-Options: DENY` + CSP `frame-ancestors 'none'`)
- ✅ **MIME sniffing blocked** (`X-Content-Type-Options: nosniff`)
- ✅ **Referrer leakage minimised** (`strict-origin-when-cross-origin`)
- ✅ **Sensitive device APIs denied** (`Permissions-Policy` blocks camera, mic, location, etc.)
- ✅ **Content Security Policy** locks script/style/font/image sources to trusted origins
- ✅ **All external links** use `rel="noopener noreferrer"` (blocks tabnabbing + referrer leaks)
- ✅ **Form honeypot** to catch bot submissions
- ✅ **Consent checkbox** on intake form (POPIA-compliant explicit consent)
- ✅ **Privacy Policy + Terms** published + linked from every footer
- ✅ **No secrets in the repo** — EmailJS keys are public by design; nothing else is exposed
- ✅ **Long cache on static assets, short cache on HTML** — fast reloads without stale content

### Ongoing security housekeeping

- Add EmailJS **domain allowlist** (see Contact form section above) — **do this before going live**
- Enable **two-factor auth** on: GitHub, Netlify, Gmail, EmailJS, Facebook, Instagram, LinkedIn
- Rotate the EmailJS Public Key every 12 months (or immediately if the site is defaced/abused)
- Once ≥10 form submissions come in, decide if you need reCAPTCHA (probably not until spam appears)

---

## Legal — what's in place

- `privacy.html` — POPIA-compliant Privacy Policy (what's collected, how it's stored, your rights, complaint route to the Information Regulator)
- `terms.html` — Terms of Service (delivery timeline, guarantee, payment, IP ownership, liability caps, governing law: South Africa)
- Consent checkbox on the intake form links to the Privacy Policy

**Both documents are drafted in plain language and cover standard cases. For anything unusual (bespoke enterprise contract, dispute, litigation) — consult a South African attorney. These are not a replacement for legal advice.**

---

## Making changes

Every page shares the same nav + footer HTML (copied inline). If you change nav links or footer content, update it across all 7 HTML files. The CSS in `assets/css/main.css` is the single source of truth for styling — change once, applies everywhere.

For faster iteration long-term, consider migrating to a static site generator (Astro or 11ty) that supports partial templates. Not required at current scale.

---

## Version history

- **V1.2** — EmailJS integration, POPIA legal pages, security headers, GitHub-ready (Sep 2026)
- **V1.1** — Editorial hero redesign, animations, custom brand elements (Sep 2026)
- **V1.0** — Initial ship, built from Brand System V1.1 (Aug 2026)
