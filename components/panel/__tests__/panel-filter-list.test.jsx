import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import PanelFilterList from '../filtering/list';
import Filter from '../../filter';
import IconSettings from '../../icon-settings';

describe('PanelFilterList', () => {
	it('points a filter without an id at its error message', () => {
		const { container, getByText } = render(
			<IconSettings iconPath="/assets/icons">
				<PanelFilterList>
					<Filter
						errorLabel="Filter must have selected fields"
						property="Name"
						predicate="equals Acme"
					/>
				</PanelFilterList>
			</IconSettings>
		);
		const error = getByText('Filter must have selected fields');
		expect(error.id).toBeTruthy();
		expect(
			container.querySelector(`[aria-describedby="${error.id}"]`)
		).toBeInTheDocument();
	});

	it.each([
		['standalone', (filter) => filter],
		[
			'in a list without errorLabel',
			(filter) => <PanelFilterList>{filter}</PanelFilterList>,
		],
	])(
		'%s: isError does not point aria-describedby at a missing element',
		(name, wrap) => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					{wrap(
						<Filter id="f" isError property="Name" predicate="equals Acme" />
					)}
				</IconSettings>
			);
			expect(container.querySelector('#f-error')).not.toBeInTheDocument();
			expect(
				container.querySelector('[aria-describedby]')
			).not.toBeInTheDocument();
			expect(container.querySelector('.slds-has-error')).toBeInTheDocument();
		}
	);
});
