import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import ExpandableSection from '../';
import IconSettings from '../../icon-settings';
import { expectNoAxeViolations } from '../../__tests__/axe';

// axe on the open section, with real SLDS CSS.
describe('ExpandableSection accessibility (browser)', () => {
	it.each([
		['collapsible', {}],
		['non-collapsible', { nonCollapsible: true }],
	])('%s: has no axe violations while open', async (name, props) => {
		const { container } = render(
			<IconSettings iconPath="/assets/icons">
				<ExpandableSection id="section" isOpen title="Details" {...props}>
					Section content
				</ExpandableSection>
			</IconSettings>
		);
		expect(container).toHaveTextContent('Section content');
		await expectNoAxeViolations();
	});
});
