import React from 'react';
// `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings';
import Checkbox from '~/components/checkbox';

class Example extends React.Component {
	static displayName = 'CheckboxExample';

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<div className="slds-grid slds-grid--pull-padded slds-grid--vertical-align-center">
					<div className="slds-col--padded">
						<Checkbox
							assistiveText={{
								label: 'Default',
							}}
							labels={{
								label: 'Default',
							}}
							onChange={(e) => {
								console.log('onChange ', e.target);
							}}
						/>
					</div>
					<div className="slds-col--padded">
						<Checkbox
							assistiveText={{
								label: 'Indeterminate',
							}}
							indeterminate
							labels={{
								label: 'Indeterminate',
							}}
							onChange={(e) => {
								console.log('onChange ', e.target);
							}}
						/>
					</div>
					<div className="slds-col--padded">
						<Checkbox
							assistiveText={{
								label: 'Indeterminate',
							}}
							labels={{
								label: 'Required',
							}}
							required
							onChange={(e) => {
								console.log('onChange ', e.target);
							}}
						/>
					</div>
					<div className="slds-col--padded">
						<Checkbox
							assistiveText={{
								label: 'Disabled',
							}}
							labels={{
								label: 'Disabled',
							}}
							disabled
							onChange={(e) => {
								console.log('onChange ', e.target);
							}}
						/>
					</div>
				</div>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
