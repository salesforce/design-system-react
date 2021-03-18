import React from 'react';

import action from '@salesforce-ux/design-system/assets/icons/action-sprite/svg/symbols.svg';
import custom from '@salesforce-ux/design-system/assets/icons/custom-sprite/svg/symbols.svg';
import utility from '@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg';
import standard from '@salesforce-ux/design-system/assets/icons/standard-sprite/svg/symbols.svg';
import doctype from '@salesforce-ux/design-system/assets/icons/doctype-sprite/svg/symbols.svg';

import Icon from '~/components/icon'; // `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings';

const sprites = {
	action,
	custom,
	utility,
	standard,
	doctype,
};

class Example extends React.Component {
	static displayName = 'IconSettingsExample';

	componentDidMount() {
		Promise.all(
			Object.keys(sprites).map((category) =>
				fetch(sprites[category]).then((resp) => resp.text())
			)
		).then((texts) => {
			this.spriteInlineContainer.innerHTML = texts.join('');
		});
	}

	render() {
		return (
			<IconSettings onRequestIconPath={({ category, name }) => `#${name}`}>
				<div
					ref={(el) => {
						this.spriteInlineContainer = el;
					}}
				/>
				<div className="slds-grid slds-grid_pull-padded slds-grid_vertical-align-center">
					<div className="slds-col_padded">
						<Icon
							assistiveText={{ label: 'Account' }}
							category="standard"
							name="account"
							size="small"
						/>
					</div>
					<div className="slds-col_padded">
						<Icon
							assistiveText={{ label: 'Announcement' }}
							category="utility"
							name="announcement"
							size="small"
						/>
					</div>
					<div className="slds-col_padded">
						<Icon
							assistiveText={{ label: 'Description' }}
							category="action"
							name="description"
							size="small"
						/>
					</div>
					<div className="slds-col_padded">
						<Icon
							assistiveText={{ label: 'XML' }}
							category="doctype"
							name="xml"
							size="small"
						/>
					</div>
					<div className="slds-col_padded">
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
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
