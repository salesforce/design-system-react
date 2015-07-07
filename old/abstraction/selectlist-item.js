var _ = require('underscore');
var Marionette = require('backbone.marionette');

var template = require('./selectlist-item.hbs');

module.exports = Marionette.ItemView.extend({
	template: template,
	
	tagName: 'li',
	
	initialize: function (options) {
		this.options = options;
	},
	
	events: {
		'click': 'selectItem'
	},
		
	templateHelpers: function () {
		var itemValueField = Marionette.getOption(this, 'itemValueField');
		var itemNameField = Marionette.getOption(this, 'itemNameField') || itemValueField;
		
		return { 
			value: this.model.get(itemValueField),
			name: this.model.get(itemNameField)
		};
	},
	
	selectItem: function (event) {
		event.preventDefault();
		
		this.model.collection.trigger('select', this.model);
	}
});