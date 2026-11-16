/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { forwardRef, type ForwardedRef } from 'react';
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
	ComboboxDeselectOption,
} from './private/menu';

/**
 * Combobox wrapper. It used to host the react-onclickoutside HOC; the
 * Combobox closes on outside interaction through its input blur handler, so
 * the wrapper only keeps the container `div` and the component's type.
 */
const ComboboxWithClickOutside = forwardRef<HTMLDivElement, ComboboxProps>(
	(props, _ref: ForwardedRef<HTMLDivElement>) => {
		return (
			<div>
				<Combobox {...props} />
			</div>
		);
	}
);

ComboboxWithClickOutside.displayName = 'ComboboxWithClickOutside';

// Wrap with LanguageDirection for RTL support
export default LanguageDirection(
	ComboboxWithClickOutside
) as unknown as React.FC<ComboboxProps>;
