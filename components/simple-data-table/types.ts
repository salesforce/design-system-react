/**
 * Type definitions for SimpleDataTable component and subcomponents
 */

import { ReactElement, ReactNode, CSSProperties, SyntheticEvent } from 'react';
import type { MenuDropdownOption, MenuDropdownProps } from '../menu-dropdown';
import type { ChildrenOf } from '../../types/common';

// ============================================================================
// Core Types
// ============================================================================

export interface SimpleDataTableItem {
	/** Unique, stable identifier. Selection and disabled selection are matched by `id`, so fresh item objects (e.g. from a store) still match. */
	id: string;
	classNameRow?: string;
	/** `'header-row'` renders the item with `renderSubHeadingRow` instead of as a data row. */
	type?: 'header-row';
	headerId?: string;
	[key: string]: unknown;
}

export interface SimpleDataTableSelection extends SimpleDataTableItem {}

export interface SimpleDataTableColumnConfig {
	Cell: React.ComponentType<SimpleDataTableCellProps>;
	props: SimpleDataTableColumnProps;
}

// ============================================================================
// Assistive Text
// ============================================================================

export interface SimpleDataTableAssistiveText {
	actionsHeader?: string;
	columnSort?: string;
	columnSortedAscending?: string;
	columnSortedDescending?: string;
	selectAllRows?: string;
	selectRow?: string;
	selectRowGroup?: string;
	loadingMore?: string;
}

// ============================================================================
// Event Data Types
// ============================================================================

export interface SimpleDataTableSortData {
	property: string;
	sortDirection: 'asc' | 'desc';
}

export interface SimpleDataTableLoadMoreData {
	/** What found the scroller near its end: a scroll, a resize, or a re-render */
	trigger: 'scroll' | 'resize' | 'update';
}

export interface SimpleDataTableRowActionData {
	/** The row's item */
	item: SimpleDataTableItem;
	/** The selected menu option */
	option: MenuDropdownOption;
}

export interface SimpleDataTableRowChangeData {
	/** The requested next selection. The table does not apply it; update `selection` to accept it. */
	selection: SimpleDataTableItem[];
}

export interface SimpleDataTableToggleAllData {
	checked: boolean;
}

// ============================================================================
// SimpleDataTable Main Props
// ============================================================================

/**
 * Data passed to `renderSubHeadingRow`
 */
export interface SimpleDataTableRenderSubHeadingRowData {
	assistiveText: SimpleDataTableAssistiveText;
	/** The item's `classNameRow` */
	classNameRow?: string;
	columns: SimpleDataTableColumnConfig[];
	/** The row's HTML id */
	id: string;
	/** The `header-row` item */
	item: SimpleDataTableItem;
	/** The table's HTML id */
	tableId: string;
}

export type SimpleDataTableRowChangeHandler = (
	event: SyntheticEvent,
	data: SimpleDataTableRowChangeData
) => void;

/**
 * Selection props when rows are selectable. Selection is data: `selection` is
 * required and the table renders exactly what it says. Clicking a row or the
 * select-all checkbox calls `onRowChange` with the requested next selection;
 * nothing changes until the parent passes a new `selection`.
 */
export interface SimpleDataTableSelectableProps {
	/** Row selection UX pattern */
	selectRows: true | 'checkbox' | 'radio';
	/** The selected rows. Matched to `items` by `id`. Required when `selectRows` is set; pass `[]` for no selection. */
	selection: SimpleDataTableItem[];
	/**
	 * Called when the user selects or deselects a row, or toggles all rows. `data.selection` is the requested next selection; the table keeps rendering the `selection` prop until the parent updates it. Required when `selectRows` is set.
	 */
	onRowChange: SimpleDataTableRowChangeHandler;
}

/**
 * Selection props when rows are not selectable.
 */
export interface SimpleDataTableNonSelectableProps {
	/** Row selection UX pattern */
	selectRows?: false;
	/** The selected rows. Matched to `items` by `id`. Only rendered when `selectRows` is set. */
	selection?: SimpleDataTableItem[];
	/** Called when the selection changes. Only fires when `selectRows` is set. */
	onRowChange?: SimpleDataTableRowChangeHandler;
}

