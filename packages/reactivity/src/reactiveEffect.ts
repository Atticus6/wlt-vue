import { createDep, type Dep } from "./dep";
import { activeEffect } from "./effect";

type KeyToDepMap = Map<any, Dep>;

const targetMap = new WeakMap<object, KeyToDepMap>();
export const track = (target: any, key: any) => {
  console.log("收集依赖", key, target);
  if (!activeEffect) {
    return;
  }
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map<any, Dep>();
    targetMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = createDep(() => {
      depsMap.delete(key);
    }, key);
    depsMap.set(key, dep);
  }

  activeEffect.addDep(dep);
};

export const trigger = (
  target: any,
  key: any,
  oldValue: any,
  newValue: any
) => {
  console.log("触发更新", key, target);

  const despMap = targetMap.get(target);
  if (!despMap) return;
  const dep = despMap.get(key);
  if (!dep) return;

  triggerEffects(dep);
};

const triggerEffects = (dep: Dep) => {
  for (const effect of dep.keys()) {
    if (!effect._running) {
      effect.scheduler();
    }
  }
};
