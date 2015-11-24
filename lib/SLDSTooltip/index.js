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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

module.exports = _react2['default'].createClass({

  displayName: 'SLDSToolip',

  propTypes: {
    align: _react.PropTypes.string,
    children: _react.PropTypes.node,
    content: _react.PropTypes.node,
    hoverCloseDelay: _react.PropTypes.number,
    openByDefault: _react.PropTypes.bool,
    openOn: _react.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      align: 'top',
      content: _react2['default'].createElement(
        'span',
        null,
        'Tooltip'
      ),
      hoverCloseDelay: 350,
      openByDefault: false,
      openOn: 'hover'
    };
  },

  getInitialState: function getInitialState() {
    return {
      isOpen: this.props.openByDefault,
      isClosing: false
    };
  },

  componentDidMount: function componentDidMount() {},

  handleMouseClick: function handleMouseClick(event) {
    this.setState({
      isOpen: !this.state.isOpen,
      isClosing: !this.state.isOpen
    });
  },

  handleMouseEnter: function handleMouseEnter(event) {
    this.setState({
      isOpen: true,
      isClosing: false
    });
  },

  handleMouseLeave: function handleMouseLeave(event) {
    var _this = this;

    this.setState({ isClosing: true });
    setTimeout(function () {
      if (_this.isMounted && _this.state.isClosing) {
        _this.setState({
          isOpen: false,
          isClosing: false
        });
      }
    }, this.props.hoverCloseDelay);
  },

  getTooltipContent: function getTooltipContent() {
    return _react2['default'].createElement(
      'div',
      { className: 'slds-popover__body' },
      this.props.content
    );
  },

  getHorizontalAlign: function getHorizontalAlign() {
    if (this.props.align === 'left') {
      return 'left';
    } else if (this.props.align === 'right') {
      return 'right';
    }
    return 'center';
  },

  getVerticalAlign: function getVerticalAlign() {
    if (this.props.align === 'bottom') {
      return 'bottom';
    } else if (this.props.align === 'top') {
      return 'top';
    }
    return 'middle';
  },

  handleCancel: function handleCancel() {
    this.setState({
      isOpen: false,
      isClosing: false
    });
  },

  getTooltip: function getTooltip() {
    var style = {
      'slds-popover': true,
      'slds-popover--tooltip': true,
      'slds-nubbin--top': this.props.align === 'bottom',
      'slds-nubbin--bottom': this.props.align === 'top',
      'slds-nubbin--left': this.props.align === 'right',
      'slds-nubbin--right': this.props.align === 'left'
    };

    return this.state.isOpen ? _react2['default'].createElement(
      _SLDSPopover2['default'],
      {
        key: this.getHorizontalAlign() + ' ' + this.getVerticalAlign(),
        targetElement: this.refs.tooltipTarget,
        closeOnTabKey: true,
        className: '',
        marginTop: '1rem',
        marginBottom: '1rem',
        marginLeft: '1.5rem',
        marginRight: '1.5rem',
        horizontalAlign: this.getHorizontalAlign(),
        verticalAlign: this.getVerticalAlign(),
        flippable: false,
        onClose: this.handleCancel },
      _react2['default'].createElement(
        'div',
        { className: (0, _classnames2['default'])(style) },
        this.getTooltipContent()
      )
    ) : null;
  },

  render: function render() {
    return _react2['default'].createElement(
      'span',
      { refs: 'tooltipTarget', onClick: this.props.openOn === 'click' ? this.handleMouseClick : null, onMouseEnter: this.props.openOn === 'hover' ? this.handleMouseEnter : null, onMouseLeave: this.props.openOn === 'hover' ? this.handleMouseLeave : null },
      this.props.children,
      this.getTooltip()
    );
  }

});