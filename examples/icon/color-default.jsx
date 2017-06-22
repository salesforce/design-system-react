import React from 'react';
import Icon from '~/components/icon'; // `~` is replaced with design-system-react at runtime

const Example = React.createClass({
	displayName: 'IconExample',

	render () {
		return (
			<Icon
				assistiveText="Description of icon"
				category="standard"
				name="account"
				title="This is a title"
				inverse
			/>
		);
	}
});


export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
