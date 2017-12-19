/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Accordion design
// pattern](https://www.lightningdesignsystem.com/components/accordion/) in
// React. Based on SLDS v2.4.3

import React from 'react';
import PropTypes from 'prop-types';
import SearchBox from './search-box';
import ListBox from './list-box';

import { DYNAMIC_MENU } from '../../utilities/constants';


// ### Display Name Always use the canonical component name as the React display
// name.

const displayName = DYNAMIC_MENU;

// TODO: Add propType descriptions for documentation
const propTypes = {
	availableItems: PropTypes.array,
	searchValue: PropTypes.string,
	selectedItem: PropTypes.object,
	onSearchKeyUp: PropTypes.func,
	onSelectItem: PropTypes.func,
	onRemoveSelection: PropTypes.func,
	searchBoxPlaceholder: PropTypes.string
};

const DynamicMenu = (props) => {
	const {
		availableItems,
		onSearchKeyUp,
		onSelectItem,
		onRemoveSelection,
		searchBoxPlaceholder,
		searchValue,
		selectedItem
	} = props;

	return (
		<div className="slds-form-element">
			<div className="slds-form-element__control">
				<div className="slds-combobox_container">
					<SearchBox
						searchValue={searchValue}
						selectedItem={selectedItem}
						onKeyUp={onSearchKeyUp}
						onRemoveSelection={onRemoveSelection}
						placeholder={searchBoxPlaceholder}
					/>
					<ListBox
						searchValue={searchValue}
						allObjects={availableItems}
						onSelectItem={onSelectItem}
					/>
				</div>
			</div>
		</div>
	);
};

export default DynamicMenu;

DynamicMenu.propTypes = propTypes;
DynamicMenu.displayName = displayName;

module.exports = DynamicMenu;
