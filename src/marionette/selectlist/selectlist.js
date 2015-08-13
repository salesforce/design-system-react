// SELECTLIST CONTROL - Marionette FACADE

// Core
import * as Lib from '../../core/lib';
import SelectlistCore from '../../core/selectlist';

// Framework specific
import _ from 'underscore';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import classNames from 'classnames';
import '../../data/backbone';

// Template imports
const fs = require('fs');
const selectlistTemplate = _.template(fs.readFileSync(__dirname + '/selectlist.html', 'utf8'));

const Selectlist = Marionette.ItemView.extend(Lib.extend({}, SelectlistCore, {
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

	setState (values) {
		return this.model.set(values);
	},

	getState (key) {
		return this.model.get(key);
	},

	_assumeFocus: false,

	constructor () {
		this.model = this.model || new Backbone.Model();
		Marionette.ItemView.prototype.constructor.apply(this, arguments);
	},

	initialize (options) {
		const self = this;

		this.elements = {
			wrapper: {
				toggleClass (cssClass, state) {
					self.$el.toggleClass(cssClass, state);
				}
			}
		};

		this.__constructor(options);
	},

	onRender () {
		if (this._assumeFocus) {
			this.$el.find('button').focus();
			this._assumeFocus = false;
		}
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

		this._assumeFocus = true;

		if (key) this.__jumpToLetter(key);
	}
}));

export default Selectlist;
