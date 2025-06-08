const veiKey = Symbol("_vei");

type EventValue = Function;

interface Invoker extends EventListener {
  value: EventValue;
}

export const patchEvent = (
  el: Element & { [veiKey]?: Record<string, Invoker | undefined> },
  rawName: string,

  prevValue: EventValue | null,
  nextValue: EventValue | null
) => {
  const invokers = el[veiKey] || (el[veiKey] = {});

  const existingInvoker = invokers[rawName];

  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const eventName = rawName.slice(2).toLowerCase();
    if (nextValue) {
      const invoker = (invokers[rawName] = createInvoker(nextValue));
      el.addEventListener(eventName, invoker);
    } else if (existingInvoker) {
      el.removeEventListener(eventName, existingInvoker);
      invokers[rawName] = undefined;
    }
  }
};

function createInvoker(initialValue: EventValue): Invoker {
  const invoker = (...args: any) => invoker.value && invoker.value(...args);
  invoker.value = initialValue;

  return invoker;
}
