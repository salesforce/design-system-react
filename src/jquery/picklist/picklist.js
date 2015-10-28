// PICKLIST CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import PicklistCore, {CONTROL} from '../../core/picklist';

// Framework specific
import DOM from '../dom';
import Events from '../events';
import State from '../state';
import Svg from '../svg';

const $ = Lib.global.jQuery || Lib.global.$;

// Template imports
import template from './picklist-template';

let Picklist = function Picklist () {
	const options = this._getOptions(arguments);
	
	const $html = $('<i />').append(template);
	this.template = $html.find('.slds-form-element');
	this._closeOnClick = $.proxy(this._closeOnClick, this);
	
	this._initialize(options);
};

export const PicklistObject = {
	_bindUIEvents () {
		this.elements.button.on('click', $.proxy(this._handleClicked, this));
		this.elements.dropdownMenu.on('click', 'a', $.proxy(this._handleMenuItemSelected, this));
		this.elements.wrapper.on('keydown', $.proxy(this._handleKeyDown, this));
		this.elements.wrapper.on('keypress', $.proxy(this._handleKeyPressed, this));
	},
	
	_initElements (base, elements) {
		const els = elements || {};

		els.button = base.find('.' + this.cssClasses.TOGGLE);
		els.hiddenField = base.find('input.slds-hide');
		els.label = els.button.find('.' + this.cssClasses.LABEL);
		els.dropdown = base.find('.' + this.cssClasses.DROPDOWN);
		els.dropdownMenu = base.find('.' + this.cssClasses.MENU);

		return els;
	},
	
	_renderItem (item) {
		const disabled = item.getDisabled();
		const $li = this.template.find('li').clone();
	
		$li.data({
			item: item._item
		});
		$li.prop('disabled', disabled);
	
		const $a = $li.find('a');
		$a.text(item.getText());
	
		if (disabled) {
			$a.attr('aria-disabled', true);
		}
	
		const icon = item.getIcon();
	
		if (Lib.isString(icon) && icon.length > 0) {
			const $icon = this._renderIcon(icon, 'slds-icon--small slds-icon--right');
			$a.append($icon);
		}
	
		return $li;
	},
	
	_renderHeader (item) {
		return $('<li class="' + this.cssClasses.HEADER + '"><span class="' + this.cssClasses.HEADERTEXT + '">' + item.getText() + '</span></li>');
	},
	
	_renderDivider () {
		return $('<li class="' + this.cssClasses.DIVIDER + '" role="separator"></li>');
	},

	_render () {
		const strings = this.getState('strings');
		const selection = this._getSelection();

		// Get the template
		const $el = this.element = this.$el = this.elements.control = this.template.clone();
		const elements = this._initElements($el, this.elements);

		// Configure the button
		const disabled = !!this.getProperty('disabled');
		elements.button.prop('disabled', disabled);

		// Show the current selection if there is one
		const selectionName = selection.getText() || strings.NONE_SELECTED;
		elements.label.text(selectionName);
		elements.hiddenField.val(selection.getText());

		// Empty the menu from the template
		elements.dropdownMenu.empty();

		// Building the menu items
		this._collection.forEach(item => {
			let $li;
			let func;
			const funcMap = {
				header: this._renderHeader,
				divider: this._renderDivider,
				item: this._renderItem
			};
			
			func = funcMap[item.getType()] || this._renderItem;

			$li = func.call(this, item);

			elements.dropdownMenu.append($li);
		});
		
		this._addCheckmark(elements);

		if ( this._collection._data.length === 0 ) {
			this.disable();
			this.setProperties({ disabled: true });
		}

		this.rendered = true;
		
		return this.element;
	},
	
	_onRendered () {
		// Get the menu items for keyboard nav
		this.elements.menuItems = [];
		const menuItems = this.elements.dropdownMenu[0].getElementsByTagName('li');

		for (let i = 0; i < menuItems.length; i++) {
			const menuItem = menuItems[i].getElementsByTagName('a');

			if (!menuItems[i].disabled && menuItem.length === 1) {
				this.elements.menuItems.push(menuItem[0]);
			}
		}

		this._bindUIEvents();
	},

	_onSelected (item) {
		if (this.rendered) {
			const strings = this.getState('strings');

			this.elements.hiddenField.val(item.getText());
			this.elements.label.text(item.getText() || strings.NONE_SELECTED);

			this._addCheckmark(this.elements);
		}
	},
	
	_onExpandOrCollapse () {
		if (this.rendered) {
			const isOpen = this.getState('isOpen');
			
			this.elements.dropdown.toggleClass('slds-hide', !isOpen);
			this.elements.button.attr('aria-expanded', isOpen);
		}
	},

	_onEnabledOrDisabled () {
		if (this.rendered) {
			const disabled = !!this.getProperty('disabled');
			
			this.elements.dropdown.toggleClass('slds-hide', disabled);
			this.elements.button.prop('disabled', disabled);
		}
	},

	_resetWidth (width) {
		if (this.rendered) {
			this.elements.button.width(width);
			this.elements.dropdownMenu.width(width);
		}
	},

	_handleClicked (e) {
		this._openToggleEvent(e.originalEvent);
	},

	_handleMenuItemSelected (e) {
		e.preventDefault();

		const $a = $(e.currentTarget);
		const $li = $a.parent('li');
		
		if (!$li.prop('disabled')) {
			this.setSelection($li.data('item'));
		}
	},

	_handleKeyDown (e) {
		let key;

		if (/(38)/.test(e.which)) {
			key = 'ArrowUp';
		} else if (/(40)/.test(e.which)) {
			key = 'ArrowDown';
		}

		if (key) {
			e.preventDefault();
			this._keyboardNav(key, this.elements.menuItems);
		}
	},

	_handleKeyPressed (e) {
		const key = String.fromCharCode(e.which);

		if (key && key.length === 1) {
			e.preventDefault();
			this._keyboardNav(key, this.elements.menuItems);
		}
	},

	_addCheckmark (elements) {
		const selection = this.getSelection();
		let $li;

		if (selection) {
			elements.dropdownMenu.find('li').each(function () {
				if ($(this).data('item') === selection) {
					$li = $(this);
				}
			});
		}
		
		if ($li) {
			$li.parent()
				.find('.slds-is-selected').removeClass('slds-is-selected')
				.find('svg.slds-icon--left').remove();
	
			$li.addClass('slds-is-selected');
			$li.find('a').prepend(this._renderIcon('standard.task2', 'slds-icon--small slds-icon--left'));
		}
	}
};

