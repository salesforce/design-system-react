/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React
import React from 'react';
import PropTypes from 'prop-types';

import Input from '../input';
import InputIcon from '../icon/input-icon';

import { CARD_FILTER } from '../../utilities/constants';

/**
 * A default filter or search input for Cards that contain items.
 */
const Filter = (props) => {
	const { id, placeholder, onChange, ...rest } = props;

	return (
		<Input
			{...rest}
			assistiveText={{ label: placeholder }}
			iconLeft={<InputIcon name="search" category="utility" />}
			id={id}
			onChange={onChange}
			placeholder={placeholder}
		/>
	);
};

// ### Display Name
// Always use the canonical component name as the React display name.
Filter.displayName = CARD_FILTER;

// ### Prop Types
Filter.propTypes = {
	/**
	 * The HTML `id` from the card with a suffixe.
	 */
	id: PropTypes.string,
	/**
	 * This callback fires when the input changes.
	 */
	onChange: PropTypes.func,
	/**
	 * Text present in input until the user enters text. This text will also be used for a visually hidden label on the filter `input` element for accessibility.
	 */
	placeholder: PropTypes.string.isRequired,
};

Filter.defaultProps = {
	placeholder: 'Find in List',
};

export default Filter;
