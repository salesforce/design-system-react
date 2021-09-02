/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Dynamic Icons Component

// Implements the [Dynamic Icons design pattern](https://www.lightningdesignsystem.com/components/dynamic-icons/) in React.

import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utilities/class-names';

import { DYNAMIC_ICON } from '../../utilities/constants';

// PropTypes for the component
const propTypes = {
	/**
	 * **Assistive text for accessibility**
	 * * `label`: Used as a visually hidden label to describe the dynamic icon.
	 */
	assistiveText: PropTypes.shape({
		label: PropTypes.string,
	}),
	/**
	 * CSS class names to be added to the icon.
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Pauses the icon animation if the value is true.
	 */
	isPaused: PropTypes.bool,
	/**
	 * Disables icon animation if set to true
	 */
	isStatic: PropTypes.bool,
	/**
	 * Polarity values for the 'score' variant. Defaults to 'positive'
	 */
	scorePolarity: PropTypes.oneOf(['positive', 'negative']),
	/**
	 * Range of strength values for the 'strength' variant. Defaults to '0'.
	 */
	strengthLevel: PropTypes.oneOf([
		'-3',
		'-2',
		'-1',
		'0',
		'1',
		'2',
		'3',
		-3,
		-2,
		-1,
		0,
		1,
		2,
		3,
	]),
	/**
	 * HTML title attribute.
	 */
	title: PropTypes.string.isRequired,
	/**
	 * Signals direction for the 'trend' variant. The default value 'neutral' points to the east.
	 */
	trendDirection: PropTypes.oneOf(['down', 'up', 'neutral']),
	/**
	 * Different types of dynamic icons. Possible variants:
	 *
	 * `ellie` - Displays a pulsing blue circle, which pulses and stops after one animation cycle.
	 * `eq` - Displays an animated graph with three bars that rise and fall randomly.
	 * `score` - Displays a green filled circle or a red unfilled circle.
	 * `strength` - Displays three animated horizontal circles that are colored green or red.
	 * `trend` - Displays animated arrows that point up, down, or straight.
	 * `waffle` - Displays a 3x3 grid of dots that animates on hover.
	 */
	variant: PropTypes.oneOf([
		'ellie',
		'eq',
		'score',
		'strength',
		'trend',
		'typing',
		'waffle',
	]).isRequired,
};

/**
 * A set of delightful animated icons.
 */
