(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["design-system-react"] = factory(require("React"));
	else
		root["design-system-react"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*
	Copyright (c) 2015, salesforce.com, inc. All rights reserved.
	
	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
	Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
	Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
	
	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
	
	'use strict';
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}
	
	var _SLDSPicklistBase = __webpack_require__(1);
	
	var _SLDSPicklistBase2 = _interopRequireDefault(_SLDSPicklistBase);
	
	var _SLDSPicklistBaseListItem = __webpack_require__(39);
	
	var _SLDSPicklistBaseListItem2 = _interopRequireDefault(_SLDSPicklistBaseListItem);
	
	var _SLDSSettings = __webpack_require__(14);
	
	var _SLDSSettings2 = _interopRequireDefault(_SLDSSettings);
	
	var _SLDSButton = __webpack_require__(41);
	
	var _SLDSButton2 = _interopRequireDefault(_SLDSButton);
	
	var _SLDSModal = __webpack_require__(62);
	
	var _SLDSModal2 = _interopRequireDefault(_SLDSModal);
	
	var _SLDSModalTrigger = __webpack_require__(63);
	
	var _SLDSModalTrigger2 = _interopRequireDefault(_SLDSModalTrigger);
	
	var _SLDSIcons = __webpack_require__(13);
	
	var _SLDSIcons2 = _interopRequireDefault(_SLDSIcons);
	
	module.exports = {
	  SLDSPicklistBase: _SLDSPicklistBase2['default'],
	  SLDSPicklistBaseListItem: _SLDSPicklistBaseListItem2['default'],
	  SLDSSettings: _SLDSSettings2['default'],
	  SLDSButton: _SLDSButton2['default'],
	  SLDSModal: _SLDSModal2['default'],
	  SLDSModalTrigger: _SLDSModalTrigger2['default'],
	  SLDSIcons: _SLDSIcons2['default']
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*
	Copyright (c) 2015, salesforce.com, inc. All rights reserved.
	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
	Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
	Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
	
	'use strict';
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _SLDSPopover = __webpack_require__(3);
	
	var _SLDSPopover2 = _interopRequireDefault(_SLDSPopover);
	
	var _list = __webpack_require__(12);
	
	var _list2 = _interopRequireDefault(_list);
	
	var _listItem = __webpack_require__(39);
	
	var _listItem2 = _interopRequireDefault(_listItem);
	
	var _listItemLabel = __webpack_require__(40);
	
	var _listItemLabel2 = _interopRequireDefault(_listItemLabel);
	
	var _SLDSIcons = __webpack_require__(13);
	
	var _SLDSIcons2 = __webpack_require__(13);
	
	var _utils = __webpack_require__(6);
	
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
	      listItemRenderer: _listItemLabel2['default']
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
	
	  getPopoverContent: function getPopoverContent() {
	    return _react2['default'].createElement(_list2['default'], {
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
	      itemRenderer: this.props.listItemRenderer,
	      theme: this.props.theme });
	  },
	
	  getSimplePopover: function getSimplePopover() {
	    return !this.props.disabled && this.state.isOpen ? _react2['default'].createElement('div', {
	      className: 'slds-dropdown slds-dropdown--left slds-dropdown--small slds-dropdown--menu',
	      targetElement: this.refs.button,
	      style: { maxHeight: '20em' } }, this.getPopoverContent()) : null;
	  },
	
	  getModalPopover: function getModalPopover() {
	    return !this.props.disabled && this.state.isOpen ? _react2['default'].createElement(_SLDSPopover2['default'], {
	      className: 'slds-dropdown slds-dropdown--left slds-dropdown--small slds-dropdown--menu',
	      targetElement: this.refs.date,
	      closeOnTabKey: true,
	      onClose: this.handleCancel }, this.getPopoverContent()) : null;
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
	    return _react2['default'].createElement('div', { className: "slds-form-element slds-theme--" + this.props.theme }, _react2['default'].createElement('div', { className: "slds-picklist slds-theme--" + this.props.theme }, _react2['default'].createElement('button', {
	      id: this.props.id,
	      ref: 'button',
	      className: 'slds-button slds-button--neutral slds-picklist__label ' + this.props.className,
	      'aria-haspopup': 'true',
	      onBlur: this.handleBlur,
	      onFocus: this.handleFocus,
	      onClick: this.handleClick,
	      onMouseDown: this.handleMouseDown,
	      tabIndex: this.state.isOpen ? -1 : 0,
	      onKeyDown: this.handleKeyDown }, _react2['default'].createElement('span', { className: 'slds-truncate' }, this.getPlaceholder()), _react2['default'].createElement(_SLDSIcons2.Icon, { name: 'down', category: 'utility' })), this.props.modal ? this.getModalPopover() : this.getSimplePopover()));
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
	
	module.exports.ListItem = _listItem2['default'];
	module.exports.ListItemLabel = _listItemLabel2['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/*
	Copyright (c) 2015, salesforce.com, inc. All rights reserved.
	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
	Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
	Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
	
	'use strict';
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _tetherDrop = __webpack_require__(4);
	
	var _tetherDrop2 = _interopRequireDefault(_tetherDrop);
	
	var _utils = __webpack_require__(6);
	
	//import { TransitionSpring, Spring } from 'react-motion';
	
	module.exports = _react2['default'].createClass({
	
	  displayName: 'SLDSPopover',
	
	  mixins: [__webpack_require__(11)],
	
	  handleClickOutside: function handleClickOutside() {
	    this.handleClose();
	  },
	
	  handleClose: function handleClose() {
	    if (this.props.onClose) {
	      this.props.onClose();
	    }
	  },
	
	  propTypes: {
	    targetAttachment: _react2['default'].PropTypes.string
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      targetAttachment: 'bottom left',
	      className: 'slds-dropdown',
	      closeOnTabKey: false
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
	    if (event.keyCode === _utils.KEYS.TAB) {
	      if (this.props.closeOnTabKey) {
	        _utils.EventUtil.trap(event);
	        this.handleClose();
	      }
	    }
	  },
	
	  popoverComp: function popoverComp() {
	    if (!this.state.isOpen) {
	      return _react2['default'].createElement('span', null);
	    }
	    return _react2['default'].createElement('div', { className: 'SLDSPopover ' + this.props.className,
	      style: {
	        transform: 'none',
	        WebkitTransform: 'none',
	        marginTop: '0.20rem',
	        marginBottom: '0.35rem',
	        float: 'inherit',
	        position: 'inherit'
	      },
	      onKeyDown: this.handleKeyDown
	    }, this.props.children);
	  },
	
	  beforeClose: function beforeClose() {},
	
	  dropOptions: function dropOptions() {
	    var target = this.props.targetElement ? this.props.targetElement.getDOMNode() : this.getDOMNode().parentNode;
	    return {
	      target: target,
	      content: this.popoverElement,
	      position: this.props.targetAttachment,
	      openOn: 'always',
	      beforeClose: this.beforeClose,
	      constrainToWindow: true,
	      constrainToScrollParent: false,
	      remove: true
	    };
	  },
	
	  handleOpen: function handleOpen() {
	    this.setState({ isOpen: true });
	  },
	
	  renderPopover: function renderPopover() {
	
	    _react2['default'].render(this.popoverComp(), this.popoverElement);
	
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
	    _react2['default'].unmountComponentAtNode(this.popoverElement);
	    if (this.popoverElement.parentNode) {
	      this.popoverElement.parentNode.removeChild(this.popoverElement);
	    }
	    if (this.props.onClose) {
	      this.props.onClose();
	    }
	  },
	
	  render: function render() {
	    return _react2['default'].createElement('span', null);
	  }
	
	});
	/*
	       <Spring 
	         defaultValue={{ val:0 }}
	         endValue={{ val:1, config: [70, 10] }}>
	         {currentVal => {
	             return (<div style={{opacity:currentVal.val}}>
	*/ /*
	                </div>);
	              }.bind(this)
	            }
	          </Spring>
	   */

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! tether-drop 1.3.0 */
	
	(function(root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    module.exports = factory(require('tether'));
	  } else {
	    root.Drop = factory(root.Tether);
	  }
	}(this, function(Tether) {
	
	/* global Tether */
	
	'use strict';
	
	var _bind = Function.prototype.bind;
	
	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _Tether$Utils = Tether.Utils;
	var extend = _Tether$Utils.extend;
	var addClass = _Tether$Utils.addClass;
	var removeClass = _Tether$Utils.removeClass;
	var hasClass = _Tether$Utils.hasClass;
	var Evented = _Tether$Utils.Evented;
	
	function sortAttach(str) {
	  var _str$split = str.split(' ');
	
	  var _str$split2 = _slicedToArray(_str$split, 2);
	
	  var first = _str$split2[0];
	  var second = _str$split2[1];
	
	  if (['left', 'right'].indexOf(first) >= 0) {
	    var _ref = [second, first];
	    first = _ref[0];
	    second = _ref[1];
	  }
	  return [first, second].join(' ');
	}
	
	function removeFromArray(arr, item) {
	  var index = undefined;
	  var results = [];
	  while ((index = arr.indexOf(item)) !== -1) {
	    results.push(arr.splice(index, 1));
	  }
	  return results;
	}
	
	var clickEvents = ['click'];
	if ('ontouchstart' in document.documentElement) {
	  clickEvents.push('touchstart');
	}
	
	var transitionEndEvents = {
	  'WebkitTransition': 'webkitTransitionEnd',
	  'MozTransition': 'transitionend',
	  'OTransition': 'otransitionend',
	  'transition': 'transitionend'
	};
	
	var transitionEndEvent = '';
	for (var _name in transitionEndEvents) {
	  if (({}).hasOwnProperty.call(transitionEndEvents, _name)) {
	    var tempEl = document.createElement('p');
	    if (typeof tempEl.style[_name] !== 'undefined') {
	      transitionEndEvent = transitionEndEvents[_name];
	    }
	  }
	}
	
	var MIRROR_ATTACH = {
	  left: 'right',
	  right: 'left',
	  top: 'bottom',
	  bottom: 'top',
	  middle: 'middle',
	  center: 'center'
	};
	
	var allDrops = {};
	
	// Drop can be included in external libraries.  Calling createContext gives you a fresh
	// copy of drop which won't interact with other copies on the page (beyond calling the document events).
	
	function createContext() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  var drop = function drop() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return new (_bind.apply(DropInstance, [null].concat(args)))();
	  };
	
	  extend(drop, {
	    createContext: createContext,
	    drops: [],
	    defaults: {}
	  });
	
	  var defaultOptions = {
	    classPrefix: 'drop',
	    defaults: {
	      position: 'bottom left',
	      openOn: 'click',
	      beforeClose: null,
	      constrainToScrollParent: true,
	      constrainToWindow: true,
	      classes: '',
	      remove: false,
	      tetherOptions: {}
	    }
	  };
	
	  extend(drop, defaultOptions, options);
	  extend(drop.defaults, defaultOptions.defaults, options.defaults);
	
	  if (typeof allDrops[drop.classPrefix] === 'undefined') {
	    allDrops[drop.classPrefix] = [];
	  }
	
	  drop.updateBodyClasses = function () {
	    // There is only one body, so despite the context concept, we still iterate through all
	    // drops which share our classPrefix.
	
	    var anyOpen = false;
	    var drops = allDrops[drop.classPrefix];
	    var len = drops.length;
	    for (var i = 0; i < len; ++i) {
	      if (drops[i].isOpened()) {
	        anyOpen = true;
	        break;
	      }
	    }
	
	    if (anyOpen) {
	      addClass(document.body, drop.classPrefix + '-open');
	    } else {
	      removeClass(document.body, drop.classPrefix + '-open');
	    }
	  };
	
	  var DropInstance = (function (_Evented) {
	    _inherits(DropInstance, _Evented);
	
	    function DropInstance(opts) {
	      _classCallCheck(this, DropInstance);
	
	      _get(Object.getPrototypeOf(DropInstance.prototype), 'constructor', this).call(this);
	      this.options = extend({}, drop.defaults, opts);
	      this.target = this.options.target;
	
	      if (typeof this.target === 'undefined') {
	        throw new Error('Drop Error: You must provide a target.');
	      }
	
	      var dataPrefix = 'data-' + drop.classPrefix;
	
	      var contentAttr = this.target.getAttribute(dataPrefix);
	      if (contentAttr) {
	        this.options.content = contentAttr;
	      }
	
	      var attrsOverride = ['position', 'openOn'];
	      for (var i = 0; i < attrsOverride.length; ++i) {
	
	        var override = this.target.getAttribute(dataPrefix + '-' + attrsOverride[i]);
	        if (override) {
	          this.options[attrsOverride[i]] = override;
	        }
	      }
	
	      if (this.options.classes && this.options.addTargetClasses !== false) {
	        addClass(this.target, this.options.classes);
	      }
	
	      drop.drops.push(this);
	      allDrops[drop.classPrefix].push(this);
	
	      this._boundEvents = [];
	      this.bindMethods();
	      this.setupElements();
	      this.setupEvents();
	      this.setupTether();
	    }
	
	    _createClass(DropInstance, [{
	      key: '_on',
	      value: function _on(element, event, handler) {
	        this._boundEvents.push({ element: element, event: event, handler: handler });
	        element.addEventListener(event, handler);
	      }
	    }, {
	      key: 'bindMethods',
	      value: function bindMethods() {
	        this.transitionEndHandler = this._transitionEndHandler.bind(this);
	      }
	    }, {
	      key: 'setupElements',
	      value: function setupElements() {
	        var _this = this;
	
	        this.drop = document.createElement('div');
	        addClass(this.drop, drop.classPrefix);
	
	        if (this.options.classes) {
	          addClass(this.drop, this.options.classes);
	        }
	
	        this.content = document.createElement('div');
	        addClass(this.content, drop.classPrefix + '-content');
	
	        if (typeof this.options.content === 'function') {
	          var generateAndSetContent = function generateAndSetContent() {
	            // content function might return a string or an element
	            var contentElementOrHTML = _this.options.content.call(_this, _this);
	
	            if (typeof contentElementOrHTML === 'string') {
	              _this.content.innerHTML = contentElementOrHTML;
	            } else if (typeof contentElementOrHTML === 'object') {
	              _this.content.innerHTML = "";
	              _this.content.appendChild(contentElementOrHTML);
	            } else {
	              throw new Error('Drop Error: Content function should return a string or HTMLElement.');
	            }
	          };
	
	          generateAndSetContent();
	          this.on('open', generateAndSetContent.bind(this));
	        } else if (typeof this.options.content === 'object') {
	          this.content.appendChild(this.options.content);
	        } else {
	          this.content.innerHTML = this.options.content;
	        }
	
	        this.drop.appendChild(this.content);
	      }
	    }, {
	      key: 'setupTether',
	      value: function setupTether() {
	        // Tether expects two attachment points, one in the target element, one in the
	        // drop.  We use a single one, and use the order as well, to allow us to put
	        // the drop on either side of any of the four corners.  This magic converts between
	        // the two:
	        var dropAttach = this.options.position.split(' ');
	        dropAttach[0] = MIRROR_ATTACH[dropAttach[0]];
	        dropAttach = dropAttach.join(' ');
	
	        var constraints = [];
	        if (this.options.constrainToScrollParent) {
	          constraints.push({
	            to: 'scrollParent',
	            pin: 'top, bottom',
	            attachment: 'together none'
	          });
	        } else {
	          // To get 'out of bounds' classes
	          constraints.push({
	            to: 'scrollParent'
	          });
	        }
	
	        if (this.options.constrainToWindow !== false) {
	          constraints.push({
	            to: 'window',
	            attachment: 'together'
	          });
	        } else {
	          // To get 'out of bounds' classes
	          constraints.push({
	            to: 'window'
	          });
	        }
	
	        var opts = {
	          element: this.drop,
	          target: this.target,
	          attachment: sortAttach(dropAttach),
	          targetAttachment: sortAttach(this.options.position),
	          classPrefix: drop.classPrefix,
	          offset: '0 0',
	          targetOffset: '0 0',
	          enabled: false,
	          constraints: constraints,
	          addTargetClasses: this.options.addTargetClasses
	        };
	
	        if (this.options.tetherOptions !== false) {
	          this.tether = new Tether(extend({}, opts, this.options.tetherOptions));
	        }
	      }
	    }, {
	      key: 'setupEvents',
	      value: function setupEvents() {
	        var _this2 = this;
	
	        if (!this.options.openOn) {
	          return;
	        }
	
	        if (this.options.openOn === 'always') {
	          setTimeout(this.open.bind(this));
	          return;
	        }
	
	        var events = this.options.openOn.split(' ');
	
	        if (events.indexOf('click') >= 0) {
	          var openHandler = function openHandler(event) {
	            _this2.toggle(event);
	            event.preventDefault();
	          };
	
	          var closeHandler = function closeHandler(event) {
	            if (!_this2.isOpened()) {
	              return;
	            }
	
	            // Clicking inside dropdown
	            if (event.target === _this2.drop || _this2.drop.contains(event.target)) {
	              return;
	            }
	
	            // Clicking target
	            if (event.target === _this2.target || _this2.target.contains(event.target)) {
	              return;
	            }
	
	            _this2.close(event);
	          };
	
	          for (var i = 0; i < clickEvents.length; ++i) {
	            var clickEvent = clickEvents[i];
	            this._on(this.target, clickEvent, openHandler);
	            this._on(document, clickEvent, closeHandler);
	          }
	        }
	
	        var onUs = false;
	        var outTimeout = null;
	
	        var focusInHandler = function focusInHandler(event) {
	          onUs = true;
	          _this2.open(event);
	        };
	
	        var focusOutHandler = function focusOutHandler(event) {
	          onUs = false;
	
	          if (typeof outTimeout !== 'undefined') {
	            clearTimeout(outTimeout);
	          }
	
	          outTimeout = setTimeout(function () {
	            if (!onUs) {
	              _this2.close(event);
	            }
	            outTimeout = null;
	          }, 50);
	        };
	
	        if (events.indexOf('hover') >= 0) {
	          this._on(this.target, 'mouseover', focusInHandler);
	          this._on(this.drop, 'mouseover', focusInHandler);
	          this._on(this.target, 'mouseout', focusOutHandler);
	          this._on(this.drop, 'mouseout', focusOutHandler);
	        }
	
	        if (events.indexOf('focus') >= 0) {
	          this._on(this.target, 'focus', focusInHandler);
	          this._on(this.drop, 'focus', focusInHandler);
	          this._on(this.target, 'blur', focusOutHandler);
	          this._on(this.drop, 'blur', focusOutHandler);
	        }
	      }
	    }, {
	      key: 'isOpened',
	      value: function isOpened() {
	        if (this.drop) {
	          return hasClass(this.drop, drop.classPrefix + '-open');
	        }
	      }
	    }, {
	      key: 'toggle',
	      value: function toggle(event) {
	        if (this.isOpened()) {
	          this.close(event);
	        } else {
	          this.open(event);
	        }
	      }
	    }, {
	      key: 'open',
	      value: function open(event) {
	        var _this3 = this;
	
	        if (this.isOpened()) {
	          return;
	        }
	
	        if (!this.drop.parentNode) {
	          document.body.appendChild(this.drop);
	        }
	
	        if (typeof this.tether !== 'undefined') {
	          this.tether.enable();
	        }
	
	        addClass(this.drop, drop.classPrefix + '-open');
	        addClass(this.drop, drop.classPrefix + '-open-transitionend');
	
	        setTimeout(function () {
	          if (_this3.drop) {
	            addClass(_this3.drop, drop.classPrefix + '-after-open');
	          }
	        });
	
	        if (typeof this.tether !== 'undefined') {
	          this.tether.position();
	        }
	
	        this.trigger('open');
	
	        drop.updateBodyClasses();
	      }
	    }, {
	      key: '_transitionEndHandler',
	      value: function _transitionEndHandler(e) {
	        if (e.target !== e.currentTarget) {
	          return;
	        }
	
	        if (!hasClass(this.drop, drop.classPrefix + '-open')) {
	          removeClass(this.drop, drop.classPrefix + '-open-transitionend');
	        }
	        this.drop.removeEventListener(transitionEndEvent, this.transitionEndHandler);
	      }
	    }, {
	      key: 'beforeCloseHandler',
	      value: function beforeCloseHandler(event) {
	        var shouldClose = true;
	
	        if (!this.isClosing && typeof this.options.beforeClose === 'function') {
	          this.isClosing = true;
	          shouldClose = this.options.beforeClose(event, this) !== false;
	        }
	
	        this.isClosing = false;
	
	        return shouldClose;
	      }
	    }, {
	      key: 'close',
	      value: function close(event) {
	        if (!this.isOpened()) {
	          return;
	        }
	
	        if (!this.beforeCloseHandler(event)) {
	          return;
	        }
	
	        removeClass(this.drop, drop.classPrefix + '-open');
	        removeClass(this.drop, drop.classPrefix + '-after-open');
	
	        this.drop.addEventListener(transitionEndEvent, this.transitionEndHandler);
	
	        this.trigger('close');
	
	        if (typeof this.tether !== 'undefined') {
	          this.tether.disable();
	        }
	
	        drop.updateBodyClasses();
	
	        if (this.options.remove) {
	          this.remove(event);
	        }
	      }
	    }, {
	      key: 'remove',
	      value: function remove(event) {
	        this.close(event);
	        if (this.drop.parentNode) {
	          this.drop.parentNode.removeChild(this.drop);
	        }
	      }
	    }, {
	      key: 'position',
	      value: function position() {
	        if (this.isOpened() && typeof this.tether !== 'undefined') {
	          this.tether.position();
	        }
	      }
	    }, {
	      key: 'destroy',
	      value: function destroy() {
	        this.remove();
	
	        if (typeof this.tether !== 'undefined') {
	          this.tether.destroy();
	        }
	
	        for (var i = 0; i < this._boundEvents.length; ++i) {
	          var _boundEvents$i = this._boundEvents[i];
	          var element = _boundEvents$i.element;
	          var _event = _boundEvents$i.event;
	          var handler = _boundEvents$i.handler;
	
	          element.removeEventListener(_event, handler);
	        }
	
	        this._boundEvents = [];
	
	        this.tether = null;
	        this.drop = null;
	        this.content = null;
	        this.target = null;
	
	        removeFromArray(allDrops[drop.classPrefix], this);
	        removeFromArray(drop.drops, this);
	      }
	    }]);
	
	    return DropInstance;
	  })(Evented);
	
	  return drop;
	}
	
	var Drop = createContext();
	
	document.addEventListener('DOMContentLoaded', function () {
	  Drop.updateBodyClasses();
	});
	return Drop;
	
	}));


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! tether 1.1.0 */
	
	(function(root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    module.exports = factory(require, exports, module);
	  } else {
	    root.Tether = factory();
	  }
	}(this, function(require, exports, module) {
	
	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var TetherBase = undefined;
	if (typeof TetherBase === 'undefined') {
	  TetherBase = { modules: [] };
	}
	
	function getScrollParent(el) {
	  var _getComputedStyle = getComputedStyle(el);
	
	  var position = _getComputedStyle.position;
	
	  if (position === 'fixed') {
	    return el;
	  }
	
	  var parent = el;
	  while (parent = parent.parentNode) {
	    var style = undefined;
	    try {
	      style = getComputedStyle(parent);
	    } catch (err) {}
	
	    if (typeof style === 'undefined' || style === null) {
	      return parent;
	    }
	
	    var overflow = style.overflow;
	    var overflowX = style.overflowX;
	    var overflowY = style.overflowY;
	
	    if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
	      if (position !== 'absolute' || ['relative', 'absolute', 'fixed'].indexOf(style.position) >= 0) {
	        return parent;
	      }
	    }
	  }
	
	  return document.body;
	}
	
	var uniqueId = (function () {
	  var id = 0;
	  return function () {
	    return ++id;
	  };
	})();
	
	var zeroPosCache = {};
	var getOrigin = function getOrigin(doc) {
	  // getBoundingClientRect is unfortunately too accurate.  It introduces a pixel or two of
	  // jitter as the user scrolls that messes with our ability to detect if two positions
	  // are equivilant or not.  We place an element at the top left of the page that will
	  // get the same jitter, so we can cancel the two out.
	  var node = doc._tetherZeroElement;
	  if (typeof node === 'undefined') {
	    node = doc.createElement('div');
	    node.setAttribute('data-tether-id', uniqueId());
	    extend(node.style, {
	      top: 0,
	      left: 0,
	      position: 'absolute'
	    });
	
	    doc.body.appendChild(node);
	
	    doc._tetherZeroElement = node;
	  }
	
	  var id = node.getAttribute('data-tether-id');
	  if (typeof zeroPosCache[id] === 'undefined') {
	    zeroPosCache[id] = {};
	
	    var rect = node.getBoundingClientRect();
	    for (var k in rect) {
	      // Can't use extend, as on IE9, elements don't resolve to be hasOwnProperty
	      zeroPosCache[id][k] = rect[k];
	    }
	
	    // Clear the cache when this position call is done
	    defer(function () {
	      delete zeroPosCache[id];
	    });
	  }
	
	  return zeroPosCache[id];
	};
	
	function getBounds(el) {
	  var doc = undefined;
	  if (el === document) {
	    doc = document;
	    el = document.documentElement;
	  } else {
	    doc = el.ownerDocument;
	  }
	
	  var docEl = doc.documentElement;
	
	  var box = {};
	  // The original object returned by getBoundingClientRect is immutable, so we clone it
	  // We can't use extend because the properties are not considered part of the object by hasOwnProperty in IE9
	  var rect = el.getBoundingClientRect();
	  for (var k in rect) {
	    box[k] = rect[k];
	  }
	
	  var origin = getOrigin(doc);
	
	  box.top -= origin.top;
	  box.left -= origin.left;
	
	  if (typeof box.width === 'undefined') {
	    box.width = document.body.scrollWidth - box.left - box.right;
	  }
	  if (typeof box.height === 'undefined') {
	    box.height = document.body.scrollHeight - box.top - box.bottom;
	  }
	
	  box.top = box.top - docEl.clientTop;
	  box.left = box.left - docEl.clientLeft;
	  box.right = doc.body.clientWidth - box.width - box.left;
	  box.bottom = doc.body.clientHeight - box.height - box.top;
	
	  return box;
	}
	
	function getOffsetParent(el) {
	  return el.offsetParent || document.documentElement;
	}
	
	function getScrollBarSize() {
	  var inner = document.createElement('div');
	  inner.style.width = '100%';
	  inner.style.height = '200px';
	
	  var outer = document.createElement('div');
	  extend(outer.style, {
	    position: 'absolute',
	    top: 0,
	    left: 0,
	    pointerEvents: 'none',
	    visibility: 'hidden',
	    width: '200px',
	    height: '150px',
	    overflow: 'hidden'
	  });
	
	  outer.appendChild(inner);
	
	  document.body.appendChild(outer);
	
	  var widthContained = inner.offsetWidth;
	  outer.style.overflow = 'scroll';
	  var widthScroll = inner.offsetWidth;
	
	  if (widthContained === widthScroll) {
	    widthScroll = outer.clientWidth;
	  }
	
	  document.body.removeChild(outer);
	
	  var width = widthContained - widthScroll;
	
	  return { width: width, height: width };
	}
	
	function extend() {
	  var out = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  var args = [];
	
	  Array.prototype.push.apply(args, arguments);
	
	  args.slice(1).forEach(function (obj) {
	    if (obj) {
	      for (var key in obj) {
	        if (({}).hasOwnProperty.call(obj, key)) {
	          out[key] = obj[key];
	        }
	      }
	    }
	  });
	
	  return out;
	}
	
	function removeClass(el, name) {
	  if (typeof el.classList !== 'undefined') {
	    name.split(' ').forEach(function (cls) {
	      if (cls.trim()) {
	        el.classList.remove(cls);
	      }
	    });
	  } else {
	    var regex = new RegExp('(^| )' + name.split(' ').join('|') + '( |$)', 'gi');
	    var className = getClassName(el).replace(regex, ' ');
	    setClassName(el, className);
	  }
	}
	
	function addClass(el, name) {
	  if (typeof el.classList !== 'undefined') {
	    name.split(' ').forEach(function (cls) {
	      if (cls.trim()) {
	        el.classList.add(cls);
	      }
	    });
	  } else {
	    removeClass(el, name);
	    var cls = getClassName(el) + (' ' + name);
	    setClassName(el, cls);
	  }
	}
	
	function hasClass(el, name) {
	  if (typeof el.classList !== 'undefined') {
	    return el.classList.contains(name);
	  }
	  var className = getClassName(el);
	  return new RegExp('(^| )' + name + '( |$)', 'gi').test(className);
	}
	
	function getClassName(el) {
	  if (el.className instanceof SVGAnimatedString) {
	    return el.className.baseVal;
	  }
	  return el.className;
	}
	
	function setClassName(el, className) {
	  el.setAttribute('class', className);
	}
	
	function updateClasses(el, add, all) {
	  // Of the set of 'all' classes, we need the 'add' classes, and only the
	  // 'add' classes to be set.
	  all.forEach(function (cls) {
	    if (add.indexOf(cls) === -1 && hasClass(el, cls)) {
	      removeClass(el, cls);
	    }
	  });
	
	  add.forEach(function (cls) {
	    if (!hasClass(el, cls)) {
	      addClass(el, cls);
	    }
	  });
	}
	
	var deferred = [];
	
	var defer = function defer(fn) {
	  deferred.push(fn);
	};
	
	var flush = function flush() {
	  var fn = undefined;
	  while (fn = deferred.pop()) {
	    fn();
	  }
	};
	
	var Evented = (function () {
	  function Evented() {
	    _classCallCheck(this, Evented);
	  }
	
	  _createClass(Evented, [{
	    key: 'on',
	    value: function on(event, handler, ctx) {
	      var once = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
	
	      if (typeof this.bindings === 'undefined') {
	        this.bindings = {};
	      }
	      if (typeof this.bindings[event] === 'undefined') {
	        this.bindings[event] = [];
	      }
	      this.bindings[event].push({ handler: handler, ctx: ctx, once: once });
	    }
	  }, {
	    key: 'once',
	    value: function once(event, handler, ctx) {
	      this.on(event, handler, ctx, true);
	    }
	  }, {
	    key: 'off',
	    value: function off(event, handler) {
	      if (typeof this.bindings !== 'undefined' && typeof this.bindings[event] !== 'undefined') {
	        return;
	      }
	
	      if (typeof handler === 'undefined') {
	        delete this.bindings[event];
	      } else {
	        var i = 0;
	        while (i < this.bindings[event].length) {
	          if (this.bindings[event][i].handler === handler) {
	            this.bindings[event].splice(i, 1);
	          } else {
	            ++i;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'trigger',
	    value: function trigger(event) {
	      if (typeof this.bindings !== 'undefined' && this.bindings[event]) {
	        var i = 0;
	        while (i < this.bindings[event].length) {
	          var _bindings$event$i = this.bindings[event][i];
	          var handler = _bindings$event$i.handler;
	          var ctx = _bindings$event$i.ctx;
	          var once = _bindings$event$i.once;
	
	          var context = ctx;
	          if (typeof context === 'undefined') {
	            context = this;
	          }
	
	          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            args[_key - 1] = arguments[_key];
	          }
	
	          handler.apply(context, args);
	
	          if (once) {
	            this.bindings[event].splice(i, 1);
	          } else {
	            ++i;
	          }
	        }
	      }
	    }
	  }]);
	
	  return Evented;
	})();
	
	TetherBase.Utils = {
	  getScrollParent: getScrollParent,
	  getBounds: getBounds,
	  getOffsetParent: getOffsetParent,
	  extend: extend,
	  addClass: addClass,
	  removeClass: removeClass,
	  hasClass: hasClass,
	  updateClasses: updateClasses,
	  defer: defer,
	  flush: flush,
	  uniqueId: uniqueId,
	  Evented: Evented,
	  getScrollBarSize: getScrollBarSize
	};
	/* globals TetherBase, performance */
	
	'use strict';
	
	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	if (typeof TetherBase === 'undefined') {
	  throw new Error('You must include the utils.js file before tether.js');
	}
	
	var _TetherBase$Utils = TetherBase.Utils;
	var getScrollParent = _TetherBase$Utils.getScrollParent;
	var getBounds = _TetherBase$Utils.getBounds;
	var getOffsetParent = _TetherBase$Utils.getOffsetParent;
	var extend = _TetherBase$Utils.extend;
	var addClass = _TetherBase$Utils.addClass;
	var removeClass = _TetherBase$Utils.removeClass;
	var updateClasses = _TetherBase$Utils.updateClasses;
	var defer = _TetherBase$Utils.defer;
	var flush = _TetherBase$Utils.flush;
	var getScrollBarSize = _TetherBase$Utils.getScrollBarSize;
	
	function within(a, b) {
	  var diff = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
	
	  return a + diff >= b && b >= a - diff;
	}
	
	var transformKey = (function () {
	  var el = document.createElement('div');
	
	  var transforms = ['transform', 'webkitTransform', 'OTransform', 'MozTransform', 'msTransform'];
	  for (var i = 0; i < transforms.length; ++i) {
	    var key = transforms[i];
	    if (el.style[key] !== undefined) {
	      return key;
	    }
	  }
	})();
	
	var tethers = [];
	
	var position = function position() {
	  tethers.forEach(function (tether) {
	    tether.position(false);
	  });
	  flush();
	};
	
	function now() {
	  if (typeof performance !== 'undefined' && typeof performance.now !== 'undefined') {
	    return performance.now();
	  }
	  return +new Date();
	}
	
	(function () {
	  var lastCall = null;
	  var lastDuration = null;
	  var pendingTimeout = null;
	
	  var tick = function tick() {
	    if (typeof lastDuration !== 'undefined' && lastDuration > 16) {
	      // We voluntarily throttle ourselves if we can't manage 60fps
	      lastDuration = Math.min(lastDuration - 16, 250);
	
	      // Just in case this is the last event, remember to position just once more
	      pendingTimeout = setTimeout(tick, 250);
	      return;
	    }
	
	    if (typeof lastCall !== 'undefined' && now() - lastCall < 10) {
	      // Some browsers call events a little too frequently, refuse to run more than is reasonable
	      return;
	    }
	
	    if (typeof pendingTimeout !== 'undefined') {
	      clearTimeout(pendingTimeout);
	      pendingTimeout = null;
	    }
	
	    lastCall = now();
	    position();
	    lastDuration = now() - lastCall;
	  };
	
	  ['resize', 'scroll', 'touchmove'].forEach(function (event) {
	    window.addEventListener(event, tick);
	  });
	})();
	
	var MIRROR_LR = {
	  center: 'center',
	  left: 'right',
	  right: 'left'
	};
	
	var MIRROR_TB = {
	  middle: 'middle',
	  top: 'bottom',
	  bottom: 'top'
	};
	
	var OFFSET_MAP = {
	  top: 0,
	  left: 0,
	  middle: '50%',
	  center: '50%',
	  bottom: '100%',
	  right: '100%'
	};
	
	var autoToFixedAttachment = function autoToFixedAttachment(attachment, relativeToAttachment) {
	  var left = attachment.left;
	  var top = attachment.top;
	
	  if (left === 'auto') {
	    left = MIRROR_LR[relativeToAttachment.left];
	  }
	
	  if (top === 'auto') {
	    top = MIRROR_TB[relativeToAttachment.top];
	  }
	
	  return { left: left, top: top };
	};
	
	var attachmentToOffset = function attachmentToOffset(attachment) {
	  var left = attachment.left;
	  var top = attachment.top;
	
	  if (typeof OFFSET_MAP[attachment.left] !== 'undefined') {
	    left = OFFSET_MAP[attachment.left];
	  }
	
	  if (typeof OFFSET_MAP[attachment.top] !== 'undefined') {
	    top = OFFSET_MAP[attachment.top];
	  }
	
	  return { left: left, top: top };
	};
	
	function addOffset() {
	  var out = { top: 0, left: 0 };
	
	  for (var _len = arguments.length, offsets = Array(_len), _key = 0; _key < _len; _key++) {
	    offsets[_key] = arguments[_key];
	  }
	
	  offsets.forEach(function (_ref) {
	    var top = _ref.top;
	    var left = _ref.left;
	
	    if (typeof top === 'string') {
	      top = parseFloat(top, 10);
	    }
	    if (typeof left === 'string') {
	      left = parseFloat(left, 10);
	    }
	
	    out.top += top;
	    out.left += left;
	  });
	
	  return out;
	}
	
	function offsetToPx(offset, size) {
	  if (typeof offset.left === 'string' && offset.left.indexOf('%') !== -1) {
	    offset.left = parseFloat(offset.left, 10) / 100 * size.width;
	  }
	  if (typeof offset.top === 'string' && offset.top.indexOf('%') !== -1) {
	    offset.top = parseFloat(offset.top, 10) / 100 * size.height;
	  }
	
	  return offset;
	}
	
	var parseOffset = function parseOffset(value) {
	  var _value$split = value.split(' ');
	
	  var _value$split2 = _slicedToArray(_value$split, 2);
	
	  var top = _value$split2[0];
	  var left = _value$split2[1];
	
	  return { top: top, left: left };
	};
	var parseAttachment = parseOffset;
	
	var TetherClass = (function () {
	  function TetherClass(options) {
	    var _this = this;
	
	    _classCallCheck(this, TetherClass);
	
	    this.position = this.position.bind(this);
	
	    tethers.push(this);
	
	    this.history = [];
	
	    this.setOptions(options, false);
	
	    TetherBase.modules.forEach(function (module) {
	      if (typeof module.initialize !== 'undefined') {
	        module.initialize.call(_this);
	      }
	    });
	
	    this.position();
	  }
	
	  _createClass(TetherClass, [{
	    key: 'getClass',
	    value: function getClass() {
	      var key = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	      var classes = this.options.classes;
	
	      if (typeof classes !== 'undefined' && classes[key]) {
	        return this.options.classes[key];
	      } else if (this.options.classPrefix) {
	        return this.options.classPrefix + '-' + key;
	      } else {
	        return key;
	      }
	    }
	  }, {
	    key: 'setOptions',
	    value: function setOptions(options) {
	      var _this2 = this;
	
	      var pos = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
	      var defaults = {
	        offset: '0 0',
	        targetOffset: '0 0',
	        targetAttachment: 'auto auto',
	        classPrefix: 'tether'
	      };
	
	      this.options = extend(defaults, options);
	
	      var _options = this.options;
	      var element = _options.element;
	      var target = _options.target;
	      var targetModifier = _options.targetModifier;
	
	      this.element = element;
	      this.target = target;
	      this.targetModifier = targetModifier;
	
	      if (this.target === 'viewport') {
	        this.target = document.body;
	        this.targetModifier = 'visible';
	      } else if (this.target === 'scroll-handle') {
	        this.target = document.body;
	        this.targetModifier = 'scroll-handle';
	      }
	
	      ['element', 'target'].forEach(function (key) {
	        if (typeof _this2[key] === 'undefined') {
	          throw new Error('Tether Error: Both element and target must be defined');
	        }
	
	        if (typeof _this2[key].jquery !== 'undefined') {
	          _this2[key] = _this2[key][0];
	        } else if (typeof _this2[key] === 'string') {
	          _this2[key] = document.querySelector(_this2[key]);
	        }
	      });
	
	      addClass(this.element, this.getClass('element'));
	      if (!(this.options.addTargetClasses === false)) {
	        addClass(this.target, this.getClass('target'));
	      }
	
	      if (!this.options.attachment) {
	        throw new Error('Tether Error: You must provide an attachment');
	      }
	
	      this.targetAttachment = parseAttachment(this.options.targetAttachment);
	      this.attachment = parseAttachment(this.options.attachment);
	      this.offset = parseOffset(this.options.offset);
	      this.targetOffset = parseOffset(this.options.targetOffset);
	
	      if (typeof this.scrollParent !== 'undefined') {
	        this.disable();
	      }
	
	      if (this.targetModifier === 'scroll-handle') {
	        this.scrollParent = this.target;
	      } else {
	        this.scrollParent = getScrollParent(this.target);
	      }
	
	      if (!(this.options.enabled === false)) {
	        this.enable(pos);
	      }
	    }
	  }, {
	    key: 'getTargetBounds',
	    value: function getTargetBounds() {
	      if (typeof this.targetModifier !== 'undefined') {
	        if (this.targetModifier === 'visible') {
	          if (this.target === document.body) {
	            return { top: pageYOffset, left: pageXOffset, height: innerHeight, width: innerWidth };
	          } else {
	            var bounds = getBounds(this.target);
	
	            var out = {
	              height: bounds.height,
	              width: bounds.width,
	              top: bounds.top,
	              left: bounds.left
	            };
	
	            out.height = Math.min(out.height, bounds.height - (pageYOffset - bounds.top));
	            out.height = Math.min(out.height, bounds.height - (bounds.top + bounds.height - (pageYOffset + innerHeight)));
	            out.height = Math.min(innerHeight, out.height);
	            out.height -= 2;
	
	            out.width = Math.min(out.width, bounds.width - (pageXOffset - bounds.left));
	            out.width = Math.min(out.width, bounds.width - (bounds.left + bounds.width - (pageXOffset + innerWidth)));
	            out.width = Math.min(innerWidth, out.width);
	            out.width -= 2;
	
	            if (out.top < pageYOffset) {
	              out.top = pageYOffset;
	            }
	            if (out.left < pageXOffset) {
	              out.left = pageXOffset;
	            }
	
	            return out;
	          }
	        } else if (this.targetModifier === 'scroll-handle') {
	          var bounds = undefined;
	          var target = this.target;
	          if (target === document.body) {
	            target = document.documentElement;
	
	            bounds = {
	              left: pageXOffset,
	              top: pageYOffset,
	              height: innerHeight,
	              width: innerWidth
	            };
	          } else {
	            bounds = getBounds(target);
	          }
	
	          var style = getComputedStyle(target);
	
	          var hasBottomScroll = target.scrollWidth > target.clientWidth || [style.overflow, style.overflowX].indexOf('scroll') >= 0 || this.target !== document.body;
	
	          var scrollBottom = 0;
	          if (hasBottomScroll) {
	            scrollBottom = 15;
	          }
	
	          var height = bounds.height - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth) - scrollBottom;
	
	          var out = {
	            width: 15,
	            height: height * 0.975 * (height / target.scrollHeight),
	            left: bounds.left + bounds.width - parseFloat(style.borderLeftWidth) - 15
	          };
	
	          var fitAdj = 0;
	          if (height < 408 && this.target === document.body) {
	            fitAdj = -0.00011 * Math.pow(height, 2) - 0.00727 * height + 22.58;
	          }
	
	          if (this.target !== document.body) {
	            out.height = Math.max(out.height, 24);
	          }
	
	          var scrollPercentage = this.target.scrollTop / (target.scrollHeight - height);
	          out.top = scrollPercentage * (height - out.height - fitAdj) + bounds.top + parseFloat(style.borderTopWidth);
	
	          if (this.target === document.body) {
	            out.height = Math.max(out.height, 24);
	          }
	
	          return out;
	        }
	      } else {
	        return getBounds(this.target);
	      }
	    }
	  }, {
	    key: 'clearCache',
	    value: function clearCache() {
	      this._cache = {};
	    }
	  }, {
	    key: 'cache',
	    value: function cache(k, getter) {
	      // More than one module will often need the same DOM info, so
	      // we keep a cache which is cleared on each position call
	      if (typeof this._cache === 'undefined') {
	        this._cache = {};
	      }
	
	      if (typeof this._cache[k] === 'undefined') {
	        this._cache[k] = getter.call(this);
	      }
	
	      return this._cache[k];
	    }
	  }, {
	    key: 'enable',
	    value: function enable() {
	      var pos = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
	      if (!(this.options.addTargetClasses === false)) {
	        addClass(this.target, this.getClass('enabled'));
	      }
	      addClass(this.element, this.getClass('enabled'));
	      this.enabled = true;
	
	      if (this.scrollParent !== document) {
	        this.scrollParent.addEventListener('scroll', this.position);
	      }
	
	      if (pos) {
	        this.position();
	      }
	    }
	  }, {
	    key: 'disable',
	    value: function disable() {
	      removeClass(this.target, this.getClass('enabled'));
	      removeClass(this.element, this.getClass('enabled'));
	      this.enabled = false;
	
	      if (typeof this.scrollParent !== 'undefined') {
	        this.scrollParent.removeEventListener('scroll', this.position);
	      }
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      var _this3 = this;
	
	      this.disable();
	
	      tethers.forEach(function (tether, i) {
	        if (tether === _this3) {
	          tethers.splice(i, 1);
	          return;
	        }
	      });
	    }
	  }, {
	    key: 'updateAttachClasses',
	    value: function updateAttachClasses(elementAttach, targetAttach) {
	      var _this4 = this;
	
	      elementAttach = elementAttach || this.attachment;
	      targetAttach = targetAttach || this.targetAttachment;
	      var sides = ['left', 'top', 'bottom', 'right', 'middle', 'center'];
	
	      if (typeof this._addAttachClasses !== 'undefined' && this._addAttachClasses.length) {
	        // updateAttachClasses can be called more than once in a position call, so
	        // we need to clean up after ourselves such that when the last defer gets
	        // ran it doesn't add any extra classes from previous calls.
	        this._addAttachClasses.splice(0, this._addAttachClasses.length);
	      }
	
	      if (typeof this._addAttachClasses === 'undefined') {
	        this._addAttachClasses = [];
	      }
	      var add = this._addAttachClasses;
	
	      if (elementAttach.top) {
	        add.push(this.getClass('element-attached') + '-' + elementAttach.top);
	      }
	      if (elementAttach.left) {
	        add.push(this.getClass('element-attached') + '-' + elementAttach.left);
	      }
	      if (targetAttach.top) {
	        add.push(this.getClass('target-attached') + '-' + targetAttach.top);
	      }
	      if (targetAttach.left) {
	        add.push(this.getClass('target-attached') + '-' + targetAttach.left);
	      }
	
	      var all = [];
	      sides.forEach(function (side) {
	        all.push(_this4.getClass('element-attached') + '-' + side);
	        all.push(_this4.getClass('target-attached') + '-' + side);
	      });
	
	      defer(function () {
	        if (!(typeof _this4._addAttachClasses !== 'undefined')) {
	          return;
	        }
	
	        updateClasses(_this4.element, _this4._addAttachClasses, all);
	        if (!(_this4.options.addTargetClasses === false)) {
	          updateClasses(_this4.target, _this4._addAttachClasses, all);
	        }
	
	        delete _this4._addAttachClasses;
	      });
	    }
	  }, {
	    key: 'position',
	    value: function position() {
	      var _this5 = this;
	
	      var flushChanges = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
	      // flushChanges commits the changes immediately, leave true unless you are positioning multiple
	      // tethers (in which case call Tether.Utils.flush yourself when you're done)
	
	      if (!this.enabled) {
	        return;
	      }
	
	      this.clearCache();
	
	      // Turn 'auto' attachments into the appropriate corner or edge
	      var targetAttachment = autoToFixedAttachment(this.targetAttachment, this.attachment);
	
	      this.updateAttachClasses(this.attachment, targetAttachment);
	
	      var elementPos = this.cache('element-bounds', function () {
	        return getBounds(_this5.element);
	      });
	
	      var width = elementPos.width;
	      var height = elementPos.height;
	
	      if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
	        var _lastSize = this.lastSize;
	
	        // We cache the height and width to make it possible to position elements that are
	        // getting hidden.
	        width = _lastSize.width;
	        height = _lastSize.height;
	      } else {
	        this.lastSize = { width: width, height: height };
	      }
	
	      var targetPos = this.cache('target-bounds', function () {
	        return _this5.getTargetBounds();
	      });
	      var targetSize = targetPos;
	
	      // Get an actual px offset from the attachment
	      var offset = offsetToPx(attachmentToOffset(this.attachment), { width: width, height: height });
	      var targetOffset = offsetToPx(attachmentToOffset(targetAttachment), targetSize);
	
	      var manualOffset = offsetToPx(this.offset, { width: width, height: height });
	      var manualTargetOffset = offsetToPx(this.targetOffset, targetSize);
	
	      // Add the manually provided offset
	      offset = addOffset(offset, manualOffset);
	      targetOffset = addOffset(targetOffset, manualTargetOffset);
	
	      // It's now our goal to make (element position + offset) == (target position + target offset)
	      var left = targetPos.left + targetOffset.left - offset.left;
	      var top = targetPos.top + targetOffset.top - offset.top;
	
	      for (var i = 0; i < TetherBase.modules.length; ++i) {
	        var _module2 = TetherBase.modules[i];
	        var ret = _module2.position.call(this, {
	          left: left,
	          top: top,
	          targetAttachment: targetAttachment,
	          targetPos: targetPos,
	          elementPos: elementPos,
	          offset: offset,
	          targetOffset: targetOffset,
	          manualOffset: manualOffset,
	          manualTargetOffset: manualTargetOffset,
	          scrollbarSize: scrollbarSize,
	          attachment: this.attachment
	        });
	
	        if (ret === false) {
	          return false;
	        } else if (typeof ret === 'undefined' || typeof ret !== 'object') {
	          continue;
	        } else {
	          top = ret.top;
	          left = ret.left;
	        }
	      }
	
	      // We describe the position three different ways to give the optimizer
	      // a chance to decide the best possible way to position the element
	      // with the fewest repaints.
	      var next = {
	        // It's position relative to the page (absolute positioning when
	        // the element is a child of the body)
	        page: {
	          top: top,
	          left: left
	        },
	
	        // It's position relative to the viewport (fixed positioning)
	        viewport: {
	          top: top - pageYOffset,
	          bottom: pageYOffset - top - height + innerHeight,
	          left: left - pageXOffset,
	          right: pageXOffset - left - width + innerWidth
	        }
	      };
	
	      var scrollbarSize = undefined;
	      if (document.body.scrollWidth > window.innerWidth) {
	        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
	        next.viewport.bottom -= scrollbarSize.height;
	      }
	
	      if (document.body.scrollHeight > window.innerHeight) {
	        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
	        next.viewport.right -= scrollbarSize.width;
	      }
	
	      if (['', 'static'].indexOf(document.body.style.position) === -1 || ['', 'static'].indexOf(document.body.parentElement.style.position) === -1) {
	        // Absolute positioning in the body will be relative to the page, not the 'initial containing block'
	        next.page.bottom = document.body.scrollHeight - top - height;
	        next.page.right = document.body.scrollWidth - left - width;
	      }
	
	      if (typeof this.options.optimizations !== 'undefined' && this.options.optimizations.moveElement !== false && !(typeof this.targetModifier !== 'undefined')) {
	        (function () {
	          var offsetParent = _this5.cache('target-offsetparent', function () {
	            return getOffsetParent(_this5.target);
	          });
	          var offsetPosition = _this5.cache('target-offsetparent-bounds', function () {
	            return getBounds(offsetParent);
	          });
	          var offsetParentStyle = getComputedStyle(offsetParent);
	          var offsetParentSize = offsetPosition;
	
	          var offsetBorder = {};
	          ['Top', 'Left', 'Bottom', 'Right'].forEach(function (side) {
	            offsetBorder[side.toLowerCase()] = parseFloat(offsetParentStyle['border' + side + 'Width']);
	          });
	
	          offsetPosition.right = document.body.scrollWidth - offsetPosition.left - offsetParentSize.width + offsetBorder.right;
	          offsetPosition.bottom = document.body.scrollHeight - offsetPosition.top - offsetParentSize.height + offsetBorder.bottom;
	
	          if (next.page.top >= offsetPosition.top + offsetBorder.top && next.page.bottom >= offsetPosition.bottom) {
	            if (next.page.left >= offsetPosition.left + offsetBorder.left && next.page.right >= offsetPosition.right) {
	              // We're within the visible part of the target's scroll parent
	              var scrollTop = offsetParent.scrollTop;
	              var scrollLeft = offsetParent.scrollLeft;
	
	              // It's position relative to the target's offset parent (absolute positioning when
	              // the element is moved to be a child of the target's offset parent).
	              next.offset = {
	                top: next.page.top - offsetPosition.top + scrollTop - offsetBorder.top,
	                left: next.page.left - offsetPosition.left + scrollLeft - offsetBorder.left
	              };
	            }
	          }
	        })();
	      }
	
	      // We could also travel up the DOM and try each containing context, rather than only
	      // looking at the body, but we're gonna get diminishing returns.
	
	      this.move(next);
	
	      this.history.unshift(next);
	
	      if (this.history.length > 3) {
	        this.history.pop();
	      }
	
	      if (flushChanges) {
	        flush();
	      }
	
	      return true;
	    }
	  }, {
	    key: 'move',
	
	    // THE ISSUE
	    value: function move(pos) {
	      var _this6 = this;
	
	      if (!(typeof this.element.parentNode !== 'undefined')) {
	        return;
	      }
	
	      var same = {};
	
	      for (var type in pos) {
	        same[type] = {};
	
	        for (var key in pos[type]) {
	          var found = false;
	
	          for (var i = 0; i < this.history.length; ++i) {
	            var point = this.history[i];
	            if (typeof point[type] !== 'undefined' && !within(point[type][key], pos[type][key])) {
	              found = true;
	              break;
	            }
	          }
	
	          if (!found) {
	            same[type][key] = true;
	          }
	        }
	      }
	
	      var css = { top: '', left: '', right: '', bottom: '' };
	
	      var transcribe = function transcribe(_same, _pos) {
	        var hasOptimizations = typeof _this6.options.optimizations !== 'undefined';
	        var gpu = hasOptimizations ? _this6.options.optimizations.gpu : null;
	        if (gpu !== false) {
	          var yPos = undefined,
	              xPos = undefined;
	          if (_same.top) {
	            css.top = 0;
	            yPos = _pos.top;
	          } else {
	            css.bottom = 0;
	            yPos = -_pos.bottom;
	          }
	
	          if (_same.left) {
	            css.left = 0;
	            xPos = _pos.left;
	          } else {
	            css.right = 0;
	            xPos = -_pos.right;
	          }
	
	          css[transformKey] = 'translateX(' + Math.round(xPos) + 'px) translateY(' + Math.round(yPos) + 'px)';
	
	          if (transformKey !== 'msTransform') {
	            // The Z transform will keep this in the GPU (faster, and prevents artifacts),
	            // but IE9 doesn't support 3d transforms and will choke.
	            css[transformKey] += ' translateZ(0)';
	          }
	        } else {
	          if (_same.top) {
	            css.top = _pos.top + 'px';
	          } else {
	            css.bottom = _pos.bottom + 'px';
	          }
	
	          if (_same.left) {
	            css.left = _pos.left + 'px';
	          } else {
	            css.right = _pos.right + 'px';
	          }
	        }
	      };
	
	      var moved = false;
	      if ((same.page.top || same.page.bottom) && (same.page.left || same.page.right)) {
	        css.position = 'absolute';
	        transcribe(same.page, pos.page);
	      } else if ((same.viewport.top || same.viewport.bottom) && (same.viewport.left || same.viewport.right)) {
	        css.position = 'fixed';
	        transcribe(same.viewport, pos.viewport);
	      } else if (typeof same.offset !== 'undefined' && same.offset.top && same.offset.left) {
	        (function () {
	          css.position = 'absolute';
	          var offsetParent = _this6.cache('target-offsetparent', function () {
	            return getOffsetParent(_this6.target);
	          });
	
	          if (getOffsetParent(_this6.element) !== offsetParent) {
	            defer(function () {
	              _this6.element.parentNode.removeChild(_this6.element);
	              offsetParent.appendChild(_this6.element);
	            });
	          }
	
	          transcribe(same.offset, pos.offset);
	          moved = true;
	        })();
	      } else {
	        css.position = 'absolute';
	        transcribe({ top: true, left: true }, pos.page);
	      }
	
	      if (!moved) {
	        var offsetParentIsBody = true;
	        var currentNode = this.element.parentNode;
	        while (currentNode && currentNode.tagName !== 'BODY') {
	          if (getComputedStyle(currentNode).position !== 'static') {
	            offsetParentIsBody = false;
	            break;
	          }
	
	          currentNode = currentNode.parentNode;
	        }
	
	        if (!offsetParentIsBody) {
	          this.element.parentNode.removeChild(this.element);
	          document.body.appendChild(this.element);
	        }
	      }
	
	      // Any css change will trigger a repaint, so let's avoid one if nothing changed
	      var writeCSS = {};
	      var write = false;
	      for (var key in css) {
	        var val = css[key];
	        var elVal = this.element.style[key];
	
	        if (elVal !== '' && val !== '' && ['top', 'left', 'bottom', 'right'].indexOf(key) >= 0) {
	          elVal = parseFloat(elVal);
	          val = parseFloat(val);
	        }
	
	        if (elVal !== val) {
	          write = true;
	          writeCSS[key] = val;
	        }
	      }
	
	      if (write) {
	        defer(function () {
	          extend(_this6.element.style, writeCSS);
	        });
	      }
	    }
	  }]);
	
	  return TetherClass;
	})();
	
	TetherClass.modules = [];
	
	TetherBase.position = position;
	
	var Tether = extend(TetherClass, TetherBase);
	/* globals TetherBase */
	
	'use strict';
	
	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();
	
	var _TetherBase$Utils = TetherBase.Utils;
	var getBounds = _TetherBase$Utils.getBounds;
	var extend = _TetherBase$Utils.extend;
	var updateClasses = _TetherBase$Utils.updateClasses;
	var defer = _TetherBase$Utils.defer;
	
	var BOUNDS_FORMAT = ['left', 'top', 'right', 'bottom'];
	
	function getBoundingRect(tether, to) {
	  if (to === 'scrollParent') {
	    to = tether.scrollParent;
	  } else if (to === 'window') {
	    to = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset];
	  }
	
	  if (to === document) {
	    to = to.documentElement;
	  }
	
	  if (typeof to.nodeType !== 'undefined') {
	    (function () {
	      var size = getBounds(to);
	      var pos = size;
	      var style = getComputedStyle(to);
	
	      to = [pos.left, pos.top, size.width + pos.left, size.height + pos.top];
	
	      BOUNDS_FORMAT.forEach(function (side, i) {
	        side = side[0].toUpperCase() + side.substr(1);
	        if (side === 'Top' || side === 'Left') {
	          to[i] += parseFloat(style['border' + side + 'Width']);
	        } else {
	          to[i] -= parseFloat(style['border' + side + 'Width']);
	        }
	      });
	    })();
	  }
	
	  return to;
	}
	
	TetherBase.modules.push({
	  position: function position(_ref) {
	    var _this = this;
	
	    var top = _ref.top;
	    var left = _ref.left;
	    var targetAttachment = _ref.targetAttachment;
	
	    if (!this.options.constraints) {
	      return true;
	    }
	
	    var _cache = this.cache('element-bounds', function () {
	      return getBounds(_this.element);
	    });
	
	    var height = _cache.height;
	    var width = _cache.width;
	
	    if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
	      var _lastSize = this.lastSize;
	
	      // Handle the item getting hidden as a result of our positioning without glitching
	      // the classes in and out
	      width = _lastSize.width;
	      height = _lastSize.height;
	    }
	
	    var targetSize = this.cache('target-bounds', function () {
	      return _this.getTargetBounds();
	    });
	
	    var targetHeight = targetSize.height;
	    var targetWidth = targetSize.width;
	
	    var allClasses = [this.getClass('pinned'), this.getClass('out-of-bounds')];
	
	    this.options.constraints.forEach(function (constraint) {
	      var outOfBoundsClass = constraint.outOfBoundsClass;
	      var pinnedClass = constraint.pinnedClass;
	
	      if (outOfBoundsClass) {
	        allClasses.push(outOfBoundsClass);
	      }
	      if (pinnedClass) {
	        allClasses.push(pinnedClass);
	      }
	    });
	
	    allClasses.forEach(function (cls) {
	      ['left', 'top', 'right', 'bottom'].forEach(function (side) {
	        allClasses.push(cls + '-' + side);
	      });
	    });
	
	    var addClasses = [];
	
	    var tAttachment = extend({}, targetAttachment);
	    var eAttachment = extend({}, this.attachment);
	
	    this.options.constraints.forEach(function (constraint) {
	      var to = constraint.to;
	      var attachment = constraint.attachment;
	      var pin = constraint.pin;
	
	      if (typeof attachment === 'undefined') {
	        attachment = '';
	      }
	
	      var changeAttachX = undefined,
	          changeAttachY = undefined;
	      if (attachment.indexOf(' ') >= 0) {
	        var _attachment$split = attachment.split(' ');
	
	        var _attachment$split2 = _slicedToArray(_attachment$split, 2);
	
	        changeAttachY = _attachment$split2[0];
	        changeAttachX = _attachment$split2[1];
	      } else {
	        changeAttachX = changeAttachY = attachment;
	      }
	
	      var bounds = getBoundingRect(_this, to);
	
	      if (changeAttachY === 'target' || changeAttachY === 'both') {
	        if (top < bounds[1] && tAttachment.top === 'top') {
	          top += targetHeight;
	          tAttachment.top = 'bottom';
	        }
	
	        if (top + height > bounds[3] && tAttachment.top === 'bottom') {
	          top -= targetHeight;
	          tAttachment.top = 'top';
	        }
	      }
	
	      if (changeAttachY === 'together') {
	        if (top < bounds[1] && tAttachment.top === 'top') {
	          if (eAttachment.top === 'bottom') {
	            top += targetHeight;
	            tAttachment.top = 'bottom';
	
	            top += height;
	            eAttachment.top = 'top';
	          } else if (eAttachment.top === 'top') {
	            top += targetHeight;
	            tAttachment.top = 'bottom';
	
	            top -= height;
	            eAttachment.top = 'bottom';
	          }
	        }
	
	        if (top + height > bounds[3] && tAttachment.top === 'bottom') {
	          if (eAttachment.top === 'top') {
	            top -= targetHeight;
	            tAttachment.top = 'top';
	
	            top -= height;
	            eAttachment.top = 'bottom';
	          } else if (eAttachment.top === 'bottom') {
	            top -= targetHeight;
	            tAttachment.top = 'top';
	
	            top += height;
	            eAttachment.top = 'top';
	          }
	        }
	
	        if (tAttachment.top === 'middle') {
	          if (top + height > bounds[3] && eAttachment.top === 'top') {
	            top -= height;
	            eAttachment.top = 'bottom';
	          } else if (top < bounds[1] && eAttachment.top === 'bottom') {
	            top += height;
	            eAttachment.top = 'top';
	          }
	        }
	      }
	
	      if (changeAttachX === 'target' || changeAttachX === 'both') {
	        if (left < bounds[0] && tAttachment.left === 'left') {
	          left += targetWidth;
	          tAttachment.left = 'right';
	        }
	
	        if (left + width > bounds[2] && tAttachment.left === 'right') {
	          left -= targetWidth;
	          tAttachment.left = 'left';
	        }
	      }
	
	      if (changeAttachX === 'together') {
	        if (left < bounds[0] && tAttachment.left === 'left') {
	          if (eAttachment.left === 'right') {
	            left += targetWidth;
	            tAttachment.left = 'right';
	
	            left += width;
	            eAttachment.left = 'left';
	          } else if (eAttachment.left === 'left') {
	            left += targetWidth;
	            tAttachment.left = 'right';
	
	            left -= width;
	            eAttachment.left = 'right';
	          }
	        } else if (left + width > bounds[2] && tAttachment.left === 'right') {
	          if (eAttachment.left === 'left') {
	            left -= targetWidth;
	            tAttachment.left = 'left';
	
	            left -= width;
	            eAttachment.left = 'right';
	          } else if (eAttachment.left === 'right') {
	            left -= targetWidth;
	            tAttachment.left = 'left';
	
	            left += width;
	            eAttachment.left = 'left';
	          }
	        } else if (tAttachment.left === 'center') {
	          if (left + width > bounds[2] && eAttachment.left === 'left') {
	            left -= width;
	            eAttachment.left = 'right';
	          } else if (left < bounds[0] && eAttachment.left === 'right') {
	            left += width;
	            eAttachment.left = 'left';
	          }
	        }
	      }
	
	      if (changeAttachY === 'element' || changeAttachY === 'both') {
	        if (top < bounds[1] && eAttachment.top === 'bottom') {
	          top += height;
	          eAttachment.top = 'top';
	        }
	
	        if (top + height > bounds[3] && eAttachment.top === 'top') {
	          top -= height;
	          eAttachment.top = 'bottom';
	        }
	      }
	
	      if (changeAttachX === 'element' || changeAttachX === 'both') {
	        if (left < bounds[0] && eAttachment.left === 'right') {
	          left += width;
	          eAttachment.left = 'left';
	        }
	
	        if (left + width > bounds[2] && eAttachment.left === 'left') {
	          left -= width;
	          eAttachment.left = 'right';
	        }
	      }
	
	      if (typeof pin === 'string') {
	        pin = pin.split(',').map(function (p) {
	          return p.trim();
	        });
	      } else if (pin === true) {
	        pin = ['top', 'left', 'right', 'bottom'];
	      }
	
	      pin = pin || [];
	
	      var pinned = [];
	      var oob = [];
	
	      if (top < bounds[1]) {
	        if (pin.indexOf('top') >= 0) {
	          top = bounds[1];
	          pinned.push('top');
	        } else {
	          oob.push('top');
	        }
	      }
	
	      if (top + height > bounds[3]) {
	        if (pin.indexOf('bottom') >= 0) {
	          top = bounds[3] - height;
	          pinned.push('bottom');
	        } else {
	          oob.push('bottom');
	        }
	      }
	
	      if (left < bounds[0]) {
	        if (pin.indexOf('left') >= 0) {
	          left = bounds[0];
	          pinned.push('left');
	        } else {
	          oob.push('left');
	        }
	      }
	
	      if (left + width > bounds[2]) {
	        if (pin.indexOf('right') >= 0) {
	          left = bounds[2] - width;
	          pinned.push('right');
	        } else {
	          oob.push('right');
	        }
	      }
	
	      if (pinned.length) {
	        (function () {
	          var pinnedClass = undefined;
	          if (typeof _this.options.pinnedClass !== 'undefined') {
	            pinnedClass = _this.options.pinnedClass;
	          } else {
	            pinnedClass = _this.getClass('pinned');
	          }
	
	          addClasses.push(pinnedClass);
	          pinned.forEach(function (side) {
	            addClasses.push(pinnedClass + '-' + side);
	          });
	        })();
	      }
	
	      if (oob.length) {
	        (function () {
	          var oobClass = undefined;
	          if (typeof _this.options.outOfBoundsClass !== 'undefined') {
	            oobClass = _this.options.outOfBoundsClass;
	          } else {
	            oobClass = _this.getClass('out-of-bounds');
	          }
	
	          addClasses.push(oobClass);
	          oob.forEach(function (side) {
	            addClasses.push(oobClass + '-' + side);
	          });
	        })();
	      }
	
	      if (pinned.indexOf('left') >= 0 || pinned.indexOf('right') >= 0) {
	        eAttachment.left = tAttachment.left = false;
	      }
	      if (pinned.indexOf('top') >= 0 || pinned.indexOf('bottom') >= 0) {
	        eAttachment.top = tAttachment.top = false;
	      }
	
	      if (tAttachment.top !== targetAttachment.top || tAttachment.left !== targetAttachment.left || eAttachment.top !== _this.attachment.top || eAttachment.left !== _this.attachment.left) {
	        _this.updateAttachClasses(eAttachment, tAttachment);
	      }
	    });
	
	    defer(function () {
	      if (!(_this.options.addTargetClasses === false)) {
	        updateClasses(_this.target, addClasses, allClasses);
	      }
	      updateClasses(_this.element, addClasses, allClasses);
	    });
	
	    return { top: top, left: left };
	  }
	});
	/* globals TetherBase */
	
	'use strict';
	
	var _TetherBase$Utils = TetherBase.Utils;
	var getBounds = _TetherBase$Utils.getBounds;
	var updateClasses = _TetherBase$Utils.updateClasses;
	var defer = _TetherBase$Utils.defer;
	
	TetherBase.modules.push({
	  position: function position(_ref) {
	    var _this = this;
	
	    var top = _ref.top;
	    var left = _ref.left;
	
	    var _cache = this.cache('element-bounds', function () {
	      return getBounds(_this.element);
	    });
	
	    var height = _cache.height;
	    var width = _cache.width;
	
	    var targetPos = this.getTargetBounds();
	
	    var bottom = top + height;
	    var right = left + width;
	
	    var abutted = [];
	    if (top <= targetPos.bottom && bottom >= targetPos.top) {
	      ['left', 'right'].forEach(function (side) {
	        var targetPosSide = targetPos[side];
	        if (targetPosSide === left || targetPosSide === right) {
	          abutted.push(side);
	        }
	      });
	    }
	
	    if (left <= targetPos.right && right >= targetPos.left) {
	      ['top', 'bottom'].forEach(function (side) {
	        var targetPosSide = targetPos[side];
	        if (targetPosSide === top || targetPosSide === bottom) {
	          abutted.push(side);
	        }
	      });
	    }
	
	    var allClasses = [];
	    var addClasses = [];
	
	    var sides = ['left', 'top', 'right', 'bottom'];
	    allClasses.push(this.getClass('abutted'));
	    sides.forEach(function (side) {
	      allClasses.push(_this.getClass('abutted') + '-' + side);
	    });
	
	    if (abutted.length) {
	      addClasses.push(this.getClass('abutted'));
	    }
	
	    abutted.forEach(function (side) {
	      addClasses.push(_this.getClass('abutted') + '-' + side);
	    });
	
	    defer(function () {
	      if (!(_this.options.addTargetClasses === false)) {
	        updateClasses(_this.target, addClasses, allClasses);
	      }
	      updateClasses(_this.element, addClasses, allClasses);
	    });
	
	    return true;
	  }
	});
	/* globals TetherBase */
	
	'use strict';
	
	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();
	
	TetherBase.modules.push({
	  position: function position(_ref) {
	    var top = _ref.top;
	    var left = _ref.left;
	
	    if (!this.options.shift) {
	      return;
	    }
	
	    var shift = this.options.shift;
	    if (typeof this.options.shift === 'function') {
	      shift = this.options.shift.call(this, { top: top, left: left });
	    }
	
	    var shiftTop = undefined,
	        shiftLeft = undefined;
	    if (typeof shift === 'string') {
	      shift = shift.split(' ');
	      shift[1] = shift[1] || shift[0];
	
	      var _shift = _slicedToArray(shift, 2);
	
	      shiftTop = _shift[0];
	      shiftLeft = _shift[1];
	
	      shiftTop = parseFloat(shiftTop, 10);
	      shiftLeft = parseFloat(shiftLeft, 10);
	    } else {
	      shiftTop = shift.top;
	      shiftLeft = shift.left;
	    }
	
	    top += shiftTop;
	    left += shiftLeft;
	
	    return { top: top, left: left };
	  }
	});
	return Tether;
	
	}));


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*
	Copyright (c) 2015, salesforce.com, inc. All rights reserved.
	
	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
	Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
	Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
	
	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
	
	'use strict';
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}
	
	var _DateUtil = __webpack_require__(7);
	
	var _DateUtil2 = _interopRequireDefault(_DateUtil);
	
	var _EventUtil = __webpack_require__(8);
	
	var _EventUtil2 = _interopRequireDefault(_EventUtil);
	
	var _CSSUtil = __webpack_require__(9);
	
	var _CSSUtil2 = _interopRequireDefault(_CSSUtil);
	
	var _KEYS = __webpack_require__(10);
	
	var _KEYS2 = _interopRequireDefault(_KEYS);
	
	module.exports = {
	  DateUtil: _DateUtil2['default'],
	  EventUtil: _EventUtil2['default'],
	  CSSUtil: _CSSUtil2['default'],
	  KEYS: _KEYS2['default']
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	/*
	Copyright (c) 2015, salesforce.com, inc. All rights reserved.
	
	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
	Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
	Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
	
	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
	
	'use strict';
	
	var DateUtil = {
	
	  firstDayOfMonth: function firstDayOfMonth(date) {
	    var d = new Date(date);
	    d.setDate(1);
	    return d;
	  },
	
	  isFirstDayOfMonth: function isFirstDayOfMonth(date) {
	    return date.getDate() === 1;
	  },
	
	  isLastDayOfMonth: function isLastDayOfMonth(date) {
	    return !DateUtil.isSameMonth(date, DateUtil.addDays(date, 1));
	  },
	  isSameMonth: function isSameMonth(d1, d2) {
	    if (!d1 || !d2) {
	      return false;
	    }
	    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
	  },
	  isSameDay: function isSameDay(d1, d2) {
	    if (!d1 || !d2) {
	      return false;
	    }
	    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
	  },
	  isCurrentMonth: function isCurrentMonth(date) {
	    if (!date) {
	      return false;
	    }
	    return DateUtil.isSameMonth(date, new Date());
	  },
	  isToday: function isToday(date) {
	    if (!date) {
	      return false;
	    }
	    return DateUtil.isSameDay(date, new Date());
	  },
	  isEqual: function isEqual(d1, d2) {
	    return d1.getTime() === d2.getTime();
	  },
	  addDays: function addDays(date, deltaDays) {
	    return new Date(date.getTime() + parseInt(deltaDays) * 86400000);
	  },
	  addWeeks: function addWeeks(date, deltaWeeks) {
	    return DateUtil.addDays(date, parseInt(deltaWeeks) * 7);
	  },
	  nearestWeekDay: function nearestWeekDay(date, weekDayIndex) {
	    var delta = weekDayIndex - date.getDay();
	    if (delta < 0) {
	      delta += 7;
	    }
	    return DateUtil.addDays(date, delta);
	  },
	  isLeapYear: function isLeapYear(year) {
	    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
	  },
	
	  getDaysInMonth: function getDaysInMonth(year, month) {
	    return [31, DateUtil.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
	  },
	
	  addMonths: function addMonths(date, value) {
	    var d = new Date(date);
	    var n = d.getDate();
	    d.setDate(1);
	    d.setMonth(d.getMonth() + value);
	    d.setDate(Math.min(n, DateUtil.getDaysInMonth(d.getFullYear(), d.getMonth())));
	    return d;
	  }
	};
	
	module.exports = DateUtil;

/***/ },
/* 8 */
/***/ function(module, exports) {

	/*
	Copyright (c) 2015, salesforce.com, inc. All rights reserved.
	
	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
	Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
	Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
	
	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
	
	'use strict';
	
	var EventUtil = {
	
	  trapEvent: function trapEvent(event) {
	    event.preventDefault();
	    event.stopPropagation();
	    if (event.nativeEvent && event.nativeEvent.preventDefault) {
	      event.nativeEvent.preventDefault();
	    }
	
	    if (event.nativeEvent && event.nativeEvent.stopPropagation) {
	      event.nativeEvent.stopPropagation();
	    }
	  },
	
	  trap: function trap(event) {
	    return EventUtil.trapEvent(event);
	  },
	
	  trapImmediate: function trapImmediate(event) {
	    if (event.nativeEvent && event.nativeEvent.stopImmediatePropagation) {
	      event.nativeEvent.stopImmediatePropagation();
	    }
	    EventUtil.trap(event);
	  }
	
	};
	
	module.exports = EventUtil;

/***/ },
/* 9 */
/***/ function(module, exports) {

	/*
	Copyright (c) 2015, salesforce.com, inc. All rights reserved.
	
	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
	Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
	Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
	
	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
	
	'use strict';
	
	var addCSSRule = function addCSSRule(sheet, selector, rules, index) {
	    console.log('selector: ', selector);
	    console.log('rules: ', rules);
	    if ('insertRule' in sheet) {
	        console.log('insertRule: ');
	        sheet.insertRule(selector + '{ ' + rules + ' }', index);
	    } else if ('addRule' in sheet) {
	        console.log('addRule: ');
	        sheet.addRule(selector, rules.join(';'), index);
	    }
	};
	
	module.exports = {
	    load: function load(cssClasses) {
	        var sheet = (function () {
	            var style = document.createElement("style");
	            style.appendChild(document.createTextNode(""));
	            document.head.appendChild(style);
	            return style.sheet;
	        })();
	        cssClasses.forEach(function (cssClass) {
	            var selector = cssClass.selector;
	            var rules = cssClass.rules;
	            addCSSRule(sheet, selector, rules.join(';'), 0);
	
	            //            rules.forEach((rule)=>{
	            //                addCSSRule(sheet,selector,rule, 0);
	            //            });
	        });
	    }
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {
	  ENTER: 13,
	  ESCAPE: 27,
	  SPACE: 32,
	  LEFT: 37,
	  UP: 38,
	  RIGHT: 39,
	  DOWN: 40,
	  TAB: 9
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * A mixin for handling (effectively) onClickOutside for React components.
	 * Note that we're not intercepting any events in this approach, and we're
	 * not using double events for capturing and discarding in layers or wrappers.
	 *
	 * The idea is that components define function
	 *
	 *   handleClickOutside: function() { ... }
	 *
	 * If no such function is defined, an error will be thrown, as this means
	 * either it still needs to be written, or the component should not be using
	 * this mixing since it will not exhibit onClickOutside behaviour.
	 *
	 */
	(function (root, factory) {
	  if (true) {
	    // AMD. Register as an anonymous module.
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    // Node. Note that this does not work with strict
	    // CommonJS, but only CommonJS-like environments
	    // that support module.exports
	    module.exports = factory(require('react'));
	  } else {
	    // Browser globals (root is window)
	    root.OnClickOutside = factory(React);
	  }
	}(this, function (React) {
	  "use strict";
	
	  // Use a parallel array because we can't use
	  // objects as keys, they get toString-coerced
	  var registeredComponents = [];
	  var handlers = [];
	
	  var IGNORE_CLASS = 'ignore-react-onclickoutside';
	
	  var isSourceFound = function(source, localNode) {
	    if (source === localNode) {
	      return true;
	    }
	    // SVG <use/> elements do not technically reside in the rendered DOM, so
	    // they do not have classList directly, but they offer a link to their
	    // corresponding element, which can have classList. This extra check is for
	    // that case.
	    // See: http://www.w3.org/TR/SVG11/struct.html#InterfaceSVGUseElement
	    // Discussion: https://github.com/Pomax/react-onclickoutside/pull/17
	    if (source.correspondingElement) {
	      return source.correspondingElement.classList.contains(IGNORE_CLASS);
	    }
	    return source.classList.contains(IGNORE_CLASS);
	  };
	
	  return {
	    componentDidMount: function() {
	      if(typeof this.handleClickOutside !== "function")
	        throw new Error("Component lacks a handleClickOutside(event) function for processing outside click events.");
	
	      var fn = this.__outsideClickHandler = (function(localNode, eventHandler) {
	        return function(evt) {
	          if (evt.stopImmediatePropagation) {
	            evt.stopImmediatePropagation();
	          } else {
	            evt.stopPropagation();
	          }
	          var source = evt.target;
	          var found = false;
	          // If source=local then this event came from "somewhere"
	          // inside and should be ignored. We could handle this with
	          // a layered approach, too, but that requires going back to
	          // thinking in terms of Dom node nesting, running counter
	          // to React's "you shouldn't care about the DOM" philosophy.
	          while(source.parentNode) {
	            found = isSourceFound(source, localNode);
	            if(found) return;
	            source = source.parentNode;
	          }
	          eventHandler(evt);
	        }
	      }(React.findDOMNode(this), this.handleClickOutside));
	
	      var pos = registeredComponents.length;
	      registeredComponents.push(this);
	      handlers[pos] = fn;
	
	      // If there is a truthy disableOnClickOutside property for this
	      // component, don't immediately start listening for outside events.
	      if (!this.props.disableOnClickOutside) {
	        this.enableOnClickOutside();
	      }
	    },
	
	    componentWillUnmount: function() {
	      this.disableOnClickOutside();
	      this.__outsideClickHandler = false;
	      var pos = registeredComponents.indexOf(this);
	      if( pos>-1) {
	        if (handlers[pos]) {
	          // clean up so we don't leak memory
	          handlers.splice(pos, 1);
	          registeredComponents.splice(pos, 1);
	        }
	      }
	    },
	
	    /**
	     * Can be called to explicitly enable event listening
	     * for clicks and touches outside of this element.
	     */
	    enableOnClickOutside: function() {
	      var fn = this.__outsideClickHandler;
	      document.addEventListener("mousedown", fn);
	      document.addEventListener("touchstart", fn);
	    },
	
	    /**
	     * Can be called to explicitly disable event listening
	     * for clicks and touches outside of this element.
	     */
	    disableOnClickOutside: function() {
	      var fn = this.__outsideClickHandler;
	      document.removeEventListener("mousedown", fn);
	      document.removeEventListener("touchstart", fn);
	    }
	  };
	
	}));


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/*
	Copyright (c) 2015, salesforce.com, inc. All rights reserved.
	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
	Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
	Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
	
	"use strict";
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { "default": obj };
	}
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _SLDSIcons = __webpack_require__(13);
	
	var _listItem = __webpack_require__(39);
	
	var _listItem2 = _interopRequireDefault(_listItem);
	
	module.exports = _react2["default"].createClass({
	
	  displayName: "SLDSPicklistBase-list",
	
	  getInitialState: function getInitialState() {
	    return {};
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      options: [],
	      label: 'Menu',
	      selectedIndex: -1,
	      highlightedIndex: 0,
	      className: '',
	      itemRenderer: null,
	      onListBlur: function onListBlur() {
	        console.log("onListBlur should be overwritten");
	      },
	      onMoveFocus: function onMoveFocus(delta) {
	        console.log("onMoveFocus should be overwritten");
	      },
	      onCancel: function onCancel(delta) {
	        console.log("onCancel should be overwritten");
	      },
	      onSelect: function onSelect(index) {
	        console.log("onSelect should be overwritten");
	      },
	      onListItemBlur: function onListItemBlur(listItemIndex) {
	        console.log("onListItemBlur should be overwritten");
	      }
	    };
	  },
	
	  handleClick: function handleClick(e) {
	    if (e.nativeEvent) {
	      e.nativeEvent.preventDefault();
	      e.nativeEvent.stopImmediatePropagation();
	    }
	    e.preventDefault();
	  },
	
	  handleUpdateHighlighted: function handleUpdateHighlighted(nextIndex) {
	    if (this.props.onUpdateHighlighted) {
	      this.props.onUpdateHighlighted(nextIndex);
	    }
	  },
	
	  handleListItemBlur: function handleListItemBlur(index, relatedTarget) {
	    if (this.props.onListItemBlur) {
	      this.props.onListItemBlur(index);
	    }
	    this.setState({ lastBlurredIndex: index });
	  },
	
	  handleMoveFocus: function handleMoveFocus(delta) {
	    var newHighlightedIndex = this.props.highlightedIndex + delta;
	    if (newHighlightedIndex < 0) {
	      newHighlightedIndex = this.props.options.length - 1;
	    } else if (newHighlightedIndex >= this.props.options.length) {
	      newHighlightedIndex = 0;
	    }
	    if (this.props.onUpdateHighlighted) {
	      this.props.onUpdateHighlighted(newHighlightedIndex);
	    }
	  },
	
	  handleCancel: function handleCancel() {
	    if (this.props.onCancel) {
	      this.props.onCancel();
	    }
	  },
	
	  handleSelect: function handleSelect(index) {
	    if (this.props.onSelect) {
	      this.props.onSelect(index);
	    }
	  },
	
	  handleItemFocus: function handleItemFocus(itemIndex, itemHeight) {
	    if (this.refs.scroll) {
	      this.refs.scroll.getDOMNode().scrollTop = itemIndex * itemHeight;
	    }
	  },
	
	  handleSearch: function handleSearch(index, ch) {
	    var searchChar = ch.toLowerCase();
	    for (var i = index + 1; i < this.props.options.length; i++) {
	      var option = this.props.options[i];
	      if (option && option.label) {
	        if (option.label.charAt(0).toLowerCase() === searchChar) {
	          if (this.props.onUpdateHighlighted) {
	            this.props.onUpdateHighlighted(i);
	          }
	          return;
	        }
	      }
	    }
	    for (var i = 0; i < index; i++) {
	      var option = this.props.options[i];
	      if (option && option.label) {
	        if (option.label.charAt(0).toLowerCase() === searchChar) {
	          if (this.props.onUpdateHighlighted) {
	            this.props.onUpdateHighlighted(i);
	          }
	          return;
	        }
	      }
	    }
	  },
	
	  getItems: function getItems() {
	    var _this = this;
	
	    return this.props.options.map(function (option, index) {
	      return _react2["default"].createElement(_listItem2["default"], {
	        key: 'ListItem_' + index,
	        index: index,
	        label: option.label,
	        value: option.value,
	        data: option,
	        isHighlighted: index === _this.props.highlightedIndex,
	        isSelected: index === _this.props.selectedIndex,
	        onUpdateHighlighted: _this.handleUpdateHighlighted,
	        onMoveFocus: _this.handleMoveFocus,
	        onBlur: _this.handleListItemBlur,
	        onFocus: _this.handleItemFocus,
	        onSelect: _this.handleSelect,
	        onSearch: _this.handleSearch,
	        labelRenderer: _this.props.itemRenderer,
	        onCancel: _this.handleCancel });
	    });
	  },
	
	  render: function render() {
	    return _react2["default"].createElement("div", {
	      ref: "scroll",
	      className: 'slds-wrap slds-grow slds-scrollable--y ' + this.props.className,
	      style: {
	        maxHeight: 260
	      }
	    }, _react2["default"].createElement("ul", {
	      ref: "scroll",
	      className: "slds-dropdown__list slds-theme--" + this.props.theme,
	      role: "menu",
	      "aria-labelledby": this.props.label }, this.getItems()));
	  },
	
	  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {}
	
	});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/*
	Copyright (c) 2015, salesforce.com, inc. All rights reserved.
	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
	Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
	Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { 'default': obj };
	}
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _SLDSSettings = __webpack_require__(14);
	
	var _SLDSSettings2 = _interopRequireDefault(_SLDSSettings);
	
	var _SLDSUtilityIcon = __webpack_require__(36);
	
	var _SLDSUtilityIcon2 = _interopRequireDefault(_SLDSUtilityIcon);
	
	var ButtonIcon = _react2['default'].createClass({
	    displayName: 'ButtonIcon',
	
	    getDefaultProps: function getDefaultProps() {
	
	        return {
	            category: 'utility' };
	    },
	
	    // Utility Icon Reference: https://www.lightningdesignsystem.com/resources/icons#utility
	    render: function render() {
	
	        var useTag = '<use xlink:href="' + _SLDSSettings2['default'].getAssetsPath() + '/icons/' + this.props.category + '-sprite/svg/symbols.svg#' + this.props.name + '" />';
	        var className = 'slds-button__icon';
	        if (this.props.variant !== 'icon') {
	            //If no position prop given, default to left
	            this.props.position ? className += ' slds-button__icon--' + this.props.position : className += ' slds-button__icon--left';
	        }
	        if (this.props.size) {
	            className += ' slds-button__icon--' + this.props.size;
	        }
	        if (this.props.inverse) {
	            className += ' slds-button__icon--inverse';
	        }
	        if (this.props.stateful) {
	            className += ' slds-button__icon--stateful';
	        }
	        if (this.props.hint) {
	            className += ' slds-button__icon--hint';
	        }
	        if (this.props.destructive) {
	            className += ' slds-button__icon--destructive';
	        }
	        if (this.props.category === 'utility') {
	            return _react2['default'].createElement(_SLDSUtilityIcon2['default'], { name: this.props.name, 'aria-hidden': 'true', className: className });
	        }
	        return _react2['default'].createElement('svg', { 'aria-hidden': 'true', className: className, dangerouslySetInnerHTML: { __html: useTag } });
	    }
	
	});
	
	exports.ButtonIcon = ButtonIcon;
	var Icon = _react2['default'].createClass({
	    displayName: 'Icon',
	
	    getDefaultProps: function getDefaultProps() {
	        return {
	            category: 'standard'
	        };
	    },
	
	    render: function render() {
	
	        var useTag = '<use xlink:href="' + _SLDSSettings2['default'].getAssetsPath() + '/icons/' + this.props.category + '-sprite/svg/symbols.svg#' + this.props.name + '" />';
	        var className = 'slds-icon';
	        if (this.props.stateful) {
	            className += '--stateful';
	        }
	        if (this.props.className) {
	            className += ' ' + this.props.className;
	        }
	        if (this.props.size) {
	            className += ' slds-icon--' + this.props.size;
	        }
	        if (this.props.position) {
	            className += ' slds-icon--' + this.props.position;
	        }
	        className = className + ' slds-icon-' + this.props.category + '-' + (this.props.theme || this.props.name);
	        if (this.props.category === 'utility') {
	            return _react2['default'].createElement('span', { className: 'slds-icon__container' }, _react2['default'].createElement(_SLDSUtilityIcon2['default'], { name: this.props.name, 'aria-hidden': 'true', className: className, style: this.props.style }));
	        }
	        return _react2['default'].createElement('span', { className: 'slds-icon__container' }, _react2['default'].createElement('svg', { 'aria-hidden': 'true', className: className, style: this.props.style, dangerouslySetInnerHTML: { __html: useTag } }));
	    }
	
	});
	
	exports.Icon = Icon;
	var InputIcon = _react2['default'].createClass({
	    displayName: 'InputIcon',
	
	    render: function render() {
	        var useTag = '<use xlink:href="' + _SLDSSettings2['default'].getAssetsPath() + 'icons/utility-sprite/svg/symbols.svg#' + this.props.name + '" />';
	        var className = 'slds-input__icon slds-icon-text-default';
	        return _react2['default'].createElement(_SLDSUtilityIcon2['default'], { name: this.props.name, 'aria-hidden': 'true', className: className });
	    }
	
	});
	exports.InputIcon = InputIcon;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/*
	Copyright (c) 2015, salesforce.com, inc. All rights reserved.
	
	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
	Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
	Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
	
	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
	
	'use strict';
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}
	
	var _reactModal = __webpack_require__(15);
	
	var _reactModal2 = _interopRequireDefault(_reactModal);
	
	var assetsPath = 'assets/';
	var appRoot = undefined;
	module.exports = {
	  setAssetsPath: function setAssetsPath(path) {
	    if (path) {
	      assetsPath = path;
	    }
	  },
	  getAssetsPath: function getAssetsPath() {
	    return String(assetsPath);
	  },
	  setAppElement: function setAppElement(el) {
	    if (el) {
	      appRoot = el;
	      _reactModal2['default'].setAppElement(el);
	    }
	  },
	  getAppElement: function getAppElement() {
	    return appRoot;
	  }
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(16);
	


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var React = __webpack_require__(2);
	var ExecutionEnvironment = __webpack_require__(18);
	var ModalPortal = React.createFactory(__webpack_require__(19));
	var ariaAppHider = __webpack_require__(34);
	var elementClass = __webpack_require__(35);
	
	var SafeHTMLElement = ExecutionEnvironment.canUseDOM ? window.HTMLElement : {};
	
	var Modal = module.exports = React.createClass({
	
	  displayName: 'Modal',
	  statics: {
	    setAppElement: ariaAppHider.setElement,
	    injectCSS : function() {
	      "production" !== process.env.NODE_ENV
	        && console.warn('React-Modal: injectCSS has been deprecated ' +
	                        'and no longer has any effect. It will be removed in a later version');
	    }
	  },
	
	  propTypes: {
	    isOpen: React.PropTypes.bool.isRequired,
	    style : React.PropTypes.shape({
	      content: React.PropTypes.object,
	      overlay: React.PropTypes.object
	    }),
	    appElement: React.PropTypes.instanceOf(SafeHTMLElement),
	    onRequestClose: React.PropTypes.func,
	    closeTimeoutMS: React.PropTypes.number,
	    ariaHideApp: React.PropTypes.bool
	  },
	
	  getDefaultProps: function () {
	    return {
	      isOpen: false,
	      ariaHideApp: true,
	      closeTimeoutMS: 0
	    };
	  },
	
	  componentDidMount: function() {
	    this.node = document.createElement('div');
	    this.node.className = 'ReactModalPortal';
	    document.body.appendChild(this.node);
	    this.renderPortal(this.props);
	  },
	
	  componentWillReceiveProps: function(newProps) {
	    this.renderPortal(newProps);
	  },
	
	  componentWillUnmount: function() {
	    React.unmountComponentAtNode(this.node);
	    document.body.removeChild(this.node);
	  },
	
	  renderPortal: function(props) {
	    if (props.isOpen) {
	      elementClass(document.body).add('ReactModal__Body--open');
	    } else {
	      elementClass(document.body).remove('ReactModal__Body--open');
	    }
	
	    if (props.ariaHideApp) {
	      ariaAppHider.toggle(props.isOpen, props.appElement);
	    }
	    sanitizeProps(props);
	    if (this.portal)
	      this.portal.setProps(props);
	    else
	      this.portal = React.render(ModalPortal(props), this.node);
	  },
	
	  render: function () {
	    return React.DOM.noscript();
	  }
	});
	
	function sanitizeProps(props) {
	  delete props.ref;
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ },
/* 17 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 18 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ExecutionEnvironment
	 */
	
	/*jslint evil: true */
	
	"use strict";
	
	var canUseDOM = !!(
	  (typeof window !== 'undefined' &&
	  window.document && window.document.createElement)
	);
	
	/**
	 * Simple, lightweight module assisting with the detection and context of
	 * Worker. Helps avoid circular dependencies and allows code to reason about
	 * whether or not they are in a Worker, even if they never include the main
	 * `ReactWorker` dependency.
	 */
	var ExecutionEnvironment = {
	
	  canUseDOM: canUseDOM,
	
	  canUseWorkers: typeof Worker !== 'undefined',
	
	  canUseEventListeners:
	    canUseDOM && !!(window.addEventListener || window.attachEvent),
	
	  canUseViewport: canUseDOM && !!window.screen,
	
	  isInWorker: !canUseDOM // For now, this is true - might change in the future.
	
	};
	
	module.exports = ExecutionEnvironment;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(2);
	var div = React.DOM.div;
	var focusManager = __webpack_require__(20);
	var scopeTab = __webpack_require__(22);
	var Assign = __webpack_require__(23);
	
	
	// so that our CSS is statically analyzable
	var CLASS_NAMES = {
	  overlay: {
	    base: 'ReactModal__Overlay',
	    afterOpen: 'ReactModal__Overlay--after-open',
	    beforeClose: 'ReactModal__Overlay--before-close'
	  },
	  content: {
	    base: 'ReactModal__Content',
	    afterOpen: 'ReactModal__Content--after-open',
	    beforeClose: 'ReactModal__Content--before-close'
	  }
	};
	
	var defaultStyles = {
	  overlay : {
	    position        : 'fixed',
	    top             : 0,
	    left            : 0,
	    right           : 0,
	    bottom          : 0,
	    backgroundColor : 'rgba(255, 255, 255, 0.75)'
	  },
	  content : {
	    position                : 'absolute',
	    top                     : '40px',
	    left                    : '40px',
	    right                   : '40px',
	    bottom                  : '40px',
	    border                  : '1px solid #ccc',
	    background              : '#fff',
	    overflow                : 'auto',
	    WebkitOverflowScrolling : 'touch',
	    borderRadius            : '4px',
	    outline                 : 'none',
	    padding                 : '20px'
	
	  }
	};
	
	function stopPropagation(event) {
	  event.stopPropagation();
	}
	
	var ModalPortal = module.exports = React.createClass({
	
	  displayName: 'ModalPortal',
	
	  getDefaultProps: function() {
	    return {
	      style: {
	        overlay : {},
	        content : {}
	      }
	    }
	  },
	
	  getInitialState: function() {
	    return {
	      afterOpen: false,
	      beforeClose: false
	    };
	  },
	
	  componentDidMount: function() {
	    // Focus needs to be set when mounting and already open
	    if (this.props.isOpen) {
	      this.setFocusAfterRender(true);
	      this.open();
	    }
	  },
	
	  componentWillUnmount: function() {
	    clearTimeout(this.closeTimer);
	  },
	
	  componentWillReceiveProps: function(newProps) {
	    // Focus only needs to be set once when the modal is being opened
	    if (!this.props.isOpen && newProps.isOpen) {
	      this.setFocusAfterRender(true);
	      this.open();
	    } else if (this.props.isOpen && !newProps.isOpen) {
	      this.close();
	    }
	  },
	
	  componentDidUpdate: function () {
	    if (this.focusAfterRender) {
	      this.focusContent();
	      this.setFocusAfterRender(false);
	    }
	  },
	
	  setFocusAfterRender: function (focus) {
	    this.focusAfterRender = focus;
	  },
	
	  open: function() {
	    focusManager.setupScopedFocus(this.getDOMNode());
	    focusManager.markForFocusLater();
	    this.setState({isOpen: true}, function() {
	      this.setState({afterOpen: true});
	    }.bind(this));
	  },
	
	  close: function() {
	    if (!this.ownerHandlesClose())
	      return;
	    if (this.props.closeTimeoutMS > 0)
	      this.closeWithTimeout();
	    else
	      this.closeWithoutTimeout();
	  },
	
	  focusContent: function() {
	    this.refs.content.getDOMNode().focus();
	  },
	
	  closeWithTimeout: function() {
	    this.setState({beforeClose: true}, function() {
	      this.closeTimer = setTimeout(this.closeWithoutTimeout, this.props.closeTimeoutMS);
	    }.bind(this));
	  },
	
	  closeWithoutTimeout: function() {
	    this.setState({
	      afterOpen: false,
	      beforeClose: false
	    }, this.afterClose);
	  },
	
	  afterClose: function() {
	    focusManager.returnFocus();
	    focusManager.teardownScopedFocus();
	  },
	
	  handleKeyDown: function(event) {
	    if (event.keyCode == 9 /*tab*/) scopeTab(this.refs.content.getDOMNode(), event);
	    if (event.keyCode == 27 /*esc*/) this.requestClose();
	  },
	
	  handleOverlayClick: function() {
	    if (this.ownerHandlesClose())
	      this.requestClose();
	    else
	      this.focusContent();
	  },
	
	  requestClose: function() {
	    if (this.ownerHandlesClose())
	      this.props.onRequestClose();
	  },
	
	  ownerHandlesClose: function() {
	    return this.props.onRequestClose;
	  },
	
	  shouldBeClosed: function() {
	    return !this.props.isOpen && !this.state.beforeClose;
	  },
	
	  buildClassName: function(which, additional) {
	    var className = CLASS_NAMES[which].base;
	    if (this.state.afterOpen)
	      className += ' '+CLASS_NAMES[which].afterOpen;
	    if (this.state.beforeClose)
	      className += ' '+CLASS_NAMES[which].beforeClose;
	    return additional ? className + ' ' + additional : className;
	  },
	
	  render: function() {
	    return this.shouldBeClosed() ? div() : (
	      div({
	        ref: "overlay",
	        className: this.buildClassName('overlay', this.props.overlayClassName),
	        style: Assign({}, defaultStyles.overlay, this.props.style.overlay || {}),
	        onClick: this.handleOverlayClick
	      },
	        div({
	          ref: "content",
	          style: Assign({}, defaultStyles.content, this.props.style.content || {}),
	          className: this.buildClassName('content', this.props.className),
	          tabIndex: "-1",
	          onClick: stopPropagation,
	          onKeyDown: this.handleKeyDown
	        },
	          this.props.children
	        )
	      )
	    );
	  }
	});


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var findTabbable = __webpack_require__(21);
	var modalElement = null;
	var focusLaterElement = null;
	var needToFocus = false;
	
	function handleBlur(event) {
	  needToFocus = true;
	}
	
	function handleFocus(event) {
	  if (needToFocus) {
	    needToFocus = false;
	    if (!modalElement) {
	      return;
	    }
	    // need to see how jQuery shims document.on('focusin') so we don't need the
	    // setTimeout, firefox doesn't support focusin, if it did, we could focus
	    // the the element outisde of a setTimeout. Side-effect of this
	    // implementation is that the document.body gets focus, and then we focus
	    // our element right after, seems fine.
	    setTimeout(function() {
	      if (modalElement.contains(document.activeElement))
	        return;
	      var el = (findTabbable(modalElement)[0] || modalElement);
	      el.focus();
	    }, 0);
	  }
	}
	
	exports.markForFocusLater = function() {
	  focusLaterElement = document.activeElement;
	};
	
	exports.returnFocus = function() {
	  try {
	    focusLaterElement.focus();
	  }
	  catch (e) {
	    console.warn('You tried to return focus to '+focusLaterElement+' but it is not in the DOM anymore');
	  }
	  focusLaterElement = null;
	};
	
	exports.setupScopedFocus = function(element) {
	  modalElement = element;
	
	  if (window.addEventListener) {
	    window.addEventListener('blur', handleBlur, false);
	    document.addEventListener('focus', handleFocus, true);
	  } else {
	    window.attachEvent('onBlur', handleBlur);
	    document.attachEvent('onFocus', handleFocus);
	  }
	};
	
	exports.teardownScopedFocus = function() {
	  modalElement = null;
	
	  if (window.addEventListener) {
	    window.removeEventListener('blur', handleBlur);
	    document.removeEventListener('focus', handleFocus);
	  } else {
	    window.detachEvent('onBlur', handleBlur);
	    document.detachEvent('onFocus', handleFocus);
	  }
	};
	
	


/***/ },
/* 21 */
/***/ function(module, exports) {

	/*!
	 * Adapted from jQuery UI core
	 *
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/category/ui-core/
	 */
	
	function focusable(element, isTabIndexNotNaN) {
	  var nodeName = element.nodeName.toLowerCase();
	  return (/input|select|textarea|button|object/.test(nodeName) ?
	    !element.disabled :
	    "a" === nodeName ?
	      element.href || isTabIndexNotNaN :
	      isTabIndexNotNaN) && visible(element);
	}
	
	function hidden(el) {
	  return (el.offsetWidth <= 0 && el.offsetHeight <= 0) ||
	    el.style.display === 'none';
	}
	
	function visible(element) {
	  while (element) {
	    if (element === document.body) break;
	    if (hidden(element)) return false;
	    element = element.parentNode;
	  }
	  return true;
	}
	
	function tabbable(element) {
	  var tabIndex = element.getAttribute('tabindex');
	  if (tabIndex === null) tabIndex = undefined;
	  var isTabIndexNaN = isNaN(tabIndex);
	  return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
	}
	
	function findTabbableDescendants(element) {
	  return [].slice.call(element.querySelectorAll('*'), 0).filter(function(el) {
	    return tabbable(el);
	  });
	}
	
	module.exports = findTabbableDescendants;
	


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var findTabbable = __webpack_require__(21);
	
	module.exports = function(node, event) {
	  var tabbable = findTabbable(node);
	  var finalTabbable = tabbable[event.shiftKey ? 0 : tabbable.length - 1];
	  var leavingFinalTabbable = (
	    finalTabbable === document.activeElement ||
	    // handle immediate shift+tab after opening with mouse
	    node === document.activeElement
	  );
	  if (!leavingFinalTabbable) return;
	  event.preventDefault();
	  var target = tabbable[event.shiftKey ? tabbable.length - 1 : 0];
	  target.focus();
	};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var baseAssign = __webpack_require__(24),
	    createAssigner = __webpack_require__(30),
	    keys = __webpack_require__(26);
	
	/**
	 * A specialized version of `_.assign` for customizing assigned values without
	 * support for argument juggling, multiple sources, and `this` binding `customizer`
	 * functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {Function} customizer The function to customize assigned values.
	 * @returns {Object} Returns `object`.
	 */
	function assignWith(object, source, customizer) {
	  var index = -1,
	      props = keys(source),
	      length = props.length;
	
	  while (++index < length) {
	    var key = props[index],
	        value = object[key],
	        result = customizer(value, source[key], key, object, source);
	
	    if ((result === result ? (result !== value) : (value === value)) ||
	        (value === undefined && !(key in object))) {
	      object[key] = result;
	    }
	  }
	  return object;
	}
	
	/**
	 * Assigns own enumerable properties of source object(s) to the destination
	 * object. Subsequent sources overwrite property assignments of previous sources.
	 * If `customizer` is provided it is invoked to produce the assigned values.
	 * The `customizer` is bound to `thisArg` and invoked with five arguments:
	 * (objectValue, sourceValue, key, object, source).
	 *
	 * **Note:** This method mutates `object` and is based on
	 * [`Object.assign`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign).
	 *
	 * @static
	 * @memberOf _
	 * @alias extend
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {*} [thisArg] The `this` binding of `customizer`.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
	 * // => { 'user': 'fred', 'age': 40 }
	 *
	 * // using a customizer callback
	 * var defaults = _.partialRight(_.assign, function(value, other) {
	 *   return _.isUndefined(value) ? other : value;
	 * });
	 *
	 * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
	 * // => { 'user': 'barney', 'age': 36 }
	 */
	var assign = createAssigner(function(object, source, customizer) {
	  return customizer
	    ? assignWith(object, source, customizer)
	    : baseAssign(object, source);
	});
	
	module.exports = assign;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var baseCopy = __webpack_require__(25),
	    keys = __webpack_require__(26);
	
	/**
	 * The base implementation of `_.assign` without support for argument juggling,
	 * multiple sources, and `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return source == null
	    ? object
	    : baseCopy(source, keys(source), object);
	}
	
	module.exports = baseAssign;


/***/ },
/* 25 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @returns {Object} Returns `object`.
	 */
	function baseCopy(source, props, object) {
	  object || (object = {});
	
	  var index = -1,
	      length = props.length;
	
	  while (++index < length) {
	    var key = props[index];
	    object[key] = source[key];
	  }
	  return object;
	}
	
	module.exports = baseCopy;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var getNative = __webpack_require__(27),
	    isArguments = __webpack_require__(28),
	    isArray = __webpack_require__(29);
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');
	
	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;
	
	  var allowIndexes = !!length && isLength(length) &&
	    (isArray(object) || isArguments(object));
	
	  var index = -1,
	      result = [];
	
	  while (++index < propsLength) {
	    var key = props[index];
	    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	var keys = !nativeKeys ? shimKeys : function(object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	      (typeof object != 'function' && isArrayLike(object))) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};
	
	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = (length && isLength(length) &&
	    (isArray(object) || isArguments(object)) && length) || 0;
	
	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;
	
	  while (++index < length) {
	    result[index] = (index + '');
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = keys;


/***/ },
/* 27 */
/***/ function(module, exports) {

	/**
	 * lodash 3.9.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]';
	
	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}
	
	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}
	
	module.exports = getNative;


/***/ },
/* 28 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	/**
	 * Checks if `value` is classified as an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  return isObjectLike(value) && isArrayLike(value) &&
	    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	}
	
	module.exports = isArguments;


/***/ },
/* 29 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/** `Object#toString` result references. */
	var arrayTag = '[object Array]',
	    funcTag = '[object Function]';
	
	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');
	
	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function(value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}
	
	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}
	
	module.exports = isArray;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.1.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var bindCallback = __webpack_require__(31),
	    isIterateeCall = __webpack_require__(32),
	    restParam = __webpack_require__(33);
	
	/**
	 * Creates a function that assigns properties of source object(s) to a given
	 * destination object.
	 *
	 * **Note:** This function is used to create `_.assign`, `_.defaults`, and `_.merge`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return restParam(function(object, sources) {
	    var index = -1,
	        length = object == null ? 0 : sources.length,
	        customizer = length > 2 ? sources[length - 2] : undefined,
	        guard = length > 2 ? sources[2] : undefined,
	        thisArg = length > 1 ? sources[length - 1] : undefined;
	
	    if (typeof customizer == 'function') {
	      customizer = bindCallback(customizer, thisArg, 5);
	      length -= 2;
	    } else {
	      customizer = typeof thisArg == 'function' ? thisArg : undefined;
	      length -= (customizer ? 1 : 0);
	    }
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, customizer);
	      }
	    }
	    return object;
	  });
	}
	
	module.exports = createAssigner;


/***/ },
/* 31 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/**
	 * A specialized version of `baseCallback` which only supports `this` binding
	 * and specifying the number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function bindCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  if (thisArg === undefined) {
	    return func;
	  }
	  switch (argCount) {
	    case 1: return function(value) {
	      return func.call(thisArg, value);
	    };
	    case 3: return function(value, index, collection) {
	      return func.call(thisArg, value, index, collection);
	    };
	    case 4: return function(accumulator, value, index, collection) {
	      return func.call(thisArg, accumulator, value, index, collection);
	    };
	    case 5: return function(value, other, key, object, source) {
	      return func.call(thisArg, value, other, key, object, source);
	    };
	  }
	  return function() {
	    return func.apply(thisArg, arguments);
	  };
	}
	
	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = bindCallback;


/***/ },
/* 32 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.9 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;
	
	/**
	 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}
	
	/**
	 * Checks if the provided arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	      ? (isArrayLike(object) && isIndex(index, object.length))
	      : (type == 'string' && index in object)) {
	    var other = object[index];
	    return value === value ? (value === other) : (other !== other);
	  }
	  return false;
	}
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	module.exports = isIterateeCall;


/***/ },
/* 33 */
/***/ function(module, exports) {

	/**
	 * lodash 3.6.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as an array.
	 *
	 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.restParam(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function restParam(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        rest = Array(length);
	
	    while (++index < length) {
	      rest[index] = args[start + index];
	    }
	    switch (start) {
	      case 0: return func.call(this, rest);
	      case 1: return func.call(this, args[0], rest);
	      case 2: return func.call(this, args[0], args[1], rest);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = rest;
	    return func.apply(this, otherArgs);
	  };
	}
	
	module.exports = restParam;


/***/ },
/* 34 */
/***/ function(module, exports) {

	var _element = document.body;
	
	function setElement(element) {
	  if (typeof element === 'string') {
	    var el = document.querySelectorAll(element);
	    element = 'length' in el ? el[0] : el;
	  }
	  _element = element || _element;
	}
	
	function hide(appElement) {
	  validateElement(appElement);
	  (appElement || _element).setAttribute('aria-hidden', 'true');
	}
	
	function show(appElement) {
	  validateElement(appElement);
	  (appElement || _element).removeAttribute('aria-hidden');
	}
	
	function toggle(shouldHide, appElement) {
	  if (shouldHide)
	    hide(appElement);
	  else
	    show(appElement);
	}
	
	function validateElement(appElement) {
	  if (!appElement && !_element)
	    throw new Error('react-modal: You must set an element with `Modal.setAppElement(el)` to make this accessible');
	}
	
	function resetForTesting() {
	  _element = document.body;
	}
	
	exports.toggle = toggle;
	exports.setElement = setElement;
	exports.show = show;
	exports.hide = hide;
	exports.resetForTesting = resetForTesting;
	


/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = function(opts) {
	  return new ElementClass(opts)
	}
	
	function indexOf(arr, prop) {
	  if (arr.indexOf) return arr.indexOf(prop)
	  for (var i = 0, len = arr.length; i < len; i++)
	    if (arr[i] === prop) return i
	  return -1
	}
	
	function ElementClass(opts) {
	  if (!(this instanceof ElementClass)) return new ElementClass(opts)
	  var self = this
	  if (!opts) opts = {}
	
	  // similar doing instanceof HTMLElement but works in IE8
	  if (opts.nodeType) opts = {el: opts}
	
	  this.opts = opts
	  this.el = opts.el || document.body
	  if (typeof this.el !== 'object') this.el = document.querySelector(this.el)
	}
	
	ElementClass.prototype.add = function(className) {
	  var el = this.el
	  if (!el) return
	  if (el.className === "") return el.className = className
	  var classes = el.className.split(' ')
	  if (indexOf(classes, className) > -1) return classes
	  classes.push(className)
	  el.className = classes.join(' ')
	  return classes
	}
	
	ElementClass.prototype.remove = function(className) {
	  var el = this.el
	  if (!el) return
	  if (el.className === "") return
	  var classes = el.className.split(' ')
	  var idx = indexOf(classes, className)
	  if (idx > -1) classes.splice(idx, 1)
	  el.className = classes.join(' ')
	  return classes
	}
	
	ElementClass.prototype.has = function(className) {
	  var el = this.el
	  if (!el) return
	  var classes = el.className.split(' ')
	  return indexOf(classes, className) > -1
	}
	
	ElementClass.prototype.toggle = function(className) {
	  var el = this.el
	  if (!el) return
	  if (this.has(className)) this.remove(className)
	  else this.add(className)
	}


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/*
	Copyright (c) 2015, salesforce.com, inc. All rights reserved.
	
	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
	Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
	Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
	
	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
	
	'use strict';
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _SVG = __webpack_require__(37);
	
	var _SVG2 = _interopRequireDefault(_SVG);
	
	module.exports = _react2['default'].createClass({
	  displayName: 'exports',
	
	  render: function render() {
	    return _react2['default'].createElement(_SVG2['default'], this.props);
	  }
	});

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/*
	Copyright (c) 2015, salesforce.com, inc. All rights reserved.
	
	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
	Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
	Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
	
	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
	
	'use strict';
	
	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _sldsIconsUtil = __webpack_require__(38);
	
	var _sldsIconsUtil2 = _interopRequireDefault(_sldsIconsUtil);
	
	module.exports = _react2['default'].createClass({
	  displayName: 'exports',
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      name: 'announcenent'
	    };
	  },
	
	  getPaths: function getPaths(data) {
	    if (data instanceof Array) {
	      return data.map(function (item) {
	        return _react2['default'].createElement('path', item);
	      });
	    }
	    return _react2['default'].createElement('path', data);
	  },
	
	  getSVG: function getSVG(name) {
	    var data = _sldsIconsUtil2['default'][name.toLowerCase()];
	    return _react2['default'].createElement('svg', _extends({}, this.props, { viewBox: _sldsIconsUtil2['default'].viewBox }), this.getPaths(data));
	  },
	
	  render: function render() {
	    return this.getSVG(this.props.name);
	  }
	});

/***/ },
/* 38 */
/***/ function(module, exports) {

	/*Copyright (c) 2015, salesforce.com, inc. All rights reserved.Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/
	"use strict";
	
	module.exports = {
	  add: { "d": "M13.8 13.4h7.7c.3 0 .7-.3.7-.7v-1.4c0-.4-.4-.7-.7-.7h-7.7c-.2 0-.4-.2-.4-.4V2.5c0-.3-.3-.7-.7-.7h-1.4c-.4 0-.7.4-.7.7v7.7c0 .2-.2.4-.4.4H2.5c-.3 0-.7.3-.7.7v1.4c0 .4.4.7.7.7h7.7c.2 0 .4.2.4.4v7.7c0 .3.3.7.7.7h1.4c.4 0 .7-.4.7-.7v-7.7c0-.2.2-.4.4-.4z" },
	  adduser: { "d": "M10.1 17.1c0-1.3.4-2.7 1.1-3.8.8-1.4 1.6-1.9 2.3-3 1.2-1.7 1.4-4.1.7-6-.8-1.9-2.5-3-4.6-2.9S6 2.7 5.3 4.6c-.7 2-.4 4.5 1.3 6.1.6.7 1.3 1.7.9 2.6-.3 1-1.4 1.4-2.2 1.7-1.8.8-4 1.9-4.3 4.1-.4 1.7.8 3.5 2.7 3.5h7.8c.4 0 .6-.4.4-.7-1.1-1.4-1.8-3.1-1.8-4.8zm7.4-5.6c-3.1 0-5.5 2.5-5.5 5.6s2.4 5.5 5.5 5.5 5.5-2.5 5.5-5.5-2.5-5.6-5.5-5.6zm2.8 6c0 .3-.2.5-.5.5h-1.3v1.4c0 .3-.3.4-.5.4h-1c-.2 0-.4-.1-.4-.4V18h-1.4c-.3 0-.4-.2-.4-.5v-.9c0-.3.1-.4.4-.4h1.4v-1.4c0-.3.2-.5.4-.5h1c.2 0 .5.2.5.5v1.4h1.3c.3 0 .5.1.5.4v.9z" },
	  announcement: { "d": "M10.5 21l-.6-.5c-.7-.5-.7-1.4-.7-1.9v-1.3c0-.4-.3-.7-.7-.7H5.8c-.4 0-.7.3-.7.7v3.6c0 1.2.7 2.2 1.9 2.2h2.2c1.4 0 1.5-.9 1.5-.9s.2-.9-.2-1.2zM20.8 8.3V2c0-1.1-1.4-1.4-2.2-.7l-4.1 3.9c-.6.5-1.4.8-2.3.8h-7C2.8 6 .9 8.1.9 10.5v.1c0 2.4 1.9 4.2 4.3 4.2h7c.9 0 1.7.3 2.4.9l4 4c.8.7 2.2.4 2.2-.7v-6.3c1.4 0 2.2-.9 2.2-2.2 0-1.2-.8-2.2-2.2-2.2z" },
	  apps: { "d": "M6 1.8H3.2c-.8 0-1.4.6-1.4 1.4V6c0 .8.6 1.4 1.4 1.4H6c.8 0 1.4-.6 1.4-1.4V3.2c0-.8-.6-1.4-1.4-1.4zm0 14.8H3.2c-.8 0-1.4.6-1.4 1.4v2.8c0 .8.6 1.4 1.4 1.4H6c.8 0 1.4-.6 1.4-1.4V18c0-.8-.6-1.4-1.4-1.4zm0-7.4H3.2c-.8 0-1.4.6-1.4 1.4v2.8c0 .8.6 1.4 1.4 1.4H6c.8 0 1.4-.6 1.4-1.4v-2.8c0-.8-.6-1.4-1.4-1.4zm7.4-7.4h-2.8c-.8 0-1.4.6-1.4 1.4V6c0 .8.6 1.4 1.4 1.4h2.8c.8 0 1.4-.6 1.4-1.4V3.2c0-.8-.6-1.4-1.4-1.4zm0 14.8h-2.8c-.8 0-1.4.6-1.4 1.4v2.8c0 .8.6 1.4 1.4 1.4h2.8c.8 0 1.4-.6 1.4-1.4V18c0-.8-.6-1.4-1.4-1.4zm0-7.4h-2.8c-.8 0-1.4.6-1.4 1.4v2.8c0 .8.6 1.4 1.4 1.4h2.8c.8 0 1.4-.6 1.4-1.4v-2.8c0-.8-.6-1.4-1.4-1.4zm7.4-7.4H18c-.8 0-1.4.6-1.4 1.4V6c0 .8.6 1.4 1.4 1.4h2.8c.8 0 1.4-.6 1.4-1.4V3.2c0-.8-.6-1.4-1.4-1.4zm0 14.8H18c-.8 0-1.4.6-1.4 1.4v2.8c0 .8.6 1.4 1.4 1.4h2.8c.8 0 1.4-.6 1.4-1.4V18c0-.8-.6-1.4-1.4-1.4zm0-7.4H18c-.8 0-1.4.6-1.4 1.4v2.8c0 .8.6 1.4 1.4 1.4h2.8c.8 0 1.4-.6 1.4-1.4v-2.8c0-.8-.6-1.4-1.4-1.4z" },
	  arrowdown: { "d": "M4.4 14.3c-.3.4-.3.9 0 1.3l7 6.7c.3.4.9.4 1.2 0l7-6.7c.4-.4.4-.9 0-1.3l-1.3-1.2c-.3-.4-.9-.4-1.3 0l-2.1 2.1c-.4.4-1.1.1-1.1-.4V2.3c0-.5-.4-.9-.9-.9h-1.8c-.5 0-.9.5-.9.9v12.5c0 .5-.7.8-1.1.4L7 13.1c-.4-.4-1-.4-1.3 0l-1.3 1.2z" },
	  arrowup: { "d": "M19.1 9.7c.4-.4.4-.9 0-1.3l-6.9-6.7c-.4-.4-.9-.4-1.3 0L4 8.4c-.4.4-.4.9 0 1.3l1.3 1.2c.3.4.9.4 1.3 0l2.1-2.1c.4-.4 1-.1 1 .4v12.5c0 .5.5.9 1 .9h1.8c.5 0 .9-.5.9-.9V9.2c0-.5.7-.8 1-.4l2.2 2.1c.4.4.9.4 1.3 0l1.2-1.2z" },
	  attach: { "d": "M8.1 16.9c.3.3.7.3 1 0l4.6-4.6c.3-.3.9-.3 1.3 0 .4.4.4 1 0 1.4l-5.7 5.6c-1.2 1.2-3.3 1.2-4.5 0l-.1-.1c-1.2-1.2-1.2-3.3 0-4.5l10-10c1.3-1.3 3.3-1.3 4.6 0 1.3 1.3 1.3 3.3 0 4.6-.2.3-.3.6-.1.9.3.5.5 1 .6 1.6.1.3.6.4.8.2l.7-.7c2.4-2.4 2.4-6.2 0-8.6h-.1C18.9.4 15 .4 12.7 2.7l-10 10c-2.4 2.3-2.4 6.2 0 8.5l.1.1c2.3 2.4 6.1 2.4 8.5 0l5.7-5.7c1.5-1.4 1.4-3.8-.1-5.3-1.5-1.4-3.9-1.3-5.3.1L7.1 15c-.3.2-.3.7 0 1l1 .9z" },
	  back: { "d": "M22.4 10.6H7.1c-.4 0-.6-.5-.3-.8l4.4-4.4c.3-.3.3-.7 0-1l-1-1c-.3-.3-.7-.3-1 0l-8 8.1c-.3.3-.3.7 0 1l8 8.1c.3.3.7.3 1 0l1-1c.2-.3.2-.7 0-1l-4.5-4.4c-.2-.3-.1-.8.4-.8h15.3c.4 0 .7-.3.7-.7v-1.3c0-.4-.3-.8-.7-.8z" },
	  ban: { "d": "M12 .9C5.9.9.9 5.9.9 12s5 11.1 11.1 11.1 11.1-5 11.1-11.1S18.1.9 12 .9zM3.7 12c0-4.6 3.7-8.3 8.3-8.3 1.8 0 3.5.5 4.8 1.5L5.2 16.8c-1-1.3-1.5-3-1.5-4.8zm8.3 8.3c-1.8 0-3.5-.5-4.8-1.5L18.8 7.2c1 1.3 1.5 3 1.5 4.8 0 4.6-3.7 8.3-8.3 8.3z" },
	  bold: { "d": "M18.9 8.8c0-2.8-2.2-5.1-4.8-5.1H6.5c-.5 0-1 .4-1 .9v15.2c0 .6.5 1 1 1h7.6c2.6 0 4.8-2.3 4.8-5.1 0-1.3-.5-2.5-1.3-3.5.8-.9 1.3-2.1 1.3-3.4zm-4.8 8.7H8.8v-3.7h5.3c.9 0 1.6.9 1.6 1.9s-.7 1.8-1.6 1.8zm0-6.9H8.8V6.9h5.3c.9 0 1.6.9 1.6 1.9s-.7 1.8-1.6 1.8z" },
	  bookmark: { "d": "M17.2 22.9l-4.6-4.6c-.2-.3-.6-.3-.9 0l-4.9 4.6c-.3.3-.8.1-.8-.3V2.8C6 1.8 6.8.9 7.8.9h8.4c1 0 1.8.9 1.8 1.9v19.8c0 .4-.5.6-.8.3z" },
	  brush: { "d": "M22.8 1.2c-1.6-1.6-10.3 3.4-15.7 12-.2.4-.1.9.3 1.1 1.2.6 2.2 1.6 2.7 2.8.2.5.7.6 1.1.3C19.5 12 24.4 2.9 22.8 1.2zm-17.3 15c-.7 0-1.3.4-1.8.9h-.1c-.2 0-.4.3-.6.7-.7 1.2-.9 2.7-2 4.3-.2.3-.1.7.2.8 1.6.5 4.4 0 5.8-1v.1c.4-.1.3-.3.4-.3.5-.9 1-1.4 1-2.3-.1-1.7-1.3-3.2-2.9-3.2z" },
	  bucket: { "d": "M22.6 5.1c0-2.9-4.5-4.2-8.8-4.2S5.1 2.2 5.1 5.1v.2C1.1 6.5.5 9 .5 10.4c0 1.4.7 2.8 1.9 3.9 1 .8 2.3 1.3 3.6 1.4h.4c3-.1 5.9-1.1 6.8-2.7-.5-.4-.7-.9-.7-1.5 0-1 .8-1.8 1.8-1.8s1.9.8 1.9 1.8c0 .8-.5 1.5-1.2 1.7-.9 2.6-4.6 4.3-9 4.3v2.8c0 1.5 3.5 2.8 7.8 2.8s7.9-1.3 7.9-2.8V7.1c.6-.6.9-1.2.9-2zm-8.8-1.4c3.1 0 5 .7 5.8 1.2.1.1.1.3 0 .4-.8.5-2.7 1.2-5.8 1.2s-4.9-.7-5.7-1.2c-.1-.1-.1-.3 0-.4.8-.5 2.7-1.2 5.7-1.2zM3.6 12.8c-.8-.6-1.3-1.5-1.3-2.4 0-2 1.9-3 3.6-3.4l.1.1v6.7c-.9 0-1.8-.4-2.4-1z" },
	  builder: { "d": "M5.3 7.8H1.6c-.4 0-.7.4-.7.7v11.8c0 1 .9 1.9 1.9 1.9h2.5c.4 0 .7-.4.7-.7v-13c0-.3-.3-.7-.7-.7zm17.1 0H8.5c-.3 0-.7.4-.7.7v13c0 .3.4.7.7.7h12.7c1 0 1.9-.9 1.9-1.9V8.5c0-.3-.3-.7-.7-.7zm-1.2-6H2.8c-1 0-1.9.9-1.9 1.9v1.6c0 .4.3.7.7.7h20.8c.4 0 .7-.3.7-.7V3.7c0-1-.9-1.9-1.9-1.9z" },
	  call: { "d": "M22.4 17.5l-2.8-2.3c-.7-.5-1.6-.5-2.2 0L15 16.9c-.3.3-.7.2-1-.1l-3.6-3.2L7.2 10c-.3-.3-.3-.6-.1-1l1.7-2.4c.5-.6.5-1.5 0-2.2L6.5 1.6C5.8.8 4.6.7 3.8 1.5L1.4 3.9c-.4.3-.6.9-.6 1.4.3 4.7 2.4 9.1 5.5 12.3s7.6 5.2 12.3 5.5c.6 0 1.1-.2 1.4-.6l2.4-2.4c.9-.7.9-2 0-2.6z" },
	  capslock: { "d": "M20.1 9.7l-7.5-8.5c-.3-.4-.9-.4-1.2 0L3.9 9.7c-.3.4-.1.9.4.9h3.5v5.8c0 .4.4.7.7.7h7c.3 0 .7-.3.7-.7v-5.8h3.5c.5 0 .7-.5.4-.9zm-4.6 10.1h-7c-.3 0-.7.4-.7.7v1.9c0 .4.4.7.7.7h7c.3 0 .7-.3.7-.7v-1.9c0-.3-.4-.7-.7-.7z" },
	  cases: { "d": "M4.2 1.6c0-.4-.4-.7-.7-.7H1.6c-.4 0-.7.3-.7.7v14.3c0 .4.3.7.7.7h1.9c.3 0 .7-.3.7-.7V1.6zm18.9 0c0-.4-.3-.7-.7-.7h-1.9c-.3 0-.7.3-.7.7v14.3c0 .4.4.7.7.7h1.9c.4 0 .7-.3.7-.7V1.6zM17.3.9h-1.4c-.3 0-.7.4-.7.8v5.7c0 .2.1.3.3.4.8.4 1.5.9 2.1 1.5.1.2.4.1.4-.1V1.7c0-.4-.3-.8-.7-.8zM11.1 7h1.8s.5-.2.5-.4V1.7c0-.4-.3-.8-.7-.8h-1.4c-.4 0-.7.4-.7.8v4.9c0 .2.2.5.5.4zM6.4 9.3c.6-.6 1.4-1.1 2.1-1.5.2-.1.3-.2.3-.4V1.7c0-.4-.4-.8-.7-.8H6.7c-.4 0-.7.4-.7.8v7.5c0 .2.2.3.4.1zm5.6-.5c-3.3 0-6 2.7-6 6 0 1 .3 2 .7 2.9L3.5 21c-.3.2-.3.6 0 .9l.9 1c.3.3.7.3 1 0l3.2-3.2c1 .7 2.2 1.1 3.4 1.1 3.3 0 6-2.7 6-6s-2.7-6-6-6zm0 9.2c-1.8 0-3.2-1.4-3.2-3.2s1.4-3.2 3.2-3.2 3.2 1.4 3.2 3.2S13.8 18 12 18z" },
	  center_align_text: { "d": "M22.2 3c0-.4-.4-.7-.7-.7h-19c-.3 0-.7.3-.7.7v1.4c0 .4.4.7.7.7h19c.3 0 .7-.3.7-.7V3zm-2.8 5.5c0-.3-.3-.7-.7-.7H5.3c-.4 0-.7.4-.7.7v1.4c0 .4.3.7.7.7h13.4c.4 0 .7-.3.7-.7V8.5zm-.9 11.1c0-.4-.4-.7-.7-.7H6.2c-.3 0-.7.3-.7.7V21c0 .4.4.7.7.7h11.6c.3 0 .7-.3.7-.7v-1.4zm3.7-5.5c0-.4-.4-.7-.7-.7h-19c-.3 0-.7.3-.7.7v1.4c0 .3.4.7.7.7h19c.3 0 .7-.4.7-.7v-1.4z" },
	  chart: { "d": "M21 10.8L11.5 16c-.6.3-1.3-.1-1.3-.8V3.9c0-.5-.5-.9-.9-.7-4.6 1.3-8 5.8-7.4 10.9.5 4.6 4.2 8.4 8.9 8.9 6.2.7 11.4-4.1 11.4-10.1 0-.5-.1-1.1-.2-1.6s-.6-.7-1-.5zm-8.2 2.1l9.1-4.8c.5-.3.7-1 .3-1.5-2-2.9-5.3-5-9-5.6-.6-.1-1.2.4-1.2 1v10.5c0 .4.4.6.8.4z" },
	  chat: { "d": "M12 1.8C5.9 1.8 1 6.4 1 12c0 1.7.5 3.4 1.3 4.8.1.3.2.6.1.8l-1.4 4c-.2.3.2.6.6.6l3.9-1.6c.3-.1.5 0 .8.1 1.7.9 3.7 1.5 5.8 1.5 6 0 11-4.5 11-10.2C23 6.4 18.1 1.8 12 1.8zm-5.5 12c-1.1 0-1.9-.8-1.9-1.8s.8-1.8 1.9-1.8 1.8.8 1.8 1.8-.8 1.8-1.8 1.8zm5.5 0c-1 0-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8 1.8.8 1.8 1.8-.8 1.8-1.8 1.8zm5.5 0c-1 0-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8 1.9.8 1.9 1.8-.8 1.8-1.9 1.8z" },
	  check: { "d": "M8.8 19.6L1.2 12c-.3-.3-.3-.8 0-1.1l1-1c.3-.3.8-.3 1 0L9 15.7c.1.2.5.2.6 0L20.9 4.4c.2-.3.7-.3 1 0l1 1c.3.3.3.7 0 1L9.8 19.6c-.2.3-.7.3-1 0z" },
	  checkin: { "d": "M12 .9C7.2.9 3.2 4.8 3.2 9.7c0 6.1 6.3 11.7 8.2 13.2.4.3.8.3 1.2 0 1.9-1.5 8.2-7.1 8.2-13.2 0-4.9-4-8.8-8.8-8.8zm0 12.5c-2 0-3.7-1.7-3.7-3.7S10 6 12 6s3.7 1.7 3.7 3.7-1.7 3.7-3.7 3.7z" },
	  chevrondown: { "d": "M22 8.2l-9.5 9.6c-.3.2-.7.2-1 0L2 8.2c-.2-.3-.2-.7 0-1l1-1c.3-.3.8-.3 1.1 0l7.4 7.5c.3.3.7.3 1 0l7.4-7.5c.3-.2.8-.2 1.1 0l1 1c.2.3.2.7 0 1z" },
	  chevronleft: { "d": "M15.8 22l-9.6-9.4c-.3-.3-.3-.8 0-1.1l9.6-9.4c.3-.3.7-.3 1 0l1 1c.3.3.3.7 0 1l-7.6 7.4c-.3.3-.3.8 0 1.1l7.5 7.4c.3.3.3.7 0 1l-1 1c-.2.2-.6.2-.9 0z" },
	  chevronright: { "d": "M8.3 2l9.5 9.5c.3.3.3.7 0 1L8.3 22c-.3.2-.8.2-1.1 0l-1-1c-.2-.3-.2-.8 0-1.1l7.6-7.4c.2-.3.2-.7 0-1L6.3 4.1C6 3.8 6 3.3 6.3 3l1-1c.3-.2.7-.2 1 0z" },
	  chevronup: { "d": "M2 15.8l9.5-9.6c.3-.2.7-.2 1 0l9.5 9.6c.2.3.2.7 0 1l-1 1c-.3.3-.8.3-1.1 0l-7.4-7.6c-.3-.2-.7-.2-1 0l-7.4 7.6c-.3.2-.8.2-1.1 0l-1-1c-.2-.3-.2-.7 0-1z" },
	  clear: { "d": "M12 .9C5.9.9.9 5.9.9 12s5 11.1 11.1 11.1 11.1-5 11.1-11.1S18.1.9 12 .9zm2.3 11.5l3.6 3.6c.1.2.1.4 0 .6l-1.3 1.3c-.2.2-.5.2-.7 0l-3.6-3.6c-.2-.2-.4-.2-.6 0l-3.6 3.6c-.2.2-.5.2-.7 0l-1.3-1.3c-.1-.2-.1-.4 0-.6l3.6-3.6c.2-.2.2-.5 0-.7L6.1 8.1c-.2-.2-.2-.5 0-.7l1.3-1.3c.2-.1.4-.1.6 0l3.7 3.7c.2.2.4.2.6 0l3.6-3.6c.2-.2.5-.2.7 0l1.3 1.3c.1.2.1.4 0 .6l-3.6 3.6c-.2.2-.2.5 0 .7z" },
	  clock: { "d": "M12 .9C5.9.9.9 5.9.9 12s5 11.1 11.1 11.1 11.1-5 11.1-11.1S18.1.9 12 .9zm0 19.4c-4.6 0-8.3-3.7-8.3-8.3S7.4 3.7 12 3.7s8.3 3.7 8.3 8.3-3.7 8.3-8.3 8.3zm1.6-8.2c-.2-.1-.2-.3-.2-.5V7.2c0-.4-.3-.7-.7-.7h-1.4c-.4 0-.7.3-.7.7v5.5c0 .2.1.4.2.5l3.4 3.5c.3.2.7.2 1 0l1-1c.2-.3.2-.7 0-1l-2.6-2.6z" },
	  close: { "d": "M14.3 11.7l6-6c.3-.3.3-.7 0-1l-.9-1c-.3-.2-.7-.2-1 0l-6 6.1c-.2.2-.5.2-.7 0l-6-6.1c-.3-.3-.7-.3-1 0l-1 1c-.2.2-.2.7 0 .9l6.1 6.1c.2.2.2.4 0 .6l-6.1 6.1c-.3.3-.3.7 0 1l1 1c.2.2.7.2.9 0l6.1-6.1c.2-.2.4-.2.6 0l6.1 6.1c.2.2.7.2.9 0l1-1c.3-.3.3-.7 0-1l-6-6c-.2-.2-.2-.5 0-.7z" },
	  comments: { "d": "M22.1 14.3c-.1-.2-.1-.4 0-.5.6-1.1 1-2.3 1-3.6 0-4.1-3.5-7.4-7.9-7.4-2 0-3.8.8-5.2 2 4.7.5 8.5 4.4 8.5 9.1 0 1.1-.3 2.3-.7 3.3.5-.2 1-.4 1.5-.7.2-.1.4-.1.5 0l2.9 1.1c.2.1.5-.2.4-.4l-1-2.9zM8.8 6.5C4.4 6.5.9 9.8.9 13.9c0 1.3.4 2.5 1 3.5.1.2.1.4 0 .6l-1 2.8c-.1.3.2.5.4.4l2.9-1.1c.1 0 .3 0 .5.1 1.2.7 2.6 1 4.1 1 4.3 0 7.8-3.3 7.8-7.4 0-4-3.5-7.3-7.8-7.3z" },
	  company: { "d": "M9.7 1.8H3.2c-.8 0-1.4.6-1.4 1.4v18.5c0 .2.3.5.5.5h1.9c.2 0 .4-.2.4-.5v-2.8c0-.3.2-.4.5-.4h2.7c.3 0 .5.1.5.4v2.8c0 .3.2.5.5.5h1.4c.5 0 .9-.5.9-1v-18c0-.8-.6-1.4-1.4-1.4zM5.5 16.4c0 .1-.1.2-.2.2H3.9c-.1 0-.2-.1-.2-.2v-2.3c0-.2.1-.3.2-.3h1.4c.1 0 .2.1.2.3v2.3zm0-4.6c0 .1-.1.2-.2.2H3.9c-.1 0-.2-.1-.2-.2V9.5c0-.2.1-.3.2-.3h1.4c.1 0 .2.1.2.3v2.3zm0-4.6c0 .1-.1.2-.2.2H3.9c-.1 0-.2-.1-.2-.2V4.8c0-.1.1-.2.2-.2h1.4c.1 0 .2.1.2.2v2.4zm3.7 9.2c0 .1-.1.2-.2.2H7.6c-.1 0-.2-.1-.2-.2v-2.3c0-.2.1-.3.2-.3H9c.1 0 .2.1.2.3v2.3zm0-4.6c0 .1-.1.2-.2.2H7.6c-.1 0-.2-.1-.2-.2V9.5c0-.2.1-.3.2-.3H9c.1 0 .2.1.2.3v2.3zm0-4.6c0 .1-.1.2-.2.2H7.6c-.1 0-.2-.1-.2-.2V4.8c0-.1.1-.2.2-.2H9c.1 0 .2.1.2.2v2.4zm11.6-.7h-6.5c-.8 0-1.4.6-1.4 1.3v13.9c0 .2.3.5.5.5h1.8c.3 0 .5-.2.5-.5v-2.8c0-.3.2-.4.5-.4h2.7c.3 0 .5.1.5.4v2.8c0 .3.2.5.4.5h1.4c.5 0 1-.5 1-1V7.8c0-.7-.6-1.3-1.4-1.3zm-4.2 9.9c0 .1-.1.2-.2.2H15c-.1 0-.2-.1-.2-.2v-2.3c0-.2.1-.3.2-.3h1.4c.1 0 .2.1.2.3v2.3zm0-4.6c0 .1-.1.2-.2.2H15c-.1 0-.2-.1-.2-.2V9.5c0-.2.1-.3.2-.3h1.4c.1 0 .2.1.2.3v2.3zm3.7 4.6c0 .1-.1.2-.2.2h-1.4c-.1 0-.2-.1-.2-.2v-2.3c0-.2.1-.3.2-.3h1.4c.1 0 .2.1.2.3v2.3zm0-4.6c0 .1-.1.2-.2.2h-1.4c-.1 0-.2-.1-.2-.2V9.5c0-.2.1-.3.2-.3h1.4c.1 0 .2.1.2.3v2.3z" },
	  connected_apps: { "d": "M11 14.4l-1.8 8.1c-.1.5.5.8.8.4l9.7-12c.3-.3.1-.7-.3-.7h-5.2c-.4 0-.6-.5-.4-.7L18.4 2c.2-.5-.1-1.1-.6-1.1H9.6c-.5 0-.9.3-1.1.8L4.7 12.9c-.2.5.1.9.6.9h5.3c.2 0 .5.3.4.6z" },
	  contract: { "d": "M13.7 11.1h7.1c.4 0 .6-.5.2-.9l-2.3-2.3 4.2-4.2c.2-.2.2-.7 0-.9l-1.7-1.7c-.2-.2-.6-.2-.9.1l-4.1 4.1L13.8 3c-.4-.3-.9-.2-.9.3v7.1c0 .3.4.7.8.7zm-3.4 1.8H3.2c-.4 0-.6.5-.2.9l2.3 2.3-4.2 4.2c-.2.2-.2.7 0 .9l1.7 1.7c.2.2.6.2.9 0l4.2-4.2 2.3 2.3c.4.4.9.2.9-.2v-7.1c0-.3-.4-.8-.8-.8zm2.6.8v7.1c0 .4.5.6.9.2l2.3-2.3 4.2 4.2c.2.2.7.2.9 0l1.7-1.7c.2-.2.2-.6-.1-.9l-4.1-4.1 2.3-2.4c.3-.4.2-.9-.3-.9h-7.1c-.3 0-.7.4-.7.8zm-1.8-3.4V3.2c0-.4-.5-.6-.9-.2L7.9 5.3 3.7 1.1c-.2-.2-.7-.2-.9 0L1.1 2.8c-.2.2-.2.6 0 .9l4.2 4.2L3 10.2c-.4.4-.2.9.2.9h7.1c.3 0 .8-.4.8-.8z" },
	  contract_alt: { "d": "M13.7 11h7.1c.4 0 .6-.5.2-.8l-2.3-2.4 4.2-4.2c.2-.2.2-.6 0-.8l-1.7-1.7c-.2-.2-.6-.2-.9 0l-4.1 4.2L13.8 3c-.4-.4-.9-.2-.9.2v7.1c0 .4.4.7.8.7zm-3.4 1.9H3.2c-.4 0-.6.5-.2.9l2.3 2.3-4.2 4.2c-.2.2-.2.7 0 .9l1.7 1.7c.2.2.6.2.9 0l4.2-4.2 2.3 2.3c.4.4.9.2.9-.2v-7.1c0-.3-.4-.8-.8-.8z" },
	  copy: { "d": "M20.3.9h-12c-1 0-1.8.9-1.8 1.9v.9h11c1.1 0 1.9.8 1.9 1.8v13h.9c1 0 1.9-.9 1.9-1.9V2.8c0-1-.9-1.9-1.9-1.9zm-2.8 6.5c0-1-.8-1.9-1.8-1.9h-12c-1 0-1.9.9-1.9 1.9v13.8c0 1 .9 1.9 1.9 1.9h12c1 0 1.8-.9 1.8-1.9V7.4zm-8.3 3.2c0 .3-.2.5-.4.5H5.1c-.3 0-.5-.2-.5-.5v-.9c0-.3.2-.5.5-.5h3.7c.2 0 .4.2.4.5v.9zm3.7 7.4c0 .3-.2.5-.4.5H5.1c-.3 0-.5-.2-.5-.5v-.9c0-.3.2-.5.5-.5h7.4c.2 0 .4.2.4.5v.9zm1.9-3.7c0 .3-.2.5-.5.5H5.1c-.3 0-.5-.2-.5-.5v-.9c0-.3.2-.5.5-.5h9.2c.3 0 .5.2.5.5v.9z" },
	  crossfilter: { "d": "M16.2 4.2c-.8 0-1.6 0-2.3.3.9.7 1.6 1.5 2.2 2.4h.1c2.8 0 5 2.3 5 5.1s-2.2 5.1-5 5.1c-.7 0-1.4-.2-2-.4.3-.5.7-1.1.9-1.7.1-.2.2-.4.2-.6.3-.7.4-1.6.4-2.4 0-4.3-3.5-7.8-7.9-7.8S0 7.7 0 12s3.5 7.8 7.8 7.8c.8 0 1.6 0 2.3-.3-.9-.7-1.6-1.5-2.2-2.4h-.1c-2.8 0-5-2.3-5-5.1s2.2-5.1 5-5.1c.7 0 1.4.2 2.1.4-1 1.3-1.6 2.9-1.6 4.7 0 4.3 3.5 7.8 7.9 7.8S24 16.3 24 12s-3.5-7.8-7.8-7.8z" },
	  custom_apps: { "d": "M22.8 5.6c-.1-.2-.4-.3-.6-.1l-3.8 3.7c-.3.3-.7.3-1 0l-2.6-2.6c-.3-.3-.3-.7 0-1l3.8-3.8c.1-.1 0-.5-.2-.6-.6-.2-1.3-.3-2-.3-3.9 0-7 3.4-6.6 7.4.1.7.3 1.2.5 1.8l-8.6 8.5c-1.1 1.1-1.1 2.7 0 3.7.5.5 1.2.8 1.8.8s1.3-.3 1.9-.8l8.5-8.6c.6.2 1.2.4 1.8.5 4 .4 7.4-2.7 7.4-6.6 0-.7-.1-1.4-.3-2z" },
	  cut: { "d": "M18.8 14.5c-.8-.2-1.5-.1-2.2.1L6.4 1.1C6.3.9 6 .9 5.8 1l-.4.3c-.8.6-.9 1.7-.3 2.6l4.9 6.4c.2.3.2.6 0 .9l-2.7 3.4c-.6-.2-1.4-.2-2.1-.1-1.7.4-3.1 1.7-3.3 3.5-.4 2.7 2 5 4.8 4.6 1.7-.3 3-1.6 3.4-3.2.2-1.2 0-2.2-.5-3l1.9-2.6c.3-.4.8-.4 1.1 0l1.9 2.6c-.5.9-.7 1.9-.5 3 .3 1.6 1.7 2.9 3.4 3.2 2.8.4 5.2-1.9 4.8-4.6-.4-1.8-1.8-3.2-3.4-3.5zM6 19.9c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.3.6 1.3 1.4-.6 1.4-1.3 1.4zm12 0c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.3.6 1.3 1.4c0 .8-.6 1.4-1.3 1.4zM14.4 8.7c.2.3.6.3.8 0l3.7-4.8c.5-.7.4-1.6-.1-2.3h.1-.1c-.1-.1-.7-.6-.7-.6-.1-.1-.5-.1-.6.1l-4.1 5.4c-.2.2-.2.6 0 .8l1 1.4z" },
	  dash: { "d": "M23.1 12.7c0 .4-.3.7-.7.7H1.6c-.4 0-.7-.3-.7-.7v-1.4c0-.4.3-.7.7-.7h20.8c.4 0 .7.3.7.7v1.4z" },
	  dayview: { "d": "M20.3 3.2H18v-.9c0-.7-.6-1.4-1.4-1.4-.7 0-1.4.6-1.4 1.4v.9H8.8v-.9c0-.7-.6-1.4-1.4-1.4C6.6.9 6 1.5 6 2.3v.9H3.7c-1 0-1.9.9-1.9 1.9v1.1c0 .4.4.7.7.7h19c.3 0 .7-.3.7-.7V5.1c0-1-.9-1.9-1.9-1.9zm1.2 6h-19c-.3 0-.7.4-.7.7v11.3c0 1 .9 1.9 1.9 1.9h16.6c1 0 1.9-.9 1.9-1.9V9.9c0-.3-.4-.7-.7-.7zm-8.1 10.2v.1c0 .3-.5.8-.9.8s-1-.5-1-.9v-4.6l-.7.7c-.1.1-.2.2-.4.2-.4 0-.7-.3-.7-.7 0-.2.1-.4.2-.5l1.8-1.8c.2-.2.4-.3.7-.3.5 0 1 .4 1 .9v6.1z" },
	  "delete": { "d": "M21 4.6h-5.8V2.8c0-1-.8-1.9-1.8-1.9h-2.8c-1 0-1.8.9-1.8 1.9v1.8H3c-.4 0-.7.3-.7.7v1.4c0 .4.3.7.7.7h18c.4 0 .7-.3.7-.7V5.3c0-.4-.3-.7-.7-.7zM10.6 3.2c0-.2.2-.4.5-.4h1.8c.3 0 .5.2.5.4v1.4h-2.8V3.2zm8.6 6H4.8c-.3 0-.6.4-.6.7v10.9c0 1.3 1 2.3 2.3 2.3h11c1.3 0 2.3-1 2.3-2.3V9.9c0-.3-.3-.7-.6-.7zm-8.6 10.2c0 .3-.2.4-.4.4h-1c-.2 0-.4-.1-.4-.4v-6.5c0-.3.2-.4.4-.4h1c.2 0 .4.1.4.4v6.5zm4.6 0c0 .3-.2.4-.4.4h-1c-.2 0-.4-.1-.4-.4v-6.5c0-.3.2-.4.4-.4h1c.2 0 .4.1.4.4v6.5z" },
	  deprecate: { "d": "M22.2 3.2H1.8c-.5 0-.9.4-.9 1v12c0 .5.4.9.9.9h7.5c.5 2.6 2.7 4.6 5.5 4.6s5-2 5.4-4.6h2c.5 0 .9-.4.9-.9v-12c0-.6-.4-1-.9-1zm-4 15.1l-1.3 1.3-2.1-2.2-2.2 2.2-1.2-1.3 2.1-2.1-2.1-2.2 1.2-1.3 2.2 2.2 2.1-2.2 1.3 1.3-2.1 2.2 2.1 2.1zm3-3.1h-1c-.4-2.6-2.7-4.6-5.4-4.6s-5.1 2-5.5 4.6H2.8V5.1h18.4v10.1z" },
	  desktop: { "d": "M23.1 2.8c0-1-.9-1.9-1.9-1.9H2.8C1.8.9.9 1.8.9 2.8v12c0 1 .9 1.8 1.9 1.8h18.4c1 0 1.9-.8 1.9-1.8v-12zm-2.8 10.4c0 .3-.3.6-.7.6H4.4c-.4 0-.7-.3-.7-.6V4.4c0-.4.3-.7.7-.7h15.2c.4 0 .7.3.7.7v8.8zm-5.1 7.1h-1.4c-.2 0-.4-.2-.4-.5v-.9c0-.3-.2-.4-.5-.4h-1.8c-.3 0-.5.1-.5.4v.9c0 .3-.2.5-.4.5H8.8c-1 0-1.9.8-1.9 1.9v.2c0 .4.3.7.7.7h8.8c.4 0 .7-.3.7-.7v-.2c0-1.1-.9-1.9-1.9-1.9z" },
	  down: { "d": "M3.8 6.5h16.4c.4 0 .8.6.4 1l-8 9.8c-.3.3-.9.3-1.2 0l-8-9.8c-.4-.4-.1-1 .4-1z" },
	  download: { "d": "M22.4 14.3H21c-.4 0-.7.3-.7.7v4.6c0 .4-.3.7-.7.7H4.4c-.4 0-.7-.3-.7-.7V15c0-.4-.3-.7-.7-.7H1.6c-.4 0-.7.3-.7.7v6.2c0 1 .9 1.9 1.9 1.9h18.4c1 0 1.9-.9 1.9-1.9V15c0-.4-.3-.7-.7-.7zm-10.9 3.1c.3.2.7.2 1 0l6.2-6.3c.3-.3.3-.7 0-.9l-.9-1c-.3-.3-.7-.3-1 0l-2.6 2.6c-.3.2-.8.1-.8-.4V1.6c0-.4-.4-.7-.7-.7h-1.4c-.4 0-.7.3-.7.7v9.8c0 .4-.5.6-.8.3L7.2 9.1c-.2-.2-.6-.2-.9 0l-1 1.1c-.3.2-.3.6 0 .9l6.2 6.3z" },
	  edit: { "d": "M4.4 15.4l4.1 4.1c.2.2.5.2.6 0L19.4 9.2c.2-.2.2-.4 0-.6l-4.1-4.1c-.2-.2-.4-.2-.6 0L4.4 14.8c-.2.2-.2.5 0 .6zM16.7 2.6c-.2.2-.2.5 0 .7l4 4c.2.2.5.2.7 0l1.1-1.1c.8-.7.8-1.8 0-2.6l-2.1-2.1c-.8-.8-1.9-.8-2.7 0l-1 1.1zM1 22.2c-.1.5.3.9.8.8l5-1.2c.2 0 .3-.1.4-.2l.1-.1c.1-.1.1-.4-.1-.6l-4.1-4.1c-.2-.2-.5-.2-.6-.1l-.1.1c-.1.1-.2.3-.2.4l-1.2 5z" },
	  email: { "d": "M11.5 13.9c.3.3.7.3 1 0l10.4-9.7c.2-.4.1-1-.6-1l-20.6.1c-.6 0-1.1.5-.6.9l10.4 9.7zM23.1 8c0-.5-.6-.8-.9-.4L14 15.1c-.6.5-1.3.8-2 .8s-1.4-.3-2-.8L1.9 7.6c-.4-.4-.9-.1-.9.4C.9 7.8.9 18.5.9 18.5c0 1 .9 1.8 1.9 1.8h18.4c1 0 1.9-.8 1.9-1.8V8z" },
	  end_call: { "d": "M22.4 2.6l-1-1c-.3-.3-.8-.2-1.1.2L9.5 12.6 7.2 10c-.3-.3-.3-.6-.1-1l1.7-2.4c.5-.6.5-1.5 0-2.2L6.5 1.6C5.8.8 4.6.7 3.8 1.5L1.4 3.9c-.4.3-.6.9-.6 1.4.3 4.2 2 8.3 4.6 11.3l-3.6 3.7c-.4.3-.4.8-.2 1.1l1 1c.3.3.8.2 1.1-.2L22.2 3.7c.4-.3.5-.8.2-1.1zm0 14.9l-2.8-2.3c-.7-.5-1.6-.5-2.2 0L15 16.9c-.3.3-.7.2-1-.1l-1.1-1-3.9 4c2.8 1.8 6.1 3.1 9.6 3.3.6 0 1.1-.2 1.4-.6l2.4-2.4c.9-.7.9-2 0-2.6z" },
	  erect_window: { "d": "M23.1 3c0 .4-.3.7-.7.7H1.6c-.4 0-.7-.3-.7-.7V1.6c0-.4.3-.7.7-.7h20.8c.4 0 .7.3.7.7V3z" },
	  error: { "d": "M12 .9C5.9.9.9 5.9.9 12s5 11.1 11.1 11.1 11.1-5 11.1-11.1S18.1.9 12 .9zm0 19.4c-4.6 0-8.3-3.7-8.3-8.3S7.4 3.7 12 3.7s8.3 3.7 8.3 8.3-3.7 8.3-8.3 8.3zm4.8-9.7H7.2c-.4 0-.6.3-.7.6v1.6c.1.4.3.6.7.6h9.6c.4 0 .6-.3.7-.6v-1.6c-.1-.3-.3-.6-.7-.6z" },
	  event: { "d": "M21.5 9.2h-19c-.3 0-.7.4-.7.7v11.3c0 1 .9 1.9 1.9 1.9h16.6c1 0 1.9-.9 1.9-1.9V9.9c0-.3-.4-.7-.7-.7zM8.8 19.4c0 .3-.2.4-.5.4H6.5c-.3 0-.5-.1-.5-.4v-1.9c0-.2.2-.4.5-.4h1.8c.3 0 .5.2.5.4v1.9zm0-4.6c0 .2-.2.4-.5.4H6.5c-.3 0-.5-.2-.5-.4v-1.9c0-.3.2-.4.5-.4h1.8c.3 0 .5.1.5.4v1.9zm4.6 4.6c0 .3-.2.4-.5.4h-1.8c-.3 0-.5-.1-.5-.4v-1.9c0-.2.2-.4.5-.4h1.8c.3 0 .5.2.5.4v1.9zm0-4.6c0 .2-.2.4-.5.4h-1.8c-.3 0-.5-.2-.5-.4v-1.9c0-.3.2-.4.5-.4h1.8c.3 0 .5.1.5.4v1.9zm4.6 4.6c0 .3-.2.4-.5.4h-1.8c-.3 0-.5-.1-.5-.4v-1.9c0-.2.2-.4.5-.4h1.8c.3 0 .5.2.5.4v1.9zm0-4.6c0 .2-.2.4-.5.4h-1.8c-.3 0-.5-.2-.5-.4v-1.9c0-.3.2-.4.5-.4h1.8c.3 0 .5.1.5.4v1.9zm2.3-11.6H18v-.9c0-.7-.6-1.4-1.4-1.4-.7 0-1.4.6-1.4 1.4v.9H8.8v-.9c0-.7-.6-1.4-1.4-1.4C6.6.9 6 1.5 6 2.3v.9H3.7c-1 0-1.9.9-1.9 1.9v1.1c0 .4.4.7.7.7h19c.3 0 .7-.3.7-.7V5.1c0-1-.9-1.9-1.9-1.9z" },
	  expand: { "d": "M22.5.9h-7.1c-.5 0-.6.4-.3.8L17.4 4l-4.2 4.1c-.2.3-.2.6 0 .9l1.8 1.7c.2.2.6.2.8 0L20 6.5l2.3 2.3c.4.3.8.2.8-.3V1.4c0-.2-.3-.5-.6-.5zM1.6 23.1h7.1c.5 0 .6-.5.3-.9l-2.3-2.3 4.1-4.2c.3-.2.3-.7 0-.9l-1.7-1.7c-.2-.2-.6-.2-.8 0l-4.2 4.2L1.8 15c-.4-.4-.9-.2-.9.2v7.1c0 .4.4.8.7.8zm21.5-.6v-7.1c0-.5-.4-.6-.8-.3L20 17.4l-4.1-4.2c-.3-.2-.6-.2-.9 0L13.3 15c-.2.2-.2.6 0 .8l4.2 4.2-2.3 2.3c-.3.4-.2.8.3.8h7.1c.2 0 .5-.3.5-.6zM.9 1.6v7.1c0 .5.5.6.9.3l2.3-2.3 4.2 4.1c.2.3.7.3.9 0l1.7-1.7c.2-.2.2-.6 0-.8L6.7 4.1 9 1.8c.4-.4.2-.9-.2-.9H1.7c-.4 0-.8.4-.8.7z" },
	  expand_alt: { "d": "M22.5.9h-7.1c-.5 0-.6.4-.3.8L17.4 4l-4.2 4.1c-.2.3-.2.6 0 .9l1.8 1.7c.2.2.6.2.8 0L20 6.5l2.3 2.3c.4.3.8.2.8-.3V1.4c0-.2-.3-.5-.6-.5zM1.6 23.1h7.1c.5 0 .6-.5.3-.9l-2.3-2.3 4.1-4.2c.3-.2.3-.7 0-.9l-1.7-1.7c-.2-.2-.6-.2-.8 0l-4.2 4.2L1.8 15c-.4-.4-.9-.2-.9.2v7.1c0 .4.4.8.7.8z" },
	  favorite: { "d": "M12.6 1.9l2.2 6.5c.1.2.3.4.6.4h6.9c.7 0 1 .9.5 1.3l-5.7 4.2c-.2.1-.3.5-.2.7l2.2 6.7c.2.6-.5 1.2-1.1.8l-5.5-4.1c-.3-.2-.6-.2-.9 0L6 22.5c-.6.4-1.3-.2-1.1-.8L7.1 15c.1-.2 0-.6-.3-.7l-5.6-4.2c-.6-.4-.2-1.3.4-1.3h6.9c.4 0 .6-.1.7-.4l2.2-6.6c.1-.6 1.1-.6 1.2.1z" },
	  filter: { "d": "M11.3 14.7c-.3-.3-.7-.3-1 0l-1.7 1.6c-.2.3-.8.1-.8-.3V9.9c0-.3-.3-.7-.6-.7H5.8c-.4 0-.7.4-.7.7V16c0 .4-.5.6-.8.3l-1.7-1.6c-.2-.3-.7-.3-.9 0l-1.1 1c-.2.3-.2.7 0 1L6 22c.2.2.6.2.9 0l5.4-5.4c.3-.3.3-.7 0-1l-1-.9zM23.5 4.4c0-.4-.3-.7-.7-.7h-17c-.4 0-.7.3-.7.7v1.4c0 .3.3.7.7.7h17c.4 0 .7-.4.7-.7V4.4zm0 5.5c0-.3-.3-.7-.7-.7H10.4c-.4 0-.7.4-.7.7v1.4c0 .4.3.7.7.7h12.4c.4 0 .7-.3.7-.7V9.9zm0 5.6c0-.4-.3-.7-.7-.7H15c-.4 0-.7.3-.7.7v1.3c0 .4.3.7.7.7h7.8c.4 0 .7-.3.7-.7v-1.3z" },
	  filterList: { "d": "M22.3 1.8H1.8c-.7 0-1 .8-.6 1.3l9 10.5c.2.3.4.8.4 1.2v6.7c0 .3.3.7.7.7h1.4c.4 0 .6-.4.6-.7v-6.7c0-.4.2-.9.5-1.2l9.1-10.5c.4-.5.1-1.3-.6-1.3z" },
	  forward: { "d": "M1.6 13.4h15.3c.4 0 .6.5.3.8l-4.4 4.4c-.3.3-.3.7 0 1l1 1c.3.3.7.3 1 0l8-8.1c.3-.3.3-.7 0-1l-8-8.1c-.3-.3-.7-.3-1 0l-1 1c-.2.3-.2.7 0 1l4.5 4.4c.2.3.1.8-.4.8H1.6c-.4 0-.7.3-.7.7v1.3c0 .4.3.8.7.8z" },
	  frozen: { "d": "M22.4 10.6h-3.3l2-2c.2-.2.2-.6 0-.8l-.8-.7c-.2-.3-.5-.3-.7 0L16 10.6h-2.6V8l3.5-3.6c.3-.2.3-.5 0-.7l-.7-.8c-.3-.2-.6-.2-.8 0l-2 2V1.6c0-.4-.3-.7-.7-.7h-1.4c-.4 0-.7.3-.7.7v3.3l-2-2c-.2-.2-.6-.2-.8 0l-.7.8c-.3.2-.3.5 0 .7L10.6 8v2.6H8L4.4 7.1c-.2-.3-.5-.3-.7 0l-.8.7c-.2.3-.2.6 0 .8l2 2H1.6c-.4 0-.7.3-.7.7v1.4c0 .4.3.7.7.7h3.3l-2 2c-.2.2-.2.6 0 .8l.7.7c.3.2.6.2.8 0l3.5-3.6h2.7v2.6l-3.5 3.6c-.3.2-.3.5 0 .7l.7.8c.2.2.6.2.8 0l2-2.1v3.3c0 .4.3.8.7.8h1.3c.4 0 .8-.4.8-.8v-3.3l2 2.1c.2.2.6.2.8 0l.7-.8c.2-.2.2-.5 0-.7L13.4 16v-2.6H16l3.6 3.5c.2.3.5.3.7 0l.7-.7c.3-.2.3-.6 0-.7l-1.9-2.1h3.3c.4 0 .7-.3.7-.7v-1.4c0-.4-.3-.7-.7-.7z" },
	  groups: { "d": "M7.3 12.9c-.6-.9-.9-2.1-.9-3.3 0-2.1.8-3.9 2.2-4.9-.4-.9-1.4-1.5-2.6-1.5-2 0-3.1 1.7-3.1 3.6 0 1 .3 1.9 1 2.5.3.3.7.8.7 1.3s-.2.9-1.4 1.4c-1.6.7-3.2 1.8-3.2 3.3 0 1 .7 1.8 1.7 1.8h1.5c.2 0 .4-.2.6-.4.7-1.3 2.1-2.2 3.3-2.8.4-.1.5-.7.2-1zm13.5-.9c-1.1-.5-1.3-.9-1.3-1.4s.3-1 .7-1.3c.7-.7 1-1.5 1-2.5 0-1.9-1.1-3.6-3.2-3.6-1.2 0-2.1.6-2.6 1.5 1.4 1 2.2 2.8 2.2 4.9 0 1.2-.3 2.4-.9 3.3-.3.4-.1.9.2 1 1.2.6 2.6 1.5 3.3 2.8.2.2.4.4.6.4h1.5c1 0 1.7-.8 1.7-1.8 0-1.5-1.5-2.6-3.2-3.3zm-5.7 3.4c-1.3-.6-1.5-1.1-1.5-1.6 0-.6.4-1.1.8-1.4.7-.7 1.2-1.7 1.2-2.8 0-2.1-1.3-3.9-3.6-3.9S8.5 7.5 8.5 9.6c0 1.1.5 2.1 1.2 2.8.4.4.8.9.8 1.4 0 .6-.2 1-1.5 1.6-1.8.8-3.6 1.6-3.6 3.3 0 1.1.8 2 1.8 2h9.6c1.1 0 1.9-.9 1.9-2 0-1.6-1.8-2.5-3.6-3.3z" },
	  help: { "d": "M13.1 17.5h-2.3c-.4 0-.6-.2-.6-.6v-.7c0-1.9 1.2-3.7 3-4.3.6-.2 1.1-.5 1.5-1 2.3-2.8.2-6.1-2.6-6.2-1 0-1.9.3-2.7 1-.6.6-1 1.3-1 2.1-.1.2-.4.5-.7.5H5.4c-.5 0-.8-.4-.7-.8.1-1.7.9-3.3 2.2-4.5C8.4 1.6 10.2.8 12.3.9c3.8.1 6.9 3.3 7.1 7.1.1 3.2-1.9 6.1-4.9 7.2-.4.2-.7.5-.7 1v.6c0 .5-.3.7-.7.7zm.7 4.9c0 .4-.3.7-.6.7h-2.4c-.3 0-.6-.3-.6-.7v-2.3c0-.4.3-.7.6-.7h2.4c.3 0 .6.3.6.7v2.3z" },
	  home: { "d": "M22.6 12.5h-2.3v10.1c0 .3-.2.5-.5.5h-4.6c-.2 0-.4-.2-.4-.5v-7.8H9.2v7.8c0 .3-.2.5-.4.5H4.2c-.3 0-.5-.2-.5-.5V12.5H1.4c-.2 0-.4-.1-.4-.3-.1-.2-.1-.4.1-.5L11.7 1.1c.2-.2.5-.2.6 0l10.6 10.6c.2.1.2.3.1.5s-.2.3-.4.3z" },
	  identity: { "d": "M21.2 3.7h-5.1s.1.3.1.5c0 1.8-1.5 3.2-3.3 3.2h-2.7C8.4 7.4 6.9 6 6.9 4.2c0-.2 0-.5.1-.5H2.8c-1 0-1.9.8-1.9 1.8v13.9c0 1 .9 1.8 1.9 1.8h18.4c1 0 1.9-.8 1.9-1.8V5.5c0-1-.9-1.8-1.9-1.8zM10 17.5H4.8c-.6 0-1.1-.5-1.1-1.1 0-.9 1-1.4 2-1.9.7-.2.8-.5.8-.8 0-.3-.2-.6-.5-.8-.4-.4-.6-.9-.6-1.5 0-1.2.7-2.2 1.9-2.2s2 1 2 2.2c0 .6-.3 1.1-.7 1.5-.2.2-.4.5-.4.8 0 .2.1.5.8.8 1 .5 2 1 2 1.9.1.6-.4 1.1-1 1.1zm10.3-1.8c0 .3-.2.5-.5.5h-6.4c-.3 0-.5-.2-.5-.5v-.9c0-.3.2-.5.5-.5h6.4c.3 0 .5.2.5.5v.9zm.9-3.7c0 .3-.2.5-.4.5h-7.4c-.3 0-.5-.2-.5-.5v-.9c0-.3.2-.5.5-.5h7.4c.2 0 .4.2.4.5v.9zm-11-6.5h2.7c.8 0 1.4-.6 1.4-1.3s-.6-1.4-1.4-1.4h-2.7c-.8 0-1.4.6-1.4 1.4s.6 1.3 1.4 1.3z" },
	  image: { "d": "M23.1 4.6c0-1-.9-1.8-1.9-1.8H2.8c-1 0-1.9.8-1.9 1.8v14.8c0 1 .9 1.8 1.9 1.8h18.4c1 0 1.9-.8 1.9-1.8V4.6zm-4.8 12.9H4.9c-.6 0-.9-.6-.6-1l4.1-7.1c.1-.3.6-.3.7 0l2.5 4.2c.2.3.6.3.8.1l2-2.9c.1-.3.6-.3.7 0l3.7 5.8c.3.4 0 .9-.5.9zm-1.2-8.3c-1 0-1.9-.8-1.9-1.8s.9-1.9 1.9-1.9 1.8.9 1.8 1.9-.8 1.8-1.8 1.8z" },
	  inbox: { "d": "M23.1 3.7c0-1-.9-1.9-1.9-1.9H2.8c-1 0-1.9.9-1.9 1.9v16.6c0 1 .9 1.9 1.9 1.9h18.4c1 0 1.9-.9 1.9-1.9V3.7zM8.8 16.2c0 .2-.2.4-.5.4H4.2c-.3 0-.5-.2-.5-.4v-1.9c0-.3.2-.5.5-.5h4.1c.3 0 .5.2.5.5v1.9zm0-4.7c0 .3-.2.5-.5.5H4.2c-.3 0-.5-.2-.5-.5V9.7c0-.3.2-.5.5-.5h4.1c.3 0 .5.2.5.5v1.8zm0-4.6c0 .3-.2.5-.5.5H4.2c-.3 0-.5-.2-.5-.5V5.1c0-.3.2-.5.5-.5h4.1c.3 0 .5.2.5.5v1.8zm11.5 12c0 .3-.2.5-.5.5h-8.7c-.3 0-.5-.2-.5-.5V5.1c0-.3.2-.5.5-.5h8.7c.3 0 .5.2.5.5v13.8z" },
	  info: { "d": "M12 .9C5.9.9.9 5.9.9 12s5 11.1 11.1 11.1 11.1-5 11.1-11.1S18.1.9 12 .9zm0 5.6c.8 0 1.4.6 1.4 1.4s-.6 1.4-1.4 1.4-1.4-.6-1.4-1.4.6-1.4 1.4-1.4zm2.3 9.7c0 .2-.2.4-.5.4h-3.6c-.3 0-.5-.1-.5-.4v-.9c0-.3.2-.5.5-.5.2 0 .4-.2.4-.4v-1.9c0-.2-.2-.5-.4-.5-.3 0-.5-.1-.5-.4v-.9c0-.3.2-.5.5-.5h2.7c.3 0 .5.2.5.5v3.7c0 .2.2.4.4.4.3 0 .5.2.5.5v.9z" },
	  insert_tag_field: { "d": "M7.5 5.6l-1-.8c-.4-.3-.7-.2-1 0L.1 11.6c-.1.2-.1.6 0 .9l5.4 6.7c.3.2.7.3 1 0l1.1-.8c.3-.3.3-.7.1-1L3.3 12l4.4-5.4c.2-.3.1-.7-.2-1zm16.4 6l-5.4-6.7c-.3-.3-.7-.4-1-.1l-1.1.9c-.3.2-.3.7-.1.9l4.4 5.4-4.4 5.4c-.2.3-.1.8.1 1l1.1.9c.3.2.7.2 1-.1l5.4-6.7c.1-.4.1-.7 0-.9zM14.6 5l-1.4-.3c-.4-.1-.8.1-.9.5L8.9 18.3c-.1.3.1.7.5.8l1.4.3c.4.1.8-.1.9-.5l3.4-13.1c.1-.4-.1-.7-.5-.8z" },
	  insert_template: { "d": "M22.4 17.5h-2.1v-2c0-.4-.3-.7-.7-.7h-1.4c-.3 0-.7.3-.7.7v2h-2c-.4 0-.7.4-.7.7v1.4c0 .4.3.7.7.7h2v2.1c0 .4.4.7.7.7h1.4c.4 0 .7-.3.7-.7v-2.1h2.1c.4 0 .7-.3.7-.7v-1.4c0-.3-.3-.7-.7-.7zm-6.7-3.9c0-.4.3-.7.7-.7h1.1V2.8c0-1-.8-1.9-1.8-1.9H2.8C1.8.9.9 1.8.9 2.8v12.9c0 1 .9 1.8 1.9 1.8h10.1v-1.1c0-.4.3-.7.7-.7h2.1v-2.1zM7.4 5.1c0 .3-.2.4-.5.4H4.2c-.3 0-.5-.1-.5-.4v-.9c0-.3.2-.5.5-.5h2.7c.3 0 .5.2.5.5v.9zm5.5 7.4c0 .2-.2.4-.4.4H4.2c-.3 0-.5-.2-.5-.4v-1c0-.2.2-.4.5-.4h8.3c.2 0 .4.2.4.4v1zm1.9-3.7c0 .2-.2.4-.5.4H4.2c-.3 0-.5-.2-.5-.4v-1c0-.2.2-.4.5-.4h10.1c.3 0 .5.2.5.4v1z" },
	  italic: { "d": "M17.5 5.7v-.6c0-.5-.4-.9-.9-.9h-6.4c-.6 0-1 .4-1 .9V6c0 .5.4.9 1 .9.7 0 1.3.8 1.2 1.5l-1.7 8.1c-.1.6-.7 1-1.2 1H7.4c-.5 0-.9.5-.9 1v.9c0 .5.4.9.9.9h6.4c.6 0 1-.4 1-.9v-.9c0-.5-.4-1-1-1-.7 0-1.3-.7-1.2-1.4l1.7-8.2c.1-.6.7-1 1.2-1h.8c.7 0 1.2-.5 1.2-1.2z" },
	  justify_text: { "d": "M22.2 3c0-.4-.4-.7-.7-.7h-19c-.3 0-.7.3-.7.7v1.4c0 .4.4.7.7.7h19c.3 0 .7-.3.7-.7V3zm0 5.5c0-.3-.4-.7-.7-.7h-19c-.3 0-.7.4-.7.7v1.4c0 .4.4.7.7.7h19c.3 0 .7-.3.7-.7V8.5zm0 11.1c0-.4-.4-.7-.7-.7h-19c-.3 0-.7.3-.7.7V21c0 .4.4.7.7.7h19c.3 0 .7-.3.7-.7v-1.4zm0-5.5c0-.4-.4-.7-.7-.7h-19c-.3 0-.7.3-.7.7v1.4c0 .3.4.7.7.7h19c.3 0 .7-.4.7-.7v-1.4z" },
	  kanban: { "d": "M14.8 8.1c0-.4-.4-.7-.7-.7H9.9c-.3 0-.7.3-.7.7v12.4c0 .4.4.7.7.7h4.2c.3 0 .7-.3.7-.7V8.1zm-8.3 0c0-.4-.4-.7-.7-.7H1.6c-.4 0-.7.3-.7.7v14.3c0 .4.3.7.7.7h4.2c.3 0 .7-.3.7-.7V8.1zm16.6 0c0-.4-.3-.7-.7-.7h-4.2c-.3 0-.7.3-.7.7v10.6c0 .4.4.7.7.7h4.2c.4 0 .7-.3.7-.7V8.1zm0-6.5c0-.4-.3-.7-.7-.7H1.6c-.4 0-.7.3-.7.7v2.3c0 .4.3.7.7.7h20.8c.4 0 .7-.3.7-.7V1.6z" },
	  knowledge_base: { "d": "M4.4 16.2h6c.4 0 .7-.4.7-.7V4.6c0-.8-.9-1.4-1.5-1.4H4.4c-.4 0-.7.4-.7.7v11.6c0 .3.3.7.7.7zM22.7 5.4c-.3-.1-.5.1-.5.4v11.5c0 .4-.4.7-.7.7h-19c-.3 0-.7-.3-.7-.7V5.9c0-.4-.3-.6-.6-.5-.7.4-1.2 1.1-1.2 2V18c0 1 .8 1.8 1.8 1.8h7.7c.3 0 .7.4.7.7s.3.7.6.7h2.4c.3 0 .6-.3.6-.7s.4-.7.7-.7h7.7c1 0 1.8-.8 1.8-1.8V7.4c0-1-.3-1.8-1.3-2zm-9.1 10.8h6c.4 0 .7-.4.7-.7V3.9c0-.3-.3-.7-.7-.7h-5.2c-.7 0-1.5.6-1.5 1.4v10.9c0 .3.3.7.7.7z" },
	  layout: { "d": "M22.2 23.1H1.8c-.5 0-.9-.4-.9-.9V1.8c0-.5.4-.9.9-.9h20.4c.5 0 .9.4.9.9v20.4c0 .5-.4.9-.9.9zM2.8 21.2h18.4V2.8H2.8v18.4zM18 9.2H6c-.3 0-.5-.2-.5-.4V6c0-.3.2-.5.5-.5h12c.3 0 .5.2.5.5v2.8c0 .2-.2.4-.5.4zm-9.2 9.3H6c-.3 0-.5-.2-.5-.5v-5.5c0-.3.2-.5.5-.5h2.8c.2 0 .4.2.4.5V18c0 .3-.2.5-.4.5zm9.2 0h-5.5c-.3 0-.5-.2-.5-.5v-5.5c0-.3.2-.5.5-.5H18c.3 0 .5.2.5.5V18c0 .3-.2.5-.5.5z" },
	  left: { "d": "M17.5 3.8v16.4c0 .4-.6.8-1 .4l-9.8-8c-.3-.3-.3-.9 0-1.2l9.8-8c.4-.4 1-.1 1 .4z" },
	  left_align_text: { "d": "M22.2 3c0-.4-.4-.7-.7-.7h-19c-.3 0-.7.3-.7.7v1.4c0 .4.4.7.7.7h19c.3 0 .7-.3.7-.7V3zm-3.7 5.5c0-.3-.4-.7-.7-.7H2.5c-.3 0-.7.4-.7.7v1.4c0 .4.4.7.7.7h15.3c.3 0 .7-.3.7-.7V8.5zm0 11.1c0-.4-.4-.7-.7-.7H2.5c-.3 0-.7.3-.7.7V21c0 .4.4.7.7.7h15.3c.3 0 .7-.3.7-.7v-1.4zm3.7-5.5c0-.4-.4-.7-.7-.7h-19c-.3 0-.7.3-.7.7v1.4c0 .3.4.7.7.7h19c.3 0 .7-.4.7-.7v-1.4z" },
	  like: { "d": "M4.8 9.7H2.5c-.3 0-.7.3-.7.7V21c0 .4.4.7.7.7h1.2c1 0 1.8-.8 1.8-1.9v-9.4c0-.4-.3-.7-.7-.7zm15.5.5h-2.8c-1 0-1.8-.9-1.8-1.9V3.7c0-1-.8-1.9-1.9-1.9h-1.1c-.4 0-.7.4-.7.7v2.8c0 2.5-1.7 4.9-3.9 4.9-.4 0-.7.3-.7.6v9.3c0 .3.3.7.6.7 3.2.1 4.2 1.4 7.5 1.4 3.5 0 6.7-.4 6.7-4.4V12c0-1-.9-1.8-1.9-1.8z" },
	  link: { "d": "M12.6 19.2l-1-.1s-.7-.1-1-.3c-.2 0-.4 0-.5.2l-.3.2c-1.3 1.3-3.5 1.5-4.9.3-1.5-1.4-1.6-3.8-.1-5.2l3.5-3.5c.4-.5 1-.7 1.5-.9.8-.2 1.6-.2 2.2.1.5.2.9.4 1.2.8.2.2.4.4.5.6.2.3.6.4.8.1l1.3-1.3c.2-.2.2-.5.1-.7-.2-.3-.4-.5-.7-.7-.3-.4-.7-.7-1.1-.9-.6-.4-1.4-.7-2.1-.8-1.5-.3-3-.1-4.3.6-.5.3-1.1.7-1.5 1.1l-3.3 3.3C.4 14.6.2 18.6 2.6 21c2.4 2.7 6.6 2.8 9.1.2l1.2-1.1c.3-.3.1-.8-.3-.9zM21 2.7C18.5.3 14.5.5 12.1 3l-1 1c-.3.3-.1.8.3.9.6 0 1.3.2 1.9.4.2 0 .5 0 .6-.2l.2-.2c1.4-1.3 3.5-1.5 4.9-.3 1.6 1.4 1.6 3.8.2 5.2l-3.5 3.5c-.5.5-1 .7-1.6.9-.7.2-1.5.2-2.2-.1-.4-.2-.8-.4-1.2-.8-.2-.2-.3-.4-.5-.6-.1-.3-.6-.4-.8-.1l-1.3 1.3c-.2.2-.2.5 0 .7.2.3.4.5.6.7.3.3.8.7 1.1.9.7.4 1.4.7 2.2.8 1.4.3 3 .1 4.2-.6.6-.3 1.1-.7 1.5-1.1l3.5-3.5c2.6-2.5 2.5-6.7-.2-9.1z" },
	  list: { "d": "M3.7 4.8c0-.3-.3-.6-.7-.6H1.6c-.4 0-.7.3-.7.6v1.4c0 .4.3.7.7.7H3c.4 0 .7-.3.7-.7V4.8zm19.4 0c0-.3-.3-.6-.7-.6H6.2c-.3 0-.7.3-.7.6v1.4c0 .4.4.7.7.7h16.2c.4 0 .7-.3.7-.7V4.8zM3.7 11.3c0-.4-.3-.7-.7-.7H1.6c-.4 0-.7.3-.7.7v1.4c0 .4.3.7.7.7H3c.4 0 .7-.3.7-.7v-1.4zm17.5 0c0-.4-.3-.7-.7-.7H6.2c-.3 0-.7.3-.7.7v1.4c0 .4.4.7.7.7h14.3c.4 0 .7-.3.7-.7v-1.4zM3.7 17.8c0-.4-.3-.7-.7-.7H1.6c-.4 0-.7.3-.7.7v1.4c0 .3.3.6.7.6H3c.4 0 .7-.3.7-.6v-1.4zm19.4 0c0-.4-.3-.7-.7-.7H6.2c-.3 0-.7.3-.7.7v1.4c0 .3.4.6.7.6h16.2c.4 0 .7-.3.7-.6v-1.4z" },
	  location: { "d": "M22.5 4.4l-6.6-3.3c-.3-.2-.7-.2-1 0L8.8 4.2 2.6 1.1c-.4-.2-.8-.2-1.2 0-.3.2-.5.6-.5.9v16.6c0 .5.3.8.6 1l6.7 3.3c.3.2.7.2.9 0l6.2-3.1 6.2 3.1c.1.1.3.2.5.2s.4-.1.6-.2c.3-.2.5-.6.5-.9V5.4c0-.5-.2-.8-.6-1zm-1.7 2.1v8.8c0 .5-.5.9-1 .7-1.7-.7-.3-3.5-1.5-5.1-1.2-1.4-2.7 0-4.1-2.2-1.3-2.2.5-3.8 2.1-4.6.3-.1.5-.1.7 0l3.4 1.7c.3.2.4.4.4.7zm-9.3 12.8c-.3.2-.6.1-.8-.1-.5-.4-.9-1-.9-1.7 0-1.1-1.8-.7-1.8-2.9 0-1.8-2.1-2.3-3.9-2.1-.5.1-.8-.3-.8-.7V5c0-.5.5-.9 1-.6l4 2h.1l.1.1c1.7 1 1.3 1.8.6 3-.7 1.3-1.1 0-2.2-.4s-2.2.4-1.8 1.1 1.5 0 2.2.7.7 1.9 2.9 1.1 2.6-.3 3.4.4c.7.8 1.1 2.2 0 3.3-.7.7-1 2.1-1.2 3-.1.2-.2.4-.4.5l-.5.1z" },
	  lock: { "d": "M5.1 8.8h1.8c.3 0 .5-.2.5-.4v-.1c0-2.6 2.2-4.8 4.9-4.6 2.5.2 4.3 2.3 4.3 4.8v-.1c0 .2.2.4.5.4h1.8c.3 0 .5-.2.5-.4v-.1c0-4.2-3.5-7.6-7.8-7.4-3.9.2-6.9 3.5-7 7.5.1.2.2.4.5.4zm-.5-.4v.1-.1zm16.6 4.1c0-1.1-.8-1.9-1.8-1.9H4.6c-1 0-1.8.8-1.8 1.9v8.7c0 1 .8 1.9 1.8 1.9h14.8c1 0 1.8-.9 1.8-1.9v-8.7zm-7.1 7.2c.1.3-.1.6-.4.6h-3.4c-.3 0-.5-.3-.5-.6l.9-2.8c-.7-.4-1.1-1.3-1-2.2.2-.9.9-1.5 1.8-1.7 1.5-.3 2.8.8 2.8 2.1 0 .8-.4 1.5-1 1.8l.8 2.8z" },
	  logout: { "d": "M9.7 22.4V21c0-.4-.3-.7-.7-.7H4.4c-.4 0-.7-.3-.7-.7V4.4c0-.4.3-.7.7-.7H9c.4 0 .7-.3.7-.7V1.6c0-.4-.3-.7-.7-.7H2.8C1.8.9.9 1.8.9 2.8v18.4c0 1 .9 1.9 1.9 1.9H9c.4 0 .7-.3.7-.7zm13.2-9.9c.3-.3.3-.7 0-1l-6.2-6.2c-.3-.3-.7-.3-1 0l-1 .9c-.3.3-.3.7 0 1l2.6 2.6c.3.3.1.8-.3.8H7.2c-.4 0-.7.2-.7.6v1.4c0 .4.3.7.7.7h9.7c.5 0 .6.5.4.8l-2.6 2.6c-.3.3-.3.7 0 1l.9.9c.3.3.7.3 1 0l6.3-6.1z" },
	  magicwand: { "d": "M13 9.7c-.2-.2-.4-.2-.6 0l-11.1 11c-.5.6-.5 1.4 0 2 .6.5 1.4.5 2 0l11-11.1c.2-.2.2-.4 0-.6L13 9.7zm3.2 0l1.5-1.5c.3-.3.3-.7 0-1l-.9-.9c-.3-.3-.7-.3-1 0l-1.5 1.5c-.2.1-.2.4 0 .6l1.3 1.3c.2.2.5.2.6 0zM4.8 5.4c1.8.5 3.1 1.8 3.7 3.6.1.3.5.3.5 0 .6-1.7 1.9-3.1 3.7-3.6.3-.1.3-.5 0-.6C11 4.2 9.6 2.9 9 1.1c0-.3-.4-.3-.5 0-.6 1.8-1.9 3.1-3.7 3.7-.2.1-.2.5 0 .6zm18.1 8.7c-1.6-.5-2.8-1.7-3.3-3.3-.1-.2-.4-.2-.5 0-.5 1.6-1.7 2.8-3.3 3.3-.2.1-.2.4 0 .5 1.6.5 2.8 1.7 3.3 3.3.1.2.4.2.5 0 .5-1.6 1.7-2.8 3.3-3.3.2-.1.2-.5 0-.5zM17.7 3.9c1.2.3 2.1 1.2 2.4 2.4.1.2.3.2.4 0 .4-1.2 1.2-2.1 2.4-2.4.2-.1.2-.3 0-.4-1.2-.4-2-1.2-2.4-2.4-.1-.2-.3-.2-.4 0-.3 1.2-1.2 2-2.4 2.4-.2.1-.2.3 0 .4z" },
	  matrix: { "d": "M22.2 1.6c0-.4-.4-.7-.7-.7H7.2c-.4 0-.7.3-.7.7v2.3c0 .4.3.7.7.7h14.3c.3 0 .7-.3.7-.7V1.6zM4.6 7.2c0-.4-.3-.7-.7-.7H2.5c-.3 0-.7.3-.7.7v6c0 .3.4.6.7.6h1.4c.4 0 .7-.3.7-.6v-6zm0 9.2c0-.4-.3-.7-.7-.7H2.5c-.3 0-.7.3-.7.7v6c0 .4.4.7.7.7h1.4c.4 0 .7-.3.7-.7v-6zm8.8-9.2c0-.4-.3-.7-.7-.7H7.2c-.4 0-.7.3-.7.7v1.3c0 .4.3.7.7.7h5.5c.4 0 .7-.3.7-.7V7.2zm8.8 0c0-.4-.4-.7-.7-.7h-5.6c-.3 0-.7.3-.7.7v1.3c0 .4.4.7.7.7h5.6c.3 0 .7-.3.7-.7V7.2zm-8.8 4.6c0-.4-.3-.7-.7-.7H7.2c-.4 0-.7.3-.7.7v1.4c0 .3.3.6.7.6h5.5c.4 0 .7-.3.7-.6v-1.4zm8.8 0c0-.4-.4-.7-.7-.7h-5.6c-.3 0-.7.3-.7.7v1.4c0 .3.4.6.7.6h5.6c.3 0 .7-.3.7-.6v-1.4zm-8.8 4.6c0-.4-.3-.7-.7-.7H7.2c-.4 0-.7.3-.7.7v1.4c0 .3.3.7.7.7h5.5c.4 0 .7-.4.7-.7v-1.4zm8.8 0c0-.4-.4-.7-.7-.7h-5.6c-.3 0-.7.3-.7.7v1.4c0 .3.4.7.7.7h5.6c.3 0 .7-.4.7-.7v-1.4zM13.4 21c0-.4-.3-.7-.7-.7H7.2c-.4 0-.7.3-.7.7v1.4c0 .4.3.7.7.7h5.5c.4 0 .7-.3.7-.7V21zm8.8 0c0-.4-.4-.7-.7-.7h-5.6c-.3 0-.7.3-.7.7v1.4c0 .4.4.7.7.7h5.6c.3 0 .7-.3.7-.7V21z" },
	  minimize_window: { "d": "M23.1 22.4c0 .4-.3.7-.7.7H1.6c-.4 0-.7-.3-.7-.7V21c0-.4.3-.7.7-.7h20.8c.4 0 .7.3.7.7v1.4z" },
	  monthlyview: { "d": "M20.3 3.2H18v-.9c0-.7-.6-1.4-1.4-1.4-.7 0-1.4.6-1.4 1.4v.9H8.8v-.9c0-.7-.6-1.4-1.4-1.4C6.6.9 6 1.5 6 2.3v.9H3.7c-1 0-1.9.9-1.9 1.9v1.1c0 .4.4.7.7.7h19c.3 0 .7-.3.7-.7V5.1c0-1-.9-1.9-1.9-1.9zm1.2 6h-19c-.3 0-.7.4-.7.7v11.3c0 1 .9 1.9 1.9 1.9h16.6c1 0 1.9-.9 1.9-1.9V9.9c0-.3-.4-.7-.7-.7zM9.7 20.3c-1.1 0-2.3-.4-2.7-1 0-.1-.1-.2-.1-.3 0-.4.4-.8.8-.8.1 0 .2.1.4.1.5.3 1.1.5 1.6.5.9 0 1.4-.4 1.4-1s-.4-.9-1.5-.9c-.6.1-1-.1-1-.7 0-.4.3-.7.7-.7 1 .1 1.7-.2 1.7-.8 0-.6-.6-.9-1.4-.9-.5 0-1 .1-1.5.4-.1.1-.2.1-.3.1-.4 0-.7-.3-.7-.7 0-.2.1-.4.2-.5.6-.5 1.4-.8 2.5-.8 1.7 0 2.8.8 2.8 2.1 0 .9-.8 1.5-1.6 1.7.8.1 1.7.7 1.7 1.8 0 1.5-1.2 2.4-3 2.4zm7.4-.9c0 .4-.3.9-.7.9-.4 0-.7-.4-.7-.9v-4.7l-1 .9c-.1.1-.3.1-.5.1-.4 0-.7-.2-.7-.7 0-.1.1-.3.2-.4l1.8-1.8c.1-.2.4-.3.7-.3.5 0 .9.5.9 1v5.9z" },
	  move: { "d": "M22.9 11.7l-3.8-4.2c-.3-.3-.6 0-.6.4v2.7h-4.7c-.2 0-.4-.2-.4-.4V5.5h2.7c.5 0 .7-.4.4-.6l-4.1-3.8c-.2-.2-.5-.2-.7 0L7.6 4.9c-.3.3-.1.6.4.6h2.6v4.7c0 .2-.2.4-.4.4H5.5V7.9c0-.5-.4-.7-.6-.4l-3.8 4.1c-.2.2-.2.5 0 .7l3.8 4.1c.3.3.6.1.6-.4v-2.6h4.7c.2 0 .4.2.4.4v4.7H7.9c-.5 0-.7.4-.4.6l4.1 3.8c.2.2.5.2.7 0l4.1-3.8c.3-.3.1-.6-.4-.6h-2.6v-4.7c0-.2.2-.4.4-.4h4.7v2.7c0 .5.4.7.6.4l3.8-4.1c.2-.3.2-.5 0-.7z" },
	  muted: { "d": "M22.4 2.6l-1-1c-.3-.3-.8-.2-1.1.2l-4.6 4.6V4.6c0-2.1-1.6-3.7-3.7-3.7S8.3 2.5 8.3 4.6v6.7c0 .7.2 1.3.6 1.9l-1.7 1.6c-.7-1-1.2-2.2-1.2-3.5V9.4c0-.6-.5-1.1-1.2-1.1s-1.1.5-1.1 1.1v1.9c0 1.9.7 3.7 1.9 5.1l-3.8 3.9c-.4.3-.4.8-.2 1.1l1 1c.3.3.8.2 1.1-.2L22.2 3.7c.4-.3.5-.8.2-1.1zM18 10.7v.6c0 3.2-2.7 5.9-6 5.9h-.4l-1.8 1.9c.4.1.8.1 1.3.2v1.5H9c-.6 0-1.2.5-1.2 1.1s.6 1.2 1.2 1.2h6c.7 0 1.2-.5 1.2-1.2s-.6-1.1-1.2-1.1h-2.1v-1.5c4.2-.6 7.4-4 7.4-8V9.4c0-.3-.1-.5-.3-.7l-2 2z" },
	  "new": { "d": "M19.8 4.2C15.5-.1 8.5-.1 4.2 4.2c-4.3 4.3-4.3 11.3 0 15.6 4.3 4.4 11.3 4.4 15.6 0 4.3-4.3 4.3-11.3 0-15.6zm-.4 8.7c0 .3-.2.5-.5.5h-5.1c-.2 0-.4.2-.4.4v5.1c0 .3-.2.5-.5.5h-1.8c-.3 0-.5-.2-.5-.5v-5.1c0-.2-.2-.4-.4-.4H5.1c-.3 0-.5-.2-.5-.5v-1.8c0-.3.2-.5.5-.5h5.1c.2 0 .4-.2.4-.4V5.1c0-.3.2-.5.5-.5h1.8c.3 0 .5.2.5.5v5.1c0 .2.2.4.4.4h5.1c.3 0 .5.2.5.5v1.8z" },
	  new_window: { "d": "M22.5.9h-8.8c-.4 0-.8.3-.8.6v1.4c0 .4.3.8.8.8h3.6c.4 0 .7.5.3.7l-7.8 7.9c-.3.3-.3.7 0 .9l1 1c.2.3.6.3.9 0l7.9-7.8c.2-.3.7-.1.7.3v3.6c0 .4.4.8.7.8h1.4c.4 0 .7-.4.7-.8V1.6c0-.4-.3-.7-.6-.7zm-5.7 10.9l-1.6 1.6c-.3.3-.4.6-.4 1v5.2c0 .4-.4.7-.7.7H4.4c-.4 0-.7-.3-.7-.7V9.9c0-.3.3-.7.7-.7h5.3c.4 0 .7-.1 1-.4l1.5-1.6c.3-.2.1-.7-.3-.7H2.8c-1 0-1.9.8-1.9 1.8v12.9c0 1 .9 1.9 1.9 1.9h12.9c1 0 1.8-.9 1.8-1.9v-9.1c0-.4-.5-.6-.7-.3z" },
	  news: { "d": "M23.3 2.8H4.4c-.4 0-.7.3-.7.7v14c0 .6-.5 1.1-1.1 1-.4-.1-.8-.5-.8-1V7.4c0-.3-.1-.5-.4-.5H.7c-.4 0-.7.3-.7.7v11.8c0 1 .8 1.8 1.8 1.8h20.4c1 0 1.8-.8 1.8-1.8V3.5c0-.4-.3-.7-.7-.7zM12.9 16.2c0 .2-.2.4-.4.4H6.9c-.3 0-.4-.2-.4-.4v-1c0-.2.1-.4.4-.4h5.6c.2 0 .4.2.4.4v1zm0-3.7c0 .2-.2.4-.4.4H6.9c-.3 0-.4-.2-.4-.4v-1c0-.2.1-.4.4-.4h5.6c.2 0 .4.2.4.4v1zm8.3 3.7c0 .2-.2.4-.4.4h-5.6c-.2 0-.4-.2-.4-.4v-1c0-.2.2-.4.4-.4h5.6c.2 0 .4.2.4.4v1zm0-3.7c0 .2-.2.4-.4.4h-5.6c-.2 0-.4-.2-.4-.4v-1c0-.2.2-.4.4-.4h5.6c.2 0 .4.2.4.4v1zm0-3.7c0 .2-.2.4-.4.4H6.9c-.3 0-.4-.2-.4-.4V6c0-.3.1-.5.4-.5h13.9c.2 0 .4.2.4.5v2.8z" },
	  notebook: { "d": "M20.3.9H6.5c-1.1 0-1.9.9-1.9 1.9v1.4H3.2c-.8 0-1.4.6-1.4 1.3s.6 1.4 1.4 1.4h1.4v3.7H3.2c-.8 0-1.4.6-1.4 1.4s.6 1.4 1.4 1.4h1.4v3.7H3.2c-.8 0-1.4.6-1.4 1.4s.6 1.3 1.4 1.3h1.4v1.4c0 1 .8 1.9 1.9 1.9h13.8c1 0 1.9-.9 1.9-1.9V2.8c0-1-.9-1.9-1.9-1.9zm-3.2 15.7c0 .3-.2.5-.5.5h-6.4c-.3 0-.5-.2-.5-.5v-.9c0-.3.2-.5.5-.5h6.4c.3 0 .5.2.5.5v.9zm.9-3.7c0 .3-.2.5-.5.5H9.2c-.2 0-.4-.2-.4-.5V12c0-.3.2-.5.4-.5h8.3c.3 0 .5.2.5.5v.9zm.9-4.6c0 .3-.2.5-.4.5H8.3c-.3 0-.5-.2-.5-.5V5.5c0-.2.2-.4.5-.4h10.2c.2 0 .4.2.4.4v2.8z" },
	  notification: { "d": "M21.2 15.2H21c-.9 0-1.6-.7-1.6-1.6V8.3c0-4.2-3.5-7.6-7.8-7.4-3.9.2-7 3.6-7 7.6v5.2c0 .8-.7 1.5-1.6 1.5h-.2c-1 0-1.9.9-1.9 1.9v.7c0 .3.3.7.7.7h20.8c.4 0 .7-.4.7-.7v-.7c0-1-.9-1.9-1.9-1.9zm-6.9 5.1H9.7c-.2 0-.5.3-.4.6.2 1.3 1.4 2.2 2.7 2.2s2.5-1 2.7-2.2c.1-.3-.2-.6-.4-.6z" },
	  office365: undefined,
	  offline: { "d": "M16 16.7c.2-.3.2-.6 0-.9l-.8-.8c-.2-.2-.6-.2-.8 0l-2.1 2c-.1.2-.4.2-.5 0l-2.1-2c-.2-.2-.6-.2-.8 0l-.8.8c-.3.3-.3.6 0 .9l2 2c.1.1.1.4 0 .5l-2 2.1c-.3.2-.3.6 0 .8l.8.8c.2.3.6.3.8 0l2.1-2c.1-.1.4-.1.5 0l2.1 2c.2.3.6.3.8 0l.8-.8c.2-.2.2-.6 0-.8l-2-2.1c-.2-.1-.2-.4 0-.5l2-2zm6-11.3C19.5 2.5 15.9 1 12 1S4.6 2.5 2.1 5.4c-.2.1-.2.5 0 .6l1.4 1.2c.2.2.5.1.7 0C6.2 5 9 3.7 12 3.7s5.9 1.3 7.9 3.5c.2.1.5.1.7 0L22 6c.2-.2.2-.5 0-.6zm-10 2c-1.9 0-3.7.9-5 2.3-.2.2-.2.5 0 .7l1.5 1.1c.2.2.5.2.6 0 .8-.8 1.8-1.3 2.9-1.3s2.2.5 3 1.2c.1.2.4.2.6.1l1.4-1.1c.3-.2.3-.5.1-.7C15.8 8.3 14 7.4 12 7.4z" },
	  open: { "d": "M3.7 16.2v-.3.5-.2zM21.2.9H2.8C1.8.9.9 1.8.9 2.8v16.6c0 1 .9 1.8 1.9 1.8h5.5c.3 0 .5-.2.5-.4v-1.9c0-.3-.2-.4-.5-.4H4.4c-.4 0-.7-.4-.7-.7V6.2c0-.3.3-.7.7-.7h15.2c.4 0 .7.4.7.7v11.6c0 .3-.3.7-.7.7h-3.9c-.3 0-.5.1-.5.4v1.9c0 .2.2.4.5.4h5.5c1 0 1.9-.8 1.9-1.8V2.8c0-1-.9-1.9-1.9-1.9zM17.3 16l1-1c.3-.3.3-.7 0-1l-5.8-5.8c-.3-.3-.7-.3-1 0L5.7 14c-.3.3-.3.7 0 1l1 .9c.3.3.7.3 1 0l2.1-2.1c.3-.3.8-.1.8.3v8.3c0 .4.3.7.7.7h1.3c.4 0 .8-.3.8-.7v-8.3c0-.4.4-.6.8-.3l2.1 2.2c.3.2.7.2 1 0z" },
	  open_folder: { "d": "M21.2 6.5H10.8c-.7 0-1.3-.4-1.7-1L7.5 2.8c-.3-.6-.9-1-1.6-1H2.8c-1 0-1.9.9-1.9 1.9v16.6c0 1 .9 1.9 1.9 1.9h18.4c1 0 1.9-.9 1.9-1.9v-12c0-1-.9-1.8-1.9-1.8zm0-3.7H10.1c-.2 0-.3.2-.2.3l.8 1.2c.1.2.2.3.4.3h10.1c.5 0 1 .1 1.5.3.1.1.4-.1.4-.3 0-1-.9-1.8-1.9-1.8z" },
	  opened_folder: { "d": "M20.3 6.9c0-1-.8-1.8-1.8-1.8h-6.8c-.9 0-1.6-.9-1.6-.9L8.9 2.8s-.5-1-1.6-1H5.5c-1 0-1.8.9-1.8 1.9v4.1h16.6v-.9zm1.3 2.8H2.4c-1 0-1.7.9-1.4 1.7l2.6 9.7c.2.6.7 1.1 1.4 1.1h14.1c.6 0 1.2-.5 1.3-1.1l2.7-9.7c.2-.8-.5-1.7-1.5-1.7z" },
	  "package": { "d": "M20.5 11.1h-3.7l-1.5 1.8h5v2.8H3.7v-2.8h4.9l-1.5-1.8H3.5c-.9 0-1.7.7-1.7 1.6v9c0 .8.6 1.4 1.4 1.4h17.6c.8 0 1.4-.6 1.4-1.4v-9c0-.9-.8-1.6-1.7-1.6zm-9.9-9.5v5.8H7.4c-.4 0-.7.4-.4.6l4.6 5.7c.2.1.5.1.7 0L16.9 8c.3-.2 0-.6-.4-.6h-3.1V1.6c0-.4-.3-.7-.7-.7h-1.4c-.4 0-.7.3-.7.7z" },
	  package_org: { "d": "M20.5 10.6h-5.8l-1.8 1.9h7.4v2.7H3.7v-2.7h3.7l-1.8-1.9H3.5c-.9 0-1.7.8-1.7 1.7v8.9c0 .8.6 1.4 1.4 1.4h17.6c.8 0 1.4-.6 1.4-1.4v-8.9c0-.9-.8-1.7-1.7-1.7zm-11 1.3c.4.4.9.4 1.3 0l8.8-8.8c.2-.1.2-.4 0-.6l-1.3-1.3c-.2-.2-.5-.2-.7 0l-7.4 7.5-3.1-3.1c-.2-.2-.5-.2-.7 0L5.1 6.9c-.2.2-.2.4 0 .6l4.4 4.4z" },
	  package_org_beta: { "d": "M20.5 10.6h-2.7c-.2.7-.5 1.3-1 1.9h3.5v2.7H3.7v-2.7h2.8v-1.9h-3c-.9 0-1.7.8-1.7 1.7v8.9c0 .8.6 1.4 1.4 1.4h17.6c.8 0 1.4-.6 1.4-1.4v-8.9c0-.9-.8-1.7-1.7-1.7zm-4.3-6c0-1.8-1.6-3.2-3.4-3.2H9c-.4 0-.7.3-.7.7v9.7c0 .3.3.7.7.7h3.9c1.8 0 3.3-1.5 3.2-3.3 0-.9-.4-1.7-1-2.2.7-.7 1.1-1.5 1.1-2.4zm-6-1.4h2.7c.8 0 1.4.6 1.4 1.4 0 .8-.6 1.4-1.4 1.4h-2.7V3.2zm4.1 6c0 .8-.6 1.4-1.4 1.4h-2.7V7.8h2.7c.8 0 1.4.6 1.4 1.4z" },
	  page: { "d": "M20.5 8.8h-5.2c-1.2 0-1.9-.8-1.9-2V1.7c0-.5-.3-.8-.8-.8H5c-1.2 0-2.2 1-2.2 2.2v17.8c0 1.2 1 2.2 2.2 2.2h14c1.2 0 2.2-1 2.2-2.2V9.5c0-.4-.3-.7-.7-.7zm.6-2.8l-4.9-4.9c-.1-.1-.3-.2-.4-.2-.3 0-.6.3-.6.5v4c0 .8.8 1.5 1.6 1.5h3.9c.3 0 .5-.3.5-.5s0-.4-.1-.4z" },
	  palette: { "d": "M22.8 8C21.8 3.6 17.2.9 12.1.9 5.9.9.9 5.9.9 12s5 11.1 11.2 11.1c8.6 0 7.9-4.4 5.2-6.1-1.7-1-2.5-3.3-.9-5 3-3.1 7.8 1.8 6.4-4zM6 15.7c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zm.5-8.8c0-1.3 1-2.3 2.3-2.3s2.3 1 2.3 2.3-1 2.3-2.3 2.3-2.3-1-2.3-2.3zm5 13.4c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zm4.2-12c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3S18 4.7 18 6s-1 2.3-2.3 2.3z" },
	  paste: { "d": "M8.1 5.5h7.8c.4 0 .7-.3.7-.7v-2c0-1-.8-1.9-1.8-1.9H9.2c-1 0-1.8.9-1.8 1.9v2c0 .4.3.7.7.7zm12.2-2.7h-1.1c-.4 0-.7.3-.7.7v2c0 1.1-.9 1.9-1.9 1.9H7.4c-1 0-1.9-.8-1.9-1.9v-2c0-.4-.3-.7-.7-.7H3.7c-1 0-1.9.8-1.9 1.8v16.6c0 1 .9 1.9 1.9 1.9h16.6c1 0 1.9-.9 1.9-1.9V4.6c0-1-.9-1.8-1.9-1.8zm-2.8 16.1c0 .3-.1.5-.4.5H6.9c-.3 0-.4-.2-.4-.5V18c0-.3.1-.5.4-.5h10.2c.3 0 .4.2.4.5v.9zm0-3.7c0 .3-.1.5-.4.5H6.9c-.3 0-.4-.2-.4-.5v-.9c0-.3.1-.5.4-.5h10.2c.3 0 .4.2.4.5v.9zm0-3.7c0 .3-.1.5-.4.5H6.9c-.3 0-.4-.2-.4-.5v-.9c0-.3.1-.4.4-.4h10.2c.3 0 .4.1.4.4v.9z" },
	  people: { "d": "M19.4 10.3c-1.3-.5-1.5-1-1.5-1.5s.4-1 .8-1.4c.8-.7 1.2-1.6 1.2-2.7 0-2-1.3-3.8-3.7-3.8-2.1 0-3.4 1.5-3.6 3.3 0 .2.1.3.2.4 1.8 1.1 2.8 3.1 2.8 5.4 0 1.8-.6 3.3-1.9 4.4-.1.1-.1.3 0 .4.3.2 1.1.6 1.5.8.2 0 .3.1.4.1h5.6c1 0 1.9-.9 1.9-1.9v-.2c0-1.6-1.8-2.5-3.7-3.3zm-6.2 6.4c-1.6-.6-1.8-1.2-1.8-1.8 0-.6.5-1.2 1-1.7.9-.7 1.4-1.8 1.4-3.1 0-2.4-1.6-4.5-4.4-4.5-2.8 0-4.5 2.1-4.5 4.5 0 1.3.5 2.4 1.5 3.1.5.5.9 1.1.9 1.7 0 .6-.2 1.2-1.8 1.8-2.3.9-4.6 2-4.6 3.9v.6c0 1 .9 1.9 1.9 1.9h12.8c1.1 0 1.9-.9 1.9-1.9v-.6c0-1.9-2-3-4.3-3.9z" },
	  phone_landscape: { "d": "M24 6c0-1-.8-1.8-1.8-1.8H1.8C.8 4.2 0 5 0 6v12c0 1 .8 1.8 1.8 1.8h20.4c1 0 1.8-.8 1.8-1.8V6zM2.3 13.4c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4zm18 3c0 .4-.3.7-.7.7H5.3c-.4 0-.7-.3-.7-.7V7.6c0-.4.3-.7.7-.7h14.3c.4 0 .7.3.7.7v8.8z" },
	  phone_portrait: { "d": "M19.8 1.8C19.8.8 19 0 18 0H6C5 0 4.2.8 4.2 1.8v20.4c0 1 .8 1.8 1.8 1.8h12c1 0 1.8-.8 1.8-1.8V1.8zM12 23.1c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4zm5.1-4.4c0 .4-.3.7-.7.7H7.6c-.4 0-.7-.3-.7-.7V4.4c0-.4.3-.7.7-.7h8.8c.4 0 .7.3.7.7v14.3z" },
	  photo: { "d": "M12 9.2c-2 0-3.7 1.7-3.7 3.7s1.7 3.7 3.7 3.7 3.7-1.6 3.7-3.7S14 9.2 12 9.2zm9.2-2.7h-2.4c-.6 0-1.2-.4-1.5-.9L16.2 4c-.3-.8-1.1-1.2-1.9-1.2H9.7c-.8 0-1.6.4-1.9 1.2L6.7 5.6c-.3.5-.9.9-1.6.9H2.8c-1 0-1.9.8-1.9 1.8v11.1c0 1 .9 1.8 1.9 1.8h18.4c1 0 1.9-.8 1.9-1.8V8.3c0-1-.9-1.8-1.9-1.8zm-9.2 12c-3 0-5.5-2.5-5.5-5.6S9 7.4 12 7.4s5.5 2.5 5.5 5.5-2.5 5.6-5.5 5.6z" },
	  power: { "d": "M15.9 3.6c-.3-.2-.7 0-.7.4v1.7c0 .3.2.7.5.8 2.4 1.4 4 4.2 3.6 7.3-.3 3.3-3.1 6.1-6.5 6.5-4.4.5-8.2-3-8.2-7.4 0-2.7 1.5-5.1 3.7-6.4.3-.1.5-.5.5-.8V4c0-.4-.4-.6-.7-.4-3.9 1.6-6.6 5.6-6.2 10.2.4 4.8 4.2 8.7 8.9 9.2 6.1.7 11.4-4.1 11.4-10.1 0-4.2-2.6-7.8-6.3-9.3zm-2.5-2c0-.4-.3-.7-.7-.7h-1.4c-.4 0-.7.3-.7.7v7.9c0 .3.3.7.7.7h1.4c.4 0 .7-.4.7-.7V1.6z" },
	  preview: { "d": "M23.9 11.6C21.7 7.2 17.2 4.2 12 4.2S2.3 7.2.1 11.6c-.1.3-.1.6 0 .8 2.2 4.4 6.7 7.4 11.9 7.4s9.7-3 11.9-7.4c.1-.3.1-.5 0-.8zM12 17.1c-2.8 0-5.1-2.3-5.1-5.1S9.2 6.9 12 6.9s5.1 2.3 5.1 5.1-2.3 5.1-5.1 5.1zm0-8.3c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2 3.2-1.4 3.2-3.2-1.4-3.2-3.2-3.2z" },
	  priority: { "d": "M4.2 1.6c0-.4-.4-.7-.7-.7H2.1c-.4 0-.7.3-.7.7v20.8c0 .4.3.7.7.7h1.4c.3 0 .7-.3.7-.7V1.6zm17.7 2c-7.4 3.8-6.5-4.1-15.4-1-.3.1-.5.4-.5.6V14c0 .3.3.5.6.4 8.9-3 7.9 5.2 15.6.8.3-.1.4-.3.4-.6V3.9c0-.3-.4-.5-.7-.3z" },
	  process: { "d": "M7.5 10.7l3.9-4.9c.3-.4.8-.4 1.1 0l3.9 5c.2.1.4.3.6.3h4.4c.4 0 .8-.3.8-.7V3.7c0-1-.9-1.9-1.9-1.9H3.7c-1 0-1.9.9-1.9 1.9v6.7c0 .4.4.7.7.7h4.4c.3 0 .4-.2.6-.4zm9 2.6l-3.9 4.9c-.3.4-.9.4-1.2 0l-3.9-5c-.2-.1-.3-.3-.6-.3H2.5c-.3 0-.7.3-.7.7v6.7c0 1 .9 1.9 1.9 1.9h16.6c1 0 1.9-.9 1.9-1.9v-6.7c0-.4-.4-.7-.7-.7H17c-.2 0-.4.2-.5.4z" },
	  push: { "d": "M20.3.9H9.2c-1 0-1.8.9-1.8 1.9 0 .3.2.7.4.8.2.1 1.9 1.9 1.9 1.9.2.1.4 0 .4-.2 0-.4.3-.7.7-.7h7.8c.4 0 .8.3.8.7v12.5c0 .3-.4.6-.8.6h-7.8c-.4 0-.6-.3-.6-.6v-.1c0-.2-.3-.3-.4-.1 0 0-1.8 1.7-2 1.8-.2.2-.4.5-.4.9v.9c0 1 .8 1.8 1.8 1.8h11.1c1 0 1.9-.8 1.9-1.8V2.8c0-1-.9-1.9-1.9-1.9zm-5.5 21.3c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4zM12.7 11L7 5.3c-.3-.3-.7-.3-1 0l-1 .9c-.2.3-.2.7 0 1l2.2 2.1c.2.3 0 .8-.4.8H.7c-.4.1-.7.4-.7.7v1.4c0 .4.3.7.7.7h6.1c.4 0 .6.5.3.8L5 15.8c-.3.3-.3.7 0 1l1 1c.2.2.6.2.9 0l5.8-5.8c.3-.2.3-.7 0-1z" },
	  puzzle: { "d": "M20.8 17.7c-.1 1.3-.3 2.6-.5 3.9 0 .4-.5.8-.8.8-2.5.3-5 .5-7.5.5-2.4 0-4.9-.1-7.3-.5-.4 0-.8-.4-.9-.8-.3-2-.5-4.1-.5-6.2s.2-4.1.5-6.2c.1-.3.5-.7.9-.8 1.5-.2 3-.3 4.4-.4 0 0 1.2 0 1.1-1.2 0-1-1.8-1.7-1.8-3.4C8.4 2 9.8.9 12 .9c2.3 0 3.6 1.1 3.6 2.5 0 1.8-1.7 2.4-1.8 3.4C13.8 7.9 15 8 15 8c1.5.1 3 .2 4.5.4.3 0 .8.4.8.8.2 1.5.4 2.8.5 4.2 0 .4-.4.9-.8.9h-.4c-.4 0-1-.4-1.3-.7 0 0-1-1-2.1-1-1.7-.1-3 1.4-3 3s1.3 3.1 3 3.1c1-.1 2-1.1 2-1.1.4-.2 1-.5 1.4-.5h.4c.5 0 .8.3.8.6z" },
	  question: { "d": "M13.1 17.5h-2.3c-.4 0-.6-.2-.6-.6v-.7c0-1.9 1.2-3.7 3-4.3.6-.2 1.1-.5 1.5-1 2.3-2.8.2-6.1-2.6-6.2-1 0-1.9.3-2.7 1-.6.6-1 1.3-1 2.1-.1.2-.4.5-.7.5H5.4c-.5 0-.8-.4-.7-.8.1-1.7.9-3.3 2.2-4.5C8.4 1.6 10.2.8 12.3.9c3.8.1 6.9 3.3 7.1 7.1.1 3.2-1.9 6.1-4.9 7.2-.4.2-.7.5-.7 1v.6c0 .5-.3.7-.7.7zm.7 4.9c0 .4-.3.7-.6.7h-2.4c-.3 0-.6-.3-.6-.7v-2.3c0-.4.3-.7.6-.7h2.4c.3 0 .6.3.6.7v2.3z" },
	  questions_and_answers: { "d": "M23.1 12.9c0-1.8-1.2-3.3-2.8-3.9C20.2 4.5 16.5.9 12 .9S3.8 4.5 3.7 9C2.1 9.6.9 11.1.9 12.9c0 2 1.4 3.6 3.1 4 1 3.6 4.2 6.2 8 6.2s7-2.6 8-6.2c1.7-.4 3.1-2 3.1-4zm-4.6-4.1l-.1-.1.2.1h-.1zM12 21.2c-3.6 0-6.5-3-6.5-6.6 0-.9.2-2.3.6-3.2 0-.1.1-.2.2-.4 1.4-.5 2.6-1.5 3.3-2.7 1.7 2 4.2 3.4 7 3.4H18c.1.6.3 1.3.4 2.1-.3 1.1-2.1 2.2-4.6 2.4-.1-.3-.4-.5-.7-.5h-2.3c-.4 0-.6.4-.6.7v1.4c0 .4.2.7.6.7h2.3c.3 0 .6-.2.7-.5 1.6 0 3.1-.5 4.2-1.2-.8 2.6-3.2 4.4-6 4.4z" },
	  record: { "d": "M12 3.7c4.6 0 8.3 3.7 8.3 8.3s-3.7 8.3-8.3 8.3-8.3-3.7-8.3-8.3S7.4 3.7 12 3.7z" },
	  redo: { "d": "M21.6 1.4h-1.4c-.4 0-.8.3-.8.7v3.2c0 .4-.2.6-.5.3-.2-.2-.3-.3-.5-.4-2.3-2.3-5.5-3.3-8.8-2.7-1.2.3-2.3.7-3.3 1.4C3.5 5.7 1.9 8.7 1.8 12c0 2.4 1 4.9 2.7 6.7 1.7 1.8 3.9 2.9 6.3 3 .4.1.7-.2.7-.7v-1.3c0-.4-.2-.7-.6-.7-2.2-.2-4.2-1.4-5.4-3.4-.3-.6-.6-1.2-.7-1.8-.7-3 .5-6 3.2-7.7.5-.3 1.1-.6 1.7-.7 2.5-.6 5 .1 6.7 1.8.2.2.4.4.5.6.2.4-.1.5-.6.5h-3.2c-.4 0-.7.4-.7.8v1.4c0 .4.3.6.7.6h8.4c.3 0 .6-.2.6-.5V2.1c.1-.4-.2-.7-.5-.7z" },
	  refresh: { "d": "M21.5 1.8h-1.4c-.4 0-.7.4-.7.7v3.3c0 .4-.2.6-.6.3-.1-.2-.2-.3-.4-.5-2.3-2.3-5.6-3.2-8.9-2.6-1.1.2-2.3.7-3.2 1.3-2.8 1.9-4.5 4.9-4.5 8.1 0 2.5.9 5 2.7 6.8 1.8 1.9 4.3 3 7 3 2.3 0 4.6-.8 6.3-2.3.3-.3.3-.7.1-1l-1-1c-.2-.2-.7-.3-.9 0-1.7 1.3-4 1.9-6.2 1.3-.6-.1-1.2-.4-1.8-.7-2.6-1.6-3.8-4.7-3.1-7.7.1-.6.4-1.2.7-1.8 1.3-2.2 3.6-3.5 6-3.5 1.8 0 3.6.8 4.9 2.1.2.2.4.4.5.6.2.4-.2.6-.6.6h-3.2c-.4 0-.7.3-.7.7v1.4c0 .4.3.6.7.6h8.4c.3 0 .6-.2.6-.6V2.5c0-.3-.4-.7-.7-.7z" },
	  relate: { "d": "M16.6 9.2c0-1-.8-1.8-1.8-1.8h-12c-1 0-1.9.8-1.9 1.8v12c0 1 .9 1.9 1.9 1.9h12c1 0 1.8-.9 1.8-1.9v-12zm-3.7 6.5c0 .2-.2.5-.4.5H9.7v2.7c0 .3-.2.5-.5.5h-.9c-.2 0-.5-.2-.5-.5v-2.7H5.1c-.3 0-.5-.3-.5-.5v-.9c0-.3.2-.5.5-.5h2.7v-2.8c0-.2.3-.4.5-.4h.9c.3 0 .5.2.5.4v2.8h2.8c.2 0 .4.2.4.5v.9zm6.9 3.7h-1.3v-2.8h1.3c.3 0 .5-.2.5-.4v-12c0-.3-.2-.5-.5-.5h-12c-.2 0-.4.2-.4.5v1.3H4.6V4.2C4.6 2.4 6 .9 7.8.9h12c1.8 0 3.3 1.5 3.3 3.3v12c0 1.8-1.5 3.2-3.3 3.2z" },
	  remove_formatting: { "d": "M20.8 18.9l2.1-2.1c.2-.2.2-.5 0-.7l-1.3-1.3c-.1-.2-.4-.2-.6 0L18.9 17l-2-2c-.1-.2-.4-.2-.6 0L15 16.3c-.2.2-.2.5 0 .6l2 2-2 2c-.1.1-.1.4 0 .6l1.3 1.3c.2.2.5.2.7 0l1.9-1.9 2.1 2c.2.2.5.2.6 0l1.3-1.3c.2-.1.2-.4 0-.6l-2.1-2.1zM2.2 3.7h5L5.3 14.4c-.1.5.2.8.7.8h2.3c.3 0 .7-.2.7-.5l1.9-11H16c.3 0 .7-.2.7-.6l.2-1.4c.1-.4-.2-.8-.7-.8H2.4c-.3 0-.6.3-.6.6l-.3 1.4c-.1.4.3.8.7.8zm10.7 14.1c0-.4-.3-.7-.7-.7H1.6c-.4 0-.7.3-.7.7v1.4c0 .3.3.6.7.6h10.6c.4 0 .7-.3.7-.6v-1.4z" },
	  remove_link: { "d": "M11.1 16.9c-.3 0-.6-.1-.9-.1-.2-.1-.6-.2-.8-.3-.2 0-.4 0-.5.1l-.2.2c-1.1 1.2-3 1.3-4.3.2-1.3-1.2-1.4-3.2-.1-4.5l3-3c.5-.5.9-.7 1.4-.8.7-.2 1.4-.2 2 .1.3.2.7.4 1 .7.1.1.3.3.4.6.1.2.5.3.7.1L14 9c.2-.2.2-.4 0-.6-.2-.2-.3-.4-.5-.6-.3-.3-.7-.6-1-.8-.6-.4-1.2-.6-1.9-.8-1.2-.2-2.6 0-3.8.6-.4.3-.8.6-1.2 1l-3 2.9c-2.1 2.1-2.3 5.6-.2 7.8 2.2 2.3 5.8 2.4 8 .1l1-1c.3-.2.1-.7-.3-.7zm7.6-6.5c2.2-2.2 2.2-5.9-.1-8-2.3-2.1-5.7-1.9-7.8.2l-1 .9c-.2.3-.1.7.3.8.6 0 1.2.1 1.7.3.2.1.4 0 .5-.1l.2-.2c1.1-1.1 3-1.3 4.3-.2 1.3 1.2 1.4 3.3.1 4.5l-3.1 3.1c-.4.4-.8.6-1.3.8-.7.1-1.4.1-2-.2-.3-.1-.7-.3-1-.7-.1-.1-.3-.3-.4-.5-.1-.3-.5-.3-.7-.1l-1.1 1.1c-.2.2-.2.5-.1.6.2.3.4.5.6.7.3.3.6.5 1 .8.6.3 1.2.6 1.9.7 1.2.2 2.5.1 3.7-.6.5-.2.9-.5 1.3-.9l3-3zm2.1 8.5l2.1-2.1c.2-.2.2-.5 0-.6l-1.3-1.3c-.1-.2-.4-.2-.6 0L18.9 17l-2-2c-.1-.1-.4-.1-.6 0L15 16.3c-.2.2-.2.5 0 .7l2 2-2 1.9c-.1.2-.1.5 0 .7l1.3 1.2c.2.2.5.2.7 0l1.9-1.9L21 23c.2.2.5.2.6 0l1.3-1.3c.2-.2.2-.5 0-.7l-2.1-2.1z" },
	  replace: { "d": "M9.2 17.3c0-.4-.3-.7-.7-.7H1.6c-.4 0-.7.3-.7.7v5.1c0 .4.3.7.7.7h6.9c.4 0 .7-.3.7-.7v-5.1zm-5.5-7.1H1.5c-.5 0-.7.4-.4.6l3.7 3.8c.1.2.4.2.6 0l3.7-3.8c.3-.3 0-.6-.4-.6H6.5c0-2.4 2.3-4.7 4.6-4.7V2.8c-4.2 0-7.4 3.2-7.4 7.4zm15.6-.8c-.2-.2-.5-.2-.7 0L15 13.2c-.3.3-.1.6.4.6h2.2c0 2.8-1.9 4.7-4.7 4.7v2.7c4.2 0 7.5-3.2 7.5-7.4h2.2c.5 0 .7-.4.4-.6l-3.7-3.8zm3.8-7.8c0-.4-.3-.7-.7-.7h-6.9c-.4 0-.7.3-.7.7v5.1c0 .4.3.7.7.7h6.9c.4 0 .7-.3.7-.7V1.6z" },
	  reply: { "d": "M8.9 8.4s-.5-.6-.3-.8L11.2 5c.3-.3.3-.7 0-1l-1-1c-.2-.3-.6-.3-.9 0L3 9.2c-.2.3-.2.7 0 1l6.3 6.2c.3.3.7.3.9 0l1-.9c.3-.3.3-.7 0-1l-2.5-2.6c-.3-.3-.1-.7.2-.8 5.1.2 9.3 4.3 9.6 9.5 0 .4.3.7.7.7h1.4c.4 0 .6-.3.6-.8-.3-6.7-5.4-11.9-12.3-12.1z" },
	  reset_password: { "d": "M19.4 10.6H4.6c-1 0-1.8.8-1.8 1.9v8.7c0 1 .8 1.9 1.8 1.9h14.8c1 0 1.8-.9 1.8-1.9v-8.7c0-1.1-.8-1.9-1.8-1.9zm-5.1 9.9c-.7.5-1.5.7-2.3.7-.3 0-.6 0-.8-.1-1.1-.2-2.1-.8-2.7-1.7l1.6-1c.3.5.8.8 1.4.9.6.2 1.2 0 1.8-.3 1.1-.7 1.3-2.2.6-3.2-.3-.5-.8-.9-1.4-1-.6-.1-1.2 0-1.8.4l-.3.3 1.6 1.6H7.8v-4.2L9 14.1c.2-.2.5-.3.6-.5 1-.6 2.1-.8 3.2-.6 1.1.2 2 .8 2.6 1.7 1.3 2 .8 4.5-1.1 5.8zM4.6 8.4v.1-.1zm.5.4h1.8c.3 0 .5-.2.5-.4v-.1c0-2.6 2.2-4.8 4.9-4.6 2.5.2 4.3 2.3 4.3 4.8v-.1c0 .2.2.4.5.4h1.8c.3 0 .5-.2.5-.4v-.1c0-4.2-3.5-7.6-7.8-7.4-3.9.2-6.9 3.5-7 7.5.1.2.2.4.5.4z" },
	  retweet: { "d": "M23.8 13.3l-1-1c-.2-.3-.6-.3-.9 0l-1.3 1.3c-.3.3-.8.1-.8-.4V5.5c0-1-.8-1.8-1.8-1.8h-6.7c-.4 0-.7.3-.7.7v1.4c0 .3.3.7.7.7h5.1c.4 0 .7.3.7.7v6c0 .5-.5.6-.9.4L15 12.4c-.2-.3-.7-.3-.9 0l-1 1c-.3.3-.3.7 0 1l4.9 4.8c.2.3.6.3.9 0l4.9-4.9c.2-.3.2-.7 0-1zm-11.1 4.2H7.6c-.4 0-.7-.3-.7-.7v-6c0-.5.5-.6.9-.4L9 11.6c.2.3.7.3.9 0l1-.9c.3-.3.3-.7 0-1L6.1 4.8c-.3-.3-.7-.3-1 0L.2 9.7c-.3.3-.3.7 0 1l1 .9c.2.3.6.3.9 0l1.3-1.2c.2-.3.8-.1.8.3v7.8c0 1 .8 1.8 1.8 1.8h6.7c.4 0 .7-.3.7-.7v-1.4c0-.3-.3-.7-.7-.7z" },
	  richtextbulletedlist: { "d": "M3.7 6.2c0 .4-.3.7-.7.7H1.6c-.4 0-.7-.3-.7-.7V4.8c0-.3.3-.6.7-.6H3c.4 0 .7.3.7.6v1.4zm19.4-1.4c0-.3-.3-.6-.7-.6H6.2c-.3 0-.7.3-.7.6v1.4c0 .4.4.7.7.7h16.2c.4 0 .7-.3.7-.7V4.8zM3.7 11.3c0-.4-.3-.7-.7-.7H1.6c-.4 0-.7.3-.7.7v1.4c0 .4.3.7.7.7H3c.4 0 .7-.3.7-.7v-1.4zm17.5 0c0-.4-.3-.7-.7-.7H6.2c-.3 0-.7.3-.7.7v1.4c0 .4.4.7.7.7h14.3c.4 0 .7-.3.7-.7v-1.4zM3.7 17.8c0-.4-.3-.7-.7-.7H1.6c-.4 0-.7.3-.7.7v1.4c0 .3.3.6.7.6H3c.4 0 .7-.3.7-.6v-1.4zm19.4 0c0-.4-.3-.7-.7-.7H6.2c-.3 0-.7.3-.7.7v1.4c0 .3.4.6.7.6h16.2c.4 0 .7-.3.7-.6v-1.4z" },
	  richtextindent: { "d": "M24 5.3c0-.4-.3-.7-.7-.7h-7.8c-.4 0-.7.3-.7.7v1.4c0 .4.3.7.7.7h7.8c.4 0 .7-.3.7-.7V5.3zm-1.8 11.1c0-.4-.4-.7-.7-.7h-6c-.4 0-.7.3-.7.7v1.4c0 .3.3.7.7.7h6c.3 0 .7-.4.7-.7v-1.4zm1.8-5.6c0-.3-.3-.6-.7-.6h-7.8c-.4 0-.7.3-.7.6v1.4c0 .4.3.7.7.7h7.8c.4 0 .7-.3.7-.7v-1.4zM12.9 2.5c0-.3-.3-.7-.7-.7h-1.4c-.3 0-.6.4-.6.7v19c0 .3.3.7.6.7h1.4c.4 0 .7-.4.7-.7v-19zM4.3 7.1c-.2-.3-.6-.1-.6.4v2.7h-3c-.4 0-.7.3-.7.6v1.4c0 .4.3.7.7.7h3v2.7c0 .5.4.7.6.5l3.9-4.2c.1-.2.1-.5 0-.6L4.3 7.1z" },
	  richtextnumberedlist: { "d": "M23.1 3v1.4c0 .4-.3.7-.7.7H9.9c-.3 0-.7-.3-.7-.7V3c0-.4.4-.7.7-.7h12.5c.4 0 .7.3.7.7zM9.9 9.7h8.3c.4 0 .7-.3.7-.7V7.6c0-.4-.3-.7-.7-.7H9.9c-.3 0-.7.3-.7.7V9c0 .4.4.7.7.7zm12.5 4.1H9.9c-.3 0-.7.4-.7.7v1.4c0 .4.4.7.7.7h12.5c.4 0 .7-.3.7-.7v-1.4c0-.3-.3-.7-.7-.7zm-4.2 4.7H9.9c-.3 0-.7.3-.7.7v1.3c0 .4.4.7.7.7h8.3c.4 0 .7-.3.7-.7v-1.3c0-.4-.3-.7-.7-.7zM1.6 3.7h1.2v5.8c0 .3.3.7.7.7h.4c.4 0 .7-.4.7-.7V2.8c0-.5-.4-1-.9-1H1.6c-.4 0-.7.4-.7.7V3c0 .4.3.7.7.7zm3.9 9.2H1.6c-.4 0-.7.3-.7.7v.5c0 .3.3.7.7.7h3v1.8H1.8c-.5 0-.9.4-.9.9v3.7c0 .5.4 1 .9 1h4c.3 0 .7-.4.7-.7V21c0-.4-.4-.7-.7-.7h-3v-1.8h2.7c.5 0 1-.5 1-1v-3.7c0-.5-.5-.9-1-.9z" },
	  richtextoutdent: { "d": "M7.6 10.2h-3V7.4c0-.4-.4-.7-.6-.4L.1 11.2c-.1.2-.1.4 0 .6L4 16c.2.2.6 0 .6-.4v-2.7h3c.3 0 .7-.3.7-.7v-1.4c0-.3-.4-.6-.7-.6zM24 5.3c0-.4-.3-.7-.7-.7h-7.8c-.4 0-.7.3-.7.7v1.4c0 .4.3.7.7.7h7.8c.4 0 .7-.3.7-.7V5.3zm-1.8 11.1c0-.4-.4-.7-.7-.7h-6c-.4 0-.7.3-.7.7v1.4c0 .3.3.7.7.7h6c.3 0 .7-.4.7-.7v-1.4zm1.8-5.6c0-.3-.3-.6-.7-.6h-7.8c-.4 0-.7.3-.7.6v1.4c0 .4.3.7.7.7h7.8c.4 0 .7-.3.7-.7v-1.4zM12.9 2.5c0-.3-.3-.7-.7-.7h-1.4c-.3 0-.6.4-.6.7v19c0 .3.3.7.6.7h1.4c.4 0 .7-.4.7-.7v-19z" },
	  right: { "d": "M6.5 20.2V3.8c0-.4.6-.8 1-.4l9.8 8c.3.3.3.9 0 1.2l-9.8 8c-.4.4-1 .1-1-.4z" },
	  right_align_text: { "d": "M21.5 2.3h-19c-.3 0-.7.3-.7.7v1.4c0 .4.4.7.7.7h19c.3 0 .7-.3.7-.7V3c0-.4-.4-.7-.7-.7zm0 5.5H6.2c-.3 0-.7.4-.7.7v1.4c0 .4.4.7.7.7h15.3c.3 0 .7-.3.7-.7V8.5c0-.3-.4-.7-.7-.7zm0 11.1H6.2c-.3 0-.7.3-.7.7V21c0 .4.4.7.7.7h15.3c.3 0 .7-.3.7-.7v-1.4c0-.4-.4-.7-.7-.7zm0-5.5h-19c-.3 0-.7.3-.7.7v1.4c0 .3.4.7.7.7h19c.3 0 .7-.4.7-.7v-1.4c0-.4-.4-.7-.7-.7z" },
	  rotate: { "d": "M22.4.9H21c-.4 0-.7.3-.7.7v3.2c0 .5-.5.7-.7.4-2.2-2.4-5.3-3.6-8.7-3.3-1.2.1-2.3.5-3.4 1-.5.3-1.1.6-1.5 1-.4.2-.4.7-.1 1l.9 1c.3.2.6.3.9.1.6-.4 1.2-.7 1.8-1 .3-.1.6-.2.9-.2 2.9-.6 5.7.6 7.3 2.4.5.7.1 1.1-.3 1.1h-3.3c-.3 0-.7.3-.7.7v1.4c0 .4.4.7.7.7h8.4c.3 0 .6-.3.6-.6V1.6c0-.4-.3-.7-.7-.7zm-4.2 16.4c-.3-.3-.7-.3-1 0-.7.7-1.6 1.3-2.7 1.7-.2.1-.6.2-.9.2-2.9.6-5.7-.6-7.2-2.4-.6-.7-.2-1.1.3-1.1h3.2c.4 0 .7-.3.7-.7v-1.4c0-.4-.3-.7-.7-.7H1.5c-.3 0-.6.3-.6.6v8.9c0 .4.3.7.7.7H3c.4 0 .7-.3.7-.7v-3.2c0-.5.5-.7.7-.4 2.2 2.4 5.3 3.6 8.7 3.3 1.2-.1 2.3-.5 3.4-1 1-.5 1.9-1.2 2.6-1.9.3-.3.3-.7 0-1l-.9-.9z" },
	  rows: { "d": "M21.5 6.5h-19c-.3 0-.7-.4-.7-.7V4.4c0-.4.4-.7.7-.7h19c.3 0 .7.3.7.7v1.4c0 .3-.4.7-.7.7zm0 6.8h-19c-.3 0-.7-.3-.7-.7v-1.3c0-.4.4-.7.7-.7h19c.3 0 .7.3.7.7v1.4c0 .3-.4.6-.7.6zm0 7h-19c-.3 0-.7-.3-.7-.7v-1.4c0-.3.4-.7.7-.7h19c.3 0 .7.4.7.7v1.4c0 .4-.4.7-.7.7z" },
	  salesforce1: { "d": "M10 5.5c.8-.8 1.9-1.3 3.1-1.3 1.5 0 2.9.9 3.7 2.2.6-.3 1.3-.5 2-.5 2.9 0 5.2 2.3 5.2 5.2s-2.3 5.1-5.2 5.1h-1c-.6 1.1-1.9 1.9-3.3 1.9-.6 0-1.2-.1-1.7-.4-.6 1.5-2.1 2.6-3.9 2.6-1.9 0-3.5-1.1-4.1-2.8-.3 0-.6.1-.8.1-2.2 0-4-1.8-4-4 0-1.5.7-2.8 1.9-3.5-.2-.5-.3-1.2-.3-1.8 0-2.6 2-4.7 4.6-4.7 1.6.1 3 .8 3.8 1.9" },
	  search: { "d": "M22.9 20.9l-6.2-6.1c1.3-1.8 1.9-4 1.6-6.4-.6-3.9-3.8-7.1-7.8-7.4C5 .4.4 5 1 10.5c.3 4 3.5 7.3 7.4 7.8 2.4.3 4.6-.3 6.4-1.5l6.1 6.1c.3.3.7.3 1 0l.9-1c.3-.3.3-.7.1-1zM3.7 9.6c0-3.2 2.7-5.9 5.9-5.9s6 2.7 6 5.9-2.7 6-6 6-5.9-2.6-5.9-6z" },
	  settings: { "d": "M12 8.8c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.3 3.2 3.3 3.3-1.5 3.3-3.3-1.5-3.2-3.3-3.2zm9.7 6.2L20 13.5c.1-.5.2-1 .2-1.5s-.1-1.1-.2-1.6L21.7 9c.6-.5.8-1.3.4-2l-.7-1.3c-.3-.4-.8-.7-1.4-.7-.2 0-.3 0-.5.1l-2.1.8c-.8-.8-1.8-1.3-2.7-1.6l-.4-2.2c-.1-.7-.8-1.1-1.5-1.1h-1.5c-.7 0-1.4.4-1.5 1.1l-.4 2.1c-1 .4-1.9.9-2.8 1.6L4.5 5c-.2 0-.3-.1-.5-.1-.5 0-1 .3-1.3.8L1.9 7c-.3.6-.2 1.4.4 1.9L4 10.3c-.1.5-.1 1.1-.1 1.6 0 .6 0 1.1.1 1.6l-1.7 1.4c-.5.5-.7 1.3-.4 1.9l.8 1.3c.3.5.8.8 1.3.8.2 0 .4-.1.5-.1l2.1-.8c.9.7 1.8 1.2 2.8 1.6l.3 2.2c.2.7.8 1.2 1.6 1.2h1.4c.8 0 1.4-.5 1.6-1.3l.3-2.2c1.1-.3 2.1-.9 2.9-1.7l2 .8c.2 0 .3.1.5.1.6 0 1.1-.3 1.4-.7l.7-1.2c.4-.6.2-1.4-.4-1.8zM12 17.1c-2.8 0-5-2.2-5-5.1s2.2-5 5-5 5.1 2.2 5.1 5-2.2 5.1-5.1 5.1z" },
	  setup: { "d": "M21.6 15l-1.7-1.5c.1-.5.1-1 .1-1.5s0-1.1-.1-1.6L21.6 9c.6-.5.7-1.3.4-2l-.8-1.3c-.2-.5-.8-.8-1.3-.8-.2 0-.4.1-.5.1l-2.1.8c-.8-.7-1.7-1.2-2.7-1.6l-.3-2.1c-.2-.8-.8-1.2-1.6-1.2h-1.4c-.8 0-1.4.4-1.6 1.2l-.3 2.1c-1 .3-1.9.9-2.8 1.6l-2-.8c-.2-.1-.3-.1-.5-.1-.5 0-1.1.3-1.3.7L2 6.9c-.3.7-.2 1.5.4 2l1.7 1.4c-.1.5-.1 1.1-.1 1.6s0 1 .1 1.5l-1.7 1.5c-.6.4-.7 1.3-.4 1.9l.8 1.4c.2.4.8.7 1.3.7.2 0 .4 0 .5-.1l2.1-.8c.8.8 1.7 1.3 2.7 1.6l.3 2.2c.2.8.8 1.3 1.6 1.3h1.4c.8 0 1.4-.6 1.6-1.3l.3-2.2c1.1-.4 2-1 2.8-1.7l2 .7c.2.1.4.1.5.1.6 0 1.1-.2 1.4-.7l.7-1.2c.3-.6.2-1.4-.4-1.8zM12 17.1c-2.7 0-5-2.2-5-5.1s2.2-5 5-5 5.1 2.2 5.1 5-2.3 5.1-5.1 5.1zm1.4-8.8h-2.1c-.4 0-.6.2-.7.5l-1.3 3.3c-.1.2.1.5.3.5h2.2l-.8 2.8c-.1.2.3.4.4.2l3.3-3.8c.3-.3.1-.6-.3-.6h-1.6l1.5-2.3c.1-.2-.1-.5-.4-.5h-.5z" },
	  setup_assistant_guide: { "d": "M5.3 11.5c0-.2-.2-.3-.4-.2l-2 1.7c-.1.1-.1.2-.1.4v7.3c0 .5.6.7 1 .4l3.4-2.6c.1-.1.1-.2 0-.4-.8-1.2-1.6-3.3-1.9-6.6zm4.5 6.9c.1 0 .2.1.3.1h3.8c.1 0 .2-.1.3-.1.5-.4 2.7-2.2 2.7-8.5 0-2.9-.8-5-1.8-6.3C13.7 1.5 12 .9 12 .9s-1.8.6-3.2 2.7C7.8 5 7.1 7 7.1 9.9c0 6.3 2.1 8.1 2.7 8.5zM12 6c1.5 0 2.7 1.2 2.7 2.8s-1.2 2.7-2.7 2.7-2.8-1.2-2.8-2.7S10.4 6 12 6zm9.1 7l-2-1.7c-.2-.1-.4 0-.4.2-.3 3.3-1.1 5.4-1.9 6.7v.3l3.4 2.6c.4.4 1 .1 1-.3v-7.4c0-.2 0-.3-.1-.4zm-6.2 7.5c-.1-.1-.3-.2-.4-.2H9.4c-.1 0-.3.1-.4.2-.1.3-.4.8-.6 1.5-.1.5.3 1.1.9 1.1h5.3c.6 0 1-.6.9-1.1-.2-.7-.5-1.2-.6-1.5z" },
	  share: { "d": "M22.4 13.8H21c-.4 0-.7.4-.7.7v5.1c0 .4-.3.7-.7.7H4.4c-.4 0-.7-.3-.7-.7V9.9c0-.3.3-.7.7-.7h1.8c.4 0 .7-.3.7-.7V7.2c0-.4-.3-.7-.7-.7H2.8c-1 0-1.9.8-1.9 1.8v12.9c0 1 .9 1.9 1.9 1.9h18.4c1 0 1.9-.9 1.9-1.9v-6.7c0-.3-.3-.7-.7-.7zm-6.7-7.3c-4.6 0-8.8 4.1-9.2 8.9 0 .4.3.8.7.8h1.4c.4 0 .6-.3.7-.6.3-3.5 3.3-6.4 6.9-6.4h.7c.4 0 .6.5.3.8l-2.5 2.6c-.3.3-.3.7 0 1l.9.9c.3.3.7.3 1 0l6.3-6.2c.3-.3.3-.7 0-1l-6.2-6.2c-.3-.3-.7-.3-1 0l-1 1c-.3.3-.3.7 0 .9l2.6 2.6c.2.3.1.8-.4.8l-1.2.1z" },
	  shield: { "d": "M2.2 6.5h19.6c.4 0 .8-.5.7-1-.5-1.5-1.1-2.9-2-4.1-.3-.4-.8-.4-1.1-.1-.8.8-2.1 1.3-3.4 1.3-1.4 0-2.6-.6-3.5-1.5-.3-.3-.8-.3-1.1 0-.9.9-2.1 1.5-3.5 1.5-1.3 0-2.5-.5-3.4-1.3-.3-.3-.9-.2-1.1.1-.9 1.2-1.6 2.6-2 4.1 0 .5.4 1 .8 1zm20.9 2.9c0-.4-.3-.6-.8-.6H1.7c-.5 0-.8.2-.8.6v.2c0 6.9 4.8 12.6 11.1 13.5 6.3-.9 11.1-6.6 11.1-13.5v-.2z" },
	  side_list: { "d": "M22.4 1.8H9.9c-.3 0-.7.4-.7.7v19c0 .3.4.7.7.7h12.5c.4 0 .7-.4.7-.7v-19c0-.3-.3-.7-.7-.7zm-15.7 0H1.6c-.4 0-.7.4-.7.7v2.3c0 .4.3.7.7.7h5.1c.4 0 .7-.3.7-.7V2.5c0-.3-.3-.7-.7-.7zm0 5.6H1.6c-.4 0-.7.3-.7.7v2.3c0 .4.3.7.7.7h5.1c.4 0 .7-.3.7-.7V8.1c0-.4-.3-.7-.7-.7zm0 5.5H1.6c-.4 0-.7.3-.7.7v2.3c0 .4.3.7.7.7h5.1c.4 0 .7-.3.7-.7v-2.3c0-.4-.3-.7-.7-.7zm0 5.6H1.6c-.4 0-.7.3-.7.7v2.3c0 .3.3.7.7.7h5.1c.4 0 .7-.4.7-.7v-2.3c0-.4-.3-.7-.7-.7z" },
	  signpost: { "d": "M22.8 4.2l-1.9-1.5c-.3-.2-.5-.3-.9-.3h-6.5v-.7c0-.5-.3-.8-.8-.8h-1.4c-.5 0-.8.3-.8.8v.7H3.1c-.4 0-.7.3-.7.7v3c0 .4.3.7.7.7H20c.4 0 .7-.1.9-.2l1.9-1.5c.4-.3.4-.7 0-.9zm-1.9 6.3h-7.4V9.4c0-.2-.2-.4-.4-.4h-2.2c-.2 0-.4.2-.4.4v1.1H4c-.4 0-.7.1-.9.3l-1.9 1.4c-.4.3-.4.7 0 1l1.9 1.4c.3.2.5.3.9.3h16.9c.4 0 .7-.3.7-.7v-3c0-.4-.3-.7-.7-.7zM13.5 20v-2.5c0-.2-.2-.3-.4-.3h-2.2c-.2 0-.4.1-.4.3V20c-1.5.4-2.3 1.3-2.5 2.4-.1.3.2.7.5.7h7c.4 0 .7-.3.6-.7-.3-1.1-1.1-2-2.6-2.4z" },
	  sms: { "d": "M12 1.8C5.9 1.8 1 6.4 1 12c0 1.7.5 3.4 1.3 4.8.1.3.2.6.1.8l-1.4 4c-.2.3.2.6.6.6l3.9-1.6c.3-.1.5 0 .8.1 1.7.9 3.7 1.5 5.8 1.5 6 0 11-4.6 11-10.2C23 6.4 18.1 1.8 12 1.8zM7.6 13.7c-.2.2-.3.4-.5.6s-.4.2-.7.3c-.2.1-.5.1-.8.1-.3 0-.7 0-1-.2-.3-.1-.6-.3-.9-.6l-.1-.1s0-.1.1-.2l.8-.7c.1-.1.2-.1.2 0s.1.1.1.1c.1.2.2.2.4.3.2.2.4.2.7.1.1 0 .1 0 .2-.1l.2-.1V13c0-.2 0-.2-.1-.3-.1-.1-.2-.1-.4-.2s-.4-.1-.6-.2l-.6-.3c-.3-.1-.4-.3-.5-.5-.2-.2-.3-.5-.3-.8 0-.4.1-.6.2-.9.2-.2.3-.4.5-.5.2-.2.4-.3.7-.3.6-.2 1.1-.2 1.7 0 .3.1.5.3.7.4l.1.1c.1 0 .1.1 0 .2l-.7.7c-.1.1-.3.1-.4 0l-.1-.1c-.3-.1-.6-.2-.9-.1h-.2l-.1.2v.2c0 .1 0 .2.1.2 0 .1.2.1.4.2s.3.2.6.2l.6.3c.2.1.4.3.5.5.2.2.3.5.3.9 0 .3-.1.5-.2.8zm7.6.6c0 .3-.2.5-.5.5h-.4c-.3 0-.5-.2-.5-.5v-2.7c0-.3-.3-.3-.4-.1l-.8 2.1c0 .2-.2.2-.4.2h-.3c-.2 0-.4-.1-.5-.2l-.8-2.1c-.1-.2-.4-.2-.4.1v2.7c0 .3-.3.5-.6.5h-.4c-.3 0-.4-.2-.4-.5V9.2c0-.2.2-.4.4-.4h1.2c.2 0 .4.1.4.2l.9 2.4c.1.2.4.2.4 0l1-2.4c0-.1.2-.2.4-.2h1.2c.3 0 .5.2.5.4v5.1zm4.9-.6c-.2.2-.3.5-.5.6-.2.1-.4.3-.7.4s-.5.1-.8.1c-.4 0-.7-.1-1-.2-.3-.2-.7-.3-.9-.6l-.1-.1c0-.1 0-.1.1-.2l.7-.7c.1-.1.2-.1.3-.1s.1.2.1.2l.3.3c.3.1.5.1.8.1.1-.1.2-.1.2-.1l.1-.2.1-.1c0-.2-.1-.3-.1-.3-.1-.1-.2-.2-.4-.2s-.4-.2-.6-.2c-.3-.1-.5-.2-.7-.3-.2-.1-.4-.3-.5-.5-.2-.2-.3-.5-.3-.9 0-.3.1-.6.2-.8.2-.3.3-.4.5-.6.2-.1.5-.3.7-.3.6-.1 1.1-.1 1.7 0 .3.1.5.3.7.5l.1.1c.1 0 .1.2 0 .3l-.7.7c-.1.1-.2.1-.3 0l-.2-.2c-.3-.1-.6-.2-.9-.1 0 0-.1 0-.1.1l-.2.1v.2c0 .1 0 .2.1.2.1.1.2.2.4.3.2 0 .4.1.6.2.2 0 .4.1.6.2.3.2.4.4.6.5.1.3.2.5.2.9.1.2 0 .5-.1.7z" },
	  snippet: { "d": "M6.7 2.8H1.6c-.4 0-.7.3-.7.7v6c0 .3.3.7.7.7h5.1c.4 0 .7-.4.7-.7v-6c0-.4-.3-.7-.7-.7zm15.7 0H9.9c-.3 0-.7.3-.7.7v1.3c0 .4.4.7.7.7h12.5c.4 0 .7-.3.7-.7V3.5c0-.4-.3-.7-.7-.7zM9.9 10.2h7.9c.3 0 .7-.4.7-.7V8.1c0-.4-.4-.7-.7-.7H9.9c-.3 0-.7.3-.7.7v1.4c0 .3.4.7.7.7zm-3.2 3.6H1.6c-.4 0-.7.4-.7.7v6c0 .4.3.7.7.7h5.1c.4 0 .7-.3.7-.7v-6c0-.3-.3-.7-.7-.7zm15.7 0H9.9c-.3 0-.7.4-.7.7v1.4c0 .4.4.7.7.7h12.5c.4 0 .7-.3.7-.7v-1.4c0-.3-.3-.7-.7-.7zm-4.6 4.7H9.9c-.3 0-.7.3-.7.7v1.3c0 .4.4.7.7.7h7.9c.3 0 .7-.3.7-.7v-1.3c0-.4-.4-.7-.7-.7z" },
	  socialshare: { "d": "M18.9 14.8c-1.2 0-2.3.5-3 1.3l-6.8-3.4c.1-.2.1-.5.1-.7 0-.3-.1-.6-.1-.8l6.8-3.4c.7.9 1.8 1.4 3 1.4 2.3 0 4.2-1.9 4.2-4.2S21.2.9 18.9.9 14.8 2.7 14.8 5v.3l-7 3.5c-.8-.6-1.7-1-2.8-1C2.7 7.8.9 9.7.9 12s1.8 4.2 4.1 4.2c1.1 0 2-.4 2.8-1.1l6.9 3.5v.3c0 2.3 1.9 4.2 4.2 4.2s4.1-1.9 4.1-4.2-1.8-4.1-4.1-4.1z" },
	  sort: { "d": "M12.7 7.4c.3-.3.3-.7 0-1L7.4 1.1c-.2-.3-.7-.3-.9 0L1.2 6.4c-.3.3-.3.7 0 1l.9 1c.3.2.7.2 1 0l1.7-1.7c.2-.3.7-.1.7.3v9.8c0 .4.4.7.7.7h1.4c.4 0 .7-.4.7-.7V7c0-.4.5-.6.8-.3l1.7 1.7c.2.2.6.2.9 0l1-1zm10.1 9.2l-.9-.9c-.3-.3-.7-.3-1 0l-1.7 1.7c-.2.2-.7 0-.7-.4V7.2c0-.4-.4-.7-.7-.7h-1.4c-.4 0-.7.3-.7.7v9.7c0 .5-.5.6-.8.4l-1.7-1.7c-.2-.3-.6-.3-.9 0l-1 1c-.3.3-.3.7 0 1l5.3 5.3c.3.3.7.3 1 0l5.3-5.3c.2-.3.2-.8-.1-1z" },
	  spinner: { "d": "M7.4 12.7v-1.4c0-.4-.3-.7-.7-.7H1.6c-.4 0-.7.3-.7.7v1.4c0 .4.3.7.7.7h5.1c.4 0 .7-.3.7-.7zm.9 2.1c-.3-.3-.7-.3-1 0l-3.6 3.6c-.3.2-.3.7 0 .9l1 1c.2.3.7.3.9 0l3.6-3.6c.3-.3.3-.7 0-1l-.9-.9zm7.4-5.6c.3.3.7.3 1 0l3.6-3.6c.3-.2.3-.7 0-.9l-1-1c-.2-.3-.7-.3-.9 0l-3.6 3.5c-.3.3-.3.7 0 1l.9 1zM5.6 3.7c-.2-.3-.7-.3-.9 0l-1 1c-.3.2-.3.7 0 .9l3.6 3.6c.3.3.7.3 1 0l.9-.9c.3-.3.3-.7 0-1L5.6 3.7zm11.2 11.1c-.3-.3-.7-.3-1 0l-1 .9c-.3.3-.3.7 0 1l3.6 3.6c.2.3.7.3.9 0l1-1c.3-.2.3-.7 0-.9l-3.5-3.6zm-4.1 1.8h-1.4c-.4 0-.7.3-.7.7v5.1c0 .4.3.7.7.7h1.4c.4 0 .7-.3.7-.7v-5.1c0-.4-.3-.7-.7-.7zm9.7-6h-5.1c-.4 0-.7.3-.7.7v1.4c0 .4.3.7.7.7h5.1c.4 0 .7-.3.7-.7v-1.4c0-.4-.3-.7-.7-.7zM12.7.9h-1.4c-.4 0-.7.3-.7.7v5.1c0 .4.3.7.7.7h1.4c.4 0 .7-.3.7-.7V1.6c0-.4-.3-.7-.7-.7z" },
	  standard_objects: { "d": "M21.3 18l-8.7 4.9c-.4.3-1 .3-1.5 0L2.5 18c-.4-.2-.4-.7 0-.9l2-1.1c.2-.1.3-.1.5 0l5.2 3c.6.2 1.1.4 1.7.4s1.2-.2 1.7-.4l5.2-3c.2-.1.4-.1.5 0l2 1.1c.4.2.4.7 0 .9zm0-5.6l-8.7 5c-.4.2-1 .2-1.5 0l-8.6-5c-.4-.2-.4-.6 0-.8l2-1.2c.2-.1.3-.1.5 0l5.2 3c.6.3 1.1.4 1.7.4s1.2-.1 1.7-.4l5.2-3c.2-.1.4-.1.5 0l2 1.2c.4.2.4.6 0 .8zm-10.1-.6L2.5 6.9c-.3-.2-.3-.7 0-.9l8.7-4.9c.5-.3 1.1-.3 1.5 0L21.4 6c.4.2.4.7 0 .9l-8.7 4.9c-.4.2-1 .2-1.5 0z" },
	  stop: { "d": "M3.7 3.7h16.6v16.6H3.7V3.7z" },
	  strikethrough: { "d": "M5.6 8.4c-.1-.5-.2-1.1-.2-1.6 0-.6.2-1.3.5-2 .2-.6.7-1.3 1.3-1.8.5-.6 1.3-1.1 2.2-1.5.9-.3 2-.6 3.2-.6 1.2 0 2.3.2 3.4.5.8.3 1.6.7 2.3 1.4.3.2.3.7-.1 1L17 4.9c-.3.3-.7.3-1 0-.3-.3-.7-.6-1.1-.8-.6-.3-1.4-.5-2.3-.5-.7 0-1.4.1-1.9.3s-1 .5-1.3.9-.6.6-.7 1-.2.8-.2 1c0 .5.1 1 .2 1.3.2.3-.1.7-.4.7H6c-.2 0-.4-.3-.4-.4zm12.8 6.8h-2.3c-.3 0-.5.4-.4.6.1.3.2.7.2 1 0 .6-.2 1.1-.4 1.6-.3.4-.6.8-1 1.1-.4.3-.9.5-1.4.6-.5.2-1 .3-1.5.3-.8 0-1.7-.2-2.5-.6-.6-.3-1.1-.6-1.5-1.2-.3-.2-.7-.3-1 0l-1.3 1.1c-.3.2-.3.7 0 .9.6.8 1.4 1.3 2.4 1.7 1.2.5 2.5.7 3.9.7 1 0 2-.2 2.8-.5.9-.3 1.7-.7 2.4-1.3.6-.5 1.2-1.2 1.6-2 .3-.9.6-1.8.6-2.8 0-.3 0-.6-.1-.9-.1-.1-.3-.3-.5-.3zM23 11c-.1-.2-.3-.4-.6-.4H1.6c-.3 0-.5.2-.6.4-.1.1-.1.2-.1.3v1.3c0 .4.3.8.7.8h20.8c.4 0 .7-.4.7-.8v-1.3c0-.1 0-.2-.1-.3z" },
	  success: { "d": "M12 .9C5.9.9.9 5.9.9 12s5 11.1 11.1 11.1 11.1-5 11.1-11.1S18.1.9 12 .9zm6.2 8.3l-7.1 7.2c-.3.3-.7.3-1 0l-3.9-3.9c-.2-.3-.2-.8 0-1.1l1-1c.3-.2.8-.2 1.1 0l2 2.1c.2.2.5.2.7 0l5.2-5.3c.2-.3.7-.3 1 0l1 1c.3.2.3.7 0 1z" },
	  summary: { "d": "M22.4.9H1.6c-.4 0-.7.3-.7.7v2.3c0 .4.3.7.7.7h20.8c.4 0 .7-.3.7-.7V1.6c0-.4-.3-.7-.7-.7zm0 5.6H6.2c-.3 0-.7.3-.7.7v1.3c0 .4.4.7.7.7h16.2c.4 0 .7-.3.7-.7V7.2c0-.4-.3-.7-.7-.7zm0 9.2H6.2c-.3 0-.7.3-.7.7v1.4c0 .3.4.7.7.7h16.2c.4 0 .7-.4.7-.7v-1.4c0-.4-.3-.7-.7-.7zm0 4.6h-18c-.4 0-.7-.3-.7-.7v-3.2c0-.4-.3-.7-.7-.7H1.6c-.4 0-.7.3-.7.7v6c0 .4.3.7.7.7h20.8c.4 0 .7-.3.7-.7V21c0-.4-.3-.7-.7-.7zm0-9.2h-18c-.4 0-.7-.3-.7-.7V7.2c0-.4-.3-.7-.7-.7H1.6c-.4 0-.7.3-.7.7v6c0 .3.3.6.7.6h20.8c.4 0 .7-.3.7-.6v-1.4c0-.4-.3-.7-.7-.7z" },
	  summarydetail: { "d": "M22.4.9H1.6c-.4 0-.7.3-.7.7v2.3c0 .4.3.7.7.7h20.8c.4 0 .7-.3.7-.7V1.6c0-.4-.3-.7-.7-.7zM9.5 6.5H6.2c-.3 0-.7.3-.7.7v1.3c0 .4.4.7.7.7h3.3c.3 0 .7-.3.7-.7V7.2c0-.4-.4-.7-.7-.7zm6.4 0h-3.2c-.4 0-.7.3-.7.7v1.3c0 .4.3.7.7.7h3.2c.4 0 .7-.3.7-.7V7.2c0-.4-.3-.7-.7-.7zm6.5 0h-3.2c-.4 0-.7.3-.7.7v1.3c0 .4.3.7.7.7h3.2c.4 0 .7-.3.7-.7V7.2c0-.4-.3-.7-.7-.7zM9.5 15.7H6.2c-.3 0-.7.3-.7.7v1.4c0 .3.4.7.7.7h3.3c.3 0 .7-.4.7-.7v-1.4c0-.4-.4-.7-.7-.7zm6.4 0h-3.2c-.4 0-.7.3-.7.7v1.4c0 .3.3.7.7.7h3.2c.4 0 .7-.4.7-.7v-1.4c0-.4-.3-.7-.7-.7zm6.5 0h-3.2c-.4 0-.7.3-.7.7v1.4c0 .3.3.7.7.7h3.2c.4 0 .7-.4.7-.7v-1.4c0-.4-.3-.7-.7-.7zm0 4.6h-18c-.4 0-.7-.3-.7-.7v-3.2c0-.4-.3-.7-.7-.7H1.6c-.4 0-.7.3-.7.7v6c0 .4.3.7.7.7h20.8c.4 0 .7-.3.7-.7V21c0-.4-.3-.7-.7-.7zm0-9.2h-18c-.4 0-.7-.3-.7-.7V7.2c0-.4-.3-.7-.7-.7H1.6c-.4 0-.7.3-.7.7v6c0 .3.3.6.7.6h20.8c.4 0 .7-.3.7-.6v-1.4c0-.4-.3-.7-.7-.7z" },
	  "switch": { "d": "M22 8.2l-9.5 9.6c-.3.2-.7.2-1 0L2 8.2c-.2-.3-.2-.7 0-1l1-1c.3-.3.8-.3 1.1 0l7.4 7.5c.3.3.7.3 1 0l7.4-7.5c.3-.3.8-.3 1.1 0l1 1c.2.3.2.7 0 1z" },
	  table: { "d": "M21.5.9h-19c-.3 0-.7.3-.7.7v2.3c0 .4.4.7.7.7h19c.3 0 .7-.3.7-.7V1.6c0-.4-.4-.7-.7-.7zM6.7 6.5H2.5c-.3 0-.7.3-.7.7v1.3c0 .4.4.7.7.7h4.2c.4 0 .7-.3.7-.7V7.2c0-.4-.3-.7-.7-.7zm7.4 0H9.9c-.3 0-.7.3-.7.7v1.3c0 .4.4.7.7.7h4.2c.3 0 .7-.3.7-.7V7.2c0-.4-.4-.7-.7-.7zm7.4 0h-4.2c-.4 0-.7.3-.7.7v1.3c0 .4.3.7.7.7h4.2c.3 0 .7-.3.7-.7V7.2c0-.4-.4-.7-.7-.7zM6.7 11.1H2.5c-.3 0-.7.3-.7.7v1.4c0 .3.4.6.7.6h4.2c.4 0 .7-.3.7-.6v-1.4c0-.4-.3-.7-.7-.7zm7.4 0H9.9c-.3 0-.7.3-.7.7v1.4c0 .3.4.6.7.6h4.2c.3 0 .7-.3.7-.6v-1.4c0-.4-.4-.7-.7-.7zm7.4 0h-4.2c-.4 0-.7.3-.7.7v1.4c0 .3.3.6.7.6h4.2c.3 0 .7-.3.7-.6v-1.4c0-.4-.4-.7-.7-.7zM6.7 15.7H2.5c-.3 0-.7.3-.7.7v1.4c0 .3.4.7.7.7h4.2c.4 0 .7-.4.7-.7v-1.4c0-.4-.3-.7-.7-.7zm7.4 0H9.9c-.3 0-.7.3-.7.7v1.4c0 .3.4.7.7.7h4.2c.3 0 .7-.4.7-.7v-1.4c0-.4-.4-.7-.7-.7zm7.4 0h-4.2c-.4 0-.7.3-.7.7v1.4c0 .3.3.7.7.7h4.2c.3 0 .7-.4.7-.7v-1.4c0-.4-.4-.7-.7-.7zM6.7 20.3H2.5c-.3 0-.7.3-.7.7v1.4c0 .4.4.7.7.7h4.2c.4 0 .7-.3.7-.7V21c0-.4-.3-.7-.7-.7zm7.4 0H9.9c-.3 0-.7.3-.7.7v1.4c0 .4.4.7.7.7h4.2c.3 0 .7-.3.7-.7V21c0-.4-.4-.7-.7-.7zm7.4 0h-4.2c-.4 0-.7.3-.7.7v1.4c0 .4.3.7.7.7h4.2c.3 0 .7-.3.7-.7V21c0-.4-.4-.7-.7-.7z" },
	  tablet_landscape: { "d": "M23.1 4.6c0-1-.9-1.8-1.9-1.8H2.8c-1 0-1.9.8-1.9 1.8v14.8c0 1 .9 1.8 1.9 1.8h18.4c1 0 1.9-.8 1.9-1.8V4.6zM3.2 13.4c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.7 1.4-1.4 1.4zm17.1 4.4c0 .3-.3.7-.7.7H6.2c-.3 0-.7-.4-.7-.7V6.2c0-.3.4-.7.7-.7h13.4c.4 0 .7.4.7.7v11.6z" },
	  tablet_portrait: { "d": "M21.2 2.8c0-1-.8-1.9-1.8-1.9H4.6c-1 0-1.8.9-1.8 1.9v18.4c0 1 .8 1.9 1.8 1.9h14.8c1 0 1.8-.9 1.8-1.9V2.8zM12 22.2c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.3.6 1.3 1.4-.6 1.4-1.3 1.4zm6.5-4.4c0 .3-.4.7-.7.7H6.2c-.3 0-.7-.4-.7-.7V4.4c0-.4.4-.7.7-.7h11.6c.3 0 .7.3.7.7v13.4z" },
	  text_background_color: { "d": "M12 7.4l1.9 4.6H9.8l1.8-4.6h.4zm10.2-3.7v16.6c0 1-.9 1.9-1.9 1.9H3.7c-1 0-1.9-.9-1.9-1.9V3.7c0-1 .9-1.9 1.9-1.9h16.6c1 0 1.9.9 1.9 1.9zm-2.6 15.1L14.1 5.1c-.2-.3-.4-.5-.7-.5h-3.3c-.3 0-.5.2-.6.5L4.4 18.8c-.1.3.1.6.4.6h1.9c.3 0 .5-.2.6-.5l1.5-4.1H15l1.6 4.1c.1.3.4.5.7.5h1.9c.3 0 .5-.3.4-.6z" },
	  text_color: { "d": "M4.8 16.6h1.9c.3 0 .5-.2.6-.5L8.8 12H15l1.6 4.1c.1.3.4.5.7.5h1.9c.3 0 .5-.3.4-.6L14 2.3c-.1-.3-.3-.5-.6-.5h-3.2c-.3 0-.6.2-.7.5L4.4 16c-.1.3.1.6.4.6zm6.8-12h.4l2 4.6H9.8l1.8-4.6zm10.8 14.8H1.6c-.4 0-.7.3-.7.7v1.4c0 .3.3.7.7.7h20.8c.4 0 .7-.4.7-.7v-1.4c0-.4-.3-.7-.7-.7z" },
	  threedots: { "d": "M3.7 9.2c1.5 0 2.8 1.3 2.8 2.8s-1.3 2.8-2.8 2.8S.9 13.5.9 12s1.3-2.8 2.8-2.8zm8.3 0c1.5 0 2.8 1.3 2.8 2.8s-1.3 2.8-2.8 2.8-2.8-1.3-2.8-2.8 1.3-2.8 2.8-2.8zm8.3 0c1.5 0 2.8 1.3 2.8 2.8s-1.3 2.8-2.8 2.8-2.8-1.3-2.8-2.8 1.3-2.8 2.8-2.8z" },
	  tile_card_list: { "d": "M6.7 1.8H2.5c-.3 0-.7.4-.7.7v7.9c0 .4.4.7.7.7h4.2c.4 0 .7-.3.7-.7V2.5c0-.3-.3-.7-.7-.7zm7.4 0H9.9c-.3 0-.7.4-.7.7v7.9c0 .4.4.7.7.7h4.2c.3 0 .7-.3.7-.7V2.5c0-.3-.4-.7-.7-.7zm7.4 0h-4.2c-.4 0-.7.4-.7.7v7.9c0 .4.3.7.7.7h4.2c.3 0 .7-.3.7-.7V2.5c0-.3-.4-.7-.7-.7zM6.7 12.9H2.5c-.3 0-.7.3-.7.7v7.9c0 .3.4.7.7.7h4.2c.4 0 .7-.4.7-.7v-7.9c0-.4-.3-.7-.7-.7zm7.4 0H9.9c-.3 0-.7.3-.7.7v7.9c0 .3.4.7.7.7h4.2c.3 0 .7-.4.7-.7v-7.9c0-.4-.4-.7-.7-.7zm7.4 0h-4.2c-.4 0-.7.3-.7.7v7.9c0 .3.3.7.7.7h4.2c.3 0 .7-.4.7-.7v-7.9c0-.4-.4-.7-.7-.7z" },
	  topic: { "d": "M8 16.3c0-.1-.2-.3-.3-.3l-1-.3c-.2-.1-.4 0-.5.2l-1.8 3c-.4.9-.2 1.1.7.7l3-1.8c.2-.1.3-.3.3-.5l-.4-1zm8-8.6c0 .1.2.3.3.3l1 .3c.2.1.4 0 .5-.2L19.6 5c.4-.8.2-1.1-.7-.6l-3 1.7c-.2.1-.3.4-.3.5l.4 1.1zm-9.8.4c.1.2.3.3.5.3l1-.3c.1-.1.3-.2.3-.3l.3-1.1c.1-.1 0-.4-.2-.5l-3-1.8c-.9-.4-1.1-.2-.7.7l1.8 3zm11.6 7.8c-.1-.2-.3-.3-.5-.3l-1 .3c-.1.1-.3.2-.3.3l-.3 1.1c-.1.2 0 .4.2.5l3.1 1.8c.8.4 1.1.2.6-.7l-1.8-3zm4.7-4.3l-7.6-2c-.3 0-.5-.3-.5-.5l-2-7.6c-.3-.8-.6-.8-.8 0l-2 7.6c-.1.3-.3.5-.6.5l-7.5 2c-.8.3-.8.6 0 .8l7.6 2c.3.1.5.3.5.6l2 7.5c.3.8.6.8.8 0l2-7.5c.1-.3.3-.5.6-.6l7.5-2c.8-.2.8-.6 0-.8zM12 13.8c-1 0-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8 1.8.8 1.8 1.8-.8 1.8-1.8 1.8z" },
	  trail: { "d": "M12.8.9c1.6 0 2.8 1.2 2.8 2.7s-1.3 2.8-2.8 2.8-2.7-1.2-2.7-2.8S11.3.9 12.8.9zm7 7.5c-.5-.1-1 .3-1.1.8l-.2 2.7c-.1 0-.2.1-.3.1h-2.5l-1.8-3.1c-.1-.3-.4-.5-.7-.5L10.5 8c-.4-.1-.9.2-1.1.6l-2 5.2c-.2.5 0 .9.4 1.1l5 3.4.4 3.9c0 .5.5.9 1 .9.6 0 1.1-.5 1-1l-.4-4.8c0-.2-.2-.5-.4-.6l-2.7-3.1 1-2.5 1.2 2.1c.2.3.5.6.9.6h3.5l-1 8.3c-.1.5.3.9.8 1 .1 0 .1-.1.1-.1.5 0 1-.3 1-.8l1.6-12.9c0-.4-.4-.9-1-.9zM5.6 12.8l1.7-4.4c.1-.3.3-.6.5-.8l-.3-.1c-1.5-.2-2.8.7-3.3 2.1L3.3 12c-.2.5.1 1.1.6 1.2l.4.1c.6.2 1.1-.1 1.3-.5zm.7 3.4l-2.1 6.2c-.1.4.1.6.5.6h1.1c.4 0 .8-.2 1-.6l2-4.5-2.3-1.4c0-.1-.1-.2-.2-.3z" },
	  undelete: { "d": "M19.2 9.2H4.8c-.3 0-.6.4-.6.7v10.9c0 1.3 1 2.3 2.3 2.3h11c1.3 0 2.3-1 2.3-2.3V9.9c0-.3-.3-.7-.6-.7zm-7.2 12v-1.8c1.5 0 2.8-1.3 2.8-2.8s-1.3-2.8-2.8-2.8c-.7 0-1.4.4-1.9.9l1.1 1.1c.1.1 0 .4-.2.4H7.6c-.1 0-.2-.1-.2-.2v-3.4c0-.2.2-.3.4-.2l1 1c.8-.8 2-1.4 3.2-1.4 2.6 0 4.7 2.1 4.7 4.7s-2.2 4.5-4.7 4.5zm9-16.6h-5.8V2.8c0-1-.8-1.9-1.8-1.9h-2.8c-1 0-1.8.9-1.8 1.9v1.8H3c-.4 0-.7.3-.7.7v1.4c0 .4.3.7.7.7h18c.4 0 .7-.3.7-.7V5.3c0-.4-.3-.7-.7-.7zm-7.6 0h-2.8V3.2c0-.2.2-.4.5-.4h1.8c.3 0 .5.2.5.4v1.4z" },
	  undeprecate: { "d": "M22.2 3.2H1.8c-.5 0-.9.4-.9 1v12c0 .5.4.9.9.9h7.5c.5 2.6 2.7 4.6 5.5 4.6s5-2 5.4-4.6h2c.5 0 .9-.4.9-.9v-12c0-.6-.4-1-.9-1zm-8.1 15.9l-2.7-2.8 1.2-1.3 1.5 1.5 3.3-3.3 1.2 1.3-4.5 4.6zm7.1-3.9h-1c-.4-2.6-2.7-4.6-5.4-4.6s-5.1 2-5.5 4.6H2.8V5.1h18.4v10.1z" },
	  underline: { "d": "M20.5 19.4h-17c-.4 0-.7.3-.7.7v1.4c0 .3.3.7.7.7h17c.4 0 .7-.4.7-.7v-1.4c0-.4-.3-.7-.7-.7zm-8.8-1.9c-3.5-.1-6.2-3.1-6.2-6.6V4.6c0-.5.5-.9 1-.9h.9c.5 0 .9.4.9.9v6.3c0 2 1.5 3.7 3.5 3.9 2.1.1 3.9-1.6 3.9-3.7V4.6c0-.5.4-.9.9-.9h.9c.5 0 1 .4 1 .9v6.5c0 3.7-3.1 6.6-6.8 6.4z" },
	  undo: { "d": "M2.5 1.8h1.4c.4 0 .7.4.7.7v3.3c0 .4.2.6.6.3.1-.2.2-.3.4-.5 2.3-2.3 5.6-3.2 8.9-2.6 1.1.2 2.3.7 3.2 1.3 2.8 1.9 4.5 4.9 4.5 8.1 0 2.5-.9 5-2.7 6.8-1.6 1.8-3.9 2.8-6.2 3-.5 0-.8-.4-.8-.8V20c0-.3.2-.6.6-.7 2.2-.1 4.2-1.3 5.4-3.3.3-.6.6-1.2.7-1.8.7-3-.5-6.1-3.2-7.7-.5-.3-1.1-.6-1.7-.7-2.5-.6-5 .1-6.7 1.8-.2.2-.4.4-.5.6-.2.4.1.6.6.6h3.2c.4 0 .6.3.6.7v1.4c0 .4-.2.6-.6.6H2.4c-.3 0-.6-.2-.6-.6V2.5c0-.3.4-.7.7-.7z" },
	  unlock: { "d": "M4.6 8.4v.1-.1zm14.8 2.2h-12V8.4c0-2.4 1.8-4.6 4.3-4.7 2.2-.1 4.1 1.3 4.7 3.3.1.2.3.4.5.4h1.9c.3 0 .5-.3.4-.6-.7-3.5-3.8-6.1-7.6-5.9-3.9.2-6.9 3.6-7 7.5v2.2c-1 0-1.8.8-1.8 1.9v8.7c0 1 .8 1.9 1.8 1.9h14.8c1 0 1.8-.9 1.8-1.9v-8.7c0-1.1-.8-1.9-1.8-1.9zm-5.3 9.1c.1.3-.1.6-.4.6h-3.4c-.3 0-.6-.3-.5-.6l.9-2.8c-.7-.4-1.1-1.3-1-2.2.2-.9.9-1.5 1.8-1.7 1.5-.3 2.8.8 2.8 2.1 0 .8-.4 1.5-1 1.8l.8 2.8z" },
	  unmuted: { "d": "M19.2 8.3c-.7 0-1.2.5-1.2 1.1v1.9c0 3.2-2.7 5.9-6 5.9s-6.1-2.7-6.1-5.9V9.4c0-.6-.5-1.1-1.1-1.1s-1.1.5-1.1 1.1v1.9c0 4.1 3.1 7.4 7.1 8v1.6H9c-.7 0-1.2.4-1.2 1.1s.5 1.1 1.2 1.1h6c.6 0 1.2-.5 1.2-1.1s-.6-1.1-1.2-1.1h-1.9v-1.6c4.1-.6 7.2-3.9 7.2-8V9.4c0-.6-.5-1.1-1.1-1.1zM12 15c2 0 3.7-1.7 3.7-3.7V4.6c0-2.1-1.6-3.7-3.7-3.7S8.3 2.5 8.3 4.6v6.7c0 2 1.7 3.7 3.7 3.7z" },
	  up: { "d": "M20.2 17.5H3.8c-.4 0-.8-.6-.4-1l8-9.8c.3-.3.9-.3 1.2 0l8 9.8c.4.4.1 1-.4 1z" },
	  upload: { "d": "M22.4 14.3H21c-.4 0-.7.4-.7.7v4.6c0 .4-.3.7-.7.7H4.4c-.4 0-.7-.3-.7-.7V15c0-.3-.3-.7-.7-.7H1.6c-.4 0-.7.4-.7.7v6.2c0 1 .9 1.9 1.9 1.9h18.4c1 0 1.9-.9 1.9-1.9V15c0-.3-.3-.7-.7-.7zM12.5 1.1c-.3-.3-.7-.3-1 0L5.3 7.3c-.3.3-.3.7 0 1l.9 1c.3.3.7.3 1 0l2.6-2.6c.3-.3.8-.1.8.3v9.8c0 .4.3.7.7.7h1.3c.4 0 .8-.4.8-.7V7.1c0-.5.4-.6.8-.4l2.6 2.6c.2.3.6.3.9 0l1-.9c.3-.3.3-.7 0-1l-6.2-6.3z" },
	  user: { "d": "M23.1 19.8v1.1c0 1.2-1 2.2-2.2 2.2H3.1c-1.2 0-2.2-1-2.2-2.2v-1.1c0-2.6 3.2-4.3 6.1-5.6l.3-.1c.2-.1.5-.1.7 0 1.2.8 2.5 1.2 4 1.2s2.8-.4 3.9-1.2c.3-.1.5-.1.7 0l.3.1c3 1.3 6.2 2.9 6.2 5.6zM12 .9c3 0 5.5 2.7 5.5 6.1S15 13.1 12 13.1 6.5 10.4 6.5 7 9 .9 12 .9z" },
	  volume_high: { "d": "M11.4 1.2L5.5 8.3H2.8c-1 0-1.9.8-1.9 1.9v3.6c0 1.1.9 1.9 1.9 1.9h2.7l5.9 7.1c.6.6 1.5.2 1.5-.6V1.8c0-.8-1-1.2-1.5-.6zM19.7 4c-.2-.2-.5-.2-.7 0l-.6.7c-.2.1-.2.5 0 .6 1.7 1.7 2.8 4.1 2.8 6.7 0 2.6-1.1 5-2.8 6.7-.2.2-.2.5 0 .6l.6.7c.2.2.5.2.7 0 2-2 3.4-4.9 3.4-8 0-3.1-1.3-6-3.4-8zm-2.9 3c-.2-.2-.5-.2-.7 0l-.6.6c-.2.2-.2.5 0 .7 1 .9 1.6 2.2 1.6 3.7s-.7 2.8-1.7 3.7c-.2.2-.2.5 0 .7l.7.6c.1.2.4.2.6 0 1.3-1.2 2.2-3 2.2-5s-.8-3.8-2.1-5z" },
	  volume_low: { "d": "M11.4 1.2L5.5 8.3H2.8c-1 0-1.9.8-1.9 1.9v3.6c0 1.1.9 1.9 1.9 1.9h2.7l5.9 7.1c.6.6 1.5.2 1.5-.6V1.8c0-.8-1-1.2-1.5-.6zM16.8 7c-.2-.2-.5-.2-.7 0l-.6.6c-.2.2-.2.5 0 .7 1 .9 1.6 2.2 1.6 3.7s-.7 2.8-1.7 3.7c-.2.2-.2.5 0 .7l.7.6c.1.2.4.2.6 0 1.3-1.2 2.2-3 2.2-5s-.8-3.8-2.1-5z" },
	  volume_off: { "d": "M11.4 1.2L5.5 8.3H2.8c-1 0-1.9.8-1.9 1.9v3.6c0 1.1.9 1.9 1.9 1.9h2.7l5.9 7.1c.6.6 1.5.2 1.5-.6V1.8c0-.8-1-1.2-1.5-.6zM20.7 12l2.2-2.3c.2-.1.2-.4 0-.6l-.6-.7c-.2-.1-.5-.1-.7 0l-2.2 2.3-2.3-2.3c-.2-.1-.4-.1-.6 0l-.7.7c-.2.2-.2.5 0 .6l2.3 2.3-2.3 2.3c-.2.1-.2.4 0 .6l.7.7c.2.1.4.1.6 0l2.3-2.3 2.2 2.3c.2.1.5.1.7 0l.6-.7c.2-.2.2-.5 0-.6L20.7 12z" },
	  warning: { "d": "M23.7 19.6L13.2 2.5c-.6-.9-1.8-.9-2.4 0L.3 19.6c-.7 1.1 0 2.6 1.1 2.6h21.2c1.1 0 1.8-1.5 1.1-2.6zM12 18.5c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4zm1.4-4.2c0 .3-.2.5-.5.5h-1.8c-.3 0-.5-.2-.5-.5v-6c0-.3.2-.5.5-.5h1.8c.3 0 .5.2.5.5v6z" },
	  weeklyview: { "d": "M20.3 3.2H18v-.9c0-.7-.6-1.4-1.4-1.4-.7 0-1.4.6-1.4 1.4v.9H8.8v-.9c0-.7-.6-1.4-1.4-1.4C6.6.9 6 1.5 6 2.3v.9H3.7c-1 0-1.9.9-1.9 1.9v1.1c0 .4.4.7.7.7h19c.3 0 .7-.3.7-.7V5.1c0-1-.9-1.9-1.9-1.9zm1.2 6h-19c-.3 0-.7.4-.7.7v11.3c0 1 .9 1.9 1.9 1.9h16.6c1 0 1.9-.9 1.9-1.9V9.9c0-.3-.4-.7-.7-.7zm-6.4 4.4l-2.9 6.2c-.1.3-.4.5-.8.5-.5 0-.9-.4-.9-.8 0-.1.1-.3.1-.4l2.5-5.3H9.6c-.5 0-.8-.2-.8-.6 0-.4.3-.7.8-.7h4.8c.4 0 .8.3.8.8 0 .1 0 .2-.1.3z" },
	  world: { "d": "M12 .9C5.9.9.9 5.9.9 12s5 11.1 11.1 11.1 11.1-5 11.1-11.1S18.1.9 12 .9zm0 2.3zm.9.1h-.1.1zM12 20.8c-4.8 0-8.8-4-8.8-8.8 0-.5.1-1 .2-1.4.6.1 1.3.3 1.7.7.8.8 1.6 1.8 2.5 2 0 0-.1 0-.2.2-.1.1-.2.4-.2.9 0 2.1 2 .8 2 3s2.5 3 2.5 1.3 1.6-2.6 1.6-3.9-1.3-1.3-2-1.8c-.9-.4-1.3-1.1-2.9-.9-.8-.7-1.2-1.4-.9-2.1.4-.8 2.1-1 2.1-2.2S8.5 6.4 7.7 6.4c-.4 0-1.2-.3-1.8-.6.7-.8 1.7-1.4 2.7-1.9.8.3 2 .9 3.1.9 1.2 0 1.9-.9 1.7-1.5 2.1.3 3.9 1.4 5.2 2.9-.6.4-1.6.9-3.2.9-2.1 0-2.1 2.1-.9 2.5 1.3.5 2.6-.8 3 0 .5.9-3 .9-2.1 3 .9 2.1 1.7 0 2.6 2.1.9 2.1 2.6-.3 1.3-2-.6-.7-.4-3 .9-3h.4c.2.7.3 1.5.3 2.3-.1 4.8-4.1 8.8-8.9 8.8z" },
	  zoomin: { "d": "M14.3 8.8h-2.8V6c0-.3-.1-.5-.4-.5H9.2c-.2 0-.4.2-.4.5v2.8H6c-.3 0-.5.2-.5.4v1.9c0 .3.2.4.5.4h2.8v2.8c0 .3.2.5.4.5h1.9c.3 0 .4-.2.4-.5v-2.8h2.8c.3 0 .5-.1.5-.4V9.2c0-.2-.2-.4-.5-.4zm8.6 12.1l-5.3-5.3c1.1-1.5 1.8-3.4 1.8-5.4 0-5.1-4.2-9.3-9.2-9.3S.9 5.1.9 10.2s4.2 9.2 9.3 9.2c2 0 3.9-.7 5.4-1.8l5.3 5.3c.3.3.7.3 1 0l.9-1c.3-.3.3-.7.1-1zm-12.7-4.3c-3.6 0-6.5-2.9-6.5-6.4s2.9-6.5 6.5-6.5 6.4 2.9 6.4 6.5-2.9 6.4-6.4 6.4z" },
	  zoomout: [{ "d": "M8.8 11.5h5.5c.3 0 .5-.1.5-.4V9.2c0-.2-.2-.4-.5-.4H8.8m0 0H6c-.3 0-.5.2-.5.4v1.9c0 .3.2.4.5.4h2.8" }, { "d": "M22.9 20.9l-5.3-5.3c1.1-1.5 1.8-3.4 1.8-5.4 0-5.1-4.2-9.3-9.2-9.3S.9 5.1.9 10.2s4.2 9.2 9.3 9.2c2 0 3.9-.7 5.4-1.8l5.3 5.3c.3.3.7.3 1 0l.9-1c.3-.3.3-.7.1-1zm-12.7-4.3c-3.6 0-6.5-2.9-6.5-6.4s2.9-6.5 6.5-6.5 6.4 2.9 6.4 6.5-2.9 6.4-6.4 6.4z" }]
	};
	module.exports.viewBox = '0 0 24 24';

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/*
	Copyright (c) 2015, salesforce.com, inc. All rights reserved.
	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
	Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
	Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
	'use strict';
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _SLDSIcons = __webpack_require__(13);
	
	var _utils = __webpack_require__(6);
	
	var _listItemLabel = __webpack_require__(40);
	
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
	    return _react2['default'].createElement('li', {
	      className: "slds-dropdown__item slds-has-icon slds-has-icon--left slds-theme--" + this.props.theme,
	      onMouseDown: this.handleMouseDown,
	      tabIndex: -1 }, _react2['default'].createElement('a', { id: 'menu-0-' + this.props.index,
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
	      tabIndex: -1 }, this.getLabel()));
	  }
	
	});

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/*
	Copyright (c) 2015, salesforce.com, inc. All rights reserved.
	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
	Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
	Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
	'use strict';
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _SLDSIcons = __webpack_require__(13);
	
	var _utils = __webpack_require__(6);
	
	module.exports = _react2['default'].createClass({
	
	  displayName: 'SLDSPicklistBase-list-item-label',
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      index: 0,
	      label: '',
	      value: null,
	      inverted: false,
	      isSelected: false,
	      isHighlighted: false,
	      data: {}
	    };
	  },
	
	  render: function render() {
	    return _react2['default'].createElement('section', null, this.props.isSelected ? _react2['default'].createElement(_SLDSIcons.Icon, { name: 'check', position: 'left', category: 'utility' }) : null, this.props.label);
	  }
	
	});

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/*
	Copyright (c) 2015, salesforce.com, inc. All rights reserved.
	
	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
	Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
	Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
	
	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
	
	'use strict';
	
	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};
	
	var _createClass = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	})();
	
	var _get = function get(_x, _x2, _x3) {
	  var _again = true;_function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;desc = parent = getter = undefined;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;_x2 = property;_x3 = receiver;_again = true;continue _function;
	      }
	    } else if ('value' in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;if (getter === undefined) {
	        return undefined;
	      }return getter.call(receiver);
	    }
	  }
	};
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}
	
	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
	  } else {
	    obj[key] = value;
	  }return obj;
	}
	
	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}
	
	function _inherits(subClass, superClass) {
	  if (typeof superClass !== 'function' && superClass !== null) {
	    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utilsCreateChainedFunction = __webpack_require__(42);
	
	var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);
	
	var _SLDSIconsJs = __webpack_require__(13);
	
	var _lodashOmit = __webpack_require__(43);
	
	var _lodashOmit2 = _interopRequireDefault(_lodashOmit);
	
	var classNames = __webpack_require__(61);
	
	var Button = (function (_React$Component) {
	  _inherits(Button, _React$Component);
	
	  function Button(props) {
	    _classCallCheck(this, Button);
	
	    _get(Object.getPrototypeOf(Button.prototype), 'constructor', this).call(this, props);
	    this.displayName = 'SLDSButton';
	    this.state = { active: false };
	  }
	
	  _createClass(Button, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      /*===============================
	      TODO: refactor so that React doesn't throw warnings in console
	      for (var key in this.props) {
	        if(this.props.hasOwnProperty(key) && typeof(this.props[key]) === 'string' && key !== 'label'){
	          this.props[key] = this.props[key].toLowerCase();
	        }
	      }
	      ===============================*/
	    }
	  }, {
	    key: 'onClick',
	    value: function onClick(e) {
	      this.setState({ active: !this.state.active });
	    }
	  }, {
	    key: 'getClassName',
	    value: function getClassName() {
	      var _classNames;
	
	      var isSelected = this.props.stateful && this.state.active ? true : false;
	      var notSelected = this.props.stateful && !this.state.active ? true : false;
	      return classNames(this.props.className, 'slds-button', (_classNames = {}, _defineProperty(_classNames, 'slds-button--' + this.props.variant, this.props.variant), _defineProperty(_classNames, 'slds-not-selected', notSelected), _defineProperty(_classNames, 'slds-is-selected', isSelected), _classNames));
	    }
	  }, {
	    key: 'renderIcon',
	    value: function renderIcon() {
	      if (this.props.iconName) {
	        return _react2['default'].createElement(_SLDSIconsJs.ButtonIcon, {
	          variant: this.props.variant,
	          disabled: this.props.disabled,
	          inverse: this.props.inverse,
	          stateful: this.props.stateful,
	          name: this.props.iconName,
	          size: this.props.iconSize,
	          position: this.props.iconPosition
	        });
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var props = (0, _lodashOmit2['default'])('className', this.props);
	      var click = (0, _utilsCreateChainedFunction2['default'])(this.props.onClick, this.onClick.bind(this));
	      var labelClasses = this.props.variant === 'icon' ? 'slds-assistive-text' : '';
	      if (this.props.disabled) {
	        props['disabled'] = 'disabled';
	      };
	
	      return _react2['default'].createElement('button', _extends({ className: this.getClassName() }, props, { onClick: click }), this.props.iconPosition === 'right' ? _react2['default'].createElement('span', { className: labelClasses }, this.props.label) : null, this.renderIcon(), this.props.iconPosition === 'left' || !this.props.iconPosition ? _react2['default'].createElement('span', { className: labelClasses }, this.props.label) : null);
	    }
	  }]);
	
	  return Button;
	})(_react2['default'].Component);
	
	Button.propTypes = {
	  label: _react2['default'].PropTypes.string.isRequired,
	  variant: _react2['default'].PropTypes.oneOf(['base', 'neutral', 'brand', 'destructive', 'icon']),
	  disabled: _react2['default'].PropTypes.bool,
	  inverse: _react2['default'].PropTypes.bool,
	  stateful: _react2['default'].PropTypes.bool,
	  iconName: _react2['default'].PropTypes.string,
	  iconSize: _react2['default'].PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
	  iconPosition: _react2['default'].PropTypes.oneOf(['left', 'right'])
	};
	
	module.exports = Button;

