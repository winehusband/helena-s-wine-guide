import { z } from "zod";

export type NodeType = "question" | "message" | "wine";

export interface BaseNode {
  id: string;
  type: NodeType;
}

export interface QuestionNode extends BaseNode {
  type: "question";
  text: string;
  options: { label: string; nextId: string }[];
}

export interface MessageNode extends BaseNode {
  type: "message";
  text: string;
  nextId: string; // may be "END" sentinel
}

export interface WineNode extends BaseNode {
  type: "wine";
  wine: string; // display name
  wineKey: string; // stable key for lookup
  blurb?: string;
}

export type FlowNode = QuestionNode | MessageNode | WineNode;

export interface FlowGraph {
  rootId: string;
  nodes: Record<string, FlowNode>;
}

// Zod schemas for runtime validation
const optionSchema = z.object({
  label: z.string(),
  nextId: z.string(),
});

const questionSchema = z.object({
  id: z.string(),
  type: z.literal("question"),
  text: z.string(),
  options: z.array(optionSchema).min(1),
});

const messageSchema = z.object({
  id: z.string(),
  type: z.literal("message"),
  text: z.string(),
  nextId: z.string(),
});

const wineSchema = z.object({
  id: z.string(),
  type: z.literal("wine"),
  wine: z.string(),
  wineKey: z.string(),
  blurb: z.string().optional(),
});

export const flowNodeSchema = z.union([questionSchema, messageSchema, wineSchema]);

export const flowGraphSchema = z.object({
  rootId: z.string(),
  nodes: z.record(flowNodeSchema),
});

export function parseFlowGraph(data: unknown): FlowGraph {
  const parsed = flowGraphSchema.parse(data);

  // Validate that rootId exists in nodes
  if (!parsed.nodes[parsed.rootId]) {
    throw new Error(`Flow rootId \"${parsed.rootId}\" does not exist in nodes`);
  }

  return parsed as FlowGraph;
}

