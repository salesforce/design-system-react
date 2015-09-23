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

var _SLDSPopover = require('../SLDSPopover');

var _SLDSPopover2 = _interopRequireDefault(_SLDSPopover);

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var _SLDSIcons = require("./../SLDSIcons");

var _SLDSIcons2 = require("../SLDSIcons");

var _utils = require('../utils');

module.exports = _react2['default'].createClass({
  displayName: 'exports',

  getDefaultProps: function getDefaultProps() {
    return {
      placeholder: 'Select an Option',
      disabled: false,
      theme: 'default',
      label: 'Picklist',
      value: null,
      options: [],
      initialFocus: false,
      onClick: function onClick() {
        console.log('onClick should be defined');
      },
      onSelect: function onSelect(value) {
        console.log('onItemSelect should be defined');
      },
      onUpdateHighlighted: function onUpdateHighlighted(nextIndex) {
        console.log('onUpdateHighlighted should be defined');
      }
    };
  },

  getInitialState: function getInitialState() {
    return {
      isOpen: false,
      isFocused: false,
      highlightedIndex: 0,
      selectedIndex: this.getIndexByValue(this.props.value),
      lastBlurredIndex: -1,
      lastBlurredTimeStamp: -1
    };
  },

  componentDidMount: function componentDidMount() {
    if (this.props.initialFocus) {
      //     setTimeout(()=>{
      this.setFocus();
      //        this.setState({isFocused:true});
      //     }.bind(this),100);
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
    this.setState({ isOpen: false });
  },

  handleClick: function handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ isOpen: true });
    if (this.props.onClick) {
      this.props.onClick();
    }
  },

  handleBlur: function handleBlur(e) {
    this.setState({ isFocused: false });
  },

  handleFocus: function handleFocus() {
    this.setState({ isFocused: true });
  },

  setFocus: function setFocus() {
    if (this.isMounted()) {
      _react2['default'].findDOMNode(this.refs.button).focus();
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

  getPopover: function getPopover() {
    return !this.props.disabled && this.state.isOpen ? _react2['default'].createElement(
      'div',
      {
        ref: 'popover',
        className: 'slds-dropdown slds-dropdown--left slds-dropdown--small slds-dropdown--menu',
        targetElement: this.refs.button,
        style: { maxHeight: '20em' } },
      _react2['default'].createElement(_list2['default'], {
        ref: 'list',
        options: this.props.options,
        label: this.props.label,
        highlightedIndex: this.state.highlightedIndex,
        selectedIndex: this.state.selectedIndex,
        onSelect: this.handleSelect,
        onUpdateHighlighted: this.handleUpdateHighlighted,
        onListBlur: this.handleListBlur,
        onListItemBlur: this.handleListItemBlur,
        onCancel: this.handleCancel,
        theme: this.props.theme })
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
    return _react2['default'].createElement(
      'div',
      { className: "slds-form-element  ignore-react-onclickoutside slds-theme--" + this.props.theme },
      _react2['default'].createElement(
        'div',
        { className: "slds-picklist slds-theme--" + this.props.theme },
        _react2['default'].createElement(
          'form',
          null,
          _react2['default'].createElement(
            'button',
            {
              id: this.props.id,
              ref: 'button',
              className: 'slds-button slds-button--neutral slds-picklist__label',
              'aria-haspopup': 'true',
              onBlur: this.handleBlur,
              onFocus: this.handleFocus,
              onClick: this.handleClick,
              tabIndex: this.state.isOpen ? -1 : 0,
              onKeyDown: this.handleKeyDown },
            _react2['default'].createElement(
              'span',
              { className: 'slds-truncate' },
              this.getPlaceholder()
            ),
            _react2['default'].createElement(_SLDSIcons2.Icon, { name: 'down', category: 'utility' })
          ),
          this.getPopover()
        )
      )
    );
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

    if (this.props.value !== prevProps.value) {
      this.handleSelect(this.getIndexByValue(this.props.value));
    }
  }

});