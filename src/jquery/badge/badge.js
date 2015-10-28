// BADGE CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import BadgeCore, {CONTROL} from '../../core/badge';

// Framework specific
import Events from '../events';
import State from '../state';

const $ = Lib.global.jQuery || Lib.global.$;

// Constructor
let Badge = function Badge () {
	let wrapper;
	let options;
	
	if (arguments.length === 1) {
		options = arguments[0];
	} else if (arguments.length > 1) {
		wrapper = $(arguments[0]);
		options = arguments[1];
	}
	
	this.options = Lib.extend(BadgeCore._defaultProperties, options);
	this.elements = { wrapper };

	this._initializeState();
	this._initialize(this.options);
};

export const BadgeObject = {
	_onInitialized () {
		this._render();
		this.trigger('initialized', this);
	},

	_render () {
		const className = this._getClassNames();

		this.element = this.$el = this.elements.control = $('<span>');
		
		// TODO: Should this also use the contents of the original? It's different in jQuery becasue in React 'Children' is actually just another prop
		this.element.addClass(className).text(this.getProperty('text'));
		
		if (this.elements.wrapper) {
			this.element.appendTo(this.elements.wrapper);
		}
		
		this.rendered = true;
	},
	
	appendTo (wrapper) {
		this.elements.wrapper = $(wrapper);
		
		if (this.rendered) {
			this.element.appendTo(this.elements.wrapper);
		}
	}
};

Lib.merge(Badge.prototype, BadgeCore, Events, State, BadgeObject);
Badge = Lib.runHelpers('jquery', CONTROL, Badge);

export default Badge;
