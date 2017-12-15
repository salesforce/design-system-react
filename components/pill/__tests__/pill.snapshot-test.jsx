/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { renderMarkup } from '../../../tests/snapshot-helpers';

import Default from '../__examples__/snapshot';


test('Pill DOM Snapshot', () => {
	const domTree = renderer.create(
		<Default />,
	).toJSON();
	expect(domTree).toMatchSnapshot();
});


test('Pill HTML Snapshot', () => {
	expect(renderMarkup(Default)).toMatchSnapshot();
});

