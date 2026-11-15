/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import type { MouseEvent, ReactElement, ReactNode } from 'react';

import type { IconProps } from '../icon';

/** A function `label`, called with the current search term. */
export type ComboboxOptionLabelRenderer = (searchTerm: string) => ReactNode;

/** The `<Icon>` shown before an option. Its `size` defaults to `small` in the menu. */
export type ComboboxOptionIcon = ReactElement<IconProps>;

/**
 * A selectable option. Group items under a `subheadings` entry from
 * `comboboxAddSubheadings` with `category`.
 */
export interface ComboboxItemOption {
	/** Structural rows set `type`; selectable items leave it unset. */
	type?: undefined;
	id: string;
	/** Matches the `id` of a subheading passed to `comboboxAddSubheadings` */
	category?: string;
	label?: string;
	subTitle?: string;
	title?: string;
	icon?: ComboboxOptionIcon;
	disabled?: boolean;
	tooltipContent?: ReactNode;
	value?: string;
	onClick?: never;
}

/** A non-interactive group label. Without a `label` it renders as a divider. */
export interface ComboboxSeparatorOption {
	type: 'separator';
	id: string;
	label?: string | ComboboxOptionLabelRenderer;
	category?: never;
	subTitle?: never;
	title?: never;
	icon?: never;
	disabled?: never;
	tooltipContent?: never;
	value?: never;
	onClick?: never;
}

/** Fields shared by `header` and `footer` action rows. */
export interface ComboboxActionOptionFields {
	id: string;
	label?: string | ComboboxOptionLabelRenderer;
	icon?: ComboboxOptionIcon;
	disabled?: boolean;
	/** @deprecated Only called on Enter, for `type: 'header' | 'footer'` rows
	 * passed directly in `options`. Use `optionsSearchEntity`/`optionsAddItem`
	 * with `events.onSelectActionItem` instead. */
	onClick?: (event: MouseEvent) => void;
	category?: never;
	subTitle?: never;
	title?: never;
	tooltipContent?: never;
	value?: never;
}

/**
 * An action row above (`header`) or below (`footer`) the options. Usually
 * created from `optionsSearchEntity` and `optionsAddItem`.
 */
export type ComboboxActionOption =
	| (ComboboxActionOptionFields & { type: 'header' })
	| (ComboboxActionOptionFields & { type: 'footer' });

/** The "clear selection" row added by `hasDeselect`. */
export interface ComboboxDeselectOption {
	type: 'deselect';
	id: string;
	label?: string;
	value?: string;
	category?: never;
	subTitle?: never;
	title?: never;
	icon?: never;
	disabled?: never;
	tooltipContent?: never;
	onClick?: never;
}

export type ComboboxOption =
	| ComboboxItemOption
	| ComboboxSeparatorOption
	| ComboboxActionOption
	| ComboboxDeselectOption;

/**
 * Argument passed to the menu's `renderMenuItem`
 */
export interface ComboboxMenuRenderMenuItemData {
	/** Whether the option is selected */
	isSelected: boolean;
	/** The option to render. Custom renderers only receive selectable rows */
	option: ComboboxItemOption | ComboboxDeselectOption;
}
