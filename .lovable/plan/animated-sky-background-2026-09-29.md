# Animated sky background

## What will change
- Replace the current blurred decorative background with a fixed, lightweight sky layer shared by every page.
- Light mode will use a soft blue daytime sky, restrained sunlight, slow translucent cloud bands, and sparse particles.
- Dark mode will use a deep navy night sky, moonlight, sparse twinkling stars, faint cloud bands, atmospheric particles, and rare tiny shooting stars.
- Blend both states during theme changes without altering page content, navigation, cards, or controls.

## Performance and accessibility
- Build the effect entirely with CSS and a small fixed set of decorative elements: no animation library, canvas, video, downloaded imagery, or JavaScript animation loop.
- Animate only transforms and opacity, contain the fixed layer, and keep every element absolutely positioned so it cannot cause layout shifts.
- Reduce particle density on small screens and disable movement, twinkling, and shooting stars for reduced-motion or constrained-device mode.
- Remove the old fixed body gradients so the new sky is the only page background effect.

## Verification
- Check light/dark appearance and theme transitions on desktop and mobile.
- Confirm no overflow, layout shifts, missing assets, console/runtime errors, or broken existing interactions.
- Confirm the preview build remains healthy.
