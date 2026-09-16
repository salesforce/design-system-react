/* eslint-disable max-lines */
/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Data Table Component

// Implements the [Data Table design pattern](https://www.lightningdesignsystem.com/components/data-tables) in React.

import React, { type ReactElement, type ReactNode } from 'react';

import classNames from 'classnames';
import assign from 'lodash.assign';
import { dequal as isEqual } from 'dequal';
import memoize from 'memoize-one';
import reject from 'lodash.reject';
// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import ColumnResizer from 'column-resizer';
import checkProps from './check-props';
import componentDoc from './component.json';

import {
	canUseDOM,
	canUseEventListeners,
} from '../../utilities/execution-environment';
import { colorGray5 } from '../../utilities/design-tokens/dist/palette-colors.common';
import salesforceSkin from '../../utilities/design-tokens/dist/salesforce-skin.common';

const { tableBorderRadius } = salesforceSkin;

// ## Children
import DataTableCell from './cell';
import DataTableColumn from './column';
import DataTableHead from './private/head';
import DataTableRow from './private/row';
import DataTableRowActions from './row-actions';
import TableContext from './private/table-context';
import Mode, { type ModeType } from './private/mode';
import Spinner from '../spinner';

import KEYS from '../../utilities/key-code';
import generateId from '../../utilities/generate-id';
import mapKeyEventCallbacks from '../../utilities/key-callbacks';

import {
	DATA_TABLE,
	DATA_TABLE_CELL,
	DATA_TABLE_HEAD,
	DATA_TABLE_ROW,
} from '../../utilities/constants';

import type {
	DataTableProps,
	DataTableItem,
	DataTableColumnConfig,
	DataTableColumnProps,
	DataTableCellProps,
	DataTableAssistiveText,
} from './types';

// The main DataTable component's state.
interface DataTableState {
	// Currently selected cell
	activeCell: { rowIndex: number; columnIndex: number };
	// Interactive element within a cell that receives focus when in actionable mode
	activeElement: string | null;
	// The table can be in navigation or actionable mode
	mode: ModeType;
	// The table currently has focus
	tableHasFocus: boolean;
	// Allows for keyboard navigation
	allowKeyboardNavigation?: boolean;
}

// Safely get the length of an array, returning 0 for invalid input.
const count = (array: unknown): number =>
	Array.isArray(array) ? array.length : 0;

const defaultProps = {
	assistiveText: {
		actionsHeader: 'Actions',
		columnSort: 'Sort by: ',
		columnSortedAscending: 'Sorted Ascending',
		columnSortedDescending: 'Sorted Descending',
		selectAllRows: 'Select all rows',
		selectRow: 'Select row',
		selectRowGroup: 'Choose a row to select',
		loadingMore: 'Loading more',
	},
	selection: [] as DataTableItem[],
	disabledSelection: [] as DataTableItem[],
	hasMore: false,
	loadMoreOffset: 20,
	resizable: false,
	resizableOptions: {
		resizeMode: 'fit',
		draggingClass: 'slds-table-column-resizer',
	},
};

const getAssistiveText = memoize(
	(
		assistiveText: DataTableAssistiveText | undefined,
		actionsHeaderText: string | undefined,
		columnSortText: string | undefined,
		columnSortedAscendingText: string | undefined,
		columnSortedDescendingText: string | undefined,
		selectAllRowsText: string | undefined,
		selectRowText: string | undefined
	): DataTableAssistiveText => {
		const result: DataTableAssistiveText = {
			...defaultProps.assistiveText,
			...assistiveText,
		};
		if (actionsHeaderText) {
			result.actionsHeader = actionsHeaderText;
		}
		if (selectAllRowsText) {
			result.selectAllRows = selectAllRowsText;
		}
		if (columnSortedAscendingText) {
			result.columnSortedAscending = columnSortedAscendingText;
		}
		if (columnSortedDescendingText) {
			result.columnSortedDescending = columnSortedDescendingText;
		}
		if (columnSortText) {
			result.columnSort = columnSortText;
		}
		if (selectRowText) {
			result.selectRow = selectRowText;
		}
		return result;
	},
	isEqual
);

