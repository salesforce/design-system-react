import React from 'react';
import ReactDOM from 'react-dom';
import Checkbox from './checkbox';

// https://www.lightningdesignsystem.com/components/forms#checkbox

export default function () {
	const CheckboxExample = React.createClass({
		getInitialState () {
			const checkboxen = new Map();

			checkboxen.set('checkbox', {disabled: false, checked: true});
			checkboxen.set('checkbox2', {disabled: false, checked: false});

			return {checkboxen};
		},

		render () {
			return (
				<div>
					<div className="slds-col example">
						<fieldset className="slds-form-element">
							<legend className="slds-form-element__label slds-form-element__label--top"></legend>
							<div className="slds-form-element__control">
								<Checkbox ref="checkbox"
									labelText="Checked"
									disabled={this.state.checkboxen.get('checkbox').disabled}
									checked={this.state.checkboxen.get('checkbox').checked}
									onCheckedValueChanged={this._handleChange.bind(this, 'checkbox')}
									onDisabledValueChanged={this._handleDisable.bind(this, 'checkbox')}
									value="checkbox"/>
							</div>
							<div className="slds-form-element__control">
								<Checkbox ref="checkbox2"
									labelText="Unchecked"
									disabled={this.state.checkboxen.get('checkbox2').disabled}
									checked={this.state.checkboxen.get('checkbox2').checked}
									onCheckedValueChanged={this._handleChange.bind(this, 'checkbox2')}
									onDisabledValueChanged={this._handleDisable.bind(this, 'checkbox2')}
									value="checkbox2"/>
							</div>
						</fieldset>
					</div>
					<div className="slds-col demo-controls">
						<div className="slds-button-group" role="group">
							<button type="button" className="slds-button slds-button--neutral slds-button--x-small" onClick={this._handleClick}>Check</button>
							<button type="button" className="slds-button slds-button--neutral slds-button--x-small" onClick={this._handleClick}>Uncheck</button>
							<button type="button" className="slds-button slds-button--neutral slds-button--x-small" onClick={this._handleClick}>Disable</button>
							<button type="button" className="slds-button slds-button--neutral slds-button--x-small" onClick={this._handleClick}>Enable</button>
						</div>
					</div>
				</div>
			);
		},

		_handleClick (e) {
			// translate text of button into method call
			this.refs.checkbox[e.target.firstChild.data]();
		},

		_handleChange (checkboxName, checkedValue) {
			const checkbox = this.state.checkboxen.get(checkboxName);
			checkbox.checked = checkedValue;
			this.setState(checkbox);
		},

		_handleDisable (checkboxName, disabledValue) {
			const checkbox = this.state.checkboxen.get(checkboxName);
			checkbox.disabled = disabledValue.disabled;
			this.setState(checkbox);
		}
	});

	ReactDOM.render(<CheckboxExample />, document.getElementById('checkbox-react-control'));
}
