import React from 'react';
import DynamicIcon from '~/components/dynamic-icon'; // `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings';

class Example extends React.Component {
	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div className="slds-grid slds-grid_pull-padded slds-grid_vertical-align-center">
					<div className="slds-col_padded">
						<DynamicIcon title="Eq icon title" variant="eq" />
					</div>
					<div className="slds-col_padded">
						<DynamicIcon title="Eq icon title" isStatic variant="eq" />
					</div>
				</div>
			</IconSettings>
		);
	}
}

Example.displayName = 'EqExample'; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
export default Example;
