/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
import EventUtil from './event';

/*
 * Helper function that has callbacks passed into it with the key
 * being the keycode of the event. This allows an object literal to
 * control key event callback mapping and avoids a long conditional
 * if statement and uses an enumeration pattern instead.
 */
const mapKeyEventCallbacks = (
	event,
	{ callbacks = {}, shiftCallbacks = {}, stopPropagation = true }
) => {
	if (event.shiftKey && event.keyCode && shiftCallbacks[event.keyCode]) {
		if (stopPropagation) {
			EventUtil.trapEvent(event);
		}
		shiftCallbacks[event.keyCode].callback(
			event,
			shiftCallbacks[event.keyCode].data
		);
	} else if (event.keyCode && callbacks[event.keyCode]) {
		if (stopPropagation) {
			EventUtil.trapEvent(event);
		}
		callbacks[event.keyCode].callback(event, callbacks[event.keyCode].data);
	} else if (event.keyCode && callbacks.other) {
		// You will likely NOT want to stop propagation of all key presses!
		if (callbacks.other.stopPropagation) {
			EventUtil.trapEvent(event);
		}
		callbacks.other.callback(event, callbacks.other.data);
	}
};

export default mapKeyEventCallbacks;
