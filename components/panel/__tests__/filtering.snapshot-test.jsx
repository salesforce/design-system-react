/* eslint-env jest */
import PanelFiltering from '../__examples__/filtering';
import { testDOMandHTML } from '../../../tests/snapshot-helpers';

testDOMandHTML({
	name: 'Panel Filtering Default Snapshot',
	test,
	Component: PanelFiltering,
});
