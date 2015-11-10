import * as Lib from '../../lib/lib';
import Tree from './tree';
import sampleData from '../../../sample-data/tree';

const $ = Lib.global.jQuery || Lib.global.$;

const options = {
	collection: sampleData.defaultArray,
	folderSelect: false,
	multiSelect: true
};

$(function () {
	const tree = new Tree($('#tree-jquery-control .tree1'), options);

	$('#tree-jquery-control .tree1').on('changed', function (evt, node, selectedNodes) {
		console.log('changed', node);
		console.log('selectedNodes', selectedNodes);
	});

	$('#tree-jquery-control .tree1').on('selected', function (evt, node) {
		console.log('selected', node);
	});

	$('#tree-jquery-control .tree1').on('deselected', function (evt, node) {
		console.log('deselected', node);
	});

	$('#tree-jquery-control .tree1').on('closed', function (evt, node) {
		console.log('closed', node);
	});

	$('#tree-jquery-control .tree1').on('opened', function (evt, node) {
		console.log('opened', node);
	});

	void(tree);
});
