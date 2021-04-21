/* eslint-disable no-console, react/prop-types */
import React from 'react';
import Checkbox from '~/components/checkbox';
import Combobox from '~/components/combobox';
import IconSettings from '~/components/icon-settings';
import Popover from '~/components/popover';

const languages = ['English', 'German', 'Tobagonian Creole English', 'Spanish'];

class Example extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValue: 'Select an option',
			selection: [],
			checked: [],
		};
		this.handleClose = this.handleClose.bind(this);
	}

	getIsChecked(label) {
		let isChecked = false;
		const checkedIndex = this.state.checked.findIndex(
			(el) => el.label === label
		);
		if (checkedIndex > -1) isChecked = true;
		return isChecked;
	}

	getInputString = (options) => {
		let inputValue = '';
		if (options.length === 0) inputValue = 'Select an option';
		else if (options.length === 1) inputValue = `${options[0].label}`;
		else inputValue = `${options.length} options selected`;
		return inputValue;
	};

	handleCheckboxChange(targetChecked, target, value) {
		const { checked } = this.state;
		if (targetChecked) {
			checked.push({
				id: target.id,
				label: value,
			});
		} else {
			const valueIndex = checked.findIndex((el) => el.label === value);
			checked.splice(valueIndex, 1);
		}

		const inputValue = this.getInputString(checked);
		this.setState({ inputValue, checked });
	}

	handleClose(e, { trigger }) {
		if (trigger === 'cancel') {
			const inputValue = this.getInputString(this.state.selection);
			const selection =
				this.state.selection.length > 0 ? this.state.selection.slice(0) : [];
			this.setState({
				checked: selection,
				inputValue,
			});
		} else {
			const checked =
				this.state.checked.length > 0 ? this.state.checked.slice(0) : [];
			this.setState({
				selection: checked,
			});
		}
	}

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Combobox
					assistiveText={{
						popoverLabel: 'Language Options',
					}}
					id="combobox-dialog"
					errorText={
						this.state.selection.length > 2 || this.state.checked.length > 2
							? 'Only select 2 options.'
							: null
					}
					labels={{
						label: 'Languages',
						placeholder: this.state.inputValue,
					}}
					popover={
						<Popover
							body={
								<div>
									<fieldset className="slds-form-element">
										<legend className="slds-form-element__legend slds-form-element__label">
											Select up to 2
										</legend>
										<div className="slds-form-element__control">
											{languages.map((language, i) => (
												<Checkbox
													checked={this.getIsChecked(language)}
													id={`checkbox-${i}`}
													key={`checkbox-${i + 1}`}
													labels={{ label: language }}
													onChange={(e, { checked }) => {
														this.handleCheckboxChange(
															checked,
															e.target,
															language
														);
													}}
												/>
											))}
										</div>
									</fieldset>
								</div>
							}
							onClose={this.handleClose}
						/>
					}
					selection={this.state.selection}
					value={this.state.inputValue}
					variant="popover"
				/>
			</IconSettings>
		);
	}
}

Example.displayName = 'ComboboxExample';
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
