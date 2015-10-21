// DATATABLE ITEM - REACT FACADE

// Framework specific
import React from 'react';

const DataTableItem = React.createClass({

	propTypes: {
		item: React.PropTypes.object.isRequired,
		headers: React.PropTypes.array.isRequired,
		onSelected: React.PropTypes.func.isRequired,
		selected: React.PropTypes.bool.isRequired,
		hintParent: React.PropTypes.bool
	},

	render () {
		return (											// TODO: feature.selection
			<tr className=".slds-hint-parent">
				{this.props.headers.map((header, index) => {
					return (
						<td key={index} data-label={header.propertyName}>
							<span className="slds-truncate">{this.props.item.get(header.propertyName)}</span>
						</td>
					);
				})}
			</tr>
		);
	},

	handleClicked (e) {		// TODO: feature.selection
		e.preventDefault();
		// this.props.onSelected(this.props.item);
	}
});

export default DataTableItem;
