import React from 'react';
// `~` is replaced with design-system-react at runtime
import Checkbox from '~/components/checkbox';

class Example extends React.Component {
	render() {
		return (
			<div>
				<div className="slds-grid slds-grid_pull-padded slds-grid_vertical-align-center">
					<div className="slds-col_padded">
						<Checkbox
							labels={{
								label: 'Checkbox',
							}}
							id="checkbox-base-example"
						/>
					</div>
					<div className="slds-col_padded">
						<Checkbox
							labels={{
								label: 'Checkbox',
							}}
							id="checkbox-base-example--error"
							errorText="This field has an error"
						/>
					</div>
					<div className="slds-col_padded">
						<Checkbox
							labels={{
								label: 'Checkbox (disabled)',
							}}
							id="checkbox-base-example--disabled"
							disabled
						/>
					</div>
					<div className="slds-col_padded">
						<Checkbox
							labels={{
								label: 'Checkbox (required)',
							}}
							id="checkbox-base-example--required"
							required
						/>
					</div>
				</div>
				<div className="slds-grid slds-grid_pull-padded slds-grid_vertical-align-center">
					<div className="slds-col_padded">
						<Checkbox
							assistiveText={{
								label: 'Checkbox (with assistive text)',
							}}
							id="checkbox-base-example--assistive-text"
						/>
					</div>
					<div className="slds-col_padded">
						<Checkbox
							labels={{
								label: 'Checkbox (checked)',
							}}
							id="checkbox-base-example--checked"
							checked
						/>
					</div>
					<div className="slds-col_padded">
						<Checkbox
							labels={{
								label: 'Checkbox (checked + disabled)',
							}}
							id="checkbox-base-example--checked-disabled"
							checked
							disabled
						/>
					</div>
					<div className="slds-col_padded">
						<Checkbox
							labels={{
								label: 'Checkbox (indeterminate)',
							}}
							id="checkbox-base-example--indeterminate"
							indeterminate
						/>
					</div>
				</div>
			</div>
		);
	}
}

Example.displayName = 'CheckboxExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
