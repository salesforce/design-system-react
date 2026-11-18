import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Combobox from '../';
import Popover from '../../popover';
import IconSettings from '../../icon-settings';
import { expectNoAxeViolations, notActEnvironment } from '../../__tests__/axe';

const options = [
	{ id: '1', label: 'Acme', subTitle: 'Account • San Francisco' },
	{ id: '2', label: 'Salesforce.com, Inc.', subTitle: 'Account • Boston' },
	{ id: '3', label: "Paddy's Pub", disabled: true },
];

const renderCombobox = (props) =>
	render(
		<IconSettings iconPath="/assets/icons">
			<Combobox
				id="combobox"
				labels={{ label: 'Accounts', placeholder: 'Search accounts' }}
				options={options}
				selection={[]}
				{...props}
			/>
		</IconSettings>
	);

// axe on the open combobox, with real SLDS CSS. A closed combobox is
// `aria-expanded="false"`, which axe exempts from `aria-controls`.
describe('Combobox accessibility (browser)', () => {
	notActEnvironment();

	it.each([
		['base', {}],
		['base multiple', { multiple: true, selection: [options[0]] }],
		['inline-listbox', { variant: 'inline-listbox' }],
		['readonly', { variant: 'readonly' }],
		[
			'readonly multiple',
			{ variant: 'readonly', multiple: true, selection: [options[0]] },
		],
		[
			'popover',
			{
				variant: 'popover',
				popover: <Popover body={<p>Filters</p>} />,
				assistiveText: { popoverLabel: 'Filters' },
			},
		],
	])('%s: has no axe violations while open', async (name, props) => {
		renderCombobox({ ...props, isOpen: true });
		expect(document.querySelector('[role="combobox"]')).toHaveAttribute(
			'aria-expanded',
			'true'
		);
		await expectNoAxeViolations();
	});
});
