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
	// needs button defaults (iconPosition, children) to fallback on
	this._defaultProperties = Lib.merge({}, ButtonCore._defaultProperties);

	const options = this._getOptions(arguments);

	this.childOptions = {
		icon: options.icon,
		iconPosition: options.iconPosition,
		iconStyle: options.iconStyle,
		text: options.text,
		theme: options.theme
	};
	
	if (options.buttons.length > 0) {
		options.buttons = options.buttons.map((child) => {
			return Lib.extend({}, this.childOptions, child);
		});
	}
	
	this._initialize(options);
	console.log(	this.getProperty('children'));
};

export const ButtonGroupObject = {
	_initializer () {
		this.element = this.$el = this.elements.control = $('<div>');
	},

	// TODO: Support dropdowns also
	_renderButtons () {
		const buttonsOptions = this.getProperty('buttons');
		const buttonElements = [];
		let $button = undefined;

		if (this.getProperty('children').length > 0 ) {
			this.getProperty('children').forEach((child) => {
				buttonElements.push(child.element);
			});
		}

		if (buttonsOptions.length > 0 ) {
			buttonsOptions.forEach((options) => {
				$button = new Button(options);
				this.getProperty('children').push($button);
				buttonElements.push($button.element);
			});
		}

		return buttonElements;
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
