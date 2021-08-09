/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, 'a simple javascript utility for conditionally
// joining classNames together.'
import classNames from 'classnames';

// ### isFunction
import isFunction from 'lodash.isfunction';

import { VERTICAL_NAVIGATION_ITEM } from '../../../utilities/constants';

const handleClick = (event, props) => {
	if (!props.item.url) {
		event.preventDefault();
	}

	if (isFunction(props.onSelect)) {
		props.onSelect(event, {
			item: props.item,
		});
	}
};

const Item = (props) => (
	<li
		className={classNames('slds-nav-vertical__item', {
			'slds-is-active': props.isSelected,
		})}
	>
		<a
			data-id={props.item.id}
			href={props.item.url || '#'}
			className="slds-nav-vertical__action"
			aria-describedby={props.categoryId}
			aria-current={props.isSelected ? true : undefined}
			onClick={(event) => {
				handleClick(event, props);
			}}
		>
			{props.item.icon ? (
				<React.Fragment>
					{React.cloneElement(props.item.icon, {
						className: classNames(
							props.item.icon.props.className,
							`slds-m-right_${props.item.icon.props.size || 'medium'}`
						),
					})}
					{props.item.label}
				</React.Fragment>
			) : (
				props.item.label
			)}
			{props.item.notificationBadge ? (
				React.cloneElement(props.item.notificationBadge, {
					className: classNames(
						props.item.notificationBadge.props.className,
						'slds-col_bump-left'
					),
				})
			) : (
				<React.Fragment />
			)}
		</a>
	</li>
);

// ### Display Name
// Always use the canonical component name as the React display name.
Item.displayName = VERTICAL_NAVIGATION_ITEM;

// ### Prop Types
Item.propTypes = {
	/**
	 * Item to be rendered.
	 */
	item: PropTypes.shape({
		id: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		url: PropTypes.string,
	}),
	/**
	 * Whether item is selected or not.
	 */
	isSelected: PropTypes.bool,
	/**
	 * ID of the category this item belongs to.
	 */
	categoryId: PropTypes.string.isRequired,
	/**
	 * Function that will run whenever an item is selected.
	 */
	onSelect: PropTypes.func,
};

Item.defaultProps = {
	isSelected: false,
};

export default Item;
