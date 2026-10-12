# Lightning Design System _for_ React

### Accessible, localization-friendly, presentational React components

> **📦 You are reading the docs for v11, which is in alpha.**
> v11 is a rewrite for React 19, TypeScript, and SLDS 2. Install it with the `@alpha` tag; a plain `npm install` still gives you the stable 0.10.x release.
> Using 0.10.x? See the [0.10.x README](https://github.com/salesforce/design-system-react/tree/0.10.x#readme) and the [0.10.x documentation site](https://design-system-react-site.herokuapp.com).
> The remaining v11 work is tracked in [ROADMAP.md](ROADMAP.md).

## Versions

| npm tag   | Version | Branch                                                                    | React   | Styles                                    | Docs                                                                                                                                               |
| --------- | ------- | ------------------------------------------------------------------------- | ------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@alpha`  | 11.x    | [`master`](https://github.com/salesforce/design-system-react)             | ^19.2   | SLDS 2 (`@salesforce-ux/design-system-2`) | This README, [CHANGELOG.md](CHANGELOG.md)                                                                                                          |
| `@latest` | 0.10.x  | [`0.10.x`](https://github.com/salesforce/design-system-react/tree/0.10.x) | >= 16.8 | SLDS 1 (`@salesforce-ux/design-system`)   | [0.10.x README](https://github.com/salesforce/design-system-react/tree/0.10.x#readme), [docs site](https://design-system-react-site.herokuapp.com) |

`@alpha` points to v11 pre-releases. Use `@latest` for the latest stable release. Releases and their notes are listed on the [GitHub Releases](https://github.com/salesforce/design-system-react/releases) page.

v11 is not a drop-in upgrade from 0.10.x: some components were removed or renamed. See [CHANGELOG.md](CHANGELOG.md) for the breaking changes.

## Highlights

- **SLDS 2** — Styled by the [SLDS 2](https://www.lightningdesignsystem.com/) npm package, with the Lightning Blue and Cosmos themes
- **Dark mode** — Light, dark, and system color schemes from the SLDS 2 stylesheet
- **React 19** — Function components and hooks
- **TypeScript** — Type definitions ship with the package
- **Accessible** — Built to WCAG 2.1 AA, with keyboard navigation and screen reader support

## Install

```bash
npm install @salesforce/design-system-react@alpha
```

Without the `@alpha` tag, npm installs 0.10.x. Alpha releases can include breaking changes between versions, so consider pinning the exact version you tested against.

npm 7 and later also installs the peer dependencies: `react`, `react-dom`, and `@salesforce-ux/design-system`, which provides the icons. The stylesheet package, `@salesforce-ux/design-system-2`, is a regular dependency.

### Troubleshooting `ERESOLVE` errors

- **`Found: react@18…`**: v11 requires React 19.2 or later. Upgrade React, or stay on 0.10.x.
- **`Found: @salesforce-ux/design-system@…`**: v11 pins this peer dependency to `2.25.0-alpha.2`, so a project that already has a newer version fails to install. Until the pin is loosened, install with `--legacy-peer-deps`. That flag also skips automatic peer installs, so add React yourself:

  ```bash
  npm install @salesforce/design-system-react@alpha react@^19.2.0 react-dom@^19.2.0 --legacy-peer-deps
  ```

## Requirements

- **React and React DOM**: ^19.2.0
- **Node.js**: >= 24 (declared in `engines`; npm warns on older versions)
- **A bundler that understands the `exports` field** (Vite, webpack 5, Rollup, esbuild, and so on). The package ships ES modules, CommonJS, and `.d.ts` files.

## Getting Started

Welcome to this community-supported project! This library is the [React](https://react.dev/) implementation of the [Salesforce Lightning Design System](https://www.lightningdesignsystem.com/).

- [Usage](#usage)
- [Contributing](CONTRIBUTING.md)
- [Codebase overview](docs/codebase-overview.md)

## Usage

### Package imports

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

### Individual component imports

Most components also have their own entry point:

```tsx
import Button from '@salesforce/design-system-react/components/button';
import IconSettings from '@salesforce/design-system-react/components/icon-settings';
```

> **Known issue:** In 11.0.0-alpha.4, `ColorPicker`, `Filter`, and `Tree` have no
> `components/<name>` entry point. Import them from `@salesforce/design-system-react`.

## Styling

The components render SLDS markup but don't ship CSS. Add an SLDS 2 stylesheet from
[`@salesforce-ux/design-system-2`](https://www.npmjs.com/package/@salesforce-ux/design-system-2)
to your page. Lightning Blue is the SLDS 2 default theme:

```html
<link
	rel="stylesheet"
	href="/node_modules/@salesforce-ux/design-system-2/dist/css/bundled/slds2.lightning-blue.css"
/>
```

The package's `dist/css/bundled/` folder has these stylesheets:

| File                              | Theme                    |
| --------------------------------- | ------------------------ |
| `slds2.lightning-blue.css`        | Lightning Blue (default) |
| `slds2.cosmos.css`                | Cosmos                   |
| `slds2.scoped.lightning-blue.css` | Lightning Blue, scoped   |
| `slds2.scoped.cosmos.css`         | Cosmos, scoped           |

Storybook loads the stylesheet the same way; see `.storybook/preview-head.html`.

### Dark mode

To choose a color scheme, put an `slds-color-scheme--*` class on `<body>`:

```html
<body class="slds-color-scheme--system">
	...
</body>
```

| Class                       | Color scheme                                      |
| --------------------------- | ------------------------------------------------- |
| `slds-color-scheme--system` | Follows the operating system's light/dark setting |
| `slds-color-scheme--light`  | Always light                                      |
| `slds-color-scheme--dark`   | Always dark                                       |

The SLDS 2 stylesheet switches its color tokens based on that class, so the components follow it without any extra props. The Storybook theme toolbar works the same way; see `.storybook/preview-decorator.js`.

### Icons

Icons load from external SVG sprite files. Set the sprite folder with `<IconSettings>`:

```tsx
import ReactDOM from 'react-dom/client';
import IconSettings from '@salesforce/design-system-react/components/icon-settings';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<IconSettings iconPath="/assets/icons">
		<App />
	</IconSettings>
);
```

The sprites ship in `@salesforce-ux/design-system`. Serve that folder from your app:

```javascript
// Express.js example
app.use(
	'/assets/icons',
	express.static('node_modules/@salesforce-ux/design-system/assets/icons/')
);
```

## Development

### Prerequisites

- Node.js 24 (the repo's `.nvmrc` pins the exact version)
- npm 10 or later

### Setup

```bash
git clone git@github.com:salesforce/design-system-react.git
cd design-system-react
nvm use
npm install
npx playwright install chromium   # for the real-browser test project
```

### Commands

| Command             | Description                                              |
| ------------------- | -------------------------------------------------------- |
| `npm run storybook` | Start Storybook at http://localhost:6007                 |
| `npm test -- --run` | Run all tests once (a bare `npm test` starts watch mode) |
| `npm run lint`      | Lint all files                                           |
| `npm run typecheck` | TypeScript type checking                                 |
| `npm run build`     | Build the library                                        |
| `npm run test:ci`   | Run what CI runs: typecheck, tests, build, and lint      |

[CONTRIBUTING.md](CONTRIBUTING.md) covers the full workflow, and [AGENTS.md](AGENTS.md) lists the commands and pitfalls in one place.

### Tech Stack

- **Build**: [Vite](https://vite.dev/)
- **Testing**: [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/react), with a Playwright-driven browser project
- **Documentation**: [Storybook 10](https://storybook.js.org/)
- **Language**: TypeScript (strict mode)

## Accessibility

Components are built to WCAG 2.1 AA:

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
- **Bugs**: Create a [GitHub Issue](https://github.com/salesforce/design-system-react/issues). Please include the package version and whether you're on `@alpha` or `@latest`.

## License

- Source code: [BSD 3-Clause](https://git.io/sfdc-license)
- Icons and images: [Creative Commons Attribution-NoDerivatives 4.0](https://github.com/salesforce/licenses/blob/master/LICENSE-icons-images.txt)
- Salesforce Sans font: [Font License](https://github.com/salesforce/licenses/blob/master/LICENSE-font.txt)
