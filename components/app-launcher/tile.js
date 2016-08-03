'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _truncate = require('../utilities/truncate');

var _truncate2 = _interopRequireDefault(_truncate);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _highlighter = require('../utilities/highlighter');

var _highlighter2 = _interopRequireDefault(_highlighter);

var _popoverTooltip = require('../popover-tooltip');

var _popoverTooltip2 = _interopRequireDefault(_popoverTooltip);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * App Launcher Tiles provide information and links to a user's apps
 */


// ## Children


// ### classNames
var AppLauncherTile = _react2.default.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: _constants.APP_LAUNCHER_TILE,

	// ### Prop Types
	propTypes: {
		/**
   * App name for the tile's title.
   */
		title: _react.PropTypes.string.isRequired,
		/**
   * Size of the rendered tile.
   */
		size: _react.PropTypes.oneOf(['default', 'small']),
		/**
   * The description of the app. Not visible on small tiles.
   */
		description: _react.PropTypes.string,
		/**
   * Heading for app description
   */
		descriptionHeading: _react.PropTypes.string,
		/**
   * The localized text for the "More information" tooltip.
   */
		moreLabel: _react.PropTypes.string,
		/**
   * Class names to be added to the tile.
   */
		className: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),
		/**
   * Function that will be executed when clicking on a tile
   */
		onClick: _react.PropTypes.func,
		/**
   * Icon node for app tile. Takes priority over `iconText`
   */
		iconNode: _react.PropTypes.node,
		/**
   * Text to be used as an icon. Only renders if iconNode is undefined
   */
		iconText: _react.PropTypes.string,
		/**
   * Text used to highlight content in app tiles
   */
		search: _react.PropTypes.string
		// TODO: allow for passing iconBackgroundColor
		// TODO: add Highlighter to Truncate text (https://github.com/ShinyChang/React-Text-Truncate/issues/32)
	},

	getDefaultProps: function getDefaultProps() {
		return {
			size: 'default',
			moreLabel: ' More'
		};
	},
	getMoreRender: function getMoreRender() {
		return _react2.default.createElement(
			'span',
			null,
			_react2.default.createElement(
				_popoverTooltip2.default,
				{ align: 'bottom', content: _react2.default.createElement(
						_highlighter2.default,
						{ search: this.props.search },
						this.props.description
					) },
				_react2.default.createElement(_button2.default, { className: 'slds-text-link', variant: 'base', iconVariant: 'bare', label: this.props.moreLabel, tabIndex: '0' })
			)
		);
	},
	render: function render() {
		var _this = this;

		var small = this.props.size === 'small' || false;

		return _react2.default.createElement(
			'a',
			{
				href: 'javascript:void(0);' // eslint-disable-line no-script-url
				, onClick: this.props.onClick,
				className: (0, _classnames2.default)('slds-app-launcher__tile slds-text-link--reset', small && 'slds-app-launcher__tile--small', this.props.className)
			},
			_react2.default.createElement(
				'div',
				{ className: (0, _classnames2.default)('slds-app-launcher__tile-figure', small && 'slds-app-launcher__tile-figure--small') },
				this.props.iconNode || _react2.default.createElement(
					'span',
					{ className: 'slds-avatar slds-avatar--large slds-align--absolute-center slds-icon-custom-27' },
					this.props.iconText
				)
			),
			small ? _react2.default.createElement(
				'div',
				{ className: 'slds-app-launcher__tile-body slds-app-launcher__tile-body--small' },
				_react2.default.createElement(
					'p',
					{ className: 'slds-truncate' },
					_react2.default.createElement(
						_highlighter2.default,
						{ className: 'slds-text-link', search: this.props.search },
						this.props.title
					)
				)
			) : _react2.default.createElement(
				'div',
				{ className: 'slds-app-launcher__tile-body' },
				_react2.default.createElement(
					_highlighter2.default,
					{ className: 'slds-text-link', search: this.props.search },
					this.props.title
				),
				_react2.default.createElement(_truncate2.default, {
					line: 2,
					prefix: this.props.descriptionHeading && this.props.descriptionHeading.toUpperCase(),
					suffix: this.props.moreLabel,
					text: this.props.description,
					textTruncateChild: this.getMoreRender(),
					wrapper: function wrapper(text, textTruncateChild) {
						return _react2.default.createElement(
							'div',
							null,
							_this.props.descriptionHeading && _react2.default.createElement(
								'span',
								{ className: 'slds-text-heading--label' },
								_this.props.descriptionHeading,
								' '
							),
							_react2.default.createElement(
								_highlighter2.default,
								{ search: _this.props.search },
								text
							),
							textTruncateChild && ' ',
							textTruncateChild
						);
					}
				})
			)
		);
	}
});

// ## Constants


// ### Truncate
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


module.exports = AppLauncherTile;