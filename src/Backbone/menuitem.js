import _ from 'underscore';
import Backbone from 'backbone';

export var MenuItem = Backbone.View.extend({
	tagName: 'li',
	
	template: _.template('<a href="#"><%- name %></a>'),
	
	events: {
		"click a" : "handleClicked"
	},
	
	initialize (options) {
		_.bindAll(this, 'render', 'handleClicked');
		
		this.onSelected = options.onSelected;
	},
		
	render () {
		var attrs = this.model.toJSON();
		
		this.$el.html(this.template(attrs));
		
		return this;
	},
	
	handleClicked (e) {
		e.preventDefault();
		this.onSelected(this.model);
	}
});