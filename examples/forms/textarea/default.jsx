import React from 'react';
import Textarea from '~/components/forms/textarea'; // `~` is replaced with design-system-react at runtime

const Example = React.createClass({
	displayName: 'TextareaExample',

	render () {
		return (
			<Textarea
				id="unique-id-1"
				label="Textarea Label"
			/>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
