import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { COMBOBOX } from '../../utilities/constants';

import Base from './base';
import PredefinedOptionsOnly from './base-predefined-options-only';
import InlineSingle from './inline-single';
import InlineMultiple from './inline-multiple';
import ReadOnly from './readonly-single';
import ReadOnlyMultiple from './readonly-multiple';
import SnapshotBaseOpen from './snapshot/base-open';
import SnapshotBaseSelected from './snapshot/base-selected';
import SnapshotInlineSingleSelection from './snapshot/inline-single-selection';
import SnapshotInlineSingleSelectionSelected from './snapshot/inline-single-selection-selected';
import SnapshotInlineMultipleSelection from './snapshot/inline-multiple-selection';
import SnapshotInlineMultipleSelectionSelected from './snapshot/inline-multiple-selection-selected';
import SnapshotReadonlySingleSelection from './snapshot/readonly-single-selection';
import SnapshotReadonlySingleSelectionSelected from './snapshot/readonly-single-selection-selected';
import SnapshotReadonlySingleSelectionSelectedOpen from './snapshot/readonly-single-selection-selected-open';
import SnapshotReadonlyMultipleSelection from './snapshot/readonly-multiple-selection';
import SnapshotReadonlyMultipleSelectionSingleItemSelected from './snapshot/readonly-multiple-selection-single-item-selected';
import SnapshotReadonlyMultipleSelectionMultipleItemsSelected from './snapshot/readonly-multiple-selection-multiple-items-selected';

storiesOf(COMBOBOX, module)
	.addDecorator((getStory) => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Base', () => (<Base action={action} />))
	.add('Base Pre-defined Options Only', () => (<PredefinedOptionsOnly action={action} />))
	.add('Inline Single Selection', () => (<InlineSingle action={action} />))
	.add('Inline Multiple Selection', () => (<InlineMultiple action={action} />))
	.add('Readonly Single Selection', () => (<ReadOnly action={action} />))
	.add('Readonly Multiple Selection', () => (<ReadOnlyMultiple action={action} />))
	.add('Snapshot Base Open', () => (<SnapshotBaseOpen action={action} />))
	.add('Snapshot Base Selected', () => (<SnapshotBaseSelected action={action} />))
	.add('Snapshot Inline Single Selection', () => (<SnapshotInlineSingleSelection action={action} />))
	.add('Snapshot Inline Single Selection Selected', () => (<SnapshotInlineSingleSelectionSelected action={action} />))
	.add('Snapshot Inline Multiple Selection', () => (<SnapshotInlineMultipleSelection action={action} />))
	.add('Snapshot Inline Multiple Selection Selected', () => (<SnapshotInlineMultipleSelectionSelected action={action} />))
	.add('Snapshot Readonly Single Selection', () => (<SnapshotReadonlySingleSelection action={action} />))
	.add('Snapshot Readonly Single Selection Selected', () => (<SnapshotReadonlySingleSelectionSelected action={action} />))
	.add('Snapshot Readonly Single Selection Selected Open', () => (<SnapshotReadonlySingleSelectionSelectedOpen action={action} />))
	.add('Snapshot Readonly Multiple Selection', () => (<SnapshotReadonlyMultipleSelection action={action} />))
	.add('Snapshot Readonly Multiple Selection Single Item Selected', () => (<SnapshotReadonlyMultipleSelectionSingleItemSelected action={action} />))
	.add('Snapshot Readonly Multiple Selection Multiple Items Selected', () => (<SnapshotReadonlyMultipleSelectionMultipleItemsSelected action={action} />));
