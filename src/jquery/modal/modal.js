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
		// this.elements.button = this.element.find('.' + this.cssClasses.TOGGLE);
		// this.elements.label = this.elements.button.find('.' + this.cssClasses.LABEL);
	},

	_bindUIEvents () {
		// this.elements.button.on('click', $.proxy(this._handleClicked, this));
	},

	_render () {
		// append elements here

		return this.element;
	},

	_onRendered () {
		this._bindUIEvents();
	}
});

Modal = Lib.runHelpers('jquery', CONTROL, Modal, {});

export default Modal;
