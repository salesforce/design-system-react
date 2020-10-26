import React from 'react';

import Avatar from '~/components/avatar'; // `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings';

function Example() {
	return (
		<IconSettings iconPath="/assets/icons">
			<Avatar
				assistiveText={{ icon: 'User Icon Avatar' }}
				title="User Icon Avatar"
				variant="user"
			/>
		</IconSettings>
	);
}

Example.displayName = 'AvatarExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
