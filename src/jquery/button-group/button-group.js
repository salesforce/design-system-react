// BUTTON GROUP CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import Base from '../../core/base';

// Framework specific
import DOM from '../dom';
import Events from '../events';
import State from '../state';

// Children
import Button from '../button/button';
import ButtonCore from '../../core/button';

const $ = Lib.global.jQuery || Lib.global.$;

// Constructor
let ButtonGroup = function ButtonGroup () {
	const options = this._getOptions(arguments);

	this.childOptions = {
		icon: options.icon,
		iconPosition: options.iconPosition,
		iconStyle: options.iconStyle,
		text: options.text,
		theme: options.theme
	};
	
	this._initialize(options);
};

export const ButtonGroupObject = {
	_defaultProperties: ButtonCore._defaultProperties,
	
	_initializer () {
		this.element = this.$el = this.elements.control = $('<div>');
	},

	// TODO: Support dropdowns also
	_renderButtons () {
		const buttonOptions = this.getProperty('buttons');
		let children;
		
		children = [].concat(this.getProperty('children'));
		
		if (Lib.isArray(buttonOptions)) {
			children = children.concat(buttonOptions.map((child) => {
				return new Button(Lib.extend({}, this.childOptions, child));
			}));
		}
		
		this.setProperties({
			children,
			buttons: null
		});
		
		return children.map((button) => {
			return button.element;
		});
	},

	_render () {
		this.element
			.addClass('slds-button-group')
			.append(this._renderButtons());
		
		return this.element;
	}
};

const CONTROL = 'slds-button-group';

Lib.merge(ButtonGroup.prototype, Base, Events, DOM, State, ButtonGroupObject);
ButtonGroup = Lib.runHelpers('jquery', CONTROL, ButtonGroup);

export default ButtonGroup;
