/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Accordion design
// pattern](https://www.lightningdesignsystem.com/components/accordion/) in
// React. Based on SLDS v2.4.3

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import ButtonIcon?
import Icon from '../icon';


import { DYNAMIC_MENU_SEARCH_BOX } from '../../utilities/constants';

// ### Display Name Always use the canonical component name as the React display
// name.

const displayName = DYNAMIC_MENU_SEARCH_BOX;

// TODO: Add propType descriptions for documentation
const propTypes =  {
	searchValue: PropTypes.string,
	onKeyUp: PropTypes.func,
	placeholder: PropTypes.string,
	selectedItem: PropTypes.object,
	onRemoveSelection: PropTypes.func
};

const SearchBox = ({ onKeyUp, onRemoveSelection, placeholder, searchValue, selectedItem }) => {
	// TODO: Decide if we should have this as separate component.
	const getSearchBox = ({ hasListBox, inputValue, iconName, onClickIcon, onInputChange }) => (
		<div className="slds-form-element">
			<div className="slds-form-element__control">
				<div
					className={classNames(
						'slds-combobox_container',
						hasListBox
							? 'slds-has-inline-listbox'
							: ''
					)}
				>
					<div
						className={classNames(
							'slds-combobox',
							'slds-dropdown-trigger',
							'slds-dropdown-trigger_click'
						)}
						aria-expanded="false"
						aria-haspopup={hasListBox}
						role="combobox"
					>
						<div
							className={classNames(
								'slds-combobox__form-element',
								'slds-input-has-icon'
							)}
							role="none"
						>
							<input
								type="text"
								className="slds-input slds-combobox__input"
								id="dynamic-menu-search-box"
								aria-autocomplete="list"
								aria-controls="listbox-unique-id"
								autoComplete="off"
								role="textbox"
								placeholder={placeholder}
								readOnly={hasListBox}
								value={inputValue}
								onChange={onInputChange}
							/>
							<button
								className={classNames(
									'slds-button',
									'slds-button_icon',
									'slds-input__icon',
									'slds-input__icon_right',
									'combobox-icon'
								)}
								onClick={
									onClickIcon
								}
							>
								<Icon
									category="utility"
									name={iconName}
									size="x-small"
								/>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	if (selectedItem) {
		return getSearchBox(
			{
				hasListBox: true,
				inputValue: selectedItem.name,
				iconName: 'close',
				onClickIcon: onRemoveSelection
			}
		);
	}
	return getSearchBox(
		{
			hasListbox: false,
			inputValue: searchValue,
			iconName: 'search',
			onInputChange: onKeyUp
		}
	);
};

export default SearchBox;

SearchBox.propTypes = propTypes;
SearchBox.displayName = displayName;

module.exports = SearchBox;
