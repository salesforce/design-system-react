import React from 'react';
import IconSettings from '~/components/icon-settings';
import Select from '~/components/select';
import SelectContainer from '../private/container';
import Label from '../private/label';

class Example extends React.Component {
	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Select>
					<Label id="select-01" label="Select Label" required />
					<SelectContainer
						id="select-01"
						options={[
							'Please select',
							'Option One',
							'Option Two',
							'Option Three',
						]}
						isMultipleSelection
					/>
				</Select>
			</IconSettings>
		);
	}
}

Example.displayName = 'MultipleSelectionNarrowExample'; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
export default Example;
