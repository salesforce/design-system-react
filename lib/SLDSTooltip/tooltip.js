/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SLDSPopover = require('../SLDSPopover');

var _SLDSPopover2 = _interopRequireDefault(_SLDSPopover);

var classNames = require("classnames");

var getClassName = function getClassName(props) {
  var _classNames;

  return classNames(props.className, "slds-popover", (_classNames = {}, _defineProperty(_classNames, "slds-popover--tooltip", true), _defineProperty(_classNames, "slds-nubbin--top", props.align === 'bottom'), _defineProperty(_classNames, 'slds-nubbin--bottom', props.align === 'top'), _defineProperty(_classNames, 'slds-nubbin--left', props.align === 'right'), _defineProperty(_classNames, 'slds-nubbin--right', props.align === 'left'), _classNames));
};

var getHorizontalAlign = function getHorizontalAlign(align) {
  if (align === 'left') {
    return 'left';
  } else if (align === 'right') {
    return 'right';
  }
  return 'center';
};

var getVerticalAlign = function getVerticalAlign(align) {
  if (align === 'bottom') {
    return 'bottom';
  } else if (align === 'top') {
    return 'top';
  }
  return 'middle';
};

var getTooltip = function getTooltip(props, content, target, onClose) {
  return _react2['default'].createElement(
    _SLDSPopover2['default'],
    {
      className: '',
      closeOnTabKey: true,
      flippable: false,
      horizontalAlign: getHorizontalAlign(props.align),
      marginBottom: '1rem',
      marginLeft: '1.5rem',
      marginRight: '1.5rem',
      marginTop: '1rem',
      onClose: onClose,
      targetElement: target,
      verticalAlign: getVerticalAlign(props.align) },
    _react2['default'].createElement(
      'div',
      { className: getClassName(props), role: 'tooltip' },
      content
    )
  );
};

module.exports = {

  getClassName: getClassName,

  getHorizontalAlign: getHorizontalAlign,

  getVerticalAlign: getVerticalAlign,

  getTooltip: getTooltip

};