/***/ },
/* 42 */
/***/ function(module, exports) {

	/*
	Copyright (c) 2015, salesforce.com, inc. All rights reserved.
	
	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
	Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
	Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
	
	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
	
	/**
	 * Safe chained function
	 *
	 * Will only create a new function if needed,
	 * otherwise will pass back existing functions or null.
	 *
	 * @param {function} one
	 * @param {function} two
	 * @returns {function|null}
	 */
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	function createChainedFunction(one, two) {
	  var hasOne = typeof one === 'function';
	  var hasTwo = typeof two === 'function';
	
	  if (!hasOne && !hasTwo) {
	    return null;
	  }
	  if (!hasOne) {
	    return two;
	  }
	  if (!hasTwo) {
	    return one;
	  }
	
	  return function chainedFunction() {
	    one.apply(this, arguments);
	    two.apply(this, arguments);
	  };
	}
	
	exports['default'] = createChainedFunction;
	module.exports = exports['default'];

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.1.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var arrayMap = __webpack_require__(44),
	    baseDifference = __webpack_require__(45),
	    baseFlatten = __webpack_require__(50),
	    bindCallback = __webpack_require__(53),
	    pickByArray = __webpack_require__(54),
	    pickByCallback = __webpack_require__(55),
	    keysIn = __webpack_require__(57),
	    restParam = __webpack_require__(60);
	
	/**
	 * The opposite of `_.pick`; this method creates an object composed of the
	 * own and inherited enumerable properties of `object` that are not omitted.
	 * Property names may be specified as individual arguments or as arrays of
	 * property names. If `predicate` is provided it is invoked for each property
	 * of `object` omitting the properties `predicate` returns truthy for. The
	 * predicate is bound to `thisArg` and invoked with three arguments:
	 * (value, key, object).
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The source object.
	 * @param {Function|...(string|string[])} [predicate] The function invoked per
	 *  iteration or property names to omit, specified as individual property
	 *  names or arrays of property names.
	 * @param {*} [thisArg] The `this` binding of `predicate`.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * var object = { 'user': 'fred', 'age': 40 };
	 *
	 * _.omit(object, 'age');
	 * // => { 'user': 'fred' }
	 *
	 * _.omit(object, _.isNumber);
	 * // => { 'user': 'fred' }
	 */
	var omit = restParam(function(object, props) {
	  if (object == null) {
	    return {};
	  }
	  if (typeof props[0] != 'function') {
	    var props = arrayMap(baseFlatten(props), String);
	    return pickByArray(object, baseDifference(keysIn(object), props));
	  }
	  var predicate = bindCallback(props[0], props[1], 3);
	  return pickByCallback(object, function(value, key, object) {
	    return !predicate(value, key, object);
	  });
	});
	
	module.exports = omit;


/***/ },
/* 44 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/**
	 * A specialized version of `_.map` for arrays without support for callback
	 * shorthands or `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array.length,
	      result = Array(length);
	
	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}
	
	module.exports = arrayMap;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var baseIndexOf = __webpack_require__(46),
	    cacheIndexOf = __webpack_require__(47),
	    createCache = __webpack_require__(48);
	
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;
	
	/**
	 * The base implementation of `_.difference` which accepts a single array
	 * of values to exclude.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Array} values The values to exclude.
	 * @returns {Array} Returns the new array of filtered values.
	 */
	function baseDifference(array, values) {
	  var length = array ? array.length : 0,
	      result = [];
	
	  if (!length) {
	    return result;
	  }
	  var index = -1,
	      indexOf = baseIndexOf,
	      isCommon = true,
	      cache = (isCommon && values.length >= LARGE_ARRAY_SIZE) ? createCache(values) : null,
	      valuesLength = values.length;
	
	  if (cache) {
	    indexOf = cacheIndexOf;
	    isCommon = false;
	    values = cache;
	  }
	  outer:
	  while (++index < length) {
	    var value = array[index];
	
	    if (isCommon && value === value) {
	      var valuesIndex = valuesLength;
	      while (valuesIndex--) {
	        if (values[valuesIndex] === value) {
	          continue outer;
	        }
	      }
	      result.push(value);
	    }
	    else if (indexOf(values, value, 0) < 0) {
	      result.push(value);
	    }
	  }
	  return result;
	}
	
	module.exports = baseDifference;


