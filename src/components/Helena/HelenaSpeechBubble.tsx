/**
 * HelenaSpeechBubble Component - Emoji-based Design
 * Based on HelenasPicks-1 emoji character system
 * Adapted from React Native to React (web)
 * Follows Golden Rules 2.1 (one component per file), 5.1 (functional component with typed props)
 */

import { type HelenaSpriteVariant } from '@/data/helenaDialogues';
import styles from './HelenaSpeechBubble.module.css';

export interface HelenaSpeechBubbleProps {
  message?: string;
  spriteVariant: HelenaSpriteVariant;
  showMagicalEffects?: boolean;
  children?: React.ReactNode;
}

/**
 * Helena character with emoji-based thought bubble
 *
 * Character is built from emoji:
 * - Head: 👱‍♀️ (blonde woman)
 * - Props: 🍷 (wine), 📋 (notepad), 🪄 (wand)
 *
 * @param message - Text to display in thought bubble (optional)
 * @param spriteVariant - Which emoji prop Helena holds (default, talking, recommending, waving)
 * @param showMagicalEffects - Show sparkles, hat, and magic circle (for special occasions)
 * @param children - React children for custom content in thought bubble
 */
export function HelenaSpeechBubble({
  message,
  spriteVariant,
  showMagicalEffects = false,
  children,
}: HelenaSpeechBubbleProps) {
  // Map sprite variants to emoji
  const emojiMap: Record<HelenaSpriteVariant, string> = {
    default: '🍷', // Wine glass - default
    talking: '🍷', // Wine glass - for messages
    recommending: '🍷', // Wine glass - for recommendations
    waving: '🪄', // Magic wand - for special occasions
  };

  const emojiProp = emojiMap[spriteVariant];
  const isMagical = spriteVariant === 'waving' || showMagicalEffects;

  // CSS class names
  const bubbleClasses = `${styles.thoughtBubble} ${
    isMagical ? styles.thoughtBubbleMagical : ''
  }`;
  const textClasses = `${styles.thoughtText} ${
    isMagical ? styles.thoughtTextMagical : ''
  }`;
  const emojiClass =
    spriteVariant === 'waving' ? styles.magicWand : styles.wineGlass;

  return (
    <div className={styles.container}>
      {/* Magical sparkles - only for magical mode */}
      {isMagical && (
        <div className={styles.sparkles}>
          <span className={styles.sparkle}>✨</span>
          <span className={styles.sparkle}>⭐</span>
          <span className={styles.sparkle}>✨</span>
          <span className={styles.sparkle}>⭐</span>
        </div>
      )}

      {/* Thought bubble - appears above Helena's head */}
      {(message || children) && (
        <div className={bubbleClasses}>
          {message && <p className={textClasses}>{message}</p>}
          {children}
          <div className={styles.thoughtTail} />
        </div>
      )}

      {/* Helena avatar - emoji-based */}
      <div className={styles.helenaAvatar}>
        {/* Magician hat - only for magical mode */}
        {isMagical && (
          <div className={styles.magicianHat}>
            <span className={styles.hatText}>🎩</span>
            <span className={styles.hatStar}>⭐</span>
          </div>
        )}

        {/* Helena's head (blonde woman emoji) */}
        <span className={styles.helenaHead}>👱‍♀️</span>

        {/* Contextual prop (wine glass, notepad, or wand) */}
        <span className={emojiClass}>{emojiProp}</span>
      </div>

      {/* Magic circle - only for magical mode */}
      {isMagical && (
        <div className={styles.magicCircle}>
          <span className={styles.circleSymbol}>🍷</span>
          <span className={styles.circleSymbol}>🍇</span>
          <span className={styles.circleSymbol}>🥂</span>
          <span className={styles.circleSymbol}>🍾</span>
        </div>
      )}
    </div>
  );
}
