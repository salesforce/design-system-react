/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Data Table Component --- SLDS for React

// Implements the [Data Table design pattern](https://www.lightningdesignsystem.com/components/data-tables) in React.

// [![Data Table component example screenshot](/assets/demo-site/images/component-examples/data-table.png "Data Table component example screenshot")](/react/data-table)

// > See a [live example](/react/data-table) of the Data Table component in action

// ## API

/* @todo Add a full API description of the component here. */

// ## Dependencies

// Bring in the [shared library functions](../../lib/lib.html).
import * as Lib from 'slds-for-js-core/lib';
import isFunction from 'lodash/lang/isFunction';

// Use the [shared core](../../core/data-table.html), which contains logic that is shared across SLDS for JavaScript.
import DataTableCore, { CONTROL } from 'slds-for-js-core/components/data-table';

// ### Traits

// #### Eventable
// * [../../traits/eventable](../../traits/eventable.html)
import Eventable from 'slds-for-js-core/traits/eventable';

// #### Multiselectable
// * [../../traits/multiselectable](../../traits/multiselectable.html)
import Multiselectable from 'slds-for-js-core/traits/multiselectable';

// ### React
// React is an external dependency of the project.
import React from 'react';

// ### Mixins

// These are mixins that appear in all of SLDS for Javascript,
// bringing consistency to instantiation, events, and state.

// #### Events
// [../mixins/events](../mixins/events.html)
import Events from '../mixins/events';

// #### Generic Will Mount
// [../mixins/generic-will-mount](../mixins/generic-will-mount.html)
import genericWillMount from '../mixins/generic-will-mount';

// #### State
// [../mixins/state](../mixins/state.html)
import State from '../mixins/state';

// ### Children

// #### Data Table Item
// [./data-table-item](./data-table-item.html)
import DataTableItem from './data-table-item';

// ## Data Table Object
export const DataTableDefinition = {
	// ### Mixins

	// SLDS for React specifically is also extended via React's standard
	// mixin model. These three mixins hook into native React Wycliffe events
	// and expose functionality needed for a cross-framework core. For
	// example, some places in the core or traits a `setState` method is used.
	//
	// In React this is built in to the framework, while SLDS for jQuery
	// simply borrow the idea for its own use.
	//
	// Similarly, a `setProperties` method is available but in React it is
	// actually a `noop` because React expects a one-way data flow, while in
	// other Frameworks it typically does something very similar to
	// `setState`.
	mixins: [State, Events, genericWillMount],

	// ### Display Name
	// Always use the canonical component name (set in the core) as the React
	// display name.
	displayName: CONTROL,

	// ### Prop Types
	propTypes: {
		bordered: React.PropTypes.bool,
		collection: React.PropTypes.array.isRequired,
		columns: React.PropTypes.arrayOf(
			React.PropTypes.shape({
				propertyName: React.PropTypes.string,
				displayName: React.PropTypes.string,
				sortable: React.PropTypes.bool,
				hintParent: React.PropTypes.bool
			})
		).isRequired,
		// TODO: Needs to be more specific, once selection feature is fleshed out.
		selection: React.PropTypes.any,
		sortable: React.PropTypes.bool,
		stacked: React.PropTypes.bool,
		stackedHorizontal: React.PropTypes.bool,
		striped: React.PropTypes.bool
	},

	// ### Component Will Mount
	componentWillMount () {
		Eventable.on(this , 'select'   , this._onSelect);
		Eventable.on(this , 'deselect' , this._onDeselect);
	},

	// ### Table Headers
	_tableHeaders () {
		const isRowSelect = this.props.selectRows;
		const columns     = this.props.columns;
		const self        = this;

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
			const select = isRowSelect && index === 0 ? self._getSelectCheckbox(): false;
			let sort;
			let dir;

			if (column.sortDirection) {
				dir = column.sortDirection === 'desc' ? '/examples/symbols.svg#arrowdown': '/examples/symbols.svg#arrowup';
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
				<th
					scope="col"
					key={index}
					className={this._getClassNames({
						sortable: column.sortable,
						hintParent: column.hintParent
					})}
					onClick={column.sortable ? this._handleSort.bind(this, column): false}
				>
					{select}
					<span className="slds-truncate" data-prop={column.propertyName}>{column.displayName}</span>
					{sort}
				</th>
			);
		});
	},

	// ### Handle Sort
	_handleSort (col) {
		this._sortColumn(col);
	},

	// ### Get Select Checkbox
	_getSelectCheckbox () {
		return (
			<label className="slds-checkbox" >
				<input type="checkbox" checked={this.allCheckActivated}></input>
				<span className="slds-checkbox--faux" onClick={this._toggleAllItems}></span>
				<span className="slds-form-element__label slds-assistive-text" >select</span>
			</label>
		);
	},

	// ### Table Items
	_tableItems () {
		const isRowSelect = this.props.selectRows;
		const selection = this._getDataAdapter(this.props.selection);

		return this._collection.map((item, index) => {
			const isSelected = Multiselectable.isItemSelected(item, selection);

			return (
				<DataTableItem
					key        = {index}
					hintParent = {true}
					bordered   = {true}
					headers    = {this.props.columns}
					item       = {item}
					onSelect   = {this._toggleDataItem}
					selected   = {isSelected}
					selectRows = {isRowSelect}
				/>
			);
		});
	},

	// ### Render
	render () {
		return (
			<table
				className={this._getClassNames(
					{
						bordered: this.props.bordered,
						stacked: this.props.stacked,
						stackedHorizontal: this.props.stackedHorizontal,
						striped: this.props.striped
					}
			)}>
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

	// ### On Select
	_onSelect (itemsToSelect, selection) {
		if (isFunction(this.props.onSelect)) {
			this.props.onSelect(itemsToSelect, selection._data);
		}

		if (isFunction(this.props.onChange)) {
			this.props.onChange(selection._data);
		}
	},

	// ### On Deselect
	_onDeselect (itemsToDeselect, selection) {
		if (isFunction(this.props.onDeselect)) {
			this.props.onDeselect(itemsToDeselect, selection._data);
		}

		if (isFunction(this.props.onChange)) {
			this.props.onChange(selection._data);
		}
	}
};

// ## DataTable

// SLDS for React **extends objects** by merging them together, rather than
// via the prototype chain or imitation of object-oriented inheritance.
// The important thing to remember is that _some methods will be available 
// to the component which are not declared in this file_.

// These are not magic methods, they're not black box methods, but you do need
// to trace the dependencies of the component to see where they are coming
// from. In particular, DataTable extends its [core](../../core/data-table.html),
// which in turn extends the base component.

let DataTable = Lib.merge(
	{}, 
	DataTableCore, 
	DataTableDefinition
);

// ### Run the helpers

// `Helpers` are a feature of SLDS for React that allows anyone to register code that
// can manipulate the component before it is encapsulated in a React class.
//
// This allows flexibility for adding custom behavior without modifying the
// original source, or for adding optional behavior.
//
// Nothing in the component itself should ever depend on the presence
// of helpers, as they are completely optional.
DataTable = Lib.runHelpers('react', CONTROL, DataTable);

// Once everything has been merged together and all registered helpers have
// been run we can create the React class and export the result for
// consumption by our apps.
DataTable = React.createClass(DataTable);

export default DataTable;
