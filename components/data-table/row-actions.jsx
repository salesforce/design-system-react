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
		assistiveText: PropTypes.string,
		/**
		 * Class names to be added to the actions menu.
		 */
		className: PropTypes.string,
		id: PropTypes.string,
		item: PropTypes.object,
		onAction: PropTypes.func,
		options: PropTypes.array.isRequired,
	},

	getDefaultProps () {
		return {
			assistiveText: 'Actions',
		};
	},

	handleClick (e) {
		EventUtil.trap(e);
	},

	handleSelect (selection) {
		if (isFunction(this.props.onAction)) {
			this.props.onAction(this.props.item, selection);
		}
	},

	// ### Render
	render () {
		// i18n
		return (
			/* eslint-disable jsx-a11y/no-static-element-interactions */
			<td
				className=""
				data-label="Actions"
				onClick={this.handleClick}
				style={{ width: '3.25rem' }}
			>
				{/* eslint-enable jsx-a11y/no-static-element-interactions */}
				<Dropdown
					align="right"
					assistiveText={this.props.assistiveText}
					buttonClassName="slds-button--icon-x-small"
					buttonVariant="icon"
					className={this.props.className}
					options={this.props.options}
					hint
					iconName="down"
					iconSize="small"
					iconVariant="border-filled"
					id={this.props.id}
					onSelect={this.handleSelect}
				/>
			</td>
		);
	},
});

export default DataTableRowActions;
