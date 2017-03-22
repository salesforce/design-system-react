
/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */


// # Picklist Component

// Implements the [Picklist design pattern](https://www.lightningdesignsystem.com/components/menus/#flavor-picklist) in React.
// Based on SLDS v2.1.0-rc.2

// ### React
import React, { PropTypes } from 'react';

// This component's `checkProps` which issues warnings to developers about properties
// when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

// ### Children
import Dropdown from '../../components/menu-dropdown';
import PicklistTrigger from './private/picklist-trigger';

import { MENU_PICKLIST } from '../../utilities/constants';

/**
 * The MenuPicklist component is a variant of the Lightning Design System Menu component.
 */
const MenuPicklist = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: MENU_PICKLIST,

	// ### Prop Types
	propTypes: {
		/**
		 * Callback that passes in the DOM reference of the `<button>` DOM node within this component. Primary use is to allow `focus` to be called. You should still test if the node exists, since rendering is asynchronous. `buttonRef={(component) => { if(component) console.log(component); }}`
		 */
		buttonRef: PropTypes.func,
		className: PropTypes.string,
		/**
		 * If true, renders checkmark icon on the selected Menu Item.
		 */
		checkmark: PropTypes.bool,
		disabled: PropTypes.bool,
		/**
		 * Message to display when the input is in an error state. When this is present, also visually highlights the component as in error.
		 */
		errorText: PropTypes.string,
		/**
		 * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
		 */
		id: PropTypes.string,
		/**
		 * Renders menu within the wrapping trigger as a sibling of the button. By default, you will have an absolutely positioned container at an elevated z-index.
		 */
		isInline: PropTypes.bool,
		label: PropTypes.string,
		/**
		 * Custom element that overrides the default Menu Item component.
		 */
		listItemRenderer: PropTypes.func,
		onClick: PropTypes.func,
		onSelect: PropTypes.func,
		/**
		 * Menu item data.
		 */
		options: PropTypes.array.isRequired,
		placeholder: PropTypes.string,
		required: PropTypes.bool,
		/**
		 * Current selected item.
		 */
		value: PropTypes.node
	},

	getDefaultProps () {
		return {
			inheritTargetWidth: true,
			placeholder: 'Select an Option',
			checkmark: true
		};
	},

	getInitialState () {
		return {
			selectedItem: null
		};
	},

	componentWillMount () {
		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(MENU_PICKLIST, this.props);
		this.dropdownId = this.props.id || shortid.generate();
		this.triggerId = this.props.triggerId || shortid.generate();
	},

	render () {
		return (<Dropdown
			checkMark={this.props.checkmark}
			onSelect={(item) => {
				this.setState({ selectedItem: item });
				this.props.onSelect(item);
			}}
			id={this.dropdownId}
			label={(this.state.selectedItem ? this.state.selectedItem.label : null) || this.props.placeholder}
			options={this.props.options}
		>
			<PicklistTrigger
				dropdownId={this.dropdownId}
				errorText={this.props.errorText}
				id={this.triggerId}
				required={this.props.required}
			/>
		</Dropdown>);
	}

});

export default MenuPicklist;
