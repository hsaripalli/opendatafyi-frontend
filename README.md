# opendata.fyi website

Editable Next.js source for opendata.fyi, powered by the OpenMCP server.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Main files

- `app/page.tsx` — page content, sections, prompt selector, and FAQ interaction
- `app/globals.css` — complete visual system and responsive styling
- `app/layout.tsx` — metadata, fonts, and social-sharing information

## Editing with Antigravity

Upload or open this project folder, then ask Antigravity to install dependencies
and run the Next.js development server. Most visual changes can be made in
`app/globals.css`; wording and page structure live in `app/page.tsx`.
