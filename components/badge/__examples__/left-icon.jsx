import React from 'react';
import Badge from '~/components/badge';

import IconSettings from '~/components/icon-settings';

class Example extends React.Component {
	static displayName = 'BadgeExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Badge iconName="moneybag" iconCategory="utility">
					423 Credits Available
				</Badge>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
