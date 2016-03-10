import React from 'react';
import Checkbox from './index';
import { ExampleEvents } from 'slds-for-js-core/utilities/main';

// SAMPLE CONTROL CODE -->

const CheckboxExample = React.createClass({
	componentDidMount () {
		ExampleEvents.registerEventListener(this, 'checkbox', 'exampleMethod');
	},

	getInitialState () {
		const checkboxSampleData = [
			{
				text: 'Checked', value: 'checkbox-value-0', checked: true
			}, {
				text: 'Unchecked', value: 'checkbox-value-1', checked: false
			}
		];
		const checkboxen = new Map();
		function populateCheckboxen ( element, index ) {
			checkboxen.set('checkbox' + (index + 1), element);
		}
		checkboxSampleData.forEach(populateCheckboxen);
		return { checkboxen };
	},

	render () {
		const checkboxenState = this.state.checkboxen;
		return (
			<fieldset className="slds-form-element">
				<legend className="slds-form-element__label slds-form-element__label--top"></legend>
				<div className="slds-form-element__control">
					<Checkbox
						checked={checkboxenState.get('checkbox1').checked}
						disabled={checkboxenState.get('checkbox1').disabled}
						labelText={checkboxenState.get('checkbox1').text}
						onChanged={this._handleChange.bind(this, 'checkbox1')}
						onDisabled={this._handleDisable.bind(this, 'checkbox1', true)}
						onEnabled={this._handleDisable.bind(this, 'checkbox1', false)}
						value={checkboxenState.get('checkbox1').value}/>
				</div>
				<div className="slds-form-element__control">
					<Checkbox
						checked={checkboxenState.get('checkbox2').checked}
						disabled={checkboxenState.get('checkbox2').disabled}
						labelText={checkboxenState.get('checkbox2').text}
						onChanged={this._handleChange.bind(this, 'checkbox2')}
						onDisabled={this._handleDisable.bind(this, 'checkbox2', true)}
						onEnabled={this._handleDisable.bind(this, 'checkbox2', false)}
						value={checkboxenState.get('checkbox2').value}/>
				</div>
			</fieldset>
		);
	},

	_handleChange (checkboxName, checkedValue) {
		const checkboxenState = this.state.checkboxen;
		checkboxenState.get(checkboxName).checked = checkedValue;
		this.setState(checkboxenState);
	},

	_handleDisable (checkboxName, disabledValue) {
		const checkboxenState = this.state.checkboxen;
		checkboxenState.get(checkboxName).disabled = disabledValue;
		this.setState(checkboxenState);
	},

	enable () {
		const checkboxenState = this.state.checkboxen;
		checkboxenState.get('checkbox1').disabled = false;
		this.setState(checkboxenState);
	},

	disable () {
		const checkboxenState = this.state.checkboxen;
		checkboxenState.get('checkbox1').disabled = true;
		this.setState(checkboxenState);
	},

	check () {
		const checkboxenState = this.state.checkboxen;
		checkboxenState.get('checkbox1').checked = true;
		this.setState(checkboxenState);
	},

	uncheck () {
		const checkboxenState = this.state.checkboxen;
		checkboxenState.get('checkbox1').checked = false;
		this.setState(checkboxenState);
	}
});

// <-- SAMPLE CONTROL CODE

export default CheckboxExample;
