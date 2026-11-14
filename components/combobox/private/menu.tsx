/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, {
	type ReactNode,
	type ReactElement,
	type CSSProperties,
} from 'react';
import { dequal as isEqual } from 'dequal';
import classNames from 'classnames';

import Icon from '../../icon';
import Spinner from '../../spinner';
import type { TooltipProps } from '../../tooltip';
import type {
	ComboboxMenuRenderMenuItemData,
	ComboboxOption,
	ComboboxOptionIcon,
} from '../types';

export interface MenuAssistiveText {
	loadingMenuItems?: string;
	optionSelectedInMenu?: string;
}

export interface MenuLabels {
	noOptionsFound: ReactNode | string;
}

export interface MenuProps {
	/** Active descendant in menu */
	activeOption?: ComboboxOption;
	/** Index of active descendant in menu */
	activeOptionIndex?: number;
	/** Assistive text for accessibility */
	assistiveText?: MenuAssistiveText;
	/** CSS classes to be added to menu sub header span tag */
	classNameMenuSubHeader?: string | string[] | Record<string, boolean>;
	/** CSS classes for menu */
	classNameMenu?: string | string[] | Record<string, boolean>;
	/** Sets the dialog width */
	inheritWidthOf?: 'target' | 'menu' | 'none';
	/** Id used for assistive technology */
	inputId?: string;
	/** Input value for bolding matches */
	inputValue?: string;
	/** Function to check if option is selected */
	isSelected: (params: {
		selection: ComboboxOption[];
		option: ComboboxOption;
	}) => boolean;
	/** Determines the height of the menu */
	itemVisibleLength?: 5 | 7 | 10 | null;
	/** Text labels */
	labels: MenuLabels;
	/** Adds loading spinner below the options */
	hasMenuSpinner?: boolean;
	/** Sets a maximum width for menu */
	maxWidth?: string;
	/** Menu position */
	menuPosition?: 'absolute' | 'overflowBoundaryElement' | 'relative';
	/** Ref for menu element */
	menuRef?:
		React.RefCallback<HTMLUListElement> | React.RefObject<HTMLUListElement>;
	/** Renders an option's content in place of the default label and icon */
	renderMenuItem?: (data: ComboboxMenuRenderMenuItemData) => ReactNode;
	/** Callback when option is selected */
	onSelect: (
		event: React.MouseEvent,
		data: { option: ComboboxOption; selection?: ComboboxOption[] }
	) => void;
	/** Menu options */
	options: ComboboxOption[];
	/** Selected options */
	selection: ComboboxOption[];
	/** Tooltip for disabled menu items */
	tooltipMenuItemDisabled?: ReactElement<Partial<TooltipProps>>;
	/** Menu variant */
	variant?: 'icon-title-subtitle' | 'checkbox';
}

const setBold = (label: string | undefined, searchTerm: string): ReactNode => {
	if (!label || label.length === 0 || !searchTerm || searchTerm.length === 0) {
		return label;
	}
	const position = label.toLowerCase().indexOf(searchTerm.toLowerCase());
	if (position > -1) {
		return (
			<React.Fragment>
				{label.substr(0, position)}
				<span key="bold" className="slds-text-title_bold">{`${label.substr(
					position,
					searchTerm.length
				)}`}</span>
				{label.substr(position + searchTerm.length)}
			</React.Fragment>
		);
	}
	return label;
};

const renderLabel = (
	labelProp: string | ((searchTerm: string) => ReactNode) | undefined,
	searchTerm: string
): ReactNode => {
	if (labelProp == null || typeof labelProp === 'string') {
		return labelProp;
	}
	return labelProp(searchTerm);
};

// Entity icons in a combobox listbox option render at "small" per SLDS. `Icon`
// defaults to "medium", so an option icon passed without an explicit size shows
// oversized in the menu (SLDS 2 no longer shrinks it via CSS the way SLDS 1
// did). Clone the icon to enforce "small" unless the consumer set a size
// themselves. Leaves non-<Icon> nodes untouched.
const sizeOptionIcon = (icon: ComboboxOptionIcon): ReactNode =>
	icon.props.size != null ? icon : React.cloneElement(icon, { size: 'small' });

/**
 * The text of an option's label. A label render function (separator and action
 * rows only) has no text, so it returns `undefined`.
 */
export const getOptionLabel = (option?: ComboboxOption): string | undefined =>
	typeof option?.label === 'string' ? option.label : undefined;

