import React from 'react';
import createReactClass from 'create-react-class';
import Avatar from '~/components/avatar'; // `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings';

const Example = createReactClass({
	displayName: 'AvatarExample',

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<Avatar
					assistiveText={{ icon: 'Avatar image' }}
					imgSrc="https://lightningdesignsystem.com/assets/images/avatar2.jpg"
					imgAlt="Person Name"
				/>
			</IconSettings>
		);
	},
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
