// DATATABLR CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import DataTableCore, {CONTROL} from '../../core/datatable';

// Framework specific
import React from 'react';
import State from '../mixins/state';
import Events from '../mixins/events';
import genericWillMount from '../mixins/generic-will-mount';

// Children
import DataTableItem from './datatable-item';

export const DataTableObject = {
	mixins: [State, Events, genericWillMount],

	propTypes: {
		sortable: React.PropTypes.bool,
		collection: React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		]).isRequired,
		columns: React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		]).isRequired,
		selection: React.PropTypes.any,
		bordered: React.PropTypes.bool,
		striped: React.PropTypes.bool,
		stacked: React.PropTypes.bool,
		stackedHorizontal: React.PropTypes.bool
	},

	_tableHeaders () {
		return this.props.columns.map((item, index) => {
			return (
				<th scope="col" key={index} className={this._getClassNames({
					sortable: item.sortable,
					hintParent: item.hintParent
				})}>
					<span className="slds-truncate" data-prop={item.propertyName}>{item.displayName}</span>
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
					item={item}
					onSelected={this._selectItem}
					selected={isSelected}
					hintParent={true}
				/>
			);
		});
	},

	render () {
		return (
			<table className={this._getClassNames({
				bordered: this.props.bordered,
				striped: this.props.striped,
				stacked: this.props.stacked,
				stackedHorizontal: this.props.stackedHorizontal
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
