import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { SCHEDULER } from '../../utilities/constants';
import Default from './default';

/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

storiesOf(SCHEDULER, module)
	.add('Default', () => (<Default />));