const getColumnsAndRowActions = memoize(
	(
		children: ReactNode,
		id: string | undefined,
		fixedHeader: boolean | undefined,
		fixedLayout: boolean | undefined,
		items: DataTableItem[],
		search: string | undefined
	): { columns: DataTableColumnConfig[]; RowActions: ReactElement | null } => {
		const columns: DataTableColumnConfig[] = [];
		let RowActions: ReactElement | null = null;

		React.Children.forEach(children, (child) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const element = child as ReactElement<any> | null;
			const elementType = element?.type as { displayName?: string } | undefined;
			if (element && elementType?.displayName === DataTableColumn.displayName) {
				const { children: columnChildren, ...columnProps } = element.props;
				const props: Record<string, unknown> = {
					fixedLayout,
					search,
					items,
					...columnProps,
				};
				if (id) {
					props.id = id;
				}

				let Cell;
				const cellChild = columnChildren as ReactElement | undefined;
				const cellChildType = cellChild?.type as
					| { displayName?: string }
					| undefined;
				if (cellChild && cellChildType?.displayName === DATA_TABLE_CELL) {
					Cell = cellChild.type;
					assign(props, cellChild.props);
				} else {
					Cell = DataTableCell;
				}

				columns.push({
					Cell: Cell as React.ComponentType<DataTableCellProps>,
					props: props as DataTableColumnProps,
				});
			} else if (
				element &&
				elementType?.displayName === DataTableRowActions.displayName
			) {
				const { dropdown } = element.props;
				const dropdownPropOverrides: { menuPosition?: string } = {};
				if (fixedHeader) {
					dropdownPropOverrides.menuPosition = 'overflowBoundaryElement';
				}
				RowActions = React.cloneElement(element, {
					dropdown: dropdown
						? React.cloneElement(dropdown, dropdownPropOverrides)
						: null,
				});
			}
		});
		return { columns, RowActions };
	},
	isEqual
);

/**
 * DataTables support the display of structured data in rows and columns with an HTML table. To sort, filter or paginate the table, simply update the data passed in the items to the table and it will re-render itself appropriately. The table will throw a sort event as needed, and helper components for paging and filtering are coming soon.
 *
 * NOTE: for horizontal scrolling with `fixedHeader`-enabled DataTables, see the `style` property description
 */
class DataTable extends React.Component<DataTableProps, DataTableState> {
	// ### Display Name
	// Always use the canonical component name as the React display name.
	static displayName = DATA_TABLE;

	static defaultProps = defaultProps;

	generatedId: string;

	headerRefs: {
		action: (HTMLElement | null)[];
		column: (HTMLElement | null)[];
		select: (HTMLElement | null)[];
	};

	gripRefs: HTMLElement[];

	scrollerRef: HTMLElement | null;

	fixedHeaderContainer: HTMLElement | null;

	// Map of cells to interactive elements within that cell
	interactiveElements: Record<number, Record<number, string[]>>;

	tableRef?: HTMLTableElement | null;

	resizer?: { reset: (options: { disable: boolean }) => void };

	constructor(props: DataTableProps) {
		super(props);
		this.generatedId = generateId();
		this.headerRefs = {
			action: [],
			column: [],
			select: [],
		};
		this.gripRefs = [];
		this.scrollerRef = null;
		this.fixedHeaderContainer = null;
		this.state = {
			// Currently selected cell
			activeCell: {
				rowIndex: 1,
				columnIndex: this.props.selectRows ? 1 : 0,
			},
			// Interactive element within a cell that receives focus when in actionable mode
			activeElement: null,
			// The table can be in navigation or actionable mode
			mode: Mode.NAVIGATION,
			// The table currently has focus
			tableHasFocus: false,
			// Allows for keyboard navigation. This is useful for temporarily disabling keyboard navigation
			// when another component requires its own focus behavior (e.g. menu dropdown).
			allowKeyboardNavigation: props.keyboardNavigation,
		};
		// Map of cells to interactive elements within that cell
		this.interactiveElements = {};
		this.changeActiveCell = this.changeActiveCell.bind(this);
		this.changeActiveElement = this.changeActiveElement.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.registerInteractiveElement = this.registerInteractiveElement.bind(
			this
		);

		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		(checkProps as (name: string, props: unknown, doc?: unknown) => void)(
			DATA_TABLE,
			props,
			componentDoc
		);
	}

	componentDidMount() {
		if (this.getFixedHeader()) {
			this.toggleFixedHeaderListeners(true);
			this.resizeFixedHeaders();
		}
		if (this.isResizable()) {
			this.enableResize();
		}
	}

