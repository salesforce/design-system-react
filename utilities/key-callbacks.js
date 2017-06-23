/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
import EventUtil from './event';

/*
 * Helper function that has callbacks passed into it with the key being the keycode of the event
 */
const mapKeyEventCallbacks = (event, { callbacks = {}, shiftCallbacks = {} }) => {
	if (event.shiftKey
		&& event.keyCode
		&& shiftCallbacks[event.keyCode]) {
		EventUtil.trapEvent(event);
		shiftCallbacks[event.keyCode].callback(event, shiftCallbacks[event.keyCode].data);
	}	else if (event.keyCode
		&& callbacks[event.keyCode]) {
		EventUtil.trapEvent(event);
		callbacks[event.keyCode].callback(event, callbacks[event.keyCode].data);
	}
};

export default mapKeyEventCallbacks;
