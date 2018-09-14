/* eslint-env jest */
import Basic from '../__examples__/basic';
import Advanced from '../__examples__/advanced';
import BasicFixed from '../__examples__/basic-fixed-layout';
import { renderMarkup } from '../../../tests/snapshot-helpers';

test('DataTable Basic HTML Snapshot', () => {
	expect(renderMarkup(Basic)).toMatchSnapshot();
});

test('DataTable Basic Fixed Layout HTML Snapshot', () => {
	expect(renderMarkup(BasicFixed)).toMatchSnapshot();
});

test('DataTable Advanced HTML Snapshot', () => {
	expect(renderMarkup(Advanced)).toMatchSnapshot();
});