/***/ },
/* 46 */
/***/ function(module, exports) {

	/**
	 * lodash 3.1.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/**
	 * The base implementation of `_.indexOf` without support for binary searches.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOf(array, value, fromIndex) {
	  if (value !== value) {
	    return indexOfNaN(array, fromIndex);
	  }
	  var index = fromIndex - 1,
	      length = array.length;
	
	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}
	
	/**
	 * Gets the index at which the first occurrence of `NaN` is found in `array`.
	 * If `fromRight` is provided elements of `array` are iterated from right to left.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
	 */
	function indexOfNaN(array, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 0 : -1);
	
	  while ((fromRight ? index-- : ++index < length)) {
	    var other = array[index];
	    if (other !== other) {
	      return index;
	    }
	  }
	  return -1;
	}
	
	module.exports = baseIndexOf;


/***/ },
/* 47 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/**
	 * Checks if `value` is in `cache` mimicking the return signature of
	 * `_.indexOf` by returning `0` if the value is found, else `-1`.
	 *
	 * @private
	 * @param {Object} cache The cache to search.
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `0` if `value` is found, else `-1`.
	 */
	function cacheIndexOf(cache, value) {
	  var data = cache.data,
	      result = (typeof value == 'string' || isObject(value)) ? data.set.has(value) : data.hash[value];
	
	  return result ? 0 : -1;
	}
	
	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	module.exports = cacheIndexOf;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var getNative = __webpack_require__(49);
	
	/** Native method references. */
	var Set = getNative(global, 'Set');
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeCreate = getNative(Object, 'create');
	
	/**
	 *
	 * Creates a cache object to store unique values.
	 *
	 * @private
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var length = values ? values.length : 0;
	
	  this.data = { 'hash': nativeCreate(null), 'set': new Set };
	  while (length--) {
	    this.push(values[length]);
	  }
	}
	
	/**
	 * Adds `value` to the cache.
	 *
	 * @private
	 * @name push
	 * @memberOf SetCache
	 * @param {*} value The value to cache.
	 */
	function cachePush(value) {
	  var data = this.data;
	  if (typeof value == 'string' || isObject(value)) {
	    data.set.add(value);
	  } else {
	    data.hash[value] = true;
	  }
	}
	
	/**
	 * Creates a `Set` cache object to optimize linear searches of large arrays.
	 *
	 * @private
	 * @param {Array} [values] The values to cache.
	 * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
	 */
	function createCache(values) {
	  return (nativeCreate && Set) ? new SetCache(values) : null;
	}
	
	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	// Add functions to the `Set` cache.
	SetCache.prototype.push = cachePush;
	
	module.exports = createCache;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 49 */
