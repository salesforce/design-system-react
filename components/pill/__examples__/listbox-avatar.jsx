import React from 'react';

import ListboxOfPillOptions from '~/components/pill/listbox-of-pill-options';
import IconSettings from '~/components/icon-settings';

class Example extends React.Component {
	static displayName = 'PillWithAvatarListboxExample';

	constructor(props) {
		super(props);

		this.state = {
			options: [
				{
					avatar: {
						imgSrc:
							'https://lightningdesignsystem.com/assets/images/avatar1.jpg',
						title: 'User 1',
					},
					id: '1',
					label: 'Pill Label 1',
					title: 'Full pill label verbiage mirrored here',
				},
				{
					avatar: {
						imgSrc:
							'https://lightningdesignsystem.com/assets/images/avatar2.jpg',
						title: 'User 2',
					},
					id: '2',
					label: 'Pill Label 2',
					title: 'Full pill label verbiage mirrored here',
				},
			],
		};
	}

	onClickPill = (event, item) => {
		if (window && window.console && window.console.log) {
			console.log('onClickPill: ', event, item);
		}
	};

	onRemovePill = (event, item) => {
		const options = this.state.options.filter(
			(option) => option.id !== item.id
		);
		this.setState({ options });
		if (window && window.console && window.console.log) {
			console.log('onRemovePill: ', event, item);
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