Lib.merge(Picklist.prototype, PicklistCore, Events, DOM, State, Svg, PicklistObject);

// LEGACY METHODS
//

// aliased by getValue and selectedItem
function selectedItem () {
	let selection = this._getSelection().get();

	if (Lib.isObject(selection)) {
		selection = Lib.extend({}, selection);

		selection.selected = true;
		delete selection._itemType;
	} else {
		selection = null;
	}

	return selection;
}

// TODO: add emptyLabelHTML that then overrides NONE_SELECTED

export const legacyMethods = {
	getValue: selectedItem,
	selectedItem: selectedItem,

	selectByValue (value) {
		return this.setSelection({ value: value });
	},

	selectByText (text) {
		return this.setSelection(item => {
			const itemText = item && item.getText();

			return item && Lib.isString(itemText) && Lib.isString(text) && itemText.toLowerCase() === text.toLowerCase();
		});
	},

	selectBySelector (selector) {
		const $item = $(selector);
		return this.setSelection($item.data('item'));
	},

	selectByIndex (index) {
		let i = index;

		if (!Lib.isNumber(i)) {
			i = parseInt(index, 10);
		}
		return this.setSelectionByIndex(i);
	}
};

Picklist = Lib.runHelpers('jquery', CONTROL, Picklist, {
	legacyMethods
});

export default Picklist;
