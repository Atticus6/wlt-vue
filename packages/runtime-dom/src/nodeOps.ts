import type { RendererOptions } from "@wlt/runtime-core";
const doc = (typeof document !== "undefined" ? document : null) as Document;

export const nodeOps: Omit<RendererOptions<Node, Element>, "patchProp"> = {
  insert(el, parent, anchor) {
    parent.insertBefore(el, anchor || null);
  },
  createElement(type, namespace, isCustomizedBuiltIn) {
    return doc.createElement(type);
  },
  setElementText(node, text) {
    node.textContent = text;
  },
  createText(text) {
    return doc.createTextNode(text);
  },
  setText(node, text) {
    node.nodeValue = text;
  },
  parentNode(node) {
    return node.parentNode as any;
  },
  nextSibling(node) {
    return node.nextSibling;
  },

  remove(el) {
    const parent = el.parentNode;
    if (parent) {
      parent.removeChild(el);
    }
  },
  createComment: (text) => doc.createComment(text),
};
