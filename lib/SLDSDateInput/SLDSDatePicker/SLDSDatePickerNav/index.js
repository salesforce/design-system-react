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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SLDSYearSelectorIndex = require('../../SLDSYearSelector/index');

var _SLDSYearSelectorIndex2 = _interopRequireDefault(_SLDSYearSelectorIndex);

var _SLDSIcon = require('./../../../SLDSIcon');

var _utils = require('./../../../utils');

module.exports = _react2['default'].createClass({
  displayName: 'exports',

  getDefaultProps: function getDefaultProps() {
    return {
      displayedDate: new Date(),
      monthLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      onChangeMonth: function onChangeMonth() {
        console.log('onChangeMonth should be defined');
      }
    };
  },

  handleClick: function handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
  },

  handleChange: function handleChange(displayedDate) {
    if (this.props.onChange) {
      this.props.onChange(displayedDate);
    }
  },

  handleCancel: function handleCancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  },

  previousMonth: function previousMonth() {
    if (this.props.displayedDate && this.handleChange) {
      this.handleChange(_utils.DateUtil.addMonths(this.props.displayedDate, -1));
    }
  },

  componentDidMount: function componentDidMount() {},

  nextMonth: function nextMonth() {
    if (this.props.displayedDate && this.handleChange) {
      this.handleChange(_utils.DateUtil.addMonths(this.props.displayedDate, 1));
    }
  },

  handleYearSelect: function handleYearSelect(displayedDate) {
    if (this.props.onChange) {
      this.props.onChange(displayedDate);
    }
  },

  handleKeyDown: function handleKeyDown(event) {
    if (event.keyCode === _utils.KEYS.TAB) {
      if (event.shiftKey) {
        _utils.EventUtil.trapEvent(event);
        this.handleCancel();
      }
    }
  },

  getMonthLabel: function getMonthLabel() {
    return this.props.monthLabels[new Date(this.props.displayedDate).getMonth()];
  },

  render: function render() {
    return _react2['default'].createElement(
      'div',
      { className: 'slds-datepicker__filter slds-grid' },
      _react2['default'].createElement(
        'div',
        { className: 'slds-datepicker__filter--month slds-grid slds-grid--align-spread slds-size--3-of-4' },
        _react2['default'].createElement(
          'div',
          { className: 'slds-align-middle', role: 'button', 'aria-labelledby': 'bn_prev-label', tabIndex: -1 },
          _react2['default'].createElement(
            'button',
            {
              ref: 'prevMonth',
              className: 'slds-button slds-button--icon-container',
              autoFocus: this.props.autoFocus,
              role: 'button',
              tabIndex: 0,
              onKeyDown: this.handleKeyDown,
              onClick: this.previousMonth },
            _react2['default'].createElement(_SLDSIcon.ButtonIcon, { name: 'left' }),
            _react2['default'].createElement(
              'span',
              { className: 'slds-assistive-text' },
              'Previous Month'
            )
          )
        ),
        _react2['default'].createElement(
          'div',
          { id: 'month', className: 'slds-align-middle', role: 'heading', 'aria-live': 'assertive', 'aria-atomic': true },
          this.getMonthLabel()
        ),
        _react2['default'].createElement(
          'div',
          { className: 'slds-align-middle', role: 'button', 'aria-labelledby': 'bn_next-label', tabIndex: -1 },
          _react2['default'].createElement(
            'button',
            {
              ref: 'nextMonth',
              className: 'slds-button slds-button--icon-container',
              onClick: this.nextMonth },
            _react2['default'].createElement(_SLDSIcon.ButtonIcon, { name: 'right' }),
            _react2['default'].createElement(
              'span',
              { className: 'slds-assistive-text' },
              'Next Month'
            )
          )
        )
      ),
      _react2['default'].createElement(
        'div',
        { className: 'slds-picklist datepicker__filter--year slds-shrink-none' },
        _react2['default'].createElement(_SLDSYearSelectorIndex2['default'], {
          displayedDate: this.props.displayedDate,
          onChange: this.handleYearSelect })
      )
    );
  }
});