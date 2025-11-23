/**
 * Helena Dialogues Data
 * Centralized content for Helena's thought bubbles across different contexts
 * Based on HelenasPicks-1 emoji character system
 * Follows Golden Rule 2.3: Separation of data from logic
 */

export type HelenaSpriteVariant = 'default' | 'talking' | 'recommending' | 'waving';

export interface HelenaDialogue {
  message?: string;
  spriteVariant: HelenaSpriteVariant;
  showMagicalEffects?: boolean;
}

/**
 * Message node dialogues - Helena delivers fun commentary
 * These correspond to the 3 message nodes in wineFlow.json
 */
export const messageDialogues: Record<string, HelenaDialogue> = {
  closed_1: {
    message: undefined, // Uses message from flow node
    spriteVariant: 'talking',
  },
  closed_2: {
    message: undefined, // Uses message from flow node
    spriteVariant: 'talking',
  },
  whole_point_msg: {
    message: undefined, // Uses message from flow node
    spriteVariant: 'talking',
  },
};

/**
 * Question node dialogues - Helena provides subtle presence
 * No thought bubble, just Helena holding wine glass
 */
export const questionDialogues: HelenaDialogue = {
  spriteVariant: 'default',
};

/**
 * Result node dialogues - Helena presents wine recommendations
 */
export const resultDialogues: HelenaDialogue = {
  spriteVariant: 'recommending',
};

/**
 * Get Helena dialogue for a specific context
 */
export function getHelenaDialogue(
  context: 'question' | 'message' | 'result',
  nodeId?: string
): HelenaDialogue | null {
  switch (context) {
    case 'message':
      return nodeId && messageDialogues[nodeId] ? messageDialogues[nodeId] : null;
    case 'question':
      return questionDialogues;
    case 'result':
      return resultDialogues;
    default:
      return null;
  }
}
