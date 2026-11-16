import '@testing-library/jest-dom';
// Load the real SLDS 2 stylesheet so layout-dependent behavior (text
// truncation, column widths, focus rings) matches production in the browser
// project. Modular base first: it declares the `@layer` order the theme's
// layer blocks rely on.
import '@salesforce-ux/design-system-2/dist/css/modular/slds2.base.css';
import '@salesforce-ux/design-system-2/dist/css/modular/slds2.theme.cosmos.css';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Browser-mode setup. Unlike the jsdom setup, this deliberately does NOT stub
// layout/measurement APIs (getBoundingClientRect, ResizeObserver, Canvas): the
// whole point of the browser project is to exercise the real layout + focus
// behavior that jsdom cannot provide. We only wire up the jest-dom matchers and
// per-test cleanup.
expect.extend(matchers);

afterEach(() => {
	cleanup();
});
