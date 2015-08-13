// REACT HELPERS

const ReactHelpers = {
	componentWillMount () {
		const self = this;

		this.elements = {
			wrapper: {
				toggleClass (cssClass, state) {
					const wrapperClasses = self.state.wrapperClasses;
					wrapperClasses[cssClass] = state;

					self.setState({
						wrapperClasses: wrapperClasses
					});
				}
			}
		};

		this.__constructor(this.props);
	},

	getState (key) {
		return this.state[key];
	},

	componentWillReceiveProps (nextProps) {
		this.__initializeOptions(nextProps);
	}
};

export default ReactHelpers;
