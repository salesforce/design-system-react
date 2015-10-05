import * as Lib from '../../lib/lib';
import Tree from './tree';

const $ = Lib.global.jQuery || Lib.global.$;

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

const options = {
	collection: collection,
	folderSelect: true,
	multiSelect: true
};

$(function () {
	$('.imperative #tree1').tree({ collection: collection, autoOpen: true });

	const tree = new Tree($('.new-api #tree2'), options);
	void(tree);

	$('.imperative #tree3').tree({
		folderSelect: true,
		multiSelect: true,
		dataSource: function (dataSourceOptions, callback) {
			setTimeout( function () {
				callback({ data: [
					{
						name: 'item 1',
						type: 'item',
						dataAttributes: {
							id: Math.floor( Math.random() * 100000 )
						}
					},
					{
						name: 'item 2',
						type: 'item',
						dataAttributes: {
							id: Math.floor( Math.random() * 100000 )
						}
					},
					{
						name: 'Legacy Folder 1',
						type: 'folder',
						dataAttributes: {
							hasChildren: true,
							id: Math.floor( Math.random() * 100000 )
						}
					},
					{
						name: 'Legacy Folder 2',
						type: 'folder',
						dataAttributes: {
							hasChildren: true,
							id: Math.floor( Math.random() * 100000 )
						}
					}
				]});
			}, 1000);
		}
	});
});
