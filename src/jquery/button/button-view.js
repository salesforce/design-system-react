// BUTTONVIEW OBJECT - JQUERY FACADE
// Not meant to be directly bound to DOM

// Core
import * as Lib from '../../lib/lib';
import ButtonViewCore, {CONTROL} from '../../core/button-view';

// Framework specific
import DOM from '../dom';
import State from '../state';

const $ = Lib.global.jQuery || Lib.global.$;

// Constructor
let ButtonView = function ButtonView () {
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

	this._initializeState();
	this._initialize(this.options);
};

export const ButtonViewObject = {
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
		}

		if (position === 'right' && this.getProperty('iconStyle') === 'icon-more') {
			$icon = $('<svg ' + 'class="' + this._getIconClassNames(this.iconSizes['x-small']) + '"><use xlink:href="' + Lib.getSVGPath(this.moreIcon) + '"></use></svg>')
				.attr('aria-hidden', 'true');
		}

		return $icon;
	},

	_render () {
		this.element = this.$el = this.elements.control = $('<span>');
		
		this.element
			.text( this.getProperty('text') )
			.addClass(this.buttonStatefulViewStyles[this.options.view])
			.append(this._renderAssistiveText());
		
		this.element
			.append(this._renderIcon('right'))
			.prepend(this._renderIcon('left'));
		
		return this.element;
	},
	
	render () {
		let element;
		
		if (this.rendered) {
			element = this.element;
		} else {
			element = this._render();
			this.rendered = true;
		}
		
		return element;
	}
};

Lib.merge(ButtonView.prototype, ButtonViewCore, State, DOM, ButtonViewObject);
ButtonView = Lib.runHelpers('jquery', CONTROL, ButtonView);

export default ButtonView;
