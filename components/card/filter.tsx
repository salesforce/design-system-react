/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React
import React from 'react';

import Input, { type InputProps } from '../input';
import InputIcon from '../icon/input-icon';

import { CARD_FILTER } from '../../utilities/constants';

export interface CardFilterProps extends Omit<InputProps, 'id'> {
	/**
	 * The HTML `id` from the card with a suffixe.
	 */
	id?: string;
	/**
	 * This callback fires when the input changes.
	 */
	onChange?: InputProps['onChange'];
	/**
	 * Text present in input until the user enters text. This text will also be used for a visually hidden label on the filter `input` element for accessibility.
	 */
	placeholder?: string;
}

/**
 * A default filter or search input for Cards that contain items.
 */
const Filter = ({
	id,
	placeholder = 'Find in List',
	onChange,
	...rest
}: CardFilterProps): React.ReactElement => (
	<Input
		{...rest}
		assistiveText={{ label: placeholder }}
		iconLeft={<InputIcon name="search" category="utility" />}
		id={id}
		onChange={onChange}
		placeholder={placeholder}
	/>
);

// ### Display Name
// Always use the canonical component name as the React display name.
Filter.displayName = CARD_FILTER;

export default Filter;
