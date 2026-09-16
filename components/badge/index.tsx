/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useId, type ReactNode, type CSSProperties } from 'react';
import classNames from 'classnames';
import { BADGE } from '../../utilities/constants';

/**
 * Badge color variants
 */
export type BadgeColor = 'default' | 'inverse' | 'light' | 'success' | 'warning' | 'error';

/**
 * Badge icon alignment
 */
export type BadgeIconAlignment = 'left' | 'right';

/**
 * Props for the Badge component
 */
export interface BadgeProps {
	/** CSS classes for the badge */
	className?: string | string[] | Record<string, boolean>;
	/** Color variant */
	color?: BadgeColor;
	/** Content inside the badge */
	content?: ReactNode;
	/** Icon to display */
	icon?: ReactNode;
	/** Icon alignment relative to content */
	iconAlignment?: BadgeIconAlignment;
	/** Unique identifier */
	id?: string;
	/** Custom styles */
	style?: CSSProperties;
}

/**
 * Badges are labels which hold small amounts of information.
 */
const Badge = ({
	className,
	color = 'default',
	content,
	icon,
	iconAlignment = 'left',
	id: propId,
	style,
}: BadgeProps): React.ReactElement => {
	const generatedId = useId();
	const id = propId || generatedId;

	const iconElement = icon && (
		<span
			className={classNames(
				'slds-badge__icon',
				`slds-badge__icon_${iconAlignment}`
			)}
			style={style}
		>
			{icon}
		</span>
	);

	return (
		<span
			id={id}
			className={classNames(
				'slds-badge',
				{
					'slds-badge_inverse': color === 'inverse',
					'slds-badge_lightest': color === 'light',
					'slds-theme_success': color === 'success',
					'slds-theme_warning': color === 'warning',
					'slds-theme_error': color === 'error',
				},
				className as string
			)}
		>
			{iconAlignment === 'left' ? (
				<>
					{iconElement}
					{content}
				</>
			) : (
				<>
					{content}
					{iconElement}
				</>
			)}
		</span>
	);
};

Badge.displayName = BADGE;

export default Badge;















