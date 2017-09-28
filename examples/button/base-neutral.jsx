import React from 'react';
import createReactClass from 'create-react-class';
import Button from '~/components/button'; // `~` is replaced with design-system-react at runtime

const Example = createReactClass({
	displayName: 'ButtonExample',

	render () {
		return (
			<div className="-x-small-buttons--horizontal">
				<Button
					label="Base"
					onClick={function (e) { console.log('Base Button e.target:', e.target); }}
					variant="base"
				/>

				<Button
					label="Neutral"
				/>

				<Button
					iconName="download"
					iconPosition="left"
					label="Neutral Icon"
				/>

				<Button
					label="Responsive"
					responsive
				/>
			</div>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
