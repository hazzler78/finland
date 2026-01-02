# Cloudflare Pages Deployment

This project is configured for deployment to Cloudflare Pages.

## Deployment Options

### Option 1: Static Export (Current Configuration)

The project is configured with `output: 'export'` in `next.config.js`, which generates a static site that can be deployed to Cloudflare Pages.

**Build Command:** `npm run build`
**Output Directory:** `out`
**Node Version:** 18 or higher

### Option 2: Cloudflare Pages with Next.js Runtime (Advanced)

For full Next.js App Router support with server-side features, you can use `@cloudflare/next-on-pages`:

1. Install the adapter:
   ```bash
   npm install --save-dev @cloudflare/next-on-pages
   ```

2. Update `next.config.js` to remove `output: 'export'`

3. Update build script:
   ```json
   "build": "next build && npx @cloudflare/next-on-pages"
   ```

4. Update `wrangler.toml` to use `.vercel/output/static` as output directory

## Deployment Steps

1. **Connect Repository to Cloudflare Pages:**
   - Go to Cloudflare Dashboard → Pages
   - Click "Create a project"
   - Connect your Git repository

2. **Configure Build Settings:**
   - **Framework preset:** Next.js (Static HTML Export)
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Root directory:** `/` (or your project root)

3. **Environment Variables (if needed):**
   - Add any required environment variables in Cloudflare Pages settings

4. **Custom Domain:**
   - Add your custom domain `sahkopomo.fi` in Cloudflare Pages settings
   - Update DNS records as instructed

## Current Configuration

- ✅ Static export enabled
- ✅ Images unoptimized (required for static export)
- ✅ Output directory: `out`
- ✅ Compatible with Cloudflare Pages

## Notes

- Static export means no server-side rendering or API routes
- All pages are pre-rendered at build time
- Dynamic routes work with `generateStaticParams` or fallback pages
- Client-side navigation works normally
