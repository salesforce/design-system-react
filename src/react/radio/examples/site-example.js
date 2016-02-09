import React          from 'react';
import { Radio }      from 'design-system-react';

// SAMPLE CONTROL CODE -->

// https://www.lightningdesignsystem.com/components/forms#radio

const RadioExample = React.createClass({
	getInitialState () {
		const labelText = 'Radio Group Label';
		const name = 'rads';
		const radios = [
			{
				text: 'Checked', value: 'value9', checked: true
			}, {
				text: 'Unchecked', value: 'value10', checked: false
			}, {
				text: 'Unchecked Disabled', value: 'value11', checked: false, disabled: true
			}
		];

		const radiosSampleData = {
			labelText: labelText,
			name: name,
			radios: radios
		};

		const radioboxen = new Map();

		function populateRadioboxen ( element, index ) {
			radioboxen.set('radio' + (index + 1), element);
		}
		radiosSampleData.radios.forEach(populateRadioboxen);

		return {
			radiosSampleData,
			radioboxen
		};
	},

	render () {
		const name = this.state.radiosSampleData.name;
		const labelText = this.state.radiosSampleData.labelText;
		const radios = [
			<Radio
				checked={this.state.radioboxen.get('radio1').checked}
				disabled={this.state.radioboxen.get('radio1').disabled}
				key="1"
				name={name}
				labelText={this.state.radioboxen.get('radio1').text}
				onChanged={this._handleChange.bind(this, 'radio1')}
				onDisabled={this._handleDisable.bind(this, 'radio1', true)}
				onEnabled={this._handleDisable.bind(this, 'radio1', false)}
				value={this.state.radioboxen.get('radio1').value} />,
			<Radio
				checked={this.state.radioboxen.get('radio2').checked}
				disabled={this.state.radioboxen.get('radio2').disabled}
				key="2"
				name={name}
				labelText={this.state.radioboxen.get('radio2').text}
				onChanged={this._handleChange.bind(this, 'radio2')}
				onDisabled={this._handleDisable.bind(this, 'radio2', true)}
				onEnabled={this._handleDisable.bind(this, 'radio2', false)}
				value={this.state.radioboxen.get('radio2').value} />,
			<Radio
				checked={this.state.radioboxen.get('radio3').checked}
				disabled={this.state.radioboxen.get('radio3').disabled}
				key="3"
				name={name}
				labelText={this.state.radioboxen.get('radio3').text}
				onChanged={this._handleChange.bind(this, 'radio3')}
				onDisabled={this._handleDisable.bind(this, 'radio3', true)}
				onEnabled={this._handleDisable.bind(this, 'radio3', false)}
				value={this.state.radioboxen.get('radio3').value} />
		];

		return (
			<div>
				<div className="slds-col example">
					<fieldset className="slds-form-element">
						<legend className="slds-form-element__label slds-form-element__label--top">{labelText}</legend>
						<div className="slds-form-element__control">
							{radios}
						</div>
					</fieldset>
				</div>
				<div className="slds-col demo-controls">
					<div className="slds-button-group" role="group">
						<button type="button" className="slds-button slds-button--neutral slds-button--small" onClick={this._handleClick}>Check first</button>
						<button type="button" className="slds-button slds-button--neutral slds-button--small" onClick={this._handleClick}>Check second</button>
					</div>
					<div className="slds-button-group" role="group">
						<button type="button" className="slds-button slds-button--neutral slds-button--small" onClick={this._handleClick}>Disable first</button>
						<button type="button" className="slds-button slds-button--neutral slds-button--small" onClick={this._handleClick}>Enable first</button>
						<button type="button" className="slds-button slds-button--neutral slds-button--small" onClick={this._handleClick}>Disable all</button>
						<button type="button" className="slds-button slds-button--neutral slds-button--small" onClick={this._handleClick}>Enable all</button>
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

// <-- SAMPLE CONTROL CODE

export default RadioExample;
