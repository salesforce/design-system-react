/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { type ReactNode } from 'react';
import classNames from '../../utilities/class-names';
import { DYNAMIC_ICON } from '../../utilities/constants';

/**
 * Dynamic icon variant types
 */
export type DynamicIconVariant = 'ellie' | 'eq' | 'score' | 'strength' | 'trend' | 'typing' | 'waffle';

/**
 * Score polarity options
 */
export type ScorePolarity = 'positive' | 'negative';

/**
 * Strength level options
 */
export type StrengthLevel = '-3' | '-2' | '-1' | '0' | '1' | '2' | '3' | -3 | -2 | -1 | 0 | 1 | 2 | 3;

/**
 * Trend direction options
 */
export type TrendDirection = 'down' | 'up' | 'neutral';

/**
 * Assistive text for DynamicIcon
 */
export interface DynamicIconAssistiveText {
	/** Label for the icon */
	label?: string;
}

/**
 * Props for the DynamicIcon component
 */
export interface DynamicIconProps {
	/** Assistive text for accessibility */
	assistiveText?: DynamicIconAssistiveText;
	/** CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/** Pauses animation */
	isPaused?: boolean;
	/** Disables animation */
	isStatic?: boolean;
	/** Polarity for score variant */
	scorePolarity?: ScorePolarity;
	/** Strength level for strength variant */
	strengthLevel?: StrengthLevel;
	/** Title attribute (required) */
	title: string;
	/** Trend direction for trend variant */
	trendDirection?: TrendDirection;
	/** Icon variant (required) */
	variant: DynamicIconVariant;
}

/**
 * A set of delightful animated icons.
 */
const DynamicIcon = ({
	assistiveText,
	className,
	isPaused,
	isStatic,
	scorePolarity,
	strengthLevel,
	title,
	trendDirection,
	variant,
}: DynamicIconProps): React.ReactElement => {
	const getIconChildren = (): ReactNode[] => {
		const children: ReactNode[] = [];
		let defaultAssistiveText = title || `${variant.charAt(0).toUpperCase()}${variant.slice(1)}`;

		if (variant === 'ellie') {
			children.push(
				<svg key="ellie-svg" viewBox="0 0 280 14" aria-hidden="true">
					{Array.from({ length: 20 }, (_, i) => {
						const cx = 7 + i * 14;
						return (
							<React.Fragment key={i}>
								<circle cx={cx} cy="7" r="4" />
								<circle cx={cx} cy="7" r="3" />
							</React.Fragment>
						);
					})}
				</svg>
			);
		} else if (variant === 'eq') {
			children.push(
				<div key="eq-bar-1" className="slds-icon-eq__bar" />,
				<div key="eq-bar-2" className="slds-icon-eq__bar" />,
				<div key="eq-bar-3" className="slds-icon-eq__bar" />
			);
		} else if (variant === 'score') {
			children.push(
				<svg key="score-pos" viewBox="0 0 5 5" className="slds-icon-score__positive" aria-hidden="true">
					<circle cx="50%" cy="50%" r="1.875" />
				</svg>,
				<svg key="score-neg" viewBox="0 0 5 5" className="slds-icon-score__negative" aria-hidden="true">
					<circle cx="50%" cy="50%" r="1.875" />
				</svg>
			);
		} else if (variant === 'strength') {
			children.push(
				<svg key="strength-svg" viewBox="0 0 27 7" aria-hidden="true">
					<circle r="3.025" cx="3.5" cy="3.5" />
					<circle r="3.025" cx="13.5" cy="3.5" />
					<circle r="3.025" cx="23.5" cy="3.5" />
				</svg>
			);
		} else if (variant === 'trend') {
			children.push(
				<svg key="trend-svg" viewBox="0 0 16 16" aria-hidden="true">
					<path className="slds-icon-trend__arrow" d="M.75 8H11M8 4.5L11.5 8 8 11.5" />
					<circle
						className="slds-icon-trend__circle"
						cy="8"
						cx="8"
						r="7.375"
						transform="rotate(-28 8 8) scale(-1 1) translate(-16 0)"
					/>
				</svg>
			);
		} else if (variant === 'typing') {
			children.push(
				<span key="typing-1" className="slds-icon-typing__dot" />,
				<span key="typing-2" className="slds-icon-typing__dot" />,
				<span key="typing-3" className="slds-icon-typing__dot" />
			);
			if (!title) {
				defaultAssistiveText = 'User is typing';
			}
		} else if (variant === 'waffle') {
			children.push(
				<span key="waffle" className="slds-icon-waffle">
					<span className="slds-r1" />
					<span className="slds-r2" />
					<span className="slds-r3" />
					<span className="slds-r4" />
					<span className="slds-r5" />
					<span className="slds-r6" />
					<span className="slds-r7" />
					<span className="slds-r8" />
					<span className="slds-r9" />
				</span>
			);
			if (!title) {
				defaultAssistiveText = 'Open App Launcher';
			}
		}

		children.push(
			<span key="assistive" className="slds-assistive-text">
				{assistiveText?.label || defaultAssistiveText}
			</span>
		);

		return children;
	};

	const children = getIconChildren();
	const classes: (string | Record<string, boolean | undefined>)[] = [
		{
			'slds-is-animated': !isStatic,
			'slds-is-paused': isPaused,
		},
	];

	const iconProps: Record<string, unknown> = {
		title,
	};

	let element: 'span' | 'div' | 'button' = 'span';

	if (variant === 'waffle') {
		classes.unshift('slds-button', 'slds-icon-waffle_container');
		element = 'button';
	} else {
		classes.unshift(`slds-icon-${variant}`);

		if (variant === 'eq') {
			element = 'div';
		} else if (variant === 'score') {
			iconProps['data-slds-state'] = scorePolarity || 'positive';
		} else if (variant === 'strength') {
			iconProps['data-slds-strength'] = strengthLevel !== undefined ? `${strengthLevel}` : '0';
		} else if (variant === 'trend') {
			iconProps['data-slds-trend'] = trendDirection || 'neutral';
		}
	}

	iconProps.className = classNames(classes, className);

	return React.createElement(element, iconProps, ...children);
};

DynamicIcon.displayName = DYNAMIC_ICON;

export default DynamicIcon;

