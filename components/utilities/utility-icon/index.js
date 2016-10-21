'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _svg = require('./svg');

var _svg2 = _interopRequireDefault(_svg);

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

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /*
                                                                                                                                                                                                                             Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                                                                                                                                                                                                                             
                                                                                                                                                                                                                             Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                                                                                                                                                                                                             Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                                                                                                                                                                                                             Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                                                                                                                                                                                                             Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                                                                                                                                                                                                                             
                                                                                                                                                                                                                             THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                                                                                                                                                                                                             */

var UtilityIcon = function UtilityIcon(_ref) {
	var _ref$name = _ref.name;
	var name = _ref$name === undefined ? '' : _ref$name;
	var _ref$category = _ref.category;
	var category = _ref$category === undefined ? 'utility' : _ref$category;
	var icon = _ref.icon;

	var rest = _objectWithoutProperties(_ref, ['name', 'category', 'icon']);

	var data = void 0;

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

	return _react2.default.createElement(_svg2.default, _extends({ data: data, name: name }, rest));
};

UtilityIcon.displayName = 'UtilityIcon';

UtilityIcon.propTypes = {
	category: _react2.default.PropTypes.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']),
	/**
   * An SVG object to use instead of name / category, look in `design-system-react/icons` for examples
   */
	icon: _react2.default.PropTypes.object,
	/**
   * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
   */
	name: _react2.default.PropTypes.string
};

module.exports = UtilityIcon;