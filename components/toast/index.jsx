/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Toast Component

// Implements the [Toast design pattern](https://lightningdesignsystem.com/components/toasts/) in React.

import React from 'react';
import PropTypes from 'prop-types';

import assign from 'lodash.assign';
import { shape } from 'airbnb-prop-types';

import classNames from '../../utilities/class-names';
import Button from '../button';
import Icon from '../icon';
import checkProps from './check-props';
import { TOAST } from '../../utilities/constants';
import DOMElementFocus from '../../utilities/dom-element-focus';

const propTypes = {
	/**
	 * **Assistive text for accessibility**
	 * This object is merged with the default props object on every render.
	 * * `closeButton`: This is a visually hidden label for the close button.
	 * _Tested with snapshot testing._
	 */
	assistiveText: shape({
		closeButton: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	}),
	/**
	 * CSS classes to be added to tag with `.slds-notify_toast`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 * _Tested with snapshot testing._
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * If duration exists, the Toast will disappear after that amount of time. Time in milliseconds. _Tested with Mocha testing._
	 */
	duration: PropTypes.number,
	/**
	 * **Text labels for internationalization**
	 * This object is merged with the default props object on every render.
	 * * `details`: Secondary text below heading
	 * * `heading`: text within heading tag
	 * * `headingLink`: Text of link that triggers `onClickHeadingLink`. Inline links should pass a keyed array of React components into `labels.heading`.
	 *
	 * _Tested with snapshot testing._
	 */
	labels: shape({
		details: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
		heading: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
		headingLink: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	}),
	/**
	 * Triggered by link. _Tested with Mocha testing._
	 */
	onClickHeadingLink: PropTypes.func,
	/**
	 * Icon of type `~/components/icon`. This icon will be cloned and additional props appended. The default icons are:
	 * * info variant: `utility:info`
	 * * error variant: `utility:error`
	 * * success variant: `utility:success`
	 * * warning variant: `utility:warning`
	 *
	 * _Tested with snapshot testing._
	 */
	icon: PropTypes.node,
	/**
	 * Triggered by close button. _Tested with Mocha testing._
	 */
	onRequestClose: PropTypes.func,
	/**
	 * The type of Toast. _Tested with snapshot testing._
	 */
	variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
};

const defaultProps = {
	assistiveText: {
		closeButton: 'Close',
	},
	variant: 'info',
};

/**
 * Toast serves as a feedback & confirmation mechanism after the user takes an action. View [banner guidelines](https://www.lightningdesignsystem.com/guidelines/messaging/components/banners/).
 */

class Toast extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			isInitialRender: true,
		};
		this.timeout = null;
	}

	componentWillMount () {
		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(TOAST, this.props);
	}

	componentDidMount () {
		if (this.props.duration) {
			this.timeout = setTimeout(() => {
				this.onClose();
			}, this.props.duration);
		}
	}

	componentWillUnmount () {
		DOMElementFocus.returnFocusToStoredElement();
	}

	onClose = () => {
		if (this.timeout) {
			clearTimeout(this.timeout);
			this.timeout = null;
		}

		if (this.props.onRequestClose) {
			this.props.onRequestClose();
		}
	};

	saveButtonRef = (component) => {
		this.closeButton = component;
		if (this.state.isInitialRender) {
			DOMElementFocus.storeActiveElement();
			if (this.closeButton) {
				this.closeButton.focus();
			}
			this.setState({ isInitialRender: false });
		}
	};

	render () {
		// Merge objects of strings with their default object
		const assistiveText = assign(
			{},
			defaultProps.assistiveText,
			this.props.assistiveText,
		);
		const labels = assign({}, defaultProps.labels, this.props.labels);
		const heading = labels.heading || this.props.content; // eslint-disable-line react/prop-types

		const assistiveTextVariant = {
			info: 'info',
			success: 'success',
			warning: 'warning',
			error: 'error',
		};

		const defaultIcons = {
			info: <Icon category="utility" name="info" />,
			success: <Icon category="utility" name="success" />,
			warning: <Icon category="utility" name="warning" />,
			error: <Icon category="utility" name="error" />,
		};

		const icon = this.props.icon
			? this.props.icon
			: defaultIcons[this.props.variant];

		const clonedIcon = React.cloneElement(icon, {
			containerClassName: 'slds-m-right_small slds-no-flex slds-align-top',
			inverse: true,
			size: 'small',
		});

		/* eslint-disable no-script-url */
		return (
			<div
				className={classNames(
					'slds-notify slds-notify_toast',
					{
						'slds-theme_info': this.props.variant === 'info',
						'slds-theme_success': this.props.variant === 'success',
						'slds-theme_warning': this.props.variant === 'warning',
						'slds-theme_error': this.props.variant === 'error',
					},
					this.props.className,
				)}
				role="alert"
			>
				<span className="slds-assistive-text">
					{assistiveTextVariant[this.props.variant]}
				</span>
				{clonedIcon}
				<div className="slds-notify__content">
					<h2 className="slds-text-heading_small">
						{heading}{' '}
						{labels.headingLink ? (
							<a
								onClick={this.props.onClickHeadingLink}
								href="javascript:void(0);"
							>
								{labels.headingLink}
							</a>
						) : null}
					</h2>
					{labels.details ? <p>{labels.details}</p> : null}
				</div>
				<Button
					assistiveText={assistiveText.closeButton}
					buttonRef={this.saveButtonRef}
					className="slds-notify__close"
					iconCategory="utility"
					iconName="close"
					iconSize="large"
					inverse
					onClick={this.props.onRequestClose}
					title={assistiveText.closeButton}
					variant="icon"
				/>
			</div>
		);
	}
}

Toast.defaultProps = defaultProps;
Toast.displayName = TOAST;
Toast.propTypes = propTypes;

export default Toast;
