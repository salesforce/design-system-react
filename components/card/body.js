'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('../../utilities/constants');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CardBody = function CardBody(props) {
	return _react2.default.createElement(
		'div',
		{
			className: (0, _classnames2.default)('slds-card__body', props.className),
			id: props.id
		},
		props.children
	);
};

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally joining classNames together."
/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// ### React
// React is an external dependency of the project.


CardBody.displayName = _constants.CARD_BODY;

CardBody.propTypes = {
	/**
  * Elements to place in the body.
  */
	children: _react2.default.PropTypes.node,
	/**
  * CSS classes to be added to the card.
  */
	className: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.array, _react2.default.PropTypes.object, _react2.default.PropTypes.string]),
	/**
  * Set the HTML `id` of the body.
  */
	id: _react2.default.PropTypes.string
};

module.exports = CardBody;