/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useContext, useEffect, ReactNode } from 'react';
import classNames from 'classnames';
import isFunction from 'lodash.isfunction';

import Dropdown from '../menu-dropdown';

import EventUtil from '../../utilities/event';

import InteractiveElement from './interactive-element';
import CellContext from './private/cell-context';
import TableContext from './private/table-context';
import useContextHelper from './private/context-helper';
import checkProps from './row-actions-check-props';

import { SIMPLE_DATA_TABLE_ROW_ACTIONS } from '../../utilities/constants';

/* eslint-disable @typescript-eslint/no-explicit-any */
const InteractiveDropdown = InteractiveElement(
	Dropdown as any
) as React.ComponentType<any>;
/* eslint-enable @typescript-eslint/no-explicit-any */

export interface SimpleDataTableRowActionsProps {
	/** Description of the menu for screenreaders */
	assistiveText?: { icon?: string };
	/** Class names to be added to the actions menu */
	className?: string;
	/** HTML ID to be added to the actions menu */
	id?: string;
	/** SimpleDataTable row item */
	item?: Record<string, unknown>;
	/** Disable hint styling which changes the color of the dropdown svg on hover */
	hasNoHint?: boolean;
	/** @deprecated Use `hasNoHint` instead. */
	noHint?: boolean;
	/** Triggered when an item is selected */
	onAction?: (item: Record<string, unknown>, selection: unknown) => void;
	/** Dropdown options. See Dropdown. */
	options?: unknown[];
	/** A Dropdown component. Props from this will be merged and override defaults. */
	dropdown?: ReactNode;
	/** Fixed layout mode (set by the table) */
	hasFixedLayout?: boolean;
	/** @deprecated Use `hasFixedLayout` instead. */
	fixedLayout?: boolean;
}

/**
 * RowActions provide a mechanism for defining a menu to display alongside
 * each row in the SimpleDataTable.
 */
const SimpleDataTableRowActions: React.FC<SimpleDataTableRowActionsProps> = (
	props
) => {
	const {
		assistiveText = { icon: 'Actions' },
		hasNoHint: hasNoHintProp,
		noHint,
		options = [],
		className,
		id,
		item,
		onAction,
		dropdown,
		hasFixedLayout: hasFixedLayoutProp,
		fixedLayout,
	} = props;
	const hasNoHint = hasNoHintProp ?? noHint ?? false;
	const hasFixedLayout = hasFixedLayoutProp ?? fixedLayout;

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(checkProps as any)(SIMPLE_DATA_TABLE_ROW_ACTIONS, props);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const tableContext = useContext(TableContext);
	const cellContext = useContext(CellContext);
	const { tabIndex, hasFocus, handleFocus, handleKeyDown } = useContextHelper(
		tableContext,
		cellContext,
		hasFixedLayout
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
		isHint: !hasNoHint,
		id,
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let dropdownProps: Record<string, any> = dropdown
		? // eslint-disable-next-line @typescript-eslint/no-explicit-any
			(dropdown as any).props
		: {};
	const hasDeprecatedHintOverride =
		dropdownProps.isHint === undefined && dropdownProps.hint !== undefined;
	dropdownProps = {
		...defaultDropdownProps,
		...dropdownProps,
		onSelect: handleSelect,
	};
	// A `dropdown` override that still sets the deprecated `hint` keeps winning
	// over the default, as it did before `isHint` existed.
	if (hasDeprecatedHintOverride) {
		delete dropdownProps.isHint;
	}

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
			role={hasFixedLayout ? 'gridcell' : undefined}
			tabIndex={tabIndex}
		>
			<InteractiveDropdown {...dropdownProps} />
		</td>
	);
};

SimpleDataTableRowActions.displayName = SIMPLE_DATA_TABLE_ROW_ACTIONS;

export default SimpleDataTableRowActions;
