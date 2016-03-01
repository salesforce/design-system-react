/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Picklist Component --- SLDS for jQuery

// Implements the [Picklist design pattern](https://www.lightningdesignsystem.com/components/menus#picklist) in jQuery.

// [![Picklist component example screenshot](/assets/demo-site/images/component-examples/picklist.png "Picklist component example screenshot")](/jquery/picklist)

// > See a [live example](/jquery/picklist) of the Picklist component in action

// ## API

/* @todo Add a full API description of the component here. */

// ## Dependencies

// Bring in the [shared library functions](../../lib/lib.html).
import * as Lib                  from '../../lib/lib';

// Bring in the [KeyNumber library functions](../../lib/keys.html).
import KeyNumber                 from '../../lib/keys';

// Use the [shared core](../../core/picklist.html)
import PicklistCore, { CONTROL } from '../../core/picklist';

// ### jQuery
// jQuery is an external dependency of the project.
import $ from 'jquery';

// ### Traits

// #### Eventable
// [../../traits/eventable](../../traits/eventable.html)
import Eventable                 from '../../traits/eventable';

// #### KeyboardNavigable
// [../../traits/keyboard-navigable.html](../../traits/keyboard-navigable.html)
import KeyboardNavigable         from '../../traits/keyboard-navigable';

// #### Multiselectable
// [../../traits/multiselectable](../../traits/multiselectable.html)
import Multiselectable           from '../../traits/multiselectable';

// #### Openable
// [../../traits/openable](../../traits/openable.html)
import Openable                  from '../../traits/openable';

// #### Positionable
// [../../traits/positionable](../../traits/positionable.html)
import Positionable              from '../../traits/positionable';

// ### Mixins

// These are mixins that appear in all of SLDS for Javascript,
// bringing consistency to instantiation, events, and state.

// #### DOM
// [../dom](../dom.html)
import DOM                       from '../dom';

// #### Events
// [../mixins/events](../mixins/events.html)
import Events                    from '../events';

// #### State
// [../mixins/state](../mixins/state.html)
import State                     from '../state';

// #### Svg
// [../svg](../svg.html)
import Svg                       from '../svg';

// ### Children

// #### Button
// [../button/button](../button/button.html)
import Button                    from '../button/button';

// #### Picklist Template
// [./picklist-template](./picklist-template.html)
import template                  from './picklist-template';


// ## Picklist Constructor
// Constructors are functions that are called by the `new` keyword and is the
// function that an options object is passed into.

let Picklist = function Picklist () {
	const options = this._getOptions(arguments);

	this.template = $(template);

	this._initialize(options);
};

