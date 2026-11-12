/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { type ReactNode } from 'react';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally joining classNames together."
import classNames from 'classnames';

import { CARD_BODY } from '../../../utilities/constants';

export interface CardBodyProps {
	/**
	 * Elements to place in the body.
	 */
	children?: ReactNode;
	/**
	 * CSS classes to be added to the card.
	 */
	className?: string | string[] | Record<string, boolean>;
	/**
	 * Set the HTML `id` of the body.
	 */
	id?: string;
}

const CardBody = (props: CardBodyProps) => (
	<div className={classNames('slds-card__body', props.className)} id={props.id}>
		{props.children}
	</div>
);

CardBody.displayName = CARD_BODY;

export default CardBody;
