import * as Lib from '../../core/lib';
import Tree from './tree';

// TO-DO: This might not work with require, need to confirm that it does
const $ = Lib.global.jQuery || Lib.global.Zepto || Lib.global.ender || Lib.global.$;

$(function () {
	$( '.imperative .tree1' ).tree();

	const tree = new Tree( $( '.new-api .tree1' ) );

	Lib.log( tree );
});
