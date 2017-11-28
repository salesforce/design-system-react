import React from 'react';
import IconSettings from '~/components/icon-settings';
import * as examples from './examples';

class Example extends React.Component {
	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<div className="slds-grid slds-grid--pull-padded slds-grid--vertical-align-center">
					<div className="slds-col--padded">
						{examples.WARNING_PARTIAL()}
					</div>
					<div className="slds-col--padded">
						{examples.WARNING_WITH_ICON()}
					</div>
					<div className="slds-col--padded">
						{examples.WARNING_100()}
					</div>
				</div>
			</IconSettings>
		);
	}
}

Example.displayName = 'ProgressRingDefault';

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
