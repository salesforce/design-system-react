import React from 'react';
import IconSettings from '~/components/icon-settings';
import ProgressRing from '~/components/progress-ring';

class Example extends React.Component {
	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div className="slds-grid slds-grid_pull-padded slds-grid_vertical-align-center">
					<div className="slds-col_padded">
						<ProgressRing value={20} theme="expired" />
					</div>
					<div className="slds-col_padded">
						<ProgressRing value={20} theme="expired" hasIcon />
					</div>
					<div className="slds-col_padded">
						<ProgressRing
							flowDirection="fill"
							value={40}
							theme="expired"
							hasIcon
						/>
					</div>
					<div className="slds-col_padded">
						<ProgressRing value={100} theme="expired" />
					</div>
				</div>
			</IconSettings>
		);
	}
}

Example.displayName = 'ProgressRingExpiredExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
