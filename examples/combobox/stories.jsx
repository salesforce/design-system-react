import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { COMBOBOX } from '../../utilities/constants';

import Default from './default';
import AutoCompleteSnapshotOpen from './autocomplete-snapshot-open';
import AutoCompleteSnapshotSelected from './autocomplete-snapshot-selected';

storiesOf(COMBOBOX, module)
	.addDecorator((getStory) => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('AutoComplete', () => (<Default action={action} />))
	.add('AutoComplete Snapshot Open', () => (<AutoCompleteSnapshotOpen action={action} />))
	.add('AutoComplete Snapshot Selected', () => (<AutoCompleteSnapshotSelected action={action} />));
