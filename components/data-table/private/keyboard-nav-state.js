/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/**
 * Calculates data table keyboard navigation state based on currently selected cell
 */
export default (tableContext, cellContext, fixedLayout) => {
	const isActive =
		tableContext.activeCell.rowIndex === cellContext.rowIndex &&
		tableContext.activeCell.columnIndex === cellContext.columnIndex;

	const hasFocus = fixedLayout && tableContext.tableHasFocus && isActive;

	const handleFocus = () => {
		if (fixedLayout && tableContext.allowKeyboardNavigation) {
			tableContext.changeActiveCell(
				cellContext.rowIndex,
				cellContext.columnIndex
			);
		}
	};

	const handleKeyDown = (event) => {
		if (fixedLayout && tableContext.allowKeyboardNavigation) {
			tableContext.handleKeyDown(event);
		}
	};

	const tabIndex =
		fixedLayout &&
		isActive &&
		!tableContext.activeElement &&
		tableContext.allowKeyboardNavigation
			? '0'
			: undefined;

	return { tabIndex, hasFocus, handleFocus, handleKeyDown };
};
