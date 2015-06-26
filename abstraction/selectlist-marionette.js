// TO-DO:
// • This isn't really using the code from the core library effectively yet, it's just a start

var _ = require('underscore');
var Marionette = require('backbone.marionette');

var template = require('./selectlist.hbs');
var ChildView = require('./selectlist-item');
var Core = require('./selectlist-core');

module.exports = Marionette.CompositeView.extend(Core, {
	template: template,
	
	childViewContainer: 'ul.dropdown-menu',
	
	className: 'btn-group selectlist',
	
	itemValueField: 'value',
	itemNameField: 'name',
	autoResize: true,
	
	initialize: function (options) {
		this.options = options;
		
		this.childView = ChildView.extend({
			itemValueField: Marionette.getOption(this, 'itemValueField'),
			itemNameField: Marionette.getOption(this, 'itemNameField')
		});
		
		if (!this.model) {
			this.model = this.collection.first();
		}
	},
	
	ui: {
		toggle: 'button.dropdown-toggle',
		label: 'span.selected-label',
		menu: 'ul.dropdown-menu',
		hidden: 'input.hidden-field'
	},
	
	collectionEvents: {
		'select': 'doSelect'
	},
	
	templateHelpers: function () {
		return { formName: Marionette.getOption(this, 'formName') };
	},
	
	disable: function (enable) {
		this.options.disabled = !enable;
		this.$el.toggleClass('disabled', this.options.disabled);
		this.ui.toggle.toggleClass('disabled', this.options.disabled);
	},
	
	enable: function () {
		this.disable(true);
	},
	
	selectedItem: function () {
		return this.model;
	},

	selectByName: function (name) {
		var criteria = {};
		var found;
		
		criteria[Marionette.getOption(this, 'itemNameField')] = name;
		found = this.collection.findWhere(criteria);
		
		this.collection.trigger('select', found);
	},

	selectByValue: function (value) {
		var itemValueField = Marionette.getOption(this, 'itemValueField');
		var found;
		
		found = this.collection.find(function (model) {
			return String(model.get(itemValueField)) === String(value);
		});
		
		this.collection.trigger('select', found);
	},
	
	selectByModel: function (model) {
		var found = this.collection.get(model);
		
		this.collection.trigger('select', found);
	},
	
	doSelect: function (model) {
		if (!model) {
			return;
		}
		
		if (this.model !== model) {
			this.model = model;
			this.render();
			this.trigger('changed', this.model);
		}
	},
	
	resize: function () {
		var width = 0;
		var newWidth = 0;
		var sizer = $('<div/>').addClass('selectlist-sizer');
		
		$('.fuelux:first').append(sizer);
		sizer.append(this.$el.clone());

		this.ui.menu.find('a').each(function () {
			sizer.find('.selected-label').text($(this).text());
			newWidth = sizer.find('.selectlist').outerWidth();
			newWidth = newWidth + sizer.find('.sr-only').outerWidth();
			if (newWidth > width) {
				width = newWidth;
			}
		});

		if (width <= 1) {
			return;
		}

		this.ui.toggle.css('width', width);
		this.ui.menu.css('width', width);

		sizer.remove();
	},
	
	onRender: function () {
		var disabled = Marionette.getOption(this, 'disabled');
		if (disabled) {
			this.disable();
		}
	},
	
	onAttach: function () {
    	// TO-DO:
    	// • This probably doesn't really make the most sense here
    	// • It's better to use something like getOption
		this._initialize(this.collection, this.options);
	}
});