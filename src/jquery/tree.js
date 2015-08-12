// SELECTLIST CONTROL - JQUERY FACADE

// Core
import Landmark from '../landmark';
import TreeCore, {CONTROL} from '../core/tree';

// Framework specific
// TO-DO: This might not work with require, need to confirm that it does
import createPlugin from './createPlugin';
var $ = window.$;

// Template imports
var fs = require('fs');

var Tree = function (element, options) {
	this.options = $.extend({
		//default options
		dataSource: function dataSource(options, callback) {},
		multiSelect: false,
		cacheItems: true,
		folderSelect: true,
		itemSelect: true
	}, options);

	this.elements = {
		wrapper: $(element)
	};

	if (options.collection) {
		this.rendered = false;
	} else {
		this.__initElements(this.elements.wrapper, this.elements);

		//this.__buildCollection(options);

		this.rendered = true;
	}

	this.__constructor(options);
};

Object.assign(Tree.prototype, TreeCore, {
	__initElements (base, elements) {
		elements = elements || {};

		return elements;
	},

	onInitialized (options) {
		if (!this.rendered) {
			this.render();
		}

		this.elements.wrapper.on('click.fu.selectlist', '.dropdown-menu a', $.proxy(this.handleClicked, this));
		this.elements.wrapper.on('keypress.fu.selectlist', $.proxy(this.handleKeyPress, this));
	},

	render () {
		this.populateTree(this.$element);
	},

	//Do stuff with the data retrieved by tree population
	populateTree ($el) {
		var $parent = ($el.hasClass('tree')) ? $el : $el.parent();
		var loader = $parent.find('.tree-loader:eq(0)');
		var treeData = $parent.data();

		loader.removeClass('hide hidden'); // hide is deprecated

		this.__retrieveData(treeData ? treeData : {}, function (items) {
			loader.addClass('hidden');

			$.each(items.data, function (index, value) {
				var $entity;

				if (value.type === 'folder') {
					$entity = this.elements.wrapper.find('[data-template=treebranch]:eq(0)').clone().removeClass('hide hidden').removeData('template'); // hide is deprecated
					$entity.data(value);
					$entity.find('.tree-branch-name > .tree-label').html(value.text || value.name);
				} else if (value.type === 'item') {
					$entity = this.elements.wrapper.find('[data-template=treeitem]:eq(0)').clone().removeClass('hide hidden').removeData('template'); // hide is deprecated
					$entity.find('.tree-item-name > .tree-label').html(value.text || value.name);
					$entity.data(value);
				}

				// add attributes to tree-branch or tree-item
				var attr = value.attr || value.dataAttributes || [];
				$.each(attr, function (key, value) {
					switch (key) {
						case 'cssClass':
						case 'class':
						case 'className':
							$entity.addClass(value);
							break;

						// allow custom icons
						case 'data-icon':
							$entity.find('.icon-item').removeClass().addClass('icon-item ' + value);
							$entity.attr(key, value);
							break;

						// ARIA support
						case 'id':
							$entity.attr(key, value);
							$entity.attr('aria-labelledby', value + '-label');
							$entity.find('.tree-branch-name > .tree-label').attr('id', value + '-label');
							break;

						// style, data-*
						default:
							$entity.attr(key, value);
							break;
					}
				});

				// add child nodes
				if ($el.hasClass('tree-branch-header')) {
					$parent.find('.tree-branch-children:eq(0)').append($entity);
				} else {
					$el.append($entity);
				}
			});
		});

	},

	selectTreeNode: function selectItem(clickedElement, nodeType) {
		var clicked = {};	// object for clicked element
		clicked.$element = $(clickedElement);

		var selected = {}; // object for selected elements
		selected.$elements = this.$element.find('.tree-selected');
		selected.dataForEvent = [];

		// determine clicked element and it's icon
		if (nodeType === 'folder') {
			// make the clicked.$element the container branch
			clicked.$element = clicked.$element.closest('.tree-branch');
			clicked.$icon = clicked.$element.find('.icon-folder');
		}
		else {
			clicked.$icon = clicked.$element.find('.icon-item');
		}
		clicked.elementData = clicked.$element.data();

		// the below functions pass objects by copy/reference and use modified object in this function
		if ( this.options.multiSelect ) {
			multiSelectSyncNodes(this, clicked, selected);
		}
		else {
			singleSelectSyncNodes(this, clicked, selected);
		}
	},

	selectFolder: function selectFolder(el) {
		if (this.options.folderSelect) {
			this.selectTreeNode(el, 'folder');
		}
	},

	selectItem: function selectItem(el) {
		if (this.options.itemSelect) {
			this.selectTreeNode(el, 'item');
		}
	},


});

function styleNodeSelected ($element, $icon) {
	$element.addClass('tree-selected');
	if ( $element.data('type') === 'item' && $icon.hasClass('fueluxicon-bullet') ) {
		$icon.removeClass('fueluxicon-bullet').addClass('glyphicon-ok'); // make checkmark
	}
}

function styleNodeDeselected ($element, $icon) {
	$element.removeClass('tree-selected');
	if ( $element.data('type') === 'item' && $icon.hasClass('glyphicon-ok') ) {
		$icon.removeClass('glyphicon-ok').addClass('fueluxicon-bullet'); // make bullet
	}
}

function multiSelectSyncNodes (self, clicked, selected) {
	// search for currently selected and add to selected data list if needed
	$.each(selected.$elements, function (index, element) {
		var $element = $(element);
		if ($element[0] !== clicked.$element[0]) {
			selected.dataForEvent.push( $($element).data() );
		}
	});

	if (clicked.$element.hasClass('tree-selected')) {
		styleNodeDeselected (clicked.$element, clicked.$icon);
		// set event data
		selected.eventType = 'deselected';
	}
	else {
		styleNodeSelected(clicked.$element, clicked.$icon);
		// set event data
		selected.eventType = 'selected';
		selected.dataForEvent.push(clicked.elementData);
	}
}

function singleSelectSyncNodes(self, clicked, selected) {
	// element is not currently selected
	if (selected.$elements[0] !== clicked.$element[0]) {
		var clearedElements = self.deselectAll(self.$element);
		styleNodeSelected(clicked.$element, clicked.$icon);
		// set event data
		selected.eventType = 'selected';
		selected.dataForEvent = [clicked.elementData];
	}
	else {
		styleNodeDeselected(clicked.$element, clicked.$icon);
		// set event data
		selected.eventType = 'deselected';
		selected.dataForEvent = [];
	}
}

// LEGACY METHODS
var legacyMethods = {
	selectedItem: function () {
		return this.getSelection();
	},

	selectByValue: function (value) {
		return this.setSelection({ value: value });
	},

	selectByText: function (name) {
		return this.setSelection({ name: name });
	},

	selectBySelector: function (selector) {
		var $item = $(selector);
		return this.setSelection($item.data());
	},

	selectByIndex: function (index) {
		if (!Landmark.isNumber(index)) {
			index = parseInt(index, 10);
		}
		return this.setSelectionByIndex(index);
	}
};

createPlugin(CONTROL, Tree, legacyMethods);

export default Selectlist;