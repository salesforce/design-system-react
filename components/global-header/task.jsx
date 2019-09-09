/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Global Header Task Component
// Implements the [Global Header Task design pattern](https://www.lightningdesignsystem.com/components/global-header/#Task) in React.

import React from 'react';
import PropTypes from 'prop-types';
import assign from 'lodash.assign';
import Button from '../button';
import Dropdown from '../menu-dropdown';
import DropdownTrigger from '../menu-dropdown/button-trigger';

import { GLOBAL_HEADER_TASK } from '../../utilities/constants';

const propTypes = {
	/**
	 * **Assistive text for accessibility**
	 * * `triggerButton`: Assistive text for the GlobalHeaderTask trigger button. The default is `Global Actions`.
	 */
	assistiveText: PropTypes.shape({
		triggerButton: PropTypes.string,
	}),
	/**
	 * A `Dropdown` component. The props from this dropdown will be merged and override any default props. This also allows custom content to be passed as children and rendered in the dropdown.
	 */
	dropdown: PropTypes.node,
};

/**
 * A GlobalHeaderTask component.
 */
class GlobalHeaderTask extends React.Component {
	render() {
		const buttonAriaProps = {
			'aria-haspopup': true,
		};
		const dropdownProps = assign(
			{
				align: 'right',
				nubbinPosition: 'top right',
			},
			this.props.dropdown ? this.props.dropdown.props : {}
		);
		const dropdownChildren = dropdownProps.children || null;

		// eslint-disable-next-line fp/no-delete
		delete dropdownProps.children;

		return (
			<Dropdown {...dropdownProps}>
				<DropdownTrigger>
					<Button
						assistiveText={{ icon: this.props.assistiveText.triggerButton }}
						className="slds-button_icon slds-global-actions__task slds-global-actions__item-action"
						iconCategory="utility"
						iconName="add"
						iconSize="small"
						iconVariant="container"
						title={this.props.assistiveText.triggerButton}
						variant="icon"
						{...buttonAriaProps}
					/>
				</DropdownTrigger>
				{dropdownChildren}
			</Dropdown>
		);
	}
}

GlobalHeaderTask.displayName = GLOBAL_HEADER_TASK;

GlobalHeaderTask.defaultProps = {
	assistiveText: {
		triggerButton: 'Global Actions',
	},
};

GlobalHeaderTask.propTypes = propTypes;

export default GlobalHeaderTask;
