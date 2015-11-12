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

	_initElements () {
		this.elements.modal = this.element.find('.' + this.cssClasses.MODAL);
		this.elements.backdrop = this.element.find('.' + this.cssClasses.BACKDROP);
		this.elements.close = this.element.find('.' + this.cssClasses.CLOSE);
		this.elements.primaryBtn = this.element.find('.' + this.cssClasses.PRIMARYBTN);
		this.elements.secondaryBtn = this.element.find('.slds-button--neutral:eq(0)');
	},

	_bindUIEvents () {
		this.elements.close.on('click', $.proxy(this.close, this));
		this.elements.secondaryBtn.on('click', $.proxy(this._onSecondaryClicked, this));
		this.elements.primaryBtn.on('click', $.proxy(this._onPrimaryClicked, this));
	},

	_render () {
		const secondaryText = this.getProperty('secondaryBtnText');
		const primaryText = this.getProperty('primaryBtnText');
		const $content = this.elements.wrapper.contents().detach();

		this.elements.secondaryBtn.html(secondaryText);
		this.elements.primaryBtn.html(primaryText);
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
	}
});

Modal = Lib.runHelpers('jquery', CONTROL, Modal, {});

export default Modal;
