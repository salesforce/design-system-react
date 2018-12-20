import React from 'react';

import Icon from '~/components/icon'; // `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings';

class Example extends React.Component {
	static displayName = 'IconExample';

	render() {
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
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
