import React from 'react';
import Input from '~/components/input'; // `~` is replaced with design-system-react at runtime

class Example extends React.Component {
	render() {
		return (
			<div>
				<h1 className="slds-text-title_caps slds-p-vertical_medium">
					Inline Help
				</h1>
				<Input
					id="inline-help"
					label="My Label"
					inlineHelpText="ex: (415) 111-2222"
				/>
			</div>
		);
	}
}

Example.displayName = 'InlineHelpInputExample';
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
