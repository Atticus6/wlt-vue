import { isFunction } from "@wlt/shared";
import { ReactiveEffect } from "./effect";
import { trackRefValue, triggerRefValue } from "./ref";
import type { Dep } from "./dep";

export type ComputedGetter<T> = (oldValue?: T) => T;
export type ComputedSetter<T> = (newValue: T) => void;

declare const ComputedRefSymbol: unique symbol;

export interface ComputedRef<T = any> extends WritableComputedRef<T> {
  readonly value: T;
  [ComputedRefSymbol]: true;
}

export interface WritableComputedRef<T> {
  value: T;
  readonly effect: ReactiveEffect;
}

export interface WritableComputedOptions<T> {
  get: ComputedGetter<T>;
  set: ComputedSetter<T>;
}

export function computed<T>(
  options: WritableComputedOptions<T>
): WritableComputedRef<T>;
export function computed<T>(getter: ComputedGetter<T>): ComputedRef<T>;

export function computed<T>(
  getterOrOptions: ComputedGetter<T> | WritableComputedOptions<T>
) {
  let getter: ComputedGetter<T>;
  let setter: ComputedSetter<T>;

  const onlyGetter = isFunction(getterOrOptions);

  if (onlyGetter) {
    getter = getterOrOptions;
    setter = () => {};
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }

  const cRef = new ComputedRefImpl(getter, setter, onlyGetter);

  return cRef as unknown as WritableComputedRef<T> | ComputedRef<T>;
}

class ComputedRefImpl<T> {
  _value: any = undefined;
  _effect: ReactiveEffect;
  dep?: Dep;
  constructor(
    getter: ComputedGetter<T>,
    private readonly _setter: ComputedSetter<T>,
    isReadonly: boolean
  ) {
    this._effect = new ReactiveEffect(
      () => getter(this._value),
      () => {
        triggerRefValue(this);
      }
    );
  }

  get value() {
    // debugger;
    if (this._effect.dirty) {
      console.log("run");

      const newValue = this._effect.run();
      if (newValue !== this._value) {
        this._value = newValue;
        trackRefValue(this);
      }
    }
    return this._value;
  }
}
