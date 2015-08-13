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
	this.options = $.extend({}, options);
	this.elements = {
		wrapper: $(element)
	};

	this._collection = [
		{
			id: 0,
			text: 'Top Branch',
			_itemType: 'folder',
			children: [
				{
					id: 1,
					text: 'Node 1T1',
					_itemType: 'item'
				},
				{
					id: 2,
					text: 'Node 1T2',
					_itemType: 'item'
				},
				{
					id: 3,
					text: 'Folder 1T1',
					_itemType: 'folder',
					children: [
						{
							id: 4,
							text: 'Node 2T1',
							_itemType: 'item'
						},
						{
							id: 5,
							text: 'Node 2T2',
							_itemType: 'item'
						}
					]
				}
			]
		},
		{
			id: 6,
			text: 'Top Node',
			_itemType: 'item'
		}
	];

	this.__constructor(this.options);
};

Lib.extend(Tree.prototype, TreeCore, Events, {
	onInitialized () {
		if ( this._collection && this._collection.length) {
			this.statefulizeCollection( this._collection, null );
		}

		this.__setState( { itemSelect: true } );

		if (!this.rendered) {
			this.render();
		}

		this.elements.wrapper.on( 'click.fu.tree', '.tree-branch-name', $.proxy( function ( $event ) {
			this.toggleFolder( $event.currentTarget );
		}, this ) );

		if ( this.__getState( 'itemSelect' ) ) {
			this.elements.wrapper.on( 'click.fu.tree', '.tree-item', $.proxy( function ( $event ) {
				this.selectItem( $event.currentTarget );
			}, this ) );
		}

		if ( this.__getState( 'folderSelect' ) ) {
			this.elements.wrapper.off( 'click.fu.tree', '.tree-branch-name' );
			this.elements.wrapper.on( 'click.fu.tree', '.icon-caret', $.proxy( function ( $event ) {
				this.toggleFolder( $event.currentTarget );
			}, this ) );
			this.elements.wrapper.on( 'click.fu.tree', '.tree-branch-name', $.proxy( function ( $event ) {
				this.selectItem( $event.currentTarget );
			}, this ) );
		}
	},

	statefulizeCollection ( collection, parent ) {
		if ( collection && collection.length ) {
			collection.forEach( function ( item ) {
				if ( typeof item.id === 'undefined' ) {
					item.id = Symbol();
				}

				if ( !item._parent ) {
					item._parent = ( parent && parent.id ) ? parent.id : null;
				}
			} );
		}

		return collection;
	},

	render () {
		let $el;
		this.elements.wrapper.empty();
		const $html = $( '<i />' ).append( fs.readFileSync(__dirname + '/tree.html', 'utf8') );

		if ( this.__getState( 'folderSelect' ) ) {
			this.$html = $html.find( '.tree.tree-folder-select' ).clone();
		} else {
			this.$html = $html.find( '.tree:not(.tree-folder-select)' ).clone();
		}

		$el = this.$html.clone().empty();

		if ( this._collection.length ) {
			this._loopChildren( this._collection, $el );
		}

		this.elements.wrapper.append( $el );
	},

	renderItem ( item ) {
		const $item = this.$html.find( '.tree-item' ).clone();

		$item.find( '.tree-label' ).text( this.accessors.getText( item ) );

		return $item;
	},

	renderBranch ( item ) {
		const $item = this.$html.find( '.tree-branch' ).clone();

		$item.find( '.tree-label' ).text( this.accessors.getText( item ) );

		$item.find( '.tree-branch-name' ).data( { open: false } );

		return $item;
	},

	_loopChildren ( children, $el )  {
		const self = this;

		children.forEach( function buildBranch ( item ) {
			const type = self.accessors.getType( item );

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
		const self = this;
		let resp;

		resp = this.accessors.getChildren( item );

		resp.then( function ( children ) {
			self._loopChildren( self.statefulizeCollection( children, item ), $el.find( '.tree-branch-children' ) );
		});
	},

	toggleFolder ( el ) {
		const $el = $( el );
		const data = $el.closest( '.tree-branch' ).data();
		let itemState;

		this.__toggleFolder( data.item );

		itemState = this.accessors.getItemState.call( this, data.item );

		if ( itemState && itemState.open ) {
			this.discloseFolder(el);
		} else {
			this.closeFolder(el);
		}
	},

	closeFolder ( el ) {
		const $el = $( el );
		const $branch = $el.closest('.tree-branch');
		const $treeFolderContent = $branch.find('.tree-branch-children');
		const $treeFolderContentFirstChild = $treeFolderContent.eq(0);

		// take care of the styles
		$branch.removeClass('tree-open');
		$branch.attr('aria-expanded', 'false');
		$treeFolderContentFirstChild.addClass('hidden');
		$branch.find('> .tree-branch-header .icon-folder').eq(0)
			.removeClass('glyphicon-folder-open')
			.addClass('glyphicon-folder-close');

		// remove chidren if no cache
		if (!this.__getState( 'cacheItems' ) ) {
			$treeFolderContentFirstChild.empty();
		}

		this.elements.wrapper.trigger('closed.fu.tree', $branch.data());
	},

	discloseFolder ( el ) {
		const $el = $( el );
		const $branch = $el.closest('.tree-branch');
		const $treeFolderContent = $branch.find('.tree-branch-children');
		const $treeFolderContentFirstChild = $treeFolderContent.eq(0);

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

	selectItem ( el ) {
		if ( this.__getState( 'itemSelect' ) ) {
			this.__selectItem( $(el).closest( '.tree-item' ).data( 'item' ) );

			this.selectTreeNode(el, 'item');
		}
	},

	selectFolder ( el ) {
		if ( this.__getState( 'folderSelect' )  ) {
			this.__selectItem( $el.closest( '.tree-branch' ).data( 'item' ) );

			this.selectTreeNode(el, 'folder');
		}
	},

	selectTreeNode ( el, nodeType ) {
		const clicked = {};	// object for clicked element
		const selected = {}; // object for selected elements

		clicked.$element = $(el);

		selected.$elements = this.elements.wrapper.find('.tree-selected');
		selected.dataForEvent = [];

		// determine clicked element and it's icon
		if (nodeType === 'folder') {
			// make the clicked.$element the container branch
			clicked.$element = clicked.$element.closest('.tree-branch');
			clicked.$icon = clicked.$element.find('.icon-folder');
		} else {
			clicked.$icon = clicked.$element.find('.icon-item');
		}
		clicked.elementData = clicked.$element.data();

		if ( this.__getState( 'multiSelect' ) ) {
			this.__multiSelectSyncNodes(this, clicked, selected);
		} else {
			this.__singleSelectSyncNodes(this, clicked, selected);
		}

		// all done with the DOM, now fire events
		this.elements.wrapper.trigger(selected.eventType + '.fu.tree', {
			target: clicked.elementData,
			selected: selected.dataForEvent
		});

		clicked.$element.trigger('updated.fu.tree', {
			selected: selected.dataForEvent,
			item: clicked.$element,
			eventType: selected.eventType
		});
	},

	__multiSelectSyncNodes (self, clicked, selected) {
		// search for currently selected and add to selected data list if needed
		$.each(selected.$elements, function (index, element) {
			const $element = $(element);
			if ($element[0] !== clicked.$element[0]) {
				selected.dataForEvent.push( $($element).data() );
			}
		});

		if (clicked.$element.hasClass('tree-selected')) {
			this.__styleNodeDeselected(clicked.$element, clicked.$icon);
			// set event data
			selected.eventType = 'deselected';
		} else {
			this.__styleNodeSelected(clicked.$element, clicked.$icon);
			// set event data
			selected.eventType = 'selected';
			selected.dataForEvent.push(clicked.elementData);
		}
	},

	__singleSelectSyncNodes (self, clicked, selected) {
		// element is not currently selected
		if (selected.$elements[0] !== clicked.$element[0]) {
			this.__styleNodeSelected(clicked.$element, clicked.$icon);
			// set event data
			selected.eventType = 'selected';
			selected.dataForEvent = [clicked.elementData];
		} else {
			this.__styleNodeDeselected(clicked.$element, clicked.$icon);
			// set event data
			selected.eventType = 'deselected';
			selected.dataForEvent = [];
		}
	},

	__styleNodeSelected ($element, $icon) {
		$element.addClass('tree-selected');
		if ( $element.data('type') === 'item' && $icon.hasClass('fueluxicon-bullet') ) {
			$icon.removeClass('fueluxicon-bullet').addClass('glyphicon-ok'); // make checkmark
		}
	},

	__styleNodeDeselected ($element, $icon) {
		$element.removeClass('tree-selected');
		if ( $element.data('type') === 'item' && $icon.hasClass('glyphicon-ok') ) {
			$icon.removeClass('glyphicon-ok').addClass('fueluxicon-bullet'); // make bullet
		}
	},

	accessors: {
		getExpandable ( item ) {
			return Lib.getProp( item, '_itemType' ) === 'folder';
		}
	}
});

createPlugin(CONTROL, Tree);

export default Tree;
