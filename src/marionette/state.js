// STATE - MARIONETTE FACADE

// Framework specific
import Backbone from 'backbone';

const State = {
	__initializeState () {
		this.model = this.model || new Backbone.Model();
	},
	
	setState (values) {
		return this.model.set(values);
	},

	getState (key) {
		return this.model.get(key);
	}
};

export default State;
