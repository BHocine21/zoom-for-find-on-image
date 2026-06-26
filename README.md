# 🔍 Zoom for find on image

An interface for zooming into an image and dropping a precise marker on it — both on desktop and in mobile fullscreen mode.

🌐 **Live demo:** [zoom-for-find-on-image.vercel.app](https://zoom-for-find-on-image.vercel.app/) (deployed on Vercel)

![Main page](./screenshots/desktop-main.png)

## ✨ Features

- **Zoom** via slider or `+`/`-` buttons, with one-click reset.
- **Marker** dropped with a click on the image, anchored as a percentage of the image so it stays correctly positioned at any zoom level.
- **Dedicated fullscreen** mode with a simplified UI.
- **Responsive** on desktop / tablet / mobile, with keyboard navigation and `aria-label`s on every control.

| Marker placed                               | Zoomed in                               | Fullscreen (mobile)                                       |
| ------------------------------------------- | --------------------------------------- | --------------------------------------------------------- |
| ![Marker](./screenshots/desktop-marker.png) | ![Zoom](./screenshots/desktop-zoom.png) | ![Mobile fullscreen](./screenshots/mobile-fullscreen.png) |

> For technical stack details and architecture decisions, see [ARCHITECTURE.md](./ARCHITECTURE.md).

## 🚀 Installation

```bash
pnpm install
pnpm dev
```

## 📦 Scripts

| Command                                                | Description                               |
| ------------------------------------------------------ | ----------------------------------------- |
| `pnpm dev`                                             | Vite development server                   |
| `pnpm build`                                           | TypeScript check + production build       |
| `pnpm preview`                                         | Serves the production build locally       |
| `pnpm lint` / `pnpm lint:fix`                          | ESLint                                    |
| `pnpm format` / `pnpm format:check`                    | Prettier                                  |
| `pnpm spell`                                           | cspell                                    |
| `pnpm test` / `pnpm test:watch` / `pnpm test:coverage` | Unit tests (Jest + React Testing Library) |
| `pnpm e2e` / `pnpm e2e:ui`                             | End-to-end tests (Playwright)             |

## ⛔ Known limitations

- Single static image: the marker doesn't need to survive an image change for now.
- No dedicated mobile landscape layout: fullscreen adapts to device orientation without a specific arrangement.

## 👨‍🚀 Author

[@BHocine21](https://github.com/BHocine21)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/hocine-bouhlala-407025132/)
