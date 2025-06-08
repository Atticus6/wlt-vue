import { ShapeFlags } from "@wlt/shared";
export type ElementNamespace = "svg" | "mathml" | undefined;

export interface RendererNode {
  [key: string]: any;
}

export interface RendererElement extends RendererNode {}

export interface RendererOptions<
  HostNode = RendererNode,
  HostElement = RendererElement
> {
  patchProp(
    el: HostElement,
    key: string,
    prevValue: any,
    nextValue: any,
    namespace?: ElementNamespace
    // prevChildren?: VNode<HostNode, HostElement>[],
    // parentComponent?: ComponentInternalInstance | null,
    // parentSuspense?: SuspenseBoundary | null,
    // unmountChildren?: UnmountChildrenFn,
  ): void;
  insert(el: HostNode, parent: HostElement, anchor?: HostNode | null): void;
  remove(el: HostNode): void;
  createElement(
    type: string,
    namespace?: ElementNamespace,
    isCustomizedBuiltIn?: string
    // vnodeProps?: (VNodeProps & { [key: string]: any }) | null,
  ): HostElement;
  createText(text: string): HostNode;
  createComment(text: string): HostNode;
  setText(node: HostNode, text: string): void;
  setElementText(node: HostElement, text: string): void;
  parentNode(node: HostNode): HostElement | null;
  nextSibling(node: HostNode): HostNode | null;
  querySelector?(selector: string): HostElement | null;
  setScopeId?(el: HostElement, id: string): void;
  cloneNode?(node: HostNode): HostNode;
  insertStaticContent?(
    content: string,
    parent: HostElement,
    anchor: HostNode | null,
    namespace: ElementNamespace,
    start?: HostNode | null,
    end?: HostNode | null
  ): [HostNode, HostNode];
}

const baseCreateRenderer = <
  HostNode = RendererNode,
  HostElement = RendererElement
>(
  options: RendererOptions<HostNode, HostElement>
) => {
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    // setScopeId: hostSetScopeId = NOOP,
    insertStaticContent: hostInsertStaticContent,
  } = options;

  const mountChildren = (children: any[], container: any) => {
    children.forEach((child) => {
      patch(null, child, container);
    });
  };

  const mountElement = (vNode: any, container: any) => {
    const { type, children, props, shapeFlag } = vNode;
    const el = hostCreateElement(type) as any;

    if (props) {
      for (const key in props) {
        const val = props[key];
        hostPatchProp(el, key, null, val);
      }
    }

    if (children) {
      if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
        hostSetElementText(el, children);
      } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        mountChildren(children, el);
      }
    }

    hostInsert(el, container);
    return el;
  };

  // 渲染和更新
  const patch = (oldNode: any, newNode: any, container: any) => {
    if (oldNode === newNode) {
      return;
    }

    if (oldNode == null) {
      // 初始化 挂载节点
      mountElement(newNode, container);
    }
  };

  const render = (vNode: any, container: any) => {
    patch(vNode._vnode || null, vNode, container);
  };

  return {
    render,
  };
};

export function createRenderer<
  HostNode = RendererNode,
  HostElement = RendererElement
>(options: RendererOptions<HostNode, HostElement>) {
  return baseCreateRenderer<HostNode, HostElement>(options);
}
