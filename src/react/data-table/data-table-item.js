// DATATABLE ITEM - REACT FACADE

// Framework specific
import React from 'react';

const DataTableItem = React.createClass({

	// TODO: Break TD cell out into it's own child component, so that the shape of the headers object can be tested
	propTypes: {
		bordered: React.PropTypes.bool,
		item: React.PropTypes.object.isRequired,
		headers: React.PropTypes.arrayOf(React.PropTypes.shape({
			propertyName: React.PropTypes.string,
			displayName: React.PropTypes.string,
			sortable: React.PropTypes.bool,
			hintParent: React.PropTypes.bool
		})).isRequired,
		onSelected: React.PropTypes.func.isRequired,
		selected: React.PropTypes.bool.isRequired
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
