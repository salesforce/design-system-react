/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import Input from '../index';

export const controlled = <Input onChange={() => {}} value="x" />;

// @ts-expect-error `defaultValue` was removed in v11: pass `value`
export const removedDefaultValue = <Input defaultValue="x" />;
