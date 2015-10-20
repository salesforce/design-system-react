import React from 'react';
import ReactDOM from 'react-dom';
import Tree from './tree';

const collection = [
	{
		text: 'Tree Branch',
		_itemType: 'folder',
		_isExpandable: true,
		id: 1,
		children: [
			{
				text: 'Tree Branch',
				_itemType: 'folder',
				_isExpandable: true,
				id: 2,
				children: [
					{
						text: 'Tree Item',
						_itemType: 'item',
						id: 3
					},
					{
						text: 'Tree Item',
						_itemType: 'item',
						_iconClass: 'glyphicon-file',
						id: 4
					},
					{
						text: 'Tree Item',
						_itemType: 'item',
						id: 5
					}
				]
			},
			{
				text: 'Tree Item',
				_itemType: 'item',
				id: 6
			},
			{
				text: 'Tree Item',
				_itemType: 'item',
				id: 7
			}
		]
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
