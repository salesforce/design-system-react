/*
 * JQUERY FACADE API FOR PICKLIST TESTS
 * Facade (or framework specific) implementation of tests defined in behaviors folder
 */

// Core file for helpful things like CSS class names
import { CONTROL as controlName } from '../../src/core/picklist';
import PicklistCore from '../../src/core/picklist';
import * as Lib from '../../src/lib/lib';
const Core = PicklistCore;

// Run in legacy plugin mode
import Picklist from '../../src/jquery/picklist/picklist';

const $ = Lib.global.jQuery || Lib.global.$;

export const behaviorHandlers = {

	createControl: {
		default: function (initData, controlContainer, rendered) {
			const imperativeMarkup = '<div id="' + 'my-' + controlName + '"></div>';
			$(controlContainer).append(imperativeMarkup);

			const $control = new Picklist( $('#my-' + controlName), initData );

			$('#my-' + controlName).on('rendered', function () {
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
			$('#my-' + controlName).on(eventName, function () {
				callback();
			});
		}
	}

};
