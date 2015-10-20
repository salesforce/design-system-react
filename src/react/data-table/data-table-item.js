// DATATABLE ITEM - REACT FACADE

// Framework specific
import React from 'react';

const DataTableItem = React.createClass({

	propTypes: {
		item: React.PropTypes.object.isRequired,
		onSelected: React.PropTypes.func.isRequired,
		selected: React.PropTypes.bool.isRequired,
		hintParent: React.PropTypes.bool
	},

	render () {
		return (											// TODO: Make this entire piece dynamic...
			// <tr className={this._getClassNames({ 		// TODO: feature.selection
			// 	selected: this.props.selected,
			// 	hintParent: this.props.hintParent
			// })}>
			<tr className=".slds-hint-parent">
				<td data-label="description">
					<span className="slds-truncate">{this.props.item.get('name')}</span>
				</td>
				<td data-label="contact-count">
					<span className="slds-truncate">{this.props.item.get('count')}</span>
				</td>
				<td data-label="last-modified">
					<span className="slds-truncate">{this.props.item.get('lastModified')}</span>
				</td>
			</tr>
		);
	},

	handleClicked (e) {		// TODO: feature.selection
		e.preventDefault();
		// this.props.onSelected(this.props.item);
	}
});

export default DataTableItem;
