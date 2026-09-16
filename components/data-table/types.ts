/**
 * Type definitions for DataTable component and subcomponents
 */

import { ReactNode, CSSProperties, SyntheticEvent } from 'react';

// ============================================================================
// Core Types
// ============================================================================

export interface DataTableItem {
	id: string;
	classNameRow?: string;
	type?: 'header-row' | string;
	headerId?: string;
	[key: string]: unknown;
}

export interface DataTableSelection extends DataTableItem {}

export interface DataTableColumnConfig {
	Cell: React.ComponentType<DataTableCellProps>;
	props: DataTableColumnProps;
}

// ============================================================================
// Assistive Text
// ============================================================================

export interface DataTableAssistiveText {
	actionsHeader?: string;
	columnSort?: string;
	columnSortedAscending?: string;
	columnSortedDescending?: string;
	selectAllRows?: string;
	selectRow?: string;
	selectRowGroup?: string;
	loadingMore?: string;
	[key: string]: unknown;
}

// ============================================================================
// Event Data Types
// ============================================================================

export interface DataTableSortData {
	property: string;
	sortDirection: 'asc' | 'desc';
}

export interface DataTableRowChangeData {
	selection: DataTableItem[];
}

export interface DataTableToggleAllData {
	checked: boolean;
}

// ============================================================================
// DataTable Main Props
// ============================================================================

export interface DataTableProps {
	/** Assistive text for accessibility */
	assistiveText?: DataTableAssistiveText;
	/** Column and row action children */
	children?: ReactNode;
	/** Class names to be added to the table */
	className?: string | string[] | Record<string, boolean>;
	/** A variant which adds border to the vertical columns */
	columnBordered?: boolean;
	/** Enable fixed headers and scrolling */
	fixedHeader?: boolean;
	/** Use for advanced table (selectable, sortable, resizable rows) */
	fixedLayout?: boolean;
	/** When fixedHeader is true, shows spinner if more data loading */
	hasMore?: boolean;
	/** Render prop for subheadings */
	onRenderSubHeadingRow?: (props: {
		assistiveText: DataTableAssistiveText;
		classNameRow?: string;
		columns: DataTableColumnConfig[];
		key: string;
		id: string;
		tableId: string;
		item: DataTableItem;
	}) => ReactNode;
	/** Unique ID for keyboard navigation and ARIA support */
	id?: string;
	/** The collection of items to render */
	items: DataTableItem[];
	/** Removes the header from the data table */
	isHeadless?: boolean;
	/** Makes DataTable joinable with PageHeader */
	joined?: boolean;
	/** Determines when to trigger infinite loading */
	loadMoreOffset?: number;
	/** Enables keyboard navigation for advanced table */
	keyboardNavigation?: boolean;
	/** A variant which removes hover style on rows */
	noRowHover?: boolean;
	/** Callback for fixed header resize */
	onFixedHeaderResize?: (
		event: Event | null,
		data: { headerRefs: HTMLElement[]; scrollerRef: HTMLElement | null }
	) => void;
	/** Callback when infinite loading loads more data */
	onLoadMore?: () => void;
	/** Callback when selection of rows changes */
	onRowChange?: (event: SyntheticEvent, data: DataTableRowChangeData) => void;
	/** @deprecated Use onRowChange instead */
	onChange?: (selection: DataTableItem[], event: SyntheticEvent) => void;
	/** Callback when the table should be sorted */
	onSort?: (data: DataTableSortData, event: SyntheticEvent) => void;
	/** Callback for fixed header listener toggle */
	onToggleFixedHeaderListeners?: (
		event: Record<string, unknown>,
		data: {
			attach: boolean;
			resizeHandler: (event?: Event) => void;
			scrollerRef: HTMLElement | null;
		}
	) => void;
	/** An array of selected rows */
	selection?: DataTableItem[];
	/** An array of rows where selection is disabled */
	disabledSelection?: DataTableItem[];
	/** Row selection UX pattern */
	selectRows?: boolean | 'checkbox' | 'radio';
	/** Stacked variant for smaller viewports */
	stacked?: boolean;
	/** Stacked horizontal variant for smaller viewports */
	stackedHorizontal?: boolean;
	/** Striped alternating rows variant */
	striped?: boolean;
	/** Custom styles for the table */
	style?: CSSProperties;
	/** Removes horizontal borders */
	unborderedRow?: boolean;
	/** Removes horizontal padding */
	unbufferedCell?: boolean;
	/** Enables column resizing */
	resizable?: boolean;
	/** Options for resizable columns */
	resizableOptions?: DataTableResizableOptions;
	/** Search term for highlighting */
	search?: string;
	/** @deprecated Use assistiveText.actionsHeader */
	assistiveTextForActionsHeader?: string;
	/** @deprecated Use assistiveText.selectAllRows */
	assistiveTextForSelectAllRows?: string;
	/** @deprecated Use assistiveText.columnSortedAscending */
	assistiveTextForColumnSortedAscending?: string;
	/** @deprecated Use assistiveText.columnSortedDescending */
	assistiveTextForColumnSortedDescending?: string;
	/** @deprecated Use assistiveText.columnSort */
	assistiveTextForColumnSort?: string;
	/** @deprecated Use assistiveText.selectRow */
	assistiveTextForSelectRow?: string;
}

export interface DataTableResizableOptions {
	resizeMode?: 'fit' | 'flex' | 'overflow';
	draggingClass?: string;
	onResize?: (columnsWidths: DataTableColumnWidth[]) => void;
	disabledColumns?: number[];
}

export interface DataTableColumnWidth {
	id: string;
	index: number;
	width: number;
}

// ============================================================================
// DataTableColumn Props
// ============================================================================

