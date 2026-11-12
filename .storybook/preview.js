// Tell React 19 this is not a testing environment
// This prevents false warnings about act() from state updates in Storybook
globalThis.IS_REACT_ACT_ENVIRONMENT = false;

// Configure Modal to use #storybook-root for accessibility
// This silences the "App element is not defined" warning
import Settings from '../components/settings';
import { themeDecorator } from './preview-decorator';
import { DEFAULT_THEME } from './themes';

// Set after DOM is ready
if (typeof document !== 'undefined') {
  // Use requestAnimationFrame to ensure #storybook-root exists
  requestAnimationFrame(() => {
    const root = document.getElementById('storybook-root') || document.body;
    Settings.setAppElement(root);
  });
}

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  // Applies the SLDS 2 theme + color scheme to the preview canvas.
  decorators: [themeDecorator],
  // Toolbar globals, modeled on the upstream SLDS 2 Storybook.
  globalTypes: {
    themeName: {
      description: 'SLDS 2 design token theme',
      defaultValue: DEFAULT_THEME,
      toolbar: {
        title: 'Theme',
        icon: 'photo',
        items: [
          { value: 'lightning-blue', title: 'Lightning Blue' },
          { value: 'cosmos', title: 'Cosmos (SLDS2)' },
          { value: 'pearl', title: 'Pearl (Alpha)' },
        ],
        dynamicTitle: true,
      },
    },
    theme: {
      description: 'Color scheme for the theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Color Scheme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
          { value: 'system', icon: 'contrast', title: 'System' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    // Accessibility addon configuration (axe rulesets, modeled on SLDS 2).
    a11y: {
      context: '#storybook-root',
      options: {
        runOnly: [
          'wcag2a',
          'wcag2aa',
          'wcag21a',
          'wcag21aa',
          'wcag22aa',
          'best-practice',
        ],
      },
    },
    // Controls addon configuration
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Documentation configuration
    docs: {
      toc: true,
    },
  },
  tags: ['autodocs'],
};

export default preview;
