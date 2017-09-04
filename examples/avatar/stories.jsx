import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { AVATAR } from '../../utilities/constants';
import Base from './base';
import UserIcon from './user-icon.jsx';
import UserInitials from './user-initials.jsx';
import EntityIcon from './entity-icon.jsx';
import EntityInitials from './entity-initials.jsx';

storiesOf(AVATAR, module)
  .addDecorator((getStory) => <div className="slds-p-around--medium">{getStory()}</div>)
  .add('Base', () => <Base />)
  .add('Entity Icon', () => <EntityIcon />)
  .add('Entity Initials', () => <EntityInitials />)
  .add('User Icon', () => <UserIcon />)
  .add('User Initials', () => <UserInitials />);
