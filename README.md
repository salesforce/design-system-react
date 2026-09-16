# Lightning Design System _for_ React

### Accessible, localization-friendly, presentational React components

> **🚧 Modernization in Progress** — This library is being updated to React 19, TypeScript, and modern tooling. Most components are ready, but some features are still being completed. See [ROADMAP.md](ROADMAP.md) for details.

**Now with SLDS 2 and Dark Mode support!**

## Highlights

- **SLDS 2 Compatible** — Works with the latest Salesforce Lightning Design System
- **Dark Mode** — Built-in dark mode support with `prefers-color-scheme` detection
- **React 19** — Modern React with functional components and hooks
- **TypeScript** — Full type definitions for improved developer experience
- **Accessible** — WCAG 2.1 AA compliant with keyboard navigation and screen reader support

## Install

```bash
npm install @salesforce/design-system-react
```

> **Note:** SLDS 2 styles are currently bundled with this package. When the official SLDS 2 npm package is released, you'll install it separately.

## Requirements

- **Node.js**: >= 20.19.0 (or >= 22.12.0)
- **React**: 19.x

## Getting Started

Welcome to this community-supported project! This library is the [React](https://react.dev/) implementation of the [Salesforce Lightning Design System](https://www.lightningdesignsystem.com/).

- [Usage](#usage)
- [Contributing](CONTRIBUTING.md)
- [Codebase overview](docs/codebase-overview.md)

## Usage

### ES Modules (Recommended)

```tsx
import { Button, IconSettings } from '@salesforce/design-system-react';

function App() {
  return (
    <IconSettings iconPath="/assets/icons">
      <Button label="Hello Button" />
    </IconSettings>
  );
}
```

### Individual Component Imports

For tree-shaking and smaller bundles:

```tsx
import Button from '@salesforce/design-system-react/components/button';
import IconSettings from '@salesforce/design-system-react/components/icon-settings';
```

## Styling

Add the SLDS 2 stylesheet to your page from the official
[`@salesforce-ux/design-system-2`](https://www.npmjs.com/package/@salesforce-ux/design-system-2)
package. The bundled Lightning Blue theme is the SLDS 2 default (Cosmos is the alternate):

```html
<link
  rel="stylesheet"
  href="/node_modules/@salesforce-ux/design-system-2/dist/css/bundled/slds2.lightning-blue.css"
/>
```

> **Note:** This replaces the previously bundled `slds-plus.css` stopgap. Styling now
> comes from the published SLDS 2 npm package. Storybook is wired up the same way — see
> `.storybook/preview-head.html`.

<details>
<summary>Using SLDS 1 instead?</summary>

If you need SLDS 1 compatibility, use the original design system package:

```html
<link 
  rel="stylesheet" 
  href="/node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css" 
/>
```

</details>

### Dark Mode

Dark mode is supported out of the box. Components automatically respond to SLDS dark mode styling when you apply the appropriate theme class:

```html
<!-- Light mode (default) -->
<div class="slds-scope">...</div>

<!-- Dark mode -->
<div class="slds-scope slds-theme_dark">...</div>
```

Components also respect the user's system preference via `prefers-color-scheme` when configured with the SLDS theme tokens.

### Icons

Icons are loaded from external SVG sprite files. Set the path with `<IconSettings>`:

```tsx
import IconSettings from '@salesforce/design-system-react/components/icon-settings';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <IconSettings iconPath="/assets/icons">
    <App />
  </IconSettings>
);
```

Serve the icons from your public folder:

```javascript
// Express.js example
app.use('/assets/icons', express.static('node_modules/@salesforce-ux/design-system/assets/icons/'));
```

## Development

### Prerequisites

- Node.js >= 20.19.0
- npm >= 10.x

### Setup

```bash
git clone git@github.com:salesforce/design-system-react.git
cd design-system-react
npm install
```

### Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run storybook` | Start Storybook at http://localhost:6007 |
| `npm run test` | Run tests with Vitest |
| `npm run test:ui` | Run tests with Vitest UI |
| `npm run lint` | Lint all files |
| `npm run typecheck` | TypeScript type checking |
| `npm run build` | Build the library |

### Tech Stack

- **Build**: [Vite](https://vitejs.dev/)
- **Testing**: [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/react)
- **Documentation**: [Storybook 10](https://storybook.js.org/)
- **Language**: TypeScript (progressive migration)

## Accessibility

This library follows WCAG 2.1 guidelines and is tested for accessibility.

- Automated testing with axe-core
- Keyboard navigation support
- Screen reader compatibility (JAWS, NVDA, VoiceOver)
- ARIA attributes and roles

## Security

Please report any security issues to [security@salesforce.com](mailto:security@salesforce.com).

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting pull requests.

## Got Feedback?

- **Questions**: Post on [StackOverflow](https://stackoverflow.com/questions/tagged/design-system-react) with the `design-system-react` tag
- **Bugs**: Create a [GitHub Issue](https://github.com/salesforce/design-system-react/issues)

## License

- Source code: [BSD 3-Clause](https://git.io/sfdc-license)
- Icons and images: [Creative Commons Attribution-NoDerivatives 4.0](https://github.com/salesforce/licenses/blob/master/LICENSE-icons-images.txt)
- Salesforce Sans font: [Font License](https://github.com/salesforce/licenses/blob/master/LICENSE-font.txt)
