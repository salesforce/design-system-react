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

- **SLDS 2** — Styled by the [SLDS 2](https://www.lightningdesignsystem.com/) npm package, with the Cosmos (default) and Lightning Blue themes
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
- **`Found: @salesforce-ux/design-system@…`**: 11.0.0-alpha.4 and earlier pin this peer dependency to exactly `2.25.0-alpha.2`, so a project that already has another version fails to install. Later releases accept any 2.x version from `2.25.0-alpha.2` on. On an affected version, install with `--legacy-peer-deps`. That flag also skips automatic peer installs, so add React yourself:

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
[`@salesforce-ux/design-system-2`](https://www.npmjs.com/package/@salesforce-ux/design-system-2),
which installs with this package. Cosmos is the default theme. If your bundler handles CSS
imports (Vite, webpack, and so on), import it once at your app's entry point:

```tsx
import '@salesforce-ux/design-system-2/dist/css/bundled/slds2.cosmos.css';
```

Without a bundler, serve the package's `dist/css` folder from your app and link the stylesheet:

```html
<link rel="stylesheet" href="/slds2/bundled/slds2.cosmos.css" />
```

Here `/slds2` is wherever you serve `dist/css`, e.g.
`app.use('/slds2', express.static('node_modules/@salesforce-ux/design-system-2/dist/css'))`.

> **Note:** The stylesheets (and the per-component CSS cut from them) reference a few images (avatar placeholders, Einstein
> backgrounds) through `../../public/` URLs that `@salesforce-ux/design-system-2`
> 2.264.x doesn't include. Vite warns and builds anyway; with webpack, set
> `css-loader`'s `url` option to skip those paths. Components that don't use those
> images are unaffected.

The package's `dist/css/bundled/` folder has these stylesheets:

| File                              | Theme                  |
| --------------------------------- | ---------------------- |
| `slds2.cosmos.css`                | Cosmos (default)       |
| `slds2.lightning-blue.css`        | Lightning Blue         |
| `slds2.scoped.cosmos.css`         | Cosmos, scoped         |
| `slds2.scoped.lightning-blue.css` | Lightning Blue, scoped |

### Loading less CSS

There are three ways to load SLDS 2. Pick one; each styles every component the same way.

1. **Bundled** (above, simplest): one file with the theme built in, about 970 KB.
2. **Modular, to swap themes:** the package's `dist/css/modular/slds2.base.css` plus one theme file. It's the same size, but you can switch themes by changing one file:

   ```tsx
   import '@salesforce-ux/design-system-2/dist/css/modular/slds2.base.css';
   import '@salesforce-ux/design-system-2/dist/css/modular/slds2.theme.cosmos.css';
   ```

3. **Per-component CSS (smallest, alpha):** this package publishes SLDS 2 split per component under `css/`. Each component has an entry file that imports the SLDS foundation and only the modules that component renders. Import the entry files for the components you use, then a modular theme file:

   ```tsx
   import '@salesforce/design-system-react/css/combobox.css';
   import '@salesforce/design-system-react/css/modal.css';
   import '@salesforce-ux/design-system-2/dist/css/modular/slds2.theme.cosmos.css';
   ```

   A Vite app that uses only `Combobox` ships 408 KB of minified CSS this way, compared with 894 KB for the bundled file. Modules that two entry files share are bundled once. Import the entry files, not the files under `css/components/` or `css/utilities/` directly. The modules are cut from the published `slds2.base.css` without changes, and `css/components.json` lists each entry's modules. `css/scoped/` has the same files for the scoped build: they style only markup inside an `slds-scope` element, and use the same theme files. Loading every module at once isn't a supported mode; to style everything, use the bundled or modular file.

   > **Alpha:** per-component CSS is released early to gather feedback, and it's outside the [versioning policy](docs/codebase-overview.md#versioning--support-policy) until it's declared stable. Until then, any release, including a minor after 11.0.0, may rename, merge or remove files under `css/` or change which modules an entry file imports; each change is listed in the CHANGELOG. Tell us how it works for you, including missing styles and bundle sizes, in a [GitHub Issue](https://github.com/salesforce/design-system-react/issues).

In modes 2 and 3, load the base or foundation before the theme file. That's the order SLDS's bundled files use, and it keeps the `@layer` order the base declares.

**Themes in modes 2 and 3.** The base and per-component files contain no theme. Their rules read styling hooks (`var(--slds-g-*)`), and the theme file sets every hook's value, so the same component files work with Cosmos or Lightning Blue. Pick a theme by loading `slds2.theme.cosmos.css` or `slds2.theme.lightning-blue.css`. To switch themes while the app runs, load the theme with a `<link>` and change its `href`. Keep importing the component files through your bundler, since an imported stylesheet can't easily be unloaded:

```html
<link
	id="slds-theme"
	rel="stylesheet"
	href="/slds2/modular/slds2.theme.cosmos.css"
/>
```

```ts
document.getElementById('slds-theme').href =
	'/slds2/modular/slds2.theme.lightning-blue.css';
```

Serve the theme files the way the bundled ones are served above. The theme only sets hook values, so the `<link>` can sit anywhere in `<head>`, before or after the styles your bundler injects.

### Styling hooks

Use SLDS 2 styling hooks in your own CSS or `style` props, for example `gap: var(--slds-g-spacing-4)` or `color: var(--slds-g-color-on-surface-2)`. Hooks are CSS-only: DSR doesn't export a JavaScript map of hook names, so a hook SLDS removes can't break your build. The theme files in `@salesforce-ux/design-system-2/dist/css/modular/` define the available `--slds-g-*` hooks.

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
