import * as Lib from '../../lib/lib';
import Tree from './tree';
import sampleData from '../../../sample-data/tree';

const $ = Lib.global.jQuery || Lib.global.$;

const options = {
	collection: sampleData.defaultArray,
	heading: sampleData.heading,
	folderSelect: false,
	multiSelect: true
};

$(function () {
	const tree = new Tree($('#tree-jquery-control .tree1'), options);

	// $('#tree-jquery-control .tree1').on('changed', function (evt, node, selectedNodes) {
	// 	console.log('changed node', node);
	// 	console.log('all selected nodes', selectedNodes);
	// });

	// $('#tree-jquery-control .tree1').on('selected', function (evt, node, selectedNodes) {
	// 	console.log('selected node', node);
	// 	console.log('all selected nodes', selectedNodes);
	// });

	// $('#tree-jquery-control .tree1').on('deselected', function (evt, node, selectedNodes) {
	// 	console.log('deselected node', node);
	// 	console.log('all selected nodes', selectedNodes);
	// });

	// $('#tree-jquery-control .tree1').on('closed', function (evt, node, openedNodes) {
	// 	console.log('closed node', node);
	// 	console.log('all opened nodeds', openedNodes);
	// });

	// $('#tree-jquery-control .tree1').on('opened', function (evt, node, openedNodes) {
	// 	console.log('opened node', node);
	// 	console.log('all opened nodeds', openedNodes);
	// });

	void(tree);
});
