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
  while (name.indexOf("  ") > -1) {
    name = name.replace("  ", " ");
  }

  return name;
}