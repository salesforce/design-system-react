'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.omit');

var _lodash2 = _interopRequireDefault(_lodash);

var _detailBlock = require('./detail-block');

var _detailBlock2 = _interopRequireDefault(_detailBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

var displayName = 'PageHeaderDetailRow';
var propTypes = {
  /**
   * Optional class name
   */
  className: _react2.default.PropTypes.string,
  /**
   * An array of detail blocks
   */
  details: _react2.default.PropTypes.array
};
var defaultProps = {};

var DetailRow = function (_Component) {
  _inherits(DetailRow, _Component);

  function DetailRow() {
    _classCallCheck(this, DetailRow);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(DetailRow).apply(this, arguments));
  }

  _createClass(DetailRow, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var children = _props.children;
      var className = _props.className;
      var details = _props.details;

      var attr = (0, _lodash2.default)(['children', 'className'], this.props);
      var classes = this._getClassNames(className);

      var detailsElement = void 0;

      /**
       * Render the deets
       */
      var renderDetails = function renderDetails() {
        if (children !== void 0) {
          return children;
        } else {
          return details.map(function (detail, i) {
            var key = 'PageHeader.detailBlock.' + i;

            return _react2.default.createElement(_detailBlock2.default, {
              key: key,
              flavor: detail.flavor,
              label: detail.label,
              content: detail.content });
          });
        }
      };

      detailsElement = renderDetails();

      return _react2.default.createElement(
        'ul',
        _extends({ className: classes }, attr),
        detailsElement
      );
    }
  }, {
    key: '_getClassNames',
    value: function _getClassNames(className) {
      return (0, _classnames2.default)('slds-grid slds-page-header__detail-row', className);
    }
  }]);

  return DetailRow;
}(_react.Component);

DetailRow.displayName = displayName;
DetailRow.propTypes = propTypes;
DetailRow.defaultProps = defaultProps;

module.exports = DetailRow;