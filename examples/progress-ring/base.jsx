import React from 'react';
import createReactClass from 'create-react-class';
import IconSettings from '~/components/icon-settings';
import * as examples from './examples';

const Example = createReactClass({
	displayName: 'ProgressRingDefault',

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<div className="slds-grid slds-grid--pull-padded slds-grid--vertical-align-center">
					<div className="slds-col--padded">
						{examples.BASE_0()}
					</div>
					<div className="slds-col--padded">
						{examples.BASE_PARTIAL()}
					</div>
					<div className="slds-col--padded">
						{examples.BASE_100()}
					</div>
				</div>
			</IconSettings>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
