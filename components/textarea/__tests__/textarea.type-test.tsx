/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import Textarea from '../index';

export const numeric = <Textarea maxLength={100} />;

// @ts-expect-error `maxLength` is a number
export const stringLength = <Textarea maxLength="100" />;
