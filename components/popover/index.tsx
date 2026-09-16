/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Note: react-onclickoutside HOC has been removed.
// Click outside detection is handled by the Dialog utility component.
// Future work: Consider migrating from Popper.js to @floating-ui/react

import Popover, { PopoverNubbinPositions } from './popover';

export type {
	PopoverProps,
	PopoverAlign,
	PopoverPosition,
	PopoverVariant,
	PopoverAssistiveText,
} from './popover';

export { PopoverNubbinPositions };
export default Popover;














