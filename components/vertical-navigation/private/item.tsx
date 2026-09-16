/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { type ReactElement } from 'react';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, 'a simple javascript utility for conditionally
// joining classNames together.'
import classNames from 'classnames';

// ### isFunction
import isFunction from 'lodash.isfunction';

import { VERTICAL_NAVIGATION_ITEM } from '../../../utilities/constants';
import { type NavigationItem, type NavigationSelectData } from '../index';

export interface ItemProps {
	/**
	 * Item to be rendered.
	 */
	item: NavigationItem;
	/**
	 * Whether item is selected or not.
	 */
	isSelected?: boolean;
	/**
	 * ID of the category this item belongs to.
	 */
	categoryId: string;
	/**
	 * Function that will run whenever an item is selected.
	 */
	onSelect?: (
		event: React.MouseEvent<HTMLAnchorElement>,
		data: NavigationSelectData
	) => void;
}

const handleClick = (
	event: React.MouseEvent<HTMLAnchorElement>,
	{ item, onSelect }: Pick<ItemProps, 'item' | 'onSelect'>
) => {
	if (!item.url) {
		event.preventDefault();
	}

	if (isFunction(onSelect)) {
		onSelect(event, {
			item,
		});
	}
};

const Item = ({ isSelected = false, item, categoryId, onSelect }: ItemProps) => (
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
					{React.cloneElement(
						item.icon as ReactElement<{ className?: string; size?: string }>,
						{
							className: classNames(
								(item.icon as ReactElement<{ className?: string }>).props
									.className,
								`slds-m-right_${
									(item.icon as ReactElement<{ size?: string }>).props.size ||
									'medium'
								}`
							),
						}
					)}
					{item.label}
				</React.Fragment>
			) : (
				item.label
			)}
			{item.notificationBadge ? (
				React.cloneElement(
					item.notificationBadge as ReactElement<{ className?: string }>,
					{
						className: classNames(
							(item.notificationBadge as ReactElement<{ className?: string }>)
								.props.className,
							'slds-col_bump-left'
						),
					}
				)
			) : (
				<React.Fragment />
			)}
		</a>
	</li>
);

// ### Display Name
// Always use the canonical component name as the React display name.
Item.displayName = VERTICAL_NAVIGATION_ITEM;

export default Item;
