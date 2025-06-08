import { isString } from "@wlt/shared";

type Style = Record<string, string | string[]>;

export const patchStyle = (el: Element, prev: Style, next: Style) => {
  const style = (el as HTMLElement).style;

  for (const key in next) {
    // @ts-ignore
    style[key] = next[key];
  }

  if (prev) {
    for (const key in prev) {
      if (!(key in next)) {
        // @ts-ignore
        style[key] = null;
      }
    }
  }
};
