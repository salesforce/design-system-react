import React from 'react';

import IconSettings from '~/components/icon-settings';
import Tooltip from '~/components/tooltip'; // `~` is replaced with design-system-react at runtime

class Example extends React.Component {
	static displayName = 'TooltipAnchoredNubbinExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div>
					<Tooltip
						id="anchored-nubbin-top"
						align="top left"
						content="Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi."
						hasAnchoredNubbin
						isOpen
					/>
				</div>
				<div style={{ marginTop: '1rem' }}>
					<Tooltip
						id="anchored-nubbin-right"
						align="right"
						content="Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi."
						hasAnchoredNubbin
						isOpen
					/>
				</div>
				<div style={{ marginTop: '1rem' }}>
					<Tooltip
						id="anchored-nubbin-left"
						align="left"
						content="Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi."
						hasAnchoredNubbin
						isOpen
					/>
				</div>
				<div style={{ marginTop: '1rem' }}>
					<Tooltip
						id="anchored-nubbin-bottom"
						align="bottom right"
						content="Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi."
						hasAnchoredNubbin
						isOpen
					/>
				</div>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
