import React from 'react';

import Avatar from '~/components/avatar'; // `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings';

class Example extends React.Component {
	static displayName = 'AvatarExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Avatar
					assistiveText={{ icon: 'Avatar icon avatar' }}
					title="Avatar entity icon"
					variant="entity"
				/>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
