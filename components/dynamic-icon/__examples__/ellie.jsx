import React from 'react';
import DynamicIcon from '~/components/dynamic-icon'; // `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings';

class Example extends React.Component {
	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div className="slds-grid slds-grid_pull-padded slds-grid_vertical-align-center">
					<div className="slds-col_padded">
						<DynamicIcon title="Ellie icon title" variant="ellie" />
					</div>
					<div className="slds-col_padded">
						<DynamicIcon title="Ellie icon title" isPaused variant="ellie" />
					</div>
					<div className="slds-col_padded">
						<DynamicIcon
							className="ellie-icon-example-custom-class"
							title="Ellie icon title"
							isStatic
							variant="ellie"
						/>
					</div>
				</div>
			</IconSettings>
		);
	}
}

Example.displayName = 'EllieExample'; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
export default Example;
