/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Alert Component

// Implements the [Alert design pattern](https://lightningdesignsystem.com/components/alert/) in React.

import React from 'react';
import PropTypes from 'prop-types';
import assign from 'lodash.assign';
import classNames from '../../utilities/class-names';
import Button from '../button';
import Icon from '../icon';
import checkProps from './check-props';
import componentDoc from './component.json';
import { ALERT } from '../../utilities/constants';
import DOMElementFocus from '../../utilities/dom-element-focus';
import EventUtil from '../../utilities/event';

const propTypes = {
	/**
	 * **Assistive text for accessibility**
	 * This object is merged with the default props object on every render.
	 * * `closeButton`: This is a visually hidden label for the close button.
	 * _Tested with snapshot testing._
	 */
	assistiveText: PropTypes.shape({
		closeButton: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	}),
	/**
	 * CSS classes to be added to tag with `.slds-notify_alert`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 * _Tested with snapshot testing._
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Allows user to click a close button. Banners should be dismissible only if they communicate future impact to the system,
	 * _Tested with snapshot testing._
	 */
	dismissible: PropTypes.bool,
	/**
	 * Icon of type `~/components/icon`. This icon will be cloned and additional props appended. The default icons are:
	 * * info variant: `utility:info`
	 * * error variant: `utility:error`
	 * * offline variant: `utility:offline`
	 * * warning variant: `utility:warning`
	 *
	 * _Tested with snapshot testing._
	 */
	icon: PropTypes.node,
	/**
	 * **Text labels for internationalization**
	 * This object is merged with the default props object on every render.
	 * * `heading`: text within heading tag
	 * * `headingLink`: Text of link that triggers `onClickHeadingLink`. Inline links should pass a keyed array of React components into `labels.heading`.
	 *
	 * _Tested with snapshot testing._
	 */
	labels: PropTypes.shape({
		heading: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
		headingLink: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	}),
	/**
	 * Triggered by link. _Tested with Mocha testing._
	 */
	onClickHeadingLink: PropTypes.func,
	/**
	 * Triggered by close button. This is a controlled component. _Tested with Mocha testing._
	 */
	onRequestClose: PropTypes.func,
	/**
	 * Custom styles to be passed to the component. _Tested with Mocha testing._
	 */
	style: PropTypes.object,
	/**
	 * The type of alert. _Tested with snapshot testing._
	 */
	variant: PropTypes.oneOf(['error', 'info', 'offline', 'warning']).isRequired,
};

const defaultProps = {
	assistiveText: {
		closeButton: 'Close',
	},
	labels: {},
	variant: 'info',
};

/**
 * Alert banners communicate a state that affects the entire system, not just a feature or page. It persists over a session and appears without the user initiating the action. View [banner guidelines](https://www.lightningdesignsystem.com/guidelines/messaging/components/banners/).
 */

class Alert extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isInitialRender: true,
		};

		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(ALERT, props, componentDoc);
	}

	componentWillUnmount() {
		DOMElementFocus.returnFocusToStoredElement();
	}

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

	render() {
		// Merge objects of strings with their default object
		const assistiveText = assign(
			{},
			defaultProps.assistiveText,
			this.props.assistiveText
		);
		const labels = assign({}, defaultProps.labels, this.props.labels);

		// BACKWARD COMPATIBILITY WITH NOTIFICATION
		const heading = labels.heading || this.props.content; // eslint-disable-line react/prop-types
		const onRequestClose = this.props.onRequestClose || this.props.onDismiss; // eslint-disable-line react/prop-types

		const assistiveTextVariant = {
			info: 'info',
			warning: 'warning',
			error: 'error',
			offline: 'offline',
		};

		const defaultIcons = {
			info: <Icon category="utility" name="info" />,
			offline: <Icon category="utility" name="offline" />,
			warning: <Icon category="utility" name="warning" />,
			error: <Icon category="utility" name="error" />,
		};

		let icon = this.props.icon
			? this.props.icon
			: defaultIcons[this.props.variant];

		// BACKWARD COMPATIBILITY WITH NOTIFICATION
		if (this.props.iconName && this.props.iconCategory) {
			// eslint-disable-line react/prop-types
			icon = (
				<Icon category={this.props.iconCategory} name={this.props.iconName} />
			);
		}

		const clonedIcon = React.cloneElement(icon, {
			containerClassName: 'slds-m-right_x-small',
			inverse: true,
			size: 'x-small',
		});

		return (
			<div
				className={classNames(
					'slds-notify slds-notify_alert slds-theme_alert-texture',
					{
						'slds-theme_info': this.props.variant === 'info',
						'slds-theme_warning': this.props.variant === 'warning',
						'slds-theme_error': this.props.variant === 'error',
						'slds-theme_offline': this.props.variant === 'offline',
					},
					this.props.className
				)}
				role="alert"
				style={this.props.style}
			>
				<span className="slds-assistive-text">
					{assistiveTextVariant[this.props.variant]}
				</span>
				{clonedIcon}
				<h2>
					{heading}{' '}
					{labels.headingLink ? (
						<a
							onClick={EventUtil.trappedHandler(this.props.onClickHeadingLink)}
							href="#"
						>
							{labels.headingLink}
						</a>
					) : null}
				</h2>
				{this.props.dismissible ? (
					<Button
						assistiveText={{ icon: assistiveText.closeButton }}
						buttonRef={this.saveButtonRef}
						className="slds-notify__close"
						iconCategory="utility"
						iconName="close"
						iconSize="medium"
						inverse
						onClick={onRequestClose}
						title={assistiveText.closeButton}
						variant="icon"
					/>
				) : null}
			</div>
		);
	}
}

Alert.defaultProps = defaultProps;
Alert.displayName = ALERT;
Alert.propTypes = propTypes;

export default Alert;
