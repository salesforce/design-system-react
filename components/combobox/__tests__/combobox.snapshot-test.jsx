/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { renderMarkup, testDOMandHTML } from '../../../tests/snapshot-helpers';

import SnapshotBaseOpen from '../__examples__/snapshot/base-open';
import SnapshotBaseOpenClassName from '../__examples__/snapshot/base-open-class-name';
import SnapshotBaseSelected from '../__examples__/snapshot/base-selected';
import SnapshotInlineSingleSelection from '../__examples__/snapshot/inline-single-selection';
import SnapshotInlineSingleSelectionSelected from '../__examples__/snapshot/inline-single-selection-selected';
import SnapshotInlineMultipleSelection from '../__examples__/snapshot/inline-multiple-selection';
import SnapshotInlineMultipleSelectionSelected from '../__examples__/snapshot/inline-multiple-selection-selected';
import SnapshotReadonlySingleSelection from '../__examples__/snapshot/readonly-single-selection';
import SnapshotReadonlySingleSelectionSelected from '../__examples__/snapshot/readonly-single-selection-selected';
import SnapshotReadonlySingleSelectionSelectedOpen from '../__examples__/snapshot/readonly-single-selection-selected-open';
import SnapshotReadonlyMultipleSelection from '../__examples__/snapshot/readonly-multiple-selection';
import SnapshotReadonlyMultipleSelectionSingleItemSelected from '../__examples__/snapshot/readonly-multiple-selection-single-item-selected';
import SnapshotReadonlyMultipleSelectionMultipleItemsSelected from '../__examples__/snapshot/readonly-multiple-selection-multiple-items-selected';

import SnapshotBaseCustomMenuItemOpen from '../__examples__/snapshot/base-custom-menu-item-open';
import SnapshotReadonlySingleSelectionCustomMenuItemOpen from '../__examples__/snapshot/readonly-single-selection-custom-menu-item';

import { COMBOBOX } from '../../../utilities/constants';

testDOMandHTML({
	name: 'Base Open',
	test,
	Component: SnapshotBaseOpen,
	ComponentKind: COMBOBOX
});

testDOMandHTML({
	name: 'Base Selected',
	test,
	Component: SnapshotBaseSelected,
	ComponentKind: COMBOBOX
});

testDOMandHTML({
	name: 'Base Open Custom Class Name',
	test,
	Component: SnapshotBaseOpenClassName
});

testDOMandHTML({
	name: 'Inline Single Selection',
	test,
	Component: SnapshotInlineSingleSelection,
	ComponentKind: COMBOBOX
});

testDOMandHTML({
	name: 'Inline Single Selection Selected',
	test,
	Component: SnapshotInlineSingleSelectionSelected,
	ComponentKind: COMBOBOX
});

testDOMandHTML({
	name: 'Inline Multiple Selection',
	test,
	Component: SnapshotInlineMultipleSelection,
	ComponentKind: COMBOBOX
});

testDOMandHTML({
	name: 'Inline Multiple Selection Selected',
	test,
	Component: SnapshotInlineMultipleSelectionSelected,
	ComponentKind: COMBOBOX
});

testDOMandHTML({
	name: 'Base Custom Menu Item Open',
	test,
	Component: SnapshotBaseCustomMenuItemOpen,
	ComponentKind: COMBOBOX
});

testDOMandHTML({
	name: 'Readonly Single Selection',
	test,
	Component: SnapshotReadonlySingleSelection,
	ComponentKind: COMBOBOX
});

testDOMandHTML({
	name: 'Readonly Single Selection Selected',
	test,
	Component: SnapshotReadonlySingleSelectionSelected,
	ComponentKind: COMBOBOX
});

testDOMandHTML({
	name: 'Readonly Single Selection Selected Open',
	test,
	Component: SnapshotReadonlySingleSelectionSelectedOpen,
	ComponentKind: COMBOBOX
});

testDOMandHTML({
	name: 'Readonly Multiple Selection',
	test,
	Component: SnapshotReadonlyMultipleSelection,
	ComponentKind: COMBOBOX
});

testDOMandHTML({
	name: 'Readonly Multiple Selection Single Item Selected',
	test,
	Component: SnapshotReadonlyMultipleSelectionSingleItemSelected,
	ComponentKind: COMBOBOX
});

testDOMandHTML({
	name: 'Readonly Multiple Selection Multiple Items Selected',
	test,
	Component: SnapshotReadonlyMultipleSelectionMultipleItemsSelected,
	ComponentKind: COMBOBOX
});

testDOMandHTML({
	name: 'Readonly Single Selection Custom Menu Item Open',
	test,
	Component: SnapshotReadonlySingleSelectionCustomMenuItemOpen,
	ComponentKind: COMBOBOX
});
