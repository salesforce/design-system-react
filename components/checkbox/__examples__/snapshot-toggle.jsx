import React from 'react';

// `~` is replaced with design-system-react at runtime
import Checkbox from '~/components/checkbox';

class Example extends React.Component {
	render () {
		return (
			<div className="slds-grid slds-grid--pull-padded slds-grid--vertical-align-center">
				<div className="slds-col--padded">
					<Checkbox
						label="Toggle"
						id="checkbox-toggle-example"
						variant="toggle"
					/>
				</div>
				<div className="slds-col--padded">
					<Checkbox
						label="Toggle"
						id="checkbox-toggle-example--error"
						errorText="This field has an error"
						variant="toggle"
					/>
				</div>
				<div className="slds-col--padded">
					<Checkbox
						label="Toggle (disabled)"
						id="checkbox-toggle-example--disabled"
						variant="toggle"
						disabled
					/>
				</div>
				<div className="slds-col--padded">
					<Checkbox
						label="Toggle (required)"
						id="checkbox-toggle-example--required"
						variant="toggle"
						required
					/>
				</div>
				<div className="slds-col--padded">
					<Checkbox
						assistiveText={{
							label: 'Toggle (with assistive text)',
						}}
						id="checkbox-toggle-example--assitive-text"
						variant="toggle"
					/>
				</div>
				<div className="slds-col--padded">
					<Checkbox
						label="Toggle (checked)"
						id="checkbox-toggle-example--checked"
						variant="toggle"
						checked
					/>
				</div>
				<div className="slds-col--padded">
					<Checkbox
						id="checkbox-toggle-example--checked-disabled"
						label="Toggle (checked + disabled)"
						variant="toggle"
						checked
						disabled
					/>
				</div>
			</div>
		);
	}
}

Example.displayName = 'CheckboxExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
