// PILLBOX CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import PillboxCore, {CONTROL} from '../../core/pillbox';

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
	_initializer () {
		this.element = this.$el = this.elements.control = this.template.clone();
		this.elements.group = this.element.find('.slds-pill-group');
		this.elements.pillTemplate = this.elements.group.find('.slds-pill').remove();
	},
	
	_bindUIEvents () {
		this.element.on('click.fu.tree', '.slds-pill > .slds-button', $.proxy(this._itemClicked, this));
	},

	_render () {
		this._renderSelection();
		
		return this.element;
	},
	
	_onRendered () {
		this._bindUIEvents();
	},

	_onEnabledOrDisabled (props) {
		this.element.toggleClass(this.cssClasses.DISABLED, props.disabled);
	},

	_itemClicked (e) {
		const item = $(e.currentTarget).parent().data('item');

		if (!this.getProperty('disabled')) {
			this.deselectItem(item);
		}
	},

	_onDeselected () {
		this._renderSelection();
	},

	_renderPill (pill) {
		const strings = this.getState('strings');
		const $pill = this.elements.pillTemplate.clone();

		// TODO: Fix this so that it doesn't flicker. Even if that means ditching the button control and going back to hardcoded html
		this.button = new Button({
			assistiveText: strings.REMOVE,
			icon: 'action.close',
			iconStyle: 'icon-bare'
		});
		this.button.replaceAll($pill.find('x-remove-button')[0]);
		$pill.button = this.button.element;

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

		this.elements.group.empty();
		this.elements.group.prepend(elements);
	}
});

Pillbox = Lib.runHelpers('jquery', CONTROL, Pillbox);

export default Pillbox;
