# Architecture

This document explains the technical choices behind version 2 of the project and how the code is organized. For installation and usage, see the [README](./README.md).

## Stack

| Area            | Choice                                          |
| --------------- | ----------------------------------------------- |
| Framework       | React 18 + TypeScript strict                    |
| Build           | Vite                                            |
| Package manager | pnpm                                            |
| Routing         | react-router-dom (`createBrowserRouter`)        |
| UI              | MUI (Material UI) + `@mui/icons-material` icons |
| Lint/format     | ESLint (flat config) + Prettier + cspell        |
| Unit tests      | Jest + React Testing Library                    |
| E2E tests       | Playwright (desktop + mobile)                   |

## Code layout

```
src/
  main.tsx                 → entry point, mounts <App />
  App.tsx                  → ThemeProvider + RouterProvider
  router.tsx                → route declarations (single "/" route)
  theme/theme.ts            → MUI theme (palette, typography)
  pages/HomePage/           → AppBar + <ImageZoomViewer />
  components/
    ImageZoomViewer/         → container: wires the logic hook to the render components
      ImageZoomViewer.tsx
      useImageZoomViewer.ts  → all state and handlers (logic/render separation)
      types.ts
    ZoomableImage/           → image + marker overlay, clickable area
    ZoomControls/            → zoom slider, +/-/reset buttons, fullscreen toggle
    MarkerPin/                → marker icon positioned in %
  hooks/
    useIsMobile.ts           → mobile detection via useMediaQuery (MUI)
  utils/
    zoom.ts                  → zoom bounds and calculations (pure, tested)
    markerPosition.ts        → click → relative position conversion (pure, tested)
  types/index.ts             → shared types (MarkerPosition, ImageRect)
e2e/
  zoom-marker.spec.ts        → Playwright scenario (marker, zoom, fullscreen)
```

Each `.tsx` component only contains rendering; all the logic (state, handlers) lives in `useImageZoomViewer.ts`, following the separation of concerns principle.

## Notable technical decisions

### The marker is stored as a percentage, not pixels

The previous version (`ImageComponent.jsx`) stored the marker in absolute pixels (`pageX`/`pageY`) then tried to "re-fit" it on every zoom by comparing the image's old and new `offsetLeft`/`offsetTop`. That heuristic was fragile and caused a visible drift of the marker while zooming.

The marker is now stored as **coordinates relative to the image** (`{ xPercent, yPercent }`), computed on click via `getBoundingClientRect()` (`utils/markerPosition.ts`). Rendering positions the marker with `left`/`top` in `%` inside a `position: relative` container. The marker therefore stays correctly anchored at any zoom level, with no resize listener or after-the-fact recalculation.

### Mobile detection without a dedicated dependency

The old README mentioned the (never implemented) intent to use the `is-mobile` library. Since MUI is already part of the stack, `useIsMobile` relies on `useMediaQuery` (the `sm` breakpoint) instead of adding another dependency for a need that's already covered.

### Fullscreen driven by React, not direct DOM manipulation

The previous version mutated `document.body.style.backgroundColor` directly inside a handler. Fullscreen mode is now a simple state (`isFullscreen`) that drives styles via components' `sx` props — more predictable and testable.

### Image container with `overflow: auto`

The image container uses `overflow: auto`, allowing the image to be scrolled when it exceeds the visible area at a high zoom level (the previous version let the image spill outside the viewport with no way to reach it).

### Accessibility

- All controls (zoom +/-, reset, slider, fullscreen) have an `aria-label` and are keyboard-navigable (native `IconButton`/`Slider` elements).
- Clicking the image to drop a marker remains a pointer/touch-only interaction (much like clicking on a map): it has no meaningful keyboard equivalent, but it doesn't prevent keyboard use of the rest of the interface.

## Tests

- **Utils** (`zoom.ts`, `markerPosition.ts`): nominal and edge cases (min/max bounds, click outside the image, zero-size image).
- **Hooks** (`useIsMobile`, `useImageZoomViewer`): logic tested in isolation with `renderHook`.
- **Components**: rendering, interactions (click, slider, buttons), states (marker present/absent, fullscreen on/off).
- **E2E (Playwright)**: full flow on a desktop browser and a mobile viewport (placing a marker, zooming, fullscreen).
