/*
 * Remove keys with undefined values. This is useful
 * for merging object props like `assistiveText` and `labels`
 * and keeping default prop values.
 */

const removeUndefined = (obj) => {
	const newObj = {};
	Object.keys(obj).forEach((prop) => {
		if (typeof obj[prop] !== 'undefined') {
			newObj[prop] = obj[prop];
		}
	});
	return newObj;
};

const helpers = { removeUndefined };

export default helpers;
