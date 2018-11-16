import React from 'react';

import ListboxOfPillOptions from '~/components/pill/listbox-of-pill-options';
import IconSettings from '~/components/icon-settings';

class Example extends React.Component {
	static displayName = 'PillWithIconListboxExample';

	constructor(props) {
		super(props);

		this.state = {
			options: [
				{
					icon: {
						category: 'standard',
						name: 'account',
					},
					id: '1',
					label: 'Pill Label 1',
					title: 'Full pill label verbiage mirrored here',
				},
				{
					icon: {
						category: 'standard',
						name: 'case',
					},
					id: '2',
					label: 'Pill Label 2',
					title: 'Full pill label verbiage mirrored here',
				},
				{
					icon: {
						category: 'utility',
						name: 'retweet',
					},
					id: '3',
					label: 'Pill Label 3',
					title: 'Full pill label verbiage mirrored here',
				},
				{
					icon: {
						category: 'standard',
						name: 'solution',
					},
					id: '4',
					label: 'Pill Label 4',
					title: 'Full pill label verbiage mirrored here',
				},
				{
					icon: {
						category: 'standard',
						name: 'custom_notification',
					},
					id: '5',
					label: 'Pill Label 5',
					title: 'Full pill label verbiage mirrored here',
				},
				{
					icon: {
						category: 'standard',
						name: 'email',
					},
					id: '6',
					label: 'Pill Label 6',
					title: 'Full pill label verbiage mirrored here',
				},
				{
					icon: {
						category: 'standard',
						name: 'endorsement',
					},
					id: '7',
					label: 'Pill Label 7',
					title: 'Full pill label verbiage mirrored here',
				},
				{
					icon: {
						category: 'standard',
						name: 'recent',
					},
					id: '8',
					label: 'Pill Label 8',
					title: 'Full pill label verbiage mirrored here',
				},
				{
					icon: {
						category: 'custom',
						name: 'custom31',
					},
					id: '9',
					label: 'Pill Label 9',
					title: 'Full pill label verbiage mirrored here',
				},
			],
		};
	}

	onClickPill = (event, data) => {
		if (window && window.console && window.console.log) {
			console.log('onClickPill: ', event, data);
		}
	};

	onRemovePill = (event, data) => {
		const options = this.state.options.filter(
			(option) => option.id !== data.option.id
		);
		this.setState({ options });
		if (window && window.console && window.console.log) {
			console.log('onRemovePill: ', event, data);
		}
	};

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div>
					<div className="slds-p-vertical_medium">
						<h3 className="slds-text-heading_small">Static Examples</h3>
					</div>
					<div className="slds-grid slds-grid_vertical-align-start">
						<ListboxOfPillOptions
							options={this.state.options}
							onClickPill={this.onClickPill}
							onRemovePill={this.onRemovePill}
						/>
					</div>
				</div>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
