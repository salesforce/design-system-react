/* eslint-disable max-lines */
/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Data Table Component

// Implements the [Data Table design pattern](https://www.lightningdesignsystem.com/components/data-tables) in React.

import React from 'react';
import PropTypes from 'prop-types';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

import classNames from 'classnames';
import assign from 'lodash.assign';
import reject from 'lodash.reject';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';
import componentDoc from './component.json';

import {
	canUseDOM,
	canUseEventListeners,
} from '../../utilities/execution-environment';
import { colorGray5 } from '../../utilities/design-tokens/dist/palette-colors.common';
import { tableBorderRadius } from '../../utilities/design-tokens/dist/salesforce-skin.common';

// ## Children
import DataTableCell from './cell';
import DataTableColumn from './column';
import DataTableHead from './private/head';
import DataTableRow from './private/row';
import DataTableRowActions from './row-actions';
import TableContext from './private/table-context';
import Mode from './private/mode';
import Spinner from '../spinner';

import KEYS from '../../utilities/key-code';
import mapKeyEventCallbacks from '../../utilities/key-callbacks';

import {
	DATA_TABLE,
	DATA_TABLE_CELL,
	DATA_TABLE_HEAD,
	DATA_TABLE_ROW,
} from '../../utilities/constants';

// Safely get the length of an array, returning 0 for invalid input.
const count = (array) => (Array.isArray(array) ? array.length : 0);

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
	selection: [],
	hasMore: false,
	loadMoreOffset: 20,
};

/**
 * DataTables support the display of structured data in rows and columns with an HTML table. To sort, filter or paginate the table, simply update the data passed in the items to the table and it will re-render itself appropriately. The table will throw a sort event as needed, and helper components for paging and filtering are coming soon.
 *
 * NOTE: for horizontal scrolling with `fixedHeader`-enabled DataTables, see the `style` property description
 */
class DataTable extends React.Component {
	// ### Display Name
	// Always use the canonical component name as the React display name.
	static displayName = DATA_TABLE;

