import * as Lib from '../../core/lib';
import Tree from './tree';

// TO-DO: This might not work with require, need to confirm that it does
const $ = Lib.global.jQuery || Lib.global.Zepto || Lib.global.ender || Lib.global.$;

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
	$('.imperative .tree1').tree({ collection: collection, autoOpen: true });

	const tree = new Tree($('.new-api .tree1'), options);
	void(tree);
});
