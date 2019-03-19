/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utilities/class-names';
import Icon from '../icon';
import IconSettings from '../icon-settings'
import { ACTIVITY_TIMELINE_ACTIVITY } from '../../utilities/constants';

const propTypes = {
	/**
	 * CSS class names to be added to the container element. `array`, `object`, or `string` are accepted.
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Type of activity. `call`, `email`, `event` or `task` are accepted.
	 */
	type: PropTypes.oneOf(['call','email','event','task']).isRequired,
	/**
	 * Title for the activity
	 */
	title: PropTypes.object.isRequired,
	/**
	 * Short description of activity
	 */
	action: PropTypes.object.isRequired,
	/**
	 * Time of posting the activity
	 */
	time: PropTypes.string.isRequired,
	/**
	 * Detailed description of the Activity
	 */
	description: PropTypes.string,

	name: PropTypes.object,
	sender: PropTypes.object,
	recipient: PropTypes.object,
	location: PropTypes.object,
	attendees: PropTypes.object,
	related: PropTypes.object,
	when: PropTypes.object,

	/**
	 * Whether to show recurring icon on activity
	 */
	isRecurring: PropTypes.bool,
	/**
	 * Whether to show group email icon on activity
	 */
	groupEmail: PropTypes.bool,
	/**
	 * Whether to show attachment icon on activity
	 */
	hasAttachment: PropTypes.bool,
	/**
	 * Whether the activity should be collapsed on default
	 */
	collapsed: PropTypes.bool,
};

const defaultProps = {
	isRecurring: false,
	groupEmail: false,
	hasAttachment: false,
	collapsed: true,
};

class Activity extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: this.props.collapsed
		};
	}

	getIcon = () => {
		if(this.props.type === 'call') { return "log_a_call"; }
		return this.props.type
	};

	expand = () => {
		 if (this.state.collapsed) { this.setState({ collapsed: false }) }
		 else { this.setState({ collapsed: true }) }
	};

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<li>
					<div className={classNames(
				'slds-timeline__item_expandable',
							`slds-timeline__item_${this.props.type}`,
							( this.state.collapsed ? '' : 'slds-is-open'),
							this.props.className
					)}>
						<span className="slds-assistive-text">{this.props.type}</span>
						<div className="slds-media">
							<div className="slds-media__figure">
								<button
									className="slds-button slds-button_icon"
									onClick={this.expand}
								>
									<Icon
										assistiveText={{ label: 'Expand' }}
										category="utility"
										name={this.state.collapsed ? 'chevronright' : 'switch' }
										size="x-small"
									/>
								</button>
								<div className="slds-icon_container slds-icon-standard-event slds-timeline__icon" title={this.props.type}>
									<Icon
										assistiveText={{ label: this.props.type }}
										category="standard"
										name={this.getIcon()}
										size="small"
									/>
								</div>
							</div>
							<div className="slds-media__body">
								<div className="slds-grid slds-grid_align-spread slds-timeline__trigger">
									<div className="slds-grid slds-grid_vertical-align-center slds-truncate_container_75 slds-no-space">
										<h3 className="slds-truncate">
											{this.props.title}
										</h3>
										<div className="slds-no-flex">
											{this.props.isRecurring ?
												(<Icon
													category="utility"
													name="rotate"
													size="xx-small"
													className="slds-m-left_x-small"
													title="Recurring Task"
												/>) : null
											}
											{this.props.groupEmail ?
												(<Icon
													category="utility"
													name="groups"
													size="xx-small"
													className="slds-m-left_x-small"
													title="Group Email"
												/>) : null
											}
											{this.props.hasAttachment ?
												(<Icon
													category="utility"
													name="attach"
													size="xx-small"
													className="slds-m-left_x-small"
													title="Has Attachment"
												/>) : null
											}
										</div>
									</div>
									<div className="slds-timeline__actions slds-timeline__actions_inline">
										<p className="slds-timeline__date">{this.props.time}</p>
									</div>
								</div>
								<p className="slds-m-horizontal_xx-small">
									{this.props.action}
								</p>
								<article
									className="slds-box slds-timeline__item_details slds-theme_shade slds-m-top_x-small slds-m-horizontal_xx-small slds-p-around_medium"
									aria-hidden={this.state.collapsed}>
									<ul className="slds-list_horizontal slds-wrap">
										{this.props.name ? (
											<li className="slds-grid slds-grid_vertical slds-size_1-of-2 slds-p-bottom_small">
												<span className="slds-text-title slds-p-bottom_x-small">Name</span>
												<span className="slds-text-body_medium slds-truncate">
															{this.props.name}
														</span>
											</li>
										) : null
										}
										{this.props.sender ? (
												<li className="slds-grid slds-grid_vertical slds-size_1-of-2 slds-p-bottom_small">
													<span className="slds-text-title slds-p-bottom_x-small">From Address</span>
													<span className="slds-text-body_medium slds-truncate">
															{this.props.sender}
														</span>
												</li>
											) : null
										}
										{this.props.recipient ? (
												<li className="slds-grid slds-grid_vertical slds-size_1-of-2 slds-p-bottom_small">
													<span className="slds-text-title slds-p-bottom_x-small">To Address</span>
													<span className="slds-text-body_medium slds-truncate">
															{this.props.recipient}
														</span>
												</li>
											) : null
										}
										{this.props.location ? (
												<li className="slds-grid slds-grid_vertical slds-size_1-of-2 slds-p-bottom_small">
													<span className="slds-text-title slds-p-bottom_x-small">Location</span>
													<span className="slds-text-body_medium slds-truncate">
														{this.props.location}
													</span>
												</li>
											) : null
										}
										{this.props.attendees ? (
												<li className="slds-grid slds-grid_vertical slds-size_1-of-2 slds-p-bottom_small">
													<span className="slds-text-title slds-p-bottom_x-small">Attendees</span>
													<span className="slds-text-body_medium slds-truncate">
														{this.props.attendees}
													</span>
												</li>
											) : null
										}
										{this.props.when ? (
												<li className="slds-grid slds-grid_vertical slds-size_1-of-2 slds-p-bottom_small">
													<span className="slds-text-title slds-p-bottom_x-small">When</span>
													<span className="slds-text-body_medium slds-truncate">
															{this.props.when}
													</span>
												</li>
											) : null
										}
										{this.props.related ? (
												<li className="slds-grid slds-grid_vertical slds-size_1-of-2 slds-p-bottom_small">
													<span className="slds-text-title slds-p-bottom_x-small">Related To</span>
													<span className="slds-text-body_medium slds-truncate">
																{this.props.related}
														</span>
												</li>
											) : null
										}
									</ul>
									{ this.props.description ?
										(<div>
											<span className="slds-text-title">
												{ this.props.type === 'email' ? "Text Body" : "Description" }
											</span>
											<p className="slds-p-top_x-small">
													{this.props.description}
											</p>
										</div>) : null
									}
								</article>
							</div>
						</div>
					</div>
				</li>
			</IconSettings>
		);
	}
}

Activity.displayName = ACTIVITY_TIMELINE_ACTIVITY;
Activity.propTypes = propTypes;
Activity.defaultProps = defaultProps;

export default Activity;
