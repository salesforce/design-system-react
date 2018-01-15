/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React
import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

// ## Children
import Checkbox from '../../forms/checkbox';
import HeaderCell from './header-cell';

// ## Constants
import { DATA_TABLE_HEAD } from '../../../utilities/constants';

/**
 * Used internally, provides header row rendering to the DataTable.
 */
const DataTableHead = createReactClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: DATA_TABLE_HEAD,

	// ### Prop Types
	propTypes: {
		/**
		 * Text for heading of actions column
		 */
		assistiveTextForActionsHeader: PropTypes.string,
		/**
		 * Text for sort action on table column header
		 */
		assistiveTextForColumnSort: PropTypes.string,
		/**
		 * Text for select all checkbox within the table header
		 */
		assistiveTextForSelectAllRows: PropTypes.string,
		allSelected: PropTypes.bool,
		indeterminateSelected: PropTypes.bool,
		canSelectRows: PropTypes.bool,
		columns: PropTypes.arrayOf(
			PropTypes.shape({
				Cell: PropTypes.func,
				props: PropTypes.object
			})
		),
		id: PropTypes.string,
		onToggleAll: PropTypes.func,
		onSort: PropTypes.func,
		showRowActions: PropTypes.bool
	},

	componentWillMount () {},

	// ### Render
	render () {
		return (
			<thead>
				<tr className="slds-text-title--caps">
					{this.props.canSelectRows ? (
						<th
							className="slds-text-align--right"
							scope="col"
							style={{ width: '3.25rem' }}
						>
							<div className="slds-th__action slds-th__action--form">
								<Checkbox
									assistiveText={this.props.assistiveTextForSelectAllRows}
									checked={this.props.allSelected}
									indeterminate={this.props.indeterminateSelected}
									id={`${this.props.id}-SelectAll`}
									name="SelectAll"
									onChange={this.props.onToggleAll}
								/>
							</div>
						</th>
					) : null}
					{this.props.columns.map((column) => (
						<HeaderCell
							assistiveTextForColumnSort={this.props.assistiveTextForColumnSort}
							id={`${this.props.id}-${column.props.property}`}
							key={`${this.props.id}-${column.props.property}`}
							onSort={this.props.onSort}
							{...column.props}
						/>
					))}
					{this.props.showRowActions ? (
						<th scope="col" style={{ width: '3.25rem' }}>
							<div className="slds-th__action">
								<span className="slds-assistive-text">
									{this.props.assistiveTextForActionsHeader}
								</span>
							</div>
						</th>
					) : null}
				</tr>
			</thead>
		);
	}
});

export default DataTableHead;
