import * as Lib from '../lib/lib';

const Eventable = {
	on (controlContext, name, callback, context) {
		const events = controlContext._eventableEvents || (controlContext._eventableEvents = {});
		if (!Lib.isObject(events)) return undefined;
		
		if (Lib.isFunction(callback)) {
			const handlers = events[name] || (events[name] = []);
			
			handlers.push({ callback: callback, context: context });
		}
		
		return events;
	},
	
	off (controlContext, name, callback, context) {
		const events = controlContext._eventableEvents || (controlContext._eventableEvents = {});
		if (!Lib.isObject(events)) return undefined;

		const names = name ? [name] : Lib.keys(events);
		let eventName;
		
		for (let i = 0; i < names.length; i++) {
			eventName = names[i];
			const handlers = events[eventName];

			if (!handlers) break;

			const remaining = [];
			for (let j = 0; j < handlers.length; j++) {
				const handler = handlers[j];
				
				if (callback && callback !== handler.callback ||
					context && context !== handler.context) {
					remaining.push(handler);
				}
			}

			if (remaining.length) {
				events[eventName] = remaining;
			} else {
				delete events[eventName];
			}
		}
		
		return events;
	},
	
	trigger (controlContext, name) {
		const events = controlContext._eventableEvents || (controlContext._eventableEvents = {});
		if (!Lib.isObject(events)) return undefined;
		
		let i;
		
		const argumentsLength = Math.max(0, arguments.length - 2);
		const args = Array(argumentsLength);
		for (i = 0; i < argumentsLength; i++) {
			args[i] = arguments[i + 2];
		}
		
		const handlers = events[name];
		let handler;
		if (handlers) {
			const handlersLength = handlers.length;
			for (i = 0; i < handlersLength; i++) {
				handler = handlers[i];
				handler.callback.apply(handler.context, args);
			}
		}
		
		return events;
	}
};

export default Eventable;
