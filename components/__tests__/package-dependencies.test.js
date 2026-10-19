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
});
