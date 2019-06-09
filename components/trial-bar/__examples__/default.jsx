import React from 'react';
import TrialBar from '~/components/trial-bar';
import TrialBarDropdown from '~/components/trial-bar/dropdown';
import TrialBarButton from '~/components/trial-bar/button';
import IconSettings from '~/components/icon-settings';
import Button from '~/components/button';

class Example extends React.Component {
	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div>
					<TrialBar
						labels={{ timeLeft: '30', timeLeftUnit: 'days' }}
						onRenderActions={() => (
							<Button variant="success" label="Subscribe Now" />
						)}
					>
						<TrialBarButton label="Take the salesforce tour" />
						<TrialBarDropdown
							assistiveText={{ icon: 'Dropdown' }}
							id="dropdown"
							label="Choose your tour"
							options={[
								{ label: 'Conquer Your Cases', value: 'item1' },
								{ label: 'Automate For Speed', value: 'item2' },
								{ label: 'Share Your Knowledge', value: 'item3' },
								{ label: 'Finish it up in a Flash', value: 'item4' },
								{ type: 'divider' },
								{
									label: 'Import Contacts and Accounts',
									value: 'item5',
									leftIcon: { name: 'upload', category: 'utility' },
								},
							]}
							value={['item1']}
						/>
					</TrialBar>
				</div>
			</IconSettings>
		);
	}
}
Example.displayName = 'TrialBarDefault';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
