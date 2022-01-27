/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

// ### React
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// ### isFunction
import isFunction from 'lodash.isfunction';

// ## Children
import Dropdown from '../menu-dropdown';

// ### Event Helpers
import EventUtil from '../../utilities/event';

import InteractiveElement from './interactive-element';
import CellContext from './private/cell-context';
import TableContext from './private/table-context';
import useContextHelper from './private/context-helper';

// ## Constants
import { DATA_TABLE_ROW_ACTIONS } from '../../utilities/constants';

const InteractiveDropdown = InteractiveElement(Dropdown);

const propTypes = {
	/**
	 * Description of the menu for screenreaders.
	 */
	assistiveText: PropTypes.object,
	/**
	 * Class names to be added to the actions menu.
	 */
	className: PropTypes.string,
	/**
	 * HTML ID to be added to the actions menu.
	 */
	id: PropTypes.string,
	/**
	 * `DataTable` row item
	 */
	item: PropTypes.object,
	/**
	 * Disable hint styling which changes the color of the dropdown svg on hover over.
	 */
	noHint: PropTypes.bool,
	/**
	 * Triggered when an item is selected.
	 */
	onAction: PropTypes.func,
	/**
	 * `Dropdown` options. See `Dropdown`.
	 */
	options: PropTypes.array,
	/**
	 * A [Dropdown](http://react.lightningdesignsystem.com/components/dropdown-menus/) component. The props from this drop will be merged and override any default props.
	 * **Note:** onAction will not be overridden, both `DropDown`'s onSelect(dropDownActionOption) and onAction(rowItem, dropdownActionOption) will be called with appropriate parameters
	 */
	dropdown: PropTypes.node,
};

const defaultProps = {
	assistiveText: { icon: 'Actions' },
	noHint: false,
	options: [],
};

/**
 * RowActions provide a mechanism for defining a menu to display alongside each row in the DataTable.
 */
const DataTableRowActions = (props) => {
	const tableContext = useContext(TableContext);
	const cellContext = useContext(CellContext);
	const { tabIndex, hasFocus, handleFocus, handleKeyDown } = useContextHelper(
		tableContext,
		cellContext,
		props.fixedLayout
	);

	const handleClick = (e) => {
		EventUtil.trap(e);
	};

	const handleSelect = (selection) => {
		if (isFunction(props.onAction)) {
			props.onAction(props.item, selection);
		}
		if (props.dropdown && isFunction(props.dropdown.props.onSelect)) {
			props.dropdown.props.onSelect(selection);
		}
	};

	// i18n
	const defaultDropdownProps = {
		align: 'right',
		buttonClassName: 'slds-button_icon-x-small',
		buttonVariant: 'icon',
		iconCategory: 'utility',
		iconName: 'down',
		iconSize: 'small',
		iconVariant: 'border-filled',
		assistiveText: props.assistiveText,
		className: props.className,
		options: props.options,
		hint: !props.noHint,
		id: props.id,
	};

	let dropdownProps = props.dropdown ? props.dropdown.props : {};
	dropdownProps = {
		...defaultDropdownProps,
		...dropdownProps,
		onSelect: handleSelect,
	};

	return (
		/* eslint-disable jsx-a11y/no-static-element-interactions */
		<td
			className={classNames({ 'slds-has-focus': hasFocus })}
			data-label="Actions"
			onClick={handleClick}
			style={{ width: '3.25rem' }}
			onFocus={handleFocus}
			onKeyDown={handleKeyDown}
			ref={(ref) => {
				if (ref && hasFocus) {
					ref.focus();
				}
			}}
			role={props.fixedLayout ? 'gridcell' : null}
			tabIndex={tabIndex}
		>
			{/* eslint-enable jsx-a11y/no-static-element-interactions */}
			<InteractiveDropdown {...dropdownProps} />
		</td>
	);
};

DataTableRowActions.propTypes = propTypes;
DataTableRowActions.defaultProps = defaultProps;
DataTableRowActions.displayName = DATA_TABLE_ROW_ACTIONS;
export default DataTableRowActions;
