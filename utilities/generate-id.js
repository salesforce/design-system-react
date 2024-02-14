import shortid from 'shortid';

/**
 * Generate unique ID that is also a valid CSS identifier.
 * @returns {string} The unique ID.
 */
function generateId() {
	/**
	 * `shortid.generate()` by itself will generates IDs that
	 * are not always valid [1] CSS identifiers (e.g. will start
	 * with a digit). So, when other parts of the codebase will
	 * use those IDs as a selector, a `SyntaxError`² will be thrown
	 * (i.e. `'#...' is not a valid selector`).
	 *
	 * The `slds-` prefix is used so to keep things simple.
	 * `shortid.characters()` requires "a string of all 64 unique
	 * characters"³, which means that in order to generate valid
	 * CSS identifiers a-z, A-Z, and some "ISO 10646 characters
	 * U+00A0 and higher"¹ will need to be included.
	 *
	 * [1] https://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	 * [2] https://dom.spec.whatwg.org/#selectors
	 * [3] https://github.com/dylang/shortid/blob/937ce2c8dd7001baec1785cb8dce6e6fe1bcf61f/README.md#shortidcharactersstring
	 */

	return `slds-${shortid.generate()}`;
}

export default generateId;
