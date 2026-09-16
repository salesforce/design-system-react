# Design System for React

### Accessible, localization-friendly, presentational React components

## Install

```bash
npm install @salesforce-ux/design-system @salesforce/design-system-react
```

## Requirements

- **Node.js**: >= 20.19.0
- **React**: 19.x
- **@salesforce-ux/design-system**: 2.25.x

## Getting Started

This library is the [React](https://react.dev/) implementation of the [Salesforce Lightning Design System](https://www.lightningdesignsystem.com/).

## Usage

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

This library does not include CSS. Add the SLDS stylesheet to your page:

```html
<link 
  rel="stylesheet" 
  href="/node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css" 
/>
```

## License

- Source code: [BSD 3-Clause](https://git.io/sfdc-license)
- Icons and images: [Creative Commons Attribution-NoDerivatives 4.0](https://github.com/salesforce/licenses/blob/master/LICENSE-icons-images.txt)
- Salesforce Sans font: [Font License](https://github.com/salesforce/licenses/blob/master/LICENSE-font.txt)

## Got feedback?

- **Questions**: [StackOverflow](https://stackoverflow.com/questions/tagged/design-system-react) (tag: `design-system-react`)
- **Bugs**: [GitHub Issues](https://github.com/salesforce/design-system-react/issues)
