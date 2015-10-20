import * as Lib from '../../lib/lib';
import Tree from './tree';

const $ = Lib.global.jQuery || Lib.global.$;

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

const options = {
	collection: collection,
	folderSelect: false,
	multiSelect: true
};

$(function () {
	const tree = new Tree($('#tree-jquery-control .tree1'), options);
	void(tree);
});
