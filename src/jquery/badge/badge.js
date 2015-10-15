// BADGE CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import BadgeCore, {CONTROL} from '../../core/badge';

// Framework specific
import State from '../state';

const $ = Lib.global.jQuery || Lib.global.$;

// Constructor
let Badge = function Badge (element, options) {
	this.options = Lib.extend(BadgeCore._defaultProperties, options);

	this.elements = {
		wrapper: $(element)
	};

	this._initializeState();
	this._initialize(this.options);
};

export const BadgeObject = {
	_onInitialized () {
		this._render();
		this.trigger('initialized');
	},

	_render () {
		const className = this._getClassNames();

		// TODO: Should this also use the contents of the original? It's different in jQuery becasue in React 'Children' is actually just another prop
		$('<span>').addClass(className)
			.text(this.getProperty('text'))
			.appendTo(this.elements.wrapper);
	}
};

Lib.merge(Badge.prototype, BadgeCore, State, BadgeObject);
Badge = Lib.runHelpers('jquery', CONTROL, Badge);

export default Badge;
