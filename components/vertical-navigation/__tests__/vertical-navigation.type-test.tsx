/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import type { NavigationItem } from '../index';
import Badge from '../../badge';
import Icon from '../../icon';

export const item: NavigationItem = {
	id: 'reports',
	label: 'Reports',
	url: '#reports',
	icon: <Icon category="utility" name="chart" size="x-small" />,
	notificationBadge: <Badge content="3" />,
};

export const unknownKey: NavigationItem = {
	id: 'reports',
	label: 'Reports',
	url: '#reports',
	// @ts-expect-error items have no index signature
	count: 3,
};
