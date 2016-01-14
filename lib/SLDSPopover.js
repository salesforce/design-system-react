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

var _tetherDrop = require('tether-drop');

var _tetherDrop2 = _interopRequireDefault(_tetherDrop);

var _componentsUtils = require('components/utils');

//import { TransitionSpring, Spring } from 'react-motion';

module.exports = _react2['default'].createClass({

  displayName: 'SLDSPopover',

  mixins: [require('react-onclickoutside')],

  handleClickOutside: function handleClickOutside() {
    this.handleClose();
  },

  handleClose: function handleClose() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  },

  propTypes: {
    //    targetAttachment: React.PropTypes.string,
  },

  getDefaultProps: function getDefaultProps() {
    return {
      verticalAlign: 'bottom',
      horizontalAlign: 'left',
      className: 'slds-dropdown',
      closeOnTabKey: false,
      marginTop: '0.20rem',
      marginBottom: '0.35rem',
      marginLeft: 0,
      marginRight: 0,
      flippable: true,
      constrainToScrollParent: false,
      inheritTargetWidth: false
    };
  },

  getInitialState: function getInitialState() {
    return {
      isOpen: false
    };
  },

  componentWillMount: function componentWillMount() {

    this.popoverElement = document.createElement("span");
    document.querySelector("body").appendChild(this.popoverElement);
  },

  componentDidMount: function componentDidMount() {
    this.renderPopover();
  },

  componentDidUpdate: function componentDidUpdate() {
    this.renderPopover();
  },

  handleClick: function handleClick(event) {
    if (event.nativeEvent) {
      event.nativeEvent.preventDefault();
      event.nativeEvent.stopPropagation();
    }
  },

  handleKeyDown: function handleKeyDown(event) {
    if (event.keyCode === _componentsUtils.KEYS.TAB) {
      if (this.props.closeOnTabKey) {
        _componentsUtils.EventUtil.trap(event);
        this.handleClose();
      }
    }
  },

  popoverComp: function popoverComp() {
    if (!this.state.isOpen) {
      return _react2['default'].createElement('span', null);
    }
    return _react2['default'].createElement(
      'div',
      { className: 'SLDSPopover ' + this.props.className,
        style: {
          transform: 'none',
          WebkitTransform: 'none',
          'marginTop': this.props.marginTop,
          'marginBottom': this.props.marginBottom,
          'marginLeft': this.props.marginLeft,
          'marginRight': this.props.marginRight,
          'width': this.props.inheritTargetWidth ? this.target().getBoundingClientRect().width : 'inherit',
          'float': 'inherit',
          'position': 'inherit'
        },
        onKeyDown: this.handleKeyDown
      },
      this.props.children
    );
  },

  beforeClose: function beforeClose() {},

  getPosition: function getPosition() {
    var positions = [];
    if (this.props.verticalAlign === 'top' || this.props.verticalAlign === 'bottom') {
      positions.push(this.props.verticalAlign);
      positions.push(this.props.horizontalAlign);
    } else {
      positions.push(this.props.horizontalAlign);
      positions.push(this.props.verticalAlign);
    }
    return positions.join(' ');
  },

  target: function target() {
    return this.props.targetElement ? _reactDom2['default'].findDOMNode(this.props.targetElement) : _reactDom2['default'].findDOMNode(this).parentNode;
  },

  dropOptions: function dropOptions() {
    var position = this.getPosition();

    return {
      target: this.target(),
      content: this.popoverElement,
      position: position,
      openOn: 'always',
      beforeClose: this.beforeClose,
      constrainToWindow: this.props.flippable,
      constrainToScrollParent: this.props.constrainToScrollParent,
      remove: true
    };
  },

  handleOpen: function handleOpen() {
    this.setState({ isOpen: true });
  },

  renderPopover: function renderPopover() {

    _reactDom2['default'].render(this.popoverComp(), this.popoverElement);

    if (this.popoverElement && this.popoverElement.parentNode && this.popoverElement.parentNode.parentNode && this.popoverElement.parentNode.parentNode.className && this.popoverElement.parentNode.parentNode.className.indexOf('drop ') > -1) {
      this.popoverElement.parentNode.parentNode.style.zIndex = 10001;
    }

    if (this.drop != null) {
      if (this.drop && this.drop) {
        this.drop.position();
      }
    } else if (window && document) {
      this.drop = new _tetherDrop2['default'](this.dropOptions());
      this.drop.once('open', this.handleOpen);
    }
  },

  componentWillUnmount: function componentWillUnmount() {

    this.drop.destroy();
    _reactDom2['default'].unmountComponentAtNode(this.popoverElement);
    if (this.popoverElement.parentNode) {
      this.popoverElement.parentNode.removeChild(this.popoverElement);
    }
    if (this.props.onClose) {
      this.props.onClose();
    }
  },

  render: function render() {
    return _react2['default'].createElement('noscript', null);
  }

});