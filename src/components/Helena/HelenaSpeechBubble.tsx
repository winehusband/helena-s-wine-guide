/**
 * HelenaSpeechBubble Component
 * Presentational component for Helena character with speech bubble
 * Follows Golden Rules 2.1 (one component per file), 5.1 (functional component with typed props)
 */

import { type HelenaSpriteVariant } from '@/data/helenaDialogues';
import styles from './HelenaSpeechBubble.module.css';

export interface HelenaSpeechBubbleProps {
  message?: string;
  spriteVariant: HelenaSpriteVariant;
  position: 'left' | 'right';
  children?: React.ReactNode;
}

/**
 * Helena character with festive Christmas-themed speech bubble
 *
 * @param message - Text to display in speech bubble (optional)
 * @param spriteVariant - Which Helena sprite to show (default, talking, recommending, waving)
 * @param position - Helena's position relative to speech bubble (left or right)
 * @param children - React children for custom content in speech bubble
 */
export function HelenaSpeechBubble({
  message,
  spriteVariant,
  position,
  children,
}: HelenaSpeechBubbleProps) {
  const spriteMap: Record<HelenaSpriteVariant, string> = {
    default: '/helena/helena-default.svg',
    talking: '/helena/helena-talking.svg',
    recommending: '/helena/helena-recommending.svg',
    waving: '/helena/helena-waving.svg',
  };

  const containerClass = position === 'left' ? styles.containerLeft : styles.containerRight;
  const bubbleClass = position === 'left' ? styles.speechBubbleLeft : styles.speechBubbleRight;

  return (
    <div className={`${styles.container} ${containerClass}`}>
      <img
        src={spriteMap[spriteVariant]}
        alt="Helena"
        className={styles.sprite}
        onError={(e) => {
          // Fallback to emoji if sprite fails to load
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const fallback = document.createElement('div');
          fallback.textContent = '👱‍♀️🍷';
          fallback.style.fontSize = '32px';
          fallback.style.width = '64px';
          fallback.style.height = '64px';
          fallback.style.display = 'flex';
          fallback.style.alignItems = 'center';
          fallback.style.justifyContent = 'center';
          target.parentNode?.insertBefore(fallback, target);
        }}
      />
      <div className={`${styles.speechBubble} ${bubbleClass}`}>
        {message && <p className={styles.message}>{message}</p>}
        {children}
      </div>
    </div>
  );
}
