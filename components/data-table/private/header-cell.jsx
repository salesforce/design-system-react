/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React
import React from 'react';

import PropTypes from 'prop-types';

// ### classNames
import classNames from 'classnames';

// ### isFunction
import isFunction from 'lodash.isfunction';

// ## Children
import CellFixed from './cell-fixed';
import Icon from '../../icon';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from '../column-check-props';

// ## Constants
import {
	DATA_TABLE_HEADER_CELL,
	DATA_TABLE_COLUMN,
} from '../../../utilities/constants';

/**
 * Used internally, renders each individual column heading.
 */
class DataTableHeaderCell extends React.Component {
	// ### Display Name
	// Always use the canonical component name as the React display name.
	static displayName = DATA_TABLE_HEADER_CELL;

	// ### Prop Types
	static propTypes = {
		assistiveText: PropTypes.shape({
			actionsHeader: PropTypes.string,
			columnSort: PropTypes.string,
			columnSortedAscending: PropTypes.string,
			columnSortedDescending: PropTypes.string,
			selectAllRows: PropTypes.string,
			selectRow: PropTypes.string,
		}),
		cellRef: PropTypes.func,
		fixedHeader: PropTypes.bool,
		id: PropTypes.string.isRequired,
		/**
		 * Some columns, such as "date last viewed" or "date recently updated," should sort descending first, since that is what the user probably wants. How often does one want to see their oldest files first in a table? If sortable and the `DataTable`'s parent has not defined the sort order, then ascending (A at the top to Z at the bottom) is the default sort order on first click.
		 */
		isDefaultSortDescending: PropTypes.bool,
		/**
		 * Indicates if column is sorted.
		 */
		isSorted: PropTypes.bool,
		/**
		 * The column label.
		 */
		label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
		/**
		 * The function to execute on sort.
		 */
		onSort: PropTypes.func,
		/**
		 * The property which corresponds to this column.
		 */
		property: PropTypes.string,
		/**
		 * Whether or not the column is sortable.
		 */
		sortable: PropTypes.bool,
		/**
		 * The current sort direction.
		 */
		sortDirection: PropTypes.oneOf(['desc', 'asc']),
		/**
		 * Width of column. This is required for advanced/fixed layout tables. Please provide units. (`rems` are recommended)
		 */
		width: PropTypes.string,
	};

	state = {
		sortDirection: null,
	};

	componentDidMount() {
		checkProps(DATA_TABLE_COLUMN, this.props);
	}

	componentDidUpdate(prevProps) {
		// reset sort state when another column is sorted
		if (prevProps.isSorted === true && this.props.isSorted === false) {
			this.setState({ sortDirection: null }); // eslint-disable-line react/no-did-update-set-state
		}
	}

	handleSort = (e) => {
		const oldSortDirection =
			this.props.sortDirection || this.state.sortDirection;
		// UX pattern: If sortable, and the DataTable's parent has not defined the sort order, then ascending (that is A->Z) is the default sort order on first click. Some columns, such as "last viewed" or "recently updated," should sort descending first, since that is what the user probably wants. Who wants to see the oldest files first?
		const sortDirection = (function sortDirectionFunction(
			direction,
			isDefaultSortDescending
		) {
			switch (direction) {
				case 'asc':
					return 'desc';
				case 'desc':
					return 'asc';
				case null:
					return isDefaultSortDescending ? 'desc' : 'asc';
				default:
					return 'asc';
			}
		})(oldSortDirection, this.props.isDefaultSortDescending);
		const data = {
			property: this.props.property,
			sortDirection,
		};

		this.setState({
			sortDirection,
		});

		if (isFunction(this.props.onSort)) {
			this.props.onSort(data, e);
		}
	};

	// ### Render
	render() {
		const { fixedHeader, isSorted, label, sortable, width } = this.props;

		const labelType = typeof label;
		// This decides which arrow to render--which is current sort order if the column is sorted OR the future sort order if the arrow is clicked in the future.
		const sortDirection =
			this.props.sortDirection ||
			this.state.sortDirection ||
			(this.props.isDefaultSortDescending && 'desc');
		const expandedSortDirection =
			sortDirection === 'desc' ? 'descending' : 'ascending';
		const ariaSort = isSorted ? expandedSortDirection : 'none';

		const fixedLayoutSubRenders = {
			sortable: (
				<a
					href="javascript:void(0)" // eslint-disable-line no-script-url
					className="slds-th__action slds-text-link_reset"
					onClick={this.handleSort}
					role="button"
					tabIndex="0"
				>
					<span className="slds-assistive-text">
						{this.props.assistiveTextForColumnSort ||
							this.props.assistiveText.columnSort}{' '}
					</span>
					<span
						className="slds-truncate"
						title={labelType === 'string' ? label : undefined}
					>
						{label}
					</span>
					<Icon
						className="slds-is-sortable__icon"
						category="utility"
						name={sortDirection === 'desc' ? 'arrowdown' : 'arrowup'}
						size="x-small"
					/>
					{sortDirection ? (
						<span
							className="slds-assistive-text"
							aria-live="assertive"
							aria-atomic="true"
						>
							{sortDirection === 'asc'
								? this.props.assistiveTextForColumnSortedAscending ||
									this.props.assistiveText.columnSortedAscending
								: this.props.assistiveTextForColumnSortedDescending ||
									this.props.assistiveText.columnSortedDescending}
						</span>
					) : null}
				</a>
			),
			notSortable: (
				<span className="slds-p-horizontal_x-small" style={{ display: 'flex' }}>
					<span
						className="slds-truncate"
						title={labelType === 'string' ? label : undefined}
					>
						{label}
					</span>
				</span>
			),
		};

		const headerCellContent = this.props.fixedLayout ? (
			fixedLayoutSubRenders[sortable ? 'sortable' : 'notSortable']
		) : (
			<div
				className="slds-truncate"
				title={labelType === 'string' ? label : undefined}
			>
				{label}
			</div>
		);

		return (
			<th
				aria-label={labelType === 'string' ? label : undefined}
				aria-sort={ariaSort}
				className={classNames({
					'slds-is-sortable': sortable,
					'slds-is-sorted': isSorted,
					[`slds-is-sorted_${sortDirection}`]: sortDirection,
					'slds-is-sorted_asc': isSorted && !sortDirection, // default for hover, up arrow is ascending which means A is at the top of the table, and Z is at the bottom. You have to think about row numbers abstracting, and not the visual order on the table.
				})}
				ref={(ref) => {
					if (this.props.cellRef) {
						this.props.cellRef(ref);
					}
				}}
				scope="col"
				style={
					fixedHeader || width
						? {
								height: fixedHeader ? 0 : null,
								lineHeight: fixedHeader ? 0 : null,
								width: width || null,
							}
						: null
				}
			>
				{fixedHeader
					? React.cloneElement(headerCellContent, {
							style: {
								display: 'flex',
								height: 0,
								overflow: 'hidden',
								paddingBottom: 0,
								paddingTop: 0,
								visibility: 'hidden',
							},
						})
					: headerCellContent}
				{fixedHeader ? (
					<CellFixed>
						{React.cloneElement(headerCellContent, {
							style: {
								alignItems: 'center',
								display: 'flex',
								flex: '1 1 auto',
								lineHeight: 1.25,
								width: '100%',
							},
							tabIndex: sortable ? 0 : null,
						})}
					</CellFixed>
				) : null}
			</th>
		);
	}
}

export default DataTableHeaderCell;
