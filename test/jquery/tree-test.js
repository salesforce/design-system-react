// TODO: Fill in this file with API-specific tests here

export const behaviorHandlers = {
	createComponent: {
		approach1: function (initData) {
			// TODO: Really call control
			const $ = require('jquery');
			const tree = $('<div class="tree approach-1" role="tree" />');
			$(initData.container).append(tree);
			return tree;
		},
		approach2: function () {
			// TODO: Really call control
			const $ = require('jquery');
			$('body').append('<div class="tree approach-2"></div>');
		}
	},

	destroyComponent: {
		default: function (component) {
			// TODO: Call control
			component.remove();
		}
	}
};
