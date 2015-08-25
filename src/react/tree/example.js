import React from 'react';
import Tree from './tree';

const collection = [
	{
		text: 'Waterfall',
		_itemType: 'item',
		id: 1
	},
	{
		text: 'Bscending and Descending',
		_itemType: 'folder',
		_isExpandable: true,
		id: 2,
		children: [
			{
				text: 'Waterfall',
				_itemType: 'item',
				id: 3
			},
			{
				text: 'Ascending and Descending',
				_itemType: 'folder',
				_isExpandable: true,
				id: 4,
				children: [
					{
						text: 'Waterfall',
						_itemType: 'item',
						id: 5
					},
					{
						text: 'Sky and Water I (with custom icon)',
						_itemType: 'item',
						_iconClass: 'glyphicon-file',
						id: 6
					},
					{
						text: 'Empty folder',
						_itemType: 'folder',
						_isExpandable: false,
						id: 9
					}
				]
			},
			{
				text: 'Sky and Water I (with custom icon)',
				_itemType: 'item',
				_iconClass: 'glyphicon-file',
				id: 7
			},
			{
				text: 'Empty folder',
				_itemType: 'folder',
				_isExpandable: false,
				id: 10
			}
		]
	},
	{
		text: 'Sky and Water I (with custom icon)',
		_itemType: 'item',
		_iconClass: 'glyphicon-file',
		id: 8
	}
];

export default function (element) {
	const TreeExample = React.createClass({
		getInitialState () {
			return {
				selection: [],
				open: []
			};
		},
		
		render () {
			return (
				<div className="slds-tree-container" role="application">
					<Tree folderSelect={false} multiSelect={true} autoOpen={false} collection={collection} selection={this.state.selection} open={this.state.open} onChanged={this.handleChanged} onOpened={this.handleToggle} onClosed={this.handleToggle} />
				</div>
			);
		},
		
		handleChanged (item, selection) {
			this.setState({ selection });
		},
		
		handleToggle (item, open) {
			this.setState({ open });
		}
	});

	React.render(<TreeExample/>, element);
}
