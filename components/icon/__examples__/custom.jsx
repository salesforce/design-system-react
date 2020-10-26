import React from 'react';

import Icon from '~/components/icon'; // `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings';

function Example() {
	return (
		<IconSettings iconPath="/assets/icons">
			<Icon
				assistiveText={{ label: 'Description of icon' }}
				category="custom"
				name="custom5"
				title="description of icon when needed"
			/>
		</IconSettings>
	);
}

Example.displayName = 'IconExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
