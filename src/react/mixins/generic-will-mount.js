const genericWillMount = {
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
	}
};

export default genericWillMount;
