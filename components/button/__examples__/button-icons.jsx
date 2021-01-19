import React from 'react';

import IconSettings from '~/components/icon-settings';
import Button from '~/components/button'; // `~` is replaced with design-system-react at runtime

class Example extends React.Component {
	static displayName = 'ButtonExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div className="slds-x-small-buttons_horizontal">
					<Button
						assistiveText={{ icon: 'Icon Bare Small' }}
						iconCategory="utility"
						iconName="settings"
						iconSize="small"
						iconVariant="bare"
						onClick={() => {
							console.log('Icon Bare Clicked');
						}}
						variant="icon"
					/>

					<Button
						assistiveText={{ icon: 'Icon Container Small' }}
						iconCategory="utility"
						iconName="settings"
						iconSize="small"
						iconVariant="container"
						variant="icon"
					/>

					<div
						style={{
							backgroundColor: '#4BC076',
							padding: '10px',
							display: 'inline-block',
						}}
						className="-m-horizontal--small"
					>
						<Button
							assistiveText={{ icon: 'Icon Border medium' }}
							iconCategory="utility"
							iconName="settings"
							iconVariant="border"
							variant="icon"
						/>

						<Button
							assistiveText={{ icon: 'Icon Border-filled medium' }}
							iconCategory="utility"
							iconName="settings"
							iconVariant="border-filled"
							variant="icon"
						/>
					</div>

					<Button
						assistiveText={{ icon: 'Icon More large' }}
						iconCategory="utility"
						iconName="settings"
						iconSize="large"
						iconVariant="more"
						variant="icon"
					/>

					<div
						style={{
							backgroundColor: '#16325c',
							padding: '10px',
							display: 'inline-block',
						}}
						className="-m-horizontal--small"
					>
						<Button
							assistiveText={{ icon: 'Icon inverse' }}
							iconCategory="utility"
							iconName="settings"
							iconSize="large"
							inverse
							variant="icon"
						/>
					</div>

					<div
						style={{
							backgroundColor: '#FFB75D',
							padding: '10px 50px',
							display: 'inline-block',
						}}
						className="-hint-parent -m-horizontal--small"
					>
						<Button
							assistiveText={{ icon: 'Icon hint large' }}
							hint
							iconCategory="utility"
							iconName="settings"
							iconSize="large"
							variant="icon"
						/>
					</div>
				</div>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
