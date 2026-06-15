# Image2Model Studio

Image2Model Studio is a pure static frontend demo for a future "2D image to 3D model" product. It lets users upload an image, preview metadata, run a simulated five-step generation flow, and inspect a sample GLB model in an interactive 3D viewer.

No backend, database, API routes, server actions, or hardcoded API keys are used in this first version.

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- `@google/model-viewer`
- GitHub Pages deployment

## Project Structure

```text
Image2Model Studio/
├─ .github/
│  └─ workflows/
│     └─ deploy.yml
├─ public/
│  └─ models/
│     ├─ README.md
│     ├─ chair.glb
│     ├─ shoe.glb
│     └─ toy.glb
├─ src/
│  ├─ App.tsx
│  ├─ data.ts
│  ├─ main.tsx
│  ├─ styles.css
│  ├─ types.ts
│  └─ vite-env.d.ts
├─ index.html
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts
```

## Features

- Hero section with the required title, subtitle, and `Start Creating` CTA
- Click-to-upload and drag-and-drop image upload
- JPG, PNG, and WEBP validation
- Image preview with file name, file size, and dimensions
- Simulated generation pipeline:
  - Analyzing image
  - Estimating depth
  - Reconstructing mesh
  - Generating texture
  - Exporting GLB
- Interactive GLB preview with rotation, zoom, auto-rotate, background color switching, light intensity, and fullscreen
- GLB download
- OBJ and STL marked as `Coming Soon`
- Reserved roadmap cards for TripoSR, Stable Fast 3D, Hunyuan3D, and TRELLIS

## Local Development

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually:

```text
http://localhost:5173/
```

## Production Build

```bash
npm run build
npm run preview
```

The production output is generated in:

```text
dist/
```

## GitHub Pages Deployment

1. Push the project to a GitHub repository.
2. In GitHub, open `Settings -> Pages`.
3. Set `Source` to `GitHub Actions`.
4. Push to the `main` branch.
5. The workflow at `.github/workflows/deploy.yml` runs `npm ci` and `npm run build`.
6. The deployed site is served from GitHub Pages.

The workflow sets:

```text
VITE_BASE_PATH=/${{ github.event.repository.name }}/
```

This makes asset paths work when the site is deployed under a repository subpath such as:

```text
https://username.github.io/repository-name/
```

For a custom domain or root deployment, set `VITE_BASE_PATH=/` in the workflow.

## Sample Models

The `public/models` folder contains:

- `chair.glb`
- `shoe.glb`
- `toy.glb`

The included files are lightweight placeholder GLB models for the static demo. For a real showcase, replace them with optimized textured GLB assets. Keep the same file names unless you also update `src/data.ts`.

## Future AI Backend Integration

The current version intentionally does not call any AI service from the browser. Real API keys must never be shipped in static frontend code.

A production integration should use this flow:

1. Frontend uploads an image to a secure backend or serverless function.
2. Backend stores the temporary image or forwards it directly to the selected provider.
3. Backend calls one provider, such as TripoSR, Stable Fast 3D, Hunyuan3D, or TRELLIS.
4. Backend polls or streams job progress.
5. Backend returns a signed URL or public asset URL for the generated GLB.
6. Frontend replaces the local sample model URL with the returned GLB URL.

Suggested frontend integration point:

```ts
// Replace the current simulated generation in src/App.tsx:
// generate() -> call your backend job endpoint, poll progress, then set the model URL.
```

Recommended backend responsibilities:

- Keep provider API keys in server-side environment variables.
- Validate file type, file size, and user permissions.
- Normalize provider responses into one internal job format.
- Convert or post-process model files if OBJ/STL exports are required.
- Return short-lived URLs for generated assets.

## Static Frontend Constraint

This first version is GitHub Pages compatible because it uses only static files:

- No backend
- No database
- No API routes
- No server actions
- No embedded API keys
- No runtime secrets
