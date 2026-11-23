import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import SimpleDataTable from '../';
import SimpleDataTableColumn from '../column';
import SimpleDataTableRowActions from '../row-actions';
import Dropdown from '../../menu-dropdown';
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

// SLDS 2 rounds `slds-table_bordered`, but header and selected-row cells paint
// square backgrounds that poke out past the corners. The four corner cells take
// the table's radius so their backgrounds follow the rounded border.
describe('SLDSSimpleDataTable rounded corners (browser)', () => {
	const radius = (el) => {
		const s = getComputedStyle(el);
		return [
			s.borderTopLeftRadius,
			s.borderTopRightRadius,
			s.borderBottomRightRadius,
			s.borderBottomLeftRadius,
		];
	};
	const corners = (container) => {
		const head = container.querySelector('thead tr');
		const last = container.querySelector('tbody tr:last-child');
		return {
			tl: head.firstElementChild,
			tr: head.lastElementChild,
			bl: last.firstElementChild,
			br: last.lastElementChild,
		};
	};
	const tableRadius = (container) =>
		getComputedStyle(container.querySelector('table')).borderTopLeftRadius;

	const expectRoundedCorners = (container, { tl, tr, bl, br }) => {
		const r = tableRadius(container);
		expect(r).not.toBe('0px');
		expect(radius(tl)[0]).toBe(r);
		expect(radius(tr)[1]).toBe(r);
		expect(radius(br)[2]).toBe(r);
		expect(radius(bl)[3]).toBe(r);
	};

	it('rounds the corner cells of a fluid table', () => {
		const { container } = renderTable();
		expectRoundedCorners(container, corners(container));
	});

	it('rounds the selection and row action cells of a fixed layout table', () => {
		const { container } = render(
			<IconSettings iconPath={iconPath}>
				<SimpleDataTable
					items={items}
					id="corners-advanced"
					fixedLayout
					selectRows="checkbox"
					selection={[items[1]]}
					onRowChange={() => {}}
				>
					<SimpleDataTableColumn key="name" label="Name" property="name" />
					<SimpleDataTableColumn key="stage" label="Stage" property="stage" />
					<SimpleDataTableRowActions
						options={[{ id: 0, label: 'Delete', value: '1' }]}
						dropdown={<Dropdown length="7" />}
					/>
				</SimpleDataTable>
			</IconSettings>
		);
		const c = corners(container);

		// The selected bottom row paints a background, so its corners matter most.
		expect(c.bl.closest('tr')).toHaveClass('slds-is-selected');
		expect(c.tl.querySelector('input[type="checkbox"]')).not.toBeNull();
		expect(c.br.querySelector('button')).not.toBeNull();
		expectRoundedCorners(container, c);
	});

	it('rounds the first body row when the header is hidden', () => {
		const { container } = renderTable({ isHeadless: true });
		const first = container.querySelector('tbody tr:first-child');
		const r = tableRadius(container);

		expect(radius(first.firstElementChild)[0]).toBe(r);
		expect(radius(first.lastElementChild)[1]).toBe(r);
	});

	it('leaves the inner cells square', () => {
		const { container } = renderTable();
		const inner = [
			container.querySelector('thead tr').lastElementChild,
			container.querySelector('tbody tr:first-child').firstElementChild,
		];

		expect(radius(inner[0])[0]).toBe('0px');
		expect(radius(inner[1])).toEqual(['0px', '0px', '0px', '0px']);
	});
});
