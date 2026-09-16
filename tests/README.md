# Testing

Thank you for helping us make this library more robust and stable.

- Tests reduce bugs in new and existing features
- Tests are good documentation
- Tests reduce the cost of change and refactoring
- Tests improve code design

## Stack

Testing uses **[Vitest](https://vitest.dev/)** + **[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)**
running under **[jsdom](https://github.com/jsdom/jsdom)**. Storybook is used for manual
visual inspection.

- **Vitest** — test runner and assertion library (`describe` / `it` / `expect`, `vi` for mocks)
- **React Testing Library** — render components and query the DOM the way a user would
- **@testing-library/jest-dom** — DOM matchers (`toBeInTheDocument`, `toHaveClass`, …)
- **@testing-library/user-event** — realistic user interaction simulation

> The previous Karma / Mocha / Chai / Enzyme / Storyshots pipeline has been removed. All
> suites were migrated to Vitest + RTL — see
> `docs/superpowers/specs/enzyme-to-rtl-migration-guide.md` for the translation reference.

## Running tests

- `npm test` — run the full suite in watch mode
- `npx vitest run` — run the full suite once (CI mode)
- `npx vitest run components/button` — run a single component's suite
- `npm run test:ui` — open the Vitest UI
- `npm run test:coverage` — run with a V8 coverage report

## Where tests live

Each component keeps its tests in `components/<name>/__tests__/<name>.test.jsx`. Only files
matching `components/**/__tests__/*.{test,spec}.{ts,tsx,js,jsx}` are collected (see
`vitest.config.ts`). Global setup (jsdom polyfills for `matchMedia`, `ResizeObserver`,
`IntersectionObserver`, `scrollIntoView`, `getBoundingClientRect`, and RTL auto-cleanup)
lives in `vitest.setup.ts`.

## Sample test file

```jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import Tree from '../';
import IconSettings from '../../icon-settings';

describe('SLDSTree', () => {
	it('calls the item click handler', () => {
		const onClick = vi.fn();
		const { container } = render(
			<IconSettings iconPath="/assets/icons">
				<Tree id="example-tree" onClick={onClick} nodes={/* … */ []} />
			</IconSettings>
		);

		fireEvent.click(container.querySelector('.slds-tree__item'));
		expect(onClick).toHaveBeenCalledTimes(1);
	});
});
```

## Test requirements

Pull requests should cover, for every non-`private` component:

- Rendered DOM/markup, CSS classes, and styles for each SLDS state and variant
- All props (including that `children` render)
- Correct arguments for every event callback
- Mouse and keyboard interactions specified on the
  [SLDS site](https://www.lightningdesignsystem.com/), including focus management where applicable
- Accessibility features (ARIA roles, assistive text)

Prefer querying by role/text/label (accessible queries) over class selectors where practical.
Wrap components that render icons in `<IconSettings iconPath="/assets/icons">`. For overlays
(popover, tooltip, dialog, combobox), use `userEvent` + `waitFor` to open and assert.

### jsdom limitations

jsdom does not implement real layout, scrolling, focus traversal, or canvas. Where a test
depends on those, assert what IS observable (classes, attributes, ARIA, presence) and add a
`// NOTE:` comment, or `it.skip(...)` with a clear reason. Known pre-existing bugs surfaced by
the migration are tracked in `docs/superpowers/specs/migration-discovered-bugs.md`.

## Linting

- `npm run lint` — check style and quality
- `npm run lint:fix` — auto-fix style issues (Prettier) and quality issues (ESLint)
