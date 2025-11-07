export function watchForElement(
  root: Element,
  selector: string,
  onFind: (e: Element) => (() => void) | undefined
) {
  let teardownFn: (() => void) | undefined = undefined;

  const interval = setInterval(() => {
    const el = root.querySelector(selector);
    if (el) {
      teardownFn = onFind(el);
      if (teardownFn) {
        clearInterval(interval);
      }
    }
  }, 100);

  return () => {
    clearInterval(interval);
    teardownFn?.();
  };
}
