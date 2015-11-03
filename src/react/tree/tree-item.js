// TREE ITEM - REACT FACADE

// Framework specific
import React from 'react';

// Third party
import classNames from 'classnames';

const TreeItem = React.createClass({
	propTypes: {
		// TODO: Modify when tree data adapter gets set up
		item: React.PropTypes.shape({
			// getType: React.PropTypes.func.isRequired,
			// getDisabled: React.PropTypes.func.isRequired,
			// getIcon: React.PropTypes.func.isRequired,
			// getId: React.PropTypes.func.isRequired,
			getText: React.PropTypes.func.isRequired
			// getValue: React.PropTypes.func.isRequired
		}).isRequired,
		onClick: React.PropTypes.func.isRequired,
		_isItemSelected: React.PropTypes.func.isRequired
	},

	render () {
		const isSelected = this.props._isItemSelected(this.props.item);
		
		return (
			<li className={classNames('slds-tree__item', {'slds-is-selected': isSelected})} onClick={this._handleItemClick.bind(this, this.props.item)} data-template="treeitem" role="treeitem">
				<div role="presentation" className="slds-tree__item-label | slds-truncate">{this.props.item.getText()}</div>
			</li>
		);
	},

	_handleItemClick (item) {
		if (this.props.onClick) {
			this.props.onClick(item);
		}
	}
});

export default TreeItem;
