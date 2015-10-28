// BUTTON CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import ButtonCore, {CONTROL} from '../../core/button';

// Framework specific
import DOM from '../dom';
import Events from '../events';
import State from '../state';

// Children
import ButtonView from './button-view';

const $ = Lib.global.jQuery || Lib.global.$;

// Constructor
let Button = function Button () {
	let wrapper;
	let options;
	
	if (arguments.length === 1) {
		options = arguments[0];
	} else if (arguments.length > 1) {
		wrapper = $(arguments[0]);
		options = arguments[1];
	}
	
	this.options = Lib.extend({}, this._defaultProperties, options, {
		wrapper
	});

	// If button has views, button is stateful
	if (this.options.views.length > 0) {
		this.options.views = this.options.views.map((child) => {
			return Lib.extend({}, this.options, child);
		});
	}

	this._initializeState();
	this._initialize(this.options);
};

export const ButtonObject = {
	_bindUIEvents () {
		this.element.on('click', $.proxy(this._handleClick, this));
	},

	_renderViews () {
		const views = [];

		if (this.options.views.length > 0) {
			this.options.view = 'notSelected';
		}

		let $buttonview = new ButtonView(this.options);

		views.push($buttonview.render());

		// other views
		if (this.options.views.length > 0 ) {
			this.options.views.forEach((viewOptions) => {
				$buttonview = new ButtonView(viewOptions);
				views.push($buttonview.render());
			});
		}

		return views;
	},

	_render () {
		const isStateful = this.options.views.length > 0;
		const className = this._getClassNames(isStateful);
		
		this.element = this.$el = this.elements.control = $('<button>');

		this.element
			.addClass(className)
			.append(this._renderViews())
			.prop('disabled', this.getProperty('disabled'));
		
		return this.element;
	},
	
	_onRendered () {
		this._bindUIEvents();
	},

	_handleClick () {
		this.toggle();
	},

	_onToggled () {
		const isStateful = this.options.views.length > 0;
		this.elements.control[0].className = this._getClassNames(isStateful);
	},

	_onEnabledOrDisabled () {
		if ( this.getProperty('disabled') ) {
			this.elements.control.attr('disabled', 'disabled');
		} else {
			this.elements.control.removeAttr('disabled');
		}
	}
};

Lib.merge(Button.prototype, ButtonCore, State, Events, DOM, ButtonObject);
Button = Lib.runHelpers('jquery', CONTROL, Button);

export default Button;
