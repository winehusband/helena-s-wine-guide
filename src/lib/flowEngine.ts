import { FlowGraph, FlowNode, QuestionNode } from "./flowTypes";

export const TERMINAL_ID = "END";

export function getNode(flow: FlowGraph, id: string): FlowNode | undefined {
  return flow.nodes[id];
}

export function getStartId(flow: FlowGraph): string {
  return flow.rootId;
}

export function countQuestions(flow: FlowGraph): number {
  return Object.values(flow.nodes).filter((n) => n.type === "question").length;
}

export function isTerminal(nextId: string): boolean {
  return nextId.toUpperCase() === TERMINAL_ID;
}

export function getNextIdFromOption(node: QuestionNode, optionIndex: number): string {
  const opt = node.options[optionIndex];
  if (!opt) throw new Error(`Option index ${optionIndex} out of range for node ${node.id}`);
  return opt.nextId;
}

