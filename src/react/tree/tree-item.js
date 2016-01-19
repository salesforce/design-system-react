// TREE ITEM - REACT FACADE

// Framework specific
import React from 'react';

// Third party
import classNames from 'classnames';

export const CONTROL = 'tree-item';

const TreeItem = React.createClass({
	displayName: CONTROL,

	propTypes: {
		// TODO: Modify when tree data adapter gets set up
		autoOpenLevel: React.PropTypes.number.isRequired,
		item: React.PropTypes.shape({
			// getType: React.PropTypes.func.isRequired,
			// getDisabled: React.PropTypes.func.isRequired,
			// getIcon: React.PropTypes.func.isRequired,
			getId: React.PropTypes.func.isRequired,
			getText: React.PropTypes.func.isRequired
			// getValue: React.PropTypes.func.isRequired
		}).isRequired,
		getControlNodeId: React.PropTypes.func.isRequired,
		getControlNodeLabelId: React.PropTypes.func.isRequired,
		id: React.PropTypes.string,
		onClick: React.PropTypes.func.isRequired,
		_isItemSelected: React.PropTypes.func.isRequired
	},

	render () {
		const isSelected = this.props._isItemSelected(this.props.item);
		const labelId = this.props.getControlNodeLabelId(this.props.item.getId());

		return (
			<li id={this.props.id} onClick={this._handleItemClick.bind(this, this.props.item)} data-template="treeitem" role="treeitem" aria-level={this.props.autoOpenLevel}>
				<div className={classNames('slds-tree__item', {'slds-is-selected': isSelected})} aria-selected={isSelected ? 'true' : 'false'} >
					<a id={labelId} dataItemId={this.getId} tabIndex="-1" role="presentation" className={classNames('slds-truncate', 'slds-size--1-of-1')}>
						{this.props.item.getText()}
					</a>
				</div>
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
