import React from 'react';
import Checkbox from '~/components/forms/checkbox'; // `~` is replaced with design-system-react at runtime

const Example = React.createClass({
	displayName: 'CheckboxExample',

	render () {
		return (
			<div className="slds-grid slds-grid--pull-padded slds-grid--vertical-align-center">
				<div className="slds-col--padded">
					<Checkbox
						label="Toggle"
						variant="toggle"
					/>
				</div>
				<div className="slds-col--padded">
					<Checkbox
						assistiveText="Toggle (with assistive text)"
						variant="toggle"
					/>
				</div>
				<div className="slds-col--padded">
					<Checkbox
						label="Toggle (checked)"
						variant="toggle"
						checked
					/>
				</div>
				<div className="slds-col--padded">
					<Checkbox
						label="Toggle (disabled)"
						variant="toggle"
						disabled
					/>
				</div>
				<div className="slds-col--padded">
					<Checkbox
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
