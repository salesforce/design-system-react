import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { AVATAR } from '../../utilities/constants';
import Base from './base';

storiesOf(AVATAR, module)
  .addDecorator((getStory) => <div className="slds-p-around--medium">{getStory()}</div>)
  .add('Base', () => <Base />);
