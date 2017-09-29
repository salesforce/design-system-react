import React from 'react';
import Avatar from '~/components/avatar'; // `~` is replaced with design-system-react at runtime

const Example = React.createClass({
	displayName: 'AvatarExample',

	render () {
		return (<Avatar
			assistiveText="Avatar image"
			imgSrc="https://lightningdesignsystem.com/assets/images/avatar2.jpg"
			imgAlt="Person Name"
		/>);
	}
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
