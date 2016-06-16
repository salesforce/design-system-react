import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { ICON } from '../../utilities/constants';
import Icon from '../../components/icon';
import UtilityIcon from '../../components/utilities/utility-icon';

storiesOf(ICON, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Small Icon', () => <Icon
		assistiveText="Favorite"
		category="custom"
		name="custom1"
		size="small"
	/>)
	.add('Standard Icon', () => <Icon
		assistiveText="Accounts"
		category="standard"
		name="account"
	/>)
	.add('Utility Icon', () => <Icon
		assistiveText="Location"
		category="utility"
		inverse={false}
		className="slds-m-around--x-small"
		name="location"
	/>)
	.add('Round Action Icon', () => (
		<span className="slds-icon_container slds-icon_container--circle slds-icon-action-announcement" title="description of icon when needed">
			<UtilityIcon
				aria-hidden
				category="action"
				name="announcement"
				className="slds-icon slds-icon--small"
			/>
			<span className="slds-assistive-text">Description of icon</span>
		</span>)
	)
	.add('Large Action Icon', () => <Icon
		assistiveText="Approval"
		category="action"
		className="slds-m-around--x-small"
		name="approval"
		size="large"
	/>);
