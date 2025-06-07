import { isObject } from "@wlt/shared";
import { ReactiveFlags } from "./constants";
import { mutableHandler } from "./basehandlers";

const reactiveMap = new WeakMap();

export const reactive = <T extends object>(v: T) => {
  return createReactiveObject(v) as T;
};

const createReactiveObject = (v: any) => {
  if (!isObject(v)) {
    return v;
  }

  if (Reflect.get(v, ReactiveFlags.IS_REACTIVE)) {
    return v;
  }

  const existProxy = reactiveMap.get(v);
  if (existProxy) {
    return existProxy;
  }

  const newProxy = new Proxy(v, mutableHandler);
  reactiveMap.set(v, newProxy);

  return newProxy;
};
export const toReactive = <T>(v: T): T => {
  return isObject(v) ? reactive(v as any) : v;
};
export const isReactive = (v: any) => {
  if (!isObject(v)) {
    return false;
  }
  return v[ReactiveFlags.IS_REACTIVE];
};
