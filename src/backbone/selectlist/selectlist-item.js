import _ from 'underscore';
import Backbone from 'backbone';
import classNames from 'classnames';

const SelectlistItem = Backbone.View.extend({
	tagName: 'li',
	className () {
		return classNames({
			'dropdown-header': (this.model.get('_itemType') === 'header'),
			'divider': (this.model.get('_itemType') === 'divider')
		});
	},

	template: _.template('<% if (_itemType === "item") { %><a href="#"><%- name %></a><% } else if (_itemType === "header") { %><%- name %><% } %>'),

	events: {
		'click a': 'handleClicked'
	},

	initialize (options) {
		_.bindAll(this, 'render', 'handleClicked');

		this.onSelected = options.onSelected;
	},

	render () {
		const attrs = this.model.toJSON();
		attrs._itemType = attrs._itemType || 'item';

		this.$el.html(this.template(attrs));

		this.$el.toggleClass('disabled', !!attrs.disabled);
		this.$el.prop('disabled', !!attrs.disabled);
		if (this.model.get('_itemType') === 'divider') {
			this.$el.prop('role', 'separator');
		}

		return this;
	},

	handleClicked (e) {
		e.preventDefault();
		this.onSelected(this.model);
	}
});

export default SelectlistItem;
