/**
 * This file contains a nice set of number related
 * helper functions.
 *
 * @author Johnny Mast <mastjohnny@gmail.com>
 */

/**
 * Contrain a number between a minimal low and
 * maximal high value.
 *
 * @global
 * @param {number} n the number value
 * @param {number} low the lowest allowed value
 * @param {high} high the highest allowed value
 */
global.constrain = (n, low, high) => {
  if (n < low) n = low
  if (n > high) n = high
  return n
}