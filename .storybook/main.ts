import { fileURLToPath } from 'url';
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  // Stories follow ComponentName.stories.jsx/tsx naming convention
  // See: https://storybook.js.org/docs/writing-stories/naming-components-and-hierarchy
  stories: [
    '../components/accordion/__docs__/Accordion.stories.jsx',
    '../components/alert/__docs__/Alert.stories.jsx',
    '../components/app-launcher/__docs__/AppLauncher.stories.jsx',
    '../components/avatar/__docs__/Avatar.stories.jsx',
    '../components/badge/__docs__/Badge.stories.jsx',
    '../components/brand-band/__docs__/BrandBand.stories.jsx',
    '../components/breadcrumb/__docs__/Breadcrumb.stories.jsx',
    '../components/builder-header/__docs__/BuilderHeader.stories.jsx',
    '../components/button/__docs__/Button.stories.jsx',
    '../components/button-group/__docs__/ButtonGroup.stories.jsx',
    '../components/button-stateful/__docs__/ButtonStateful.stories.jsx',
    '../components/card/__docs__/Card.stories.jsx',
    '../components/carousel/__docs__/Carousel.stories.jsx',
    '../components/checkbox/__docs__/Checkbox.stories.jsx',
    '../components/color-picker/__docs__/ColorPicker.stories.tsx',
    '../components/combobox/__docs__/Combobox.stories.tsx',
    '../components/data-table/__docs__/DataTable.stories.tsx',
    '../components/date-picker/__docs__/DatePicker.stories.tsx',
    '../components/docked-composer/__docs__/DockedComposer.stories.jsx',
    '../components/dynamic-icon/__docs__/DynamicIcon.stories.jsx',
    '../components/expandable-section/__docs__/ExpandableSection.stories.jsx',
    '../components/expression/__docs__/Expression.stories.jsx',
    '../components/files/__docs__/Files.stories.jsx',
    '../components/filter/__docs__/Filter.stories.tsx',
    '../components/global-header/__docs__/GlobalHeader.stories.jsx',
    '../components/global-navigation-bar/__docs__/GlobalNavigationBar.stories.jsx',
    '../components/input/__docs__/Input.stories.tsx',
    '../components/input/__docs__/Search.stories.tsx',
    '../components/location-map/__docs__/LocationMap.stories.jsx',
    '../components/menu-dropdown/__docs__/MenuDropdown.stories.tsx',
    '../components/modal/__docs__/Modal.stories.jsx',
    '../components/page-header/__docs__/PageHeader.stories.jsx',
    '../components/panel/__docs__/Panel.stories.jsx',
    '../components/pill/__docs__/Pill.stories.jsx',
    '../components/pill-container/__docs__/PillContainer.stories.jsx',
    '../components/popover/__docs__/Popover.stories.jsx',
    '../components/progress-bar/__docs__/ProgressBar.stories.jsx',
    '../components/progress-indicator/__docs__/ProgressIndicator.stories.jsx',
    '../components/progress-ring/__docs__/ProgressRing.stories.jsx',
    '../components/radio/__docs__/Radio.stories.jsx',
    '../components/radio-group/__docs__/RadioGroup.stories.jsx',
    '../components/scoped-notification/__docs__/ScopedNotification.stories.jsx',
    '../components/setup-assistant/__docs__/SetupAssistant.stories.jsx',
    '../components/slider/__docs__/Slider.stories.jsx',
    '../components/spinner/__docs__/Spinner.stories.jsx',
    '../components/split-view/__docs__/SplitView.stories.jsx',
    '../components/tabs/__docs__/Tabs.stories.jsx',
    '../components/textarea/__docs__/Textarea.stories.jsx',
    '../components/toast/__docs__/Toast.stories.jsx',
    '../components/tooltip/__docs__/Tooltip.stories.jsx',
    '../components/tree/__docs__/Tree.stories.tsx',
    '../components/vertical-navigation/__docs__/VerticalNavigation.stories.jsx',
    '../components/visual-picker/__docs__/VisualPicker.stories.jsx',
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
    { from: '../node_modules/@salesforce-ux/design-system/assets', to: '/assets' },
    { from: '../assets', to: '/assets' },
    // SLDS 2 styling is served from the npm package @salesforce-ux/design-system-2
    // (latest) rather than a committed static stylesheet. See preview-head.html.
    { from: '../node_modules/@salesforce-ux/design-system-2/dist/css', to: '/slds2' },
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
      // Several components (GlobalNavigationBar, its Region, etc.) set a static
      // `displayName` to an SLDS constant (e.g. 'SLDSGlobalNavigationBarRegion')
      // and rely on it at runtime: GlobalNavigationBar filters its children by
      // `child.type.displayName === GLOBAL_NAVIGATION_BAR_REGION`. Docgen's
      // name-derived override (e.g. 'GLOBAL_NAVIGATION_BAR_REGION') clobbers
      // those values, so the child filter matches nothing and the bar renders
      // empty. Keeping the real displayName intact fixes that.
      setDisplayName: false,
      propFilter: (prop) => {
        // Filter out props from node_modules
        if (prop.parent) {
          return !prop.parent.fileName.includes('node_modules');
        }
        return true;
      },
    },
  }
};

export default config;
