/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Button Group design pattern](https://lightningdesignsystem.com/components/button-groups/) in React.
// Based on SLDS v2.1.1

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import assign from 'lodash.assign';

import { BUTTON_GROUP } from '../../utilities/constants';

const propTypes = {
	/**
	 * Children are expected to be components. If last button triggers a dropdown menu, use Dropdown instead of Button. _Tested with snapshot testing._
	 */
	children: PropTypes.node.isRequired,
	/**
	 * CSS classes added to `slds-button-group` or `slds-checkbox--button-group` tag
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * **Text labels for internationalization**
	 * This object is merged with the default props object on every render.
	 * * `error`: Message to display when any of Checkboxes are in an error state. _Tested with snapshot testing._
	 * * `label`: This label appears above the button group. _Tested with snapshot testing._
	 */
	labels: PropTypes.shape({
		error: PropTypes.string,
		label: PropTypes.string,
	}),
	/**
	 * Use checkbox variant for "Checkbox Button Group" styling and add Checkbox components as children _Tested with snapshot testing._
	 */
	variant: PropTypes.oneOf(['checkbox']),
};

const defaultProps = { labels: {} };

/**
 * The ButtonGroup component wraps other components (ie. Button, MenuDropdown, PopoverTooltip, Checkboxes, etc).
 */
const ButtonGroup = (props) => {
	// Merge objects of strings with their default object
	const labels = props
		? assign({}, defaultProps.labels, props.labels)
		: defaultProps.labels;

	let children = props.children;
	const zeroIndexLength = React.Children.count(props.children) - 1;

	if (zeroIndexLength > 0) {
		children = React.Children.map(props.children, (child, index) => {
			let newChild;
			if (index === zeroIndexLength) {
				newChild = React.cloneElement(child, {
					triggerClassName: 'slds-button--last',
				});
			}

			return newChild || child;
		});
	}

	if (props.variant === 'checkbox') {
		children = React.Children.map(props.children, (child) =>
			React.cloneElement(child, {
				variant: 'button-group',
			})
		);
	}

	if (props.variant === 'checkbox') {
		return (
			<fieldset
				className={classNames('slds-form-element', {
					'slds-has-error': labels.error,
				})}
			>
				<legend className="slds-form-element__legend slds-form-element__label">
					{props.labels.label}
				</legend>
				<div className="slds-form-element__control">
					<div
						className={classNames(
							'slds-checkbox--button-group',
							props.className
						)}
					>
						{children}
					</div>
					{labels.error ? (
						<div className="slds-form-element__help">{labels.error}</div>
					) : null}
				</div>
			</fieldset>
		);
	}
	// default
	return (
		<div
			className={classNames('slds-button-group', props.className)}
			role="group"
		>
			{children}
		</div>
	);
};

ButtonGroup.displayName = BUTTON_GROUP;
ButtonGroup.propTypes = propTypes;
ButtonGroup.defaultProps = defaultProps;

export default ButtonGroup;
