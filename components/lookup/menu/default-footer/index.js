'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icon = require('../../../icon');

var _icon2 = _interopRequireDefault(_icon);

var _utilities = require('../../../../utilities');

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

// Implements the [Lookup design pattern](https://latest-204.lightningdesignsystem.com/components/lookups) in React.
// Based on SLDS v2.1.0-dev

var displayName = "LookupDefaultFooter";
var propTypes = {};
var defaultProps = {};

var DefaultFooter = function (_React$Component) {
	_inherits(DefaultFooter, _React$Component);

	function DefaultFooter(props) {
		_classCallCheck(this, DefaultFooter);

		return _possibleConstructorReturn(this, (DefaultFooter.__proto__ || Object.getPrototypeOf(DefaultFooter)).call(this, props));
	}

	_createClass(DefaultFooter, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.isActive !== this.props.isActive && nextProps.isActive === true) {
				this.props.setFocus('newItem');
			}
		}
	}, {
		key: 'handleClick',
		value: function handleClick() {
			if (this.props.onClose) {
				this.props.onClose();
			}
		}
	}, {
		key: 'handleMouseDown',
		value: function handleMouseDown(event) {
			_utilities.EventUtil.trapImmediate(event);
		}
	}, {
		key: 'render',
		value: function render() {
			var className = 'slds-lookup__item-action slds-lookup__item-action--label';
			if (this.props.isActive) className += ' slds-theme--shade';

			return _react2.default.createElement(
				'div',
				{ className: 'js-slds-lookup__item', onClick: this.handleClick.bind(this), onMouseDown: this.handleMouseDown.bind(this) },
				_react2.default.createElement(
					'a',
					{ id: 'newItem', href: 'javascript:void(0);', className: className },
					_react2.default.createElement(
						'span',
						{ className: 'lookup__item-action-label' },
						_react2.default.createElement(_icon2.default, { name: 'add', category: 'utility', size: 'x-small', className: 'slds-icon-text-default' }),
						_react2.default.createElement(
							'span',
							{ className: 'slds-truncate' },
							this.props.newItemLabel ? this.props.newItemLabel : "Add New Item"
						)
					)
				)
			);
		}
	}]);

	return DefaultFooter;
}(_react2.default.Component);

DefaultFooter.displayName = displayName;
DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

module.exports = DefaultFooter;