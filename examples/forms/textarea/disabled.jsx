import React from 'react';
import createReactClass from 'create-react-class';
import Textarea from '~/components/forms/textarea'; // `~` is replaced with design-system-react at runtime

const Example = createReactClass({
	displayName: 'TextareaExample',

	render () {
		return (
			<Textarea
				name="disabled"
				label="Textarea Label"
				disabled
				placeholder="Placeholder Text"
			/>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
