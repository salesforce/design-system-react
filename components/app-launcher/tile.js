'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _truncate = require('../utilities/truncate');

var _truncate2 = _interopRequireDefault(_truncate);

var _lodash = require('lodash.isfunction');

var _lodash2 = _interopRequireDefault(_lodash);

var _highlighter = require('../utilities/highlighter');

var _highlighter2 = _interopRequireDefault(_highlighter);

var _popoverTooltip = require('../popover-tooltip');

var _popoverTooltip2 = _interopRequireDefault(_popoverTooltip);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ### isFunction


// ### classNames
/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # App Launcher Component

// ## Dependencies

// ### React
var handleClick = function handleClick(event, href, onClick) {
	event.preventDefault();
	onClick(event, { href: href });
};

/**
 * App Launcher Tiles provide information and links to a user's apps
 */


// ## Constants


// ## Children


// ### Truncate
var AppLauncherTile = function AppLauncherTile(props) {
	var smallTile = props.size === 'small' || false;

	return _react2.default.createElement(
		'a',
		{
			href: props.href // eslint-disable-line no-script-url
			, onClick: (0, _lodash2.default)(props.onClick) ? function (event) {
				return handleClick(event, props.href, props.onClick);
			} : null,
			className: (0, _classnames2.default)('slds-app-launcher__tile slds-text-link--reset', { 'slds-app-launcher__tile--small': smallTile }, props.className)
		},
		_react2.default.createElement(
			'div',
			{
				className: (0, _classnames2.default)('slds-app-launcher__tile-figure', {
					'slds-app-launcher__tile-figure--small': smallTile
				})
			},
			props.iconNode || _react2.default.createElement(
				'span',
				{ className: 'slds-avatar slds-avatar--large slds-align--absolute-center slds-icon-custom-27' },
				props.iconText
			)
		),
		smallTile ? _react2.default.createElement(
			'div',
			{ className: 'slds-app-launcher__tile-body slds-app-launcher__tile-body--small' },
			_react2.default.createElement(
				'p',
				{ className: 'slds-truncate' },
				_react2.default.createElement(
					_highlighter2.default,
					{ className: 'slds-text-link', search: props.search },
					props.title
				)
			)
		) : _react2.default.createElement(
			'div',
			{ className: 'slds-app-launcher__tile-body' },
			_react2.default.createElement(
				_highlighter2.default,
				{ className: 'slds-text-link', search: props.search },
				props.title
			),
			_react2.default.createElement(_truncate2.default, {
				line: 2,
				prefix: props.descriptionHeading && props.descriptionHeading.toUpperCase(),
				suffix: props.moreLabel,
				text: props.description,
				textTruncateChild: _react2.default.createElement(
					_popoverTooltip2.default,
					{
						align: 'bottom',
						content: _react2.default.createElement(
							_highlighter2.default,
							{ search: props.search },
							props.description
						)
					},
					_react2.default.createElement(
						'span',
						{
							className: 'slds-app-launcher__tile-more slds-text-link',
							tabIndex: '0'
						},
						props.moreLabel
					)
				),
				wrapper: function wrapper(text, textTruncateChild) {
					return _react2.default.createElement(
						'div',
						null,
						props.descriptionHeading &&
						// inline style override
						_react2.default.createElement(
							'span',
							{
								className: 'slds-text-heading--label',
								style: { letterSpacing: '0.025rem' }
							},
							props.descriptionHeading,
							' '
						),
						_react2.default.createElement(
							_highlighter2.default,
							{ search: props.search },
							text
						),
						textTruncateChild && ' ',
						textTruncateChild
					);
				}
			})
		)
	);
};

// ### Display Name
// Always use the canonical component name as the React display name.
AppLauncherTile.displayName = _constants.APP_LAUNCHER_TILE;

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
	title: _propTypes2.default.string.isRequired,
	/**
  * Size of the rendered tile.
  */
	size: _propTypes2.default.oneOf(['default', 'small']),
	/**
  * The description of the app. Not visible on small tiles.
  */
	description: _propTypes2.default.string,
	/**
  * Heading for app description
  */
	descriptionHeading: _propTypes2.default.string,
	/**
  * The `href` attribute of the tile. Please pass in bookmarkable URLs from your routing library. If the `onClick` callback is specified this URL will be prevented from changing the browser's location.
  */
	href: _propTypes2.default.string,
	/**
  * The localized text for the "More information" tooltip.
  */
	moreLabel: _propTypes2.default.string,
	/**
  * Class names to be added to the tile.
  */
	className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
	/**
  * Function that will be executed when clicking on a tile
  */
	onClick: _propTypes2.default.func,
	/**
  * Icon node for app tile. Takes priority over `iconText`
  */
	iconNode: _propTypes2.default.node,
	/**
  * Text to be used as an icon. Only renders if iconNode is undefined
  */
	iconText: _propTypes2.default.string,
	/**
  * Text used to highlight content in app tiles
  */
	search: _propTypes2.default.string
	// TODO: allow for passing iconBackgroundColor
	// TODO: add Highlighter to Truncate text (https://github.com/ShinyChang/React-Text-Truncate/issues/32)
};

exports.default = AppLauncherTile;