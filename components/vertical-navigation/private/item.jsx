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

const handleClick = (event, { item, onSelect }) => {
	if (!item.url) {
		event.preventDefault();
	}

	if (isFunction(onSelect)) {
		onSelect(event, {
			item,
		});
	}
};

const Item = ({ isSelected = false, item, categoryId, onSelect }) => (
	<li
		className={classNames('slds-nav-vertical__item', {
			'slds-is-active': isSelected,
		})}
	>
		<a
			data-id={item.id}
			href={item.url || '#'}
			className="slds-nav-vertical__action"
			aria-describedby={categoryId}
			aria-current={isSelected ? true : undefined}
			onClick={(event) => {
				handleClick(event, { item, onSelect });
			}}
		>
			{item.icon ? (
				<React.Fragment>
					{React.cloneElement(item.icon, {
						className: classNames(
							item.icon.className,
							`slds-m-right_${item.icon.props.size || 'medium'}`
						),
					})}
					{item.label}
				</React.Fragment>
			) : (
				item.label
			)}
			{item.notificationBadge ? (
				React.cloneElement(item.notificationBadge, {
					className: classNames(
						item.notificationBadge.props.className,
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

export default Item;
