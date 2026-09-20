# Hearth & Home Reviews — Amazon Furniture Affiliate Site

> A complete, production-ready affiliate review website for furniture sold on Amazon.
> Built as a static site for fast page loads, strong SEO, and zero hosting cost.

This repo contains everything you need to publish and monetize a furniture
review site aimed at US and EU readers. It includes 7 HTML pages (1 home + 5 deep
reviews + disclosure/about/contact/privacy/terms), 6 product images, full
SEO metadata, structured data, GDPR-compliant privacy policy, and a step-by-step
deployment guide.

---

## 1. Project structure

```
amazon-furniture-affiliate/
├── index.html                                       ← Home page (latest reviews, trust strip, newsletter)
├── about.html                                       ← About / methodology
├── contact.html                                     ← Contact form (client-side stub)
├── disclosure.html                                  ← FTC + Amazon Associates disclosure
├── privacy.html                                     ← GDPR-compliant privacy policy
├── terms.html                                       ← Terms of use
├── reviews/
│   ├── best-ergonomic-office-chairs-2026.html       ← Office chairs review
│   ├── best-standing-desks-2026.html                ← Standing desks review
│   ├── best-sectional-sofas-2026.html               ← Sectional sofas review
│   ├── best-platform-beds-2026.html                 ← Platform beds review
│   └── best-dining-tables-2026.html                 ← Dining tables review
├── css/
│   └── style.css                                     ← Single stylesheet (no build step)
├── js/
│   └── main.js                                       ← Tiny interactivity (form, smooth scroll)
├── images/
│   ├── hero-living-room.png                          ← Hero image
│   ├── cat-ergonomic-chair.png                       ← Category thumbnail
│   ├── cat-standing-desk.png
│   ├── cat-sectional-sofa.png
│   ├── cat-platform-bed.png
│   └── cat-dining-table.png
├── robots.txt                                        ← SEO crawler instructions
├── sitemap.xml                                       ← Sitemap for Google Search Console
├── README.md                                         ← (this file)
└── DEPLOYMENT.md                                     ← Step-by-step deploy instructions
```

The site is **zero-build, pure static HTML** — no Node.js, no framework, no
build pipeline. You can drag the folder to any static host and it works.

---

## 2. Local preview

You only need a web browser. Two ways:

### Option A — Open directly
```bash
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

### Option B — Use a simple local server (recommended for testing)
A tiny static server is the most faithful preview. Python is preinstalled on
macOS and most Linux distributions:

```bash
cd amazon-furniture-affiliate
python3 -m http.server 8080
```

Then open `http://localhost:8080` in your browser. The site is responsive, so
preview at both narrow (≈375px) and wide (≈1280px) widths.

### To stop the server
```bash
# macOS / Linux
lsof -ti:8080 | xargs kill

# Windows (PowerShell)
Get-NetTCPConnection -LocalPort 8080 | Select-Object -ExpandProperty OwningProcess | ForEach-Object { Stop-Process -Id $_ -Force }
```

---

## 3. Customize before launch

Before deploying, do these 4 critical things. Each has a single edit location.

### 3.1 Replace `example.com` with your real domain
Do a project-wide search for `https://example.com/` and replace with your
final HTTPS URL (e.g. `https://hearthandhome.example.com/`). Files to check:

- `index.html`
- `about.html`
- `contact.html`
- `disclosure.html`
- `privacy.html`
- `terms.html`
- `reviews/*.html`
- `sitemap.xml` (also update the `<loc>` entries and the `Sitemap:` line in `robots.txt`)

You can use this one-liner (macOS / Linux) — back up first:

```bash
cd amazon-furniture-affiliate
find . -type f \( -name "*.html" -o -name "*.xml" -o -name "*.txt" \) \
  -exec sed -i '' 's|https://example.com|https://YOUR-DOMAIN-HERE|g' {} +
```

Replace `YOUR-DOMAIN-HERE` with your actual domain. Verify with:

```bash
grep -r "example.com" --include="*.html" --include="*.xml" --include="*.txt" .
```

### 3.2 Replace placeholder emails
Replace `*@hearthandhome.example` with real working addresses. At minimum
you need:

- `editorial@…` (or `hello@…`) — main inbox
- `privacy@…` — for GDPR requests
- `disclosure@…` — for FTC / affiliate questions
- `press@…` — for media

