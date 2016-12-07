import React from 'react';
import InlineEdit from '~/components/forms/input/inline'; // `~` is replaced with design-system-react at runtime

const Example = React.createClass({
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

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
