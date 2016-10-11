import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { FORMS_CHECKBOX } from '../../../utilities/constants';
import Checkbox from '../../../components/forms/checkbox';

storiesOf(FORMS_CHECKBOX, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Checkbox', () => (
		<Checkbox
			assistiveText="Checkbox"
			label="Checkbox Label"
			name="checkbox-example-standard"
		/>
	))
	.add('Checkbox (indeterminate)', () => (
		<Checkbox
			assistiveText="Checkbox (indeterminate)"
			label="Checkbox Label"
			name="checkbox-example-standard-indeterminate"
			indeterminate={true}
		/>
	))
	.add('Checkbox (checked)', () => (
		<Checkbox
			assistiveText="Checkbox (checked)"
			label="Checkbox Label"
			name="checkbox-example-standard-checked"
			checked
		/>
	))
	;
