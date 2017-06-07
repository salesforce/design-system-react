/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */


// # List Component

// ## Dependencies

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ### classNames
import classNames from 'classnames';

// ## Children
import ListItem from './item';

// ## Constants
import { LIST } from '../../../utilities/constants';

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
		 * Used internally to pass references to the individual menu items back up for focusing / scrolling.
		 */
		itemRefs: PropTypes.func,
		/**
		 * If provided, this function will be used to render the contents of each menu item.
		 */
		itemRenderer: PropTypes.func,
		/**
		 * Gets past down to the menu item and describes the menu item's for screen readers. Dropdown menus should use 'menuitem', and picklists and comboboxes should use 'option'.
		 */
		itemRole: PropTypes.oneOf(['menuitem', 'option']),
		/**
		 * Sets the height of the list based on the numeber of items.
		 */
		length: PropTypes.oneOf([null, '5', '7', '10']),
		/**
		 * Triggered when a list item is selected (via mouse or keyboard).
		 */
		onSelect: PropTypes.func,
		/**
		 * An array of items to render in the list.
		 */
		options: PropTypes.array,
		/**
		 * Role describes the menu item for screen readers. Dropdown menus should use 'menuitem', and picklists and comboboxes should use 'option'.
		 */
		role: PropTypes.oneOf(['menuitem', 'option']),
		/**
		 * The index of the currently selected item in the list.
		 */
		selectedIndex: PropTypes.number
	},

	getDefaultProps () {
		return {
			length: '5',
			options: [],
			selectedIndex: -1
		};
	},

	render () {
		let lengthClassName;
		if (this.props.length) {
			lengthClassName = `slds-dropdown--length-${this.props.length}`;
		}

		return (
			<ul
				className={classNames('dropdown__list', lengthClassName, this.props.className)}
				role="presentation"
			>
				{
					this.props.options.map((option, index) => {
						const id = this.props.getListItemId(index);

						return (
							<ListItem
								{...option}
								checkmark={this.props.checkmark}
								data={option}
								id={id}
								index={index}
								isSelected={(index === this.props.selectedIndex)}
								itemRefs={this.props.itemRefs}
								itemRole={this.props.itemRole}
								key={`${id}-${option.value}`}
								labelRenderer={this.props.itemRenderer}
								onSelect={this.props.onSelect}
							/>
						);
					})
				}
			</ul>
		);
	}
});

module.exports = List;
