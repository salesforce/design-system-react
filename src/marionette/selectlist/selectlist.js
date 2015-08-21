// SELECTLIST CONTROL - Marionette FACADE

// Core
import * as Lib from '../../core/lib';
import SelectlistCore from '../../core/selectlist';

// Framework specific
import _ from 'underscore';
import Marionette from 'backbone.marionette';
import classNames from 'classnames';
import State from '../state';
import '../../data/backbone';

// Template imports
const fs = require('fs');
const selectlistTemplate = _.template(fs.readFileSync(__dirname + '/selectlist.html', 'utf8'));

const Selectlist = Marionette.ItemView.extend(Lib.merge({}, SelectlistCore, State, {
	className () {
		return classNames(this.cssClasses.CONTROL, this.cssClasses.BTN_GROUP);
	},

	template: selectlistTemplate,

	serializeData () {
		let attrs;

		if (!this.model && !this.collection) {
			return {};
		}

		attrs = this.model ? this.serializeModel(this.model) : {};

		if (attrs.selection && Lib.isFunction(attrs.selection.toJSON)) {
			attrs.selection = attrs.selection.toJSON();
		}

		attrs.items = this.serializeCollection(this.collection);
		attrs.items.forEach(function (item, index) {
			item._index = index;
		});

		attrs._classNames = classNames;

		// Must be defined
		attrs.width = attrs.width || null;

		return attrs;
	},

	events: {
		'keypress': 'handleKeyPress',
		'click a': 'handleMenuItemSelected'
	},

	modelEvents: {
		'change': 'render'
	},

	constructor () {
		this._initializeState();
		Marionette.ItemView.prototype.constructor.apply(this, arguments);
	},

	initialize (options) {
		this._initialize(options);
	},

	onRender () {
		const elements = this.elements = {};
		
		elements.wrapper = this.$el;
		elements.dropdownMenu = this.$('.' + this.cssClasses.MENU);
		
		elements.wrapper.toggleClass(this.cssClasses.DISABLED, this.getProperty('disabled'));
	},

	handleMenuItemSelected (e) {
		const index = $(e.currentTarget).data('index');
		const items = this.serializeCollection(this.collection);
		const item = items[index];
		if (item.disabled) {
			e.preventDefault();
			e.stopImmediatePropagation();
			return;
		}

		this.setSelection(item);
	},

	handleKeyPress (e) {
		const key = e.which;

		if (key) this._jumpToLetter(key);
	}
}));

export default Selectlist;
