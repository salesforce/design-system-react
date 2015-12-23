import React from 'react';
import {Checkbox} from 'design-system-react';

// https://www.lightningdesignsystem.com/components/forms#checkbox

export default React.createClass({
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
								checked={this.state.checkboxen.get('checkbox').checked}
								disabled={this.state.checkboxen.get('checkbox').disabled}
								labelText="Checked"
								onChanged={this._handleChange.bind(this, 'checkbox')}
								onDisabled={this._handleDisable.bind(this, 'checkbox', true)}
								onEnabled={this._handleDisable.bind(this, 'checkbox', false)}
								value="checkbox"/>
						</div>
						<div className="slds-form-element__control">
							<Checkbox ref="checkbox2"
								checked={this.state.checkboxen.get('checkbox2').checked}
								disabled={this.state.checkboxen.get('checkbox2').disabled}
								labelText="Unchecked"
								onChanged={this._handleChange.bind(this, 'checkbox2')}
								onDisabled={this._handleDisable.bind(this, 'checkbox2', true)}
								onEnabled={this._handleDisable.bind(this, 'checkbox2', false)}
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
		console.log(e.target.firstChild.data.toLowerCase());
		// translate text of button into method call
		this.refs.checkbox[e.target.firstChild.data.toLowerCase()]();
	},

	_handleChange (checkboxName, checkedValue) {
		const checkbox = this.state.checkboxen.get(checkboxName);
		checkbox.checked = checkedValue;
		this.setState(checkbox);
	},

	_handleDisable (checkboxName, disabledValue) {
		const checkbox = this.state.checkboxen.get(checkboxName);
		checkbox.disabled = disabledValue;
		this.setState(checkbox);
	}
});
