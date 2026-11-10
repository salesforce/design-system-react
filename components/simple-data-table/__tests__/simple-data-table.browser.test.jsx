import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import '@salesforce-ux/design-system-2/dist/css/bundled/slds2.lightning-blue.css';

import SimpleDataTable from '../';
import SimpleDataTableColumn from '../column';
import IconSettings from '../../icon-settings';

// Served by Vite from node_modules, so the sprite loads instead of 404ing
const iconPath = '/node_modules/@salesforce-ux/design-system/assets/icons';

const items = [
	{ id: '1', name: 'Cloudhub', stage: 'Prospecting' },
	{ id: '2', name: 'Anypoint', stage: 'Closed' },
];

const renderTable = (props) =>
	render(
		<IconSettings iconPath={iconPath}>
			<SimpleDataTable items={items} id="header-padding" {...props}>
				<SimpleDataTableColumn key="name" label="Name" property="name" />
				<SimpleDataTableColumn key="stage" label="Stage" property="stage" />
			</SimpleDataTable>
		</IconSettings>
	);

const getHeaderCell = (container) => container.querySelector('thead th');

// Layout regression: SLDS zeroes the `thead th` padding only under
// `slds-table_resizable-cols`; `.slds-th__action` supplies the padding instead.
// Without the class the header row picks up both and grows from 32px to 40px.
describe('SLDSSimpleDataTable fixedLayout header (browser)', () => {
	it('does not double the header cell padding', () => {
		const { container } = renderTable({ fixedLayout: true });
		const th = getHeaderCell(container);

		expect(getComputedStyle(th).padding).toBe('0px');
		expect(th.getBoundingClientRect().height).toBe(32);
	});
});
