/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import VisualPickerLink from '../link';

export const withHref = <VisualPickerLink href="#reports" title="Reports" />;

// @ts-expect-error `href` is required
export const withoutHref = <VisualPickerLink title="Reports" />;
