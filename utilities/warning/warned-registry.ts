/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Every warn-once helper keeps its "already warned" keys in a map created
// here, so tests can clear them all between cases. In an app nothing calls
// `resetWarnings`, and each message still prints once per page load.
const registry: Record<string, boolean>[] = [];

export function createWarnedMap(): Record<string, boolean> {
	const warned: Record<string, boolean> = {};
	registry.push(warned);
	return warned;
}

/** Test-only: forget every warning already printed. */
export function resetWarnings(): void {
	registry.forEach((warned) => {
		Object.keys(warned).forEach((key) => {
			delete warned[key];
		});
	});
}
