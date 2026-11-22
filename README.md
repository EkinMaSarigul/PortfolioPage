# Ekin Mahir Sarigul — Portfolio

Next.js 16 · TypeScript · Tailwind CSS v4 · Framer Motion.

## Run it

Node lives in `~/.local/node`. If `npm` isn't found, add it to your PATH once:

```bash
echo 'export PATH="$HOME/.local/node/bin:$PATH"' >> ~/.zshrc && source ~/.zshrc
```

```bash
npm run dev      # http://localhost:3000
npm run build    # production build (also checks for typos)
```

## ✏️ Edit everything in ONE file — `portfolio.config.ts`

Colours, text, links, robotics seasons, skills, awards, CV — all in
[`portfolio.config.ts`](portfolio.config.ts), in 10 numbered sections.

## 📷 Photos & videos

See **[MEDIA-GUIDE.md](MEDIA-GUIDE.md)** — which folder each photo goes in, the exact
file names, image sizes, and how to paste YouTube links.

## Pages

| URL | Content |
| --- | --- |
| `/` | Intro, key numbers, seasons, skills, awards, education & experience |
| `/robotics` | FRC explainer + all seasons |
| `/robotics/2023` … `/robotics/2026` | One page per season with photos & videos |
| `/cad` | CAD skills + renders |
| `/manufacturing` | Materials, processes, machining photos & videos |
| `/electronics` | Wiring & electronics skills + photos |
| `/awards` | Awards + award gallery |
| Download CV | Buttons in the menu, home page and footer download `public/cv.pdf` — replace that file to update your CV |

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com/new). Before publishing set
`showMissingMediaPlaceholders: false` in the config.

`legacy-static/` holds the very first plain-HTML version of the site.
