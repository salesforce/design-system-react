// BADGE CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import BadgeCore, {CONTROL} from '../../core/badge';

// Framework specific
import DOM from '../dom';
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
	
	this.options = Lib.extend({}, this._defaultProperties, options, {
		wrapper
	});

	this._initializeState();
	this._initialize(this.options);
};

export const BadgeObject = {
	_render () {
		const className = this._getClassNames();

		this.element = this.$el = this.elements.control = $('<span>');
		
		// TODO: Should this also use the contents of the original? It's different in jQuery becasue in React 'Children' is actually just another prop
		this.element
			.addClass(className)
			.text(this.getProperty('text'));
		
		return this.element;
	}
};

Lib.merge(Badge.prototype, BadgeCore, State, Events, DOM, BadgeObject);
Badge = Lib.runHelpers('jquery', CONTROL, Badge);

export default Badge;
