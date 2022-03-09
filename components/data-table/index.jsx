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
import isEqual from 'lodash.isequal';
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
	resizable: false,
	resizableOptions: {
		resizeMode: 'fit',
		draggingClass: 'slds-table-column-resizer',
	},
};

const getAssistiveText = memoize(
	(
		assistiveText,
		actionsHeaderText,
		columnSortText,
		columnSortedAscendingText,
		columnSortedDescendingText,
		selectAllRowsText,
		selectRowText
	) => {
		const result = {
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
	(children, id, fixedHeader, fixedLayout, items, search) => {
		const columns = [];
		let RowActions = null;

		React.Children.forEach(children, (child) => {
			if (child && child.type.displayName === DataTableColumn.displayName) {
				const { children: columnChildren, ...columnProps } = child.props;
				const props = { fixedLayout, search, items, ...columnProps };
				if (id) {
					props.id = id;
				}

				let Cell;
				if (
					columnChildren &&
					columnChildren.type.displayName === DATA_TABLE_CELL
				) {
					Cell = columnChildren.type;
					assign(props, columnChildren.props);
				} else {
					Cell = DataTableCell;
				}

				// eslint-disable-next-line fp/no-mutating-methods
				columns.push({
					Cell,
					props,
				});
			} else if (
				child &&
				child.type.displayName === DataTableRowActions.displayName
			) {
				const { dropdown } = child.props;
				const dropdownPropOverrides = {};
				if (fixedHeader) {
					dropdownPropOverrides.menuPosition = 'overflowBoundaryElement';
				}
				RowActions = React.cloneElement(child, {
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
		 * Removes the header from the data table. Tested with snapshot testing
		 */
		isHeadless: PropTypes.bool,
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
		/**
		 * A variant which allows column dividers to be grabbed with the mouse. This feature needs
		 * `@salesforce/design-system-react/assets/styles/table.css` to be loaded. This prop is in prototype` state. a) It may change within a minor release. (b) Web Content Accessibility Guidelines may not be met. (c) CSS imports may be required.
		 */
		resizable: PropTypes.bool,
		/**
		 * Object with properties to be used in case of resizable: true
		 *
		 * resizeMode: It is used to set how the resize method works. Those are the possible values: 'fit', 'flex' and 'overflow'
		 * onResize: Callback function to be fired when the user has ended dragging a column
		 * `@salesforce/design-system-react/assets/styles/table.css` to be loaded. This prop is in prototype` state. a) It may change within a minor release. (b) Web Content Accessibility Guidelines may not be met. (c) CSS imports may be required.
		 */
		resizableOptions: PropTypes.object,
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
		this.gripRefs = [];
		this.scrollerRef = null;
		this.fixedHeaderContainer = {};
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
		if (this.getFixedHeader()) {
			this.toggleFixedHeaderListeners(true);
			this.resizeFixedHeaders();
		}
		if (this.isResizable()) {
			this.enableResize();
		}
	}

	componentDidUpdate(prevProps, prevState) {
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
			const columnsWidths = Array.from(columns).map(({ id, style }, index) => {
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

	getTableContext = memoize((state, isKeyboardNavigation) => ({
		activeCell: state.activeCell,
		activeElement: state.activeElement,
		mode: state.mode,
		tableHasFocus: state.tableHasFocus,
		changeActiveCell: this.changeActiveCell,
		changeActiveElement: this.changeActiveElement,
		handleKeyDown: this.handleKeyDown,
		registerInteractiveElement: this.registerInteractiveElement,
		allowKeyboardNavigation: state.allowKeyboardNavigation,
		setAllowKeyboardNavigation: (allowKeyboardNavigation) => {
			if (isKeyboardNavigation) {
				this.setState({ allowKeyboardNavigation });
			}
		},
	}));

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

	repositionResizers = () => {
		const headers = [].concat(
			this.headerRefs.select,
			this.headerRefs.column,
			this.headerRefs.action
		);

		if (this.gripRefs && this.tableRef) {
			const tableOffset = this.tableRef.getBoundingClientRect();
			this.gripRefs.forEach((grip, index) => {
				const header = headers[index].getBoundingClientRect();
				const relativeOffset = header.left - tableOffset.left;
				const newPosition = relativeOffset + header.width;
				// eslint-disable-next-line no-param-reassign
				grip.style.left = `${newPosition}px`;
			});
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
				this.scrollerRef[action]('scroll', this.repositionResizers);
			}
		}
	};

	// eslint-disable-next-line camelcase
	UNSAFE_componentWillUpdate(nextProps) {
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
			const grips = Array.from(table.getElementsByClassName('grip-handle'));

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
			const disabledColumns = [];

			if (this.props.selectRows) {
				// eslint-disable-next-line fp/no-mutating-methods
				disabledColumns.push(0);
			}

			if (!this.resizer) {
				const options = {
					...defaultProps.resizableOptions,
					...{ disabledColumns },
					...this.props.resizableOptions,
				};

				const externalFunction = this.props.resizableOptions.onResize;
				options.onResize = (e) => {
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
				[KEYS.TAB]:
					this.state.mode === Mode.ACTIONABLE
						? { callback: (evt) => this.handleKeyTabPress(evt) }
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

	displaceByArrowKey(factor) {
		if (this.state.mode === Mode.ACTIONABLE) {
			const { rowIndex, columnIndex } = this.state.activeCell;

			if (rowIndex === 0) {
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

	makeGripVisible(newIndex) {
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
		} else {
			this.displaceByArrowKey(10);
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

	moveNext(event, rowIndex, columnIndex) {
		const headers = [].concat(
			this.headerRefs.select,
			this.headerRefs.column,
			this.headerRefs.action
		);
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

	handleNextActionable(event) {
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

	handleKeyTabPress(event) {
		const { rowIndex, columnIndex } = this.state.activeCell;

		if (this.state.mode === Mode.ACTIONABLE) {
			const nextActionable = this.handleNextActionable(event);

			if (nextActionable) {
				this.setState({ activeElement: nextActionable });
				if (this.isResizable()) this.makeGripVisible(null);
			} else if (rowIndex === 0) {
				const headers = [].concat(
					this.headerRefs.select,
					this.headerRefs.column,
					this.headerRefs.action
				);
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
					if (index === newIndex) {
						// eslint-disable-next-line no-param-reassign
						header.tabIndex = 0;
						// eslint-disable-next-line no-param-reassign
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

	registerInteractiveElement(rowIndex, columnIndex, elementId) {
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
						role={this.getFixedLayout() ? 'grid' : null}
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
												fixedLayout={this.getFixedLayout()}
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
				{this.getFixedHeader() && this.props.hasMore && (
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

		if (this.getFixedHeader()) {
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

			const fixedScrollerStyle = {
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
