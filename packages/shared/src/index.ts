export * from "./shapeFlags";
export const isObject = (value: any) => {
  return typeof value === "object" && value !== null;
};

export const isFunction = (val: unknown): val is Function =>
  typeof val === "function";

export const isString = (val: unknown): val is string =>
  typeof val === "string";
