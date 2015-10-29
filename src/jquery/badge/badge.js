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
	const options = this._getOptions(arguments);
	
	this._initialize(options);
};

export const BadgeObject = {
	_initializer () {
		this.element = this.$el = this.elements.control = $('<span>');
	},
	
	_render () {
		const className = this._getClassNames();
		
		// TODO: Should this also use the contents of the original? It's different in jQuery becasue in React 'Children' is actually just another prop
		this.element
			.addClass(className)
			.text(this.getProperty('text'));
		
		return this.element;
	}
};

Lib.merge(Badge.prototype, BadgeCore, Events, DOM, State, BadgeObject);
Badge = Lib.runHelpers('jquery', CONTROL, Badge);

export default Badge;
