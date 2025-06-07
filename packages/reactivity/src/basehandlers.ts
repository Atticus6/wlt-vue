import { isObject } from "@wlt/shared";
import { ReactiveFlags } from "./constants";
import { reactive } from "./reactive";
import { track, trigger } from "./reactiveEffect";

export const mutableHandler: ProxyHandler<any> = {
  get(target, key, receiver) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return true;
    }
    track(target, key);
    const res = Reflect.get(target, key, receiver);
    if (isObject(res)) {
      return reactive(res);
    }
    return res;
  },

  set(target, key, newValue, receiver) {
    const oldValue = target[key];

    const result = Reflect.set(target, key, newValue, receiver);
    if (newValue !== oldValue) {
      trigger(target, key, oldValue, newValue);
    }

    return result;
  },
};
