/* eslint-disable no-console, react/prop-types */
import React from 'react';

import IconSettings from '~/components/icon-settings';
import DockedComposer from '~/components/docked-composer';
import Button from '~/components/button';

class Example extends React.Component {
	static displayName = 'DockedComposerExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<DockedComposer
					actionButton={<Button variant="brand" label="Action" />}
				/>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
