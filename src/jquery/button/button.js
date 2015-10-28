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
	const options = this._getOptions(arguments);
	
	// If button has views, button is stateful
	if (options.views.length > 0) {
		options.views = options.views.map((child) => {
			return Lib.extend({}, options, child);
		});
	}
	
	this._initialize(options);
};

export const ButtonObject = {
	_bindUIEvents () {
		this.element.on('click', $.proxy(this._handleClick, this));
	},

	_renderViews () {
		const viewOptions = this.getProperty('views');
		const views = [];

		if (viewOptions.length > 0) {
			this.setProperties({
				view: 'notSelected'
			});
		}

		let $buttonview = new ButtonView(this._props);

		views.push($buttonview.render());

		// Other views
		if (viewOptions.length > 0 ) {
			viewOptions.forEach((options) => {
				$buttonview = new ButtonView(options);
				views.push($buttonview.render());
			});
		}

		return views;
	},

	_render () {
		const isStateful = this.getProperty('views').length > 0;
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
		const isStateful = this.getProperty('views').length > 0;
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

Lib.merge(Button.prototype, ButtonCore, Events, DOM, State, ButtonObject);
Button = Lib.runHelpers('jquery', CONTROL, Button);

export default Button;
