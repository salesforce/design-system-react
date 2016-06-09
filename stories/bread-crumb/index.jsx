import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { BREAD_CRUMB } from '../../utilities/constants';
import BreadCrumb from '../../components/bread-crumb';

storiesOf(BREAD_CRUMB, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('1 item', () => <BreadCrumb trail={[(<a href="#">Parent Entity</a>)]} />)
	.add('3 items', () => <BreadCrumb trail={[
			(<a href="#">Parent Entity</a>),
			(<a href="#">Parent Record Name 1</a>),
			(<a href="#">Parent Record Name 2</a>)
		]} />
	)
