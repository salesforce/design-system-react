import React, { PropTypes } from 'react';
import createReactClass from 'create-react-class';

import Pill from '~/components/pill';
import Avatar from '~/components/avatar';
import IconSettings from '~/components/icon-settings';

function noop () {}

const Example = createReactClass({
	displayName: 'PillWithAvatarListboxExample',

	propTypes: {
		action: PropTypes.func,
	},

	getDefaultProps () {
		return {
			action: () => noop,
		};
	},

	onClick (event) {
		this.props.action('onClick')(event);
	},

	onRemove (event) {
		this.props.action('onRemove')(event);
	},

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<div>
					<div className="slds-p-vertical_medium">
						<h3 className="slds-text-heading_small">Static Examples</h3>
					</div>
					<div className="slds-grid slds-grid_vertical-align-start">
						<div className="slds-pill_container">
							<ul
								className="slds-listbox slds-listbox_horizontal slds-listbox_inline"
								role="listbox"
								aria-label="Selected Options:"
								aria-orientation="horizontal"
							>
								<li className="slds-listbox-item" role="presentation">
									<Pill
										labels={{
											label: 'Pill Label',
											title: 'Full pill label verbiage mirrored here',
											removeTitle: 'Remove',
										}}
										assistiveText={{
											remove: 'Press delete or backspace to remove',
										}}
										tabIndex="0"
										variant="option"
										avatar={
											<Avatar
												variant="user"
												title="User avatar"
												imgSrc="https://lightningdesignsystem.com/assets/images/avatar2.jpg"
											/>
										}
										onClick={this.onClick}
										onRemove={this.onRemove}
									/>
								</li>
								<li className="slds-listbox-item" role="presentation">
									<Pill
										labels={{
											label: 'Pill Label',
											title: 'Full pill label verbiage mirrored here',
											removeTitle: 'Remove',
										}}
										assistiveText={{
											remove: 'Press delete or backspace to remove',
										}}
										tabIndex="0"
										variant="option"
										avatar={
											<Avatar
												variant="user"
												title="User avatar"
												imgSrc="https://lightningdesignsystem.com/assets/images/avatar2.jpg"
											/>
										}
										onClick={this.onClick}
										onRemove={this.onRemove}
									/>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</IconSettings>
		);
	},
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
