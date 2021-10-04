export function financial(x) {
  return Number.parseFloat(x).toFixed(2);
}
export const capitalize = (word) =>
  word[0].toUpperCase() + word.slice(1).toLowerCase();
