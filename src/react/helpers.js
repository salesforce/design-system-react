// REACT HELPERS

var ReactHelpers = {
	getState (key) {
		return this.state[key];
	},
	
	componentWillReceiveProps (nextProps) {
		this.__initializeOptions(nextProps);
	}
};

export default ReactHelpers;
