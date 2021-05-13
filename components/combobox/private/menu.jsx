/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable jsx-a11y/interactive-supports-focus */

import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import classNames from 'classnames';

import Icon from '../../icon';
import Spinner from '../../spinner';

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
	onRenderMenuItem: PropTypes.func,
	/**
	 * Accepts a ref function or object (React.createRef() or otherwise) to store the menu DOM reference once available
	 */
	menuRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	/*
	 * Sets a maximum width that the menu will be if `inheritWidthOf` is menu.
	 */
	maxWidth: PropTypes.string,
	/*
	 * Callback when option is selected with keyboard or mouse
	 */
	onSelect: PropTypes.func,
	/*
	 * Menu options
	 */
	options: PropTypes.array,
	/*
	 * Selected options
	 */
	selection: PropTypes.array,
	/*
	 * Adds loading spinner below the options
	 */
	hasMenuSpinner: PropTypes.bool,
	/**
	 * Accepts a tooltip that is displayed when hovering on disabled menu items.
	 */
	tooltipMenuItemDisabled: PropTypes.element,
	/**
	 * Changes styles of the menu option
	 */
	variant: PropTypes.oneOf(['icon-title-subtitle', 'checkbox']),
	isSelected: PropTypes.func,
	assistiveText: PropTypes.object,
};

const defaultProps = {
	inputValue: '',
	menuRef: () => {},
};

