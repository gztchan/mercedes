export const nextTick = function (callback) {
  setTimeout(() => callback());
}
