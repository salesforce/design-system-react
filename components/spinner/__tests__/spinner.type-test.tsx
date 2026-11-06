/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import Spinner from '../index';

export const inline = <Spinner placement="inline" hasContainer={false} />;

export const input = <Spinner placement="input" />;

export const deprecatedInline = <Spinner isInline />;

export const deprecatedInput = <Spinner isInput />;

export const unknownPlacement = (
	// @ts-expect-error only `default`, `inline` and `input` exist
	<Spinner placement="floating" />
);

export const bothFlags = (
	// @ts-expect-error a spinner is inline or in an input, not both
	<Spinner isInline isInput />
);

export const placementAndFlag = (
	// @ts-expect-error `isInline` is the deprecated spelling of `placement`
	<Spinner placement="input" isInline />
);
