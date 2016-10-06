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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _popover = require('../popover');

var _popover2 = _interopRequireDefault(_popover);

var _index = require('./date-picker-base/index');

var _index2 = _interopRequireDefault(_index);

var _inputIcon = require('../icon/input-icon');

var _inputIcon2 = _interopRequireDefault(_inputIcon);

var _utilities = require('../../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var displayName = 'Datepicker';
var propTypes = {
  abbrWeekDayLabels: _react2.default.PropTypes.array,
  disabled: _react2.default.PropTypes.bool,
  /**
   * Date formatting function
   */
  formatter: _react2.default.PropTypes.func,
  monthLabels: _react2.default.PropTypes.array,
  /**
   * Parsing date string into Date
   */
  parser: _react2.default.PropTypes.func,
  relativeYearFrom: _react2.default.PropTypes.number,
  relativeYearTo: _react2.default.PropTypes.number,
  /**
   * If true, adds asterisk next to input label to indicate it is a required field.
   */
  required: _react2.default.PropTypes.bool,
  strValue: _react2.default.PropTypes.string,
  todayLabel: _react2.default.PropTypes.string,
  /**
   * Date
   */
  value: _react2.default.PropTypes.instanceOf(Date),
  weekDayLabels: _react2.default.PropTypes.array
};
var defaultProps = {
  abbrWeekDayLabels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  formatter: function formatter(date) {
    if (date) {
      return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
    }
  },

  monthLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  onDateChange: function onDateChange(date, strValue) {
    console.log('onDateChange should be defined');
  },
  parser: function parser(str) {
    return new Date(str);
  },

  placeholder: 'Pick a Date',
  relativeYearFrom: -5,
  relativeYearTo: 5,
  required: false,
  todayLabel: 'Today',
  value: null,
  weekDayLabels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
};

module.exports = _react2.default.createClass({

  displayName: displayName,

  propTypes: propTypes,

  getDefaultProps: function getDefaultProps() {
    return defaultProps;
  },
  getInitialState: function getInitialState() {
    return {
      isOpen: false,
      value: this.props.value,
      strValue: this.props.strValue
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.value && this.props.value) {
      var currentDate = this.props.value.getTime();
      var nextDate = nextProps.value.getTime();

      if (currentDate !== nextDate) {
        this.setState({
          value: nextProps.value,
          strValue: this.props.formatter(nextProps.value)
        });
      }
    }
  },
  handleChange: function handleChange(date) {
    this.setState({
      value: date,
      strValue: this.props.formatter(date),
      isOpen: false
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
      _reactDom2.default.findDOMNode(this.refs.date).focus();
    }
  },
  parseDate: function parseDate(strValue) {
    var d = this.props.parser(strValue);
    if (Object.prototype.toString.call(d) === "[object Date]") {
      if (!isNaN(d.getTime())) {
        return d;
      }
    }
    return new Date();
  },
  getSimplePopover: function getSimplePopover() {
    return !this.props.disabled && this.state.isOpen ? _react2.default.createElement(
      'div',
      { className: 'slds-dropdown slds-dropdown--left' },
      this.getDatePicker()
    ) : null;
  },
  getModalPopover: function getModalPopover() {
    return !this.props.disabled && this.state.isOpen ? _react2.default.createElement(
      _popover2.default,
      {
        closeOnTabKey: true,
        constrainToScrollParent: this.props.constrainToScrollParent,
        inheritTargetWidth: this.props.inheritTargetWidth,
        flippable: true,
        onClose: this.handleClose,
        targetElement: this.refs.date },
      this.getDatePicker()
    ) : null;
  },
  getDatePicker: function getDatePicker() {
    var date = this.state.strValue ? this.parseDate(this.state.strValue) : this.state.value;
    return _react2.default.createElement(_index2.default, {
      onChange: this.handleChange,
      selected: this.state.selected,
      onClose: this.handleClose,
      abbrWeekDayLabels: this.props.abbrWeekDayLabels,
      weekDayLabels: this.props.weekDayLabels,
      monthLabels: this.props.monthLabels,
      todayLabel: this.props.todayLabel,
      relativeYearFrom: this.props.relativeYearFrom,
      relativeYearTo: this.props.relativeYearTo,
      selectedDate: date ? date : new Date() });
  },
  handleInputChange: function handleInputChange() {
    var string = _reactDom2.default.findDOMNode(this.refs.date).value;
    this.setState({
      strValue: string
    });
    if (this.props.onDateChange) {
      var d = this.props.parser(string);
      this.props.onDateChange(d, string);
    }
  },
  handleKeyDown: function handleKeyDown(event) {
    if (event.keyCode) {
      var isShift = !!event.shiftKey;
      if (!isShift && (event.keyCode === _utilities.KEYS.ENTER ||
      //          event.keyCode === KEYS.SPACE ||
      event.keyCode === _utilities.KEYS.DOWN || event.keyCode === _utilities.KEYS.UP)) {
        _utilities.EventUtil.trapEvent(event);

        this.setState({
          isOpen: true
        });
      }
    }
  },
  getInputIcon: function getInputIcon() {
    // inline style override
    return _react2.default.createElement(_inputIcon2.default, { name: 'event', style: { pointerEvents: 'none' } });
  },
  inputRefName: function inputRefName() {
    return this.props.label + 'Datepicker';
  },
  getLabel: function getLabel() {
    // inline style override
    var required = this.props.required ? _react2.default.createElement(
      'span',
      { style: { color: "red" } },
      '* '
    ) : null;
    var inputLabel = this.props.label ? _react2.default.createElement(
      'label',
      { className: 'slds-form-element__label', htmlFor: this.inputRefName(), style: { width: "100%" } },
      required,
      this.props.label
    ) : null;
    return inputLabel;
  },
  render: function render() {

    var inputStyles = this.props.disabled ? { cursor: 'inherit' } : { cursor: 'pointer' };

    return _react2.default.createElement(
      'div',
      { className: 'slds-form-element' },
      this.getLabel(),
      _react2.default.createElement(
        'div',
        { className: 'slds-form-element__control' },
        _react2.default.createElement(
          'div',
          { className: 'slds-input-has-icon slds-input-has-icon--right' },
          this.getInputIcon(),
          _react2.default.createElement('input', {
            id: this.inputRefName(),
            ref: 'date',
            className: 'slds-input slds-button--neutral slds-text-align--left',
            disabled: this.props.disabled,
            type: 'text',
            placeholder: this.props.placeholder,
            value: this.state.strValue,
            onKeyDown: this.handleKeyDown,
            onChange: this.handleInputChange,
            onClick: this.handleClick,
            onBlur: this.handleBlur,
            onFocus: this.handleFocus,
            style: inputStyles
          })
        )
      ),
      this.props.modal ? this.getModalPopover() : this.getSimplePopover()
    );
  }
});