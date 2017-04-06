/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Button Group design pattern](https://lightningdesignsystem.com/components/button-groups/) in React.
// Based on SLDS v2.1.1

import React from 'react';
import classNames from 'classnames';

import { BUTTON_GROUP } from '../../utilities/constants';

const propTypes = {
	/**
	 * Children are expected to be components. If last button triggers a dropdown menu, use Dropdown instead of Button.
	 */
	children: React.PropTypes.node.isRequired,
	/**
	 * CSS classes added to `slds-button-group` tag
	 */
	className: React.PropTypes.string
};

/**
 * The ButtonGroup component wraps other components (ie. Button, MenuDropdown, PopoverTooltip, etc).
 */
const ButtonGroup = (props) => {
	let children = props.children;
	const zeroIndexLength = React.Children.count(props.children) - 1;

	if (zeroIndexLength > 0) {
		children = React.Children.map(props.children, (child, index) => {
			let newChild;
			if (index === zeroIndexLength) {
				newChild = React.cloneElement(child, {
					triggerClassName: 'slds-button--last'
				});
			}

			return newChild || child;
		});
	}

	return (
		<div className={classNames('slds-button-group', props.className)} role="group">
			{children}
		</div>
	);
};

ButtonGroup.displayName = BUTTON_GROUP;
ButtonGroup.propTypes = propTypes;

module.exports = ButtonGroup;