/***/ function(module, exports) {

	/**
	 * lodash 3.9.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]';
	
	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}
	
	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}
	
	module.exports = getNative;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.1.4 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var isArguments = __webpack_require__(51),
	    isArray = __webpack_require__(52);
	
	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;
	
	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}
	
	/**
	 * The base implementation of `_.flatten` with added support for restricting
	 * flattening and specifying the start index.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {boolean} [isDeep] Specify a deep flatten.
	 * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, isDeep, isStrict, result) {
	  result || (result = []);
	
	  var index = -1,
	      length = array.length;
	
	  while (++index < length) {
	    var value = array[index];
	    if (isObjectLike(value) && isArrayLike(value) &&
	        (isStrict || isArray(value) || isArguments(value))) {
	      if (isDeep) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, isDeep, isStrict, result);
	      } else {
	        arrayPush(result, value);
	      }
	    } else if (!isStrict) {
	      result[result.length] = value;
	    }
	  }
	  return result;
	}
	
	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	module.exports = baseFlatten;


/***/ },
/* 51 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	/**
	 * Checks if `value` is classified as an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  return isObjectLike(value) && isArrayLike(value) &&
	    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	}
	
	module.exports = isArguments;


/***/ },
/* 52 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/** `Object#toString` result references. */
	var arrayTag = '[object Array]',
	    funcTag = '[object Function]';
	
	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');
	
	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function(value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}
	
	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}
	
	module.exports = isArray;


