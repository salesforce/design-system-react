/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import type { Flexibility } from './types';

/**
 * Normalize the `flexibility` prop into a token array. Mirrors
 * `lightning-layout-item`, which accepts either an array of tokens or a
 * comma-separated string (e.g. `"auto, no-shrink"`). Tokens are trimmed and
 * empty entries dropped. Unknown tokens pass through and are ignored by the
 * caller (no matching class), matching LBC's lenient behavior.
 *
 * Shared by rendering (layout-item) and conflict validation (check-props) so
 * both interpret the prop identically.
 */
const normalizeFlexibility = (
	flexibility?: Flexibility | Flexibility[] | string
): string[] => {
	if (flexibility == null) return [];
	const tokens = Array.isArray(flexibility)
		? flexibility
		: String(flexibility).split(',');
	return tokens.map((token) => token.trim()).filter(Boolean);
};

export default normalizeFlexibility;
