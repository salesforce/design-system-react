import React from 'react';
import Button from '~/components/button'; // `~` is replaced with design-system-react at runtime

const Example = React.createClass({
	displayName: 'ButtonExample',

	render () {
		return (
			<div className="-x-small-buttons--horizontal">
				<Button
					label="Brand"
					variant="brand"
				/>

				<Button
					disabled
					label="Disabled"
					onClick={() => { alert('Disabled Button Clicked'); }}
					variant="brand"
				/>

				<Button
					label="Destructive"
					variant="destructive"
				/>

				<div
					style={{
						backgroundColor: '#16325c',
						padding: '10px',
						display: 'inline-block'
					}}
					className="-m-horizontal--small"
				>
					<Button
						inverse
						label="Inverse"
						variant="base"
					/>
				</div>
			</div>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime

