# Codebase Overview

This document provides an overview of the library's organization, conventions, and implementation patterns.

## Table of Contents

- [Project Structure](#project-structure)
- [Component Architecture](#component-architecture)
- [Props Conventions](#props-conventions)
- [TypeScript Patterns](#typescript-patterns)
- [Testing](#testing)
- [Accessibility](#accessibility)

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

| File | Purpose |
|------|---------|
| `index.tsx` | Public export, typically re-exports main component |
| `[component].tsx` | Main component implementation |
| `types.ts` | TypeScript interfaces for props |
| `private/` | Sub-components not part of public API |
| `__docs__/*.stories.tsx` | Storybook stories |

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

---

## Props Conventions

### Naming Conventions

| Pattern | Use Case | Example |
|---------|----------|---------|
| `is*`, `has*`, `can*` | Boolean props | `isOpen`, `hasError`, `canEdit` |
| `on*` | Event callbacks | `onClick`, `onChange`, `onClose` |
| `onRequest*` | Pre-state-change callbacks | `onRequestClose`, `onRequestOpen` |
| `*Ref` | Ref callbacks | `inputRef`, `buttonRef` |
| `className*` | Additional class names | `className`, `classNameContainer` |

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

| Prefix | Timing | Example |
|--------|--------|---------|
| `onRequest*` | Before state change | `onRequestClose` - requests close, parent decides |
| `on*` | After event | `onClose` - fires after component closed |

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

---

## TypeScript Patterns

### Props Interface

Define props in a separate `types.ts` file:

```tsx
// types.ts
import type { ReactNode, HTMLAttributes } from 'react';

export interface MyComponentProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
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
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('calls onClick with event data', async () => {
    const onClick = vi.fn();
    render(<Button label="Test" onClick={onClick} />);
    
    await userEvent.click(screen.getByRole('button'));
    
    expect(onClick).toHaveBeenCalledWith(
      expect.any(Object), // event
      expect.objectContaining({ /* data */ })
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
- WCAG 2.1 AA compliant

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

---

## Best Practices

### Do

- Keep components focused on one responsibility
- Use SLDS CSS classes (no custom inline styles)
- Make components work without JavaScript for SSR
- Document all props with JSDoc comments
- Handle edge cases gracefully

### Don't

- Mutate props or state directly
- Use `findDOMNode` (deprecated in React 18+)
- Add external dependencies without discussion
- Create components not in SLDS
- Use global DOM queries

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
