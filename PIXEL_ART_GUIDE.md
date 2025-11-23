# Helena Pixel Art Guide

This guide will help you create or source 90s-style pixelated Helena sprites for the wine quiz.

## Sprite Requirements

### Dimensions
- **Size**: 64x64 pixels (can be scaled up to 96x96 if needed)
- **Format**: PNG with transparency OR SVG
- **Style**: 90s retro RPG/game aesthetic (think Final Fantasy, Pokemon, or Chrono Trigger)

### Character Design
- **Character**: Beautiful blonde woman (Helena)
- **Accessory**: Holding a wine glass in at least one variant
- **Color Palette**:
  - Blonde hair: #FFD700 (gold)
  - Dress/clothing: #DB258F (magenta) - matches website primary color
  - Skin: #F8EBD1 (cream/peach)
  - Wine glass: #224448 (forest green/dark) or #8B0000 (wine red)

### Sprite Variants Needed

1. **helena-default.svg** - Neutral/standing pose
   - Helena standing, facing forward
   - Neutral expression
   - Hands at sides or crossed
   - Use: Appears subtly during question screens

2. **helena-talking.svg** - Talking/expressive pose
   - Mouth open or animated expression
   - Maybe hand gesture
   - Lively, conversational vibe
   - Use: Delivers fun messages in speech bubbles

3. **helena-recommending.svg** - Holding wine glass
   - Holding/presenting a wine glass
   - Confident, sommelier-like pose
   - Slight smile
   - Use: Presents wine recommendations

4. **helena-waving.svg** (Optional) - Greeting pose
   - Hand raised in wave
   - Friendly expression
   - Use: Welcome/goodbye screens (future enhancement)

## Option 1: AI Generation

### Using DALL-E, Midjourney, or Similar

**Prompt Template:**
```
90s pixel art sprite, 64x64 pixels, retro RPG style game character, beautiful blonde woman in magenta dress [POSE DESCRIPTION], transparent background, limited color palette, crisp pixels, Final Fantasy style

For helena-default:
"...standing neutral pose, hands at sides..."

For helena-talking:
"...animated talking expression, mouth open, hand gesture..."

For helena-recommending:
"...holding wine glass, confident pose, presenting..."
```

**Settings:**
- Output size: 512x512 or 1024x1024 (will be downscaled)
- Style keywords: "pixel art", "retro game", "8-bit", "16-bit"
- Export as PNG with transparency

**Post-processing:**
1. Download the AI-generated image
2. Use an image editor (Photoshop, GIMP, or online tool) to:
   - Resize to exactly 64x64 pixels
   - Apply pixelation filter if needed
   - Ensure transparency background
   - Save as PNG

## Option 2: Manual Pixel Art Creation

### Tools

**Free:**
- **Piskel** (https://www.piskel.app) - Browser-based, beginner-friendly
- **Aseprite** (paid but worth it) - Professional pixel art tool
- **GIMP** - Free image editor with pixel art capabilities
- **Pixilart** (https://www.pixilart.com) - Free online pixel art tool

**Paid:**
- **Aseprite** ($20) - Industry standard for pixel art
- **Pro Motion NG** - Advanced pixel art tool

### Piskel Quick Start (Recommended for Beginners)

1. Go to https://www.piskel.app
2. Click "Create Sprite"
3. Set canvas size to 64x64
4. Choose limited color palette:
   - Add: #FFD700, #DB258F, #F8EBD1, #224448, #000000, #FFFFFF
5. Draw your character using the pencil tool
6. Keep it simple - less is more in pixel art!
7. Export as PNG (transparent background)

### Tips for Manual Creation

- **Start with a sketch**: Rough out the shape in light color first
- **Use outlines**: Black or dark outlines help sprites "pop"
- **Limited colors**: Stick to 5-8 colors maximum
- **Anti-aliasing**: Use manual anti-aliasing (1-2 pixels of mid-tone between colors)
- **Symmetry**: Use symmetry for the face/body, then add asymmetric details
- **Reference**: Look at 90s RPG sprites for inspiration (Final Fantasy VI, Chrono Trigger)

## Option 3: Commission an Artist

### Where to Find Pixel Artists

- **Fiverr** - Search "pixel art character sprite" (~$10-30)
- **Etsy** - Custom pixel art commissions
- **Reddit** r/PixelArt, r/gameDevClassifieds
- **Twitter/X** - Search #pixelartist #pixelartcommission
- **ArtStation** - Professional artists

### Commission Brief Template

```
I need 3-4 pixel art sprites of a character named Helena for a wine quiz website.

Character Description:
- Beautiful blonde woman
- 90s retro RPG/game style
- Holding wine glass (at least one variant)
- Color palette: gold blonde hair (#FFD700), magenta dress (#DB258F), cream skin (#F8EBD1)

Specifications:
- Size: 64x64 pixels
- Format: PNG with transparent background
- Style: Final Fantasy/Chrono Trigger aesthetic
- Sprites needed:
  1. Neutral standing pose
  2. Talking/animated expression
  3. Holding wine glass (recommending)
  4. (Optional) Waving

Budget: [your budget]
Deadline: [your deadline]
```

## Option 4: Use Placeholder and Enhance Later

The current implementation uses simple SVG placeholders with emoji fallback. You can:

1. Keep the SVG placeholders for now
2. Replace them later with proper pixel art when ready
3. Simply drop new PNG files into `/public/helena/` folder

## Installing Your Sprites

Once you have your pixel art:

1. **Name your files correctly:**
   - `helena-default.svg` or `helena-default.png`
   - `helena-talking.svg` or `helena-talking.png`
   - `helena-recommending.svg` or `helena-recommending.png`
   - `helena-waving.svg` or `helena-waving.png`

2. **Place in the correct folder:**
   ```
   /public/helena/
   ```

3. **If using PNG instead of SVG:**
   - Update `/src/components/Helena/HelenaSpeechBubble.tsx`
   - Change file extensions from `.svg` to `.png` in the `spriteMap`

4. **Optimize your images:**
   - For PNG: Use TinyPNG (https://tinypng.com) to compress
   - For SVG: Use SVGOMG (https://jakearchibald.github.io/svgomg/)

5. **Test:**
   - Visit http://localhost:8081/ (or your dev server)
   - Go through the quiz and check Helena appears correctly

## Technical Notes

- **Image rendering**: The CSS includes `image-rendering: pixelated` to keep sprites crisp when scaled
- **Transparency**: Always use transparent backgrounds (not white)
- **File size**: Keep under 10KB per sprite for fast loading
- **Fallback**: If a sprite fails to load, the component shows an emoji fallback (👱‍♀️🍷)

## Resources & Inspiration

### Pixel Art Tutorials
- Lospec (https://lospec.com/pixel-art-tutorials)
- Pedro Medeiros' Pixel Art Course (Twitter: @saint11)
- Brandon James Greer (YouTube)

### Color Palettes
- Lospec Palettes (https://lospec.com/palette-list)
- Current website colors are already defined in the guide above

### Sprite References
- Final Fantasy VI sprites
- Chrono Trigger characters
- Stardew Valley portraits
- Pokemon Gen 1-3 sprites

## Questions?

If you need help or have questions about the pixel art integration, check the main README.md or open an issue in the repository.

Happy pixel art creating! 🎨✨
