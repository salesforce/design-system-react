import React from 'react';
import createReactClass from 'create-react-class';
import Radio from '~/components/radio'; // `~` is replaced with design-system-react at runtime

const Example = createReactClass({
	displayName: 'RadioExample',

	render () {
		return <Radio id="radioId1" label="Radio Label" />;
	},
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
