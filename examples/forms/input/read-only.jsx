import React from 'react';
import Input from '~/components/forms/input'; // `~` is replaced with design-system-react at runtime

const Example = React.createClass({
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
