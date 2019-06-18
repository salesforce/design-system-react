import React from 'react';
import IconSettings from '~/components/icon-settings';
import ProgressRing from '~/components/progress-ring';

class Example extends React.Component {
	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div className="slds-grid slds-grid_pull-padded slds-grid_vertical-align-center">
					<div className="slds-col_padded">
						<ProgressRing value={0} />
					</div>
					<div className="slds-col_padded">
						<ProgressRing value={20} />
					</div>
					<div className="slds-col_padded">
						<ProgressRing flowDirection="fill" size="large" value={40} />
					</div>
					<div className="slds-col_padded">
						<ProgressRing size="large" value={100} />
					</div>
				</div>
			</IconSettings>
		);
	}
}

Example.displayName = 'ProgressRingBaseExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
