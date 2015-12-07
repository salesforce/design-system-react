// MODAL CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import ModalCore, {CONTROL} from '../../core/modal';

// Traits
import Openable from '../../traits/openable';

// Framework Specific
import DOM from '../dom';
import Events from '../events';
import State from '../state';

const $ = Lib.global.jQuery || Lib.global.$;

// Template imports
import template from './modal-template';

// Provides the default renderers for the header, and the footer.
import DefaultRenderers from './modal-default-renderers';

let Modal = function Modal () {
	const options = this._getOptions(arguments);

	this.template = $(template);

	this._initialize(options);
};

Lib.merge(Modal.prototype, ModalCore, Events, DOM, State, {
	_initializer () {
		this.element = this.$el = this.elements.control = this.template.clone();

		this._initElements();
	},

	_setDefaultProperties () {
		this.setProperties(DefaultRenderers);
	},

	_initElements () {
		this.elements.modal = this.element.find('.' + this.cssClasses.MODAL);
		this.elements.header = this.element.find('.' + this.cssClasses.HEADER);
		this.elements.backdrop = this.element.find('.' + this.cssClasses.BACKDROP);
	},

	_bindUIEvents () {
		this.element.on('click', $.proxy(this._clickOutClose, this));
	},

	_render () {
		const $content = this.elements.wrapper.contents().detach();
		const $headerText = this.elements.header.find('h2');
		$headerText.addClass(this.headerTextSize[this.getProperty('headerTextSize')]);
		$headerText.text(this.getProperty('headerText'));

		this.element.find('.' + this.cssClasses.HEAD).append(this._props.renderHeader({
			headerTitle: this._props.headerText,
			headerTextSize: this._props.headerTextSize,
			headerTagline: this._props.headerTagline,
			closeClicked: Openable.close.bind(this)
		}));

		this.element.find('.' + this.cssClasses.FOOT).append(this._props.renderFooter({
			primaryText: this._props.primaryButtonText,
			secondaryText: this._props.secondaryButtonText,
			primaryClicked: $.proxy(this._onPrimaryClicked, this),
			secondaryClicked: $.proxy(this._onSecondaryClicked, this)
		}));

		this.element.find('.' + this.cssClasses.CONTENT).append($content);

		return this.element;
	},

	_onRendered () {
		this._bindUIEvents();
	},

	_onPrimaryClicked () {
		this.element.trigger('primary');
	},

	_onSecondaryClicked () {
		this.element.trigger('secondary');
	},

	toggle () {
		Openable.toggle.call(this);
	},

	open () {
		Openable.open.call(this);
	},

	close () {
		Openable.close.call(this);
	},
	
	_onOpened () {
		this.elements.modal.addClass(this.cssClasses.OPEN);
		this.elements.backdrop.addClass(this.cssClasses.OPENBACKDROP);
	},
	
	_onClosed () {
		this.elements.modal.removeClass(this.cssClasses.OPEN);
		this.elements.backdrop.removeClass(this.cssClasses.OPENBACKDROP);
	},

	_clickOutClose (e) {
		if (this.backgroundClicked(e.target)) {
			Openable.close.call(this);
		}
	}
});

Modal = Lib.runHelpers('jquery', CONTROL, Modal, {});

export default Modal;
