// PILLBOX CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import PillboxCore, {CONTROL} from '../../core/pillbox';

// Framework Specific
import Events from '../events';
import State from '../state';

const $ = Lib.global.jQuery || Lib.global.$;

// Template imports
import template from './pillbox-template';

let Pillbox = function Pillbox (element, options) {
	this.options = Lib.extend({}, options);

	this.elements = {
		wrapper: $(element)
	};

	const $html = $('<i />').append(template);
	this.template = $html.find('.' + this.cssClasses.CONTROL);

	this._initializeState();
	this._initialize(this.options);
};

Lib.merge(Pillbox.prototype, PillboxCore, Events, State, {
	_onInitialized () {
		this.elements.wrapper.on('keyup.fu.tree', '.pillbox-add-item', $.proxy(this._inputKeyUp, this));
		this.elements.wrapper.on('click.fu.tree', '.pill-group > .pill', $.proxy(this._itemClicked, this));

		this._render();

		this.trigger('initialized');
	},

	_render () {
		const $el = this.template.clone();

		this.elements.group = $el.find('.pill-group');
		this.elements.input = $el.find('.pillbox-add-item');
		this.elements.pillTemplate = this.elements.group.find('.pill').remove();

		this._renderSelection();

		// Prep for append
		this.elements.wrapper.empty();
		this.elements.wrapper.append($el);
	},

	_inputKeyUp (e) {
		if (e.keyCode === 13) {
			this.selectItem({
				text: this.elements.input.val()
			});
			
			this._clearInput();
		}
	},

	_itemClicked (e) {
		const item = $(e.currentTarget).data('item');

		this.deselectItem(item);
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

		$pill.find('.pill-name').text(pill.getText());
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

		this.elements.group.find('.pill').remove();
		this.elements.group.prepend(elements);
	}
});

Pillbox = Lib.runHelpers('jquery', CONTROL, Pillbox, {});

export default Pillbox;
