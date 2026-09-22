# Codebase Overview

This document provides an overview of the library's organization, conventions, and implementation patterns.

## Table of Contents

- [Project Structure](#project-structure)
- [Component Architecture](#component-architecture)
- [Props Conventions](#props-conventions)
- [TypeScript Patterns](#typescript-patterns)
- [SLDS Alignment](#slds-alignment)
- [Testing](#testing)
- [Accessibility](#accessibility)
- [Best Practices](#best-practices)
- [Contributing](#contributing)

---

## Project Structure

```
design-system-react/
├── components/           # React components
│   └── [component]/
│       ├── index.tsx           # Public export
│       ├── [component].tsx     # Main implementation
│       ├── types.ts            # TypeScript interfaces
│       ├── private/            # Internal sub-components
│       └── __docs__/
│           └── Component.stories.tsx
├── utilities/            # Shared utilities (not public API)
│   ├── hooks/            # Custom React hooks
│   └── constants.ts      # Component display names
├── types/                # Shared TypeScript types
├── .storybook/           # Storybook configuration
└── docs/                 # Documentation
```

### Component Folder Structure

Each component follows this structure:

| File                     | Purpose                                            |
| ------------------------ | -------------------------------------------------- |
| `index.tsx`              | Public export, typically re-exports main component |
| `[component].tsx`        | Main component implementation                      |
| `types.ts`               | TypeScript interfaces for props                    |
| `private/`               | Sub-components not part of public API              |
| `__docs__/*.stories.tsx` | Storybook stories                                  |

Components not in a `private` folder are considered public API and fall within the scope of semantic versioning for breaking changes.

### Other Top-Level Directories

- `scripts/` - Build and release tooling
- `styles/` - Supplemental styles; use sparingly, prefer SLDS classes (see [SLDS Alignment](#slds-alignment))
- `utilities/` - Shared, non-component helpers (DOM/event helpers, ID generation, dev-only prop warnings — see [Deprecation Warnings](#deprecation-warnings))

---

## Component Architecture

### Presentational Components

Components in this library are **presentational** - they receive data via props and emit events via callbacks. Think of them as templates with event handling.

**Core principles:**

1. **Stateless by default**: Prefer controlled components where parent manages state
2. **Props in, events out**: Data flows down, events bubble up
3. **No side effects**: Components should be pure functions of their props

### Functional Components with Hooks

All new components should be functional components using React hooks:

```tsx
import React, { useState, useCallback, forwardRef } from 'react';
import type { MyComponentProps } from './types';

const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(
	({ label, onClick, className, ...rest }, ref) => {
		const [isActive, setIsActive] = useState(false);

		const handleClick = useCallback(
			(event: React.MouseEvent<HTMLButtonElement>) => {
				setIsActive(true);
				onClick?.(event, { isActive: true });
			},
			[onClick]
		);

		return (
			<div ref={ref} className={className} {...rest}>
				<button onClick={handleClick}>{label}</button>
			</div>
		);
	}
);

MyComponent.displayName = 'MyComponent';

export default MyComponent;
```

### Key Patterns

- Use `forwardRef` for ref forwarding
- Always set `displayName` for debugging
- Use `useCallback` for event handlers passed to children
- Spread remaining props onto the root element

### State & Coupling Principles

- **Limit component state.** If the parent application's state can handle it via a prop, don't introduce local state. New components should start out controlled and only add internal (uncontrolled) state if a real use case requires it.
- **One stateful component, many stateless sub-components.** Prefer a single top-level component that owns state, with child components driven purely by props (e.g. a `Tree` holds state, a `TreeNode` does not; frequently reused primitives like badges, pills, and icons generally shouldn't have state).
- **Group related form elements together.** Variants of the same underlying element (e.g. checkbox styles) belong in one component rather than duplicated across components, so fixes in one visual variant carry over to the others.
- **Favor loose coupling and weak connascence.** A contributor should be able to understand and change one piece of code without having to understand another. Prefer named-key objects over positional parameters (Connascence of Position) to keep coupling weak and refactor-safe.
- **Use a single return per function** rather than short-circuiting with multiple return statements.
- **Prefer functions over imperative loops** (e.g. `cats.filter(isKitten).map(getName)`) to avoid mutating variables outside functional scope.
- **Avoid variable mutation.** Don't use bare `push`, `pop`, `shift`, `splice`, `sort`, `reverse`, or `delete` on arrays/objects that are passed by reference — use the spread operator or `Array.concat()` instead. Unexpected mutation is a common cause of components not re-rendering with new props.
- **No DOM node queries.** Don't reach into the library's rendered output with `querySelectorAll()` from application tests. If a DOM node needs to be testable, surface it via a `ref` — once surfaced, that ref becomes part of the public API.
- **Limit production dependencies.** Adding a new external dependency to `dependencies` requires discussion — always weigh the total cost of ownership.
- **Don't seed state from props.** Initializing `useState(props.x)` couples the initial render to a prop value that may change later without the component reacting to it; treat this as an anti-pattern the same way `getInitialState` from props was in the class-component era.

---

## Props Conventions

### Naming Conventions

| Pattern               | Use Case                   | Example                           |
| --------------------- | -------------------------- | --------------------------------- |
| `is*`, `has*`, `can*` | Boolean props              | `isOpen`, `hasError`, `canEdit`   |
| `on*`                 | Event callbacks            | `onClick`, `onChange`, `onClose`  |
| `onRequest*`          | Pre-state-change callbacks | `onRequestClose`, `onRequestOpen` |
| `*Ref`                | Ref callbacks              | `inputRef`, `buttonRef`           |
| `className*`          | Additional class names     | `className`, `classNameContainer` |

### Callback Conventions

Event callbacks should follow this signature:

```tsx
// Pattern: (event, data) => void
onChange?: (
  event: React.ChangeEvent<HTMLInputElement>,
  data: { value: string }
) => void;
```

**Guidelines:**

- First parameter: the event (or `undefined` if no event)
- Second parameter: object with named data properties
- Never use return values to communicate back to the component

### Pre-state vs Post-event Callbacks

| Prefix       | Timing              | Example                                           |
| ------------ | ------------------- | ------------------------------------------------- |
| `onRequest*` | Before state change | `onRequestClose` - requests close, parent decides |
| `on*`        | After event         | `onClose` - fires after component closed          |

### Assistive Text and Labels

Group text props in objects for internationalization:

```tsx
interface Props {
	assistiveText?: {
		closeButton?: string;
		icon?: string;
	};
	labels?: {
		heading?: string;
		cancel?: string;
		save?: string;
	};
}
```

Don't concatenate strings within a component to build visible text — that assumes you know every language's word order. Pass full strings in via props; only non-visible, programmatic keys may be concatenated. If text mixes data and words, use a before/after key or a callback that returns the composed value. Visible text props should generally accept `ReactNode` (not just `string`) so consumers can pass italics, bold, or tooltips.

### Required Props

Use non-optional (required) properties in your `types.ts` interface whenever a prop has no sensible default. This is the TypeScript equivalent of the old `PropTypes.isRequired` convention: it keeps a component's API explicit, minimizes internal conditionals, and pushes complexity to the caller rather than hiding it in fallback logic.

### Boolean Props & Defaults

- Never default a boolean prop to `true`. HTML attributes like `checked` default to a truthy presence, but JSX should not force consumers to write `propName={false}`; prefer the inverse wording instead (`isInline` rather than `isModal`, defaulting to `false`).
- Adding a _default_ value to an existing prop is a breaking change if it visibly changes existing output. Defaults are safe for brand-new props or props that don't affect current markup.

### DOM Node & Ref Conventions

- The `className` prop should land on a single, consistent node: the one carrying the root `.slds-[COMPONENT]` class — never on a wrapping container or a child of it. Any other node's classes should use a suffixed prop, e.g. `classNameMenu`, `classNameContainer`.
- Limit `ref` usage to tasks like measuring or focusing a DOM node — not as a general escape hatch.
- No global `window`/`document` access without checking for existence first; their presence isn't guaranteed (e.g. SSR).
- Don't attach listeners directly to `window` inside a component. If a component needs to respond to viewport changes, let the consuming application listen and drive it via props.
- When a component needs to expose multiple internal DOM nodes to a parent, use a `refs` object with semantic keys (`refs={{ triggerButton: (el) => {...} }}`) rather than overloading the reserved `ref` prop. This pattern is still used in components like `Accordion`.

### Callback Details

- Event callbacks should never communicate back to the component via a return value — use `event.preventDefault()` or explicit data-object keys instead.
- Public callback props should be checked for existence before being invoked (`props.onClick?.(...)`). Use required props internally for callbacks a private child component can't function without.
- Render props — callbacks that determine what gets rendered instead of responding to an event — should use an `onRender` prefix, e.g. `onRenderItem`.
- All DOM `id` attributes should be unique to the page. A top-level component's `id` prop should be generated by default (this codebase uses `nanoid` via `utilities/generate-id`) but remain overridable by the consumer, which keeps DOM snapshots deterministic. Sub-component IDs should be derived from the parent's `id`, e.g. `` `tab-panel-${componentId}-${panelId}` ``.

### Component Composition Over Prop Drilling

Prefer accepting a pre-configured child component instance over adding new props that just alias an existing component's API — e.g. `<DataTableRowActions dropdown={<Dropdown options={...} />} />` rather than inventing `dropdownOptions` on the parent. The parent shallow-merges its own props into the passed component, with the caller's props taking precedence. This keeps each piece separately documented and avoids duplicate PropType/interface surface area, at the cost of being easier to misuse — use with caution, since overriding internal logic this way can break a component.

### Deprecation Warnings

When sunsetting or renaming a prop, keep the old prop working and emit a development-only console warning rather than removing it outright. This codebase's `utilities/warning/*` helpers (`deprecated-property`, `sunset-property`, `only-one-of-properties`, `if-one-then-both-required-property`, `has-children-without-display-name-of`) exist for exactly this — wire new deprecations through them (guarded by `process.env.NODE_ENV !== 'production'`) instead of inventing ad hoc warnings per component.

Breaking changes to props, or a new SLDS version that changes markup in a breaking way, require a major version release — this library treats backward compatibility seriously and denies breaking changes except in rare, well-considered cases. Note that SLDS markup/class updates within the current design system release cycle are _not_ considered breaking, even though they may break consumers' markup-based test queries.

---

## TypeScript Patterns

### Props Interface

Define props in a separate `types.ts` file:

```tsx
// types.ts
import type { ReactNode, HTMLAttributes } from 'react';

export interface MyComponentProps extends Omit<
	HTMLAttributes<HTMLDivElement>,
	'onChange'
> {
	/** The component label */
	label: string;
	/** Optional icon to display */
	icon?: ReactNode;
	/** Whether the component is disabled */
	isDisabled?: boolean;
	/** Callback when value changes */
	onChange?: (
		event: React.ChangeEvent<HTMLInputElement>,
		data: { value: string }
	) => void;
}
```

### Extending HTML Attributes

Extend from appropriate HTML element attributes:

```tsx
// For button-like components
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

// For input-like components
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

// For div containers
interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}
```

### Generic Components

For components with generic data:

```tsx
interface DataTableProps<T extends { id: string }> {
	items: T[];
	onSelect?: (event: React.MouseEvent, data: { item: T }) => void;
}

function DataTable<T extends { id: string }>({
	items,
	onSelect,
}: DataTableProps<T>) {
	// ...
}
```

---

## SLDS Alignment

### Only Propose SLDS-Approved Components

This library should include only components that have an approved pattern in [Salesforce's Lightning Design System](https://www.lightningdesignsystem.com/). If a designer's use case conforms to an existing SLDS pattern, it should be implementable with this library. The library does not need to mirror Salesforce production exactly, but is open to customization that supports production patterns as long as they remain generic and flexible. If you're a Salesforce employee and need a component that doesn't exist in SLDS, please follow up with the Design Systems team rather than adding a bespoke, non-SLDS component.

### Converting SLDS Markup to React

- Use `variant` for structural/markup changes that are mutually exclusive (what SLDS usually calls a variant or modifier). Never let the mere presence of an event callback imply a markup change beyond the event itself — e.g. adding `onClick` shouldn't turn a `span` into an `a`.
- Use `theme` for a single mutually-exclusive `className` swap — typically an SLDS state or theme (`warning`, `error`, `offline`, `success`).
- Modifiers/states that _can_ coexist should be separate boolean props, so any combination is possible.
- Controlled/uncontrolled props like `isOpen` on dialogs and menus should be settable by the parent.
- SLDS hides certain elements purely with CSS (menus, dialogs, tab/accordion panels) — don't render them into the DOM when hidden.
- If a component is used incorrectly (e.g. a required `id` is missing from option items), prefer erroring via a `checkProps`-style warning over silently falling back (e.g. to an array index).
- ESLint may flag SLDS markup as suspicious. Ask the SLDS team or core maintainers before changing markup — it's often intentional — and disable the specific rule inline (`eslint-disable-line`) rather than removing the check globally.
- All filenames use kebab-case (`this-is-the-file`); convert spaces and camelCase to hyphens.

### Avoid Inline Styles and Non-SLDS Classes

Prefer existing SLDS CSS over inline styles or bespoke classes. If SLDS is missing something you need, file a bug against the [SLDS repository](https://github.com/salesforce-ux/design-system) (or the internal bug system) rather than working around it locally — some rare or temporary exceptions are approved case by case. When inline styles are unavoidable, use the design tokens shipped in this library (see [`utilities/design-tokens`](https://github.com/salesforce/design-system-react/blob/master/utilities/design-tokens/README.md)) rather than hardcoded values.

---

## Testing

### Test Framework

This project uses:

- [Vitest](https://vitest.dev/) - Test runner
- [React Testing Library](https://testing-library.com/react) - DOM testing
- [@testing-library/user-event](https://testing-library.com/docs/user-event/intro) - User interaction simulation

### Writing Tests

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Button from '../';

describe('Button', () => {
	it('renders with label', () => {
		render(<Button label="Click me" />);
		expect(
			screen.getByRole('button', { name: 'Click me' })
		).toBeInTheDocument();
	});

	it('calls onClick with event data', async () => {
		const onClick = vi.fn();
		render(<Button label="Test" onClick={onClick} />);

		await userEvent.click(screen.getByRole('button'));

		expect(onClick).toHaveBeenCalledWith(
			expect.any(Object), // event
			expect.objectContaining({/* data */})
		);
	});

	it('is disabled when isDisabled is true', () => {
		render(<Button label="Test" isDisabled />);
		expect(screen.getByRole('button')).toBeDisabled();
	});
});
```

### What to Test

- All props render correctly
- Event callbacks fire with correct data
- Keyboard interactions work
- ARIA attributes are present
- Focus management is correct

A breaking change should always cause at least one test to fail — if it wouldn't, add a test for it.

### Coverage Expectations

Aim for 90%+ test coverage per component, checked via the coverage summary from `npm test -- --coverage`. High coverage doesn't guarantee correct logic, but low coverage is a reliable signal of insufficient testing. Components should also be able to render without a DOM available — guard any `document`/`window` access accordingly.

### Running Tests

```bash
npm test                    # Run all tests
npm run test:ui             # Run with Vitest UI
npm test -- --coverage      # Run with coverage
```

---

## Accessibility

### Requirements

All components must be:

- Keyboard navigable
- Screen reader compatible
- WCAG 2.2 AA compliant

### ARIA Guidelines

- Use semantic HTML elements when possible
- Add ARIA attributes only when needed
- Test with screen readers (NVDA, VoiceOver)

### Focus Management

```tsx
// Use refs for programmatic focus
const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
	if (isOpen) {
		inputRef.current?.focus();
	}
}, [isOpen]);
```

### Keyboard Navigation

Implement standard keyboard patterns:

- `Enter`/`Space` - Activate buttons
- `Escape` - Close dialogs
- `Arrow keys` - Navigate menus
- `Tab` - Move between focusable elements

### Non-Accessible Contributions

Contributions that don't yet follow an approved accessible UX pattern are permitted but discouraged, and should be labeled `"prototype"` status (see each component's `component.json`) rather than `"prod"` — file a follow-up issue to close the accessibility gap.

### Resources

- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WAI-ARIA](https://www.w3.org/TR/wai-aria-1.2/)
- [ARIA in HTML](https://www.w3.org/TR/html-aria/) - reference for "should I put ARIA on this?"
- [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/) - SLDS and this library target AA compliance

---

## Best Practices

### Do

- Keep components focused on one responsibility
- Use SLDS CSS classes (no custom inline styles)
- Make components work without JavaScript for SSR
- Document all props with JSDoc comments
- Handle edge cases gracefully
- Review similar existing components before proposing a new pattern — familiarize yourself with conventions already used elsewhere in the library
- Name internal (non-prop) event handlers with a `handle` prefix followed by the event, present-tense (`handleClick`, `handleNameChange`) — if you need to disambiguate two handlers for the same event, consider whether that's a sign you should split the component
- When rendering conditionally, prefer in this order: inline ternary, then `&&`, then an enum/lookup object, then a dedicated sub-component — each step trades conciseness for readability as the condition gets more complex

### Don't

- Mutate props or state directly
- Use `findDOMNode` (deprecated in React 18+)
- Add external dependencies without discussion
- Create components not in SLDS
- Use global DOM queries
- Short-circuit a function with multiple `return` statements — use a single return
- Spread unknown/rest props (`{...rest}`) onto a DOM node and then keep referencing the original destructured object elsewhere in the same render — once you've pulled named props out, use those variables consistently rather than reaching back into `props`

### File Size

Keep files under 500 lines. Split large components into sub-components.

### CSS

- Use SLDS utility classes
- Use [classnames](https://github.com/JedWatson/classnames) for conditional classes
- Avoid inline styles - use CSS custom properties if needed

```tsx
import classNames from 'classnames';

const buttonClass = classNames('slds-button', {
	'slds-button_brand': variant === 'brand',
	'slds-button_destructive': variant === 'destructive',
});
```

---

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for detailed contribution guidelines.
