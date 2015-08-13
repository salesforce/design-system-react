// REACT HELPERS

const ReactHelpers = {
	getState (key) {
		return this.state[key];
	},

	componentWillReceiveProps (nextProps) {
		this.__initializeOptions(nextProps);
	}
};

export default ReactHelpers;
