/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable jsx-a11y/interactive-supports-focus */

import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import classNames from 'classnames';

import Icon from '../../icon';

const propTypes = {
	/*
	 * Active descendant in menu
	 */
	activeOption: PropTypes.object,
	/*
	 * Index of active descendant in menu
	 */
	activeOptionIndex: PropTypes.number,
	/**
	 * CSS classes to be added to container `div` tag. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * CSS classes to be added to tag with `.slds-dropdown`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	classNameMenu: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * CSS classes to be added to menu sub header `span` tag. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	classNameMenuSubHeader: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Sets the dialog width to the width of one of the following:
	 * `target`: (Menus attached to `input` typically follow this UX pattern),
	 *  `menu`: Consider setting a menuMaxWidth if using this value. If not, width will be set to width of largest menu item.
	 *  'none'
	 */
	inheritWidthOf: PropTypes.oneOf(['target', 'menu', 'none']),
	/*
	 * Id used for assistive technology
	 */
	inputId: PropTypes.string,
	/**
	 * Determines the height of the menu based on SLDS CSS classes.
	 */
	itemVisibleLength: PropTypes.oneOf([5, 7, 10]),
	/**
	 * **Text labels for internationalization**
	 * This object is merged with the default props object on every render.
	 * * `noOptionsFound`: Custom message that renders when no matches found. The default empty state is just text that says, 'No matches found.'.
	 */
	labels: PropTypes.shape({
		noOptionsFound: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
			.isRequired,
	}),
	/**
	 * Accepts a custom menu item rendering function that becomes a custom component and is passed in the following props:
	 * * `assistiveText`: Object, `assistiveText` prop that is passed into Combobox
	 * * `option`: Object, option data for item being rendered that is passed into Combobox
	 * * `selected`: Boolean, allows rendering of `assistiveText.optionSelectedInMenu` in Readonly Combobox
	 *
	 * _Tested with snapshot testing._
	 */
	menuItem: PropTypes.func,
	/*
	 * Sets a maximum width that the menu will be if `inheritWidthOf` is menu.
	 */
	maxWidth: PropTypes.string,
	/*
	 * Menu options
	 */
	options: PropTypes.array,
	/*
	 * Callback to remove active descendent
	 */
	resetActiveOption: PropTypes.func,
	/*
	 * Callback when option is selected with keyboard or mouse
	 */
	onSelect: PropTypes.func,
	/*
	 * Selected options
	 */
	selection: PropTypes.array,
	/**
	 * Changes styles of the menu option
	 */
	variant: PropTypes.oneOf(['icon-title-subtitle', 'checkbox']),
	isSelected: PropTypes.func,
	assistiveText: PropTypes.object,
};

const defaultProps = {};

const Menu = (props) => {
	let maxWidth = props.inheritWidthOf === 'menu' ? 'inherit' : undefined;
	maxWidth =
		props.inheritWidthOf === 'menu' && props.maxWidth
			? props.maxWidth
			: maxWidth;

	// .slds-dropdown sets the menu to absolute positioning, since it has a relative parent. Absolute positioning removes clientHeight and clientWidth which Popper.js needs to absolute position the menu's wrapping div. Absolute positioning an already absolute positioned element doesn't work. Setting the menu's position to relative allows PopperJS to work it's magic.
	const menuOptions = props.options.map((optionData, index) => {
		const active =
			index === props.activeOptionIndex &&
			isEqual(optionData, props.activeOption);
		const selected = props.isSelected({
			selection: props.selection,
			option: optionData,
		});
		const MenuItem = props.menuItem;

		if (optionData.type === 'separator') {
			return optionData.label ? (
				<li
					className="slds-dropdown__header slds-truncate"
					title={optionData.label}
					role="separator"
					key={`menu-separator-${optionData.id}`}
				>
					<span
						className={classNames(
							'slds-text-title_caps',
							props.classNameMenuSubHeader
						)}
					>
						{optionData.label}
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

		return (
			<li
				className="slds-listbox__item"
				key={`menu-option-${optionData.id}`}
				role="presentation"
			>
				{
					{
						'icon-title-subtitle': (
							<span // eslint-disable-line jsx-a11y/no-static-element-interactions
								aria-selected={active}
								id={`${props.inputId}-listbox-option-${optionData.id}`}
								className={classNames(
									'slds-media slds-listbox__option',
									'slds-listbox__option_entity slds-listbox__option_has-meta',
									{ 'slds-has-focus': active }
								)}
								onClick={(event) => {
									props.onSelect(event, { option: optionData });
								}}
								role="option"
							>
								{optionData.icon && !props.menuItem ? (
									<span className="slds-media__figure">{optionData.icon}</span>
								) : null}
								{props.menuItem ? (
									<MenuItem
										assistiveText={props.assistiveText}
										selected={selected}
										option={optionData}
									/>
								) : (
									<span className="slds-media__body">
										<span className="slds-listbox__option-text slds-listbox__option-text_entity">
											{optionData.label}
										</span>
										<span className="slds-listbox__option-meta slds-listbox__option-meta_entity">
											{optionData.subTitle}
										</span>
									</span>
								)}
							</span>
						),
						checkbox: (
							<span // eslint-disable-line jsx-a11y/no-static-element-interactions
								aria-selected={selected}
								id={`${props.inputId}-listbox-option-${optionData.id}`}
								className={classNames(
									'slds-media slds-listbox__option',
									' slds-listbox__option_plain slds-media_small slds-media_center',
									{
										'slds-has-focus': active,
										'slds-is-selected': selected,
									}
								)}
								onClick={(event) => {
									props.onSelect(event, {
										selection: props.selection,
										option: optionData,
									});
								}}
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
									{props.menuItem ? (
										<MenuItem
											assistiveText={props.assistiveText}
											selected={selected}
											option={optionData}
										/>
									) : (
										<span className="slds-truncate" title={optionData.label}>
											{selected ? (
												<span className="slds-assistive-text">
													{props.assistiveText.optionSelectedInMenu}
												</span>
											) : null}{' '}
											{optionData.label}
										</span>
									)}
								</span>
							</span>
						),
					}[props.variant]
				}
			</li>
		);
	});

	return (
		<ul
			className={classNames(
				'slds-listbox slds-listbox_vertical slds-dropdown slds-dropdown_fluid',
				{
					'slds-dropdown_length-with-icon-5': props.itemVisibleLength === 5,
					'slds-dropdown_length-with-icon-7': props.itemVisibleLength === 7,
					'slds-dropdown_length-with-icon-10': props.itemVisibleLength === 10,
				},
				props.classNameMenu
			)}
			role="presentation"
			style={{
				width: props.inheritWidthOf === 'menu' ? 'auto' : undefined,
				maxWidth,
				position: props.menuPosition !== 'relative' ? 'relative' : undefined,
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
					<span className="slds-m-left--x-large slds-p-vertical--medium">
						{props.labels.noOptionsFound}
					</span>
				</li>
			)}
		</ul>
	);
};

Menu.displayName = 'Menu';
Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;
