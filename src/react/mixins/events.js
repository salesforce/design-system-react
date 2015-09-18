// EVENTS - REACT FACADE

// Core
import * as Lib from '../../lib/lib';

const Events = {
	trigger (eventName, ...args) {
		const name = 'on' + eventName.charAt(0).toUpperCase() + eventName.slice(1);

		if (Lib.isFunction(this.props[name])) {
			this.props[name].apply(this, args);
		}
	}
};

export default Events;
