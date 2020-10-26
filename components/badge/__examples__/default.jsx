import React from 'react';
import Badge from '~/components/badge';
import IconSettings from '~/components/icon-settings';

function Example() {
	return (
		<IconSettings iconPath="/assets/icons">
			<Badge id="badge-base-example" content="423 Credits Available" />
		</IconSettings>
	);
}

Example.displayName = 'badgeExample';

export default Example;
