export function getSafe<T>(value?: T | null): T {
  if (!value) {
    throw new Error("Value is not defined");
  }
  return value;
}
