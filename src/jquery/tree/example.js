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
	void(tree);
});
