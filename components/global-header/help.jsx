/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Global Header Help Component
// Implements the [Global Header Help design pattern](https://www.lightningdesignsystem.com/components/global-header/#Help) in React.

import React from 'react';
import PropTypes from 'prop-types';
import assign from 'lodash.assign';
import Button from '../button';
import Popover from '../popover';

import { GLOBAL_HEADER_HELP } from '../../utilities/constants';

const propTypes = {
	/**
	 * **Assistive text for accessibility**
	 * * `triggerButton`: Assistive text for the GlobalHeaderHelp trigger button. The default is `Help and Training`.
	 */
	assistiveText: PropTypes.shape({
		triggerButton: PropTypes.string,
	}),
	/**
	 * A `Popover` component. The props from this popover will be merged and override any default props. The `children` prop will be ignored.
	 */
	popover: PropTypes.node,
};

/**
 * A GlobalHeaderHelp component.
 */
class GlobalHeaderHelp extends React.Component {
	render() {
		const buttonAriaProps = {
			'aria-haspopup': true,
		};
		const popoverProps = assign(
			{
				align: 'bottom',
				body: <span />,
				triggerClassName: 'slds-dropdown-trigger slds-dropdown-trigger_click',
			},
			this.props.popover ? this.props.popover.props : {}
		);

		// eslint-disable-next-line fp/no-delete
		delete popoverProps.children;

		return (
			<Popover {...popoverProps}>
				<Button
					assistiveText={{ icon: this.props.assistiveText.triggerButton }}
					className="slds-button_icon slds-global-actions__help slds-global-actions__item-action"
					iconCategory="utility"
					iconClassName="slds-global-header__icon"
					iconName="question"
					iconSize="small"
					iconVariant="container"
					title={this.props.assistiveText.triggerButton}
					variant="icon"
					{...buttonAriaProps}
				/>
			</Popover>
		);
	}
}

GlobalHeaderHelp.displayName = GLOBAL_HEADER_HELP;

GlobalHeaderHelp.defaultProps = {
	assistiveText: {
		triggerButton: 'Help and Training',
	},
};

GlobalHeaderHelp.propTypes = propTypes;

export default GlobalHeaderHelp;
