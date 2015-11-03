// EVENTS - JQUERY FACADE

// Core
import * as Lib from '../lib/lib';

const Events = {
	trigger (eventName, ...args) {
		if (this.rendered) {
			let name = eventName;
			
			if (Lib.isString(this.eventSuffix)) {
				name = [name, this.eventSuffix].join('.');
			}
			
			this.element.trigger(name, ...args);
		}
	}
};

export default Events;
