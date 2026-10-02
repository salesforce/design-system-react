import React from 'react';

export interface ActiveCell {
	rowIndex: number;
	columnIndex: number;
}

export interface TableContextValue {
	activeCell: ActiveCell;
	activeElement: string | null;
	mode: 'navigation' | 'actionable' | null;
	tableHasFocus: boolean;
	changeActiveCell: (rowIndex: number, columnIndex: number) => void;
	changeActiveElement: (elementId: string | null) => void;
	handleKeyDown: (event: React.KeyboardEvent) => void;
	registerInteractiveElement: (
		rowIndex: number,
		columnIndex: number,
		elementId: string
	) => void;
	allowKeyboardNavigation: boolean;
	setAllowKeyboardNavigation: (allow: boolean) => void;
}

const defaultValue: TableContextValue = {
	activeCell: { rowIndex: 0, columnIndex: 0 },
	activeElement: null,
	mode: null,
	tableHasFocus: false,
	changeActiveCell: () => {},
	changeActiveElement: () => {},
	handleKeyDown: () => {},
	registerInteractiveElement: () => {},
	allowKeyboardNavigation: true,
	setAllowKeyboardNavigation: () => {},
};

const TableContext = React.createContext<TableContextValue>(defaultValue);

export default TableContext;
