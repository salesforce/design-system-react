/* eslint-env jest */
import Basic from '../../examples/data-table/basic';
import Advanced from '../../examples/data-table/advanced';
import { renderMarkup } from '../snapshot-helpers';

test('DataTable Basic HTML Snapshot', () => {
	expect(renderMarkup(Basic)).toMatchSnapshot();
});

test('DataTable Advanced HTML Snapshot', () => {
	expect(renderMarkup(Advanced)).toMatchSnapshot();
});
