import React from 'react';
import createReactClass from 'create-react-class';
import IconSettings from '~/components/icon-settings';
import Textarea from '~/components/textarea'; // `~` is replaced with design-system-react at runtime

const Example = createReactClass({
	displayName: 'TextareaExample',

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<Textarea
					aria-describedby="error-1"
					name="required-textarea-error"
					label="Textarea Label"
					required
					errorText="Error Message"
					placeholder="Placeholder Text"
				/>
			</IconSettings>
		);
	},
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
