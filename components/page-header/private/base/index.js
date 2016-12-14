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

var displayName = 'PageHeaderBase';
var propTypes = {
	/**
  * Icon node passed by PageHeader
  */
	icon: _react.PropTypes.node,
	/**
  * Title node passed by PageHeader
  */
	title: _react.PropTypes.node,
	/**
  * Info node passed by PageHeader
  */
	info: _react.PropTypes.node
};

var Base = function Base(props) {
	return _react2.default.createElement(_mediaObject2.default, {
		body: _react2.default.createElement(
			'div',
			null,
			props.title,
			props.info
		),
		figure: props.icon,
		verticalCenter: true
	});
};

Base.displayName = displayName;
Base.propTypes = propTypes;

module.exports = Base;