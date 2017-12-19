/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Accordion design
// pattern](https://www.lightningdesignsystem.com/components/accordion/) in
// React. Based on SLDS v2.4.3

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


import { DYNAMIC_MENU_LIST_ITEM } from '../../utilities/constants';

// ### Display Name Always use the canonical component name as the React display
// name.

const displayName = DYNAMIC_MENU_LIST_ITEM;

// TODO: Add propType descriptions for documentation
const propTypes = {
	objectEntity: PropTypes.object,
	onClick: PropTypes.func
};

const ListItem = ({ objectEntity, onClick }) => (
	<li
		role="presentation"
		className="slds-listbox__item"
		onClick={() => onClick}
	>
		<div
			id="listbox-option-id-1"
			className={classNames(
				'slds-media',
				'slds-listbox__option',
				'slds-listbox__option_entity',
				'slds-listbox__option_has-meta'
			)}
			role="option"
		>
			<span className="slds-media__body">
				<span
					className={classNames(
						'slds-listbox__option-text',
						'slds-listbox__option-text_entity'
					)}
				>
					{objectEntity.name}
				</span>
			</span>
		</div>
	</li>
);


export default ListItem;

ListItem.propTypes = propTypes;
ListItem.displayName = displayName;

module.exports = ListItem;
