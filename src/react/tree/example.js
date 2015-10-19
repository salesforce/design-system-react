import React from 'react';
import ReactDOM from 'react-dom';
import Tree from './tree';

const collection = [
	{
		text: 'Waterfall',
		_itemType: 'item',
		id: 1
	},
	{
		text: 'Fruits',
		_itemType: 'folder',
		_isExpandable: true,
		id: 2,
		children: [
			{
				text: 'Watermelon',
				_itemType: 'item',
				id: 3
			},
			{
				text: 'Tree Fruits',
				_itemType: 'folder',
				_isExpandable: true,
				id: 4,
				children: [
					{
						text: 'Peaches',
						_itemType: 'item',
						id: 5
					},
					{
						text: 'Pears (with custom icon)',
						_itemType: 'item',
						_iconClass: 'glyphicon-file',
						id: 6
					},
					{
						text: 'Citrus',
						_itemType: 'folder',
						_isExpandable: true,
						id: 11,
						children: [
							{
								text: 'Orange',
								_itemType: 'item',
								id: 12
							},
							{
								text: 'Grapefruit',
								_itemType: 'item',
								id: 13
							},
							{
								text: 'Lemon',
								_itemType: 'item',
								id: 14
							},
							{
								text: 'Lime',
								_itemType: 'item',
								id: 15
							}
						]
					},
					{
						text: 'Apples',
						_itemType: 'folder',
						_isExpandable: true,
						id: 16,
						children: [
							{
								text: 'Granny Smith',
								_itemType: 'item',
								id: 17
							},
							{
								text: 'Pinklady (with custom icon)',
								_itemType: 'item',
								_iconClass: 'glyphicon-file',
								id: 18
							},
							{
								text: 'Rotten',
								_itemType: 'item',
								id: 19
							},
							{
								text: 'Jonathan',
								_itemType: 'item',
								id: 20
							}
						]
					}

				]
			},
			{
				text: 'Cherries',
				_itemType: 'item',
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

export default function () {
	const TreeExample = React.createClass({
		getInitialState () {
			return {
				selection: [],
				open: []
			};
		},

		render () {
			return <Tree folderSelect={false} multiSelect={true} autoOpen={false} collection={collection} selection={this.state.selection} open={this.state.open} onChanged={this.handleChanged} onOpened={this.handleToggle} onClosed={this.handleToggle} />;
		},

		handleChanged (item, selection) {
			this.setState({ selection });
		},

		handleToggle (item, open) {
			this.setState({ open });
		}
	});

	ReactDOM.render(
		<div>
			<div className="slds-col example">
				<TreeExample/>
			</div>
			<div className="slds-col demo-controls"></div>
		</div>

	, document.getElementById('tree-react-control'));
}
