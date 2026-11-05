/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { useState, type ReactNode } from 'react';

import Tabs from '../../tabs';

interface ColorPickerTabsProps {
	children: ReactNode;
	/** `value` of the tab shown when the popover opens */
	defaultValue: string;
	id: string;
}

/**
 * `Tabs` is controlled, so the selected tab lives here. The popover body
 * remounts on every open, so each open starts at `defaultValue`.
 */
const ColorPickerTabs = ({
	children,
	defaultValue,
	id,
}: ColorPickerTabsProps) => {
	const [value, setValue] = useState(defaultValue);
	return (
		<Tabs
			id={id}
			onSelect={(event, data) => setValue(data.value)}
			value={value}
		>
			{children}
		</Tabs>
	);
};

export default ColorPickerTabs;
