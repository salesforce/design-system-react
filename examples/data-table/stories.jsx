import React from 'react';
import { storiesOf, action } from '@storybook/react';
import IconSettings from '../../components/iconSettings';

import { DATA_TABLE } from '../../utilities/constants';

import Advanced from './advanced';
import Basic from './basic';

storiesOf(DATA_TABLE, module)
	.addDecorator((getStory) => <div className="slds-p-around--medium"><IconSettings iconPath="/assets/icons">{getStory()}</IconSettings></div>)
	.add('Basic (Fluid Layout)', () => <Basic />)
	.add('Advanced (Fixed Layout)', () => <Advanced log={action} />);
