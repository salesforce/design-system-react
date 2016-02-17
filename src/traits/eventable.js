/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
// # Eventable Trait
// Bring in the [shared library functions](../lib/lib.html).
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
