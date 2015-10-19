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
		sortable: React.PropTypes.bool,
		collection: React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		]).isRequired,
		columns: React.PropTypes.array.isRequired,
		selection: React.PropTypes.string,
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
		return this.props.collection.map((item, index) => {
			const isSelected = (item.id === this.props.selection) ? true : false;
			return (
				<DataTableItem
					key={index}
					item={item}
					onSelected={this._handleTableItemSelected}
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
	},

	_onSelected () {}, // TODO: feature.selection

	_handleTableItemSelected (selection) { // TODO: feature.selectio
		void(selection);
		// this.setSelection(selection);
	}

};

let DataTable = Lib.merge({}, DataTableCore, DataTableObject);

DataTable = Lib.runHelpers('react', CONTROL, DataTable);
DataTable = React.createClass(DataTable);

export default DataTable;
