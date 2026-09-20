# Deployment Guide — Step-by-Step

This is the shortest path from "files on disk" to "site live on the
internet, ready to earn commissions."

---

## Step 0 — Prerequisites

| Tool | Why |
|------|-----|
| GitHub account (free) | Host the source code |
| A domain name ($10-15/yr) | The address people will visit |
| An Amazon Associates account (free, approval required) | The way you'll get paid |
| (Optional) Cloudflare account (free) | Best home for the site |

The full launch takes about 60-90 minutes if you do everything in one sitting.

---

## Step 1 — Create the GitHub repo (5 minutes)

1. Open https://github.com/new
2. Repository name: `hearth-home-reviews` (or whatever you prefer)
3. Visibility: **Public** (required for free GitHub Pages; fine for Cloudflare/Netlify/Vercel)
4. Click **Create repository**
5. On the next screen, follow the **"push an existing repository"** instructions.

From your terminal:

```bash
cd amazon-furniture-affiliate

git init
git add .
git commit -m "Initial commit: full affiliate site"
git branch -M main
git remote add origin git@github.com:YOUR-USERNAME/hearth-home-reviews.git
git push -u origin main
```

If you don't have SSH set up with GitHub, the HTTPS form works too:

```bash
git remote add origin https://github.com/YOUR-USERNAME/hearth-home-reviews.git
```

You'll be prompted for your GitHub username + a personal access token
(password-style login won't work since GitHub deprecated it).

---

## Step 2 — Apply to Amazon Associates (10 minutes)

> Do this in parallel with Step 3 — Amazon's approval can take 1-3 days
> for new accounts.

1. Go to https://affiliate-program.amazon.com/
2. Click **Sign up**
3. Pick your store: **amazon.com** for US, **amazon.co.uk** for UK, etc.
4. Fill in your profile:
   - Website URL: enter your future domain name (not the GitHub URL)
   - Describe what your site will publish: "Independent furniture reviews"
   - Pick your favorite categories
5. Submit and wait for the approval email (1-3 days usually, often same day)
6. After approval, log in and find your **Tracking ID**. It looks like
   `yourname-20` and is what identifies your commissions.
7. Pick any product on Amazon, click the **"Get link" → "Text"** option in the
   Associates dashboard to see the URL format. It will look like:

   ```
   https://www.amazon.com/Some-Product-Name/dp/B0XXXXX/?tag=yourname-20
   ```

   That's your affiliate URL. The `tag=yourname-20` is what earns the commission.

> **Multi-region advice:** If you want to serve both US and EU readers, sign
> up for each locale's Associates program separately (amazon.com, amazon.co.uk,
> amazon.de, amazon.fr). Many affiliates start with one locale and expand
> once the site is established.

---

## Step 3 — Deploy to Cloudflare Pages (15 minutes)

Cloudflare Pages is the recommended host for this kind of site. It's free,
fast, and gives you a `*.pages.dev` URL immediately.

