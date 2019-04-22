import React from 'react';

import IconSettings from '~/components/icon-settings';
import Input from '~/components/input'; // `~` is replaced with design-system-react at runtime
import InputIcon from '~/components/icon/input-icon'; // `~` is replaced with design-system-react at runtime

class Example extends React.Component {
	static displayName = 'ErrorInputExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div className="slds-grid slds-grid_pull-padded slds-grid_vertical-align-center">
					<div className="slds-col_padded">
						<Input
							aria-describedby="error-4"
							id="unique-id-4"
							label="Input Label"
							required
							errorText="Error Message"
							placeholder="Placeholder Text"
						/>
					</div>
					<div className="slds-col_padded">
						<Input
							iconLeft={
								<InputIcon
									assistiveText={{ icon: 'Search' }}
									name="error"
									category="utility"
									color="error"
									onClick={() => {
										console.log('Icon Clicked');
									}}
								/>
							}
							aria-describedby="error-5"
							id="unique-id-5"
							label="Input Label"
							required
							errorText="Error Message"
							placeholder="Placeholder Text"
						/>
					</div>
				</div>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