	componentDidUpdate(_prevProps: DataTableProps, prevState: DataTableState) {
		if (this.getFixedHeader()) {
			this.resizeFixedHeaders();
			// If the first page of results isn't enough to allow the user to scroll it causes
			// the user to get into a state where they cannot load the second page.
			// Simulating a scroll here will ensure that enough rows are loaded to enable scrolling
			this.loadMoreIfNeeded();
		}

		if (
			this.state.allowKeyboardNavigation &&
			!prevState.allowKeyboardNavigation
		) {
			// When re-enabling keyboard navigation (e.g. when a dropdown closes), mark that
			// focus has returned to the table. This must wait until after `allowKeyboardNavigation`
			// is set in `onClose` because the callback could focus the incorrect element (e.g. dropdown
			// trigger) when it executes.
			// eslint-disable-next-line react/no-did-update-set-state
			this.setState({ tableHasFocus: true });
		}
		if (this.isResizable()) {
			this.enableResize();
		} else if (this.resizer) {
			this.disableResize();
		}
	}

	componentWillUnmount() {
		this.toggleFixedHeaderListeners(false);

		if (this.isResizable()) {
			this.disableResize();
		}
	}

	onResize() {
		const table = this.tableRef;
		if (table) {
			const columns = this.getFixedHeader()
				? table.getElementsByClassName('slds-cell-fixed')
				: table.getElementsByTagName('th');
			const columnsWidths = Array.from(columns).map((col, index) => {
				const { id, style } = col as HTMLElement;
				return {
					id,
					index,
					width: parseInt(style.width, 10),
				};
			});
			return columnsWidths;
		}
		return [];
	}

	getId() {
		return this.props.id || this.generatedId;
	}

	getFixedHeader() {
		return this.props.fixedHeader || this.props.resizable;
	}

	getKeyboardNavigation() {
		return this.props.keyboardNavigation || this.props.resizable;
	}

	getFixedLayout() {
		return this.props.fixedLayout || this.props.resizable;
	}

	getFirstInteractiveElement(
		rowIndex: number,
		columnIndex: number
	): string | null {
		if (
			this.state.mode === Mode.ACTIONABLE &&
			this.interactiveElements[rowIndex] &&
			this.interactiveElements[rowIndex][columnIndex]
		) {
			return this.interactiveElements[rowIndex][columnIndex][0];
		}
		return null;
	}

	getTableContext = memoize(
		(state: DataTableState, isKeyboardNavigation: boolean | undefined) => ({
			activeCell: state.activeCell,
			activeElement: state.activeElement,
			mode: state.mode,
			tableHasFocus: state.tableHasFocus,
			changeActiveCell: this.changeActiveCell,
			changeActiveElement: this.changeActiveElement,
			handleKeyDown: this.handleKeyDown,
			registerInteractiveElement: this.registerInteractiveElement,
			allowKeyboardNavigation: state.allowKeyboardNavigation ?? false,
			setAllowKeyboardNavigation: (allowKeyboardNavigation: boolean) => {
				if (isKeyboardNavigation) {
					this.setState({ allowKeyboardNavigation });
				}
			},
		})
	);

	handleToggleAll = (
		e: React.SyntheticEvent,
		{ checked }: { checked: boolean }
	) => {
		const selection = this.props.selection ?? [];
		const disabledSelection = this.props.disabledSelection ?? [];
		const selectedDisabledItems = selection.filter((item) =>
			disabledSelection.includes(item)
		);
		const enabledItems = this.props.items.filter(
			(item) => !disabledSelection.includes(item)
		);

		const newSelection = (checked
			? [...enabledItems, ...selectedDisabledItems]
			: [...selectedDisabledItems]
		).filter((item) => item.type !== 'header-row');

		// REMOVE AT NEXT BREAKING CHANGE
		// `onChange` is deprecated and replaced with `onRowChange`
		if (typeof this.props.onChange === 'function') {
			this.props.onChange(newSelection, e);
		}

		if (typeof this.props.onRowChange === 'function') {
			this.props.onRowChange(e, { selection: newSelection });
		}
	};

	handleRowToggle = (
		item: DataTableItem,
		selected: boolean,
		e: React.SyntheticEvent
	) => {
		// REMOVE AT NEXT BREAKING CHANGE
		// `onChange` is deprecated and replaced with `onRowChange`
		if (typeof this.props.onChange === 'function') {
			let selection;

			if (selected) {
				selection =
					this.props.selectRows === 'radio'
						? [item]
						: [...(this.props.selection ?? []), item];
			} else {
				selection = reject(this.props.selection ?? [], item);
			}

			this.props.onChange(selection, e);
		}
		// DEPRECATED CODE ENDS HERE

		if (typeof this.props.onRowChange === 'function') {
			let selection;

			if (selected) {
				selection =
					this.props.selectRows === 'radio'
						? [item]
						: [...(this.props.selection ?? []), item];
			} else {
				selection = reject(this.props.selection ?? [], item);
			}

			this.props.onRowChange(e, { selection });
		}
	};

