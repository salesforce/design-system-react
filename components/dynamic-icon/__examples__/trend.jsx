import React from 'react';
import DynamicIcon from '~/components/dynamic-icon'; // `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings';

class Example extends React.Component {
	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div className="slds-grid slds-grid_pull-padded slds-grid_vertical-align-center">
					<div className="slds-col_padded">
						<DynamicIcon title="Trend icon title" variant="trend" />
					</div>
					<div className="slds-col_padded">
						<DynamicIcon
							title="Trend icon title"
							trendDirection="down"
							variant="trend"
						/>
					</div>
					<div className="slds-col_padded">
						<DynamicIcon
							title="Trend icon title"
							trendDirection="up"
							variant="trend"
						/>
					</div>
					<div className="slds-col_padded">
						<DynamicIcon
							isStatic
							title="Trend icon title"
							trendDirection="up"
							variant="trend"
						/>
					</div>
					<div className="slds-col_padded">
						<DynamicIcon
							isPaused
							title="Trend icon title"
							trendDirection="up"
							variant="trend"
						/>
					</div>
				</div>
			</IconSettings>
		);
	}
}

Example.displayName = 'TrendExample'; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
export default Example;
