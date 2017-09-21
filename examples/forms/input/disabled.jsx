import React from 'react';
import Input from '~/components/forms/input'; // `~` is replaced with design-system-react at runtime

const Example = React.createClass({
	displayName: 'InputExample',

	render () {
		return (
			<Input
				disabled
				id="unique-id-1"
				label="Input Label"
				placeholder="Placeholder Text"
			/>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
