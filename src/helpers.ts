export function copyWithoutReference<T>(object: T): T {
  return JSON.parse(JSON.stringify(object));
}
