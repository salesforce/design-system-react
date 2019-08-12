/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Progress Ring design pattern](https://lightningdesignsystem.com/components/progress-ring/) in React.
// Based on SLDS v2.4.5
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { PROGRESS_RING } from '../../utilities/constants';
import Icon from '../icon';
import ProgressRingShape from './private/ring-shape';

/**
 * The themes available for the progress ring
 */
export const THEME_OPTIONS = Object.freeze({
	ACTIVE: 'active',
	WARNING: 'warning',
	EXPIRED: 'expired',
	COMPLETE: 'complete',
});

/**
 * The CSS classes associated with each theme
 */
const THEME_CLASSES = {
	[THEME_OPTIONS.ACTIVE]: 'slds-progress-ring_active-step',
	[THEME_OPTIONS.WARNING]: 'slds-progress-ring_warning',
	[THEME_OPTIONS.EXPIRED]: 'slds-progress-ring_expired',
	[THEME_OPTIONS.COMPLETE]: 'slds-progress-ring_complete',
};

const propTypes = {
	/**
	 * HTML id for component.
	 */
	id: PropTypes.string,
	/**
	 * CSS classes to be added to tag with `.slds-progress-ring`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * The theme applied to the ring.
	 */
	theme: PropTypes.oneOf(['active', 'warning', 'expired', 'complete']),
	/**
	 * Overrides the icon to be displayed.
	 */
	icon: PropTypes.node,
	/**
	 * Display the icon associated with the theme.
	 */
	hasIcon: PropTypes.bool,
	/**
	 * Percentage of progress completion, ranging [0, 100].
	 */
	value: PropTypes.number.isRequired,
	/**
	 * Direction that the progress ring "flows." Default is counter-clockwise, or `drain`. For clockwise flow, use `fill`
	 */
	flowDirection: PropTypes.oneOf(['drain', 'fill']),
	/**
	 * Size of the progress ring. Default is 'medium'
	 */
	size: PropTypes.oneOf(['medium', 'large']),
};

const defaultProps = {
	flowDirection: 'drain',
	size: 'medium',
};

/**
 * Customizable and configurable progress ring. Will display progress in a circular progress bar factor, and is capable of displaying iconography inside of the ring structure.
 */
class ProgressRing extends React.Component {
	/**
	 * Gets the icon to display
	 * @returns {node} Icon
	 */
	icon() {
		let icon = '';

		if (this.props.hasIcon) {
			if (this.props.icon) {
				// eslint-disable-next-line prefer-destructuring
				icon = this.props.icon;
			} else if (this.props.theme === THEME_OPTIONS.WARNING) {
				icon = <Icon category="utility" name="warning" title="Warning" />;
			} else if (this.props.theme === THEME_OPTIONS.EXPIRED) {
				icon = <Icon category="utility" name="error" title="Expired" />;
			} else if (this.props.theme === THEME_OPTIONS.COMPLETE) {
				icon = <Icon category="utility" name="check" title="Complete" />;
			}
		}

		return icon;
	}

	/**
	 * Percentage as a decimal
	 * @returns {decimal} Percentage
	 */
	percentDecimal() {
		return this.props.value / 100;
	}

	/**
	 * Gets the theme CSS class
	 * @returns {string} Class name
	 */
	themeClass() {
		return THEME_CLASSES[this.props.theme] || '';
	}

	render() {
		return (
			<ProgressRingShape
				id={this.props.id}
				size={this.props.size}
				className={classNames(this.props.className, this.themeClass(), {
					'slds-progress-ring_large': this.props.size === 'large',
				})}
				fillPercentDecimal={this.percentDecimal()}
				flowDirection={this.props.flowDirection}
			>
				{this.icon()}
			</ProgressRingShape>
		);
	}
}

ProgressRing.displayName = PROGRESS_RING;
ProgressRing.propTypes = propTypes;
ProgressRing.defaultProps = defaultProps;

export default ProgressRing;
