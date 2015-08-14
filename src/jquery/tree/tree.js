// TREE CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../core/lib';
import TreeCore, {CONTROL} from '../../core/tree';

// Framework Specific
import createPlugin from '../createPlugin';
import Events from '../events';
import State from '../state';

const $ = Lib.global.jQuery || Lib.global.Zepto || Lib.global.ender || Lib.global.$;

// Template imports
const fs = require('fs');

const Tree = function Tree (element, options) {
	this.options = $.extend({}, options);
	this.elements = {
		wrapper: $(element)
	};

	this.__initializeState();
	this.__constructor(this.options);
};

Lib.extend(Tree.prototype, TreeCore, Events, State, {
	onInitialized () {
		if (!this.rendered) {
			this.render();
		}

		this.elements.wrapper.on( 'click.fu.tree', '.tree-branch-name', $.proxy( function ( $event ) {
			if ( this.getState( 'folderSelect' ) ) {
				this.selectFolder( $event.currentTarget );
			} else {
				this.toggleFolder( $event.currentTarget );
			}
		}, this ) );

		if ( this.getState( 'itemSelect' ) ) {
			this.elements.wrapper.on( 'click.fu.tree', '.tree-item', $.proxy( function ( $event ) {
				this.selectItem( $event.currentTarget );
			}, this ) );
		}

		if ( this.getState( 'folderSelect' ) ) {
			this.elements.wrapper.on( 'click.fu.tree', '.icon-caret', $.proxy( function ( $event ) {
				this.toggleFolder( $event.currentTarget );
			}, this ) );
		}
	},

	render () {
		let $el;
		this.elements.wrapper.empty();
		const $html = $( '<i />' ).append( fs.readFileSync(__dirname + '/tree.html', 'utf8') );

		if ( this.getState( 'folderSelect' ) ) {
			this.$html = $html.find( '.tree.tree-folder-select' ).clone();
		} else {
			this.$html = $html.find( '.tree:not(.tree-folder-select)' ).clone();
		}

		$el = this.$html.clone().empty();

		if ( this._collection.length() ) {
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

			$li.data( { item: item._item } );

			$el.append( $li );
		});
	},

	populate ( el ) {
		const $el = $( el );
		const item = Lib.getItemAdapter( $el.data( 'item' ) );
		const self = this;
		let resp;

		resp = this.accessors.getChildren( item );

		resp.then( function ( children ) {
			self._loopChildren( children, $el.find( '.tree-branch-children' ) );
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
		if (!this.getState( 'cacheItems' ) ) {
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
		if ( this.getState( 'itemSelect' ) ) {
			const $item = $(el).closest( '.tree-item' );
			const item = Lib.getItemAdapter( $item.data( 'item' ) );

			this.__selectItem( item );

			this.selectNodes( $item, item, 'item' );
		}
	},

	selectFolder ( el ) {
		if ( this.getState( 'folderSelect' )  ) {
			const $folder = $(el).closest( '.tree-branch' );
			const item = Lib.getItemAdapter( $folder.data( 'item' ) );

			this.__selectItem( item );

			this.selectNodes( $folder, item, 'folder' );
		}
	},

	selectNodes ( el, item, type ) {
		const itemSelect = this.getState( 'itemSelect' );
		const folderSelect = this.getState( 'folderSelect' );
		const multiSelect = this.getState( 'multiSelect' );
		const selected = this.accessors.getItemState.call( this, item ).selected;
		const eventType = selected ? 'selected' : 'deselected';
		const $el = $( el );
		let selectedItems;
		

		if ( ( type === 'item' && itemSelect ) || ( type === 'folder' && folderSelect ) ) {
			if ( !multiSelect ) {
				this.deselectAll();
				selectedItems = [ item ];
			} else {
				selectedItems = this.getSelectedItems();
			}

			if ( selected ) {
				this.__styleNodeSelected( $el, type );
			} else {
				this.__styleNodeDeselected( $el, type );
			}

			this.elements.wrapper.trigger(eventType + '.fu.tree', {
				target: item,
				selected: selectedItems
			});

			$el.trigger('updated.fu.tree', {
				selected: selectedItems,
				item: $el,
				eventType: eventType
			});
		}
	},

	__styleNodeSelected ($el, type) {
		const $icon = $el.find( '.icon-' + type );
		
		$el.addClass('tree-selected');
		if ( type === 'item' && $icon.hasClass('fueluxicon-bullet') ) {
			$icon.removeClass('fueluxicon-bullet').addClass('glyphicon-ok'); // make checkmark
		}
	},

	__styleNodeDeselected ($el, type) {
		const $icon = $el.find( '.icon-' + type );

		$el.removeClass('tree-selected');
		if ( type === 'item' && $icon.hasClass('glyphicon-ok') ) {
			$icon.removeClass('glyphicon-ok').addClass('fueluxicon-bullet'); // make bullet
		}
	},

	deselectAll () {
		const self = this;

		this.elements.wrapper.find( '.tree-selected' ).each( function ( index, el ) {
			const $el = $( el );
			const item = Lib.getItemAdapter( $el.data( 'item' ) );
			const type = self.accessors.getType( item );

			self.__styleNodeDeselected( $el, type );
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
	}
});

createPlugin(CONTROL, Tree);

export default Tree;
