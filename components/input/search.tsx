/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { type KeyboardEvent } from 'react';

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
 * Props for the Search component
 */
export interface SearchProps extends Omit<InputProps, 'assistiveText' | 'iconLeft' | 'iconRight'> {
	/** Assistive text for accessibility */
	assistiveText?: SearchAssistiveText | string;
	/** Adds a clear button to the right of the input */
	clearable?: boolean;
	/** Handler for clear button click */
	onClear?: (event: React.MouseEvent) => void;
	/** Handler for search (enter key or search icon click) */
	onSearch?: (event: KeyboardEvent<HTMLInputElement> | React.MouseEvent) => void;
}

const handleKeyDown = (
	event: KeyboardEvent<HTMLInputElement>,
	onSearch?: (event: KeyboardEvent<HTMLInputElement> | React.MouseEvent) => void
) => {
	if (event.keyCode === KEYS.ENTER && onSearch) {
		EventUtil.trapImmediate(event);
		onSearch(event);
	}
};

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
	...props
}: SearchProps) => {
	checkProps(
		SEARCH,
		{ assistiveText, clearable, onClear, onSearch, placeholder, ...props },
		componentDoc
	);

	// Handle both string and object forms of assistiveText
	const mergedAssistiveText: InputAssistiveText =
		typeof assistiveText === 'string'
			? { label: assistiveText }
			: { label: assistiveText?.label };

	return (
		<Input
			assistiveText={mergedAssistiveText}
			iconLeft={
				<InputIcon
					assistiveText={{ icon: 'Search' }}
					category="utility"
					name="search"
					onClick={onSearch}
				/>
			}
			iconRight={
				clearable ? (
					<InputIcon
						assistiveText={{ icon: 'Clear' }}
						category="utility"
						name="clear"
						onClick={onClear}
					/>
				) : null
			}
			onKeyDown={onSearch ? (event) => handleKeyDown(event as KeyboardEvent<HTMLInputElement>, onSearch) : undefined}
			placeholder={placeholder}
			{...props}
		/>
	);
};

Search.displayName = SEARCH;

export default Search;
