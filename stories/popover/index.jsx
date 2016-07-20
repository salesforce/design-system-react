/* eslint-disable indent */

import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { POPOVER_TOOLTIP } from '../../utilities/constants';
import PopoverTooltip from '../../components/popover-tooltip';

const getPopoverTooltip = props => (
	<PopoverTooltip {...props}>
		<a href='#'>Trigger Tooltip</a>
	</PopoverTooltip>
);

storiesOf(POPOVER_TOOLTIP, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('tooltip', () => getPopoverTooltip({ align: 'bottom', content: 'tooltip content' }))
