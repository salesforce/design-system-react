import React from 'react';
import VisualPicker from '~/components/visual-picker';
import { Radio, Checkbox } from '~/components';
import IconSettings from '~/components/icon-settings';

class Example extends React.Component {
	constructor(props) {
		super(props);
		this.state = { radio: null, checkboxes: {} };
	}

	handleRadioChange = (id) => () => {
		this.setState({ radio: id });
	};

	handleCheckboxChange = (id) => (event, data) => {
		this.setState((previous) => ({
			checkboxes: { ...previous.checkboxes, [id]: data.checked },
		}));
	};

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div
					style={{
						padding: '4rem 1rem 0px',
						background: 'rgb(244, 246, 249)',
					}}
				>
					<h1>Radio</h1>
					<VisualPicker
						label="Please Select Any One"
						id="visual-picker-non-coverable-radio"
					>
						<Radio
							labels={{
								heading: 'Lightning Professional',
								label: 'Complete service CRM for teams of any size',
							}}
							id="visual-picker-non-coverable-radio-1"
							checked={
								this.state.radio === 'visual-picker-non-coverable-radio-1'
							}
							onChange={this.handleRadioChange(
								'visual-picker-non-coverable-radio-1'
							)}
							value="30"
							visualPickerFigure={
								<span>
									<span className="slds-text-heading_large">$30</span>
									<span className="slds-text-title">USD/user/month *</span>
								</span>
							}
						/>
						<Radio
							labels={{
								heading: 'Lightning Enterprise',
								label: 'Everything you need to take support to the next level',
							}}
							id="visual-picker-non-coverable-radio-2"
							checked={
								this.state.radio === 'visual-picker-non-coverable-radio-2'
							}
							onChange={this.handleRadioChange(
								'visual-picker-non-coverable-radio-2'
							)}
							value="150"
							visualPickerFigure={
								<span>
									<span className="slds-text-heading_large">$150</span>
									<span className="slds-text-title">USD/user/month *</span>
								</span>
							}
						/>
						<Radio
							labels={{
								heading: 'Lightning Ultimate',
								label: 'Complete support with enterprise-grade customization',
							}}
							id="visual-picker-non-coverable-radio-3"
							checked={
								this.state.radio === 'visual-picker-non-coverable-radio-3'
							}
							onChange={this.handleRadioChange(
								'visual-picker-non-coverable-radio-3'
							)}
							disabled
							value="300"
							visualPickerFigure={
								<span>
									<span className="slds-text-heading_large">$300</span>
									<span className="slds-text-title">USD/user/month *</span>
								</span>
							}
						/>
					</VisualPicker>
					<hr />
					<h1>Checkbox</h1>
					<VisualPicker
						label="Add the following object(s)"
						id="visual-picker-non-coverable-checkbox"
					>
						<Checkbox
							labels={{
								heading: 'Lightning Professional',
								label: 'Complete service CRM for teams of any size',
							}}
							id="visual-picker-non-coverable-checkbox-1"
							checked={
								!!this.state.checkboxes[
									'visual-picker-non-coverable-checkbox-1'
								]
							}
							onChange={this.handleCheckboxChange(
								'visual-picker-non-coverable-checkbox-1'
							)}
							value="30"
							visualPickerFigure={
								<span>
									<span className="slds-text-heading_large">$30</span>
									<span className="slds-text-title">USD/user/month *</span>
								</span>
							}
						/>
						<Checkbox
							labels={{
								heading: 'Lightning Enterprise',
								label: 'Everything you need to take support to the next level',
							}}
							id="visual-picker-non-coverable-checkbox-2"
							checked={
								!!this.state.checkboxes[
									'visual-picker-non-coverable-checkbox-2'
								]
							}
							onChange={this.handleCheckboxChange(
								'visual-picker-non-coverable-checkbox-2'
							)}
							value="150"
							visualPickerFigure={
								<span>
									<span className="slds-text-heading_large">$150</span>
									<span className="slds-text-title">USD/user/month *</span>
								</span>
							}
						/>
						<Checkbox
							labels={{
								heading: 'Lightning Ultimate',
								label: 'Complete support with enterprise-grade customization',
							}}
							id="visual-picker-non-coverable-checkbox-3"
							checked={
								!!this.state.checkboxes[
									'visual-picker-non-coverable-checkbox-3'
								]
							}
							onChange={this.handleCheckboxChange(
								'visual-picker-non-coverable-checkbox-3'
							)}
							disabled
							value="300"
							visualPickerFigure={
								<span>
									<span className="slds-text-heading_large">$300</span>
									<span className="slds-text-title">USD/user/month *</span>
								</span>
							}
						/>
					</VisualPicker>
				</div>
			</IconSettings>
		);
	}
}
Example.displayName = 'VisualPickerNonCoverable';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
