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
	
	initialize: function (options) {
		var self = this;
		
		this.elements = {
			wrapper: {
				toggleClass: function (cssClass, state) {
					self.$el.toggleClass(cssClass, state);
				}
			}
		}
		
		this.__constructor(options);
	},
		
	render () {
		this.$el.html(this.template({}));
		return this;
	}
}));