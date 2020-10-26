import React from 'react';

import IconSettings from '~/components/icon-settings';
import Textarea from '~/components/textarea'; // `~` is replaced with design-system-react at runtime

function Example() {
	return (
		<IconSettings iconPath="/assets/icons">
			<Textarea
				aria-describedby="error-1"
				id="text-area-error"
				name="required-textarea-error"
				label="Textarea Label"
				required
				errorText="This field is required"
				placeholder="Placeholder Text"
			/>
		</IconSettings>
	);
}

Example.displayName = 'TextareaExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
