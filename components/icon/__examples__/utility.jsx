import React from 'react';
import createReactClass from 'create-react-class';
import Icon from '~/components/icon'; // `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings';

const Example = createReactClass({
	displayName: 'IconExample',

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<Icon
					assistiveText={{ label: 'Description of icon' }}
					category="utility"
					colorVariant="default"
					name="announcement"
					size="small"
					title="description of icon when needed"
				/>
			</IconSettings>
		);
	}
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