class DynamicIcon extends React.Component {
	getIconChildren() {
		let children = [];
		let defaultAssistiveText = this.props.title
			? this.props.title
			: `${this.props.variant
					.charAt(0)
					.toUpperCase()}${this.props.variant.slice(1)}`;

		if (this.props.variant === 'ellie') {
			children = [
				<svg viewBox="0 0 280 14" aria-hidden="true">
					<circle cx="7" cy="7" r="4" />
					<circle cx="7" cy="7" r="3" />
					<circle cx="21" cy="7" r="4" />
					<circle cx="21" cy="7" r="3" />
					<circle cx="35" cy="7" r="4" />
					<circle cx="35" cy="7" r="3" />
					<circle cx="49" cy="7" r="4" />
					<circle cx="49" cy="7" r="3" />
					<circle cx="63" cy="7" r="4" />
					<circle cx="63" cy="7" r="3" />
					<circle cx="77" cy="7" r="4" />
					<circle cx="77" cy="7" r="3" />
					<circle cx="91" cy="7" r="4" />
					<circle cx="91" cy="7" r="3" />
					<circle cx="105" cy="7" r="4" />
					<circle cx="105" cy="7" r="3" />
					<circle cx="119" cy="7" r="4" />
					<circle cx="119" cy="7" r="3" />
					<circle cx="133" cy="7" r="4" />
					<circle cx="133" cy="7" r="3" />
					<circle cx="147" cy="7" r="4" />
					<circle cx="147" cy="7" r="3" />
					<circle cx="161" cy="7" r="4" />
					<circle cx="161" cy="7" r="3" />
					<circle cx="175" cy="7" r="4" />
					<circle cx="175" cy="7" r="3" />
					<circle cx="189" cy="7" r="4" />
					<circle cx="189" cy="7" r="3" />
					<circle cx="203" cy="7" r="4" />
					<circle cx="203" cy="7" r="3" />
					<circle cx="217" cy="7" r="4" />
					<circle cx="217" cy="7" r="3" />
					<circle cx="231" cy="7" r="4" />
					<circle cx="231" cy="7" r="3" />
					<circle cx="245" cy="7" r="4" />
					<circle cx="245" cy="7" r="3" />
					<circle cx="259" cy="7" r="4" />
					<circle cx="259" cy="7" r="3" />
					<circle cx="273" cy="7" r="4" />
					<circle cx="273" cy="7" r="3" />
				</svg>,
			];
		} else if (this.props.variant === 'eq') {
			children = [
				<div className="slds-icon-eq__bar" />,
				<div className="slds-icon-eq__bar" />,
				<div className="slds-icon-eq__bar" />,
			];
		} else if (this.props.variant === 'score') {
			children = [
				<svg
					viewBox="0 0 5 5"
					className="slds-icon-score__positive"
					aria-hidden="true"
				>
					<circle cx="50%" cy="50%" r="1.875" />
				</svg>,
				<svg
					viewBox="0 0 5 5"
					className="slds-icon-score__negative"
					aria-hidden="true"
				>
					<circle cx="50%" cy="50%" r="1.875" />
				</svg>,
			];
		} else if (this.props.variant === 'strength') {
			children = [
				<svg viewBox="0 0 27 7" aria-hidden="true">
					<circle r="3.025" cx="3.5" cy="3.5" />
					<circle r="3.025" cx="13.5" cy="3.5" />
					<circle r="3.025" cx="23.5" cy="3.5" />
				</svg>,
			];
		} else if (this.props.variant === 'trend') {
			children = [
				<svg viewBox="0 0 16 16" aria-hidden="true">
					<path
						className="slds-icon-trend__arrow"
						d="M.75 8H11M8 4.5L11.5 8 8 11.5"
					/>
					<circle
						className="slds-icon-trend__circle"
						cy="8"
						cx="8"
						r="7.375"
						transform="rotate(-28 8 8) scale(-1 1) translate(-16 0)"
					/>
				</svg>,
			];
		} else if (this.props.variant === 'typing') {
			children = [
				<span className="slds-icon-typing__dot" />,
				<span className="slds-icon-typing__dot" />,
				<span className="slds-icon-typing__dot" />,
			];
			if (!this.props.title) {
				defaultAssistiveText = 'User is typing';
			}
		} else if (this.props.variant === 'waffle') {
			children = [
				<span className="slds-icon-waffle">
					<span className="slds-r1" />
					<span className="slds-r2" />
					<span className="slds-r3" />
					<span className="slds-r4" />
					<span className="slds-r5" />
					<span className="slds-r6" />
					<span className="slds-r7" />
					<span className="slds-r8" />
					<span className="slds-r9" />
				</span>,
			];
			if (!this.props.title) {
				defaultAssistiveText = 'Open App Launcher';
			}
		}

		// eslint-disable-next-line fp/no-mutating-methods
		children.push(
			<span className="slds-assistive-text">
				{this.props.assistiveText && this.props.assistiveText.label
					? this.props.assistiveText.label
					: defaultAssistiveText}
			</span>
		);

		return children;
	}

	render() {
		const children = this.getIconChildren();
		const classes = [
			{
				'slds-is-animated': !this.props.isStatic,
				'slds-is-paused': this.props.isPaused,
			},
		];
		const iconProps = {
			title: this.props.title,
		};
		let element = 'span';

		if (this.props.variant === 'waffle') {
			// eslint-disable-next-line fp/no-mutating-methods
			classes.unshift('slds-button', 'slds-icon-waffle_container');
			element = 'button';
		} else {
			// eslint-disable-next-line fp/no-mutating-methods
			classes.unshift(`slds-icon-${this.props.variant}`);

			if (this.props.variant === 'eq') {
				element = 'div';
			} else if (this.props.variant === 'score') {
				iconProps['data-slds-state'] = this.props.scorePolarity
					? this.props.scorePolarity
					: 'positive';
			} else if (this.props.variant === 'strength') {
				iconProps['data-slds-strength'] =
					this.props.strengthLevel !== undefined
						? `${this.props.strengthLevel}`
						: '0';
			} else if (this.props.variant === 'trend') {
				iconProps['data-slds-trend'] = this.props.trendDirection
					? this.props.trendDirection
					: 'neutral';
			}
		}

		iconProps.className = classNames(classes, this.props.className);

		return React.createElement(element, iconProps, ...children);
	}
}

DynamicIcon.displayName = DYNAMIC_ICON;
DynamicIcon.propTypes = propTypes;

export default DynamicIcon;
