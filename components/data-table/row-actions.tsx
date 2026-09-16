/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useContext, ReactNode } from 'react';
import classNames from 'classnames';
import isFunction from 'lodash.isfunction';

import Dropdown from '../menu-dropdown';

import EventUtil from '../../utilities/event';

import InteractiveElement from './interactive-element';
import CellContext from './private/cell-context';
import TableContext from './private/table-context';
import useContextHelper from './private/context-helper';

import { DATA_TABLE_ROW_ACTIONS } from '../../utilities/constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const InteractiveDropdown = InteractiveElement(Dropdown as any) as React.ComponentType<any>;

export interface DataTableRowActionsProps {
	/** Description of the menu for screenreaders */
	assistiveText?: { icon?: string };
	/** Class names to be added to the actions menu */
	className?: string;
	/** HTML ID to be added to the actions menu */
	id?: string;
	/** DataTable row item */
	item?: Record<string, unknown>;
	/** Disable hint styling which changes the color of the dropdown svg on hover */
	noHint?: boolean;
	/** Triggered when an item is selected */
	onAction?: (item: Record<string, unknown>, selection: unknown) => void;
	/** Dropdown options. See Dropdown. */
	options?: unknown[];
	/** A Dropdown component. Props from this will be merged and override defaults. */
	dropdown?: ReactNode;
	/** Fixed layout mode */
	fixedLayout?: boolean;
}

/**
 * RowActions provide a mechanism for defining a menu to display alongside
 * each row in the DataTable.
 */
const DataTableRowActions: React.FC<DataTableRowActionsProps> = ({
	assistiveText = { icon: 'Actions' },
	noHint = false,
	options = [],
	className,
	id,
	item,
	onAction,
	dropdown,
	fixedLayout,
}) => {
	const tableContext = useContext(TableContext);
	const cellContext = useContext(CellContext);
	const { tabIndex, hasFocus, handleFocus, handleKeyDown } = useContextHelper(
		tableContext,
		cellContext,
		fixedLayout
	);

	const handleClick = (e: React.MouseEvent) => {
		EventUtil.trap(e);
	};

	const handleSelect = (selection: unknown) => {
		if (isFunction(onAction) && item) {
			onAction(item, selection);
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		if (dropdown && isFunction((dropdown as any).props?.onSelect)) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(dropdown as any).props.onSelect(selection);
		}
	};

	const defaultDropdownProps = {
		align: 'right',
		buttonClassName: 'slds-button_icon-x-small',
		buttonVariant: 'icon',
		iconCategory: 'utility',
		iconName: 'down',
		iconSize: 'small',
		iconVariant: 'border-filled',
		assistiveText,
		className,
		options,
		hint: !noHint,
		id,
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let dropdownProps: Record<string, any> = dropdown
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		? (dropdown as any).props
		: {};
	dropdownProps = {
		...defaultDropdownProps,
		...dropdownProps,
		onSelect: handleSelect,
	};

	return (
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
			role={fixedLayout ? 'gridcell' : undefined}
			tabIndex={tabIndex}
		>
			<InteractiveDropdown {...dropdownProps} />
		</td>
	);
};

DataTableRowActions.displayName = DATA_TABLE_ROW_ACTIONS;

export default DataTableRowActions;
