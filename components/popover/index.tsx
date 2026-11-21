/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Popover detects outside clicks itself with `useClickOutside`.
// Future work: Consider migrating from Popper.js to @floating-ui/react

import Popover, { PopoverNubbinPositions } from './popover';

export type {
	PopoverProps,
	PopoverAlign,
	PopoverPosition,
	PopoverVariant,
	PopoverAssistiveText,
	PopoverRequestCloseTrigger,
	PopoverRequestCloseData,
	PopoverRequestOpenTrigger,
	PopoverRequestOpenData,
	PopoverOpenData,
	PopoverCloseData,
} from './popover';

export { PopoverNubbinPositions };
export default Popover;
