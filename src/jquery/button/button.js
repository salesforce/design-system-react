// BUTTON CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import ButtonCore, {CONTROL} from '../../core/button';

// Framework specific
import Events from '../events';
import Svg from '../svg';
import State from '../state';
import ButtonView from './button-view';

const $ = Lib.global.jQuery || Lib.global.$;

// Constructor
let Button = function Button (element, options) {
	this.options = {};
	Lib.merge(this.options, this._defaultProperties, options);

	// if button has views, button is stateful
	if (this.options.views.length > 0) {
		const buttonOptions = Lib.merge({}, this.options);
		buttonOptions.views = undefined;	// really should be delete, but performance

		this.options.views.map((child, index, array) => {
			array[index] = Lib.merge({}, buttonOptions, child );
		});
	}

	this.elements = {
		wrapper: $(element)
	};

	this._initializeState();
	this._initialize(this.options);
};

export const ButtonObject = {
	_onInitialized () {
		this._render();
		this._initElements(this.elements.wrapper, this.elements);
		this._bindUIEvents();
		this.trigger('initialized');
	},

	_initElements ($base, elements) {
		const control = '.' + this.cssClasses.CONTROL;
		elements.control = $base.find(control);
		return elements;
	},

	_bindUIEvents () {
		this.elements.wrapper.on('click', $.proxy(this._handleClick, this));
	},

	_renderViews () {
		const views = [];

		if (this.options.views.length > 0) {
			this.options.view = 'notSelected';
		}

		let $buttonview = new ButtonView(this.options);

		views.push( $buttonview.render() );

		// other views
		if (this.options.views.length > 0 ) {
			this.options.views.forEach( (viewOptions) => {
				$buttonview = new ButtonView(viewOptions);
				views.push($buttonview.render());
			});
		}

		return views;
	},

	_render () {
		const isStateful = this.options.views.length > 0;
		const className = this._getClassNames(isStateful);

		$('<button>').addClass(className)
			.append( this._renderViews() )
			.prop( 'disabled', this.getProperty('disabled') )
			.appendTo(this.elements.wrapper);
	},

	_handleClick () {
		this.toggle();
	},

	// TODO: Might want to get isSelected, toggle, select, deselect from checkbox control
	isSelected () {
		return this.getProperty('selected');
	},

	toggle (_selected) {
		let selected;
		const origValue = this.getProperty('selected');

		if (this.getProperty('disabled')) {
			return;
		}

		if (!Lib.isBoolean(_selected)) {
			selected = !this.isSelected();
		} else if (_selected !== this.isSelected()) {
			selected = _selected;
		} else {
			return;
		}

		this.setProperties({ selected });

		if (Lib.isFunction(this._onToggled)) this._onToggled();

		if (selected) {
			this.trigger('selected');
		} else {
			this.trigger('unselected');
		}

		if (origValue !== selected) {
			this.trigger('selected', selected);
		}
	},

	select () {
		this.toggle(true);
	},

	deselect () {
		this.toggle(false);
	},

	destroy () {
		this.elements.wrapper.remove();
		return this.elements.wrapper[0].outerHTML;
	},

	_onToggled () {
		const isStateful = this.options.views.length > 0;
		this.elements.control[0].className = this._getClassNames(isStateful);
	},

	_onEnabledOrDisabled () {
		if ( this.getProperty('disabled') ) {
			this.elements.control.attr('disabled', 'disabled');
		} else {
			this.elements.control.removeAttr('disabled');
		}
	}

};

Lib.merge(Button.prototype, ButtonCore, Events, State, Svg, ButtonObject);
Button = Lib.runHelpers('jquery', CONTROL, Button);

export default Button;
