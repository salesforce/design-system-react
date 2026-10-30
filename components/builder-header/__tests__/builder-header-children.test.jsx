import { render } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';

import BuilderHeader from '../';
import BuilderHeaderToolbar from '../toolbar';
import BuilderHeaderMisc from '../misc';
import IconSettings from '../../icon-settings';

const originalDisplayNames = {
	toolbar: BuilderHeaderToolbar.displayName,
	misc: BuilderHeaderMisc.displayName,
};

describe('BuilderHeader children', () => {
	afterEach(() => {
		BuilderHeaderToolbar.displayName = originalDisplayNames.toolbar;
		BuilderHeaderMisc.displayName = originalDisplayNames.misc;
	});

	it('finds its sections by component, not displayName', () => {
		// Storybook docgen and HOCs can change a component's displayName
		BuilderHeaderToolbar.displayName = 'RenamedToolbar';
		BuilderHeaderMisc.displayName = 'RenamedMisc';
		const { container } = render(
			<IconSettings iconPath="/assets/icons">
				<BuilderHeader>
					<BuilderHeaderMisc>
						<span id="misc-content">Misc</span>
					</BuilderHeaderMisc>
					<BuilderHeaderToolbar assistiveText={{ actions: 'Actions' }} />
				</BuilderHeader>
			</IconSettings>
		);
		expect(container.querySelector('#misc-content')).toBeInTheDocument();
		expect(
			container.querySelector('.slds-builder-toolbar')
		).toBeInTheDocument();
	});
});
