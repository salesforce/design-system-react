import React from 'react';
import VisualPicker from '~/components/visual-picker';
import { Radio, Checkbox } from '~/components';
import IconSettings from '~/components/icon-settings';

class Example extends React.Component {
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
							value="30"
							onRenderVisualPicker={() => (
								<span>
									<span className="slds-text-heading_large">$30</span>
									<span className="slds-text-title">USD/user/month *</span>
								</span>
							)}
						/>
						<Radio
							labels={{
								heading: 'Lightning Enterprise',
								label: 'Everything you need to take support to the next level',
							}}
							id="visual-picker-non-coverable-radio-2"
							value="150"
							onRenderVisualPicker={() => (
								<span>
									<span className="slds-text-heading_large">$150</span>
									<span className="slds-text-title">USD/user/month *</span>
								</span>
							)}
						/>
						<Radio
							labels={{
								heading: 'Lightning Ultimate',
								label: 'Complete support with enterprise-grade customization',
							}}
							id="visual-picker-non-coverable-radio-3"
							disabled
							value="300"
							onRenderVisualPicker={() => (
								<span>
									<span className="slds-text-heading_large">$300</span>
									<span className="slds-text-title">USD/user/month *</span>
								</span>
							)}
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
							value="30"
							onRenderVisualPicker={() => (
								<span>
									<span className="slds-text-heading_large">$30</span>
									<span className="slds-text-title">USD/user/month *</span>
								</span>
							)}
						/>
						<Checkbox
							labels={{
								heading: 'Lightning Enterprise',
								label: 'Everything you need to take support to the next level',
							}}
							id="visual-picker-non-coverable-checkbox-2"
							value="150"
							onRenderVisualPicker={() => (
								<span>
									<span className="slds-text-heading_large">$150</span>
									<span className="slds-text-title">USD/user/month *</span>
								</span>
							)}
						/>
						<Checkbox
							labels={{
								heading: 'Lightning Ultimate',
								label: 'Complete support with enterprise-grade customization',
							}}
							id="visual-picker-non-coverable-checkbox-3"
							disabled
							value="300"
							onRenderVisualPicker={() => (
								<span>
									<span className="slds-text-heading_large">$300</span>
									<span className="slds-text-title">USD/user/month *</span>
								</span>
							)}
						/>
					</VisualPicker>
				</div>
			</IconSettings>
		);
	}
}
Example.displayName = 'VisualPickerNonCoverable';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
