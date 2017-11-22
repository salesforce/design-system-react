import React from 'react';
import { storiesOf } from '@storybook/react';

import { ICON_SETTINGS } from '../../utilities/constants';

import Sprite from './sprite';
import IconPath from './iconPath';


storiesOf(ICON_SETTINGS, module)
.addDecorator((getStory) => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Base: Icon path', () => (<IconPath />))
	.add('Base: Sprite imports', () => (<Sprite />));
