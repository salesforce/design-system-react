import React from 'react';
import Avatar from '~/components/avatar'; // `~` is replaced with design-system-react at runtime

const Example = React.createClass({
	displayName: 'AvatarExample',

	render () {
		return (
			<Avatar
				assistiveText="Avatar entity icon"
				iconCategory="standard"
				iconName="account"
				title="Avatar entity icon"
				type="entity"
				variant="icon"
			/>
		);
	}
});


export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
