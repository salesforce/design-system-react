import React from 'react';
import Checkbox from './checkbox';

// https://www.lightningdesignsystem.com/components/forms#checkbox

export default function (element) {
	const CheckboxExample = React.createClass({
		getInitialState () {
			return {
				matchesValue: 'value1',
				disabled: false
			};
		},

		render () {
			return (
				<fieldset className="slds-form-element">
					<div className="slds-form-element__control">
						<Checkbox ref="checkbox"
									checkedValue={this.state.matchesValue}
									labelText="Custom checkbox checked on initialization"
									disabled={this.state.disabled}
									onCheckedValueChanged={this._handleChange}
									onDisabledValueChanged={this._handleDisable}
									value="value1" />
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

		_handleChange (checkedValue) {
			this.setState({
				matchesValue: checkedValue
			});
		},

		_handleDisable (disabledValue) {
			this.setState(disabledValue);
		}
	});

	React.render(<CheckboxExample />, element);
}