export interface SimpleDataTableBaseProps {
	/** Assistive text for accessibility */
	assistiveText?: SimpleDataTableAssistiveText;
	/** `SimpleDataTableColumn` elements, and optionally one `SimpleDataTableRowActions`. Other children are ignored. */
	children?: ChildrenOf<
		SimpleDataTableColumnProps | SimpleDataTableRowActionsProps
	>;
	/** Class names to be added to the table */
	className?: string | string[] | Record<string, boolean>;
	/** A variant which adds border to the vertical columns */
	columnBordered?: boolean;
	/** Enable fixed headers and scrolling */
	fixedHeader?: boolean;
	/** Use for advanced table (selectable, sortable rows) */
	fixedLayout?: boolean;
	/** When fixedHeader is true, shows spinner if more data loading */
	hasMore?: boolean;
	/** @deprecated Use `renderSubHeadingRow` instead. Also receives `key`, which `renderSubHeadingRow` doesn't need. */
	onRenderSubHeadingRow?: (
		data: SimpleDataTableRenderSubHeadingRowData & { key: string }
	) => ReactNode;
	/**
	 * Renders the row for each item with `type: 'header-row'`, in place of a data row. Use it for subheadings that describe the next section of the table. Receives `{ assistiveText, classNameRow, columns, id, item, tableId }` and returns a `<tr>`; the table sets the row's `key`.
	 */
	renderSubHeadingRow?: (
		data: SimpleDataTableRenderSubHeadingRowData
	) => ReactNode;
	/** Unique ID for keyboard navigation and ARIA support */
	id?: string;
	/** The collection of items to render */
	items: SimpleDataTableItem[];
	/** Removes the header from the data table */
	isHeadless?: boolean;
	/** Makes SimpleDataTable joinable with PageHeader */
	joined?: boolean;
	/** Determines when to trigger infinite loading */
	loadMoreOffset?: number;
	/** Enables keyboard navigation for advanced table */
	keyboardNavigation?: boolean;
	/** A variant which removes hover style on rows */
	noRowHover?: boolean;
	/**
	 * @deprecated The table repositions its fixed headers itself when the
	 * scroller or table resizes. Still called until GA.
	 */
	onFixedHeaderResize?: (
		event: Event | undefined,
		data: { headerRefs: HTMLElement[]; scrollerRef: HTMLElement | null }
	) => void;
	/**
	 * Called when `hasMore` is set and the scroller is within `loadMoreOffset` of its end.
	 * `event` is the scroll or window resize event, or `undefined` after a re-render or a
	 * `ResizeObserver` resize; `data.trigger` says which.
	 */
	onLoadMore?: (
		event: Event | undefined,
		data: SimpleDataTableLoadMoreData
	) => void;
	/**
	 * Called when a sortable column header is clicked. `data.property` is the column and
	 * `data.sortDirection` the requested direction; update the columns' `isSorted` and
	 * `sortDirection` to apply it.
	 */
	onSort?: (event: SyntheticEvent, data: SimpleDataTableSortData) => void;
	/**
	 * @deprecated The table watches its own size with a `ResizeObserver`, so
	 * there is no `window` listener to replace. Still called until GA.
	 */
	onToggleFixedHeaderListeners?: (
		event: Record<string, unknown>,
		data: {
			attach: boolean;
			resizeHandler: (event?: Event) => void;
			scrollerRef: HTMLElement | null;
		}
	) => void;
	/** Rows whose selection can't be changed. Matched to `items` by `id`. */
	disabledSelection?: SimpleDataTableItem[];
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
	/** Search term for highlighting */
	search?: string;
}

export type SimpleDataTableProps = SimpleDataTableBaseProps &
	(SimpleDataTableSelectableProps | SimpleDataTableNonSelectableProps);

// ============================================================================
// SimpleDataTableColumn Props
// ============================================================================

export interface SimpleDataTableColumnProps {
	/** An element that renders this column's cells in place of `SimpleDataTableCell` */
	children?: ReactElement;
	/** Sort descending first on click */
	isDefaultSortDescending?: boolean;
	/** Selects this column as currently sorted. Controlled: update it in the table's `onSort`. */
	isSorted?: boolean;
	/** The column label */
	label?: string | ReactNode;
	/** The primary column for a row */
	primaryColumn?: boolean;
	/** The property which corresponds to this column */
	property?: string;
	/** Whether the column is sortable */
	sortable?: boolean;
	/** Current sort direction. Controlled: the column renders this value only, and `onSort` reports the requested next direction (the opposite of this one, or the default when unset). */
	sortDirection?: 'desc' | 'asc';
	/** Title for truncation div */
	title?: string;
	/** Adds truncate to cell node */
	truncate?: boolean;
	/** Width of column (use rems) */
	width?: string;
	/** Items for search/filter */
	items?: SimpleDataTableItem[];
	/** Search term */
	search?: string;
	/** Fixed layout mode */
	fixedLayout?: boolean;
	/** Table ID */
	id?: string;
}

// ============================================================================
// SimpleDataTableCell Props
// ============================================================================

