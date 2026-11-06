/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import Pill from '../index';

export const link = (
	<Pill labels={{ label: 'Acme' }} href="/acme" tabIndex={0} />
);

export const option = <Pill variant="option" labels={{ label: 'Acme' }} />;

export const customContent = <Pill>Acme</Pill>;

export const hrefOnOption = (
	// @ts-expect-error only a link pill takes `href`
	<Pill variant="option" labels={{ label: 'Acme' }} href="/acme" />
);

export const iconAndAvatar = (
	// @ts-expect-error use `icon` or `avatar`, not both
	<Pill labels={{ label: 'Acme' }} icon={<span />} avatar={<span />} />
);

export const labelAndChildren = (
	// @ts-expect-error use `labels.label` or `children`, not both
	<Pill labels={{ label: 'Acme' }}>Acme</Pill>
);

export const stringTabIndex = (
	// @ts-expect-error `tabIndex` is a number
	<Pill labels={{ label: 'Acme' }} tabIndex="0" />
);
