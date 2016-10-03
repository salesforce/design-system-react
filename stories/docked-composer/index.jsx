/* eslint-disable indent */

import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { DOCKED_COMPOSER } from '../../utilities/constants';
import DockedComposer from '../../components/docked-composer';

const getDockedComposer = props => (
	<DockedComposer
		{...props}
		onPrimaryActionClick={action('click')}
	/>
);

storiesOf(DOCKED_COMPOSER, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)

	.add('Base', () => getDockedComposer({
							popout: {true},
							headerIconName: 'call',
							isOpen: true,
							primaryActionLabel: 'Action',
							title: 'Base'
						}))
	