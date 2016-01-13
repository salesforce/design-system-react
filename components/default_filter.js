import escapeRegExp from "lodash.escaperegexp";

/**
 * A function that takes a term string and an item and returns a truthy value if the item should be kept.
 */
export default (term, item) => {
  if(!term) return true;
  return item.label.match(new RegExp(escapeRegExp(term), "ig"));
};
