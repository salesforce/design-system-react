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
import Truncate from '../utilities/truncate';

// ### isFunction
import isFunction from 'lodash.isfunction';

// ## Children
import Button from '../button';
import Highlighter from '../utilities/highlighter';
import PopoverTooltip from '../popover-tooltip';

// ## Constants
import { APP_LAUNCHER_TILE } from '../../utilities/constants';

const handleClick = (event, props, onClick) => {
	event.preventDefault();
	onClick(event, { href: props.href });
};

/**
 * App Launcher Tiles provide information and links to a user's apps
 */
const AppLauncherTile = (props) => {
	const smallTile = props.size === 'small' || false;

	return (
		<a
			href={props.href} // eslint-disable-line no-script-url
			onClick={isFunction(props.onClick) ? (event) => handleClick(event, props.href, props.onClick) : null}
			className={
				classNames(
					'slds-app-launcher__tile slds-text-link--reset',
					{ 'slds-app-launcher__tile--small': smallTile },
					props.className
				)
			}
		>
			<div
				className={classNames(
					'slds-app-launcher__tile-figure',
					{ 'slds-app-launcher__tile-figure--small': smallTile })}
			>
				{
					props.iconNode
					|| <span className="slds-avatar slds-avatar--large slds-align--absolute-center slds-icon-custom-27">
						{props.iconText}
					</span>
				}
			</div>
			{
				smallTile
				? <div className="slds-app-launcher__tile-body slds-app-launcher__tile-body--small">
					<p className="slds-truncate">
						<Highlighter className="slds-text-link" search={props.search}>{props.title}</Highlighter>
					</p>
				</div>
				: <div className="slds-app-launcher__tile-body">
					<Highlighter className="slds-text-link" search={props.search}>{props.title}</Highlighter>
					<Truncate
						line={2}
						prefix={props.descriptionHeading && props.descriptionHeading.toUpperCase()}
						suffix={props.moreLabel}
						text={props.description}
						textTruncateChild={
							<span>
								<PopoverTooltip
									align="bottom"
									content={<Highlighter
										search={props.search}
									>{props.description}</Highlighter>
								}
								>
									<Button
										className="slds-text-link"
										variant="base"
										iconVariant="bare"
										label={props.moreLabel}
										tabIndex="0"
									/>
								</PopoverTooltip>
							</span>
						}
						wrapper={(text, textTruncateChild) =>
							<div>
								{props.descriptionHeading
									// inline style override
									&& <span
										className="slds-text-heading--label"
										style={{ letterSpacing: '0.025rem' }}
									>{props.descriptionHeading}{' '}</span>}
								<Highlighter search={props.search}>
									{text}
								</Highlighter>
								{textTruncateChild && ' '}
								{textTruncateChild}
							</div>
						}
					/>
				</div>
			}
		</a>
	);
};

// ### Display Name
// Always use the canonical component name as the React display name.
AppLauncherTile.displayName = APP_LAUNCHER_TILE;

AppLauncherTile.defaultProps = {
	href: 'javascript:void(0);', // eslint-disable-line no-script-url
	size: 'default',
	moreLabel: ' More'
};

// ### Prop Types
AppLauncherTile.propTypes = {
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
	 * Heading for app description
	 */
	descriptionHeading: PropTypes.string,
	/**
	 * The `href` attribute of the tile. Please pass in bookmarkable URLs from your routing library. If the `onClick` callback is specified this URL will be prevented from changing the browser's location.
	 */
	href: PropTypes.string,
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
};

module.exports = AppLauncherTile;
