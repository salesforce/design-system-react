import React from 'react';
import ButtonStateful from '~/components/button-stateful'; // `~` is replaced with design-system-react at runtime

const Example = React.createClass({
	displayName: 'ButtonStatefulExample',

	render () {
		return (
			<ButtonStateful
				assistiveText="like"
				iconName="like"
				iconSize="large"
				variant="icon"
			/>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
