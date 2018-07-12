/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React
import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

// ### classNames
import classNames from 'classnames';

// ### isFunction
import isFunction from 'lodash.isfunction';

// ## Children
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
const DataTableHeaderCell = createReactClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: DATA_TABLE_HEADER_CELL,

	// ### Prop Types
	propTypes: {
		assistiveText: PropTypes.shape({
			actionsHeader: PropTypes.string,
			columnSort: PropTypes.string,
			columnSortedAscending: PropTypes.string,
			columnSortedDescending: PropTypes.string,
			selectAllRows: PropTypes.string,
			selectRow: PropTypes.string,
		}),
		id: PropTypes.string.isRequired,
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
	},

	getInitialState () {
		return {
			sortDirection: null,
		};
	},

	componentDidMount () {
		checkProps(DATA_TABLE_COLUMN, this.props);
	},

	componentDidUpdate (prevProps) {
		// reset sort state when another column is sorted
		if (prevProps.isSorted === true && this.props.isSorted === false) {
			this.setState({ sortDirection: null }); // eslint-disable-line react/no-did-update-set-state
		}
	},

	handleSort (e) {
		const oldSortDirection =
			this.props.sortDirection || this.state.sortDirection;
		const sortDirection = oldSortDirection === 'asc' ? 'desc' : 'asc';
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
	},

	// ### Render
	render () {
		const { isSorted, label, sortable, width } = this.props;

		const labelType = typeof label;
		const sortDirection = this.props.sortDirection || this.state.sortDirection;
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

		return (
			<th
				aria-label={labelType === 'string' ? label : undefined}
				aria-sort={ariaSort}
				className={classNames(
					{
						'slds-is-sortable': sortable,
						'slds-is-sorted': isSorted,
						[`slds-is-sorted_${sortDirection}`]: sortDirection,
						'slds-is-sorted_asc': isSorted && !sortDirection, // default for hover, up arrow is ascending which means A is at the top of the table, and Z is at the bottom. You have to think about row numbers abstracting, and not the visual order on the table.
					},
					'slds-text-title_caps'
				)}
				scope="col"
				style={{ width: width ? { width } : null }}
			>
				{this.props.fixedLayout ? (
					fixedLayoutSubRenders[sortable ? 'sortable' : 'notSortable']
				) : (
					<div
						className="slds-truncate"
						title={labelType === 'string' ? label : undefined}
					>
						{label}
					</div>
				)}
			</th>
		);
	},
});

export default DataTableHeaderCell;
