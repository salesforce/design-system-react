/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// `KeyboardEvent.key` values. Compare with `event.key`; `keyCode` and `which`
// are deprecated DOM APIs.
const keys = {
	ENTER: 'Enter',
	ESCAPE: 'Escape',
	SPACE: ' ',
	LEFT: 'ArrowLeft',
	UP: 'ArrowUp',
	RIGHT: 'ArrowRight',
	DOWN: 'ArrowDown',
	TAB: 'Tab',
	DELETE: 'Delete',
	BACKSPACE: 'Backspace',
};

// Event init objects for tests: `fireEvent.keyDown(node, keyObjects.DOWN)`.
const keyObjects = Object.fromEntries(
	Object.entries(keys).map(([name, key]) => [name, { key }])
);

export default keys;
export { keyObjects };
