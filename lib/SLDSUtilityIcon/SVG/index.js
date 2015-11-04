/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sldsIconsUtility = require('./slds-icons-utility');

var _sldsIconsUtility2 = _interopRequireDefault(_sldsIconsUtility);

var _sldsIconsAction = require('./slds-icons-action');

var _sldsIconsAction2 = _interopRequireDefault(_sldsIconsAction);

var _sldsIconsCustom = require('./slds-icons-custom');

var _sldsIconsCustom2 = _interopRequireDefault(_sldsIconsCustom);

var _sldsIconsDoctype = require('./slds-icons-doctype');

var _sldsIconsDoctype2 = _interopRequireDefault(_sldsIconsDoctype);

var _sldsIconsStandard = require('./slds-icons-standard');

var _sldsIconsStandard2 = _interopRequireDefault(_sldsIconsStandard);

module.exports = _react2['default'].createClass({
  displayName: 'exports',

  getDefaultProps: function getDefaultProps() {
    return {
      name: 'announcenent',
      category: 'utility'
    };
  },

  getPaths: function getPaths(paths) {
    if (paths instanceof Array) {
      return paths.map(function (item) {
        return _react2['default'].createElement('path', item);
      });
    }
    return _react2['default'].createElement('path', paths);
  },

  getCircles: function getCircles(circles) {
    if (circles instanceof Array) {
      return circles.map(function (item) {
        return _react2['default'].createElement('circle', item);
      });
    }
    return _react2['default'].createElement('circle', circles);
  },

  getEllipses: function getEllipses(ellipses) {
    if (ellipses instanceof Array) {
      return ellipses.map(function (item) {
        return _react2['default'].createElement('ellipse', item);
      });
    }
    return _react2['default'].createElement('ellipse', ellipses);
  },

  getGroups: function getGroups(groups) {
    var _this = this;

    if (groups instanceof Array) {
      return groups.map(function (item) {
        return _react2['default'].createElement(
          'g',
          null,
          _this.getShapes(item)
        );
      });
    }
    return _react2['default'].createElement(
      'g',
      null,
      this.getShapes(groups)
    );
  },

  getShapes: function getShapes(data) {
    var shapes = [];
    if (data.g) {
      shapes.push(this.getGroups(data.g));
    }
    if (data.ellipse) {
      shapes.push(this.getEllipses(data.ellipse));
    }
    if (data.circle) {
      shapes.push(this.getCircles(data.circle));
    }
    if (data.path) {
      shapes.push(this.getPaths(data.path));
    }
    return shapes;
  },

  getSVG: function getSVG(name, category) {
    var data;
    var viewBox;
    switch (category) {
      case 'utility':
        data = _sldsIconsUtility2['default'][name.toLowerCase()];
        viewBox = _sldsIconsUtility2['default'].viewBox;
        break;
      case 'action':
        data = _sldsIconsAction2['default'][name.toLowerCase()];
        viewBox = _sldsIconsAction2['default'].viewBox;
        break;
      case 'custom':
        data = _sldsIconsCustom2['default'][name.toLowerCase()];
        viewBox = _sldsIconsCustom2['default'].viewBox;
        break;
      case 'doctype':
        data = _sldsIconsDoctype2['default'][name.toLowerCase()];
        viewBox = _sldsIconsDoctype2['default'].viewBox;
        break;
      case 'standard':
        data = _sldsIconsStandard2['default'][name.toLowerCase()];
        viewBox = _sldsIconsStandard2['default'].viewBox;
        break;
      default:
        data = _sldsIconsUtility2['default'][name.toLowerCase()];
        viewBox = _sldsIconsUtility2['default'].viewBox;
        break;
    }
    return _react2['default'].createElement(
      'svg',
      _extends({}, this.props, { viewBox: viewBox }),
      this.getShapes(data)
    );
  },

  render: function render() {
    return this.getSVG(this.props.name, this.props.category);
  }
});