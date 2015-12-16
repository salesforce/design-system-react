// DATATABLE ITEM - REACT FACADE

// Framework specific
import React from 'react';

export const CONTROL = 'data-table-item';

const DataTableItem = React.createClass({
	displayName: CONTROL,

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
		onSelect: React.PropTypes.func.isRequired,
		selected: React.PropTypes.bool.isRequired,
		selectRows: React.PropTypes.bool
	},

	render () {
		const self = this;

		return (
			<tr className=".slds-hint-parent" onClick={this._handleItemClick}>
				{this.props.headers.map((header, index) => {
					return (
						<td key={index} data-label={header.propertyName}>
							{self._renderContent(header, index)}
						</td>
					);
				})}
			</tr>
		);
	},

	_handleItemClick () {
		this.props.onSelect(this.props.item._item);
	},

	_handleCheckClick (ev) {
		ev.stopPropagation();
	},

	_renderContent (header, index) {
		let content;

		if (index === 0 && this.props.selectRows) {
			content = (
				<label className="slds-checkbox">
					<input type="checkbox" checked={this.props.selected}></input>
					<span className="slds-checkbox--faux" onClick={this._handleCheckClick}></span>
					<span className="slds-form-element__label slds-assistive-text" >select</span>
				</label>
			);
		} else {
			content = <span className="slds-truncate">{this.props.item.get(header.propertyName)}</span>;
		}

		return content;
	},

	handleClicked (e) {		// TODO: feature.selection
		e.preventDefault();
		// this.props.onSelect(this.props.item);
	}
});

export default DataTableItem;
