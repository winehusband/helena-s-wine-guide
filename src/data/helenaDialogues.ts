/**
 * Helena Dialogues Data
 * Centralized content for Helena's speech bubbles across different contexts
 * Follows Golden Rule 2.3: Separation of data from logic
 */

export type HelenaSpriteVariant = 'default' | 'talking' | 'recommending' | 'waving';

export interface HelenaDialogue {
  message?: string;
  spriteVariant: HelenaSpriteVariant;
  position: 'left' | 'right';
}

/**
 * Message node dialogues - Helena delivers fun commentary
 * These correspond to the 3 message nodes in wineFlow.json
 */
export const messageDialogues: Record<string, HelenaDialogue> = {
  closed_1: {
    message: undefined, // Uses message from flow node
    spriteVariant: 'talking',
    position: 'left',
  },
  closed_2: {
    message: undefined, // Uses message from flow node
    spriteVariant: 'talking',
    position: 'left',
  },
  whole_point_msg: {
    message: undefined, // Uses message from flow node
    spriteVariant: 'talking',
    position: 'left',
  },
};

/**
 * Question node dialogues - Helena provides subtle presence
 * Can be extended per-question for context-aware commentary
 */
export const questionDialogues: HelenaDialogue = {
  spriteVariant: 'default',
  position: 'right',
};

/**
 * Result node dialogues - Helena presents wine recommendations
 */
export const resultDialogues: HelenaDialogue = {
  spriteVariant: 'recommending',
  position: 'left',
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
