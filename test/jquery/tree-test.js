// TODO: Fill in this file with API-specific tests here

export const behaviorHandlers = {
	createComponent: {
		approach1: function (initData) {
			// TODO: Really call control, these are just to test that the behaviors are working
			const $ = require('jquery');
			const tree = $('<ul class="tree approach-1" role="tree" />');
			$(initData.container).append(tree);
			return tree;
		},
		approach2: function () {
			// TODO: Really call control, these are just to test that the behaviors are working
			const $ = require('jquery');
			$('body').append('<div class="tree approach-2"></div>');
		}
	},

	getComponentElement: {
		default: function (component) {
			return component[0];
		}
	},

	destroyComponent: {
		default: function (component) {
			// TODO: Call control, these are just to test that the behaviors are working
			component.remove();
		}
	}
};
