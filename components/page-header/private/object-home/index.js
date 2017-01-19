'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mediaObject = require('../../../media-object');

var _mediaObject2 = _interopRequireDefault(_mediaObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

var displayName = 'PageHeaderObjectHome';
var propTypes = {
	/**
  * Content to appear on the right hand side of the page header
  */
	contentRight: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
	/**
  * Icon node passed by PageHeader
  */
	icon: _react.PropTypes.node,
	/**
  * Info node passed by PageHeader
  */
	info: _react.PropTypes.node,
	/**
  * Heading above title
  */
	label: _react.PropTypes.node,
	/**
  * Nav content which appears in the upper right hand corner.
  */
	navRight: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
	/**
  * Title node passed by PageHeader
  */
	title: _react2.default.PropTypes.node
};

var ObjectHome = function ObjectHome(props) {
	return _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement(
			'div',
			{ className: 'slds-grid' },
			_react2.default.createElement(
				'div',
				{ className: 'slds-col slds-has-flexi-truncate' },
				_react2.default.createElement(_mediaObject2.default, {
					body: _react2.default.createElement(
						'div',
						null,
						props.label,
						props.title
					),
					figure: props.icon,
					verticalCenter: true
				})
			),
			_react2.default.createElement(
				'div',
				{ className: 'slds-col slds-no-flex slds-grid slds-align-top' },
				props.navRight
			)
		),
		_react2.default.createElement(
			'div',
			{ className: 'slds-grid' },
			_react2.default.createElement(
				'div',
				{ className: 'slds-col slds-align-bottom' },
				_react2.default.createElement(
					'p',
					{ className: 'slds-text-body--small' },
					props.info
				)
			),
			_react2.default.createElement(
				'div',
				{ className: 'slds-col slds-no-flex slds-grid slds-align-bottom' },
				props.contentRight
			)
		)
	);
};

ObjectHome.displayName = displayName;
ObjectHome.propTypes = propTypes;

module.exports = ObjectHome;