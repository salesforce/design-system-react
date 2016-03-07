import React from 'react';
import { Tree } from 'design-system-react';

// SAMPLE CONTROL CODE -->

const TreeExample = React.createClass({
	getInitialState () {
		const treeSampleData = {
			heading: 'Foods',
			selection: [],
			open: [],
			collection: [
				{
					text: 'Grains', _itemType: 'item', id: 1
				}, {
					text: 'Fruits', _itemType: 'folder', _isExpandable: true, id: 2, children: [{
						text: 'Ground Fruits', _itemType: 'folder', id: 4, children: [{
							text: 'Watermelon', _itemType: 'item', id: 12
						}, {
							text: 'Canteloupe', _itemType: 'item', _iconClass: 'glyphicon-file', id: 13
						}, {
							text: 'Strawberries', _itemType: 'item', id: 14
						}]
					}, {
						text: 'Tree Fruits', _itemType: 'folder', _isExpandable: true, id: 5, children: [{
							text: 'Peaches', _itemType: 'item', id: 15
						}, {
							text: 'Pears', _itemType: 'item', _iconClass: 'glyphicon-file', id: 16
						}, {
							text: 'Citrus', _itemType: 'folder', _isExpandable: true, id: 17, children: [{
								text: 'Orange', _itemType: 'item', id: 20
							}, {
								text: 'Grapefruit', _itemType: 'item', id: 21
							}, {
								text: 'Lemon', _itemType: 'item', id: 22
							}, {
								text: 'Lime', _itemType: 'item', id: 23
							}]
						}, {
							text: 'Apples', _itemType: 'folder', _isExpandable: true, id: 18, children: [{
								text: 'Granny Smith', _itemType: 'item', id: 24
							}, {
								text: 'Pinklady', _itemType: 'item', _iconClass: 'glyphicon-file', id: 25
							}, {
								text: 'Rotten', _itemType: 'item', id: 26
							}, {
								text: 'Jonathan', _itemType: 'item', id: 27
							}]
						}, {
							text: 'Cherries', _itemType: 'folder', id: 19, children: [{
								text: 'Balaton', _itemType: 'item', id: 28
							}, {
								text: 'Erdi Botermo', _itemType: 'item', id: 29
							}, {
								text: 'Montmorency', _itemType: 'item', id: 30
							}, {
								text: 'Queen Ann', _itemType: 'item', id: 31
							}, {
								text: 'Ulster', _itemType: 'item', id: 32
							}, {
								text: 'Viva', _itemType: 'item', id: 33
							}]
						}, {
							text: 'Raspberries', _itemType: 'item', id: 6
						}, {
							text: 'Empty folder', _itemType: 'folder', _isExpandable: false, id: 7
						}]
					}]
				}, {
					text: 'Nuts', _itemType: 'folder', _iconClass: 'glyphicon-file', id: 3, children: [{
						text: 'Almonds', _itemType: 'item', id: 8
					}, {
						text: 'Cashews', _itemType: 'item', id: 9
					}, {
						text: 'Pecans', _itemType: 'item', id: 10
					}, {
						text: 'Walnuts', _itemType: 'item', id: 11
					}]
				}
			]
		};

		return treeSampleData;
	},

	render () {
		return (
			<Tree
				folderSelect={false}
				multiSelect={true}
				autoOpen={false}
				heading={this.state.heading}
				collection={this.state.collection}
				selection={this.state.selection}
				open={this.state.open}
				onChange={this.handleChanged}
				onOpened={this.handleToggle}
				onClosed={this.handleToggle} />
		);
	},

	handleChanged (selection) {
		this.setState({ selection });
	},

	handleToggle (item, open) {
		this.setState({ open });
	}
});

// <-- SAMPLE CONTROL CODE

export default TreeExample;
