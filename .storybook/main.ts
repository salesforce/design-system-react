import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
	// Auto-discover every component story. Stories live at
	// `components/**/__docs__/**/*.stories.{jsx,tsx}` by convention, so a new
	// component's stories appear without editing this list.
	// The Introduction landing page lives in .storybook/introduction, outside
	// `components/**`, so the story-snapshot suite never picks it up.
	stories: [
		'./introduction/*.stories.@(jsx|tsx)',
		'../components/**/__docs__/**/*.stories.@(jsx|tsx)',
	],

	addons: [
		'@storybook/addon-links',
		'@storybook/addon-a11y',
		'@storybook/addon-docs',
	],

	framework: {
		name: '@storybook/react-vite',
		options: {},
	},

	staticDirs: [
		{
			from: '../node_modules/@salesforce-ux/design-system/assets',
			to: '/assets',
		},
		{ from: '../assets', to: '/assets' },
		// Manager-only chrome CSS, linked from manager-head.html. Never loaded in
		// the preview iframe, so it cannot affect components.
		{ from: './chrome', to: '/storybook-chrome' },
		// SLDS 2 styling is served from the npm package @salesforce-ux/design-system-2
		// (latest) rather than a committed static stylesheet. See preview-head.html.
		{
			from: '../node_modules/@salesforce-ux/design-system-2/dist/css',
			to: '/slds2',
		},
	],

	typescript: {
		check: false, // Disable type checking in Storybook (we do it separately)
		reactDocgen: 'react-docgen-typescript',
		reactDocgenTypescriptOptions: {
			shouldExtractLiteralValuesFromEnum: true,
			shouldRemoveUndefinedFromOptional: true,
			// Do NOT let docgen emit `Component.displayName = "<derived name>"`.
			// Several components set a static `displayName` to an SLDS constant and
			// rely on it at runtime for `React.Children` filtering (e.g. SetupAssistant
			// keeps only children whose `displayName === SETUP_ASSISTANT_STEP`).
			// Docgen's name-derived override clobbers those values, so the child
			// filter matches nothing and the component renders empty. Keeping the real
			// displayName intact avoids that.
			setDisplayName: false,
			propFilter: (prop) => {
				// Filter out props from node_modules
				if (prop.parent) {
					return !prop.parent.fileName.includes('node_modules');
				}
				return true;
			},
		},
	},
};

export default config;
