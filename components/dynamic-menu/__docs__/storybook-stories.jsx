import React from 'react';
import { storiesOf } from '@storybook/react';
import IconSettings from '../../icon-settings';

// import DynamicMenu from '../../dynamic-menu';
import { DYNAMIC_MENU } from '../../../utilities/constants';


import Base from '../__examples__/base';

storiesOf(DYNAMIC_MENU, module)
	.addDecorator((getStory) => <div className="slds-p-around--medium"><IconSettings iconPath="/assets/icons">{getStory()}</IconSettings></div>)
	.add('Base', () => (<Base availableItems={[1, 2, 3]} />));
