/* eslint-disable react/display-name */

import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { POPOVER_TOOLTIP } from '../../utilities/constants';
import PopoverTooltip from '../../components/popover-tooltip';

import Button from '../../components/button';

const getPopoverTooltip = props => (
	<PopoverTooltip {...props}>
		<Button label="Trigger Tooltip" />
	</PopoverTooltip>
);

storiesOf(POPOVER_TOOLTIP, module)
	.addDecorator(getStory => <div
		className="slds-p-around--medium slds-m-horizontal--x-large"
		style={{ marginLeft: '200px' }}
	>{getStory()}</div>)
	.add('Base', () => getPopoverTooltip({
		align: 'bottom',
		id: 'myPopoverId',
		content: 'wjeifowejfiwoefjweoifjweiofjweiofwjefiowejfiowejfiowefjweiofjweiofjweiofjiwoefjowiefjoiwejfiowejfoie'
	}))
	.add('Open by default', () => getPopoverTooltip({
		align: 'bottom',
		openByDefault: true,
		id: 'myPopoverId',
		content: 'wjeifowejfiwoefjweoifjweiofjweiofwjefiowejfiowejfiowefjweiofjweiofjweiofjiwoefjowiefjoiwejfiowejfoie'
	}));