	repositionResizers = () => {
		const headers = [
			...this.headerRefs.select,
			...this.headerRefs.column,
			...this.headerRefs.action,
		];

		if (this.gripRefs && this.tableRef) {
			const tableOffset = this.tableRef.getBoundingClientRect();
			this.gripRefs.forEach((grip, index) => {
				const headerEl = headers[index];
				if (!headerEl) return;
				const header = headerEl.getBoundingClientRect();
				const relativeOffset = header.left - tableOffset.left;
				const newPosition = relativeOffset + header.width;
				// eslint-disable-next-line no-param-reassign
				grip.style.left = `${newPosition}px`;
			});
		}
	};

	resizeFixedHeaders = (event?: Event) => {
		const headerRefs = [
			...this.headerRefs.select,
			...this.headerRefs.column,
			...this.headerRefs.action,
		];

		if (this.props.onFixedHeaderResize) {
			this.props.onFixedHeaderResize(event ?? null, {
				headerRefs: headerRefs.filter(Boolean) as HTMLElement[],
				scrollerRef: this.scrollerRef,
			});
		} else if (headerRefs.length > 0) {
			let documentScrollLeft = 0;

			if (canUseDOM) {
				documentScrollLeft = document.documentElement.scrollLeft;
			}

			headerRefs.forEach((column) => {
				if (column && canUseDOM) {
					const columnLeft =
						column.getBoundingClientRect().left + documentScrollLeft;
					let wrapperLeft = 0;

					if (this.scrollerRef) {
						wrapperLeft =
							this.scrollerRef.getBoundingClientRect().left +
							documentScrollLeft;
					}

					const cellFixed = column.querySelector(
						'.slds-cell-fixed'
					) as HTMLElement | null;

					if (cellFixed) {
						cellFixed.style.left = `${columnLeft - wrapperLeft}px`;
						cellFixed.style.width = `${column.offsetWidth}px`;
					}
				}
			});
		}
	};

	loadMoreIfNeeded = () => {
		if (this.props.hasMore && this.props.onLoadMore && this.scrollerRef) {
			const { scrollTop, offsetHeight, scrollHeight } = this.scrollerRef;
			if (
				scrollTop + offsetHeight >
				scrollHeight - (this.props.loadMoreOffset ?? 0)
			) {
				this.props.onLoadMore();
			}
		}
	};

	toggleFixedHeaderListeners = (attach: boolean) => {
		if (this.props.onToggleFixedHeaderListeners) {
			this.props.onToggleFixedHeaderListeners(
				{},
				{
					attach,
					resizeHandler: this.resizeFixedHeaders,
					scrollerRef: this.scrollerRef,
				}
			);
		} else {
			const method = attach ? 'addEventListener' : 'removeEventListener';
			if (canUseEventListeners) {
				window[method]('resize', this.resizeFixedHeaders as EventListener);
				window[method]('resize', this.loadMoreIfNeeded as EventListener);
			}
			if (canUseEventListeners && this.scrollerRef) {
				this.scrollerRef[method](
					'scroll',
					this.resizeFixedHeaders as EventListener
				);
				this.scrollerRef[method](
					'scroll',
					this.loadMoreIfNeeded as EventListener
				);
				this.scrollerRef[method](
					'scroll',
					this.repositionResizers as EventListener
				);
			}
		}
	};

	// eslint-disable-next-line camelcase
	UNSAFE_componentWillUpdate(nextProps: DataTableProps) {
		if (this.props.items !== nextProps.items) {
			this.interactiveElements = {};
		}
	}

	isResizable() {
		return this.props.fixedLayout && this.props.resizable;
	}

	resizeGrips() {
		const table = this.fixedHeaderContainer;

		if (table) {
			const grips = Array.from(
				table.getElementsByClassName('grip-handle')
			) as HTMLElement[];

			if (grips.length) {
				this.gripRefs = grips;
				this.gripRefs.forEach((grip) => {
					// eslint-disable-next-line no-param-reassign
					grip.style.height = `${parseInt(grip.style.height, 10) + 33}px`;
				});
			}
		}
	}

