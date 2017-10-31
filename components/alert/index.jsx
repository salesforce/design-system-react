/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Alert Component

// Implements the [Alert design pattern](https://lightningdesignsystem.com/components/alert/) in React.

import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utilities/class-names';
import Button from '../button';
import checkProps from './check-props';
import { ALERT } from '../../utilities/constants';
import assign from 'lodash.assign';
import DOMElementFocus from '../../utilities/dom-element-focus';

const propTypes = {
	/**
	 * **Assistive text for accessibility**
	 * This object is merged with the default props object on every render.
	 * * `closeButton`: This is used as a visually hidden label if, no `labels.label` is provided.
	 * _Tested with snapshot testing._
	 */
	assistiveText: PropTypes.object,
	/**
	 * CSS classes to be added to tag with `.slds-notify_alert`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 * _Tested with snapshot testing._
	 */
	className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
	/**
	 * Allows user to click a close button. Banners should be dismissible only if they communicate future impact to the system,
	 * _Tested with snapshot testing._
	 */
	dismissible: PropTypes.bool,
	/**
	 * Icon of type `~/components/icon`. Additional props will be added for formatting by this component. _Tested with snapshot testing._
	 */
	icon: PropTypes.node.isRequired,
	/**
	 * Contents of alert. _Tested with snapshot testing._
	 */
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	/**
	 * Triggered by close button. _Tested with Mocha testing._
	 */
	onRequestClose: PropTypes.func,
	/**
	 * The type of alert. _Tested with snapshot testing._
	 */
	variant: PropTypes.oneOf(['error', 'info', 'offline', 'warning']).isRequired
};

const defaultProps = {
	assistiveText: {
		closeButton: 'Close'
	},
	variant: 'info'
};

/**
 * Alert banners communicate a state that affects the entire system, not just a feature or page. It persists over a session and appears without the user initiating the action. View [banner guidelines](https://www.lightningdesignsystem.com/guidelines/messaging/components/banners/).
 */

class Alert extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			isInitialRender: true
		};
	}

	componentWillMount () {
		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(ALERT, this.props);
	}

	componentWillUnmount () {
		DOMElementFocus.returnFocusToStoredElement();
	}

	saveButtonRef = (component) => {
		this.closeButton = component;
		if (this.state.isInitialRender) {
			DOMElementFocus.storeActiveElement();
			this.closeButton.focus();
			this.setState({ isInitialRender: false });
		}
	}

	render () {
		// Merge objects of strings with their default object
		const assistiveText = assign({}, defaultProps.assistiveText, this.props.assistiveText);

		const assistiveTextVariant = {
			info: 'info',
			warning: 'warning',
			error: 'error',
			offline: 'offline'
		};

		const clonedIcon = React.cloneElement(this.props.icon, {
			className: 'slds-m-right--x-small',
			inverse: true,
			size: 'x-small'
		});

		return (
			<div
				className={classNames('slds-notify slds-notify_alert slds-theme_alert-texture', {
					'slds-theme_info': this.props.variant === 'info',
					'slds-theme_warning': this.props.variant === 'warning',
					'slds-theme_error': this.props.variant === 'error',
					'slds-theme_offline': this.props.variant === 'offline'
				},
				this.props.className)}
				role="alert"
			>
				<span className="slds-assistive-text">{assistiveTextVariant[this.props.variant]}</span>
				{clonedIcon}
				<h2>{this.props.label}</h2>
				{this.props.dismissible
					? <Button
						assistiveText={assistiveText.closeButton}
						buttonRef={this.saveButtonRef}
						className="slds-notify__close"
						iconCategory="utility"
						iconName="close"
						inverse
						onClick={this.props.onRequestClose}
						title={assistiveText.closeButton}
						variant="icon"
					/>
				: null}
			</div>
		);
	}
}

Alert.defaultProps = defaultProps;
Alert.displayName = ALERT;
Alert.propTypes = propTypes;

export default Alert;
