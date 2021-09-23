/* Some common helper functions that may
 * be required by any component */

export function isDuplicate(searchSpace, target) {
  return target in searchSpace;
}
