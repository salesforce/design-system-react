/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import find from 'lodash.find';
import reject from 'lodash.reject';

const propTypes = {
	/*
	 * Item is focussed
	 */
	focused: PropTypes.bool,
	/*
	 * Id used for assistive technology
	 */
	id: PropTypes.string,
	/*
	 * Option data object
	 */
	option: PropTypes.object,
	/*
	 * Callback when item is selected with keyboard or mouse
	 */
	onSelect: PropTypes.func,
	/*
	 * Selected options
	 */
	selection: PropTypes.array
};

const defaultProps = {
	labels: {},
	events: {}
};

const isSelected = ({ selection, option }) => {
	return !!find(selection, option);
};

const MenuItem = (props) => {
	return (
		<span
			id="listbox-option-unique-id-01"
			className={classNames('slds-media slds-listbox__option slds-listbox__option_entity slds-listbox__option_has-meta',
				{ 'slds-has-focus': props.focused })}
			onClick={(event) => {
				let selection;

				if (!isSelected({ selection, option: props.option })) {
					selection = [...props.selection, props.option];
				} else {
					selection = reject(props.selection, props.option);
				}

				props.onSelect(event, { selection });
			}}
			role="option"
		>
			{props.option.icon
			? <span className="slds-media__figure">
				{props.option.icon}
			</span>
			: null}
			<span className="slds-media__body">
				<span className="slds-listbox__option-text slds-listbox__option-text_entity">{props.option.label}</span>
				<span className="slds-listbox__option-meta slds-listbox__option-meta_entity">{props.option.subTitle}</span>
			</span>
		</span>
	);
};

MenuItem.displayName = 'MenuItem';
MenuItem.propTypes = propTypes;
MenuItem.defaultProps = defaultProps;

export default MenuItem;
