import React from 'react';
import ProgressRing from '../../../components/progress-ring';
import IconSettings from '../../icon-settings';
import Icon from '../../../components/icon';

class Example extends React.Component {
	static displayName = 'ProgressRingExamples';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div className="slds-grid slds-grid_pull-padded slds-grid_vertical-align-center slds-wrap">
					<div className="slds-col_padded slds-m-top_x-large slds-size_1-of-3 slds-align_absolute-center">
						<ProgressRing value={0} />
					</div>
					<div className="slds-col_padded slds-m-top_x-large slds-size_1-of-3 slds-align_absolute-center">
						<ProgressRing
							value={0}
							hasIcon
							icon={<Icon category="utility" name="warning" />}
						/>
					</div>
					<div className="slds-col_padded slds-m-top_x-large slds-size_1-of-3 slds-align_absolute-center">
						<ProgressRing
							value={0}
							hasIcon
							icon={<Icon category="utility" name="lock" />}
						/>
					</div>
					<div className="slds-col_padded slds-m-top_x-large slds-size_1-of-3 slds-align_absolute-center">
						<ProgressRing value={20} theme="complete" />
					</div>
					<div className="slds-col_padded slds-m-top_x-large slds-size_1-of-3 slds-align_absolute-center">
						<ProgressRing value={100} theme="complete" hasIcon />
					</div>
					<div className="slds-col_padded slds-m-top_x-large slds-size_1-of-3 slds-align_absolute-center">
						<ProgressRing value={100} theme="complete" />
					</div>
					<div className="slds-col_padded slds-m-top_x-large slds-size_1-of-3 slds-align_absolute-center">
						<ProgressRing value={20} theme="warning" />
					</div>
					<div className="slds-col_padded slds-m-top_x-large slds-size_1-of-3 slds-align_absolute-center">
						<ProgressRing value={100} theme="warning" hasIcon />
					</div>
					<div className="slds-col_padded slds-m-top_x-large slds-size_1-of-3 slds-align_absolute-center">
						<ProgressRing value={100} theme="warning" />
					</div>
					<div className="slds-col_padded slds-m-top_x-large slds-size_1-of-3 slds-align_absolute-center">
						<ProgressRing value={20} theme="expired" />
					</div>
					<div className="slds-col_padded slds-m-top_x-large slds-size_1-of-3 slds-align_absolute-center">
						<ProgressRing value={100} theme="expired" hasIcon />
					</div>
					<div className="slds-col_padded slds-m-top_x-large slds-size_1-of-3 slds-align_absolute-center">
						<ProgressRing value={100} theme="expired" />
					</div>
				</div>
			</IconSettings>
		);
	}
}

export default Example;
