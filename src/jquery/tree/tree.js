// TREE CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../core/lib';
import TreeCore, {CONTROL} from '../../core/tree';

// Framework Specific
import createPlugin from '../createPlugin';
import Events from '../events';

const $ = Lib.global.jQuery || Lib.global.Zepto || Lib.global.ender || Lib.global.$;

// Template imports
const fs = require('fs');

const Tree = function Tree (element, options) {
	this.options = $.extend({ cacheItems: true }, options);
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
				},
				{
					text: 'Folder 1T2',
					type: 'folder'
				}
			]
		},
		{
			text: 'Top Node',
			type: 'item'
		}
	];

	this.elements.wrapper.on( 'click.fu.tree', '.tree-branch-name', $.proxy( function ( $event ) {
		this.toggleFolder( $event.currentTarget );
	}, this ) );

	this.__constructor(this.options);
};

Lib.extend(Tree.prototype, TreeCore, Events, {
	onInitialized () {
		if (!this.rendered) {
			this.render();
		}
	},

	render () {
		this.elements.wrapper.empty();
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

		$item.find( '.tree-branch-name' ).data( { open: false } );

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

			$li.data( { item: item } );

			$el.append( $li );
		});
	},

	populate ( el ) {
		const $el = $( el );
		const item = $el.data( 'item' );
		let children;

		children = this.getChildren( item );

		this._loopChildren( children, $el.find( '.tree-branch-children' ) );
	},

	toggleFolder ( el ) {
		const $el = $( el );

		if ( $el.data( 'open' ) ) {
			this.closeFolder(el);
		} else {
			this.discloseFolder(el);
		}
	},

	closeFolder ( el ) {
		const $el = $( el );
		const $branch = $el.closest('.tree-branch');
		const $treeFolderContent = $branch.find('.tree-branch-children');
		const $treeFolderContentFirstChild = $treeFolderContent.eq(0);

		$el.data( { open: false } );

		// take care of the styles
		$branch.removeClass('tree-open');
		$branch.attr('aria-expanded', 'false');
		$treeFolderContentFirstChild.addClass('hidden');
		$branch.find('> .tree-branch-header .icon-folder').eq(0)
			.removeClass('glyphicon-folder-open')
			.addClass('glyphicon-folder-close');

		// remove chidren if no cache
		if (!this.options.cacheItems) {
			$treeFolderContentFirstChild.empty();
		}

		this.elements.wrapper.trigger('closed.fu.tree', $branch.data());
	},

	discloseFolder ( el ) {
		const $el = $( el );
		const $branch = $el.closest('.tree-branch');
		const $treeFolderContent = $branch.find('.tree-branch-children');
		const $treeFolderContentFirstChild = $treeFolderContent.eq(0);

		$el.data( { open: true } );

		// take care of the styles
		$branch.addClass('tree-open');
		$branch.attr('aria-expanded', 'true');
		$treeFolderContentFirstChild.removeClass('hide hidden'); // hide is deprecated
		$branch.find('> .tree-branch-header .icon-folder').eq(0)
			.removeClass('glyphicon-folder-close')
			.addClass('glyphicon-folder-open');

		// add the children to the folder
		if (!$treeFolderContent.children().length) {
			this.populate( $branch );
		}

		this.elements.wrapper.trigger('disclosedFolder.fu.tree', $branch.data());
	},

	getText ( item ) {
		return item.text;
	},

	getType ( item ) {
		return item.type || 'item';
	},

	getExpandable ( item ) {
		return ( this.getType( item ) === 'folder' );
	},

	getChildren ( item ) {
		const junkKids = [
			{
				text: 'Top Branch',
				type: 'folder'
			},
			{
				text: 'Top Node',
				type: 'item'
			}
		];

		return item.children || junkKids;
	}
});

createPlugin(CONTROL, Tree);

export default Tree;
