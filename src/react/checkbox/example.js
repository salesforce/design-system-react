import React from 'react';
import Checkbox from './checkbox';

export default function (element) {
	const CheckboxExample = React.createClass({
		getInitialState () {
			return {
				selected: false
			};
		},
		
		render () {
			return (
				<Checkbox selected={this.state.selected} text="Custom checkbox unchecked on page load" onChanged={this._handleSelectionChange} />
			);
		},
		
		_handleSelectionChange (selected) {
			this.setState({
				selected
			});
		}
	});
	
	React.render(<CheckboxExample />, element);
}
