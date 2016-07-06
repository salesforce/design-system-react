/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # App Launcher Component

// ## Dependencies

// ### React
import React from 'react';

// Removes the need for `React.PropTypes.prop`
const { PropTypes } = React;

// ## Children
import Icon from '../icon';
// import IconUtility from '../slds-for-react/icon-utility.js';
import Tooltip from '../popover-tooltip';
// import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
// import reactMixin from 'react-mixin';
import classNames from 'classnames';

// ## Constants
import { APP_LAUNCHER_TILE } from '../../utilities/constants';

const AppTile = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: APP_LAUNCHER_TILE,

	// ### Prop Types
	propTypes: {
		/**
		 * The localized text for the "More information" tooltip.
		 */
		localizedShowMoreTooltip: PropTypes.string,
		/**
		 * The localized text for an uninstalled app's "Learn More" link.
		 */
		localizedLearnMoreLink: PropTypes.string,
		/**
		 * The localized text for the "Not Installed" modal section.
		 */
		localizedNotInstalledText: PropTypes.string,
		appName: PropTypes.string.isRequired,
		appDescription: PropTypes.string.isRequired,
		appTileClicked: PropTypes.func,
		categoryName: PropTypes.string.isRequired,
		categoryIcon: PropTypes.object.isRequired,
		hasAccess: PropTypes.bool,
		isProvisioned: PropTypes.bool,
		isVisible: PropTypes.bool,
		onClick: PropTypes.func,
		applicationUrl: PropTypes.string,
		productUrl: PropTypes.string
	},
	// constructor (props) {
	// 	super(props);
	// 	// this.state = {
	// 	// 	tooltip: {
	// 	// 		content: this.props.appDescription,
	// 	// 		trigger: 'click',
	// 	// 		positionedTargetVerticalAttachment: 'bottom-left',
	// 	// 		isOpen: false,
	// 	// 		modal: false,
	// 	// 		container: document.querySelector('body'),
	// 	// 		positionedOffset: 20
	// 	// 	}
	// 	// };
	// }

	getInitialState () {
		return {
			isOpen: false,
			tooltip: {
				content: this.props.appDescription,
				trigger: 'click',
				positionedTargetVerticalAttachment: 'bottom-left',
				isOpen: false,
				modal: false,
				container: document.querySelector('body'),
				positionedOffset: 20
			}
		};
	},

	getDefaultProps () {
		return {
			localizedShowMoreTooltip: 'More',
			localizedLearnMoreLink: 'Learm More'
		};
	},

	moreRendered (element) {
		const tooltipState = this.state.tooltip;
		tooltipState.alignmentTarget = element;
		this.setState(tooltipState);
	},

	handleMoreClick (e) {
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();

		const tooltipState = this.state.tooltip;
		tooltipState.isOpen = !(tooltipState.isOpen);
		this.setState(tooltipState);
	},

	handleTileClick (e) {
		if (typeof this.props.onClick !== 'function') {
			if (this.props.installed) {
				window.location = this.props.applicationUrl;
				e.preventDefault();
			} else {
				const win = window.open(this.props.productUrl, '_blank');
				win.focus();
			}
		} else {
			this.props.onClick(e);
		}

		this.props.appTileClicked(e, this.props.uninstalled);
	},

	// Don't apply multiline truncate class until modal is visible. Otherwise it will not work -cdmc
	getDescriptionClass () {
		return this.props.isVisible ? 'slds-multiline-truncate' : '';
	},

	renderLockIcon () {
		return (
			<span className="locked-icon slds-icon__container slds-m-around--none slds-p-around--none">
				<Icon category="utility" name="lock" className="slds-icon slds-icon--x-small" />
			</span>
		);
	},

	isEnabled () {
		return this.props.isProvisioned && this.props.hasAccess;
	},

	componentDidMount () {
		window.addEventListener('mousedown', this.pageClick, false);
	},

	pageClick () {
		if (this.mouseIsDownThis) {
			return;
		}

		const tooltipState = this.state.tooltip;
		tooltipState.isOpen = false;
		this.setState(tooltipState);
	},

	mouseDownHandler () {
		this.mouseIsDownThis = true;
	},

	mouseUpHandler () {
		this.mouseIsDownThis = false;
	},

	renderMore (description, tooltipState) {
		const displayMore = (description.length > 50);
		const more = (
			<button
				className="slds-icon_container slds-tile--board__icon slds-button"
				ref={this.moreRendered}
				onClick={this.handleMoreClick}
				onMouseDown={this.mouseDownHandler}
				onMouseUp={this.mouseUpHandler}
			>
				<span>{this.props.localizedShowMoreTooltip}</span>
				<Tooltip {...tooltipState}>
					<span>{tooltipState.content}</span>
				</Tooltip>
			</button>
		);

		return displayMore ? more : '';
	},

	render () {
		const tooltipState = this.state.tooltip;
		const tileStyle = this.isEnabled() ? 'enabled' : 'non-enabled';
		const descriptionLearnMore = <span className="learn_more">{this.props.localizedLearnMoreLink}</span>;
		const description = this.isEnabled() ? this.props.appDescription : descriptionLearnMore;
		const ribbon = this.isEnabled() ? '' : <div className="ribbon">{this.props.localizedNotInstalledText}</div>;
		const lockedIcon = this.isEnabled() ? '' : this.renderLockIcon();

		const iconWrapperPadding = this.props.categoryIcon.noPadding ? 'slds-p-around--none' : 'slds-p-around--small';
		const iconWrapperClasses = classNames('slds-icon__container slds-m-around--small', iconWrapperPadding);
		const iconClasses = this.props.categoryIcon.noPadding ? 'slds-icon slds-icon--x-large' : 'slds-icon';

		const more = this.renderMore(description, tooltipState);

		return (
			<li className="slds-size--1-of-3">
				<a
					href="#"
					onClick={this.handleTileClick}
					className={classNames('slds-list__item slds-m-around--x-small slds-p-around--none', tileStyle)}
				>
					<div className="slds-media slds-tile--board slds-tile slds-m-around--xxx-small">
						{ribbon}
						{lockedIcon}
						<div className="slds-media__figure slds-m-right--none">
							<span
								className={iconWrapperClasses}
								style={{ background: this.props.categoryIcon.background }}
							>
								<Icon
									{...this.props.categoryIcon}
									className={iconClasses}
								/>
							</span>
						</div>
						<div className="slds-media__body slds-m-vertical--x-small slds-m-horizontal--small">
							<p className="tile__title slds-truncate slds-text-body--regular">{this.props.appName}</p>
							<div className="slds-tile__detail slds-text-body--small slds-has-flexi-truncate">
								<p className={this.getDescriptionClass()}>
									<span className="slds-text-heading--label">{this.props.categoryName} </span>
									{description}
								</p>
								{more}
							</div>
						</div>
					</div>
				</a>
			</li>
		);
	}
});

module.exports = AppTile;
