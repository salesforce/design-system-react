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
	const options = this._getOptions(arguments);
	
	this._initialize(options);
};

export const ButtonViewObject = {
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
		}

		if (position === 'right' && this.getProperty('iconStyle') === 'icon-more') {
			$icon = $('<svg ' + 'class="' + this._getIconClassNames(this.iconSizes['x-small']) + '"><use xlink:href="' + Lib.getSVGPath(this.moreIcon) + '"></use></svg>')
				.attr('aria-hidden', 'true');
		}

		return $icon;
	},

	_render () {
		this.element
			.text(this.getProperty('text'))
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
