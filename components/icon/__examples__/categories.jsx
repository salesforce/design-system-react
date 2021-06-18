import React from 'react';

import IconSettings from '~/components/icon-settings';
import Icon from '~/components/icon'; // `~` is replaced with design-system-react at runtime

class Example extends React.Component {
	static displayName = 'IconExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
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
