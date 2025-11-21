# Cloudflare Pages Deployment Guide

## Cloudflare Pages Configuration

Use these settings in your Cloudflare Pages project:

### Build Settings

1. **Framework preset**: Next.js
2. **Build command**: `npx @cloudflare/next-on-pages` (or `npm run pages:build`)
3. **Build output directory**: `.vercel/output/static`
4. **Root directory**: (leave empty)
5. **Node version**: 20.18.3 (auto-detected from `.node-version` file)

### Environment Variables

If you need environment variables (API keys, etc.), add them in:
- Cloudflare Dashboard → Pages → Your Project → Settings → Environment Variables

## Node.js Version

The project uses Node.js 20.18.3 (specified in `.node-version` file).
Cloudflare Pages will automatically detect and use this version.

## Build Process

The build process works as follows:
1. Next.js builds your application (`next build`)
2. `@cloudflare/next-on-pages` converts the Next.js build to Cloudflare Pages format
3. Output is placed in `.vercel/output/static`
4. Cloudflare deploys the static output

## API Routes

Your `/api/contact` route will work on Cloudflare Pages through edge functions.

## Local Development

```bash
# Development server
npm run dev

# Test Cloudflare Pages build locally (may not work on Windows)
npm run preview

# Deploy to Cloudflare Pages
npm run deploy
```

## Troubleshooting

### Windows Build Issues

If you encounter build issues on Windows, the build will work correctly on Cloudflare's Linux servers.
The error you see locally won't affect deployment.

### Alternative: Use Cloudflare Dashboard

Instead of CLI deployment:
1. Push your code to GitHub
2. Connect your repository in Cloudflare Pages dashboard
3. Configure build settings as shown above
4. Cloudflare will build and deploy automatically

## Migration Note

`@cloudflare/next-on-pages` is deprecated. For future projects, consider using OpenNext:
https://opennext.js.org/cloudflare
