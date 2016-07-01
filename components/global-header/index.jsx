/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Global Header Component

// Implements the [Global Header design pattern](https://www.lightningdesignsystem.com/components/global-header) in React.

// ## Dependencies

// ### React
import React from 'react';

// ### classNames
import classNames from 'classnames';

// ### Button
import Button from '../button';

// ### Icon
import Icon from '../icon';

// ### Search
import Search from '../forms/input/search';

// ## Children
import HeaderTool from './tool';
import ProfileMenu from './profile-menu';

// ## Constants
import { GLOBAL_HEADER } from '../../utilities/constants';

// Removes the need for `PropTypes`.
const { PropTypes } = React;

const MEDIA_SIZE_FLOW_SHIFT = 'medium';

/**
 * Component description.
 */
const GlobalHeader = React.createClass({
	displayName: GLOBAL_HEADER,

	propTypes: {
		accountSwitcherTriggerId: PropTypes.string,
		accountName: PropTypes.string,
		feedbackTriggerEnabled: PropTypes.bool,
		localization: PropTypes.object.isRequired,
		onAccountSwitcherTriggerClick: PropTypes.func,
		onFeedbackTriggerSelect: PropTypes.func,
		onSearchChange: PropTypes.func,
		profile: PropTypes.object,
		search: PropTypes.string,
		searchEnabled: PropTypes.bool,
		tools: PropTypes.array.isRequired
	},

	getDefaultProps () {
		return {
			accountName: '',
			search: '',
			searchEnabled: false
		};
	},

	render () {
		const localization = this.props.localization;
		const triggerId = this.props.accountSwitcherTriggerId;

		/* eslint-disable max-len */
		return (
			<div className="slds-grid slds-global-nav__header slds-m-vertical--x-small slds-wrap slds-grid--vertical-stretch">
				<div className={`slds-order--1 slds-${MEDIA_SIZE_FLOW_SHIFT}-order--1 slds-col--padded`} >
					<Icon
						category="utility"
						name="salesforce1"
						className="slds-global-nav__header__logo slds-icon--medium"
						inverse={false}
					/>
				</div>
				<div className={`slds-order--3 slds-${MEDIA_SIZE_FLOW_SHIFT}-order--2 slds-col--padded slds-max-${MEDIA_SIZE_FLOW_SHIFT}-size--1-of-1`}>
					{this.props.searchEnabled
						? <Search
							className={classNames({ 'slds-hidden': this.props.searchEnabled })}
							onChange={this.props.onSearchChange}
							placeholder={localization.GLOBAL_NAV_HEADER_SEARCH_SALESFORCE}
							value={this.props.search}
						/>
						: null
					}
				</div>
				<div className={`slds-order--2 slds-${MEDIA_SIZE_FLOW_SHIFT}-order--3 slds-col--padded`}>
					<div className="slds-grid slds-grid--pull-padded slds-grid--vertical-align-center slds-grid--align-end">
						{this.props.feedbackTriggerEnabled
							? <Button
								theme="neutral"
								className="slds-global-nav__feedback-trigger slds-m-right--small"
								text={localization.GLOBAL_NAV_HEADER_FEEDBACK || 'feedback'}
								onClick={this.props.onFeedbackTriggerSelect}
							/>
							: null
						}
						<div className="slds-global-nav__header__tools">
							{this.props.tools.map((tool, i) => (
								<HeaderTool key={i} {...tool} />
							))}
						</div>
						<div
							id={triggerId}
							className="slds-global-nav__header__account-switcher-trigger slds-truncate"
							onClick={this.props.onAccountSwitcherTriggerClick}
							title={this.props.accountName}
						>
							<Icon
								category="utility"
								name="company"
								className="slds-icon--small slds-global-nav__header__shortcut slds-m-right--x-small"
								inverse={false}
							/>
							{this.props.accountName}
						</div>
						<div className="slds-global-nav__header__profile">
							<ProfileMenu {...this.props.profile} localization={this.props.localization} />
						</div>
					</div>
				</div>
			</div>
		);
		/* eslint-enable max-len */
	}
});

export default GlobalHeader;
