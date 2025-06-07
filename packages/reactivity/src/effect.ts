import type { Dep } from "./dep";

export let activeEffect: ReactiveEffect | undefined;

export const effect = (fn: () => any) => {
  const _effect = new ReactiveEffect(fn, () => {
    _effect.run();
  });

  _effect.run();
};

export class ReactiveEffect {
  private active = true;
  private deps: Dep[] = [];
  private _depsLength = 0;
  private _trackId = 0;
  _running = 0;

  constructor(public fn: () => any, public scheduler: () => any) {}

  run() {
    console.log("开始收集依赖");
    const lastEffect = activeEffect;
    activeEffect = this;
    this.preRun();
    try {
      this.fn();
    } finally {
      console.log("收集依赖完成", activeEffect);
      this.postRun();
      activeEffect = lastEffect;
    }
  }

  private preRun() {
    this._running++;
    this._trackId++;
    this._depsLength = 0;
  }
  private postRun() {
    this._running--;
    this._depsLength = this.deps.length;
  }

  addDep(dep: Dep) {
    if (dep.get(this) !== this._trackId) {
      dep.set(this, this._trackId);
    }
    const old = this.deps[this._depsLength];
    if (old !== dep) {
      if (old) {
        this.clearDep(old);
      }

      this.deps[this._depsLength++] = dep;
    } else {
      this._depsLength++;
    }
  }

  clearDep(dep: Dep) {
    const trackId = dep.get(this);

    if (trackId !== undefined && this._trackId !== trackId) {
      dep.delete(this);
      if (dep.size === 0) {
        dep.cleanup();
      }
    }
  }
}
