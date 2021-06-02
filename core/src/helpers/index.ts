export function isPathDuplicate<T extends Record<string, any>>(route: T, array: T[]): boolean {
  if (array.filter((el) => el.path === route.path && el.method === route.method)[0]) return true;
  return false;
}
