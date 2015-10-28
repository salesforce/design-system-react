// NOTIFICATION CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import NotificationCore, {CONTROL} from '../../core/notification';

// Framework specific
import DOM from '../dom';
import Events from '../events';
import State from '../state';

const $ = Lib.global.jQuery || Lib.global.$;

// Template imports
import template from './template';

// Constructor
let Notification = function Notification () {
	const options = this._getOptions(arguments);
	
	this.template = $(template);
	
	this._initialize(options);
};

export const NotificationObject = {
	// TODO: Internationalize
	// TODO: The patterns here are a little different than the rest of our controls
	_render () {
		const classNames = this._getClassNames();

		// Load template
		const $el = this.element = this.$el = this.elements.control = this.template.clone();

		// Update theme
		$el.addClass(classNames);

		// Replace notification text
		// TODO: Should this also use the contents of the original? It's different in jQuery becasue in React 'Children' is actually just another prop
		$el.find('.notify-text').text(this.getProperty('text'));

		// Events
		$el.find('.slds-notify__close').on('click', $.proxy(this.hide, this));
	},
	
	_onShow: function () {
		this.element.removeClass(this.cssClasses.HIDDEN);
	},

	_onHide: function () {
		this.element.addClass(this.cssClasses.HIDDEN);
	}
};

Lib.merge(Notification.prototype, NotificationCore, Events, DOM, State, NotificationObject);
Notification = Lib.runHelpers('jquery', CONTROL, Notification);

export default Notification;