/***/ },
/* 53 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/**
	 * A specialized version of `baseCallback` which only supports `this` binding
	 * and specifying the number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function bindCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  if (thisArg === undefined) {
	    return func;
	  }
	  switch (argCount) {
	    case 1: return function(value) {
	      return func.call(thisArg, value);
	    };
	    case 3: return function(value, index, collection) {
	      return func.call(thisArg, value, index, collection);
	    };
	    case 4: return function(accumulator, value, index, collection) {
	      return func.call(thisArg, accumulator, value, index, collection);
	    };
	    case 5: return function(value, other, key, object, source) {
	      return func.call(thisArg, value, other, key, object, source);
	    };
	  }
	  return function() {
	    return func.apply(thisArg, arguments);
	  };
	}
	
	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = bindCallback;


/***/ },
/* 54 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/**
	 * A specialized version of `_.pick` which picks `object` properties specified
	 * by `props`.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {string[]} props The property names to pick.
	 * @returns {Object} Returns the new object.
	 */
	function pickByArray(object, props) {
	  object = toObject(object);
	
	  var index = -1,
	      length = props.length,
	      result = {};
	
	  while (++index < length) {
	    var key = props[index];
	    if (key in object) {
	      result[key] = object[key];
	    }
	  }
	  return result;
	}
	
	/**
	 * Converts `value` to an object if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
	function toObject(value) {
	  return isObject(value) ? value : Object(value);
	}
	
	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	module.exports = pickByArray;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var baseFor = __webpack_require__(56),
	    keysIn = __webpack_require__(57);
	
	/**
	 * The base implementation of `_.forIn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForIn(object, iteratee) {
	  return baseFor(object, iteratee, keysIn);
	}
	
	/**
	 * A specialized version of `_.pick` that picks `object` properties `predicate`
	 * returns truthy for.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Object} Returns the new object.
	 */
	function pickByCallback(object, predicate) {
	  var result = {};
	  baseForIn(object, function(value, key, object) {
	    if (predicate(value, key, object)) {
	      result[key] = value;
	    }
	  });
	  return result;
	}
	
	module.exports = pickByCallback;


