import { describe, it, expect } from 'vitest';
import {
  getNode,
  getStartId,
  countQuestions,
  isTerminal,
  getNextIdFromOption,
  TERMINAL_ID
} from './flowEngine';
import { FlowGraph, QuestionNode } from './flowTypes';

describe('flowEngine', () => {
  const mockFlow: FlowGraph = {
    rootId: 'q1',
    nodes: {
      q1: {
        id: 'q1',
        type: 'question',
        text: 'Question 1?',
        options: [
          { text: 'Option A', nextId: 'q2' },
          { text: 'Option B', nextId: 'END' },
        ],
      },
      q2: {
        id: 'q2',
        type: 'question',
        text: 'Question 2?',
        options: [
          { text: 'Yes', nextId: 'r1' },
        ],
      },
      r1: {
        id: 'r1',
        type: 'result',
        wineName: 'White Burgundy',
        wineKey: 'white_burgundy',
        blurb: 'A classic choice',
      },
    },
  };

  describe('getNode', () => {
    it('should return the node for a valid id', () => {
      const node = getNode(mockFlow, 'q1');
      expect(node).toBeDefined();
      expect(node?.id).toBe('q1');
    });

    it('should return undefined for invalid id', () => {
      const node = getNode(mockFlow, 'invalid');
      expect(node).toBeUndefined();
    });
  });

  describe('getStartId', () => {
    it('should return the root id of the flow', () => {
      const startId = getStartId(mockFlow);
      expect(startId).toBe('q1');
    });
  });

  describe('countQuestions', () => {
    it('should count only question nodes', () => {
      const count = countQuestions(mockFlow);
      expect(count).toBe(2);
    });
  });

  describe('isTerminal', () => {
    it('should return true for END (uppercase)', () => {
      expect(isTerminal('END')).toBe(true);
    });

    it('should return true for end (lowercase)', () => {
      expect(isTerminal('end')).toBe(true);
    });

    it('should return false for non-terminal ids', () => {
      expect(isTerminal('q1')).toBe(false);
      expect(isTerminal('r1')).toBe(false);
    });
  });

  describe('getNextIdFromOption', () => {
    it('should return the nextId for a valid option index', () => {
      const node = mockFlow.nodes.q1 as QuestionNode;
      const nextId = getNextIdFromOption(node, 0);
      expect(nextId).toBe('q2');
    });

    it('should throw error for invalid option index', () => {
      const node = mockFlow.nodes.q1 as QuestionNode;
      expect(() => getNextIdFromOption(node, 99)).toThrow();
    });
  });

  describe('TERMINAL_ID', () => {
    it('should be defined as END', () => {
      expect(TERMINAL_ID).toBe('END');
    });
  });
});
