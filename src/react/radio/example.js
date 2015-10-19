import React from 'react';
import ReactDOM from 'react-dom';
import Radio from './radio';

// https://www.lightningdesignsystem.com/components/forms#radio

export default function () {
	const RadioExample = React.createClass({
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
					onCheckedValueChanged={this._handleChange.bind(this, 'radio1')}
					onDisabledValueChanged={this._handleDisable.bind(this, 'radio1')}
					value="value1" />,
				<Radio ref="radio2"
					checked={this.state.radioboxen.get('radio2').checked}
					disabled={this.state.radioboxen.get('radio2').disabled}
					key="2"
					name={name}
					labelText="Unchecked"
					onCheckedValueChanged={this._handleChange.bind(this, 'radio2')}
					onDisabledValueChanged={this._handleDisable.bind(this, 'radio2')}
					value="value3" />,
				<Radio ref="radio3"
					checked={this.state.radioboxen.get('radio3').checked}
					disabled={this.state.radioboxen.get('radio3').disabled}
					key="3"
					name={name}
					labelText="Unchecked Disabled"
					onCheckedValueChanged={this._handleChange.bind(this, 'radio3')}
					onDisabledValueChanged={this._handleDisable.bind(this, 'radio3')}
					value="value4" />
			];

			return (
				<div>
					<div className="slds-col example">
						<fieldset className="slds-form-element">
							<div className="slds-form-element__control">
								{radios}
							</div>
						</fieldset>
					</div>
					<div className="slds-col demo-controls">
						<div className="slds-button-group" role="group">
							<button type="button" className="slds-button slds-button--neutral slds-button--xsmall" onClick={this._handleClick}>Check first</button>
							<button type="button" className="slds-button slds-button--neutral slds-button--xsmall" onClick={this._handleClick}>Check second</button>
							<button type="button" className="slds-button slds-button--neutral slds-button--xsmall" onClick={this._handleClick}>Disable first</button>
							<button type="button" className="slds-button slds-button--neutral slds-button--xsmall" onClick={this._handleClick}>Enable first</button>
							<button type="button" className="slds-button slds-button--neutral slds-button--xsmall" onClick={this._handleClick}>Disable all</button>
							<button type="button" className="slds-button slds-button--neutral slds-button--xsmall" onClick={this._handleClick}>Enable all</button>
						</div>
					</div>
				</div>
			);
		},

		_handleClick (e) {
			// translate text of button into method call
			switch (e.target.firstChild.data.toLowerCase()) {
				case 'check first':
					this.refs.radio1.check();
					break;
				case 'check second':
					this.refs.radio2.check();
					break;
				case 'disable first':
					this.refs.radio1.disable();
					break;
				case 'enable first':
					this.refs.radio1.enable();
					break;
				case 'disable all':
					this.refs.radio1.disable();
					this.refs.radio2.disable();
					this.refs.radio2.disable();
					break;
				case 'enable all':
					this.refs.radio1.enable();
					this.refs.radio2.enable();
					this.refs.radio3.enable();
					break;
				default:
					break;
			}
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

		_handleDisable (radioName, disabledValue) {
			const radio = this.state.radioboxen.get(radioName);
			radio.disabled = disabledValue.disabled;
			this.setState(radio);
		}
	});

	ReactDOM.render(<RadioExample />, document.getElementById('radio-react-control'));
}
