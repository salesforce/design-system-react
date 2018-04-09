import React, { PropTypes } from 'react';
import createReactClass from 'create-react-class';

import Pill from '~/components/pill';
import Icon from '~/components/icon';
import IconSettings from '~/components/icon-settings';

const PILLS = [
	{
		category: 'standard',
		name: 'account',
	},
	{
		category: 'standard',
		name: 'case',
	},
	{
		category: 'utility',
		name: 'retweet',
	},
	{
		category: 'standard',
		name: 'solution',
	},
	{
		category: 'standard',
		name: 'custom_notification',
	},
	{
		category: 'standard',
		name: 'email',
	},
	{
		category: 'standard',
		name: 'endorsement',
	},
	{
		category: 'standard',
		name: 'recent',
	},
	{
		category: 'custom',
		name: 'custom31',
	},
];

function noop () {}

const Example = createReactClass({
	displayName: 'PillWithIconListboxExample',

	propTypes: {
		action: PropTypes.func,
	},

	getDefaultProps () {
		return {
			action: () => noop,
		};
	},

	getInitialState () {
		return this.getAllOn();
	},

	onClick (event) {
		this.props.action('onClick')(event);
	},

	onRemove (event, pill) {
		this.props.action('onRemove')(event);
		this.setState({
			[pill]: false,
		});
	},

	getAllOn () {
		return PILLS.reduce((result, item, index) => {
			result['pill' + index] = true;
			return result;
		}, {});
	},

	renderListItem (icon, index) {
		if (this.state['pill' + index]) {
			return (
				<li className="slds-listbox-item" role="presentation" key={index}>
					<Pill
						labels={{
							label: 'Pill Label',
							title: 'Full pill label verbiage mirrored here',
							removeTitle: 'Remove',
						}}
						assistiveText={{
							remove: 'Press delete or backspace to remove',
						}}
						variant="option"
						icon={
							<Icon title="Title" category={icon.category} name={icon.name} />
						}
						onClick={this.onClick}
						onRemove={() => this.onRemove(event, 'pill' + index)}
					/>
				</li>
			);
		}
		return null;
	},

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<div>
					<div className="slds-grid slds-grid_vertical-align-start">
						<div className="slds-pill_container">
							<ul
								className="slds-listbox slds-listbox_horizontal slds-listbox_inline"
								role="listbox"
								aria-label="Selected Options:"
								aria-orientation="horizontal"
							>
								{PILLS.map(this.renderListItem)}
							</ul>
						</div>
					</div>
				</div>
			</IconSettings>
		);
	},
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
