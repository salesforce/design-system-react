/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Trial Bar design pattern](https://lightningdesignsystem.com/components/trial-bar/) in React.
// Based on SLDS v2.4.5
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import assign from 'lodash.assign';

import { TRIAL_BAR } from '../../utilities/constants';

const propTypes = {
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
	 * CSS classes to be added to the component. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * **Text labels for internationalization**
	 * This object is merged with the default props object on every render.
	 * * `learnMoreAfter`: Amount of time left in trial, e.g. `30`
	 * * `learnMoreBefore`: Unit of the amount of time left, e.g. `days`
	 * * `timeLeftUnitAfter`: String after `timeLeftUnit`
	 */
	labels: PropTypes.shape({
		timeLeft: PropTypes.string,
		timeLeftUnit: PropTypes.string,
		timeLeftUnitAfter: PropTypes.string,
	}),
	/**
	 * Renders the actions section of the trial bar.
	 */
	onRenderActions: PropTypes.func,
	/**
	 * Customs styles to be applied to the component.
	 */
	style: PropTypes.object,
};

const defaultProps = {
	labels: {
		timeLeftUnitAfter: 'left in trial',
	},
};

/**
 * Trial bar components are used to provide an interactive and educational prospect experience for setup.
 */
const TrialBar = (props) => {
	const labels = assign({}, defaultProps.labels, props.labels);
	return (
		<div
			className={classNames('slds-trial-header slds-grid', props.className)}
			style={props.style}
		>
			<div className="slds-grid">{props.children}</div>
			<div className="slds-grid slds-grid_vertical-align-center slds-col_bump-left">
				<span className="slds-box slds-box_xx-small slds-theme_default">
					{labels.timeLeft}
				</span>
				<span className="slds-m-horizontal_x-small">
					{labels.timeLeftUnit}
					{` ${labels.timeLeftUnitAfter}`}
				</span>
				{props.onRenderActions()}
			</div>
		</div>
	);
};

TrialBar.displayName = TRIAL_BAR;
TrialBar.propTypes = propTypes;
TrialBar.defaultProps = defaultProps;

export default TrialBar;
