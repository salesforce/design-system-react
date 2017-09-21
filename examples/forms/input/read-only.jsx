import React from 'react';
import createReactClass from 'create-react-class';
import Input from '~/components/forms/input'; // `~` is replaced with design-system-react at runtime

const Example = createReactClass({
	displayName: 'InputExample',
	render () {
		return (
			<Input
				id="unique-id-3"
				label="Input Label"
				readOnly
				value="Read Only Value"
			/>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
