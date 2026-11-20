import { describe, it, expect } from 'vitest';
import pkg from '../../package.json';

const EXACT_VERSION = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;

describe('package.json peerDependencies', () => {
	// An exact pin makes npm fail with ERESOLVE for any consumer that already
	// has a newer @salesforce-ux/design-system, though only its icon sprites are used.
	it('accepts later 2.x releases of @salesforce-ux/design-system', () => {
		const range = pkg.peerDependencies['@salesforce-ux/design-system'];
		expect(range).not.toMatch(EXACT_VERSION);
		expect(range).toMatch(/^\^2\./);
	});

	// Consumers import the SLDS 2 stylesheet themselves. As a regular dependency
	// that import only resolved through npm hoisting, not under pnpm or Yarn PnP.
	it('declares @salesforce-ux/design-system-2 as a peer, not a dependency', () => {
		const range = pkg.peerDependencies['@salesforce-ux/design-system-2'];
		expect(range).not.toMatch(EXACT_VERSION);
		expect(range).toMatch(/^\^2\./);
		expect(pkg.dependencies).not.toHaveProperty(
			'@salesforce-ux/design-system-2'
		);
	});
});
