/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { type ReactNode } from 'react';

import { CARD_FOOTER } from '../../../utilities/constants';

export interface CardFooterProps {
	/**
	 * Elements to place in the footer.
	 */
	children?: ReactNode;
}

const CardFooter = (props: CardFooterProps) => (
	<div className="slds-card__footer">{props.children}</div>
);

CardFooter.displayName = CARD_FOOTER;

export default CardFooter;
