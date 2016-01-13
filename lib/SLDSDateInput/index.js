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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _SLDSPopover = require('../SLDSPopover');

var _SLDSPopover2 = _interopRequireDefault(_SLDSPopover);

var _SLDSDatePickerIndex = require('./SLDSDatePicker/index');

var _SLDSDatePickerIndex2 = _interopRequireDefault(_SLDSDatePickerIndex);

var _InputIcon = require('./../SLDSIcon/InputIcon');

var _utils = require('../utils');

module.exports = _react2['default'].createClass({
  displayName: 'exports',

  getDefaultProps: function getDefaultProps() {
    return {
      string: '',
      value: new Date(),
      placeholder: 'Pick a Date',
      formatter: function formatter(date) {
        return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
      },
      parser: function parser(str) {
        return new Date(str);
      },
      onDateChange: function onDateChange(date) {
        console.log('onDateChange should be defined');
      }
    };
  },

  getInitialState: function getInitialState() {
    return {
      isOpen: false,
      value: this.props.value,
      string: this.props.selectedDate ? this.props.formatter(this.props.selectedDate) : null
    };
  },

  handleChange: function handleChange(date) {
    this.setState({
      value: date,
      isOpen: false,
      string: this.props.formatter(date)
    });
    if (this.props.onDateChange) {
      this.props.onDateChange(date);
    }
  },

  handleClose: function handleClose() {
    this.setState({ isOpen: false });
    this.setFocus();
  },

  handleClick: function handleClick() {
    this.setState({ isOpen: true });
  },

  handleFocus: function handleFocus() {
    //    this.setState({isOpen:true})
  },

  handleBlur: function handleBlur() {
    //    this.setState({isOpen:false})
  },

  setFocus: function setFocus() {
    if (this.isMounted()) {
      _reactDom2['default'].findDOMNode(this.refs.date).focus();
    }
  },

  popover: function popover() {
    if (this.state && this.state.isOpen) {
      return _react2['default'].createElement(
        _SLDSPopover2['default'],
        { className: 'slds-dropdown', targetElement: this.refs.date, onClose: this.handleClose },
        _react2['default'].createElement(_SLDSDatePickerIndex2['default'], {
          onChange: this.handleChange,
          selected: this.state.selected,
          onClose: this.handleClose,
          selectedDate: this.state.value })
      );
    }
    return _react2['default'].createElement('span', null);
  },

  handleInputChange: function handleInputChange() {
    var string = _reactDom2['default'].findDOMNode(this.refs.date).value;
    var date = this.props.parser(string);
    if (date) {
      this.setState({
        value: date,
        string: string
      });
      if (this.props.onDateChage) {
        this.props.onDateChange(value);
      }
    } else {
      this.setState({
        isOpen: false
      });
    }
  },

  handleKeyDown: function handleKeyDown(event) {
    if (event.keyCode) {
      if (event.keyCode === _utils.KEYS.ENTER || event.keyCode === _utils.KEYS.SPACE || event.keyCode === _utils.KEYS.DOWN || event.keyCode === _utils.KEYS.UP) {
        _utils.EventUtil.trapEvent(event);

        this.setState({
          isOpen: true
        });
      }
    }
  },

  render: function render() {
    return _react2['default'].createElement(
      'div',
      { className: 'slds-form-element' },
      _react2['default'].createElement(
        'label',
        { className: 'slds-form-element__label', htmlFor: 'date' },
        this.props.label
      ),
      _react2['default'].createElement(
        'div',
        { className: 'slds-form-element__control' },
        _react2['default'].createElement(
          'div',
          { className: 'slds-input-has-icon slds-input-has-icon--right' },
          _react2['default'].createElement(_InputIcon, { name: 'event' }),
          _react2['default'].createElement('input', {
            name: 'date',
            ref: 'date',
            className: 'slds-input',
            type: 'text',
            placeholder: this.props.placeholder,
            value: this.state.value ? this.state.string : '',
            onKeyDown: this.handleKeyDown,
            onChange: this.handleInputChange,
            onClick: this.handleClick,
            onBlur: this.handleBlur,
            onFocus: this.handleFocus })
        )
      ),
      this.popover()
    );
  }
});