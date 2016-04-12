import React from 'react';
import Tree from './index';

// SAMPLE CONTROL CODE -->

const TreeExample = React.createClass({
	getInitialState () {
		const treeSampleData = {
			heading: 'Foods',
			selection: [],
			open: [],
			collection: [
				{
					text: 'Grains', type: 'item', id: 1
				}, {
					text: 'Fruits', type: 'folder', _isExpandable: true, id: 2, children: [{
						text: 'Ground Fruits', type: 'folder', id: 4, children: [{
							text: 'Watermelon', type: 'item', id: 12
						}, {
							text: 'Canteloupe', type: 'item', _iconClass: 'glyphicon-file', id: 13
						}, {
							text: 'Strawberries', type: 'item', id: 14
						}]
					}, {
						text: 'Tree Fruits', type: 'folder', _isExpandable: true, id: 5, children: [{
							text: 'Peaches', type: 'item', id: 15
						}, {
							text: 'Pears', type: 'item', _iconClass: 'glyphicon-file', id: 16
						}, {
							text: 'Citrus', type: 'folder', _isExpandable: true, id: 17, children: [{
								text: 'Orange', type: 'item', id: 20
							}, {
								text: 'Grapefruit', type: 'item', id: 21
							}, {
								text: 'Lemon', type: 'item', id: 22
							}, {
								text: 'Lime', type: 'item', id: 23
							}]
						}, {
							text: 'Apples', type: 'folder', _isExpandable: true, id: 18, children: [{
								text: 'Granny Smith', type: 'item', id: 24
							}, {
								text: 'Pinklady', type: 'item', _iconClass: 'glyphicon-file', id: 25
							}, {
								text: 'Rotten', type: 'item', id: 26
							}, {
								text: 'Jonathan', type: 'item', id: 27
							}]
						}, {
							text: 'Cherries', type: 'folder', id: 19, children: [{
								text: 'Balaton', type: 'item', id: 28
							}, {
								text: 'Erdi Botermo', type: 'item', id: 29
							}, {
								text: 'Montmorency', type: 'item', id: 30
							}, {
								text: 'Queen Ann', type: 'item', id: 31
							}, {
								text: 'Ulster', type: 'item', id: 32
							}, {
								text: 'Viva', type: 'item', id: 33
							}]
						}, {
							text: 'Raspberries', type: 'item', id: 6
						}, {
							text: 'Empty folder', type: 'folder', _isExpandable: false, id: 7
						}]
					}]
				}, {
					text: 'Nuts', type: 'folder', _iconClass: 'glyphicon-file', id: 3, children: [{
						text: 'Almonds', type: 'item', id: 8
					}, {
						text: 'Cashews', type: 'item', id: 9
					}, {
						text: 'Pecans', type: 'item', id: 10
					}, {
						text: 'Walnuts', type: 'item', id: 11
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
