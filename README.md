# Kolo app

React + Vite build of the "Kolo onboarding and dashboard" design. It lives alongside the outreach bot and shares nothing with it.

```bash
cd kolo && npm install && npm run dev
```

## Pages

| URL | What |
|---|---|
| `/#/welcome` → `language` → `how-it-works` → `phone` → `pin` → `ready` | Onboarding, steps 1–6 |
| `/app.html#/home` | Home: wallet balance, quick actions, ajo groups, floating tab bar |
| `/app.html#/group` | Group: this month's pot, Pay ₦5,000, turns this year |
| `/app.html#/receipt/<status>` | Transfer receipt: `processing`, `delayed`, `successful`, `failed`, `refunded`, `review` |
| `/app.html#/pdf/<status>` | A4 receipt (what "Download PDF" produces; prints to one page) |
| `/app.html#/email/<e1…e6>` | Transfer status emails, with inbox preview |

Flow: Ready → Home → a group card or "Pay ajo" → Group → "Pay ₦5,000" → receipt. On the receipt, PDF and email pages, a bar at the top switches the status or template, like the design's Tweaks panel.

Home and Group follow the AppScreens reference screens in the Kolo design system, which is newer than the canvas's Home artboard.

## Design system

The design uses two versions of the Kolo design system, and both are copied in unchanged under `src/styles/`:

- **v1** (`tokens-v1.css` + `bundle-v1.css`): cream surface, ink outlines. Used for onboarding (`index.html`, `src/onboarding/`).
- **v2** (`tokens-v2.css` + `bundle-v2.css`, `tokens.json`): soft cards on grey. Used for home, groups, receipts and emails (`app.html`, `src/app/`).

Both versions use the same class names (`kl-btn`, `kl-pill`, …), so each HTML entry loads only its own bundle. Icons and illustrations are in `public/assets/`.

## Not done yet

- The data is static demo content (Iya Bisi's home, Mama Tunde's ₦50,000 transfer). Nothing is wired to a backend.
- Bracketed placeholders from the design, such as `[support phone number]`, `[support email]` and `[Kolo company name and address]`, still need real values.
- The emails are web previews. To actually send them, the markup has to be rewritten as inline-styled table HTML.
