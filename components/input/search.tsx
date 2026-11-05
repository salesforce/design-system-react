/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useCallback, useRef, type KeyboardEvent } from 'react';

import Input, { type InputProps, type InputAssistiveText } from './index';
import InputIcon from '../icon/input-icon/index';
import checkProps from './check-props';
import componentDoc from './component.json';
import KEYS from '../../utilities/key-code';
import EventUtil from '../../utilities/event';
import { SEARCH } from '../../utilities/constants';

/**
 * Assistive text for Search component
 */
export interface SearchAssistiveText extends InputAssistiveText {
	/** Label for the search input */
	label?: string;
}

/**
 * Data passed to `onSearch`
 */
export interface SearchData {
	/** The input's value when the search was requested */
	value: string;
}

/**
 * Data passed to `onClear`
 */
export interface SearchClearData {
	/** The input's value when the clear button was clicked, before the consumer clears it */
	value: string;
}

/**
 * Props for the Search component
 */
export interface SearchProps extends Omit<
	InputProps,
	'assistiveText' | 'iconLeft' | 'iconRight'
> {
	/** Assistive text for accessibility */
	assistiveText?: SearchAssistiveText;
	/** Adds a clear button to the right of the input */
	clearable?: boolean;
	/** Called when the clear button is clicked. `data.value` is the input's current value. */
	onClear?: (event: React.MouseEvent, data: SearchClearData) => void;
	/**
	 * Called when Enter is pressed in the input or the search icon is clicked. `data.value` is the
	 * input's current value.
	 */
	onSearch?: (
		event: KeyboardEvent<HTMLInputElement> | React.MouseEvent,
		data: SearchData
	) => void;
}

/**
 * A `Search` is an `Input` which renders the search icon by default.
 * It can be cleared, too. All `Input` props not specified as props
 * already may be used with this component and will override defaults.
 *
 * @see https://lightningdesignsystem.com/components/input/
 */
const Search = ({
	assistiveText,
	clearable = false,
	onClear,
	onSearch,
	placeholder,
	inputRef,
	...props
}: SearchProps) => {
	checkProps(
		SEARCH,
		{
			assistiveText,
			clearable,
			onClear,
			onSearch,
			placeholder,
			inputRef,
			...props,
		},
		componentDoc
	);

	// Read the value from the element so `data.value` is right whether or not `value` is controlled
	const inputElementRef = useRef<HTMLInputElement | null>(null);
	const handleInputRef = useCallback(
		(element: HTMLInputElement | null) => {
			inputElementRef.current = element;
			inputRef?.(element);
		},
		[inputRef]
	);
	const getValue = () => inputElementRef.current?.value ?? '';

	const handleSearchClick = (event: React.MouseEvent) => {
		onSearch?.(event, { value: getValue() });
	};
	const handleClearClick = (event: React.MouseEvent) => {
		onClear?.(event, { value: getValue() });
	};
	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.keyCode === KEYS.ENTER && onSearch) {
			EventUtil.trapImmediate(event);
			onSearch(event, { value: getValue() });
		}
	};

	const mergedAssistiveText: InputAssistiveText = {
		label: assistiveText?.label,
	};

	return (
		<Input
			assistiveText={mergedAssistiveText}
			iconLeft={
				<InputIcon
					assistiveText={{ icon: 'Search' }}
					category="utility"
					name="search"
					onClick={onSearch ? handleSearchClick : undefined}
				/>
			}
			iconRight={
				clearable ? (
					<InputIcon
						assistiveText={{ icon: 'Clear' }}
						category="utility"
						name="clear"
						onClick={onClear ? handleClearClick : undefined}
					/>
				) : null
			}
			onKeyDown={
				onSearch
					? (event) => handleKeyDown(event as KeyboardEvent<HTMLInputElement>)
					: undefined
			}
			placeholder={placeholder}
			inputRef={handleInputRef}
			{...props}
		/>
	);
};

Search.displayName = SEARCH;

export default Search;
