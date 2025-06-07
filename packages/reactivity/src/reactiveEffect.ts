export const track = (target: any, key: any) => {
  console.log("收集依赖", key, target);
};

export const trigger = (
  target: any,
  key: any,
  oldValue: any,
  newValue: any
) => {
  console.log("触发更新", key, target);
};
