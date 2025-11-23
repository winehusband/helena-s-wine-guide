/**
 * useHelenaDialogue Hook
 * Shared logic for Helena character appearance across different flow contexts
 * Follows Golden Rules 2.4 (DRY) and 2.5 (Extract shared logic to hooks)
 */

import { useMemo } from 'react';
import { getHelenaDialogue, type HelenaDialogue, type HelenaSpriteVariant } from '@/data/helenaDialogues';

export interface UseHelenaDialogueResult {
  shouldShow: boolean;
  message?: string;
  spriteVariant: HelenaSpriteVariant;
  position: 'left' | 'right';
}

export interface UseHelenaDialogueOptions {
  context: 'question' | 'message' | 'result';
  nodeId?: string;
  customMessage?: string;
  forceHide?: boolean;
}

/**
 * Centralized hook for Helena character logic
 *
 * @param options Configuration for Helena's appearance
 * @returns Helena dialogue data and visibility state
 *
 * @example
 * // In MessageView
 * const helena = useHelenaDialogue({
 *   context: 'message',
 *   nodeId: currentNodeId,
 *   customMessage: messageText
 * });
 *
 * if (helena.shouldShow) {
 *   return <HelenaSpeechBubble {...helena} />;
 * }
 */
export function useHelenaDialogue(options: UseHelenaDialogueOptions): UseHelenaDialogueResult {
  const { context, nodeId, customMessage, forceHide = false } = options;

  const result = useMemo(() => {
    // If forceHide is true, don't show Helena
    if (forceHide) {
      return {
        shouldShow: false,
        message: undefined,
        spriteVariant: 'default' as HelenaSpriteVariant,
        position: 'left' as const,
      };
    }

    // Get dialogue configuration from data layer
    const dialogue = getHelenaDialogue(context, nodeId);

    if (!dialogue) {
      return {
        shouldShow: false,
        message: undefined,
        spriteVariant: 'default' as HelenaSpriteVariant,
        position: 'left' as const,
      };
    }

    return {
      shouldShow: true,
      message: customMessage || dialogue.message,
      spriteVariant: dialogue.spriteVariant,
      position: dialogue.position,
    };
  }, [context, nodeId, customMessage, forceHide]);

  return result;
}
