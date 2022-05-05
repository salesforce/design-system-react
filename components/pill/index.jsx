/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Pill Component
// Implements the [Pill design pattern](https://lightningdesignsystem.com/components/pills/) in React.

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PILL } from '../../utilities/constants';
import UtilityIcon from '../utilities/utility-icon';
import KEYS from '../../utilities/key-code';
import EventUtil from '../../utilities/event';

const propTypes = {
	/**
	 * **Assistive text for accessibility**
	 * This object is merged with the default props object on every render.
	 * * `remove`: This is a visually hidden label for the close button.
	 * _Tested with snapshot testing._
	 */
	assistiveText: PropTypes.shape({
		remove: PropTypes.string,
	}),
	/**
	 * SLDSAvatar component to show on the left of the pill.
	 * _Tested with Mocha framework._
	 */
	avatar: PropTypes.element,
	/**
	 * Applies the bare style to the component.
	 * _Tested with Mocha framework._
	 */
	bare: PropTypes.bool,
	/**
	 * This is a way to specify custom contents for the pill in the case a simple text label is not enough.
	 * _Tested with Mocha framework._
	 */
	children: PropTypes.node,
	/**
	 * CSS classes to be added to tag with `.slds-pill`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 * _Tested with Mocha framework._
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Applies the error style to the component.
	 * _Tested with Mocha framework._
	 */
	hasError: PropTypes.bool,
	/**
	 * An href to use if the pill is shown as a link.
	 * _Tested with Mocha framework._
	 */
	href: PropTypes.string,
	/**
	 * SLDSIcon component to show on the left of the pill.
	 * _Tested with Mocha framework._
	 */
	icon: PropTypes.element,
	/**
	 * **Text labels for internationalization**
	 * This object is merged with the default props object on every render.
	 * * `label`: Pill's label.
	 * * `title`: Pill's title.
	 * * `removeTitle`: A title to use for the remove icon.
	 *
	 * _Tested with snapshot testing._
	 */
	labels: PropTypes.shape({
		label: PropTypes.string,
		title: PropTypes.string,
		removeTitle: PropTypes.string,
	}),
	/**
	 * `onBlur` callback executes when the component loses focus.
	 * _Tested with Mocha framework._
	 */
	onBlur: PropTypes.func,
	/**
	 * `onClick` callback executes when a user clicks on the pill or presses the Enter key.
	 * _Tested with Mocha framework._
	 */
	onClick: PropTypes.func,
	/**
	 * `onFocus` callback executes when the component receives focus.
	 * _Tested with Mocha framework._
	 */
	onFocus: PropTypes.func,
	/**
	 * `onKeyDown` callback executes when a user presses a key.
	 * _Tested with Mocha framework._
	 */
	onKeyDown: PropTypes.func,
	/**
	 * `onRemove` callback executes when a user clicks on the pill's remove icon or presses the delete or the backspace keys.
	 * _Tested with Mocha framework._
	 */
	onRemove: PropTypes.func,
	/**
	 * A variant of a pill
	 * _Tested with Mocha framework._
	 */
	variant: PropTypes.oneOf(['link', 'option']),
};

/**
 * A pill displays a label that can contain links and can be removed from view. Use `PillContainer` for a list of pills in a container that resembles an `input` form field. A pill is useful for displaying read-only text that can be added and removed on demand.
 */
class Pill extends React.Component {
	getHref = () => (typeof this.props.href === 'string' ? this.props.href : '#');

	/**
	 * Removes focus from the component.
	 */
	blur = () => {
		this.root.blur();
	};

	/**
	 * Give focus to the Pill component.
	 */
	focus = () => {
		this.root.focus();
	};

