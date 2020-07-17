import React from 'react';

import IconSettings from '~/components/icon-settings';
import Tooltip from '~/components/tooltip'; // `~` is replaced with design-system-react at runtime

class Example extends React.Component {
	static displayName = 'TooltipExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Tooltip
					id="with-delay"
					align="top left"
					content="Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi."
					variant="learnMore"
					hoverCloseDelay={1000}
					hoverOpenDelay={1000}
				/>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