1. Sign up at https://pages.cloudflare.com/ (free)
2. Click **Create a project → Connect to Git → GitHub**
3. Authorize Cloudflare to read your GitHub repos
4. Select the `hearth-home-reviews` repo you just pushed
5. **Build configuration:**
   - Project name: `hearth-home-reviews`
   - Production branch: `main`
   - Framework preset: **None**
   - Build command: *(leave blank)*
   - Build output directory: **/** (root)
6. Click **Save and Deploy**
7. Wait 1-2 minutes for the first build.
8. You'll get a free URL like `hearth-home-reviews.pages.dev`.
9. **Visit it.** Confirm everything looks right.

> **First-time GitHub login failed?** Go to https://github.com/settings/tokens
> and create a personal access token with `repo` scope. Use that as the
> password when Cloudflare asks for credentials.

---

## Step 4 — Connect your custom domain (10 minutes)

Cloudflare Pages → your project → **Custom domains** tab.

### If your domain is already on Cloudflare DNS
Just type the domain name, click **Add domain**, and it's done.

### If your domain is on a different registrar
Cloudflare will display a CNAME record to add. Go to your registrar
(Namecheap, GoDaddy, Google Domains, etc.), add the CNAME they specify,
wait 5-30 minutes for propagation, and refresh the Cloudflare dashboard.

### Apex domain (e.g. `hearthandhome.com`)
Cloudflare will guide you through adding two A records or one ALIAS/ANAME.

### Subdomain (e.g. `www.hearthandhome.com`)
You add a CNAME pointing to `<project>.pages.dev`. Cloudflare shows the exact value.

### Recommended DNS configuration
For SEO and clean URLs, set up:

| Record | Type | Value |
|--------|------|-------|
| `@`     | CNAME | `<project>.pages.dev` (Cloudflare apex setup) |
| `www`   | CNAME | `<project>.pages.dev` |

In Cloudflare Pages → **Custom domains**, additionally enable the
**"Redirect www to apex"** or **"Redirect apex to www"** rule you prefer.

---

## Step 5 — Enable HTTPS (2 minutes, mostly automatic)

Cloudflare Pages provisions a free SSL certificate automatically. Nothing
to do on your side. Within 15 minutes of DNS propagation:

- `https://yourdomain.com/` will work
- `https://www.yourdomain.com/` will work
- The HTTP → HTTPS redirect is automatic

Confirm with: https://www.ssllabs.com/ssltest/ — target an A grade.

---

## Step 6 — Update `example.com` to your real domain (5 minutes)

This is the step most people forget. If you skip it, your canonical tags,
Open Graph URLs, sitemap, and JSON-LD all say `example.com` instead of your
real domain.

Run a project-wide find-and-replace:

```bash
cd amazon-furniture-affiliate

# Back up first
cp -r . ../amazon-furniture-affiliate-backup

# Replace (macOS — sed -i '' syntax)
find . -type f \( -name "*.html" -o -name "*.xml" -o -name "*.txt" \) \
  -exec sed -i '' 's|https://example.com|https://YOUR-DOMAIN|g' {} +

# Linux (sed -i without '' flag)
find . -type f \( -name "*.html" -o -name "*.xml" -o -name "*.txt" \) \
  -exec sed -i 's|https://example.com|https://YOUR-DOMAIN|g' {} +

# Verify nothing was missed
grep -r "example.com" --include="*.html" --include="*.xml" --include="*.txt" . \
  | grep -v "hearthandhome.example" \
  | grep -v "amazon\.com" \
  | grep -v "w3.org"
```

Replace `YOUR-DOMAIN` with your actual URL, including the `https://` prefix.

Commit and push:

```bash
git add .
git commit -m "Replace placeholder domain with real production URL"
git push
```

Cloudflare Pages auto-deploys in ~30 seconds. Refresh your site.

---

## Step 7 — Wire up affiliate links (15 minutes)

Replace the placeholder `#` `href` values in every review's "Check price"
button with your real Amazon affiliate URLs.

You can do this two ways:

### Option A — Edit each file manually
For each product listed in a review:

1. Open Amazon.com and search for the product (the ASIN is shown in the reviews)
2. Find the product page
3. Go to your Associates dashboard → **"Get link"** → enter the product URL → copy the link with your tag
4. Edit the file:
   ```html
   <a class="btn btn-amazon" href="#" rel="sponsored nofollow noopener">Check price →</a>
   ```
   becomes:
   ```html
   <a class="btn btn-amazon" href="https://www.amazon.com/Product-Name/dp/ASIN/?tag=YOUR-TAG-20" rel="sponsored nofollow noopener">Check price →</a>
   ```

### Option B — Bulk replace with a script
Save this script as `wire_affiliate_links.sh` in your project root, edit the
SKU list, run it.

```bash
#!/usr/bin/env bash
# wire_affiliate_links.sh
# Replace placeholder # in btn-amazon anchors with real Amazon affiliate links.
# Run this ONCE after you have your Associates Tracking ID.

TAG="YOUR-TAG-20"

declare -A PRODUCTS=(
  # ASIN => product URL slug (you build the rest)
  ["B000WYEPM0"]="herman-miller-aeron"
  ["B08BCRTDJZ"]="steelcase-leap-v2"
  # ... add the rest
)

for asin in "${!PRODUCTS[@]}"; do
  url="https://www.amazon.com/dp/${asin}/?tag=${TAG}"
  # Replace in all review files
  find reviews -name "*.html" -exec sed -i '' "s|href=\"#\" rel=\"sponsored nofollow noopener\"|href=\"${url}\" rel=\"sponsored nofollow noopener\"|g" {} +
done
```

> **One URL per file for now:** the script above replaces all `#` links with
> the same URL. For per-product links, edit each review page by hand.

---

## Step 8 — Submit to search engines (10 minutes)

### Google Search Console

1. https://search.google.com/search-console/
2. **Add property → URL prefix** → enter `https://yourdomain.com/`
3. Verify with the **HTML tag** method (paste a meta tag into all pages,
   Cloudflare Pages will redeploy, then click "Verify")
4. Once verified, **Sitemaps → Add a sitemap → enter `sitemap.xml`**

### Bing Webmaster Tools

1. https://www.bing.com/webmasters
2. **Add a site**, verify same as above
3. Submit your `sitemap.xml`

Indexing takes 1-14 days for Google to crawl your new site. You can speed it up
by:

- Linking to the site from another site you control (Twitter, a Reddit comment,
  a LinkedIn post — anything with a crawlable link)
- Sharing on aggregators like ProductHunt, BetaList, or IndieHackers

---

## Step 9 — Make a test purchase (24 hours)

After Amazon approves you:

1. Visit your live site
2. Click any "Check price" button
3. Land on Amazon — confirm your Tracking ID is in the URL bar (`tag=yourname-20`)
4. Add something cheap to cart (a $5 cable, etc.) — order it
5. Within 24 hours, check your Associates dashboard → **Reports → Orders**
6. Confirm the order is attributed to your account

**This step is critical.** If you skip it, you might publish a site with broken
links for weeks before realizing.

---

## Step 10 — Set up monitoring (10 minutes)

- [ ] **Uptime monitor:** https://uptime.com/ (free) — emails you if your site goes down
- [ ] **Google Analytics:** skip for GDPR simplicity, or use Plausible/Fathom if you want stats
- [ ] **Affiliate dashboard:** log in to Associates once a week and verify pending commissions match your traffic

---

## Common gotchas

### "Cloudflare build failed"
Make sure you didn't accidentally commit an empty `index.html` or have a
syntax error. Cloudflare Pages dashboard → your project → **Builds** shows
the error. Click into the failed build for the log.

### "HTTPS isn't working"
DNS hasn't propagated yet. Wait 30-60 minutes. Check with
https://dnschecker.org — type your domain and confirm the CNAME points to
your `*.pages.dev` URL.

### "Amazon says I'm not approved yet"
Wait. New Associates accounts go through a manual review that takes 1-3 days.
Re-check the dashboard daily.

### "My pages aren't getting indexed"
- Wait. New sites take 1-14 days for first crawl.
- Confirm the `robots.txt` is not blocking — visit `https://yourdomain.com/robots.txt`
- Re-submit sitemap in Search Console every few days
- Check Search Console → **Coverage → Excluded** for the reason

### "Rankings are stuck on page 5"
- Add 5-10 internal links from each new post to existing posts
- Submit every new post URL individually in Search Console → URL Inspection → "Request Indexing"
- Build a few backlinks (guest posts, Reddit, forums) — quality > quantity

---

## Done? Now grow.

Once the site is live, indexed, and earning test commissions:

1. Write a new review every 2 weeks (aim for 12 in the first 6 months)
2. Update existing reviews every 6-12 months
3. Build the newsletter to 1,000+ subscribers
4. Add Pinterest pins for every product image
5. Expand to a second Amazon locale (e.g. add amazon.co.uk alongside amazon.com)

The compound effect of consistent publishing + smart internal linking is what
turns a tiny static site into a meaningful Amazon Associates income.

---

**Questions or problems with deployment?** Open an issue on the GitHub repo
where you hosted the source, or email `editorial@hearthandhome.example`
(substitute your real address).
