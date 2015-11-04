/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SLDSPopover = require('../SLDSPopover');

var _SLDSPopover2 = _interopRequireDefault(_SLDSPopover);

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var _listItem = require('./list-item');

var _listItem2 = _interopRequireDefault(_listItem);

var _listItemLabel = require('./list-item-label');

var _listItemLabel2 = _interopRequireDefault(_listItemLabel);

var _utilsCreateChainedFunction = require('../utils/create-chained-function');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var _SLDSButton = require('../SLDSButton');

var _SLDSButton2 = _interopRequireDefault(_SLDSButton);

var _SLDSIcons = require("./../SLDSIcons");

var _SLDSIcons2 = require("../SLDSIcons");

var _utils = require('../utils');

var _lodashOmit = require('lodash.omit');

var _lodashOmit2 = _interopRequireDefault(_lodashOmit);

module.exports = _react2['default'].createClass({
  displayName: 'exports',

  propTypes: {
    onClick: _react.PropTypes.func,
    onSelect: _react.PropTypes.func.isRequired,
    onUpdateHighlighted: _react.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      variant: 'neutral',
      placeholder: 'Select an Option',
      disabled: false,
      theme: 'default',
      label: 'Dropdown',
      value: null,
      options: [],
      initialFocus: false,
      modal: true,
      className: '',
      listClassName: '',
      openOn: 'hover',
      listItemRenderer: _listItemLabel2['default'],
      horizontalAlign: 'left',
      hoverCloseDelay: 300
    };
  },

  getInitialState: function getInitialState() {
    return {
      triggerId: null,
      isOpen: false,
      isFocused: false,
      isClosing: false,
      highlightedIndex: 0,
      selectedIndex: this.getIndexByValue(this.props.value),
      lastBlurredIndex: -1,
      lastBlurredTimeStamp: -1,
      isHover: false
    };
  },

  componentDidMount: function componentDidMount() {
    var id = _react2['default'].findDOMNode(this.refs.button).getAttribute("data-reactid");
    this.setState({ triggerId: id });
    if (this.props.initialFocus) {
      this.setFocus();
    }
    if (this.props.openOn === 'hover') {}
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    var _this = this;

    if (this.state.lastBlurredTimeStamp !== prevState.lastBlurredTimeStamp) {
      if (this.state.lastBlurredIndex === this.state.highlightedIndex) {
        this.handleClose();
      }
    }

    if (this.state.isOpen && !prevState.isOpen) {
      this.state.isClosing = false;
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
    } else if (this.state.isClosing && !prevState.isClosing) {
      setTimeout(function () {
        if (_this.state.isClosing) {
          _this.setState({ isOpen: false });
        }
      }, this.props.hoverCloseDelay);
    }

    if (this.props.value !== prevProps.value) {
      this.handleSelect(this.getIndexByValue(this.props.value));
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
    return this.props.options[index].value;
  },

  handleSelect: function handleSelect(index) {
    this.setState({ selectedIndex: index });
    this.setFocus();
    if (this.props.onSelect) {
      this.props.onSelect(this.getValueByIndex(index));
    }
  },

  handleClose: function handleClose() {
    this.setState({
      isOpen: false,
      isHover: false
    });
  },

  handleMouseEnter: function handleMouseEnter(event) {
    if (this.props.openOn === 'hover') {
      this.state.isClosing = false;
      if (!this.state.isOpen) {
        this.setState({
          isOpen: true,
          isHover: true
        });
      }
    }
  },

  handleMouseLeave: function handleMouseLeave(event) {
    if (this.props.openOn === 'hover') {
      this.setState({ isClosing: true });
    }
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
    this.setState({
      isFocused: true,
      isHover: false
    });
  },

  setFocus: function setFocus() {
    if (this.isMounted()) {
      _react2['default'].findDOMNode(this.getButtonNode()).focus();
    }
  },

  getButtonNode: function getButtonNode() {
    return _react2['default'].findDOMNode(this.refs.button);
  },

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
    if (!this.state.isHover) {
      this.setFocus();
    }
  },

  getPopoverContent: function getPopoverContent() {
    return _react2['default'].createElement(_list2['default'], {
      triggerId: this.state.triggerId,
      ref: 'list',
      options: this.props.options,
      className: this.props.listClassName,
      highlightedIndex: this.state.highlightedIndex,
      selectedIndex: this.state.selectedIndex,
      onSelect: this.handleSelect,
      onUpdateHighlighted: this.handleUpdateHighlighted,
      onListBlur: this.handleListBlur,
      onListItemBlur: this.handleListItemBlur,
      onMouseEnter: this.props.openOn === 'hover' ? this.handleMouseEnter : null,
      onMouseLeave: this.props.openOn === 'hover' ? this.handleMouseLeave : null,
      onCancel: this.handleCancel,
      itemRenderer: this.props.listItemRenderer,
      isHover: this.state.isHover,
      theme: this.props.theme });
  },

  getSimplePopover: function getSimplePopover() {
    return !this.props.disabled && this.state.isOpen ? _react2['default'].createElement(
      'div',
      {
        className: 'slds-dropdown slds-dropdown--left slds-dropdown--small slds-dropdown--menu',
        style: { maxHeight: '20em' } },
      this.getPopoverContent()
    ) : null;
  },

  getModalPopover: function getModalPopover() {
    var className = 'slds-dropdown slds-dropdown--small slds-dropdown--menu slds-dropdown--' + this.props.horizontalAlign;
    return !this.props.disabled && this.state.isOpen ? _react2['default'].createElement(
      _SLDSPopover2['default'],
      {
        className: className,
        horizontalAlign: this.props.horizontalAlign,
        targetElement: this.refs.button,
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

  render: function render() {
    var className = this.state.currentSelectedItem ? 'slds-input--bare slds-hide' : 'slds-input--bare';

    var props = (0, _lodashOmit2['default'])(this.props, ['aria-haspopup', 'label', 'className', 'style', 'variant', 'iconName', 'iconVariant', 'onBlur', 'onFocus', 'onClick', 'onMouseDown', 'onMouseEnter', 'onMouseLeave', 'tabIndex', 'onKeyDown']);
    return _react2['default'].createElement(
      _SLDSButton2['default'],
      _extends({
        ref: 'button',
        id: this.state.triggerId,
        'aria-haspopup': 'true',
        label: this.props.label,
        className: this.props.className,
        style: this.props.style,
        variant: this.props.variant,
        iconName: this.props.iconName,
        iconVariant: this.props.iconVariant,
        onBlur: (0, _utilsCreateChainedFunction2['default'])(this.props.onBlur, this.handleBlur),
        onFocus: (0, _utilsCreateChainedFunction2['default'])(this.props.onFocus, this.handleFocus),
        onClick: (0, _utilsCreateChainedFunction2['default'])(this.props.onClick, this.handleClick),
        onMouseDown: (0, _utilsCreateChainedFunction2['default'])(this.props.onMouseDown, this.handleMouseDown),
        onMouseEnter: (0, _utilsCreateChainedFunction2['default'])(this.props.onMouseEnter, this.props.openOn === 'hover' ? this.handleMouseEnter : null),
        onMouseLeave: (0, _utilsCreateChainedFunction2['default'])(this.props.onMouseLeave, this.props.openOn === 'hover' ? this.handleMouseLeave : null),
        tabIndex: this.state.isOpen ? -1 : 0,
        onKeyDown: (0, _utilsCreateChainedFunction2['default'])(this.props.onKeyDown, this.handleKeyDown)
      }, props),
      this.props.modal ? this.getModalPopover() : this.getSimplePopover()
    );
  }

});

module.exports.ListItem = _listItem2['default'];
module.exports.ListItemLabel = _listItemLabel2['default'];