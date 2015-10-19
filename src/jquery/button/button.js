// BUTTON CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import ButtonCore, {CONTROL} from '../../core/button';

// Framework specific
import Events from '../events';
import Svg from '../svg';
import State from '../state';

const $ = Lib.global.jQuery || Lib.global.$;

// Constructor
let Button = function Button (element, options) {
	this.options = {};
	Lib.merge(this.options, this._defaultProperties, options);

	this.elements = {
		wrapper: $(element)
	};

	this._initializeState();
	this._initialize(this.options);
};

export const ButtonObject = {
	// not quite sure why these got removed from core, since I'm using them here also.
	cssClasses: {
		ICON: CONTROL + '__icon',
		STATEFUL_ICON: CONTROL + '__icon--stateful',
		ASSISTIVE_TEXT: 'slds-assistive-text'
	},
	
	buttonStatefulViewStyles: {
		notSelected: 'slds-text-not-selected',
		selected: 'slds-text-selected',
		selectedHover: 'slds-text-selected-focus'
	},
	
	childIconStyles: {
		'left': CONTROL + '__icon--left',
		'right': CONTROL + '__icon--right'
	},

	_onInitialized () {
		this._render();
		this.trigger('initialized');
	},

	_renderAssistiveText () {
		if ( this.getProperty('assistiveText') ) {
			return $('<span>').addClass(this.cssClasses.ASSISTIVE_TEXT).text(this.getProperty('assistiveText'));
		}
	},

	_renderViews () {
		// currently NOT stateful
		// there is an extra span in here, but there is also in the React facade at this time
		let $span = $('<span>').text(this.getProperty('text'));
		if (this.getProperty('iconPosition') === 'right') {
			$span = $span.append( this._renderIcon() );
		}	else {
			$span = $span.prepend( this._renderIcon() );
		}
		return $span;
	},

	_render () {
		const className = this._getClassNames();

		$('<button>').addClass(className)
			.append( this._renderViews() )
			.prop( 'disabled', this.getProperty('disabled') )
			.append( this._renderAssistiveText() )
			.appendTo(this.elements.wrapper);
	}
};

Lib.merge(Button.prototype, ButtonCore, Events, State, Svg, ButtonObject);
Button = Lib.runHelpers('jquery', CONTROL, Button);

export default Button;
