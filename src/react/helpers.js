// REACT HELPERS

import Lib from '../core/lib';

var ReactHelpers = {
	getState (key) {
		return this.state[key];
	},
	
	componentWillReceiveProps(nextProps) {
		this.__initializeOptions(nextProps);
	}
};

export default ReactHelpers;