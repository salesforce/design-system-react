import Spinner from '../../spinner';
import IconSettings from '../../icon-settings';

// Reusable decorator for inverse backgrounds
const inverseDecorator = (Story) => (
	<div
		style={{
			backgroundColor: 'var(--slds-g-color-neutral-base-10, #16325c)',
			position: 'relative',
			width: '100%',
			height: '100px',
		}}
	>
		<Story />
	</div>
);

// Decorator for inline spinners
const inlineDecorator = (Story) => (
	<div className="slds-align_absolute-center" style={{ height: '4rem' }}>
		<Story />
	</div>
);

export default {
	title: 'Components/Spinner',
	component: Spinner,
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
		size: {
			control: 'select',
			options: ['xx-small', 'x-small', 'small', 'medium', 'large'],
		},
		variant: {
			control: 'radio',
			options: ['base', 'brand', 'inverse'],
		},
		hasContainer: {
			control: 'boolean',
		},
		isDelayed: {
			control: 'boolean',
		},
		isInline: {
			control: 'boolean',
		},
	},
	tags: ['autodocs'],
};

/**
 * Default medium spinner
 */
export const Default = {
	args: {
		size: 'medium',
		variant: 'base',
	},
};

// ============================================
// Size Variants
// ============================================

/**
 * Extra extra small spinner (xx-small)
 */
export const SizeXxSmall = {
	args: {
		size: 'xx-small',
		variant: 'base',
		assistiveText: { label: 'Loading...' },
	},
};

/**
 * Extra small spinner (x-small)
 */
export const SizeXSmall = {
	args: {
		size: 'x-small',
		variant: 'base',
	},
};

/**
 * Small spinner
 */
export const SizeSmall = {
	args: {
		size: 'small',
		variant: 'base',
	},
};

/**
 * Medium spinner
 */
export const SizeMedium = {
	args: {
		size: 'medium',
		variant: 'base',
	},
};

/**
 * Large spinner
 */
export const SizeLarge = {
	args: {
		size: 'large',
		variant: 'base',
	},
};

// ============================================
// Brand Variant
// ============================================

/**
 * Brand variant - xx-small
 */
export const BrandXxSmall = {
	args: {
		size: 'xx-small',
		variant: 'brand',
	},
};

/**
 * Brand variant - medium
 */
export const BrandMedium = {
	args: {
		size: 'medium',
		variant: 'brand',
	},
};

/**
 * Brand variant - large
 */
export const BrandLarge = {
	args: {
		size: 'large',
		variant: 'brand',
		containerClassName: 'my-custom-classname',
	},
};

// ============================================
// Inverse Variant (for dark backgrounds)
// ============================================

/**
 * Inverse variant for dark backgrounds
 */
export const InverseMedium = {
	args: {
		size: 'medium',
		variant: 'inverse',
	},
	decorators: [inverseDecorator],
};

/**
 * Inverse large variant
 */
export const InverseLarge = {
	args: {
		size: 'large',
		variant: 'inverse',
	},
	decorators: [inverseDecorator],
};

// ============================================
// Special Options
// ============================================

/**
 * Spinner with 300ms delay
 */
export const WithDelay = {
	args: {
		size: 'large',
		variant: 'base',
		isDelayed: true,
	},
};

/**
 * Inline spinner (no container)
 */
export const InlineSpinner = {
	args: {
		isInline: true,
		hasContainer: false,
	},
	decorators: [inlineDecorator],
};

/**
 * Spinner without container
 */
export const NoContainer = {
	args: {
		hasContainer: false,
	},
	decorators: [inlineDecorator],
};

/**
 * All sizes comparison
 */
export const AllSizes = {
	render: () => (
		<div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
			<div style={{ textAlign: 'center' }}>
				<Spinner size="xx-small" hasContainer={false} />
				<div style={{ marginTop: '2rem', fontSize: '12px' }}>xx-small</div>
			</div>
			<div style={{ textAlign: 'center' }}>
				<Spinner size="x-small" hasContainer={false} />
				<div style={{ marginTop: '2rem', fontSize: '12px' }}>x-small</div>
			</div>
			<div style={{ textAlign: 'center' }}>
				<Spinner size="small" hasContainer={false} />
				<div style={{ marginTop: '2rem', fontSize: '12px' }}>small</div>
			</div>
			<div style={{ textAlign: 'center' }}>
				<Spinner size="medium" hasContainer={false} />
				<div style={{ marginTop: '2rem', fontSize: '12px' }}>medium</div>
			</div>
			<div style={{ textAlign: 'center' }}>
				<Spinner size="large" hasContainer={false} />
				<div style={{ marginTop: '2rem', fontSize: '12px' }}>large</div>
			</div>
		</div>
	),
};
