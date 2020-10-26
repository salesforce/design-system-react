import React from 'react';

import Icon from '~/components/icon'; // `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings';

function Example() {
	return (
		<IconSettings iconPath="/assets/icons">
			<Icon
				assistiveText={{ label: 'Description of icon' }}
				category="utility"
				colorVariant="light"
				name="announcement"
				title="description of icon"
			/>
		</IconSettings>
	);
}

Example.displayName = 'IconExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
