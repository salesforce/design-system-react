import React from 'react';
import Badge from '~/components/badge';
import IconSettings from '~/components/icon-settings';
import Icon from '~/components/icon';

function Example() {
	return (
		<IconSettings iconPath="/assets/icons">
			<Badge
				id="badge-base-example-icon-left"
				content="423 Credits Available"
				icon={<Icon category="utility" name="moneybag" size="xx-small" />}
			/>
			<Badge
				id="badge-base-example-icon-right"
				content="423 Credits Available"
				icon={<Icon category="utility" name="moneybag" size="xx-small" />}
				iconAlignment="right"
			/>
		</IconSettings>
	);
}

Example.displayName = 'badgeExample';

export default Example;
