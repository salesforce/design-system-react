/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

// ### React
import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

// ### isFunction
import isFunction from 'lodash.isfunction';

// ## Children
import Dropdown from '../menu-dropdown';

// ### Event Helpers
import EventUtil from '../../utilities/event';

// ## Constants
import { DATA_TABLE_ROW_ACTIONS } from '../../utilities/constants';

/**
 * RowActions provide a mechanism for defining a menu to display alongside each row in the DataTable.
 */
const DataTableRowActions = createReactClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: DATA_TABLE_ROW_ACTIONS,

	// ### Prop Types
	propTypes: {
		/**
		 * Description of the menu for screenreaders.
		 */
		assistiveText: PropTypes.object,
		/**
		 * Class names to be added to the actions menu.
		 */
		className: PropTypes.string,
		/**
		 * HTML ID to be added to the actions menu.
		 */
		id: PropTypes.string,
		/**
		 * `DataTable` row item
		 */
		item: PropTypes.object,
		/**
		 * Disable hint styling which changes the color of the dropdown svg on hover over.
		 */
		noHint: PropTypes.bool,
		/**
		 * Triggered when an item is selected.
		 */
		onAction: PropTypes.func,
		/**
		 * `Dropdown` options. See `Dropdown`.
		 */
		options: PropTypes.array,
		/**
		 * A [Dropdown](http://react.lightningdesignsystem.com/components/dropdown-menus/) component. The props from this drop will be merged and override any default props.
		 * **Note:** onAction will not be overridden, both `DropDown`'s onSelect(dropDownActionOption) and onAction(rowItem, dropdownActionOption) will be called with appropriate parameters
		 */
		dropdown: PropTypes.node,
	},

	getDefaultProps () {
		return {
			assistiveText: { icon: 'Actions' },
			noHint: false,
			options: [],
		};
	},

	handleClick (e) {
		EventUtil.trap(e);
	},

	handleSelect (selection) {
		if (isFunction(this.props.onAction)) {
			this.props.onAction(this.props.item, selection);
		}
		if (this.props.dropdown && isFunction(this.props.dropdown.props.onSelect)) {
			this.props.dropdown.props.onSelect(selection);
		}
	},

	// ### Render
	render () {
		// i18n
		const defaultDropdownProps = {
			align: 'right',
			buttonClassName: 'slds-button--icon-x-small',
			buttonVariant: 'icon',
			iconCategory: 'utility',
			iconName: 'down',
			iconSize: 'small',
			iconVariant: 'border-filled',
			assistiveText: this.props.assistiveText,
			className: this.props.className,
			options: this.props.options,
			hint: !this.props.noHint,
			id: this.props.id,
		};

		const props = this.props.dropdown ? this.props.dropdown.props : {};
		const dropdownProps = {
			...defaultDropdownProps,
			...props,
			onSelect: this.handleSelect,
		};

		return (
			/* eslint-disable jsx-a11y/no-static-element-interactions */
			<td
				className=""
				data-label="Actions"
				onClick={this.handleClick}
				style={{ width: '3.25rem' }}
			>
				{/* eslint-enable jsx-a11y/no-static-element-interactions */}
				<Dropdown {...dropdownProps} />
			</td>
		);
	},
});

export default DataTableRowActions;
