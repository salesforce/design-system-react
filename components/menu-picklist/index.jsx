
/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

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
	},

	getId () {
		return this.props.id || this.generatedId;
	},

	render () {
		return (<Dropdown
			checkMark={this.props.checkmark}
			onSelect={(item) => {
				this.setState({ selectedItem: item });
				this.props.onSelect(item);
			}}
			id={this.props.id}
			label={(this.state.selectedItem ? this.state.selectedItem.label : null) || this.props.placeholder}
			options={this.props.options}
		>
			<PicklistTrigger
				required={this.props.required}
			/>
		</Dropdown>);
	}
});

export default MenuPicklist;
