import React from 'react';
// `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings';
import Checkbox from '~/components/checkbox';

class Example extends React.Component {
	static displayName = 'CheckboxExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div className="slds-grid slds-grid_pull-padded slds-grid_vertical-align-center">
					<div className="slds-col_padded">
						<Checkbox
							assistiveText={{
								label: 'Default',
							}}
							id="checkbox-example"
							labels={{
								label: 'Default',
							}}
							onChange={(e) => {
								console.log('onChange ', e.target);
							}}
						/>
					</div>
					<div className="slds-col_padded">
						<Checkbox
							assistiveText={{
								label: 'Indeterminate',
							}}
							id="checkbox-example-indeterminate"
							indeterminate
							labels={{
								label: 'Indeterminate',
							}}
							onChange={(e) => {
								console.log('onChange ', e.target);
							}}
						/>
					</div>
					<div className="slds-col_padded">
						<Checkbox
							assistiveText={{
								label: 'Indeterminate',
							}}
							id="checkbox-example-required"
							labels={{
								label: 'Required',
							}}
							required
							onChange={(e) => {
								console.log('onChange ', e.target);
							}}
						/>
					</div>
					<div className="slds-col_padded">
						<Checkbox
							assistiveText={{
								label: 'Disabled',
							}}
							id="checkbox-example-disabled"
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
