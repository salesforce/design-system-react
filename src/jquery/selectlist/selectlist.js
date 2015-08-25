// SELECTLIST CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../core/lib';
import SelectlistCore, {CONTROL} from '../../core/selectlist';

// Framework specific
import createPlugin from '../createPlugin';
import Events from '../events';
import State from '../state';

const $ = Lib.global.jQuery || Lib.global.Zepto || Lib.global.ender || Lib.global.$;

// Template imports
const fs = require('fs');

const Selectlist = function Selectlist (element, options) {
	this.options = Lib.extend({}, options);
	this.elements = {
		wrapper: $(element)
	};

	if (this.options.collection) {
		this.rendered = false;
	}
	
	this._initializeState();
	this._initialize(this.options);
};

function _renderItem (item) {
	const disabled = item.getDisabled();
	let $a;
	let $li;

	$a = $('<a href="#" tabIndex="-1" className="slds-truncate" />');
	$a.text(item.getText());

	$li = $('<li class="slds-dropdown__item slds-has-icon--left slds-dropdown__item has-icon--left" role="menuitem option" tabIndex="0" />');
	$li.data(item.get());
	$li.toggleClass(this.cssClasses.DISABLED, disabled);
	$li.prop('disabled', disabled);
	$li.append($a);

	return $li;
}

function _renderHeader (item) {
	const $li = $('<li class="slds-dropdown__header"></li>');
	
	const $span = $('<span class="slds-text-heading--label"></span>');
	$span.text(item.getText());
	$li.append($span);

	return $li;
}

function _renderDivider () {
	const $li = $('<li class="slds-dropdown__header"> - </li>');

	return $li;
}

function _render () {
	// Prep for append
	this.elements.wrapper.empty();
	this.elements.wrapper.toggleClass(this.cssClasses.CONTROL, true);

	const selection = this._getSelection();
	const disabled = !!this.getProperty('disabled');
	const selectionName = selection.getText() || this.strings.NONE_SELECTED;
	const $html = $('<i />').append(fs.readFileSync(__dirname + '/selectlist.html', 'utf8'));
	const elements = this._initElements($html, this.elements);

	elements.button.prop('disabled', disabled);
	elements.button.toggleClass(this.cssClasses.DISABLED, disabled);
	elements.label.text(selectionName);
	elements.srOnly.text(this.strings.TOGGLE_DROPDOWN);
	
	this._onExpandOrCollapse();

	// Building the menu items
	this._collection.forEach(item => {
		let $li;
		let func;
		const funcMap = {
			header: _renderHeader,
			divider: _renderDivider,
			item: _renderItem
		};

		func = funcMap[item.getType()] || _renderItem;

		$li = func.call(this, item);

		elements.dropdownMenu.append($li);
	});

	this.elements.wrapper.append($html.children());

	this.rendered = true;
}

Lib.merge(Selectlist.prototype, SelectlistCore, Events, State, {
	_initElements (base, elements) {
		const els = elements || {};

		els.button = base.find('button.slds-picklist__label');
		els.label = els.button.find('span');
		els.menuWrapper = base.find('.slds-dropdown--menu');
		els.dropdownMenu = els.menuWrapper.find('.slds-dropdown__list');
		els.srOnly = base.find('.' + this.cssClasses.SR_ONLY);

		return els;
	},

	_onInitialized () {
		if (!this.rendered) {
			_render.call(this);
		}

		this.elements.wrapper.on('click.fu.selectlist', 'button.slds-picklist__label', $.proxy(this._handleClicked, this));
		this.elements.wrapper.on('click.fu.selectlist', '.slds-dropdown__list a', $.proxy(this._handleItemClicked, this));
		this.elements.wrapper.on('keypress.fu.selectlist', $.proxy(this._handleKeyPress, this));
		
		this._closeMenu = $.proxy(this._closeMenu, this);
		document.addEventListener('click', this._closeMenu, false);
	},

	destroy () {
		document.removeEventListener('click', this._closeMenu, false);
		this.elements.wrapper.remove();
		return this.elements.wrapper[0].outerHTML;
	},
	
	_onExpandOrCollapse () {
		const isOpen = this.getState('isOpen');
		
		this.elements.button.prop('aria-expanded', isOpen);
		this.elements.menuWrapper.toggleClass(this.cssClasses.HIDDEN, !isOpen);
		this.elements.button.prop('hidden', !isOpen);
	},

	_onSelected (item) {
		if (!this.elements.label) {
			return;
		}
		
		this.elements.label.text(item.getText() || this.strings.NONE_SELECTED);
	},

	_onEnabled () {
		this.elements.wrapper.toggleClass(this.cssClasses.DISABLED, false);
		
		if (this.elements.button) {
			this.elements.button.prop('disabled', false);
			this.elements.button.toggleClass(this.cssClasses.DISABLED, false);
		}
	},

	_onDisabled () {
		this.elements.wrapper.toggleClass(this.cssClasses.DISABLED, true);
		
		if (this.elements.button) {
			this.elements.button.prop('disabled', true);
			this.elements.button.toggleClass(this.cssClasses.DISABLED, true);
		}
	},
	
	_closeMenu (e) {
		if (e.originator !== this) {
			this.setState({
				isOpen: false
			});
			
			this._onExpandOrCollapse();
		}
	},
	
	_handleClicked (e) {
		const disabled = !!this.getProperty('disabled');
		e.originalEvent.originator = this;
		
		if (!disabled) {
			this.setState({
				isOpen: !this.getState('isOpen')
			});
			
			this._onExpandOrCollapse();
		}
	},

	_handleItemClicked (e) {
		e.preventDefault();

		const $a = $(e.currentTarget);
		const $li = $a.parent('li');

		if (!$li.hasClass(this.cssClasses.DISABLED)) {
			this.setSelection($li.data());
		}
	},

	_handleKeyPress (e) {
		const key = e.which;

		if (key) this._jumpToLetter(key);
	}
});

// LEGACY METHODS

const legacyMethods = {
	selectedItem () {
		let selection = this.getSelection();

		if (selection) {
			if (Lib.isFunction(selection.toJSON)) {
				selection = selection.toJSON();
			} else {
				selection = Lib.extend({}, selection);
			}

			selection.selected = true;
			delete selection._itemType;
		}

		return selection;
	},

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
		return this.setSelection($item.data());
	},

	selectByIndex (index) {
		let i = index;

		if (!Lib.isNumber(i)) {
			i = parseInt(index, 10);
		}
		return this.setSelectionByIndex(i);
	}
};

createPlugin(CONTROL, Selectlist, legacyMethods);

export default Selectlist;
