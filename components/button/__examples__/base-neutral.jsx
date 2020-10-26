import React from 'react';

import IconSettings from '~/components/icon-settings';
import Button from '~/components/button'; // `~` is replaced with design-system-react at runtime

function Example() {
	return (
		<IconSettings iconPath="/assets/icons">
			<div className="slds-x-small-buttons_horizontal">
				<Button
					label="Base"
					onClick={(e) => {
						console.log('Base Button e.target:', e.target);
					}}
					variant="base"
				/>

				<Button label="Neutral" />

				<Button
					iconCategory="utility"
					iconName="download"
					iconPosition="left"
					label="Neutral Icon"
				/>

				<Button label="Responsive" responsive />
			</div>
		</IconSettings>
	);
}

Example.displayName = 'ButtonExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
