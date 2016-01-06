// PILLBOX CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import PillboxCore, {CONTROL} from '../../core/pillbox';

// Traits
import Eventable from '../../traits/eventable';
import Multiselectable from '../../traits/multiselectable';

// Framework Specific
import DOM from '../dom';
import Events from '../events';
import State from '../state';
const $ = Lib.global.jQuery || Lib.global.$;

// children
import Button from '../button/button';

// Template imports
import template from './pillbox-template';

let Pillbox = function Pillbox () {
	const options = this._getOptions(arguments);
	
	this.template = $(template);
	
	this._initialize(options);
};

Lib.merge(Pillbox.prototype, PillboxCore, Events, DOM, State, {
	cssClasses: {
		DISABLED: 'slds-disabled'
	},
	
	_initializer () {
		this.element = this.$el = this.elements.control = this.template.clone();
		this.elements.group = this.element.find('.slds-pill-group');
		this.elements.pillTemplate = this.elements.group.find('.slds-pill').remove();
		
		Eventable.on(this, 'select', this._onSelect, this);
		Eventable.on(this, 'deselect', this._onDeselect, this);
	},
	
	_bindUIEvents () {
		this.element.on('click.fu.tree', '.slds-pill > .slds-button', this._itemClicked.bind(this));
	},

	_render () {
		const strings = this.getState('strings');
		
		// TODO: Now that string rendering has been updated this should work fine, but further analysis may be required to ensure that is the case
		this.elements.button = new Button({
			assistiveText: strings.REMOVE,
			icon: 'action.close',
			iconStyle: 'icon-bare'
		}).element;
		
		this._renderSelection();
		
		return this.element;
	},
	
	_onRendered () {
		this._bindUIEvents();
	},

	enable () {
		this.setProperties({
			disabled: false
		});

		if (this.rendered) {
			this.elements.toggleClass(this.cssClasses.DISABLED, false);
		}
	},

	disable () {
		this.setProperties({
			disabled: true
		});

		if (this.rendered) {
			this.element.toggleClass(this.cssClasses.DISABLED, true);
		}
	},

	_itemClicked (e) {
		const item = $(e.currentTarget).parent().data('item');

		if (!this.getProperty('disabled')) {
			Multiselectable.deselectItem(this, item, this.getProperty('selection'));
		}
	},

	selectPill (item, index) {
		Multiselectable.selectItem(this, item, this.getProperty('selection'), index);
	},
	
	selectPills (items, index) {
		Multiselectable.selectItems(this, items, this.getProperty('selection'), index);
	},

	_onSelect (itemsToSelect, selection) {
		this.setProperties({ selection: selection._data });
	
		this.trigger('selected', itemsToSelect, selection._data);
		this.trigger('changed', itemsToSelect, selection._data);
	},
	
	_onDeselect (itemsToDeselect, selection) {
		this.setProperties({ selection: selection._data });
		this._renderSelection();
	
		this.trigger('deselected', itemsToDeselect, selection._data);
		this.trigger('changed', itemsToDeselect, selection._data);
	},

	_renderPill (pill) {
		const $pill = this.elements.pillTemplate.clone();

		$pill.button = this.elements.button.clone();
		$pill.find('x-remove-button').replaceWith($pill.button);

		$pill.find('.slds-pill__label').text(pill.getText());
		$pill.data({
			item: pill.get()
		});

		return $pill;
	},

	// TODO: Fix this so that it doesn't flicker when a pill is removed
	_renderSelection () {
		const self = this;
		const elements = [];
		const selection = this._getDataAdapter(this.getProperty('selection'));

		selection.forEach(function (pill) {
			elements.push(self._renderPill(pill));
		});

		this.elements.group.empty();
		this.elements.group.prepend(elements);
	}
});

Pillbox = Lib.runHelpers('jquery', CONTROL, Pillbox);

export default Pillbox;