Use a service like [ForwardEmail](https://forwardemail.net) or
[ImprovMX](https://improvmx.com) to forward multiple addresses to a single
Gmail/Proton inbox at zero cost.

### 3.3 Sign up for Amazon Associates
This is the **most important business step**. Without an approved Associates
account, your affiliate links won't earn commissions.

1. Sign up at https://affiliate-program.amazon.com/
2. Choose your locale: amazon.com (US), amazon.co.uk (UK), amazon.de (DE), etc.
3. After approval, generate your tracking links from any Amazon product page
   using the **"Get Link"** tool on the Associates dashboard.
4. Replace the placeholder `#` `href` in every `btn-amazon` anchor with your
   actual affiliate link.

> Tip: if you want a single site to serve both US and EU readers, sign up for
> multiple locales (amazon.com + amazon.co.uk + amazon.de) and use a small
> JavaScript redirect to route users to the right region. Keep that
> decision simple — one locale per site is easier to maintain.

### 3.4 Pick your newsletter provider (optional but recommended)
The newsletter form on the home page uses an inline success message.
To actually capture subscribers, wire the form to a backend:

- **Easy:** [Buttondown](https://buttondown.email) — free up to 100 subs
- **Easy:** [Beehiiv](https://www.beehiiv.com/) — free up to 2,500 subs
- **Privacy-friendly:** [Listmonk](https://listmonk.app) — self-hostable

Edit `js/main.js` and replace the form's `submit` handler with a real fetch
to your provider's API. The footer block can also include a "Newsletter" link
once your provider is wired up.

---

## 4. Deploy — choose one platform

Any of the three platforms below works. **Cloudflare Pages is recommended**
for this kind of static site — fastest edge performance, free, and the easiest
DNS to connect if you already use Cloudflare.

### 4.1 Cloudflare Pages (recommended)

**Why:** Best edge performance globally, free for unlimited static sites,
excellent free tier, easiest DNS if your domain is on Cloudflare.

1. **Push to GitHub**
   - Create a free GitHub account if you don't have one
   - Create a new repo (e.g. `hearth-home-reviews`)
   - Push the project folder:
     ```bash
     cd amazon-furniture-affiliate
     git init
     git add .
     git commit -m "Initial site"
     git branch -M main
     git remote add origin git@github.com:YOUR-USERNAME/hearth-home-reviews.git
     git push -u origin main
     ```

2. **Connect to Cloudflare Pages**
   - Sign in at https://pages.cloudflare.com/
   - Click **Create a project → Connect to Git**
   - Select your GitHub repo
   - **Build settings:** leave everything default
     - Framework preset: **None**
     - Build command: *(leave empty)*
     - Build output directory: `/` (or `.`)
   - Click **Save and Deploy**
   - Cloudflare provides a temporary `*.pages.dev` URL within 1-2 minutes

3. **Add your custom domain**
   - In Cloudflare Pages → your project → **Custom domains**
   - Click **Set up a custom domain** → enter your domain
   - If your domain is on Cloudflare, this is automatic
   - Otherwise, Cloudflare shows the CNAME to add at your registrar

**Total time: ~15 minutes**
**Cost: free**

### 4.2 Netlify (alternative)

1. Push to GitHub as above
2. Sign in at https://app.netlify.com/ with GitHub
3. Click **Add new site → Import an existing project** → choose your repo
4. Build settings: leave defaults (no build command)
5. Click **Deploy site**
6. To add a custom domain: **Domain settings → Add domain**

**Total time: ~15 minutes**
**Cost: free**

### 4.3 Vercel (alternative)

Vercel works fine for static sites, though it's optimized for Next.js.

1. Install the Vercel CLI or use the dashboard at https://vercel.com/
2. Import your GitHub repo
3. Framework preset: **Other** (static)
4. Click **Deploy**

**Total time: ~15 minutes**
**Cost: free**

### 4.4 GitHub Pages (zero-cost, no third party)

If you don't want to use any third-party host, GitHub Pages works:

1. Push the repo to GitHub
2. Repo **Settings → Pages → Source: Deploy from a branch**
3. Branch: `main` / root
4. Your site will be live at `https://USERNAME.github.io/REPO-NAME/`
   in about 1 minute

> Caveat: GitHub Pages does not let you use your own apex domain with HTTPS
> as easily. Cloudflare Pages / Netlify / Vercel are better for custom domains.

---

## 5. Post-deployment checklist

After your site is live, walk through this list. Most items take 5-10 minutes.

### 5.1 Search engine indexing
- [ ] **Google Search Console** — https://search.google.com/search-console/
  - Add your property (use the URL prefix option, not the domain option, for easier verification)
  - Verify ownership (DNS TXT record is the cleanest method)
  - Submit your `sitemap.xml`
- [ ] **Bing Webmaster Tools** — https://www.bing.com/webmasters
  - Same process; gets you indexed in Bing, Yahoo, and DuckDuckGo
- [ ] **Check robots.txt** — visit `https://yourdomain.com/robots.txt` and confirm it loads

### 5.2 Performance baseline
Run the free tools below and aim for the green score on all three.

- [ ] **PageSpeed Insights** — https://pagespeed.web.dev/
  - Enter your live URL, run both Mobile and Desktop
  - Target: 90+ on Performance, Accessibility, Best Practices, SEO
- [ ] **GTmetrix** — https://gtmetrix.com/
- [ ] **Lighthouse** — built into Chrome DevTools (F12 → Lighthouse tab)

The site is already optimized (one stylesheet, no analytics, image lazy-loading,
semantic HTML, system-font fallback). You should hit 95+ on Performance and SEO.

### 5.3 Affiliate links
- [ ] Confirm every Amazon "Check price" button on every review goes to a
      valid Amazon product page with your Associates tracking ID
- [ ] Click each link yourself and confirm: (1) product loads, (2) your
      Associates ID is present in the URL
- [ ] Make a $5 test purchase on each locale and confirm the order shows up
      in your Associates dashboard within 24 hours

### 5.4 Legal compliance
- [ ] Confirm your disclosure.html is linked from every page footer (✓ done)
- [ ] Confirm the disclosure text on the footer of every review is visible
      and accurate (✓ done)
- [ ] Add your real contact details on contact.html (✓ placeholder set)
- [ ] If you're based in the EU OR your readers are in the EU, ensure your
      cookie banner / consent flow is GDPR-compliant. The default setup
      here uses **zero cookies** other than Cloudflare's required security
      cookies — no consent banner is strictly required under GDPR for
      strictly-necessary cookies, but most affiliates add one anyway for
      peace of mind.

### 5.5 Analytics (optional)
The default site has **no analytics** — privacy-friendly by design. If you want
basic traffic stats, use one of these in order of preference:

1. **Plausible** (paid, EU-hosted, cookie-free) — best for affiliate sites
2. **Umami** (free, self-hostable, cookie-free)
3. **Fathom** (paid, EU-hosted, cookie-free)
4. Google Analytics (free, but full cookie consent required under GDPR)

Add the analytics script just before the closing `</body>` tag on every page.

---

## 6. Day-to-day operations

### Updating a review
Reviews go out of date. Aim to refresh each review every 6-12 months:
1. Re-order the same products (or borrow the unit if you still have it)
2. Re-test for 4 weeks
3. Update the article's `dateModified` in both the meta tags and structured data
4. Update the prose to reflect any new findings
5. Re-submit the sitemap to Google Search Console

### Adding a new review
1. Create `reviews/best-NEW-CATEGORY-2026.html`
2. Copy an existing review, change the `<title>`, `<h1>`, meta tags,
   and main image (`cat-CATEGORY.png`)
3. Generate a cover image:
   ```bash
   # Use any image generator you have access to,
   # or commission one on a stock site
   ```
4. Add the new category tile to `index.html`
5. Update `sitemap.xml` with the new URL
6. Re-submit sitemap to Google Search Console

### Generating new images
The site uses 1024×1024 PNG product images (~1 MB each). Generate more with
any tool you have (Midjourney, DALL-E, Ideogram) using a prompt like:

> "A premium MODERN PRODUCT NAME on a clean white background, professional
> product photography, soft studio lighting, three-quarter front view, e-commerce
> catalog style."

Optimize before deploying:
```bash
# macOS — install once
brew install imageoptim-cli

# Optimize all product images
cd images
for f in cat-*.png; do
  imageoptim --image-quality 80 "$f"
done
```

For the hero image (1536×1024), generate at 2000×1300 to support large screens
and let CSS handle resizing.

---

## 7. What this site does well

- ✅ **Editorial SEO** — each review is 2000+ words, structured with H2/H3
  hierarchy, FAQ schema-ready (rich results eligibility)
- ✅ **E-E-A-T friendly** — has Author and Organization structured data,
  clear methodology page, real names on About
- ✅ **Page speed** — no JS frameworks, no analytics, one stylesheet, no
  webfonts blocking render (Google Fonts uses display: swap)
- ✅ **Mobile responsive** — tested at 375px, 768px, and 1280px
- ✅ **Accessibility baseline** — semantic HTML, skip links, focus styles,
  alt text on images, ARIA labels on nav
- ✅ **GDPR-friendly** — no third-party trackers, cookie-free by default
- ✅ **FTC-compliant** — disclosure page linked from every page, footer
  reminder on every page, every affiliate link carries
  `rel="sponsored nofollow noopener"`

---

## 8. Common mistakes to avoid

| Mistake | What to do instead |
|---------|--------------------|
| Going live without Amazon Associates approval | Apply to Associates and wait for approval before any "Check price" links go live |
| Using `#` or the raw Amazon URL as affiliate link | Use your tracking ID format: `?tag=YOUR-ID-20` |
| Forgetting to update `example.com` references | Global find-and-replace before first deploy |
| Citing prices without "at time of publication" disclaimer | Add a footer note about price changes — already included |
| Pasting manufacturer specs into reviews | Always re-test with your own hands. Our review policy says as much. |
| Skipping the disclosure page during the first launch | Amazon will suspend your Associates account for undisclosed links |

---

## 9. Growth strategy (the next 90 days)

Once the site is live and indexed:

1. **Pinterest** — Affiliate furniture content performs extremely well on
   Pinterest. Pin every product image with a link back to the review.
2. **YouTube Shorts** — A 60-second product unboxing with a link in
   description sends strong signals to Google.
3. **Email** — Get the newsletter to 500+ subscribers and the compounding
   traffic becomes meaningful.
4. **Internal linking** — Every new post links to 3-5 related existing
   posts. Update older posts to link forward to newer ones.
5. **Compare articles** — "Herman Miller Aeron vs Steelcase Leap" comparison
   posts are pure SEO gold for affiliate sites.

---

## 10. License

This template is yours to use, modify, and monetize. No attribution required.

Built with care by Hearth &amp; Home Reviews · 2026
