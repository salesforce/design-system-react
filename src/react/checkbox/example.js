import React from 'react';
import Checkbox from './checkbox';

// https://www.lightningdesignsystem.com/components/forms#checkbox

export default function (element) {
	const CheckboxExample = React.createClass({
		getInitialState () {
			const checkboxen = new Map();

			checkboxen.set('checkbox', {disabled: false, checked: true});
			checkboxen.set('checkbox2', {disabled: false, checked: false});

			return { checkboxen };
		},

		render () {
			return (
				<fieldset className="slds-form-element">
					<div className="slds-form-element__control">
						<Checkbox ref="checkbox"
									labelText="Custom checkbox checked on initialization"
									disabled={this.state.checkboxen.get('checkbox').disabled}
									checked={this.state.checkboxen.get('checkbox').checked}
									onCheckedValueChanged={this._handleChange.bind(this, 'checkbox')}
									onDisabledValueChanged={this._handleDisable.bind(this, 'checkbox')}
									value="checkbox" />
						<Checkbox ref="checkbox2"
									labelText="Custom checkbox not checked on initialization"
									disabled={this.state.checkboxen.get('checkbox2').disabled}
									checked={this.state.checkboxen.get('checkbox2').checked}
									onCheckedValueChanged={this._handleChange.bind(this, 'checkbox2')}
									onDisabledValueChanged={this._handleDisable.bind(this, 'checkbox2')}
									value="checkbox2" />
					</div>
					<div className="slds-p-around--medium">
						<div className="slds-button-group" role="group">
							<button type="button" className="slds-button slds-button--neutral" onClick={this._handleClick}>check</button>
							<button type="button" className="slds-button slds-button--neutral" onClick={this._handleClick}>uncheck</button>
							<button type="button" className="slds-button slds-button--neutral" onClick={this._handleClick}>disable</button>
							<button type="button" className="slds-button slds-button--neutral" onClick={this._handleClick}>enable</button>
						</div>
					</div>
				</fieldset>
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

	React.render(<CheckboxExample />, element);
}
