export function isPathDuplicate<T extends Record<string, any>>(route: T, array: T[]): boolean {
  if (array.filter((el) => el.path === route.path && el.method === route.method)[0]) return true;
  return false;
}

// export function extrctParams(path: string, request: Request) {
//   //todo improve
//   if (!request.params || Object.keys(request.params).length === 0) return;
//   let params: Record<string, string | number | symbol> = {};
//   path
//     .split('/')
//     .filter((p) => !['', '/', ' '].includes(p))
//     .map((p) => {
//       if (!p.includes(':')) return p;
//       p = p.replace(':', '');
//       params[p] = request.params[p];
//       return p;
//     });
//   return params;
// }