export interface SimpleDataTableCellProps {
	/** The contents of the cell */
	children?: ReactNode;
	/** Class names to be added to the cell */
	className?: string | string[] | Record<string, boolean>;
	/** Fixed layout mode */
	fixedLayout?: boolean;
	/** The item from items which represents this row */
	item?: SimpleDataTableItem;
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
	columns?: SimpleDataTableColumnConfig[];
	/** Row header mode */
	rowHeader?: boolean;
	/** Cell ID */
	id?: string;
}

// ============================================================================
// SimpleDataTableRowActions Props
// ============================================================================

export interface SimpleDataTableRowActionsProps {
	/** Description of the menu for screenreaders */
	assistiveText?: { icon?: string };
	/** Class names to be added to the actions menu */
	className?: string;
	/** Disable hint styling */
	noHint?: boolean;
	/** Called when a menu option is selected, with the row's `item` and the `option` */
	onAction?: (
		event: SyntheticEvent,
		data: SimpleDataTableRowActionData
	) => void;
	/** Dropdown options */
	options?: MenuDropdownProps['options'];
	/** A `MenuDropdown` element. Its props override the defaults; its `onSelect` runs after `onAction`. */
	dropdown?: ReactElement<Partial<MenuDropdownProps>>;
}

// ============================================================================
// SimpleDataTableHead Props (Private)
// ============================================================================

export interface SimpleDataTableHeadProps {
	assistiveText?: SimpleDataTableAssistiveText;
	allSelected?: boolean;
	headerRefs?: (
		ref: HTMLElement | null,
		index: number | 'action' | 'select'
	) => void;
	isHidden?: boolean;
	indeterminateSelected?: boolean;
	canSelectRows?: boolean | 'checkbox' | 'radio';
	columns?: SimpleDataTableColumnConfig[];
	fixedHeader?: boolean;
	fixedLayout?: boolean;
	id?: string;
	onToggleAll?: (
		event: SyntheticEvent,
		data: SimpleDataTableToggleAllData
	) => void;
	onSort?: (event: SyntheticEvent, data: SimpleDataTableSortData) => void;
	showRowActions?: boolean;
}

// ============================================================================
// SimpleDataTableRow Props (Private)
// ============================================================================

export interface SimpleDataTableRowProps {
	assistiveText?: SimpleDataTableAssistiveText;
	canSelectRows?: boolean | 'checkbox' | 'radio';
	className?: string;
	columns?: SimpleDataTableColumnConfig[];
	fixedLayout?: boolean;
	id: string;
	index?: number;
	item: SimpleDataTableItem;
	onToggle?: (
		item: SimpleDataTableItem,
		selected: boolean,
		event: SyntheticEvent
	) => void;
	rowActions?: ReactNode;
	/** Whether the row's item is in the table's `selection` */
	isSelected?: boolean;
	/** Whether the row's item is in the table's `disabledSelection` */
	isDisabled?: boolean;
	tableId?: string;
	rowIndex?: number;
	stacked?: boolean;
}

// ============================================================================
// SimpleDataTableHeaderCell Props (Private)
// ============================================================================

export interface SimpleDataTableHeaderCellProps {
	assistiveText?: SimpleDataTableAssistiveText;
	cellRef?: (ref: HTMLElement | null) => void;
	fixedHeader?: boolean;
	fixedLayout?: boolean;
	id: string;
	isDefaultSortDescending?: boolean;
	isSorted?: boolean;
	label?: string | ReactNode;
	onSort?: (event: SyntheticEvent, data: SimpleDataTableSortData) => void;
	property?: string;
	sortable?: boolean;
	sortDirection?: 'desc' | 'asc';
	width?: string;
}

// ============================================================================
// Context Types
// ============================================================================

export type SimpleDataTableMode = 'NAVIGATION' | 'ACTIONABLE';

export interface SimpleDataTableActiveCell {
	rowIndex: number;
	columnIndex: number;
}

export interface SimpleDataTableTableContext {
	activeCell: SimpleDataTableActiveCell;
	activeElement: string | null;
	mode: SimpleDataTableMode;
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

export interface SimpleDataTableCellContext {
	rowIndex: number;
	columnIndex: number;
}

// ============================================================================
// HighlightCell Props
// ============================================================================

export interface SimpleDataTableHighlightCellProps extends SimpleDataTableCellProps {
	/** Search term to highlight */
	search?: string;
}

// ============================================================================
// InteractiveElement HOC Props
// ============================================================================

export interface SimpleDataTableInteractiveElementProps {
	onFocus?: (event: React.FocusEvent) => void;
	/** Called after the wrapper focuses the element */
	onRequestFocus?: () => void;
	tabIndex?: number;
}