	enableResize() {
		if (canUseDOM) {
			const remoteTable = this.tableRef;
			const fixedHeader = this.getFixedHeader();
			const disabledColumns: number[] = [];

			if (this.props.selectRows) {
				disabledColumns.push(0);
			}

			if (!this.resizer) {
				const options: Record<string, unknown> = {
					...defaultProps.resizableOptions,
					...{ disabledColumns },
					...this.props.resizableOptions,
				};

				const externalFunction = this.props.resizableOptions?.onResize;
				options.onResize = (e: Event) => {
					if (fixedHeader) {
						this.resizeFixedHeaders(e);
						this.repositionResizers();
					}

					const response = this.onResize();

					if (externalFunction) externalFunction(response);
					this.resizeGrips();
				};

				if (remoteTable) {
					this.resizer = new ColumnResizer(remoteTable, options);
					remoteTable.classList.remove('grip-padding');

					if (fixedHeader) this.resizeFixedHeaders();

					this.resizeGrips();
					this.repositionResizers();
				}
				this.setState({}, () => this.state);
			}
		}
	}

	disableResize() {
		if (this.resizer) this.resizer.reset({ disable: true });
		this.gripRefs = [];
	}

	changeActiveCell(rowIndex: number, columnIndex: number) {
		this.setState({
			tableHasFocus: true,
			activeCell: { rowIndex, columnIndex },
		});
	}

	changeActiveElement(activeElement: string | null) {
		this.setState({ activeElement, mode: Mode.ACTIONABLE });
	}

	handleKeyDown(event: React.KeyboardEvent) {
		mapKeyEventCallbacks(event, {
			callbacks: {
				[KEYS.UP]: { callback: () => this.handleKeyDownUp() },
				[KEYS.DOWN]: { callback: () => this.handleKeyDownDown() },
				[KEYS.LEFT]: { callback: () => this.handleKeyDownLeft() },
				[KEYS.RIGHT]: { callback: () => this.handleKeyDownRight() },
				[KEYS.ENTER]: { callback: () => this.handleKeyDownEnter() },
				[KEYS.ESCAPE]: { callback: () => this.handleKeyDownEscape() },
				[KEYS.TAB]:
					this.state.mode === Mode.ACTIONABLE
						? {
								callback: (evt: React.KeyboardEvent) =>
									this.handleKeyTabPress(evt),
						  }
						: null,
			},
		});
	}

	handleKeyDownUp() {
		if (
			this.state.mode === Mode.NAVIGATION ||
			this.state.activeCell.rowIndex > 0 ||
			!this.isResizable()
		) {
			const newRowIndex = Math.max(this.state.activeCell.rowIndex - 1, 0);
			const activeElement = this.getFirstInteractiveElement(
				newRowIndex,
				this.state.activeCell.columnIndex
			);
			if (newRowIndex !== this.state.activeCell.rowIndex) {
				this.setState((prevState) => ({
					activeCell: {
						rowIndex: newRowIndex,
						columnIndex: prevState.activeCell.columnIndex,
					},
					activeElement,
				}));

				if (
					this.state.mode === Mode.ACTIONABLE &&
					newRowIndex === 0 &&
					!activeElement
				) {
					this.makeGripVisible(this.state.activeCell.columnIndex);
				}
			}
		}
	}

	handleKeyDownDown() {
		if (
			this.state.mode === Mode.NAVIGATION ||
			this.state.activeCell.rowIndex > 0 ||
			!this.isResizable()
		) {
			const newRowIndex = Math.min(
				this.state.activeCell.rowIndex + 1,
				this.props.items.length
			);
			const activeElement = this.getFirstInteractiveElement(
				newRowIndex,
				this.state.activeCell.columnIndex
			);
			if (newRowIndex !== this.state.activeCell.rowIndex) {
				this.setState((prevState) => ({
					activeCell: {
						rowIndex: newRowIndex,
						columnIndex: prevState.activeCell.columnIndex,
					},
					activeElement,
				}));
			}
		}
	}

	displaceByArrowKey(factor: number) {
		if (this.state.mode === Mode.ACTIONABLE) {
			const { rowIndex, columnIndex } = this.state.activeCell;

			if (rowIndex === 0 && this.tableRef) {
				const table = this.tableRef;
				const headers = table.getElementsByTagName('th');
				headers[columnIndex].style.width = `${
					parseInt(headers[columnIndex].style.width, 10) + factor
				}px`;
				this.resizeFixedHeaders();
				this.repositionResizers();
				this.resizeGrips();
			}
		}
	}

	makeGripVisible(newIndex: number | null) {
		this.gripRefs.forEach((grip, index) => {
			if (index === newIndex) grip.classList.add('grip-handle-active');
			else grip.classList.remove('grip-handle-active');
		});
	}

