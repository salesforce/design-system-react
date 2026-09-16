# Contributing to Design System React

Thank you for your interest in contributing! This guide will help you get started.

## Table of Contents

- [Setup](#setup)
- [Development Workflow](#development-workflow)
- [Adding a New Component](#adding-a-new-component)
- [Testing](#testing)
- [Code Style](#code-style)
- [Pull Request Process](#pull-request-process)

## Setup

1. **Fork this repository** (button in upper right)

2. **Clone your fork locally**
   ```bash
   git clone git@github.com:[YOUR-USER]/design-system-react.git
   cd design-system-react
   ```

3. **Install dependencies** (Node >= 20.19.0 required)
   ```bash
   npm install
   ```

4. **Start Storybook**
   ```bash
   npm run storybook
   ```
   View components at http://localhost:6007

5. **Read the [Codebase Overview](docs/codebase-overview.md)** to understand conventions and best practices.

## Development Workflow

### Commands

| Command | Description |
|---------|-------------|
| `npm run storybook` | Start Storybook dev server |
| `npm run dev` | Start Vite dev server |
| `npm test` | Run tests with Vitest |
| `npm run test:ui` | Run tests with Vitest UI |
| `npm run lint` | Lint all files |
| `npm run lint:fix` | Fix lint issues and format with Prettier |
| `npm run typecheck` | TypeScript type checking |
| `npm run build` | Build the library |

### Creating a Feature Branch

```bash
git checkout -b feature/my-feature-name
```

## Adding a New Component

### 1. Propose the Component

Create a GitHub issue with:
- Component name and description
- List of proposed props with types
- Link to SLDS documentation

### 2. Create the Component Structure

```
components/
└── my-component/
    ├── index.tsx           # Main component export
    ├── my-component.tsx    # Component implementation
    ├── types.ts            # TypeScript interfaces
    ├── private/            # Internal sub-components
    │   └── sub-component.tsx
    └── __docs__/
        └── MyComponent.stories.tsx  # Storybook stories
```

### 3. Component Guidelines

- Use **functional components** with hooks
- Use **TypeScript** for all new components
- Add **forwardRef** for ref handling
- Add **displayName** for debugging
- Export from `components/index.ts`

### 4. Story Requirements

Stories should be in CSF (Component Story Format):

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import MyComponent from '../';

const meta: Meta<typeof MyComponent> = {
  title: 'Components/MyComponent',
  component: MyComponent,
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Default: Story = {
  args: {
    // props
  },
};
```

### 5. Register the Component

Add the story path to `.storybook/main.ts`:

```typescript
stories: [
  // ... existing stories
  '../components/my-component/__docs__/*.stories.@(ts|tsx)',
],
```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests for a specific component
npm test -- components/button
```

### Writing Tests

Tests use [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/):

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import MyComponent from '../';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent label="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<MyComponent label="Click me" onClick={onClick} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});
```

### Test Requirements

- Test all props
- Test user interactions (click, keyboard, focus)
- Test accessibility (ARIA attributes)
- Aim for 90%+ coverage

## Code Style

### Formatting

This project uses [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/):

```bash
# Fix all formatting issues
npm run lint:fix
```

### TypeScript

- Use explicit types for props
- Avoid `any` - use `unknown` or proper types
- Export types from `types.ts` files

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Component files | kebab-case | `my-component.tsx` |
| Story files | PascalCase | `MyComponent.stories.tsx` |
| Type files | lowercase | `types.ts` |
| Components | PascalCase | `MyComponent` |
| Props interfaces | PascalCase + Props | `MyComponentProps` |

## Pull Request Process

### Before Submitting

1. **Run linting**: `npm run lint`
2. **Run type check**: `npm run typecheck`
3. **Run tests**: `npm test`
4. **Test in Storybook**: `npm run storybook`

### PR Requirements

- Descriptive title and summary
- Link to related issue
- Screenshots for visual changes
- All CI checks passing

### Commit Messages

Use conventional commits:

```
feat: Add new Button variant
fix: Correct Modal focus trap
docs: Update README examples
chore: Update dependencies
```

### Review Process

1. Maintainers will review your PR
2. Address any feedback
3. Once approved, your PR will be merged

## Accessibility

All components must be accessible:

- Keyboard navigable
- Proper ARIA attributes
- Screen reader compatible
- WCAG 2.1 AA compliant

## Questions?

- **Issues**: [GitHub Issues](https://github.com/salesforce/design-system-react/issues)
- **Stack Overflow**: Tag with `design-system-react`

---

Thank you for contributing!
