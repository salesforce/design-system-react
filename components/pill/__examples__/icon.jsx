import React, { PropTypes } from 'react';
import createReactClass from 'create-react-class';

import Pill from '~/components/pill';
import Icon from '~/components/icon';
import Avatar from '~/components/avatar';
import IconSettings from '~/components/icon-settings';

function noop () {}

const Example = createReactClass({
	displayName: 'PillWithIconExample',

	propTypes: {
		action: PropTypes.func,
	},

	getDefaultProps () {
		return {
			action: () => noop,
		};
	},

	getInitialState () {
		return {
			pill1: true,
			pill2: true,
			pill3: true,
		};
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

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<div className="slds-grid slds-grid_pull-padded-medium">
					<div className="slds-p-horizontal_medium">
						{this.state.pill1 ? (
							<Pill
								labels={{
									label: 'Pill Label',
									title: 'Full pill label verbiage mirrored here',
									removeTitle: 'Remove',
								}}
								icon={
									<Icon title="Account" category="standard" name="account" />
								}
								onClick={this.onClick}
								onRemove={(event) => this.onRemove(event, 'pill1')}
							/>
						) : null}
					</div>
					<div className="slds-p-horizontal_medium">
						{this.state.pill2 ? (
							<Pill
								labels={{
									label: 'Pill Label',
									title: 'Full pill label verbiage mirrored here',
									removeTitle: 'Remove',
								}}
								avatar={
									<Avatar
										variant="user"
										title="User avatar"
										imgSrc="https://lightningdesignsystem.com/assets/images/avatar2.jpg"
									/>
								}
								onClick={this.onClick}
								onRemove={(event) => this.onRemove(event, 'pill2')}
							/>
						) : null}
					</div>
					<div className="slds-p-horizontal_medium">
						{this.state.pill3 ? (
							<Pill
								labels={{
									label: 'Pill Label',
									title: 'Full pill label verbiage mirrored here',
									removeTitle: 'Remove',
								}}
								hasError
								icon={
									<Icon
										title="Error"
										category="utility"
										name="warning"
										className="slds-icon-text-error"
									/>
								}
								onClick={this.onClick}
								onRemove={(event) => this.onRemove(event, 'pill3')}
							/>
						) : null}
					</div>
				</div>
			</IconSettings>
		);
	},
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
