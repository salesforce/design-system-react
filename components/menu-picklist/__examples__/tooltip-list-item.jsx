import React from 'react';

import IconSettings from '~/components/icon-settings';
import Picklist from '~/components/menu-picklist'; // `~` is replaced with design-system-react at runtime
import Tooltip from '~/components/tooltip';

const ListItemRenderer = (props) => (
	<Tooltip
		openByDefault={props.isHighlighted}
		align="bottom left"
		content={`${props.label} tooltip on bottom left`}
	>
		<p
			className="slds-truncate"
			tabIndex={0} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
		>
			{props.label} (Hover for tooltip)
		</p>
	</Tooltip>
);

class Example extends React.Component {
	static displayName = 'PicklistExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Picklist
					listItemRenderer={ListItemRenderer}
					label="Contacts"
					onSelect={(value) => {
						console.log('selected: ', value);
					}}
					options={[
						{ label: 'Option A', value: 'A0' },
						{ label: 'Option B', value: 'B0' },
						{ label: 'Option C', value: 'C0' },
						{ label: 'Option D', value: 'D0' },
						{ label: 'Option E', value: 'E0' },
						{ label: 'Option FGHIJKLMNOPQRSTUVWXYZ', value: 'F0' },
					]}
					placeholder="Select a contact"
					value="C0"
					silenceDeprecationWarning
				/>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
