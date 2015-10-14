import React from 'react';
import Radio from './radio';

// https://www.lightningdesignsystem.com/components/forms#radio

export default function (element) {
	const RadioExample = React.createClass({
		getInitialState () {
			const radioboxen = new Map();

			radioboxen.set('radio0', {disabled: false, checked: true});
			radioboxen.set('radio1', {disabled: false, checked: false});
			radioboxen.set('radio2', {disabled: false, checked: false});

			return { radioboxen };
		},

		render () {
			const name = 'radioGroup1';
			const radios = [
				<Radio ref="radio0"
						checked={this.state.radioboxen.get('radio0').checked}
						disabled={this.state.radioboxen.get('radio0').disabled}
						key="1"
						name={name}
						labelText="Custom radio unchecked on initialization"
						onCheckedValueChanged={this._handleChange.bind(this, 'radio0')}
						onDisabledValueChanged={this._handleDisable.bind(this, 'radio0')}
						value="value1" />,
				<Radio ref="radio1"
						checked={this.state.radioboxen.get('radio1').checked}
						disabled={this.state.radioboxen.get('radio1').disabled}
						key="2"
						name={name}
						labelText="Custom radio unchecked on initialization"
						onCheckedValueChanged={this._handleChange.bind(this, 'radio1')}
						onDisabledValueChanged={this._handleDisable.bind(this, 'radio1')}
						value="value3" />,
				<Radio ref="radio2"
						checked={this.state.radioboxen.get('radio2').checked}
						disabled={this.state.radioboxen.get('radio2').disabled}
						key="3"
						name={name}
						labelText="Custom radio disabled checked on initialization"
						onCheckedValueChanged={this._handleChange.bind(this, 'radio2')}
						onDisabledValueChanged={this._handleDisable.bind(this, 'radio2')}
						value="value4" />

			];
			return (<fieldset className="slds-form-element">
						<div className="slds-form-element__control">
							{radios}
						</div>
						<div className="slds-p-around--medium">
							<div className="slds-button-group" role="group">
								<button type="button" className="slds-button slds-button--neutral" onClick={this._handleClick}>check first</button>
								<button type="button" className="slds-button slds-button--neutral" onClick={this._handleClick}>check second</button>
								<button type="button" className="slds-button slds-button--neutral" onClick={this._handleClick}>disable first</button>
								<button type="button" className="slds-button slds-button--neutral" onClick={this._handleClick}>enable first</button>
								<button type="button" className="slds-button slds-button--neutral" onClick={this._handleClick}>disable all</button>
								<button type="button" className="slds-button slds-button--neutral" onClick={this._handleClick}>enable all</button>
							</div>
						</div>
					</fieldset>);
		},

		_handleClick (e) {
			// translate text of button into method call
			switch (e.target.firstChild.data) {
				case 'check first':
					this.refs.radio0.check();
					break;
				case 'check second':
					this.refs.radio1.check();
					break;
				case 'disable first':
					this.refs.radio0.disable();
					break;
				case 'enable first':
					this.refs.radio0.enable();
					break;
				case 'disable all':
					this.refs.radio0.disable();
					this.refs.radio1.disable();
					this.refs.radio2.disable();
					break;
				case 'enable all':
					this.refs.radio0.enable();
					this.refs.radio1.enable();
					this.refs.radio2.enable();
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

	React.render(<RadioExample />, element);
}
