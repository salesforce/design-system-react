import { action } from 'storybook/actions';
import IconSettings from '../../icon-settings';
import Button from '../../button';
import BaseNeutral from '../__examples__/base-neutral';
import BrandDisabled from '../__examples__/brand-disabled-destructive-inverse';
import ButtonIcons from '../__examples__/button-icons';

/**
 * Decorator for inverse/dark background stories.
 * Uses SLDS surface-inverse class for proper theming.
 */
const inverseDecorator = (Story) => (
	<div
		className="slds-hint-parent slds-box"
		style={{
			backgroundColor: 'var(--slds-g-color-neutral-base-10, #181818)',
			padding: '1rem',
			borderRadius: '0.25rem',
		}}
	>
		<Story />
	</div>
);

export default {
	title: 'Components/Button',
	component: Button,
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium">
				<IconSettings iconPath="/assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
};

const Template = (args) => <Button {...args} onClick={action('click')} />;

// ============================================
// Basic Button Variants
// ============================================

export const Base = Template.bind({});
Base.args = {
	label: 'Base',
	variant: 'base',
};

export const Neutral = Template.bind({});
Neutral.args = {
	label: 'Neutral',
};

export const Brand = Template.bind({});
Brand.args = {
	label: 'Brand',
	variant: 'brand',
};

export const Destructive = Template.bind({});
Destructive.args = {
	label: 'Destructive',
	variant: 'destructive',
};

export const Success = Template.bind({});
Success.args = {
	label: 'Success',
	variant: 'success',
};

export const Disabled = Template.bind({});
Disabled.args = {
	label: 'Disabled',
	disabled: true,
};

// ============================================
// Button with Icons
// ============================================

export const NeutralWithLeftIcon = Template.bind({});
NeutralWithLeftIcon.args = {
	label: 'Download',
	iconCategory: 'utility',
	iconName: 'download',
	iconPosition: 'left',
};

export const NeutralWithRightIcon = Template.bind({});
NeutralWithRightIcon.args = {
	label: 'Settings',
	iconCategory: 'utility',
	iconName: 'settings',
	iconPosition: 'right',
};

export const IconOnly = Template.bind({});
IconOnly.args = {
	variant: 'icon',
	assistiveText: { icon: 'Settings' },
	iconCategory: 'utility',
	iconName: 'settings',
	title: 'Settings',
};

export const IconLarge = Template.bind({});
IconLarge.args = {
	variant: 'icon',
	assistiveText: { icon: 'Chat' },
	iconSize: 'large',
	iconCategory: 'utility',
	iconName: 'answer',
	title: 'Chat',
};

// ============================================
// Inverse Buttons (for dark backgrounds)
// ============================================

export const InverseButton = Template.bind({});
InverseButton.args = {
	label: 'Inverse',
	variant: 'neutral',
	inverse: true,
};
InverseButton.decorators = [inverseDecorator];
InverseButton.parameters = {
	docs: {
		description: {
			story: 'Inverse buttons are designed for dark backgrounds. Toggle dark mode or view on the dark background below.',
		},
	},
};

export const InverseIconButton = Template.bind({});
InverseIconButton.args = {
	variant: 'icon',
	assistiveText: { icon: 'Settings' },
	iconCategory: 'utility',
	iconName: 'settings',
	iconVariant: 'border',
	inverse: true,
};
InverseIconButton.decorators = [inverseDecorator];

export const InverseIconWithHint = Template.bind({});
InverseIconWithHint.args = {
	variant: 'icon',
	assistiveText: { icon: 'More options' },
	iconCategory: 'utility',
	iconName: 'down',
	iconVariant: 'border',
	iconSize: 'small',
	hint: true,
	inverse: true,
};
InverseIconWithHint.decorators = [inverseDecorator];

export const OutlineBrandButton = Template.bind({});
OutlineBrandButton.args = {
	label: 'Outline Brand',
	variant: 'outline-brand',
};
OutlineBrandButton.decorators = [inverseDecorator];

// ============================================
// Special Variants
// ============================================

export const DropdownButton = Template.bind({});
DropdownButton.args = {
	variant: 'icon',
	'aria-haspopup': true,
	assistiveText: { icon: 'More options' },
	iconCategory: 'utility',
	iconName: 'settings',
	iconVariant: 'more',
};

export const LinkButton = Template.bind({});
LinkButton.args = {
	label: 'Link Style',
	variant: 'link',
};

// ============================================
// With Custom Attributes
// ============================================

export const WithAriaLabel = Template.bind({});
WithAriaLabel.args = {
	label: 'Submit',
	'aria-label': 'Submit form',
	variant: 'brand',
};

export const WithDataAttribute = Template.bind({});
WithDataAttribute.args = {
	label: 'Track Me',
	'data-analytics-id': 'button-123',
	variant: 'neutral',
};

export const WithCustomId = Template.bind({});
WithCustomId.args = {
	label: 'Custom ID',
	id: 'my-custom-button',
};

// ============================================
// Doc Site Examples
// ============================================

export const DocSiteBaseNeutral = () => <BaseNeutral />;
DocSiteBaseNeutral.parameters = {
	docs: { description: { story: 'Example from documentation site' } },
};

export const DocSiteBrandDisabled = () => <BrandDisabled />;
DocSiteBrandDisabled.parameters = {
	docs: { description: { story: 'Example from documentation site' } },
};

export const DocSiteButtonIcons = () => <ButtonIcons />;
DocSiteButtonIcons.parameters = {
	docs: { description: { story: 'Example from documentation site' } },
};
