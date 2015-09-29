/*
 * JQUERY FACADE API FOR SELECTLIST TESTS
 * Facade (or framework specific) implementation of tests defined in behaviors folder
 */

// Core file for helpful things like CSS class names
import { CONTROL as controlName } from '../../src/core/selectlist';
import SelectlistCore from '../../src/core/selectlist';
import * as Lib from '../../src/lib/lib';
const Core = SelectlistCore;

// Run in legacy plugin mode
import Selectlist from '../../src/jquery/selectlist/selectlist';

const $ = Lib.global.jQuery || Lib.global.$;

export const behaviorHandlers = {

	createComponent: {
		default: function (initData, rendered) {
			const imperativeMarkup = '<div id="my-selectlist"></div>';
			$(initData.container).append(imperativeMarkup);
			const $selectlist = new Selectlist( $('#my-' + controlName), initData );

			$('#my-selectlist').on('rendered.fu.selectlist', function () {
				rendered($selectlist);
			});

			return $selectlist;
		}
	},

	getComponentElement: {
		default: function (createdComponent) {
			return createdComponent.options.container.find('.' + Core.cssClasses.CONTROL)[0];
		}
	},

	destroyComponent: {
		default: function (createdComponent) {
			createdComponent.destroy();
		}
	}

};
