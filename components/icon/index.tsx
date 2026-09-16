/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { type CSSProperties } from 'react';
import classNames from '../../utilities/class-names';
import UtilityIcon, { type InlineIconData } from '../utilities/utility-icon/index';
import IconBackgrounds from '../../utilities/product-tokens/icon-backgrounds';
import { ICON } from '../../utilities/constants';
import type { IconCategory } from '../../types/common';

/**
 * Icon color variant types
 */
export type IconColorVariant = 'base' | 'default' | 'error' | 'light' | 'warning' | 'success';

/**
 * Icon size types
 */
export type IconSize = 'xx-small' | 'x-small' | 'small' | 'medium' | 'large';

/**
 * Product theme types for icon backgrounds
 */
export type ProductTheme =
	| 'global-setup'
	| 'service-cloud'
	| 'industry-cloud'
	| 'sales-cloud'
	| 'commerce-cloud'
	| 'community-cloud'
	| 'marketing-cloud'
	| 'quip';

/**
 * Props for the Icon component
 */
export interface IconProps {
	/** Assistive text for accessibility */
	assistiveText?: { label?: string } | string;
	/** Icon category from SLDS */
	category?: IconCategory;
	/** CSS classes for the SVG element */
	className?: string | string[] | Record<string, boolean>;
	/** Icon color variant */
	colorVariant?: IconColorVariant;
	/** CSS classes for the container span */
	containerClassName?: string | string[] | Record<string, boolean>;
	/** Styles for the container span */
	containerStyle?: CSSProperties;
	/** Custom SVG icon data */
	icon?: InlineIconData;
	/** Invert colors for dark backgrounds */
	inverse?: boolean;
	/** Name of the icon */
	name?: string;
	/** Direct path to the icon sprite */
	path?: string;
	/** Background theme color (only for standard category) */
	productTheme?: ProductTheme;
	/** Size of the icon */
	size?: IconSize;
	/** Custom styles for the SVG */
	style?: CSSProperties;
	/** HTML title attribute for the container */
	title?: string;
}

const defaultProps: Required<Pick<IconProps, 'assistiveText' | 'category' | 'colorVariant' | 'size'>> = {
	assistiveText: {},
	category: 'standard',
	colorVariant: 'default',
	size: 'medium',
};

/**
 * The Icon component is the Lightning Design System Icon component and should be used for naked icons.
 * For icons that are buttons, use the Button component with `variant='icon'`.
 */
const Icon = ({
	category = defaultProps.category,
	className,
	colorVariant = defaultProps.colorVariant,
	containerClassName,
	containerStyle,
	icon,
	inverse,
	name,
	path,
	size = defaultProps.size,
	title,
	productTheme,
	assistiveText = defaultProps.assistiveText,
	style,
}: IconProps): React.ReactElement => {
	let styleOverride = style;
	if (productTheme && IconBackgrounds[productTheme]) {
		styleOverride = {
			backgroundColor: IconBackgrounds[productTheme],
			...style,
		};
	}

	let mergedAssistiveText: string | undefined;
	if (typeof assistiveText === 'string') {
		mergedAssistiveText = assistiveText;
	} else {
		const defaultText = defaultProps.assistiveText as { label?: string };
		const propsText = assistiveText as { label?: string };
		mergedAssistiveText = propsText?.label ?? defaultText?.label;
	}

	const kebabCaseName = name ? name.replace(/_/g, '-') : '';

	const containerClasses = classNames(
		{
			'slds-icon_container': category !== 'utility',
			'slds-icon_container_circle': category === 'action',
			[`slds-icon-${category}-${kebabCaseName}`]:
				category !== 'utility' && category !== 'doctype' && !path,
		},
		containerClassName as string
	);

	return (
		<span
			className={containerClasses}
			style={containerStyle}
			title={title}
		>
			<UtilityIcon
				aria-hidden={true}
				category={category}
				className={classNames(className, 'slds-icon', {
					'slds-icon_xx-small': size === 'xx-small',
					'slds-icon_x-small': size === 'x-small',
					'slds-icon_small': size === 'small',
					// medium intentionally not present
					'slds-icon_large': size === 'large',
					// Color logic for utility vs other categories
					'slds-icon-text-default':
						colorVariant === 'default' && category === 'utility'
							? !inverse
							: inverse,
					'slds-icon-text-success': colorVariant === 'success',
					'slds-icon-text-warning': colorVariant === 'warning',
					'slds-icon-text-error': colorVariant === 'error',
					'slds-icon-text-light': colorVariant === 'light',
				}) as string}
				icon={icon}
				name={name}
				path={path}
				style={styleOverride}
			/>
			{mergedAssistiveText ? (
				<span className="slds-assistive-text">{mergedAssistiveText}</span>
			) : null}
		</span>
	);
};

Icon.displayName = ICON;

export default Icon;

