import React, { PropTypes } from 'react';
import createReactClass from 'create-react-class';

import Pill from '~/components/pill';
import IconSettings from '~/components/icon-settings';

function noop () {}

const Example = createReactClass({
	displayName: 'BasePillExample',

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
			linked: true,
			unlinked: true,
			truncated: true,
		};
	},

	onClick (event) {
		this.props.action('onClick')(event);
	},

	onRemoveLinked (event) {
		this.props.action('onRemove')(event);
		this.setState({
			linked: false,
		});
	},

	onRemoveUnlinked (event) {
		this.props.action('onRemove')(event);
		this.setState({
			unlinked: false,
		});
	},

	onRemoveTruncated (event) {
		this.props.action('onRemove')(event);
		this.setState({
			truncated: false,
		});
	},

	renderLinked () {
		if (this.state.linked) {
			return (
				<Pill
					labels={{
						label: 'Pill Label',
						title: 'Full pill label verbiage mirrored here',
						removeTitle: 'Remove',
					}}
					onClick={this.onClick}
					onRemove={this.onRemoveLinked}
				/>
			);
		}
		return null;
	},

	renderUnlinked () {
		if (this.state.unlinked) {
			return (
				<Pill
					labels={{
						label: 'Pill Label',
						title: 'Full pill label verbiage mirrored here',
						removeTitle: 'Remove',
					}}
					onRemove={this.onRemoveUnlinked}
				/>
			);
		}
		return null;
	},

	renderTruncated () {
		if (this.state.truncated) {
			return (
				<div style={{ width: '220px', position: 'relative' }}>
					<div className="slds-pill_container">
						<Pill
							labels={{
								label:
									'Pill label that is longer than the area that contains it',
								removeTitle: 'Remove',
							}}
							onClick={this.onClick}
							onRemove={this.onRemoveTruncated}
						/>
					</div>
				</div>
			);
		}
		return null;
	},

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<div className="slds-grid slds-grid_pull-padded-medium">
					<div className="slds-p-horizontal_medium">{this.renderLinked()}</div>
					<div className="slds-p-horizontal_medium">
						{this.renderUnlinked()}
					</div>
					<div className="slds-p-horizontal_medium">
						{this.renderTruncated()}
					</div>
				</div>
			</IconSettings>
		);
	},
});

export default Example;
