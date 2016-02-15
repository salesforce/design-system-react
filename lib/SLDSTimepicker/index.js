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

var _SLDSPopover = require('../SLDSPopover');

var _SLDSPopover2 = _interopRequireDefault(_SLDSPopover);

var _InputIcon = require('../SLDSIcon/InputIcon');

var _InputIcon2 = _interopRequireDefault(_InputIcon);

var _SLDSMenuList = require('../SLDSMenuList');

var _SLDSMenuList2 = _interopRequireDefault(_SLDSMenuList);

var _ListItemLabel = require('../SLDSMenuList/ListItemLabel');

var _ListItemLabel2 = _interopRequireDefault(_ListItemLabel);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var displayName = 'SLDSTimepicker';
var propTypes = {

  /**
   * Time formatting function
   */
  formatter: _react2.default.PropTypes.func,

  /**
   * Parsing date string into Date
   */
  parser: _react2.default.PropTypes.func,

  /**
   * Date
   */
  value: _react2.default.PropTypes.instanceOf(Date),

  stepInMinutes: _react2.default.PropTypes.number,

  strValue: _react2.default.PropTypes.string

};
var defaultProps = {
  formatter: function formatter(date) {
    if (date) {
      return date.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
    }
  },
  onDateChange: function onDateChange(date, strValue) {
    console.log('onDateChange should be defined');
  },
  parser: function parser(timeStr) {
    var date = new Date();
    var dateStr = date.toLocaleString(navigator.language, { year: 'numeric', month: 'numeric', day: 'numeric' });
    return new Date(dateStr + ' ' + timeStr);
  },

  placeholder: 'Pick Time',
  value: null,
  stepInMinutes: 30
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
      strValue: this.props.strValue,
      options: this.getOptions()
    };
  },
  handleChange: function handleChange(date, strValue) {
    this.setState({
      value: date,
      strValue: strValue,
      isOpen: false
    });
    if (this.props.onDateChange) {
      this.props.onDateChange(date, strValue);
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
  getOptions: function getOptions() {
    var d = new Date();
    var options = [];
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    var curDate = new Date(d);
    while (d.getDate() === curDate.getDate()) {
      var formatted = this.props.formatter(curDate);
      options.push({
        label: formatted,
        value: new Date(curDate)
      });
      curDate.setMinutes(curDate.getMinutes() + this.props.stepInMinutes);
    }
    return options;
  },
  getListItemRenderer: function getListItemRenderer() {
    return this.props.listItemRenderer ? this.props.listItemRenderer : _ListItemLabel2.default;
  },
  getValueByIndex: function getValueByIndex(index) {
    var option = this.state.options[index];
    if (option) {
      return this.state.options[index];
    }
  },
  handleSelect: function handleSelect(index) {
    var val = this.getValueByIndex(index);
    if (val && val.value) {
      this.handleChange(val.value, val.label);
    }
    this.handleClose();
  },
  handleCancel: function handleCancel() {
    this.handleClose();
  },
  getPopoverContent: function getPopoverContent() {
    return _react2.default.createElement(_SLDSMenuList2.default, {
      checkmark: false,
      itemRenderer: this.getListItemRenderer(),
      onCancel: this.handleCancel,
      onSelect: this.handleSelect,
      options: this.state.options,
      ref: 'list',
      triggerId: this.state.triggerId
    });
  },
  getSimplePopover: function getSimplePopover() {
    return !this.props.disabled && this.state.isOpen ? _react2.default.createElement(
      'div',
      {
        className: 'slds-dropdown slds-dropdown--left slds-dropdown--menu',
        style: {
          maxHeight: "20em",
          overflowX: "hidden",
          minWidth: "100%"
        } },
      this.getPopoverContent()
    ) : null;
  },
  getModalPopover: function getModalPopover() {
    return !this.props.disabled && this.state.isOpen ? _react2.default.createElement(
      _SLDSPopover2.default,
      {
        className: 'slds-dropdown slds-dropdown--left ',
        closeOnTabKey: true,
        constrainToScrollParent: true,
        dropClass: 'slds-picklist',
        flippable: true,
        onClose: this.handleCancel.bind(this),
        targetElement: this.refs.triggerbutton },
      this.getPopoverContent()
    ) : null;
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
      if (!isShift && (event.keyCode === _utils.KEYS.ENTER ||
      //          event.keyCode === KEYS.SPACE ||
      event.keyCode === _utils.KEYS.DOWN || event.keyCode === _utils.KEYS.UP)) {
        _utils.EventUtil.trapEvent(event);

        this.setState({
          isOpen: true
        });
      }
    }
  },
  getInputIcon: function getInputIcon() {
    return _react2.default.createElement(_InputIcon2.default, { name: 'clock', style: { pointerEvents: 'none' } });
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'slds-form-element' },
      _react2.default.createElement(
        'label',
        { className: 'slds-form-element__label', htmlFor: 'date' },
        this.props.label
      ),
      _react2.default.createElement(
        'div',
        { className: 'slds-form-element__control' },
        _react2.default.createElement(
          'div',
          { className: 'slds-input-has-icon slds-input-has-icon--right' },
          this.getInputIcon(),
          _react2.default.createElement('input', {
            name: 'date',
            ref: 'date',
            className: 'slds-input',
            type: 'text',
            placeholder: this.props.placeholder,
            value: this.state.strValue,
            onKeyDown: this.handleKeyDown,
            onChange: this.handleInputChange,
            onClick: this.handleClick,
            onBlur: this.handleBlur,
            onFocus: this.handleFocus })
        )
      ),
      this.props.modal ? this.getModalPopover() : this.getSimplePopover()
    );
  }
});