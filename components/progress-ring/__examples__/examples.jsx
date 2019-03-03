import React from 'react';
import IconSettings from '~/components/icon-settings';
import ProgressRing from '~/components/progress-ring';
import Icon from '~/components/icon';

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
						<ProgressRing value={100} />
					</div>
					<div className="slds-col_padded">
						<ProgressRing value={100} theme="complete" />
					</div>
					<div className="slds-col_padded">
						<ProgressRing value={100} theme="complete" hasIcon />
					</div>
					<div className="slds-col_padded">
						<ProgressRing value={20} theme="warning" />
					</div>
					<div className="slds-col_padded">
						<ProgressRing value={20} theme="warning" hasIcon />
					</div>
					<div className="slds-col_padded">
						<ProgressRing value={100} theme="warning" />
					</div>
					<div className="slds-col_padded">
						<ProgressRing value={20} theme="expired" />
					</div>
					<div className="slds-col_padded">
						<ProgressRing value={20} theme="expired" hasIcon />
					</div>
					<div className="slds-col_padded">
						<ProgressRing value={20} theme="expired" hasIcon icon={<Icon category="utility" name="lock" />} />
					</div>
					<div className="slds-col_padded">
						<ProgressRing value={100} theme="expired" />
					</div>
				</div>
			</IconSettings>
		);
	}
}

Example.displayName = 'ProgressRingDefault';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime

