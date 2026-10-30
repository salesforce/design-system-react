import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import IconSettings from '../../icon-settings';
import VisualPicker from '../../visual-picker';
import Radio from '../../radio';

describe('VisualPicker children', () => {
	it("passes the picker's name to options, unless an option sets its own", () => {
		const { getByLabelText } = render(
			<IconSettings iconPath="/assets/icons">
				<VisualPicker label="Picker" id="picker">
					<Radio
						labels={{ label: 'One' }}
						value="one"
						name="own-name"
						onRenderVisualPicker={() => <span>One</span>}
					/>
					<Radio
						labels={{ label: 'Two' }}
						value="two"
						onRenderVisualPicker={() => <span>Two</span>}
					/>
				</VisualPicker>
			</IconSettings>
		);
		expect(getByLabelText(/One/)).toHaveAttribute('name', 'own-name');
		expect(getByLabelText(/Two/)).toHaveAttribute('name', 'picker_options');
	});
});
