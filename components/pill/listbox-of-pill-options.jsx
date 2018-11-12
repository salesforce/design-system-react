/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Listbox of Pill Options Component
// Implements the [Listbox of Pill Options design pattern](https://www.lightningdesignsystem.com/components/pills/?variant=listbox-of-pill-options) in React.

import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '~/components/avatar';
import Icon from '~/components/icon';
import Pill from '~/components/pill';

import { LISTBOX_OF_PILL_OPTIONS } from '../../utilities/constants';

const propTypes = {
	/**
	 * **Assistive text for accessibility**
	 * * `listboxLabel`: This is a label for the listbox. The default is `Selected Options:`.
	 * * `removePill`: Used to remove a selected item (pill). Focus is on the pill. This is not a button. The default is `Press delete or backspace to remove`.
	 */
	assistiveText: PropTypes.shape({
		listboxLabel: PropTypes.string,
		removePill: PropTypes.string,
	}),
	/**
	 * HTML id for Listbox of Pill Options
	 */
	id: PropTypes.string,
	/**
	 * **Text labels for internationalization**
	 * * `removePillTitle`: Title on `X` icon
	 */
	labels: PropTypes.shape({
		removePillTitle: PropTypes.string,
	}),
	/**
	 * Accepts an array of pill item objects.
	 */
	options: PropTypes.array,
	/**
	 * Function called when a pill is clicked
	 */
	onClickPill: PropTypes.func,
	/**
	 * Function called when a pill is 'removed' via the delete key or 'X' icon click
	 */
	onRemovePill: PropTypes.func,
};

/**
 * A ListboxOfPillOptions is a container that holds one or more pills
 */
const ListboxOfPillOptions = (props) => (
	<div
		className="slds-pill_container"
		id={`${props.id}-listbox-of-pill-options`}
	>
		<ul
			aria-label={props.assistiveText.listboxLabel}
			aria-orientation="horizontal"
			className="slds-listbox slds-listbox_horizontal"
			role="listbox"
		>
			{props.options.map((item, itemIndex) => {
				let avatar = null;
				let icon = null;

				if (item.icon) {
					icon = (
						<Icon
							category={item.icon.category}
							name={item.icon.name}
							title={item.icon.title || item.label}
						/>
					);
				} else if (item.avatar) {
					avatar = (
						<Avatar
							imgSrc={item.avatar.imgSrc}
							title={item.avatar.title || item.label}
							variant={item.avatar.variant || 'user'}
						/>
					);
				}

				return (
					<li
						className="slds-listbox-item"
						key={`${props.id}-list-item-${item.id}`}
						role="presentation"
					>
						<Pill
							assistiveText={{
								remove: 'Press delete or backspace to remove',
							}}
							avatar={avatar}
							bare={item.isBare}
							icon={icon}
							labels={{
								label: item.label,
								title: item.title,
								removeTitle: props.labels.removePillTitle,
							}}
							onClick={(event) => {
								if (props.onClickPill) {
									props.onClickPill(event, {
										...item,
										...{ index: itemIndex },
									});
								}
							}}
							onRemove={(event) => {
								if (props.onRemovePill) {
									props.onRemovePill(event, {
										...item,
										...{ index: itemIndex },
									});
								}
							}}
							tabIndex="0"
							variant="option"
						/>
					</li>
				);
			})}
		</ul>
	</div>
);

ListboxOfPillOptions.displayName = LISTBOX_OF_PILL_OPTIONS;

ListboxOfPillOptions.defaultProps = {
	assistiveText: {
		listboxLabel: 'Selected Options:',
		removePill: 'Press delete or backspace to remove',
	},
	labels: {
		removePillTitle: 'Remove',
	},
};

ListboxOfPillOptions.propTypes = propTypes;

export default ListboxOfPillOptions;
