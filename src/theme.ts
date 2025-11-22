/**
 * HelenaSips Brand Theme
 * Warm, playful, cosy wine vibe
 * 
 * This theme object is exported for any JS/TS that needs direct access
 * to theme values outside of Tailwind classes.
 */

export const theme = {
  colours: {
    // Core brand
    primary: '#db258f',        // Magenta
    primarySoft: '#fcd8cc',    // Peach

    // Backgrounds
    background: '#f8ebdd',     // Cream (page background)
    panel: '#fcf6ee',          // Linen (cards)
    panelSoft: '#fffdfc',      // Light linen (inner panels)

    // Text
    textMain: '#000002',       // Near black
    textMuted: '#224448',      // Forest for softer headings or accents

    // Accents and borders
    accent: '#224448',         // Forest
    borderSubtle: '#fcf6ee'
  },
  radius: {
    card: '18px',
    button: '999px'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  }
};
