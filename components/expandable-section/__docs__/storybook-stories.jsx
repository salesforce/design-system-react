import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconSettings from '../../icon-settings';

import { EXPANDABLE_SECTION } from '../../../utilities/constants';
import ExpandableSection from '../';

import DefaultExample from '../__examples__/default';

/* eslint-disable max-len */
const ipsum =
	'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit ametrisus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis risus eget urna mollis ornare vel eu leo.';
/* eslint-enable max-len */

class DemoExpandableSectionControlled extends React.Component {
	static displayName = 'DemoExpandableSectionControlled';

	constructor(props) {
		super(props);
		this.state = {
			isOpen: true,
		};
	}

	render() {
		return (
			<ExpandableSection
				id="controlled-expandable-section"
				isOpen={this.state.isOpen}
				onToggleOpen={(event, data) => {
					console.log('got here! ', event, data);
					action('Toggle expandable section!');
					this.setState({ isOpen: !this.state.isOpen });
				}}
				title="Section Title"
			>
				<p>{ipsum}</p>
			</ExpandableSection>
		);
	}
}

storiesOf(EXPANDABLE_SECTION, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Default', () => <DefaultExample />)
	.add('Controlled', () => <DemoExpandableSectionControlled />)
	.add('Non-collapsible', () => (
		<ExpandableSection
			id="non-collapsible-expandable-section"
			nonCollapsible
			title="Section Title"
		>
			<p>{ipsum}</p>
		</ExpandableSection>
	));
