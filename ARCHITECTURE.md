# Architecture

Ce document explique les choix techniques de la version 2 du projet et comment le code est découpé. Pour l'installation et l'usage, voir le [README](./README.md).

## Stack

| Domaine         | Choix                                            |
| --------------- | ------------------------------------------------ |
| Framework       | React 18 + TypeScript strict                     |
| Build           | Vite                                             |
| Gestionnaire    | pnpm                                             |
| Routing         | react-router-dom (`createBrowserRouter`)         |
| UI              | MUI (Material UI) + icônes `@mui/icons-material` |
| Lint/format     | ESLint (flat config) + Prettier + cspell         |
| Tests unitaires | Jest + React Testing Library                     |
| Tests e2e       | Playwright (desktop + mobile)                    |

## Découpage du code

```
src/
  main.tsx                 → point d'entrée, monte <App />
  App.tsx                  → ThemeProvider + RouterProvider
  router.tsx                → déclaration des routes (une seule route "/")
  theme/theme.ts            → thème MUI (palette, typographie)
  pages/HomePage/           → AppBar + <ImageZoomViewer />
  components/
    ImageZoomViewer/         → conteneur : branche le hook de logique aux composants de rendu
      ImageZoomViewer.tsx
      useImageZoomViewer.ts  → tout le state et les handlers (séparation logique/rendu)
      types.ts
    ZoomableImage/           → image + overlay du marqueur, zone de clic
    ZoomControls/            → slider de zoom, boutons +/-/reset, toggle plein écran
    MarkerPin/                → icône de marqueur positionnée en %
  hooks/
    useIsMobile.ts           → détection mobile via useMediaQuery (MUI)
  utils/
    zoom.ts                  → bornes et calculs de zoom (purs, testés)
    markerPosition.ts        → conversion clic → position relative (pure, testée)
  types/index.ts             → types partagés (MarkerPosition, ImageRect)
e2e/
  zoom-marker.spec.ts        → scénario Playwright (marqueur, zoom, plein écran)
```

Chaque composant `.tsx` ne contient que du rendu ; toute la logique (state, handlers) vit dans `useImageZoomViewer.ts`, conformément à la séparation des préoccupations.

## Décisions techniques notables

### Le marqueur est stocké en pourcentage, pas en pixels

L'ancienne version (`ImageComponent.jsx`) stockait le marqueur en pixels absolus (`pageX`/`pageY`) puis tentait de le "recaser" à chaque zoom en comparant les anciens et nouveaux `offsetLeft`/`offsetTop` de l'image. Cette heuristique était fragile et provoquait un drift visible du marqueur pendant le zoom.

Le marqueur est maintenant stocké en **coordonnées relatives à l'image** (`{ xPercent, yPercent }`), calculées au clic via `getBoundingClientRect()` (`utils/markerPosition.ts`). Le rendu positionne le marqueur avec `left/top` en `%` dans un conteneur `position: relative`. Le marqueur reste donc correctement ancré à n'importe quel niveau de zoom, sans listener de resize ni recalcul a posteriori.

### Détection mobile sans dépendance dédiée

L'ancien README mentionnait l'intention (jamais réalisée) d'utiliser la librairie `is-mobile`. Comme MUI est déjà dans la stack, `useIsMobile` s'appuie sur `useMediaQuery` (breakpoint `sm`) plutôt que d'ajouter une dépendance supplémentaire pour un besoin déjà couvert.

### Plein écran piloté par React, pas par manipulation directe du DOM

L'ancienne version modifiait `document.body.style.backgroundColor` directement dans un handler. Le mode plein écran est maintenant un simple state (`isFullscreen`) qui pilote les styles via les props `sx` des composants — plus prévisible et testable.

### Image en conteneur `overflow: auto`

Le conteneur de l'image utilise `overflow: auto`, ce qui permet de faire défiler l'image quand elle dépasse la zone visible à fort niveau de zoom (l'ancienne version laissait l'image sortir du viewport sans moyen d'y accéder).

### Accessibilité

- Tous les contrôles (zoom +/-, reset, slider, plein écran) ont un `aria-label` et sont navigables au clavier (éléments natifs `IconButton`/`Slider`).
- Le clic sur l'image pour poser un marqueur reste une interaction pointeur/tactile uniquement (à l'image d'un clic sur une carte) : il n'a pas d'équivalent clavier significatif, mais n'empêche pas l'usage du reste de l'interface au clavier.

## Tests

- **Utils** (`zoom.ts`, `markerPosition.ts`) : cas nominaux et limites (bornes min/max, clic hors image, image de taille nulle).
- **Hooks** (`useIsMobile`, `useImageZoomViewer`) : logique testée isolément avec `renderHook`.
- **Composants** : rendu, interactions (clic, slider, boutons), états (marqueur présent/absent, plein écran on/off).
- **E2E (Playwright)** : parcours complet sur un navigateur desktop et un viewport mobile (pose de marqueur, zoom, plein écran).
