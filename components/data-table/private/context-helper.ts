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
	fixedLayout?: boolean
): ContextHelperResult {
	const isActive =
		tableContext.activeCell.rowIndex === cellContext.rowIndex &&
		tableContext.activeCell.columnIndex === cellContext.columnIndex;

	const hasFocus = Boolean(fixedLayout && tableContext.tableHasFocus && isActive);
	const { changeActiveCell, handleKeyDown: handleTableKeyDown } = tableContext;

	const handleFocus = useCallback(() => {
		if (fixedLayout && tableContext.allowKeyboardNavigation) {
			changeActiveCell(cellContext.rowIndex, cellContext.columnIndex);
		}
	}, [
		fixedLayout,
		tableContext.allowKeyboardNavigation,
		changeActiveCell,
		cellContext.rowIndex,
		cellContext.columnIndex,
	]);

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent) => {
			if (fixedLayout && tableContext.allowKeyboardNavigation) {
				handleTableKeyDown(event);
			}
		},
		[fixedLayout, tableContext.allowKeyboardNavigation, handleTableKeyDown]
	);

	const tabIndex =
		fixedLayout &&
		isActive &&
		!tableContext.activeElement &&
		tableContext.allowKeyboardNavigation
			? 0
			: undefined;

	return { tabIndex, hasFocus, handleFocus, handleKeyDown };
}
