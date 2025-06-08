import type { RendererOptions } from "@wlt/runtime-core";
import { nodeOps } from "./nodeOps";
import { patchProp } from "./patchProp";
export const rendererOptions: RendererOptions<Node, Element> = {
  ...nodeOps,
  patchProp,
};
