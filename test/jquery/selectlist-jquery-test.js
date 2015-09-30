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

	createControl: {
		default: function (initData, controlContainer, rendered) {
			const imperativeMarkup = '<div id="' + 'my-' + controlName + '"></div>';
			$(controlContainer).append(imperativeMarkup);

			const $control = new Selectlist( $('#my-' + controlName), initData );

			$('#my-' + controlName).on('rendered.fu.selectlist', function () {
				rendered(controlContainer, $control);
			});

			return $control;
		}
	},

	getControlElement: {
		default: function (controlContainer) {
			return $(controlContainer).find('.' + Core.cssClasses.CONTROL)[0];
		}
	},

	destroyControl: {
		default: function (createdControl) {
			createdControl.destroy();
		}
	},

	disableControl: {
		default: function (createdControl) {
			createdControl.disable();
		}
	},

	enableControl: {
		default: function (createdControl) {
			createdControl.enable();
		}
	},

	getSelection: {
		default: function (createdControl) {
			return createdControl.getSelection();
		}
	},

	createEventListener: {
		default: function (eventName, callback)  {
			$('#my-' + controlName).on(eventName + '.fu.selectlist', function () {
				callback();
			});
		}
	}

};
