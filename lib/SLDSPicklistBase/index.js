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

var _lodashIsequal = require('lodash.isequal');

var _lodashIsequal2 = _interopRequireDefault(_lodashIsequal);

var _SLDSPopover = require('../SLDSPopover');

var _SLDSPopover2 = _interopRequireDefault(_SLDSPopover);

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var _listItem = require('./list-item');

var _listItem2 = _interopRequireDefault(_listItem);

var _listItemLabel = require('./list-item-label');

var _listItemLabel2 = _interopRequireDefault(_listItemLabel);

var _SLDSIcons = require("./../SLDSIcons");

var _SLDSIcons2 = require("../SLDSIcons");

var _utils = require('../utils');

module.exports = _react2['default'].createClass({
  displayName: 'exports',

  propTypes: {
    onClick: _react.PropTypes.func,
    onSelect: _react.PropTypes.func.isRequired,
    onUpdateHighlighted: _react.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      placeholder: 'Select an Option',
      disabled: false,
      theme: 'default',
      label: 'Picklist',
      value: null,
      options: [],
      initialFocus: false,
      modal: false,
      className: '',
      listClassName: '',
      listItemRenderer: null
    };
  },

  getInitialState: function getInitialState() {
    return {
      triggerId: null,
      isOpen: false,
      isFocused: false,
      highlightedIndex: 0,
      selectedIndex: this.getIndexByValue(this.props.value),
      lastBlurredIndex: -1,
      lastBlurredTimeStamp: -1
    };
  },

  componentDidMount: function componentDidMount() {
    var id = _react2['default'].findDOMNode(this.refs.triggerbutton).getAttribute("data-reactid");
    this.setState({ triggerId: id });

    if (this.props.initialFocus) {
      this.setFocus();
    }
  },

  getIndexByValue: function getIndexByValue(value) {
    var foundIndex = -1;
    if (this.props.options && this.props.options.length) {
      this.props.options.some(function (element, index, array) {
        if (element && element.value === value) {
          foundIndex = index;
          return true;
        }
        return false;
      });
    }
    return foundIndex;
  },

  getValueByIndex: function getValueByIndex(index) {
    var option = this.props.options[index];
    if (option) {
      return this.props.options[index];
    }
  },

  handleSelect: function handleSelect(index) {
    this.setState({ selectedIndex: index });
    this.setFocus();
    if (this.props.onSelect) {
      this.props.onSelect(this.getValueByIndex(index));
    }
  },

  handleClose: function handleClose() {
    this.setState({ isOpen: false });
  },

  handleClick: function handleClick(event) {
    _utils.EventUtil.trap(event);
    if (!this.state.isOpen) {
      this.setState({ isOpen: true });
      if (this.props.onClick) {
        this.props.onClick();
      }
    } else {
      this.handleClose();
    }
  },

  handleMouseDown: function handleMouseDown(event) {
    _utils.EventUtil.trapImmediate(event);
  },

  handleBlur: function handleBlur(e) {
    this.setState({ isFocused: false });
  },

  handleFocus: function handleFocus() {
    this.setState({ isFocused: true });
  },

  setFocus: function setFocus() {
    if (this.isMounted()) {
      _react2['default'].findDOMNode(this.refs.triggerbutton).focus();
    }
  },

  moveHighlight: function moveHighlight(delta) {},

  handleKeyDown: function handleKeyDown(event) {
    if (event.keyCode) {
      if (event.keyCode === _utils.KEYS.ENTER || event.keyCode === _utils.KEYS.SPACE || event.keyCode === _utils.KEYS.DOWN || event.keyCode === _utils.KEYS.UP) {
        _utils.EventUtil.trapEvent(event);

        this.setState({
          isOpen: true,
          highlightedIndex: 0
        });
      }
    }
  },

  handleUpdateHighlighted: function handleUpdateHighlighted(nextIndex) {
    this.setState({ highlightedIndex: nextIndex });
  },

  handleListBlur: function handleListBlur() {
    this.setState({ isOpen: false });
  },

  handleCancel: function handleCancel() {
    this.setFocus();
  },

  getListItemRenderer: function getListItemRenderer() {
    return this.props.listItemRenderer ? this.props.listItemRenderer : _listItemLabel2['default'];
  },

  getPopoverContent: function getPopoverContent() {
    return _react2['default'].createElement(_list2['default'], {
      triggerId: this.state.triggerId,
      ref: 'list',
      options: this.props.options,
      label: this.props.label,
      className: this.props.listClassName,
      highlightedIndex: this.state.highlightedIndex,
      selectedIndex: this.state.selectedIndex,
      onSelect: this.handleSelect,
      onUpdateHighlighted: this.handleUpdateHighlighted,
      onListBlur: this.handleListBlur,
      onListItemBlur: this.handleListItemBlur,
      onCancel: this.handleCancel,
      itemRenderer: this.getListItemRenderer(),
      theme: this.props.theme });
  },

  getSimplePopover: function getSimplePopover() {
    return !this.props.disabled && this.state.isOpen ? _react2['default'].createElement(
      'div',
      {
        className: 'slds-dropdown slds-dropdown--left slds-dropdown--menu',
        style: { maxHeight: '20em' } },
      this.getPopoverContent()
    ) : null;
  },

  getModalPopover: function getModalPopover() {
    return !this.props.disabled && this.state.isOpen ? _react2['default'].createElement(
      _SLDSPopover2['default'],
      {
        className: 'slds-dropdown slds-dropdown--left slds-dropdown--small slds-dropdown--menu',
        targetElement: this.refs.date,
        closeOnTabKey: true,
        onClose: this.handleCancel },
      this.getPopoverContent()
    ) : null;
  },

  getPlaceholder: function getPlaceholder() {
    var option = this.props.options[this.state.selectedIndex];
    return option && option.label ? option.label : this.props.placeholder;
  },

  handleListItemBlur: function handleListItemBlur(index, relatedTarget) {
    this.setState({
      lastBlurredIndex: index,
      lastBlurredTimeStamp: Date.now()
    });
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {

    if (this.state.lastBlurredTimeStamp !== prevState.lastBlurredTimeStamp) {
      if (this.state.lastBlurredIndex === this.state.highlightedIndex) {
        this.handleClose();
      }
    }
    if (this.state.selectedIndex !== prevState.selectedIndex) {
      this.handleClose();
    } else if (this.state.isFocused && !prevState.isFocused) {
      this.setState({ isOpen: false });
    } else if (!this.state.isFocused && prevState.isFocused) {
      if (this.refs.list) {
        if (this.isMounted() && this.refs.list) {
          if (this.refs.list.getDOMNode().contains(document.activeElement)) {
            return;
          }
          this.setState({ isOpen: false });
        }
      }
    }

    if (this.props.value !== prevProps.value || !(0, _lodashIsequal2['default'])(this.props.options, prevProps.options)) {
      this.handleSelect(this.getIndexByValue(this.props.value));
    }
  },

  render: function render() {
    return _react2['default'].createElement(
      'div',
      { className: 'slds-picklist', 'aria-expanded': this.state.isOpen },
      _react2['default'].createElement(
        'button',
        {
          id: this.state.triggerId,
          ref: 'triggerbutton',
          className: 'slds-button slds-button--neutral slds-picklist__label',
          'aria-haspopup': 'true',
          onBlur: this.handleBlur,
          onFocus: this.handleFocus,
          onClick: this.handleClick,
          onMouseDown: this.handleMouseDown,
          tabIndex: this.state.isOpen ? -1 : 0,
          onKeyDown: this.handleKeyDown },
        _react2['default'].createElement(
          'span',
          { className: 'slds-truncate' },
          this.getPlaceholder()
        ),
        _react2['default'].createElement(_SLDSIcons2.Icon, { name: 'down', category: 'utility' })
      ),
      this.props.modal ? this.getModalPopover() : this.getSimplePopover()
    );
  }

});

module.exports.ListItem = _listItem2['default'];
module.exports.ListItemLabel = _listItemLabel2['default'];