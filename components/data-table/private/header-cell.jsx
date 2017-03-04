/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// ### React
import React from 'react';

// ### classNames
import classNames from 'classnames';

// ### isFunction
import isFunction from 'lodash.isfunction';

// ## Children
import Icon from '../../icon';

// ## Constants
import { DATA_TABLE_HEADER_CELL } from '../../../utilities/constants';

// Removes the need for `PropTypes`.
const { PropTypes } = React;

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
		label: PropTypes.string,
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
		sortDirection: PropTypes.oneOf(['desc', 'asc'])
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
			sortable
		} = this.props;

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
			>
				{sortable
						?	<a
							href="javascript:void(0)" // eslint-disable-line no-script-url
							className="slds-th__action slds-text-link--reset"
							onClick={this.handleSort}
							tabIndex="0"
						>
							<span className="slds-assistive-text">{this.props.assistiveTextForColumnSort} </span>
							<span className="slds-truncate" title={label}>{label}</span>
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
