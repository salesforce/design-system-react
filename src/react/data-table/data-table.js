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
		const isRowSelect = this.getProperty('selectRows');
		const columns = this.getProperty('columns');
		const self = this;

		if (isRowSelect && !(columns[0].propertyName === 'select')) {
			columns.splice(0, 0, {
				propertyName: 'select',
				displayName: '',
				sortable: false,
				hintParent: false
			});
		}

		// TODO: this should probably be a seperate view
		return columns.map((column, index) => {
			const select = isRowSelect && index === 0 ? self._getSelectCheckbox() : false;
			let sort;
			let dir;

			if (column.sortDirection) {
				dir = column.sortDirection === 'desc' ? '/examples/symbols.svg#arrowdown' : '/examples/symbols.svg#arrowup';
				sort = (
					<button className="slds-button slds-button--icon-bare">
						<svg aria-hidden="true"
							className="slds-button__icon slds-button__icon--small"
							dangerouslySetInnerHTML={{__html: '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="' + dir + '"></use>'}}>
						</svg>
						<span className="slds-assistive-text">Sort</span>
					</button>
				);
			}

			return (
				<th scope="col" key={index} className={this._getClassNames({
					sortable: column.sortable,
					hintParent: column.hintParent
				})}>
					{select}
					<span className="slds-truncate" data-prop={column.propertyName}>{column.displayName}</span>
					{sort}
				</th>
			);
		});
	},

	_handleSort (col) {
		this._sortColumn(col);
	},

	_getSelectCheckbox () {
		return (
			<label className="slds-checkbox" >
				<input type="checkbox" checked={this.allCheckActivated}></input>
				<span className="slds-checkbox--faux" onClick={this._toggleAllItems}></span>
				<span className="slds-form-element__label slds-assistive-text" >select</span>
			</label>
		);
	},

	_tableItems () {
		const isRowSelect = this.getProperty('selectRows');

		return this._collection.map((item, index) => {
			const isSelected = this._isItemSelected(item);

			return (
				<DataTableItem
					key={index}
					hintParent={true}
					bordered={true}
					headers={this.props.columns}
					item={item}
					onSelected={this._selectDataItem}
					selected={isSelected}
					selectRows={isRowSelect}
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
