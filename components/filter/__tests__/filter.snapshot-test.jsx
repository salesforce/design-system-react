import { renderMarkup, testDOMandHTML } from '../../../tests/snapshot-helpers';

import Default from '../__examples__/default';
import NewFilter from '../__examples__/new';
import LockedFilter from '../__examples__/locked';
import PermanantFilter from '../__examples__/permanant';
import ErrorFilter from '../__examples__/error';
import AssistiveTextFilter from '../__examples__/assistive-text';

testDOMandHTML({
	name: 'Filter Base Snapshot',
	test,
	Component: Default,
});

testDOMandHTML({
	name: 'NewFilter Base Snapshot',
	test,
	Component: NewFilter,
});

testDOMandHTML({
	name: 'LockedFilter Base Snapshot',
	test,
	Component: LockedFilter,
});

testDOMandHTML({
	name: 'Permanant Filter Base Snapshot',
	test,
	Component: PermanantFilter,
});

testDOMandHTML({
	name: 'Error Filter Base Snapshot',
	test,
	Component: ErrorFilter,
});

testDOMandHTML({
	name: 'AssistiveText Filter',
	test,
	Component: AssistiveTextFilter,
});

test('Filter Base with custom className Snapshot', () => {
	expect(
		renderMarkup(Default, { className: 'MY_CUSTOM_CLASS_NAME' })
	).toMatchSnapshot();
});

test('AssistiveText Filter HTML Snapshot', () => {
	expect(renderMarkup(Default)).toMatchSnapshot();
});
