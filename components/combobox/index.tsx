/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import type React from 'react';
import LanguageDirection from '../utilities/UNSAFE_direction/private/language-direction';
import Combobox, { type ComboboxProps } from './combobox';

export type {
	ComboboxProps,
	ComboboxActionItem,
	ComboboxAssistiveText,
	ComboboxLabels,
	ComboboxEvents,
	ComboboxRenderMenuItemData,
} from './combobox';
export type {
	ComboboxOption,
	ComboboxItemOption,
	ComboboxSeparatorOption,
	ComboboxActionOption,
	ComboboxActionOptionFields,
	ComboboxDeselectOption,
	ComboboxOptionIcon,
	ComboboxOptionLabelRenderer,
	ComboboxMenuRenderMenuItemData,
} from './types';

/**
 * Keeps the wrapping `div` that the v11 rewrite renders around Combobox. The
 * menu closes through the input's blur handler, and the popover variant through
 * Popover's own click-outside.
 */
const ComboboxWrapper = (props: ComboboxProps) => (
	<div>
		<Combobox {...props} />
	</div>
);

ComboboxWrapper.displayName = 'ComboboxWithClickOutside';

// Wrap with LanguageDirection for RTL support
export default LanguageDirection(
	ComboboxWrapper
) as unknown as React.FC<ComboboxProps>;
