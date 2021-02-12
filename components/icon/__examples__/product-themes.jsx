import React from 'react';

import IconSettings from '~/components/icon-settings';
import Icon from '~/components/icon'; // `~` is replaced with design-system-react at runtime

class Example extends React.Component {
	static displayName = 'IconProductThemesExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div className="slds-grid slds-grid_pull-padded slds-grid_vertical-align-center">
					<div className="slds-col_padded">
						<Icon
							assistiveText={{ label: 'Global Setup' }}
							category="standard"
							name="account"
							productTheme="global-setup"
						/>
					</div>
					<div className="slds-col_padded">
						<Icon
							assistiveText={{ label: 'Service Cloud' }}
							category="standard"
							name="address"
							productTheme="service-cloud"
						/>
					</div>
					<div className="slds-col_padded">
						<Icon
							assistiveText={{ label: 'Industry Cloud' }}
							category="standard"
							name="answer_best"
							productTheme="industry-cloud"
						/>
					</div>
					<div className="slds-col_padded">
						<Icon
							assistiveText={{ label: 'Sales Cloud' }}
							category="standard"
							name="canvas"
							productTheme="sales-cloud"
						/>
					</div>
					<div className="slds-col_padded">
						<Icon
							assistiveText={{ label: 'Commerce Cloud' }}
							category="standard"
							name="choice"
							productTheme="commerce-cloud"
						/>
					</div>
					<div className="slds-col_padded">
						<Icon
							assistiveText={{ label: 'Community Cloud' }}
							category="standard"
							name="choice"
							productTheme="community-cloud"
						/>
					</div>
					<div className="slds-col_padded">
						<Icon
							assistiveText={{ label: 'Marketing Cloud' }}
							category="standard"
							name="choice"
							productTheme="marketing-cloud"
						/>
					</div>
					<div className="slds-col_padded">
						<Icon
							assistiveText={{ label: 'Quip' }}
							category="standard"
							name="choice"
							productTheme="quip"
						/>
					</div>
				</div>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
