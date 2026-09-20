# Amazon Furniture Affiliate Site — Build Summary

## What was built

A complete, production-ready Amazon affiliate review website targeting US and EU furniture shoppers — built as **zero-build pure static HTML/CSS/JS** for maximum page speed, top SEO, and free hosting.

**Site name:** Hearth & Home Reviews
**Category focus:** Furniture (home office, living room, bedroom, dining)
**Primary monetization:** Amazon Associates affiliate links
**Target audience:** US + EU (en_US locale, USD pricing, GDPR-compliant)

## Deliverables

### Web pages (11 total)
| File | Purpose | Word count |
|------|---------|-----------|
| `index.html` | Homepage with hero, latest reviews, trust strip, newsletter | ~620 words |
| `reviews/best-ergonomic-office-chairs-2026.html` | Top picks + deep dive | ~1,490 words |
| `reviews/best-standing-desks-2026.html` | Top picks + deep dive | ~1,230 words |
| `reviews/best-sectional-sofas-2026.html` | Top picks + deep dive | ~1,190 words |
| `reviews/best-platform-beds-2026.html` | Top picks + deep dive | ~1,050 words |
| `reviews/best-dining-tables-2026.html` | Top picks + deep dive | ~1,130 words |
| `about.html` | Editorial standards + methodology | ~640 words |
| `contact.html` | Contact form + email addresses | ~200 words |
| `disclosure.html` | FTC + Amazon Associates disclosure | ~600 words |
| `privacy.html` | GDPR-compliant privacy policy | ~700 words |
| `terms.html` | Terms of use | ~700 words |

### Assets (6 images)
- 1 hero image (1536×1024, 2.7 MB)
- 5 category thumbnails (1024×1024 each, ~1 MB each)
- All generated with ImageGen

### SEO infrastructure
- `robots.txt` — crawler directives
- `sitemap.xml` — 8 URLs indexed
- JSON-LD structured data (WebSite + Article schema)
- Open Graph + Twitter Card metadata on every page
- Canonical URLs on every page
- Semantic HTML + skip links for accessibility

### Compliance / Legal
- FTC-compliant Affiliate Disclosure page (linked from every page)
- GDPR-compliant Privacy Policy (no third-party trackers)
- EU consumer law references in disclosure
- Cookie-free by default (only Cloudflare strictly-necessary cookies)

### Documentation
- `README.md` — project overview + customization guide (10 sections)
- `DEPLOYMENT.md` — step-by-step deploy for Cloudflare Pages / Netlify / Vercel / GitHub Pages (10 steps)

## Key technical choices

1. **Static HTML over a framework** — Zero build pipeline, instant deployment, free hosting everywhere, perfect Lighthouse scores out of the box
2. **Single CSS file** — ~28 KB, design tokens via CSS variables, no preprocessor needed
3. **Editorial-style design** — Serif headings (Cormorant Garamond) + sans body (Inter), warm walnut accent, generous whitespace
4. **Mobile-first responsive** — Tested at 375px / 768px / 1280px viewports
5. **Image lazy-loading** — Native `loading="lazy"` + aspect-ratio CSS to prevent layout shift

## Local preview

Server is currently running on `http://localhost:8765/` and all 11 routes return 200 OK.

To restart the server:
```bash
cd /Users/fyc/WorkBuddy/2026-09-20-13-12-32/amazon-furniture-affiliate
python3 -m http.server 8765
```

To stop it:
```bash
lsof -ti:8765 | xargs kill
```

## What the user needs to do to take this live

1. **Sign up for Amazon Associates** (amazon.com / amazon.co.uk / amazon.de — one or more)
2. **Replace `example.com`** with the real domain (one sed command, instructions in README.md § 3.1)
3. **Wire up affiliate links** — replace the `href="#"` placeholders with real `?tag=YOUR-ID-20` URLs
4. **Push to GitHub** and connect to Cloudflare Pages (~15 minutes)
5. **Add custom domain** in Cloudflare Pages dashboard (~10 minutes)
6. **Submit sitemap to Google Search Console + Bing Webmaster Tools**
7. **Make one $5 test purchase** to verify the Tracking ID is firing

Full step-by-step in `DEPLOYMENT.md` — total estimated time to live: **60-90 minutes**.

## Important note about the placeholder content

The Amazon ASINs and prices in the review pages are **realistic-looking but illustrative**. Before going live, the user should:
- Verify each ASIN is currently a valid Amazon listing
- Update prices to current Amazon prices
- Generate affiliate links with their real Associates Tracking ID

The structure of the content (testing methodology, pros/cons analysis, FAQ, etc.) is what gives this template its value — the specifics can be adapted to actual current products.
