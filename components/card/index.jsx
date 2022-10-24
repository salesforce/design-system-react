/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Card Component

// Implements the [Card design pattern](https://www.lightningdesignsystem.com/components/cards/) in React.
// Based on SLDS v2.2.1

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classnames from 'classnames';

// ## Children
import Header from './private/header';
import Body from './private/body';
import Footer from './private/footer';
import Empty from './empty';

import { CARD } from '../../utilities/constants';
import getAriaProps from '../../utilities/get-aria-props';
import getDataProps from '../../utilities/get-data-props';

const idSuffixes = {
	body: '__body',
	headerActions: '__header-actions',
	heading: '__heading',
	filter: '__filter-input',
};

/**
 * Cards are used to apply a container around a related grouping of information. It has a header, a body, and an optional footer. It often contains a DataTable or Tile (coming soon). Actions associated with selected items or with all items are included within the header actions. Footer often contains pagination. `aria-` and `data-` props can be provided and will be destructured on the root `article` element.
 */
const Card = (props) => {
	const ariaProps = getAriaProps(props);
	const dataProps = getDataProps(props);
	const bodyId = props.id ? props.id + idSuffixes.body : null;
	const filterId = props.id ? props.id + idSuffixes.filter : null;
	const headingId = props.id ? props.id + idSuffixes.heading : null;
	const headerActionsId = props.id ? props.id + idSuffixes.headerActions : null;

	let { empty } = props;
	if (empty === true) {
		// Can be overridden by passing in a node to the empty prop
		empty = <Empty id={props.id} heading={props.heading} />;
	}

	return (
		<article
			id={props.id}
			className={classnames('slds-card', props.className)}
			style={props.style}
			{...ariaProps}
			{...dataProps}
		>
			{!props.hasNoHeader && (
				<Header
					header={props.header}
					headingId={headingId}
					icon={props.icon}
					filter={props.filter}
					filterId={filterId}
					heading={props.heading}
					headerActions={props.headerActions}
					headerActionsId={headerActionsId}
				/>
			)}
			{!empty ? (
				<Body id={bodyId} className={props.bodyClassName}>
					{props.children}
				</Body>
			) : (
				<Body id={bodyId} className={props.bodyClassName}>
					{empty}
				</Body>
			)}
			{props.footer ? <Footer>{props.footer}</Footer> : null}
		</article>
	);
};

// ### Display Name
// Always use the canonical component name as the React display name.
Card.displayName = CARD;

Card.defaultProps = {
	heading: 'Related Items',
};

// ### Prop Types
Card.propTypes = {
	/**
	 * CSS classes to be added to the card body (wraps children).
	 */
	bodyClassName: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * The main section of the card. It often contains a `DataTable` or `Tile`.
	 */
	children: PropTypes.node,
	/**
	 * CSS classes to be added to the card.
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Replaces the body (that is the children) with the specified empty state, this will also remove header actions, the filter, and the icon. If the default empty state is wanted, set to `true`.
	 */
	empty: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
	/**
	 * Adds a filter input to the card header.
	 */
	filter: PropTypes.node,
	/**
	 * Footer often contains pagination.
	 */
	footer: PropTypes.node,
	/**
	 * Allows card to have no header, and ignores header related props altogether.
	 */
	hasNoHeader: PropTypes.bool,
	/**
	 * Allows a custom header (the media object with the icon in the first column). `icon`, `heading` and other props are passed into the media object from Card if present. Use `design-system-react/components/media-object` to create your own custom header.
	 */
	header: PropTypes.node,
	/**
	 * The heading is the name of the related item group and should only contain inline elements.
	 */
	heading: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
	/**
	 * Actions to perform on selected items or actions that are not specific to one item such as adding an item. If no group actions are needed, then the number of selected items is often present.
	 */
	headerActions: PropTypes.node,
	/**
	 * Icon associated with the items within the `body`.
	 */
	icon: PropTypes.node,
	/**
	 * Set the HTML `id` of the card. This also sets the `id` of the filter and the header actions.
	 */
	id: PropTypes.string,
	/**
	 * Custom styles to be added to the card.
	 */
	style: PropTypes.object,
};

export default Card;
export { idSuffixes };
