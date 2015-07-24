// SELECTLIST CONTROL

// Core
import {SelectlistCore} from "../Core/selectlist";

// Framework specific
import _ from 'underscore';
import Backbone from 'backbone';

// Template imports
var fs = require('fs');

export var Selectlist = Backbone.View.extend(Object.assign({}, SelectlistCore, {
	className: 'selectlist btn-group',
	
	template: _.template(fs.readFileSync(__dirname + '/selectlist.html', 'utf8')),
	
	setState (values) {
		return this.model.set(values);
	},
	
	getState (key) {
		return this.model.get(key);
	},
	
	initialize (options) {
		_.bindAll(this, 'setState', 'getState', 'render');
		
		var self = this;
		
		this.elements = {
			wrapper: {
				toggleClass: function (cssClass, state) {
					self.$el.toggleClass(cssClass, state);
				}
			}
		}
		
		this.model = this.model || new Backbone.Model(this.__getInitialState());
		
		this.__constructor(options);
	},
		
	render () {
		var attrs = this.model.toJSON();
		if (attrs.selection) {
			attrs.selection = attrs.selection.toJSON();
		}
		
		this.$el.html(this.template(attrs));
		return this;
	}
}));