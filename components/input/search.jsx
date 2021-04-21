/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Search Component

// Wraps the input to default to a search style.

// ## Dependencies

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ## Children
import Input from './index';
import InputIcon from '../icon/input-icon';

import checkProps from './check-props';
import componentDoc from './component.json';

// ### Event Helpers
import KEYS from '../../utilities/key-code';
import EventUtil from '../../utilities/event';

// ## Constants
import { SEARCH } from '../../utilities/constants';

const handleKeyDown = (event, onSearch) => {
	if (event.keyCode === KEYS.ENTER) {
		EventUtil.trapImmediate(event);
		onSearch(event);
	}
};

const defaultProps = {
	assistiveText: {},
};

/**
 * A `Search` is an `Input` which renders the search icon by default. It can be cleared, too. All `Input` props not specified as props already may be used with this component and will override defaults.
 */
const Search = ({ clearable, onClear, onSearch, placeholder, ...props }) => {
	checkProps(SEARCH, props, componentDoc);
	const assistiveText =
		typeof props.assistiveText === 'string'
			? props.assistiveText
			: {
					...defaultProps.assistiveText,
					...props.assistiveText,
			  }.label;
	return (
		<Input
			assistiveText={{ label: assistiveText }}
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
			onKeyDown={onSearch ? (event) => handleKeyDown(event, onSearch) : null}
			placeholder={placeholder}
			{...props}
		/>
	);
};

Search.displayName = SEARCH;

Search.propTypes = {
	/**
	 * **Assistive text for accessibility.**
	 * This object is merged with the default props object on every render.
	 * * `label`: Assistive text to search input
	 */
	assistiveText: PropTypes.shape({
		label: PropTypes.string,
	}),
	/**
	 * Adds a clear button to right side of the input
	 */
	clearable: PropTypes.bool,
	/**
	 * Triggers when the clear button is clicked
	 */
	onClear: PropTypes.func,
	/**
	 * This event fires when enter is pressed in the `input` or the search button is clicked.
	 */
	onSearch: PropTypes.func,
	/**
	 * Placeholder for the input
	 */
	placeholder: PropTypes.string,
};

Search.defaultProps = defaultProps;

export default Search;
