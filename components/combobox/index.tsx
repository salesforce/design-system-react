/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useRef, forwardRef, type ForwardedRef } from 'react';
import LanguageDirection from '../utilities/UNSAFE_direction/private/language-direction';
import Combobox, { type ComboboxProps } from './combobox';
import { useClickOutside } from '../../utilities/hooks/use-click-outside';

export type { ComboboxProps, ComboboxAssistiveText, ComboboxLabels, ComboboxEvents } from './combobox';
export type { ComboboxOption } from './private/menu';

/**
 * Combobox wrapper that handles click outside detection
 * Replaces react-onclickoutside HOC for React 19 compatibility
 */
const ComboboxWithClickOutside = forwardRef<HTMLDivElement, ComboboxProps>(
	(props, ref: ForwardedRef<HTMLDivElement>) => {
		const containerRef = useRef<HTMLDivElement>(null);
		const comboboxRef = useRef<{ handleClickOutside?: (event: MouseEvent | TouchEvent) => void }>(null);

		// Use our custom hook to detect clicks outside
		useClickOutside(
			containerRef,
			(event) => {
				// The Combobox component handles click outside via handleRequestClose
				// This is triggered when clicking outside the combobox container
				if (comboboxRef.current?.handleClickOutside) {
					comboboxRef.current.handleClickOutside(event);
				}
			},
			{
				enabled: true,
				ignoreClass: 'ignore-react-onclickoutside',
			}
		);

		return (
			<div ref={containerRef}>
				<Combobox {...props} />
			</div>
		);
	}
);

ComboboxWithClickOutside.displayName = 'ComboboxWithClickOutside';

// Wrap with LanguageDirection for RTL support
export default LanguageDirection(ComboboxWithClickOutside) as unknown as React.FC<ComboboxProps>;

