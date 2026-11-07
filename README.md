# EZPZ Spray Lettering

The approved EZPZ spray artwork as a responsive React component. Separate native paint, overspray, and drip masks preserve its drawn shapes and textured edges. Free to use and modify under MIT.

## Use

Copy `src/ezpz-spray-lettering.tsx` into your project. React is its only dependency. It works without Tailwind or a UI library.

```tsx
import EZPZSprayLettering from "./ezpz-spray-lettering";

<EZPZSprayLettering />
```

Change the paint and use a plain background:

```tsx
<EZPZSprayLettering
  paintColor="#902920"
  backgroundColor="#efe5d3"
  textureAmount={0}
  oversprayAmount={0.8}
  dripAmount={1}
/>
```

## Controls

| Prop | Purpose |
| --- | --- |
| `paintColor` | Recolor all paint layers |
| `backgroundColor` | Base color, visible when texture is reduced or disabled |
| `textureAmount` | Concrete visibility, from 0 to 1 |
| `oversprayAmount` | Edge spray visibility, from 0 to 1 |
| `dripAmount` | Drip visibility, from 0 to 1 |
| `letteringMaskUrl` | Replace the main lettering mask |
| `oversprayMaskUrl` | Replace the aerosol mask |
| `dripMaskUrl` | Replace the drips mask |
| `textureUrl` | Replace the background texture |
| `posterUrl` | Static fallback during loading or asset failure |
| `label` | Accessible image description; does not alter the drawn words |
| `className`, `style` | Layout integration |

## Make it yours

This is custom vector lettering, not a font or text generator. For different words, edit `source/editable-lettering.svg` or draw your own letters. Export aligned transparent PNG or SVG masks using the same 20:13 canvas for paint, spray, and drips. Pass those files through the mask URL props, and update `label` and `posterUrl` to describe and show your artwork. Alpha controls paint coverage; RGB in a mask does not control its final color.

The default assets are pinned to a commit in this public repository. For self-hosting, copy `public/assets` into your public directory and set the asset URL props to your local paths. Cross-origin mask files must be served with CORS headers.

The component has a static fallback and an accessible image name. It has no animation loop or interaction requirements. The default masks are 1600 × 1040, suitable for most web layouts. Use higher-resolution masks for unusually large displays.

## Native art source

The `source` directory includes the centerline lettering and separate vector deposits, aerosol, and paint runs. The full GIMP source, 4000 × 2600 PNG, and native production guide are attached to the GitHub release.

## Development

```sh
npm install
npm run dev
npm run build
```

`?mode=ink` previews the recolored edition. `?mode=dry` checks the spray and drip controls.

## Rights and reference

Code, original lettering, and authored spray geometry: MIT.

Concrete040 texture: ambientCG, CC0. https://ambientcg.com/view?id=Concrete040

Technique study inspired by ogzeet's spray-paint tutorial: https://www.facebook.com/reel/1643061380794875

No generative imagery or generated typography was used. The tutorial video and proprietary brushes are not redistributed.
