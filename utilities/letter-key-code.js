/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Event init objects for tests, one per letter: `keyObjects.a` is `{ key: 'a' }`.
const keys = {};
const keyObjects = {};

for (let i = 65; i <= 122; i += 1) {
	const key = String.fromCharCode(i);
	keys[key] = key;
	keyObjects[key] = { key };
}

export default keys;
export { keyObjects };
