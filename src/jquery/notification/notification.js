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

	// TODO: Internationalize
	_render () {
		const classNames = this._getClassNames();

		// load template
		const $component = $(template);

		// update theme
		$component.addClass(classNames);

		// replace notification text
		// TODO: Should this also use the contents of the original? It's different in jQuery becasue in React 'Children' is actually just another prop
		$component.find('.notify-text').text(this.getProperty('text'));

		// render
		this.elements.wrapper.html($component[0]);

		// hookup events
		this.elements.wrapper.find('.slds-notify__close').on('click', $.proxy(this.hide, this));
	},
	
	_onShow: function () {
		this.elements.wrapper.find('.slds-notify').removeClass(this.cssClasses.HIDDEN);
	},

	_onHide: function () {
		this.elements.wrapper.find('.slds-notify').addClass(this.cssClasses.HIDDEN);
	}
};

Lib.merge(Notification.prototype, NotificationCore, Events, State, NotificationObject);
Notification = Lib.runHelpers('jquery', CONTROL, Notification);

export default Notification;
