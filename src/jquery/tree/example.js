import * as Lib from '../../core/lib';
import Tree from './tree';

// TO-DO: This might not work with require, need to confirm that it does
const $ = Lib.global.jQuery || Lib.global.Zepto || Lib.global.ender || Lib.global.$;

$(function () {
	const tree = new Tree($('#tree'));

	Lib.log( tree );
});
