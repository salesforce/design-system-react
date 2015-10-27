// BUTTONVIEW OBJECT - JQUERY FACADE
// Not meant to be directly bound to DOM

// Core
import * as Lib from '../../lib/lib';
import ButtonViewCore, {CONTROL} from '../../core/button-view';

// Framework specific
import State from '../state';

const $ = Lib.global.jQuery || Lib.global.$;

// Constructor
let ButtonView = function ButtonView (options) {
	this.options = options;

	this._initializeState();
	this._initialize(this.options);
};

export const ButtonViewObject = {
	_renderAssistiveText () {
		if ( this.getProperty('assistiveText') ) {
			return $('<span>').addClass(this.cssClasses.ASSISTIVE_TEXT).text(this.getProperty('assistiveText'));
		}
	},

	_renderIcon (position) {
		let $icon = undefined;

		if (this.getProperty('icon') && this.getProperty('iconPosition') === position) {
			$icon = $('<svg ' + 'class="' + this._getIconClassNames() + '"><use xlink:href="' + Lib.getSVGPath(this.getProperty('icon')) + '"></use></svg>')
				.attr('aria-hidden', 'true');
		}

		if (position === 'right' && this.getProperty('iconStyle') === 'icon-more') {
			$icon = $('<svg ' + 'class="' + this._getIconClassNames(this.iconSizes['x-small']) + '"><use xlink:href="' + Lib.getSVGPath(this.moreIcon) + '"></use></svg>')
				.attr('aria-hidden', 'true');
		}

		return $icon || '';
	},

	render () {
		const $span = $('<span>').text( this.getProperty('text') )
			.addClass(this.buttonStatefulViewStyles[this.options.view])
			.append( this._renderAssistiveText() );
		$span.append( this._renderIcon('right'));
		$span.prepend( this._renderIcon('left'));
		return $span;
	}
};

Lib.merge(ButtonView.prototype, State, ButtonViewCore, ButtonViewObject);
ButtonView = Lib.runHelpers('jquery', CONTROL, ButtonView);

export default ButtonView;
