import React from 'react';

import IconSettings from '~/components/icon-settings';
import Textarea from '~/components/textarea'; // `~` is replaced with design-system-react at runtime

function Example() {
	return (
		<IconSettings iconPath="/assets/icons">
			<Textarea id="unique-id-1" label="Textarea Label" />
		</IconSettings>
	);
}

Example.displayName = 'TextareaExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