	// ### Prop Types
	static propTypes = {
		/**
		 * **Assistive text for accessibility.**
		 * This object is merged with the default props object on every render.
		 * * `actionsHeader`: Text for heading of actions column
		 * * `columnSort`: Text for sort action on table column header
		 * * `columnSortedAscending`: Text announced once a column is sorted in ascending order
		 * * `columnSortedDescending`: Text announced once a column is sorted in descending order
		 * * `selectAllRows`: Text for select all checkbox within the table header
		 * * `selectRow`: Text for select row. Default: "Select row 1"
		 * * `selectRowGroup`: This is an input group label and is attached to each checkbox or radio. Default is "Choose a row to select"
		 */
		assistiveText: PropTypes.shape({
			actionsHeader: PropTypes.string,
			columnSort: PropTypes.string,
			columnSortedAscending: PropTypes.string,
			columnSortedDescending: PropTypes.string,
			selectAllRows: PropTypes.string,
			selectRow: PropTypes.string,
			selectRowGroup: PropTypes.string,
			loadingMore: PropTypes.string,
		}),
		/**
		 * Provide children of the type `<DataTableColumn />` to define the structure of the data being represented and children of the type `<DataTableRowActions />` to define a menu which will be rendered for each item in the grid. Use a _higher-order component_ to customize a data table cell that will override the default cell rendering. `CustomDataTableCell` must have the same `displayName` as `DataTableCell` or it will be ignored. If you want complete control of the HTML, including the wrapping `td`, you don't have to use `DataTableCell`.
		 * ```
		 * import DataTableCell from 'design-system-react/data-table/cell';
		 * const CustomDataTableCell = ({ children, ...props }) => (
		 *   <DataTableCell {...props} >
		 *     <a href="#">{children}</a>
		 *   </DataTableCell>
		 * );
		 * CustomDataTableCell.displayName = DataTableCell.displayName;
		 *
		 * <DataTable>
		 *   <DataTableColumn />
		 *   <DataTableColumn>
		 *   <DataTableCustomCell />
		 *   </DataTableColumn>
		 *   <DataTableRowActions />
		 * </DataTable>
		 * ```
		 */
		children: PropTypes.node,
		/**
		 * Class names to be added to the table.
		 */
		className: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string,
		]),
		/**
		 * A variant which adds border to the vertical columns.
		 */
		columnBordered: PropTypes.bool,
		/**
		 * Use this to enable fixed headers and scrolling columns / rows. Appearance / behavior is consistent only if used in combination with `fixedLayout`. Since scrolling is enabled, columns are not truncated unless a width is set. Due to `overflow:hidden` elements, any dialog components will need a separate render tree (portal) such as with `menuPosition: overflowBoundaryElement` in order to break out of the container.
		 */
		fixedHeader: PropTypes.bool,
		/**
		 * Use this if you are creating an advanced table (selectable, sortable, or resizable rows). Columns widths will be truncate based on width and DOM ancestors. See `fixedHeader` to enable horizontal and vertical scrolling.
		 *
		 * When `keyboardNavigation` is enabled, the advanced table implements keyboard navigation as described in [Data Tables](https://www.lightningdesignsystem.com/components/data-tables/).
		 * Wrap interactive elements in the table with `<DataTableInteractiveElement>` so that it can control the element's focus and `tabIndex` behavior:
		 * ```
		 * const InteractiveButton = DataTableInteractiveElement(Button);
		 * const InteractiveCheckBox = DataTableInteractiveElement(Checkbox);
		 * const CustomDataTableCell = () => (
		 * 	<DataTableCell>
		 * 		<InteractiveCheckBox />
		 * 		<InteractiveButton />
		 * 	</DataTableCell>
		 * );
		 * ```
		 * The wrapped element must accept the props:
		 *  * `onFocus`: Callback for when the element is focused.
		 *  * `onRequestFocus`: Trigger to indicate that this element should be focused.
		 *  * `requestFocus`: This wrapper overrides the `requestFocus` prop and provides its own value.
		 *  * `tabIndex`: This wrapper overrides the `tabIndex` prop and provides its own value.
		 */
		fixedLayout: PropTypes.bool,
		/**
		 * When fixedHeader is true, specifies whether there's more data to be loaded and displays a spinner at the bottom of the table if so.
		 */
		hasMore: PropTypes.bool,
		/**
		 * A render prop for subheadings to describe what the next section of the table is about. This is often a heirarchical data structure and semantic heading levels should be used, but not visually differ. This is not a `role=rowheader` which provides a heading for a row. Basic sorting of columns is not recommended, since this pattern assumes top level groupings. Headings should be visually aligned with selection column when selection pattern is present, so not to be grouped with the previous row.
     * ```
     * const CustomHeaderRow = ({ columns, item } ) => (
     *	<tr>
     *    <th id={item.id} colSpan={columns.length+1} scope="colgroup">
     *      <p role="heading" aria-level={item.ariaLevel}>
     *        {item.heading}
     *      </p>
     *    </th>
     *  </tr>);
     *CustomHeaderRow.displayName = DataTableCell.displayName;
     *
     * <DataTable items=[{
        type: 'header-row',
        id: 'header-row-example-id-3',
        heading: 'Argentina > Autonomous City of Buenos Aires > Belgrano',
        ariaLevel: 3,
     * }],
     * />
     * ```
		 */
		onRenderSubHeadingRow: PropTypes.func,
		/**
		 * A unique ID is needed in order to support keyboard navigation and ARIA support.
		 */
		id: PropTypes.string,
		/**
		 * The collection of items to render in the table. This is an array of objects with each object having keys that correspond with the  `property` prop of each `DataTableColumn`.
		 *
		 * Use the key `classNameRow` to add a custom class to the item's `<tr>` element.
		 */
		items: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string.isRequired,
				classNameRow: PropTypes.string,
			})
		).isRequired,
		/**
		 * Makes DataTable joinable with PageHeader by adding appropriate classes/styling
		 */
		joined: PropTypes.bool,
		/**
		 * Determines when to trigger infinite loading based on how many pixels the table's scroll position is from the bottom of the table.
		 */
		loadMoreOffset: PropTypes.number,
		/**
		 * Enables keyboard navigation when this is an advanced table.
		 */
		keyboardNavigation: PropTypes.bool,
		/**
		 * A variant which removes hover style on rows
		 */
		noRowHover: PropTypes.bool,
		/**
		 * By default this function resizes the display headers when fixedHeader is `true`, but this behavior can be overridden. Passes an event and a data object with properties `headerRefs`, an array of DOM nodes referencing the `thead th` elements and `scrollerRef`, a DOM node referencing `.slds-table_header-fixed_scroller`
		 */
		onFixedHeaderResize: PropTypes.func,
		/**
		 * This function fires when infinite loading loads more data.
		 *
		 * This will be called multiple times while the table is being scrolled within the `loadMoreOffset`. It'll also continue to be called while `hasMore` is `true` and the table has not yet loaded enough rows to allow a user to scroll.  Please track whether or not loading is in progress and check it at the start of this function to avoid executing your callback too many times.
		 */
		onLoadMore: PropTypes.func,
		/**
		 * This function fires when the selection of rows changes. This component passes in `event, { selection }` to the function. `selection` is an array of objects from the `items` prop.
		 *
		 * This used to be `onChange` which is deprecated now, so that the parameters can be consistent with other components. `onChange` passed in the selection first and the event wtihout a data object.
		 */
		onRowChange: PropTypes.func,
		/**
		 * This function fires when the table should be sorted.
		 */
		onSort: PropTypes.func,
		/**
		 * By default this function attaches/detaches listeners for window resize and tbody scrolling when fixedHeader is `true`, but this behavior can be overridden. Passes an event and a data object with an `attach` boolean property to determine whether listeners should be attached, a `resizeHandler` function property that can be called as-needed, and a `scrollerRef` DOM node property that serves as a reference to `.slds-table_header-fixed_scroller`
		 */
		onToggleFixedHeaderListeners: PropTypes.func,
		/**
		 * An array of objects of selected rows. See `items` prop for shape of objects.
		 */
		selection: PropTypes.array,
		/**
		 * Specifies a row selection UX pattern.
		 * * `checkbox`: Multiple row selection.
		 * * `radio`: _Required_ single row selection.
		 * _This prop used to be a `boolean`, a `true` value will be considered `checkbox` for backwards compatibility._
		 */
		selectRows: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.oneOf(['checkbox', 'radio']),
		]),
		/**
		 * A variant which modifies table layout by stacking cells to accommodate smaller viewports. Should not be used at the same time as `stackedHorizontal`.
		 */
		stacked: PropTypes.bool,
		/**
		 * A variant which modifies table layout by displaying the header and row data side by side for smaller viewports. Should not be used at the same time as `stacked`.
		 */
		stackedHorizontal: PropTypes.bool,
		/**
		 * A variant which adds stripes to alternating rows.
		 */
		striped: PropTypes.bool,
		/**
		 * Custom styles to be passed to the table.
		 * NOTE: for horizontal scrolling in `fixedHeader`-enabled DataTables, apply a `minWidth` style here. If the containing element width is less than the `minWidth` value, horizontal scrolling will occur
		 */
		style: PropTypes.object,
		/**
		 * Tables have horizontal borders by default. This removes them.
		 */
		unborderedRow: PropTypes.bool,
		/**
		 * A variant which removes horizontal padding. CSS class will be removed if `fixedLayout==true`.
		 */
		unbufferedCell: PropTypes.bool,
	};

	static defaultProps = defaultProps;

	constructor(props) {
		super(props);
		this.generatedId = shortid.generate();
		this.headerRefs = {
			action: [],
			column: [],
			select: [],
		};
		this.scrollerRef = null;
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
		checkProps(DATA_TABLE, props, componentDoc);
	}

	componentDidMount() {
		if (this.props.fixedHeader) {
			this.toggleFixedHeaderListeners(true);
			this.resizeFixedHeaders();
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.fixedHeader) {
			this.resizeFixedHeaders();
			// If the first page of results isn't enough to allow the user to scroll it causes
			// the user to get into a state where they cannot load the second page.
			// Simulating a scroll here will ensure that enough rows are loaded to enable scrolling
			this.loadMoreIfNeeded();
		}
		if (this.props.items !== prevProps.items) {
			this.interactiveElements = {};
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
	}

	componentWillUnmount() {
		this.toggleFixedHeaderListeners(false);
	}

	getId() {
		return this.props.id || this.generatedId;
	}

	getFirstInteractiveElement(rowIndex, columnIndex) {
		if (
			this.state.mode === Mode.ACTIONABLE &&
			this.interactiveElements[rowIndex] &&
			this.interactiveElements[rowIndex][columnIndex]
		) {
			return this.interactiveElements[rowIndex][columnIndex][0];
		}
		return null;
	}

	handleToggleAll = (e, { checked }) => {
		// REMOVE AT NEXT BREAKING CHANGE
		// `onChange` is deprecated and replaced with `onRowChange`
		if (typeof this.props.onChange === 'function') {
			const selection = (checked ? [...this.props.items] : []).filter(
				(item) => item.type !== 'header-row'
			);
			this.props.onChange(selection, e);
		}

		if (typeof this.props.onRowChange === 'function') {
			const selection = (checked ? [...this.props.items] : []).filter(
				(item) => item.type !== 'header-row'
			);
			this.props.onRowChange(e, { selection });
		}
	};

	handleRowToggle = (item, selected, e) => {
		// REMOVE AT NEXT BREAKING CHANGE
		// `onChange` is deprecated and replaced with `onRowChange`
		if (typeof this.props.onChange === 'function') {
			let selection;

			if (selected) {
				selection =
					this.props.selectRows === 'radio'
						? [item]
						: [...this.props.selection, item];
			} else {
				selection = reject(this.props.selection, item);
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
						: [...this.props.selection, item];
			} else {
				selection = reject(this.props.selection, item);
			}

			this.props.onRowChange(e, { selection });
		}
	};

	resizeFixedHeaders = (event) => {
		const headerRefs = [].concat(
			this.headerRefs.select,
			this.headerRefs.column,
			this.headerRefs.action
		);

		if (this.props.onFixedHeaderResize) {
			this.props.onFixedHeaderResize(event, {
				headerRefs,
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

					const cellFixed = column.querySelector('.slds-cell-fixed');

					if (cellFixed) {
						cellFixed.style.left = `${columnLeft - wrapperLeft}px`;
						cellFixed.style.width = `${column.offsetWidth}px`;
					}
				}
			});
		}
	};

	loadMoreIfNeeded = () => {
		if (this.props.hasMore && this.props.onLoadMore) {
			const { scrollTop, offsetHeight, scrollHeight } = this.scrollerRef;
			if (scrollTop + offsetHeight > scrollHeight - this.props.loadMoreOffset) {
				this.props.onLoadMore();
			}
		}
	};

	toggleFixedHeaderListeners = (attach) => {
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
			const action = [`${attach ? 'add' : 'remove'}EventListener`];
			if (canUseEventListeners) {
				window[action]('resize', this.resizeFixedHeaders);
				window[action]('resize', this.loadMoreIfNeeded);
			}
			if (canUseEventListeners && this.scrollerRef) {
				this.scrollerRef[action]('scroll', this.resizeFixedHeaders);
				this.scrollerRef[action]('scroll', this.loadMoreIfNeeded);
			}
		}
	};

	changeActiveCell(rowIndex, columnIndex) {
		this.setState({
			tableHasFocus: true,
			activeCell: { rowIndex, columnIndex },
		});
	}

	changeActiveElement(activeElement) {
		this.setState({ activeElement, mode: Mode.ACTIONABLE });
	}

	handleKeyDown(event) {
		mapKeyEventCallbacks(event, {
			callbacks: {
				[KEYS.UP]: { callback: (evt) => this.handleKeyDownUp(evt) },
				[KEYS.DOWN]: { callback: (evt) => this.handleKeyDownDown(evt) },
				[KEYS.LEFT]: { callback: (evt) => this.handleKeyDownLeft(evt) },
				[KEYS.RIGHT]: { callback: (evt) => this.handleKeyDownRight(evt) },
				[KEYS.ENTER]: { callback: (evt) => this.handleKeyDownEnter(evt) },
				[KEYS.ESCAPE]: { callback: (evt) => this.handleKeyDownEscape(evt) },
			},
		});
	}

	handleKeyDownUp() {
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
		}
	}

	handleKeyDownDown() {
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

	handleKeyDownLeft() {
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
	}

	handleKeyDownRight() {
		const newColumnIndex = Math.min(
			this.state.activeCell.columnIndex + 1,
			this.props.children.length - (this.props.selectRows ? 0 : 1)
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
	}

	handleKeyDownEnter() {
		if (this.state.mode === Mode.NAVIGATION) {
			const { rowIndex, columnIndex } = this.state.activeCell;
			let activeElement = null;
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
		}
	}

	handleKeyDownEscape() {
		if (this.state.mode === Mode.ACTIONABLE) {
			this.setState({
				mode: Mode.NAVIGATION,
				activeElement: null,
			});
		}
	}

	registerInteractiveElement(rowIndex, columnIndex, elementId) {
		if (!this.interactiveElements[rowIndex]) {
			this.interactiveElements[rowIndex] = {};
		}
		const existingElements =
			this.interactiveElements[rowIndex][columnIndex] || [];
		this.interactiveElements[rowIndex][columnIndex] = [
			...existingElements,
			elementId,
		];
	}

	// ### Render
	render() {
		const ariaProps = {};
		const numHeaderRows = 1;
		const numRows = count(this.props.items);
		const numSelected = count(this.props.selection);
		const numNonHeaderRows = count(
			this.props.items.filter((item) => item.type !== 'header-row')
		);
		const canSelectRows =
			this.props.selectRows && numNonHeaderRows > 0
				? this.props.selectRows
				: false;
		const allSelected = canSelectRows && numNonHeaderRows === numSelected;
		const indeterminateSelected =
			canSelectRows && numNonHeaderRows !== numSelected && numSelected !== 0;
		const columns = [];
		let RowActions = null;

		React.Children.forEach(this.props.children, (child) => {
			if (child && child.type.displayName === DataTableColumn.displayName) {
				const { children, ...columnProps } = child.props;

				const props = assign({}, this.props);
				// eslint-disable-next-line fp/no-delete
				delete props.children;
				assign(props, columnProps);

				let Cell;
				if (children && children.type.displayName === DATA_TABLE_CELL) {
					Cell = children.type;
					assign(props, children.props);
				} else {
					Cell = DataTableCell;
				}

				// eslint-disable-next-line fp/no-mutating-methods
				columns.push({
					Cell,
					props,
					dataTableProps: this.props,
				});
			} else if (
				child &&
				child.type.displayName === DataTableRowActions.displayName
			) {
				const { dropdown } = child.props;
				const dropdownPropOverrides = {};
				if (this.props.fixedHeader) {
					dropdownPropOverrides.menuPosition = 'overflowBoundaryElement';
				}
				RowActions = React.cloneElement(child, {
					dropdown: dropdown
						? React.cloneElement(dropdown, dropdownPropOverrides)
						: null,
				});
			}
		});

		const assistiveText = {
			...defaultProps.assistiveText,
			...this.props.assistiveText,
		};
		if (this.props.assistiveTextForActionsHeader) {
			assistiveText.actionsHeader = this.props.assistiveTextForActionsHeader;
		}
		if (this.props.assistiveTextForSelectAllRows) {
			assistiveText.selectAllRows = this.props.assistiveTextForSelectAllRows;
		}
		if (this.props.assistiveTextForColumnSortedAscending) {
			assistiveText.columnSortedAscending = this.props.assistiveTextForColumnSortedAscending;
		}
		if (this.props.assistiveTextForColumnSortedDescending) {
			assistiveText.columnSortedDescending = this.props.assistiveTextForColumnSortedDescending;
		}
		if (this.props.assistiveTextForColumnSort) {
			assistiveText.columnSort = this.props.assistiveTextForColumnSort;
		}
		if (this.props.assistiveTextForSelectRow) {
			assistiveText.selectRow = this.props.assistiveTextForSelectRow;
		}

		if (this.props.selectRows && this.props.selectRows !== 'radio') {
			ariaProps['aria-multiselectable'] = 'true';
		}

		// This guarantees there are never any old header references if props change
		this.headerRefs = {
			action: RowActions ? this.headerRefs.action : [],
			column: this.headerRefs.column.slice(0, columns.length),
			select: canSelectRows ? this.headerRefs.select : [],
		};

		const tableContext = {
			activeCell: this.state.activeCell,
			activeElement: this.state.activeElement,
			mode: this.state.mode,
			tableHasFocus: this.state.tableHasFocus,
			changeActiveCell: this.changeActiveCell,
			changeActiveElement: this.changeActiveElement,
			handleKeyDown: this.handleKeyDown,
			registerInteractiveElement: this.registerInteractiveElement,
			allowKeyboardNavigation: this.state.allowKeyboardNavigation,
			setAllowKeyboardNavigation: (allowKeyboardNavigation) => {
				if (this.props.keyboardNavigation) {
					this.setState({ allowKeyboardNavigation });
				}
			},
		};

		let component = (
			<React.Fragment>
				<TableContext.Provider value={tableContext}>
					<table
						{...ariaProps}
						className={classNames(
							'slds-table',
							{
								'slds-table_fixed-layout': this.props.fixedLayout,
								'slds-table_header-fixed': this.props.fixedHeader,
								'slds-table_resizable-cols': this.props.fixedLayout,
								'slds-table_bordered': !this.props.unborderedRow,
								'slds-table_cell-buffer':
									!this.props.fixedLayout && !this.props.unbufferedCell,
								'slds-max-medium-table_stacked': this.props.stacked,
								'slds-max-medium-table_stacked-horizontal': this.props
									.stackedHorizontal,
								'slds-table_striped': this.props.striped,
								'slds-table_col-bordered': this.props.columnBordered,
								'slds-no-row-hover': this.props.noRowHover,
							},
							this.props.className
						)}
						id={this.getId()}
						ref={(node) => {
							if (node) {
								this.tableRef = node;
							}
						}}
						role={this.props.fixedLayout ? 'grid' : null}
						onBlur={(event) => {
							if (
								this.tableRef &&
								!this.tableRef.contains(event.relatedTarget)
							) {
								this.setState({
									tableHasFocus: false,
									mode: Mode.NAVIGATION,
									activeElement: null,
								});
							}
						}}
						style={this.props.style}
					>
						<DataTableHead
							assistiveText={assistiveText}
							allSelected={allSelected}
							fixedHeader={this.props.fixedHeader}
							fixedLayout={this.props.fixedLayout}
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
												: shortid.generate();
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
												fixedLayout={this.props.fixedLayout}
												id={rowId}
												index={index}
												item={item}
												key={rowId}
												onToggle={this.handleRowToggle}
												selection={this.props.selection}
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
				{this.props.fixedHeader && this.props.hasMore && (
					<div className="slds-is-relative slds-p-around_large">
						<Spinner
							assistiveText={{ label: this.props.assistiveText.loadingMore }}
							hasContainer={false}
							size="small"
							variant="brand"
						/>
					</div>
				)}
			</React.Fragment>
		);

		if (this.props.fixedHeader) {
			const border = `1px solid ${colorGray5}`;
			const styles = {
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

			component = (
				<div
					className="slds-table_header-fixed_container"
					style={styles}
					onScroll={(e) => {
						const containerScrollLeft = e.target.scrollLeft;

						if (containerScrollLeft > 0) {
							e.target.scrollLeft = 0;
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
						style={{
							height: '100%',
							overflow: 'auto',
						}}
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
