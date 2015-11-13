// MODAL CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import ModalCore, {CONTROL} from '../../core/modal';

// Framework Specific
import DOM from '../dom';
import Events from '../events';
import State from '../state';

const $ = Lib.global.jQuery || Lib.global.$;

// children
import Button from '../button/button';

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
		const strings = this.getState('strings');

		this.elements.modal = this.element.find('.' + this.cssClasses.MODAL);
		this.elements.header = this.element.find('.' + this.cssClasses.HEADER);
		this.elements.backdrop = this.element.find('.' + this.cssClasses.BACKDROP);

		this.closeButton = new Button({
			assistiveText: strings.CLOSE,
			icon: 'utility.close',
			iconSize: 'large',
			iconStyle: 'icon-inverse'
		});
		this.closeButton.element.addClass(this.cssClasses.CLOSE);
		this.closeButton.replaceAll(this.elements.modal.find('x-close-button')[0]);

		this.secondaryButton = new Button({
			theme: 'neutral'
		});
		this.secondaryButton.replaceAll(this.elements.modal.find('x-secondary-button')[0]);

		this.primaryButton = new Button({
			theme: 'brand'
		});
		this.primaryButton.replaceAll(this.elements.modal.find('x-primary-button')[0]);
	},

	_bindUIEvents () {
		this.closeButton.on('click', $.proxy(this.close, this));
		this.secondaryButton.on('click', $.proxy(this._onSecondaryClicked, this));
		this.primaryButton.on('click', $.proxy(this._onPrimaryClicked, this));
	},

	_render () {
		const secondaryText = this.getProperty('secondaryButtonText');
		const primaryText = this.getProperty('primaryButtonText');
		const $content = this.elements.wrapper.contents().detach();
		const $headerText = this.elements.header.find('h2');
		$headerText.addClass(this.headerTextSize[this.getProperty('headerTextSize')]);
		$headerText.text(this.getProperty('headerText'));

		this.secondaryButton.renderView({
			text: secondaryText
		});

		this.primaryButton.renderView({
			text: primaryText
		});

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
