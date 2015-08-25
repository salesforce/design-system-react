// TREE ITEM - REACT FACADE

// Framework specific
import React from 'react';

// Third party
import classNames from 'classnames';

const TreeItem = React.createClass({
	propTypes: {
		item: React.PropTypes.object,
		onClick: React.PropTypes.func.isRequired,
		_isItemSelected: React.PropTypes.func.isRequired
	},

	render () {
		const isSelected = this.props._isItemSelected(this.props.item);
		
		return (
			<li className={classNames('slds-tree__item', {'slds-is-selected': isSelected})} role="treeitem" onClick={this._handleItemClick.bind(this, this.props.item)}>
				<a tabIndex="-1" role="presentation" className="slds-truncate">{this.props.item.getText()}</a>
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
