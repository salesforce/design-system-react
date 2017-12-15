/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Pill Component
// Implements the [Pill design pattern](https://lightningdesignsystem.com/components/pills/) in React.

import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { shape } from 'airbnb-prop-types';
import { PILL } from '../../utilities/constants';
import UtilityIcon from '../utilities/utility-icon';
import KEYS from '../../utilities/key-code';
import EventUtil from '../../utilities/event';


const Pill = createReactClass({
	// ### Display Name
	displayName: PILL,

	propTypes: {
		/**
		 * **Text labels for internationalization**
		 * This object is merged with the default props object on every render.
		 * * `label`: Pill's label.
		 * * `title`: Pill's title.
		 * * `removeTitle`: A title to use for the remove icon.
		 *
		 * _Tested with snapshot testing._
		 */
		labels: shape({
			label: PropTypes.string,
			title: PropTypes.string,
			removeTitle: PropTypes.string
		}),

		/**
		 * **Assistive text for accessibility**
		 * This object is merged with the default props object on every render.
		 * * `remove`: This is a visually hidden label for the close button.
		 * _Tested with snapshot testing._
		 */
		assistiveText: shape({
			/**
			 *
			 * _Tested with Mocha framework._
			 */
			remove: PropTypes.string
		}),

		/**
		 * CSS classes to be added to tag with `.slds-pill`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
		 * _Tested with Mocha framework._
		 */
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),

		/**
		 * An href to use if the pill is shown as a link.
		 * _Tested with Mocha framework._
		 */
		href: PropTypes.string,

		/**
		 * Applies the bare style to the component.
		 * _Tested with Mocha framework._
		 */
		bare: PropTypes.bool,

		/**
		 * Applies the error style to the component.
		 * _Tested with Mocha framework._
		 */
		hasError: PropTypes.bool,

		/**
		 * The component applies the link style if either of the href or onClick properties are set. If this behavior is not desirable,
		 * the link property forces the component to apply (true) or remove (false) the link style, regardless of whether
		 * the href or onClick are set.
		 * _Tested with Mocha framework._
		 */
		link: PropTypes.bool,

		/**
		 * SLDSIcon component to show on the left of the pill.
		 * _Tested with Mocha framework._
		 */
		icon: PropTypes.element,

		/**
		 * SLDSAvatar component to show on the left of the pill.
		 * _Tested with Mocha framework._
		 */
		avatar: PropTypes.element,

		/**
		 * onClick callback executes when a user clicks on the pill or presses the Enter key.
		 * _Tested with Mocha framework._
		 * @callback
		 */
		onClick: PropTypes.func,

		/**
		 * onRemove callback executes when a user clicks on the pill's remove icon or presses the delete or the backspace keys.
		 * _Tested with Mocha framework._
		 * @callback
		 */
		onRemove: PropTypes.func,

		/**
		 * onKeyDown callback executes when a user presses a key.
		 * _Tested with Mocha framework._
		 * @callback
		 */
		onKeyDown: PropTypes.func,

		/**
		 * onFocus callback executes when the component receives focus.
		 * _Tested with Mocha framework._
		 * @callback
		 */
		onFocus: PropTypes.func,

		/**
		 * onBlur callback executes when the component loses focus.
		 * _Tested with Mocha framework._
		 * @callback
		 */
		onBlur: PropTypes.func,

		/**
		 * Role to use for the pill. Default role: button.
		 * _Tested with Mocha framework._
		 */
		role: PropTypes.string,

		/**
		 * This is a way to specify custom contents for the pill in the case a simple text label is not enough.
		 * _Tested with Mocha framework._
		 */
		children: PropTypes.node
	},

	getDefaultProps () {
		return {
			role: 'button',
			labels: {},
			assistiveText: {}
		};
	},

	render () {
		const role = this.props.role || (typeof this.props.onClick === 'function' ? 'button' : null);
		const linkifySpan = this.renderAsLink() && !this.props.labels.label;
		return (
			/* eslint-disable jsx-a11y/no-static-element-interactions */
			<span
				{...this.restProps()}
				role={role}
				className={classNames(
					'slds-pill',
					{
						'slds-pill_link': this.renderAsLink(),
						'slds-has-error': this.props.hasError,
						'slds-pill_bare': this.props.bare
					},
					this.props.className
				)}
				onClick={linkifySpan ? this.props.onClick : null}
				onKeyDown={typeof this.props.onRemove === 'function' ? this.handleKeyDown : null}
				ref={this.handleRef}
			>
				{this.renderIcon()}
				{this.renderLabel()}
				{this.renderRemoveIcon()}
			</span>
		);
	},

	renderIcon () {
		const icon = this.props.icon || this.props.avatar;
		if (icon) {
			return <span className="slds-pill__icon_container">{icon}</span>;
		}
		return null;
	},

	renderLabel () {
		if (this.props.labels.label) {
			if (this.renderAsLink()) {
				return (
					<a
						href={this.getHref()}
						className="slds-pill__action"
						title={this.props.labels.title || this.props.labels.label}
						onClick={this.props.onClick}
					>
						<span className="slds-pill__label">
							{this.props.labels.label}
						</span>
					</a>
				);
			}
			return (
				<span className="slds-pill__label" title={this.props.labels.title || this.props.labels.label}>
					{this.props.labels.label}
				</span>
			);
		}
		return this.props.children;
	},

	renderRemoveIcon () {
		if (typeof this.props.onRemove === 'function') {
			return (
				<span
					className="slds-icon_container slds-pill__remove"
					title={this.props.labels.removeTitle}
					role="button"
					onClick={this.props.onRemove}
				>
					<UtilityIcon
						style={{ cursor: 'pointer' }}	// remove when fixed by SLDS CSS
						category="utility"
						className="slds-icon slds-icon--x-small slds-icon-text-default"
						name="close"
					/>
					<span className="slds-assistive-text">{this.props.assistiveText.remove || this.props.labels.removeTitle}</span>
				</span>
			);
		}

		return null;
	},

	/**
	 * Give focus to the Pill component.
	 */
	focus () {
		this.root.focus();
	},

	/**
	 * Removes focus from the component.
	 */
	blur () {
		this.root.blur();
	},

	handleKeyDown (event, ...rest) {
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
	},

	handleRef (root) {
		// Keeping the top-most element to support focus() and blur()
		this.root = root;
	},

	/**
	 * Indicates if the pill should be styled as a link. The link styling is applied if either of the following is true:
	 * 1) href property is set
	 * 2) onClick property is set to a function
	 * 3) the value of the link property is true
	 * The link styling is not if neither of the above is true or if the link property is set to false.
	 * @returns {boolean}
	 */
	renderAsLink () {
		return this.props.link === true || ((typeof this.props.onClick === 'function' || typeof this.props.href === 'string')
			&& (!!this.props.labels.label || !!this.props.children) && this.props.link !== false);
	},

	getHref () {
		return typeof this.props.href === 'string' ? this.props.href : 'javascript:void(0);'; // eslint-disable-line no-script-url
	},

	/**
	 * Extracts a set of custom properties. A custom property is a property, which is not described in propTypes of a component.
	 */
	restProps () {
		const { role, bare, hasError, link, className, onClick, onRemove, labels, assistiveText, children, href,
			icon, avatar, onKeyDown, ...other } = this.props;
		return other;
	}
});

export default Pill;
