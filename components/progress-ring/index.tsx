/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { type ReactNode } from 'react';
import classNames from 'classnames';
import { PROGRESS_RING } from '../../utilities/constants';
import Icon from '../icon';
import ProgressRingShape from './private/ring-shape';

/**
 * Theme options for the progress ring
 */
export const THEME_OPTIONS = Object.freeze({
	ACTIVE: 'active',
	WARNING: 'warning',
	EXPIRED: 'expired',
	COMPLETE: 'complete',
} as const);

export type ProgressRingTheme = 'active' | 'warning' | 'expired' | 'complete';
export type ProgressRingFlowDirection = 'drain' | 'fill';
export type ProgressRingSize = 'medium' | 'large';

/**
 * CSS classes for each theme
 */
const THEME_CLASSES: Record<ProgressRingTheme, string> = {
	active: 'slds-progress-ring_active-step',
	warning: 'slds-progress-ring_warning',
	expired: 'slds-progress-ring_expired',
	complete: 'slds-progress-ring_complete',
};

/**
 * Props for the ProgressRing component
 */
export interface ProgressRingProps {
	/** HTML id attribute */
	id?: string;
	/** CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/** Theme applied to the ring */
	theme?: ProgressRingTheme;
	/** Custom icon to display */
	icon?: ReactNode;
	/** Whether to display theme icon */
	hasIcon?: boolean;
	/** Progress percentage (0-100) */
	value: number;
	/** Flow direction of progress */
	flowDirection?: ProgressRingFlowDirection;
	/** Size of the progress ring */
	size?: ProgressRingSize;
}

/**
 * Customizable progress ring displaying progress in a circular format.
 */
const ProgressRing = ({
	id,
	className,
	theme,
	icon: propIcon,
	hasIcon,
	value,
	flowDirection = 'drain',
	size = 'medium',
}: ProgressRingProps): React.ReactElement => {
	// Get icon based on theme or custom icon
	const getIcon = (): ReactNode => {
		if (!hasIcon) return null;

		if (propIcon) return propIcon;

		switch (theme) {
			case 'warning':
				return <Icon category="utility" name="warning" title="Warning" />;
			case 'expired':
				return <Icon category="utility" name="error" title="Expired" />;
			case 'complete':
				return <Icon category="utility" name="check" title="Complete" />;
			default:
				return null;
		}
	};

	const themeClass = theme ? THEME_CLASSES[theme] : '';
	const percentDecimal = value / 100;

	return (
		<ProgressRingShape
			id={id}
			size={size}
			className={classNames(className as string, themeClass, {
				'slds-progress-ring_large': size === 'large',
			})}
			fillPercentDecimal={percentDecimal}
			flowDirection={flowDirection}
		>
			{getIcon()}
		</ProgressRingShape>
	);
};

ProgressRing.displayName = PROGRESS_RING;

export default ProgressRing;















