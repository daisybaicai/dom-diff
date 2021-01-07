export function isString(node) {
  return Object.prototype.toString.call(node) === "[object String]";
}
