import type { RendererOptions } from "@wlt/runtime-core";
import { patchClass } from "./module/class";
import { patchStyle } from "./module/style";
import { patchEvent } from "./module/event";
import { patchAttr } from "./module/attr";

type DOMRendererOptions = RendererOptions<Node, Element>;
export const patchProp: DOMRendererOptions["patchProp"] = (
  el,
  key,
  prevValue,
  nextValue,
  namespace
) => {
  const isSVG = namespace === "svg";

  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (/^on[^a-z]/.test(key)) {
    patchEvent(el, key, prevValue, nextValue);
  } else {
    patchAttr(el, key, nextValue);
  }
};