// ## Picklist Object
export const PicklistObject = {
	// ### Initializer
	_initializer () {
		this.element = this.$el = this.elements.control = this.template.clone();
		this._initElements();

		Eventable.on(this, 'select', this._onSelect, this);
		Eventable.on(this, 'deselect', this._onDeselect, this);
	},

	// ### Init Elements
	_initElements () {
		this.elements.dropdown = this.element.find('.' + this.cssClasses.MENU);

		if (this.getProperty('modalMenu')) {
			Positionable.setElement(this, Positionable.attachPositionedElementToBody({classes: 'slds-picklist'}));
			Positionable.setContainer(this, document.querySelector('body'));

			this.elements.dropdown = $(Positionable.getElement(this)).append(this.elements.dropdown).find('.' + this.cssClasses.MENU);
		}

		this.elements.dropdownMenu = this.elements.dropdown.find('.' + this.cssClasses.LIST);
	},

	// ### Bind Ui Events
	_bindUIEvents () {
		this.elements.button.on('click', this._handleClicked.bind(this));
		this.elements.dropdownMenu.on('click', 'a', this._handleMenuItemSelected.bind(this));
		this.element.on('keydown', this._handleKeyDown.bind(this));
		this.element.on('keypress', this._handleKeyPressed.bind(this));
	},

	// ### Render Item
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

	// ### Render Menu
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

	// ### Render
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
		this.elements.button.attr('aria-haspopup', true);

		this._renderMenu(elements);

		if (this._collection._data.length === 0) {
			this.disable();
		}

		return this.element;
	},

	// ### On Rendered
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

	// ### On Opened
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

	// ### On Closed
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

	// ### Enable
	enable () {
		this.setProperties({
			disabled: false
		});

		if (this.rendered) {
			this.elements.dropdown.removeClass('slds-hide');
		}

		this.button.enable();
	},

	// ### Disable
	disable () {
		this.setProperties({
			disabled: true
		});

		if (this.rendered) {
			this.elements.dropdown.addClass('slds-hide');
		}

		this.button.disable();
	},

	// ### Reset Width
	_resetWidth (width) {
		if (this.rendered) {
			this.elements.button.width(width);
			this.elements.dropdownMenu.width(width);
		}
	},

	// ### Handle Clicked
	_handleClicked (e) {
		e.stopPropagation();
		Openable.toggle(this, e.originalEvent);
	},

	// ### Handle Menu Item Selected
	_handleMenuItemSelected (e) {
		e.preventDefault();
		e.stopPropagation();

		const $a = $(e.currentTarget);
		const $li = $a.parent('li');

		if (!$li.prop('disabled')) {
			this.setSelection($li.data('item'));
			Openable.close(this);
			Lib.returnFocusToPopupTrigger(this);
		}
	},

	// ### Handle Key Down
	// The `keydown` event is best used to catch non-character key events.
	//
	// The `which` event object key is the standardized IE9+ (and the rest)
	// for reporting key codes.
	_handleKeyDown (e) {
		const keyNumber = e.which;

		if (KeyNumber.UP === keyNumber ||
				KeyNumber.DOWN === keyNumber) {
			this._focusOnItemFromKeyEvent(e, KeyNumber[keyNumber]);
		} else if (KeyNumber.ESCAPE === keyNumber) {
			Openable.close(this);
		}
	},

	// ### Handle Key Pressed
	// The `keypress` event is typically triggered after `keydown` by only
	// character keys (A,B,C...).
	//
	// The `which` event object key is the standardized IE9+ (and the rest)
	// for reporting key codes.
	_handleKeyPressed (e) {
		const keyCharacter = String.fromCharCode(e.which);

		if (keyCharacter && keyCharacter.length === 1) {
			this._focusOnItemFromKeyEvent(e, keyCharacter);
		}
	},

	// ### Focus On Item From Key Event
	_focusOnItemFromKeyEvent (e, key) {
		const focusedIndex = KeyboardNavigable.keyboardNav(this, key, this.setSelection, this._collection);

		e.preventDefault();
		if (focusedIndex !== undefined) {
			document.getElementById(this._getMenuItemId(focusedIndex)).getElementsByTagName('a')[0].focus();
		}
	},

	// ### Add Checkmark
	_addCheckmark (elements) {
		const selectedIndex = this._collection.indexOf(this._getSelection());
		const $li = elements.dropdownMenu.find('#' + this._getMenuItemId(selectedIndex));

		if ($li) {
			$li.parent().find('.slds-is-selected').removeClass('slds-is-selected');

			$li.addClass('slds-is-selected');
		}
	},

	// ### Get Selection
	_getSelection () {
		let item = this._collection.findWhere(this.getProperty('selection'));

		if (!item) {
			item = this._getItemAdapter(this.getProperty('selection'));
		}

		return item;
	},

	// ### On Select
	_onSelect (itemsToSelect, selection) {
		const item = selection.at(0);

		this.setProperties({ selection: item });

		this.trigger('selected', item);
		this.trigger('changed', item);

		this._onChanged();
	},

	// ### On Deselect
	_onDeselect () {
		this.setProperties({ selection: undefined });

		this.trigger('deselected');
		this.trigger('changed');

		this._onChanged();
	},

	// ### On Changed
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

	// ### Set Selection
	setSelection (item) {
		Multiselectable.selectItem(this, item);
	}
};

// SLDS for jQuery **extends objects** by merging them together, rather than
// via the prototype chain or imitation of object-oriented inheritance.
// The important thing to remember is that _some methods will be available 
// to the component which are not declared in this file_.

// These are not magic methods, they're not black box methods, but you do need
// to trace the dependencies of the component to see where they are coming
// from. In particular, Picklist extends its [core](../../core/picklist.html),
// which in turn extends the base component.

Lib.merge(Picklist.prototype, PicklistCore, Events, DOM, State, Svg, PicklistObject);

// ### Run the helpers

// `Helpers` are a feature of SLDS for jQuery that allows anyone to register code that
// can manipulate the component before it is encapsulated in a React class.
//
// This allows flexibility for adding custom behavior without modifying the
// original source, or for adding optional behavior.
//
// For example, SLDS for jQuery uses this mechanism to optionally create
// jQuery plug-in versions of each component. Nothing in the component itself
// should ever depend on the presence of helpers, as they are completely
// optional.

Picklist = Lib.runHelpers('jquery', CONTROL, Picklist);

export default Picklist;
