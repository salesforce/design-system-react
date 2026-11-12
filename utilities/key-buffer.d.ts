/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

interface KeyBufferInstance {
	(char: string): string;
}

interface KeyBufferConstructor {
	new (): KeyBufferInstance;
	(): KeyBufferInstance;
}

declare const KeyBuffer: KeyBufferConstructor;

export default KeyBuffer;

