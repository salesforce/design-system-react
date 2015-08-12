// SELECTLIST CONTROL - Marionette FACADE

// Core
import * as Lib from '../../core/lib';
import SelectlistCore from '../../core/selectlist';

// Framework specific
import _ from 'underscore';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import classNames from 'classnames';

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
		attrs._classNames = classNames;

		return attrs;
	},

	events: {
		'keypress': 'handleKeyPress',
		'click a': 'handleMenuItemSelected'
	},

	setState (values) {
		return this.model.set(values);
	},

	getState (key) {
		return this.model.get(key);
	},

	assumeFocus: false,

	initialize (options) {
		const self = this;

		this.elements = {
			wrapper: {
				toggleClass (cssClass, state) {
					self.$el.toggleClass(cssClass, state);
				}
			}
		};

		this.model = this.model || new Backbone.Model();

		this.__constructor(options);

		// Put this after the constructor so that we don't call render during initialization
		this.listenTo(this.model, 'change', this.render);
	},

	onRender () {
		if (this.assumeFocus) {
			this.$el.find('button').focus();
			this.assumeFocus = false;
		}
	},

	handleMenuItemSelected (e) {
		const id = $(e.currentTarget).data('id');
		this.setSelection({ id: id });
	},

	handleKeyPress (e) {
		const key = e.which;

		this.assumeFocus = true;

		if (key) this.__jumpToLetter(key);
	}
}));

export default Selectlist;
