import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Accordion from '../';
import Panel from '../panel';
import IconSettings from '../../icon-settings';
import { expectNoAxeViolations } from '../../__tests__/axe';

// axe on expanded panels, with real SLDS CSS. A collapsed panel hides its
// content.
describe('Accordion accessibility (browser)', () => {
	it('has no axe violations with expanded and collapsed panels', async () => {
		const { container } = render(
			<IconSettings iconPath="/assets/icons">
				<Accordion id="accordion">
					{['1', '2', '3'].map((id) => (
						<Panel
							expanded={id !== '3'}
							id={id}
							key={id}
							onTogglePanel={() => {}}
							summary={`Summary ${id}`}
						>
							Details {id}
						</Panel>
					))}
				</Accordion>
			</IconSettings>
		);
		expect(container.querySelectorAll('[aria-expanded="true"]')).toHaveLength(
			2
		);
		await expectNoAxeViolations();
	});
});
