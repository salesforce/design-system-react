import React from 'react';
import Radio from './radio';

export default function (element) {
	const RadioExample = React.createClass({
		getInitialState () {
			return {
				checked: true
			};
		},

		render () {
			return (
				<Radio checked={this.state.checked} disabled={false} highlight={false} text="Custom radio checked on initialization" onChanged={this._handleChange} />
			);
		},

		_handleChange (checked) {
			this.setState({
				checked
			});
		}
	});

	React.render(<RadioExample />, element);
}
