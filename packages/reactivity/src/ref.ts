import { createDep, type Dep } from "./dep";
import { activeEffect } from "./effect";
import { toReactive } from "./reactive";
import { triggerEffects } from "./reactiveEffect";

export const ref = <T>(v: T) => {
  return new RefImpl(v);
};

class RefImpl<T> {
  public readonly __v_isRef = true;

  private _value: T;
  private dep?: Dep;

  constructor(v: T) {
    this._value = toReactive(v);
  }

  get value() {
    trackRefValue(this as any);
    return this._value;
  }

  set value(newValue: T) {
    if (this._value !== newValue) {
      this._value = toReactive(newValue);
      triggerRefValue(this as any);
    }
  }
}

const trackRefValue = (ref: { dep?: Dep }) => {
  if (!activeEffect) {
    return;
  }

  if (!ref.dep) {
    ref.dep = createDep(() => {
      ref.dep = undefined;
      //   trackRefValue(ref);
    }, "ref");
  }
  activeEffect.addDep(ref.dep);
};

const triggerRefValue = (ref: { dep?: Dep }) => {
  if (ref.dep) {
    triggerEffects(ref.dep);
  }
};
