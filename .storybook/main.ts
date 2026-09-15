import { fileURLToPath } from 'url';
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
	// Auto-discover every component story. Stories live at
	// `components/**/__docs__/**/*.stories.{jsx,tsx}` by convention, so a new
	// component's stories appear without editing this list.
	stories: ['../components/**/__docs__/**/*.stories.@(jsx|tsx)'],

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
		// SLDS 2 styling is served from the npm package @salesforce-ux/design-system-2
		// (latest) rather than a committed static stylesheet. See preview-head.html.
		{
			from: '../node_modules/@salesforce-ux/design-system-2/dist/css',
			to: '/slds2',
		},
	],

	viteFinal: async (config) => {
		// Redirect `column-resizer` to a small interop shim (see
		// ../test/shims/column-resizer.js). vite 8's Rolldown dependency optimizer no
		// longer unwraps this UMD bundle's `{ __esModule: true, default: Ctor }`
		// export the way vite 5's esbuild optimizer did, so DataTable's default
		// import resolves to the wrapper object and `new ColumnResizer(...)` throws
		// "is not a constructor" in the dev server. The shim re-exports the actual
		// constructor as its default. (The Vitest `browser` project applies the same
		// alias in vitest.config.ts; the library build + jsdom tests are unaffected.)
		config.resolve = config.resolve || {};
		const shim = fileURLToPath(
			new URL('../test/shims/column-resizer.js', import.meta.url)
		);
		// Use the array (regex) alias form with an anchored pattern so ONLY the bare
		// `column-resizer` specifier is rewritten. The object form does prefix
		// matching, which would also rewrite the shim's own
		// `column-resizer/dist/column-resizer.js` import and break resolution.
		const existingAlias = config.resolve.alias;
		const aliasArray = Array.isArray(existingAlias)
			? existingAlias
			: Object.entries(existingAlias || {}).map(([find, replacement]) => ({
					find,
					replacement: replacement as string,
				}));
		aliasArray.push({ find: /^column-resizer$/, replacement: shim });
		config.resolve.alias = aliasArray;
		return config;
	},

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
