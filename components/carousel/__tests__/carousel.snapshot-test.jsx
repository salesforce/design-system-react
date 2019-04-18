/* eslint-env jest */
import React from 'react';

import { renderMarkup } from '../../../tests/snapshot-helpers';

import Default from '../__examples__/default';
import ThreeItems from '../__examples__/three-items';
import WithCustomItems from '../__examples__/with-custom-items';

test('Carousel Component Snapshot - Default, 1 item, no navigation', () => {
	expect(renderMarkup(Default)).toMatchSnapshot();
});
test('Carousel Component Snapshot - 3 items and navigation', () => {
	expect(renderMarkup(ThreeItems)).toMatchSnapshot();
});

test('Carousel Component Snapshot - With custom items', () => {
	expect(renderMarkup(WithCustomItems)).toMatchSnapshot();
});
