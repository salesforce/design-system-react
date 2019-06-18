/* eslint-env jest */
import { renderMarkup } from '../../../tests/snapshot-helpers';
import * as ProgressRing from '../__examples__/examples';

Object.keys(ProgressRing).forEach((name) => {
	test(`${name} DOM Snapshot`, () => {
		expect(renderMarkup(ProgressRing[name])).toMatchSnapshot();
	});
});
