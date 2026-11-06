import { createRef } from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Search from '../search';
import IconSettings from '../../icon-settings';

describe('Search', () => {
	it('forwards ref to the input element', () => {
		const ref = createRef();
		const { container } = render(
			<IconSettings iconPath="/assets/icons">
				<Search id="s" value="" onChange={() => {}} ref={ref} />
			</IconSettings>
		);
		expect(ref.current).toBe(container.querySelector('input'));
	});
});
