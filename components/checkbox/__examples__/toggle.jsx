import { useState } from 'react';
// `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings';
import Checkbox from '~/components/checkbox';

const Example = () => {
	const [checked, setChecked] = useState({
		'checkbox-toggle-example': false,
		'checkbox-toggle-example--error': false,
		'checkbox-toggle-example--disabled': false,
		'checkbox-toggle-example--required': false,
		'checkbox-toggle-example--assitive-text': false,
		'checkbox-toggle-example--checked': true,
		'checkbox-toggle-example--checked-disabled': true,
	});

	const handleChange = (id) => (event, data) => {
		setChecked((previous) => ({ ...previous, [id]: data.checked }));
	};

	return (
		<IconSettings iconPath="/assets/icons">
			<div>
				<div className="slds-grid slds-grid_pull-padded slds-grid_vertical-align-center">
					<div className="slds-col_padded">
						<Checkbox
							labels={{
								label: 'Toggle',
							}}
							checked={checked['checkbox-toggle-example']}
							id="checkbox-toggle-example"
							variant="toggle"
							onChange={handleChange('checkbox-toggle-example')}
						/>
					</div>
					<div className="slds-col_padded">
						<Checkbox
							labels={{
								label: 'Toggle',
							}}
							checked={checked['checkbox-toggle-example--error']}
							id="checkbox-toggle-example--error"
							errorText="This field has an error"
							variant="toggle"
							onChange={handleChange('checkbox-toggle-example--error')}
						/>
					</div>
					<div className="slds-col_padded">
						<Checkbox
							labels={{
								label: 'Toggle (disabled)',
							}}
							checked={checked['checkbox-toggle-example--disabled']}
							id="checkbox-toggle-example--disabled"
							variant="toggle"
							disabled
							onChange={handleChange('checkbox-toggle-example--disabled')}
						/>
					</div>
					<div className="slds-col_padded">
						<Checkbox
							labels={{
								label: 'Toggle (required)',
							}}
							checked={checked['checkbox-toggle-example--required']}
							id="checkbox-toggle-example--required"
							variant="toggle"
							required
							onChange={handleChange('checkbox-toggle-example--required')}
						/>
					</div>
				</div>
				<div className="slds-grid slds-grid_pull-padded slds-grid_vertical-align-center">
					<div className="slds-col_padded">
						<Checkbox
							assistiveText={{
								label: 'Toggle (with assistive text)',
							}}
							checked={checked['checkbox-toggle-example--assitive-text']}
							id="checkbox-toggle-example--assitive-text"
							variant="toggle"
							onChange={handleChange('checkbox-toggle-example--assitive-text')}
						/>
					</div>
					<div className="slds-col_padded">
						<Checkbox
							labels={{
								label: 'Toggle (checked)',
							}}
							checked={checked['checkbox-toggle-example--checked']}
							id="checkbox-toggle-example--checked"
							variant="toggle"
							onChange={handleChange('checkbox-toggle-example--checked')}
						/>
					</div>
					<div className="slds-col_padded">
						<Checkbox
							checked={checked['checkbox-toggle-example--checked-disabled']}
							id="checkbox-toggle-example--checked-disabled"
							labels={{
								label: 'Toggle (checked + disabled)',
							}}
							variant="toggle"
							disabled
							onChange={handleChange(
								'checkbox-toggle-example--checked-disabled'
							)}
						/>
					</div>
				</div>
			</div>
		</IconSettings>
	);
};

Example.displayName = 'CheckboxExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
