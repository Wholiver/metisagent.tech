# Metis official site

Official website for [Metis](https://github.com/Wholiver/metis), the agent layer that helps coding models search, remember, execute, and verify more reliably.

```bash
pnpm install
pnpm dev
pnpm build
```

## Cloudflare Pages

- Build command: `pnpm run build`
- Build output directory: `out`
- Production branch: `main`

`wrangler.toml` declares the Pages output directory so Git deployments use the repository configuration.

The original vinext Worker build remains available as `pnpm run build:worker`.
