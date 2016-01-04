import * as Lib from '../lib/lib';

const Eventable = {
	on (events, name, callback, context) {
		if (!Lib.isObject(events)) return;
		
		if (Lib.isFunction(callback)) {
			const handlers = events[name] || (events[name] = []);
			
			handlers.push({ callback: callback, context: context });
		}
		
		return events;
	},
	
	off (events, name, callback, context) {
		if (!Lib.isObject(events)) return;

		const names = name ? [name] : Lib.keys(events);
		
		for (let i = 0; i < names.length; i++) {
			name = names[i];
			const handlers = events[name];

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
				events[name] = remaining;
			} else {
				delete events[name];
			}
		}
		
		return events;
	},
	
	trigger (events, name) {
		if (!Lib.isObject(events)) return;
		
		const argumentsLength = Math.max(0, arguments.length - 2);
		const args = Array(argumentsLength);
		for (let i = 0; i < argumentsLength; i++) {
			args[i] = arguments[i + 2]
		}
		
		const handlers = events[name];
		let handler;
		if (handlers) {
			const handlersLength = handlers.length;
			for (let j = 0; j < handlersLength; j++) {
				handler = handlers[j];
				handler.callback.apply(handler.context, args);
			}
		}
		
		return events;
	}
};

export default Eventable;
