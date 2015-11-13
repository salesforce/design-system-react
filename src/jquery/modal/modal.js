// MODAL CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import ModalCore, {CONTROL} from '../../core/modal';

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

		this.setProperties(DefaultRenderers);

		this._initElements();
	},

	_initElements () {
		this.elements.modal = this.element.find('.' + this.cssClasses.MODAL);
		this.elements.backdrop = this.element.find('.' + this.cssClasses.BACKDROP);
	},

	_bindUIEvents () {
		this.element.on('click', $.proxy(this._clickOutClose, this));
	},

	_render () {
		const props = this.getProperties();
		const $content = this.elements.wrapper.contents().detach();

		this.element.find('.' + this.cssClasses.HEAD).append(props.renderHeader({
			headerTitle: props.headerTitle,
			headerTagline: props.headerTagline,
			closeClicked: $.proxy(this.close, this)
		}));

		this.element.find('.' + this.cssClasses.FOOT).append(props.renderFooter({
			primaryText: props.primaryBtnText,
			secondaryText: props.secondaryBtnText,
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
		const isOpen = this.getProperty('isOpen');

		if (isOpen) {
			this.close();
		} else {
			this.open();
		}
	},

	open () {
		this.elements.modal.addClass(this.cssClasses.OPEN);
		this.elements.backdrop.addClass(this.cssClasses.OPENBACKDROP);
		this.setProperties({
			isOpen: true
		});
	},

	close () {
		this.elements.modal.removeClass(this.cssClasses.OPEN);
		this.elements.backdrop.removeClass(this.cssClasses.OPENBACKDROP);
		this.setProperties({
			isOpen: false
		});
	},

	_clickOutClose (e) {
		if (this.backgroundClicked(e.target)) {
			this.close();
		}
	}
});

Modal = Lib.runHelpers('jquery', CONTROL, Modal, {});

export default Modal;
