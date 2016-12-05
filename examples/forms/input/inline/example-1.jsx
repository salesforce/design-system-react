import InlineEdit from '../../../components/forms/input/inline';

const InlineEditExample = React.createClass({
	displayName: 'InlineEditExample',

	getInitialState () {
		return {
			value: 'Edit me inline'
		};
	},

	render () {
		return (
			<InlineEdit
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

ReactDOM.render(<InlineEditExample />, mountNode);
