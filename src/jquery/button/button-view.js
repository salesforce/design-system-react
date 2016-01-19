// # Button View Private Control
// ### jQuery Facade

// Helps implement the Button [design pattern](https://www.lightningdesignsystem.com/components/buttons).

// This controls is meant to be used by button and not directly bound to DOM.

// Bring in the [shared library functions](../lib/lib.html).
import * as Lib from '../../lib/lib';

// Use the [shared core](../../core/button-view.html), which contains logic that is the same in every facade.
import ButtonViewCore, {CONTROL} from '../../core/button-view';

// jQuery is an external dependency.
const $ = Lib.global.jQuery || Lib.global.$;

// [State](../state.html) is a mixin that appear in every facade and bring some consistency between how each framework deals with instantiation, events, and state.
import State from '../state';

// [DOM](../dom.html) is a mixin that wraps some jQuery DOM manipulattion methods, so they can be called from the control itself and not the jQuery element connected to the control.
import DOM from '../dom';

// #### Constructor
// Constructors are functions that are called by the `new` keyword and is the function that an options object is passed into.
let ButtonView = function ButtonView () {
	const options = this._getOptions(arguments);

	this._initialize(options);
};

// #### Private Methods
// Although not truly private methods, methods–that should only function as private–follow the convention of being prefixed with `_` (an underscore).
export const ButtonViewObject = {
	// Triggered by `_initialize`. See [Base](../core/base.html). Allows events to be be attached to the control before the asynchronous `render` is complete.
	_initializer () {
		this.element = this.$el = this.elements.control = $('<span>');
	},

	_renderAssistiveText () {
		if (this.getProperty('assistiveText')) {
			return $('<span>').addClass(this.cssClasses.ASSISTIVE_TEXT).text(this.getProperty('assistiveText'));
		}
	},

	_renderIcon (position) {
		let $icon;
		if (this.getProperty('icon') && this.getProperty('iconPosition') === position) {
			$icon = $('<svg ' + 'class="' + this._getIconClassNames() + '"><use xlink:href="' + Lib.getSVGPath(this.getProperty('icon')) + '"></use></svg>')
				.attr('aria-hidden', 'true');
		} else if (position === 'right' && this.getProperty('iconStyle') === 'icon-more') {
			$icon = $('<svg ' + 'class="' + this._getIconClassNames(this.buttonIconSizes['x-small']) + '"><use xlink:href="' + Lib.getSVGPath(this.moreIcon) + '"></use></svg>')
				.attr('aria-hidden', 'true');
		}

		return $icon;
	},

	_render () {
		// Truncating text limits the width of the button and adds ellipses (...) if the text extends farther.
		if (this.getProperty('truncate')) {
			this.element.prepend('<span>').addClass(this.cssClasses.TRUNCATE).text(this.getProperty('text'));
		} else {
			this.element.text(this.getProperty('text'));
		}

		this.element
			.addClass(this.buttonStatefulViewStyles[this.getProperty('view')])
			.append(this._renderAssistiveText());

		this.element
			.append(this._renderIcon('right'))
			.prepend(this._renderIcon('left'));

		return this.element;
	}
};

Lib.merge(ButtonView.prototype, ButtonViewCore, DOM, State, ButtonViewObject);
ButtonView = Lib.runHelpers('jquery', CONTROL, ButtonView);

export default ButtonView;