	handleKeyDownLeft() {
		if (
			this.state.mode === Mode.NAVIGATION ||
			this.state.activeCell.rowIndex > 0 ||
			!this.isResizable()
		) {
			const newColumnIndex = Math.max(this.state.activeCell.columnIndex - 1, 0);
			const activeElement = this.getFirstInteractiveElement(
				this.state.activeCell.rowIndex,
				newColumnIndex
			);
			if (newColumnIndex !== this.state.activeCell.columnIndex) {
				this.setState((prevState) => ({
					activeCell: {
						rowIndex: prevState.activeCell.rowIndex,
						columnIndex: newColumnIndex,
					},
					activeElement,
				}));
			}
		} else {
			this.displaceByArrowKey(-10);
		}
	}

	handleKeyDownRight() {
		if (
			this.state.mode === Mode.NAVIGATION ||
			this.state.activeCell.rowIndex > 0 ||
			!this.isResizable()
		) {
			const newColumnIndex = Math.min(
				this.state.activeCell.columnIndex + 1,
				React.Children.count(this.props.children) -
					(this.props.selectRows ? 0 : 1)
			);
			const activeElement = this.getFirstInteractiveElement(
				this.state.activeCell.rowIndex,
				newColumnIndex
			);
			if (newColumnIndex !== this.state.activeCell.columnIndex) {
				this.setState((prevState) => ({
					activeCell: {
						rowIndex: prevState.activeCell.rowIndex,
						columnIndex: newColumnIndex,
					},
					activeElement,
				}));
			}
		} else {
			this.displaceByArrowKey(10);
		}
	}

	handleKeyDownEnter() {
		if (this.state.mode === Mode.NAVIGATION) {
			const { rowIndex, columnIndex } = this.state.activeCell;
			let activeElement: string | null = null;
			if (
				this.interactiveElements[rowIndex] &&
				this.interactiveElements[rowIndex][columnIndex]
			) {
				[activeElement] = this.interactiveElements[rowIndex][columnIndex];
			}
			this.setState({
				mode: Mode.ACTIONABLE,
				activeElement,
			});

			if (rowIndex === 0 && !activeElement) {
				this.makeGripVisible(columnIndex);
			}
		}
	}

	handleKeyDownEscape() {
		if (this.state.mode === Mode.ACTIONABLE) {
			this.setState({
				mode: Mode.NAVIGATION,
				activeElement: null,
			});
			this.makeGripVisible(null);
		}
	}

	moveNext(event: React.KeyboardEvent, rowIndex: number, columnIndex: number) {
		const headers = [
			...this.headerRefs.select,
			...this.headerRefs.column,
			...this.headerRefs.action,
		];
		let newRowIndex = 0;
		let newColumnIndex = 0;

		if (event.shiftKey) {
			if (columnIndex - 1 >= 0) {
				newColumnIndex = columnIndex - 1;
				newRowIndex = rowIndex;
			} else {
				if (rowIndex > 0) newRowIndex = rowIndex - 1;
				else newRowIndex = this.props.items.length;

				newColumnIndex = headers.length - 1;
			}
		} else if (columnIndex + 1 < headers.length) {
			newColumnIndex = columnIndex + 1;
			newRowIndex = rowIndex;
		} else {
			if (rowIndex < this.props.items.length) newRowIndex = rowIndex + 1;
			else newRowIndex = 0;

			newColumnIndex = 0;
		}

		this.changeActiveCell(newRowIndex, newColumnIndex);
	}

	handleNextActionable(event: React.KeyboardEvent): string | null {
		const { rowIndex, columnIndex } = this.state.activeCell;
		const currentActiveElement = this.state.activeElement;
		const rowActiveElements =
			this.interactiveElements[rowIndex] &&
			this.interactiveElements[rowIndex][columnIndex]
				? this.interactiveElements[rowIndex][columnIndex]
				: null;

		if (rowActiveElements) {
			if (currentActiveElement) {
				const index = rowActiveElements.indexOf(currentActiveElement);

				if (event.shiftKey) {
					return index > 0 ? rowActiveElements[index - 1] : null;
				}
				return index < rowActiveElements.length - 1
					? rowActiveElements[index + 1]
					: null;
			}
			return !event.shiftKey
				? rowActiveElements[0]
				: rowActiveElements[rowActiveElements.length - 1];
		}
		return null;
	}

