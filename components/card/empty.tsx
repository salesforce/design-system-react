/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { type ReactNode } from 'react';

import { CARD_EMPTY } from '../../utilities/constants';

export interface CardEmptyProps {
	/**
	 * Additional call to actions that will render under the heading. Often this is an "Add Item" button.
	 */
	children?: ReactNode;
	/**
	 * Primary text for an Empty Card.
	 */
	heading?: ReactNode;
	/**
	 * Set the HTML `id`. Passed down by `Card` but not rendered here.
	 */
	id?: string;
}

/**
 * A default empty state for Cards.
 */
const CardEmpty = ({ heading = 'No Related Items', children }: CardEmptyProps) => (
	<div className="slds-p-horizontal_small">
		<div className="slds-text-align_center slds-m-bottom_x-large">
			<h3 className="slds-text-heading_small slds-p-top_large slds-p-bottom_large">
				{heading}
			</h3>
			{children}
		</div>
	</div>
);

// ### Display Name
// Always use the canonical component name as the React display name.
CardEmpty.displayName = CARD_EMPTY;

export default CardEmpty;
