import React from 'react';
import IconSettings from '~/components/icon-settings';
import ProgressRing from '~/components/progress-ring';

class Example extends React.Component {
	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<div className="slds-grid slds-grid--pull-padded slds-grid--vertical-align-center">
					<div className="slds-col--padded">
						<ProgressRing value={100} theme="complete" />
					</div>
					<div className="slds-col--padded">
						<ProgressRing value={100} theme="complete" hasIcon />
					</div>
					<div className="slds-col--padded" />
				</div>
			</IconSettings>
		);
	}
}

Example.displayName = 'ProgressRingDefault';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
