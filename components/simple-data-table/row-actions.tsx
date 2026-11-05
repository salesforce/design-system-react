/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useContext } from 'react';
import classNames from 'classnames';
import isFunction from 'lodash.isfunction';

import Dropdown, { type MenuDropdownProps } from '../menu-dropdown';

import EventUtil from '../../utilities/event';

import InteractiveElement from './interactive-element';
import CellContext from './private/cell-context';
import TableContext from './private/table-context';
import useContextHelper from './private/context-helper';

import { SIMPLE_DATA_TABLE_ROW_ACTIONS } from '../../utilities/constants';
import type {
	SimpleDataTableItem,
	SimpleDataTableRowActionsProps,
} from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */
const InteractiveDropdown = InteractiveElement(
	Dropdown as any
) as React.ComponentType<any>;
/* eslint-enable @typescript-eslint/no-explicit-any */

export type { SimpleDataTableRowActionsProps };

/** Props the table row injects. They aren't part of the public props. */
interface RowActionsInjectedProps {
	/** HTML ID for the actions menu, unique per row */
	id?: string;
	/** The row's item */
	item?: SimpleDataTableItem;
	/** Fixed layout mode */
	fixedLayout?: boolean;
}

/**
 * RowActions provide a mechanism for defining a menu to display alongside
 * each row in the SimpleDataTable.
 */
const SimpleDataTableRowActions: React.FC<
	SimpleDataTableRowActionsProps & RowActionsInjectedProps
> = ({
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

	const handleSelect: NonNullable<MenuDropdownProps['onSelect']> = (
		event,
		data
	) => {
		if (isFunction(onAction) && item) {
			onAction(item, data.option);
		}
		dropdown?.props.onSelect?.(event, data);
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

	const dropdownProps = {
		...defaultDropdownProps,
		...dropdown?.props,
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

SimpleDataTableRowActions.displayName = SIMPLE_DATA_TABLE_ROW_ACTIONS;

export default SimpleDataTableRowActions as React.FC<SimpleDataTableRowActionsProps>;
