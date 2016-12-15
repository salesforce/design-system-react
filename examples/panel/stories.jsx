import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { PANEL } from '../../utilities/constants';
import Filters from './filters';

storiesOf(PANEL, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Filters', () => <Filters />);
