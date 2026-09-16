/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { type ReactNode, type CSSProperties } from 'react';
import classNames from 'classnames';
import { TRIAL_BAR } from '../../utilities/constants';

/**
 * Labels for TrialBar
 */
export interface TrialBarLabels {
	/** Amount of time left */
	timeLeft?: string;
	/** Unit of time */
	timeLeftUnit?: string;
	/** Text after time unit */
	timeLeftUnitAfter?: string;
}

/**
 * Props for the TrialBar component
 */
export interface TrialBarProps {
	/** TrialBarButton or TrialBarDropdown children */
	children?: ReactNode;
	/** CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/** Text labels */
	labels?: TrialBarLabels;
	/** Render function for actions section */
	onRenderActions?: () => ReactNode;
	/** Custom styles */
	style?: CSSProperties;
}

const defaultLabels: TrialBarLabels = {
	timeLeftUnitAfter: 'left in trial',
};

/**
 * Trial bar components are used to provide an interactive and educational
 * prospect experience for setup.
 */
const TrialBar = ({
	children,
	className,
	labels: propLabels,
	onRenderActions,
	style,
}: TrialBarProps): React.ReactElement => {
	const labels = { ...defaultLabels, ...propLabels };

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
				<span className="slds-m-horizontal_x-small">
					{labels.timeLeftUnit}
					{labels.timeLeftUnitAfter && ` ${labels.timeLeftUnitAfter}`}
				</span>
				{onRenderActions?.()}
			</div>
		</div>
	);
};

TrialBar.displayName = TRIAL_BAR;

export default TrialBar;















