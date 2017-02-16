/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Search Component

// Wraps the input to default to a search style.

// ## Dependencies

// ### React
import React, { PropTypes } from 'react';

// ## Children
import Input from './index';
import InputIcon from '../../icon/input-icon';

// ### Event Helpers
import { KEYS, EventUtil } from '../../../utilities';

// ## Constants
import { FORMS_SEARCH } from '../../../utilities/constants';

const handleKeyDown = (event, onSearch) => {
	if (event.keyCode === KEYS.ENTER) {
		EventUtil.trapImmediate(event);
		onSearch(event);
	}
};

/**
 * A `Search` is an `Input` which renders the search icon by default. It can be cleared, too. All `Input` props not specified as props already may be used with this component and will override defaults.
 */
const Search = ({ assistiveText, clearable, onClear, onSearch, placeholder, ...props }) => (
	<Input
		assistiveText={assistiveText}
		iconLeft={
			<InputIcon
				assistiveText="Search"
				category="utility"
				name="search"
				onClick={onSearch}
			/>}
		iconRight={clearable ? <InputIcon
			assistiveText="Clear"
			category="utility"
			name="clear"
			onClick={onClear}
		/> : null}
		onKeyDown={onSearch ? (event) => handleKeyDown(event, onSearch) : null}
		placeholder={placeholder}
		{...props}
	/>
);

Search.displayName = FORMS_SEARCH;

Search.propTypes = {
	/**
	 * Assistive text to search input
	 */
	assistiveText: PropTypes.string,
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
	onSearch: React.PropTypes.func,
	/**
	 * Placeholder for the input
	 */
	placeholder: PropTypes.string
};

module.exports = Search;
