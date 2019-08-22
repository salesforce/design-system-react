import React from 'react';
import Badge from '~/components/badge';
import IconSettings from '~/components/icon-settings';

class Example extends React.Component {
	static displayName = 'badgeExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Badge id="badge-base-example" content="423 Credits Available" />
			</IconSettings>
		);
	}
}

export default Example;
