/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import Button from '../button';
import Icon from '../icon';
import checkProps from './check-props';

const displayName = 'Notification';
const propTypes = {
	iconCategory: PropTypes.string,
	/**
	 * Custom classes applied to Notification element.
	 */
	className: PropTypes.string,
	/**
	 * Message for Notification.
	 */
	content: PropTypes.node.isRequired,
	/**
	 * If true, close button appears for users to dismiss Notification.
	 */
	dismissible: PropTypes.bool,
	/**
	 * If duration exists, the Notification will disappear after that amount of time.
	 */
	duration: PropTypes.number,
	/**
	 * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lighning Design System Icons</a> to reference icon names.
	 */
	iconName: PropTypes.string,
	isOpen: PropTypes.bool.isRequired,
	onDismiss: PropTypes.func,
	/**
	 * Styling for Notification background.
	 */
	texture: PropTypes.bool,
	/**
	 * Styling for Notification background color. Please reference <a href='http://www.lightningdesignsystem.com/components/utilities/themes/#color'>Lighning Design System Themes > Color</a>.
	 */
	theme: PropTypes.oneOf(['success', 'warning', 'error', 'offline']),
	variant: PropTypes.oneOf(['alert', 'toast']).isRequired,
};

const defaultProps = {
	iconCategory: 'utility',
	dismissible: true,
	isOpen: false,
	texture: false,
};

/**
 * ** Notification is deprecated. Please use an Alert and Toast instead.**
 * The Notification component is the Alert and Toast variants of the Lightning Design System Notification component. For prompt notifications, use the <a href='#/modal'>Modal</a> component with <code>prompt={true}</code>.
 * The Notification opens from a state change outside of the component itself (pass this state to the <code>isOpen</code> prop).
 */
class Notification extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.timeout = null;
	}

	componentDidMount() {
		checkProps('Notification', this.props);

		if (this.props.duration) {
			this.timeout = setTimeout(() => {
				this.onDismiss();
			}, this.props.duration);
		}
	}

	// eslint-disable-next-line camelcase, react/sort-comp
	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.duration) {
			if (this.timeout) {
				clearTimeout(this.timeout);
			}
			if (nextProps.isOpen) {
				this.timeout = setTimeout(() => {
					this.onDismiss();
				}, this.props.duration);
			}
		}
		if (nextProps.isOpen !== this.props.isOpen) {
			this.setState({ returnFocusTo: document.activeElement });
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.isOpen !== this.props.isOpen) {
			const btn = this.dismissBtnRef;
			if (btn) btn.focus();
		}
	}

	onDismiss = () => {
		if (this.timeout) {
			clearTimeout(this.timeout);
			this.timeout = null;
		}

		if (this.props.onDismiss) this.props.onDismiss();
		if (this.state.returnFocusTo && this.state.returnFocusTo.focus) {
			this.state.returnFocusTo.focus();
		}
	};

	getClassName() {
		return classNames(this.props.className, 'slds-notify', {
			[`slds-notify_${this.props.variant}`]: this.props.variant,
			[`slds-theme_${this.props.theme}`]: this.props.theme,
			'slds-theme_alert-texture': this.props.texture,
		});
	}

	/*
	 * The parent container with role='alert' only announces its content if there is a change inside of it.
	 * Because React renders the entire element to the DOM, we must switch out a blank div for the real content.
	 * Bummer, I know.
	 */
	// eslint-disable-next-line class-methods-use-this
	blankContent() {
		return <div />;
	}

	renderAlertContent() {
		return (
			<h2 id="dialogTitle">
				{this.renderIcon()}
				{this.props.content}
			</h2>
		);
	}

	renderClose() {
		if (this.props.dismissible) {
			let size = null;
			if (this.props.variant === 'toast') size = 'large';

			// i18n
			return (
				<Button
					assistiveText={{ icon: 'Dismiss Notification' }}
					iconCategory="utility"
					iconName="close"
					iconSize={size}
					inverse
					className="slds-notify__close"
					onClick={this.onDismiss}
					buttonRef={(dismissBtn) => {
						this.dismissBtnRef = dismissBtn;
					}}
					variant="icon"
				/>
			);
		}

		return null;
	}

	renderContent() {
		return (
			<div>
				<span className="slds-assistive-text">{this.props.theme}</span>
				{this.renderClose()}
				{this.props.variant === 'toast' ? this.renderToastContent() : null}
				{this.props.variant === 'alert' ? this.renderAlertContent() : null}
			</div>
		);
	}

	renderIcon() {
		if (this.props.iconName) {
			let classes = '';

			if (this.props.variant === 'alert') {
				classes = 'slds-m-right_x-small';
			} else if (this.props.variant === 'toast') {
				classes = 'slds-m-right_small slds-col slds-no-flex';
			}

			return (
				<Icon
					category={this.props.iconCategory}
					className={classes}
					inverse
					name={this.props.iconName}
					size="small"
				/>
			);
		}

		return null;
	}

	renderToastContent() {
		return (
			<section className="notify__content slds-grid">
				{this.renderIcon()}
				<div className="slds-col slds-align-middle">
					<h2 id="dialogTitle" className="slds-text-heading_small">
						{this.props.content}
					</h2>
				</div>
			</section>
		);
	}

	render() {
		// TODO: If there are multiple notifications on a page, we must 'hide' the ones that aren't open.
		// Need to find a better way to do this than using width:0 to override slds-notify-container.
		let styles;
		if (!this.props.isOpen) {
			styles = { width: '0px' };
		} else {
			styles =
				this.props.variant === 'toast'
					? { width: 'auto', left: '50%', transform: 'translateX(-50%)' }
					: { width: '100%' };
		}

		const alertStyles = !this.props.isOpen ? { display: 'none' } : null;
		return (
			<div className="slds-notify-container" style={styles}>
				<div
					className={this.getClassName()}
					role="alertdialog"
					aria-labelledby="dialogTitle"
					style={alertStyles}
				>
					{this.props.isOpen ? this.renderContent() : this.blankContent()}
				</div>
			</div>
		);
	}
}

Notification.displayName = displayName;
Notification.propTypes = propTypes;
Notification.defaultProps = defaultProps;

export default Notification;
