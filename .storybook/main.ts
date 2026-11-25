import type { StorybookConfig } from '@storybook/react-vite';

// A quoted root-relative asset path, not preceded by a backslash.
const ASSET_PATH = /(?<!\\)(['"`])\/assets\//g;

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

	features: {
		// Hide Storybook's "Get started" onboarding checklist in the sidebar.
		sidebarOnboardingChecklist: false,
	},

	core: {
		// No "What's new in Storybook" popup at the bottom of the sidebar.
		disableWhatsNewNotifications: true,
	},

	framework: {
		name: '@storybook/react-vite',
		options: {},
	},

	// Stories and examples point at icons and images with root-relative paths
	// (`/assets/icons`), which is what consumers copy. On GitHub Pages the site
	// lives under a subpath (/design-system-react/), where those 404. In the
	// Storybook build only, rewrite them relative to iframe.html (`./assets/`),
	// which resolves the same way locally and under any subpath. Source files
	// and tests keep the root-relative form.
	viteFinal: (viteConfig) => ({
		...viteConfig,
		plugins: [
			...(viteConfig.plugins ?? []),
			{
				name: 'dsr-relative-story-assets',
				// After the JSX transform and the docs source capture, so "Show code"
				// still shows `/assets/icons`: the captured source is an escaped
				// string (`\"/assets/`), which the lookbehind skips.
				enforce: 'post',
				transform(code, id) {
					if (
						!/\/components\/.*\.[jt]sx?$/.test(id) ||
						id.includes('node_modules') ||
						!code.includes('/assets/')
					) {
						return null;
					}
					return { code: code.replace(ASSET_PATH, '$1./assets/'), map: null };
				},
			},
		],
	}),

	staticDirs: [
		{
			from: '../node_modules/@salesforce-ux/design-system/assets',
			to: '/assets',
		},
		{ from: '../assets', to: '/assets' },
		// Salesforce cloud (no wordmark) as the browser-tab icon in place of
		// Storybook's. Storybook uses the first staticDirs entry that maps to
		// /favicon.svg.
		{
			from: '../node_modules/@salesforce-ux/design-system/assets/images/logo-noname.svg',
			to: '/favicon.svg',
		},
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
