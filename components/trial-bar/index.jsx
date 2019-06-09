/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Trial Bar design pattern](https://lightningdesignsystem.com/components/trial-bar/) in React.
// Based on SLDS v2.4.5
import React from 'react';
import PropTypes from 'prop-types';

import { TRIAL_BAR } from '../../utilities/constants';

const propTypes = {
	/**
	 * Renders the labels in the trial bar.
	 */
	labels: PropTypes.shape({
		/** Amount of time left in trial, e.g. `30` */
		timeLeft: PropTypes.string,
		/** Unit of the amount of time left, e.g. `days` */
		timeLeftUnit: PropTypes.string,
	}),
	/**
	 * Provide children of the types `<TrialBarButton />` or `<TrialBarDropdown />` to define the structure of the trial bar.
	 * ```
	 * <TrialBar>
	 *   <TrialBarButton />
	 *   <TrialBarDropdown />
	 * </TrialBar>
	 * ```
	 */
	children: PropTypes.node,
	/**
	 * Customs styles to be applied to the component.
	 */
	style: PropTypes.object,
	/**
	 * CSS classes to be added to the component. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Renders the actions section of the trial bar.
	 */
	onRenderActions: PropTypes.func,
};

const defaultProps = {};

/**
 * Trial bar components are used to provide an interactive and educational prospect experience for setup.
 */
class TrialBar extends React.Component {
	render() {
		return (
			<div className="slds-trial-header slds-grid">
				<div className="slds-grid">{this.props.children}</div>
				<div className="slds-grid slds-grid_vertical-align-center slds-col_bump-left">
					<span className="slds-box slds-box_xx-small slds-theme_default">
						{this.props.labels.timeLeft}
					</span>
					<span className="slds-m-horizontal_x-small">
						{this.props.labels.timeLeftUnit} left in trial
					</span>
					{this.props.onRenderActions()}
				</div>
			</div>
		);
	}
}

TrialBar.displayName = TRIAL_BAR;
TrialBar.propTypes = propTypes;
TrialBar.defaultProps = defaultProps;

export default TrialBar;
