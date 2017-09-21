'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _checkProps = require('./check-props');

var _checkProps2 = _interopRequireDefault(_checkProps);

var _svg = require('./svg');

var _svg2 = _interopRequireDefault(_svg);

var _settings = require('../../../components/settings');

var _settings2 = _interopRequireDefault(_settings);

var _utility = require('../../../icons/utility');

var SLDS_ICONS_UTILITY = _interopRequireWildcard(_utility);

var _action = require('../../../icons/action');

var SLDS_ICONS_ACTION = _interopRequireWildcard(_action);

var _custom = require('../../../icons/custom');

var SLDS_ICONS_CUSTOM = _interopRequireWildcard(_custom);

var _doctype = require('../../../icons/doctype');

var SLDS_ICONS_DOCTYPE = _interopRequireWildcard(_doctype);

var _standard = require('../../../icons/standard');

var SLDS_ICONS_STANDARD = _interopRequireWildcard(_standard);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// This component's `checkProps` which issues warnings to developers about properties
// when in development mode (similar to React's built in development tools)


var UtilityIcon = function UtilityIcon(_ref) {
	var _ref$name = _ref.name,
	    name = _ref$name === undefined ? '' : _ref$name,
	    assistiveText = _ref.assistiveText,
	    category = _ref.category,
	    icon = _ref.icon,
	    path = _ref.path,
	    rest = _objectWithoutProperties(_ref, ['name', 'assistiveText', 'category', 'icon', 'path']);

	var data = void 0;

	// if the user passes in modified path, then we don't use data
	if (!path) {
		if (icon) {
			data = icon;
		} else {
			switch (category) {
				case 'action':
					data = SLDS_ICONS_ACTION[name.toLowerCase()];
					data.viewBox = SLDS_ICONS_ACTION.viewBox;
					break;
				case 'custom':
					data = SLDS_ICONS_CUSTOM[name.toLowerCase()];
					data.viewBox = SLDS_ICONS_CUSTOM.viewBox;
					break;
				case 'doctype':
					data = SLDS_ICONS_DOCTYPE[name.toLowerCase()];
					data.viewBox = SLDS_ICONS_DOCTYPE.viewBox;
					break;
				case 'standard':
					data = SLDS_ICONS_STANDARD[name.toLowerCase()];
					data.viewBox = SLDS_ICONS_STANDARD.viewBox;
					break;
				case 'utility':
				default:
					data = SLDS_ICONS_UTILITY[name.toLowerCase()];
					data.viewBox = SLDS_ICONS_UTILITY.viewBox;
					break;
			}
		}
	}

	// Use icon path prop if set, then see if a global path is set, if not use inline icons
	var modifiedPath = path || _settings2.default.getIconsPath() && _settings2.default.getIconsPath() + '/' + category + '-sprite/svg/symbols.svg#' + name;

	(0, _checkProps2.default)('UtilityIcon', { name: name, category: category, path: path });

	var output = modifiedPath && !icon ? _react2.default.createElement(
		'svg',
		rest,
		_react2.default.createElement('use', { xlinkHref: modifiedPath })
	) : _react2.default.createElement(_svg2.default, _extends({ data: data, name: name }, rest));

	return output;
};

UtilityIcon.displayName = 'UtilityIcon';

UtilityIcon.propTypes = {
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

module.exports = UtilityIcon;