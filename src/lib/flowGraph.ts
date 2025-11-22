import raw from "../data/wineFlow.json";
import { parseFlowGraph, type FlowGraph } from "./flowTypes";

// Parse and validate once at module load
export const flowGraph: FlowGraph = parseFlowGraph(raw);

