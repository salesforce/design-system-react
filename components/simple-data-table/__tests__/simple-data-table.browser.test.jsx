import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

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

// Regression: SLDS 2 has no `slds-table_header-hidden`. The header must stay
// visually hidden (via `slds-assistive-text` on the thead) but remain in the
// accessibility tree. SLDS 2 draws the bordered table as a rounded box, so the
// headless table keeps its top border; dropping it (as SLDS 1's class did)
// leaves the rounded top corners open.
describe('SLDSSimpleDataTable isHeadless (browser)', () => {
	it('visually hides the header but keeps it accessible', () => {
		const { container, getAllByRole } = renderTable({ isHeadless: true });
		const table = container.querySelector('table');
		const thead = container.querySelector('thead');

		expect(table).not.toHaveClass('slds-table_header-hidden');
		expect(thead).toHaveClass('slds-assistive-text');
		expect(thead.getBoundingClientRect().height).toBeLessThanOrEqual(1);
		expect(getComputedStyle(thead).position).toBe('absolute');
		expect(getAllByRole('columnheader').map((th) => th.textContent)).toEqual(
			expect.arrayContaining(['Name', 'Stage'])
		);
	});

	it('keeps the rounded border box closed at the top', () => {
		const { container } = renderTable({ isHeadless: true });
		const style = getComputedStyle(container.querySelector('table'));

		expect(style.borderTopWidth).toBe('1px');
		expect(style.borderTopLeftRadius).not.toBe('0px');
		expect(style.borderTopRightRadius).not.toBe('0px');
	});
});
