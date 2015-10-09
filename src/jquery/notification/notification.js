// NOTIFICATION CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import NotificationCore, {CONTROL} from '../../core/notification';

// Framework specific
import Events from '../events';
import State from '../state';

const $ = Lib.global.jQuery || Lib.global.$;

// Template imports
import template from './template';

// Constructor
let Notification = function Notification (element, options) {
	this.options = Lib.extend(NotificationCore._defaultProperties, options);

	this.elements = {
		wrapper: $(element)
	};

	this._initializeState();
	this._initialize(this.options);
};

export const NotificationObject = {
	_onInitialized () {
		this._render();
		this.trigger('initialized');
	},

	_render () {
		// load template
		const $html = $(template);

		// replace notification text
		$html.find('.notify-text').text(this.getProperty('text'));

		// render
		this.elements.wrapper.html($html[0]);

		// hookup events
		this.elements.wrapper.find('.slds-notify__close').on('click', $.proxy(this.hide, this));
	},

	show: function () {
		this.elements.wrapper.find('.slds-notify').removeClass('slds-hide');
	},

	hide: function () {
		this.elements.wrapper.find('.slds-notify').addClass('slds-hide');
	}

};

Lib.merge(Notification.prototype, NotificationCore, Events, State, NotificationObject);
Notification = Lib.runHelpers('jquery', CONTROL, Notification);

export default Notification;
