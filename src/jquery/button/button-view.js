// BUTTONVIEW OBJECT - JQUERY FACADE
// Not meant to be directly bound to DOM

// Core
import * as Lib from '../../lib/lib';
// import ButtonCore, {CONTROL} from '../../core/button';
import ButtonViewCore, {CONTROL} from '../../core/button-view';

// Framework specific
import Svg from '../svg';
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

	render () {
		let $span = $('<span>').text( this.getProperty('text') )
			.addClass(this.buttonStatefulViewStyles[this.options.view])
			.append( this._renderAssistiveText() );
		if (this.getProperty('iconPosition') === 'right') {
			$span = $span.append( this._renderIcon() );
		}	else {
			$span = $span.prepend( this._renderIcon() );
		}

		return $span;
	}
};

Lib.merge(ButtonView.prototype, State, Svg, ButtonViewCore, ButtonViewObject);
ButtonView = Lib.runHelpers('jquery', CONTROL, ButtonView);

export default ButtonView;
