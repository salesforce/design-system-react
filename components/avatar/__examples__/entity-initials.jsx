import React from 'react';

import Avatar from '~/components/avatar'; // `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings';

class Example extends React.Component {
	static displayName = 'AvatarExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Avatar variant="entity" label="Acme Communications" size="medium" />
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
