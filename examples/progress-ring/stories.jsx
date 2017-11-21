import React from 'react';
import { storiesOf } from '@storybook/react';
import { PROGRESS_RING } from '../../utilities/constants';
import Base from './base';
import Complete from './complete';
import Warning from './warning';
import Expired from './expired';
import CustomIcon from './customIcon';

storiesOf(PROGRESS_RING, module)
.addDecorator((getStory) => <div className="slds-p-around--medium">{getStory()}</div>)
.add('Base', () => (<Base />))
.add('Theme: Complete', () => (<Complete />))
.add('Theme: Warning', () => (<Warning />))
.add('Theme: Expired', () => (<Expired />))
.add('Custom Icon', () => (<CustomIcon />));
