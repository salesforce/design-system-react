/* eslint-disable indent */

import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { POPOVER_TOOLTIP } from '../../utilities/constants';
import PopoverTooltip from '../../components/popover-tooltip';

const getPopoverTooltip = props => (
	<PopoverTooltip {...props}>
		<span>Trigger Tooltip</span>
	</PopoverTooltip>
);

storiesOf(POPOVER_TOOLTIP, module)
	.addDecorator(getStory => <div className="slds-p-around--medium slds-m-horizontal--x-large" style={{'marginLeft': '200px'}}>{getStory()}</div>)
	.add('tooltip', () => getPopoverTooltip({ align: 'bottom', id: 'myPopoverId', content: 'wjeifowejfiwoefjweoifjweiofjweiofwjefiowejfiowejfiowefjweiofjweiofjweiofjiwoefjowiefjoiwejfiowejfoie' }))
