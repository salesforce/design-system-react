import React from 'react';
import Avatar from '~/components/avatar'; // `~` is replaced with design-system-react at runtime

const Example = React.createClass({
	displayName: 'AvatarExample',

	render () {
		return (
			<Avatar
				variant="user"
				label="Annie Wilson"
				size="medium"
			/>
		);
	}
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
