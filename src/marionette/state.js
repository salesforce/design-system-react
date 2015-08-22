// STATE - MARIONETTE FACADE

// Core
import * as Lib from '../core/lib';

// Framework specific
import Backbone from 'backbone';

const State = {
	_initializeState () {
		if (this.model) {
			this.model.set(Lib.extend({}, this._defaultProperties, this.model.toJSON()));
		} else {
			this.model = new Backbone.Model(this._defaultProperties);
		}
		
		if (this.state) {
			this.state.set(Lib.extend({}, this._defaultState, this.state.toJSON()));
		} else {
			this.state = new Backbone.Model(this._defaultState);
		}
		
		const delegateEvents = this.delegateEvents;
		const undelegateEvents = this.undelegateEvents;
		
		this.delegateEvents = function () {
			this.bindEntityEvents(this.state, this.getOption('stateEvents'));
			return delegateEvents.apply(this, arguments);
		};
		
		this.undelegateEvents = function () {
			this.unbindEntityEvents(this.state, this.getOption('stateEvents'));
			return undelegateEvents.apply(this, arguments);
		};
	},
	
	setProperties (values) {
		return this.model.set(values);
	},

	getProperty (key) {
		return this.model.get(key);
	},
	
	setState (values) {
		return this.state.set(values);
	},

	getState (key) {
		return this.state.get(key);
	}
};

export default State;
