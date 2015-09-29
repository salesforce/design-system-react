import React from 'react';
import Checkbox from './checkbox';

export default function (element) {
	const CheckboxExample = React.createClass({
		getInitialState () {
			return {
				checked: true
			};
		},
		
		render () {
			return (
				<Checkbox checked={this.state.checked} disabled={false} highlight={false} text="Custom checkbox unchecked on page load" onChanged={this._handleChange} />
			);
		},
		
		_handleChange (checked) {
			this.setState({
				checked
			});
		}
	});
	
	React.render(<CheckboxExample />, element);
}
