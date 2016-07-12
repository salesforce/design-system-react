/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # List Component

// ## Dependencies

// ### React
import React from 'react';

// ### classNames
import classNames from 'classnames';

// ## Children
import ListItem from './list-item';

// ### Event Helpers
import { EventUtil } from '../../utilities';

// ## Constants
import { LIST } from '../../utilities/constants';

// Removes the need for `PropTypes`.
const { PropTypes } = React;

/**
 * Component description.
 */
const List = React.createClass({
	displayName: LIST,

	propTypes: {
		/**
		 * Determines whether or not to show a checkmark for selected items.
		 */
		checkmark: PropTypes.bool,
		/**
		 * CSS classes to be added to `<ul />`.
		 */
		className: PropTypes.string,
		/**
		 * Used internally to determine the id that will be used for list items.
		 */
		getListItemId: PropTypes.func,
		/**
		 * True if the list was opened via hover.
		 */
		isHover: PropTypes.bool,
		/**
		 * Used internally to pass references to the individual menu items back up for focusing / scrolling.
		 */
		itemRefs: PropTypes.func,
		/**
		 * If provided, this function will be used to render the contents of each menu item.
		 */
		itemRenderer: PropTypes.func,
		/**
		 * Sets the height of the list based on the numeber of items.
		 */
		length: PropTypes.oneOf(['5', '7', '10']),
		/**
		 * Triggered when a list item loses focuses.
		 */
		onListItemBlur: PropTypes.func,
		/**
		 * Triggered when a list item is selected (via mouse or keyboard).
		 */
		onSelect: PropTypes.func.isRequired,
		/**
		 * An array of items to render in the list.
		 */
		options: PropTypes.array,
		/**
		 * The index of the currently selected item in the list.
		 */
		selectedIndex: PropTypes.number,
		/**
		 * The id of the element which triggered this list (in a menu context).
		 */
		triggerId: PropTypes.string
	},

	getDefaultProps () {
		return {
			length: '5',
			options: [],
			selectedIndex: -1
		};
	},

	handleMouseDown (event) {
		EventUtil.trapImmediate(event);
	},

	handleClick (event) {
		EventUtil.trapImmediate(event);
	},

	getItems () {
		return this.props.options.map((option, index) => {
			const id = this.props.getListItemId(index);

			return (
				<ListItem
					{...option}
					checkmark={this.props.checkmark}
					data={option}
					id={id}
					index={index}
					isHover={this.props.isHover}
					isSelected={(index === this.props.selectedIndex)}
					key={`${id}-${option.value}`}
					labelRenderer={this.props.itemRenderer}
					onBlur={this.props.onListItemBlur}
					onSelect={this.props.onSelect}
					ref={(listItem) => this.props.itemRefs(listItem, index)}
				/>
			);
		});
	},

	render () {
		let lengthClassName;
		if (this.props.length) {
			lengthClassName = `slds-dropdown--length-${this.props.length}`;
		}

		return (
			<ul
				aria-labelledby={this.props.triggerId}
				className={classNames('dropdown__list', lengthClassName, this.props.className)}
				role="menu"
			>
				{this.getItems()}
			</ul>
		);
	}
});

module.exports = List;
