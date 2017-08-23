import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { COMBOBOX } from '../../utilities/constants';

import Default from './default';
import PredefinedOptionsOnly from './default-predefined-options-only';
import InlineSingle from './inline-single';
import InlineMultiple from './inline-multiple';
import ReadOnly from './readonly-single';
import ReadOnlyMultiple from './readonly-multiple';
import AutoCompleteSnapshotOpen from './autocomplete-snapshot-open';
import AutoCompleteSnapshotSelected from './autocomplete-snapshot-selected';

storiesOf(COMBOBOX, module)
	.addDecorator((getStory) => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Base', () => (<Default action={action} />))
	.add('Base Pre-defined Options Only', () => (<PredefinedOptionsOnly action={action} />))
	.add('Inline Single Selection', () => (<InlineSingle action={action} />))
	.add('Inline Multiple Selection', () => (<InlineMultiple action={action} />))
	.add('Readonly Single', () => (<ReadOnly action={action} />))
	.add('Readonly Multiple', () => (<ReadOnlyMultiple action={action} />))
	.add('AutoComplete Snapshot Open', () => (<AutoCompleteSnapshotOpen action={action} />))
	.add('AutoComplete Snapshot Selected', () => (<AutoCompleteSnapshotSelected action={action} />));
