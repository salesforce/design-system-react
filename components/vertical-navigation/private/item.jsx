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
import Icon from '../../icon';

const handleClick = (event, props) => {
	if (isFunction(props.onSelect)) {
		props.onSelect(event, {
			item: props.item,
		});
	}
};

const getIcon = (icon) => {
	const className = classNames(icon.props.className, 'slds-m-right_x-small');
	const props = {
		...icon.props,
		size: 'x-small',
		className,
	};
	return <Icon {...props} />;
};

const Item = (props) => {
	let { icon } = props.item;
	if (icon) {
		icon = getIcon(icon);
	}

	return (
		<li
			className={classNames('slds-nav-vertical__item', {
				'slds-is-active': props.isSelected,
			})}
		>
			<a
				data-id={props.item.id}
				href={props.item.url || 'javascript:void(0);'} // eslint-disable-line no-script-url
				className="slds-nav-vertical__action"
				aria-describedby={props.categoryId}
				onClick={(event) => {
					handleClick(event, props);
				}}
			>
				{icon}
				{props.item.label}
				{props.item.notification && (
					<span className="slds-badge slds-col_bump-left">
						{props.item.notification}
						<span className="slds-assistive-text">
							{props.assistiveText.notificationLabel}
						</span>
					</span>
				)}
			</a>
		</li>
	);
};

// ### Display Name
// Always use the canonical component name as the React display name.
Item.displayName = VERTICAL_NAVIGATION_ITEM;

// ### Prop Types
Item.propTypes = {
	/**
	 * **Assistive text for accessibility**
	 * This object is merged with the default props object on every render.
	 * * `notificationLabel`: This is a visually hidden label for the notification badge.
	 * _Tested with snapshot testing._
	 */
	assistiveText: PropTypes.shape({ notificationLabel: PropTypes.string }),
	/**
	 * Item to be rendered.
	 */
	item: PropTypes.shape({
		icon: PropTypes.node,
		id: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		notification: PropTypes.string,
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
	assistiveText: { notificationLabel: 'New Value' },
};

export default Item;
