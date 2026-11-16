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

	// Keys pressed while an IME composes text belong to the IME: the Enter that
	// commits a composition must not submit. Safari ends the composition before
	// that keydown, so `isComposing` is false there and only `keyCode` 229 shows it.
	isComposing: (event) => {
		const nativeEvent = event.nativeEvent ?? event;
		return nativeEvent.isComposing || nativeEvent.keyCode === 229;
	},
};

export default EventUtil;
