/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
import EventUtil from './event';

/*
 * Helper function that has callbacks passed into it with the key
 * being the `KeyboardEvent.key` of the event. This allows an object literal to
 * control key event callback mapping and avoids a long conditional
 * if statement and uses an enumeration pattern instead.
 */
const mapKeyEventCallbacks = (
	event,
	{ callbacks = {}, shiftCallbacks = {}, stopPropagation = true }
) => {
	if (event.shiftKey && event.key && shiftCallbacks[event.key]) {
		if (stopPropagation) {
			EventUtil.trapEvent(event);
		}
		shiftCallbacks[event.key].callback(event, shiftCallbacks[event.key].data);
	} else if (event.key && callbacks[event.key]) {
		if (stopPropagation) {
			EventUtil.trapEvent(event);
		}
		callbacks[event.key].callback(event, callbacks[event.key].data);
	} else if (event.key && callbacks.other) {
		// You will likely NOT want to stop propagation of all key presses!
		if (callbacks.other.stopPropagation) {
			EventUtil.trapEvent(event);
		}
		callbacks.other.callback(event, callbacks.other.data);
	}
};

export default mapKeyEventCallbacks;
