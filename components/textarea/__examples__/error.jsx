import React from 'react';

import IconSettings from '~/components/icon-settings';
import Textarea from '~/components/textarea'; // `~` is replaced with design-system-react at runtime

class Example extends React.Component {
	static displayName = 'TextareaExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Textarea
					aria-describedby="error-1"
					id="text-area-error"
					hasError
					labels={{ label: 'Textarea Label', error: 'This field is required' }}
					name="required-textarea-error"
					required
					placeholder="Placeholder Text"
				/>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
