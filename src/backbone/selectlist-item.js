import _ from 'underscore';
import Backbone from 'backbone';

var SelectlistItem = Backbone.View.extend({
	tagName: 'li',
	
	template: _.template('<a href="#"><%- name %></a>'),
	
	events: {
		'click a' : 'handleClicked'
	},
	
	initialize (options) {
		_.bindAll(this, 'render', 'handleClicked');
		
		this.onSelected = options.onSelected;
	},
		
	render () {
		var attrs = this.model.toJSON();
		
		this.$el.html(this.template(attrs));
		
		this.$el.toggleClass('disabled', attrs.disabled);
		this.$el.prop('disabled', attrs.disabled);
		
		return this;
	},
	
	handleClicked (e) {
		e.preventDefault();
		this.onSelected(this.model);
	}
});

export default SelectlistItem;