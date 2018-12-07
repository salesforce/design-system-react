import React from 'react';

import IconSettings from '~/components/icon-settings';
import PillContainer from '~/components/pill-container';

class Example extends React.Component {
	static displayName = 'BarePillContainerExample';

	constructor(props) {
		super(props);

		this.state = {
			options: [
				{
					id: '1',
					label: 'Pill Label 1',
					title: 'Full pill label verbiage mirrored here',
				},
				{
					id: '2',
					label: 'Pill Label 2',
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
							id="bare-pill-container"
							options={this.state.options}
							onClickPill={this.onClickPill}
							onRequestRemovePill={this.onRequestRemovePill}
							variant="bare"
						/>
					</div>
				</div>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
