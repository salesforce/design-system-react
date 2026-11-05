import { useState } from 'react';
// `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings';
import Checkbox from '~/components/checkbox';

const Example = () => {
	const [checked, setChecked] = useState({
		default: false,
		indeterminate: false,
		required: false,
		disabled: false,
	});
	const [indeterminate, setIndeterminate] = useState(true);

	const handleChange = (key) => (event, data) => {
		setChecked((previous) => ({ ...previous, [key]: data.checked }));
		if (key === 'indeterminate') {
			setIndeterminate(data.indeterminate);
		}
	};

	return (
		<IconSettings iconPath="/assets/icons">
			<div className="slds-grid slds-grid_pull-padded slds-grid_vertical-align-center">
				<div className="slds-col_padded">
					<Checkbox
						assistiveText={{
							label: 'Default',
						}}
						checked={checked.default}
						id="checkbox-example"
						labels={{
							label: 'Default',
						}}
						onChange={handleChange('default')}
					/>
				</div>
				<div className="slds-col_padded">
					<Checkbox
						assistiveText={{
							label: 'Indeterminate',
						}}
						checked={checked.indeterminate}
						id="checkbox-example-indeterminate"
						indeterminate={indeterminate}
						labels={{
							label: 'Indeterminate',
						}}
						onChange={handleChange('indeterminate')}
					/>
				</div>
				<div className="slds-col_padded">
					<Checkbox
						assistiveText={{
							label: 'Indeterminate',
						}}
						checked={checked.required}
						id="checkbox-example-required"
						labels={{
							label: 'Required',
						}}
						required
						onChange={handleChange('required')}
					/>
				</div>
				<div className="slds-col_padded">
					<Checkbox
						assistiveText={{
							label: 'Disabled',
						}}
						checked={checked.disabled}
						id="checkbox-example-disabled"
						labels={{
							label: 'Disabled',
						}}
						disabled
						onChange={handleChange('disabled')}
					/>
				</div>
			</div>
		</IconSettings>
	);
};

Example.displayName = 'CheckboxExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
