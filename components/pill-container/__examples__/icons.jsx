import React from 'react';

import Icon from '~/components/icon';
import IconSettings from '~/components/icon-settings';
import PillContainer from '~/components/pill-container';

class Example extends React.Component {
	static displayName = 'PillContainerWithIconsExample';

	constructor(props) {
		super(props);

		this.state = {
			options: [
				{
					icon: <Icon category="standard" name="account" title="Account" />,
					id: '1',
					label: 'Pill Label 1',
					title: 'Full pill label verbiage mirrored here',
				},
				{
					icon: <Icon category="standard" name="case" title="Case" />,
					id: '2',
					label: 'Pill Label 2',
					title: 'Full pill label verbiage mirrored here',
				},
				{
					icon: <Icon category="utility" name="retweet" title="Retweet" />,
					id: '3',
					label: 'Pill Label 3',
					title: 'Full pill label verbiage mirrored here',
				},
				{
					icon: <Icon category="standard" name="solution" title="Solution" />,
					id: '4',
					label: 'Pill Label 4',
					title: 'Full pill label verbiage mirrored here',
				},
				{
					icon: (
						<Icon
							category="standard"
							name="custom_notification"
							title="Custom Notification"
						/>
					),
					id: '5',
					label: 'Pill Label 5',
					title: 'Full pill label verbiage mirrored here',
				},
				{
					icon: <Icon category="standard" name="email" title="Email" />,
					id: '6',
					label: 'Pill Label 6',
					title: 'Full pill label verbiage mirrored here',
				},
				{
					icon: (
						<Icon category="standard" name="endorsement" title="Endorsement" />
					),
					id: '7',
					label: 'Pill Label 7',
					title: 'Full pill label verbiage mirrored here',
				},
				{
					icon: <Icon category="standard" name="recent" title="Recent" />,
					id: '8',
					label: 'Pill Label 8',
					title: 'Full pill label verbiage mirrored here',
				},
				{
					icon: <Icon category="custom" name="custom31" title="Custom 31" />,
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

	onRequestRemovePill = (event, data) => {
		const options = this.state.options.filter(
			(option) => option.id !== data.option.id
		);
		this.setState({ options });
		if (window && window.console && window.console.log) {
			console.log('onRequestRemovePill: ', event, data);
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
						<PillContainer
							id="pill-container-with-icons"
							options={this.state.options}
							onClickPill={this.onClickPill}
							onRequestRemovePill={this.onRequestRemovePill}
						/>
					</div>
				</div>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
