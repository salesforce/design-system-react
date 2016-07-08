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

import classNames from 'classnames';

// ## Children
import Icon from '../icon';
// import PopoverTooltip from '../popover-tooltip';
// import Button from '../button';

// ## Constants
import { APP_LAUNCHER_TILE } from '../../utilities/constants';

const AppLauncherTile = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: APP_LAUNCHER_TILE,

	// ### Prop Types
	propTypes: {
		/**
		 * App name for the tile's title.
		 */
		title: PropTypes.string.isRequired,
		/**
		 * Size of the rendered tile.
		 */
		size: PropTypes.oneOf(['default', 'small']),
		/**
		 * The description of the app. Not visible on small tiles.
		 */
		description: PropTypes.string,
		/**
		 * The localized text for the "More information" tooltip.
		 */
		moreLabel: PropTypes.string,
		/**
		 * Class names to be added to the tile.
		 */
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		/**
		 * Function that will be executed when clicking on a tile
		 */
		onClick: PropTypes.func,
		/**
		 * Icon node for app tile. Takes priority over `iconText`
		 */
		iconNode: PropTypes.node,
		/**
		 * Text to be used as an icon. Only renders if iconNode is empty
		 */
		iconText: PropTypes.string,
		// iconBackgroundColor
	},

	// icon={<Icon />} or iconName="" or iconText=""

	getDefaultProps () {
		return {
			size: 'default',
			moreLabel: ' More'
		};
	},
					// <span className="slds-avatar slds-avatar--large slds-align--absolute-center slds-icon-custom-27">SC</span>
					// <Icon name="ai" category="doctype" className="slds-m-around--x-small" />

	render () {
		const small = this.props.size === 'small' || false;

		return (
			<a
				onClick={this.props.onClick}
				className={
					classNames(
						'slds-app-launcher__tile slds-text-link--reset',
						small && 'slds-app-launcher__tile--small',
						this.props.className
					)
				}
			>
				<div className={classNames('slds-app-launcher__tile-figure', small && 'slds-app-launcher__tile-figure--small')}>
					{
						this.props.iconNode
						|| <span style="background: #f00" className="slds-avatar slds-avatar--large slds-align--absolute-center">this.props.iconText</span>
					}
				</div>
				{
					small
					? <div className="slds-app-launcher__tile-body slds-app-launcher__tile-body--small">
						<p className="slds-truncate slds-text-link">{this.props.title}</p>
					</div>
					: <div className="slds-app-launcher__tile-body">
						<span className="slds-text-link">{this.props.title}</span>
						<p>
							{this.props.description}
							<span className="slds-text-link">{this.props.moreLabel}</span>
						</p>
					</div>
				}
			</a>
		);
	}
});
			// <a className="slds-app-launcher__tile slds-text-link--reset slds-app-launcher__tile--small">
			// 	<div className="slds-app-launcher__tile-figure slds-app-launcher__tile-figure--small">
			// 		<span className="slds-avatar slds-avatar--large slds-align--absolute-center slds-icon-custom-27">SC</span>
			// 	</div>
			// 	<div className="slds-app-launcher__tile-body slds-app-launcher__tile-body--small">
			// 		<span className="slds-truncate slds-text-link">Sales Cloud</span>
			// 	</div>
			// </a>

			// <li className="slds-col--padded slds-grow-none slds-size--xx-small">
   //            <a href="javascript:void(0);" className="slds-app-launcher__tile slds-text-link--reset slds-app-launcher__tile--small">
   //              <div className="slds-app-launcher__tile-figure slds-app-launcher__tile-figure--small">
   //                <svg aria-hidden="true" className="slds-icon slds-icon-standard-case slds-icon--large">
   //                  <use href="/assets/icons/standard-sprite/svg/symbols.svg#case"></use>
   //                </svg>
   //              </div>
   //              <div className="slds-app-launcher__tile-body slds-app-launcher__tile-body--small">
   //                <p className="slds-truncate slds-text-link">Cases</p>
   //              </div>
   //            </a>
   //          </li>
module.exports = AppLauncherTile;


			// <li className="slds-col--padded slds-grow-none slds-size--1-of-1 slds-medium-size--1-of-3">
			// 	<a href="#" onClick={this.handleTileClick} className="slds-app-launcher__tile slds-text-link--reset">
			// 		<div className="slds-app-launcher__tile-figure">
			// 			<span className="slds-icon_container">
			// 				<Icon
			// 					{...this.props.categoryIcon}
			// 					className="slds-icon slds-icon-standard-account slds-icon--large"
			// 				/>
			// 			</span>
			// 		</div>
			// 		<div className="slds-app-launcher__tile-body">
			// 			<span className="slds-text-link">{this.props.appName}</span>
			// 			<p className={this.getDescriptionClass()}>{description}</p>
			// 			{
			// 				description.length > 50
			// 				? <PopoverTooltip align="bottom" content={description}>
			// 					<Button variant="base" className="slds-text-link" label={this.props.localizedShowMoreTooltip} />
			// 				</PopoverTooltip>
			// 				: ''
			// 			}
			// 		</div>
			// 	</a>
			// </li>
