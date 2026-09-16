/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { type ReactNode, type CSSProperties } from 'react';
import classnames from 'classnames';
import Header from './private/header';
import Body from './private/body';
import Footer from './private/footer';
import Empty from './empty';
import { CARD } from '../../utilities/constants';
import getAriaProps from '../../utilities/get-aria-props';
import getDataProps from '../../utilities/get-data-props';

/**
 * ID suffixes for card sub-elements
 */
export const idSuffixes = {
	body: '__body',
	headerActions: '__header-actions',
	heading: '__heading',
	filter: '__filter-input',
};

/**
 * Props for the Card component
 */
export interface CardProps {
	/** CSS classes for the card body */
	bodyClassName?: string | string[] | Record<string, boolean>;
	/** Main content of the card */
	children?: ReactNode;
	/** CSS classes for the card */
	className?: string | string[] | Record<string, boolean>;
	/** Empty state content (true for default, or custom node) */
	empty?: boolean | ReactNode;
	/** Filter input in the header */
	filter?: ReactNode;
	/** Footer content (often pagination) */
	footer?: ReactNode;
	/** Hide the header completely */
	hasNoHeader?: boolean;
	/** Custom header (overrides default media object) */
	header?: ReactNode;
	/** Actions in the header */
	headerActions?: ReactNode;
	/** Heading text or node */
	heading?: ReactNode;
	/** Icon in the header */
	icon?: ReactNode;
	/** Unique identifier */
	id?: string;
	/** Custom styles */
	style?: CSSProperties;
	/** Allow aria-* props */
	[key: `aria-${string}`]: string | boolean | undefined;
	/** Allow data-* props */
	[key: `data-${string}`]: string | number | boolean | undefined;
}

/**
 * Cards are used to apply a container around a related grouping of information.
 * It has a header, a body, and an optional footer.
 */
const Card = ({
	bodyClassName,
	children,
	className,
	empty,
	filter,
	footer,
	hasNoHeader,
	header,
	headerActions,
	heading = 'Related Items',
	icon,
	id,
	style,
	...rest
}: CardProps): React.ReactElement => {
	const ariaProps = getAriaProps(rest);
	const dataProps = getDataProps(rest);

	const bodyId = id ? id + idSuffixes.body : undefined;
	const filterId = id ? id + idSuffixes.filter : undefined;
	const headingId = id ? id + idSuffixes.heading : undefined;
	const headerActionsId = id ? id + idSuffixes.headerActions : undefined;

	let resolvedEmpty: ReactNode = empty;
	if (resolvedEmpty === true) {
		// Can be overridden by passing in a node to the empty prop
		resolvedEmpty = <Empty id={id} heading={heading} />;
	}

	return (
		<article
			id={id}
			className={classnames('slds-card', className as string)}
			style={style}
			{...ariaProps}
			{...dataProps}
		>
			{!hasNoHeader && (
				<Header
					header={header}
					headingId={headingId}
					icon={icon}
					filter={filter}
					filterId={filterId}
					heading={heading}
					headerActions={headerActions}
					headerActionsId={headerActionsId}
				/>
			)}
			{!resolvedEmpty ? (
				<Body id={bodyId} className={bodyClassName}>
					{children}
				</Body>
			) : (
				<Body id={bodyId} className={bodyClassName}>
					{resolvedEmpty}
				</Body>
			)}
			{footer && <Footer>{footer}</Footer>}
		</article>
	);
};

Card.displayName = CARD;

export default Card;















