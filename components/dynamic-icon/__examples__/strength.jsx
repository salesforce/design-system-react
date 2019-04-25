import React from 'react';
import DynamicIcon from '~/components/dynamic-icon'; // `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings';

class Example extends React.Component {
	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div className="slds-grid slds-grid_pull-padded slds-grid_vertical-align-center">
					<div className="slds-col_padded">
						<DynamicIcon title="Strength icon title" variant="strength" />
					</div>
					<div className="slds-col_padded">
						<DynamicIcon
							isStatic
							strengthLevel={1}
							title="Strength icon title"
							variant="strength"
						/>
					</div>
					<div className="slds-col_padded">
						<DynamicIcon
							isStatic
							strengthLevel={2}
							title="Strength icon title"
							variant="strength"
						/>
					</div>
					<div className="slds-col_padded">
						<DynamicIcon
							isStatic
							strengthLevel={3}
							title="Strength icon title"
							variant="strength"
						/>
					</div>
					<div className="slds-col_padded">
						<DynamicIcon
							isStatic
							strengthLevel="-1"
							title="Strength icon title"
							variant="strength"
						/>
					</div>
					<div className="slds-col_padded">
						<DynamicIcon
							isStatic
							strengthLevel="-2"
							title="Strength icon title"
							variant="strength"
						/>
					</div>
					<div className="slds-col_padded">
						<DynamicIcon
							isStatic
							strengthLevel="-3"
							title="Strength icon title"
							variant="strength"
						/>
					</div>
					<div className="slds-col_padded">
						<DynamicIcon
							strengthLevel="3"
							title="Strength icon title"
							variant="strength"
						/>
					</div>
					<div className="slds-col_padded">
						<DynamicIcon
							strengthLevel="-3"
							title="Strength icon title"
							variant="strength"
						/>
					</div>
					<div className="slds-col_padded">
						<DynamicIcon
							isPaused
							title="Strength icon title"
							variant="strength"
						/>
					</div>
				</div>
			</IconSettings>
		);
	}
}

Example.displayName = 'StrengthExample'; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
export default Example;
