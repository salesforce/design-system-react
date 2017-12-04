/* eslint-env jest */
import Basic from '../__examples__/basic';
import Advanced from '../__examples__/advanced';
import { renderMarkup } from '../../../tests/snapshot-helpers';

test('DataTable Basic HTML Snapshot', () => {
	expect(renderMarkup(Basic)).toMatchSnapshot();
});

test('DataTable Advanced HTML Snapshot', () => {
	expect(renderMarkup(Advanced)).toMatchSnapshot();
});
