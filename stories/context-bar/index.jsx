import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { CONTEXT_BAR } from '../../utilities/constants';

import { dropdownCollection, propSets } from '../../utilities/sample-data/context-bar';

import ContextBar from '../../components/context-bar';
import ContextBarRegion from '../../components/context-bar/region';
import ContextBarDropdown from '../../components/context-bar/dropdown';
import ContextBarLink from '../../components/context-bar/link';

// abstracted to allow copy and paste from component tests
const applicationNameClicked = action;
const linkClicked = action;
const dropdownItemClicked = action;

/* eslint-disable react/display-name */
const getContextBar = (props, primaryRegionProps) => (
	<ContextBar {...props}>
		<ContextBarRegion
			region="primary"
			applicationNameOnClick={applicationNameClicked('Application name clicked (Open Application Switcher).')}
			{...primaryRegionProps}
		/>
		<ContextBarRegion region="secondary" navigation>
			<ContextBarLink
				href="#"
				label="Home"
				id="home-link"
				onClick={linkClicked('Home link clicked')}
			/>
			<ContextBarDropdown
				id="primaryDropdown"
				label="Context Menu Item 1"
				onSelect={dropdownItemClicked('Dropdown Menu Item clicked')}
				options={dropdownCollection}
			/>
			<ContextBarLink
				href="#"
				label="Context Menu Item 2"
				onClick={linkClicked('Link clicked')}
			/>
		</ContextBarRegion>
		<ContextBarRegion region="tertiary">
			<ContextBarLink
				href="#"
				label="Actions"
				onClick={linkClicked('Link clicked')}
			/>
		</ContextBarRegion>
	</ContextBar>
);

storiesOf(CONTEXT_BAR, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Base', () => getContextBar(propSets.base.props, propSets.base.primaryRegionProps))
	.add('Custom Cloud', () => getContextBar(propSets.customCloud.props, propSets.customCloud.primaryRegionProps
))
	.add('Light Theme', () => getContextBar(propSets.lightTheme.props, propSets.lightTheme.primaryRegionProps));