const Menu: React.FC<MenuProps> = ({
	activeOption,
	activeOptionIndex = -1,
	assistiveText = {},
	classNameMenuSubHeader,
	classNameMenu,
	inheritWidthOf,
	inputId,
	inputValue = '',
	isSelected,
	itemVisibleLength,
	labels,
	hasMenuSpinner,
	maxWidth,
	menuPosition,
	menuRef,
	renderMenuItem,
	onSelect,
	options,
	selection,
	tooltipMenuItemDisabled,
	variant = 'icon-title-subtitle',
}) => {
	let menuMaxWidth: string | undefined =
		inheritWidthOf === 'menu' ? 'inherit' : undefined;
	menuMaxWidth =
		inheritWidthOf === 'menu' && maxWidth ? maxWidth : menuMaxWidth;

	const menuOptions = options.map((optionData, index) => {
		const active =
			index === activeOptionIndex &&
			activeOption &&
			isEqual(optionData.id, activeOption.id);
		const selected =
			isSelected({
				selection,
				option: optionData,
			}) &&
			optionData.type !== 'header' &&
			optionData.type !== 'footer';

		if (optionData.type === 'separator') {
			return optionData.label ? (
				<li
					className="slds-dropdown__header slds-truncate"
					title={
						typeof optionData.label === 'string' ? optionData.label : undefined
					}
					role="separator"
					key={`menu-separator-${optionData.id}`}
				>
					<span
						className={classNames(
							'slds-listbox__option-header',
							classNameMenuSubHeader
						)}
					>
						{typeof optionData.label === 'string'
							? optionData.label
							: optionData.label?.(inputValue)}
					</span>
				</li>
			) : (
				<li
					className="slds-has-divider_top-space"
					role="separator"
					key={`menu-separator-${optionData.id}`}
				/>
			);
		}

		if (optionData.type === 'header') {
			return (
				<li
					key={`menu-header-${optionData.id}}`}
					role="presentation"
					className="slds-listbox__item"
				>
					{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus -- focus stays on the combobox input, which drives options through aria-activedescendant */}
					<div
						onClick={
							optionData.disabled
								? undefined
								: (event) => {
										onSelect(event, { option: optionData });
									}
						}
						aria-selected={active}
						aria-disabled={optionData.disabled || undefined}
						id={`${inputId}-listbox-option-${optionData.id}`}
						className={classNames(
							'slds-media slds-listbox__option',
							'slds-listbox__option_entity slds-listbox__option_term',
							{ 'slds-has-focus': active }
						)}
						role="option"
					>
						<span className="slds-media__figure slds-listbox__option-icon">
							{optionData.icon && sizeOptionIcon(optionData.icon)}
						</span>
						<span className="slds-media__body">
							{renderLabel(optionData.label, inputValue)}
						</span>
					</div>
				</li>
			);
		}

		if (optionData.type === 'footer') {
			return (
				<li
					key={`menu-footer-${optionData.id}}`}
					role="presentation"
					className="slds-listbox__item"
				>
					{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus -- focus stays on the combobox input, which drives options through aria-activedescendant */}
					<div
						aria-selected={active}
						aria-disabled={optionData.disabled || undefined}
						onClick={
							optionData.disabled
								? undefined
								: (event) => {
										onSelect(event, { option: optionData });
									}
						}
						id={`${inputId}-listbox-option-${optionData.id}`}
						className={classNames(
							'slds-media slds-listbox__option',
							'slds-listbox__option_entity slds-listbox__option_term',
							{ 'slds-has-focus': active }
						)}
						role="option"
					>
						<span className="slds-media__figure slds-listbox__option-icon">
							{optionData.icon && sizeOptionIcon(optionData.icon)}
						</span>
						<span className="slds-media__body">
							{renderLabel(optionData.label, inputValue)}
						</span>
					</div>
				</li>
			);
		}

		const disabledProps: {
			'aria-describedby'?: string;
			'aria-disabled'?: boolean;
			style?: CSSProperties;
		} = {};
		const tooltipId = `${inputId}-listbox-option-help-${optionData.id}`;
		if (optionData.disabled && tooltipMenuItemDisabled && active) {
			disabledProps['aria-describedby'] = tooltipId;
		}
		if (optionData.disabled) {
			disabledProps['aria-disabled'] = true;
			disabledProps.style = { cursor: 'default' };
		}

		const labelString =
			typeof optionData.label === 'string' ? optionData.label : undefined;

		const menuItem: Record<string, ReactNode> = {
			'icon-title-subtitle': (
				// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus -- focus stays on the combobox input, which drives options through aria-activedescendant
				<span
					aria-selected={active}
					{...disabledProps}
					id={`${inputId}-listbox-option-${optionData.id}`}
					key={`menu-subtitle-${optionData.id}`}
					className={classNames(
						'slds-media slds-listbox__option',
						'slds-listbox__option_entity slds-listbox__option_has-meta',
						{ 'slds-has-focus': active }
					)}
					onClick={
						optionData.disabled
							? undefined
							: (event) => {
									onSelect(event, { option: optionData });
								}
					}
					role="option"
				>
					{optionData.icon && !renderMenuItem ? (
						<span className="slds-media__figure">
							{optionData.icon && sizeOptionIcon(optionData.icon)}
						</span>
					) : null}
					{renderMenuItem ? (
						renderMenuItem({ isSelected: selected, option: optionData })
					) : (
						<span className="slds-media__body">
							<span
								className={classNames(
									'slds-listbox__option-text',
									'slds-listbox__option-text_entity',
									{ 'slds-disabled-text': optionData.disabled }
								)}
								title={labelString}
							>
								{setBold(labelString, inputValue)}
							</span>
							<span
								className={classNames(
									'slds-listbox__option-meta slds-listbox__option-meta_entity',
									{ 'slds-disabled-text': optionData.disabled }
								)}
								title={optionData.subTitle}
							>
								{setBold(optionData.subTitle, inputValue)}
							</span>
						</span>
					)}
				</span>
			),
			checkbox: (
				// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus -- focus stays on the combobox input, which drives options through aria-activedescendant
				<span
					aria-selected={active}
					{...disabledProps}
					id={`${inputId}-listbox-option-${optionData.id}`}
					key={`menu-checkbox-${optionData.id}`}
					className={classNames(
						'slds-media slds-listbox__option',
						' slds-listbox__option_plain slds-media_small slds-media_center',
						{
							'slds-has-focus': active,
							'slds-is-selected': selected,
						}
					)}
					onClick={
						optionData.disabled
							? undefined
							: (event) => {
									onSelect(event, {
										selection,
										option: optionData,
									});
								}
					}
					role="option"
				>
					<span className="slds-media__figure">
						<Icon
							className="slds-listbox__icon-selected"
							category="utility"
							name="check"
							size="x-small"
						/>
					</span>
					<span className="slds-media__body">
						{renderMenuItem ? (
							renderMenuItem({ isSelected: selected, option: optionData })
						) : (
							<span
								className={classNames('slds-truncate', {
									'slds-disabled-text': optionData.disabled,
								})}
								title={labelString}
							>
								{selected ? (
									<span className="slds-assistive-text">
										{assistiveText.optionSelectedInMenu}
									</span>
								) : null}{' '}
								{optionData.type === 'deselect' ? (
									<em>{labelString}</em>
								) : (
									labelString
								)}
							</span>
						)}
					</span>
				</span>
			),
		};

		let item: ReactNode;
		if (optionData.disabled && tooltipMenuItemDisabled) {
			const tooltipPropsFromElement = tooltipMenuItemDisabled.props as {
				content?: ReactNode;
				[key: string]: unknown;
			};
			const { content, ...userDefinedTooltipProps } = tooltipPropsFromElement;
			const tooltipProps: Record<string, unknown> = {
				align: 'top',
				content: optionData.tooltipContent || content,
				id: tooltipId,
				position: 'absolute',
				silenceTriggerTabbableWarning: true,
				triggerStyle: { width: '100%' },
				...userDefinedTooltipProps,
			};
			if (active && tooltipProps.isOpen === undefined) {
				tooltipProps.isOpen = true;
			}
			tooltipProps.trigger = menuItem[variant];
			item = React.cloneElement(tooltipMenuItemDisabled, tooltipProps);
		} else {
			item = menuItem[variant];
		}

		return (
			<li
				className="slds-listbox__item"
				key={`menu-option-${optionData.id}`}
				role="presentation"
			>
				{item}
			</li>
		);
	});

	return (
		<ul
			className={classNames(
				'slds-listbox slds-listbox_vertical slds-dropdown slds-dropdown_fluid',
				{
					'slds-dropdown_length-with-icon-5': itemVisibleLength === 5,
					'slds-dropdown_length-with-icon-7': itemVisibleLength === 7,
					'slds-dropdown_length-with-icon-10': itemVisibleLength === 10,
				},
				classNameMenu
			)}
			ref={menuRef}
			role="presentation"
			style={{
				width: inheritWidthOf === 'menu' ? 'auto' : undefined,
				maxWidth: menuMaxWidth,
				position: menuPosition !== 'relative' ? 'relative' : undefined,
			}}
		>
			{menuOptions.length ? (
				menuOptions
			) : (
				<li
					className="slds-listbox__item slds-listbox__status"
					role="status"
					aria-live="polite"
				>
					<span className="slds-m-left_x-large slds-p-vertical_medium">
						{labels.noOptionsFound}
					</span>
				</li>
			)}
			{hasMenuSpinner && (
				<li role="presentation" className="slds-listbox__item">
					<div className="slds-align_absolute-center slds-p-top_medium">
						<Spinner
							assistiveText={{ label: assistiveText.loadingMenuItems }}
							hasContainer={false}
							placement="inline"
							size="x-small"
						/>
					</div>
				</li>
			)}
		</ul>
	);
};

Menu.displayName = 'Menu';

export default Menu;
