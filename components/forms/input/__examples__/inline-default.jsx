import React from 'react';
import createReactClass from 'create-react-class';
import IconSettings from '~/components/icon-settings';
import InlineEdit from '~/components/forms/input/inline'; // `~` is replaced with design-system-react at runtime

const Example = createReactClass({
	displayName: 'InlineEditExample',

	getInitialState () {
		return {
			value: 'Edit me inline',
		};
	},

	handleChange (eventProps) {
		this.setState({ value: eventProps.value });
	},

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<section className="slds-grid slds-grid--pull-padded slds-grid--vertical-align-center">
					<div className="slds-col--padded">
						<h1 className="slds-text-title_caps slds-p-vertical--medium">
							Base Input with visible label
						</h1>
						<InlineEdit
							id="inline-edit-example-1"
							value={this.state.value}
							onChange={this.handleChange}
						/>
					</div>
					<div className="slds-col--padded">
						<h1 className="slds-text-title_caps slds-p-vertical--medium">
							Disabled Base Input
						</h1>
						<InlineEdit
							disabled
							id="inline-edit-example-2"
							value={this.state.value}
							onChange={this.handleChange}
						/>
					</div>
				</section>
			</IconSettings>
		);
	},
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
