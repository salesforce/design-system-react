import React from 'react';


// `~` is replaced with design-system-react at runtime
import Checkbox from '~/components/forms/checkbox';

const Example = React.createClass({
	displayName: 'CheckboxExample',

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
						assistiveText="Toggle (with assistive text)"
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
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
