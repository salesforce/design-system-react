// SAMPLE COMPONENT CODE -->
import React from 'react';

import Checkbox from 'slds-for-react/checkbox';

const CheckboxExample = React.createClass({
	displayName: 'CheckboxExample',

	getInitialState () {
		return {
			Apples: true,
			Oranges: false
		};
	},

	render () {
		return (
			<fieldset className="slds-form-element">
				<legend className="slds-form-element__label slds-form-element__label--top"></legend>
				<div className="slds-form-element__control">
					<Checkbox
						checked={this.state.Apples}
						labelText="Apples"
						onChanged={this._getChangeHandler('Apples')}
						value="Apples"
					/>
				</div>
				<div className="slds-form-element__control">
				<Checkbox
					checked={this.state.Oranges}
					labelText="Oranges"
					onChanged={this._getChangeHandler('Oranges')}
					value="Oranges"
				/>
				</div>
			</fieldset>
		);
	},

	_getChangeHandler (fruit) {
		return (checked) => {
			const newState = {};
			newState[fruit] = checked;
			this.setState(newState);
		};
	}
});

// <-- SAMPLE COMPONENT CODE

export default CheckboxExample;
