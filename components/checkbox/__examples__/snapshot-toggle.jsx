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
							label="Toggle"
							aria-describedby="checkbox-toggle-example-desc"
							id="checkbox-toggle-example"
							variant="toggle"
						/>
					</div>
					<div className="slds-col_padded">
						<Checkbox
							label="Toggle"
							aria-describedby="checkbox-toggle-example--error-desc"
							id="checkbox-toggle-example--error"
							errorText="This field has an error"
							variant="toggle"
						/>
					</div>
					<div className="slds-col_padded">
						<Checkbox
							label="Toggle (disabled)"
							aria-describedby="checkbox-toggle-example--disabled-desc"
							id="checkbox-toggle-example--disabled"
							variant="toggle"
							disabled
						/>
					</div>
					<div className="slds-col_padded">
						<Checkbox
							label="Toggle (required)"
							aria-describedby="checkbox-toggle-example--required-desc"
							id="checkbox-toggle-example--required"
							variant="toggle"
							required
						/>
					</div>
				</div>
				<div className="slds-grid slds-grid_pull-padded slds-grid_vertical-align-center">
					<div className="slds-col_padded">
						<Checkbox
							assistiveText={{
								label: 'Toggle (with assistive text)',
							}}
							aria-describedby="checkbox-toggle-example--assitive-text-desc"
							id="checkbox-toggle-example--assitive-text"
							variant="toggle"
						/>
					</div>
					<div className="slds-col_padded">
						<Checkbox
							label="Toggle (checked)"
							aria-describedby="checkbox-toggle-example--checked-desc"
							id="checkbox-toggle-example--checked"
							variant="toggle"
							checked
						/>
					</div>
					<div className="slds-col_padded">
						<Checkbox
							aria-describedby="checkbox-toggle-example--checked-disabled-desc"
							id="checkbox-toggle-example--checked-disabled"
							label="Toggle (checked + disabled)"
							variant="toggle"
							checked
							disabled
						/>
					</div>
				</div>
			</div>
		);
	}
}

Example.displayName = 'CheckboxExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