	// eslint-disable-next-line fp/no-rest-parameters
	handleKeyDown = (event, ...rest) => {
		if (typeof this.props.onKeyDown === 'function') {
			// Make a callback to onKeyDown.
			this.props.onKeyDown.call(null, event, ...rest);
			// Cancel further handling if the default handling for the event was prevented.
			if (event.defaultPrevented) {
				return;
			}
		}

		switch (event.keyCode) {
			case KEYS.ENTER:
				if (typeof this.props.onClick === 'function') {
					EventUtil.trap(event);
					this.props.onClick();
				}
				break;

			case KEYS.BACKSPACE:
			case KEYS.DELETE:
				if (typeof this.props.onRemove === 'function') {
					EventUtil.trap(event);
					this.props.onRemove();
				}
				break;

			default:
				break;
		}
	};

	handleRef = (root) => {
		// Keeping the top-most element to support focus() and blur()
		this.root = root;
	};

	handleOnClick = (event) => {
		if (this.getHref() === '#') {
			event.preventDefault();
		}

		if (this.props.onClick) {
			this.props.onClick(event);
		}
	};

	/**
	 * Extracts a set of custom properties. A custom property is a property, which is not described in propTypes of a component.
	 */
	restProps = () => {
		const {
			bare,
			hasError,
			variant,
			className,
			onClick,
			onRemove,
			labels,
			assistiveText,
			children,
			href,
			icon,
			avatar,
			onKeyDown,
			...other
		} = this.props;
		return other;
	};

	renderIcon = () => {
		const icon = this.props.icon || this.props.avatar;
		if (icon) {
			return <span className="slds-pill__icon_container">{icon}</span>;
		}
		return null;
	};

	renderLabel = () => {
		if (this.props.labels.label) {
			if (this.props.variant === 'link') {
				return (
					<a
						href={this.getHref()}
						className="slds-pill__action"
						title={this.props.labels.title || this.props.labels.label}
						onClick={this.handleOnClick}
					>
						<span className="slds-pill__label">{this.props.labels.label}</span>
					</a>
				);
			}
			return (
				<span
					className="slds-pill__label"
					title={this.props.labels.title || this.props.labels.label}
				>
					{this.props.labels.label}
				</span>
			);
		}
		return this.props.children;
	};

	renderRemoveIcon = () => {
		if (typeof this.props.onRemove === 'function') {
			return (
				<span // eslint-disable-line jsx-a11y/interactive-supports-focus
					className="slds-icon_container slds-pill__remove"
					title={this.props.labels.removeTitle}
					role="button"
					onClick={this.props.onRemove}
				>
					<UtilityIcon
						style={{ cursor: 'pointer' }} // remove when fixed by SLDS CSS
						category="utility"
						className="slds-icon slds-icon_x-small slds-icon-text-default"
						name="close"
					/>
					<span className="slds-assistive-text">
						{this.props.assistiveText.remove || this.props.labels.removeTitle}
					</span>
				</span>
			);
		}

		return null;
	};

	render() {
		let role;
		switch (this.props.variant) {
			case 'link':
				role = 'button';
				break;
			case 'option':
				role = 'option';
				break;
			default:
		}

		return (
			/* eslint-disable jsx-a11y/no-static-element-interactions */
			<span
				{...this.restProps()}
				role={role}
				className={classNames(
					'slds-pill',
					{
						'slds-pill_link': this.props.variant === 'link',
						'slds-has-error': this.props.hasError,
						'slds-pill_bare': this.props.bare,
					},
					this.props.className
				)}
				onClick={
					!this.props.labels.label || this.props.variant !== 'link'
						? this.props.onClick
						: null
				}
				onKeyDown={
					typeof this.props.onRemove === 'function' ? this.handleKeyDown : null
				}
				ref={this.handleRef}
			>
				{this.renderIcon()}
				{this.renderLabel()}
				{this.renderRemoveIcon()}
			</span>
		);
	}
}

Pill.displayName = PILL;

Pill.defaultProps = {
	variant: 'link',
	labels: {},
	assistiveText: {},
};

Pill.propTypes = propTypes;

export default Pill;
