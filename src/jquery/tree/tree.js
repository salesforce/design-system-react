// TREE CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../core/lib';
// import TreeCore, {CONTROL} from '../../core/tree';
import Base from '../../core/base';

// Framework Specific
// import createPlugin from '../createPlugin';
import Events from '../events';

const $ = Lib.global.jQuery || Lib.global.Zepto || Lib.global.ender || Lib.global.$;

// Template imports
const fs = require('fs');

const Tree = function Tree (element, options) {
	this.options = $.extend({}, options);
	this.elements = {
		wrapper: $(element)
	};

	this._collection = [
		{
			text: 'Top Branch',
			type: 'folder',
			children: [
				{
					text: 'Node 1T1',
					type: 'item'
				},
				{
					text: 'Node 1T2',
					type: 'item'
				}
			]
		},
		{
			text: 'Top Node',
			type: 'item'
		}
	];

	this.__constructor(this.options);
};

Lib.extend(Tree.prototype, Base, Events, {
	onInitialized () {
		if (!this.rendered) {
			this.render();
		}

		// this.elements.wrapper.on('click.fu.tree');
	},

	render () {
		this.$html = $( '<i />' ).append( fs.readFileSync(__dirname + '/tree.html', 'utf8') );

		const $el = this.$html.find( '.tree' ).clone();

		this._loopChildren( this._collection, $el );

		this.elements.wrapper.append( $el );
	},

	renderItem ( item ) {
		const $item = this.$html.find( '.tree-item' ).clone();

		$item.find( '.tree-label' ).text( this.getText( item ) );

		return $item;
	},

	renderBranch ( item ) {
		const $item = this.$html.find( '.tree-branch' ).clone();

		$item.find( '.tree-label' ).text( this.getText( item ) );

		if ( this.getExpandable( item ) ) {
			this._loopChildren( this.getChildren( item ), $item.find( '.tree-branch-children' ) );
		}

		return $item;
	},

	_loopChildren ( children, $el )  {
		const self = this;

		children.forEach( function buildBranch ( item ) {
			const type = self.getType( item );

			let $li;

			if ( type === 'folder' ) {
				$li = self.renderBranch( item );
			} else if ( type === 'item' ) {
				$li = self.renderItem( item );
			}

			$el.append( $li );
		});
	},

	getText ( item ) {
		return item.text;
	},

	getType ( item ) {
		return item.type || 'item';
	},

	getExpandable ( item ) {
		return ( item.children && item.children.length > 0 );
	},

	getChildren ( item ) {
		return item.children || [];
	}
});

export default Tree;
