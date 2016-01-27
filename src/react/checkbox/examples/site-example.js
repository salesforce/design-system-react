import React from 'react';
import {Checkbox} from 'design-system-react';
import {ExampleEvents} from 'design-system-utilities-react';

// https://www.lightningdesignsystem.com/components/forms#checkbox

export default React.createClass({
	componentDidMount () {
		ExampleEvents.registerEventListener(this, 'checkbox', 'exampleMethod');
	},

	getInitialState () {
		return {
			model: {
				checkbox1: {
					disabled: false,
					checked: true
				},
				checkbox2: {
					disabled: false,
					checked: false
				}
			}
		};
	},

	render () {
		return (
			<fieldset className="slds-form-element">
				<legend className="slds-form-element__label slds-form-element__label--top"></legend>
				<div className="slds-form-element__control">
					<Checkbox
						checked={this.state.model.checkbox1.checked}
						disabled={this.state.model.checkbox1.disabled}
						labelText="Checked"
						onChanged={this._handleChange.bind(this, 'checkbox1')}
						onDisabled={this._handleDisable.bind(this, 'checkbox1', true)}
						onEnabled={this._handleDisable.bind(this, 'checkbox1', false)}
						value="checkbox"/>
				</div>
				<div className="slds-form-element__control">
					<Checkbox
						checked={this.state.model.checkbox2.checked}
						disabled={this.state.model.checkbox2.checked.disabled}
						labelText="Unchecked"
						onChanged={this._handleChange.bind(this, 'checkbox2')}
						onDisabled={this._handleDisable.bind(this, 'checkbox2', true)}
						onEnabled={this._handleDisable.bind(this, 'checkbox2', false)}
						value="checkbox2"/>
				</div>
			</fieldset>
		);
	},

	_handleChange (checkboxName, checkedValue) {
		const model = this.state.model;
		model[checkboxName].checked = checkedValue;
		this.setState(model);
	},

	_handleDisable (checkboxName, disabledValue) {
		const model = this.state.model;
		model[checkboxName].disabled = disabledValue;
		this.setState(model);
	},

	enable () {
		const model = this.state.model;
		model.checkbox1.disabled = false;
		this.setState({model});
	},

	disable () {
		const model = this.state.model;
		model.checkbox1.disabled = true;
		this.setState({model});
	},

	check () {
		const model = this.state.model;
		model.checkbox1.checked = true;
		this.setState({model});
	},

	uncheck () {
		const model = this.state.model;
		model.checkbox1.checked = false;
		this.setState({model});
	}
});
