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
import React, { PropTypes } from 'react';

// ### classNames
import classNames from 'classnames';

// ### Truncate
// Truncate multi-lines text for all browsers
// [github.com/ShinyChang/react-text-truncate](https://github.com/ShinyChang/react-text-truncate)
import Truncate from 'react-text-truncate';

// ### [].includes
// Polyfill for array.includes
import 'core-js/fn/array/includes';

// ## Children
import Button from '../button';
import Highlighter from '../utilities/highlighter';
import PopoverTooltip from '../popover-tooltip';

// ## Constants
import { APP_LAUNCHER_TILE } from '../../utilities/constants';

/**
 * App Launcher Tiles provide information and links to a user's apps
 */
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
		 * Text to be used as an icon. Only renders if iconNode is undefined
		 */
		iconText: PropTypes.string,
		/**
		 * Text used to highlight content in app tiles
		 */
		search: PropTypes.string
		// TODO: allow for passing iconBackgroundColor
		// TODO: add Highlighter to Truncate text (https://github.com/ShinyChang/React-Text-Truncate/issues/32)
	},

	getDefaultProps () {
		return {
			size: 'default',
			moreLabel: ' More'
		};
	},

	getHighlighterRender (child) {
		return <Highlighter search={this.props.search}>{child}</Highlighter>;
	},

	getMoreRender () {
		return (
			<span>
				<PopoverTooltip align="bottom" content={this.getHighlighterRender(this.props.description)}>
					<Button variant="base" iconVariant="bare" label={this.props.moreLabel} />
				</PopoverTooltip>
			</span>
		);
	},

	render () {
		/* eslint-disable no-script-url */

		const small = this.props.size === 'small' || false;

		return (
			<a
				href="javascript:void(0);"
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
						|| <span className="slds-avatar slds-avatar--large slds-align--absolute-center slds-icon-custom-27">
							{this.props.iconText}
						</span>
					}
				</div>
				{
					small
					? <div className="slds-app-launcher__tile-body slds-app-launcher__tile-body--small">
						<p className="slds-truncate slds-text-link">
							{this.getHighlighterRender(this.props.title)}
						</p>
					</div>
					: <div className="slds-app-launcher__tile-body">
						<span className="slds-text-link">
							{this.getHighlighterRender(this.props.title)}
						</span>
						<Truncate
							line={2}
							truncateText="…"
							text={this.props.description}
							textTruncateChild={this.getMoreRender()}
						/>
					</div>
				}
			</a>
		);
	}
});

module.exports = AppLauncherTile;
