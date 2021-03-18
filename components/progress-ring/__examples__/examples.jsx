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
					<div className="slds-col_padded slds-m-top_x-large slds-size_1-of-4 slds-align_absolute-center">
						<ProgressRing value={0} />
					</div>
					<div className="slds-col_padded slds-m-top_x-large slds-size_1-of-4 slds-align_absolute-center">
						<ProgressRing flowDirection="fill" value={40} />
					</div>
					<div className="slds-col_padded slds-m-top_x-large slds-size_1-of-4 slds-align_absolute-center">
						<ProgressRing
							value={0}
							hasIcon
							icon={
								<Icon
									assistiveText={{ label: 'Warning' }}
									category="utility"
									name="warning"
								/>
							}
						/>
					</div>
					<div className="slds-col_padded slds-m-top_x-large slds-size_1-of-4 slds-align_absolute-center">
						<ProgressRing
							value={0}
							hasIcon
							icon={
								<Icon
									assistiveText={{ label: 'Expired' }}
									category="utility"
									name="lock"
								/>
							}
						/>
					</div>
					<div className="slds-col_padded slds-m-top_x-large slds-size_1-of-4 slds-align_absolute-center">
						<ProgressRing value={20} theme="complete" />
					</div>
					<div className="slds-col_padded slds-m-top_x-large slds-size_1-of-4 slds-align_absolute-center">
						<ProgressRing flowDirection="fill" value={40} theme="complete" />
					</div>
					<div className="slds-col_padded slds-m-top_x-large slds-size_1-of-4 slds-align_absolute-center">
						<ProgressRing value={100} theme="complete" hasIcon />
					</div>
					<div className="slds-col_padded slds-m-top_x-large slds-size_1-of-4 slds-align_absolute-center">
						<ProgressRing value={100} theme="complete" />
					</div>
					<div className="slds-col_padded slds-m-top_x-large slds-size_1-of-4 slds-align_absolute-center">
						<ProgressRing value={20} theme="warning" />
					</div>
					<div className="slds-col_padded slds-m-top_x-large slds-size_1-of-4 slds-align_absolute-center">
						<ProgressRing flowDirection="fill" value={40} theme="warning" />
					</div>
					<div className="slds-col_padded slds-m-top_x-large slds-size_1-of-4 slds-align_absolute-center">
						<ProgressRing value={100} theme="warning" hasIcon />
					</div>
					<div className="slds-col_padded slds-m-top_x-large slds-size_1-of-4 slds-align_absolute-center">
						<ProgressRing value={100} theme="warning" />
					</div>
					<div className="slds-col_padded slds-m-top_x-large slds-size_1-of-4 slds-align_absolute-center">
						<ProgressRing value={20} theme="expired" />
					</div>
					<div className="slds-col_padded slds-m-top_x-large slds-size_1-of-4 slds-align_absolute-center">
						<ProgressRing flowDirection="fill" value={40} theme="expired" />
					</div>
					<div className="slds-col_padded slds-m-top_x-large slds-size_1-of-4 slds-align_absolute-center">
						<ProgressRing value={100} theme="expired" hasIcon />
					</div>
					<div className="slds-col_padded slds-m-top_x-large slds-size_1-of-4 slds-align_absolute-center">
						<ProgressRing value={100} theme="expired" />
					</div>
					<div className="slds-col_padded slds-m-top_x-large slds-size_1-of-4 slds-align_absolute-center">
						<ProgressRing value={20} theme="active" />
					</div>
					<div className="slds-col_padded slds-m-top_x-large slds-size_1-of-4 slds-align_absolute-center">
						<ProgressRing flowDirection="fill" value={40} theme="active" />
					</div>
					<div className="slds-col_padded slds-m-top_x-large slds-size_1-of-4 slds-align_absolute-center">
						<ProgressRing
							flowDirection="fill"
							value={70}
							theme="active"
							hasIcon
						/>
					</div>
					<div className="slds-col_padded slds-m-top_x-large slds-size_1-of-4 slds-align_absolute-center">
						<ProgressRing value={100} theme="active" />
					</div>
					<div className="slds-col_padded slds-m-top_x-large slds-size_1-of-4 slds-align_absolute-center">
						<ProgressRing size="large" value={20} theme="active" />
					</div>
					<div className="slds-col_padded slds-m-top_x-large slds-size_1-of-4 slds-align_absolute-center">
						<ProgressRing
							flowDirection="fill"
							size="large"
							value={40}
							theme="warning"
						/>
					</div>
					<div className="slds-col_padded slds-m-top_x-large slds-size_1-of-4 slds-align_absolute-center">
						<ProgressRing
							flowDirection="fill"
							size="large"
							value={70}
							theme="expired"
							hasIcon
						/>
					</div>
					<div className="slds-col_padded slds-m-top_x-large slds-size_1-of-4 slds-align_absolute-center">
						<ProgressRing size="large" value={100} theme="complete" />
					</div>
				</div>
			</IconSettings>
		);
	}
}

export default Example;