const setBold = (label, searchTerm) => {
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

const renderLabel = (labelProp, searchTerm) => {
	if (labelProp == null || typeof labelProp === 'string') {
		return labelProp;
	}

	return labelProp(searchTerm);
};

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
			props.activeOption &&
			isEqual(optionData.id, props.activeOption.id);
		const selected =
			props.isSelected({
				selection: props.selection,
				option: optionData,
			}) &&
			(optionData.type !== 'header' || optionData.type === 'footer');
		const MenuItem = props.onRenderMenuItem;

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
							'slds-listbox__option-header',
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
		if (optionData.type === 'header') {
			return (
				<li
					key={`menu-header-${optionData.id}}`}
					role="presentation"
					className="slds-listbox__item"
				>
					<div
						onClick={
							optionData.disabled
								? null
								: (event) => {
										props.onSelect(event, { option: optionData });
								  }
						}
						aria-selected={active}
						id={`${props.inputId}-listbox-option-${optionData.id}`}
						className={classNames(
							'slds-media slds-listbox__option',
							'slds-listbox__option_entity slds-listbox__option_term',
							{ 'slds-has-focus': active }
						)}
						role="option"
					>
						<span className="slds-media__figure slds-listbox__option-icon">
							{optionData.icon}
						</span>
						<span className="slds-media__body">
							{renderLabel(optionData.label, props.inputValue)}
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
					<div
						aria-selected={active}
						onClick={
							optionData.disabled
								? null
								: (event) => {
										props.onSelect(event, { option: optionData });
								  }
						}
						id={`${props.inputId}-listbox-option-${optionData.id}`}
						className={classNames(
							'slds-media slds-listbox__option',
							'slds-listbox__option_entity slds-listbox__option_term',
							{ 'slds-has-focus': active }
						)}
						role="option"
					>
						<span className="slds-media__figure slds-listbox__option-icon">
							{optionData.icon}
						</span>
						<span className="slds-media__body">
							{renderLabel(optionData.label, props.inputValue)}
						</span>
					</div>
				</li>
			);
		}

		const disabledProps = {};
		const tooltipId = `${props.inputId}-listbox-option-help-${optionData.id}`;
		if (optionData.disabled && props.tooltipMenuItemDisabled && active) {
			disabledProps['aria-describedby'] = tooltipId;
		}
		if (optionData.disabled) {
			disabledProps['aria-disabled'] = !!optionData.disabled;
			disabledProps.style = { cursor: 'default' }; // Replace this with a css class name once SLDS has it.
		}

		const menuItem = {
			'icon-title-subtitle': (
				<span
					aria-selected={active}
					{...disabledProps}
					id={`${props.inputId}-listbox-option-${optionData.id}`}
					key={`menu-subtitle-${optionData.id}`}
					className={classNames(
						'slds-media slds-listbox__option',
						'slds-listbox__option_entity slds-listbox__option_has-meta',
						{ 'slds-has-focus': active }
					)}
					onClick={
						optionData.disabled
							? null
							: (event) => {
									props.onSelect(event, { option: optionData });
							  }
					}
					role="option"
				>
					{/* For backward compatibility,  */}
					{optionData.icon && !props.onRenderMenuItem ? (
						<span className="slds-media__figure">{optionData.icon}</span>
					) : null}
					{props.onRenderMenuItem ? (
						<MenuItem
							assistiveText={props.assistiveText}
							selected={selected}
							option={optionData}
						/>
					) : (
						<span className="slds-media__body">
							<span
								className={classNames(
									'slds-listbox__option-text',
									'slds-listbox__option-text_entity',
									{ 'slds-disabled-text': optionData.disabled }
								)}
								title={optionData.label}
							>
								{setBold(optionData.label, props.inputValue)}
							</span>
							<span
								className={classNames(
									'slds-listbox__option-meta slds-listbox__option-meta_entity',
									{ 'slds-disabled-text': optionData.disabled }
								)}
								title={optionData.subTitle}
							>
								{setBold(optionData.subTitle, props.inputValue)}
							</span>
						</span>
					)}
				</span>
			),
			checkbox: (
				<span // eslint-disable-line jsx-a11y/no-static-element-interactions
					aria-selected={active}
					{...disabledProps}
					id={`${props.inputId}-listbox-option-${optionData.id}`}
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
							? null
							: (event) => {
									props.onSelect(event, {
										selection: props.selection,
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
						{props.onRenderMenuItem ? (
							<MenuItem
								assistiveText={props.assistiveText}
								selected={selected}
								option={optionData}
							/>
						) : (
							<span
								className={classNames('slds-truncate', {
									'slds-disabled-text': optionData.disabled,
								})}
								title={optionData.label}
							>
								{selected ? (
									<span className="slds-assistive-text">
										{props.assistiveText.optionSelectedInMenu}
									</span>
								) : null}{' '}
								{optionData.type === 'deselect' ? (
									<em>{optionData.label}</em>
								) : (
									optionData.label
								)}
							</span>
						)}
					</span>
				</span>
			),
		};

		let item;
		if (optionData.disabled && props.tooltipMenuItemDisabled) {
			const {
				content,
				...userDefinedTooltipProps
			} = props.tooltipMenuItemDisabled.props;
			const tooltipProps = {
				align: 'top',
				content: optionData.tooltipContent || content, // either use specific content defined on option or content defined on tooltip component.
				id: tooltipId,
				position: 'absolute',
				silenceTriggerTabbableWarning: true,
				triggerStyle: { width: '100%' },
				...userDefinedTooltipProps, // we want to allow user defined tooltip pros to overwrite default props, if need be.
			};
			if (active) {
				// allows showing the tooltip on keyboard navigation to disabled menu item
				tooltipProps.isOpen = true;
			}
			item = React.cloneElement(
				props.tooltipMenuItemDisabled,
				tooltipProps,
				menuItem[props.variant]
			);
		} else {
			item = menuItem[props.variant];
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
					'slds-dropdown_length-with-icon-5': props.itemVisibleLength === 5,
					'slds-dropdown_length-with-icon-7': props.itemVisibleLength === 7,
					'slds-dropdown_length-with-icon-10': props.itemVisibleLength === 10,
				},
				props.classNameMenu
			)}
			ref={props.menuRef}
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
					<span className="slds-m-left_x-large slds-p-vertical_medium">
						{props.labels.noOptionsFound}
					</span>
				</li>
			)}
			{props.hasMenuSpinner && (
				<li role="presentation" className="slds-listbox__item">
					<div className="slds-align_absolute-center slds-p-top_medium">
						<Spinner
							assistiveText={{ label: props.assistiveText.loadingMenuItems }}
							hasContainer={false}
							isInline
							size="x-small"
						/>
					</div>
				</li>
			)}
		</ul>
	);
};

Menu.displayName = 'Menu';
Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;
