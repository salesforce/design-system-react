/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useEffect, type ReactNode, type CSSProperties } from 'react';
import classNames from 'classnames';
import { TRIAL_BAR } from '../../utilities/constants';
import checkProps from './check-props';
import componentDoc from './component.json';

/**
 * Labels for TrialBar
 */
export interface TrialBarLabels {
	/** Amount of time left, rendered in a box (e.g. `30`) */
	timeLeft?: ReactNode;
	/** Complete text after the amount, including any unit (e.g. `days left in trial`) */
	timeLeftAfter?: ReactNode;
	/** @deprecated Include the unit in `timeLeftAfter` instead. */
	timeLeftUnit?: string;
	/** @deprecated Use `timeLeftAfter` instead. */
	timeLeftUnitAfter?: string;
}

/**
 * Props for the TrialBar component
 */
export interface TrialBarProps {
	/** Actions shown after the time left, such as a subscribe button */
	actions?: ReactNode;
	/** TrialBarButton or TrialBarDropdown children */
	children?: ReactNode;
	/** CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/**
	 * **Text labels for internationalization**
	 * * `timeLeft`: Amount of time left, rendered in a box
	 * * `timeLeftAfter`: Complete text after the amount, including any unit. Defaults to `left in trial`.
	 */
	labels?: TrialBarLabels;
	/** @deprecated Use `actions` instead. */
	onRenderActions?: () => ReactNode;
	/** Custom styles */
	style?: CSSProperties;
}

const defaultTimeLeftAfter = 'left in trial';

// Joins the deprecated `timeLeftUnit` and `timeLeftUnitAfter` the way they were rendered before
const getLegacyTimeLeftAfter = ({
	timeLeftUnit,
	timeLeftUnitAfter,
}: TrialBarLabels) => {
	if (timeLeftUnit === undefined && timeLeftUnitAfter === undefined)
		return undefined;
	return [timeLeftUnit, timeLeftUnitAfter ?? defaultTimeLeftAfter]
		.filter(Boolean)
		.join(' ');
};

/**
 * Trial bar components are used to provide an interactive and educational
 * prospect experience for setup.
 */
const TrialBar = ({
	actions,
	children,
	className,
	labels: propLabels,
	onRenderActions,
	style,
}: TrialBarProps): React.ReactElement => {
	const labels = propLabels ?? {};
	const timeLeftAfter =
		labels.timeLeftAfter ??
		getLegacyTimeLeftAfter(labels) ??
		defaultTimeLeftAfter;

	useEffect(() => {
		checkProps(
			TRIAL_BAR,
			{ labels: propLabels, onRenderActions },
			componentDoc
		);
	}, [propLabels, onRenderActions]);

	return (
		<div
			className={classNames('slds-trial-header slds-grid', className as string)}
			style={style}
		>
			<div className="slds-grid">{children}</div>
			<div className="slds-grid slds-grid_vertical-align-center slds-col_bump-left">
				<span className="slds-box slds-box_xx-small slds-theme_default">
					{labels.timeLeft}
				</span>
				<span className="slds-m-horizontal_x-small">{timeLeftAfter}</span>
				{actions ?? onRenderActions?.()}
			</div>
		</div>
	);
};

TrialBar.displayName = TRIAL_BAR;

export default TrialBar;
