/* eslint-disable no-console, react/prop-types */
import React from 'react';
import Combobox from '~/components/combobox';
import Popover from '~/components/popover';
import IconSettings from '~/components/icon-settings';

class Example extends React.Component {
	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Combobox
					assistiveText={{
						popoverLabel: 'Language Options',
					}}
					id="combobox-unique-id"
					isOpen
					labels={{
						label: 'Languages',
						placeholder: 'Select an option',
					}}
					popover={<Popover body={<div>Any content can go here.</div>} />}
					value="Select an option"
					variant="popover"
				/>
			</IconSettings>
		);
	}
}

Example.displayName = 'ComboboxExample';
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
