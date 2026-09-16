# Enzyme → Vitest + RTL Migration Guide

Reference for migrating `*.browser-test.jsx` (Enzyme/Mocha/chai/sinon) test suites to
`*.test.jsx` (Vitest + React Testing Library). Follow this exactly.

## The rules

1. **New file name:** create `<name>.test.jsx` next to the old file in the same
   `__tests__/` dir. The Vitest glob only collects `__tests__/*.{test,spec}.{ts,tsx,js,jsx}`.
   A file named `.browser-test.jsx` is NOT collected — that is why the old suites never ran.
2. **Delete the old `.browser-test.jsx`** after the new one passes.
3. **Preserve intent, not mechanics.** Keep every assertion's *purpose*. Re-express it with
   RTL queries. Do not silently drop coverage. If a test cannot be expressed in jsdom
   (e.g. real layout/pixel positioning), keep it but assert what IS observable (classes,
   attributes, ARIA, presence), and add a `// NOTE:` comment explaining what was adapted.
4. **Every migrated suite must pass** `npx vitest run components/<name>` before you delete
   the old file. Report the pass/fail counts.

## Imports — the new header

```jsx
import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import Thing from '../';           // or '../index', match the old import
import IconSettings from '../../icon-settings';
```

Most components must be wrapped in `<IconSettings iconPath="/assets/icons">...</IconSettings>`
if the original test did so (icons resolve through context).

## Translation table

| Enzyme / Mocha / chai / sinon            | Vitest + RTL                                              |
|------------------------------------------|-----------------------------------------------------------|
| `mount(<C/>)` / `mountComponent(...)`    | `const { container } = render(<C/>)`                      |
| `shallow(<C/>)`                          | `render(<C/>)` (RTL has no shallow — render fully)        |
| `wrapper.find('.foo')`                   | `container.querySelector('.foo')` or `screen.getBy*`      |
| `wrapper.find('button')`                 | `screen.getByRole('button')` / `container.querySelector`  |
| `wrapper.find(...).at(0)`                | `container.querySelectorAll(...)[0]`                      |
| `.simulate('click', {})`                 | `fireEvent.click(el)` or `await userEvent.click(el)`      |
| `.simulate('change', {target:{value}})` | `fireEvent.change(el, { target: { value } })`             |
| `.simulate('focus'/'blur'/'keydown')`   | `fireEvent.focus/blur/keyDown(el, {...})`                 |
| `.prop('style').backgroundColor`         | `expect(el).toHaveStyle({ backgroundColor: ... })`        |
| `.prop('id')` / attribute checks         | `expect(el).toHaveAttribute('id', ...)`                   |
| `.hasClass('x')` / `to.have.className`   | `expect(el).toHaveClass('x')`                             |
| `.text()`                                | `el.textContent` / `screen.getByText(...)`                |
| `expect(x).to.equal(y)`                  | `expect(x).toBe(y)`                                       |
| `expect(x).to.be.true`                   | `expect(x).toBe(true)`                                    |
| `expect(x).to.exist` / `to.not.be.null`  | `expect(x).toBeInTheDocument()` (for DOM nodes)           |
| `expect(arr).to.have.length(n)`          | `expect(arr).toHaveLength(n)`                             |
| `sinon.spy()` / `sinon.stub()`           | `vi.fn()`                                                 |
| `spy.calledOnce` (`.to.be.true`)         | `expect(spy).toHaveBeenCalledTimes(1)`                    |
| `spy.calledWith(...)`                    | `expect(spy).toHaveBeenCalledWith(...)`                   |
| `this.wrapper` (Mocha context)           | local `const { container } = render(...)` per test        |
| `beforeEach(mountComponent(...))`        | render inside each `it(...)`, or a local helper           |
| stateful `this.wrapper.state('x')`       | assert observable DOM instead (RTL has no state access)   |

## Stateful test pattern

Where the old test asserted component state (`.state('isOpen')`), you cannot read React
state via RTL. Instead wrap in a small demo component that reflects state into the DOM
(as the original demo components often already did), and assert on the rendered result —
e.g. the alert disappears from the document after clicking close. See
`components/alert/__tests__/alert.test.jsx` for the worked example.

## Async / overlays

Popovers, tooltips, dropdowns, comboboxes, dialogs open on interaction. Use:
```jsx
await userEvent.click(trigger);
await waitFor(() => expect(screen.getByRole('menu')).toBeInTheDocument());
```
`vitest.setup.ts` already polyfills `matchMedia`, `ResizeObserver`, `IntersectionObserver`,
`scrollIntoView`, and `getBoundingClientRect`, so overlay code won't crash in jsdom.

## Worked examples already in the repo (read these)

- `components/button/__tests__/button.test.jsx` — props, roles, icons, click
- `components/spinner/__tests__/spinner.test.jsx` — pure class-name rendering
- `components/alert/__tests__/alert.test.jsx` — interaction + stateful-via-DOM + styles

## `tests/enzyme-helpers` does not exist

Many old suites import `../../../tests/enzyme-helpers` (`mountComponent`, `unmountComponent`).
That file is absent — another reason these suites never ran. Replace those helpers with plain
`render(...)` per test; drop `unmountComponent` (RTL auto-cleans via `afterEach(cleanup)` in setup).
