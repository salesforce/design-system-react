import React from 'react';
import createReactClass from 'create-react-class';
import IconSettings from '~/components/icon-settings';
import Button from '~/components/button'; // `~` is replaced with design-system-react at runtime

const Example = createReactClass({
	displayName: 'ButtonExample',

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<div className="-x-small-buttons--horizontal">
					<Button label="Brand" variant="brand" />

					<Button
						disabled
						label="Disabled"
						onClick={() => {
							console.log('Disabled Button Clicked');
						}}
						variant="brand"
					/>

					<Button label="Destructive" variant="destructive" />

					<div
						style={{
							backgroundColor: '#16325c',
							padding: '10px',
							display: 'inline-block',
						}}
						className="-m-horizontal--small"
					>
						<Button inverse label="Inverse" variant="base" />
					</div>
				</div>
			</IconSettings>
		);
	},
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
