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
							style={{ backgroundColor: '#2A739E' }}
						/>
					</div>
					<div className="slds-col_padded">
						<Icon
							assistiveText={{ label: 'Service Cloud' }}
							category="standard"
							name="address"
							style={{ backgroundColor: '#7f2443' }}
						/>
					</div>
					<div className="slds-col_padded">
						<Icon
							assistiveText={{ label: 'Industry Cloud' }}
							category="standard"
							name="answer_best"
							style={{ backgroundColor: '#4c2248' }}
						/>
					</div>
					<div className="slds-col_padded">
						<Icon
							assistiveText={{ label: 'Sales Cloud' }}
							category="standard"
							name="canvas"
							style={{ backgroundColor: '#00857d' }}
						/>
					</div>
					<div className="slds-col_padded">
						<Icon
							assistiveText={{ label: 'Commerce Cloud' }}
							category="standard"
							name="choice"
							style={{ backgroundColor: '#41693d' }}
						/>
					</div>
					<div className="slds-col_padded">
						<Icon
							assistiveText={{ label: 'Community Cloud' }}
							category="standard"
							name="choice"
							style={{ backgroundColor: '#ffc20e' }}
						/>
					</div>
					<div className="slds-col_padded">
						<Icon
							assistiveText={{ label: 'Marketing Cloud' }}
							category="standard"
							name="choice"
							style={{ backgroundColor: '#ea7600' }}
						/>
					</div>
					<div className="slds-col_padded">
						<Icon
							assistiveText={{ label: 'Quip' }}
							category="standard"
							name="choice"
							style={{ backgroundColor: '#cf451d' }}
						/>
					</div>
				</div>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
