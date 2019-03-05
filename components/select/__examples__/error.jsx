import React from 'react';
import IconSettings from '~/components/icon-settings';
import Select from '~/components/select';
import SelectContainer from '../private/container';
import Label from '../private/label';
import Error from '../private/error';

class Example extends React.Component {
	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Select hasError>
					<Label id="select-01" label="Select Label" required />
					<SelectContainer
						id="select-01"
						errorText="This field is required"
						aria-describedby="error-01"
						options={[
							'Please select',
							'Option One',
							'Option Two',
							'Option Three',
						]}
					/>
					<Error id="error-01" errorText="This field is required" />
				</Select>
			</IconSettings>
		);
	}
}

Example.displayName = 'ErrorExample'; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
export default Example;
