'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _checkProps = require('./check-props');

var _checkProps2 = _interopRequireDefault(_checkProps);

var _svg = require('./svg');

var _svg2 = _interopRequireDefault(_svg);

var _utility = require('../../../icons/utility');

var _utility2 = _interopRequireDefault(_utility);

var _action = require('../../../icons/action');

var _action2 = _interopRequireDefault(_action);

var _custom = require('../../../icons/custom');

var _custom2 = _interopRequireDefault(_custom);

var _doctype = require('../../../icons/doctype');

var _doctype2 = _interopRequireDefault(_doctype);

var _standard = require('../../../icons/standard');

var _standard2 = _interopRequireDefault(_standard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// This component's `checkProps` which issues warnings to developers about properties
// when in development mode (similar to React's built in development tools)


/*
 * If inline icons are present and icon bundle imports are not just an empty object, then inline icons will be used instead of external icons that require HTTP access.
 */
var UtilityIcon = function UtilityIcon(_ref, context) {
	var _ref$name = _ref.name,
	    name = _ref$name === undefined ? '' : _ref$name,
	    assistiveText = _ref.assistiveText,
	    category = _ref.category,
	    icon = _ref.icon,
	    path = _ref.path,
	    rest = _objectWithoutProperties(_ref, ['name', 'assistiveText', 'category', 'icon', 'path']);

	(0, _checkProps2.default)('UtilityIcon', { name: name, category: category, path: path, context: context });

	var inlineIcons = {
		action: _action2.default,
		custom: _custom2.default,
		doctype: _doctype2.default,
		standard: _standard2.default,
		utility: _utility2.default
	};
	var inlineData = void 0;

	if (icon) {
		// Use SVG data passed in with `icon` prop
		inlineData = icon;
	} else if (Object.keys(inlineIcons[category]).length) {
		// Use inline icon data if it exists. ENV variables will have to set to allow this.
		inlineData = inlineIcons[category][name.toLowerCase()];
		inlineData.viewBox = inlineIcons[category].viewBox;
	}

	var modifiedPath = void 0;

	if (path) {
		// Use `path` prop of Icon if present
		modifiedPath = path;
	} else if (context[category + 'Sprite']) {
		// Use category sprite file from IconSettings if present
		modifiedPath = context[category + 'Sprite'] + '#' + name;
	} else {
		// Otherwise, use external URLs for icons
		modifiedPath = context.iconPath && context.iconPath + '/' + category + '-sprite/svg/symbols.svg#' + name;
	}

	return inlineData ? _react2.default.createElement(_svg2.default, _extends({ data: inlineData, name: name }, rest)) : _react2.default.createElement(
		'svg',
		rest,
		_react2.default.createElement('use', { xlinkHref: modifiedPath })
	);
};

UtilityIcon.displayName = 'UtilityIcon';

UtilityIcon.propTypes = {
	assistiveText: _propTypes2.default.string,
	category: _propTypes2.default.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']),
	/**
  * An SVG object to use instead of name / category, look in `design-system-react/icons` for examples
  */
	icon: _propTypes2.default.object,
	/**
  * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
  */
	name: _propTypes2.default.string,
	/**
  * Path to the icon. This will override any global icon settings.
  */
	path: _propTypes2.default.string
};

UtilityIcon.defaultProps = {
	category: 'utility'
};

UtilityIcon.contextTypes = {
	iconPath: _propTypes2.default.string,
	actionSprite: _propTypes2.default.string,
	customSprite: _propTypes2.default.string,
	doctypeSprite: _propTypes2.default.string,
	standardSprite: _propTypes2.default.string,
	utilitySprite: _propTypes2.default.string
};

exports.default = UtilityIcon;