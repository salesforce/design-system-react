/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Dynamic Icons Component

// Implements the [Dynamic Icons design pattern](https://www.lightningdesignsystem.com/components/dynamic-icons/) in React.

import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utilities/class-names';

const propTypes = {
	/**
	 * HTML title attribute. _Tested with snapshot testing._
	 */
	title: PropTypes.string.isRequired,
	/**
	 * Triggers icon animation if the value is true.
	 */
	isAnimated: PropTypes.boolean,
	/**
	 * Types of values for the 'score' variant.
	 */
	polarity: PropTypes.oneOf(['positive', 'negative']),
	/**
	 * Range of strength values for the 'strength' variant.
	 */
	strengthLevel: PropTypes.oneOf(['-3', '-2', '-1', '1', '2', '3']),
	/**
	 * Pauses the icon animation if the value is true.
	 */
	paused: PropTypes.boolean,
	/**
	 * Signals direction of the trend. The value 'neutral' points to the east.
	 */
	trend: PropTypes.oneOf(['down', 'up', 'neutral']),
	/**
	 * The content for the DynamicIcon component. _Tested with Mocha framework and snapshot testing._
	 */
	children: PropTypes.node.isRequired,
	/**
	 * Different types of dynamic icons.
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
	render() {
		let dynamicIcon;
		if (this.props.variant === 'eq') {
			dynamicIcon = (
				<div
					className={classNames(
						`slds-icon-${this.props.variant}`,
						{ 'slds-is-animated': this.props.isAnimated },
						{ 'slds-is-paused': this.props.paused }
					)}
					title={this.props.title}
				>
					{this.props.children}
				</div>
			);
		} else if (this.props.variant === 'waffle') {
			dynamicIcon = (
				<button
					className={classNames(
						'slds-button',
						'slds-icon-waffle_container',
						{ 'slds-is-animated': this.props.isAnimated },
						{ 'slds-is-paused': this.props.paused }
					)}
					title={this.props.title}
				>
					{this.props.children}
				</button>
			);
		} else {
			dynamicIcon = (
				<span
					className={classNames(
						`slds-icon-${this.props.variant}`,
						{ 'slds-is-animated': this.props.isAnimated },
						{ 'slds-is-paused': this.props.paused }
					)}
					data-slds-state={this.props.polarity}
					data-slds-strength={this.props.strengthLevel}
					data-slds-trend={this.props.trend}
					title={this.props.title}
				>
					{this.props.children}
				</span>
			);
		}

		return dynamicIcon;
	}
}

DynamicIcon.propTypes = propTypes;

export default DynamicIcon;