export interface DataTableColumnProps {
	/** Custom cell renderer */
	children?: ReactNode;
	/** Sort descending first on click */
	isDefaultSortDescending?: boolean;
	/** Selects this column as currently sorted */
	isSorted?: boolean;
	/** The column label */
	label?: string | ReactNode;
	/** The primary column for a row */
	primaryColumn?: boolean;
	/** The property which corresponds to this column */
	property?: string;
	/** Whether the column is sortable */
	sortable?: boolean;
	/** Current sort direction */
	sortDirection?: 'desc' | 'asc';
	/** Title for truncation div */
	title?: string;
	/** Adds truncate to cell node */
	truncate?: boolean;
	/** Width of column (use rems) */
	width?: string;
	/** Items for search/filter */
	items?: DataTableItem[];
	/** Search term */
	search?: string;
	/** Fixed layout mode */
	fixedLayout?: boolean;
	/** Table ID */
	id?: string;
	/** Additional props passed through to the cell */
	[key: string]: unknown;
}

// ============================================================================
// DataTableCell Props
// ============================================================================

export interface DataTableCellProps {
	/** The contents of the cell */
	children?: ReactNode;
	/** Class names to be added to the cell */
	className?: string | string[] | Record<string, boolean>;
	/** Fixed layout mode */
	fixedLayout?: boolean;
	/** The item from items which represents this row */
	item?: DataTableItem;
	/** The primary column for a row */
	primaryColumn?: boolean;
	/** The property of this item to display */
	property?: string;
	/** Shows on hover for truncated cells */
	title?: string;
	/** Width of column */
	width?: string;
	/** Data label for stacked layout */
	label?: string;
	/** Header ID for accessibility */
	headerId?: string;
	/** All columns */
	columns?: DataTableColumnConfig[];
	/** Row header mode */
	rowHeader?: boolean;
	/** Cell ID */
	id?: string;
}

// ============================================================================
// DataTableRowActions Props
// ============================================================================

export interface DataTableRowActionsProps {
	/** Description of the menu for screenreaders */
	assistiveText?: { icon?: string };
	/** Class names to be added to the actions menu */
	className?: string;
	/** HTML ID for the actions menu */
	id?: string;
	/** DataTable row item */
	item?: DataTableItem;
	/** Disable hint styling */
	noHint?: boolean;
	/** Triggered when an item is selected */
	onAction?: (item: DataTableItem, selection: unknown) => void;
	/** Dropdown options */
	options?: unknown[];
	/** A Dropdown component to use */
	dropdown?: ReactNode;
	/** Fixed layout mode */
	fixedLayout?: boolean;
}

// ============================================================================
// DataTableHead Props (Private)
// ============================================================================

export interface DataTableHeadProps {
	assistiveText?: DataTableAssistiveText;
	allSelected?: boolean;
	headerRefs?: (ref: HTMLElement | null, index: number | 'action' | 'select') => void;
	isHidden?: boolean;
	indeterminateSelected?: boolean;
	canSelectRows?: boolean | 'checkbox' | 'radio';
	columns?: DataTableColumnConfig[];
	fixedHeader?: boolean;
	fixedLayout?: boolean;
	id?: string;
	onToggleAll?: (event: SyntheticEvent, data: DataTableToggleAllData) => void;
	onSort?: (data: DataTableSortData, event: SyntheticEvent) => void;
	showRowActions?: boolean;
}

// ============================================================================
// DataTableRow Props (Private)
// ============================================================================

export interface DataTableRowProps {
	assistiveText?: DataTableAssistiveText;
	canSelectRows?: boolean | 'checkbox' | 'radio';
	className?: string;
	columns?: DataTableColumnConfig[];
	fixedLayout?: boolean;
	id: string;
	index?: number;
	item: DataTableItem;
	onToggle?: (item: DataTableItem, selected: boolean, event: SyntheticEvent) => void;
	rowActions?: ReactNode;
	selection?: DataTableItem[];
	disabledSelection?: DataTableItem[];
	tableId?: string;
	rowIndex?: number;
	stacked?: boolean;
}

// ============================================================================
// DataTableHeaderCell Props (Private)
// ============================================================================

export interface DataTableHeaderCellProps {
	assistiveText?: DataTableAssistiveText;
	cellRef?: (ref: HTMLElement | null) => void;
	fixedHeader?: boolean;
	fixedLayout?: boolean;
	id: string;
	isDefaultSortDescending?: boolean;
	isSorted?: boolean;
	label?: string | ReactNode;
	onSort?: (data: DataTableSortData, event: SyntheticEvent) => void;
	property?: string;
	sortable?: boolean;
	sortDirection?: 'desc' | 'asc';
	width?: string;
	/** @deprecated */
	assistiveTextForColumnSort?: string;
	/** @deprecated */
	assistiveTextForColumnSortedAscending?: string;
	/** @deprecated */
	assistiveTextForColumnSortedDescending?: string;
}

// ============================================================================
// Context Types
// ============================================================================

export type DataTableMode = 'NAVIGATION' | 'ACTIONABLE';

export interface DataTableActiveCell {
	rowIndex: number;
	columnIndex: number;
}

export interface DataTableTableContext {
	activeCell: DataTableActiveCell;
	activeElement: string | null;
	mode: DataTableMode;
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

export interface DataTableCellContext {
	rowIndex: number;
	columnIndex: number;
}

// ============================================================================
// HighlightCell Props
// ============================================================================

export interface DataTableHighlightCellProps extends DataTableCellProps {
	/** Search term to highlight */
	search?: string;
}

// ============================================================================
// InteractiveElement HOC Props
// ============================================================================

export interface DataTableInteractiveElementProps {
	onFocus?: (event: React.FocusEvent) => void;
	onRequestFocus?: () => void;
	requestFocus?: boolean;
	tabIndex?: number;
}
