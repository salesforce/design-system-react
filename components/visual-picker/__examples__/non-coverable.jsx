import React from 'react';
import VisualPicker from '~/components/visual-picker';
import NonCoverable from '~/components/visual-picker/private/NonCoverable';

class Example extends React.Component {
	render() {
		return (
			<div
				style={{
					padding: '4rem 1rem 0px',
					background: 'rgb(244, 246, 249)',
				}}
			>
				<h1>Radio</h1>
				<VisualPicker label="Please Select Any One" inputType="radio">
					<NonCoverable
						title="Lightning Professional"
						description="Complete service CRM for teams of any size"
						value="30"
						content={
							<span>
								<span className="slds-text-heading_large">$30</span>
								<span className="slds-text-title">USD/user/month *</span>
							</span>
						}
					/>
					<NonCoverable
						title="Lightning Enterprise"
						description="Everything you need to take support to the next level"
						value="150"
						content={
							<span>
								<span className="slds-text-heading_large">$150</span>
								<span className="slds-text-title">USD/user/month *</span>
							</span>
						}
					/>
					<NonCoverable
						title="Lightning Ultimate"
						disabled
						value="300"
						description="Complete support with enterprise-grade customization"
						content={
							<span>
								<span className="slds-text-heading_large">$300</span>
								<span className="slds-text-title">USD/user/month *</span>
							</span>
						}
					/>
				</VisualPicker>
				<hr />
				<h1>Checkbox</h1>
				<VisualPicker label="Please Select" inputType="checkbox">
					<NonCoverable
						title="Lightning Professional"
						description="Complete service CRM for teams of any size"
						content={
							<span>
								<span className="slds-text-heading_large">$30</span>
								<span className="slds-text-title">USD/user/month *</span>
							</span>
						}
					/>
					<NonCoverable
						title="Lightning Enterprise"
						description="Everything you need to take support to the next level"
						content={
							<span>
								<span className="slds-text-heading_large">$150</span>
								<span className="slds-text-title">USD/user/month *</span>
							</span>
						}
					/>
					<NonCoverable
						title="Lightning Ultimate"
						disabled
						description="Complete support with enterprise-grade customization"
						content={
							<span>
								<span className="slds-text-heading_large">$300</span>
								<span className="slds-text-title">USD/user/month *</span>
							</span>
						}
					/>
				</VisualPicker>
			</div>
		);
	}
}
Example.displayName = 'VisualPickerNonCoverable';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
