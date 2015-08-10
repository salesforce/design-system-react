// SELECTLIST CONTROL - BACKBONE FACADE

// Core
import Lib from '../../core/lib';
import SelectlistCore from '../../core/selectlist';

// Framework specific
import _ from 'underscore';
import Backbone from 'backbone';
import classNames from 'classnames';

// Children
import SelectlistItem from './selectlist-item';

// Template imports
var fs = require('fs');

var Selectlist = Backbone.View.extend(Lib.extend({}, SelectlistCore, {
	className () {
		return classNames(this.cssClasses.CONTROL, this.cssClasses.BTN_GROUP);
	},

	template: _.template(fs.readFileSync(__dirname + '/selectlist.html', 'utf8')),

	events: {
		'keypress': 'handleKeyPress'
	},

	setState (values) {
		return this.model.set(values);
	},

	getState (key) {
		return this.model.get(key);
	},

	assumeFocus: false,

	initialize (options) {
		_.bindAll(this, 'setState', 'getState', 'render', 'renderMenuItems', 'handleMenuItemSelected', 'handleKeyPress');

		var self = this;

		this.elements = {
			wrapper: {
				toggleClass (cssClass, state) {
					self.$el.toggleClass(cssClass, state);
				}
			}
		};

		this.model = this.model || new Backbone.Model(this.__getInitialState());

		this.__constructor(options);

		// Put this after the constructor so that we don't call render during initialization
		this.listenTo(this.model, 'change', this.render);

		// Only update the children when the collection has changed
		this.listenTo(this._collection, 'all', function () {
			_.each(self._renderedMenuItems, function (menuItem) {
				menuItem.remove();
			});

			self._renderedMenuItems = null;

			self.render();
		});
	},

	render () {
		var attrs = this.model.toJSON();
		if (attrs.selection) {
			attrs.selection = attrs.selection.toJSON();
		}

		this.$el.html(this.template(attrs));

		this.renderMenuItems();

		if (this.assumeFocus) {
			this.$el.find('button').focus();
			this.assumeFocus = false;
		}

		return this;
	},

	renderMenuItems () {
		var $menu = this.$('ul.dropdown-menu');

		var handleMenuItemSelected = this.handleMenuItemSelected;

		if (!this._renderedMenuItems) {
			this._renderedMenuItems = this._collection.map(function (item) {
				var menuItem = new SelectlistItem({
					model: item,
					onSelected: handleMenuItemSelected
				});

				menuItem.render();

				return menuItem;
			});
		}

		_.each(this._renderedMenuItems, function (menuItem) {
			$menu.append(menuItem.el);
			menuItem.delegateEvents();
		});
	},

	handleMenuItemSelected (selection) {
		this.setSelection(selection);
	},

	handleKeyPress (e) {
		var key = e.which;

		this.assumeFocus = true;

		if (key) this.__jumpToLetter(key);
	}
}));

export default Selectlist;
