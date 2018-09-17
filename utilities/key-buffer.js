/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

function KeyBuffer() {
	this.buffer = '';

	return (key) => {
		if (this.timeout) {
			clearTimeout(this.timeout);
			this.timeout = undefined;
		}

		this.timeout = setTimeout(() => {
			this.buffer = '';
		}, 400);

		this.buffer = this.buffer + key;
		return this.buffer;
	};
}

export default KeyBuffer;
