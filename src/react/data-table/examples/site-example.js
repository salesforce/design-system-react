import React from 'react';
import {DataTable} from 'design-system-react';
import {sampleData} from 'design-system-utilities';

// Third-party
import _ from 'underscore';

export default React.createClass({
	propTypes: {
		models: React.PropTypes.arrayOf(React.PropTypes.object)
	},

	getInitialState () {
		return {
			collection: sampleData.dataTable.collection,
			columns: sampleData.dataTable.columns,
			selection: []
		};
	},

	render () {
		return (
			<DataTable
				collection={this.state.collection}
				selection={this.state.selection}
				columns={this.state.columns}
				bordered={true}
				striped={true}
				onChange={this.handleChanged}
				onSort={this.sort}/>
		);
	},

	handleChanged (selection) {
		this.setState({ selection });
	},

	sort (colData) {
		let rowData = this.state.collection;

		if (colData.sortColumn.propertyName === 'count') {
			rowData = _.sortBy(rowData, 'count');
		} else if (colData.sortColumn.propertyName === 'lastModified') {
			rowData = _.sortBy(rowData, 'lastModified');
		}

		if ( colData.sortDirection === 'desc') rowData.reverse();

		this.setState({
			collection: rowData
		});
	},

	_handleModelChange (index, selection) { // TODO: feature.selection
		void(selection);
		// const models = this.state.models;
		// models[index].selection = selection;
		// this.setState({models});
	},

	logSelectedItem (index) { // TODO: feature.selection
		void(index);
		// Lib.log(this.state.models[index].selection);
	},

	setSelection (index) { // TODO: feature.selection
		void(index);
		// const models = this.state.models;
		// models[index].selection = collection[5];
		// this.setState({models});
	}
});
