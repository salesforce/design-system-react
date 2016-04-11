/**
 * Create a pseudo-random id for creating keys
 */
export default function randomId() {
  return Math.random().toString().substr(2);
}
