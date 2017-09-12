/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { renderMarkup, testDOMandHTML } from '../snapshot-helpers';

import SnapshotBaseOpen from '../../examples/combobox/snapshot/base-open';
import SnapshotBaseSelected from '../../examples/combobox/snapshot/base-selected';
import SnapshotInlineSingleSelection from '../../examples/combobox/snapshot/inline-single-selection';
import SnapshotInlineSingleSelectionSelected from '../../examples/combobox/snapshot/inline-single-selection-selected';
import SnapshotInlineMultipleSelection from '../../examples/combobox/snapshot/inline-multiple-selection';
import SnapshotInlineMultipleSelectionSelected from '../../examples/combobox/snapshot/inline-multiple-selection-selected';
import SnapshotReadonlySingleSelection from '../../examples/combobox/snapshot/readonly-single-selection';
import SnapshotReadonlySingleSelectionSelected from '../../examples/combobox/snapshot/readonly-single-selection-selected';
import SnapshotReadonlySingleSelectionSelectedOpen from '../../examples/combobox/snapshot/readonly-single-selection-selected-open';
import SnapshotReadonlyMultipleSelection from '../../examples/combobox/snapshot/readonly-multiple-selection';
import SnapshotReadonlyMultipleSelectionSingleItemSelected from '../../examples/combobox/snapshot/readonly-multiple-selection-single-item-selected';
import SnapshotReadonlyMultipleSelectionMultipleItemsSelected from '../../examples/combobox/snapshot/readonly-multiple-selection-multiple-items-selected';

testDOMandHTML({
	name: 'Base Open',
	test,
	Component: SnapshotBaseOpen
});

testDOMandHTML({
	name: 'Base Selected',
	test,
	Component: SnapshotBaseSelected
});

testDOMandHTML({
	name: 'Inline Single Selection',
	test,
	Component: SnapshotInlineSingleSelection
});

testDOMandHTML({
	name: 'Inline Single Selection Selected',
	test,
	Component: SnapshotInlineSingleSelectionSelected
});

testDOMandHTML({
	name: 'Inline Multiple Selection',
	test,
	Component: SnapshotInlineMultipleSelection
});

testDOMandHTML({
	name: 'Inline Multiple Selection Selected',
	test,
	Component: SnapshotInlineMultipleSelectionSelected
});

testDOMandHTML({
	name: 'Readonly Single Selection',
	test,
	Component: SnapshotReadonlySingleSelection
});

testDOMandHTML({
	name: 'Readonly Single Selection Selected',
	test,
	Component: SnapshotReadonlySingleSelectionSelected
});

testDOMandHTML({
	name: 'Readonly Single Selection Selected Open',
	test,
	Component: SnapshotReadonlySingleSelectionSelectedOpen
});

testDOMandHTML({
	name: 'Readonly Multiple Selection',
	test,
	Component: SnapshotReadonlyMultipleSelection
});

testDOMandHTML({
	name: 'Readonly Multiple Selection Single Item Selected',
	test,
	Component: SnapshotReadonlyMultipleSelectionSingleItemSelected
});

testDOMandHTML({
	name: 'Readonly Multiple Selection Multiple Items Selected',
	test,
	Component: SnapshotReadonlyMultipleSelectionMultipleItemsSelected
});
