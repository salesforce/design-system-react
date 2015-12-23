import React from 'react';
import {Radio} from 'design-system-react';

// https://www.lightningdesignsystem.com/components/forms#radio

// TODO: consider creation of a Radios React component based off of this example code (as we did with jQuery)
export default React.createClass({
	getInitialState () {
		const radioboxen = new Map();

		radioboxen.set('radio1', {disabled: false, checked: true});
		radioboxen.set('radio2', {disabled: false, checked: false});
		radioboxen.set('radio3', {disabled: true, checked: false});

		return { radioboxen };
	},

	render () {
		const name = 'radioGroup1';
		const radios = [
			<Radio ref="radio1"
				checked={this.state.radioboxen.get('radio1').checked}
				disabled={this.state.radioboxen.get('radio1').disabled}
				key="1"
				name={name}
				labelText="Checked"
				onChanged={this._handleChange.bind(this, 'radio1')}
				onDisabled={this._handleDisable.bind(this, 'radio1', true)}
				onEnabled={this._handleDisable.bind(this, 'radio1', false)}
				value="value1" />,
			<Radio ref="radio2"
				checked={this.state.radioboxen.get('radio2').checked}
				disabled={this.state.radioboxen.get('radio2').disabled}
				key="2"
				name={name}
				labelText="Unchecked"
				onChanged={this._handleChange.bind(this, 'radio2')}
				onDisabled={this._handleDisable.bind(this, 'radio2', true)}
				onEnabled={this._handleDisable.bind(this, 'radio2', false)}
				value="value3" />,
			<Radio ref="radio3"
				checked={this.state.radioboxen.get('radio3').checked}
				disabled={this.state.radioboxen.get('radio3').disabled}
				key="3"
				name={name}
				labelText="Unchecked Disabled"
				onChanged={this._handleChange.bind(this, 'radio3')}
				onDisabled={this._handleDisable.bind(this, 'radio3', true)}
				onEnabled={this._handleDisable.bind(this, 'radio3', false)}
				value="value4" />
		];

		return (
			<div>
				<div className="slds-col example">
					<fieldset className="slds-form-element">
						<legend className="slds-form-element__label slds-form-element__label--top">Opts</legend>
						<div className="slds-form-element__control">
							{radios}
						</div>
					</fieldset>
				</div>
				<div className="slds-col demo-controls">
					<div className="slds-button-group" role="group">
						<button type="button" className="slds-button slds-button--neutral slds-button--x-small" onClick={this._handleClick}>Check first</button>
						<button type="button" className="slds-button slds-button--neutral slds-button--x-small" onClick={this._handleClick}>Check second</button>
					</div>
					<div className="slds-button-group" role="group">
						<button type="button" className="slds-button slds-button--neutral slds-button--x-small" onClick={this._handleClick}>Disable first</button>
						<button type="button" className="slds-button slds-button--neutral slds-button--x-small" onClick={this._handleClick}>Enable first</button>
						<button type="button" className="slds-button slds-button--neutral slds-button--x-small" onClick={this._handleClick}>Disable all</button>
						<button type="button" className="slds-button slds-button--neutral slds-button--x-small" onClick={this._handleClick}>Enable all</button>
					</div>
				</div>
			</div>
		);
	},

	_handleClick (e) {
		const radioboxen = this.state.radioboxen;
		
		// translate text of button into method call
		switch (e.target.firstChild.data.toLowerCase()) {
			case 'check first':
				radioboxen.get('radio1').checked = true;
				radioboxen.get('radio2').checked = false;
				radioboxen.get('radio3').checked = false;
				break;
			case 'check second':
				radioboxen.get('radio1').checked = false;
				radioboxen.get('radio2').checked = true;
				radioboxen.get('radio3').checked = false;
				break;
			case 'disable first':
				radioboxen.get('radio1').disabled = true;
				break;
			case 'enable first':
				radioboxen.get('radio1').disabled = false;
				break;
			case 'disable all':
				radioboxen.get('radio1').disabled = true;
				radioboxen.get('radio2').disabled = true;
				radioboxen.get('radio3').disabled = true;
				break;
			case 'enable all':
				radioboxen.get('radio1').disabled = false;
				radioboxen.get('radio2').disabled = false;
				radioboxen.get('radio3').disabled = false;
				break;
			default:
				break;
		}
		
		this.setState({
			radioboxen
		});
	},

	_handleChange (radioName, checkedValue) {
		const radioboxen = this.state.radioboxen;
		radioboxen.forEach(function (values, key, map) {
			values.checked = false;
			map.set(key, values);
		});
		const radio = radioboxen.get(radioName);
		radio.checked = checkedValue;
		radioboxen.set(radioName, radio);
		this.setState(radioboxen);
	},

	_handleDisable (radioName, disabled) {
		const radio = this.state.radioboxen.get(radioName);
		radio.disabled = disabled;
		this.setState(radio);
	}
});
