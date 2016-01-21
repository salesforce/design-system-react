/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('../SLDSCalendar/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./SLDSDatePickerNav/index');

var _index4 = _interopRequireDefault(_index3);

var _utils = require('./../../utils');

var _utils2 = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _react2.default.createClass({
  displayName: 'exports',
  getDefaultProps: function getDefaultProps() {
    return {
      selectedDate: new Date(),
      value: new Date(),

      onChange: function onChange(date) {
        console.log('onChange should be defined ', date);
      },
      onDisplayedDateChange: function onDisplayedDateChange(date) {
        console.log('onDisplayedDateChange should be defined ', date);
      },
      onClose: function onClose() {
        console.log('onClose should be defined');
      }
    };
  },
  getInitialState: function getInitialState() {
    return {
      displayedDate: this.props.selectedDate,
      isFocused: false,
      isClosing: false
    };
  },
  handleKeyDown: function handleKeyDown(event) {
    if (event.keyCode) {
      if (event.keyCode === _utils2.KEYS.ESCAPE) {
        if (this.props.onClose) {
          this.props.onClose();
        }
      } else if (event.keyCode === _utils2.KEYS.SPACE) {} else if (event.keyCode === _utils2.KEYS.ENTER) {} else if (event.keyCode === _utils2.KEYS.TAB) {} else if (event.keyCode === _utils2.KEYS.ESCAPE) {} else {
        _utils.EventUtil.trapEvent(event);
      }
    }
  },
  handleClickOutside: function handleClickOutside(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.props.onClose) {
      this.props.onClose();
    }
  },
  handleDisplayedDateChange: function handleDisplayedDateChange(displayedDate) {
    if (this.props.onDisplayedDateChange) {
      this.props.onDisplayedDateChange(displayedDate);
    }
    this.setState({ displayedDate: displayedDate });
  },
  handleSelectDate: function handleSelectDate(selectedDate) {
    if (this.props.onChange) {
      this.props.onChange(selectedDate);
    }
  },
  handleCancel: function handleCancel() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  },
  handleBGClick: function handleBGClick(event) {
    if (event.nativeEvent) {
      event.nativeEvent.preventDefault();
    }
  },
  handleFocus: function handleFocus() {
    this.setState({ isFocused: true });
  },
  handleBlur: function handleBlur() {
    this.setState({ isFocused: false });
  },
  render: function render() {

    return _react2.default.createElement(
      'div',
      { className: 'ignore-react-onclickoutside' },
      _react2.default.createElement(
        'div',
        { className: 'slds-datepicker',
          'aria-hidden': false,
          'data-selection': 'single',
          onMouseDown: this.handleBGClick,
          onKeyDown: this.handleKeyDown,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          onClick: this.handleBGClick },
        _react2.default.createElement(_index4.default, {
          onChange: this.handleDisplayedDateChange,
          selectedDate: this.props.selectedDate,
          autoFocus: true,
          displayedDate: this.state.displayedDate,
          onCancel: this.handleCancel }),
        _react2.default.createElement(_index2.default, {
          selectedDate: this.props.selectedDate,
          onChange: this.handleDisplayedDateChange,
          displayedDate: this.state.displayedDate,
          onSelectDate: this.handleSelectDate,
          onCancel: this.handleCancel }),
        _react2.default.createElement(
          'span',
          { id: 'bn_prev-label', className: 'slds-assistive-text' },
          'Go to previous month'
        ),
        _react2.default.createElement(
          'span',
          { id: 'bn_next-label', className: 'slds-assistive-text' },
          'Go to next month'
        )
      )
    );
  },
  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    var _this = this;

    if (!this.state.isFocused && prevState.isFocused) {
      this.setState({ isClosing: true });

      setTimeout(function () {

        if (_this.isMounted()) {
          if (_this.state.isClosing) {
            if (_this.state.isFocused) {
              _this.setState({ isClosing: false });
            } else {
              if (_this.props.onClose) {
                _this.props.onClose();
              }
            }
          }
        }
      });
    }
  }
});