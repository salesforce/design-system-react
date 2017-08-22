/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

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
	/*
	 * Id used for assistive technology
	 */
	inputId: PropTypes.string,
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
	variant: PropTypes.oneOf(['icon-title-subtitle', 'checkbox'])
};

const defaultProps = {};

const Menu = (props) => {
	const menuOptions = props.options.map((optionData, index) => {
		const active = (index === props.activeOptionIndex
			&& isEqual(optionData, props.activeOption));

		return (
			<li
				className="slds-listbox__item"
				key={`menu-option-${optionData.id}`}
				role="presentation"
			>
				{{
					'icon-title-subtitle': (
						<span // eslint-disable-line jsx-a11y/no-static-element-interactions
							id={`${props.inputId}-listbox-option-${optionData.id}`}
							className={classNames('slds-media slds-listbox__option',
								'slds-listbox__option_entity slds-listbox__option_has-meta',
								{ 'slds-has-focus': active })}
							onClick={(event) => {
								props.onSelect(event, { option: optionData });
							}}
							role="option"
						>
							{optionData.icon
							? <span className="slds-media__figure">
								{optionData.icon}
							</span>
							: null}
							<span className="slds-media__body">
								<span className="slds-listbox__option-text slds-listbox__option-text_entity">{optionData.label}</span>
								<span className="slds-listbox__option-meta slds-listbox__option-meta_entity">{optionData.subTitle}</span>
							</span>
						</span>
					),
					checkbox: (
						<span // eslint-disable-line jsx-a11y/no-static-element-interactions
							id={`${props.inputId}-listbox-option-${optionData.id}`}
							className={classNames('slds-media slds-listbox__option',
								' slds-listbox__option_plain slds-media_small slds-media_center',
								{
									'slds-has-focus': active,
									'slds-is-selected': props.isSelected({ selection: props.selection, option: optionData })
								})}
							onClick={(event) => {
								props.onSelect(event, { selection: props.selection, option: optionData });
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
								<span className="slds-truncate" title="Option A"> {optionData.label}</span>
							</span>
						</span>
				)
				}[props.variant]}
			</li>
		);
	});

	return (
		<div id={`${props.inputId}-listbox`} role="listbox">
			<ul className="slds-listbox slds-listbox_vertical slds-dropdown slds-dropdown_fluid" role="presentation">
				{menuOptions}
			</ul>
		</div>
	);
};

Menu.displayName = 'Menu';
Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;
