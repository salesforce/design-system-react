/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Accordion design
// pattern](https://www.lightningdesignsystem.com/components/accordion/) in
// React. Based on SLDS v2.4.3

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


import { DYNAMIC_MENU_LIST_BOX } from '../../utilities/constants';
import ListItem from './list-item';

// ### Display Name Always use the canonical component name as the React display
// name.
const displayName = DYNAMIC_MENU_LIST_BOX;

const propTypes = {
	// TODO: Add propType descriptions for documentation
	allObjects: PropTypes.array,
	onSelectItem: PropTypes.func,
	searchValue: PropTypes.string,
	header: PropTypes.string
};

const defaultProps = () => (
	{
		allObjects: []
	}
);

const ListBox = ({ allObjects, onSelectItem, header }) => {
	const getListItems = allObjects.map((obj) => (
		<ListItem
			objectEntity={obj}
			onClick={() => onSelectItem(obj)}
			key={obj.name}
		/>
	));

	// What is header in `getHeader` representing? Added `header` prop for now so that we might take logic in from the dev.
		// original code
		// getHeader() {
		// 			if(this.props.allObjects.length == 0) {
		// 							let msg = app.i18n.t('context:details.searchNoMatches', { 0: this.props.searchValue });
		// 							return (<div>{msg}</div>);
		// 			}


	const getHeader = allObjects.length === 0 && header;

	return (
		<div id="listbox-unique-id" role="listbox">
			<ul
				className={classNames(
					'slds-listbox',
					'slds-listbox_vertical',
					'slds-dropdown_length-10',
					'modal-dynamic-menu-ul'
				)}
				role="group"
			>
				<li role="presentation" className="slds-listbox__item">
					<div
						className={
							classNames('slds-media', 'slds-listbox__option', 'slds-listbox__option_plain')
						}
						role="presentation"
					>
						{() => getHeader}
					</div>
				</li>
				{() => getListItems}
			</ul>
		</div>
	);
};


export default ListBox;

ListBox.defaultProps = defaultProps;
ListBox.propTypes = propTypes;
ListBox.displayName = displayName;

module.exports = ListBox;
