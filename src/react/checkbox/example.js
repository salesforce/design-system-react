import React from 'react';
import Checkbox from './checkbox';

export default function (element) {
	const CheckboxExample = React.createClass({
		getInitialState () {
			return {
				matchesValue: 'value1'
			};
		},
		
		render () {
			return (
				<Checkbox checkedValue={this.state.matchesValue} disabled={false} highlight={false} text="Custom checkbox checked on initialization" onCheckedValueChanged={this._handleChange} value="value1" />
			);
		},
		
		_handleChange (checkedValue) {
			this.setState({
				matchesValue: checkedValue
			});
		}
	});
	
	React.render(<CheckboxExample />, element);
}
