import React from 'react';
import IconSettings from '~/components/icon-settings';
import Icon from '~/components/icon';
import ProgressRing from '~/components/progress-ring';

class Example extends React.Component {
	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div className="slds-grid slds-grid_pull-padded slds-grid_vertical-align-center">
					<div className="slds-col_padded">
						<ProgressRing
							value={20}
							theme="expired"
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
					<div className="slds-col_padded">
						<ProgressRing
							value={60}
							theme="expired"
							hasIcon
							icon={
								<Icon
									assistiveText={{ label: 'Expired' }}
									category="utility"
									name="lock"
								/>
							}
							flowDirection="fill"
						/>
					</div>
				</div>
			</IconSettings>
		);
	}
}

Example.displayName = 'ProgressRingCustomIconExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
