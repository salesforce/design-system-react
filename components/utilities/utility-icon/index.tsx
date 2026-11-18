/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useContext, type CSSProperties, type SVGProps } from 'react';
import Svg from './svg';
import { DIRECTIONS } from '../UNSAFE_direction';
import LanguageDirection from '../UNSAFE_direction/private/language-direction';
import {
	IconSettingsContext,
	type IconSettingsContextValue,
} from '../../icon-settings/index';
import type { IconCategory } from '../../../types/common';

/**
 * Shape of inline SVG icon data passed to the `icon` prop
 */
export interface InlineIconData {
	viewBox?: string;
	path?: Record<string, string> | Array<Record<string, string>>;
	g?: Record<string, unknown> | Array<Record<string, unknown>>;
	circle?: Record<string, string> | Array<Record<string, string>>;
	ellipse?: Record<string, string> | Array<Record<string, string>>;
	[key: string]: unknown;
}

/**
 * Props for UtilityIcon component
 */
export interface UtilityIconProps extends Omit<
	SVGProps<SVGSVGElement>,
	'name'
> {
	/** Assistive text for accessibility (not used directly, passed through) */
	assistiveText?: Record<string, string>;
	/** Icon category */
	category?: IconCategory;
	/** Custom SVG icon data */
	icon?: InlineIconData;
	/** Name of the icon */
	name?: string;
	/** Direct path to the icon sprite */
	path?: string;
	/** Text direction for RTL support */
	direction?: string;
	/** CSS class name */
	className?: string;
	/** Inline styles */
	style?: CSSProperties;
}

/**
 * Internal component that renders the `icon` prop's inline SVG data if given,
 * otherwise a sprite `<use>` reference resolved from `path` or `IconSettings`.
 */
const UtilityIcon = ({
	name = '',
	assistiveText, // eslint-disable-line @typescript-eslint/no-unused-vars
	category = 'utility',
	icon,
	path,
	direction,
	...rest
}: UtilityIconProps): React.ReactElement | null => {
	const context = useContext<IconSettingsContextValue>(IconSettingsContext);

	const inlineData = icon;

	let modifiedPath: string | undefined;

	if (path) {
		// Use `path` prop of Icon if present
		modifiedPath = path;
	} else if (context.onRequestIconPath) {
		modifiedPath = context.onRequestIconPath({ category, name });
	} else if (context[`${category}Sprite` as keyof IconSettingsContextValue]) {
		// Use category sprite file from IconSettings if present
		const sprite = context[
			`${category}Sprite` as keyof IconSettingsContextValue
		] as string;
		modifiedPath = `${sprite}#${name}`;
	} else if (context.iconPath) {
		// Otherwise, use external URLs for icons
		const svgAssetName =
			direction === DIRECTIONS.RTL ? 'symbols-rtl.svg' : 'symbols.svg';
		modifiedPath = `${context.iconPath}/${category}-sprite/svg/${svgAssetName}#${name}`;
	}

	if (inlineData) {
		const { className, style, 'aria-hidden': ariaHidden } = rest;
		return (
			<Svg
				aria-hidden={ariaHidden}
				data={inlineData}
				name={name}
				className={className}
				style={style}
			/>
		);
	}

	const { className: svgClassName, style: svgStyle, ...svgRest } = rest;
	return (
		<svg
			key={`${name}_${category}`}
			className={svgClassName}
			style={svgStyle}
			{...svgRest}
		>
			<use href={modifiedPath} />
		</svg>
	);
};

UtilityIcon.displayName = 'UtilityIcon';

export default LanguageDirection(UtilityIcon);
