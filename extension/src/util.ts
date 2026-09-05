export function isDefined<T>(x: T | undefined | null): x is T {
  return x !== undefined;
}

export function cleanUpName(name: string): string;
export function cleanUpName(name: null | undefined): undefined;
export function cleanUpName(name: string | null | undefined): string | undefined;
export function cleanUpName(name: string | null | undefined) {
  if (!name) {
    return undefined;
  }

  // Remove all double-spaces
  while (name.includes("  ")) {
    name = name.replace("  ", " ");
  }

  return name;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  let debounceInterval: number | undefined = undefined;

  return (...args) => {
    clearTimeout(debounceInterval);
    return new Promise(resolve => {
      debounceInterval = setTimeout(() => resolve(func(args)), delay);
    });
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle<T extends (...args: any[]) => any>(func: T, throttleMs: number): (...args: Parameters<T>) => ReturnType<T> | null {
  let lastCallTimestamp: number | undefined = undefined;

  return (...args) => {
    const currentTimestamp = performance.now();

    if(lastCallTimestamp && currentTimestamp < lastCallTimestamp + throttleMs) {
      return null;
    }

    lastCallTimestamp = currentTimestamp;
    return func(...args) as ReturnType<T>;
  };
}
