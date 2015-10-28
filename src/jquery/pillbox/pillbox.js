// PILLBOX CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import PillboxCore, {CONTROL} from '../../core/pillbox';

// Framework Specific
import DOM from '../dom';
import Events from '../events';
import State from '../state';

const $ = Lib.global.jQuery || Lib.global.$;

// Template imports
import template from './pillbox-template';

let Pillbox = function Pillbox () {
	const options = this._getOptions(arguments);
	
	const $html = $('<i />').append(template);
	this.template = $html.find('.' + this.cssClasses.CONTROL);
	
	this._initialize(options);
};

Lib.merge(Pillbox.prototype, PillboxCore, Events, DOM, State, {
	_bindUIEvents () {
		this.element.on('keyup.fu.tree', '.slds-pill-add-item', $.proxy(this._keyUp, this));
		this.element.on('click.fu.tree', '.slds-pill > .slds-button', $.proxy(this._itemClicked, this));
	},

	_render () {
		// Load template
		const $el = this.element = this.$el = this.elements.control = this.template.clone();

		this.elements.group = $el.find('.slds-pill-group');
		this.elements.input = $el.find('.slds-pill-add-item');
		this.elements.inputWrap = $el.find('.slds-pill-input-wrap');
		this.elements.pillTemplate = this.elements.group.find('.slds-pill').remove();

		this._renderSelection();
	},
	
	_onRendered () {
		this._bindUIEvents();
	},

	_keyUp (e) {
		let inputValue;

		if (this._isAcceptKeyCode(e.keyCode)) {
			inputValue = this.elements.input.val();

			// If commas are an accepted keycode clean inputValue of commas
			if (e.keyCode === 188 && this._isAcceptKeyCode(188)) {
				inputValue = inputValue.replace(/[ ]*\,[ ]*/, '');
			}

			// TODO: This will need to be updated when typeahead feature is added
			// TODO: This won't really work with data accessors other than vanilla js
			this.selectItem({
				text: inputValue,
				value: inputValue
			});
			
			this._clearInput();
		}
	},

	// TODO: Do we still need this part for SLDS? I don't want to lose the code but I also don't want things to be over-complicated
	_onAdd (newSelection) {
		return new Promise((resolve) => {
			const onAdd = this.getProperty('onAdd');
			
			if (Lib.isFunction(onAdd)) {
				onAdd([newSelection._item], (itemsToSelect) => {
					resolve(itemsToSelect);
				});
			} else {
				resolve();
			}
		});
	},

	_onRemove (newDeselection) {
		return new Promise((resolve) => {
			const onRemove = this.getProperty('onRemove');
			
			if (onRemove) {
				onRemove([newDeselection._item], (itemsToDeselect) => {
					resolve(itemsToDeselect);
				});
			} else {
				resolve();
			}
		});
	},

	_onEnabledOrDisabled (props) {
		this.element.toggleClass(this.cssClasses.DISABLED, props.disabled);
		this.elements.inputWrap.toggle(!props.disabled);
	},

	_itemClicked (e) {
		const item = $(e.currentTarget).parent().data('item');

		if (!this.getProperty('disabled')) {
			this.deselectItem(item);
		}
	},

	_clearInput () {
		this.elements.input.val('');
	},

	_onSelected () {
		this._renderSelection();
	},

	_onDeselected () {
		this._renderSelection();
	},

	_renderPill (pill) {
		const $pill = this.elements.pillTemplate.clone();

		$pill.find('.slds-pill__label').text(pill.getText());
		$pill.data({
			item: pill.get()
		});

		return $pill;
	},

	_renderSelection () {
		const self = this;
		const elements = [];

		this._getSelectedItems().forEach(function (pill) {
			elements.push(self._renderPill(pill));
		});

		this.elements.group.find('.slds-pill').remove();
		this.elements.group.prepend(elements);
	}
});

const legacyMethods = {
	addItems (index, items) {
		const baseZeroIndex = (index - 1);

		this.selectItems(items, baseZeroIndex);

		return this.elements.wrapper;
	},

	removeItems (index, count) {
		const selection = this._getSelectedItems().get();
		const baseZeroIndex = (index - 1);

		this.deselectItems(selection.slice(baseZeroIndex, baseZeroIndex + count));

		return this.elements.wrapper;
	},

	items () {
		const selection = this._getSelectedItems();

		return selection.get();
	},

	itemCount () {
		const selection = this._getSelectedItems();

		return selection.get().length;
	},

	readonly () {
		this.disable();
	},

	removeBySelector ($item) {
		const item = $item.data('item');

		this.deselectItem(item);

		return this.elements.wrapper;
	},

	removeByText (text) {
		const selection = this._getSelectedItems().get();

		selection.forEach( (item) => {
			if (item.text === text) {
				this.deselectItem(item);
			}
		});

		return this.elements.wrapper;
	},

	removeByValue (value) {
		const selection = this._getSelectedItems().get();

		selection.forEach( (item) => {
			if (item.value === value) {
				this.deselectItem(item);
			}
		});

		return this.elements.wrapper;
	}
};

Pillbox = Lib.runHelpers('jquery', CONTROL, Pillbox, {
	legacyMethods
});

export default Pillbox;
