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
					<VisualPicker label="Please Select Any One" vertical>
						<Radio
							value="30"
							onRenderVisualPicker={
								<span>
									<span className="slds-text-heading_medium slds-m-bottom_x-small">
										Item Text
									</span>
									<span className="slds-text-title">
										Some optional item description to help the user better
										understand what this option is about.
									</span>
								</span>
							}
						/>
						<Radio
							value="150"
							onRenderVisualPicker={
								<span>
									<span className="slds-text-heading_medium slds-m-bottom_x-small">
										Item Text
									</span>
									<span className="slds-text-title">
										Some optional item description to help the user better
										understand what this option is about.
									</span>
								</span>
							}
						/>
						<Radio
							disabled
							value="300"
							onRenderVisualPicker={
								<span>
									<span className="slds-text-heading_medium slds-m-bottom_x-small">
										Item Text
									</span>
									<span className="slds-text-title">
										Some optional item description to help the user better
										understand what this option is about.
									</span>
								</span>
							}
						/>
					</VisualPicker>
					<hr />
					<h1>Checkbox</h1>
					<VisualPicker label="Please Select Any One" vertical>
						<Checkbox
							value="30"
							onRenderVisualPicker={
								<span>
									<span className="slds-text-heading_medium slds-m-bottom_x-small">
										Item Text
									</span>
									<span className="slds-text-title">
										Some optional item description to help the user better
										understand what this option is about.
									</span>
								</span>
							}
						/>
						<Checkbox
							value="150"
							onRenderVisualPicker={
								<span>
									<span className="slds-text-heading_medium slds-m-bottom_x-small">
										Item Text
									</span>
									<span className="slds-text-title">
										Some optional item description to help the user better
										understand what this option is about.
									</span>
								</span>
							}
						/>
						<Checkbox
							disabled
							value="300"
							onRenderVisualPicker={
								<span>
									<span className="slds-text-heading_medium slds-m-bottom_x-small">
										Item Text
									</span>
									<span className="slds-text-title">
										Some optional item description to help the user better
										understand what this option is about.
									</span>
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
