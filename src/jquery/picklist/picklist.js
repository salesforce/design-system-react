// PICKLIST CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import KeyNumber from '../../lib/keys';
import PicklistCore, {CONTROL} from '../../core/picklist';

// Traits
import Eventable from '../../traits/eventable';
import KeyboardNavigable from '../../traits/keyboard-navigable';
import Multiselectable from '../../traits/multiselectable';
import Openable from '../../traits/openable';
import Positionable from '../../traits/positionable';

// Framework specific
import DOM from '../dom';
import Events from '../events';
import State from '../state';
import Svg from '../svg';

// children
import Button from '../button/button';

const $ = Lib.global.jQuery || Lib.global.$;

// Template imports
import template from './picklist-template';

let Picklist = function Picklist () {
	const options = this._getOptions(arguments);

	this.template = $(template);

	this._initialize(options);
};

export const PicklistObject = {
	_initializer () {
		this.element = this.$el = this.elements.control = this.template.clone();
		this._initElements();
		
		Eventable.on(this, 'select', this._onSelect, this);
		Eventable.on(this, 'deselect', this._onDeselect, this);
	},

	_initElements () {
		this.elements.dropdown = this.element.find('.' + this.cssClasses.MENU);

		if (this.getProperty('modalMenu')) {
			Positionable.setElement(this, Positionable.attachPositionedElementToBody({classes: 'slds-picklist'}));
			Positionable.setContainer(this, document.querySelector('body'));
			
			this.elements.dropdown = $(Positionable.getElement(this)).append(this.elements.dropdown).find('.' + this.cssClasses.MENU);
		}

		this.elements.dropdownMenu = this.elements.dropdown.find('.' + this.cssClasses.LIST);
	},

	_bindUIEvents () {
		this.elements.button.on('click', this._handleClicked.bind(this));
		this.elements.dropdownMenu.on('click', 'a', this._handleMenuItemSelected.bind(this));
		this.element.on('keydown', this._handleKeyDown.bind(this));
		this.element.on('keypress', this._handleKeyPressed.bind(this));
	},

	_renderItem (item, collectionIndex) {
		const type = item.getType() || '';
		const itemClass = this.cssClasses[String('item' + type).toUpperCase()];
		const $li = this.template.find('li.' + itemClass).clone();
		$li.attr('id', '' + this._getMenuItemId(collectionIndex));

		if (type === 'header') {
			$li.children().text(item.getText());
		} else if (type === 'divider') {
			$li.attr('role', 'separator');
		} else {
			const disabled = item.getDisabled();
			const $a = $li.find('a');
			$a.attr('aria-disabled', disabled);
			$li.prop('disabled', disabled);

			$li.data({
				item: item._item
			});
			
			const $p = $a.find('p');
			$p.text(item.getText());
			
			// TODO: Is this really the best way to add the checks?
			const $check = this._renderIcon('utility.check', 'slds-icon slds-icon--selected slds-icon--x-small slds-icon-text-default slds-m-right--small');
			$check.prependTo($p);

			const icon = item.getIcon();

			if (Lib.isString(icon) && icon.length > 0) {
				const $icon = this._renderIcon(icon, 'slds-icon slds-icon--x-small slds-icon-text-default slds-m-left--small slds-shrink-none');
				$a.append($icon);
			}
		}

		return $li;
	},

	_renderMenu (elements) {
		// Empty the initial or current menu
		elements.dropdownMenu.empty();
		const menuItems = [];

		this._collection.map((item, index) => {
			menuItems.push(this._renderItem(item, index));
		});

		elements.dropdownMenu.append(menuItems);
		this._addCheckmark(elements);
	},

	_render () {
		const strings = this.getState('strings');
		const selection = this._getSelection();
		const elements = this.elements;

		this.button = new Button({
			icon: 'utility.down',
			iconStyle: 'icon-only',
			theme: 'neutral',
			truncate: true,
			disabled: this.getProperty('disabled'),
			text: selection.getText() || strings.SELECT_AN_OPTION
		});
		this.button.replaceAll(this.element.find('x-dropdown-button')[0]);
		
		this.elements.button = this.button.element;
		if (this.getProperty('modalMenu')) {
			Positionable.setTarget(this, this.elements.button);
		}
		this.elements.button.addClass('slds-picklist__label');

		this._renderMenu(elements);

		if (this._collection._data.length === 0) {
			this.disable();
		}

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

	_onOpened () {
		if (this.rendered) {
			this.elements.control.addClass('slds-is-open');
			this.elements.dropdown.removeClass('slds-hide');
			this.elements.button.attr('aria-expanded', true);

			if (this.getProperty('modalMenu')) {
				Positionable.position(this);
				Positionable.show(this);
			}
		}
	},

	_onClosed () {
		if (this.rendered) {
			this.elements.control.removeClass('slds-is-open');
			this.elements.dropdown.addClass('slds-hide');
			this.elements.button.attr('aria-expanded', false);
			if (this.getProperty('modalMenu')) {
				Positionable.hide(this);
			}
		}
	},

	enable () {
		this.setProperties({
			disabled: false
		});

		if (this.rendered) {
			this.elements.dropdown.removeClass('slds-hide');
		}
		
		this.button.enable();
	},

	disable () {
		this.setProperties({
			disabled: true
		});

		if (this.rendered) {
			this.elements.dropdown.addClass('slds-hide');
		}
		
		this.button.disable();
	},

	_resetWidth (width) {
		if (this.rendered) {
			this.elements.button.width(width);
			this.elements.dropdownMenu.width(width);
		}
	},

	_handleClicked (e) {
		e.stopPropagation();
		Openable.toggle(this, e.originalEvent);
	},

	_handleMenuItemSelected (e) {
		e.preventDefault();
		e.stopPropagation();

		const $a = $(e.currentTarget);
		const $li = $a.parent('li');

		if (!$li.prop('disabled')) {
			this.setSelection($li.data('item'));
			Openable.close(this);
		}
	},

	// The `keydown` event is best used to catch non-character key events. The `which` event object key is the standardized IE9+ (and the rest) for reporting key codes.
	_handleKeyDown (e) {
		const keyNumber = e.which;

		if (KeyNumber.UP === keyNumber ||
				KeyNumber.DOWN === keyNumber) {
			this._focusOnItemFromKeyEvent(e, KeyNumber[keyNumber]);
		} else if (KeyNumber.ESCAPE === keyNumber) {
			Openable.close(this);
		}
	},

	// The `keypress` event is typically triggered after `keydown` by only character keys (A,B,C...). The `which` event object key is the standardized IE9+ (and the rest) for reporting key codes.
	_handleKeyPressed (e) {
		const keyCharacter = String.fromCharCode(e.which);

		if (keyCharacter && keyCharacter.length === 1) {
			this._focusOnItemFromKeyEvent(e, keyCharacter);
		}
	},

	_focusOnItemFromKeyEvent (e, key) {
		const focusedIndex = KeyboardNavigable.keyboardNav(this, key, this.setSelection, this._collection);

		e.preventDefault();
		if (focusedIndex !== undefined) {
			document.getElementById(this._getMenuItemId(focusedIndex)).getElementsByTagName('a')[0].focus();
		}
	},

	_addCheckmark (elements) {
		const selectedIndex = this._collection.indexOf(this._getSelection());
		const $li = elements.dropdownMenu.find('#' + this._getMenuItemId(selectedIndex));

		if ($li) {
			$li.parent()
				.find('.slds-is-selected').removeClass('slds-is-selected');

			$li.addClass('slds-is-selected');
		}
	},

	_getSelection () {
		let item = this._collection.findWhere(this.getProperty('selection'));
		
		if (!item) {
			item = this._getItemAdapter(this.getProperty('selection'));
		}
		
		return item;
	},

	_onSelect (itemsToSelect, selection) {
		const item = selection.at(0);
		
		this.setProperties({ selection: item });
		
		this.trigger('selected', item);
		this.trigger('changed', item);
		
		this._onChanged();
	},

	_onDeselect () {
		this.setProperties({ selection: undefined });
		
		this.trigger('deselected');
		this.trigger('changed');
		
		this._onChanged();
	},

	_onChanged () {
		const item = this._getSelection();
		
		if (this.rendered) {
			const strings = this.getState('strings');

			this.button.renderView({
				text: item.getText() || strings.NONE_SELECTED
			});

			this._addCheckmark(this.elements);
		}
	},
	
	setSelection (item) {
		Multiselectable.selectItem(this, item);
	}
};

Lib.merge(Picklist.prototype, PicklistCore, Events, DOM, State, Svg, PicklistObject);

Picklist = Lib.runHelpers('jquery', CONTROL, Picklist);

export default Picklist;
