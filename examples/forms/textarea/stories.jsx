import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { FORMS_TEXTAREA } from '../../../utilities/constants';
import Textarea from '../../../components/forms/textarea';


storiesOf(FORMS_TEXTAREA, module)
    .addDecorator((getStory) => <div className="slds-p-around--medium">{getStory()}</div>)
    .add('Standard', () => (
        <Textarea
            label="Textarea Label"
            name="standard-textarea"
            placeholder="Placeholder Text"
        />
    ))
    .add('Disabled', () => (
        <Textarea
            name="disabled"
            label="Textarea Label"
            disabled
            placeholder="Placeholder Text"
        />
    ))
    .add('Required', () => (
        <Textarea
            aria-describedby="required-1"
            name="required-textarea"
            label="Textarea Label"
            required
            placeholder="Placeholder Text"
        />
    ))
    .add('Error', () => (
        <Textarea
            aria-describedby="error-1"
            name="required-textarea-error"
            label="Textarea Label"
            required
            errorText="Error Message"
            placeholder="Placeholder Text"
        />
    ));
