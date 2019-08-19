import React from 'react';
import Badges from '~/components/badges';
import IconSettings from '~/components/icon-settings';

class Example extends React.Component {
	static displayName = 'badgeExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Badges/>
			</IconSettings>
		)
	}
}
