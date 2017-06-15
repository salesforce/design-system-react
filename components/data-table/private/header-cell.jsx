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
import Icon from '../../icon';

// ## Constants
import { DATA_TABLE_HEADER_CELL } from '../../../utilities/constants';

/**
 * Used internally, renders each individual column heading.
 */
const DataTableHeaderCell = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: DATA_TABLE_HEADER_CELL,

	// ### Prop Types
	propTypes: {
		/**
		 * Text for sort action on table column header
	 *
		 */
		assistiveTextForColumnSort: PropTypes.string,
		/**
		 * Text announced once a column is sorted in ascending order
		 */
		assistiveTextForColumnSortedAscending: PropTypes.string,
		/**
		 * Text announced once a column is sorted in descending order
		 */
		assistiveTextForColumnSortedDescending: PropTypes.string,
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
		width: PropTypes.string
	},

	getInitialState () {
		return {
			sortDirection: 'asc'
		};
	},

	// ### Render
	// Should return a `<th></th>`.
	render () {
		const {
			isSorted,
			label,
			sortable,
			width
		} = this.props;

		const labelType = typeof label;
		const sortDirection = this.props.sortDirection || this.state.sortDirection;
		const expandedSortDirection = sortDirection === 'desc' ? 'descending' : 'ascending';
		const ariaSort = isSorted ? expandedSortDirection : null;

		return (
			<th
				aria-sort={ariaSort}
				className={classNames({
					'slds-is-sortable': sortable,
					'slds-is-sorted': isSorted,
					[`slds-is-sorted--${sortDirection}`]: sortDirection,
					'slds-is-sorted--asc': isSorted && !sortDirection // default for hover, up arrow is ascending which means A is at the top of the table, and Z is at the bottom. You have to think about row numbers abstracting, and not the visual order on the table.
				})}
				focusable={sortable ? true : null}
				scope="col"
				style={width ? { width } : null}
			>
				{sortable
						?	<a
							href="javascript:void(0)" // eslint-disable-line no-script-url
							className="slds-th__action slds-text-link--reset"
							onClick={this.handleSort}
							tabIndex="0"
						>
							<span className="slds-assistive-text">{this.props.assistiveTextForColumnSort} </span>
							<span className="slds-truncate" title={labelType === 'string' ? label : undefined}>{label}</span>
							<Icon
								className="slds-is-sortable__icon"
								category="utility"
								name={sortDirection === 'desc' || !sortDirection ? 'arrowdown' : 'arrowup'}
								size="x-small"
							/>
							{sortDirection
								? <span className="slds-assistive-text" aria-live="assertive" aria-atomic="true">{sortDirection === 'asc'
									? this.props.assistiveTextForColumnSortedAscending
									: this.props.assistiveTextForColumnSortedDescending}</span>
								: null}
						</a>
						: <div className="slds-truncate">{label}</div>
					}
			</th>
		);
	},

	handleSort (e) {
		const oldSortDirection = this.props.sortDirection || this.state.sortDirection;
		const sortDirection = oldSortDirection === 'asc' ? 'desc' : 'asc';
		const data = {
			property: this.props.property,
			sortDirection
		};

		this.setState({
			sortDirection
		});

		if (isFunction(this.props.onSort)) {
			this.props.onSort(data, e);
		}
	}
});

export default DataTableHeaderCell;
