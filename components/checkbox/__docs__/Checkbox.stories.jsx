import { useState } from 'react';
import { action } from 'storybook/actions';
import IconSettings from '../../icon-settings';
import Checkbox from '../../checkbox';
import Button from '../../button';
import DefaultExample from '../__examples__/default';
import ErrorExample from '../__examples__/error';
import ToggleExample from '../__examples__/toggle';

/**
 * Interactive example showing indeterminate state
 */
const CheckboxIndeterminate = () => {
	const [state, setState] = useState({
		indeterminate: true,
		checked: true,
		currentStateHelper: 'Indeterminate',
	});

	const handleChange = (event, data) => {
		const checkedLabel = data.checked ? 'Checked' : 'Unchecked';
		setState({
			checked: data.checked,
			currentStateHelper: data.indeterminate ? 'Indeterminate' : checkedLabel,
			indeterminate: data.indeterminate,
		});
		action('handleChange')(event, data);
	};

	const changeToIndeterminate = () => {
		setState({
			currentStateHelper: 'Indeterminate',
			checked: true,
			indeterminate: true,
		});
	};

	const changeToCheck = () => {
		setState({
			currentStateHelper: 'Checked',
			checked: true,
			indeterminate: false,
		});
	};

	const changeToUnChecked = () => {
		setState({
			currentStateHelper: 'Unchecked',
			checked: false,
			indeterminate: false,
		});
	};

	return (
		<div>
			<div className="slds-button-group slds-m-bottom_medium" role="group">
				<Button onClick={changeToIndeterminate} label="Indeterminate" />
				<Button onClick={changeToCheck} label="Check" />
				<Button onClick={changeToUnChecked} label="Uncheck" />
			</div>
			<p className="slds-m-bottom_medium">
				<strong>Current State:</strong> {state.currentStateHelper}
			</p>
			<Checkbox
				id="checkbox-indeterminate-example"
				labels={{ label: 'Indeterminate Checkbox' }}
				name="checkbox-indeterminate"
				checked={state.checked}
				indeterminate={state.indeterminate}
				onChange={handleChange}
			/>
		</div>
	);
};

export default {
	title: 'Components/Checkbox',
	component: Checkbox,
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium">
				<IconSettings iconPath="/assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
	argTypes: {
		onChange: { action: 'changed' },
		onFocus: { action: 'focused' },
		onBlur: { action: 'blurred' },
	},
};

const Template = (args) => <Checkbox {...args} />;

// ============================================
// Base Checkbox Variants
// ============================================

export const Base = Template.bind({});
Base.args = {
	id: 'checkbox-base',
	labels: { label: 'Checkbox Label' },
	name: 'checkbox-base',
};

export const Checked = Template.bind({});
Checked.args = {
	id: 'checkbox-checked',
	labels: { label: 'Checked Checkbox' },
	name: 'checkbox-checked',
	checked: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
	id: 'checkbox-disabled',
	labels: { label: 'Disabled Checkbox' },
	name: 'checkbox-disabled',
	disabled: true,
};

export const DisabledChecked = Template.bind({});
DisabledChecked.args = {
	id: 'checkbox-disabled-checked',
	labels: { label: 'Disabled & Checked' },
	name: 'checkbox-disabled-checked',
	disabled: true,
	checked: true,
};

export const Required = Template.bind({});
Required.args = {
	id: 'checkbox-required',
	labels: { label: 'Required Checkbox' },
	name: 'checkbox-required',
	required: true,
};

export const WithError = Template.bind({});
WithError.args = {
	id: 'checkbox-error',
	labels: { label: 'Checkbox with Error' },
	name: 'checkbox-error',
	errorText: 'This field is required.',
	required: true,
};

export const Indeterminate = {
	render: () => <CheckboxIndeterminate />,
	parameters: {
		docs: {
			description: {
				story: 'Indeterminate state is set programmatically and cannot be set by user interaction.',
			},
		},
	},
};

export const WithAssistiveText = Template.bind({});
WithAssistiveText.args = {
	id: 'checkbox-assistive',
	assistiveText: { label: 'This text is read by screen readers but not visible' },
	labels: { label: 'Checkbox with Assistive Text' },
	name: 'checkbox-assistive',
};

// ============================================
// Toggle Variant
// ============================================

export const Toggle = Template.bind({});
Toggle.args = {
	id: 'checkbox-toggle',
	labels: { label: 'Toggle Switch' },
	name: 'checkbox-toggle',
	variant: 'toggle',
};

export const ToggleChecked = Template.bind({});
ToggleChecked.args = {
	id: 'checkbox-toggle-checked',
	labels: { label: 'Toggle (On)' },
	name: 'checkbox-toggle-checked',
	variant: 'toggle',
	checked: true,
};

export const ToggleDisabled = Template.bind({});
ToggleDisabled.args = {
	id: 'checkbox-toggle-disabled',
	labels: { label: 'Disabled Toggle' },
	name: 'checkbox-toggle-disabled',
	variant: 'toggle',
	disabled: true,
};

export const ToggleRequired = Template.bind({});
ToggleRequired.args = {
	id: 'checkbox-toggle-required',
	labels: { label: 'Required Toggle' },
	name: 'checkbox-toggle-required',
	variant: 'toggle',
	required: true,
};

export const ToggleWithError = Template.bind({});
ToggleWithError.args = {
	id: 'checkbox-toggle-error',
	labels: { label: 'Toggle with Error' },
	name: 'checkbox-toggle-error',
	variant: 'toggle',
	errorText: 'Please enable this setting.',
};

export const ToggleCustomLabels = Template.bind({});
ToggleCustomLabels.args = {
	id: 'checkbox-toggle-custom',
	labels: {
		label: 'Custom Toggle Labels',
		toggleEnabled: 'Yes',
		toggleDisabled: 'No',
	},
	name: 'checkbox-toggle-custom',
	variant: 'toggle',
};

// ============================================
// Button Group Variant
// ============================================

export const ButtonGroup = Template.bind({});
ButtonGroup.args = {
	id: 'checkbox-button-group',
	labels: { label: 'Option A' },
	name: 'checkbox-button-group',
	variant: 'button-group',
};

// ============================================
// Doc Site Examples
// ============================================

export const DocSiteDefault = () => <DefaultExample />;
DocSiteDefault.parameters = {
	docs: { description: { story: 'Default checkbox examples from documentation' } },
};

export const DocSiteError = () => <ErrorExample />;
DocSiteError.parameters = {
	docs: { description: { story: 'Error state checkbox from documentation' } },
};

export const DocSiteToggle = () => <ToggleExample />;
DocSiteToggle.parameters = {
	docs: { description: { story: 'Toggle variant from documentation' } },
};
