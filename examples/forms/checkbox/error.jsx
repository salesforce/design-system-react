import React from 'react';
import Checkbox from '~/components/checkbox'; // `~` is replaced with design-system-react at runtime

const Example = React.createClass({
	displayName: 'CheckboxExample',

	render () {
		return (
			<div className="slds-grid slds-grid--pull-padded slds-grid--vertical-align-center">
				<div className="slds-col--padded">
					<Checkbox
						assistiveText="Error state"
						errorText="This field is required"
						label="Checkbox Label"
					/>
				</div>
				<div className="slds-col--padded">
					<Checkbox
						assistiveText="Indeterminate"
						indeterminate
						label="Indeterminate"
					/>
				</div>
				<div className="slds-col--padded">
					<Checkbox
						assistiveText="Indeterminate"
						label="Required"
						required
					/>
				</div>
				<div className="slds-col--padded">
					<Checkbox
						assistiveText="Disabled"
						label="Disabled"
						disabled
					/>
				</div>
			</div>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