	handleKeyTabPress(event: React.KeyboardEvent) {
		const { rowIndex, columnIndex } = this.state.activeCell;

		if (this.state.mode === Mode.ACTIONABLE) {
			const nextActionable = this.handleNextActionable(event);

			if (nextActionable) {
				this.setState({ activeElement: nextActionable });
				if (this.isResizable()) this.makeGripVisible(null);
			} else if (rowIndex === 0) {
				const headers = [
					...this.headerRefs.select,
					...this.headerRefs.column,
					...this.headerRefs.action,
				];
				let newIndex = 0;

				if (!event.shiftKey)
					newIndex = columnIndex + 1 < headers.length ? columnIndex + 1 : 0;
				else
					newIndex =
						columnIndex - 1 >= 0 ? columnIndex - 1 : headers.length - 1;
				this.setState({
					mode: Mode.ACTIONABLE,
					activeElement: null,
				});

				// eslint-disable-next-line no-param-reassign
				headers.forEach((header, index) => {
					if (!header) return;
					if (index === newIndex) {
						// eslint-disable-next-line no-param-reassign
						header.tabIndex = 0;
						header.focus();
						// eslint-disable-next-line no-param-reassign
					} else header.tabIndex = -1;
				});

				if (this.isResizable()) this.makeGripVisible(newIndex);
			} else {
				this.moveNext(event, rowIndex, columnIndex);
				this.setState({
					mode: Mode.ACTIONABLE,
					activeElement: null,
				});
			}
		}
	}

	registerInteractiveElement(
		rowIndex: number,
		columnIndex: number,
		elementId: string
	) {
		if (!this.interactiveElements[rowIndex]) {
			this.interactiveElements[rowIndex] = {};
		}
		const existingElements =
			this.interactiveElements[rowIndex][columnIndex] || [];

		if (!existingElements.includes(elementId)) {
			this.interactiveElements[rowIndex][columnIndex] = [
				...existingElements,
				elementId,
			];
		}
	}

