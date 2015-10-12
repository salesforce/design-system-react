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
		const className = BadgeCore._getClassNameByTheme(this.getProperty('theme'));

		$('<span>').addClass(className)
			.text(this.getProperty('text'))
			.appendTo(this.elements.wrapper);
	}
};

Lib.merge(Badge.prototype, BadgeCore, Events, State, BadgeObject);
Badge = Lib.runHelpers('jquery', CONTROL, Badge);

export default Badge;
