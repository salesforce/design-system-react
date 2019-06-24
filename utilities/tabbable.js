/*!
 * Adapted from jQuery UI core
 *
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */

function focusable(element, isTabIndexNotNaN) {
	const nodeName = element.nodeName.toLowerCase();
	if (/input|select|textarea|button|object/.test(nodeName)) {
		return !element.disabled;
		// eslint-disable-next-line no-else-return
	} else if (nodeName === 'a') {
		return element.href || isTabIndexNotNaN;
	}
	return isTabIndexNotNaN;
}

function tabbable(element) {
	let tabIndex = element.getAttribute('tabindex');
	if (tabIndex === null) tabIndex = undefined;
	const isTabIndexNaN = isNaN(tabIndex);
	return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
}

function findTabbableDescendants(element) {
	return [].slice
		.call(element.querySelectorAll('*'), 0)
		.filter((el) => tabbable(el));
}

export default findTabbableDescendants;
