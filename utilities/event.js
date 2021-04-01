/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

const EventUtil = {
	trapEvent: (event) => {
		if (!event) return;
		event.preventDefault();
		event.stopPropagation();
		if (event.nativeEvent && event.nativeEvent.preventDefault) {
			event.nativeEvent.preventDefault();
		}

		if (event.nativeEvent && event.nativeEvent.stopPropagation) {
			event.nativeEvent.stopPropagation();
		}
	},

	trap: (event) => EventUtil.trapEvent(event),

	trapImmediate: (event) => {
		if (event.stopImmediatePropagation) {
			event.stopImmediatePropagation();
		}

		if (event.nativeEvent && event.nativeEvent.stopImmediatePropagation) {
			event.nativeEvent.stopImmediatePropagation();
		}

		EventUtil.trap(event);
	},

	trappedHandler: (handler) => {
		return (event) => {
			EventUtil.trap(event);

			if (handler) {
				handler(event);
			}
		};
	},
};

export default EventUtil;
