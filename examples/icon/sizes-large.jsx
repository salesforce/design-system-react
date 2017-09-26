import React from 'react';
import createReactClass from 'create-react-class';
import Icon from '~/components/icon'; // `~` is replaced with design-system-react at runtime

const Example = createReactClass({
	displayName: 'IconExample',

	render () {
		return (
			<Icon
				assistiveText="Description of icon"
				category="standard"
				name="case"
				size="large"
			/>
		);
	}
});


export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
