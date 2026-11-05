import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import ButtonGroup from '../';
import Button from '../../button';
import Dropdown from '../../menu-dropdown';
import IconSettings from '../../icon-settings';

describe('ButtonGroup children', () => {
	it('marks the last rendered child, keeping its own triggerClassName', () => {
		const showExtra = false;
		const { container } = render(
			<IconSettings iconPath="/assets/icons">
				<ButtonGroup labels={{ label: 'Actions' }}>
					<Button label="Refresh" />
					<Dropdown
						label="More"
						options={[{ label: 'One', value: '1' }]}
						triggerClassName="mine"
					/>
					{showExtra && <Button label="Extra" />}
				</ButtonGroup>
			</IconSettings>
		);
		const trigger = container.querySelector('.slds-dropdown-trigger');
		expect(trigger).toHaveClass('slds-button_last', 'mine');
	});
});