	// ### Render
	render() {
		const ariaProps: { 'aria-multiselectable'?: 'true' } = {};
		const numHeaderRows = 1;
		const selection = this.props.selection ?? [];
		const disabledSelection = this.props.disabledSelection ?? [];
		const numRows = count(this.props.items);
		const numSelected = count(
			selection.filter((item) => !disabledSelection.includes(item))
		);
		const numNonHeaderRows = count(
			this.props.items.filter(
				(item) =>
					item.type !== 'header-row' && !disabledSelection.includes(item)
			)
		);
		const canSelectRows =
			this.props.selectRows && numNonHeaderRows > 0
				? this.props.selectRows
				: false;
		const allSelected = canSelectRows && numNonHeaderRows === numSelected;
		const indeterminateSelected =
			canSelectRows && numNonHeaderRows !== numSelected && numSelected !== 0;

		const { columns, RowActions } = getColumnsAndRowActions(
			this.props.children,
			this.props.id,
			this.getFixedHeader(),
			this.props.fixedLayout,
			this.props.items,
			this.props.search
		);

		const assistiveText = getAssistiveText(
			this.props.assistiveText,
			this.props.assistiveTextForActionsHeader,
			this.props.assistiveTextForSelectAllRows,
			this.props.assistiveTextForColumnSortedAscending,
			this.props.assistiveTextForColumnSortedDescending,
			this.props.assistiveTextForColumnSort,
			this.props.assistiveTextForSelectRow
		);

		if (this.props.selectRows && this.props.selectRows !== 'radio') {
			ariaProps['aria-multiselectable'] = 'true';
		}

		// This guarantees there are never any old header references if props change
		this.headerRefs = {
			action: RowActions ? this.headerRefs.action : [],
			column: this.headerRefs.column.slice(0, columns.length),
			select: canSelectRows ? this.headerRefs.select : [],
		};

		let component = (
			<React.Fragment>
				<TableContext.Provider
					value={this.getTableContext(this.state, this.getKeyboardNavigation())}
				>
					<table
						{...ariaProps}
						className={classNames(
							'slds-table',
							{
								'slds-table_fixed-layout': this.getFixedLayout(),
								'slds-table_header-fixed': this.getFixedHeader(),
								'slds-table_resizable-cols': this.getFixedLayout(),
								'slds-table_bordered': !this.props.unborderedRow,
								'slds-table_cell-buffer':
									!this.getFixedLayout() && !this.props.unbufferedCell,
								'slds-max-medium-table_stacked': this.props.stacked,
								'slds-max-medium-table_stacked-horizontal': this.props
									.stackedHorizontal,
								'slds-table_striped': this.props.striped,
								'slds-table_col-bordered': this.props.columnBordered,
								'slds-no-row-hover': this.props.noRowHover,
								'slds-table_header-hidden': this.props.isHeadless,
							},
							this.props.className
						)}
						id={this.getId()}
						ref={(node) => {
							if (node) {
								this.tableRef = node;
							}
						}}
						role={this.getFixedLayout() ? 'grid' : undefined}
						onBlur={(event) => {
							if (
								this.tableRef &&
								!this.tableRef.contains(event.relatedTarget as Node)
							) {
								this.setState({
									tableHasFocus: false,
									mode: Mode.NAVIGATION,
									activeElement: null,
								});
								this.makeGripVisible(null);
							}
						}}
						style={this.props.style}
					>
						<DataTableHead
							assistiveText={assistiveText}
							allSelected={allSelected}
							fixedHeader={this.getFixedHeader()}
							fixedLayout={this.getFixedLayout()}
							headerRefs={(ref, index) => {
								if (index === 'action' || index === 'select') {
									if (ref) {
										this.headerRefs[index][0] = ref;
									} else {
										this.headerRefs[index] = [];
									}
								} else {
									this.headerRefs.column[index] = ref;
								}
							}}
							isHidden={this.props.isHeadless}
							indeterminateSelected={indeterminateSelected}
							canSelectRows={canSelectRows}
							columns={columns}
							id={`${this.getId()}-${DATA_TABLE_HEAD}`}
							onToggleAll={this.handleToggleAll}
							onSort={this.props.onSort}
							showRowActions={!!RowActions}
						/>
						<tbody>
							{numRows > 0
								? this.props.items.map((item, index) => {
										const rowId =
											this.getId() && item.id
												? `${this.getId()}-${DATA_TABLE_ROW}-${item.id}`
												: generateId();
										return this.props.onRenderSubHeadingRow &&
											item.type === 'header-row' ? (
											this.props.onRenderSubHeadingRow({
												assistiveText,
												classNameRow: item.classNameRow,
												columns,
												key: rowId,
												id: rowId,
												tableId: this.getId(),
												item,
											})
										) : (
											<DataTableRow
												assistiveText={assistiveText}
												canSelectRows={canSelectRows}
												className={item.classNameRow}
												columns={columns}
												fixedLayout={this.getFixedLayout()}
												id={rowId}
												index={index}
												item={item}
												key={rowId}
												onToggle={this.handleRowToggle}
												selection={this.props.selection}
												disabledSelection={this.props.disabledSelection}
												rowActions={RowActions}
												tableId={this.getId()}
												rowIndex={index + numHeaderRows}
											/>
										);
								  })
								: // Someday this should be an element to render when the table is empty
								  null}
						</tbody>
					</table>
				</TableContext.Provider>
				{this.getFixedHeader() && this.props.hasMore && (
					<div className="slds-is-relative slds-p-around_large">
						<Spinner
							assistiveText={{ label: this.props.assistiveText?.loadingMore }}
							hasContainer={false}
							size="small"
							variant="brand"
						/>
					</div>
				)}
			</React.Fragment>
		);

		if (this.getFixedHeader()) {
			const border = `1px solid ${colorGray5}`;
			const styles: React.CSSProperties = {
				borderTop: border,
				height: '100%',
			};

			if (this.props.joined) {
				styles.borderBottom = border;
				styles.borderLeft = border;
				styles.borderRight = border;
				styles.borderTop = 'none';
				styles.borderRadius = tableBorderRadius;
			}

			const fixedScrollerStyle: React.CSSProperties = {
				height: '100%',
			};

			if (this.props.resizable) {
				fixedScrollerStyle.overflowY = 'auto';
				fixedScrollerStyle.overflowX = 'hidden';
			} else {
				fixedScrollerStyle.overflow = 'auto';
			}

			component = (
				<div
					className="slds-table_header-fixed_container"
					ref={(ref) => {
						this.fixedHeaderContainer = ref;
					}}
					style={styles}
					onScroll={(e) => {
						const containerScrollLeft = (e.target as HTMLElement).scrollLeft;

						if (containerScrollLeft > 0) {
							(e.target as HTMLElement).scrollLeft = 0;
							if (this.scrollerRef) {
								this.scrollerRef.scrollLeft = containerScrollLeft;
							}
						}
					}}
				>
					<div
						className="slds-table_header-fixed_scroller"
						ref={(ref) => {
							this.scrollerRef = ref;
						}}
						style={fixedScrollerStyle}
					>
						{component}
					</div>
				</div>
			);
		}

		return component;
	}
}

export default DataTable;
