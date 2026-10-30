import { useState } from 'react';
// `~` is replaced with design-system-react at runtime
import Checkbox from '~/components/checkbox';

const Example = () => {
	const [checked, setChecked] = useState({
		'checkbox-base-example': false,
		'checkbox-base-example--error': false,
		'checkbox-base-example--disabled': false,
		'checkbox-base-example--required': false,
		'checkbox-base-example--assistive-text': false,
		'checkbox-base-example--checked': true,
		'checkbox-base-example--checked-disabled': true,
		'checkbox-base-example--indeterminate': false,
	});
	const [indeterminate, setIndeterminate] = useState({
		'checkbox-base-example--indeterminate': true,
	});

	const handleChange = (id) => (event, data) => {
		setChecked((previous) => ({ ...previous, [id]: data.checked }));
		setIndeterminate((previous) => ({ ...previous, [id]: data.indeterminate }));
	};

	return (
		<div>
			<div className="slds-grid slds-grid_pull-padded slds-grid_vertical-align-center">
				<div className="slds-col_padded">
					<Checkbox
						labels={{
							label: 'Checkbox',
						}}
						checked={checked['checkbox-base-example']}
						id="checkbox-base-example"
						onChange={handleChange('checkbox-base-example')}
					/>
				</div>
				<div className="slds-col_padded">
					<Checkbox
						labels={{
							label: 'Checkbox',
						}}
						checked={checked['checkbox-base-example--error']}
						id="checkbox-base-example--error"
						errorText="This field has an error"
						onChange={handleChange('checkbox-base-example--error')}
					/>
				</div>
				<div className="slds-col_padded">
					<Checkbox
						labels={{
							label: 'Checkbox (disabled)',
						}}
						checked={checked['checkbox-base-example--disabled']}
						id="checkbox-base-example--disabled"
						disabled
						onChange={handleChange('checkbox-base-example--disabled')}
					/>
				</div>
				<div className="slds-col_padded">
					<Checkbox
						labels={{
							label: 'Checkbox (required)',
						}}
						checked={checked['checkbox-base-example--required']}
						id="checkbox-base-example--required"
						required
						onChange={handleChange('checkbox-base-example--required')}
					/>
				</div>
			</div>
			<div className="slds-grid slds-grid_pull-padded slds-grid_vertical-align-center">
				<div className="slds-col_padded">
					<Checkbox
						assistiveText={{
							label: 'Checkbox (with assistive text)',
						}}
						checked={checked['checkbox-base-example--assistive-text']}
						id="checkbox-base-example--assistive-text"
						onChange={handleChange('checkbox-base-example--assistive-text')}
					/>
				</div>
				<div className="slds-col_padded">
					<Checkbox
						labels={{
							label: 'Checkbox (checked)',
						}}
						checked={checked['checkbox-base-example--checked']}
						id="checkbox-base-example--checked"
						onChange={handleChange('checkbox-base-example--checked')}
					/>
				</div>
				<div className="slds-col_padded">
					<Checkbox
						labels={{
							label: 'Checkbox (checked + disabled)',
						}}
						checked={checked['checkbox-base-example--checked-disabled']}
						id="checkbox-base-example--checked-disabled"
						disabled
						onChange={handleChange('checkbox-base-example--checked-disabled')}
					/>
				</div>
				<div className="slds-col_padded">
					<Checkbox
						labels={{
							label: 'Checkbox (indeterminate)',
						}}
						checked={checked['checkbox-base-example--indeterminate']}
						id="checkbox-base-example--indeterminate"
						indeterminate={
							indeterminate['checkbox-base-example--indeterminate']
						}
						onChange={handleChange('checkbox-base-example--indeterminate')}
					/>
				</div>
			</div>
		</div>
	);
};

Example.displayName = 'CheckboxExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
