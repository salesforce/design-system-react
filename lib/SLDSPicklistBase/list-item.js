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

var _SLDSIcons = require('../SLDSIcons');

var _utils = require('../utils');

var _listItemLabel = require('./list-item-label');

var _listItemLabel2 = _interopRequireDefault(_listItemLabel);

module.exports = _react2['default'].createClass({

  displayName: 'SLDSPicklistBase-list-item',

  getDefaultProps: function getDefaultProps() {
    return {
      index: 0,
      label: '',
      value: null,
      inverted: false,
      isSelected: false,
      isHighlighted: false,
      labelRenderer: _listItemLabel2['default'],
      data: {},

      onSelect: function onSelect(index) {
        console.log('onSelect should be defined ', index);
      },

      onClick: function onClick(index) {
        console.log('onClick should be defined ', index);
      },
      onMoveFocus: function onMoveFocus(delta) {
        console.log('onMoveFocus should be defined ', delta);
      },
      onBlur: function onBlur(relatedTarget) {
        console.log('onBlur should be defined ', relatedTarget);
      },
      onFocus: function onFocus(index, height) {
        console.log('onFocus should be defined ', index, height);
      }
    };
  },

  handleClick: function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.props.onSelect) {
      this.props.onSelect(this.props.index);
    }
  },

  handleMouseDown: function handleMouseDown(e) {
    if (e.nativeEvent) {
      e.nativeEvent.preventDefault();
      e.nativeEvent.stopImmediatePropagation();
    }
    e.preventDefault();
  },

  componentDidMount: function componentDidMount() {
    if (this.props.isHighlighted) {
      this.refs.link.getDOMNode().focus();
    }
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    if (!prevProps.isHighlighted && this.props.isHighlighted) {
      this.refs.link.getDOMNode().focus();
    }
  },

  handleKeyDown: function handleKeyDown(event) {

    if (event.keyCode) {
      if (event.keyCode === _utils.KEYS.DOWN) {
        _utils.EventUtil.trapEvent(event);
        if (this.props.onMoveFocus) {
          this.props.onMoveFocus(1);
        }
      } else if (event.keyCode === _utils.KEYS.UP) {
        _utils.EventUtil.trapEvent(event);
        if (this.props.onMoveFocus) {
          this.props.onMoveFocus(-1);
        }
      } else if (event.keyCode === _utils.KEYS.ENTER || event.keyCode === _utils.KEYS.SPACE) {
        _utils.EventUtil.trapEvent(event);
        if (this.props.onSelect) {
          this.props.onSelect(this.props.index);
        }
      } else if (event.keyCode === _utils.KEYS.ESCAPE) {
        _utils.EventUtil.trapEvent(event);
        if (this.props.onCancel) {
          this.props.onCancel();
        }
      } else if (event.keyCode === _utils.KEYS.TAB) {} else {
        _utils.EventUtil.trapEvent(event);
        var ch = String.fromCharCode(event.keyCode);
        if (this.props.onSearch) {
          this.props.onSearch(this.props.index, ch);
        }
      }
    }
  },

  handleBlur: function handleBlur(e) {
    if (this.props.onBlur) {
      this.props.onBlur(this.props.index, e.relatedTarget);
    }
  },

  handleFocus: function handleFocus() {
    var height = this.getDOMNode().offsetHeight;
    if (height && this.props.onFocus) {
      this.props.onFocus(this.props.index, height);
    }
  },

  getLabel: function getLabel() {
    var LabelComp = this.props.labelRenderer;
    return _react2['default'].createElement(LabelComp, {
      index: this.props.index,
      label: this.props.label,
      value: this.props.value,
      inverted: this.props.inverted,
      isSelected: this.props.isSelected,
      isHighlighted: this.props.isHighlighted,
      data: this.props.data
    });
  },

  render: function render() {
    return _react2['default'].createElement(
      'li',
      {
        className: 'slds-dropdown__item slds-has-icon slds-has-icon--left',
        onMouseDown: this.handleMouseDown,
        tabIndex: -1 },
      _react2['default'].createElement(
        'a',
        { id: 'menu-0-' + this.props.index,
          href: '',
          ref: 'link',
          className: 'slds-truncate',
          onClick: this.handleClick,
          onMouseDown: this.handleMouseDown,
          onKeyDown: this.handleKeyDown,
          onBlur: this.handleBlur,
          onFocus: this.handleFocus,
          'aria-checked': this.props.isSelected,
          role: 'menuitemradio',
          tabIndex: -1 },
        this.getLabel()
      )
    );
  }

});