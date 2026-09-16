import IconSettings from '../../icon-settings';
import Textarea from '../../textarea';
import DefaultExample from '../__examples__/default';
import DisabledExample from '../__examples__/disabled';
import ErrorExample from '../__examples__/error';

export default {
	title: 'Components/Textarea',
	component: Textarea,
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

const Template = (args) => <Textarea {...args} />;

// ============================================
// Basic Textarea Variants
// ============================================

export const Standard = Template.bind({});
Standard.args = {
	id: 'textarea-standard',
	label: 'Textarea Label',
	name: 'standard-textarea',
	placeholder: 'Placeholder Text',
};

export const WithValue = Template.bind({});
WithValue.args = {
	id: 'textarea-with-value',
	label: 'Textarea with Value',
	name: 'textarea-value',
	value: 'This is some preset content in the textarea.',
};

export const Disabled = Template.bind({});
Disabled.args = {
	id: 'textarea-disabled',
	label: 'Disabled Textarea',
	name: 'disabled-textarea',
	placeholder: 'This textarea is disabled',
	disabled: true,
};

export const Required = Template.bind({});
Required.args = {
	id: 'textarea-required',
	label: 'Required Textarea',
	name: 'required-textarea',
	placeholder: 'This field is required',
	required: true,
};

export const WithError = Template.bind({});
WithError.args = {
	id: 'textarea-error',
	label: 'Textarea with Error',
	name: 'error-textarea',
	placeholder: 'Please fix this error',
	required: true,
	errorText: 'This field is required and cannot be empty.',
};

export const WithMaxLength = Template.bind({});
WithMaxLength.args = {
	id: 'textarea-maxlength',
	label: 'Limited Characters',
	name: 'maxlength-textarea',
	placeholder: 'Max 100 characters',
	maxLength: '100',
};

export const AssistiveTextOnly = Template.bind({});
AssistiveTextOnly.args = {
	id: 'textarea-assistive',
	assistiveText: { label: 'This label is only visible to screen readers' },
	name: 'assistive-textarea',
	placeholder: 'No visible label, but has assistive text',
};

// ============================================
// Doc Site Examples
// ============================================

export const DocSiteDefault = () => <DefaultExample />;
DocSiteDefault.parameters = {
	docs: { description: { story: 'Default textarea example from documentation' } },
};

export const DocSiteDisabled = () => <DisabledExample />;
DocSiteDisabled.parameters = {
	docs: { description: { story: 'Disabled textarea example from documentation' } },
};

export const DocSiteError = () => <ErrorExample />;
DocSiteError.parameters = {
	docs: { description: { story: 'Error state textarea from documentation' } },
};
