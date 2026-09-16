/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import type { KeyboardEvent } from 'react';

export interface KeyboardNavigateParams {
	componentContext: {
		trigger: HTMLElement | null;
		handleClick?: (event: Event) => void;
	};
	currentFocusedIndex: number;
	event: KeyboardEvent | Event;
	isOpen: boolean;
	key?: string;
	keyCode: number;
	navigableItems: Array<{ index: number; text: string }> & {
		indexes: number[];
		keyBuffer: (char: string) => string;
	};
	onFocus: (focusedIndex: number | undefined) => void;
	onSelect: (index: number) => void;
	target: EventTarget | null;
	toggleOpen: () => void;
}

declare function keyboardNavigate(params: KeyboardNavigateParams): number | undefined;

export default keyboardNavigate;





