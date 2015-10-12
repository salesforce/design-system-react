import React from 'react';
import Radio from './radio';

// https://www.lightningdesignsystem.com/components/forms#radio

export default function (element) {
	const RadioExample = React.createClass({
		getInitialState () {
			return {
				matchesValue: 'value4',
				disabled: [false, false, true]
			};
		},

		render () {
			const name = 'radioGroup1';
			const radios = [
				<Radio ref="radio0"
						checkedValue={this.state.matchesValue}
						disabled={this.state.disabled[0]}
						key="1"
						name={name}
						labelText="Custom radio unchecked on initialization"
						onCheckedValueChanged={this._handleChange}
						onDisabledValueChanged={this._handleDisable0}
						value="value1" />,
				<Radio ref="radio1"
						checkedValue={this.state.matchesValue}
						disabled={this.state.disabled[1]}
						key="2"
						name={name}
						labelText="Custom radio unchecked on initialization"
						onCheckedValueChanged={this._handleChange}
						onDisabledValueChanged={this._handleDisable1}
						value="value3" />,
				<Radio ref="radio2"
						checkedValue={this.state.matchesValue}
						disabled={this.state.disabled[2]}
						key="3"
						name={name}
						labelText="Custom radio disabled checked on initialization"
						onCheckedValueChanged={this._handleChange}
						onDisabledValueChanged={this._handleDisable2}
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

		_handleChange (checkedValue) {
			this.setState({
				matchesValue: checkedValue
			});
		},

		_handleDisable0 (disabledValue) {
			const disabled = this.state.disabled;
			disabled[0] = disabledValue.disabled;
			this.setState(disabled);
		},

		_handleDisable1 (disabledValue) {
			const disabled = this.state.disabled;
			disabled[1] = disabledValue.disabled;
			this.setState(disabled);
		},

		_handleDisable2 (disabledValue) {
			const disabled = this.state.disabled;
			disabled[2] = disabledValue.disabled;
			this.setState(disabled);
		}
	});

	React.render(<RadioExample />, element);
}
