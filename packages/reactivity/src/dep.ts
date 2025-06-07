import type { ReactiveEffect } from "./effect";

export type Dep = Map<ReactiveEffect, number> & {
  name: any;
  cleanup: () => void;
};

export const createDep = (cleanup: () => void, name: any) => {
  const dep = new Map() as Dep;
  dep.cleanup = cleanup;
  dep.name = name;

  return dep;
};
