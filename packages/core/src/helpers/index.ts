export function pathSanitizer(path: string) {
  if (path.includes('/')) {
    return path.split('/')[0];
  } else {
    return path;
  }
}
