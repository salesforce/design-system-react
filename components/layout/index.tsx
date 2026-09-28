/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import Layout from './layout';
import LayoutItem from './layout-item';

type LayoutWithItem = typeof Layout & { Item: typeof LayoutItem };

const LayoutRoot = Layout as LayoutWithItem;
LayoutRoot.Item = LayoutItem;

export { LayoutRoot as Layout, LayoutItem };
export type {
	LayoutProps,
	LayoutItemProps,
	Flexibility,
	LayoutItemSize,
	LayoutItemPadding,
} from './types';

export default LayoutRoot;
