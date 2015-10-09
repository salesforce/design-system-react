// BADGE CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import BadgeCore, {CONTROL} from '../../core/badge';

// Framework specific
import Events from '../events';
import State from '../state';

const $ = Lib.global.jQuery || Lib.global.$;

// Constructor
let Badge = function Badge (element, options) {
	this.options = Lib.extend({}, options);

	this.elements = {
		wrapper: $(element)
	};

	this._initializeState();
	this._initialize(this.options);
};

Lib.extend(Badge.prototype, BadgeCore, Events, State, {
	_onInitialized () {
		this._render();
		this.trigger('initialized');
	},

	_render () {
		var theme = this.options.theme.toUpperCase();
		var className = '';

		switch(theme) {
			case 'DEFAULT':
			case 'SHADE':
			case 'INVERSE':
			default:
				className = BadgeCore.cssClasses['THEME_' + theme];
				break;
		};

		// set the class
		this.elements.wrapper.addClass(BadgeCore.cssClasses.BASE).addClass(className);

		// set the text
		this.elements.wrapper.text(this.options.text);
	}
});

Badge = Lib.runHelpers('jquery', CONTROL, Badge, {

});

export default Badge;
