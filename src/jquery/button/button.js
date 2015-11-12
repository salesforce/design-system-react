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

	this.childOptions = {
		icon: options.icon,
		iconPosition: options.iconPosition,
		iconSize: options.iconSize,
		iconStyle: options.iconStyle,
		text: options.text,
		truncate: options.truncate
	};
	
	// If button has views, button is stateful
	if (options.views.length > 0) {
		options.views = options.views.map((child) => {
			return Lib.extend({}, this.childOptions, child);
		});
	}
	
	this._initialize(options);
};

export const ButtonObject = {
	_initializer () {
		this.element = this.$el = this.elements.control = $('<button>');
	},

	_bindUIEvents () {
		this.element.on('click', $.proxy(this._handleClick, this));
	},

	_renderViews () {
		const viewOptions = this.getProperty('views');
		const viewElements = [];

		const childOptions = Lib.extend({
			assistiveText: this.getProperty('assistiveText')
		}, this.childOptions);
		
		if (viewOptions.length > 0) {
			childOptions.view = 'notSelected';
		}

		let $buttonview = new ButtonView(childOptions);
		viewElements.push($buttonview.element);

		// Other views
		if (viewOptions.length > 0 ) {
			const children = [].concat(this.getProperty('children'));

			viewOptions.forEach((options) => {
				$buttonview = new ButtonView(options);
				children.push($buttonview);
				viewElements.push($buttonview.element);
			});

			this.setProperties({ children });
		}

		return viewElements;
	},

	_render () {
		const isStateful = this.getProperty('views').length > 0;
		const className = this._getClassNames('', isStateful);

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
		if (this.getProperty('views').length > 0 || this.getProperty('selectable')) {
			this.toggle();
		}
	},

	_onToggled () {
		const isStateful = this.getProperty('views').length > 0;
		this.elements.control[0].className = this._getClassNames('', (isStateful || this.getProperty('selectable')));
	},

	_onEnabledOrDisabled () {
		if ( this.getProperty('disabled') ) {
			this.elements.control.attr('disabled', 'disabled');
		} else {
			this.elements.control.removeAttr('disabled');
		}
	},

	// If the button is stateful, it only affects the first view. See `this.childOptions`
	renderView (options) {
		this.childOptions = Lib.extend({}, this.childOptions, options);
		this.element.empty();
		this.element.append(this._renderViews());
	}
};

Lib.merge(Button.prototype, ButtonCore, Events, DOM, State, ButtonObject);
Button = Lib.runHelpers('jquery', CONTROL, Button);

export default Button;
