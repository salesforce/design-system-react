/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { renderMarkup, testDOMandHTML } from '../../../tests/snapshot-helpers';

import SnapshotBaseOpen from '../__examples__/snapshot/base-open';
import SnapshotBaseOpenMenuSubHeader from '../__examples__/snapshot/base-open-menu-sub-header';
import SnapshotBaseOpenMenuInheritWidthOf from '../__examples__/snapshot/base-open-menu-inheritWidthOf';
import SnapshotBaseOpenClassName from '../__examples__/snapshot/base-open-class-name';
import SnapshotBaseSelected from '../__examples__/snapshot/base-selected';
import SnapshotBaseLabelRequired from '../__examples__/snapshot/base-label-required';
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

testDOMandHTML({
	name: 'Base Open',
	test,
	Component: SnapshotBaseOpen,
});

testDOMandHTML({
	name: 'Base Selected',
	test,
	Component: SnapshotBaseSelected,
});

testDOMandHTML({
	name: 'Base Open Custom Class Name',
	test,
	Component: SnapshotBaseOpenClassName,
});

testDOMandHTML({
	name: 'Base Label Required',
	test,
	Component: SnapshotBaseLabelRequired,
});

testDOMandHTML({
	name: 'Base Open Menu Sub Header',
	test,
	Component: SnapshotBaseOpenMenuSubHeader,
});

testDOMandHTML({
	name: 'Base Open Menu Inherit Width Of Menu',
	test,
	Component: SnapshotBaseOpenMenuInheritWidthOf,
});

testDOMandHTML({
	name: 'Inline Single Selection',
	test,
	Component: SnapshotInlineSingleSelection,
});

testDOMandHTML({
	name: 'Inline Single Selection Selected',
	test,
	Component: SnapshotInlineSingleSelectionSelected,
});

testDOMandHTML({
	name: 'Inline Multiple Selection',
	test,
	Component: SnapshotInlineMultipleSelection,
});

testDOMandHTML({
	name: 'Inline Multiple Selection Selected',
	test,
	Component: SnapshotInlineMultipleSelectionSelected,
});

testDOMandHTML({
	name: 'Base Custom Menu Item Open',
	test,
	Component: SnapshotBaseCustomMenuItemOpen,
});

testDOMandHTML({
	name: 'Readonly Single Selection',
	test,
	Component: SnapshotReadonlySingleSelection,
});

testDOMandHTML({
	name: 'Readonly Single Selection Selected',
	test,
	Component: SnapshotReadonlySingleSelectionSelected,
});

testDOMandHTML({
	name: 'Readonly Single Selection Selected Open',
	test,
	Component: SnapshotReadonlySingleSelectionSelectedOpen,
});

testDOMandHTML({
	name: 'Readonly Multiple Selection',
	test,
	Component: SnapshotReadonlyMultipleSelection,
});

testDOMandHTML({
	name: 'Readonly Multiple Selection Single Item Selected',
	test,
	Component: SnapshotReadonlyMultipleSelectionSingleItemSelected,
});

testDOMandHTML({
	name: 'Readonly Multiple Selection Multiple Items Selected',
	test,
	Component: SnapshotReadonlyMultipleSelectionMultipleItemsSelected,
});

testDOMandHTML({
	name: 'Readonly Single Selection Custom Menu Item Open',
	test,
	Component: SnapshotReadonlySingleSelectionCustomMenuItemOpen,
});