/***/ },
/* 56 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();
	
	/**
	 * Creates a base function for `_.forIn` or `_.forInRight`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var iterable = toObject(object),
	        props = keysFunc(object),
	        length = props.length,
	        index = fromRight ? length : -1;
	
	    while ((fromRight ? index-- : ++index < length)) {
	      var key = props[index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}
	
	/**
	 * Converts `value` to an object if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
	function toObject(value) {
	  return isObject(value) ? value : Object(value);
	}
	
	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	module.exports = baseFor;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.8 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var isArguments = __webpack_require__(58),
	    isArray = __webpack_require__(59);
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = (length && isLength(length) &&
	    (isArray(object) || isArguments(object)) && length) || 0;
	
	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;
	
	  while (++index < length) {
	    result[index] = (index + '');
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = keysIn;


/***/ },
/* 58 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	/**
	 * Checks if `value` is classified as an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  return isObjectLike(value) && isArrayLike(value) &&
	    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	}
	
	module.exports = isArguments;


/***/ },
/* 59 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/** `Object#toString` result references. */
	var arrayTag = '[object Array]',
	    funcTag = '[object Function]';
	
	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');
	
	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function(value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}
	
	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}
	
	module.exports = isArray;


/***/ },
/* 60 */
/***/ function(module, exports) {

	/**
	 * lodash 3.6.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as an array.
	 *
	 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.restParam(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function restParam(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        rest = Array(length);
	
	    while (++index < length) {
	      rest[index] = args[start + index];
	    }
	    switch (start) {
	      case 0: return func.call(this, rest);
	      case 1: return func.call(this, args[0], rest);
	      case 2: return func.call(this, args[0], args[1], rest);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = rest;
	    return func.apply(this, otherArgs);
	  };
	}
	
	module.exports = restParam;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */
	
	(function () {
		'use strict';
	
		var hasOwn = {}.hasOwnProperty;
	
		function classNames () {
			var classes = '';
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if (argType === 'string' || argType === 'number') {
					classes += ' ' + arg;
				} else if (Array.isArray(arg)) {
					classes += ' ' + classNames.apply(null, arg);
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes += ' ' + key;
						}
					}
				}
			}
	
			return classes.substr(1);
		}
	
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/*
	Copyright (c) 2015, salesforce.com, inc. All rights reserved.
	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
	Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
	Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
	
	'use strict';
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _SLDSButton = __webpack_require__(41);
	
	var _SLDSButton2 = _interopRequireDefault(_SLDSButton);
	
	var _utils = __webpack_require__(6);
	
	var _SLDSSettings = __webpack_require__(14);
	
	var _SLDSSettings2 = _interopRequireDefault(_SLDSSettings);
	
	var _classnames = __webpack_require__(61);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _reactModal = __webpack_require__(15);
	
	var _reactModal2 = _interopRequireDefault(_reactModal);
	
	var customStyles = {
	  content: {
	    position: 'default',
	    top: 'default',
	    left: 'default',
	    right: 'default',
	    bottom: 'default',
	    border: 'default',
	    background: 'default',
	    overflow: 'default',
	    WebkitOverflowScrolling: 'default',
	    borderRadius: 'default',
	    outline: 'default',
	    padding: 'default'
	  },
	  overlay: {
	    backgroundColor: 'default'
	  }
	};
	
	module.exports = _react2['default'].createClass({
	  displayName: 'exports',
	
	  propTypes: {
	    size: _react2['default'].PropTypes.oneOf(['medium', 'large']),
	    prompt: _react2['default'].PropTypes.oneOf(['', 'success', 'warning', 'error', 'wrench', 'offline', 'info'])
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: '',
	      isOpen: false,
	      content: [],
	      footer: [],
	      returnFocusTo: null,
	      size: 'medium',
	      prompt: '', //if prompt !== '', it renders modal as prompt
	      directional: false
	    };
	  },
	
	  getInitialState: function getInitialState() {
	    return {
	      isClosing: false,
	      revealed: false
	    };
	  },
	
	  componentDidMount: function componentDidMount() {
	    var _this = this;
	
	    //console.log('!!! window.activeElement !!! ',document.activeElement);
	    this.setState({ returnFocusTo: document.activeElement });
	    if (!this.state.revealed) {
	      setTimeout(function () {
	        _this.setState({ revealed: true });
	      });
	    }
	    this.updateBodyScroll();
	  },
	
	  closeModal: function closeModal() {
	    this.setState({ isClosing: true });
	    if (this.state.returnFocusTo && this.state.returnFocusTo.focus) {
	      this.state.returnFocusTo.focus();
	    }
	    if (this.props.onRequestClose) {
	      this.props.onRequestClose();
	    }
	  },
	
	  handleSubmitModal: function handleSubmitModal() {
	    this.closeModal();
	  },
	
	  updateBodyScroll: function updateBodyScroll() {
	    if (window && document && document.body) {
	      if (this.props.isOpen) {
	        document.body.style.overflow = 'hidden';
	      } else {
	        document.body.style.overflow = 'inherit';
	      }
	    }
	  },
	
	  handleModalClick: function handleModalClick(event) {
	    if (event && event.stopPropagation) {
	      event.stopPropagation();
	    }
	  },
	
	  isPrompt: function isPrompt() {
	    return this.props.prompt !== '';
	  },
	
	  getModal: function getModal() {
	    var modalClass = {
	      'slds-modal': true,
	      'slds-fade-in-open': this.state.revealed,
	      'slds-modal--large': this.props.size === 'large'
	    };
	
	    return _react2['default'].createElement('div', {
	      className: (0, _classnames2['default'])(modalClass),
	      style: { pointerEvents: 'inherit' },
	      onClick: this.isPrompt() ? undefined : this.closeModal
	    }, _react2['default'].createElement('div', {
	      role: 'dialog',
	      className: 'slds-modal__container',
	      onClick: this.handleModalClick
	    }, this.headerComponent(), _react2['default'].createElement('div', { className: 'slds-modal__content' }, this.props.children, this.isPrompt() ? this.props.footer : null), this.footerComponent()));
	  },
	
	  render: function render() {
	    var overlayClasses = {
	      'slds-modal-backdrop': true,
	      'slds-modal-backdrop--open': this.state.revealed
	    };
	
	    return _react2['default'].createElement(_reactModal2['default'], {
	      isOpen: this.props.isOpen,
	      onRequestClose: this.closeModal,
	      style: customStyles,
	      overlayClassName: (0, _classnames2['default'])(overlayClasses) }, this.getModal());
	  },
	
	  footerComponent: function footerComponent() {
	    var footer = undefined;
	
	    var footerClass = {
	      'slds-modal__footer': true,
	      'slds-modal__footer--directional': this.props.directional
	    };
	
	    var hasFooter = this.props.footer && this.props.footer.length > 0;
	
	    if (!this.isPrompt() && hasFooter) {
	      footer = _react2['default'].createElement('div', { className: (0, _classnames2['default'])(footerClass) }, this.props.footer);
	    }
	
	    return footer;
	  },
	
	  headerComponent: function headerComponent() {
	    var headingClasses = [],
	        headerClasses = ['slds-modal__header'];
	    var closeButton = undefined;
	
	    if (this.isPrompt()) {
	      headerClasses.push('slds-theme--' + this.props.prompt);
	      headingClasses.push('slds-text-heading--small');
	    } else {
	      headingClasses.push('slds-text-heading--medium');
	      closeButton = _react2['default'].createElement(_SLDSButton2['default'], {
	        label: 'Close',
	        variant: 'icon',
	        iconName: 'close',
	        iconSize: 'large',
	        inverse: true,
	        className: 'slds-modal__close',
	        onClick: this.closeModal });
	    }
	
	    return _react2['default'].createElement('div', { className: (0, _classnames2['default'])(headerClasses) }, _react2['default'].createElement('h2', { className: (0, _classnames2['default'])(headingClasses) }, this.props.title), closeButton);
	  },
	
	  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
	
	    if (this.props.isOpen !== prevProps.isOpen) {
	      this.updateBodyScroll();
	    }
	
	    if (this.state.isClosing !== prevState.isClosing) {
	
	      if (this.state.isClosing) {
	        //console.log('CLOSING: ');
	
	        if (this.isMounted()) {
	          var el = this.getDOMNode().parentNode;
	          if (el && el.getAttribute('data-slds-modal')) {
	            _react2['default'].unmountComponentAtNode(el);
	            document.body.removeChild(el);
	          }
	        }
	      }
	    }
	  }
	
	});

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/*
	Copyright (c) 2015, salesforce.com, inc. All rights reserved.
	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
	Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
	Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
	
	'use strict';
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utils = __webpack_require__(6);
	
	var _index = __webpack_require__(62);
	
	var _index2 = _interopRequireDefault(_index);
	
	var SLDSModalTrigger = {
	  open: function open(cfg) {
	    var el = document.createElement('span');
	    el.setAttribute('data-slds-modal', true);
	    document.body.appendChild(el);
	    var comp = _react2['default'].createElement(_index2['default'], {
	      title: cfg.title,
	      footer: cfg.footer,
	      isOpen: true }, cfg.content);
	    _react2['default'].render(comp, el);
	  }
	};
	
	module.exports = SLDSModalTrigger;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=design-system-react.js.map