import React from 'react';
import createReactClass from 'create-react-class';
import Icon from '~/components/icon'; // `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings';

import actionSprite from '@salesforce-ux/design-system/assets/icons/action-sprite/svg/symbols.svg';
import customSprite from '@salesforce-ux/design-system/assets/icons/custom-sprite/svg/symbols.svg';
import utilitySprite from '@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg';
import standardSprite from '@salesforce-ux/design-system/assets/icons/standard-sprite/svg/symbols.svg';
import doctypeSprite from '@salesforce-ux/design-system/assets/icons/doctype-sprite/svg/symbols.svg';

const Example = createReactClass({
	displayName: 'IconSettingsExample',

	render () {
		return (
			<IconSettings
				standardSprite={standardSprite}
				utilitySprite={utilitySprite}
				actionSprite={actionSprite}
				doctypeSprite={doctypeSprite}
				customSprite={customSprite}
			>
				<div className="slds-grid slds-grid--pull-padded slds-grid--vertical-align-center">
					<div className="slds-col--padded">
						<Icon
							assistiveText={{ label: 'Account' }}
							category="standard"
							name="account"
							size="small"
						/>
					</div>
					<div className="slds-col--padded">
						<Icon
							assistiveText={{ label: 'Announcement' }}
							category="utility"
							name="announcement"
							size="small"
						/>
					</div>
					<div className="slds-col--padded">
						<Icon
							assistiveText={{ label: 'Description' }}
							category="action"
							name="description"
							size="small"
						/>
					</div>
					<div className="slds-col--padded">
						<Icon
							assistiveText={{ label: 'XML' }}
							category="doctype"
							name="xml"
							size="small"
						/>
					</div>
					<div className="slds-col--padded">
						<Icon
							assistiveText={{ label: 'custom5' }}
							category="custom"
							name="custom5"
							size="small"
						/>
					</div>
				</div>
			</IconSettings>
		);
	},
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
