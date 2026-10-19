/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { useCallback } from 'react';
import { TableContextValue } from './table-context';
import { CellContextValue } from './cell-context';

interface ContextHelperResult {
	tabIndex: number | undefined;
	hasFocus: boolean;
	handleFocus: () => void;
	handleKeyDown: (event: React.KeyboardEvent) => void;
}

/**
 * Calculates data table keyboard navigation state based on currently selected cell
 */
export default function useTableContextHelper(
	tableContext: TableContextValue,
	cellContext: CellContextValue,
	hasFixedLayout?: boolean
): ContextHelperResult {
	const isActive =
		tableContext.activeCell.rowIndex === cellContext.rowIndex &&
		tableContext.activeCell.columnIndex === cellContext.columnIndex;

	const hasFocus = Boolean(
		hasFixedLayout && tableContext.tableHasFocus && isActive
	);
	const { changeActiveCell, handleKeyDown: handleTableKeyDown } = tableContext;

	const handleFocus = useCallback(() => {
		if (hasFixedLayout && tableContext.allowKeyboardNavigation) {
			changeActiveCell(cellContext.rowIndex, cellContext.columnIndex);
		}
	}, [
		hasFixedLayout,
		tableContext.allowKeyboardNavigation,
		changeActiveCell,
		cellContext.rowIndex,
		cellContext.columnIndex,
	]);

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent) => {
			if (hasFixedLayout && tableContext.allowKeyboardNavigation) {
				handleTableKeyDown(event);
			}
		},
		[hasFixedLayout, tableContext.allowKeyboardNavigation, handleTableKeyDown]
	);

	const tabIndex =
		hasFixedLayout &&
		isActive &&
		!tableContext.activeElement &&
		tableContext.allowKeyboardNavigation
			? 0
			: undefined;

	return { tabIndex, hasFocus, handleFocus, handleKeyDown };
}
