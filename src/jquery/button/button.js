// # Button Control
// ### React Facade

// Implements the Button [design pattern](https://www.lightningdesignsystem.com/components/buttons) in React.

// Buttons are used within many other controls in this library. There are many variations, as well as stateful buttons. Buttons are made of one or more `ButtonViews`. Stateful buttons have three views, but most buttons only have one.

/* TODO: Add a full API description of the control here. */

// Bring in the [shared library functions](../lib/lib.html).
import * as Lib from '../../lib/lib';

// Use the [shared core](../../core/button.html), which contains logic that is the same in every facade.
import ButtonCore, {CONTROL} from '../../core/button';

// jQuery is an external dependency.
const $ = Lib.global.jQuery || Lib.global.$;

// [State](../state.html) and [Events](../events.html) are mixins that appear in every facade and bring some consistency between how each framework deals with instantiation, events, and state.
import Events from '../events';
import State from '../state';

// [DOM](../dom.html) is a mixin that wraps some jQuery DOM manipulattion methods, so they can be called from the control itself and not the jQuery element connected to the control.
import DOM from '../dom';

// `ButtonView` is a "private" child control within `Button`.
import ButtonView from './button-view';

// Constructor
let Button = function Button () {
	const options = this._getOptions(arguments);

	// Specify the options that get passed on to the child `ButtonViews`
	this.buttonViewOptions = {
		icon: options.icon,
		iconPosition: options.iconPosition,
		iconSize: options.iconSize,
		iconStyle: options.iconStyle,
		text: options.text,
		truncate: options.truncate
	};
	
	// If button has views, button is stateful.
	if (options.views.length > 0) {
		options.views = options.views.map((buttonView) => {
			return Lib.extend({}, this.buttonViewOptions, buttonView);
		});
	}
	// Handles setup tasks such as creating state, setting default properties, and loading internationalization strings. The call stack eventually triggers `render`. See [Base](../core/base.html).
	this._initialize(options);
};

export const ButtonObject = {
	// Triggered by `_initialize`. See [Base](../core/base.html). Allows events to be be attached to the control before the asynchronous `render` is complete.
	_initializer () {
		this.element = this.$el = this.elements.control = $('<button>');
	},

	// Attaches events to the control and its children. Typically, called from `onRendered` within facade control object.
	_bindUIEvents () {
		this.element.on('click', $.proxy(this._handleClick, this));
	},

	// While some functionality moves into the core or traits, each facade typically provides its own rendering logic so that it can take advantage of the benefits offered by the framework and maintain appropriate patterns for that framework.
	_renderViews () {
		const viewOptions = this.getProperty('views');
		const viewElements = [];

		const buttonViewOptions = Lib.extend({
			assistiveText: this.getProperty('assistiveText')
		}, this.buttonViewOptions);
		
		if (viewOptions.length > 0) {
			buttonViewOptions.view = 'notSelected';
		}

		// Always render at least one view. If stateful, render more.
		let $buttonview = new ButtonView(buttonViewOptions);
		viewElements.push($buttonview.element);

		// Render additional views
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

	// Renders are asyncronous. See [Base](../core/base.html) and [DOM](../dom.html) in order to trace stack.
	_render () {
		const isStateful = this.getProperty('views').length > 0;
		const className = this._getClassNames('', isStateful);

		this.element
			.addClass(className)
			.append(this._renderViews())
			.prop('disabled', this.getProperty('disabled'));
		
		return this.element;
	},
	
	// Triggered when `render` is complete. See [DOM](../dom.html).
	_onRendered () {
		this._bindUIEvents();
	},

	// Toggles selected state if button is stateful.
	_handleClick () {
		if (this.getProperty('views').length > 0 || this.getProperty('selectable')) {
			this.toggle();
		}
	},

	// Toggles selected state if button is stateful. See [selectable-boolean]('../traits/selectable-boolean').
	_onToggled () {
		const isStateful = this.getProperty('views').length > 0;
		this.elements.control[0].className = this._getClassNames('', (isStateful || this.getProperty('selectable')));
	},

	// Triggered when control is enabled or disabled. See [disableable]('../traits/disableable').
	_onEnabledOrDisabled () {
		if ( this.getProperty('disabled') ) {
			this.elements.control.attr('disabled', 'disabled');
		} else {
			this.elements.control.removeAttr('disabled');
		}
	},

	// Public API method that will re-render a `ButtonView` with different options. If the button is stateful, it only affects the first view. See `this.buttonViewOptions` for options that can be updated.
	renderView (options) {
		this.childOptions = Lib.extend({}, this.childOptions, options);
		this.element.empty();
		this.element.append(this._renderViews());
	}
};

Lib.merge(Button.prototype, ButtonCore, Events, DOM, State, ButtonObject);
Button = Lib.runHelpers('jquery', CONTROL, Button);

export default Button;
