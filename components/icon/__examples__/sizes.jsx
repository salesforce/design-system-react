import React from 'react';
import createReactClass from 'create-react-class';
import IconSettings from '~/components/icon-settings';
import Icon from '~/components/icon'; // `~` is replaced with design-system-react at runtime

const Example = createReactClass({
	displayName: 'IconExample',

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<div className="slds-grid slds-grid--pull-padded slds-grid--vertical-align-center">
					<div className="slds-col--padded">
						<Icon
							assistiveText={{ label: 'Warning' }}
							category="utility"
							color="warning"
							name="warning"
							size="x-small"
						/>
					</div>
					<div className="slds-col--padded">
						<Icon
							assistiveText={{ label: 'Case' }}
							category="standard"
							name="case"
							size="small"
						/>
					</div>
					<div className="slds-col--padded">
						<Icon
							assistiveText={{ label: 'Case' }}
							category="standard"
							name="case"
							size="medium"
						/>
					</div>
					<div className="slds-col--padded">
						<Icon
							assistiveText={{ label: 'Case' }}
							category="standard"
							name="case"
							size="large"
						/>
					</div>
				</div>
			</IconSettings>
		);
	}
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
