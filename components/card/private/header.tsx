/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React
import React, { type ReactElement, type ReactNode } from 'react';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classnames from 'classnames';

// ## Children
import MediaObject from '../../media-object';

import { CARD_HEADER } from '../../../utilities/constants';

// Allow for predicatable DOM queries with `querySelectorAll(cssClasses.base)`
const idSuffixes = {
	headerActions: '__header-actions',
	heading: '__heading',
	filter: '__filter-input',
};

const renderFilter = (filter: ReactElement<{ id?: string }>, id?: string) => {
	// allow id to be set by custom header component passed in
	const clonedFilter = React.cloneElement(filter, {
		id: filter.props.id || id,
	});

	return (
		<div className="slds-input-has-icon slds-input-has-icon_left slds-size_1-of-3">
			{clonedFilter}
		</div>
	);
};

renderFilter.displayName = 'renderFilter';

export interface CardHeaderProps {
	/**
	 * Adds a filter input to the card header
	 */
	filter?: ReactNode;
	/**
	 * Set the HTML `id` of the card filter.
	 */
	filterId?: string;
	/**
	 * Allows a custom header (the media object with the icon in the first column). `icon`, `heading` and other props are passed in the media object from Card. Use `design-system-react/components/media-object` to create your own.
	 */
	header?: ReactNode;
	/**
	 * Actions performed on selected items or that relate to the entire group of items such as "Add Item.""
	 */
	headerActions?: ReactNode;
	/**
	 * Set the HTML `id` of the card header actions.
	 */
	headerActionsId?: string;
	/**
	 * The heading is the name of the related item group.
	 */
	heading?: ReactNode;
	/**
	 * Set the HTML `id` of the card heading.
	 */
	headingId?: string;
	/**
	 * Icon associated with grouped items
	 */
	icon?: ReactNode;
}

/**
 * Card Header is a private component and is not meant to be imported or used for Card's `header` prop. It just happens to have the same file name.
 */
const CardHeader = (props: CardHeaderProps) => {
	let title: string | undefined;

	if (typeof props.heading === 'string' || props.heading instanceof String) {
		title = props.heading as string;
	}

	const heading = (
		<h2
			id={props.headingId}
			className="slds-text-heading_small slds-truncate"
			title={title}
		>
			{props.heading}
		</h2>
	);

	let Header: ReactNode;

	if (props.header) {
		const customHeader = props.header as ReactElement<Record<string, unknown>>;
		Header = React.cloneElement(customHeader, {
			figure: props.icon,
			body: heading,
			verticalCenter: true,
			canTruncate: true,
			...customHeader.props,
		});
	} else {
		Header = (
			<MediaObject
				figure={props.icon}
				body={heading}
				verticalCenter
				canTruncate
			/>
		);
	}

	const hasFilter = props.filter ? true : null;

	return (
		<div className={classnames('slds-card__header', 'slds-grid')}>
			{Header}
			{props.filter
				? renderFilter(
						props.filter as ReactElement<{ id?: string }>,
						props.filterId
					)
				: null}
			<div
				id={props.headerActionsId}
				className={classnames('slds-no-flex', {
					'slds-size_1-of-3': hasFilter,
					'slds-text-align_right': hasFilter,
				})}
			>
				{props.headerActions}
			</div>
		</div>
	);
};

// ### Display Name
// Always use the canonical component name as the React display name.
CardHeader.displayName = CARD_HEADER;

export default CardHeader;
export { idSuffixes };
