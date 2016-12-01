const SLDSInlineEditExample = React.createClass({
	displayName: 'SLDSInlineEditExample',

	getInitialState () {
		return {
			value: 'Edit me inline'
		};
	},

	render () {
		return (
			<SLDSInlineEdit
				name="inline-edit-example-1"
				id="inline-edit-example-1"
				value={this.state.value}
				onChange={this.handleChange}
			/>
		);
	},

	handleChange (eventProps) {
		this.setState({ value: eventProps.value });
	}
});

ReactDOM.render(<SLDSInlineEditExample />, mountNode);
