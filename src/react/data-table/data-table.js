// DATATABLR CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import DataTableCore, {CONTROL} from '../../core/data-table';

// Framework specific
import React from 'react';
import State from '../mixins/state';
import Events from '../mixins/events';
import genericWillMount from '../mixins/generic-will-mount';

// Children
import DataTableItem from './data-table-item';

export const DataTableObject = {
	mixins: [State, Events, genericWillMount],

	propTypes: {
		bordered: React.PropTypes.bool,
		collection: React.PropTypes.array.isRequired,
		columns: React.PropTypes.arrayOf(React.PropTypes.shape({
			propertyName: React.PropTypes.string,
			displayName: React.PropTypes.string,
			sortable: React.PropTypes.bool,
			hintParent: React.PropTypes.bool
		})).isRequired,
		// TODO: Needs to be more specific, once selection feature is fleshed out.
		selection: React.PropTypes.any,
		sortable: React.PropTypes.bool,
		stacked: React.PropTypes.bool,
		stackedHorizontal: React.PropTypes.bool,
		striped: React.PropTypes.bool
	},

	_tableHeaders () {
		return this.props.columns.map((column, index) => {
			return (
				<th scope="col" key={index} className={this._getClassNames({
					sortable: column.sortable,
					hintParent: column.hintParent
				})}>
					<span className="slds-truncate" data-prop={column.propertyName}>{column.displayName}</span>
				</th>
			);
		});
	},

	_tableItems () {
		return this._collection.map((item, index) => {
			const isSelected = this._isItemSelected(item);

			return (
				<DataTableItem
					key={index}
					hintParent={true}
					bordered={true}
					headers={this.props.columns}
					item={item}
					onSelected={this._selectItem}
					selected={isSelected}
				/>
			);
		});
	},

	render () {
		return (
			<table className={this._getClassNames({
				bordered: this.props.bordered,
				stacked: this.props.stacked,
				stackedHorizontal: this.props.stackedHorizontal,
				striped: this.props.striped
			})}>
				<thead>
				<tr className="slds-text-heading--label">
					{this._tableHeaders()}
				</tr>
				</thead>
				<tbody>
					{this._tableItems()}
				</tbody>
			</table>
		);
	}
};

let DataTable = Lib.merge({}, DataTableCore, DataTableObject);
DataTable = Lib.runHelpers('react', CONTROL, DataTable);
DataTable = React.createClass(DataTable);

export default DataTable;
