/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Global Header Task Component
// Implements the [Pill design pattern](https://www.lightningdesignsystem.com/components/global-header/#Task) in React.

import React from 'react';
import PropTypes from 'prop-types';
import assign from 'lodash.assign';
import Button from '../button';
import classNames from 'classnames';
import MenuDropdown from '../menu-dropdown';
import MenuDropdownTrigger from '../menu-dropdown/button-trigger';

import { GLOBAL_HEADER_TASK } from '../../utilities/constants';

const propTypes = {
	/**
	 * **Assistive text for accessibility**
	 * * `triggerButtonIcon`: Assistive text for the GlobalHeaderTask trigger button icon. The default is `Global Actions`.
	 */
	assistiveText: PropTypes.shape({
		triggerButtonIcon: PropTypes.string
	}),
	/**
	 * A `MenuDropdown` component. The props from this menu dropdown will be merged and override any default props. This also allows custom content to be passed as children and rendered in the menu dropdown.
	 */
	menuDropdown: PropTypes.node
};

/**
 * A GlobalHeaderTask component.
 */
class GlobalHeaderTask extends React.Component {
	render() {
		const menuDropdownProps = assign({
			align: 'right',
			nubbinPosition: 'top right'
		}, this.props.menuDropdown ? this.props.menuDropdown.props : {});
		const menuDropdownChildren = menuDropdownProps.children || null;

		delete menuDropdownProps.children;

		return (
			<MenuDropdown {...menuDropdownProps}>
				<MenuDropdownTrigger>
					<Button
						assistiveText={{ icon: this.props.assistiveText.triggerButtonIcon }}
						className={classNames('slds-button_icon', 'slds-global-actions__task', 'slds-global-actions__item-action')}
						iconCategory="utility"
						iconName="add"
						iconSize="small"
						iconVariant="container"
						variant="icon"
					/>
				</MenuDropdownTrigger>
				{menuDropdownChildren}
			</MenuDropdown>
		);
	}
}

GlobalHeaderTask.displayName = GLOBAL_HEADER_TASK;

GlobalHeaderTask.defaultProps = {
	assistiveText: {
		triggerButtonIcon: 'Global Actions'
	}
};

GlobalHeaderTask.propTypes = propTypes;

export default GlobalHeaderTask;
