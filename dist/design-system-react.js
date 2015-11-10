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
	
	var _SLDSDropdownBase = __webpack_require__(45);
	
	var _SLDSDropdownBase2 = _interopRequireDefault(_SLDSDropdownBase);
	
	var _SLDSPicklistBaseListItem = __webpack_require__(43);
	
	var _SLDSPicklistBaseListItem2 = _interopRequireDefault(_SLDSPicklistBaseListItem);
	
	var _SLDSSettings = __webpack_require__(14);
	
	var _SLDSSettings2 = _interopRequireDefault(_SLDSSettings);
	
	var _SLDSButton = __webpack_require__(50);
	
	var _SLDSButton2 = _interopRequireDefault(_SLDSButton);
	
	var _SLDSButtonGroup = __webpack_require__(70);
	
	var _SLDSButtonGroup2 = _interopRequireDefault(_SLDSButtonGroup);
	
	var _SLDSLookup = __webpack_require__(71);
	
	var _SLDSLookup2 = _interopRequireDefault(_SLDSLookup);
	
	var _SLDSModal = __webpack_require__(78);
	
	var _SLDSModal2 = _interopRequireDefault(_SLDSModal);
	
	var _SLDSModalTrigger = __webpack_require__(79);
	
	var _SLDSModalTrigger2 = _interopRequireDefault(_SLDSModalTrigger);
	
	var _SLDSIcons = __webpack_require__(13);
	
	var _SLDSIcons2 = _interopRequireDefault(_SLDSIcons);
	
	var _SLDSNotification = __webpack_require__(80);
	
	var _SLDSNotification2 = _interopRequireDefault(_SLDSNotification);
	
	module.exports = {
	  SLDSPicklistBase: _SLDSPicklistBase2['default'],
	  SLDSDropdownBase: _SLDSDropdownBase2['default'],
	  SLDSPicklistBaseListItem: _SLDSPicklistBaseListItem2['default'],
	  SLDSSettings: _SLDSSettings2['default'],
	  SLDSButton: _SLDSButton2['default'],
	  SLDSButtonGroup: _SLDSButtonGroup2['default'],
	  SLDSLookup: _SLDSLookup2['default'],
	  SLDSModal: _SLDSModal2['default'],
	  SLDSModalTrigger: _SLDSModalTrigger2['default'],
	  SLDSIcons: _SLDSIcons2['default'],
	  SLDSNotification: _SLDSNotification2['default']
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
	
	var _listItem = __webpack_require__(43);
	
	var _listItem2 = _interopRequireDefault(_listItem);
	
	var _listItemLabel = __webpack_require__(44);
	
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
	      return this.props.options[index].value;
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
	      itemRenderer: this.props.listItemRenderer,
	      theme: this.props.theme });
	  },
	
	  getSimplePopover: function getSimplePopover() {
	    return !this.props.disabled && this.state.isOpen ? _react2['default'].createElement('div', {
	      className: 'slds-dropdown slds-dropdown--left slds-dropdown--small slds-dropdown--menu',
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
	    return _react2['default'].createElement('div', { className: "slds-form-element slds-theme--" + this.props.theme }, _react2['default'].createElement('div', { className: "slds-picklist slds-theme--" + this.props.theme }, _react2['default'].createElement('button', {
	      id: this.state.triggerId,
	      ref: 'triggerbutton',
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
	    //    targetAttachment: React.PropTypes.string,
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      verticalAlign: 'bottom',
	      horizontalAlign: 'left',
	      //      targetAttachment: 'bottom left',
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
	        'marginTop': '0.20rem',
	        'marginBottom': '0.35rem',
	        'float': 'inherit',
	        'position': 'inherit'
	      },
	      onKeyDown: this.handleKeyDown
	    }, this.props.children);
	  },
	
	  beforeClose: function beforeClose() {},
	
	  dropOptions: function dropOptions() {
	    var target = this.props.targetElement ? _react2['default'].findDOMNode(this.props.targetElement) : _react2['default'].findDOMNode(this).parentNode;
	    var position = this.props.verticalAlign + ' ' + this.props.horizontalAlign;
	    return {
	      target: target,
	      content: this.popoverElement,
	      position: position,
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
	    return _react2['default'].createElement('noscript', null);
	  }
	
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! tether-drop 1.4.0 */
	
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
	
	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
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
	      openDelay: 0,
	      closeDelay: 50,
	      // inherited from openDelay and closeDelay if not explicitly defined
	      focusDelay: null,
	      blurDelay: null,
	      hoverOpenDelay: null,
	      hoverCloseDelay: null,
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
	              _this.content.innerHTML = '';
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
	
	        var inTimeout = null;
	        var outTimeout = null;
	
	        var inHandler = function inHandler(event) {
	          if (outTimeout !== null) {
	            clearTimeout(outTimeout);
	          } else {
	            inTimeout = setTimeout(function () {
	              _this2.open(event);
	              inTimeout = null;
	            }, (event.type === 'focus' ? _this2.options.focusDelay : _this2.options.hoverOpenDelay) || _this2.options.openDelay);
	          }
	        };
	
	        var outHandler = function outHandler(event) {
	          if (inTimeout !== null) {
	            clearTimeout(inTimeout);
	          } else {
	            outTimeout = setTimeout(function () {
	              _this2.close(event);
	              outTimeout = null;
	            }, (event.type === 'blur' ? _this2.options.blurDelay : _this2.options.hoverCloseDelay) || _this2.options.closeDelay);
	          }
	        };
	
	        if (events.indexOf('hover') >= 0) {
	          this._on(this.target, 'mouseover', inHandler);
	          this._on(this.drop, 'mouseover', inHandler);
	          this._on(this.target, 'mouseout', outHandler);
	          this._on(this.drop, 'mouseout', outHandler);
	        }
	
	        if (events.indexOf('focus') >= 0) {
	          this._on(this.target, 'focus', inHandler);
	          this._on(this.drop, 'focus', inHandler);
	          this._on(this.target, 'blur', outHandler);
	          this._on(this.drop, 'blur', outHandler);
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
	
	        /* eslint no-unused-vars: 0 */
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
	
	    var _style = style;
	    var overflow = _style.overflow;
	    var overflowX = _style.overflowX;
	    var overflowY = _style.overflowY;
	
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
	
	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	          args[_key - 1] = arguments[_key];
	        }
	
	        while (i < this.bindings[event].length) {
	          var _bindings$event$i = this.bindings[event][i];
	          var handler = _bindings$event$i.handler;
	          var ctx = _bindings$event$i.ctx;
	          var once = _bindings$event$i.once;
	
	          var context = ctx;
	          if (typeof context === 'undefined') {
	            context = this;
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
	  if (typeof document === 'undefined') {
	    return '';
	  }
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
	
	  if (typeof window !== 'undefined') {
	    ['resize', 'scroll', 'touchmove'].forEach(function (event) {
	      window.addEventListener(event, tick);
	    });
	  }
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
	
	    // THE ISSUE
	  }, {
	    key: 'move',
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
	            css[transformKey] += " translateZ(0)";
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
	
	      var _shift = shift;
	
	      var _shift2 = _slicedToArray(_shift, 2);
	
	      shiftTop = _shift2[0];
	      shiftLeft = _shift2[1];
	
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
	
	    if (event.stopImmediatePropagation) {
	      event.stopImmediatePropagation();
	    }
	
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
	  TAB: 9,
	  DELETE: 46,
	  BACKSPACE: 8
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
	          evt.stopPropagation();
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
	
	var _listItem = __webpack_require__(43);
	
	var _listItem2 = _interopRequireDefault(_listItem);
	
	var _utils = __webpack_require__(6);
	
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
	
	  handleMouseDown: function handleMouseDown(event) {
	    _utils.EventUtil.trapImmediate(event);
	  },
	
	  render: function render() {
	    return _react2["default"].createElement("div", {
	      ref: "scroll",
	      className: 'slds-wrap slds-grow slds-scrollable--y ' + this.props.className,
	      style: {
	        maxHeight: 260
	      },
	      onMouseDown: this.handleMouseDown
	    }, _react2["default"].createElement("ul", {
	      ref: "scroll",
	      className: "slds-dropdown__list slds-theme--" + this.props.theme,
	      role: "menu",
	      "aria-labelledby": this.props.triggerId }, this.getItems()));
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
	        /*
	                if(this.props.category === 'utility'){
	                    return <SLDSUtilityIcon name={this.props.name} aria-hidden='true' className={className} />;
	                }
	                return <svg aria-hidden='true' className={className} dangerouslySetInnerHTML={{__html: useTag }} />;
	        */
	        return _react2['default'].createElement(_SLDSUtilityIcon2['default'], { name: this.props.name, category: this.props.category, 'aria-hidden': 'true', className: className });
	    }
	
	});
	
	exports.ButtonIcon = ButtonIcon;
	var Icon = _react2['default'].createClass({
	    displayName: 'Icon',
	
	    getDefaultProps: function getDefaultProps() {
	        return {
	            name: '',
	            category: 'standard'
	        };
	    },
	
	    render: function render() {
	
	        var name = this.props.name ? this.props.name.replace(/_/g, '-') : '';
	        var iconClassName = 'slds-icon-' + this.props.category + '-' + (this.props.theme || name);
	        var styles = this.props.category === 'action' ? { padding: '.5rem' } : null;
	
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
	        className = className + ' ' + iconClassName;
	        return _react2['default'].createElement('span', { className: 'slds-icon__container ', style: styles }, _react2['default'].createElement(_SLDSUtilityIcon2['default'], { name: this.props.name, category: this.props.category, 'aria-hidden': 'true', className: className, style: this.props.style }));
	    }
	
	});
	
	exports.Icon = Icon;
	var InputIcon = _react2['default'].createClass({
	    displayName: 'InputIcon',
	
	    getDefaultProps: function getDefaultProps() {
	        return {
	            category: 'utility'
	        };
	    },
	
	    render: function render() {
	        var className = 'slds-input__icon slds-icon-text-default';
	        return _react2['default'].createElement(_SLDSUtilityIcon2['default'], { name: this.props.name, category: this.props.category, 'aria-hidden': 'true', className: className });
	    }
	
	});
	
	exports.InputIcon = InputIcon;
	module.exports = {
	    InputIcon: InputIcon,
	    Icon: Icon,
	    ButtonIcon: ButtonIcon
	};

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
	
	var _sldsIconsUtility = __webpack_require__(38);
	
	var _sldsIconsUtility2 = _interopRequireDefault(_sldsIconsUtility);
	
	var _sldsIconsAction = __webpack_require__(39);
	
	var _sldsIconsAction2 = _interopRequireDefault(_sldsIconsAction);
	
	var _sldsIconsCustom = __webpack_require__(40);
	
	var _sldsIconsCustom2 = _interopRequireDefault(_sldsIconsCustom);
	
	var _sldsIconsDoctype = __webpack_require__(41);
	
	var _sldsIconsDoctype2 = _interopRequireDefault(_sldsIconsDoctype);
	
	var _sldsIconsStandard = __webpack_require__(42);
	
	var _sldsIconsStandard2 = _interopRequireDefault(_sldsIconsStandard);
	
	module.exports = _react2['default'].createClass({
	  displayName: 'exports',
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      name: 'announcenent',
	      category: 'utility'
	    };
	  },
	
	  getPaths: function getPaths(paths) {
	    if (paths instanceof Array) {
	      return paths.map(function (item) {
	        return _react2['default'].createElement('path', item);
	      });
	    }
	    return _react2['default'].createElement('path', paths);
	  },
	
	  getCircles: function getCircles(circles) {
	    if (circles instanceof Array) {
	      return circles.map(function (item) {
	        return _react2['default'].createElement('circle', item);
	      });
	    }
	    return _react2['default'].createElement('circle', circles);
	  },
	
	  getEllipses: function getEllipses(ellipses) {
	    if (ellipses instanceof Array) {
	      return ellipses.map(function (item) {
	        return _react2['default'].createElement('ellipse', item);
	      });
	    }
	    return _react2['default'].createElement('ellipse', ellipses);
	  },
	
	  getGroups: function getGroups(groups) {
	    var _this = this;
	
	    if (groups instanceof Array) {
	      return groups.map(function (item) {
	        return _react2['default'].createElement('g', null, _this.getShapes(item));
	      });
	    }
	    return _react2['default'].createElement('g', null, this.getShapes(groups));
	  },
	
	  getShapes: function getShapes(data) {
	    var shapes = [];
	    if (data) {
	      if (data.g) {
	        shapes.push(this.getGroups(data.g));
	      }
	      if (data.ellipse) {
	        shapes.push(this.getEllipses(data.ellipse));
	      }
	      if (data.circle) {
	        shapes.push(this.getCircles(data.circle));
	      }
	      if (data.path) {
	        shapes.push(this.getPaths(data.path));
	      }
	    }
	    return shapes;
	  },
	
	  getSVG: function getSVG(name, category) {
	    var data;
	    var viewBox;
	    switch (category) {
	      case 'utility':
	        data = _sldsIconsUtility2['default'][name.toLowerCase()];
	        viewBox = _sldsIconsUtility2['default'].viewBox;
	        break;
	      case 'action':
	        data = _sldsIconsAction2['default'][name.toLowerCase()];
	        viewBox = _sldsIconsAction2['default'].viewBox;
	        break;
	      case 'custom':
	        data = _sldsIconsCustom2['default'][name.toLowerCase()];
	        viewBox = _sldsIconsCustom2['default'].viewBox;
	        break;
	      case 'doctype':
	        data = _sldsIconsDoctype2['default'][name.toLowerCase()];
	        viewBox = _sldsIconsDoctype2['default'].viewBox;
	        break;
	      case 'standard':
	        data = _sldsIconsStandard2['default'][name.toLowerCase()];
	        viewBox = _sldsIconsStandard2['default'].viewBox;
	        break;
	      default:
	        data = _sldsIconsUtility2['default'][name.toLowerCase()];
	        viewBox = _sldsIconsUtility2['default'].viewBox;
	        break;
	    }
	    return _react2['default'].createElement('svg', _extends({}, this.props, { viewBox: viewBox }), this.getShapes(data));
	  },
	
	  render: function render() {
	    return this.getSVG(this.props.name, this.props.category);
	  }
	});

/***/ },
/* 38 */
/***/ function(module, exports) {

	/*  Copyright (c) 2015, salesforce.com, inc. All rights reserved.    Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:  Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.  Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.  Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.  */
	"use strict";
	
	module.exports = {
	  add: { "path": { "d": "M13.8 13.4h7.7c.3 0 .7-.3.7-.7v-1.4c0-.4-.4-.7-.7-.7h-7.7c-.2 0-.4-.2-.4-.4V2.5c0-.3-.3-.7-.7-.7h-1.4c-.4 0-.7.4-.7.7v7.7c0 .2-.2.4-.4.4H2.5c-.3 0-.7.3-.7.7v1.4c0 .4.4.7.7.7h7.7c.2 0 .4.2.4.4v7.7c0 .3.3.7.7.7h1.4c.4 0 .7-.4.7-.7v-7.7c0-.2.2-.4.4-.4z" } },
	  adduser: { "path": { "d": "M10.1 17.1c0-1.3.4-2.7 1.1-3.8.8-1.4 1.6-1.9 2.3-3 1.2-1.7 1.4-4.1.7-6-.8-1.9-2.5-3-4.6-2.9S6 2.7 5.3 4.6c-.7 2-.4 4.5 1.3 6.1.6.7 1.3 1.7.9 2.6-.3 1-1.4 1.4-2.2 1.7-1.8.8-4 1.9-4.3 4.1-.4 1.7.8 3.5 2.7 3.5h7.8c.4 0 .6-.4.4-.7-1.1-1.4-1.8-3.1-1.8-4.8zm7.4-5.6c-3.1 0-5.5 2.5-5.5 5.6s2.4 5.5 5.5 5.5 5.5-2.5 5.5-5.5-2.5-5.6-5.5-5.6zm2.8 6c0 .3-.2.5-.5.5h-1.3v1.4c0 .3-.3.4-.5.4h-1c-.2 0-.4-.1-.4-.4V18h-1.4c-.3 0-.4-.2-.4-.5v-.9c0-.3.1-.4.4-.4h1.4v-1.4c0-.3.2-.5.4-.5h1c.2 0 .5.2.5.5v1.4h1.3c.3 0 .5.1.5.4v.9z" } },
	  announcement: { "path": { "d": "M10.5 21l-.6-.5c-.7-.5-.7-1.4-.7-1.9v-1.3c0-.4-.3-.7-.7-.7H5.8c-.4 0-.7.3-.7.7v3.6c0 1.2.7 2.2 1.9 2.2h2.2c1.4 0 1.5-.9 1.5-.9s.2-.9-.2-1.2zM20.8 8.3V2c0-1.1-1.4-1.4-2.2-.7l-4.1 3.9c-.6.5-1.4.8-2.3.8h-7C2.8 6 .9 8.1.9 10.5v.1c0 2.4 1.9 4.2 4.3 4.2h7c.9 0 1.7.3 2.4.9l4 4c.8.7 2.2.4 2.2-.7v-6.3c1.4 0 2.2-.9 2.2-2.2 0-1.2-.8-2.2-2.2-2.2z" } },
	  answer: { "path": { "d": "M12 1.8C5.9 1.8.9 6.4.9 12c0 1.8.5 3.5 1.4 5 .1.2.1.4.1.6l-1 3.2c-.2.6.4 1.1 1 .9l3.2-1.1c.2-.1.4-.1.6.1 1.7.9 3.7 1.5 5.8 1.5 6.2 0 11.1-4.5 11.1-10.2C23 6.4 18.1 1.8 12 1.8zm5.3 7.9l-5.6 5.6c-.3.2-.5.3-.8.3-.3 0-.6-.1-.8-.3l-2.7-2.7c-.2-.2-.2-.6 0-.7l.8-.8c.2-.2.5-.2.8 0l1.9 2 4.8-4.8c.3-.3.6-.3.8 0l.8.7c.2.2.2.6 0 .7z" } },
	  apps: { "path": { "d": "M6 1.8H3.2c-.8 0-1.4.6-1.4 1.4V6c0 .8.6 1.4 1.4 1.4H6c.8 0 1.4-.6 1.4-1.4V3.2c0-.8-.6-1.4-1.4-1.4zm0 14.8H3.2c-.8 0-1.4.6-1.4 1.4v2.8c0 .8.6 1.4 1.4 1.4H6c.8 0 1.4-.6 1.4-1.4V18c0-.8-.6-1.4-1.4-1.4zm0-7.4H3.2c-.8 0-1.4.6-1.4 1.4v2.8c0 .8.6 1.4 1.4 1.4H6c.8 0 1.4-.6 1.4-1.4v-2.8c0-.8-.6-1.4-1.4-1.4zm7.4-7.4h-2.8c-.8 0-1.4.6-1.4 1.4V6c0 .8.6 1.4 1.4 1.4h2.8c.8 0 1.4-.6 1.4-1.4V3.2c0-.8-.6-1.4-1.4-1.4zm0 14.8h-2.8c-.8 0-1.4.6-1.4 1.4v2.8c0 .8.6 1.4 1.4 1.4h2.8c.8 0 1.4-.6 1.4-1.4V18c0-.8-.6-1.4-1.4-1.4zm0-7.4h-2.8c-.8 0-1.4.6-1.4 1.4v2.8c0 .8.6 1.4 1.4 1.4h2.8c.8 0 1.4-.6 1.4-1.4v-2.8c0-.8-.6-1.4-1.4-1.4zm7.4-7.4H18c-.8 0-1.4.6-1.4 1.4V6c0 .8.6 1.4 1.4 1.4h2.8c.8 0 1.4-.6 1.4-1.4V3.2c0-.8-.6-1.4-1.4-1.4zm0 14.8H18c-.8 0-1.4.6-1.4 1.4v2.8c0 .8.6 1.4 1.4 1.4h2.8c.8 0 1.4-.6 1.4-1.4V18c0-.8-.6-1.4-1.4-1.4zm0-7.4H18c-.8 0-1.4.6-1.4 1.4v2.8c0 .8.6 1.4 1.4 1.4h2.8c.8 0 1.4-.6 1.4-1.4v-2.8c0-.8-.6-1.4-1.4-1.4z" } },
	  arrowdown: { "path": { "d": "M4.4 14.3c-.3.4-.3.9 0 1.3l7 6.7c.3.4.9.4 1.2 0l7-6.7c.4-.4.4-.9 0-1.3l-1.3-1.2c-.3-.4-.9-.4-1.3 0l-2.1 2.1c-.4.4-1.1.1-1.1-.4V2.3c0-.5-.4-.9-.9-.9h-1.8c-.5 0-.9.5-.9.9v12.5c0 .5-.7.8-1.1.4L7 13.1c-.4-.4-1-.4-1.3 0l-1.3 1.2z" } },
	  arrowup: { "path": { "d": "M19.1 9.7c.4-.4.4-.9 0-1.3l-6.9-6.7c-.4-.4-.9-.4-1.3 0L4 8.4c-.4.4-.4.9 0 1.3l1.3 1.2c.3.4.9.4 1.3 0l2.1-2.1c.4-.4 1-.1 1 .4v12.5c0 .5.5.9 1 .9h1.8c.5 0 .9-.5.9-.9V9.2c0-.5.7-.8 1-.4l2.2 2.1c.4.4.9.4 1.3 0l1.2-1.2z" } },
	  attach: { "path": { "d": "M8.1 16.9c.3.3.7.3 1 0l4.6-4.6c.3-.3.9-.3 1.3 0 .4.4.4 1 0 1.4l-5.7 5.6c-1.2 1.2-3.3 1.2-4.5 0l-.1-.1c-1.2-1.2-1.2-3.3 0-4.5l10-10c1.3-1.3 3.3-1.3 4.6 0 1.3 1.3 1.3 3.3 0 4.6-.2.3-.3.6-.1.9.3.5.5 1 .6 1.6.1.3.6.4.8.2l.7-.7c2.4-2.4 2.4-6.2 0-8.6h-.1C18.9.4 15 .4 12.7 2.7l-10 10c-2.4 2.3-2.4 6.2 0 8.5l.1.1c2.3 2.4 6.1 2.4 8.5 0l5.7-5.7c1.5-1.4 1.4-3.8-.1-5.3-1.5-1.4-3.9-1.3-5.3.1L7.1 15c-.3.2-.3.7 0 1l1 .9z" } },
	  back: { "path": { "d": "M22.4 10.6H7.1c-.4 0-.6-.5-.3-.8l4.4-4.4c.3-.3.3-.7 0-1l-1-1c-.3-.3-.7-.3-1 0l-8 8.1c-.3.3-.3.7 0 1l8 8.1c.3.3.7.3 1 0l1-1c.2-.3.2-.7 0-1l-4.5-4.4c-.2-.3-.1-.8.4-.8h15.3c.4 0 .7-.3.7-.7v-1.3c0-.4-.3-.8-.7-.8z" } },
	  ban: { "path": { "d": "M12 .9C5.9.9.9 5.9.9 12s5 11.1 11.1 11.1 11.1-5 11.1-11.1S18.1.9 12 .9zM3.7 12c0-4.6 3.7-8.3 8.3-8.3 1.8 0 3.5.5 4.8 1.5L5.2 16.8c-1-1.3-1.5-3-1.5-4.8zm8.3 8.3c-1.8 0-3.5-.5-4.8-1.5L18.8 7.2c1 1.3 1.5 3 1.5 4.8 0 4.6-3.7 8.3-8.3 8.3z" } },
	  bold: { "path": { "d": "M18.9 8.8c0-2.8-2.2-5.1-4.8-5.1H6.5c-.5 0-1 .4-1 .9v15.2c0 .6.5 1 1 1h7.6c2.6 0 4.8-2.3 4.8-5.1 0-1.3-.5-2.5-1.3-3.5.8-.9 1.3-2.1 1.3-3.4zm-4.8 8.7H8.8v-3.7h5.3c.9 0 1.6.9 1.6 1.9s-.7 1.8-1.6 1.8zm0-6.9H8.8V6.9h5.3c.9 0 1.6.9 1.6 1.9s-.7 1.8-1.6 1.8z" } },
	  bookmark: { "path": { "d": "M17.2 22.9l-4.6-4.6c-.2-.3-.6-.3-.9 0l-4.9 4.6c-.3.3-.8.1-.8-.3V2.8C6 1.8 6.8.9 7.8.9h8.4c1 0 1.8.9 1.8 1.9v19.8c0 .4-.5.6-.8.3z" } },
	  brush: { "path": { "d": "M22.8 1.2c-1.6-1.6-10.3 3.4-15.7 12-.2.4-.1.9.3 1.1 1.2.6 2.2 1.6 2.7 2.8.2.5.7.6 1.1.3C19.5 12 24.4 2.9 22.8 1.2zm-17.3 15c-.7 0-1.3.4-1.8.9h-.1c-.2 0-.4.3-.6.7-.7 1.2-.9 2.7-2 4.3-.2.3-.1.7.2.8 1.6.5 4.4 0 5.8-1v.1c.4-.1.3-.3.4-.3.5-.9 1-1.4 1-2.3-.1-1.7-1.3-3.2-2.9-3.2z" } },
	  bucket: { "path": { "d": "M22.6 5.1c0-2.9-4.5-4.2-8.8-4.2S5.1 2.2 5.1 5.1v.2C1.1 6.5.5 9 .5 10.4c0 1.4.7 2.8 1.9 3.9 1 .8 2.3 1.3 3.6 1.4h.4c3-.1 5.9-1.1 6.8-2.7-.5-.4-.7-.9-.7-1.5 0-1 .8-1.8 1.8-1.8s1.9.8 1.9 1.8c0 .8-.5 1.5-1.2 1.7-.9 2.6-4.6 4.3-9 4.3v2.8c0 1.5 3.5 2.8 7.8 2.8s7.9-1.3 7.9-2.8V7.1c.6-.6.9-1.2.9-2zm-8.8-1.4c3.1 0 5 .7 5.8 1.2.1.1.1.3 0 .4-.8.5-2.7 1.2-5.8 1.2s-4.9-.7-5.7-1.2c-.1-.1-.1-.3 0-.4.8-.5 2.7-1.2 5.7-1.2zM3.6 12.8c-.8-.6-1.3-1.5-1.3-2.4 0-2 1.9-3 3.6-3.4l.1.1v6.7c-.9 0-1.8-.4-2.4-1z" } },
	  builder: { "path": { "d": "M5.3 7.8H1.6c-.4 0-.7.4-.7.7v11.8c0 1 .9 1.9 1.9 1.9h2.5c.4 0 .7-.4.7-.7v-13c0-.3-.3-.7-.7-.7zm17.1 0H8.5c-.3 0-.7.4-.7.7v13c0 .3.4.7.7.7h12.7c1 0 1.9-.9 1.9-1.9V8.5c0-.3-.3-.7-.7-.7zm-1.2-6H2.8c-1 0-1.9.9-1.9 1.9v1.6c0 .4.3.7.7.7h20.8c.4 0 .7-.3.7-.7V3.7c0-1-.9-1.9-1.9-1.9z" } },
	  call: { "path": { "d": "M22.4 17.5l-2.8-2.3c-.7-.5-1.6-.5-2.2 0L15 16.9c-.3.3-.7.2-1-.1l-3.6-3.2L7.2 10c-.3-.3-.3-.6-.1-1l1.7-2.4c.5-.6.5-1.5 0-2.2L6.5 1.6C5.8.8 4.6.7 3.8 1.5L1.4 3.9c-.4.3-.6.9-.6 1.4.3 4.7 2.4 9.1 5.5 12.3s7.6 5.2 12.3 5.5c.6 0 1.1-.2 1.4-.6l2.4-2.4c.9-.7.9-2 0-2.6z" } },
	  capslock: { "path": { "d": "M20.1 9.7l-7.5-8.5c-.3-.4-.9-.4-1.2 0L3.9 9.7c-.3.4-.1.9.4.9h3.5v5.8c0 .4.4.7.7.7h7c.3 0 .7-.3.7-.7v-5.8h3.5c.5 0 .7-.5.4-.9zm-4.6 10.1h-7c-.3 0-.7.4-.7.7v1.9c0 .4.4.7.7.7h7c.3 0 .7-.3.7-.7v-1.9c0-.3-.4-.7-.7-.7z" } },
	  cases: { "path": { "d": "M4.2 1.6c0-.4-.4-.7-.7-.7H1.6c-.4 0-.7.3-.7.7v14.3c0 .4.3.7.7.7h1.9c.3 0 .7-.3.7-.7V1.6zm18.9 0c0-.4-.3-.7-.7-.7h-1.9c-.3 0-.7.3-.7.7v14.3c0 .4.4.7.7.7h1.9c.4 0 .7-.3.7-.7V1.6zM17.3.9h-1.4c-.3 0-.7.4-.7.8v5.7c0 .2.1.3.3.4.8.4 1.5.9 2.1 1.5.1.2.4.1.4-.1V1.7c0-.4-.3-.8-.7-.8zM11.1 7h1.8s.5-.2.5-.4V1.7c0-.4-.3-.8-.7-.8h-1.4c-.4 0-.7.4-.7.8v4.9c0 .2.2.5.5.4zM6.4 9.3c.6-.6 1.4-1.1 2.1-1.5.2-.1.3-.2.3-.4V1.7c0-.4-.4-.8-.7-.8H6.7c-.4 0-.7.4-.7.8v7.5c0 .2.2.3.4.1zm5.6-.5c-3.3 0-6 2.7-6 6 0 1 .3 2 .7 2.9L3.5 21c-.3.2-.3.6 0 .9l.9 1c.3.3.7.3 1 0l3.2-3.2c1 .7 2.2 1.1 3.4 1.1 3.3 0 6-2.7 6-6s-2.7-6-6-6zm0 9.2c-1.8 0-3.2-1.4-3.2-3.2s1.4-3.2 3.2-3.2 3.2 1.4 3.2 3.2S13.8 18 12 18z" } },
	  center_align_text: { "path": { "d": "M22.2 3c0-.4-.4-.7-.7-.7h-19c-.3 0-.7.3-.7.7v1.4c0 .4.4.7.7.7h19c.3 0 .7-.3.7-.7V3zm-2.8 5.5c0-.3-.3-.7-.7-.7H5.3c-.4 0-.7.4-.7.7v1.4c0 .4.3.7.7.7h13.4c.4 0 .7-.3.7-.7V8.5zm-.9 11.1c0-.4-.4-.7-.7-.7H6.2c-.3 0-.7.3-.7.7V21c0 .4.4.7.7.7h11.6c.3 0 .7-.3.7-.7v-1.4zm3.7-5.5c0-.4-.4-.7-.7-.7h-19c-.3 0-.7.3-.7.7v1.4c0 .3.4.7.7.7h19c.3 0 .7-.4.7-.7v-1.4z" } },
	  chart: { "path": { "d": "M21 10.8L11.5 16c-.6.3-1.3-.1-1.3-.8V3.9c0-.5-.5-.9-.9-.7-4.6 1.3-8 5.8-7.4 10.9.5 4.6 4.2 8.4 8.9 8.9 6.2.7 11.4-4.1 11.4-10.1 0-.5-.1-1.1-.2-1.6s-.6-.7-1-.5zm-8.2 2.1l9.1-4.8c.5-.3.7-1 .3-1.5-2-2.9-5.3-5-9-5.6-.6-.1-1.2.4-1.2 1v10.5c0 .4.4.6.8.4z" } },
	  chat: { "path": { "d": "M12 1.8C5.9 1.8 1 6.4 1 12c0 1.7.5 3.4 1.3 4.8.1.3.2.6.1.8l-1.4 4c-.2.3.2.6.6.6l3.9-1.6c.3-.1.5 0 .8.1 1.7.9 3.7 1.5 5.8 1.5 6 0 11-4.5 11-10.2C23 6.4 18.1 1.8 12 1.8zm-5.5 12c-1.1 0-1.9-.8-1.9-1.8s.8-1.8 1.9-1.8 1.8.8 1.8 1.8-.8 1.8-1.8 1.8zm5.5 0c-1 0-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8 1.8.8 1.8 1.8-.8 1.8-1.8 1.8zm5.5 0c-1 0-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8 1.9.8 1.9 1.8-.8 1.8-1.9 1.8z" } },
	  check: { "path": { "d": "M8.8 19.6L1.2 12c-.3-.3-.3-.8 0-1.1l1-1c.3-.3.8-.3 1 0L9 15.7c.1.2.5.2.6 0L20.9 4.4c.2-.3.7-.3 1 0l1 1c.3.3.3.7 0 1L9.8 19.6c-.2.3-.7.3-1 0z" } },
	  checkin: { "path": { "d": "M12 .9C7.2.9 3.2 4.8 3.2 9.7c0 6.1 6.3 11.7 8.2 13.2.4.3.8.3 1.2 0 1.9-1.5 8.2-7.1 8.2-13.2 0-4.9-4-8.8-8.8-8.8zm0 12.5c-2 0-3.7-1.7-3.7-3.7S10 6 12 6s3.7 1.7 3.7 3.7-1.7 3.7-3.7 3.7z" } },
	  chevrondown: { "path": { "d": "M22 8.2l-9.5 9.6c-.3.2-.7.2-1 0L2 8.2c-.2-.3-.2-.7 0-1l1-1c.3-.3.8-.3 1.1 0l7.4 7.5c.3.3.7.3 1 0l7.4-7.5c.3-.2.8-.2 1.1 0l1 1c.2.3.2.7 0 1z" } },
	  chevronleft: { "path": { "d": "M15.8 22l-9.6-9.4c-.3-.3-.3-.8 0-1.1l9.6-9.4c.3-.3.7-.3 1 0l1 1c.3.3.3.7 0 1l-7.6 7.4c-.3.3-.3.8 0 1.1l7.5 7.4c.3.3.3.7 0 1l-1 1c-.2.2-.6.2-.9 0z" } },
	  chevronright: { "path": { "d": "M8.3 2l9.5 9.5c.3.3.3.7 0 1L8.3 22c-.3.2-.8.2-1.1 0l-1-1c-.2-.3-.2-.8 0-1.1l7.6-7.4c.2-.3.2-.7 0-1L6.3 4.1C6 3.8 6 3.3 6.3 3l1-1c.3-.2.7-.2 1 0z" } },
	  chevronup: { "path": { "d": "M2 15.8l9.5-9.6c.3-.2.7-.2 1 0l9.5 9.6c.2.3.2.7 0 1l-1 1c-.3.3-.8.3-1.1 0l-7.4-7.6c-.3-.2-.7-.2-1 0l-7.4 7.6c-.3.2-.8.2-1.1 0l-1-1c-.2-.3-.2-.7 0-1z" } },
	  clear: { "path": { "d": "M12 .9C5.9.9.9 5.9.9 12s5 11.1 11.1 11.1 11.1-5 11.1-11.1S18.1.9 12 .9zm2.3 11.5l3.6 3.6c.1.2.1.4 0 .6l-1.3 1.3c-.2.2-.5.2-.7 0l-3.6-3.6c-.2-.2-.4-.2-.6 0l-3.6 3.6c-.2.2-.5.2-.7 0l-1.3-1.3c-.1-.2-.1-.4 0-.6l3.6-3.6c.2-.2.2-.5 0-.7L6.1 8.1c-.2-.2-.2-.5 0-.7l1.3-1.3c.2-.1.4-.1.6 0l3.7 3.7c.2.2.4.2.6 0l3.6-3.6c.2-.2.5-.2.7 0l1.3 1.3c.1.2.1.4 0 .6l-3.6 3.6c-.2.2-.2.5 0 .7z" } },
	  clock: { "path": { "d": "M12 .9C5.9.9.9 5.9.9 12s5 11.1 11.1 11.1 11.1-5 11.1-11.1S18.1.9 12 .9zm0 19.4c-4.6 0-8.3-3.7-8.3-8.3S7.4 3.7 12 3.7s8.3 3.7 8.3 8.3-3.7 8.3-8.3 8.3zm1.6-8.2c-.2-.1-.2-.3-.2-.5V7.2c0-.4-.3-.7-.7-.7h-1.4c-.4 0-.7.3-.7.7v5.5c0 .2.1.4.2.5l3.4 3.5c.3.2.7.2 1 0l1-1c.2-.3.2-.7 0-1l-2.6-2.6z" } },
	  close: { "path": { "d": "M14.3 11.7l6-6c.3-.3.3-.7 0-1l-.9-1c-.3-.2-.7-.2-1 0l-6 6.1c-.2.2-.5.2-.7 0l-6-6.1c-.3-.3-.7-.3-1 0l-1 1c-.2.2-.2.7 0 .9l6.1 6.1c.2.2.2.4 0 .6l-6.1 6.1c-.3.3-.3.7 0 1l1 1c.2.2.7.2.9 0l6.1-6.1c.2-.2.4-.2.6 0l6.1 6.1c.2.2.7.2.9 0l1-1c.3-.3.3-.7 0-1l-6-6c-.2-.2-.2-.5 0-.7z" } },
	  comments: { "path": { "d": "M22.1 14.3c-.1-.2-.1-.4 0-.5.6-1.1 1-2.3 1-3.6 0-4.1-3.5-7.4-7.9-7.4-2 0-3.8.8-5.2 2 4.7.5 8.5 4.4 8.5 9.1 0 1.1-.3 2.3-.7 3.3.5-.2 1-.4 1.5-.7.2-.1.4-.1.5 0l2.9 1.1c.2.1.5-.2.4-.4l-1-2.9zM8.8 6.5C4.4 6.5.9 9.8.9 13.9c0 1.3.4 2.5 1 3.5.1.2.1.4 0 .6l-1 2.8c-.1.3.2.5.4.4l2.9-1.1c.1 0 .3 0 .5.1 1.2.7 2.6 1 4.1 1 4.3 0 7.8-3.3 7.8-7.4 0-4-3.5-7.3-7.8-7.3z" } },
	  company: { "path": { "d": "M9.7 1.8H3.2c-.8 0-1.4.6-1.4 1.4v18.5c0 .2.3.5.5.5h1.9c.2 0 .4-.2.4-.5v-2.8c0-.3.2-.4.5-.4h2.7c.3 0 .5.1.5.4v2.8c0 .3.2.5.5.5h1.4c.5 0 .9-.5.9-1v-18c0-.8-.6-1.4-1.4-1.4zM5.5 16.4c0 .1-.1.2-.2.2H3.9c-.1 0-.2-.1-.2-.2v-2.3c0-.2.1-.3.2-.3h1.4c.1 0 .2.1.2.3v2.3zm0-4.6c0 .1-.1.2-.2.2H3.9c-.1 0-.2-.1-.2-.2V9.5c0-.2.1-.3.2-.3h1.4c.1 0 .2.1.2.3v2.3zm0-4.6c0 .1-.1.2-.2.2H3.9c-.1 0-.2-.1-.2-.2V4.8c0-.1.1-.2.2-.2h1.4c.1 0 .2.1.2.2v2.4zm3.7 9.2c0 .1-.1.2-.2.2H7.6c-.1 0-.2-.1-.2-.2v-2.3c0-.2.1-.3.2-.3H9c.1 0 .2.1.2.3v2.3zm0-4.6c0 .1-.1.2-.2.2H7.6c-.1 0-.2-.1-.2-.2V9.5c0-.2.1-.3.2-.3H9c.1 0 .2.1.2.3v2.3zm0-4.6c0 .1-.1.2-.2.2H7.6c-.1 0-.2-.1-.2-.2V4.8c0-.1.1-.2.2-.2H9c.1 0 .2.1.2.2v2.4zm11.6-.7h-6.5c-.8 0-1.4.6-1.4 1.3v13.9c0 .2.3.5.5.5h1.8c.3 0 .5-.2.5-.5v-2.8c0-.3.2-.4.5-.4h2.7c.3 0 .5.1.5.4v2.8c0 .3.2.5.4.5h1.4c.5 0 1-.5 1-1V7.8c0-.7-.6-1.3-1.4-1.3zm-4.2 9.9c0 .1-.1.2-.2.2H15c-.1 0-.2-.1-.2-.2v-2.3c0-.2.1-.3.2-.3h1.4c.1 0 .2.1.2.3v2.3zm0-4.6c0 .1-.1.2-.2.2H15c-.1 0-.2-.1-.2-.2V9.5c0-.2.1-.3.2-.3h1.4c.1 0 .2.1.2.3v2.3zm3.7 4.6c0 .1-.1.2-.2.2h-1.4c-.1 0-.2-.1-.2-.2v-2.3c0-.2.1-.3.2-.3h1.4c.1 0 .2.1.2.3v2.3zm0-4.6c0 .1-.1.2-.2.2h-1.4c-.1 0-.2-.1-.2-.2V9.5c0-.2.1-.3.2-.3h1.4c.1 0 .2.1.2.3v2.3z" } },
	  connected_apps: { "path": { "d": "M11 14.4l-1.8 8.1c-.1.5.5.8.8.4l9.7-12c.3-.3.1-.7-.3-.7h-5.2c-.4 0-.6-.5-.4-.7L18.4 2c.2-.5-.1-1.1-.6-1.1H9.6c-.5 0-.9.3-1.1.8L4.7 12.9c-.2.5.1.9.6.9h5.3c.2 0 .5.3.4.6z" } },
	  contract: { "path": { "d": "M13.7 11.1h7.1c.4 0 .6-.5.2-.9l-2.3-2.3 4.2-4.2c.2-.2.2-.7 0-.9l-1.7-1.7c-.2-.2-.6-.2-.9.1l-4.1 4.1L13.8 3c-.4-.3-.9-.2-.9.3v7.1c0 .3.4.7.8.7zm-3.4 1.8H3.2c-.4 0-.6.5-.2.9l2.3 2.3-4.2 4.2c-.2.2-.2.7 0 .9l1.7 1.7c.2.2.6.2.9 0l4.2-4.2 2.3 2.3c.4.4.9.2.9-.2v-7.1c0-.3-.4-.8-.8-.8zm2.6.8v7.1c0 .4.5.6.9.2l2.3-2.3 4.2 4.2c.2.2.7.2.9 0l1.7-1.7c.2-.2.2-.6-.1-.9l-4.1-4.1 2.3-2.4c.3-.4.2-.9-.3-.9h-7.1c-.3 0-.7.4-.7.8zm-1.8-3.4V3.2c0-.4-.5-.6-.9-.2L7.9 5.3 3.7 1.1c-.2-.2-.7-.2-.9 0L1.1 2.8c-.2.2-.2.6 0 .9l4.2 4.2L3 10.2c-.4.4-.2.9.2.9h7.1c.3 0 .8-.4.8-.8z" } },
	  contract_alt: { "path": { "d": "M13.7 11h7.1c.4 0 .6-.5.2-.8l-2.3-2.4 4.2-4.2c.2-.2.2-.6 0-.8l-1.7-1.7c-.2-.2-.6-.2-.9 0l-4.1 4.2L13.8 3c-.4-.4-.9-.2-.9.2v7.1c0 .4.4.7.8.7zm-3.4 1.9H3.2c-.4 0-.6.5-.2.9l2.3 2.3-4.2 4.2c-.2.2-.2.7 0 .9l1.7 1.7c.2.2.6.2.9 0l4.2-4.2 2.3 2.3c.4.4.9.2.9-.2v-7.1c0-.3-.4-.8-.8-.8z" } },
	  copy: { "path": { "d": "M20.3.9h-12c-1 0-1.8.9-1.8 1.9v.9h11c1.1 0 1.9.8 1.9 1.8v13h.9c1 0 1.9-.9 1.9-1.9V2.8c0-1-.9-1.9-1.9-1.9zm-2.8 6.5c0-1-.8-1.9-1.8-1.9h-12c-1 0-1.9.9-1.9 1.9v13.8c0 1 .9 1.9 1.9 1.9h12c1 0 1.8-.9 1.8-1.9V7.4zm-8.3 3.2c0 .3-.2.5-.4.5H5.1c-.3 0-.5-.2-.5-.5v-.9c0-.3.2-.5.5-.5h3.7c.2 0 .4.2.4.5v.9zm3.7 7.4c0 .3-.2.5-.4.5H5.1c-.3 0-.5-.2-.5-.5v-.9c0-.3.2-.5.5-.5h7.4c.2 0 .4.2.4.5v.9zm1.9-3.7c0 .3-.2.5-.5.5H5.1c-.3 0-.5-.2-.5-.5v-.9c0-.3.2-.5.5-.5h9.2c.3 0 .5.2.5.5v.9z" } },
	  crossfilter: { "path": { "d": "M16.2 4.2c-.8 0-1.6 0-2.3.3.9.7 1.6 1.5 2.2 2.4h.1c2.8 0 5 2.3 5 5.1s-2.2 5.1-5 5.1c-.7 0-1.4-.2-2-.4.3-.5.7-1.1.9-1.7.1-.2.2-.4.2-.6.3-.7.4-1.6.4-2.4 0-4.3-3.5-7.8-7.9-7.8S0 7.7 0 12s3.5 7.8 7.8 7.8c.8 0 1.6 0 2.3-.3-.9-.7-1.6-1.5-2.2-2.4h-.1c-2.8 0-5-2.3-5-5.1s2.2-5.1 5-5.1c.7 0 1.4.2 2.1.4-1 1.3-1.6 2.9-1.6 4.7 0 4.3 3.5 7.8 7.9 7.8S24 16.3 24 12s-3.5-7.8-7.8-7.8z" } },
	  custom_apps: { "path": { "d": "M22.8 5.6c-.1-.2-.4-.3-.6-.1l-3.8 3.7c-.3.3-.7.3-1 0l-2.6-2.6c-.3-.3-.3-.7 0-1l3.8-3.8c.1-.1 0-.5-.2-.6-.6-.2-1.3-.3-2-.3-3.9 0-7 3.4-6.6 7.4.1.7.3 1.2.5 1.8l-8.6 8.5c-1.1 1.1-1.1 2.7 0 3.7.5.5 1.2.8 1.8.8s1.3-.3 1.9-.8l8.5-8.6c.6.2 1.2.4 1.8.5 4 .4 7.4-2.7 7.4-6.6 0-.7-.1-1.4-.3-2z" } },
	  cut: { "path": { "d": "M18.8 14.5c-.8-.2-1.5-.1-2.2.1L6.4 1.1C6.3.9 6 .9 5.8 1l-.4.3c-.8.6-.9 1.7-.3 2.6l4.9 6.4c.2.3.2.6 0 .9l-2.7 3.4c-.6-.2-1.4-.2-2.1-.1-1.7.4-3.1 1.7-3.3 3.5-.4 2.7 2 5 4.8 4.6 1.7-.3 3-1.6 3.4-3.2.2-1.2 0-2.2-.5-3l1.9-2.6c.3-.4.8-.4 1.1 0l1.9 2.6c-.5.9-.7 1.9-.5 3 .3 1.6 1.7 2.9 3.4 3.2 2.8.4 5.2-1.9 4.8-4.6-.4-1.8-1.8-3.2-3.4-3.5zM6 19.9c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.3.6 1.3 1.4-.6 1.4-1.3 1.4zm12 0c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.3.6 1.3 1.4c0 .8-.6 1.4-1.3 1.4zM14.4 8.7c.2.3.6.3.8 0l3.7-4.8c.5-.7.4-1.6-.1-2.3h.1-.1c-.1-.1-.7-.6-.7-.6-.1-.1-.5-.1-.6.1l-4.1 5.4c-.2.2-.2.6 0 .8l1 1.4z" } },
	  dash: { "path": { "d": "M23.1 12.7c0 .4-.3.7-.7.7H1.6c-.4 0-.7-.3-.7-.7v-1.4c0-.4.3-.7.7-.7h20.8c.4 0 .7.3.7.7v1.4z" } },
	  dayview: { "path": { "d": "M20.3 3.2H18v-.9c0-.7-.6-1.4-1.4-1.4-.7 0-1.4.6-1.4 1.4v.9H8.8v-.9c0-.7-.6-1.4-1.4-1.4C6.6.9 6 1.5 6 2.3v.9H3.7c-1 0-1.9.9-1.9 1.9v1.1c0 .4.4.7.7.7h19c.3 0 .7-.3.7-.7V5.1c0-1-.9-1.9-1.9-1.9zm1.2 6h-19c-.3 0-.7.4-.7.7v11.3c0 1 .9 1.9 1.9 1.9h16.6c1 0 1.9-.9 1.9-1.9V9.9c0-.3-.4-.7-.7-.7zm-8.1 10.2v.1c0 .3-.5.8-.9.8s-1-.5-1-.9v-4.6l-.7.7c-.1.1-.2.2-.4.2-.4 0-.7-.3-.7-.7 0-.2.1-.4.2-.5l1.8-1.8c.2-.2.4-.3.7-.3.5 0 1 .4 1 .9v6.1z" } },
	  "delete": { "path": { "d": "M21 4.6h-5.8V2.8c0-1-.8-1.9-1.8-1.9h-2.8c-1 0-1.8.9-1.8 1.9v1.8H3c-.4 0-.7.3-.7.7v1.4c0 .4.3.7.7.7h18c.4 0 .7-.3.7-.7V5.3c0-.4-.3-.7-.7-.7zM10.6 3.2c0-.2.2-.4.5-.4h1.8c.3 0 .5.2.5.4v1.4h-2.8V3.2zm8.6 6H4.8c-.3 0-.6.4-.6.7v10.9c0 1.3 1 2.3 2.3 2.3h11c1.3 0 2.3-1 2.3-2.3V9.9c0-.3-.3-.7-.6-.7zm-8.6 10.2c0 .3-.2.4-.4.4h-1c-.2 0-.4-.1-.4-.4v-6.5c0-.3.2-.4.4-.4h1c.2 0 .4.1.4.4v6.5zm4.6 0c0 .3-.2.4-.4.4h-1c-.2 0-.4-.1-.4-.4v-6.5c0-.3.2-.4.4-.4h1c.2 0 .4.1.4.4v6.5z" } },
	  deprecate: { "path": { "d": "M22.2 3.2H1.8c-.5 0-.9.4-.9 1v12c0 .5.4.9.9.9h7.5c.5 2.6 2.7 4.6 5.5 4.6s5-2 5.4-4.6h2c.5 0 .9-.4.9-.9v-12c0-.6-.4-1-.9-1zm-4 15.1l-1.3 1.3-2.1-2.2-2.2 2.2-1.2-1.3 2.1-2.1-2.1-2.2 1.2-1.3 2.2 2.2 2.1-2.2 1.3 1.3-2.1 2.2 2.1 2.1zm3-3.1h-1c-.4-2.6-2.7-4.6-5.4-4.6s-5.1 2-5.5 4.6H2.8V5.1h18.4v10.1z" } },
	  desktop: { "path": { "d": "M23.1 2.8c0-1-.9-1.9-1.9-1.9H2.8C1.8.9.9 1.8.9 2.8v12c0 1 .9 1.8 1.9 1.8h18.4c1 0 1.9-.8 1.9-1.8v-12zm-2.8 10.4c0 .3-.3.6-.7.6H4.4c-.4 0-.7-.3-.7-.6V4.4c0-.4.3-.7.7-.7h15.2c.4 0 .7.3.7.7v8.8zm-5.1 7.1h-1.4c-.2 0-.4-.2-.4-.5v-.9c0-.3-.2-.4-.5-.4h-1.8c-.3 0-.5.1-.5.4v.9c0 .3-.2.5-.4.5H8.8c-1 0-1.9.8-1.9 1.9v.2c0 .4.3.7.7.7h8.8c.4 0 .7-.3.7-.7v-.2c0-1.1-.9-1.9-1.9-1.9z" } },
	  down: { "path": { "d": "M3.8 6.5h16.4c.4 0 .8.6.4 1l-8 9.8c-.3.3-.9.3-1.2 0l-8-9.8c-.4-.4-.1-1 .4-1z" } },
	  download: { "path": { "d": "M22.4 14.3H21c-.4 0-.7.3-.7.7v4.6c0 .4-.3.7-.7.7H4.4c-.4 0-.7-.3-.7-.7V15c0-.4-.3-.7-.7-.7H1.6c-.4 0-.7.3-.7.7v6.2c0 1 .9 1.9 1.9 1.9h18.4c1 0 1.9-.9 1.9-1.9V15c0-.4-.3-.7-.7-.7zm-10.9 3.1c.3.2.7.2 1 0l6.2-6.3c.3-.3.3-.7 0-.9l-.9-1c-.3-.3-.7-.3-1 0l-2.6 2.6c-.3.2-.8.1-.8-.4V1.6c0-.4-.4-.7-.7-.7h-1.4c-.4 0-.7.3-.7.7v9.8c0 .4-.5.6-.8.3L7.2 9.1c-.2-.2-.6-.2-.9 0l-1 1.1c-.3.2-.3.6 0 .9l6.2 6.3z" } },
	  edit: { "path": { "d": "M4.4 15.4l4.1 4.1c.2.2.5.2.6 0L19.4 9.2c.2-.2.2-.4 0-.6l-4.1-4.1c-.2-.2-.4-.2-.6 0L4.4 14.8c-.2.2-.2.5 0 .6zM16.7 2.6c-.2.2-.2.5 0 .7l4 4c.2.2.5.2.7 0l1.1-1.1c.8-.7.8-1.8 0-2.6l-2.1-2.1c-.8-.8-1.9-.8-2.7 0l-1 1.1zM1 22.2c-.1.5.3.9.8.8l5-1.2c.2 0 .3-.1.4-.2l.1-.1c.1-.1.1-.4-.1-.6l-4.1-4.1c-.2-.2-.5-.2-.6-.1l-.1.1c-.1.1-.2.3-.2.4l-1.2 5z" } },
	  email: { "path": { "d": "M11.5 13.9c.3.3.7.3 1 0l10.4-9.7c.2-.4.1-1-.6-1l-20.6.1c-.6 0-1.1.5-.6.9l10.4 9.7zM23.1 8c0-.5-.6-.8-.9-.4L14 15.1c-.6.5-1.3.8-2 .8s-1.4-.3-2-.8L1.9 7.6c-.4-.4-.9-.1-.9.4C.9 7.8.9 18.5.9 18.5c0 1 .9 1.8 1.9 1.8h18.4c1 0 1.9-.8 1.9-1.8V8z" } },
	  end_call: { "path": { "d": "M22.4 2.6l-1-1c-.3-.3-.8-.2-1.1.2L9.5 12.6 7.2 10c-.3-.3-.3-.6-.1-1l1.7-2.4c.5-.6.5-1.5 0-2.2L6.5 1.6C5.8.8 4.6.7 3.8 1.5L1.4 3.9c-.4.3-.6.9-.6 1.4.3 4.2 2 8.3 4.6 11.3l-3.6 3.7c-.4.3-.4.8-.2 1.1l1 1c.3.3.8.2 1.1-.2L22.2 3.7c.4-.3.5-.8.2-1.1zm0 14.9l-2.8-2.3c-.7-.5-1.6-.5-2.2 0L15 16.9c-.3.3-.7.2-1-.1l-1.1-1-3.9 4c2.8 1.8 6.1 3.1 9.6 3.3.6 0 1.1-.2 1.4-.6l2.4-2.4c.9-.7.9-2 0-2.6z" } },
	  erect_window: { "path": { "d": "M23.1 3c0 .4-.3.7-.7.7H1.6c-.4 0-.7-.3-.7-.7V1.6c0-.4.3-.7.7-.7h20.8c.4 0 .7.3.7.7V3z" } },
	  error: { "path": { "d": "M12 .9C5.9.9.9 5.9.9 12s5 11.1 11.1 11.1 11.1-5 11.1-11.1S18.1.9 12 .9zm5.5 11.9c-.1.3-.3.6-.7.6H7.2c-.4 0-.6-.2-.7-.6v-1.6c.1-.3.3-.6.7-.6h9.6c.4 0 .6.3.7.6v1.6z" } },
	  event: { "path": { "d": "M21.5 9.2h-19c-.3 0-.7.4-.7.7v11.3c0 1 .9 1.9 1.9 1.9h16.6c1 0 1.9-.9 1.9-1.9V9.9c0-.3-.4-.7-.7-.7zM8.8 19.4c0 .3-.2.4-.5.4H6.5c-.3 0-.5-.1-.5-.4v-1.9c0-.2.2-.4.5-.4h1.8c.3 0 .5.2.5.4v1.9zm0-4.6c0 .2-.2.4-.5.4H6.5c-.3 0-.5-.2-.5-.4v-1.9c0-.3.2-.4.5-.4h1.8c.3 0 .5.1.5.4v1.9zm4.6 4.6c0 .3-.2.4-.5.4h-1.8c-.3 0-.5-.1-.5-.4v-1.9c0-.2.2-.4.5-.4h1.8c.3 0 .5.2.5.4v1.9zm0-4.6c0 .2-.2.4-.5.4h-1.8c-.3 0-.5-.2-.5-.4v-1.9c0-.3.2-.4.5-.4h1.8c.3 0 .5.1.5.4v1.9zm4.6 4.6c0 .3-.2.4-.5.4h-1.8c-.3 0-.5-.1-.5-.4v-1.9c0-.2.2-.4.5-.4h1.8c.3 0 .5.2.5.4v1.9zm0-4.6c0 .2-.2.4-.5.4h-1.8c-.3 0-.5-.2-.5-.4v-1.9c0-.3.2-.4.5-.4h1.8c.3 0 .5.1.5.4v1.9zm2.3-11.6H18v-.9c0-.7-.6-1.4-1.4-1.4-.7 0-1.4.6-1.4 1.4v.9H8.8v-.9c0-.7-.6-1.4-1.4-1.4C6.6.9 6 1.5 6 2.3v.9H3.7c-1 0-1.9.9-1.9 1.9v1.1c0 .4.4.7.7.7h19c.3 0 .7-.3.7-.7V5.1c0-1-.9-1.9-1.9-1.9z" } },
	  expand: { "path": { "d": "M22.5.9h-7.1c-.5 0-.6.4-.3.8L17.4 4l-4.2 4.1c-.2.3-.2.6 0 .9l1.8 1.7c.2.2.6.2.8 0L20 6.5l2.3 2.3c.4.3.8.2.8-.3V1.4c0-.2-.3-.5-.6-.5zM1.6 23.1h7.1c.5 0 .6-.5.3-.9l-2.3-2.3 4.1-4.2c.3-.2.3-.7 0-.9l-1.7-1.7c-.2-.2-.6-.2-.8 0l-4.2 4.2L1.8 15c-.4-.4-.9-.2-.9.2v7.1c0 .4.4.8.7.8zm21.5-.6v-7.1c0-.5-.4-.6-.8-.3L20 17.4l-4.1-4.2c-.3-.2-.6-.2-.9 0L13.3 15c-.2.2-.2.6 0 .8l4.2 4.2-2.3 2.3c-.3.4-.2.8.3.8h7.1c.2 0 .5-.3.5-.6zM.9 1.6v7.1c0 .5.5.6.9.3l2.3-2.3 4.2 4.1c.2.3.7.3.9 0l1.7-1.7c.2-.2.2-.6 0-.8L6.7 4.1 9 1.8c.4-.4.2-.9-.2-.9H1.7c-.4 0-.8.4-.8.7z" } },
	  expand_alt: { "path": { "d": "M22.5.9h-7.1c-.5 0-.6.4-.3.8L17.4 4l-4.2 4.1c-.2.3-.2.6 0 .9l1.8 1.7c.2.2.6.2.8 0L20 6.5l2.3 2.3c.4.3.8.2.8-.3V1.4c0-.2-.3-.5-.6-.5zM1.6 23.1h7.1c.5 0 .6-.5.3-.9l-2.3-2.3 4.1-4.2c.3-.2.3-.7 0-.9l-1.7-1.7c-.2-.2-.6-.2-.8 0l-4.2 4.2L1.8 15c-.4-.4-.9-.2-.9.2v7.1c0 .4.4.8.7.8z" } },
	  favorite: { "path": { "d": "M12.6 1.9l2.2 6.5c.1.2.3.4.6.4h6.9c.7 0 1 .9.5 1.3l-5.7 4.2c-.2.1-.3.5-.2.7l2.2 6.7c.2.6-.5 1.2-1.1.8l-5.5-4.1c-.3-.2-.6-.2-.9 0L6 22.5c-.6.4-1.3-.2-1.1-.8L7.1 15c.1-.2 0-.6-.3-.7l-5.6-4.2c-.6-.4-.2-1.3.4-1.3h6.9c.4 0 .6-.1.7-.4l2.2-6.6c.1-.6 1.1-.6 1.2.1z" } },
	  filter: { "path": { "d": "M11.3 14.7c-.3-.3-.7-.3-1 0l-1.7 1.6c-.2.3-.8.1-.8-.3V9.9c0-.3-.3-.7-.6-.7H5.8c-.4 0-.7.4-.7.7V16c0 .4-.5.6-.8.3l-1.7-1.6c-.2-.3-.7-.3-.9 0l-1.1 1c-.2.3-.2.7 0 1L6 22c.2.2.6.2.9 0l5.4-5.4c.3-.3.3-.7 0-1l-1-.9zM23.5 4.4c0-.4-.3-.7-.7-.7h-17c-.4 0-.7.3-.7.7v1.4c0 .3.3.7.7.7h17c.4 0 .7-.4.7-.7V4.4zm0 5.5c0-.3-.3-.7-.7-.7H10.4c-.4 0-.7.4-.7.7v1.4c0 .4.3.7.7.7h12.4c.4 0 .7-.3.7-.7V9.9zm0 5.6c0-.4-.3-.7-.7-.7H15c-.4 0-.7.3-.7.7v1.3c0 .4.3.7.7.7h7.8c.4 0 .7-.3.7-.7v-1.3z" } },
	  filterList: { "path": { "d": "M22.3 1.8H1.8c-.7 0-1 .8-.6 1.3l9 10.5c.2.3.4.8.4 1.2v6.7c0 .3.3.7.7.7h1.4c.4 0 .6-.4.6-.7v-6.7c0-.4.2-.9.5-1.2l9.1-10.5c.4-.5.1-1.3-.6-1.3z" } },
	  forward: { "path": { "d": "M1.6 13.4h15.3c.4 0 .6.5.3.8l-4.4 4.4c-.3.3-.3.7 0 1l1 1c.3.3.7.3 1 0l8-8.1c.3-.3.3-.7 0-1l-8-8.1c-.3-.3-.7-.3-1 0l-1 1c-.2.3-.2.7 0 1l4.5 4.4c.2.3.1.8-.4.8H1.6c-.4 0-.7.3-.7.7v1.3c0 .4.3.8.7.8z" } },
	  frozen: { "path": { "d": "M22.4 10.6h-3.3l2-2c.2-.2.2-.6 0-.8l-.8-.7c-.2-.3-.5-.3-.7 0L16 10.6h-2.6V8l3.5-3.6c.3-.2.3-.5 0-.7l-.7-.8c-.3-.2-.6-.2-.8 0l-2 2V1.6c0-.4-.3-.7-.7-.7h-1.4c-.4 0-.7.3-.7.7v3.3l-2-2c-.2-.2-.6-.2-.8 0l-.7.8c-.3.2-.3.5 0 .7L10.6 8v2.6H8L4.4 7.1c-.2-.3-.5-.3-.7 0l-.8.7c-.2.3-.2.6 0 .8l2 2H1.6c-.4 0-.7.3-.7.7v1.4c0 .4.3.7.7.7h3.3l-2 2c-.2.2-.2.6 0 .8l.7.7c.3.2.6.2.8 0l3.5-3.6h2.7v2.6l-3.5 3.6c-.3.2-.3.5 0 .7l.7.8c.2.2.6.2.8 0l2-2.1v3.3c0 .4.3.8.7.8h1.3c.4 0 .8-.4.8-.8v-3.3l2 2.1c.2.2.6.2.8 0l.7-.8c.2-.2.2-.5 0-.7L13.4 16v-2.6H16l3.6 3.5c.2.3.5.3.7 0l.7-.7c.3-.2.3-.6 0-.7l-1.9-2.1h3.3c.4 0 .7-.3.7-.7v-1.4c0-.4-.3-.7-.7-.7z" } },
	  groups: { "path": { "d": "M7.3 12.9c-.6-.9-.9-2.1-.9-3.3 0-2.1.8-3.9 2.2-4.9-.4-.9-1.4-1.5-2.6-1.5-2 0-3.1 1.7-3.1 3.6 0 1 .3 1.9 1 2.5.3.3.7.8.7 1.3s-.2.9-1.4 1.4c-1.6.7-3.2 1.8-3.2 3.3 0 1 .7 1.8 1.7 1.8h1.5c.2 0 .4-.2.6-.4.7-1.3 2.1-2.2 3.3-2.8.4-.1.5-.7.2-1zm13.5-.9c-1.1-.5-1.3-.9-1.3-1.4s.3-1 .7-1.3c.7-.7 1-1.5 1-2.5 0-1.9-1.1-3.6-3.2-3.6-1.2 0-2.1.6-2.6 1.5 1.4 1 2.2 2.8 2.2 4.9 0 1.2-.3 2.4-.9 3.3-.3.4-.1.9.2 1 1.2.6 2.6 1.5 3.3 2.8.2.2.4.4.6.4h1.5c1 0 1.7-.8 1.7-1.8 0-1.5-1.5-2.6-3.2-3.3zm-5.7 3.4c-1.3-.6-1.5-1.1-1.5-1.6 0-.6.4-1.1.8-1.4.7-.7 1.2-1.7 1.2-2.8 0-2.1-1.3-3.9-3.6-3.9S8.5 7.5 8.5 9.6c0 1.1.5 2.1 1.2 2.8.4.4.8.9.8 1.4 0 .6-.2 1-1.5 1.6-1.8.8-3.6 1.6-3.6 3.3 0 1.1.8 2 1.8 2h9.6c1.1 0 1.9-.9 1.9-2 0-1.6-1.8-2.5-3.6-3.3z" } },
	  help: { "path": { "d": "M13.1 17.5h-2.3c-.4 0-.6-.2-.6-.6v-.7c0-1.9 1.2-3.7 3-4.3.6-.2 1.1-.5 1.5-1 2.3-2.8.2-6.1-2.6-6.2-1 0-1.9.3-2.7 1-.6.6-1 1.3-1 2.1-.1.2-.4.5-.7.5H5.4c-.5 0-.8-.4-.7-.8.1-1.7.9-3.3 2.2-4.5C8.4 1.6 10.2.8 12.3.9c3.8.1 6.9 3.3 7.1 7.1.1 3.2-1.9 6.1-4.9 7.2-.4.2-.7.5-.7 1v.6c0 .5-.3.7-.7.7zm.7 4.9c0 .4-.3.7-.6.7h-2.4c-.3 0-.6-.3-.6-.7v-2.3c0-.4.3-.7.6-.7h2.4c.3 0 .6.3.6.7v2.3z" } },
	  home: { "path": { "d": "M22.6 12.5h-2.3v10.1c0 .3-.2.5-.5.5h-4.6c-.2 0-.4-.2-.4-.5v-7.8H9.2v7.8c0 .3-.2.5-.4.5H4.2c-.3 0-.5-.2-.5-.5V12.5H1.4c-.2 0-.4-.1-.4-.3-.1-.2-.1-.4.1-.5L11.7 1.1c.2-.2.5-.2.6 0l10.6 10.6c.2.1.2.3.1.5s-.2.3-.4.3z" } },
	  identity: { "path": { "d": "M21.2 3.7h-5.1s.1.3.1.5c0 1.8-1.5 3.2-3.3 3.2h-2.7C8.4 7.4 6.9 6 6.9 4.2c0-.2 0-.5.1-.5H2.8c-1 0-1.9.8-1.9 1.8v13.9c0 1 .9 1.8 1.9 1.8h18.4c1 0 1.9-.8 1.9-1.8V5.5c0-1-.9-1.8-1.9-1.8zM10 17.5H4.8c-.6 0-1.1-.5-1.1-1.1 0-.9 1-1.4 2-1.9.7-.2.8-.5.8-.8 0-.3-.2-.6-.5-.8-.4-.4-.6-.9-.6-1.5 0-1.2.7-2.2 1.9-2.2s2 1 2 2.2c0 .6-.3 1.1-.7 1.5-.2.2-.4.5-.4.8 0 .2.1.5.8.8 1 .5 2 1 2 1.9.1.6-.4 1.1-1 1.1zm10.3-1.8c0 .3-.2.5-.5.5h-6.4c-.3 0-.5-.2-.5-.5v-.9c0-.3.2-.5.5-.5h6.4c.3 0 .5.2.5.5v.9zm.9-3.7c0 .3-.2.5-.4.5h-7.4c-.3 0-.5-.2-.5-.5v-.9c0-.3.2-.5.5-.5h7.4c.2 0 .4.2.4.5v.9zm-11-6.5h2.7c.8 0 1.4-.6 1.4-1.3s-.6-1.4-1.4-1.4h-2.7c-.8 0-1.4.6-1.4 1.4s.6 1.3 1.4 1.3z" } },
	  image: { "path": { "d": "M23.1 4.6c0-1-.9-1.8-1.9-1.8H2.8c-1 0-1.9.8-1.9 1.8v14.8c0 1 .9 1.8 1.9 1.8h18.4c1 0 1.9-.8 1.9-1.8V4.6zm-4.8 12.9H4.9c-.6 0-.9-.6-.6-1l4.1-7.1c.1-.3.6-.3.7 0l2.5 4.2c.2.3.6.3.8.1l2-2.9c.1-.3.6-.3.7 0l3.7 5.8c.3.4 0 .9-.5.9zm-1.2-8.3c-1 0-1.9-.8-1.9-1.8s.9-1.9 1.9-1.9 1.8.9 1.8 1.9-.8 1.8-1.8 1.8z" } },
	  inbox: { "path": { "d": "M23.1 3.7c0-1-.9-1.9-1.9-1.9H2.8c-1 0-1.9.9-1.9 1.9v16.6c0 1 .9 1.9 1.9 1.9h18.4c1 0 1.9-.9 1.9-1.9V3.7zM8.8 16.2c0 .2-.2.4-.5.4H4.2c-.3 0-.5-.2-.5-.4v-1.9c0-.3.2-.5.5-.5h4.1c.3 0 .5.2.5.5v1.9zm0-4.7c0 .3-.2.5-.5.5H4.2c-.3 0-.5-.2-.5-.5V9.7c0-.3.2-.5.5-.5h4.1c.3 0 .5.2.5.5v1.8zm0-4.6c0 .3-.2.5-.5.5H4.2c-.3 0-.5-.2-.5-.5V5.1c0-.3.2-.5.5-.5h4.1c.3 0 .5.2.5.5v1.8zm11.5 12c0 .3-.2.5-.5.5h-8.7c-.3 0-.5-.2-.5-.5V5.1c0-.3.2-.5.5-.5h8.7c.3 0 .5.2.5.5v13.8z" } },
	  info: { "path": { "d": "M12 .9C5.9.9.9 5.9.9 12s5 11.1 11.1 11.1 11.1-5 11.1-11.1S18.1.9 12 .9zm0 5.6c.8 0 1.4.6 1.4 1.4s-.6 1.4-1.4 1.4-1.4-.6-1.4-1.4.6-1.4 1.4-1.4zm2.3 9.7c0 .2-.2.4-.5.4h-3.6c-.3 0-.5-.1-.5-.4v-.9c0-.3.2-.5.5-.5.2 0 .4-.2.4-.4v-1.9c0-.2-.2-.5-.4-.5-.3 0-.5-.1-.5-.4v-.9c0-.3.2-.5.5-.5h2.7c.3 0 .5.2.5.5v3.7c0 .2.2.4.4.4.3 0 .5.2.5.5v.9z" } },
	  insert_tag_field: { "path": { "d": "M7.5 5.6l-1-.8c-.4-.3-.7-.2-1 0L.1 11.6c-.1.2-.1.6 0 .9l5.4 6.7c.3.2.7.3 1 0l1.1-.8c.3-.3.3-.7.1-1L3.3 12l4.4-5.4c.2-.3.1-.7-.2-1zm16.4 6l-5.4-6.7c-.3-.3-.7-.4-1-.1l-1.1.9c-.3.2-.3.7-.1.9l4.4 5.4-4.4 5.4c-.2.3-.1.8.1 1l1.1.9c.3.2.7.2 1-.1l5.4-6.7c.1-.4.1-.7 0-.9zM14.6 5l-1.4-.3c-.4-.1-.8.1-.9.5L8.9 18.3c-.1.3.1.7.5.8l1.4.3c.4.1.8-.1.9-.5l3.4-13.1c.1-.4-.1-.7-.5-.8z" } },
	  insert_template: { "path": { "d": "M22.4 17.5h-2.1v-2c0-.4-.3-.7-.7-.7h-1.4c-.3 0-.7.3-.7.7v2h-2c-.4 0-.7.4-.7.7v1.4c0 .4.3.7.7.7h2v2.1c0 .4.4.7.7.7h1.4c.4 0 .7-.3.7-.7v-2.1h2.1c.4 0 .7-.3.7-.7v-1.4c0-.3-.3-.7-.7-.7zm-6.7-3.9c0-.4.3-.7.7-.7h1.1V2.8c0-1-.8-1.9-1.8-1.9H2.8C1.8.9.9 1.8.9 2.8v12.9c0 1 .9 1.8 1.9 1.8h10.1v-1.1c0-.4.3-.7.7-.7h2.1v-2.1zM7.4 5.1c0 .3-.2.4-.5.4H4.2c-.3 0-.5-.1-.5-.4v-.9c0-.3.2-.5.5-.5h2.7c.3 0 .5.2.5.5v.9zm5.5 7.4c0 .2-.2.4-.4.4H4.2c-.3 0-.5-.2-.5-.4v-1c0-.2.2-.4.5-.4h8.3c.2 0 .4.2.4.4v1zm1.9-3.7c0 .2-.2.4-.5.4H4.2c-.3 0-.5-.2-.5-.4v-1c0-.2.2-.4.5-.4h10.1c.3 0 .5.2.5.4v1z" } },
	  italic: { "path": { "d": "M17.5 5.7v-.6c0-.5-.4-.9-.9-.9h-6.4c-.6 0-1 .4-1 .9V6c0 .5.4.9 1 .9.7 0 1.3.8 1.2 1.5l-1.7 8.1c-.1.6-.7 1-1.2 1H7.4c-.5 0-.9.5-.9 1v.9c0 .5.4.9.9.9h6.4c.6 0 1-.4 1-.9v-.9c0-.5-.4-1-1-1-.7 0-1.3-.7-1.2-1.4l1.7-8.2c.1-.6.7-1 1.2-1h.8c.7 0 1.2-.5 1.2-1.2z" } },
	  justify_text: { "path": { "d": "M22.2 3c0-.4-.4-.7-.7-.7h-19c-.3 0-.7.3-.7.7v1.4c0 .4.4.7.7.7h19c.3 0 .7-.3.7-.7V3zm0 5.5c0-.3-.4-.7-.7-.7h-19c-.3 0-.7.4-.7.7v1.4c0 .4.4.7.7.7h19c.3 0 .7-.3.7-.7V8.5zm0 11.1c0-.4-.4-.7-.7-.7h-19c-.3 0-.7.3-.7.7V21c0 .4.4.7.7.7h19c.3 0 .7-.3.7-.7v-1.4zm0-5.5c0-.4-.4-.7-.7-.7h-19c-.3 0-.7.3-.7.7v1.4c0 .3.4.7.7.7h19c.3 0 .7-.4.7-.7v-1.4z" } },
	  kanban: { "path": { "d": "M14.8 8.1c0-.4-.4-.7-.7-.7H9.9c-.3 0-.7.3-.7.7v12.4c0 .4.4.7.7.7h4.2c.3 0 .7-.3.7-.7V8.1zm-8.3 0c0-.4-.4-.7-.7-.7H1.6c-.4 0-.7.3-.7.7v14.3c0 .4.3.7.7.7h4.2c.3 0 .7-.3.7-.7V8.1zm16.6 0c0-.4-.3-.7-.7-.7h-4.2c-.3 0-.7.3-.7.7v10.6c0 .4.4.7.7.7h4.2c.4 0 .7-.3.7-.7V8.1zm0-6.5c0-.4-.3-.7-.7-.7H1.6c-.4 0-.7.3-.7.7v2.3c0 .4.3.7.7.7h20.8c.4 0 .7-.3.7-.7V1.6z" } },
	  knowledge_base: { "path": { "d": "M4.4 16.2h6c.4 0 .7-.4.7-.7V4.6c0-.8-.9-1.4-1.5-1.4H4.4c-.4 0-.7.4-.7.7v11.6c0 .3.3.7.7.7zM22.7 5.4c-.3-.1-.5.1-.5.4v11.5c0 .4-.4.7-.7.7h-19c-.3 0-.7-.3-.7-.7V5.9c0-.4-.3-.6-.6-.5-.7.4-1.2 1.1-1.2 2V18c0 1 .8 1.8 1.8 1.8h7.7c.3 0 .7.4.7.7s.3.7.6.7h2.4c.3 0 .6-.3.6-.7s.4-.7.7-.7h7.7c1 0 1.8-.8 1.8-1.8V7.4c0-1-.3-1.8-1.3-2zm-9.1 10.8h6c.4 0 .7-.4.7-.7V3.9c0-.3-.3-.7-.7-.7h-5.2c-.7 0-1.5.6-1.5 1.4v10.9c0 .3.3.7.7.7z" } },
	  layers: { "path": { "d": "M16.6 9.2c0-1-.8-1.8-1.8-1.8h-12c-1 0-1.9.8-1.9 1.8v12c0 1 .9 1.9 1.9 1.9h12c1 0 1.8-.9 1.8-1.9v-12zM19.8.9h-12C6 .9 4.6 2.4 4.6 4.2v1.3h12c1 0 1.9.9 1.9 1.9v12h1.3c1.8 0 3.3-1.4 3.3-3.2v-12c0-1.8-1.5-3.3-3.3-3.3z" } },
	  layout: { "path": { "d": "M22.2 23.1H1.8c-.5 0-.9-.4-.9-.9V1.8c0-.5.4-.9.9-.9h20.4c.5 0 .9.4.9.9v20.4c0 .5-.4.9-.9.9zM2.8 21.2h18.4V2.8H2.8v18.4zM18 9.2H6c-.3 0-.5-.2-.5-.4V6c0-.3.2-.5.5-.5h12c.3 0 .5.2.5.5v2.8c0 .2-.2.4-.5.4zm-9.2 9.3H6c-.3 0-.5-.2-.5-.5v-5.5c0-.3.2-.5.5-.5h2.8c.2 0 .4.2.4.5V18c0 .3-.2.5-.4.5zm9.2 0h-5.5c-.3 0-.5-.2-.5-.5v-5.5c0-.3.2-.5.5-.5H18c.3 0 .5.2.5.5V18c0 .3-.2.5-.5.5z" } },
	  left: { "path": { "d": "M17.5 3.8v16.4c0 .4-.6.8-1 .4l-9.8-8c-.3-.3-.3-.9 0-1.2l9.8-8c.4-.4 1-.1 1 .4z" } },
	  left_align_text: { "path": { "d": "M22.2 3c0-.4-.4-.7-.7-.7h-19c-.3 0-.7.3-.7.7v1.4c0 .4.4.7.7.7h19c.3 0 .7-.3.7-.7V3zm-3.7 5.5c0-.3-.4-.7-.7-.7H2.5c-.3 0-.7.4-.7.7v1.4c0 .4.4.7.7.7h15.3c.3 0 .7-.3.7-.7V8.5zm0 11.1c0-.4-.4-.7-.7-.7H2.5c-.3 0-.7.3-.7.7V21c0 .4.4.7.7.7h15.3c.3 0 .7-.3.7-.7v-1.4zm3.7-5.5c0-.4-.4-.7-.7-.7h-19c-.3 0-.7.3-.7.7v1.4c0 .3.4.7.7.7h19c.3 0 .7-.4.7-.7v-1.4z" } },
	  like: { "path": { "d": "M4.8 9.7H2.5c-.3 0-.7.3-.7.7V21c0 .4.4.7.7.7h1.2c1 0 1.8-.8 1.8-1.9v-9.4c0-.4-.3-.7-.7-.7zm15.5.5h-2.8c-1 0-1.8-.9-1.8-1.9V3.7c0-1-.8-1.9-1.9-1.9h-1.1c-.4 0-.7.4-.7.7v2.8c0 2.5-1.7 4.9-3.9 4.9-.4 0-.7.3-.7.6v9.3c0 .3.3.7.6.7 3.2.1 4.2 1.4 7.5 1.4 3.5 0 6.7-.4 6.7-4.4V12c0-1-.9-1.8-1.9-1.8z" } },
	  link: { "path": { "d": "M12.6 19.2l-1-.1s-.7-.1-1-.3c-.2 0-.4 0-.5.2l-.3.2c-1.3 1.3-3.5 1.5-4.9.3-1.5-1.4-1.6-3.8-.1-5.2l3.5-3.5c.4-.5 1-.7 1.5-.9.8-.2 1.6-.2 2.2.1.5.2.9.4 1.2.8.2.2.4.4.5.6.2.3.6.4.8.1l1.3-1.3c.2-.2.2-.5.1-.7-.2-.3-.4-.5-.7-.7-.3-.4-.7-.7-1.1-.9-.6-.4-1.4-.7-2.1-.8-1.5-.3-3-.1-4.3.6-.5.3-1.1.7-1.5 1.1l-3.3 3.3C.4 14.6.2 18.6 2.6 21c2.4 2.7 6.6 2.8 9.1.2l1.2-1.1c.3-.3.1-.8-.3-.9zM21 2.7C18.5.3 14.5.5 12.1 3l-1 1c-.3.3-.1.8.3.9.6 0 1.3.2 1.9.4.2 0 .5 0 .6-.2l.2-.2c1.4-1.3 3.5-1.5 4.9-.3 1.6 1.4 1.6 3.8.2 5.2l-3.5 3.5c-.5.5-1 .7-1.6.9-.7.2-1.5.2-2.2-.1-.4-.2-.8-.4-1.2-.8-.2-.2-.3-.4-.5-.6-.1-.3-.6-.4-.8-.1l-1.3 1.3c-.2.2-.2.5 0 .7.2.3.4.5.6.7.3.3.8.7 1.1.9.7.4 1.4.7 2.2.8 1.4.3 3 .1 4.2-.6.6-.3 1.1-.7 1.5-1.1l3.5-3.5c2.6-2.5 2.5-6.7-.2-9.1z" } },
	  list: { "path": { "d": "M3.7 4.8c0-.3-.3-.6-.7-.6H1.6c-.4 0-.7.3-.7.6v1.4c0 .4.3.7.7.7H3c.4 0 .7-.3.7-.7V4.8zm19.4 0c0-.3-.3-.6-.7-.6H6.2c-.3 0-.7.3-.7.6v1.4c0 .4.4.7.7.7h16.2c.4 0 .7-.3.7-.7V4.8zM3.7 11.3c0-.4-.3-.7-.7-.7H1.6c-.4 0-.7.3-.7.7v1.4c0 .4.3.7.7.7H3c.4 0 .7-.3.7-.7v-1.4zm17.5 0c0-.4-.3-.7-.7-.7H6.2c-.3 0-.7.3-.7.7v1.4c0 .4.4.7.7.7h14.3c.4 0 .7-.3.7-.7v-1.4zM3.7 17.8c0-.4-.3-.7-.7-.7H1.6c-.4 0-.7.3-.7.7v1.4c0 .3.3.6.7.6H3c.4 0 .7-.3.7-.6v-1.4zm19.4 0c0-.4-.3-.7-.7-.7H6.2c-.3 0-.7.3-.7.7v1.4c0 .3.4.6.7.6h16.2c.4 0 .7-.3.7-.6v-1.4z" } },
	  location: { "path": { "d": "M22.5 4.4l-6.6-3.3c-.3-.2-.7-.2-1 0L8.8 4.2 2.6 1.1c-.4-.2-.8-.2-1.2 0-.3.2-.5.6-.5.9v16.6c0 .5.3.8.6 1l6.7 3.3c.3.2.7.2.9 0l6.2-3.1 6.2 3.1c.1.1.3.2.5.2s.4-.1.6-.2c.3-.2.5-.6.5-.9V5.4c0-.5-.2-.8-.6-1zm-1.7 2.1v8.8c0 .5-.5.9-1 .7-1.7-.7-.3-3.5-1.5-5.1-1.2-1.4-2.7 0-4.1-2.2-1.3-2.2.5-3.8 2.1-4.6.3-.1.5-.1.7 0l3.4 1.7c.3.2.4.4.4.7zm-9.3 12.8c-.3.2-.6.1-.8-.1-.5-.4-.9-1-.9-1.7 0-1.1-1.8-.7-1.8-2.9 0-1.8-2.1-2.3-3.9-2.1-.5.1-.8-.3-.8-.7V5c0-.5.5-.9 1-.6l4 2h.1l.1.1c1.7 1 1.3 1.8.6 3-.7 1.3-1.1 0-2.2-.4s-2.2.4-1.8 1.1 1.5 0 2.2.7.7 1.9 2.9 1.1 2.6-.3 3.4.4c.7.8 1.1 2.2 0 3.3-.7.7-1 2.1-1.2 3-.1.2-.2.4-.4.5l-.5.1z" } },
	  lock: { "path": { "d": "M5.1 8.8h1.8c.3 0 .5-.2.5-.4v-.1c0-2.6 2.2-4.8 4.9-4.6 2.5.2 4.3 2.3 4.3 4.8v-.1c0 .2.2.4.5.4h1.8c.3 0 .5-.2.5-.4v-.1c0-4.2-3.5-7.6-7.8-7.4-3.9.2-6.9 3.5-7 7.5.1.2.2.4.5.4zm-.5-.4v.1-.1zm16.6 4.1c0-1.1-.8-1.9-1.8-1.9H4.6c-1 0-1.8.8-1.8 1.9v8.7c0 1 .8 1.9 1.8 1.9h14.8c1 0 1.8-.9 1.8-1.9v-8.7zm-7.1 7.2c.1.3-.1.6-.4.6h-3.4c-.3 0-.5-.3-.5-.6l.9-2.8c-.7-.4-1.1-1.3-1-2.2.2-.9.9-1.5 1.8-1.7 1.5-.3 2.8.8 2.8 2.1 0 .8-.4 1.5-1 1.8l.8 2.8z" } },
	  logout: { "path": { "d": "M9.7 22.4V21c0-.4-.3-.7-.7-.7H4.4c-.4 0-.7-.3-.7-.7V4.4c0-.4.3-.7.7-.7H9c.4 0 .7-.3.7-.7V1.6c0-.4-.3-.7-.7-.7H2.8C1.8.9.9 1.8.9 2.8v18.4c0 1 .9 1.9 1.9 1.9H9c.4 0 .7-.3.7-.7zm13.2-9.9c.3-.3.3-.7 0-1l-6.2-6.2c-.3-.3-.7-.3-1 0l-1 .9c-.3.3-.3.7 0 1l2.6 2.6c.3.3.1.8-.3.8H7.2c-.4 0-.7.2-.7.6v1.4c0 .4.3.7.7.7h9.7c.5 0 .6.5.4.8l-2.6 2.6c-.3.3-.3.7 0 1l.9.9c.3.3.7.3 1 0l6.3-6.1z" } },
	  magicwand: { "path": { "d": "M13 9.7c-.2-.2-.4-.2-.6 0l-11.1 11c-.5.6-.5 1.4 0 2 .6.5 1.4.5 2 0l11-11.1c.2-.2.2-.4 0-.6L13 9.7zm3.2 0l1.5-1.5c.3-.3.3-.7 0-1l-.9-.9c-.3-.3-.7-.3-1 0l-1.5 1.5c-.2.1-.2.4 0 .6l1.3 1.3c.2.2.5.2.6 0zM4.8 5.4c1.8.5 3.1 1.8 3.7 3.6.1.3.5.3.5 0 .6-1.7 1.9-3.1 3.7-3.6.3-.1.3-.5 0-.6C11 4.2 9.6 2.9 9 1.1c0-.3-.4-.3-.5 0-.6 1.8-1.9 3.1-3.7 3.7-.2.1-.2.5 0 .6zm18.1 8.7c-1.6-.5-2.8-1.7-3.3-3.3-.1-.2-.4-.2-.5 0-.5 1.6-1.7 2.8-3.3 3.3-.2.1-.2.4 0 .5 1.6.5 2.8 1.7 3.3 3.3.1.2.4.2.5 0 .5-1.6 1.7-2.8 3.3-3.3.2-.1.2-.5 0-.5zM17.7 3.9c1.2.3 2.1 1.2 2.4 2.4.1.2.3.2.4 0 .4-1.2 1.2-2.1 2.4-2.4.2-.1.2-.3 0-.4-1.2-.4-2-1.2-2.4-2.4-.1-.2-.3-.2-.4 0-.3 1.2-1.2 2-2.4 2.4-.2.1-.2.3 0 .4z" } },
	  matrix: { "path": { "d": "M22.2 1.6c0-.4-.4-.7-.7-.7H7.2c-.4 0-.7.3-.7.7v2.3c0 .4.3.7.7.7h14.3c.3 0 .7-.3.7-.7V1.6zM4.6 7.2c0-.4-.3-.7-.7-.7H2.5c-.3 0-.7.3-.7.7v6c0 .3.4.6.7.6h1.4c.4 0 .7-.3.7-.6v-6zm0 9.2c0-.4-.3-.7-.7-.7H2.5c-.3 0-.7.3-.7.7v6c0 .4.4.7.7.7h1.4c.4 0 .7-.3.7-.7v-6zm8.8-9.2c0-.4-.3-.7-.7-.7H7.2c-.4 0-.7.3-.7.7v1.3c0 .4.3.7.7.7h5.5c.4 0 .7-.3.7-.7V7.2zm8.8 0c0-.4-.4-.7-.7-.7h-5.6c-.3 0-.7.3-.7.7v1.3c0 .4.4.7.7.7h5.6c.3 0 .7-.3.7-.7V7.2zm-8.8 4.6c0-.4-.3-.7-.7-.7H7.2c-.4 0-.7.3-.7.7v1.4c0 .3.3.6.7.6h5.5c.4 0 .7-.3.7-.6v-1.4zm8.8 0c0-.4-.4-.7-.7-.7h-5.6c-.3 0-.7.3-.7.7v1.4c0 .3.4.6.7.6h5.6c.3 0 .7-.3.7-.6v-1.4zm-8.8 4.6c0-.4-.3-.7-.7-.7H7.2c-.4 0-.7.3-.7.7v1.4c0 .3.3.7.7.7h5.5c.4 0 .7-.4.7-.7v-1.4zm8.8 0c0-.4-.4-.7-.7-.7h-5.6c-.3 0-.7.3-.7.7v1.4c0 .3.4.7.7.7h5.6c.3 0 .7-.4.7-.7v-1.4zM13.4 21c0-.4-.3-.7-.7-.7H7.2c-.4 0-.7.3-.7.7v1.4c0 .4.3.7.7.7h5.5c.4 0 .7-.3.7-.7V21zm8.8 0c0-.4-.4-.7-.7-.7h-5.6c-.3 0-.7.3-.7.7v1.4c0 .4.4.7.7.7h5.6c.3 0 .7-.3.7-.7V21z" } },
	  minimize_window: { "path": { "d": "M23.1 22.4c0 .4-.3.7-.7.7H1.6c-.4 0-.7-.3-.7-.7V21c0-.4.3-.7.7-.7h20.8c.4 0 .7.3.7.7v1.4z" } },
	  monthlyview: { "path": { "d": "M20.3 3.2H18v-.9c0-.7-.6-1.4-1.4-1.4-.7 0-1.4.6-1.4 1.4v.9H8.8v-.9c0-.7-.6-1.4-1.4-1.4C6.6.9 6 1.5 6 2.3v.9H3.7c-1 0-1.9.9-1.9 1.9v1.1c0 .4.4.7.7.7h19c.3 0 .7-.3.7-.7V5.1c0-1-.9-1.9-1.9-1.9zm1.2 6h-19c-.3 0-.7.4-.7.7v11.3c0 1 .9 1.9 1.9 1.9h16.6c1 0 1.9-.9 1.9-1.9V9.9c0-.3-.4-.7-.7-.7zM9.7 20.3c-1.1 0-2.3-.4-2.7-1 0-.1-.1-.2-.1-.3 0-.4.4-.8.8-.8.1 0 .2.1.4.1.5.3 1.1.5 1.6.5.9 0 1.4-.4 1.4-1s-.4-.9-1.5-.9c-.6.1-1-.1-1-.7 0-.4.3-.7.7-.7 1 .1 1.7-.2 1.7-.8 0-.6-.6-.9-1.4-.9-.5 0-1 .1-1.5.4-.1.1-.2.1-.3.1-.4 0-.7-.3-.7-.7 0-.2.1-.4.2-.5.6-.5 1.4-.8 2.5-.8 1.7 0 2.8.8 2.8 2.1 0 .9-.8 1.5-1.6 1.7.8.1 1.7.7 1.7 1.8 0 1.5-1.2 2.4-3 2.4zm7.4-.9c0 .4-.3.9-.7.9-.4 0-.7-.4-.7-.9v-4.7l-1 .9c-.1.1-.3.1-.5.1-.4 0-.7-.2-.7-.7 0-.1.1-.3.2-.4l1.8-1.8c.1-.2.4-.3.7-.3.5 0 .9.5.9 1v5.9z" } },
	  move: { "path": { "d": "M22.9 11.7l-3.8-4.2c-.3-.3-.6 0-.6.4v2.7h-4.7c-.2 0-.4-.2-.4-.4V5.5h2.7c.5 0 .7-.4.4-.6l-4.1-3.8c-.2-.2-.5-.2-.7 0L7.6 4.9c-.3.3-.1.6.4.6h2.6v4.7c0 .2-.2.4-.4.4H5.5V7.9c0-.5-.4-.7-.6-.4l-3.8 4.1c-.2.2-.2.5 0 .7l3.8 4.1c.3.3.6.1.6-.4v-2.6h4.7c.2 0 .4.2.4.4v4.7H7.9c-.5 0-.7.4-.4.6l4.1 3.8c.2.2.5.2.7 0l4.1-3.8c.3-.3.1-.6-.4-.6h-2.6v-4.7c0-.2.2-.4.4-.4h4.7v2.7c0 .5.4.7.6.4l3.8-4.1c.2-.3.2-.5 0-.7z" } },
	  muted: { "path": { "d": "M22.4 2.6l-1-1c-.3-.3-.8-.2-1.1.2l-4.6 4.6V4.6c0-2.1-1.6-3.7-3.7-3.7S8.3 2.5 8.3 4.6v6.7c0 .7.2 1.3.6 1.9l-1.7 1.6c-.7-1-1.2-2.2-1.2-3.5V9.4c0-.6-.5-1.1-1.2-1.1s-1.1.5-1.1 1.1v1.9c0 1.9.7 3.7 1.9 5.1l-3.8 3.9c-.4.3-.4.8-.2 1.1l1 1c.3.3.8.2 1.1-.2L22.2 3.7c.4-.3.5-.8.2-1.1zM18 10.7v.6c0 3.2-2.7 5.9-6 5.9h-.4l-1.8 1.9c.4.1.8.1 1.3.2v1.5H9c-.6 0-1.2.5-1.2 1.1s.6 1.2 1.2 1.2h6c.7 0 1.2-.5 1.2-1.2s-.6-1.1-1.2-1.1h-2.1v-1.5c4.2-.6 7.4-4 7.4-8V9.4c0-.3-.1-.5-.3-.7l-2 2z" } },
	  "new": { "path": { "d": "M19.8 4.2C15.5-.1 8.5-.1 4.2 4.2c-4.3 4.3-4.3 11.3 0 15.6 4.3 4.4 11.3 4.4 15.6 0 4.3-4.3 4.3-11.3 0-15.6zm-.4 8.7c0 .3-.2.5-.5.5h-5.1c-.2 0-.4.2-.4.4v5.1c0 .3-.2.5-.5.5h-1.8c-.3 0-.5-.2-.5-.5v-5.1c0-.2-.2-.4-.4-.4H5.1c-.3 0-.5-.2-.5-.5v-1.8c0-.3.2-.5.5-.5h5.1c.2 0 .4-.2.4-.4V5.1c0-.3.2-.5.5-.5h1.8c.3 0 .5.2.5.5v5.1c0 .2.2.4.4.4h5.1c.3 0 .5.2.5.5v1.8z" } },
	  new_window: { "path": { "d": "M22.5.9h-8.8c-.4 0-.8.3-.8.6v1.4c0 .4.3.8.8.8h3.6c.4 0 .7.5.3.7l-7.8 7.9c-.3.3-.3.7 0 .9l1 1c.2.3.6.3.9 0l7.9-7.8c.2-.3.7-.1.7.3v3.6c0 .4.4.8.7.8h1.4c.4 0 .7-.4.7-.8V1.6c0-.4-.3-.7-.6-.7zm-5.7 10.9l-1.6 1.6c-.3.3-.4.6-.4 1v5.2c0 .4-.4.7-.7.7H4.4c-.4 0-.7-.3-.7-.7V9.9c0-.3.3-.7.7-.7h5.3c.4 0 .7-.1 1-.4l1.5-1.6c.3-.2.1-.7-.3-.7H2.8c-1 0-1.9.8-1.9 1.8v12.9c0 1 .9 1.9 1.9 1.9h12.9c1 0 1.8-.9 1.8-1.9v-9.1c0-.4-.5-.6-.7-.3z" } },
	  news: { "path": { "d": "M23.3 2.8H4.4c-.4 0-.7.3-.7.7v14c0 .6-.5 1.1-1.1 1-.4-.1-.8-.5-.8-1V7.4c0-.3-.1-.5-.4-.5H.7c-.4 0-.7.3-.7.7v11.8c0 1 .8 1.8 1.8 1.8h20.4c1 0 1.8-.8 1.8-1.8V3.5c0-.4-.3-.7-.7-.7zM12.9 16.2c0 .2-.2.4-.4.4H6.9c-.3 0-.4-.2-.4-.4v-1c0-.2.1-.4.4-.4h5.6c.2 0 .4.2.4.4v1zm0-3.7c0 .2-.2.4-.4.4H6.9c-.3 0-.4-.2-.4-.4v-1c0-.2.1-.4.4-.4h5.6c.2 0 .4.2.4.4v1zm8.3 3.7c0 .2-.2.4-.4.4h-5.6c-.2 0-.4-.2-.4-.4v-1c0-.2.2-.4.4-.4h5.6c.2 0 .4.2.4.4v1zm0-3.7c0 .2-.2.4-.4.4h-5.6c-.2 0-.4-.2-.4-.4v-1c0-.2.2-.4.4-.4h5.6c.2 0 .4.2.4.4v1zm0-3.7c0 .2-.2.4-.4.4H6.9c-.3 0-.4-.2-.4-.4V6c0-.3.1-.5.4-.5h13.9c.2 0 .4.2.4.5v2.8z" } },
	  notebook: { "path": { "d": "M20.3.9H6.5c-1.1 0-1.9.9-1.9 1.9v1.4H3.2c-.8 0-1.4.6-1.4 1.3s.6 1.4 1.4 1.4h1.4v3.7H3.2c-.8 0-1.4.6-1.4 1.4s.6 1.4 1.4 1.4h1.4v3.7H3.2c-.8 0-1.4.6-1.4 1.4s.6 1.3 1.4 1.3h1.4v1.4c0 1 .8 1.9 1.9 1.9h13.8c1 0 1.9-.9 1.9-1.9V2.8c0-1-.9-1.9-1.9-1.9zm-3.2 15.7c0 .3-.2.5-.5.5h-6.4c-.3 0-.5-.2-.5-.5v-.9c0-.3.2-.5.5-.5h6.4c.3 0 .5.2.5.5v.9zm.9-3.7c0 .3-.2.5-.5.5H9.2c-.2 0-.4-.2-.4-.5V12c0-.3.2-.5.4-.5h8.3c.3 0 .5.2.5.5v.9zm.9-4.6c0 .3-.2.5-.4.5H8.3c-.3 0-.5-.2-.5-.5V5.5c0-.2.2-.4.5-.4h10.2c.2 0 .4.2.4.4v2.8z" } },
	  notification: { "path": { "d": "M21.2 15.2H21c-.9 0-1.6-.7-1.6-1.6V8.3c0-4.2-3.5-7.6-7.8-7.4-3.9.2-7 3.6-7 7.6v5.2c0 .8-.7 1.5-1.6 1.5h-.2c-1 0-1.9.9-1.9 1.9v.7c0 .3.3.7.7.7h20.8c.4 0 .7-.4.7-.7v-.7c0-1-.9-1.9-1.9-1.9zm-6.9 5.1H9.7c-.2 0-.5.3-.4.6.2 1.3 1.4 2.2 2.7 2.2s2.5-1 2.7-2.2c.1-.3-.2-.6-.4-.6z" } },
	  office365: { "g": { "path": { "d": "M14.2 22.8c.3.1.6.1.9 0l5.5-1.8c.4-.1.6-.4.6-.8V3.6c0-.3-.2-.6-.4-.7L15.2 1c-.3-.1-.7-.1-.9 0L3.2 5.3c-.2.1-.4.3-.4.6v12.5c0 .3.2.6.4.7l11 3.7zm.6-3c0 .2-.3.5-.5.4L5.1 19c-.3-.1-.4-.3-.4-.5v-.2c0-.2.1-.3.3-.4l1.7-.8c.2-.1.3-.3.3-.4V6.8c0-.2.2-.4.4-.4l6.9-1.6c.3 0 .6.1.6.5v14.5z" } } },
	  offline: { "path": { "d": "M16 16.7c.2-.3.2-.6 0-.9l-.8-.8c-.2-.2-.6-.2-.8 0l-2.1 2c-.1.2-.4.2-.5 0l-2.1-2c-.2-.2-.6-.2-.8 0l-.8.8c-.3.3-.3.6 0 .9l2 2c.1.1.1.4 0 .5l-2 2.1c-.3.2-.3.6 0 .8l.8.8c.2.3.6.3.8 0l2.1-2c.1-.1.4-.1.5 0l2.1 2c.2.3.6.3.8 0l.8-.8c.2-.2.2-.6 0-.8l-2-2.1c-.2-.1-.2-.4 0-.5l2-2zm6-11.3C19.5 2.5 15.9 1 12 1S4.6 2.5 2.1 5.4c-.2.1-.2.5 0 .6l1.4 1.2c.2.2.5.1.7 0C6.2 5 9 3.7 12 3.7s5.9 1.3 7.9 3.5c.2.1.5.1.7 0L22 6c.2-.2.2-.5 0-.6zm-10 2c-1.9 0-3.7.9-5 2.3-.2.2-.2.5 0 .7l1.5 1.1c.2.2.5.2.6 0 .8-.8 1.8-1.3 2.9-1.3s2.2.5 3 1.2c.1.2.4.2.6.1l1.4-1.1c.3-.2.3-.5.1-.7C15.8 8.3 14 7.4 12 7.4z" } },
	  open: { "path": { "d": "M3.7 16.2v-.3.5-.2zM21.2.9H2.8C1.8.9.9 1.8.9 2.8v16.6c0 1 .9 1.8 1.9 1.8h5.5c.3 0 .5-.2.5-.4v-1.9c0-.3-.2-.4-.5-.4H4.4c-.4 0-.7-.4-.7-.7V6.2c0-.3.3-.7.7-.7h15.2c.4 0 .7.4.7.7v11.6c0 .3-.3.7-.7.7h-3.9c-.3 0-.5.1-.5.4v1.9c0 .2.2.4.5.4h5.5c1 0 1.9-.8 1.9-1.8V2.8c0-1-.9-1.9-1.9-1.9zM17.3 16l1-1c.3-.3.3-.7 0-1l-5.8-5.8c-.3-.3-.7-.3-1 0L5.7 14c-.3.3-.3.7 0 1l1 .9c.3.3.7.3 1 0l2.1-2.1c.3-.3.8-.1.8.3v8.3c0 .4.3.7.7.7h1.3c.4 0 .8-.3.8-.7v-8.3c0-.4.4-.6.8-.3l2.1 2.2c.3.2.7.2 1 0z" } },
	  open_folder: { "path": { "d": "M21.2 6.5H10.8c-.7 0-1.3-.4-1.7-1L7.5 2.8c-.3-.6-.9-1-1.6-1H2.8c-1 0-1.9.9-1.9 1.9v16.6c0 1 .9 1.9 1.9 1.9h18.4c1 0 1.9-.9 1.9-1.9v-12c0-1-.9-1.8-1.9-1.8zm0-3.7H10.1c-.2 0-.3.2-.2.3l.8 1.2c.1.2.2.3.4.3h10.1c.5 0 1 .1 1.5.3.1.1.4-.1.4-.3 0-1-.9-1.8-1.9-1.8z" } },
	  opened_folder: { "path": { "d": "M20.3 6.9c0-1-.8-1.8-1.8-1.8h-6.8c-.9 0-1.6-.9-1.6-.9L8.9 2.8s-.5-1-1.6-1H5.5c-1 0-1.8.9-1.8 1.9v4.1h16.6v-.9zm1.3 2.8H2.4c-1 0-1.7.9-1.4 1.7l2.6 9.7c.2.6.7 1.1 1.4 1.1h14.1c.6 0 1.2-.5 1.3-1.1l2.7-9.7c.2-.8-.5-1.7-1.5-1.7z" } },
	  overflow: { "path": { "d": "M17.2 4.6H7.3c-1 0-1.7.8-1.7 1.7v.3c0 .1.1.2.3.2h9c1 0 1.7.8 1.7 1.7v10.2c0 .2.2.3.3.3h.3c.9 0 1.7-.8 1.7-1.7v-11c0-.9-.8-1.7-1.7-1.7zM20.9.9H11c-1 0-1.7.8-1.7 1.7v.3c0 .1.1.3.3.3h9c1 0 1.7.8 1.7 1.7v10.2c0 .1.1.3.3.3h.3c.9 0 1.7-.8 1.7-1.7V2.6c0-.9-.8-1.7-1.7-1.7zM15 10.1c0-1-.7-1.7-1.7-1.7H3.1c-1 0-1.7.7-1.7 1.7v11.3c0 .9.8 1.7 1.7 1.7h10.2c1 0 1.7-.8 1.7-1.7V10.1z" } },
	  "package": { "path": { "d": "M20.5 11.1h-3.7l-1.5 1.8h5v2.8H3.7v-2.8h4.9l-1.5-1.8H3.5c-.9 0-1.7.7-1.7 1.6v9c0 .8.6 1.4 1.4 1.4h17.6c.8 0 1.4-.6 1.4-1.4v-9c0-.9-.8-1.6-1.7-1.6zm-9.9-9.5v5.8H7.4c-.4 0-.7.4-.4.6l4.6 5.7c.2.1.5.1.7 0L16.9 8c.3-.2 0-.6-.4-.6h-3.1V1.6c0-.4-.3-.7-.7-.7h-1.4c-.4 0-.7.3-.7.7z" } },
	  package_org: { "path": { "d": "M20.5 10.6h-5.8l-1.8 1.9h7.4v2.7H3.7v-2.7h3.7l-1.8-1.9H3.5c-.9 0-1.7.8-1.7 1.7v8.9c0 .8.6 1.4 1.4 1.4h17.6c.8 0 1.4-.6 1.4-1.4v-8.9c0-.9-.8-1.7-1.7-1.7zm-11 1.3c.4.4.9.4 1.3 0l8.8-8.8c.2-.1.2-.4 0-.6l-1.3-1.3c-.2-.2-.5-.2-.7 0l-7.4 7.5-3.1-3.1c-.2-.2-.5-.2-.7 0L5.1 6.9c-.2.2-.2.4 0 .6l4.4 4.4z" } },
	  package_org_beta: { "path": { "d": "M20.5 10.6h-2.7c-.2.7-.5 1.3-1 1.9h3.5v2.7H3.7v-2.7h2.8v-1.9h-3c-.9 0-1.7.8-1.7 1.7v8.9c0 .8.6 1.4 1.4 1.4h17.6c.8 0 1.4-.6 1.4-1.4v-8.9c0-.9-.8-1.7-1.7-1.7zm-4.3-6c0-1.8-1.6-3.2-3.4-3.2H9c-.4 0-.7.3-.7.7v9.7c0 .3.3.7.7.7h3.9c1.8 0 3.3-1.5 3.2-3.3 0-.9-.4-1.7-1-2.2.7-.7 1.1-1.5 1.1-2.4zm-6-1.4h2.7c.8 0 1.4.6 1.4 1.4 0 .8-.6 1.4-1.4 1.4h-2.7V3.2zm4.1 6c0 .8-.6 1.4-1.4 1.4h-2.7V7.8h2.7c.8 0 1.4.6 1.4 1.4z" } },
	  page: { "path": { "d": "M20.5 8.8h-5.2c-1.2 0-1.9-.8-1.9-2V1.7c0-.5-.3-.8-.8-.8H5c-1.2 0-2.2 1-2.2 2.2v17.8c0 1.2 1 2.2 2.2 2.2h14c1.2 0 2.2-1 2.2-2.2V9.5c0-.4-.3-.7-.7-.7zm.6-2.8l-4.9-4.9c-.1-.1-.3-.2-.4-.2-.3 0-.6.3-.6.5v4c0 .8.8 1.5 1.6 1.5h3.9c.3 0 .5-.3.5-.5s0-.4-.1-.4z" } },
	  palette: { "path": { "d": "M22.8 8C21.8 3.6 17.2.9 12.1.9 5.9.9.9 5.9.9 12s5 11.1 11.2 11.1c8.6 0 7.9-4.4 5.2-6.1-1.7-1-2.5-3.3-.9-5 3-3.1 7.8 1.8 6.4-4zM6 15.7c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zm.5-8.8c0-1.3 1-2.3 2.3-2.3s2.3 1 2.3 2.3-1 2.3-2.3 2.3-2.3-1-2.3-2.3zm5 13.4c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zm4.2-12c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3S18 4.7 18 6s-1 2.3-2.3 2.3z" } },
	  paste: { "path": { "d": "M8.1 5.5h7.8c.4 0 .7-.3.7-.7v-2c0-1-.8-1.9-1.8-1.9H9.2c-1 0-1.8.9-1.8 1.9v2c0 .4.3.7.7.7zm12.2-2.7h-1.1c-.4 0-.7.3-.7.7v2c0 1.1-.9 1.9-1.9 1.9H7.4c-1 0-1.9-.8-1.9-1.9v-2c0-.4-.3-.7-.7-.7H3.7c-1 0-1.9.8-1.9 1.8v16.6c0 1 .9 1.9 1.9 1.9h16.6c1 0 1.9-.9 1.9-1.9V4.6c0-1-.9-1.8-1.9-1.8zm-2.8 16.1c0 .3-.1.5-.4.5H6.9c-.3 0-.4-.2-.4-.5V18c0-.3.1-.5.4-.5h10.2c.3 0 .4.2.4.5v.9zm0-3.7c0 .3-.1.5-.4.5H6.9c-.3 0-.4-.2-.4-.5v-.9c0-.3.1-.5.4-.5h10.2c.3 0 .4.2.4.5v.9zm0-3.7c0 .3-.1.5-.4.5H6.9c-.3 0-.4-.2-.4-.5v-.9c0-.3.1-.4.4-.4h10.2c.3 0 .4.1.4.4v.9z" } },
	  people: { "path": { "d": "M19.4 10.3c-1.3-.5-1.5-1-1.5-1.5s.4-1 .8-1.4c.8-.7 1.2-1.6 1.2-2.7 0-2-1.3-3.8-3.7-3.8-2.1 0-3.4 1.5-3.6 3.3 0 .2.1.3.2.4 1.8 1.1 2.8 3.1 2.8 5.4 0 1.8-.6 3.3-1.9 4.4-.1.1-.1.3 0 .4.3.2 1.1.6 1.5.8.2 0 .3.1.4.1h5.6c1 0 1.9-.9 1.9-1.9v-.2c0-1.6-1.8-2.5-3.7-3.3zm-6.2 6.4c-1.6-.6-1.8-1.2-1.8-1.8 0-.6.5-1.2 1-1.7.9-.7 1.4-1.8 1.4-3.1 0-2.4-1.6-4.5-4.4-4.5-2.8 0-4.5 2.1-4.5 4.5 0 1.3.5 2.4 1.5 3.1.5.5.9 1.1.9 1.7 0 .6-.2 1.2-1.8 1.8-2.3.9-4.6 2-4.6 3.9v.6c0 1 .9 1.9 1.9 1.9h12.8c1.1 0 1.9-.9 1.9-1.9v-.6c0-1.9-2-3-4.3-3.9z" } },
	  phone_landscape: { "path": { "d": "M24 6c0-1-.8-1.8-1.8-1.8H1.8C.8 4.2 0 5 0 6v12c0 1 .8 1.8 1.8 1.8h20.4c1 0 1.8-.8 1.8-1.8V6zM2.3 13.4c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4zm18 3c0 .4-.3.7-.7.7H5.3c-.4 0-.7-.3-.7-.7V7.6c0-.4.3-.7.7-.7h14.3c.4 0 .7.3.7.7v8.8z" } },
	  phone_portrait: { "path": { "d": "M19.8 1.8C19.8.8 19 0 18 0H6C5 0 4.2.8 4.2 1.8v20.4c0 1 .8 1.8 1.8 1.8h12c1 0 1.8-.8 1.8-1.8V1.8zM12 23.1c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4zm5.1-4.4c0 .4-.3.7-.7.7H7.6c-.4 0-.7-.3-.7-.7V4.4c0-.4.3-.7.7-.7h8.8c.4 0 .7.3.7.7v14.3z" } },
	  photo: { "path": { "d": "M12 9.2c-2 0-3.7 1.7-3.7 3.7s1.7 3.7 3.7 3.7 3.7-1.6 3.7-3.7S14 9.2 12 9.2zm9.2-2.7h-2.4c-.6 0-1.2-.4-1.5-.9L16.2 4c-.3-.8-1.1-1.2-1.9-1.2H9.7c-.8 0-1.6.4-1.9 1.2L6.7 5.6c-.3.5-.9.9-1.6.9H2.8c-1 0-1.9.8-1.9 1.8v11.1c0 1 .9 1.8 1.9 1.8h18.4c1 0 1.9-.8 1.9-1.8V8.3c0-1-.9-1.8-1.9-1.8zm-9.2 12c-3 0-5.5-2.5-5.5-5.6S9 7.4 12 7.4s5.5 2.5 5.5 5.5-2.5 5.6-5.5 5.6z" } },
	  power: { "path": { "d": "M15.9 3.6c-.3-.2-.7 0-.7.4v1.7c0 .3.2.7.5.8 2.4 1.4 4 4.2 3.6 7.3-.3 3.3-3.1 6.1-6.5 6.5-4.4.5-8.2-3-8.2-7.4 0-2.7 1.5-5.1 3.7-6.4.3-.1.5-.5.5-.8V4c0-.4-.4-.6-.7-.4-3.9 1.6-6.6 5.6-6.2 10.2.4 4.8 4.2 8.7 8.9 9.2 6.1.7 11.4-4.1 11.4-10.1 0-4.2-2.6-7.8-6.3-9.3zm-2.5-2c0-.4-.3-.7-.7-.7h-1.4c-.4 0-.7.3-.7.7v7.9c0 .3.3.7.7.7h1.4c.4 0 .7-.4.7-.7V1.6z" } },
	  preview: { "path": { "d": "M23.9 11.6C21.7 7.2 17.2 4.2 12 4.2S2.3 7.2.1 11.6c-.1.3-.1.6 0 .8 2.2 4.4 6.7 7.4 11.9 7.4s9.7-3 11.9-7.4c.1-.3.1-.5 0-.8zM12 17.1c-2.8 0-5.1-2.3-5.1-5.1S9.2 6.9 12 6.9s5.1 2.3 5.1 5.1-2.3 5.1-5.1 5.1zm0-8.3c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2 3.2-1.4 3.2-3.2-1.4-3.2-3.2-3.2z" } },
	  priority: { "path": { "d": "M4.2 1.6c0-.4-.4-.7-.7-.7H2.1c-.4 0-.7.3-.7.7v20.8c0 .4.3.7.7.7h1.4c.3 0 .7-.3.7-.7V1.6zm17.7 2c-7.4 3.8-6.5-4.1-15.4-1-.3.1-.5.4-.5.6V14c0 .3.3.5.6.4 8.9-3 7.9 5.2 15.6.8.3-.1.4-.3.4-.6V3.9c0-.3-.4-.5-.7-.3z" } },
	  process: { "path": { "d": "M7.5 10.7l3.9-4.9c.3-.4.8-.4 1.1 0l3.9 5c.2.1.4.3.6.3h4.4c.4 0 .8-.3.8-.7V3.7c0-1-.9-1.9-1.9-1.9H3.7c-1 0-1.9.9-1.9 1.9v6.7c0 .4.4.7.7.7h4.4c.3 0 .4-.2.6-.4zm9 2.6l-3.9 4.9c-.3.4-.9.4-1.2 0l-3.9-5c-.2-.1-.3-.3-.6-.3H2.5c-.3 0-.7.3-.7.7v6.7c0 1 .9 1.9 1.9 1.9h16.6c1 0 1.9-.9 1.9-1.9v-6.7c0-.4-.4-.7-.7-.7H17c-.2 0-.4.2-.5.4z" } },
	  push: { "path": { "d": "M20.3.9H9.2c-1 0-1.8.9-1.8 1.9 0 .3.2.7.4.8.2.1 1.9 1.9 1.9 1.9.2.1.4 0 .4-.2 0-.4.3-.7.7-.7h7.8c.4 0 .8.3.8.7v12.5c0 .3-.4.6-.8.6h-7.8c-.4 0-.6-.3-.6-.6v-.1c0-.2-.3-.3-.4-.1 0 0-1.8 1.7-2 1.8-.2.2-.4.5-.4.9v.9c0 1 .8 1.8 1.8 1.8h11.1c1 0 1.9-.8 1.9-1.8V2.8c0-1-.9-1.9-1.9-1.9zm-5.5 21.3c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4zM12.7 11L7 5.3c-.3-.3-.7-.3-1 0l-1 .9c-.2.3-.2.7 0 1l2.2 2.1c.2.3 0 .8-.4.8H.7c-.4.1-.7.4-.7.7v1.4c0 .4.3.7.7.7h6.1c.4 0 .6.5.3.8L5 15.8c-.3.3-.3.7 0 1l1 1c.2.2.6.2.9 0l5.8-5.8c.3-.2.3-.7 0-1z" } },
	  puzzle: { "path": { "d": "M20.8 17.7c-.1 1.3-.3 2.6-.5 3.9 0 .4-.5.8-.8.8-2.5.3-5 .5-7.5.5-2.4 0-4.9-.1-7.3-.5-.4 0-.8-.4-.9-.8-.3-2-.5-4.1-.5-6.2s.2-4.1.5-6.2c.1-.3.5-.7.9-.8 1.5-.2 3-.3 4.4-.4 0 0 1.2 0 1.1-1.2 0-1-1.8-1.7-1.8-3.4C8.4 2 9.8.9 12 .9c2.3 0 3.6 1.1 3.6 2.5 0 1.8-1.7 2.4-1.8 3.4C13.8 7.9 15 8 15 8c1.5.1 3 .2 4.5.4.3 0 .8.4.8.8.2 1.5.4 2.8.5 4.2 0 .4-.4.9-.8.9h-.4c-.4 0-1-.4-1.3-.7 0 0-1-1-2.1-1-1.7-.1-3 1.4-3 3s1.3 3.1 3 3.1c1-.1 2-1.1 2-1.1.4-.2 1-.5 1.4-.5h.4c.5 0 .8.3.8.6z" } },
	  question: { "path": { "d": "M13.1 17.5h-2.3c-.4 0-.6-.2-.6-.6v-.7c0-1.9 1.2-3.7 3-4.3.6-.2 1.1-.5 1.5-1 2.3-2.8.2-6.1-2.6-6.2-1 0-1.9.3-2.7 1-.6.6-1 1.3-1 2.1-.1.2-.4.5-.7.5H5.4c-.5 0-.8-.4-.7-.8.1-1.7.9-3.3 2.2-4.5C8.4 1.6 10.2.8 12.3.9c3.8.1 6.9 3.3 7.1 7.1.1 3.2-1.9 6.1-4.9 7.2-.4.2-.7.5-.7 1v.6c0 .5-.3.7-.7.7zm.7 4.9c0 .4-.3.7-.6.7h-2.4c-.3 0-.6-.3-.6-.7v-2.3c0-.4.3-.7.6-.7h2.4c.3 0 .6.3.6.7v2.3z" } },
	  questions_and_answers: { "path": { "d": "M23.1 12.9c0-1.8-1.2-3.3-2.8-3.9C20.2 4.5 16.5.9 12 .9S3.8 4.5 3.7 9C2.1 9.6.9 11.1.9 12.9c0 2 1.4 3.6 3.1 4 1 3.6 4.2 6.2 8 6.2s7-2.6 8-6.2c1.7-.4 3.1-2 3.1-4zm-4.6-4.1l-.1-.1.2.1h-.1zM12 21.2c-3.6 0-6.5-3-6.5-6.6 0-.9.2-2.3.6-3.2 0-.1.1-.2.2-.4 1.4-.5 2.6-1.5 3.3-2.7 1.7 2 4.2 3.4 7 3.4H18c.1.6.3 1.3.4 2.1-.3 1.1-2.1 2.2-4.6 2.4-.1-.3-.4-.5-.7-.5h-2.3c-.4 0-.6.4-.6.7v1.4c0 .4.2.7.6.7h2.3c.3 0 .6-.2.7-.5 1.6 0 3.1-.5 4.2-1.2-.8 2.6-3.2 4.4-6 4.4z" } },
	  record: { "path": { "d": "M12 3.7c4.6 0 8.3 3.7 8.3 8.3s-3.7 8.3-8.3 8.3-8.3-3.7-8.3-8.3S7.4 3.7 12 3.7z" } },
	  redo: { "path": { "d": "M21.6 1.4h-1.4c-.4 0-.8.3-.8.7v3.2c0 .4-.2.6-.5.3-.2-.2-.3-.3-.5-.4-2.3-2.3-5.5-3.3-8.8-2.7-1.2.3-2.3.7-3.3 1.4C3.5 5.7 1.9 8.7 1.8 12c0 2.4 1 4.9 2.7 6.7 1.7 1.8 3.9 2.9 6.3 3 .4.1.7-.2.7-.7v-1.3c0-.4-.2-.7-.6-.7-2.2-.2-4.2-1.4-5.4-3.4-.3-.6-.6-1.2-.7-1.8-.7-3 .5-6 3.2-7.7.5-.3 1.1-.6 1.7-.7 2.5-.6 5 .1 6.7 1.8.2.2.4.4.5.6.2.4-.1.5-.6.5h-3.2c-.4 0-.7.4-.7.8v1.4c0 .4.3.6.7.6h8.4c.3 0 .6-.2.6-.5V2.1c.1-.4-.2-.7-.5-.7z" } },
	  refresh: { "path": { "d": "M21.5 1.8h-1.4c-.4 0-.7.4-.7.7v3.3c0 .4-.2.6-.6.3-.1-.2-.2-.3-.4-.5-2.3-2.3-5.6-3.2-8.9-2.6-1.1.2-2.3.7-3.2 1.3-2.8 1.9-4.5 4.9-4.5 8.1 0 2.5.9 5 2.7 6.8 1.8 1.9 4.3 3 7 3 2.3 0 4.6-.8 6.3-2.3.3-.3.3-.7.1-1l-1-1c-.2-.2-.7-.3-.9 0-1.7 1.3-4 1.9-6.2 1.3-.6-.1-1.2-.4-1.8-.7-2.6-1.6-3.8-4.7-3.1-7.7.1-.6.4-1.2.7-1.8 1.3-2.2 3.6-3.5 6-3.5 1.8 0 3.6.8 4.9 2.1.2.2.4.4.5.6.2.4-.2.6-.6.6h-3.2c-.4 0-.7.3-.7.7v1.4c0 .4.3.6.7.6h8.4c.3 0 .6-.2.6-.6V2.5c0-.3-.4-.7-.7-.7z" } },
	  relate: { "path": { "d": "M16.6 9.2c0-1-.8-1.8-1.8-1.8h-12c-1 0-1.9.8-1.9 1.8v12c0 1 .9 1.9 1.9 1.9h12c1 0 1.8-.9 1.8-1.9v-12zm-3.7 6.5c0 .2-.2.5-.4.5H9.7v2.7c0 .3-.2.5-.5.5h-.9c-.2 0-.5-.2-.5-.5v-2.7H5.1c-.3 0-.5-.3-.5-.5v-.9c0-.3.2-.5.5-.5h2.7v-2.8c0-.2.3-.4.5-.4h.9c.3 0 .5.2.5.4v2.8h2.8c.2 0 .4.2.4.5v.9zm6.9 3.7h-1.3v-2.8h1.3c.3 0 .5-.2.5-.4v-12c0-.3-.2-.5-.5-.5h-12c-.2 0-.4.2-.4.5v1.3H4.6V4.2C4.6 2.4 6 .9 7.8.9h12c1.8 0 3.3 1.5 3.3 3.3v12c0 1.8-1.5 3.2-3.3 3.2z" } },
	  remove_formatting: { "path": { "d": "M20.8 18.9l2.1-2.1c.2-.2.2-.5 0-.7l-1.3-1.3c-.1-.2-.4-.2-.6 0L18.9 17l-2-2c-.1-.2-.4-.2-.6 0L15 16.3c-.2.2-.2.5 0 .6l2 2-2 2c-.1.1-.1.4 0 .6l1.3 1.3c.2.2.5.2.7 0l1.9-1.9 2.1 2c.2.2.5.2.6 0l1.3-1.3c.2-.1.2-.4 0-.6l-2.1-2.1zM2.2 3.7h5L5.3 14.4c-.1.5.2.8.7.8h2.3c.3 0 .7-.2.7-.5l1.9-11H16c.3 0 .7-.2.7-.6l.2-1.4c.1-.4-.2-.8-.7-.8H2.4c-.3 0-.6.3-.6.6l-.3 1.4c-.1.4.3.8.7.8zm10.7 14.1c0-.4-.3-.7-.7-.7H1.6c-.4 0-.7.3-.7.7v1.4c0 .3.3.6.7.6h10.6c.4 0 .7-.3.7-.6v-1.4z" } },
	  remove_link: { "path": { "d": "M11.1 16.9c-.3 0-.6-.1-.9-.1-.2-.1-.6-.2-.8-.3-.2 0-.4 0-.5.1l-.2.2c-1.1 1.2-3 1.3-4.3.2-1.3-1.2-1.4-3.2-.1-4.5l3-3c.5-.5.9-.7 1.4-.8.7-.2 1.4-.2 2 .1.3.2.7.4 1 .7.1.1.3.3.4.6.1.2.5.3.7.1L14 9c.2-.2.2-.4 0-.6-.2-.2-.3-.4-.5-.6-.3-.3-.7-.6-1-.8-.6-.4-1.2-.6-1.9-.8-1.2-.2-2.6 0-3.8.6-.4.3-.8.6-1.2 1l-3 2.9c-2.1 2.1-2.3 5.6-.2 7.8 2.2 2.3 5.8 2.4 8 .1l1-1c.3-.2.1-.7-.3-.7zm7.6-6.5c2.2-2.2 2.2-5.9-.1-8-2.3-2.1-5.7-1.9-7.8.2l-1 .9c-.2.3-.1.7.3.8.6 0 1.2.1 1.7.3.2.1.4 0 .5-.1l.2-.2c1.1-1.1 3-1.3 4.3-.2 1.3 1.2 1.4 3.3.1 4.5l-3.1 3.1c-.4.4-.8.6-1.3.8-.7.1-1.4.1-2-.2-.3-.1-.7-.3-1-.7-.1-.1-.3-.3-.4-.5-.1-.3-.5-.3-.7-.1l-1.1 1.1c-.2.2-.2.5-.1.6.2.3.4.5.6.7.3.3.6.5 1 .8.6.3 1.2.6 1.9.7 1.2.2 2.5.1 3.7-.6.5-.2.9-.5 1.3-.9l3-3zm2.1 8.5l2.1-2.1c.2-.2.2-.5 0-.6l-1.3-1.3c-.1-.2-.4-.2-.6 0L18.9 17l-2-2c-.1-.1-.4-.1-.6 0L15 16.3c-.2.2-.2.5 0 .7l2 2-2 1.9c-.1.2-.1.5 0 .7l1.3 1.2c.2.2.5.2.7 0l1.9-1.9L21 23c.2.2.5.2.6 0l1.3-1.3c.2-.2.2-.5 0-.7l-2.1-2.1z" } },
	  replace: { "path": { "d": "M9.2 17.3c0-.4-.3-.7-.7-.7H1.6c-.4 0-.7.3-.7.7v5.1c0 .4.3.7.7.7h6.9c.4 0 .7-.3.7-.7v-5.1zm-5.5-7.1H1.5c-.5 0-.7.4-.4.6l3.7 3.8c.1.2.4.2.6 0l3.7-3.8c.3-.3 0-.6-.4-.6H6.5c0-2.4 2.3-4.7 4.6-4.7V2.8c-4.2 0-7.4 3.2-7.4 7.4zm15.6-.8c-.2-.2-.5-.2-.7 0L15 13.2c-.3.3-.1.6.4.6h2.2c0 2.8-1.9 4.7-4.7 4.7v2.7c4.2 0 7.5-3.2 7.5-7.4h2.2c.5 0 .7-.4.4-.6l-3.7-3.8zm3.8-7.8c0-.4-.3-.7-.7-.7h-6.9c-.4 0-.7.3-.7.7v5.1c0 .4.3.7.7.7h6.9c.4 0 .7-.3.7-.7V1.6z" } },
	  reply: { "path": { "d": "M8.9 8.4s-.5-.6-.3-.8L11.2 5c.3-.3.3-.7 0-1l-1-1c-.2-.3-.6-.3-.9 0L3 9.2c-.2.3-.2.7 0 1l6.3 6.2c.3.3.7.3.9 0l1-.9c.3-.3.3-.7 0-1l-2.5-2.6c-.3-.3-.1-.7.2-.8 5.1.2 9.3 4.3 9.6 9.5 0 .4.3.7.7.7h1.4c.4 0 .6-.3.6-.8-.3-6.7-5.4-11.9-12.3-12.1z" } },
	  reset_password: { "path": { "d": "M19.4 10.6H4.6c-1 0-1.8.8-1.8 1.9v8.7c0 1 .8 1.9 1.8 1.9h14.8c1 0 1.8-.9 1.8-1.9v-8.7c0-1.1-.8-1.9-1.8-1.9zm-5.1 9.9c-.7.5-1.5.7-2.3.7-.3 0-.6 0-.8-.1-1.1-.2-2.1-.8-2.7-1.7l1.6-1c.3.5.8.8 1.4.9.6.2 1.2 0 1.8-.3 1.1-.7 1.3-2.2.6-3.2-.3-.5-.8-.9-1.4-1-.6-.1-1.2 0-1.8.4l-.3.3 1.6 1.6H7.8v-4.2L9 14.1c.2-.2.5-.3.6-.5 1-.6 2.1-.8 3.2-.6 1.1.2 2 .8 2.6 1.7 1.3 2 .8 4.5-1.1 5.8zM4.6 8.4v.1-.1zm.5.4h1.8c.3 0 .5-.2.5-.4v-.1c0-2.6 2.2-4.8 4.9-4.6 2.5.2 4.3 2.3 4.3 4.8v-.1c0 .2.2.4.5.4h1.8c.3 0 .5-.2.5-.4v-.1c0-4.2-3.5-7.6-7.8-7.4-3.9.2-6.9 3.5-7 7.5.1.2.2.4.5.4z" } },
	  retweet: { "path": { "d": "M23.8 13.3l-1-1c-.2-.3-.6-.3-.9 0l-1.3 1.3c-.3.3-.8.1-.8-.4V5.5c0-1-.8-1.8-1.8-1.8h-6.7c-.4 0-.7.3-.7.7v1.4c0 .3.3.7.7.7h5.1c.4 0 .7.3.7.7v6c0 .5-.5.6-.9.4L15 12.4c-.2-.3-.7-.3-.9 0l-1 1c-.3.3-.3.7 0 1l4.9 4.8c.2.3.6.3.9 0l4.9-4.9c.2-.3.2-.7 0-1zm-11.1 4.2H7.6c-.4 0-.7-.3-.7-.7v-6c0-.5.5-.6.9-.4L9 11.6c.2.3.7.3.9 0l1-.9c.3-.3.3-.7 0-1L6.1 4.8c-.3-.3-.7-.3-1 0L.2 9.7c-.3.3-.3.7 0 1l1 .9c.2.3.6.3.9 0l1.3-1.2c.2-.3.8-.1.8.3v7.8c0 1 .8 1.8 1.8 1.8h6.7c.4 0 .7-.3.7-.7v-1.4c0-.3-.3-.7-.7-.7z" } },
	  richtextbulletedlist: { "path": { "d": "M3.7 6.2c0 .4-.3.7-.7.7H1.6c-.4 0-.7-.3-.7-.7V4.8c0-.3.3-.6.7-.6H3c.4 0 .7.3.7.6v1.4zm19.4-1.4c0-.3-.3-.6-.7-.6H6.2c-.3 0-.7.3-.7.6v1.4c0 .4.4.7.7.7h16.2c.4 0 .7-.3.7-.7V4.8zM3.7 11.3c0-.4-.3-.7-.7-.7H1.6c-.4 0-.7.3-.7.7v1.4c0 .4.3.7.7.7H3c.4 0 .7-.3.7-.7v-1.4zm17.5 0c0-.4-.3-.7-.7-.7H6.2c-.3 0-.7.3-.7.7v1.4c0 .4.4.7.7.7h14.3c.4 0 .7-.3.7-.7v-1.4zM3.7 17.8c0-.4-.3-.7-.7-.7H1.6c-.4 0-.7.3-.7.7v1.4c0 .3.3.6.7.6H3c.4 0 .7-.3.7-.6v-1.4zm19.4 0c0-.4-.3-.7-.7-.7H6.2c-.3 0-.7.3-.7.7v1.4c0 .3.4.6.7.6h16.2c.4 0 .7-.3.7-.6v-1.4z" } },
	  richtextindent: { "path": { "d": "M24 5.3c0-.4-.3-.7-.7-.7h-7.8c-.4 0-.7.3-.7.7v1.4c0 .4.3.7.7.7h7.8c.4 0 .7-.3.7-.7V5.3zm-1.8 11.1c0-.4-.4-.7-.7-.7h-6c-.4 0-.7.3-.7.7v1.4c0 .3.3.7.7.7h6c.3 0 .7-.4.7-.7v-1.4zm1.8-5.6c0-.3-.3-.6-.7-.6h-7.8c-.4 0-.7.3-.7.6v1.4c0 .4.3.7.7.7h7.8c.4 0 .7-.3.7-.7v-1.4zM12.9 2.5c0-.3-.3-.7-.7-.7h-1.4c-.3 0-.6.4-.6.7v19c0 .3.3.7.6.7h1.4c.4 0 .7-.4.7-.7v-19zM4.3 7.1c-.2-.3-.6-.1-.6.4v2.7h-3c-.4 0-.7.3-.7.6v1.4c0 .4.3.7.7.7h3v2.7c0 .5.4.7.6.5l3.9-4.2c.1-.2.1-.5 0-.6L4.3 7.1z" } },
	  richtextnumberedlist: { "path": { "d": "M23.1 3v1.4c0 .4-.3.7-.7.7H9.9c-.3 0-.7-.3-.7-.7V3c0-.4.4-.7.7-.7h12.5c.4 0 .7.3.7.7zM9.9 9.7h8.3c.4 0 .7-.3.7-.7V7.6c0-.4-.3-.7-.7-.7H9.9c-.3 0-.7.3-.7.7V9c0 .4.4.7.7.7zm12.5 4.1H9.9c-.3 0-.7.4-.7.7v1.4c0 .4.4.7.7.7h12.5c.4 0 .7-.3.7-.7v-1.4c0-.3-.3-.7-.7-.7zm-4.2 4.7H9.9c-.3 0-.7.3-.7.7v1.3c0 .4.4.7.7.7h8.3c.4 0 .7-.3.7-.7v-1.3c0-.4-.3-.7-.7-.7zM1.6 3.7h1.2v5.8c0 .3.3.7.7.7h.4c.4 0 .7-.4.7-.7V2.8c0-.5-.4-1-.9-1H1.6c-.4 0-.7.4-.7.7V3c0 .4.3.7.7.7zm3.9 9.2H1.6c-.4 0-.7.3-.7.7v.5c0 .3.3.7.7.7h3v1.8H1.8c-.5 0-.9.4-.9.9v3.7c0 .5.4 1 .9 1h4c.3 0 .7-.4.7-.7V21c0-.4-.4-.7-.7-.7h-3v-1.8h2.7c.5 0 1-.5 1-1v-3.7c0-.5-.5-.9-1-.9z" } },
	  richtextoutdent: { "path": { "d": "M7.6 10.2h-3V7.4c0-.4-.4-.7-.6-.4L.1 11.2c-.1.2-.1.4 0 .6L4 16c.2.2.6 0 .6-.4v-2.7h3c.3 0 .7-.3.7-.7v-1.4c0-.3-.4-.6-.7-.6zM24 5.3c0-.4-.3-.7-.7-.7h-7.8c-.4 0-.7.3-.7.7v1.4c0 .4.3.7.7.7h7.8c.4 0 .7-.3.7-.7V5.3zm-1.8 11.1c0-.4-.4-.7-.7-.7h-6c-.4 0-.7.3-.7.7v1.4c0 .3.3.7.7.7h6c.3 0 .7-.4.7-.7v-1.4zm1.8-5.6c0-.3-.3-.6-.7-.6h-7.8c-.4 0-.7.3-.7.6v1.4c0 .4.3.7.7.7h7.8c.4 0 .7-.3.7-.7v-1.4zM12.9 2.5c0-.3-.3-.7-.7-.7h-1.4c-.3 0-.6.4-.6.7v19c0 .3.3.7.6.7h1.4c.4 0 .7-.4.7-.7v-19z" } },
	  right: { "path": { "d": "M6.5 20.2V3.8c0-.4.6-.8 1-.4l9.8 8c.3.3.3.9 0 1.2l-9.8 8c-.4.4-1 .1-1-.4z" } },
	  right_align_text: { "path": { "d": "M21.5 2.3h-19c-.3 0-.7.3-.7.7v1.4c0 .4.4.7.7.7h19c.3 0 .7-.3.7-.7V3c0-.4-.4-.7-.7-.7zm0 5.5H6.2c-.3 0-.7.4-.7.7v1.4c0 .4.4.7.7.7h15.3c.3 0 .7-.3.7-.7V8.5c0-.3-.4-.7-.7-.7zm0 11.1H6.2c-.3 0-.7.3-.7.7V21c0 .4.4.7.7.7h15.3c.3 0 .7-.3.7-.7v-1.4c0-.4-.4-.7-.7-.7zm0-5.5h-19c-.3 0-.7.3-.7.7v1.4c0 .3.4.7.7.7h19c.3 0 .7-.4.7-.7v-1.4c0-.4-.4-.7-.7-.7z" } },
	  rotate: { "path": { "d": "M22.4.9H21c-.4 0-.7.3-.7.7v3.2c0 .5-.5.7-.7.4-2.2-2.4-5.3-3.6-8.7-3.3-1.2.1-2.3.5-3.4 1-.5.3-1.1.6-1.5 1-.4.2-.4.7-.1 1l.9 1c.3.2.6.3.9.1.6-.4 1.2-.7 1.8-1 .3-.1.6-.2.9-.2 2.9-.6 5.7.6 7.3 2.4.5.7.1 1.1-.3 1.1h-3.3c-.3 0-.7.3-.7.7v1.4c0 .4.4.7.7.7h8.4c.3 0 .6-.3.6-.6V1.6c0-.4-.3-.7-.7-.7zm-4.2 16.4c-.3-.3-.7-.3-1 0-.7.7-1.6 1.3-2.7 1.7-.2.1-.6.2-.9.2-2.9.6-5.7-.6-7.2-2.4-.6-.7-.2-1.1.3-1.1h3.2c.4 0 .7-.3.7-.7v-1.4c0-.4-.3-.7-.7-.7H1.5c-.3 0-.6.3-.6.6v8.9c0 .4.3.7.7.7H3c.4 0 .7-.3.7-.7v-3.2c0-.5.5-.7.7-.4 2.2 2.4 5.3 3.6 8.7 3.3 1.2-.1 2.3-.5 3.4-1 1-.5 1.9-1.2 2.6-1.9.3-.3.3-.7 0-1l-.9-.9z" } },
	  rows: { "path": { "d": "M21.5 6.5h-19c-.3 0-.7-.4-.7-.7V4.4c0-.4.4-.7.7-.7h19c.3 0 .7.3.7.7v1.4c0 .3-.4.7-.7.7zm0 6.8h-19c-.3 0-.7-.3-.7-.7v-1.3c0-.4.4-.7.7-.7h19c.3 0 .7.3.7.7v1.4c0 .3-.4.6-.7.6zm0 7h-19c-.3 0-.7-.3-.7-.7v-1.4c0-.3.4-.7.7-.7h19c.3 0 .7.4.7.7v1.4c0 .4-.4.7-.7.7z" } },
	  salesforce1: { "path": { "d": "M10 5.5c.8-.8 1.9-1.3 3.1-1.3 1.5 0 2.9.9 3.7 2.2.6-.3 1.3-.5 2-.5 2.9 0 5.2 2.3 5.2 5.2s-2.3 5.1-5.2 5.1h-1c-.6 1.1-1.9 1.9-3.3 1.9-.6 0-1.2-.1-1.7-.4-.6 1.5-2.1 2.6-3.9 2.6-1.9 0-3.5-1.1-4.1-2.8-.3 0-.6.1-.8.1-2.2 0-4-1.8-4-4 0-1.5.7-2.8 1.9-3.5-.2-.5-.3-1.2-.3-1.8 0-2.6 2-4.7 4.6-4.7 1.6.1 3 .8 3.8 1.9" } },
	  search: { "path": { "d": "M22.9 20.9l-6.2-6.1c1.3-1.8 1.9-4 1.6-6.4-.6-3.9-3.8-7.1-7.8-7.4C5 .4.4 5 1 10.5c.3 4 3.5 7.3 7.4 7.8 2.4.3 4.6-.3 6.4-1.5l6.1 6.1c.3.3.7.3 1 0l.9-1c.3-.3.3-.7.1-1zM3.7 9.6c0-3.2 2.7-5.9 5.9-5.9s6 2.7 6 5.9-2.7 6-6 6-5.9-2.6-5.9-6z" } },
	  settings: { "path": { "d": "M12 8.8c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.3 3.2 3.3 3.3-1.5 3.3-3.3-1.5-3.2-3.3-3.2zm9.7 6.2L20 13.5c.1-.5.2-1 .2-1.5s-.1-1.1-.2-1.6L21.7 9c.6-.5.8-1.3.4-2l-.7-1.3c-.3-.4-.8-.7-1.4-.7-.2 0-.3 0-.5.1l-2.1.8c-.8-.8-1.8-1.3-2.7-1.6l-.4-2.2c-.1-.7-.8-1.1-1.5-1.1h-1.5c-.7 0-1.4.4-1.5 1.1l-.4 2.1c-1 .4-1.9.9-2.8 1.6L4.5 5c-.2 0-.3-.1-.5-.1-.5 0-1 .3-1.3.8L1.9 7c-.3.6-.2 1.4.4 1.9L4 10.3c-.1.5-.1 1.1-.1 1.6 0 .6 0 1.1.1 1.6l-1.7 1.4c-.5.5-.7 1.3-.4 1.9l.8 1.3c.3.5.8.8 1.3.8.2 0 .4-.1.5-.1l2.1-.8c.9.7 1.8 1.2 2.8 1.6l.3 2.2c.2.7.8 1.2 1.6 1.2h1.4c.8 0 1.4-.5 1.6-1.3l.3-2.2c1.1-.3 2.1-.9 2.9-1.7l2 .8c.2 0 .3.1.5.1.6 0 1.1-.3 1.4-.7l.7-1.2c.4-.6.2-1.4-.4-1.8zM12 17.1c-2.8 0-5-2.2-5-5.1s2.2-5 5-5 5.1 2.2 5.1 5-2.2 5.1-5.1 5.1z" } },
	  setup: { "path": { "d": "M21.6 15l-1.7-1.5c.1-.5.1-1 .1-1.5s0-1.1-.1-1.6L21.6 9c.6-.5.7-1.3.4-2l-.8-1.3c-.2-.5-.8-.8-1.3-.8-.2 0-.4.1-.5.1l-2.1.8c-.8-.7-1.7-1.2-2.7-1.6l-.3-2.1c-.2-.8-.8-1.2-1.6-1.2h-1.4c-.8 0-1.4.4-1.6 1.2l-.3 2.1c-1 .3-1.9.9-2.8 1.6l-2-.8c-.2-.1-.3-.1-.5-.1-.5 0-1.1.3-1.3.7L2 6.9c-.3.7-.2 1.5.4 2l1.7 1.4c-.1.5-.1 1.1-.1 1.6s0 1 .1 1.5l-1.7 1.5c-.6.4-.7 1.3-.4 1.9l.8 1.4c.2.4.8.7 1.3.7.2 0 .4 0 .5-.1l2.1-.8c.8.8 1.7 1.3 2.7 1.6l.3 2.2c.2.8.8 1.3 1.6 1.3h1.4c.8 0 1.4-.6 1.6-1.3l.3-2.2c1.1-.4 2-1 2.8-1.7l2 .7c.2.1.4.1.5.1.6 0 1.1-.2 1.4-.7l.7-1.2c.3-.6.2-1.4-.4-1.8zM12 17.1c-2.7 0-5-2.2-5-5.1s2.2-5 5-5 5.1 2.2 5.1 5-2.3 5.1-5.1 5.1zm1.4-8.8h-2.1c-.4 0-.6.2-.7.5l-1.3 3.3c-.1.2.1.5.3.5h2.2l-.8 2.8c-.1.2.3.4.4.2l3.3-3.8c.3-.3.1-.6-.3-.6h-1.6l1.5-2.3c.1-.2-.1-.5-.4-.5h-.5z" } },
	  setup_assistant_guide: { "path": { "d": "M5.3 11.5c0-.2-.2-.3-.4-.2l-2 1.7c-.1.1-.1.2-.1.4v7.3c0 .5.6.7 1 .4l3.4-2.6c.1-.1.1-.2 0-.4-.8-1.2-1.6-3.3-1.9-6.6zm4.5 6.9c.1 0 .2.1.3.1h3.8c.1 0 .2-.1.3-.1.5-.4 2.7-2.2 2.7-8.5 0-2.9-.8-5-1.8-6.3C13.7 1.5 12 .9 12 .9s-1.8.6-3.2 2.7C7.8 5 7.1 7 7.1 9.9c0 6.3 2.1 8.1 2.7 8.5zM12 6c1.5 0 2.7 1.2 2.7 2.8s-1.2 2.7-2.7 2.7-2.8-1.2-2.8-2.7S10.4 6 12 6zm9.1 7l-2-1.7c-.2-.1-.4 0-.4.2-.3 3.3-1.1 5.4-1.9 6.7v.3l3.4 2.6c.4.4 1 .1 1-.3v-7.4c0-.2 0-.3-.1-.4zm-6.2 7.5c-.1-.1-.3-.2-.4-.2H9.4c-.1 0-.3.1-.4.2-.1.3-.4.8-.6 1.5-.1.5.3 1.1.9 1.1h5.3c.6 0 1-.6.9-1.1-.2-.7-.5-1.2-.6-1.5z" } },
	  share: { "path": { "d": "M22.4 13.8H21c-.4 0-.7.4-.7.7v5.1c0 .4-.3.7-.7.7H4.4c-.4 0-.7-.3-.7-.7V9.9c0-.3.3-.7.7-.7h1.8c.4 0 .7-.3.7-.7V7.2c0-.4-.3-.7-.7-.7H2.8c-1 0-1.9.8-1.9 1.8v12.9c0 1 .9 1.9 1.9 1.9h18.4c1 0 1.9-.9 1.9-1.9v-6.7c0-.3-.3-.7-.7-.7zm-6.7-7.3c-4.6 0-8.8 4.1-9.2 8.9 0 .4.3.8.7.8h1.4c.4 0 .6-.3.7-.6.3-3.5 3.3-6.4 6.9-6.4h.7c.4 0 .6.5.3.8l-2.5 2.6c-.3.3-.3.7 0 1l.9.9c.3.3.7.3 1 0l6.3-6.2c.3-.3.3-.7 0-1l-6.2-6.2c-.3-.3-.7-.3-1 0l-1 1c-.3.3-.3.7 0 .9l2.6 2.6c.2.3.1.8-.4.8l-1.2.1z" } },
	  share_post: { "path": { "d": "M12 1.8C5.9 1.8.9 6.4.9 12c0 1.8.5 3.5 1.4 5 .1.2.1.4.1.6l-1 3.2c-.2.6.4 1.1 1 .9l3.2-1.1c.2-.1.4-.1.6.1 1.7.9 3.7 1.5 5.8 1.5 6.2 0 11.1-4.5 11.1-10.2C23 6.4 18 1.8 12 1.8z" } },
	  shield: { "path": { "d": "M2.2 6.5h19.6c.4 0 .8-.5.7-1-.5-1.5-1.1-2.9-2-4.1-.3-.4-.8-.4-1.1-.1-.8.8-2.1 1.3-3.4 1.3-1.4 0-2.6-.6-3.5-1.5-.3-.3-.8-.3-1.1 0-.9.9-2.1 1.5-3.5 1.5-1.3 0-2.5-.5-3.4-1.3-.3-.3-.9-.2-1.1.1-.9 1.2-1.6 2.6-2 4.1 0 .5.4 1 .8 1zm20.9 2.9c0-.4-.3-.6-.8-.6H1.7c-.5 0-.8.2-.8.6v.2c0 6.9 4.8 12.6 11.1 13.5 6.3-.9 11.1-6.6 11.1-13.5v-.2z" } },
	  side_list: { "path": { "d": "M22.4 1.8H9.9c-.3 0-.7.4-.7.7v19c0 .3.4.7.7.7h12.5c.4 0 .7-.4.7-.7v-19c0-.3-.3-.7-.7-.7zm-15.7 0H1.6c-.4 0-.7.4-.7.7v2.3c0 .4.3.7.7.7h5.1c.4 0 .7-.3.7-.7V2.5c0-.3-.3-.7-.7-.7zm0 5.6H1.6c-.4 0-.7.3-.7.7v2.3c0 .4.3.7.7.7h5.1c.4 0 .7-.3.7-.7V8.1c0-.4-.3-.7-.7-.7zm0 5.5H1.6c-.4 0-.7.3-.7.7v2.3c0 .4.3.7.7.7h5.1c.4 0 .7-.3.7-.7v-2.3c0-.4-.3-.7-.7-.7zm0 5.6H1.6c-.4 0-.7.3-.7.7v2.3c0 .3.3.7.7.7h5.1c.4 0 .7-.4.7-.7v-2.3c0-.4-.3-.7-.7-.7z" } },
	  signpost: { "path": { "d": "M22.8 4.2l-1.9-1.5c-.3-.2-.5-.3-.9-.3h-6.5v-.7c0-.5-.3-.8-.8-.8h-1.4c-.5 0-.8.3-.8.8v.7H3.1c-.4 0-.7.3-.7.7v3c0 .4.3.7.7.7H20c.4 0 .7-.1.9-.2l1.9-1.5c.4-.3.4-.7 0-.9zm-1.9 6.3h-7.4V9.4c0-.2-.2-.4-.4-.4h-2.2c-.2 0-.4.2-.4.4v1.1H4c-.4 0-.7.1-.9.3l-1.9 1.4c-.4.3-.4.7 0 1l1.9 1.4c.3.2.5.3.9.3h16.9c.4 0 .7-.3.7-.7v-3c0-.4-.3-.7-.7-.7zM13.5 20v-2.5c0-.2-.2-.3-.4-.3h-2.2c-.2 0-.4.1-.4.3V20c-1.5.4-2.3 1.3-2.5 2.4-.1.3.2.7.5.7h7c.4 0 .7-.3.6-.7-.3-1.1-1.1-2-2.6-2.4z" } },
	  sms: { "path": { "d": "M12 1.8C5.9 1.8 1 6.4 1 12c0 1.7.5 3.4 1.3 4.8.1.3.2.6.1.8l-1.4 4c-.2.3.2.6.6.6l3.9-1.6c.3-.1.5 0 .8.1 1.7.9 3.7 1.5 5.8 1.5 6 0 11-4.6 11-10.2C23 6.4 18.1 1.8 12 1.8zM7.6 13.7c-.2.2-.3.4-.5.6s-.4.2-.7.3c-.2.1-.5.1-.8.1-.3 0-.7 0-1-.2-.3-.1-.6-.3-.9-.6l-.1-.1s0-.1.1-.2l.8-.7c.1-.1.2-.1.2 0s.1.1.1.1c.1.2.2.2.4.3.2.2.4.2.7.1.1 0 .1 0 .2-.1l.2-.1V13c0-.2 0-.2-.1-.3-.1-.1-.2-.1-.4-.2s-.4-.1-.6-.2l-.6-.3c-.3-.1-.4-.3-.5-.5-.2-.2-.3-.5-.3-.8 0-.4.1-.6.2-.9.2-.2.3-.4.5-.5.2-.2.4-.3.7-.3.6-.2 1.1-.2 1.7 0 .3.1.5.3.7.4l.1.1c.1 0 .1.1 0 .2l-.7.7c-.1.1-.3.1-.4 0l-.1-.1c-.3-.1-.6-.2-.9-.1h-.2l-.1.2v.2c0 .1 0 .2.1.2 0 .1.2.1.4.2s.3.2.6.2l.6.3c.2.1.4.3.5.5.2.2.3.5.3.9 0 .3-.1.5-.2.8zm7.6.6c0 .3-.2.5-.5.5h-.4c-.3 0-.5-.2-.5-.5v-2.7c0-.3-.3-.3-.4-.1l-.8 2.1c0 .2-.2.2-.4.2h-.3c-.2 0-.4-.1-.5-.2l-.8-2.1c-.1-.2-.4-.2-.4.1v2.7c0 .3-.3.5-.6.5h-.4c-.3 0-.4-.2-.4-.5V9.2c0-.2.2-.4.4-.4h1.2c.2 0 .4.1.4.2l.9 2.4c.1.2.4.2.4 0l1-2.4c0-.1.2-.2.4-.2h1.2c.3 0 .5.2.5.4v5.1zm4.9-.6c-.2.2-.3.5-.5.6-.2.1-.4.3-.7.4s-.5.1-.8.1c-.4 0-.7-.1-1-.2-.3-.2-.7-.3-.9-.6l-.1-.1c0-.1 0-.1.1-.2l.7-.7c.1-.1.2-.1.3-.1s.1.2.1.2l.3.3c.3.1.5.1.8.1.1-.1.2-.1.2-.1l.1-.2.1-.1c0-.2-.1-.3-.1-.3-.1-.1-.2-.2-.4-.2s-.4-.2-.6-.2c-.3-.1-.5-.2-.7-.3-.2-.1-.4-.3-.5-.5-.2-.2-.3-.5-.3-.9 0-.3.1-.6.2-.8.2-.3.3-.4.5-.6.2-.1.5-.3.7-.3.6-.1 1.1-.1 1.7 0 .3.1.5.3.7.5l.1.1c.1 0 .1.2 0 .3l-.7.7c-.1.1-.2.1-.3 0l-.2-.2c-.3-.1-.6-.2-.9-.1 0 0-.1 0-.1.1l-.2.1v.2c0 .1 0 .2.1.2.1.1.2.2.4.3.2 0 .4.1.6.2.2 0 .4.1.6.2.3.2.4.4.6.5.1.3.2.5.2.9.1.2 0 .5-.1.7z" } },
	  snippet: { "path": { "d": "M6.7 2.8H1.6c-.4 0-.7.3-.7.7v6c0 .3.3.7.7.7h5.1c.4 0 .7-.4.7-.7v-6c0-.4-.3-.7-.7-.7zm15.7 0H9.9c-.3 0-.7.3-.7.7v1.3c0 .4.4.7.7.7h12.5c.4 0 .7-.3.7-.7V3.5c0-.4-.3-.7-.7-.7zM9.9 10.2h7.9c.3 0 .7-.4.7-.7V8.1c0-.4-.4-.7-.7-.7H9.9c-.3 0-.7.3-.7.7v1.4c0 .3.4.7.7.7zm-3.2 3.6H1.6c-.4 0-.7.4-.7.7v6c0 .4.3.7.7.7h5.1c.4 0 .7-.3.7-.7v-6c0-.3-.3-.7-.7-.7zm15.7 0H9.9c-.3 0-.7.4-.7.7v1.4c0 .4.4.7.7.7h12.5c.4 0 .7-.3.7-.7v-1.4c0-.3-.3-.7-.7-.7zm-4.6 4.7H9.9c-.3 0-.7.3-.7.7v1.3c0 .4.4.7.7.7h7.9c.3 0 .7-.3.7-.7v-1.3c0-.4-.4-.7-.7-.7z" } },
	  socialshare: { "path": { "d": "M18.9 14.8c-1.2 0-2.3.5-3 1.3l-6.8-3.4c.1-.2.1-.5.1-.7 0-.3-.1-.6-.1-.8l6.8-3.4c.7.9 1.8 1.4 3 1.4 2.3 0 4.2-1.9 4.2-4.2S21.2.9 18.9.9 14.8 2.7 14.8 5v.3l-7 3.5c-.8-.6-1.7-1-2.8-1C2.7 7.8.9 9.7.9 12s1.8 4.2 4.1 4.2c1.1 0 2-.4 2.8-1.1l6.9 3.5v.3c0 2.3 1.9 4.2 4.2 4.2s4.1-1.9 4.1-4.2-1.8-4.1-4.1-4.1z" } },
	  sort: { "path": { "d": "M12.7 7.4c.3-.3.3-.7 0-1L7.4 1.1c-.2-.3-.7-.3-.9 0L1.2 6.4c-.3.3-.3.7 0 1l.9 1c.3.2.7.2 1 0l1.7-1.7c.2-.3.7-.1.7.3v9.8c0 .4.4.7.7.7h1.4c.4 0 .7-.4.7-.7V7c0-.4.5-.6.8-.3l1.7 1.7c.2.2.6.2.9 0l1-1zm10.1 9.2l-.9-.9c-.3-.3-.7-.3-1 0l-1.7 1.7c-.2.2-.7 0-.7-.4V7.2c0-.4-.4-.7-.7-.7h-1.4c-.4 0-.7.3-.7.7v9.7c0 .5-.5.6-.8.4l-1.7-1.7c-.2-.3-.6-.3-.9 0l-1 1c-.3.3-.3.7 0 1l5.3 5.3c.3.3.7.3 1 0l5.3-5.3c.2-.3.2-.8-.1-1z" } },
	  spinner: { "path": { "d": "M7.4 12.7v-1.4c0-.4-.3-.7-.7-.7H1.6c-.4 0-.7.3-.7.7v1.4c0 .4.3.7.7.7h5.1c.4 0 .7-.3.7-.7zm.9 2.1c-.3-.3-.7-.3-1 0l-3.6 3.6c-.3.2-.3.7 0 .9l1 1c.2.3.7.3.9 0l3.6-3.6c.3-.3.3-.7 0-1l-.9-.9zm7.4-5.6c.3.3.7.3 1 0l3.6-3.6c.3-.2.3-.7 0-.9l-1-1c-.2-.3-.7-.3-.9 0l-3.6 3.5c-.3.3-.3.7 0 1l.9 1zM5.6 3.7c-.2-.3-.7-.3-.9 0l-1 1c-.3.2-.3.7 0 .9l3.6 3.6c.3.3.7.3 1 0l.9-.9c.3-.3.3-.7 0-1L5.6 3.7zm11.2 11.1c-.3-.3-.7-.3-1 0l-1 .9c-.3.3-.3.7 0 1l3.6 3.6c.2.3.7.3.9 0l1-1c.3-.2.3-.7 0-.9l-3.5-3.6zm-4.1 1.8h-1.4c-.4 0-.7.3-.7.7v5.1c0 .4.3.7.7.7h1.4c.4 0 .7-.3.7-.7v-5.1c0-.4-.3-.7-.7-.7zm9.7-6h-5.1c-.4 0-.7.3-.7.7v1.4c0 .4.3.7.7.7h5.1c.4 0 .7-.3.7-.7v-1.4c0-.4-.3-.7-.7-.7zM12.7.9h-1.4c-.4 0-.7.3-.7.7v5.1c0 .4.3.7.7.7h1.4c.4 0 .7-.3.7-.7V1.6c0-.4-.3-.7-.7-.7z" } },
	  standard_objects: { "path": { "d": "M21.3 18l-8.7 4.9c-.4.3-1 .3-1.5 0L2.5 18c-.4-.2-.4-.7 0-.9l2-1.1c.2-.1.3-.1.5 0l5.2 3c.6.2 1.1.4 1.7.4s1.2-.2 1.7-.4l5.2-3c.2-.1.4-.1.5 0l2 1.1c.4.2.4.7 0 .9zm0-5.6l-8.7 5c-.4.2-1 .2-1.5 0l-8.6-5c-.4-.2-.4-.6 0-.8l2-1.2c.2-.1.3-.1.5 0l5.2 3c.6.3 1.1.4 1.7.4s1.2-.1 1.7-.4l5.2-3c.2-.1.4-.1.5 0l2 1.2c.4.2.4.6 0 .8zm-10.1-.6L2.5 6.9c-.3-.2-.3-.7 0-.9l8.7-4.9c.5-.3 1.1-.3 1.5 0L21.4 6c.4.2.4.7 0 .9l-8.7 4.9c-.4.2-1 .2-1.5 0z" } },
	  stop: { "path": { "d": "M3.7 3.7h16.6v16.6H3.7V3.7z" } },
	  strikethrough: { "path": { "d": "M5.6 8.4c-.1-.5-.2-1.1-.2-1.6 0-.6.2-1.3.5-2 .2-.6.7-1.3 1.3-1.8.5-.6 1.3-1.1 2.2-1.5.9-.3 2-.6 3.2-.6 1.2 0 2.3.2 3.4.5.8.3 1.6.7 2.3 1.4.3.2.3.7-.1 1L17 4.9c-.3.3-.7.3-1 0-.3-.3-.7-.6-1.1-.8-.6-.3-1.4-.5-2.3-.5-.7 0-1.4.1-1.9.3s-1 .5-1.3.9-.6.6-.7 1-.2.8-.2 1c0 .5.1 1 .2 1.3.2.3-.1.7-.4.7H6c-.2 0-.4-.3-.4-.4zm12.8 6.8h-2.3c-.3 0-.5.4-.4.6.1.3.2.7.2 1 0 .6-.2 1.1-.4 1.6-.3.4-.6.8-1 1.1-.4.3-.9.5-1.4.6-.5.2-1 .3-1.5.3-.8 0-1.7-.2-2.5-.6-.6-.3-1.1-.6-1.5-1.2-.3-.2-.7-.3-1 0l-1.3 1.1c-.3.2-.3.7 0 .9.6.8 1.4 1.3 2.4 1.7 1.2.5 2.5.7 3.9.7 1 0 2-.2 2.8-.5.9-.3 1.7-.7 2.4-1.3.6-.5 1.2-1.2 1.6-2 .3-.9.6-1.8.6-2.8 0-.3 0-.6-.1-.9-.1-.1-.3-.3-.5-.3zM23 11c-.1-.2-.3-.4-.6-.4H1.6c-.3 0-.5.2-.6.4-.1.1-.1.2-.1.3v1.3c0 .4.3.8.7.8h20.8c.4 0 .7-.4.7-.8v-1.3c0-.1 0-.2-.1-.3z" } },
	  success: { "path": { "d": "M12 .9C5.9.9.9 5.9.9 12s5 11.1 11.1 11.1 11.1-5 11.1-11.1S18.1.9 12 .9zm6.2 8.3l-7.1 7.2c-.3.3-.7.3-1 0l-3.9-3.9c-.2-.3-.2-.8 0-1.1l1-1c.3-.2.8-.2 1.1 0l2 2.1c.2.2.5.2.7 0l5.2-5.3c.2-.3.7-.3 1 0l1 1c.3.2.3.7 0 1z" } },
	  summary: { "path": { "d": "M22.4.9H1.6c-.4 0-.7.3-.7.7v2.3c0 .4.3.7.7.7h20.8c.4 0 .7-.3.7-.7V1.6c0-.4-.3-.7-.7-.7zm0 5.6H6.2c-.3 0-.7.3-.7.7v1.3c0 .4.4.7.7.7h16.2c.4 0 .7-.3.7-.7V7.2c0-.4-.3-.7-.7-.7zm0 9.2H6.2c-.3 0-.7.3-.7.7v1.4c0 .3.4.7.7.7h16.2c.4 0 .7-.4.7-.7v-1.4c0-.4-.3-.7-.7-.7zm0 4.6h-18c-.4 0-.7-.3-.7-.7v-3.2c0-.4-.3-.7-.7-.7H1.6c-.4 0-.7.3-.7.7v6c0 .4.3.7.7.7h20.8c.4 0 .7-.3.7-.7V21c0-.4-.3-.7-.7-.7zm0-9.2h-18c-.4 0-.7-.3-.7-.7V7.2c0-.4-.3-.7-.7-.7H1.6c-.4 0-.7.3-.7.7v6c0 .3.3.6.7.6h20.8c.4 0 .7-.3.7-.6v-1.4c0-.4-.3-.7-.7-.7z" } },
	  summarydetail: { "path": { "d": "M22.4.9H1.6c-.4 0-.7.3-.7.7v2.3c0 .4.3.7.7.7h20.8c.4 0 .7-.3.7-.7V1.6c0-.4-.3-.7-.7-.7zM9.5 6.5H6.2c-.3 0-.7.3-.7.7v1.3c0 .4.4.7.7.7h3.3c.3 0 .7-.3.7-.7V7.2c0-.4-.4-.7-.7-.7zm6.4 0h-3.2c-.4 0-.7.3-.7.7v1.3c0 .4.3.7.7.7h3.2c.4 0 .7-.3.7-.7V7.2c0-.4-.3-.7-.7-.7zm6.5 0h-3.2c-.4 0-.7.3-.7.7v1.3c0 .4.3.7.7.7h3.2c.4 0 .7-.3.7-.7V7.2c0-.4-.3-.7-.7-.7zM9.5 15.7H6.2c-.3 0-.7.3-.7.7v1.4c0 .3.4.7.7.7h3.3c.3 0 .7-.4.7-.7v-1.4c0-.4-.4-.7-.7-.7zm6.4 0h-3.2c-.4 0-.7.3-.7.7v1.4c0 .3.3.7.7.7h3.2c.4 0 .7-.4.7-.7v-1.4c0-.4-.3-.7-.7-.7zm6.5 0h-3.2c-.4 0-.7.3-.7.7v1.4c0 .3.3.7.7.7h3.2c.4 0 .7-.4.7-.7v-1.4c0-.4-.3-.7-.7-.7zm0 4.6h-18c-.4 0-.7-.3-.7-.7v-3.2c0-.4-.3-.7-.7-.7H1.6c-.4 0-.7.3-.7.7v6c0 .4.3.7.7.7h20.8c.4 0 .7-.3.7-.7V21c0-.4-.3-.7-.7-.7zm0-9.2h-18c-.4 0-.7-.3-.7-.7V7.2c0-.4-.3-.7-.7-.7H1.6c-.4 0-.7.3-.7.7v6c0 .3.3.6.7.6h20.8c.4 0 .7-.3.7-.6v-1.4c0-.4-.3-.7-.7-.7z" } },
	  "switch": { "path": { "d": "M22 8.2l-9.5 9.6c-.3.2-.7.2-1 0L2 8.2c-.2-.3-.2-.7 0-1l1-1c.3-.3.8-.3 1.1 0l7.4 7.5c.3.3.7.3 1 0l7.4-7.5c.3-.3.8-.3 1.1 0l1 1c.2.3.2.7 0 1z" } },
	  table: { "path": { "d": "M21.5.9h-19c-.3 0-.7.3-.7.7v2.3c0 .4.4.7.7.7h19c.3 0 .7-.3.7-.7V1.6c0-.4-.4-.7-.7-.7zM6.7 6.5H2.5c-.3 0-.7.3-.7.7v1.3c0 .4.4.7.7.7h4.2c.4 0 .7-.3.7-.7V7.2c0-.4-.3-.7-.7-.7zm7.4 0H9.9c-.3 0-.7.3-.7.7v1.3c0 .4.4.7.7.7h4.2c.3 0 .7-.3.7-.7V7.2c0-.4-.4-.7-.7-.7zm7.4 0h-4.2c-.4 0-.7.3-.7.7v1.3c0 .4.3.7.7.7h4.2c.3 0 .7-.3.7-.7V7.2c0-.4-.4-.7-.7-.7zM6.7 11.1H2.5c-.3 0-.7.3-.7.7v1.4c0 .3.4.6.7.6h4.2c.4 0 .7-.3.7-.6v-1.4c0-.4-.3-.7-.7-.7zm7.4 0H9.9c-.3 0-.7.3-.7.7v1.4c0 .3.4.6.7.6h4.2c.3 0 .7-.3.7-.6v-1.4c0-.4-.4-.7-.7-.7zm7.4 0h-4.2c-.4 0-.7.3-.7.7v1.4c0 .3.3.6.7.6h4.2c.3 0 .7-.3.7-.6v-1.4c0-.4-.4-.7-.7-.7zM6.7 15.7H2.5c-.3 0-.7.3-.7.7v1.4c0 .3.4.7.7.7h4.2c.4 0 .7-.4.7-.7v-1.4c0-.4-.3-.7-.7-.7zm7.4 0H9.9c-.3 0-.7.3-.7.7v1.4c0 .3.4.7.7.7h4.2c.3 0 .7-.4.7-.7v-1.4c0-.4-.4-.7-.7-.7zm7.4 0h-4.2c-.4 0-.7.3-.7.7v1.4c0 .3.3.7.7.7h4.2c.3 0 .7-.4.7-.7v-1.4c0-.4-.4-.7-.7-.7zM6.7 20.3H2.5c-.3 0-.7.3-.7.7v1.4c0 .4.4.7.7.7h4.2c.4 0 .7-.3.7-.7V21c0-.4-.3-.7-.7-.7zm7.4 0H9.9c-.3 0-.7.3-.7.7v1.4c0 .4.4.7.7.7h4.2c.3 0 .7-.3.7-.7V21c0-.4-.4-.7-.7-.7zm7.4 0h-4.2c-.4 0-.7.3-.7.7v1.4c0 .4.3.7.7.7h4.2c.3 0 .7-.3.7-.7V21c0-.4-.4-.7-.7-.7z" } },
	  tablet_landscape: { "path": { "d": "M23.1 4.6c0-1-.9-1.8-1.9-1.8H2.8c-1 0-1.9.8-1.9 1.8v14.8c0 1 .9 1.8 1.9 1.8h18.4c1 0 1.9-.8 1.9-1.8V4.6zM3.2 13.4c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.7 1.4-1.4 1.4zm17.1 4.4c0 .3-.3.7-.7.7H6.2c-.3 0-.7-.4-.7-.7V6.2c0-.3.4-.7.7-.7h13.4c.4 0 .7.4.7.7v11.6z" } },
	  tablet_portrait: { "path": { "d": "M21.2 2.8c0-1-.8-1.9-1.8-1.9H4.6c-1 0-1.8.9-1.8 1.9v18.4c0 1 .8 1.9 1.8 1.9h14.8c1 0 1.8-.9 1.8-1.9V2.8zM12 22.2c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.3.6 1.3 1.4-.6 1.4-1.3 1.4zm6.5-4.4c0 .3-.4.7-.7.7H6.2c-.3 0-.7-.4-.7-.7V4.4c0-.4.4-.7.7-.7h11.6c.3 0 .7.3.7.7v13.4z" } },
	  text_background_color: { "path": { "d": "M12 7.4l1.9 4.6H9.8l1.8-4.6h.4zm10.2-3.7v16.6c0 1-.9 1.9-1.9 1.9H3.7c-1 0-1.9-.9-1.9-1.9V3.7c0-1 .9-1.9 1.9-1.9h16.6c1 0 1.9.9 1.9 1.9zm-2.6 15.1L14.1 5.1c-.2-.3-.4-.5-.7-.5h-3.3c-.3 0-.5.2-.6.5L4.4 18.8c-.1.3.1.6.4.6h1.9c.3 0 .5-.2.6-.5l1.5-4.1H15l1.6 4.1c.1.3.4.5.7.5h1.9c.3 0 .5-.3.4-.6z" } },
	  text_color: { "path": { "d": "M4.8 16.6h1.9c.3 0 .5-.2.6-.5L8.8 12H15l1.6 4.1c.1.3.4.5.7.5h1.9c.3 0 .5-.3.4-.6L14 2.3c-.1-.3-.3-.5-.6-.5h-3.2c-.3 0-.6.2-.7.5L4.4 16c-.1.3.1.6.4.6zm6.8-12h.4l2 4.6H9.8l1.8-4.6zm10.8 14.8H1.6c-.4 0-.7.3-.7.7v1.4c0 .3.3.7.7.7h20.8c.4 0 .7-.4.7-.7v-1.4c0-.4-.3-.7-.7-.7z" } },
	  threedots: { "path": { "d": "M3.7 9.2c1.5 0 2.8 1.3 2.8 2.8s-1.3 2.8-2.8 2.8S.9 13.5.9 12s1.3-2.8 2.8-2.8zm8.3 0c1.5 0 2.8 1.3 2.8 2.8s-1.3 2.8-2.8 2.8-2.8-1.3-2.8-2.8 1.3-2.8 2.8-2.8zm8.3 0c1.5 0 2.8 1.3 2.8 2.8s-1.3 2.8-2.8 2.8-2.8-1.3-2.8-2.8 1.3-2.8 2.8-2.8z" } },
	  tile_card_list: { "path": { "d": "M6.7 1.8H2.5c-.3 0-.7.4-.7.7v7.9c0 .4.4.7.7.7h4.2c.4 0 .7-.3.7-.7V2.5c0-.3-.3-.7-.7-.7zm7.4 0H9.9c-.3 0-.7.4-.7.7v7.9c0 .4.4.7.7.7h4.2c.3 0 .7-.3.7-.7V2.5c0-.3-.4-.7-.7-.7zm7.4 0h-4.2c-.4 0-.7.4-.7.7v7.9c0 .4.3.7.7.7h4.2c.3 0 .7-.3.7-.7V2.5c0-.3-.4-.7-.7-.7zM6.7 12.9H2.5c-.3 0-.7.3-.7.7v7.9c0 .3.4.7.7.7h4.2c.4 0 .7-.4.7-.7v-7.9c0-.4-.3-.7-.7-.7zm7.4 0H9.9c-.3 0-.7.3-.7.7v7.9c0 .3.4.7.7.7h4.2c.3 0 .7-.4.7-.7v-7.9c0-.4-.4-.7-.7-.7zm7.4 0h-4.2c-.4 0-.7.3-.7.7v7.9c0 .3.3.7.7.7h4.2c.3 0 .7-.4.7-.7v-7.9c0-.4-.4-.7-.7-.7z" } },
	  topic: { "path": { "d": "M8 16.3c0-.1-.2-.3-.3-.3l-1-.3c-.2-.1-.4 0-.5.2l-1.8 3c-.4.9-.2 1.1.7.7l3-1.8c.2-.1.3-.3.3-.5l-.4-1zm8-8.6c0 .1.2.3.3.3l1 .3c.2.1.4 0 .5-.2L19.6 5c.4-.8.2-1.1-.7-.6l-3 1.7c-.2.1-.3.4-.3.5l.4 1.1zm-9.8.4c.1.2.3.3.5.3l1-.3c.1-.1.3-.2.3-.3l.3-1.1c.1-.1 0-.4-.2-.5l-3-1.8c-.9-.4-1.1-.2-.7.7l1.8 3zm11.6 7.8c-.1-.2-.3-.3-.5-.3l-1 .3c-.1.1-.3.2-.3.3l-.3 1.1c-.1.2 0 .4.2.5l3.1 1.8c.8.4 1.1.2.6-.7l-1.8-3zm4.7-4.3l-7.6-2c-.3 0-.5-.3-.5-.5l-2-7.6c-.3-.8-.6-.8-.8 0l-2 7.6c-.1.3-.3.5-.6.5l-7.5 2c-.8.3-.8.6 0 .8l7.6 2c.3.1.5.3.5.6l2 7.5c.3.8.6.8.8 0l2-7.5c.1-.3.3-.5.6-.6l7.5-2c.8-.2.8-.6 0-.8zM12 13.8c-1 0-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8 1.8.8 1.8 1.8-.8 1.8-1.8 1.8z" } },
	  trail: { "path": { "d": "M12.8.9c1.6 0 2.8 1.2 2.8 2.7s-1.3 2.8-2.8 2.8-2.7-1.2-2.7-2.8S11.3.9 12.8.9zm7 7.5c-.5-.1-1 .3-1.1.8l-.2 2.7c-.1 0-.2.1-.3.1h-2.5l-1.8-3.1c-.1-.3-.4-.5-.7-.5L10.5 8c-.4-.1-.9.2-1.1.6l-2 5.2c-.2.5 0 .9.4 1.1l5 3.4.4 3.9c0 .5.5.9 1 .9.6 0 1.1-.5 1-1l-.4-4.8c0-.2-.2-.5-.4-.6l-2.7-3.1 1-2.5 1.2 2.1c.2.3.5.6.9.6h3.5l-1 8.3c-.1.5.3.9.8 1 .1 0 .1-.1.1-.1.5 0 1-.3 1-.8l1.6-12.9c0-.4-.4-.9-1-.9zM5.6 12.8l1.7-4.4c.1-.3.3-.6.5-.8l-.3-.1c-1.5-.2-2.8.7-3.3 2.1L3.3 12c-.2.5.1 1.1.6 1.2l.4.1c.6.2 1.1-.1 1.3-.5zm.7 3.4l-2.1 6.2c-.1.4.1.6.5.6h1.1c.4 0 .8-.2 1-.6l2-4.5-2.3-1.4c0-.1-.1-.2-.2-.3z" } },
	  undelete: { "path": { "d": "M19.2 9.2H4.8c-.3 0-.6.4-.6.7v10.9c0 1.3 1 2.3 2.3 2.3h11c1.3 0 2.3-1 2.3-2.3V9.9c0-.3-.3-.7-.6-.7zm-7.2 12v-1.8c1.5 0 2.8-1.3 2.8-2.8s-1.3-2.8-2.8-2.8c-.7 0-1.4.4-1.9.9l1.1 1.1c.1.1 0 .4-.2.4H7.6c-.1 0-.2-.1-.2-.2v-3.4c0-.2.2-.3.4-.2l1 1c.8-.8 2-1.4 3.2-1.4 2.6 0 4.7 2.1 4.7 4.7s-2.2 4.5-4.7 4.5zm9-16.6h-5.8V2.8c0-1-.8-1.9-1.8-1.9h-2.8c-1 0-1.8.9-1.8 1.9v1.8H3c-.4 0-.7.3-.7.7v1.4c0 .4.3.7.7.7h18c.4 0 .7-.3.7-.7V5.3c0-.4-.3-.7-.7-.7zm-7.6 0h-2.8V3.2c0-.2.2-.4.5-.4h1.8c.3 0 .5.2.5.4v1.4z" } },
	  undeprecate: { "path": { "d": "M22.2 3.2H1.8c-.5 0-.9.4-.9 1v12c0 .5.4.9.9.9h7.5c.5 2.6 2.7 4.6 5.5 4.6s5-2 5.4-4.6h2c.5 0 .9-.4.9-.9v-12c0-.6-.4-1-.9-1zm-8.1 15.9l-2.7-2.8 1.2-1.3 1.5 1.5 3.3-3.3 1.2 1.3-4.5 4.6zm7.1-3.9h-1c-.4-2.6-2.7-4.6-5.4-4.6s-5.1 2-5.5 4.6H2.8V5.1h18.4v10.1z" } },
	  underline: { "path": { "d": "M20.5 19.4h-17c-.4 0-.7.3-.7.7v1.4c0 .3.3.7.7.7h17c.4 0 .7-.4.7-.7v-1.4c0-.4-.3-.7-.7-.7zm-8.8-1.9c-3.5-.1-6.2-3.1-6.2-6.6V4.6c0-.5.5-.9 1-.9h.9c.5 0 .9.4.9.9v6.3c0 2 1.5 3.7 3.5 3.9 2.1.1 3.9-1.6 3.9-3.7V4.6c0-.5.4-.9.9-.9h.9c.5 0 1 .4 1 .9v6.5c0 3.7-3.1 6.6-6.8 6.4z" } },
	  undo: { "path": { "d": "M2.5 1.8h1.4c.4 0 .7.4.7.7v3.3c0 .4.2.6.6.3.1-.2.2-.3.4-.5 2.3-2.3 5.6-3.2 8.9-2.6 1.1.2 2.3.7 3.2 1.3 2.8 1.9 4.5 4.9 4.5 8.1 0 2.5-.9 5-2.7 6.8-1.6 1.8-3.9 2.8-6.2 3-.5 0-.8-.4-.8-.8V20c0-.3.2-.6.6-.7 2.2-.1 4.2-1.3 5.4-3.3.3-.6.6-1.2.7-1.8.7-3-.5-6.1-3.2-7.7-.5-.3-1.1-.6-1.7-.7-2.5-.6-5 .1-6.7 1.8-.2.2-.4.4-.5.6-.2.4.1.6.6.6h3.2c.4 0 .6.3.6.7v1.4c0 .4-.2.6-.6.6H2.4c-.3 0-.6-.2-.6-.6V2.5c0-.3.4-.7.7-.7z" } },
	  unlock: { "path": { "d": "M4.6 8.4v.1-.1zm14.8 2.2h-12V8.4c0-2.4 1.8-4.6 4.3-4.7 2.2-.1 4.1 1.3 4.7 3.3.1.2.3.4.5.4h1.9c.3 0 .5-.3.4-.6-.7-3.5-3.8-6.1-7.6-5.9-3.9.2-6.9 3.6-7 7.5v2.2c-1 0-1.8.8-1.8 1.9v8.7c0 1 .8 1.9 1.8 1.9h14.8c1 0 1.8-.9 1.8-1.9v-8.7c0-1.1-.8-1.9-1.8-1.9zm-5.3 9.1c.1.3-.1.6-.4.6h-3.4c-.3 0-.6-.3-.5-.6l.9-2.8c-.7-.4-1.1-1.3-1-2.2.2-.9.9-1.5 1.8-1.7 1.5-.3 2.8.8 2.8 2.1 0 .8-.4 1.5-1 1.8l.8 2.8z" } },
	  unmuted: { "path": { "d": "M19.2 8.3c-.7 0-1.2.5-1.2 1.1v1.9c0 3.2-2.7 5.9-6 5.9s-6.1-2.7-6.1-5.9V9.4c0-.6-.5-1.1-1.1-1.1s-1.1.5-1.1 1.1v1.9c0 4.1 3.1 7.4 7.1 8v1.6H9c-.7 0-1.2.4-1.2 1.1s.5 1.1 1.2 1.1h6c.6 0 1.2-.5 1.2-1.1s-.6-1.1-1.2-1.1h-1.9v-1.6c4.1-.6 7.2-3.9 7.2-8V9.4c0-.6-.5-1.1-1.1-1.1zM12 15c2 0 3.7-1.7 3.7-3.7V4.6c0-2.1-1.6-3.7-3.7-3.7S8.3 2.5 8.3 4.6v6.7c0 2 1.7 3.7 3.7 3.7z" } },
	  up: { "path": { "d": "M20.2 17.5H3.8c-.4 0-.8-.6-.4-1l8-9.8c.3-.3.9-.3 1.2 0l8 9.8c.4.4.1 1-.4 1z" } },
	  upload: { "path": { "d": "M22.4 14.3H21c-.4 0-.7.4-.7.7v4.6c0 .4-.3.7-.7.7H4.4c-.4 0-.7-.3-.7-.7V15c0-.3-.3-.7-.7-.7H1.6c-.4 0-.7.4-.7.7v6.2c0 1 .9 1.9 1.9 1.9h18.4c1 0 1.9-.9 1.9-1.9V15c0-.3-.3-.7-.7-.7zM12.5 1.1c-.3-.3-.7-.3-1 0L5.3 7.3c-.3.3-.3.7 0 1l.9 1c.3.3.7.3 1 0l2.6-2.6c.3-.3.8-.1.8.3v9.8c0 .4.3.7.7.7h1.3c.4 0 .8-.4.8-.7V7.1c0-.5.4-.6.8-.4l2.6 2.6c.2.3.6.3.9 0l1-.9c.3-.3.3-.7 0-1l-6.2-6.3z" } },
	  user: { "path": { "d": "M23.1 19.8v1.1c0 1.2-1 2.2-2.2 2.2H3.1c-1.2 0-2.2-1-2.2-2.2v-1.1c0-2.6 3.2-4.3 6.1-5.6l.3-.1c.2-.1.5-.1.7 0 1.2.8 2.5 1.2 4 1.2s2.8-.4 3.9-1.2c.3-.1.5-.1.7 0l.3.1c3 1.3 6.2 2.9 6.2 5.6zM12 .9c3 0 5.5 2.7 5.5 6.1S15 13.1 12 13.1 6.5 10.4 6.5 7 9 .9 12 .9z" } },
	  volume_high: { "path": { "d": "M11.4 1.2L5.5 8.3H2.8c-1 0-1.9.8-1.9 1.9v3.6c0 1.1.9 1.9 1.9 1.9h2.7l5.9 7.1c.6.6 1.5.2 1.5-.6V1.8c0-.8-1-1.2-1.5-.6zM19.7 4c-.2-.2-.5-.2-.7 0l-.6.7c-.2.1-.2.5 0 .6 1.7 1.7 2.8 4.1 2.8 6.7 0 2.6-1.1 5-2.8 6.7-.2.2-.2.5 0 .6l.6.7c.2.2.5.2.7 0 2-2 3.4-4.9 3.4-8 0-3.1-1.3-6-3.4-8zm-2.9 3c-.2-.2-.5-.2-.7 0l-.6.6c-.2.2-.2.5 0 .7 1 .9 1.6 2.2 1.6 3.7s-.7 2.8-1.7 3.7c-.2.2-.2.5 0 .7l.7.6c.1.2.4.2.6 0 1.3-1.2 2.2-3 2.2-5s-.8-3.8-2.1-5z" } },
	  volume_low: { "path": { "d": "M11.4 1.2L5.5 8.3H2.8c-1 0-1.9.8-1.9 1.9v3.6c0 1.1.9 1.9 1.9 1.9h2.7l5.9 7.1c.6.6 1.5.2 1.5-.6V1.8c0-.8-1-1.2-1.5-.6zM16.8 7c-.2-.2-.5-.2-.7 0l-.6.6c-.2.2-.2.5 0 .7 1 .9 1.6 2.2 1.6 3.7s-.7 2.8-1.7 3.7c-.2.2-.2.5 0 .7l.7.6c.1.2.4.2.6 0 1.3-1.2 2.2-3 2.2-5s-.8-3.8-2.1-5z" } },
	  volume_off: { "path": { "d": "M11.4 1.2L5.5 8.3H2.8c-1 0-1.9.8-1.9 1.9v3.6c0 1.1.9 1.9 1.9 1.9h2.7l5.9 7.1c.6.6 1.5.2 1.5-.6V1.8c0-.8-1-1.2-1.5-.6zM20.7 12l2.2-2.3c.2-.1.2-.4 0-.6l-.6-.7c-.2-.1-.5-.1-.7 0l-2.2 2.3-2.3-2.3c-.2-.1-.4-.1-.6 0l-.7.7c-.2.2-.2.5 0 .6l2.3 2.3-2.3 2.3c-.2.1-.2.4 0 .6l.7.7c.2.1.4.1.6 0l2.3-2.3 2.2 2.3c.2.1.5.1.7 0l.6-.7c.2-.2.2-.5 0-.6L20.7 12z" } },
	  warning: { "path": { "d": "M23.7 19.6L13.2 2.5c-.6-.9-1.8-.9-2.4 0L.3 19.6c-.7 1.1 0 2.6 1.1 2.6h21.2c1.1 0 1.8-1.5 1.1-2.6zM12 18.5c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4zm1.4-4.2c0 .3-.2.5-.5.5h-1.8c-.3 0-.5-.2-.5-.5v-6c0-.3.2-.5.5-.5h1.8c.3 0 .5.2.5.5v6z" } },
	  weeklyview: { "path": { "d": "M20.3 3.2H18v-.9c0-.7-.6-1.4-1.4-1.4-.7 0-1.4.6-1.4 1.4v.9H8.8v-.9c0-.7-.6-1.4-1.4-1.4C6.6.9 6 1.5 6 2.3v.9H3.7c-1 0-1.9.9-1.9 1.9v1.1c0 .4.4.7.7.7h19c.3 0 .7-.3.7-.7V5.1c0-1-.9-1.9-1.9-1.9zm1.2 6h-19c-.3 0-.7.4-.7.7v11.3c0 1 .9 1.9 1.9 1.9h16.6c1 0 1.9-.9 1.9-1.9V9.9c0-.3-.4-.7-.7-.7zm-6.4 4.4l-2.9 6.2c-.1.3-.4.5-.8.5-.5 0-.9-.4-.9-.8 0-.1.1-.3.1-.4l2.5-5.3H9.6c-.5 0-.8-.2-.8-.6 0-.4.3-.7.8-.7h4.8c.4 0 .8.3.8.8 0 .1 0 .2-.1.3z" } },
	  world: { "path": { "d": "M12 .9C5.9.9.9 5.9.9 12s5 11.1 11.1 11.1 11.1-5 11.1-11.1S18.1.9 12 .9zm0 2.3zm.9.1h-.1.1zM12 20.8c-4.8 0-8.8-4-8.8-8.8 0-.5.1-1 .2-1.4.6.1 1.3.3 1.7.7.8.8 1.6 1.8 2.5 2 0 0-.1 0-.2.2-.1.1-.2.4-.2.9 0 2.1 2 .8 2 3s2.5 3 2.5 1.3 1.6-2.6 1.6-3.9-1.3-1.3-2-1.8c-.9-.4-1.3-1.1-2.9-.9-.8-.7-1.2-1.4-.9-2.1.4-.8 2.1-1 2.1-2.2S8.5 6.4 7.7 6.4c-.4 0-1.2-.3-1.8-.6.7-.8 1.7-1.4 2.7-1.9.8.3 2 .9 3.1.9 1.2 0 1.9-.9 1.7-1.5 2.1.3 3.9 1.4 5.2 2.9-.6.4-1.6.9-3.2.9-2.1 0-2.1 2.1-.9 2.5 1.3.5 2.6-.8 3 0 .5.9-3 .9-2.1 3 .9 2.1 1.7 0 2.6 2.1.9 2.1 2.6-.3 1.3-2-.6-.7-.4-3 .9-3h.4c.2.7.3 1.5.3 2.3-.1 4.8-4.1 8.8-8.9 8.8z" } },
	  zoomin: { "path": { "d": "M14.3 8.8h-2.8V6c0-.3-.1-.5-.4-.5H9.2c-.2 0-.4.2-.4.5v2.8H6c-.3 0-.5.2-.5.4v1.9c0 .3.2.4.5.4h2.8v2.8c0 .3.2.5.4.5h1.9c.3 0 .4-.2.4-.5v-2.8h2.8c.3 0 .5-.1.5-.4V9.2c0-.2-.2-.4-.5-.4zm8.6 12.1l-5.3-5.3c1.1-1.5 1.8-3.4 1.8-5.4 0-5.1-4.2-9.3-9.2-9.3S.9 5.1.9 10.2s4.2 9.2 9.3 9.2c2 0 3.9-.7 5.4-1.8l5.3 5.3c.3.3.7.3 1 0l.9-1c.3-.3.3-.7.1-1zm-12.7-4.3c-3.6 0-6.5-2.9-6.5-6.4s2.9-6.5 6.5-6.5 6.4 2.9 6.4 6.5-2.9 6.4-6.4 6.4z" } },
	  zoomout: { "path": [{ "d": "M8.8 11.5h5.5c.3 0 .5-.1.5-.4V9.2c0-.2-.2-.4-.5-.4H8.8m0 0H6c-.3 0-.5.2-.5.4v1.9c0 .3.2.4.5.4h2.8" }, { "d": "M22.9 20.9l-5.3-5.3c1.1-1.5 1.8-3.4 1.8-5.4 0-5.1-4.2-9.3-9.2-9.3S.9 5.1.9 10.2s4.2 9.2 9.3 9.2c2 0 3.9-.7 5.4-1.8l5.3 5.3c.3.3.7.3 1 0l.9-1c.3-.3.3-.7.1-1zm-12.7-4.3c-3.6 0-6.5-2.9-6.5-6.4s2.9-6.5 6.5-6.5 6.4 2.9 6.4 6.5-2.9 6.4-6.4 6.4z" }] }
	};
	module.exports.viewBox = '0 0 24 24';

/***/ },
/* 39 */
/***/ function(module, exports) {

	/*  Copyright (c) 2015, salesforce.com, inc. All rights reserved.    Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:  Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.  Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.  Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.  */
	"use strict";
	
	module.exports = {
	  add_contact: { "path": { "d": "M21.2 4.2H2.8C1.5 4.2.5 5.2.5 6.5v11c0 1.3 1 2.3 2.3 2.3h18.4c1.3 0 2.3-1 2.3-2.3v-11c0-1.3-1-2.3-2.3-2.3zm-9.8 13H4.8c-.7 0-1.3-.8-1.3-1.6.1-1.2 1.3-1.8 2.5-2.4.9-.4 1-.7 1-1.1 0-.4-.2-.7-.5-1-.5-.5-.8-1.2-.8-1.9 0-1.5.9-2.7 2.4-2.7s2.4 1.3 2.4 2.7c0 .8-.3 1.5-.8 1.9-.3.3-.6.6-.6 1s.1.7 1.1 1.1c1.2.5 2.4 1.2 2.4 2.4.2.8-.4 1.6-1.2 1.6zm9-2.7c0 .4-.3.8-.7.8h-3.5c-.4 0-.8-.3-.8-.8v-1.2c0-.4.4-.7.8-.7h3.5c.4 0 .7.3.7.7v1.2zm0-4.2c0 .4-.3.8-.7.8h-5.8c-.4 0-.7-.3-.7-.8V9.1c0-.4.3-.7.7-.7h5.8c.4 0 .8.3.8.7v1.2z" } },
	  announcement: { "path": { "d": "M10.5 21l-.6-.5c-.7-.5-.7-1.4-.7-1.9v-1.3c0-.4-.3-.7-.7-.7H5.8c-.4 0-.7.3-.7.7v3.6c0 1.2.7 2.2 1.9 2.2h2.2c1.4 0 1.5-.9 1.5-.9s.2-.9-.2-1.2zM20.8 8.3V2c0-1.1-1.4-1.4-2.2-.7l-4.1 3.9c-.6.5-1.4.8-2.3.8h-7C2.8 6 .9 8.1.9 10.5v.1c0 2.4 1.9 4.2 4.3 4.2h7c.9 0 1.7.3 2.4.9l4 4c.8.7 2.2.4 2.2-.7v-6.3c1.4 0 2.2-.9 2.2-2.2 0-1.2-.8-2.2-2.2-2.2z" } },
	  apex: { "path": { "d": "M22.4 18.5H9.9c-.3 0-.7.3-.7.7v1.3c0 .4.4.7.7.7h12.5c.4 0 .7-.3.7-.7v-1.3c0-.4-.3-.7-.7-.7zm-10.7-8.4L2.8 2.9c-.3-.2-.7-.2-1 .1l-.7 1.2c-.3.3-.2.7.1.9l6.4 5.1c.2.2.2.6 0 .7L1.2 16c-.3.2-.4.7-.1 1l.7 1.2c.3.3.7.4 1 .1l8.9-7.1c.4-.3.4-.9 0-1.1z" } },
	  approval: { "path": { "d": "M8.8 20.1l-7.6-7.6c-.3-.3-.3-.8 0-1.1l1-1c.2-.2.7-.2 1 0l5.7 5.8c.2.2.5.2.7 0L20.8 4.9c.3-.3.8-.3 1 0l1 1c.3.3.3.7 0 1l-13 13.2c-.3.3-.8.3-1 0z" } },
	  back: { "path": { "d": "M22.4 10.2H7.1c-.5 0-.6-.6-.4-.8l4.5-4.5c.2-.2.2-.7 0-.9l-1-1c-.3-.3-.7-.3-1 0l-8.1 8c-.3.3-.3.7 0 1l8.1 8.1c.3.3.7.3 1 0l.9-1c.3-.3.3-.7 0-1l-4.4-4.4c-.3-.3-.1-.8.3-.8h15.3c.4 0 .7-.3.7-.7v-1.4c.1-.3-.2-.6-.6-.6z" } },
	  call: { "path": { "d": "M22.4 17.4l-2.8-2.2c-.7-.5-1.6-.6-2.2-.1L15 16.9c-.3.2-.7.2-1-.1l-3.6-3.2L7.2 10c-.3-.3-.3-.7-.1-1l1.7-2.4c.5-.6.5-1.6 0-2.2L6.5 1.6c-.7-.9-1.9-1-2.7-.2L1.5 3.8c-.4.4-.6 1-.6 1.5.3 4.7 2.4 9.1 5.5 12.3 3.2 3.1 7.6 5.2 12.3 5.5.5 0 1.1-.2 1.4-.6l2.4-2.4c.8-.7.8-2-.1-2.7z" } },
	  canvas: { "path": { "d": "M20.8 17.7c-.1 1.3-.3 2.6-.5 3.9 0 .4-.5.8-.8.8-2.5.3-5 .5-7.5.5-2.4 0-4.9-.1-7.3-.5-.4 0-.8-.4-.9-.8-.3-2-.5-4.1-.5-6.2s.2-4.1.5-6.2c.1-.3.5-.7.9-.8 1.5-.2 3-.3 4.4-.4 0 0 1.2 0 1.1-1.2 0-1-1.8-1.7-1.8-3.4C8.4 2 9.8.9 12 .9c2.3 0 3.6 1.1 3.6 2.5 0 1.8-1.7 2.4-1.8 3.4C13.8 7.9 15 8 15 8c1.5.1 3 .2 4.5.4.3 0 .8.4.8.8.2 1.5.4 2.8.5 4.2 0 .4-.4.9-.8.9h-.4c-.4 0-1-.4-1.3-.7 0 0-1-1-2.1-1-1.7-.1-3 1.4-3 3s1.3 3.1 3 3.1c1-.1 2-1.1 2-1.1.4-.2 1-.5 1.4-.5h.4c.5 0 .8.3.8.6z" } },
	  change_owner: { "path": { "d": "M12.6 17.4c-1.4-.6-1.6-1.1-1.6-1.7 0-.5.4-1 .8-1.4.8-.7 1.2-1.8 1.2-3 0-2.2-1.3-3.9-3.8-3.9s-3.8 1.7-3.8 3.9c0 1.2.3 2.3 1.2 3 .4.4.8.9.8 1.4 0 .6-.2 1.1-1.6 1.7-2.1.8-4 1.7-4 3.5 0 1.2 1 2.2 2.1 2.2h10.6c1.2 0 2.1-1 2.1-2.2 0-1.7-2-2.7-4-3.5zm7.9-8.6c0-3.4-2.8-6.3-6.2-6.3V.9l-3.1 2.6c-.2.1-.1.3 0 .5l3.1 2.5V4.8c2.2 0 3.9 1.8 3.9 4h-1.6l2.6 3.1c.1.1.3.1.5 0l2.5-3.1h-1.7z" } },
	  change_record_type: { "path": { "d": "M9.2 17.3c0-.4-.3-.7-.7-.7H1.6c-.4 0-.7.3-.7.7v5.1c0 .4.3.7.7.7h6.9c.4 0 .7-.3.7-.7v-5.1zm-5.5-7.1H1.5c-.5 0-.7.4-.4.6l3.7 3.8c.1.2.4.2.6 0l3.7-3.8c.3-.3 0-.6-.4-.6H6.5c0-2.4 2.3-4.7 4.6-4.7V2.8c-4.2 0-7.4 3.2-7.4 7.4zm15.6-.8c-.2-.2-.5-.2-.7 0L15 13.2c-.3.3-.1.6.4.6h2.2c0 2.8-1.9 4.7-4.7 4.7v2.7c4.2 0 7.5-3.2 7.5-7.4h2.2c.5 0 .7-.4.4-.6l-3.7-3.8zm3.8-7.8c0-.4-.3-.7-.7-.7h-6.9c-.4 0-.7.3-.7.7v5.1c0 .4.3.7.7.7h6.9c.4 0 .7-.3.7-.7V1.6z" } },
	  check: { "path": { "d": "M8.8 19.6L1.2 12c-.3-.3-.3-.8 0-1.1l1-1c.3-.3.8-.3 1 0L9 15.7c.1.2.5.2.6 0L20.9 4.4c.2-.3.7-.3 1 0l1 1c.3.3.3.7 0 1L9.8 19.6c-.2.3-.7.3-1 0z" } },
	  clone: { "path": { "d": "M21.2.9H8.3c-1 0-1.8.9-1.8 1.9v1.1c0 .4.3.7.7.7h8.5c2 0 3.7 1.7 3.7 3.7v8.5c0 .4.3.7.7.7h1.1c1 0 1.9-.8 1.9-1.8V2.8c0-1-.9-1.9-1.9-1.9zm-5.5 5.6H2.8c-1 0-1.9.8-1.9 1.8v12.9c0 1 .9 1.9 1.9 1.9h12.9c1 0 1.8-.9 1.8-1.9V8.3c0-1-.8-1.8-1.8-1.8zm-1.9 12.4c0 .3-.1.5-.4.5H5.1c-.3 0-.5-.2-.5-.5V18c0-.3.2-.5.5-.5h8.3c.3 0 .4.2.4.5v.9zm0-3.7c0 .3-.1.5-.4.5H5.1c-.3 0-.5-.2-.5-.5v-.9c0-.3.2-.5.5-.5h8.3c.3 0 .4.2.4.5v.9zm0-3.7c0 .3-.1.5-.4.5H5.1c-.3 0-.5-.2-.5-.5v-.9c0-.3.2-.4.5-.4h8.3c.3 0 .4.1.4.4v.9z" } },
	  close: { "path": { "d": "M14.6 11.9l6-6c.3-.3.3-.7 0-1l-.9-1c-.3-.3-.7-.3-1 0L12.6 10c-.1.2-.4.2-.6 0L6 3.9c-.3-.3-.7-.3-1 0l-1 .9c-.3.3-.3.7 0 1l6.1 6.1c.1.1.1.4 0 .6L4 18.6c-.3.3-.3.7 0 1l.9.9c.3.3.7.3 1 0l6.1-6c.2-.2.5-.2.6 0l6.1 6c.3.3.7.3 1 0l.9-.9c.3-.3.3-.7 0-1l-6-6c-.2-.2-.2-.5 0-.7z" } },
	  defer: { "path": { "d": "M12 .9C5.9.9.9 5.9.9 12s5 11.1 11.1 11.1 11.1-5 11.1-11.1S18.1.9 12 .9zm0 19.4c-4.6 0-8.3-3.7-8.3-8.3S7.4 3.7 12 3.7s8.3 3.7 8.3 8.3-3.7 8.3-8.3 8.3zm1.6-8.2c-.2-.1-.2-.3-.2-.5V7.2c0-.4-.3-.7-.7-.7h-1.4c-.4 0-.7.3-.7.7v5.5c0 .2.1.4.2.5l3.4 3.5c.3.2.7.2 1 0l1-1c.2-.3.2-.7 0-1l-2.6-2.6z" } },
	  "delete": { "path": { "d": "M21 4.6h-5.8V2.8c0-1-.8-1.9-1.8-1.9h-2.8c-1 0-1.8.9-1.8 1.9v1.8H3c-.4 0-.7.3-.7.7v1.4c0 .4.3.7.7.7h18c.4 0 .7-.3.7-.7V5.3c0-.4-.3-.7-.7-.7zM10.6 3.2c0-.2.2-.4.5-.4h1.8c.3 0 .5.2.5.4v1.4h-2.8V3.2zm8.6 6H4.8c-.3 0-.6.4-.6.7v10.9c0 1.3 1 2.3 2.3 2.3h11c1.3 0 2.3-1 2.3-2.3V9.9c0-.3-.3-.7-.6-.7zm-8.6 10.2c0 .3-.2.4-.4.4h-1c-.2 0-.4-.1-.4-.4v-6.5c0-.3.2-.4.4-.4h1c.2 0 .4.1.4.4v6.5zm4.6 0c0 .3-.2.4-.4.4h-1c-.2 0-.4-.1-.4-.4v-6.5c0-.3.2-.4.4-.4h1c.2 0 .4.1.4.4v6.5z" } },
	  description: { "path": { "d": "M20.3 1.8H3.7c-1 0-1.9.9-1.9 1.9v16.6c0 1 .9 1.9 1.9 1.9h16.6c1 0 1.9-.9 1.9-1.9V3.7c0-1-.9-1.9-1.9-1.9zM5.5 6.5c0-.3.2-.5.5-.5h4.6c.3 0 .5.2.5.5v4.6c0 .3-.2.4-.5.4H6c-.3 0-.5-.1-.5-.4V6.5zm11.1 12c0 .2-.2.4-.4.4H6c-.3 0-.5-.2-.5-.4v-1c0-.2.2-.4.5-.4h10.2c.2 0 .4.2.4.4v1zm1.9-3.7c0 .2-.2.4-.5.4H6c-.3 0-.5-.2-.5-.4v-1c0-.2.2-.4.5-.4h12c.3 0 .5.2.5.4v1zm0-3.7c0 .3-.2.4-.5.4h-4.6c-.3 0-.5-.1-.5-.4v-.9c0-.3.2-.5.5-.5H18c.3 0 .5.2.5.5v.9zm0-3.7c0 .3-.2.4-.5.4h-4.6c-.3 0-.5-.1-.5-.4v-.9c0-.3.2-.5.5-.5H18c.3 0 .5.2.5.5v.9z" } },
	  dial_in: { "g": { "circle": [{ "cx": "4.615", "cy": "4.615", "r": "2.769" }, { "cx": "4.615", "cy": "12", "r": "2.769" }, { "cx": "12", "cy": "4.615", "r": "2.769" }, { "cx": "19.385", "cy": "4.615", "r": "2.769" }, { "cx": "12", "cy": "12", "r": "2.769" }, { "cx": "19.385", "cy": "12", "r": "2.769" }, { "cx": "4.615", "cy": "19.385", "r": "2.769" }, { "cx": "12", "cy": "19.385", "r": "2.769" }, { "cx": "19.385", "cy": "19.385", "r": "2.769" }] } },
	  download: { "path": { "d": "M22.4 14.3H21c-.4 0-.7.3-.7.7v4.6c0 .4-.3.7-.7.7H4.4c-.4 0-.7-.3-.7-.7V15c0-.4-.3-.7-.7-.7H1.6c-.4 0-.7.3-.7.7v6.2c0 1 .9 1.9 1.9 1.9h18.4c1 0 1.9-.9 1.9-1.9V15c0-.4-.3-.7-.7-.7zm-10.9 3.1c.3.2.7.2 1 0l6.2-6.3c.3-.3.3-.7 0-.9l-.9-1c-.3-.3-.7-.3-1 0l-2.6 2.6c-.3.2-.8.1-.8-.4V1.6c0-.4-.4-.7-.7-.7h-1.4c-.4 0-.7.3-.7.7v9.8c0 .4-.5.6-.8.3L7.2 9.1c-.2-.2-.6-.2-.9 0l-1 1.1c-.3.2-.3.6 0 .9l6.2 6.3z" } },
	  edit: { "path": { "d": "M22.5 3.4l-1.9-1.9c-.8-.8-1.9-.8-2.6 0L16.5 3c-.2.2-.2.5 0 .6l3.9 4c.2.2.5.2.6 0L22.6 6c.7-.7.7-1.8-.1-2.6zm-7.3 1.5c-.2-.1-.5-.1-.7 0L2.5 17 1 22.2c-.2.5.3 1 .8.9l5.3-1.5H7l12.1-12c.1-.2.1-.5 0-.7l-3.9-4z" } },
	  edit_groups: { "path": { "d": "M18.2 14.5c-.1-.1-.3-.1-.4 0l-5.4 5.4-.8 2.7c-.1.3.2.5.5.5l2.7-.8 5.4-5.4c.1-.1.1-.3 0-.4l-2-2zm4.6-1.6l-1-1c-.4-.4-1-.4-1.4 0 0 0-.6.6-.9 1-.1.1-.1.3 0 .3l2 2c.1.1.2.1.3 0 .4-.3 1-.9 1-.9.4-.4.4-1 0-1.4zM12 6.3c0 1-.3 2-.8 2.8-.2.3-.1.7.2.9 1 .5 2.2 1.2 2.8 2.3.1.2.3.2.5.2H16c.8 0 1.4-.5 1.4-1.4 0-1.3-1.3-2.1-2.7-2.7-1-.4-1.1-.8-1.1-1.2 0-.4.2-.8.6-1.1.5-.5.8-1.3.8-2.1 0-1.7-1-3.1-2.7-3.1-1 0-1.8.5-2.2 1.3C11.3 3 12 4.5 12 6.3zm.7 7.7c-.1-1.5-1.5-2.1-3.1-2.8-1.1-.5-1.2-.9-1.2-1.4s.2-.9.6-1.2c.6-.6 1-1.4 1-2.4 0-1.8-1.1-3.4-3-3.4h-.2c-2 0-3 1.6-3 3.4 0 1 .3 1.8 1 2.4.3.3.6.8.6 1.2 0 .5-.2.9-1.2 1.4-1.6.7-3.1 1.4-3.1 2.8.1 1 .7 1.7 1.7 1.7h8.3c.9 0 1.6-.7 1.6-1.7z" } },
	  edit_relationship: { "path": { "d": "M19.8 19.4h-1.3v-2.8h1.3c.3 0 .5-.2.5-.4v-12c0-.3-.2-.5-.5-.5h-12c-.2 0-.4.2-.4.5v1.3H4.6V4.2C4.6 2.4 6 .9 7.8.9h12c1.8 0 3.3 1.5 3.3 3.3v12c0 1.8-1.5 3.2-3.3 3.2zm-5-12h-12c-1 0-1.9.8-1.9 1.8v12c0 1 .9 1.9 1.9 1.9h12c1 0 1.8-.9 1.8-1.9v-12c0-1-.8-1.8-1.8-1.8zm-8 11.8c-.1 0-.1 0-.2.1l-2.1.5c-.2 0-.3-.1-.3-.3l.5-2.1s.1-.1.1-.2c.1-.1.2-.1.3 0l1.7 1.7c.1.1.1.3 0 .3zm5.1-5.1l-4.3 4.3c-.1.1-.2.1-.3 0l-1.7-1.7c-.1-.1-.1-.2 0-.3l4.3-4.3c.1-.1.2-.1.3 0l1.7 1.7v.3zm1.3-1.3l-.5.4c-.1.1-.2.1-.3 0l-1.7-1.7c-.1-.1-.1-.1 0-.2l.5-.5c.3-.3.8-.3 1.1 0l.9.9c.3.3.3.8 0 1.1z" } },
	  email: { "path": { "d": "M11.5 13.9c.3.3.7.3 1 0l10.4-9.7c.2-.4.2-1-.6-1l-20.6.1c-.6 0-1.1.5-.6.9l10.4 9.7zM23.1 8c0-.5-.6-.8-.9-.4L14 15.1c-.6.5-1.3.8-2 .8s-1.4-.3-2-.8L1.9 7.6c-.4-.4-.9-.1-.9.4-.1 2.1-.1 7.7-.1 10.5 0 1 .9 1.8 1.9 1.8h18.4c1 0 1.9-.8 1.9-1.8V8z" } },
	  fallback: { "path": { "d": "M12.9 1.6l-1.4 6.8c0 .2.2.4.5.4h7.2c.5 0 .8.6.6 1l-7.9 12.9c-.3.7-1.3.4-1.3-.3l1.4-8c0-.2-.2-.1-.5-.1H3.9c-.5 0-.9-.8-.6-1.2l8.3-11.8c.4-.6 1.3-.4 1.3.3z" } },
	  filter: { "path": { "d": "M22.2 1.8H1.8c-.7 0-1.1.8-.6 1.3l9 10.5c.2.3.4.8.4 1.2v6.7c0 .3.3.7.7.7h1.4c.4 0 .7-.4.7-.7v-6.7c0-.4.1-.9.4-1.2l9-10.5c.5-.5.1-1.3-.6-1.3z" } },
	  flow: { "path": { "d": "M23 4.9c-.9-1.9-3.4-5.4-7.9-3.3-2.8 1.3-4.4 2-4.4 2L6.6 5.4c-1.1.5-3.6-.3-5-.8-.4-.1-.8.3-.6.7.9 1.9 3.4 5.4 7.9 3.3 2.8-1.3 8.5-3.7 8.5-3.7 1.1-.6 3.6.2 5 .7.4.1.8-.3.6-.7zm-9.7 5.9c-.5.3-2.5 1.2-2.5 1.2l-2.1.9c-1 .5-3.2-.2-4.5-.7-.3-.2-.6.3-.5.6.9 1.9 3 5.2 7 3.2 2.5-1.3 4.6-2.1 4.6-2.1 1-.6 3.2.2 4.5.7.3.1.6-.3.5-.7-.9-1.8-3-5.1-7-3.1zM11.8 19c-.4.2-1.1.6-1.1.6-.8.5-2.4-.1-3.4-.6-.2-.1-.5.3-.3.7.6 1.6 2.2 4.6 5.2 2.8l1.1-.7c.8-.4 2.4.2 3.4.6.2.2.5-.2.3-.6-.6-1.7-2.1-4.5-5.2-2.8z" } },
	  follow: { "path": { "d": "M23.3 17.5h-2.1v-2c0-.4-.3-.7-.7-.7h-1.3c-.4 0-.7.3-.7.7v2h-2.1c-.4 0-.7.4-.7.7v1.4c0 .4.3.7.7.7h2.1v2.1c0 .4.3.7.7.7h1.3c.4 0 .7-.3.7-.7v-2.1h2.1c.4 0 .7-.3.7-.7v-1.4c0-.3-.3-.7-.7-.7zm-7.6-1.8h.5c.2 0 .4-.2.4-.5v-.4c0-1 .8-1.9 1.9-1.9h2c.4 0 .7-.3.7-.7V2.8c0-1-.8-1.9-1.8-1.9H2.8C1.8.9.9 1.8.9 2.8v16.6c0 1 .9 1.8 1.9 1.8h10.4c.4 0 .7-.3.6-.7v-3c0-1 .9-1.8 1.9-1.8zM12 5.1c0-.3.2-.5.5-.5h4.6c.3 0 .4.2.4.5V6c0 .3-.1.5-.4.5h-4.6c-.3 0-.5-.2-.5-.5v-.9zm0 3.7c0-.3.2-.5.5-.5h4.6c.3 0 .4.2.4.5v.9c0 .3-.1.5-.4.5h-4.6c-.3 0-.5-.2-.5-.5v-.9zM4.6 5.1c0-.3.2-.5.5-.5h4.6c.3 0 .5.2.5.5v4.6c0 .3-.2.5-.5.5H5.1c-.3 0-.5-.2-.5-.5V5.1zm7.4 12c0 .3-.2.4-.5.4H5.1c-.3 0-.5-.1-.5-.4v-.9c0-.3.2-.5.5-.5h6.4c.3 0 .5.2.5.5v.9zm-6.9-3.3c-.3 0-.5-.1-.5-.4v-.9c0-.3.2-.5.5-.5h9.2c.3 0 .5.2.5.5v.9c0 .3-.2.4-.5.4H5.1z" } },
	  following: { "path": { "d": "M22.8 15.5l-1-1c-.2-.3-.7-.3-1 0l-4.3 4.4c-.2.2-.5.2-.7 0l-2-2.1c-.3-.2-.8-.2-1.1 0l-1 1.1c-.3.2-.3.7 0 1l3.9 3.9c.3.3.7.3 1 0l6.2-6.3c.3-.2.3-.7 0-1zm-11.4.1c.5-.5 1-.7 1.7-.8.7-.1 1.5.2 2 .7l1.1 1.1 3.3-3.4c.3-.4.8-.6 1.3-.7.2-.1.4-.3.4-.5V2.8c0-1-.8-1.9-1.9-1.9H2.8C1.8.9.9 1.8.9 2.8v16.6c0 1 .9 1.8 1.9 1.8h7.5c.5 0 .6-.5.4-.8l-.3-.2c-.9-1-.9-2.6 0-3.6l1-1zM12 5.1c0-.3.2-.5.5-.5h4.6c.3 0 .4.2.4.5V6c0 .3-.1.5-.4.5h-4.6c-.3 0-.5-.2-.5-.5v-.9zm0 3.7c0-.3.2-.5.5-.5h4.6c.3 0 .4.2.4.5v.9c0 .3-.1.5-.4.5h-4.6c-.3 0-.5-.2-.5-.5v-.9zM4.6 5.1c0-.3.2-.5.5-.5h4.6c.3 0 .5.2.5.5v4.6c0 .3-.2.5-.5.5H5.1c-.3 0-.5-.2-.5-.5V5.1zm3.7 12c0 .3-.2.4-.4.4H5.1c-.3 0-.4-.1-.4-.4v-.9c0-.3.1-.5.4-.5h2.8c.2 0 .4.2.4.5v.9zm-3.2-3.3c-.3 0-.5-.1-.5-.4v-.9c0-.3.2-.5.5-.5h9.2c.3 0 .5.2.5.5v.9c0 .3-.2.4-.5.4H5.1z" } },
	  freeze_user: { "path": { "d": "M22.4 10.6h-3.3l2-2c.2-.2.2-.6 0-.8l-.8-.7c-.2-.3-.5-.3-.7 0L16 10.6h-2.6V8l3.5-3.6c.3-.2.3-.5 0-.7l-.7-.8c-.3-.2-.6-.2-.8 0l-2 2V1.6c0-.4-.3-.7-.7-.7h-1.4c-.4 0-.7.3-.7.7v3.3l-2-2c-.2-.2-.6-.2-.8 0l-.7.8c-.3.2-.3.5 0 .7L10.6 8v2.6H8L4.4 7.1c-.2-.3-.5-.3-.7 0l-.8.7c-.2.3-.2.6 0 .8l2 2H1.6c-.4 0-.7.3-.7.7v1.4c0 .4.3.7.7.7h3.3l-2 2c-.2.2-.2.6 0 .8l.7.7c.3.2.6.2.8 0l3.5-3.6h2.7v2.6l-3.5 3.6c-.3.2-.3.5 0 .7l.7.8c.2.2.6.2.8 0l2-2.1v3.3c0 .4.3.8.7.8h1.3c.4 0 .8-.4.8-.8v-3.3l2 2.1c.2.2.6.2.8 0l.7-.8c.2-.2.2-.5 0-.7L13.4 16v-2.6H16l3.6 3.5c.2.3.5.3.7 0l.7-.7c.3-.2.3-.6 0-.7l-1.9-2.1h3.3c.4 0 .7-.3.7-.7v-1.4c0-.4-.3-.7-.7-.7z" } },
	  goal: { "path": { "d": "M2.3.9C1.5.9.9 1.5.9 2.3v19.4c0 .7.6 1.4 1.4 1.4.7 0 1.4-.6 1.4-1.4V2.3c0-.8-.6-1.4-1.4-1.4zM22.5 3c-6 3.1-10.7-2.3-16.4-.2-.3.1-.6.4-.6.7v10.3c0 .6.6.9 1.1.8 5.4-1.6 10.2 3.5 16.1.3.2-.2.4-.4.4-.7V3.3c0-.3-.3-.4-.6-.3zm-1.3 10.5l-.2.1c-.5.2-1.2.2-2.4.2h-.1v-2.3c-.7 0-2-.1-2.8-.3v2.5c-.8-.2-1.5-.3-2.1-.5-.3 0-.5-.1-.7-.1v-2.6c-.8-.2-2-.4-2.7-.6v2.6c-.6-.1-.7-.1-1.3-.1h-.8l-.7.1V9.8c.4-.1 1-.1 1.6-.1.6 0 .6 0 1.2.1V7.1c-.6-.1-2.4-.1-2.8 0V4.2h.4c.5 0 1.8 0 2.4.2v2.7c.6.1 1.7.3 2.5.6h.2V5c.9.3 1.8.5 2.8.7v2.6c.8.1 2 .2 2.8.2V6h.1c.7 0 1.2-.2 2.1-.3l.6-.2v2.8c-.9.2-1.7.3-2.6.3h-.2v2.9h.1c.9 0 1.8-.3 2.7-.7v2.7zm-8.3-5.8v2.8c.2 0 .4.1.6.2.7.1 1.4.4 2.2.5V8.4c-1-.2-1.9-.5-2.8-.7z" } },
	  google_news: { "path": { "d": "M23.2 2.4l-1.6 1.7c-.2.2-.5.2-.7 0L18.8 2c-.2-.2-.5-.2-.7 0l-1.6 1.6c-.2.2-.5.2-.7 0L14.2 2c-.2-.2-.5-.2-.7 0l-1.6 1.6c-.2.2-.5.2-.7 0L9.6 2c-.2-.2-.5-.2-.7 0L7.2 3.6c-.1.2-.4.2-.6 0L4.9 2c-.1-.2-.4-.2-.6 0L2.6 3.6c-.2.2-.4.2-.6 0L.8 2.4c-.3-.2-.8 0-.8.4v17.5c0 1 .8 1.9 1.8 1.9h20.4c1 0 1.8-.9 1.8-1.9V2.8c0-.4-.5-.6-.8-.4zM9.7 18.9c0 .3-.2.5-.5.5H3.7c-.3 0-.5-.2-.5-.5v-8.3c0-.3.2-.4.5-.4h5.5c.3 0 .5.1.5.4v8.3zm11.1 0c0 .3-.2.5-.5.5H12c-.3 0-.5-.2-.5-.5V18c0-.3.2-.5.5-.5h8.3c.3 0 .5.2.5.5v.9zm0-3.2h-9.3v-1.9h9.3v1.9zm0-4.2c0 .3-.2.5-.5.5H12c-.3 0-.5-.2-.5-.5v-.9c0-.3.2-.4.5-.4h8.3c.3 0 .5.1.5.4v.9zm0-3.7c0 .3-.2.5-.5.5H3.7c-.3 0-.5-.2-.5-.5v-.9c0-.3.2-.4.5-.4h16.6c.3 0 .5.1.5.4v.9z" } },
	  join_group: { "path": { "d": "M16.6 11c0-1.3-1.3-2-2.6-2.6-.9-.5-1.1-.8-1.1-1.2 0-.5.3-.8.5-1.2.6-.5.9-1.2.9-2.1 0-1.6-.9-3-2.6-3-1 0-1.7.5-2.2 1.3 1.2.8 1.9 2.4 1.9 4.1 0 1-.3 2-.8 2.8-.2.3-.1.7.2.9 1 .5 2.1 1.2 2.7 2.3.1.2.3.2.5.2h1.3c.8 0 1.3-.6 1.3-1.5zm-7.5.1c-1.1-.4-1.2-.9-1.2-1.3s.3-.9.6-1.3c.6-.6 1-1.4 1-2.4 0-1.8-1.1-3.3-2.9-3.3h-.2c-1.8 0-2.9 1.5-2.9 3.3 0 1 .3 1.8.9 2.4.4.4.7.8.7 1.3 0 .4-.2.9-1.2 1.3-1.5.7-3 1.4-3 2.8 0 1.1.7 1.8 1.6 1.8h8c.9 0 1.6-.7 1.6-1.7-.1-1.5-1.5-2.2-3-2.9zm13.3 4.6h-2.1v-2.1c0-.4-.3-.7-.7-.7h-1.4c-.3 0-.7.3-.7.7v2.1h-2c-.4 0-.7.3-.7.7v1.4c0 .3.3.7.7.7h2v2c0 .4.4.7.7.7h1.4c.4 0 .7-.3.7-.7v-2h2.1c.4 0 .7-.4.7-.7v-1.4c0-.4-.3-.7-.7-.7z" } },
	  lead_convert: { "path": { "d": "M12.7 13.1c-.2.2-.2.7 0 .9l1 1c.3.3.7.3 1 0l6.2-6.2c.3-.3.3-.7 0-1l-6.2-6.2c-.3-.3-.7-.3-.9 0l-1 .9c-.3.3-.3.7 0 1l2.6 2.6c.8.8-.4.8-.4.8h-3.7c-4.4 0-8.2 3.6-8.1 8 .1 4.3 3.6 7.7 7.9 7.7h1.6c.4 0 .7-.3.7-.7v-1.4c0-.3-.3-.7-.7-.7h-1.5c-2.6 0-4.9-1.9-5.2-4.5-.3-3.1 2.1-5.6 5.1-5.6H15c.4.1.5.5.3.8l-2.6 2.6z" } },
	  leave_group: { "path": { "d": "M14 10.2c-.9-.4-1.1-.8-1.1-1.2 0-.4.3-.8.5-1.1.6-.5.9-1.3.9-2.1 0-1.6-.9-3-2.6-3-1 0-1.7.5-2.2 1.2 1.2.9 1.9 2.4 1.9 4.2 0 1-.3 2-.8 2.8-.2.3-.1.7.2.9 1 .5 2.1 1.1 2.7 2.2.1.2.3.3.5.3h1.3c.8 0 1.3-.6 1.3-1.5 0-1.3-1.3-2.1-2.6-2.7zM9.1 13c-1.1-.5-1.2-.9-1.2-1.4s.3-.9.6-1.2c.6-.6 1-1.4 1-2.4 0-1.8-1.1-3.4-2.9-3.4h-.2C4.5 4.6 3.5 6.2 3.5 8c0 1 .3 1.8.9 2.4.4.3.6.8.6 1.2 0 .5-.1.9-1.2 1.4-1.5.7-2.9 1.4-3 2.8.1 1 .8 1.7 1.7 1.7h8c.9 0 1.6-.7 1.6-1.7-.1-1.4-1.5-2.1-3-2.8zM14.8 19.6v-1.4c0-.3.3-.7.7-.7h6.9c.4 0 .7.4.7.7v1.4c0 .4-.3.7-.7.7h-6.9c-.4 0-.7-.3-.7-.7z" } },
	  log_a_call: { "path": { "d": "M19.8.9H5.9C4.6.9 3.6 2 3.6 3.1v.8h-.7c-.9 0-1.5.6-1.5 1.5S2 6.8 2.9 6.8h.7v3.7h-.7c-.9 0-1.5.7-1.5 1.5s.6 1.5 1.5 1.5h.7v3.7h-.7c-.9 0-1.5.6-1.5 1.4 0 .9.6 1.5 1.5 1.5h.7v.8c0 1.1 1 2.2 2.3 2.2h13.9c1.2 0 2.4-1.1 2.4-2.3V3c0-1.2-1.2-2.1-2.4-2.1zm-1.3 14.9l-1.1 1c-.2.2-.5.4-.8.3-2.4-.1-4.7-1.2-6.4-2.8s-2.7-4-2.8-6.4c0-.3.1-.7.3-.8l1-1.1c.5-.4 1.3-.4 1.7.1l1 1.2c.3.5.3 1 0 1.4l-.8 1.2c-.1.2-.1.4.1.5l1.7 1.9 1.9 1.7c.1.1.3.1.4 0l1.2-.8c.4-.3 1-.3 1.4 0l1.2 1c.4.3.5 1.1 0 1.6z" } },
	  log_event: { "path": { "d": "M17.9 18.6l-2.3.7c-.1 0-.4.1-.6.1-.6 0-1.2-.3-1.7-.8-.4-.6-.5-1.3-.3-1.9l.7-2.7 3.5-3.4c.1-.2 0-.4-.2-.4H2.5c-.3 0-.7.3-.7.6v8.6c0 1 .9 1.8 1.9 1.8h12.9c1 0 1.9-.8 1.9-1.8V19c0-.3-.4-.5-.6-.4zM2.5 8.3h15.3c.3 0 .7-.3.7-.7V6.5c0-1.1-.9-1.9-1.9-1.9h-1.4v-.4c0-.8-.6-1.4-1.4-1.4-.7 0-1.3.6-1.3 1.4v.4H7.8v-.4c0-.8-.6-1.4-1.3-1.4-.8 0-1.4.6-1.4 1.4v.4H3.7c-1 0-1.9.8-1.9 1.9v1.1c0 .4.4.7.7.7zm17.6 2.4c-.1-.1-.3-.1-.3 0L15.4 15l-.6 2.2c-.1.2.1.4.3.3l2.2-.6 4.3-4.3c.1-.1.1-.3 0-.4l-1.5-1.5zm3.7-1.4l-.9-.8c-.2-.3-.7-.3-1.1 0 0 0-.5.5-.7.8-.1.1-.1.2 0 .3l1.6 1.6c.1.1.2.1.3 0l.8-.8c.3-.2.3-.8 0-1.1z" } },
	  manage_perm_sets: { "path": { "d": "M20.8.9H3.2C1.9.9.9 1.9.9 3.2v17.6c0 1.2 1 2.3 2.3 2.3h17.6c1.2 0 2.3-1 2.3-2.3V3.2c0-1.3-1-2.3-2.3-2.3zM20 20.8H4c-.4 0-.8-.4-.8-.8V4c0-.4.4-.8.8-.8h16c.4 0 .8.4.8.8v16c0 .4-.4.8-.8.8zM10.1 5.5H6.3c-.4 0-.8.3-.8.8v3.8c0 .4.3.8.8.8h3.8c.4 0 .8-.3.8-.8V6.3c-.1-.4-.4-.8-.8-.8zm7.6 0h-3.8c-.4 0-.8.3-.8.8v3.8c0 .4.3.8.8.8h3.8c.4 0 .8-.3.8-.8V6.3c0-.4-.4-.8-.8-.8zm-7.6 7.7H6.3c-.4 0-.8.3-.8.7v3.9c0 .4.3.8.8.8h3.8c.4 0 .8-.4.8-.8v-3.9c-.1-.4-.4-.7-.8-.7zm7.6 0h-3.8c-.4 0-.8.3-.8.7v3.9c0 .4.3.8.8.8h3.8c.4 0 .8-.4.8-.8v-3.9c0-.4-.4-.7-.8-.7z" } },
	  map: { "path": { "d": "M22.5 4.4l-6.6-3.3c-.3-.2-.7-.2-1 0L8.8 4.2 2.6 1.1c-.4-.2-.8-.2-1.2 0-.3.2-.5.6-.5.9v16.6c0 .5.3.8.6 1l6.7 3.3c.3.2.7.2.9 0l6.2-3.1 6.2 3.1c.1.1.3.2.5.2s.4-.1.6-.2c.3-.2.5-.6.5-.9V5.4c0-.5-.2-.8-.6-1zm-1.7 2.1v8.8c0 .5-.5.9-1 .7-1.7-.7-.3-3.5-1.5-5.1-1.2-1.4-2.7 0-4.1-2.2-1.3-2.2.5-3.8 2.1-4.6.3-.1.5-.1.7 0l3.4 1.7c.3.2.4.4.4.7zm-9.3 12.8c-.3.2-.6.1-.8-.1-.5-.4-.9-1-.9-1.7 0-1.1-1.8-.7-1.8-2.9 0-1.8-2.1-2.3-3.9-2.1-.5.1-.8-.3-.8-.7V5c0-.5.5-.9 1-.6l4 2h.1l.1.1c1.7 1 1.3 1.8.6 3-.7 1.3-1.1 0-2.2-.4s-2.2.4-1.8 1.1 1.5 0 2.2.7.7 1.9 2.9 1.1 2.6-.3 3.4.4c.7.8 1.1 2.2 0 3.3-.7.7-1 2.1-1.2 3-.1.2-.2.4-.4.5l-.5.1z" } },
	  more: { "path": { "d": "M3.7 9.2c1.5 0 2.8 1.3 2.8 2.8s-1.3 2.8-2.8 2.8S.9 13.5.9 12s1.3-2.8 2.8-2.8zm8.3 0c1.5 0 2.8 1.3 2.8 2.8s-1.3 2.8-2.8 2.8-2.8-1.3-2.8-2.8 1.3-2.8 2.8-2.8zm8.3 0c1.5 0 2.8 1.3 2.8 2.8s-1.3 2.8-2.8 2.8-2.8-1.3-2.8-2.8 1.3-2.8 2.8-2.8z" } },
	  "new": { "path": { "d": "M13.8 13.4h7.7c.3 0 .7-.3.7-.7v-1.4c0-.4-.4-.7-.7-.7h-7.7c-.2 0-.4-.2-.4-.4V2.5c0-.3-.3-.7-.7-.7h-1.4c-.4 0-.7.4-.7.7v7.7c0 .2-.2.4-.4.4H2.5c-.3 0-.7.3-.7.7v1.4c0 .4.4.7.7.7h7.7c.2 0 .4.2.4.4v7.7c0 .3.3.7.7.7h1.4c.4 0 .7-.4.7-.7v-7.7c0-.2.2-.4.4-.4z" } },
	  new_account: { "path": { "d": "M19 .5H5c-1.2 0-2.2 1-2.2 2.2v.1c0 .4.3.8.8.8h16.9c.4 0 .7-.4.7-.8v-.1c0-1.2-1-2.2-2.2-2.2zm-.1 5.4H5.1c-.4 0-.8.3-.8.7v16.2c0 .4.4.8.8.8h4.2c.4 0 .8-.4.8-.8v-3.1c0-.4.3-.8.7-.8h2.3c.4 0 .8.4.8.8v3.1c0 .4.3.8.7.8h4.3c.4 0 .8-.4.8-.8V6.6c0-.4-.4-.7-.8-.7zm-8.1 10.3c0 .5-.3.8-.7.8H8.5c-.4 0-.7-.3-.7-.8v-1.5c0-.4.3-.8.7-.8h1.6c.4 0 .7.4.7.8v1.5zm0-5.4c0 .5-.3.8-.7.8H8.5c-.4 0-.7-.3-.7-.8V9.3c0-.4.3-.8.7-.8h1.6c.4 0 .7.4.7.8v1.5zm5.4 5.4c0 .5-.3.8-.7.8h-1.6c-.4 0-.7-.3-.7-.8v-1.5c0-.4.3-.8.7-.8h1.6c.4 0 .7.4.7.8v1.5zm0-5.4c0 .5-.3.8-.7.8h-1.6c-.4 0-.7-.3-.7-.8V9.3c0-.4.3-.8.7-.8h1.6c.4 0 .7.4.7.8v1.5z" } },
	  new_campaign: { "path": { "d": "M12 .9C5.9.9.9 5.9.9 12s5 11.1 11.1 11.1 11.1-5 11.1-11.1S18.1.9 12 .9zm0 19.4c-4.6 0-8.3-3.7-8.3-8.3S7.4 3.7 12 3.7s8.3 3.7 8.3 8.3-3.7 8.3-8.3 8.3zm0-14.8c-3.6 0-6.5 2.9-6.5 6.5s2.9 6.5 6.5 6.5 6.5-2.9 6.5-6.5-2.9-6.5-6.5-6.5zm0 10.2c-2 0-3.7-1.7-3.7-3.7S10 8.3 12 8.3s3.7 1.7 3.7 3.7-1.7 3.7-3.7 3.7zm0-5.5c-1 0-1.8.8-1.8 1.8s.8 1.8 1.8 1.8 1.8-.8 1.8-1.8-.8-1.8-1.8-1.8z" } },
	  new_case: { "path": { "d": "M6.9 6h1.9c.2 0 .4-.2.4-.5v-.9h5.6v.9c0 .3.2.5.4.5h1.9c.3 0 .4-.2.4-.5V4.4c0-1.4-1.1-2.6-2.5-2.6H9C7.6 1.8 6.5 3 6.5 4.3v1.2c0 .3.1.5.4.5zm14.3 1.8H2.8c-1 0-1.9.9-1.9 1.9v10.6c0 1 .9 1.9 1.9 1.9h18.4c1 0 1.9-.9 1.9-1.9V9.7c0-1-.9-1.9-1.9-1.9z" } },
	  new_child_case: { "path": { "d": "M6.9 5.1h1.9c.2 0 .4-.2.4-.5v-.9h4.6v.9c0 .3.2.5.5.5h1.9c.2 0 .4-.2.4-.5V3.5c0-1.4-1.1-2.6-2.5-2.6H9C7.6.9 6.5 2 6.5 3.4v1.2c0 .3.1.5.4.5zm7.9 10.6h.9v-.9c0-1 .8-1.9 1.8-1.9h2.8c.6 0 1.1.3 1.4.7.2.2.5.1.5-.1V8.8c0-1-.9-1.9-1.9-1.9H2.8c-1 0-1.9.9-1.9 1.9v10.6c0 1 .9 1.8 1.9 1.8h10c.2 0 .3-.1.3-.3-.1-.2-.2-.4-.2-.6v-2.8c0-1 .9-1.8 1.9-1.8zm7.6 1.8h-2.1v-2c0-.4-.3-.7-.7-.7h-1.4c-.3 0-.7.3-.7.7v2h-2c-.4 0-.7.4-.7.7v1.4c0 .4.3.7.7.7h2v2.1c0 .4.4.7.7.7h1.4c.4 0 .7-.3.7-.7v-2.1h2.1c.4 0 .7-.3.7-.7v-1.4c0-.3-.3-.7-.7-.7z" } },
	  new_contact: { "path": { "d": "M21.2 4.2H2.8C1.5 4.2.5 5.2.5 6.5v11c0 1.3 1 2.3 2.3 2.3h18.4c1.3 0 2.3-1 2.3-2.3v-11c0-1.3-1-2.3-2.3-2.3zm-9.8 13H4.8c-.7 0-1.3-.8-1.3-1.6.1-1.2 1.3-1.8 2.5-2.4.9-.4 1-.7 1-1.1 0-.4-.2-.7-.5-1-.5-.5-.8-1.2-.8-1.9 0-1.5.9-2.7 2.4-2.7s2.4 1.3 2.4 2.7c0 .8-.3 1.5-.8 1.9-.3.3-.6.6-.6 1s.1.7 1.1 1.1c1.2.5 2.4 1.2 2.4 2.4.2.8-.4 1.6-1.2 1.6zm9-2.7c0 .4-.3.8-.7.8h-3.5c-.4 0-.8-.3-.8-.8v-1.2c0-.4.4-.7.8-.7h3.5c.4 0 .7.3.7.7v1.2zm0-4.2c0 .4-.3.8-.7.8h-5.8c-.4 0-.7-.3-.7-.8V9.1c0-.4.3-.7.7-.7h5.8c.4 0 .8.3.8.7v1.2z" } },
	  new_custom1: { "path": { "d": "M13.6 21c-.9.9-2.3.9-3.2 0-2.7-2.8-7.8-8.2-7.8-8.2-2.3-2.4-2.3-6.3 0-8.7C3.7 3 5.2 2.3 6.8 2.3s3 .6 4.1 1.8l.5.6c.3.3.9.3 1.2 0l.4-.5c1.2-1.2 2.6-1.9 4.2-1.9 1.5 0 3 .6 4.1 1.8 2.3 2.4 2.3 6.3 0 8.7 0 0-5 5.4-7.7 8.2z" } },
	  new_custom10: { "path": { "d": "M19.4 22.3c-3.5 1.4-9.1 1-12.1-2.2C0 12.3 6.4.9 15.2.9c1.5 0 2.8.3 4.2.9.5.2.6.9.1 1.2-2.8 2-4.7 5.3-4.7 9s1.9 7 4.7 9c.5.3.4 1.1-.1 1.3z" } },
	  new_custom100: { "path": { "d": "M16.4 19.2H7.6c-.3 0-.4.2-.4.5.4 1.4 2.4 2.5 4.8 2.5s4.3-1.1 4.7-2.5c.1-.3-.1-.5-.3-.5zm4.5-17.4H3.1C1.9 1.8.9 2.9.9 4.1v10.5c0 1.3 1 2.3 2.2 2.3h17.8c1.2 0 2.2-1 2.2-2.3V4.1c0-1.2-1-2.3-2.2-2.3zm0 12.1c0 .4-.4.7-.8.7H3.9c-.4 0-.8-.3-.8-.7V4.8c0-.4.4-.7.8-.7h16.2c.4 0 .8.3.8.7v9.1z" } },
	  new_custom11: { "path": { "d": "M12.8 1.4l3 6.3 6.5 1c.8.1 1.1 1 .5 1.5L18 15.1l1.2 6.9c0 .8-.7 1.4-1.3 1L12 19.8 6.1 23c-.6.4-1.4-.2-1.3-1L6 15.1l-4.8-4.9c-.5-.5-.2-1.4.5-1.5l6.5-1 3-6.3c.3-.7 1.3-.7 1.6 0z" } },
	  new_custom12: { "circle": { "cx": "12", "cy": "12", "r": "11.077" } },
	  new_custom13: { "path": { "d": "M20.9 1.8H3.1C1.9 1.8.9 2.8.9 4v2.2c0 .4.3.7.8.7h20.6c.5 0 .8-.3.8-.7V4c0-1.2-1-2.2-2.2-2.2zm0 7.3H3.1c-.4 0-.7.3-.7.7V20c0 1.2 1 2.2 2.2 2.2h14.8c1.2 0 2.2-1 2.2-2.2V9.8c0-.4-.3-.7-.7-.7zm-4.8 3.3c0 .6-.5 1.1-1.1 1.1H9c-.6 0-1.1-.5-1.1-1.1 0-.6.5-1.1 1.1-1.1h6c.6 0 1.1.4 1.1 1.1z" } },
	  new_custom14: { "path": { "d": "M22.3 5.4h-2.2c-.4 0-.9-.2-1.3-.6L17 3.3c-.3-.3-.8-.5-1.3-.5h-4.3c-.6 0-1.1.2-1.5.6L7.6 5.3c-.2.1-.2.5-.1.7l.7.6c.5.4 1.1.5 1.6.1l2-1.2c.3-.2.7-.1.8.1l6.4 6.3c.2.1.3.3.3.6v1.6c0 .5.3.9.7.9h2.2c.5 0 .8-.3.8-.7V6.1c.1-.4-.2-.7-.7-.7zm-6.2 6.7l-4-3.9-1.1.7c-.6.3-1.2.5-1.8.5-.8 0-1.6-.3-2.2-.9L5.5 7.4c-.3-.3-.5-.6-.6-1-.1-.4-.3-.6-.7-.6H1.7c-.5 0-.8.2-.8.6v6.8c0 .5.3.7.8.7h1.4c.1 0 .3-.4.5-.6.5-.7 1.3-1.1 2.2-1.3.9 0 1.8.3 2.5.9l4.6 4.3c.4.3.7.8.9 1.3 0 .2.4.3.6.1l1.7-1.8c.9-.8 1.6-3 .7-3.9l-.7-.8zm-9.3 2.8c-.5-.5-1.2-.4-1.6.1-.4.5-.3 1.3.2 1.7l4.6 4.2c.2.2.5.3.8.3.3-.1.6-.2.7-.5.5-.5.4-1.3-.1-1.7l-4.6-4.1z" } },
	  new_custom15: { "path": { "d": "M19.4 10.6c-1.3-.6-1.5-1-1.5-1.6 0-.6.4-1 .8-1.4.8-.7 1.2-1.7 1.2-2.8 0-2.1-1.3-3.9-3.6-3.9-2 0-3.2 1.4-3.6 3.1 0 .1.1.2.2.3 1.6 1.2 2.7 3.2 2.7 5.6 0 1.7-.6 3.2-1.6 4.4-.2.1-.1.4.1.6.7.2 1.4.6 2.1 1 .3.1.5.2.8.2h4.2c1 0 1.9-.8 1.9-1.8V14c0-1.7-1.8-2.6-3.7-3.4zm-6.6 6.1c-1.6-.7-1.8-1.2-1.8-1.9s.5-1.2 1-1.7c.9-.8 1.4-1.9 1.4-3.2 0-2.5-1.6-4.5-4.3-4.5S4.8 7.5 4.8 9.9c0 1.3.5 2.4 1.4 3.2.5.5 1 1.1 1 1.7 0 .7-.3 1.2-1.8 1.9-2.3.9-4.4 1.9-4.4 3.9v.4c-.1 1.1.9 2.1 2.2 2.1H15c1.2 0 2.2-1 2.2-2.1v-.4c0-2-2.2-3-4.4-3.9z" } },
	  new_custom16: { "path": { "d": "M20 19.4h-.4v-8.1c0-.5-.3-.8-.7-.8h-.8c-.4 0-.7.3-.7.8v8.1h-2.2v-8.1c0-.5-.3-.8-.7-.8h-.7c-.5 0-.8.3-.8.8v8.1h-2.2v-8.1c0-.5-.3-.8-.7-.8h-.7c-.4 0-.8.3-.8.8v8.1H6.5v-8.1c0-.5-.4-.8-.8-.8H5c-.4 0-.8.3-.8.8v8.1H4c-1.2 0-2.2 1-2.2 2.2v.7c0 .5.4.8.8.8h18.9c.4 0 .7-.3.7-.8v-.7c0-1.2-1-2.2-2.2-2.2zm1.8-13.2l-9-5c-.2-.2-.5-.3-.8-.3-.3 0-.6.1-.8.3l-9 5c-.2.2-.4.4-.4.7v.7c0 .4.4.7.8.7h18.9c.4 0 .7-.3.7-.7v-.7c0-.3-.2-.5-.4-.7zm-9.8.6c-1 0-1.8-.8-1.8-1.8S11 3.1 12 3.1s1.8.9 1.8 1.9S13 6.8 12 6.8z" } },
	  new_custom17: { "path": { "d": "M9.5 4.2c.1.3.3.4.6.4h3.7c.3 0 .6-.1.7-.4L16 1.5c.1-.3-.1-.5-.4-.5H8.4c-.3 0-.5.2-.3.5l1.4 2.7zm4.7 2.6H9.8c-3.6 0-6.6 3-6.6 6.7v7.4c0 1.2 1 2.2 2.2 2.2h13.2c1.2 0 2.2-1 2.2-2.2v-7.4c0-3.7-3-6.7-6.6-6.7zm-1.1 12.4v1.3c0 .2-.2.4-.5.4h-1.4c-.3 0-.3-.2-.3-.4v-1.2c-1.1-.2-2-.7-2.3-.9-.2-.3-.3-.5-.1-.9l.5-.7c0-.2.3-.3.5-.3.1 0 .3.1.4.1.8.5 1.4.7 1.9.7s.9-.3.9-.6c0-.2-.1-.6-1.5-1.1-1.3-.4-2.8-1.2-2.8-2.9 0-1 .6-2.1 2.5-2.5V9.1c0-.2.1-.4.3-.4h1.4c.3 0 .5.2.5.4v1.1c.7.1 1.5.5 1.8.7.1.1.2.3.3.5 0 .1-.1.3-.2.4l-.5.7c-.1.1-.4.3-.6.3-.1 0-.2-.1-.3-.1-.8-.4-1.4-.7-1.8-.7-.6 0-.9.3-.9.5 0 .3.2.6 1.4 1 1.5.5 3.3 1.4 3.3 3.1-.1 1.3-1.1 2.3-2.5 2.6z" } },
	  new_custom18: { "path": { "d": "M14.5 7.1h3.8c.3 0 .5-.3.5-.5s-.1-.3-.2-.4l-4.7-4.7c-.1-.1-.2-.1-.3-.1-.3 0-.5.2-.5.5v3.7c0 .8.6 1.5 1.4 1.5zm8.3 4.8l-.4-.5c-.2-.2-.7-.2-1 0l-5.5 5.5v1.3c0 .1 0 .2.1.2h1.4l5.4-5.5c.4-.3.4-.8 0-1zm-4.4 8.6h-3.3c-.7 0-1.3-.6-1.3-1.3v-2.5c0-.4.1-.8.4-1l4.4-4.4c.1-.1.2-.3.2-.5v-.9c0-.4-.3-.7-.7-.7h-5c-1.2 0-2.2-1-2.2-2.1v-5c0-.4-.3-.7-.7-.7H3C1.9 1.4.9 2.4.9 3.5v17c0 1.1 1 2.1 2.1 2.1h13.6c1 0 2-.7 2.1-1.7.1-.2-.1-.4-.3-.4zM3.8 7.8c0-.4.3-.7.7-.7h2.8c.5 0 .7.3.7.7v.6c0 .4-.3.7-.7.7H4.5c-.4 0-.7-.3-.7-.7v-.6zm7.1 9.1c0 .4-.3.7-.7.7H4.5c-.4 0-.7-.3-.7-.7v-.7c0-.3.3-.6.7-.6h5.7c.4 0 .7.3.7.6v.7zm1.5-4.2c0 .4-.4.7-.7.7H4.5c-.4 0-.7-.3-.7-.7V12c0-.4.3-.7.7-.7h7.1c.4 0 .7.3.7.7v.7z" } },
	  new_custom19: { "path": { "d": "M22.8 5.6c-.1-.2-.4-.3-.6-.1l-3.8 3.7c-.3.3-.7.3-1 0l-2.6-2.6c-.3-.3-.3-.7 0-1l3.8-3.8c.1-.1 0-.5-.2-.6-.6-.2-1.3-.3-2-.3-3.9 0-7 3.4-6.6 7.4.1.7.3 1.2.5 1.8l-8.6 8.5c-1.1 1.1-1.1 2.7 0 3.7.5.5 1.2.8 1.8.8s1.3-.3 1.9-.8l8.5-8.6c.6.2 1.2.4 1.8.5 4 .4 7.4-2.7 7.4-6.6 0-.7-.1-1.4-.3-2z" } },
	  new_custom2: { "g": { "path": { "d": "M15.4 1.6C14.3.9 10.2.2 8.7 2.7c-.7 1.2.2 3.4.9 4.8.1.3.5.5.9.3.4-.1 1-.2 1.6-.2.4 0 .7 0 1.1.1.3.1.6-.1.8-.4.3-.4.7-1 1.5-1.6 1.7-1.5 1-3.3-.1-4.1zm-2 14.6c-.4.1-.9.2-1.4.2-.5 0-.9-.1-1.3-.2-.3 0-.7.1-.8.4-.3.5-.7 1.1-1.5 1.7-1.8 1.5-1.1 3.3 0 4.1s5.2 1.4 6.7-1.1c.7-1.2-.1-3.3-.8-4.7-.2-.4-.5-.5-.9-.4zm7.9-7.6c-1.2-.7-3.4.2-4.8.9-.3.1-.5.5-.3.9.1.4.2 1 .2 1.6 0 .4 0 .7-.1 1.1-.1.3.1.7.4.8.4.3 1 .7 1.6 1.5 1.5 1.8 3.3 1.1 4 0s1.5-5.2-1-6.8zM7.8 13.4c-.1-.5-.2-.9-.2-1.4 0-.5.1-.9.2-1.3 0-.4-.1-.7-.4-.9-.5-.2-1.1-.7-1.7-1.4-1.5-1.8-3.3-1.1-4.1 0S.2 13.5 2.7 15c1.2.7 3.3 0 4.7-.7.4-.2.5-.6.4-.9z" }, "circle": { "cx": "12", "cy": "12", "r": "2.215" } } },
	  new_custom20: { "path": { "d": "M7.6 11.2c0-.3-.4-.5-.6-.3l-5.2 3.9c-.6.4-.9 1.1-.9 1.8v1.5c0 .3.3.5.5.4l5.7-2.2c.2-.1.4-.3.4-.7.1 0 .1-4.4.1-4.4zm8.1 10.3l-1.5-1.1V3.7c0-1-1-2.1-1.7-2.6-.3-.3-.7-.3-1 0-.6.5-1.7 1.6-1.7 2.6v16.8l-1.7 1.1c-.3.2-.5.6-.5.9v.3c0 .1.1.3.3.3h8.2c.1 0 .4-.2.4-.3-.1-.6-.3-1-.8-1.3zm6.5-6.7l-5.2-4c-.2-.1-.6 0-.6.3v4.5c0 .3.2.6.5.7l5.7 2.2c.3.1.5-.1.5-.3v-1.5c0-.8-.3-1.5-.9-1.9z" } },
	  new_custom21: { "path": { "d": "M14.8 19.8c-.1-.3-.4-.4-.6-.4H9.9c-.3 0-.6.1-.7.4l-1 2.7c-.1.3.1.5.3.5h7c.2 0 .4-.2.3-.5l-1-2.7zM20.9.9H3.1C1.9.9.9 1.9.9 3.1V15c0 1.2 1 2.2 2.2 2.2h17.8c1.2 0 2.2-1 2.2-2.2V3.1c0-1.2-1-2.2-2.2-2.2zM12 16.4c-.6 0-1.1-.4-1.1-1.1s.5-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1zm8.9-3.7c0 .5-.4.8-.8.8H3.9c-.4 0-.8-.3-.8-.8V3.9c0-.4.4-.8.8-.8h16.2c.4 0 .8.4.8.8v8.8z" } },
	  new_custom22: { "path": { "d": "M22.2 17.1l-2.3-1.8c-.8-.7-1.9-.7-2.7-.1L15 16.8c-.2.2-.6.1-.9-.1l-3.6-3.3-3.3-3.6c-.3-.2-.3-.6-.1-.9l1.6-2.2c.6-.8.5-1.9-.1-2.7L6.7 1.7C6 .7 4.5.6 3.6 1.5l-2 2.1c-.5.4-.7 1-.7 1.6.3 4.7 2.4 9.2 5.6 12.3s7.5 5.3 12.2 5.6c.7 0 1.2-.3 1.7-.7l2-2c1-.9.9-2.4-.2-3.3z" } },
	  new_custom23: { "path": { "d": "M11.5 14.1c.3.3.7.3 1.1 0L23 4.6c.2-.4.1-.9-.6-.9H1.7c-.5 0-1 .5-.6 1l10.4 9.4zm11.6-5.4c0-.5-.6-.8-.9-.4L14 15.7c-.5.5-1.2.8-2 .8-.7 0-1.4-.3-1.9-.8L1.9 8.3c-.4-.3-.9-.1-.9.4v9.4c0 1.2 1 2.2 2.2 2.2h17.7c1.2 0 2.2-1 2.2-2.2V8.7z" } },
	  new_custom24: { "path": { "d": "M18.6.9H5.4c-1.2 0-2.2 1-2.2 2.2 0 .5.4.8.8.8h16c.4 0 .8-.3.8-.8 0-1.2-1-2.2-2.2-2.2zm0 5.2H5.4c-.4 0-.7.3-.7.7v15.5c0 .5.3.8.7.8h4.1c.4 0 .7-.3.7-.8v-2.9c0-.4.4-.8.8-.8h2.1c.4 0 .8.4.8.8v2.9c0 .5.3.8.7.8h4c.5 0 .8-.3.8-.8V6.8c-.1-.4-.4-.7-.8-.7zm-7.7 10c0 .4-.3.7-.7.7H8.7c-.4 0-.8-.3-.8-.7v-1.5c0-.4.4-.8.8-.8h1.5c.4 0 .7.4.7.8v1.5zm0-5.2c0 .4-.3.7-.7.7H8.7c-.4 0-.8-.3-.8-.7V9.4c0-.4.4-.7.8-.7h1.5c.4 0 .7.3.7.7v1.5zm5.1 5.2c0 .4-.3.7-.7.7h-1.5c-.4 0-.7-.3-.7-.7v-1.5c0-.4.3-.8.7-.8h1.5c.4 0 .8.4.8.8v1.5zm0-5.2c0 .4-.3.7-.7.7h-1.5c-.4 0-.7-.3-.7-.7V9.4c0-.4.3-.7.7-.7h1.5c.4 0 .8.3.8.7v1.5z" } },
	  new_custom25: { "path": { "d": "M23 3.6c-.3-1.4-1.4-2.5-2.8-2.7-1-.1-2 .2-2.7.8-.2.1-.1.4.1.6 1.7.9 3.2 2.2 4.3 3.7.1.3.4.3.6 0 .5-.6.7-1.5.5-2.4zM6.3 2.3c.3-.1.3-.5.1-.6-.7-.6-1.6-.9-2.6-.8-1.4.2-2.6 1.3-2.8 2.7-.2.9 0 1.8.4 2.4.2.2.5.2.7 0 1.1-1.5 2.5-2.8 4.2-3.7zm5.7.8c-5.5 0-10 4.5-10 10 0 2.2.8 4.3 2 5.9l-1.6 1.5c-.6.6-.6 1.6 0 2.2.3.2.7.4 1.1.4s.7-.1 1-.4L6 21.1c1.7 1.2 3.8 2 6 2s4.3-.8 5.9-2l1.5 1.6c.4.2.7.4 1.1.4s.7-.1 1-.4c.6-.6.6-1.6 0-2.2L20 19c1.2-1.6 1.9-3.7 1.9-5.9.1-5.5-4.4-10-9.9-10zm-7 10c0-3.9 3.1-7 7-7s7 3.1 7 7-3.1 7-7 7-7-3.1-7-7zm8.1-.5V9.8c0-.7-.5-1.1-1.1-1.1s-1.1.4-1.1 1.1v3.3c0 .3.1.6.3.8l2.6 2.6c.2.2.5.3.8.3s.5-.1.8-.3c.4-.5.4-1.2 0-1.6l-2.3-2.3z" } },
	  new_custom26: { "path": { "d": "M3.1.9C1.9.9.9 1.9.9 3.1c0 .7.3 1.3.8 1.7v16.8c0 .8.6 1.5 1.4 1.5.9 0 1.5-.7 1.5-1.5V4.8c.5-.4.8-1 .8-1.7C5.4 1.9 4.3.9 3.1.9zm19.4 4c-5.8 3-9.7-2.2-15.2-.2-.3.1-.5.4-.5.7v9.5c0 .5.5.8 1 .7 5.3-1.6 9.2 3.4 14.9.2.2-.1.4-.3.4-.6V5.3c0-.4-.3-.5-.6-.4z" } },
	  new_custom27: { "path": { "d": "M3 16.4h18c.4 0 .7-.3.7-.7V4.8c0-1.1-.9-2-2.1-2H4.4c-1.2 0-2.1.9-2.1 2v10.9c0 .5.3.7.7.7zM4.4 5.5c0-.4.3-.7.7-.7h13.8c.4 0 .7.3.7.7v8.2c0 .4-.3.7-.7.7H5.1c-.4 0-.7-.3-.7-.7V5.5zm18 13h-7.6c-.4 0-.7.3-.7.7s-.3.7-.7.7h-2.8c-.4 0-.7-.3-.7-.7s-.3-.7-.7-.7H1.6c-.4 0-.7.3-.7.7 0 1.1.9 2 2.1 2h18c1.2 0 2.1-.9 2.1-2 0-.4-.3-.7-.7-.7z" } },
	  new_custom28: { "path": { "d": "M17.2.9H6.8c-1.2 0-2.2 1-2.2 2.2v17.8c0 1.2 1 2.2 2.2 2.2h10.4c1.2 0 2.2-1 2.2-2.2V3.1c0-1.2-1-2.2-2.2-2.2zM12 22.3c-.6 0-1.1-.4-1.1-1.1s.5-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1zm5.2-3.7c0 .5-.4.8-.8.8H7.6c-.4 0-.8-.3-.8-.8v-14c0-.4.4-.7.8-.7h8.8c.4 0 .8.3.8.7v14z" } },
	  new_custom29: { "path": { "d": "M20.9 3.9h-.7c-.4 0-.8.3-.8.8v14.7s0 .1.1.1l.9 1.3c.1.1.2.1.3 0l.9-1.3c.1 0 .1 0 .1-.1V4.7c0-.5-.3-.8-.8-.8zM15 .9H4.5c-1.2 0-2.2 1-2.2 2.2v17.8c0 1.2 1 2.2 2.2 2.2H15c1.2 0 2.2-1 2.2-2.2V3.1c0-1.2-1-2.2-2.2-2.2zM9.8 22.3c-.7 0-1.1-.4-1.1-1.1s.4-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1zm5.2-3.7c0 .5-.3.8-.7.8h-9c-.4 0-.7-.3-.7-.8v-14c0-.4.3-.7.7-.7h9c.4 0 .7.3.7.7v14z" } },
	  new_custom3: { "path": { "d": "M12 7.6c-2.4 0-4.4 2-4.4 4.4s2 4.4 4.4 4.4 4.4-2 4.4-4.4-2-4.4-4.4-4.4zM23.1 12c0-1.3-3.1-1.9-3.6-3.1-.5-1.2 1.2-3.8.3-4.7s-3.5.8-4.7.3C13.9 4 13.3.9 12 .9S10.1 4 8.9 4.5c-1.2.5-3.8-1.2-4.7-.3s.8 3.5.3 4.7C4 10.1.9 10.7.9 12s3.1 1.9 3.6 3.1c.5 1.2-1.2 3.8-.3 4.7.8.9 3.5-.8 4.7-.3 1.1.5 1.8 3.6 3.1 3.6s1.9-3.1 3-3.6c1.2-.4 3.9 1.2 4.8.3.8-.8-.9-3.5-.4-4.7.6-1.2 3.7-1.8 3.7-3.1zM12 18.6c-3.6 0-6.6-3-6.6-6.6s3-6.6 6.6-6.6 6.6 3 6.6 6.6-3 6.6-6.6 6.6z" } },
	  new_custom30: { "path": { "d": "M19.9 4.1C17.9 2 15.2.9 12.4.9c-.7 0-1.1.5-1.1 1.1s.4 1.1 1.1 1.1c2.2 0 4.4.9 6 2.5 1.6 1.6 2.5 3.8 2.5 6.1 0 .6.5 1.1 1.1 1.1s1.1-.5 1.1-1.1c0-2.9-1.1-5.6-3.2-7.6zm-7.5 1.3c-.7 0-1.1.4-1.1 1.1s.4 1.1 1.1 1.1c1 0 2.1.4 2.9 1.2.8.8 1.2 1.7 1.2 2.9 0 .6.4 1.1 1.1 1.1s1.1-.5 1.1-1.1c0-1.7-.7-3.3-1.9-4.5C15.6 6 14 5.4 12.4 5.4zM10.8 16l.9-2.6c.7.3 1.4.1 2-.4.7-.8.7-1.9 0-2.7-.8-.7-1.9-.7-2.7 0-.5.6-.6 1.4-.3 2.1l-2.4 1.1-4.4-4.4c-.3-.2-.8-.2-1 .1-2.8 3.3-2.6 8.3.5 11.4 3.1 3.1 8.1 3.3 11.4.5.3-.2.3-.7.1-1L10.8 16z" } },
	  new_custom31: { "path": { "d": "M21.4 9.6L19.6 4c-.3-1-1.3-1.7-2.4-1.7H6.8C5.7 2.3 4.7 3 4.3 4L2.6 9.6c-1 .2-1.7 1-1.7 2v4.3c0 .9.7 1.7 1.5 2.1v3c0 .4.3.7.7.7h3c.4 0 .7-.3.7-.7v-2.9h10.4V21c0 .4.3.7.7.7h3c.4 0 .7-.3.7-.7v-3c.8-.3 1.5-1.1 1.5-2v-4.3c0-1.1-.7-1.9-1.7-2.1zm-16.8 6c-1 0-1.8-.8-1.8-1.8S3.6 12 4.6 12s1.9.8 1.9 1.8-.9 1.8-1.9 1.8zm8.1-6.1H5.4c-.2 0-.4-.2-.3-.5l1.4-4.2c0-.2.1-.3.3-.3h10.3c.2 0 .3.1.3.3l1.4 4.3c.1.2-.1.5-.3.5h-5.8zm6.3 6.1c-1 0-1.8-.8-1.8-1.8S18 12 19 12s1.9.8 1.9 1.8-.9 1.8-1.9 1.8z" } },
	  new_custom32: { "path": { "d": "M22.5 6.6l-8.6 4.9c-.2.1-.4.1-.6.1-.4 0-.8-.2-1-.6-.3-.5 0-1.2.5-1.5l2.9-1.6V5.1c0-.3-.3-.5-.6-.3l-10.5 6c-.2 0-.4.1-.5.1-.4 0-.8-.2-1-.6-.3-.5-.1-1.2.4-1.5l1.8-1V1.7c.1-.5-.3-.8-.7-.8H1.7c-.5 0-.8.3-.8.8v19.2c0 1.2 1 2.2 2.2 2.2h6.3c.4 0 .8-.3.8-.8v-2.5c0-.5.3-.8.7-.8h2.2c.4 0 .7.3.7.8v2.5c0 .5.4.8.8.8h6.3c1.2 0 2.2-1 2.2-2.2v-14c0-.3-.3-.5-.6-.3zm-16 10.2c0 .4-.4.7-.8.7H5c-.4 0-.8-.3-.8-.7v-2.2c0-.4.4-.8.8-.8h.7c.4 0 .8.4.8.8v2.2zm4.4 0c0 .4-.3.7-.7.7h-.8c-.4 0-.7-.3-.7-.7v-2.2c0-.4.3-.8.7-.8h.8c.4 0 .7.4.7.8v2.2zm4.4 0c0 .4-.3.7-.7.7h-.8c-.4 0-.7-.3-.7-.7v-2.2c0-.4.3-.8.7-.8h.8c.4 0 .7.4.7.8v2.2zm4.5 0c0 .4-.4.7-.8.7h-.7c-.4 0-.8-.3-.8-.7v-2.2c0-.4.4-.8.8-.8h.7c.4 0 .8.4.8.8v2.2z" } },
	  new_custom33: { "path": { "d": "M17.2 8.9h-10c-.4 0-.7.3-.7.7v2.7c0 .4.3.7.7.7h10c.4 0 .7-.3.7-.7V9.6c0-.4-.3-.7-.7-.7zM12.4 12c-.6 0-1-.5-1-1 0-.6.4-1 1-1s1 .4 1 1c0 .5-.5 1-1 1zm10-7.8H1.6c-.4 0-.7.3-.7.6v.7c0 .8.6 1.4 1.4 1.4v12.3c0 .3.3.6.7.6h.7c.4 0 .7-.3.7-.6V6.9H20v12.3c0 .3.3.6.7.6h.7c.3 0 .7-.3.7-.6V6.9h-.4c.7 0 1.4-.6 1.4-1.4v-.7c0-.3-.3-.6-.7-.6z" } },
	  new_custom34: { "path": { "d": "M9 4.6h6c.4 0 .7-.4.6-.8C15.2 2.2 13.8.9 12 .9S8.8 2.2 8.4 3.8c-.1.4.2.8.6.8zm13 9.6c.6 0 1.1-.5 1.1-1.2-.1-.5-.6-1-1.2-1h-3.3v-1.8c2.2-.9 3.7-3.2 3.7-5.9 0-.6-.3-1-.9-1.2-.7-.1-1.3.5-1.3 1.1 0 1.6-.7 3-1.8 3.6-.4-.6-1.1-1-1.9-1H7.6c-.8 0-1.5.4-1.9 1-1.1-.6-1.8-1.9-1.8-3.5 0-.6-.5-1.2-1-1.2-.7-.1-1.2.5-1.2 1.1 0 2.7 1.5 5.1 3.7 5.9V12H2.1c-.6 0-1.1.4-1.2 1 0 .6.5 1.2 1.1 1.2h3.4V16c-2.2.8-3.7 3.2-3.7 5.9 0 .5.3 1 .9 1.1.7.1 1.3-.4 1.3-1.1 0-1.5.7-2.9 1.7-3.6.7 2.1 2.3 3.7 4.3 4.4.5.1 1-.3 1-.7v-8.8c0-.6.5-1.2 1-1.2.7 0 1.2.5 1.2 1.1V22c0 .5.5.8 1 .7 2-.6 3.6-2.3 4.3-4.3 1 .6 1.7 2 1.7 3.5 0 .6.5 1.1 1 1.2.7 0 1.2-.5 1.2-1.1 0-2.8-1.5-5.1-3.7-5.9v-1.9H22z" } },
	  new_custom35: { "path": { "d": "M19.2 8.3c-.7 0-1.2.5-1.2 1.1v1.9c0 3.2-2.7 5.9-6 5.9s-6.1-2.7-6.1-5.9V9.4c0-.6-.5-1.1-1.1-1.1s-1.1.5-1.1 1.1v1.9c0 4.1 3.1 7.4 7.1 8v1.6H9c-.7 0-1.2.4-1.2 1.1s.5 1.1 1.2 1.1h6c.6 0 1.2-.5 1.2-1.1s-.6-1.1-1.2-1.1h-1.9v-1.6c4.1-.6 7.2-3.9 7.2-8V9.4c0-.6-.5-1.1-1.1-1.1zM12 15c2.1 0 3.8-1.7 3.8-3.7V4.6c0-2.1-1.7-3.7-3.8-3.7-2.1 0-3.8 1.6-3.8 3.7v6.7c0 2 1.7 3.7 3.8 3.7z" } },
	  new_custom36: { "path": { "d": "M7.9 20.1H6.5c-.3 0-.5.2-.6.4l-.5.9c-.3.5-.2 1.2.2 1.5.2.1.4.2.6.2.4 0 .8-.2 1-.6l1-1.8c.2-.3 0-.6-.3-.6zm10.3.4c-.2-.2-.4-.4-.6-.4h-1.5c-.3 0-.5.3-.3.6l1 1.8c.3.4.6.6 1 .6.2 0 .4-.1.6-.2.4-.3.6-1 .2-1.5l-.4-.9zM18.1.9H5.9c-1.2 0-2.2 1-2.2 2.2v12.6c0 1.2 1 2.2 2.2 2.2h12.2c1.2 0 2.2-1 2.2-2.2V3.1c0-1.2-1-2.2-2.2-2.2zM6.9 16.4c-.6 0-1-.4-1-1.1s.4-1.1 1-1.1 1.1.5 1.1 1.1-.4 1.1-1.1 1.1zm10.2 0c-.6 0-1.1-.4-1.1-1.1s.5-1.1 1.1-1.1 1 .5 1 1.1-.4 1.1-1 1.1zm1-4.4c0 .4-.3.7-.7.7H6.6c-.4 0-.7-.3-.7-.7V4.6c0-.4.3-.7.7-.7h10.8c.5 0 .8.3.8.7V12z" } },
	  new_custom37: { "path": { "d": "M22.4 14.1h-4.5V10c.9.8 2.1 1.3 3.5 1.3.6 0 1-.5 1-1s-.5-1-1-1c-1.9 0-3.5-1.7-3.5-3.8V4.4c.4 0 .7-.3.7-.7V3c0-.4-.3-.7-.7-.7h-2.1c-.3 0-.7.3-.7.7v.7c0 .4.4.7.7.7v1c0 2.1-1.7 3.8-3.8 3.8S8.3 7.5 8.3 5.4v-1c.3 0 .7-.3.7-.7V3c0-.4-.4-.7-.7-.7H6.2c-.4 0-.7.3-.7.7v.7c0 .4.3.7.7.7v1c0 2.1-1.6 3.8-3.5 3.8-.6 0-1 .4-1 1s.5 1 1 1c1.3 0 2.6-.5 3.5-1.3V14H1.6c-.4.1-.7.4-.7.8v1.6c0 .4.3.8.7.8H3V21c0 .3.3.7.7.7h2.1c.3 0 .7-.4.7-.7v-1.4c0-1.2.9-2.1 2-2.1h7c1.1 0 2 .9 2 2.1V21c0 .3.4.7.7.7h2.1c.4 0 .7-.4.7-.7v-3.8h1.4c.4 0 .7-.4.7-.8v-1.6c0-.4-.3-.7-.7-.7zM8.2 9.9c1 .9 2.4 1.4 3.8 1.4s2.8-.5 3.8-1.4v4.2H8.2V9.9z" } },
	  new_custom38: { "path": { "d": "M12 10.2c-1.6 0-3 1.3-3 2.9s1.4 3 3 3 3-1.4 3-3-1.4-2.9-3-2.9zm8.9-3.7h-3c-.3 0-.6-.2-.7-.5l-1-2c-.3-.8-1.1-1.2-1.9-1.2H9.7c-.8 0-1.6.4-1.9 1.2l-1 2c-.1.3-.4.5-.7.5h-3C1.9 6.5.9 7.5.9 8.7V19c0 1.2 1 2.2 2.2 2.2h17.8c1.2 0 2.2-1 2.2-2.2V8.7c0-1.2-1-2.2-2.2-2.2zM12 18.4c-2.9 0-5.2-2.3-5.2-5.2S9.1 8 12 8s5.2 2.3 5.2 5.2-2.3 5.2-5.2 5.2z" } },
	  new_custom39: { "path": { "d": "M17 4.1c-.1-.3-.4-.5-.7-.4L1.4 8.5c-.3.1-.5.5-.4.9l.6 2.3c.1.3.4.6.8.5l3.8-.5c.1.4.3.9.5 1.2l-3.2 8.7c-.2.6.1 1.2.7 1.4 0 0 .2.1.3.1.5 0 .9-.3 1-.8l3.1-8.2c.3.1.4.1.7.1s.5-.1.8-.1l3 8.2c.1.5.6.8 1 .8.1 0 .3-.1.4-.1.6-.2.9-.8.6-1.4l-3.2-8.8c.4-.6.7-1.3.7-2l5.2-.8c.3 0 .5-.4.4-.7L17 4.1zm6 5.2l-2-7.5c-.1-.6-.8-1-1.4-.9-.6.2-1 .8-.8 1.4l2 7.5c.2.6.8 1 1.4.9.6-.2 1-.8.8-1.4z" } },
	  new_custom4: { "path": { "d": "M3 5.6l7.8-4.4c.7-.4 1.7-.4 2.4 0L21 5.6c.7.4 1.2 1.2 1.2 2v8.8c0 .8-.5 1.6-1.2 2l-7.8 4.4c-.7.4-1.6.4-2.4 0L3 18.4c-.6-.4-1.2-1.2-1.2-2V7.6c0-.8.6-1.6 1.2-2z" } },
	  new_custom40: { "path": { "d": "M20.9 3.7H3.1C1.9 3.7.9 4.7.9 5.9v12.2c0 1.2 1 2.2 2.2 2.2h17.8c1.2 0 2.2-1 2.2-2.2V5.9c0-1.2-1-2.2-2.2-2.2zm0 2.2V8H3.1V5.9h17.8zM3.1 18.1v-6.5h17.8v6.5H3.1zm6.4-4.7c-.5 0-1 .3-1.2.7-.1.1-.2.1-.2 0-.3-.4-.7-.7-1.2-.7-.9 0-1.5.7-1.5 1.5 0 .7.6 1.4 1.5 1.4.5 0 .9-.2 1.2-.7h.2c.2.5.7.7 1.2.7.8 0 1.4-.6 1.4-1.4v-.1c0-.7-.7-1.4-1.4-1.4zm8.4.4h-4.4c-.4 0-.8.3-.8.7v.7c0 .4.4.8.8.8h4.4c.4 0 .7-.4.7-.8v-.7c0-.4-.3-.7-.7-.7z" } },
	  new_custom41: { "path": { "d": "M21 5.1H3c-1.2 0-2.1.9-2.1 2v9.8c0 1.1.9 2 2.1 2h18c1.2 0 2.1-.9 2.1-2V7.1c0-1.1-.9-2-2.1-2zM5.4 16.9c0-1.3-1-2.4-2.4-2.4v-5c1.4 0 2.4-1.1 2.4-2.4h13.2c0 1.3 1.1 2.4 2.4 2.4v5c-1.3 0-2.4 1.1-2.4 2.4H5.4z" }, "ellipse": { "cx": "12", "cy": "11.815", "rx": "3.462", "ry": "3.369" } },
	  new_custom42: { "path": { "d": "M20.9 1.8H3.1C1.9 1.8.9 2.8.9 4v2.2c0 .4.3.7.8.7h20.6c.5 0 .8-.3.8-.7V4c0-1.2-1-2.2-2.2-2.2zm0 7.3H3.1c-.4 0-.7.3-.7.7V20c0 1.2 1 2.2 2.2 2.2h14.8c1.2 0 2.2-1 2.2-2.2V9.8c0-.4-.3-.7-.7-.7zm-4.8 3.3c0 .6-.5 1.1-1.1 1.1H9c-.6 0-1.1-.5-1.1-1.1 0-.6.5-1.1 1.1-1.1h6c.6 0 1.1.4 1.1 1.1z" } },
	  new_custom43: { "path": { "d": "M23 9.8v-.7V9h-.1v-.1h-.1l-4-5.7c-.2-.2-.4-.4-.8-.4H6c-.4 0-.7.2-.9.4l-4 5.6c0 .1-.1.1-.1.1V9H.9V9.8c.1 0 .1.1.1.1v.1h.1l10.1 10.9v.1h.1s.1 0 .1.1v.1h.1v.1h.8v-.1h.1v-.1h.1V21h.1v-.1h.1L22.8 10v-.1h.1l.1-.1zM12 8.4h-1.6L12 5.7l1.6 2.7H12zm0 2h2l-2 6.5-2-6.5h2zm1.8-5.6h2.5l-.9 2.6-1.6-2.6zM8.7 7.4l-.9-2.6h2.5L8.7 7.4zm-.8 3l1.8 6-5.5-6h3.7zm8.2 0h3.7l-5.5 6 1.8-6zm4-2h-3l1-2.8 2 2.8zM5.9 5.6l1 2.8h-3l2-2.8z" } },
	  new_custom44: { "path": { "d": "M18.8 4.2C16.9 1.8 15.3.9 12 .9c-1.5 0-3.3.6-4 .8 0-.5-.3-.8-.8-.8H5.8c-.4 0-.8.3-.8.8v2.9c0 .4.4.8.8.8h1.4c.4 0 .7-.4.7-.8h.9c.6 0 1 .5 1 1.1 0 .7.5 1.1 1.1 1.1v5.9c-.7 0-1.4.7-1.4 1.5v6.7c0 1.2 1 2.2 2.2 2.2h.7c1.2 0 2.2-1 2.2-2.2v-6.7c0-.8-.7-1.5-1.4-1.5V6.8c.6 0 1.1-.8 1.1-1.4 0-.6.4-1.1.9-1.1 1.5-.1 2.3.5 2.7.9.2.2.6.2.7 0 .4-.2.5-.7.2-1z" } },
	  new_custom45: { "path": { "d": "M6.1 9.6h11.8v4.8H6.1zm17-.6V7.2c0-1.2-.9-2.1-2.1-2.1H3C1.8 5.1.9 6 .9 7.2V9c0 .2.2.5.4.6.8.5 1.4 1.4 1.4 2.4s-.6 1.9-1.4 2.4c-.2.1-.4.3-.4.6v1.8c0 1.2.9 2.1 2.1 2.1h18c1.2 0 2.1-.9 2.1-2.1V15c0-.2-.2-.5-.4-.6-.8-.5-1.4-1.4-1.4-2.4s.6-1.9 1.4-2.4c.2-.1.4-.3.4-.6zm-3.8 7.5H4.7c-.4 0-.7-.3-.7-.7V8.2c0-.4.3-.7.7-.7h14.5c.4 0 .7.3.7.7v7.6c0 .4-.2.7-.6.7z" } },
	  new_custom46: { "path": { "d": "M16.1 7.2H7.9c-.4 0-.7.3-.7.7v8.2c0 .4.3.7.7.7h8.2c.4 0 .7-.3.7-.7V7.9c0-.4-.3-.7-.7-.7zm6.4-3.6c.3-.1.6-.4.6-.7V1.7c0-.5-.3-.8-.8-.8h-1.2c-.3 0-.6.3-.7.6-.2.7-.9 1.3-1.7 1.3s-1.5-.6-1.8-1.3c-.1-.3-.4-.6-.7-.6h-1.8c-.3 0-.6.3-.6.6-.2.7-1 1.3-1.8 1.3s-1.5-.6-1.8-1.3c-.1-.3-.3-.6-.7-.6H7.8c-.3 0-.6.3-.6.6-.3.7-1 1.3-1.8 1.3-.9 0-1.6-.6-1.8-1.3-.1-.3-.4-.6-.7-.6H1.7c-.5 0-.8.3-.8.8v1.2c0 .3.3.6.6.7.7.2 1.3.9 1.3 1.8s-.6 1.5-1.3 1.7c-.3.1-.6.4-.6.7v1.8c0 .3.3.6.6.6.7.2 1.3 1 1.3 1.8s-.6 1.5-1.3 1.8c-.3.1-.6.3-.6.7v1.7c0 .3.3.6.6.6.7.3 1.3 1 1.3 1.8 0 .9-.6 1.6-1.3 1.8-.3.1-.6.4-.6.7v1.2c0 .5.3.8.8.8h1.2c.3 0 .6-.3.7-.6.2-.7.9-1.3 1.7-1.3.8 0 1.5.6 1.8 1.3.1.3.3.6.7.6h1.7c.3 0 .6-.3.7-.6.2-.7.9-1.3 1.7-1.3s1.5.6 1.8 1.3c.1.3.3.6.7.6h1.8c.3 0 .6-.3.6-.6.3-.7 1-1.3 1.8-1.3s1.5.6 1.8 1.3c0 .3.3.6.6.6h1.2c.5 0 .8-.3.8-.8v-1.2c0-.3-.2-.6-.6-.7-.7-.2-1.3-.9-1.3-1.7s.6-1.5 1.3-1.8c.4-.1.6-.3.6-.7v-1.7c0-.3-.2-.6-.6-.7-.7-.2-1.3-.9-1.3-1.7 0-.8.6-1.5 1.3-1.8.4-.1.6-.3.6-.7V7.8c0-.3-.2-.6-.6-.6-.7-.3-1.3-1-1.3-1.8s.7-1.6 1.4-1.8zM19 16.8c0 1.2-1 2.2-2.2 2.2H7.2C6 19 5 18 5 16.8V7.2C5 6 6 5 7.2 5h9.6C18 5 19 6 19 7.2v9.6z" } },
	  new_custom47: { "path": { "d": "M16.9 20.1H4.1c-1.2 0-2.3 1-2.3 2.2v.1c0 .4.4.7.7.7h15.9c.4 0 .7-.3.7-.7v-.1c.1-1.2-1-2.2-2.2-2.2zm5-11.7l-6-5.4 1-1.4c.1-.3 0-.5-.2-.6-1.9-.4-3 .9-3 .9C2.1 1.9 4 14.4 4.6 17.3c.1.3.3.6.7.6h10.2c.3 0 .5-.4.3-.6-2-2.5-3.1-5.3-3.8-7-.1-.3.2-.7.5-.5 2.7 1.4 3.9-.1 5.7 1 1 .6 2.1.5 2.8-.3l1-1c.2-.3.2-.7-.1-1.1zm-7.6-1.2c-.7 0-1.1-.5-1.1-1.1S13.7 5 14.3 5s1.1.4 1.1 1.1-.5 1.1-1.1 1.1z" } },
	  new_custom48: { "path": { "d": "M22.3 2.4h-3.7v-.7c0-.5-.3-.8-.7-.8H6.1c-.4 0-.7.3-.7.8v.7H1.7c-.5 0-.8.3-.8.7v4.8c0 1.9 1.5 3.4 3.3 3.4H6c1 2.3 3.2 4 6 4 2.8.1 5.1-1.6 6.1-4h1.7c1.8 0 3.3-1.5 3.3-3.4V3.1c0-.4-.3-.7-.8-.7zM4.2 9c-.6 0-1.1-.4-1.1-1.1V4.6h2.3V9H4.2zm16.7-1.1c0 .7-.5 1.1-1.1 1.1h-1.2V4.6h2.3v3.3zm-5.2 13h-.4c-1.2 0-2.2-1.1-2.2-2.3v-.7c0-.2-.1-.4-.4-.4h-1.4c-.3 0-.4.2-.4.4v.7c0 1.2-1 2.3-2.2 2.3h-.4c-.4 0-.7.3-.7.7v.7c0 .5.3.8.7.8h7.4c.4 0 .7-.3.7-.8v-.7c0-.4-.3-.7-.7-.7z" } },
	  new_custom49: { "path": { "d": "M12 8.7c-1.8 0-3.3 1.5-3.3 3.3s1.5 3.3 3.3 3.3 3.3-1.5 3.3-3.3-1.5-3.3-3.3-3.3zm0 5.1c-1 0-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8 1.8.8 1.8 1.8-.8 1.8-1.8 1.8zM12 .9C5.9.9.9 5.9.9 12s5 11.1 11.1 11.1 11.1-5 11.1-11.1S18.1.9 12 .9zm0 19.5c0 .5-.4.8-.8.8-4.5-.4-8-3.9-8.4-8.4 0-.4.3-.8.8-.8h.7c.4 0 .7.3.7.6.4 3.4 3 6 6.4 6.4.3 0 .6.3.6.7v.7zm0-2.9c-3 0-5.5-2.5-5.5-5.5S9 6.5 12 6.5 17.5 9 17.5 12 15 17.5 12 17.5zm8.4-5.5h-.7c-.4 0-.7-.3-.7-.6-.4-3.4-3-6-6.4-6.4-.3 0-.6-.3-.6-.7v-.7c0-.5.4-.8.8-.8 4.5.4 8.1 4 8.4 8.4 0 .4-.3.8-.8.8z" } },
	  new_custom5: { "path": { "d": "M22.7 2.7c-3.8-1.5-8.2-1.8-12.1-.5-3.4 1.1-6.9 3.6-7.4 7.4-.1.8-.1 1.7.1 2.4l.3 1.2.3.6c-.1.2-.3.5-.4.6-1.1 1.7-1.8 3.6-2.3 5.5-.2.8-.6 2 .2 2.5.4.3.9.3 1.2.1.4-.3.5-.7.6-1.2.3-1.9 1-3.9 2.1-5.5.5-.8 1-1.6 1.7-2.4.5-.6 1.4-1.7 2.3-1.4.9.4.9 1.4.3 2s-1.2 1.1-1.2 2c0 .7.3 1.4.8 1.8.8.6 2.2.7 3.1.6 2-.1 3.6-.7 5.1-1.8 2.1-1.5 2.9-4 3.3-6.3.3-1.5.5-2.9 1-4.3.2-.6.5-1.2.8-1.7.2-.2.5-.5.5-.8.2-.4-.1-.7-.3-.8z" } },
	  new_custom50: { "path": { "d": "M21.9 14.4c-.8.5-1.8.7-2.8.7-1.2 0-2.3-.3-3.3-.9-.1-.1-.3-.1-.4 0-1 .6-2.1.9-3.3.9s-2.4-.3-3.3-.9c-.1-.1-.3-.1-.4 0-1 .6-2.1.9-3.3.9-1 0-2-.2-2.8-.7-.3-.1-.6.1-.6.4v4.5c0 .9.5 1.7 1.3 2.1 1.9.8 3.9 1.4 6 1.7.5.1.8-.3.8-.8v-2.8c0-1.2 1-2.2 2.2-2.2 1.2 0 2.2 1 2.2 2.2v2.8c0 .5.4.8.8.8 2.1-.3 4.1-.9 6-1.7.8-.4 1.3-1.2 1.3-2.1v-4.5c.1-.3-.1-.5-.4-.4zM5 12.8c1.4 0 2.5-.5 3.3-1.4.1-.2.4-.2.5 0 .8.8 2 1.4 3.2 1.4 1.4 0 2.5-.5 3.3-1.4.1-.2.4-.2.5 0 .8.8 2 1.4 3.3 1.4 2 0 3.8-1.4 4-3.2 0-.3-.1-.6-.3-.7l-9.4-7.5c-.8-.7-2-.7-2.7 0L1.2 8.9c-.2.1-.3.4-.3.7.3 1.8 2.1 3.2 4.1 3.2z" } },
	  new_custom51: { "path": { "d": "M8.5 3c1 .6 1.8 2.1 2.2 3.3.1.3.3.4.6.4.2.1.4.1.7.1.4 0 .7 0 1.1-.1.9-.3 1.7-.7 2.4-1.4 1.1-1.2 1.5-2.8 1.1-4.1-1.3-.5-2.9-.1-4 1.1-.4.3-.6.7-.8 1.1-.6-1-1.3-1.8-2.1-2.3-.6-.3-1.3-.1-1.6.4-.3.5 0 1.2.4 1.5zm11.2 5.4c-3.7-2.1-4.5.7-7.7.7s-4-2.8-7.7-.7c-3.6 2.1-2.5 8.9-1.1 11.4 1.3 2.3 3.6 4.6 8.5 2.4.2-.1.4-.1.6 0 4.8 2.2 7.2-.1 8.5-2.4 1.4-2.5 2.5-9.3-1.1-11.4z" } },
	  new_custom52: { "path": { "d": "M23 6.5c.1-1.2 0-2.3-.2-3.5-.1-1-.8-1.7-1.8-1.8-1.2-.2-2.3-.3-3.5-.2-.3 0-.5.4-.3.6l5.2 5.2c.3.2.6 0 .6-.3zm-8.7-4.7c-.2-.2-.5-.3-.7-.2C10.8 2.4 8.2 3.8 6 6c-2.1 2.2-3.6 4.8-4.4 7.4-.1.3 0 .6.2.8l8 8c.2.2.5.3.8.2 2.6-.8 5.2-2.3 7.4-4.4 2.1-2.2 3.6-4.8 4.4-7.6.1-.3 0-.5-.2-.7l-7.9-7.9zm-3.1 14.4c-.4.5-1.1.5-1.6 0l-2-2c-.5-.5-.5-1.2 0-1.6.4-.5 1.1-.5 1.5 0l2.1 2.1c.5.4.5 1.1 0 1.5zm2.6-2.5c-.5.4-1.2.4-1.6 0l-2-2.1c-.5-.5-.5-1.2 0-1.6.4-.4 1.1-.4 1.5 0l2.1 2.1c.5.5.5 1.1 0 1.6zm2.6-2.6c-.5.4-1.2.4-1.6 0L12.7 9c-.4-.5-.4-1.2 0-1.6.5-.4 1.2-.4 1.6 0l2.1 2.1c.4.5.4 1.2 0 1.6zM1 17.3c-.1 1.2-.1 2.5.2 3.7.1 1 .8 1.8 1.8 1.9 1.2.2 2.5.3 3.8.2.3-.1.4-.4.3-.7L1.6 17c-.2-.2-.6-.1-.6.3z" } },
	  new_custom53: { "path": { "d": "M21 14.6h-.3c-.8 0-1.5-.7-1.5-1.5V8.2c0-4.3-3.7-7.7-8-7.2-3.7.4-6.4 3.7-6.4 7.5v4.4c0 .9-.8 1.7-1.7 1.7H3c-.6 0-1.2.5-1.2 1.2v.9c0 .6.6 1.2 1.2 1.2h18c.6 0 1.2-.6 1.2-1.2v-.9c0-.7-.6-1.2-1.2-1.2zm-6.6 5.5H9.6c-.3 0-.6.3-.5.5.3 1.4 1.5 2.5 2.9 2.5s2.7-1 3-2.5c0-.2-.3-.5-.6-.5z" } },
	  new_custom54: { "path": { "d": "M3.6 12.4C6 12 8.1 11 10.4 10c.7-.4 2.1-1 2.8-1.3.2-.1.3-.3.2-.6-.2-1-1-1.9-2.1-1.9h-.8V4.8c0-.4-.3-.7-.7-.7V2.6c0-.4-.3-.8-.8-.8H7.6c-.4 0-.8.4-.8.8v1.5c-.3 0-.7.3-.7.7v1.4h-.7c-1.2 0-2.3 1.1-2.3 2.3V12c0 .3.3.5.5.4zm16.5 7.3s2.7-4.1 3-10c0-.4-.3-.7-.8-.7-8.8.3-12.9 5.6-20.7 5.9-.4 0-.7.4-.7.7v2.8c0 1.2.9 2.1 2.1 2.2 3.9.3 12.2.8 16.9 1.6.5.1 1-.4.9-.8-.1-.6-.3-1.3-.7-1.7zm-.3-6.6c-.7 0-1.2-.5-1.2-1.1s.5-1.1 1.2-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1z" } },
	  new_custom55: { "path": { "d": "M5.8 15.4h4.5c.4 0 .7-.4.7-.7V4.6c0-.8-.7-1.4-1.4-1.4H5.9c-.5 0-.8.4-.8.8v10.7c0 .3.3.7.7.7zM21 5.3v10.8c0 .7-.6 1.3-1.4 1.3H4.4c-.8 0-1.4-.6-1.4-1.3V5.3c-1.2 0-2.1.9-2.1 2v10.1c0 1.1.9 2 2.1 2h6.6c.3 0 .6.4.6.7s.4.7.7.7H13c.4 0 .7-.3.7-.7s.3-.7.7-.7H21c1.1 0 2-.9 2-2V7.3c.1-1.1-.8-2-2-2zm-7.2 10.1h4.3c.5 0 .8-.4.8-.8V3.9c0-.3-.3-.7-.7-.7h-3.8c-.6 0-1.3.6-1.3 1.4v10.1c-.1.3.2.7.7.7z" } },
	  new_custom56: { "path": { "d": "M16.7 4.8c-2.3 2.3-5.1-.6-7.7 2l-7.4 7.4c-.9.8-.9 2.2 0 3.1l2.6 2.5 2.5 2.6c.9.9 2.3.9 3.1 0l7.5-7.4c2.5-2.6-.3-5.4 2-7.7l.6-.6c.2-.1.2-.4 0-.5l-2-2c-.2-.2-.4-.2-.5 0l-.7.6zm-1.8 9.4l-2.6 2.6c-.3.3-.7.3-1 0l-2.1-2.1-2-2.1c-.3-.2-.3-.7 0-1L9.7 9c.3-.2.8-.2 1.1 0l2 2.1 2.1 2.1c.3.3.3.7 0 1zm7.9-11.5l-.7-.8-.8-.8c-.3-.3-.8-.3-1 0l-1 1c-.1.1-.1.3 0 .5l2 2c.2.2.4.2.5 0l1-.9c.4-.2.4-.7 0-1z" } },
	  new_custom57: { "path": { "d": "M13.1 13.4v9.3c0 .3.3.5.6.3 1.8-1 7.3-4.2 7.3-4.2.6-.4 1.1-1.2 1.1-2V8.4c0-.3-.3-.4-.5-.3l-8.1 4.6c-.2.2-.4.4-.4.7zm-.7-2.6l8.1-4.7c.3-.1.3-.5 0-.6-1.8-1-7.3-4.3-7.3-4.3-.7-.4-1.7-.4-2.4 0 0 0-5.5 3.2-7.3 4.3-.3.1-.3.5 0 .6l8.1 4.7c.3.1.5.1.8 0zm-1.9 1.9L2.4 8.1c-.2-.2-.6 0-.6.3v8.4c0 .8.5 1.6 1.2 2 0 0 5.5 3.2 7.3 4.2.3.2.5 0 .5-.3v-9.3c.1-.3-.1-.5-.3-.7z" } },
	  new_custom58: { "path": { "d": "M18.2 10.5c-.6 0-1.1-.5-1.1-1.2.1-.6.6-1 1.2-1h3.2c.1 0 .3-.1.3-.2.3-.5.5-1 .7-1.5.1-.3-.1-.5-.3-.5h-2.4c-.6 0-1.1-.5-1.2-1 0-.7.5-1.2 1.2-1.2h2.9c.2 0 .4-.2.4-.4V2.4c0-.4-.3-.7-.8-.7h-3.9c-1.1 0-2 .8-2 1.9v.1c0 2.1-1.4 3.9-3.3 4.4v-3c.8-.5 1.3-1.3 1.1-2.3-.1-1-1-1.7-1.9-1.8-1.4-.2-2.5.8-2.5 2.2 0 .8.4 1.5 1.1 1.9v3.1C9 7.7 7.6 5.9 7.6 3.8v-.1c0-1.1-.9-2-2-2H1.7c-.5 0-.8.3-.8.7v1.2c0 .2.2.3.4.3h2.9c.6 0 1.1.5 1.2 1 0 .7-.5 1.2-1.2 1.2H1.8c-.2 0-.4.3-.3.5.2.5.4 1.1.7 1.6.1.1.2.2.3.2h3.2c.6 0 1.2.4 1.2 1 .1.6-.4 1.2-1.1 1.2h-.9c-.3 0-.5.4-.2.6 1.6 1.4 3.6 2.3 6.3 2.3v8.4c0 .6.4 1.1 1 1.2.6 0 1.2-.5 1.2-1.1v-8.5c2.7 0 4.7-1 6.3-2.3.3-.2.1-.6-.3-.6h-1z" } },
	  new_custom59: { "path": { "d": "M18.3 5c.4 0 .6-.3.6-.7 0-.2-.1-.5-.4-.6-.5-.3-1.2-1.5-1.5-2.3-.1-.3-.3-.5-.6-.5H7.5c-.3 0-.6.2-.6.5-.3.7-1 2-1.5 2.3-.2.1-.3.4-.3.6 0 .4.3.7.6.7h12.6zM5.1 20.8c0 1.3.9 2.3 2.1 2.3h9.5c1.2 0 2.2-1 2.2-2.2v-.1c0-.4-.3-.7-.7-.7H5.7c-.3 0-.6.3-.6.7zm13.8-3.6V7.9c0-.4-.3-.7-.7-.7H5.8c-.4 0-.7.3-.7.7v9.3c0 .4.3.7.7.7h12.4c.4 0 .7-.3.7-.7z" } },
	  new_custom6: { "path": { "d": "M12 21.7H2.4c-1.2 0-1.8-1.3-1.2-2.3L10.7 3c.6-.9 1.9-.9 2.5 0l9.6 16.5c.6 1-.1 2.2-1.2 2.2H12z" } },
	  new_custom60: { "path": { "d": "M23.1 10.2C22.2 5 17.6.9 12 .9S1.8 5 .9 10.2c0 .4.3.6.6.4.6-.4 1.3-.7 2.1-.7 1 0 1.9.4 2.5 1.2.1.2.5.2.6 0 .6-.8 1.5-1.2 2.5-1.2s1.9.4 2.5 1.2c.1.2.4.2.6 0 .6-.8 1.5-1.2 2.5-1.2s1.9.4 2.5 1.2c.1.2.4.2.6 0 .6-.8 1.4-1.2 2.5-1.2.7 0 1.5.3 2 .7.4.2.7 0 .7-.4zm-6.7 8.4c-.6 0-1.1.5-1.1 1.2s-.4 1.1-1.1 1.1-1.1-.5-1.1-1.1v-5.2c0-.7-.5-1.1-1.1-1.1s-1.1.4-1.1 1.1v5.2c0 1.8 1.5 3.3 3.3 3.3s3.3-1.5 3.3-3.3c0-.7-.4-1.2-1.1-1.2z" } },
	  new_custom61: { "path": { "d": "M20.5.9H19c-.4 0-.7.3-.7.8v1.4c0 .5-.3.8-.8.8h-.7c-.4 0-.7-.3-.7-.8V1.7c0-.5-.3-.8-.8-.8h-1.5c-.4 0-.7.3-.7.8v1.4c0 .5-.3.8-.7.8h-.8c-.4 0-.7-.3-.7-.8V1.7c0-.5-.3-.8-.7-.8H8.7c-.4 0-.8.3-.8.8v1.4c0 .5-.3.8-.7.8h-.7c-.5 0-.8-.3-.8-.8V1.7c0-.5-.3-.8-.7-.8H3.5c-.4 0-.7.3-.7.8v3.7c0 1.2 1 2.2 2.2 2.2h14c1.2 0 2.2-1 2.2-2.2V1.7c0-.5-.3-.8-.7-.8zm-1.7 9.5c0-.4-.3-.7-.7-.7H5.9c-.4 0-.7.3-.7.7L3.5 22.2c-.1.5.3.8.7.8H9c.4 0 .8-.3.8-.7v-3.6c0-1.2.9-2.3 2.1-2.3 1.3 0 2.3 1 2.3 2.2v3.7c0 .5.4.8.8.8h4.8c.4 0 .8-.4.7-.9l-1.7-11.8z" } },
	  new_custom62: { "path": { "d": "M22 19H2c-.6 0-1.1.5-1.1 1.1 0 .6.5 1.1 1.1 1.1h20c.6 0 1.1-.4 1.1-1.1S22.6 19 22 19zM2.4 16.8H15v-1.5c0-.4.3-.7.7-.7h3.7c.4 0 .7.3.7.7v1.5h1.5c.4 0 .7-.3.7-.7V3.5c0-.4-.3-.7-.7-.7H2.4c-.4 0-.7.3-.7.7v12.6c0 .4.3.7.7.7zm3.3-9.6c0-.4.3-.7.8-.7h10.7c.4 0 .7.3.7.7v.7c0 .5-.3.8-.7.8H6.5c-.5 0-.8-.3-.8-.8v-.7zm0 4.4c0-.4.3-.7.8-.7h7c.4 0 .7.3.7.7v.8c0 .4-.3.7-.7.7h-7c-.5 0-.8-.3-.8-.7v-.8z" } },
	  new_custom63: { "path": { "d": "M9 15.7h6c.4 0 .7-.3.7-.7V9c0-.4-.3-.7-.7-.7H9c-.4 0-.7.3-.7.7v6c0 .4.3.7.7.7zm13-2.6c.6 0 1.1-.5 1.1-1.1s-.5-1.1-1.1-1.1h-1.9V8.7H22c.6 0 1.1-.5 1.1-1.1s-.5-1.1-1.1-1.1h-1.9v-.4c0-1.2-1-2.2-2.2-2.2h-.4V2c0-.6-.4-1.1-1.1-1.1s-1.1.5-1.1 1.1v1.9h-2.2V2c0-.6-.5-1.1-1.1-1.1s-1.1.5-1.1 1.1v1.9H8.7V2c0-.6-.5-1.1-1.1-1.1S6.5 1.4 6.5 2v1.9h-.4c-1.2 0-2.2 1-2.2 2.2v.4H2c-.6 0-1.1.4-1.1 1.1S1.4 8.7 2 8.7h1.9v2.2H2c-.6 0-1.1.5-1.1 1.1s.5 1.1 1.1 1.1h1.9v2.2H2c-.6 0-1.1.5-1.1 1.1s.5 1.1 1.1 1.1h1.9v.4c0 1.2 1 2.2 2.2 2.2h.4V22c0 .6.4 1.1 1.1 1.1s1.1-.5 1.1-1.1v-1.9h2.2V22c0 .6.5 1.1 1.1 1.1s1.1-.5 1.1-1.1v-1.9h2.2V22c0 .6.5 1.1 1.1 1.1s1.1-.5 1.1-1.1v-1.9h.4c1.2 0 2.2-1 2.2-2.2v-.4H22c.6 0 1.1-.4 1.1-1.1s-.5-1.1-1.1-1.1h-1.9v-2.2H22zm-4.1 3.7c0 .6-.5 1.1-1.1 1.1H7.2c-.6 0-1.1-.5-1.1-1.1V7.2c0-.6.5-1.1 1.1-1.1h9.6c.6 0 1.1.5 1.1 1.1v9.6z" } },
	  new_custom64: { "path": { "d": "M12 .9C5.9.9.9 5.9.9 12s5 11.1 11.1 11.1 11.1-5 11.1-11.1S18.1.9 12 .9zm0 19.2c-4.5 0-8.1-3.6-8.1-8.1S7.5 3.9 12 3.9s8.1 3.6 8.1 8.1-3.6 8.1-8.1 8.1zm4.3-12.9l-6.1 2.3c-.4.1-.6.3-.7.7l-2.3 6.1c0 .3.2.6.5.5l6.1-2.3c.4-.1.6-.3.7-.7l2.3-6.1c.1-.3-.2-.6-.5-.5zM12 13.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z" } },
	  new_custom65: { "path": { "d": "M19.6 17.9h-18c-.4 0-.7.3-.7.7 0 1.2 1 2.2 2.2 2.2h15c1.2 0 2.2-1 2.2-2.2v-.1c0-.3-.4-.6-.7-.6zm-.8-14.7H1.7c-.4 0-.7.4-.7.8-.1.9-.1 2.7.1 3.8.4 3.4 2.2 6.2 4.7 7.8H14c1.4-.9 2.6-2.3 3.4-3.8.4.1.9.2 1.4.2 2.3 0 4.3-2 4.3-4.4s-1.9-4.4-4.3-4.4zm0 6.6c-.2 0-.3-.1-.5-.1.3-1.2.5-2.4.5-3.7v-.6c1.2 0 2.2.9 2.2 2.2s-1 2.2-2.2 2.2z" } },
	  new_custom66: { "path": { "d": "M22.4 14l-5.3-5.4c-.9-.8-2.2-.8-3.1 0L8.6 14c-.8.8-.8 2.2 0 3l5.4 5.4c.8.9 2.2.9 3 0l5.4-5.4c.9-.8.9-2.2 0-3zm-10.1 2.4c-.5.5-1.4.5-1.8 0-.5-.5-.5-1.3 0-1.8s1.3-.5 1.8 0 .4 1.3 0 1.8zm4.1 4.2c-.5.5-1.3.5-1.8 0s-.5-1.3 0-1.8 1.4-.5 1.8 0c.5.5.5 1.3 0 1.8zm0-8.3c-.5.5-1.3.5-1.8 0s-.5-1.4 0-1.8c.5-.5 1.4-.5 1.8 0 .5.4.5 1.3 0 1.8zm4.2 4.1c-.5.5-1.4.5-1.8 0-.5-.5-.5-1.3 0-1.8s1.3-.5 1.8 0 .5 1.3 0 1.8zM13.1 5.9V3.1c0-1.2-1-2.2-2.2-2.2H3.1C1.9.9.9 1.9.9 3.1v7.8c0 1.2 1 2.2 2.2 2.2h2.8c.2 0 .5-.1.6-.3.1-.1.3-.2.4-.4l5.5-5.5c.1-.1.2-.3.4-.4.2-.1.3-.4.3-.6zm-9 5.4c-.7 0-1.3-.6-1.3-1.3s.6-1.3 1.3-1.3 1.3.6 1.3 1.3-.6 1.3-1.3 1.3zm2.9-3c-.7 0-1.3-.6-1.3-1.3S6.3 5.7 7 5.7s1.3.6 1.3 1.3S7.7 8.3 7 8.3zm3-2.9c-.7 0-1.3-.6-1.3-1.3s.6-1.3 1.3-1.3c.7 0 1.3.6 1.3 1.3s-.6 1.3-1.3 1.3z" } },
	  new_custom67: { "path": { "d": "M13.5 13.1l-.5-.8c-.2-.3-.4-.4-.8-.4-.1 0-.2 0-.3.1l-1.3.4c-.5-.4-1.1-.7-1.7-1l-.3-1.3c-.1-.5-.4-.7-.9-.7h-.9c-.5 0-.8.3-.9.8l-.3 1.2c-.6.3-1.1.6-1.7 1.1L2.6 12c-.1 0-.2-.1-.3-.1-.3 0-.6.2-.8.5l-.5.8c-.2.4-.1.8.2 1.2l1.2.8c-.1.4-.1.7-.1 1 0 .3 0 .6.1 1l-1.1.9c-.4.3-.5.8-.2 1.2l.4.8c.2.3.5.4.9.4 0 0 .2 0 .3-.1L4 20c.5.4 1 .8 1.7 1l.2 1.3c.1.5.5.8.9.8h1c.4 0 .8-.3.9-.8l.2-1.3c.7-.3 1.3-.6 1.8-1.1l1.2.5c.1 0 .2.1.3.1.4 0 .7-.2.9-.5l.4-.7c.3-.4.2-.9-.2-1.2l-1.1-.9c.1-.3.1-.6.1-1 0-.3 0-.6-.1-1l1.1-.8c.3-.4.4-.9.2-1.3zm-6.3 5.6c-1.3 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.6 1.1 2.6 2.5-1.2 2.5-2.6 2.5zM22.8 7.9l-.8-.7c0-.3.1-.5.1-.8 0-.3-.1-.5-.1-.8l.8-.7c.3-.2.4-.6.2-.9l-.4-.7c-.1-.2-.4-.3-.6-.3h-.3l-1.1.4c-.4-.4-.8-.6-1.4-.8l-.1-1.1c-.1-.3-.4-.6-.8-.6h-.7c-.4 0-.7.3-.8.6l-.1 1.1c-.5.2-1 .4-1.4.8L14.2 3c-.1-.1-.2-.1-.3-.1-.2 0-.5.1-.6.4l-.4.6c-.2.3-.1.7.2.9l.8.7c0 .3-.1.5-.1.8 0 .3.1.6.1.8l-.8.7c-.3.2-.4.6-.2 1l.4.6c.1.2.4.4.6.4.1 0 .2 0 .3-.1l1.1-.4c.4.4.9.7 1.4.8l.1 1.1c.1.3.4.6.8.6h.7c.4 0 .7-.3.8-.6l.1-1.1c.6-.2 1.1-.5 1.5-.9l1 .4c.1.1.2.1.3.1.2 0 .5-.1.6-.4l.4-.6c.2-.2.1-.5-.2-.8zm-4.8.6c-1.2 0-2.1-.9-2.1-2s.9-2.1 2.1-2.1 2 1 2 2.1-.9 2-2 2z" } },
	  new_custom68: { "path": { "d": "M12 .9C5.9.9.9 5.9.9 12s5 11.1 11.1 11.1 11.1-5 11.1-11.1S18.1.9 12 .9zm8.8 10h-2.9c-.1-2.6-.7-4.9-1.6-6.7 2.4 1.4 4.1 3.8 4.5 6.7zm-9.9-7.3v7.3H8.4c.1-3.5 1.2-6.2 2.5-7.3zm0 9.5v7.3c-1.3-1.1-2.4-3.8-2.5-7.3h2.5zm2.2 7.3v-7.3h2.5c-.1 3.5-1.2 6.2-2.5 7.3zm0-9.5V3.6c1.3 1.1 2.4 3.8 2.5 7.3h-2.5zM7.7 4.2C6.8 6 6.3 8.3 6.1 10.9H3.2C3.6 8 5.3 5.6 7.7 4.2zm-4.5 8.9h2.9c.1 2.6.7 4.9 1.6 6.7-2.4-1.4-4.1-3.8-4.5-6.7zm13.1 6.7c.9-1.8 1.4-4.1 1.6-6.7h2.9c-.4 2.9-2.1 5.3-4.5 6.7z" } },
	  new_custom69: { "path": { "d": "M13 10.2c-2.2-1.6-4.3-.8-5.7.5-.5.5-1.3.8-2.2 1-1 .3-2.1.7-2.8 1.5-2.2 2-1.7 4.5 1.1 7.3l.1.1c1.7 1.7 3.2 2.5 4.7 2.5 1 0 1.9-.4 2.8-1.2.8-.8 1.2-1.8 1.5-2.8.3-.9.6-1.7 1.1-2.2.8-.8 1.3-1.8 1.4-2.7.1-.7-.1-1.7-.9-2.8 0 0-.4-.6-1.1-1.2zm-4.6 8.9c-.2.2-.5.3-.7.3-.3 0-.5-.1-.7-.3l-2.1-2c-.4-.4-.4-1 0-1.5.4-.4 1-.4 1.4 0l2.1 2.1c.4.4.4 1 0 1.4zm1.8-3c-1.1 0-1.9-.8-1.9-1.8s.8-1.9 1.9-1.9 1.8.8 1.8 1.9-.8 1.8-1.8 1.8zM22.8 2.9l-1.7-1.7c-.2-.3-.8-.3-1.1 0L18.1 3c-.3.3-.3.9 0 1.2l.1.1-3.8 3.8c-.1.2-.1.4 0 .6.3.3.8.7 1.1 1 .1.1.3.1.5 0l3.8-3.8V6c.3.3.9.3 1.2 0l1.9-1.9c.3-.4.3-.9-.1-1.2z" } },
	  new_custom7: { "path": { "d": "M3.3 23.1C2 23.1.9 22 .9 20.7V3.3C.9 2 2 .9 3.3.9h17.4c1.3 0 2.4 1.1 2.4 2.4v17.4c0 1.3-1.1 2.3-2.4 2.3H3.3z" } },
	  new_custom70: { "path": { "d": "M11.3 17.1L7 12.9c-.9-.9-2.3-.9-3.2 0l-2.6 2.6c-.3.3-.3.8 0 1l.5.6.5.5 4.3 4.2.2.3.9.7c.2.3.8.3 1 0l2.7-2.6c.8-.8.8-2.2 0-3.1zm-7-1.6l.6-.5c.3-.3.7-.3 1 0l3.2 3.1c.3.3.3.8 0 1.1l-.5.5c-.3.2-.8.2-1 0l-3.3-3.2c-.3-.3-.3-.7 0-1zM9 11.7l3.4 3.3c.1.1.2.1.3.1h1.6c.1 0 .3-.1.3-.3v-1.4c0-.2.2-.3.4-.3l1.3-.1c.2 0 .4-.1.4-.3v-1.4c0-.2.1-.3.3-.3l1.4-.1c.2 0 .3-.1.3-.3l.1-1.4c0-.2.1-.3.3-.3h1.4c.2 0 .3-.2.3-.4l.1-1.3c0-.2.1-.3.2-.4l1.6-.2c.2 0 .4-.3.2-.6l-3.1-4.8c-.3-.3-.8-.4-1.2 0l-9.7 9.6c-.2.2-.2.6.1.9z" } },
	  new_custom71: { "path": { "d": "M19.8 5c-2.1-2.1-5-3.2-8.1-3.2C5.8 2 .9 7 .9 12.9v3.4c0 1.2 1 2.2 2.2 2.2h1.5v1.8c0 .9.7 1.7 1.7 1.9 1.1 0 2-.8 2-1.8v-6.5c0-.9-.7-1.8-1.7-1.9-1.1-.1-2 .7-2 1.8v2.5h-.7c-.4 0-.8-.3-.8-.7v-2.7C3.1 8.1 7 4.2 11.7 4c2.5-.1 4.7.8 6.4 2.5 1.8 1.6 2.7 3.8 2.7 6.2v2.9c0 .4-.3.7-.7.7h-.7v-2.4c0-.9-.7-1.8-1.7-1.9-1.1-.1-2 .7-2 1.8v6.5c0 .9.7 1.7 1.7 1.9 1.1 0 2-.8 2-1.8v-1.8h1.5c1.2 0 2.2-1 2.2-2.2v-3.5c0-2.9-1.1-5.7-3.3-7.9z" } },
	  new_custom72: { "g": { "path": { "d": "M22 .9H2C1.4.9.9 1.4.9 2S1.4 3.1 2 3.1h8.9v2.3c-4 .6-7 3.9-7 8V16c0 2.6 2.1 4.9 4.9 4.9h6.5c2.7 0 4.9-2.2 4.9-4.9v-2.6c0-4.1-3.1-7.5-7-8V3.1H22c.7 0 1.1-.4 1.1-1.1S22.6.9 22 .9zm-4.8 12.5c0 1-.9 1.9-2 1.9H8.8c-1.1 0-1.9-.8-2-1.9.1-2.8 2.3-5.1 5.1-5.1h.1c2.9 0 5.1 2.3 5.2 5.1z" }, "circle": [{ "cx": "3.138", "cy": "21.6", "r": "1.477" }, { "cx": "20.862", "cy": "21.6", "r": "1.477" }] } },
	  new_custom73: { "path": { "d": "M2.2 6.5h19.6c.4 0 .8-.5.7-1-.5-1.5-1.1-2.9-2-4.1-.3-.4-.8-.4-1.1-.1-.8.8-2.1 1.3-3.4 1.3-1.4 0-2.6-.6-3.5-1.5-.3-.3-.8-.3-1.1 0-.9.9-2.1 1.5-3.5 1.5-1.3 0-2.5-.5-3.4-1.3-.3-.3-.8-.2-1 .1-.9 1.2-1.6 2.7-2 4.2-.1.4.3.9.7.9zm20.9 2.9c0-.4-.3-.7-.8-.7H1.7c-.5 0-.8.3-.8.7v.2c0 6.9 4.8 12.6 11.1 13.5 6.3-.9 11.1-6.6 11.1-13.5v-.2z" } },
	  new_custom74: { "path": { "d": "M13.9 20.5h-3.8c-.4 0-.7.3-.7.7v1.1c0 .5.3.8.7.8h3.8c.4 0 .7-.3.7-.8v-1.1c0-.4-.3-.7-.7-.7zM12 .9C7.4.9 3.7 4.4 3.7 8.7c0 2.7 1.6 5.2 3.9 6.5.9.5 1.5 1.4 1.7 2.4.1.4.4.6.8.6H14c.4 0 .7-.2.7-.6.2-1 .8-1.9 1.7-2.4 2.3-1.4 3.9-3.8 3.9-6.5 0-4.3-3.7-7.8-8.3-7.8zM9.4 4.4c-.7 1.4-1.1 3-1.2 4.4 0 1.4.3 2.6.8 3.9.1.4-.2.7-.6.5C5 11.4 5.2 5.1 9 3.8c.3 0 .6.3.4.6zm2.9 8.8c-.1.3-.5.3-.7 0-.6-1.4-.7-3.1-.8-4.7.1-1.6.2-3.2.8-4.7.1-.3.6-.3.7 0 .6 1.4.8 3.1.8 4.7s-.2 3.2-.8 4.7zm3.1 0c-.3.2-.6-.1-.5-.4.5-1.4.7-2.8.8-4.2-.1-1.2-.5-2.8-1.2-4.2-.1-.2.1-.6.5-.5 3.7 1.2 3.9 7.6.4 9.3z" } },
	  new_custom75: { "path": { "d": "M12 .9c-.6 0-1.1.5-1.1 1.1v20c0 .6.5 1.1 1.1 1.1 6.1 0 11.1-5 11.1-11.1S18.1.9 12 .9zm8.8 10h-2.9c-.1-2.6-.7-4.9-1.6-6.7 2.4 1.4 4.1 3.8 4.5 6.7zm-7.7 9.5v-7.3h2.5c-.1 3.5-1.2 6.2-2.5 7.3zm0-9.5V3.6c1.3 1.1 2.4 3.8 2.5 7.3h-2.5zm3.2 8.9c.9-1.8 1.4-4.1 1.6-6.7h2.9c-.4 2.9-2.1 5.3-4.5 6.7zM5.9 8.3c.3.2.7.1 1-.1L9 5.9c.2-.3.2-.8-.1-1.1l-2-2c-.3-.3-.7-.3-.9-.1l-.5.3C2.8 5 .9 8.3.9 12s1.9 7 4.6 9l.5.3c.2.2.6.1.9-.1l2-2c.3-.3.3-.8.1-1.1l-2.1-2.3c-.3-.2-.7-.3-1-.1l-.8.6c-.8-1.2-1.2-2.7-1.2-4.3s.4-3 1.2-4.3l.8.6z" } },
	  new_custom76: { "path": { "d": "M12 14c-.1-.2-.5-.5-.8-.4h-.3c-4.2 0-7.5-3.4-7.5-7.5V6c0-.4-.5-.6-.7-.3-.3.4-.5.9-.6 1.3-.7 2.1.2 4.4 2 5.7.8.6 1.7.9 2.5 1l.3.7c.1.1.1.2.2.2l1.1.5c.2.1.3.3.2.5l-.4 1c-.1.2.1.4.2.5l.6.3c.2 0 .3.2.2.4L8.7 19c-.1.2 0 .3.2.4l.8.4c.2.1.3.3.2.5l-.3 1.1c0 .2 0 .4.2.5l2.6 1.1c.2.1.4 0 .5-.2l1.1-2.4c.1-.2.1-.4 0-.6L12 14zm9.9-.3l-6-6.2c.3-.9.3-2-.1-3-.7-2-2.5-3.4-4.7-3.6C7.9.8 5.3 3.5 5.6 6.7c.3 2.3 1.9 4.1 4.1 4.5 1 .2 2 .1 2.8-.2l.5.6c.1.1.2.1.3.1h1.3c.2 0 .4.1.4.3v1.2c0 .2.2.3.4.3h.8c.2 0 .3.2.3.4l.2 1.2c.1.2.2.3.4.3h.9c.2 0 .4.1.4.3l.2 1.2c0 .2.1.3.3.3h2.8c.3 0 .4-.1.4-.4v-2.7c.1-.2 0-.3-.2-.4zM10.1 7.2c-1.1 0-1.9-.8-1.9-1.8s.8-1.9 1.9-1.9 1.9.8 1.9 1.9-.8 1.8-1.9 1.8z" } },
	  new_custom77: { "path": { "d": "M5.3 9h1.4c.3 0 .4-.1.4-.3v-.6c0-2.8 2.1-5 4.7-5s4.7 2.2 4.7 5v.6c0 .2.2.3.4.3h1.4c.3 0 .4-.1.4-.3v-.6c0-4-3-7.2-6.9-7.2S4.9 4.1 4.9 8.1v.6c0 .2.2.3.4.3zm13.8 2.3H4.9c-1.2 0-2.1 1-2.1 2.2v7.4c0 1.2.9 2.2 2.1 2.2h14.2c1.2 0 2.1-1 2.1-2.2v-7.4c0-1.2-.9-2.2-2.1-2.2zm-5.3 5.9c-.4.5-.6 1.1-.4 1.7l.2 1.1c.1.4-.2.9-.6.9h-2.3c-.5 0-.8-.5-.7-.9l.2-1.1c.2-.6 0-1.2-.3-1.7-.3-.4-.5-1-.4-1.6.2-.9.9-1.6 1.8-1.8 1.5-.3 2.8.8 2.8 2.2 0 .4-.2.8-.3 1.2z" } },
	  new_custom78: { "path": { "d": "M22.4 4.4l-6.6-3.3c-.3-.2-.7-.2-1 0l-6.1 3-6.2-3c-.3-.2-.7-.2-1.1 0-.3.2-.5.6-.5.9v16.6c0 .5.3.9.7 1.1L8.2 23c.3.1.7.1 1 0l6.2-3.1 6.2 3.1c.1.1.3.1.4.1.2 0 .4-.1.6-.2.3-.2.5-.6.5-.9V5.4c0-.5-.3-.8-.7-1zm-1.5 2.1v8.8c0 .5-.5.9-1.1.7-1.7-.7-.3-3.5-1.5-5.1-1.2-1.4-2.7 0-4.1-2.2-1.4-2.2.5-3.8 2.1-4.6.3-.1.5-.1.7 0l3.4 1.8c.3.1.5.3.5.6zm-9.5 12.8c-.2.2-.6.1-.8-.1-.4-.4-.8-1-.8-1.7 0-1.1-1.9-.7-1.9-2.9 0-1.8-2.1-2.3-3.9-2.1-.5 0-.9-.3-.9-.8V5c0-.5.6-.9 1.1-.6l4 2h.1l.1.1c1.7 1 1.3 1.8.6 3-.7 1.3-1.1 0-2.2-.4s-2.2.4-1.8 1.1 1.5 0 2.2.7c.7.8.7 1.9 3 1.1 2.2-.7 2.5-.3 3.3.4.7.8 1.1 2.2 0 3.3-.7.7-.9 2-1.2 3-.1.2-.2.4-.4.5l-.5.1z" } },
	  new_custom79: { "path": { "d": "M8.2 8.9c-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4 2.4-1.1 2.4-2.4-1-2.4-2.4-2.4zm13.9 7.5h-6.6v-2.7h.7c.3 0 .6-.3.6-.7v-2c0-.4-.3-.7-.6-.7h-.8c-.6-3.4-3.5-6.1-7.1-6.1C4.2 4.1.9 7.4.9 11.4c.1 4 3.4 7.1 7.5 7.1H21v.7c0 .3.3.6.7.6h.7c.4 0 .7-.3.7-.6v-1.8c0-.5-.5-1-1-1zm-13.9-.7c-2.5 0-4.5-1.9-4.5-4.4s2-4.4 4.5-4.4 4.5 2 4.5 4.4-2 4.4-4.5 4.4z" } },
	  new_custom8: { "path": { "d": "M10.9 1.4L2.2 11c-.5.5-.5 1.4 0 2l8.7 9.6c.6.7 1.6.7 2.2 0l8.7-9.6c.5-.5.5-1.4 0-2l-8.7-9.6c-.6-.6-1.6-.6-2.2 0z" } },
	  new_custom80: { "path": { "d": "M4.5 15.6c-2 0-3.6 1.5-3.6 3.5s1.6 3.5 3.6 3.5S8 21 8 19.1s-1.5-3.5-3.5-3.5zm0 4.9c-.8 0-1.5-.7-1.5-1.4 0-.8.7-1.5 1.5-1.5s1.4.7 1.4 1.5c0 .7-.6 1.4-1.4 1.4zm15-4.9c-2 0-3.5 1.5-3.5 3.5s1.5 3.5 3.5 3.5 3.6-1.6 3.6-3.5-1.6-3.5-3.6-3.5zm0 4.9c-.8 0-1.4-.7-1.4-1.4 0-.8.6-1.5 1.4-1.5s1.5.7 1.5 1.5c0 .7-.7 1.4-1.5 1.4zm-.2-7.1c.8 0 1.5.1 2.3.4.3.1.7 0 .9-.4 1.8-3.4-1.1-5-3-5.9-.5-.3-1 .1-1 .6v2.1c0 .4-.3.8-.7.7-2.7-.4-5-3.1-7.9-3.1s-3.2 2.8-3.2 2.8c-2 0-4-.2-4.9-.4-.5 0-.9.3-.9.7 0 0 0 2.5 3.6 2.5 2.9 0 5.3 2.2 5.7 5.1 0 .7 0 1.5-.3 2.2-.1.2.1.5.4.5h3.3c.3 0 .5-.2.4-.5-.2-.7-.2-1.4-.2-2.1.3-2.8 2.6-5.1 5.5-5.2zM.9 10.9zm9.4-5.5c.1.3.3.6.5.6l3.8 1.3c.4.1.7 0 .9-.3l.3-.6c.2-.3 0-.5-.2-.6-1.2-.1-3.5-.5-2.8-1.7.6-1.1 1.8-.8 2.7-.5.3.2.6-.2.5-.5-.6-1.1-1.8-1.8-3.1-1.7-1.7.2-2.9 1.8-2.7 3.5l.1.5z" } },
	  new_custom81: { "path": { "d": "M21.9.9c-.3 0-1.4.1-1.8.1-5.7.2-12.2 1.7-12.5 1.8-.5.1-.8.6-.8 1v12.1c-.3-.2-.9-.3-1.4-.3-2.5 0-4.5 1.7-4.5 3.7s2 3.7 4.5 3.7 4.4-1.6 4.4-3.7v-7.5c0-.3.2-.6.5-.7 1.8-.4 4.4-.9 9-1.2.5 0 .8.3.8.8v3.8c-.3-.1-.9-.2-1.5-.2-2.4 0-4.4 1.6-4.4 3.7s2 3.6 4.4 3.6 4.5-1.6 4.5-3.6V2c0-.6-.5-1.1-1.2-1.1zm-2.5 5.9c-4.5.3-6.8.7-8.7 1.1-.5.1-.9-.2-.9-.7V6c0-.3.2-.6.6-.7 1.9-.5 4.2-.9 8.9-1.2.5 0 .8.3.8.7V6c0 .5-.3.8-.7.8z" } },
	  new_custom82: { "path": { "d": "M22.4 9.9h-7.3c-.4 0-.7.3-.7.7v.3c0 .6-.5 1.1-1.1 1.1-.5 0-1-.5-1-1.1v-.3c0-.4-.3-.7-.7-.7H9.8h.1c-2.1.1-3.9 1.3-4.8 3-.4-.2-.8-.2-1.1-.2-1.8 0-3.2 1.4-3.2 3.1s1.5 3.1 3.3 3.1c.3 0 .7 0 1.1-.2.9 1.7 2.7 2.9 4.8 3 3.3.2 6.2-2.5 6.2-5.9 0-.2 0-.4-.1-.6 0-.3.2-.7.6-.8l5.8-1.2c.3-.1.6-.4.6-.7v-1.9c0-.4-.3-.7-.7-.7zM4 16.8c-.6 0-1-.4-1-1s.4-1 1-1c.2 0 .3.1.4.1-.1.4-.1.9-.1 1.3 0 .2.1.4.1.6H4zm9.4-9.3c.6 0 1-.5 1-1V3.3c0-.5-.5-1-1-1-.6 0-1.1.5-1.1 1v3.2c0 .6.5 1 1.1 1zm-5 .3c.2.3.5.4.8.4.2 0 .5-.1.7-.3.4-.3.5-1 .1-1.4L7.9 4.1c-.4-.5-1.1-.5-1.5-.1-.4.4-.5 1-.1 1.4l2.1 2.4zm9.1.4c.3 0 .6-.2.8-.4l2.1-2.4c.4-.4.3-1.1-.1-1.4-.5-.4-1.1-.3-1.5.1l-2 2.4c-.4.5-.4 1.1 0 1.4.2.2.5.3.7.3z" } },
	  new_custom83: { "path": { "d": "M21.1 8c.1.2.4.2.5 0l.5-.5c1.3-1.2 1.3-3.2.1-4.4l-1.6-1.6c-1.3-1-3-.5-4 .5l-.5.5c-.1.1-.1.4 0 .5l5 5zm-6.7-3.5c-.1-.1-.3-.1-.5 0L3.8 14.6c-.6.6-1 1.2-1.2 2l-1.6 5c-.1.3-.1.6.1.9.2.4.6.6.9.6.1 0 .3 0 .4-.1 0 0 3.4-1 5-1.5.8-.3 1.4-.7 2-1.2l10.1-10.1c.1-.2.1-.4 0-.6l-5.1-5.1zM6.7 19.3c-.7.3-1.9.7-3 1l1-3c.1-.5.3-.8.6-1.1l2.5 2.5c-.3.3-.7.5-1.1.6z" } },
	  new_custom84: { "path": { "d": "M21 17.2H3c-.6 0-1.2.4-1.2 1.1s.5 1.1 1.2 1.1h1.4l.6 3.1c.1.3.4.6.7.6h11.9c.3 0 .6-.3.7-.6l.6-3.1H21c.6 0 1.2-.5 1.2-1.1s-.5-1.1-1.2-1.1zM5.8 15h5.1v-2.1c-.4-.3-.7-.8-.7-1.3 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4 0 .6-.3 1-.7 1.3V15h5.1c.4 0 .7-.4.7-.8v-1.1c0-2.3-2.1-3-3.8-3.7-1.1-.5-1.3-1-1.3-1.4s.3-.9.7-1.3c.7-.6 1.1-1.4 1.1-2.4 0-1.8-1.2-3.4-3.2-3.4S8.4 2.4 8.4 4.3c0 1 .4 1.8 1.1 2.4.3.4.7.8.7 1.3 0 .4-.2.9-1.3 1.4-1.7.7-3.8 1.5-3.8 3.7v1.1c0 .4.3.8.7.8z" } },
	  new_custom85: { "path": { "d": "M22.3 2.4H3.9v-.7c0-.5-.3-.8-.8-.8H1.7c-.5 0-.8.3-.8.8v20.6c0 .5.3.8.8.8h1.4c.5 0 .8-.3.8-.8V5.4h18.4c.5 0 .8-.4.8-.8V3.1c0-.4-.3-.7-.8-.7zm-1.4 5.2H8.3c-1.2 0-2.2 1-2.2 2.2v8.1c0 1.2 1 2.2 2.2 2.2h12.6c1.2 0 2.2-1 2.2-2.2V9.8c0-1.2-1-2.2-2.2-2.2zm-2.1 6.2h-.9v3.7c0 .3-.1.4-.4.4h-1.4c-.3 0-.4-.1-.4-.4v-2.2c0-.2-.1-.3-.4-.3h-1.5c-.2 0-.3.1-.3.3v2.2c0 .3-.2.4-.4.4h-1.5c-.2 0-.3-.1-.3-.4v-3.7h-1c-.1 0-.2-.2-.1-.3l4.2-4c.1-.1.3-.1.5 0l4.1 4c.1.1 0 .3-.2.3z" } },
	  new_custom86: { "path": { "d": "M7.6 4.6H9c.3 0 .4-.1.4-.4V3.1h5.2v1.1c0 .3.1.4.4.4h1.4c.3 0 .4-.1.4-.4V3.1c0-1.2-1-2.2-2.2-2.2H9.4c-1.2 0-2.2 1-2.2 2.2v1.1c0 .3.1.4.4.4zm13.3 2.2H3.1C1.9 6.8.9 7.8.9 9v11.9c0 1.2 1 2.2 2.2 2.2h17.8c1.2 0 2.2-1 2.2-2.2V9c0-1.2-1-2.2-2.2-2.2zM12 20.1c-2.9 0-5.2-2.3-5.2-5.1S9.1 9.8 12 9.8s5.2 2.3 5.2 5.2-2.3 5.1-5.2 5.1zm2.2-6.3h-1.1v-1.1c0-.4-.3-.7-.7-.7h-.8c-.4 0-.7.3-.7.7v1.1H9.8c-.4 0-.8.4-.8.8v.7c0 .4.4.8.8.8h1.1v1.1c0 .4.3.7.7.7h.8c.4 0 .7-.3.7-.7v-1.1h1.1c.4 0 .8-.4.8-.8v-.7c0-.4-.4-.8-.8-.8z" } },
	  new_custom87: { "path": { "d": "M21 .9H3c-.7 0-1.2.5-1.2 1.1v17.8c0 .6.5 1.1 1.2 1.1h.3V22c0 .6.5 1.1 1.1 1.1h.8c.6 0 1.1-.5 1.1-1.1v-1.1h11.6V22c0 .6.4 1.1 1.1 1.1h.7c.6 0 1.1-.5 1.1-1.1v-1.1h.4c.6 0 1.1-.5 1.1-1.1V2c-.1-.6-.6-1.1-1.3-1.1zM5.1 18.6c-.6 0-1.1-.4-1.1-1.1V4.2c0-.6.5-1.1 1.1-1.1h13.8c.6 0 1.1.5 1.1 1.1v13.3c0 .7-.4 1.1-1.1 1.1H5.1zm12-13.2H6.9c-.4 0-.7.3-.7.7v9.6c0 .4.3.7.7.7h10.2c.4 0 .7-.3.7-.7V6.1c0-.4-.3-.7-.7-.7zM15.4 12h-3c-.4.7-1.3 1.5-2.3 1.5-1.4 0-2.4-1.2-2.4-2.6s1.1-2.6 2.4-2.6c1 0 1.9.7 2.3 1.5h2.9c.6 0 1 .5 1 1.1 0 .5-.4 1.1-.9 1.1z" } },
	  new_custom88: { "path": { "d": "M22.4 19.4H1.6c-.4 0-.7.3-.7.6v.1c0 1.6 2.1 3 3.7 3h14.8c1.6 0 3.7-1.4 3.7-3V20c0-.3-.3-.6-.7-.6zM2 17.2h6.7c.4 0 .7-.4.7-.9V3.6c0-.1-.3-.2-.3 0l-7.4 13c-.1.2.1.6.3.6zm10.4 0h9.2c.5 0 .8-.4.7-.9C22 13.7 21.6 5.4 12.1 1c-.2-.1-.5 0-.5.3v15c0 .5.4.9.8.9z" } },
	  new_custom89: { "path": { "d": "M14.9 9.6c-.1-.2-.5-.2-.5 0-.5.7-.9 1.6-.9 2.8v4c0 .6-.5 1.1-1.1 1.1-.6 0-1.1-.4-1.1-1.1V3.8C11.3 1 8.8.6 7 1.2c-.5.2-1 .5-1.3.9-.2.3-.4.4-.8.6-.7.1-1.8-.5-2.4-.9-.3-.1-.8 0-1 .2l-.4.7c-.3.3-.2.8.1 1C1.9 4.2 3 4.9 3.9 5c1.3.3 2.5-.2 3.4-1 .3-.2.7-.6 1-.2.7 1.1-2.2 6-2.2 13v.6c0 3 3 5.6 6 5.7 3.2.2 5.8-2.4 5.8-5.5 0-1.6.6-2.6 1.2-3.2.1-.2.1-.4 0-.6l-4.2-4.2zm7.1 3.5c-.3 0-.6-.1-.8-.4l-5.9-5.8c-.5-.5-.5-1.2 0-1.6.4-.5 1.1-.5 1.5 0l6 5.9c.4.5.4 1.2 0 1.6-.3.2-.6.3-.8.3z" } },
	  new_custom9: { "path": { "d": "M22.8 8C21.8 3.6 17.2.9 12.1.9 5.9.9.9 5.9.9 12s5 11.1 11.2 11.1c8.6 0 7.9-4.4 5.2-6.1-1.7-1-2.5-3.3-.9-5 3-3.1 7.8 1.8 6.4-4zM6 15.7c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zm.5-8.8c0-1.3 1-2.3 2.3-2.3s2.3 1 2.3 2.3-1 2.3-2.3 2.3-2.3-1-2.3-2.3zm5 13.4c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zm4.2-12c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3S18 4.7 18 6s-1 2.3-2.3 2.3z" } },
	  new_custom90: { "path": { "d": "M22.1 3.2l-9 1.3v12.7c0 .2-.1.3-.4.3h-1.4c-.3 0-.4-.1-.4-.3V4.8L2.2 6.1h-.1c-.6 0-1-.4-1.1-.9-.1-.6.3-1.2.8-1.3l6.9-1C9.4 1.8 10.6 1 12 1c1 0 1.9.4 2.5 1l7.3-1c.6-.1 1.2.3 1.2.9.1.6-.2 1.1-.9 1.3zM8.8 16.8c.3-.4.3-.8.2-1.2l-3-7c-.1-.4-.6-.6-1-.6s-.8.2-1 .6l-3 7c-.1.4-.1.7.1 1.1.1.1 1.5 2.3 3.8 2.3 1.4 0 2.7-.8 3.9-2.2zM5 11.9l1.6 3.8H3.4L5 11.9zm15-5.5c-.2-.4-.6-.6-1-.6s-.8.2-1 .6l-3 7c-.1.4 0 .7.1 1 .1.1 1.6 2.4 3.9 2.4 1.4 0 2.6-.8 3.8-2.3.3-.3.4-.7.2-1.1l-3-7zm-1 3.3l1.6 3.8h-3.2L19 9.7zm-7 10.1c-2.1 0-4.2.7-5.6 1.9-.2.2-.3.4-.3.6 0 .5.3.8.7.8h10.4c.4 0 .7-.3.7-.8 0-.2-.1-.4-.3-.6-1.4-1.2-3.5-1.9-5.6-1.9z" } },
	  new_custom91: { "path": { "d": "M22.3 5.6c-1.1-.3-2.1-1.1-2.7-2.1-.5-.8-.5-2.6-1.7-2.6H6.1C4.9.9 4.9 2.7 4.4 3.5 3.6 4.7 2.7 5 1.5 5.7c-1.2.7-.1 3.6.2 4.7C2.8 14.5 5 18.3 8.4 21c1 .8 2 1.4 3.1 2 1 .5 2.7-.9 3.4-1.5 1.9-1.4 3.5-3.1 4.8-5.1 1-1.7 1.9-3.5 2.5-5.4l.6-2.4c.1-.6.4-1.7.2-2.3-.1-.3-.4-.6-.7-.7-1.7-.5.5.1 0 0zm-1.6 2.6c-1 4.9-3.7 9.5-8.1 12.2l-.6.4-.6-.4C6.1 17.2 4.1 12 3.3 8.1l-.1-.7.7-.4C5 6.3 6.1 5 6.7 3.7l.3-.6h10l.2.5c.6 1.3 1.7 2.7 3.1 3.5l.5.2v.1l-.1.8zm-9.1-2.8c-.8 0-2.9 0-3.3.3-.7.7-1.1 1.6-1.8 2.2-.8.6-.5 1.3-.2 2.2.5 1.6 1.2 3.1 2.2 4.4.5.7 1 1.4 1.7 2 .1.2 1.8 1.9 1.8.8V6.1c0-.4 0-.7-.4-.7z" } },
	  new_custom92: { "path": { "d": "M20.8 14.4l-8.4-3.9c-.3-.1-.5-.1-.7 0l-8.5 3.9c-.4.2-.6.7-.3 1.2.9 1.2 1.4 2.8 1.7 3.6.1.2.3.4.6.5 2.9.7 5.3 2.4 6.3 3.1.3.3.7.3 1 0 1-.7 3.4-2.4 6.3-3.1.3-.1.5-.3.6-.5.3-.8.8-2.4 1.7-3.6.3-.4.1-1-.3-1.2zm-11 2c-.7 0-1.1-.6-1.1-1.4 0-.9.4-1.5 1.1-1.5s1.1.6 1.1 1.5c0 .8-.5 1.4-1.1 1.4zm4.4 0c-.6 0-1.1-.6-1.1-1.4 0-.9.5-1.5 1.1-1.5s1.1.6 1.1 1.5c0 .8-.4 1.4-1.1 1.4zm-8-5.8l4.6-2.1c.5-.3 1.1-.3 1.7-.2.3 0 .5.1.8.2l4.5 2.1c.2.1.5-.1.5-.3V8.6c0-.2-.1-.3-.3-.5-.2-.3-.8-.9-1.9-.9V5.1c0-.3-.2-.5-.4-.7-.4-.2-1.1-.5-2.2-.7v-2c0-.5-.3-.8-.8-.8h-1.4c-.5 0-.8.3-.8.8v1.9c-1.1.2-1.8.6-2.2.8-.2.1-.4.4-.4.6v2.2c-1.1 0-1.7.6-1.9.8-.2.2-.3.4-.3.5v1.7c0 .3.3.5.5.4z" } },
	  new_custom93: { "g": { "path": { "d": "M9.3 12h11c.3 0 .7-.2.7-.6l2-6.8c.2-.5-.2-1-.7-1h-17l-.3-1c-.2-.4-.6-.8-1.1-.8H2.1c-.6 0-1.1.5-1.2 1.1C.9 3.5 1.4 4 2 4h1.1l3.5 11.6c.1.4.6.7 1.1.7h13c.6 0 1.1-.4 1.2-1 0-.6-.5-1.1-1.1-1.1H9.3c-.5 0-.9-.4-1-.8-.3-.7.3-1.4 1-1.4z" }, "ellipse": [{ "cx": "9.508", "cy": "20.354", "rx": "1.846", "ry": "1.8" }, { "cx": "18.508", "cy": "20.354", "rx": "1.846", "ry": "1.8" }] } },
	  new_custom94: { "path": { "d": "M14.2 7.6V2c0-.6-.4-1.1-1.1-1.1h-1.5c-.6 0-1.1.5-1.1 1.1s.5 1.1 1.1 1.1h.4v4.5C12 10 10 12 7.6 12s-4.5-2-4.5-4.4V3.1h.4c.7 0 1.1-.4 1.1-1.1S4.2.9 3.5.9H2C1.4.9.9 1.4.9 2v5.6c0 3.6 3 6.6 6.7 6.6s6.6-3 6.6-6.6zm8.9 4.4c0-1.8-1.5-3.3-3.3-3.3s-3.4 1.5-3.4 3.3c0 1.4 1 2.7 2.2 3.1v.9c0 2.6-2.2 4.9-4.8 4.9h-.1c-2.3 0-4.3-1.7-4.8-3.9-.1-.3-.4-.6-.8-.6h-.7c-.5 0-.8.5-.8.9.6 3.3 3.6 5.8 7 5.8h.1c3.9 0 7.1-3.3 7.1-7.1v-.9c1.4-.4 2.3-1.7 2.3-3.1zm-3.3 1.1c-.7 0-1.2-.5-1.2-1.1s.5-1.1 1.2-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1z" } },
	  new_custom95: { "path": { "d": "M13.1 4.7V3.1h.4c.6 0 1.1-.4 1.1-1.1 0-.6-.5-1.1-1.1-1.1h-3c-.6 0-1.1.5-1.1 1.1 0 .6.5 1.1 1.1 1.1h.4v1.6c-4.6.6-8.1 4.4-8.1 9.1 0 5.1 4.1 9.3 9.2 9.3s9.2-4.2 9.2-9.3c0-4.7-3.5-8.5-8.1-9.1zM12 20.9c-3.9 0-7-3.2-7-7.1s3.1-7 7-7 7 3.2 7 7-3.1 7.1-7 7.1zm2.4-10.8l-1.7 1.7c-.2-.1-.4-.2-.7-.2-1.2 0-2.2 1-2.2 2.2s1 2.3 2.2 2.3 2.2-1.1 2.2-2.3c0-.2 0-.5-.1-.7l1.7-1.7c.4-.4.4-1 0-1.3-.4-.4-1-.4-1.4 0z" } },
	  new_custom96: { "path": { "d": "M22.8 4.2l-1.9-1.5c-.3-.2-.5-.3-.9-.3h-6.5v-.7c0-.5-.3-.8-.8-.8h-1.4c-.5 0-.8.3-.8.8v.7H3.1c-.4 0-.7.3-.7.7v3c0 .4.3.7.7.7H20c.4 0 .7-.1.9-.2l1.9-1.5c.4-.3.4-.7 0-.9zm-1.9 6.3h-7.4V9.4c0-.2-.2-.4-.4-.4h-2.2c-.2 0-.4.2-.4.4v1.1H4c-.4 0-.7.1-.9.3l-1.9 1.4c-.4.3-.4.7 0 1l1.9 1.4c.3.2.5.3.9.3h16.9c.4 0 .7-.3.7-.7v-3c0-.4-.3-.7-.7-.7zM13.5 20v-2.5c0-.2-.2-.3-.4-.3h-2.2c-.2 0-.4.1-.4.3V20c-1.5.4-2.3 1.3-2.5 2.4-.1.3.2.7.5.7h7c.4 0 .7-.3.6-.7-.3-1.1-1.1-2-2.6-2.4z" } },
	  new_custom97: { "path": { "d": "M15.8 13.5V4.8c0-2.2-1.7-3.9-3.8-3.9-2.2 0-3.8 1.7-3.8 3.9v8.7c-1.1 1.1-1.7 2.5-1.7 4 0 3.1 2.5 5.6 5.5 5.6s5.5-2.5 5.5-5.6c0-1.5-.6-2.9-1.7-4zm-.9 4H9.1c-.3 0-.6-.3-.5-.6.1-.8.6-1.6 1.2-2.1.3-.2.4-.5.4-.8V4.8C10.2 3.7 11 3 12 3s1.7.8 1.7 1.8v.3h-1c-.6 0-1 .4-1 1s.4 1 1 1h1v1.4h-1c-.6 0-1 .5-1 1s.4 1 1 1h1v1.4h-1c-.6 0-1 .5-1 1s.4 1 1 1h1c.1.4.2.6.4.8.7.5 1.1 1.3 1.3 2.1.1.4-.2.7-.5.7z" } },
	  new_custom98: { "g": { "path": [{ "d": "M22.9 10.2l-2.7-2.7c-.2-.2-.4-.3-.5-.3h-2.8c-.4 0-.7.4-.7.7v5.6c0 .3.2.4.5.3.5-.2 1-.3 1.6-.3 1.5 0 2.9.9 3.6 2.2.1.2.4.2.5.1.4-.4.7-.9.7-1.6v-3.5c0-.2-.1-.4-.2-.5z" }, { "d": "M13.4 4.2H1.6c-.4 0-.7.3-.7.6v9.5c0 .6.3 1.2.7 1.5.2.2.4.1.5-.1.7-1.3 2.1-2.1 3.7-2.1 1.7 0 3.2 1 3.8 2.6 0 .1.2.2.3.2H12c1.2 0 2.1-.9 2.1-2.1V4.8c0-.3-.3-.6-.7-.6z" }], "ellipse": [{ "cx": "18.231", "cy": "17.769", "rx": "2.077", "ry": "2.077" }, { "cx": "5.769", "cy": "17.769", "rx": "2.077", "ry": "2.077" }] } },
	  new_custom99: { "path": { "d": "M20.9 7.7h-6.2c-.2-.5-.5-.8-.8-1.1l2.3-3c.4-.5.3-1.2-.2-1.5-.4-.4-1.2-.3-1.6.2l-2.5 3.2h-1.2L8.1 2.3c-.4-.5-1.1-.6-1.6-.2s-.5 1-.1 1.5l2.3 3c-.3.3-.6.6-.8 1.1H3.1C1.9 7.7.9 8.6.9 9.8V20c0 1.2 1 2.2 2.2 2.2h17.8c1.2 0 2.2-1 2.2-2.2V9.8c0-1.2-1-2.1-2.2-2.1zm-3 11.5c0 .5-.3.8-.7.8H3.9c-.4 0-.8-.3-.8-.8v-8.6c0-.4.4-.8.8-.8h13.3c.4 0 .7.4.7.8v8.6zm2.6-3.6c-.7 0-1.1-.4-1.1-1.1s.4-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1zm0-3.6c-.7 0-1.1-.5-1.1-1.1 0-.6.4-1.1 1.1-1.1s1.1.5 1.1 1.1c0 .6-.5 1.1-1.1 1.1z" } },
	  new_event: { "path": { "d": "M21.5 9.2h-19c-.3 0-.7.4-.7.7v11.3c0 1 .9 1.9 1.9 1.9h16.6c1 0 1.9-.9 1.9-1.9V9.9c0-.3-.4-.7-.7-.7zM8.8 19.4c0 .3-.2.4-.5.4H6.5c-.3 0-.5-.1-.5-.4v-1.9c0-.2.2-.4.5-.4h1.8c.3 0 .5.2.5.4v1.9zm0-4.6c0 .2-.2.4-.5.4H6.5c-.3 0-.5-.2-.5-.4v-1.9c0-.3.2-.4.5-.4h1.8c.3 0 .5.1.5.4v1.9zm4.6 4.6c0 .3-.2.4-.5.4h-1.8c-.3 0-.5-.1-.5-.4v-1.9c0-.2.2-.4.5-.4h1.8c.3 0 .5.2.5.4v1.9zm0-4.6c0 .2-.2.4-.5.4h-1.8c-.3 0-.5-.2-.5-.4v-1.9c0-.3.2-.4.5-.4h1.8c.3 0 .5.1.5.4v1.9zm4.6 4.6c0 .3-.2.4-.5.4h-1.8c-.3 0-.5-.1-.5-.4v-1.9c0-.2.2-.4.5-.4h1.8c.3 0 .5.2.5.4v1.9zm0-4.6c0 .2-.2.4-.5.4h-1.8c-.3 0-.5-.2-.5-.4v-1.9c0-.3.2-.4.5-.4h1.8c.3 0 .5.1.5.4v1.9zm2.3-11.6H18v-.9c0-.7-.6-1.4-1.4-1.4-.7 0-1.4.6-1.4 1.4v.9H8.8v-.9c0-.7-.6-1.4-1.4-1.4C6.6.9 6 1.5 6 2.3v.9H3.7c-1 0-1.9.9-1.9 1.9v1.1c0 .4.4.7.7.7h19c.3 0 .7-.3.7-.7V5.1c0-1-.9-1.9-1.9-1.9z" } },
	  new_group: { "path": { "d": "M7.3 12.9c-.7-.9-1-2.1-1-3.3 0-2.1.9-3.9 2.3-4.9-.5-.9-1.4-1.5-2.6-1.5-2 0-3.2 1.7-3.2 3.6 0 1 .3 1.9 1 2.5.4.3.7.8.7 1.3 0 .4-.2.9-1.3 1.4-1.7.7-3.2 1.8-3.2 3.3 0 1 .6 1.8 1.6 1.8h1.5c.3 0 .5-.2.6-.4.8-1.3 2.2-2.2 3.3-2.8.4-.1.5-.7.3-1zm13.5-.9c-1.2-.5-1.4-.9-1.4-1.4s.4-1 .7-1.3c.7-.7 1-1.5 1-2.5 0-1.9-1.1-3.6-3.1-3.6-1.2 0-2.2.6-2.7 1.5 1.4 1 2.3 2.8 2.3 4.9 0 1.2-.3 2.4-1 3.3-.2.4-.1.9.3 1 1.1.6 2.5 1.5 3.3 2.8.1.2.3.4.6.4h1.5c1 0 1.6-.8 1.6-1.8.1-1.5-1.5-2.6-3.1-3.3zM15 15.4c-1.2-.6-1.4-1.1-1.4-1.6 0-.6.3-1.1.8-1.4.7-.7 1.1-1.7 1.1-2.8 0-2.1-1.2-3.9-3.5-3.9S8.5 7.5 8.5 9.6c0 1.1.4 2.1 1.1 2.8.5.4.8.9.8 1.4 0 .6-.2 1-1.4 1.6-1.9.8-3.6 1.6-3.7 3.3 0 1.1.8 2 1.9 2h9.6c1.1 0 1.9-.9 1.9-2-.1-1.7-1.8-2.5-3.7-3.3z" } },
	  new_lead: { "circle": { "cx": "12", "cy": "4.246", "r": "3.323" }, "path": { "d": "M22.3 9.8H1.7c-.8 0-1.1.9-.5 1.3l5.4 3.5c.3.2.5.5.3.8l-2 6.8c-.2.7.8 1.2 1.3.6l5.3-5.5c.3-.3.8-.3 1.1 0l5.3 5.5c.5.6 1.4.1 1.3-.6l-2.1-6.8c-.1-.3 0-.7.3-.9l5.4-3.4c.6-.4.3-1.3-.5-1.3z" } },
	  new_note: { "path": { "d": "M19.1 18.3l-.4.4c-.5.5-1.1.7-1.7.7h-1.2c-1.1 0-2.3-.8-2.3-2.4v-1.1c0-.9.4-1.5.6-1.8l5-5.1c.1-.1.3-.5.3-.6V4.5c0-1.2-1-2.2-2.2-2.2H5.4c-1.2 0-2.3 1.1-2.3 2.2h-.7C1.6 4.5.9 5.2.9 6s.7 1.5 1.5 1.5h.7v3h-.7c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h.7v3h-.7c-.8 0-1.5.7-1.5 1.5s.7 1.4 1.5 1.4h.7c0 1.5 1.1 2.2 2.3 2.2h11.8c1.2 0 2.2-1 2.2-2.2v-.9c0-.3-.1-.3-.3-.2zM15.3 7.9c0 .4-.3.7-.7.7H7.2c-.4 0-.7-.3-.7-.7v-.7c0-.5.3-.8.7-.8h7.4c.4 0 .7.3.7.8v.7zM12 16.8c0 .5-.3.8-.7.8H7.2c-.4 0-.7-.3-.7-.8v-.7c0-.4.3-.7.7-.7h4.1c.4 0 .7.3.7.7v.7zm1.1-4.4c0 .4-.3.7-.7.7H7.2c-.4 0-.7-.3-.7-.7v-.8c0-.4.3-.7.7-.7h5.2c.4 0 .7.3.7.7v.8zm9.7-2.1l-.4-.4c-.3-.3-.8-.3-1 0l-5.7 5.8V17c0 .1 0 .2.1.2h1.3l5.7-5.8c.4-.3.4-.7 0-1.1z" } },
	  new_notebook: { "path": { "d": "M20.3.9H6.5c-1.1 0-1.9.9-1.9 1.9v1.4H3.2c-.8 0-1.4.6-1.4 1.3s.6 1.4 1.4 1.4h1.4v3.7H3.2c-.8 0-1.4.6-1.4 1.4s.6 1.4 1.4 1.4h1.4v3.7H3.2c-.8 0-1.4.6-1.4 1.4s.6 1.3 1.4 1.3h1.4v1.4c0 1 .8 1.9 1.9 1.9h13.8c1 0 1.9-.9 1.9-1.9V2.8c0-1-.9-1.9-1.9-1.9zm-3.2 15.7c0 .3-.2.5-.5.5h-6.4c-.3 0-.5-.2-.5-.5v-.9c0-.3.2-.5.5-.5h6.4c.3 0 .5.2.5.5v.9zm.9-3.7c0 .3-.2.5-.5.5H9.2c-.2 0-.4-.2-.4-.5V12c0-.3.2-.5.4-.5h8.3c.3 0 .5.2.5.5v.9zm.9-4.6c0 .3-.2.5-.4.5H8.3c-.3 0-.5-.2-.5-.5V5.5c0-.2.2-.4.5-.4h10.2c.2 0 .4.2.4.4v2.8z" } },
	  new_opportunity: { "path": { "d": "M19.3 18.9H4.7c-.4 0-.6.3-.6.7 0 1.2.9 2.1 2 2.1h11.8c1.2 0 2.1-.9 2.1-2.1-.1-.4-.3-.7-.7-.7zM21 4.7c-1.2 0-2.1.9-2.1 2.1 0 .6.3 1.2.8 1.6-.6 1.3-2 2.2-3.5 2.2-1.9-.1-3.4-1.6-3.5-3.4 0-.4 0-.6.1-.9.8-.3 1.3-1 1.3-2 0-1.1-.9-2-2.1-2s-2.1.9-2.1 2.1c0 .9.6 1.6 1.3 1.9.1.3.1.6.1.9-.1 1.8-1.6 3.3-3.4 3.4-1.6.1-3-.9-3.6-2.2.5-.4.8-1 .8-1.6 0-1.1-.9-2-2.1-2s-2.1.9-2.1 2S1.8 8.9 3 8.9l1 7.4c0 .3.3.5.6.5h14.8c.3 0 .6-.2.6-.5l1-7.4c1.2 0 2.1-.9 2.1-2.1s-.9-2.1-2.1-2.1z" } },
	  new_task: { "path": { "d": "M11.1 3.2l-.8-.8c-.2-.2-.6-.2-.8 0L4.6 7.3l-2-1.9c-.2-.3-.5-.3-.8 0l-.7.7c-.3.3-.3.6 0 .8l2.7 2.7c.2.3.5.4.8.4.2 0 .5-.1.8-.4L11.1 4c.2-.2.2-.5 0-.8zm11.2 5.3h-9.6c-.4 0-.7-.3-.7-.7V6.3c0-.4.3-.8.7-.8h9.6c.5 0 .8.4.8.8v1.5c0 .4-.3.7-.8.7zm0 6.6H10.5c-.4 0-.8-.3-.8-.7v-1.5c0-.4.4-.8.8-.8h11.8c.5 0 .8.4.8.8v1.5c0 .4-.3.7-.8.7zM6 15.1H4.5c-.4 0-.7-.3-.7-.7v-1.5c0-.4.3-.8.7-.8H6c.4 0 .7.4.7.8v1.5c.1.4-.3.7-.7.7zm0 6.6H4.5c-.4 0-.7-.3-.7-.7v-1.5c0-.4.3-.8.7-.8H6c.4 0 .7.4.7.8V21c.1.4-.3.7-.7.7zm16.3 0H10.5c-.4 0-.8-.3-.8-.7v-1.5c0-.4.4-.8.8-.8h11.8c.5 0 .8.4.8.8V21c0 .4-.3.7-.8.7z" } },
	  password_unlock: { "path": { "d": "M4.6 8.4v.1-.1zm14.8 2.2h-12V8.4c0-2.4 1.8-4.6 4.3-4.7 2.2-.1 4.1 1.3 4.7 3.3.1.2.3.4.5.4h1.9c.3 0 .5-.3.4-.6-.7-3.5-3.8-6.1-7.6-5.9-3.9.2-6.9 3.6-7 7.5v2.2c-1 0-1.8.8-1.8 1.9v8.7c0 1 .8 1.9 1.8 1.9h14.8c1 0 1.8-.9 1.8-1.9v-8.7c0-1.1-.8-1.9-1.8-1.9zm-5.3 9.1c.1.3-.1.6-.4.6h-3.4c-.3 0-.6-.3-.5-.6l.9-2.8c-.7-.4-1.1-1.3-1-2.2.2-.9.9-1.5 1.8-1.7 1.5-.3 2.8.8 2.8 2.1 0 .8-.4 1.5-1 1.8l.8 2.8z" } },
	  preview: { "path": { "d": "M23.9 11.6C21.7 7.2 17.2 4.2 12 4.2S2.3 7.2.1 11.6c-.1.3-.1.6 0 .8 2.2 4.4 6.7 7.4 11.9 7.4s9.7-3 11.9-7.4c.1-.3.1-.5 0-.8zM12 17.1c-2.8 0-5.1-2.3-5.1-5.1S9.2 6.9 12 6.9s5.1 2.3 5.1 5.1-2.3 5.1-5.1 5.1zm0-8.3c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2 3.2-1.4 3.2-3.2-1.4-3.2-3.2-3.2z" } },
	  priority: { "path": { "d": "M4.2 1.6c0-.4-.4-.7-.7-.7H2.1c-.4 0-.7.3-.7.7v20.8c0 .4.3.7.7.7h1.4c.3 0 .7-.3.7-.7V1.6zm17.7 2c-7.4 3.8-6.5-4.1-15.4-1-.3.1-.5.4-.5.6V14c0 .3.3.5.6.4 8.9-3 7.9 5.2 15.6.8.3-.1.4-.3.4-.6V3.9c0-.3-.4-.5-.7-.3z" } },
	  question_post_action: { "path": { "d": "M13.1 17.5h-2.3c-.4 0-.6-.2-.6-.6v-.7c0-1.9 1.2-3.7 3-4.3.6-.2 1.1-.5 1.5-1 2.3-2.8.2-6.1-2.6-6.2-1 0-1.9.3-2.7 1-.6.6-1 1.3-1 2.1-.1.2-.4.5-.7.5H5.4c-.5 0-.8-.4-.7-.8.1-1.7.9-3.3 2.2-4.5C8.4 1.6 10.2.8 12.3.9c3.8.1 6.9 3.3 7.1 7.1.1 3.2-1.9 6.1-4.9 7.2-.4.2-.7.5-.7 1v.6c0 .5-.3.7-.7.7zm.7 4.9c0 .4-.3.7-.6.7h-2.4c-.3 0-.6-.3-.6-.7v-2.3c0-.4.3-.7.6-.7h2.4c.3 0 .6.3.6.7v2.3z" } },
	  quote: { "path": { "d": "M16.2 10.6H7.8c-.2 0-.4.2-.4.5v1.4c0 .2.2.4.4.4h8.4c.2 0 .4-.2.4-.4v-1.4c0-.3-.2-.5-.4-.5zm-1 4.2H8.8c-.3 0-.5.2-.5.4v1.4c0 .3.2.5.5.5h6.4c.3 0 .5-.2.5-.5v-1.4c0-.2-.2-.4-.5-.4zm5.9-9.1l-4.4-4.3c-.4-.3-.8-.5-1.3-.5H8.6c-.5 0-.9.2-1.3.5L2.9 5.7c-.4.3-.6.8-.6 1.3v14.2c0 1 .8 1.9 1.9 1.9h15.6c1.1 0 1.9-.9 1.9-1.9V7c0-.5-.2-1-.6-1.3zM12 2.3c1 0 1.8.8 1.8 1.9S13 6 12 6s-1.8-.8-1.8-1.8.8-1.9 1.8-1.9zm6.9 17.3c0 .4-.3.7-.7.7H5.8c-.4 0-.7-.3-.7-.7V8.1c0-.4.3-.7.7-.7h12.4c.4 0 .7.3.7.7v11.5z" } },
	  record: { "path": { "d": "M8 5.4h8c.4 0 .8-.4.8-.8V3.1c0-1.2-1-2.2-2.2-2.2H9.5c-1.2 0-2.2 1-2.2 2.2v1.5c0 .4.3.8.7.8zm12-2.6h-.8c-.2 0-.3.1-.3.3v1.5c0 1.6-1.3 3-2.9 3H8c-1.6 0-2.9-1.4-2.9-3V3.1c0-.2-.1-.3-.3-.3H4c-1.2 0-2.2 1-2.2 2.2v15.9c0 1.2 1 2.2 2.2 2.2h16c1.2 0 2.2-1 2.2-2.2V5c0-1.2-1-2.2-2.2-2.2zM8 18.6c0 .5-.3.8-.7.8h-.7c-.5 0-.8-.3-.8-.8v-.7c0-.4.3-.7.8-.7h.7c.4 0 .7.3.7.7v.7zM8 15c0 .4-.3.7-.7.7h-.7c-.5 0-.8-.3-.8-.7v-.8c0-.4.3-.7.8-.7h.7c.4 0 .7.3.7.7v.8zm0-3.7c0 .4-.3.7-.7.7h-.7c-.5 0-.8-.3-.8-.7v-.8c0-.4.3-.7.8-.7h.7c.4 0 .7.3.7.7v.8zm10.2 7.3c0 .5-.3.8-.8.8h-7.2c-.4 0-.7-.3-.7-.8v-.7c0-.4.3-.7.7-.7h7.2c.5 0 .8.3.8.7v.7zm0-3.6c0 .4-.3.7-.8.7h-7.2c-.4 0-.7-.3-.7-.7v-.8c0-.4.3-.7.7-.7h7.2c.5 0 .8.3.8.7v.8zm0-3.7c0 .4-.3.7-.8.7h-7.2c-.4 0-.7-.3-.7-.7v-.8c0-.4.3-.7.7-.7h7.2c.5 0 .8.3.8.7v.8z" } },
	  refresh: { "path": { "d": "M21.5 1.8h-1.4c-.4 0-.7.4-.7.7v3.3c0 .4-.2.6-.6.3-.1-.2-.2-.3-.4-.5-2.3-2.3-5.6-3.2-8.9-2.6-1.1.2-2.3.7-3.2 1.3-2.8 1.9-4.5 4.9-4.5 8.1 0 2.5.9 5 2.7 6.8 1.8 1.9 4.3 3 7 3 2.3 0 4.6-.8 6.3-2.3.3-.3.3-.7.1-1l-1-1c-.2-.2-.7-.3-.9 0-1.7 1.3-4 1.9-6.2 1.3-.6-.1-1.2-.4-1.8-.7-2.6-1.6-3.8-4.7-3.1-7.7.1-.6.4-1.2.7-1.8 1.3-2.2 3.6-3.5 6-3.5 1.8 0 3.6.8 4.9 2.1.2.2.4.4.5.6.2.4-.2.6-.6.6h-3.2c-.4 0-.7.3-.7.7v1.4c0 .4.3.6.7.6h8.4c.3 0 .6-.2.6-.6V2.5c0-.3-.4-.7-.7-.7z" } },
	  reject: { "path": { "d": "M14.6 11.9l6-6c.3-.3.3-.7 0-1l-.9-1c-.3-.3-.7-.3-1 0L12.6 10c-.1.2-.4.2-.6 0L6 3.9c-.3-.3-.7-.3-1 0l-1 .9c-.3.3-.3.7 0 1l6.1 6.1c.1.1.1.4 0 .6L4 18.6c-.3.3-.3.7 0 1l.9.9c.3.3.7.3 1 0l6.1-6c.2-.2.5-.2.6 0l6.1 6c.3.3.7.3 1 0l.9-.9c.3-.3.3-.7 0-1l-6-6c-.2-.2-.2-.5 0-.7z" } },
	  remove: { "path": { "d": "M14.6 11.9l6-6c.3-.3.3-.7 0-1l-.9-1c-.3-.3-.7-.3-1 0L12.6 10c-.1.2-.4.2-.6 0L6 3.9c-.3-.3-.7-.3-1 0l-1 .9c-.3.3-.3.7 0 1l6.1 6.1c.1.1.1.4 0 .6L4 18.6c-.3.3-.3.7 0 1l.9.9c.3.3.7.3 1 0l6.1-6c.2-.2.5-.2.6 0l6.1 6c.3.3.7.3 1 0l.9-.9c.3-.3.3-.7 0-1l-6-6c-.2-.2-.2-.5 0-.7z" } },
	  reset_password: { "path": { "d": "M21.5 1.8h-1.4c-.4 0-.7.4-.7.7v3.3c0 .4-.2.6-.6.3-.1-.2-.2-.3-.4-.5-2.3-2.3-5.6-3.2-8.9-2.6-1.1.2-2.3.7-3.2 1.3-2.8 1.9-4.5 4.9-4.5 8.1 0 2.5.9 5 2.7 6.8 1.8 1.9 4.3 3 7 3 2.3 0 4.6-.8 6.3-2.3.3-.3.3-.7.1-1l-1-1c-.2-.2-.7-.3-.9 0-1.7 1.3-4 1.9-6.2 1.3-.6-.1-1.2-.4-1.8-.7-2.6-1.6-3.8-4.7-3.1-7.7.1-.6.4-1.2.7-1.8 1.3-2.2 3.6-3.5 6-3.5 1.8 0 3.6.8 4.9 2.1.2.2.4.4.5.6.2.4-.2.6-.6.6h-3.2c-.4 0-.7.3-.7.7v1.4c0 .4.3.6.7.6h8.4c.3 0 .6-.2.6-.6V2.5c0-.3-.4-.7-.7-.7z" } },
	  share_file: { "path": { "d": "M18.9 7.4h3.6c.2 0 .3-.2.2-.4l-3.8-3.9c-.2-.1-.4 0-.4.2v3.6c0 .3.1.5.4.5zm3.7 1.8h-5.1c-.5 0-.9-.4-.9-.9V3.2c0-.2-.2-.4-.4-.4H9.9c-.3 0-.7.3-.7.7v1.8c0 .2.1.4.2.5L12 8.4c.4.4.6.9.7 1.4.1.8-.1 1.5-.6 2l-.7.7c-.3.2-.5.3-.8.5.3.1.7.2 1.1.2 1.2.1 2.1 1.2 2.1 2.4v1c0 .7-.3 1.3-.7 1.7-.5.5-1.2.7-1.8.6-.5 0-1-.1-1.5-.2-.3-.1-.6.1-.6.5v1.4c0 .4.4.7.7.7h12.5c.4 0 .7-.3.7-.7V9.7c0-.3-.2-.5-.5-.5zM12 16.6v-1c0-.3-.2-.5-.5-.6-2.5-.2-4.6-2.3-4.6-4.9v-.6c0-.3.4-.5.6-.2l1.8 1.8c.2.2.5.2.7 0l.7-.7c.2-.2.2-.5 0-.7L6.2 5.3c-.2-.2-.5-.2-.7 0L1.1 9.7c-.2.2-.2.5 0 .7l.7.7c.1.2.5.3.6.1l2-1.9c.2-.2.6 0 .6.3v.8c0 3.4 2.9 6.4 6.4 6.7.4 0 .6-.3.6-.5z" } },
	  share_link: { "path": { "d": "M12.6 19.2l-1-.1s-.7-.1-1-.3c-.2 0-.4 0-.5.2l-.3.2c-1.3 1.3-3.5 1.5-4.9.3-1.5-1.4-1.6-3.8-.1-5.2l3.5-3.5c.4-.5 1-.7 1.5-.9.8-.2 1.6-.2 2.2.1.5.2.9.4 1.2.8.2.2.4.4.5.6.2.3.6.4.8.1l1.3-1.3c.2-.2.2-.5.1-.7-.2-.3-.4-.5-.7-.7-.3-.4-.7-.7-1.1-.9-.6-.4-1.4-.7-2.1-.8-1.5-.3-3-.1-4.3.6-.5.3-1.1.7-1.5 1.1l-3.3 3.3C.4 14.6.2 18.6 2.6 21c2.4 2.7 6.6 2.8 9.1.2l1.2-1.1c.3-.3.1-.8-.3-.9zM21 2.7C18.5.3 14.5.5 12.1 3l-1 1c-.3.3-.1.8.3.9.6 0 1.3.2 1.9.4.2 0 .5 0 .6-.2l.2-.2c1.4-1.3 3.5-1.5 4.9-.3 1.6 1.4 1.6 3.8.2 5.2l-3.5 3.5c-.5.5-1 .7-1.6.9-.7.2-1.5.2-2.2-.1-.4-.2-.8-.4-1.2-.8-.2-.2-.3-.4-.5-.6-.1-.3-.6-.4-.8-.1l-1.3 1.3c-.2.2-.2.5 0 .7.2.3.4.5.6.7.3.3.8.7 1.1.9.7.4 1.4.7 2.2.8 1.4.3 3 .1 4.2-.6.6-.3 1.1-.7 1.5-1.1l3.5-3.5c2.6-2.5 2.5-6.7-.2-9.1z" } },
	  share_poll: { "path": { "d": "M21.6.9H2.4C1.6.9.9 1.6.9 2.4v3c0 .8.7 1.4 1.5 1.4h19.2c.8 0 1.5-.6 1.5-1.4v-3c0-.8-.7-1.5-1.5-1.5zm-9.2 4.5v-3h9.2v3h-9.2zM21.6 9H2.4c-.8 0-1.5.7-1.5 1.5v3c0 .8.7 1.5 1.5 1.5h19.2c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5zM9 13.5v-3h12.6v3H9zm12.6 3.7H2.4c-.8 0-1.5.6-1.5 1.4v3c0 .8.7 1.5 1.5 1.5h19.2c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.4-1.5-1.4zm-5.9 4.4v-3h5.9v3h-5.9z" } },
	  share_post: { "path": { "d": "M12 1.8C5.9 1.8.9 6.4.9 12c0 1.8.5 3.5 1.4 5 .1.2.1.4.1.6l-1 3.2c-.2.6.4 1.1 1 .9l3.2-1.1c.2-.1.4-.1.6.1 1.7.9 3.7 1.5 5.8 1.5 6.2 0 11.1-4.5 11.1-10.2C23 6.4 18 1.8 12 1.8z" } },
	  share_thanks: { "path": { "d": "M20.9 6.5h-3.3c1-1.5.9-3.4-.2-4.6-.7-.6-1.5-1-2.4-1-1 0-1.9.5-2.6 1.2-.2.2-.3.3-.4.5-.1-.2-.2-.3-.4-.5C10.9 1.3 10 .9 9 .9c-.9 0-1.7.4-2.3 1C5.5 3.1 5.5 5 6.4 6.5H3.2C1.9 6.5.9 7.5.9 8.7v1.5c0 .4.3.7.8.7h20.6c.5 0 .8-.3.8-.7V8.7c0-1.2-1-2.2-2.2-2.2zm-10 0c-.8 0-1.9-.3-2.5-1-.6-.6-.6-1.6-.1-2 .2-.3.5-.3.7-.3.4 0 .7.2 1 .4.7.7.9 1.9.9 2.7v.2zm4.7-1c-.6.6-1.8 1-2.5 1v-.3c0-.7.3-1.9.9-2.6.3-.3.6-.5 1-.5.2 0 .5.1.7.3.5.6.5 1.5-.1 2.1zm5.3 7.6h-7.8v10h6.4c1.2 0 2.1-1 2.1-2.1v-7.2c0-.4-.3-.7-.7-.7zm-18.5.7v7.1c0 1.2 1 2.2 2.2 2.2h6.3v-10H3.1c-.4 0-.7.3-.7.7z" } },
	  sort: { "path": { "d": "M12.7 7.4c.3-.3.3-.7 0-1L7.4 1.1c-.2-.3-.7-.3-.9 0L1.2 6.4c-.3.3-.3.7 0 1l.9 1c.3.2.7.2 1 0l1.7-1.7c.2-.3.7-.1.7.3v9.8c0 .4.4.7.7.7h1.4c.4 0 .7-.4.7-.7V7c0-.4.5-.6.8-.3l1.7 1.7c.2.2.6.2.9 0l1-1zm10.1 9.2l-.9-.9c-.3-.3-.7-.3-1 0l-1.7 1.7c-.2.2-.7 0-.7-.4V7.2c0-.4-.4-.7-.7-.7h-1.4c-.4 0-.7.3-.7.7v9.7c0 .5-.5.6-.8.4l-1.7-1.7c-.2-.3-.6-.3-.9 0l-1 1c-.3.3-.3.7 0 1l5.3 5.3c.3.3.7.3 1 0l5.3-5.3c.2-.3.2-.8-.1-1z" } },
	  submit_for_approval: { "path": { "d": "M20.9 13.5h-4.1c-1.2 0-2.2-1-2.2-2.2.2-3.3 1.7-3.5 1.8-5.6.2-2.2-1.2-4.2-3.4-4.7-2.8-.6-5.4 1.6-5.4 4.4 0 2.4 1.6 2.4 1.8 5.9 0 1.2-1 2.2-2.2 2.2H3.1c-1.2 0-2.2.9-2.2 2.2v1.5c0 .4.3.7.8.7h20.6c.5 0 .8-.3.8-.7v-1.5c0-1.3-1-2.2-2.2-2.2zm0 6.6H3.1c-.4 0-.7.3-.7.7v.1c0 1.2 1 2.2 2.2 2.2h14.8c1.2 0 2.2-1 2.2-2.2v-.1c0-.4-.3-.7-.7-.7z" } },
	  update: { "path": { "d": "M12 .9C5.9.9.9 5.9.9 12s5 11.1 11.1 11.1 11.1-5 11.1-11.1S18.1.9 12 .9zm4.2 7.2c0 .3-.4.7-.7.7h-4.4c-.3 0-.5.2-.5.4v1c0 .2.2.4.5.4h1.8c1.8 0 3.3 1.4 3.3 3.2v1c0 1.8-1.5 3.2-3.3 3.2h.5v.9c0 .5-.4.9-.9.9s-1-.4-1-.9V18h-3c-.3 0-.7-.3-.7-.7v-1.4c0-.3.4-.7.7-.7h4.4c.3 0 .5-.2.5-.4v-1c0-.2-.2-.4-.5-.4h-1.8c-1.8 0-3.3-1.4-3.3-3.2v-1C7.8 7.4 9.3 6 11.1 6h.4v-.9c0-.5.5-.9 1-.9s.9.4.9.9V6h2.1c.3 0 .7.3.7.7v1.4z" } },
	  update_status: { "path": { "d": "M13.8 14.1l.7.8c.2.1.5.1.6 0l2.2-2.2c.1-.2.2-.4.2-.7V3.7c0-.8-.6-1.4-1.3-1.4H2.3c-.8 0-1.4.6-1.4 1.4v10.1c0 .8.6 1.4 1.4 1.4h6.3c.3 0 .5-.1.7-.2l.8-.8c.3-.4.8-.7 1.3-.8.8-.2 1.7.1 2.4.7zM4.6 6.5c0-.3.2-.5.5-.5h8.3c.3 0 .4.2.4.5v.9c0 .3-.1.4-.4.4H5.1c-.3 0-.5-.1-.5-.4v-.9zm.5 5c-.3 0-.5-.1-.5-.4v-.9c0-.3.2-.5.5-.5h6.4c.3 0 .5.2.5.5v.9c0 .3-.2.4-.5.4H5.1zm17.7 1.3l-1-1c-.2-.3-.7-.3-1 0l-5.7 5.7c-.1.2-.5.2-.7 0l-2-2.1c-.3-.3-.7-.3-1 0l-1 1c-.3.3-.3.8 0 1l3.9 4c.3.3.7.3 1 0l7.5-7.6c.4-.3.4-.7 0-1z" } },
	  user_activation: { "path": { "d": "M12.7 7.4c.3-.3.3-.7 0-1L7.4 1.1c-.2-.3-.7-.3-.9 0L1.2 6.4c-.3.3-.3.7 0 1l.9 1c.3.2.7.2 1 0l1.7-1.7c.2-.3.7-.1.7.3v9.8c0 .4.4.7.7.7h1.4c.4 0 .7-.4.7-.7V7c0-.4.5-.6.8-.3l1.7 1.7c.2.2.6.2.9 0l1-1zm10.1 9.2l-.9-.9c-.3-.3-.7-.3-1 0l-1.7 1.7c-.2.2-.7 0-.7-.4V7.2c0-.4-.4-.7-.7-.7h-1.4c-.4 0-.7.3-.7.7v9.7c0 .5-.5.6-.8.4l-1.7-1.7c-.2-.3-.6-.3-.9 0l-1 1c-.3.3-.3.7 0 1l5.3 5.3c.3.3.7.3 1 0l5.3-5.3c.2-.3.2-.8-.1-1zM7.4 21.2h-.9c-.5 0-1-.4-1-.9v-.9c0-.5.5-.9 1-.9h.9c.5 0 .9.4.9.9v.9c0 .5-.4.9-.9.9zM17.5 5.5h-.9c-.5 0-.9-.4-.9-.9v-.9c0-.5.4-.9.9-.9h.9c.5 0 1 .4 1 .9v.9c0 .5-.5.9-1 .9z" } },
	  web_link: { "path": { "d": "M12.5.9C6.3.9 1.4 5.9 1.4 12s4.9 11.1 11.1 11.1 11-5 11-11.1S18.6.9 12.5.9zm1.3 15.9c-.6.6-.9 2-1.2 2.9 0 .2-.1.4-.3.5l-.5.2c-.3.1-.6.1-.8-.1-.5-.5-.8-1.1-.8-1.7 0-1.2-1.9-.8-1.9-3 0-1.8-2.3-2.9-4-2.1-.1.1-.2.2-.4.2-.3.1-.5-.1-.6-.4 0-.4-.1-.8-.1-1.3 0-2.2.8-4.2 2.1-5.8 0-.1.1-.1.1-.1 1.1-1.3 2.5-2.3 4.2-2.8.4-.2.8.3.6.7-.2.2-.3.5-.3.8 0 .9-.9 1.5-1.3 1.4-.4-.2-1.4.5-.5 1l.5.2h.1l.2.1c1.6 1 1.3 1.8.6 3-.8 1.3-1.1 0-2.2-.4s-2.2.4-1.9 1.1c.4.8 1.5 0 2.3.8.7.7.7 1.8 2.9 1.1 2.2-.8 2.6-.4 3.3.3.7.8 1.1 2.2-.1 3.4zm5.9-.1c-.9-1.1 0-3.4-1.1-4.7-1.1-1.5-2.6 0-4-2.3-1.4-2.1.4-3.9 2.1-4.5.5-.2 1-.3 1.5-.3.1 0 .2.1.3.2 1.9 1.6 3.2 4.1 3.2 6.9 0 1.7-.5 3.2-1.2 4.6-.2.2-.6.3-.8.1z" } }
	};
	module.exports.viewBox = '0 0 24 24';

/***/ },
/* 40 */
/***/ function(module, exports) {

	/*  Copyright (c) 2015, salesforce.com, inc. All rights reserved.    Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:  Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.  Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.  Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.  */
	"use strict";
	
	module.exports = {
	  custom1: { "path": { "d": "M13 17.8c-.5.6-1.5.6-2.1 0-1.7-1.9-5-5.4-5-5.4-1.5-1.6-1.5-4.1 0-5.7.7-.8 1.7-1.2 2.7-1.2 1 0 2 .4 2.7 1.2l.3.4c.2.2.6.2.8 0l.2-.4h.1c.7-.8 1.7-1.2 2.7-1.2 1 0 2 .4 2.7 1.2 1.5 1.5 1.5 4.1 0 5.7 0 0-3.3 3.5-5.1 5.4z" } },
	  custom10: { "path": { "d": "M16.8 18.7c-2.3.9-5.9.7-7.8-1.4-4.7-5.1-.6-12.5 5.1-12.5.9 0 1.8.2 2.7.5.3.2.3.7 0 .9-1.8 1.3-3 3.4-3 5.8s1.2 4.6 3 5.9c.3.2.3.7 0 .8z" } },
	  custom100: { "path": { "d": "M14.9 17.3H9.1c-.1 0-.2.1-.2.3.2.9 1.5 1.6 3.1 1.6 1.5 0 2.8-.7 3-1.6.1-.2 0-.3-.1-.3zm2.9-11.1H6.2c-.8 0-1.4.7-1.4 1.5v6.7c0 .8.6 1.4 1.4 1.4h11.6c.8 0 1.4-.6 1.4-1.4V7.7c0-.8-.6-1.5-1.4-1.5zm0 7.7c0 .3-.3.5-.5.5H6.7c-.2 0-.5-.2-.5-.5V8.2c0-.3.3-.5.5-.5h10.6c.2 0 .5.2.5.5v5.7z" } },
	  custom11: { "path": { "d": "M12.5 5.1l1.9 4.1 4.3.6c.5.1.7.7.3 1.1L15.9 14l.8 4.5c0 .5-.5.9-.9.6L12 17l-3.8 2.1c-.4.3-1-.1-.9-.6l.8-4.5L5 10.9c-.4-.4-.2-1 .3-1.1l4.3-.6 1.9-4.1c.2-.4.8-.4 1 0z" } },
	  custom12: { "circle": { "cx": "12", "cy": "12", "r": "7.2" } },
	  custom13: { "path": { "d": "M17.8 5.3H6.2c-.8 0-1.4.6-1.4 1.4v1.5c0 .2.2.4.5.4h13.4c.3 0 .5-.2.5-.4V6.7c0-.8-.6-1.4-1.4-1.4zm0 4.8H6.2c-.2 0-.4.2-.4.5v6.7c0 .8.6 1.4 1.4 1.4h9.6c.8 0 1.4-.6 1.4-1.4v-6.7c0-.3-.2-.5-.4-.5zm-3.2 2.1c0 .4-.3.8-.7.8h-3.8c-.4 0-.7-.4-.7-.8 0-.3.3-.7.7-.7h3.8c.4 0 .7.3.7.7z" } },
	  custom14: { "path": { "d": "M18.7 7.9h-1.4c-.3 0-.6-.1-.9-.3l-1.1-1c-.3-.2-.6-.4-.9-.4h-2.8c-.4 0-.7.2-1 .4L9.1 7.9c-.1.1-.1.3 0 .4l.5.4c.3.3.7.3 1 .1l1.3-.8c.2-.1.4-.1.6.1l4.1 4c.1.1.2.2.2.4v1.1c0 .2.2.6.5.6h1.4c.3 0 .5-.3.5-.5V8.4c0-.3-.2-.5-.5-.5zm-4.1 4.3L12 9.7l-.7.5c-.3.2-.7.3-1.1.3-.6 0-1.1-.2-1.5-.5l-.9-.8c-.2-.2-.4-.4-.4-.6 0-.3-.2-.4-.5-.4H5.3c-.3 0-.5.1-.5.4V13c0 .2.2.4.5.4h.9c.1 0 .2-.2.3-.3.4-.5.9-.8 1.5-.9.5 0 1.1.2 1.6.6l3 2.7c.2.3.4.5.5.9.1.1.3.2.4.1l1.1-1.2c.6-.5 1-1.9.5-2.5l-.5-.6zm-6 1.8c-.3-.3-.8-.2-1 .1-.3.3-.2.8.1 1.1l3 2.7c.1.2.3.2.5.2s.4-.1.5-.3c.3-.3.2-.8-.1-1.1l-3-2.7z" } },
	  custom15: { "path": { "d": "M16.8 11.1c-.8-.4-1-.7-1-1 0-.4.3-.7.6-1 .5-.4.7-1.1.7-1.8 0-1.3-.8-2.5-2.3-2.5-1.3 0-2.1.9-2.3 2 0 .1 0 .2.1.2 1.1.8 1.7 2.1 1.7 3.6 0 1.1-.3 2.1-1 2.8-.1.2-.1.4.1.4.4.2.9.4 1.4.7.1.1.3.1.4.1H18c.7 0 1.2-.5 1.2-1.1v-.2c0-1.1-1.2-1.7-2.4-2.2zM12.5 15c-1-.4-1.1-.8-1.1-1.2 0-.4.2-.8.6-1.1.6-.5.9-1.2.9-2.1 0-1.6-1-2.9-2.8-2.9S7.3 9 7.3 10.6c0 .9.3 1.6.9 2.1.4.3.7.7.7 1.1 0 .4-.2.8-1.2 1.2-1.5.6-2.9 1.3-2.9 2.6v.2c0 .8.7 1.4 1.5 1.4h7.6c.8 0 1.5-.6 1.5-1.4v-.2c0-1.3-1.4-2-2.9-2.6z" } },
	  custom16: { "path": { "d": "M17.3 16.8H17v-5.3c0-.2-.2-.5-.4-.5h-.5c-.3 0-.5.3-.5.5v5.3h-1.4v-5.3c0-.2-.3-.5-.5-.5h-.5c-.3 0-.5.3-.5.5v5.3h-1.4v-5.3c0-.2-.2-.5-.5-.5h-.5c-.2 0-.5.3-.5.5v5.3H8.4v-5.3c0-.2-.2-.5-.5-.5h-.5c-.2 0-.4.3-.4.5v5.3h-.3c-.8 0-1.4.6-1.4 1.4v.5c0 .3.2.5.5.5h12.4c.3 0 .5-.2.5-.5v-.5c0-.8-.6-1.4-1.4-1.4zm1.2-8.5L12.6 5c-.2-.1-.4-.2-.6-.2-.2 0-.4.1-.6.2L5.5 8.3c-.1.1-.2.2-.2.4v.4c0 .3.2.5.5.5h12.4c.3 0 .5-.2.5-.5v-.4c0-.2-.1-.3-.2-.4zm-6.5.3c-.7 0-1.2-.5-1.2-1.2s.5-1.2 1.2-1.2 1.2.6 1.2 1.2-.5 1.2-1.2 1.2z" } },
	  custom17: { "path": { "d": "M10.3 6.9c.1.2.3.3.5.3h2.4c.2 0 .4-.1.4-.3l1-1.7c.1-.2-.1-.4-.2-.4H9.6c-.1 0-.3.2-.2.4l.9 1.7zm3.1 1.7h-2.8c-2.4 0-4.4 2-4.4 4.4v4.8c0 .8.7 1.4 1.5 1.4h8.6c.8 0 1.5-.6 1.5-1.4V13c0-2.4-2-4.4-4.4-4.4zm-.7 8.1v.8c0 .2-.1.3-.3.3h-.9c-.2 0-.2-.1-.2-.3v-.8c-.7-.1-1.3-.4-1.5-.6-.2-.1-.2-.3-.1-.5l.3-.5c.1-.1.2-.2.4-.2.1 0 .1 0 .2.1.5.3.9.4 1.3.4.3 0 .6-.2.6-.4 0-.1-.1-.3-1.1-.6-.8-.3-1.8-.8-1.8-1.9 0-.7.5-1.5 1.7-1.7v-.7c0-.2 0-.3.1-.3h1c.2 0 .3.1.3.3v.7c.5.1 1 .4 1.2.5.1 0 .1.1.1.3s0 .2-.1.3l-.3.4c-.1.1-.3.2-.4.2H13c-.5-.3-.9-.4-1.2-.4-.4 0-.6.2-.6.3 0 .2.1.3.9.6 1.1.4 2.2.9 2.2 2 0 .8-.6 1.5-1.6 1.7z" } },
	  custom18: { "path": { "d": "M14.4 8.6h2.5c.2 0 .4-.1.4-.3 0-.1 0-.2-.1-.2L14 4.9c-.1-.1-.1-.1-.2-.1-.2 0-.4.1-.4.3v2.6c0 .5.5.9 1 .9zm5.6 3.3l-.3-.3c-.2-.2-.5-.2-.6 0l-3.7 3.7c-.1.1 0 .1 0 .1v.9h.9l3.7-3.7c.2-.2.2-.5 0-.7zm-3 5.9h-2.2c-.5 0-.9-.4-.9-1v-1.6c0-.3.1-.5.3-.7l2.9-3c.1-.1.2-.2.2-.3v-.6c0-.3-.2-.5-.5-.5h-3.4c-.8 0-1.4-.7-1.4-1.5V5.3c0-.3-.2-.5-.5-.5H6.7c-.8 0-1.4.6-1.4 1.4v11.6c0 .8.6 1.4 1.4 1.4h9.1c.7 0 1.3-.5 1.5-1.2 0-.1-.1-.2-.3-.2zM7.2 9.1c0-.2.2-.5.5-.5h1.9c.3 0 .5.3.5.5v.5c0 .3-.2.5-.5.5H7.7c-.3 0-.5-.2-.5-.5v-.5zm4.8 6.3c0 .2-.2.4-.5.4H7.7c-.3 0-.5-.2-.5-.4v-.5c0-.3.2-.5.5-.5h3.8c.3 0 .5.2.5.5v.5zm1-2.9c0 .2-.3.5-.5.5H7.7c-.3 0-.5-.3-.5-.5V12c0-.3.2-.5.5-.5h4.8c.2 0 .5.2.5.5v.5z" } },
	  custom19: { "path": { "d": "M19 7.9c0-.2-.3-.2-.4-.1l-2.4 2.4c-.2.2-.5.2-.7 0l-1.7-1.7c-.2-.2-.2-.5 0-.7l2.4-2.4c.2-.1.1-.4 0-.4-.5-.1-.9-.2-1.3-.2-2.6 0-4.6 2.2-4.3 4.8 0 .4.1.8.3 1.1l-5.6 5.6c-.7.7-.7 1.8 0 2.4.3.4.7.5 1.2.5s.8-.1 1.2-.5l5.6-5.6c.3.2.7.3 1.1.3 2.6.3 4.8-1.7 4.8-4.3 0-.4-.1-.8-.2-1.2z" } },
	  custom2: { "g": { "path": { "d": "M14.2 5.3c-.8-.5-3.4-1-4.4.7-.4.8.1 2.2.6 3.1.1.2.3.3.6.2.3-.1.6-.2 1-.2.2 0 .5 0 .7.1.2.1.5 0 .5-.2.2-.3.5-.7 1-1.1 1.2-.9.7-2.1 0-2.6zm-1.3 9.4c-.3.1-.6.2-.9.2-.3 0-.6-.1-.8-.1-.3-.1-.5 0-.6.2-.2.3-.4.7-.9 1.1-1.2.9-.7 2.2 0 2.6s3.3 1 4.3-.7c.4-.7-.1-2.1-.5-3-.1-.2-.4-.3-.6-.3zM18 9.8c-.8-.4-2.2.1-3.1.6-.2.1-.3.3-.2.6.1.3.2.6.2 1 0 .2 0 .5-.1.7-.1.2 0 .5.2.5.3.2.7.5 1.1 1 .9 1.2 2.1.7 2.6 0s1-3.4-.7-4.4zm-8.7 3.1c-.1-.3-.2-.6-.2-.9 0-.3.1-.6.1-.8.1-.3 0-.5-.2-.6-.3-.2-.7-.4-1.1-.9-.9-1.2-2.2-.7-2.6 0S4.3 13 6 14c.7.4 2.1-.1 3-.5.2-.1.3-.4.3-.6z" }, "circle": { "cx": "12", "cy": "12", "r": "1.44" } } },
	  custom20: { "path": { "d": "M9.1 11.4c0-.1-.2-.3-.4-.1l-3.3 2.5c-.4.3-.6.7-.6 1.2v1c0 .2.2.3.3.2l3.7-1.4c.2-.1.3-.2.3-.4v-3zm5.3 6.8l-1-.7V6.6c0-.6-.7-1.3-1.1-1.7-.2-.1-.4-.1-.6 0-.4.4-1.2 1.1-1.2 1.7v10.9l-1.1.7c-.2.2-.3.4-.3.6v.2c0 .1.1.2.2.2h5.3c.1 0 .3-.1.3-.2 0-.4-.2-.6-.5-.8zm4.2-4.4l-3.3-2.5c-.2-.2-.4 0-.4.1v3c0 .2.1.4.3.4l3.7 1.4c.2.1.3 0 .3-.2v-1c0-.5-.2-.9-.6-1.2z" } },
	  custom21: { "path": { "d": "M13.8 17.1c0-.2-.2-.3-.4-.3h-2.8c-.2 0-.4.1-.4.3l-.7 1.7c0 .2.1.4.2.4h4.6c.1 0 .2-.2.2-.4l-.7-1.7zm4-12.3H6.2c-.8 0-1.4.6-1.4 1.4v7.7c0 .8.6 1.5 1.4 1.5h11.6c.8 0 1.4-.7 1.4-1.5V6.2c0-.8-.6-1.4-1.4-1.4zM12 14.9c-.4 0-.7-.3-.7-.7s.3-.8.7-.8.7.4.7.8-.3.7-.7.7zm5.8-2.4c0 .2-.3.5-.5.5H6.7c-.2 0-.5-.3-.5-.5V6.7c0-.2.3-.5.5-.5h10.6c.2 0 .5.3.5.5v5.8z" } },
	  custom22: { "path": { "d": "M18.6 15.3l-1.4-1.2c-.5-.4-1.3-.4-1.8 0l-1.4 1c-.2.2-.5.1-.6 0L11 13l-2.1-2.4c-.2-.2-.2-.4 0-.6l1-1.4c.4-.6.3-1.3-.1-1.8L8.6 5.3c-.5-.6-1.5-.7-2.1-.1L5.2 6.5c-.3.3-.4.7-.4 1.1.1 3 1.5 5.9 3.6 8s4.9 3.4 8 3.6c.4 0 .8-.2 1-.5l1.3-1.3c.7-.5.6-1.5-.1-2.1z" } },
	  custom23: { "path": { "d": "M11.7 13.4c.2.2.4.2.6 0l6.8-6.2c.1-.3.1-.7-.4-.7l-13.4.1c-.4 0-.6.3-.4.6l6.8 6.2zm7.5-3.6c0-.3-.4-.4-.6-.2l-5.3 4.9c-.3.3-.8.5-1.3.5s-.9-.2-1.3-.5L5.4 9.6c-.2-.2-.6-.1-.6.2v6.3c0 .8.7 1.4 1.5 1.4h11.5c.8 0 1.4-.6 1.4-1.4V9.8z" } },
	  custom24: { "path": { "d": "M16.3 4.8H7.7c-.8 0-1.5.6-1.5 1.4 0 .3.3.5.5.5h10.6c.2 0 .5-.2.5-.5 0-.8-.7-1.4-1.5-1.4zm0 3.4H7.7c-.3 0-.5.2-.5.4v10.1c0 .3.2.5.5.5h2.6c.3 0 .5-.2.5-.5v-1.9c0-.3.2-.5.5-.5h1.4c.3 0 .5.2.5.5v1.9c0 .3.2.5.5.5h2.6c.3 0 .5-.2.5-.5V8.6c0-.2-.2-.4-.5-.4zm-5 6.4c0 .3-.2.5-.5.5h-1c-.2 0-.4-.2-.4-.5v-.9c0-.3.2-.5.4-.5h1c.3 0 .5.2.5.5v.9zm0-3.3c0 .2-.2.5-.5.5h-1c-.2 0-.4-.3-.4-.5v-1c0-.2.2-.5.4-.5h1c.3 0 .5.3.5.5v1zm3.3 3.3c0 .3-.2.5-.4.5h-1c-.3 0-.5-.2-.5-.5v-.9c0-.3.2-.5.5-.5h1c.2 0 .4.2.4.5v.9zm0-3.3c0 .2-.2.5-.4.5h-1c-.3 0-.5-.3-.5-.5v-1c0-.2.2-.5.5-.5h1c.2 0 .4.3.4.5v1z" } },
	  custom25: { "path": { "d": "M19.2 6.6c-.2-.9-1-1.7-1.9-1.8-.6-.1-1.2.1-1.7.5-.1.1-.1.3.1.4 1.1.6 2 1.4 2.7 2.4.1.2.3.2.4 0 .4-.4.5-1 .4-1.5zM8.3 5.7c.1-.1.2-.3.1-.4-.5-.4-1.1-.6-1.8-.5-.9.1-1.6.9-1.8 1.8-.1.5 0 1.1.3 1.5.1.2.3.2.4 0 .8-1 1.7-1.8 2.8-2.4zm3.7.5c-3.6 0-6.5 2.9-6.5 6.5 0 1.5.5 2.8 1.3 3.9l-1 .9c-.4.4-.4 1 0 1.4.2.2.4.3.7.3s.5-.1.7-.3l.9-1c1.1.8 2.5 1.3 3.9 1.3s2.8-.5 3.8-1.3l1 1c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4l-1-.9c.8-1.1 1.3-2.4 1.3-3.9 0-3.6-2.9-6.5-6.5-6.5zm-4.6 6.5c0-2.5 2.1-4.5 4.6-4.5s4.6 2 4.6 4.5-2.1 4.6-4.6 4.6-4.6-2.1-4.6-4.6zm5.3-.3v-1.8c0-.4-.3-.8-.7-.8s-.7.4-.7.8v2.1c0 .2.1.4.2.5l1.7 1.7c.1.1.3.2.5.2s.3-.1.5-.2c.3-.3.3-.7 0-1l-1.5-1.5z" } },
	  custom26: { "path": { "d": "M6.2 4.8c-.8 0-1.4.6-1.4 1.4 0 .5.2.9.5 1.1v10.9c0 .6.4 1 .9 1s1-.4 1-1V7.3c.3-.2.5-.6.5-1.1 0-.8-.7-1.4-1.5-1.4zm12.6 2.6c-3.7 2-6.3-1.4-9.8-.1-.2 0-.4.2-.4.4v6.2c0 .3.4.6.7.5 3.4-1.1 5.9 2.2 9.7.1.1-.1.2-.2.2-.4V7.6c0-.2-.2-.3-.4-.2z" } },
	  custom27: { "path": { "d": "M5.8 15.1h12.4c.3 0 .5-.2.5-.5V7c0-.8-.6-1.5-1.4-1.5H6.7c-.8 0-1.4.7-1.4 1.5v7.6c0 .3.2.5.5.5zm.9-7.7c0-.2.2-.4.5-.4h9.6c.3 0 .5.2.5.4v5.8c0 .3-.2.5-.5.5H7.2c-.3 0-.5-.2-.5-.5V7.4zm12.5 9.2h-5.3c-.2 0-.5.2-.5.4s-.2.5-.4.5h-2c-.2 0-.4-.2-.4-.5s-.3-.4-.5-.4H4.8c-.3 0-.5.2-.5.4 0 .8.7 1.5 1.5 1.5h12.4c.8 0 1.5-.7 1.5-1.5 0-.2-.2-.4-.5-.4z" } },
	  custom28: { "path": { "d": "M15.4 4.8H8.6c-.8 0-1.4.6-1.4 1.4v11.6c0 .8.6 1.4 1.4 1.4h6.8c.8 0 1.4-.6 1.4-1.4V6.2c0-.8-.6-1.4-1.4-1.4zM12 18.7c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7zm3.4-2.4c0 .3-.3.5-.5.5H9.1c-.2 0-.5-.2-.5-.5V7.2c0-.3.3-.5.5-.5h5.8c.2 0 .5.2.5.5v9.1z" } },
	  custom29: { "path": { "d": "M17.7 6.7h-.4c-.3 0-.5.3-.5.5v9.7l.6.8c.1.1.1.1.2 0l.6-.8V7.2c0-.2-.2-.5-.5-.5zm-3.8-1.9H7.2c-.8 0-1.4.6-1.4 1.4v11.6c0 .8.6 1.4 1.4 1.4h6.7c.8 0 1.5-.6 1.5-1.4V6.2c0-.8-.7-1.4-1.5-1.4zm-3.3 13.9c-.4 0-.8-.3-.8-.7s.4-.7.8-.7.7.3.7.7-.3.7-.7.7zm3.3-2.4c0 .3-.2.5-.5.5H7.7c-.3 0-.5-.2-.5-.5V7.2c0-.3.2-.5.5-.5h5.7c.3 0 .5.2.5.5v9.1z" } },
	  custom3: { "path": { "d": "M12 9.1c-1.6 0-2.9 1.3-2.9 2.9s1.3 2.9 2.9 2.9 2.9-1.3 2.9-2.9-1.3-2.9-2.9-2.9zm7.2 2.9c0-.8-2-1.3-2.3-2-.3-.8.8-2.5.2-3.1-.6-.6-2.3.5-3.1.2-.7-.3-1.2-2.3-2-2.3s-1.3 2-2 2.3c-.8.3-2.5-.8-3.1-.2-.6.6.5 2.3.2 3.1-.3.7-2.3 1.2-2.3 2s2 1.3 2.3 2c.3.8-.8 2.5-.2 3.1.6.6 2.3-.5 3.1-.2.7.3 1.2 2.3 2 2.3s1.3-2 2-2.3c.8-.3 2.5.8 3.1.2.6-.6-.5-2.3-.2-3.1.3-.7 2.3-1.2 2.3-2zM12 16.3c-2.4 0-4.3-1.9-4.3-4.3S9.6 7.7 12 7.7s4.3 1.9 4.3 4.3-1.9 4.3-4.3 4.3z" } },
	  custom30: { "path": { "d": "M17.2 6.8c-1.4-1.3-3.1-2-5-2-.4 0-.7.3-.7.7s.3.7.7.7c1.5 0 2.9.6 4 1.6 1 1.1 1.6 2.5 1.6 4 0 .4.3.7.7.7s.7-.3.7-.7c0-1.9-.7-3.6-2-5zm-5 .9c-.4 0-.7.3-.7.7s.3.7.7.7c.7 0 1.4.3 1.9.8s.8 1.1.8 1.9c0 .4.3.7.7.7s.7-.3.7-.7c0-1.1-.4-2.2-1.2-2.9s-1.8-1.2-2.9-1.2zm-1 6.9l.6-1.7c.5.2.9.1 1.3-.3.5-.5.5-1.2 0-1.7s-1.2-.5-1.7 0c-.4.4-.4.9-.2 1.4l-1.6.7-2.8-2.8c-.2-.2-.5-.2-.7 0-1.8 2.1-1.7 5.4.4 7.4 2 2 5.2 2.1 7.3.3.3-.1.3-.5.1-.7l-2.7-2.6z" } },
	  custom31: { "path": { "d": "M18.1 10.4l-1.2-3.7c-.2-.7-.8-1.2-1.5-1.2H8.6c-.7 0-1.3.5-1.6 1.2l-1.1 3.7c-.6.1-1.1.7-1.1 1.4v2.8c0 .7.4 1.2 1 1.4v2c0 .3.2.5.4.5h2c.2 0 .4-.2.4-.5v-1.9h6.8V18c0 .3.2.5.4.5h2c.2 0 .4-.2.4-.5v-2c.6-.2 1-.7 1-1.4v-2.8c0-.7-.5-1.3-1.1-1.4zm-10.9 4c-.7 0-1.2-.5-1.2-1.2S6.5 12 7.2 12s1.2.5 1.2 1.2-.5 1.2-1.2 1.2zm5.3-4.1H7.7c-.1 0-.3-.1-.2-.3l.9-2.9c0-.1.1-.1.2-.1h6.7c.1 0 .2 0 .3.1l.9 2.9c0 .2-.1.3-.3.3h-3.7zm4.1 4.1c-.7 0-1.2-.5-1.2-1.2s.5-1.2 1.2-1.2 1.2.5 1.2 1.2-.6 1.2-1.2 1.2z" } },
	  custom32: { "path": { "d": "M18.8 8.5l-5.6 3.2c-.1 0-.2.1-.3.1-.3 0-.6-.2-.7-.4-.2-.4 0-.8.4-1l1.8-1.1V7.5c0-.2-.2-.3-.3-.2l-6.9 3.9c-.1.1-.2.1-.3.1-.3 0-.5-.1-.7-.4-.2-.3 0-.8.3-1l1.2-.6v-4c0-.3-.2-.5-.5-.5H5.3c-.3 0-.5.2-.5.5v12.5c0 .8.6 1.4 1.4 1.4h4.1c.3 0 .5-.2.5-.5V17c0-.2.2-.4.5-.4h1.4c.3 0 .5.2.5.4v1.7c0 .3.2.5.5.5h4.1c.8 0 1.4-.6 1.4-1.4V8.7c0-.2-.2-.3-.4-.2zM8.4 15.1c0 .3-.2.5-.5.5h-.5c-.2 0-.4-.2-.4-.5v-1.4c0-.3.2-.5.4-.5h.5c.3 0 .5.2.5.5v1.4zm2.9 0c0 .3-.2.5-.5.5h-.5c-.2 0-.5-.2-.5-.5v-1.4c0-.3.3-.5.5-.5h.5c.3 0 .5.2.5.5v1.4zm2.9 0c0 .3-.3.5-.5.5h-.5c-.3 0-.5-.2-.5-.5v-1.4c0-.3.2-.5.5-.5h.5c.2 0 .5.2.5.5v1.4zm2.8 0c0 .3-.2.5-.4.5h-.5c-.3 0-.5-.2-.5-.5v-1.4c0-.3.2-.5.5-.5h.5c.2 0 .4.2.4.5v1.4z" } },
	  custom33: { "path": { "d": "M15.6 10.1h-7c-.2 0-.4.2-.4.5v1.9c0 .2.2.5.4.5h7c.3 0 .5-.3.5-.5v-1.9c0-.3-.2-.5-.5-.5zm-3.4 2.1c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.8.3.8.7-.4.7-.8.7zm7-5.5H4.8c-.3 0-.5.2-.5.5v.5c0 .5.5.9 1 .9v8.7c0 .2.2.5.5.5h.4c.3 0 .5-.3.5-.5V8.6h10.8v8.7c0 .2.2.5.5.5h.5c.2 0 .5-.3.5-.5V8.6h-.3c.5 0 1-.4 1-.9v-.5c0-.3-.2-.5-.5-.5z" } },
	  custom34: { "path": { "d": "M10.1 7.2h3.8c.3 0 .5-.3.5-.5-.3-1.1-1.2-1.9-2.4-1.9s-2.1.8-2.4 1.9c0 .2.2.5.5.5zm8.4 6.2c.4 0 .7-.3.7-.7 0-.4-.4-.7-.8-.7h-2.1v-1.2c1.4-.6 2.4-2 2.4-3.8 0-.4-.2-.7-.6-.8-.4 0-.8.3-.8.8 0 1-.5 1.9-1.2 2.3-.3-.4-.7-.7-1.2-.7H9.1c-.5 0-.9.3-1.2.7C7.2 8.9 6.7 8 6.7 7c0-.4-.3-.7-.7-.8-.4 0-.7.4-.7.8 0 1.7 1 3.2 2.4 3.8V12H5.6c-.4 0-.8.3-.8.7 0 .4.3.7.7.7h2.2v1.2c-1.4.6-2.4 2.1-2.4 3.9 0 .3.2.6.6.7.4.1.8-.3.8-.7 0-1 .5-1.9 1.2-2.3.4 1.3 1.4 2.4 2.8 2.8.3.1.6-.2.6-.5v-5.7c0-.4.3-.8.7-.8.4 0 .7.3.7.7v5.8c0 .4.3.6.6.5 1.4-.4 2.4-1.5 2.8-2.8.7.4 1.2 1.2 1.2 2.2 0 .4.3.8.7.8.4 0 .7-.3.7-.7 0-1.8-1-3.3-2.4-3.9v-1.2h2.2z" } },
	  custom35: { "path": { "d": "M16.6 9.6c-.4 0-.8.3-.8.7v1.2c0 2.1-1.7 3.9-3.8 3.9s-3.8-1.8-3.8-3.9v-1.2c0-.4-.4-.7-.8-.7s-.7.3-.7.7v1.2c0 2.7 2 4.9 4.6 5.3v1h-1.2c-.4 0-.7.3-.7.7s.3.7.7.7h3.8c.4 0 .7-.3.7-.7s-.3-.7-.7-.7h-1.2v-1c2.6-.4 4.6-2.6 4.6-5.3v-1.2c0-.4-.3-.7-.7-.7zM12 13.9c1.3 0 2.4-1.1 2.4-2.4V7.2c0-1.3-1.1-2.4-2.4-2.4-1.3 0-2.4 1.1-2.4 2.4v4.3c0 1.3 1.1 2.4 2.4 2.4z" } },
	  custom36: { "path": { "d": "M9.3 17.3h-1c-.2 0-.3.1-.4.2l-.3.6c-.2.3-.2.8.2 1 .1.1.2.1.4.1s.4-.1.6-.4l.7-1.2c.1-.1 0-.3-.2-.3zm6.8.2c-.1-.1-.2-.2-.4-.2h-1c-.2 0-.3.2-.2.3l.7 1.2c.2.3.4.4.6.4.2 0 .3 0 .4-.1.4-.2.4-.7.2-1l-.3-.6zm0-12.7H7.9c-.8 0-1.4.6-1.4 1.4v8.2c0 .8.6 1.4 1.4 1.4h8.2c.8 0 1.4-.6 1.4-1.4V6.2c0-.8-.6-1.4-1.4-1.4zM8.6 14.9c-.4 0-.7-.3-.7-.7s.3-.8.7-.8.8.4.8.8-.4.7-.8.7zm6.8 0c-.4 0-.8-.3-.8-.7s.4-.8.8-.8.7.4.7.8-.3.7-.7.7zm.7-2.9c0 .3-.2.5-.5.5H8.4c-.3 0-.5-.2-.5-.5V7.2c0-.3.2-.5.5-.5h7.2c.3 0 .5.2.5.5V12z" } },
	  custom37: { "path": { "d": "M19.2 13.4h-3.1v-2.8c.6.6 1.5.9 2.4.9.4 0 .7-.3.7-.7s-.3-.7-.7-.7c-1.3 0-2.4-1.2-2.4-2.7v-.7c.2 0 .5-.2.5-.5v-.4c0-.3-.3-.5-.5-.5h-1.5c-.2 0-.4.2-.4.5v.4c0 .3.2.5.4.5v.7c0 1.5-1.1 2.7-2.6 2.7S9.4 8.9 9.4 7.4v-.7c.2 0 .4-.2.4-.5v-.4c0-.3-.2-.5-.4-.5H7.9c-.2 0-.5.2-.5.5v.4c0 .3.3.5.5.5v.7c0 1.5-1.1 2.7-2.4 2.7-.4 0-.7.3-.7.7s.3.7.7.7c.9 0 1.8-.3 2.4-.9v2.8H4.8c-.3 0-.5.3-.5.5v1.2c0 .2.2.5.5.5h1v2.6c0 .3.2.5.4.5h1.5c.2 0 .5-.2.5-.5v-1c0-.8.6-1.4 1.4-1.4h4.8c.8 0 1.4.6 1.4 1.4v1c0 .3.3.5.5.5h1.5c.2 0 .4-.2.4-.5v-2.6h1c.3 0 .5-.3.5-.5v-1.2c0-.2-.2-.5-.5-.5zm-9.8-2.9c.7.6 1.6 1 2.6 1s1.9-.3 2.6-1v2.9H9.4v-2.9z" } },
	  custom38: { "path": { "d": "M12 10.8c-1.1 0-1.9.9-1.9 1.9s.8 1.9 1.9 1.9 1.9-.8 1.9-1.9-.8-1.9-1.9-1.9zm5.8-2.4h-2c-.2 0-.3-.1-.4-.3l-.6-1.3c-.3-.5-.8-.8-1.3-.8h-3c-.5 0-1 .3-1.3.8l-.6 1.3c-.1.2-.2.3-.4.3h-2c-.8 0-1.4.6-1.4 1.4v6.8c0 .8.6 1.4 1.4 1.4h11.6c.8 0 1.4-.6 1.4-1.4V9.8c0-.8-.6-1.4-1.4-1.4zM12 16.1c-1.8 0-3.4-1.5-3.4-3.3s1.6-3.4 3.4-3.4 3.4 1.5 3.4 3.4-1.6 3.3-3.4 3.3z" } },
	  custom39: { "path": { "d": "M15.3 6.9c-.1-.2-.3-.3-.5-.3L5.1 9.7c-.2.1-.3.4-.3.6l.4 1.5c.1.2.3.4.6.3l2.4-.3c.1.3.2.5.4.8l-2.1 5.6c-.2.4 0 .8.4 1h.3c.2 0 .5-.2.6-.5l2-5.4c.2.1.3.1.5.1s.3 0 .5-.1l1.9 5.4c.1.3.4.5.7.5h.3c.3-.2.5-.6.4-1L12 12.5c.3-.3.4-.8.4-1.3l3.4-.5c.2 0 .4-.2.3-.4l-.8-3.4zm3.9 3.3l-1.3-4.8c-.1-.4-.5-.7-.9-.6-.4.1-.7.5-.6.9l1.4 4.9c.1.4.5.6.8.5.4-.1.7-.5.6-.9z" } },
	  custom4: { "path": { "d": "M6.3 7.8l5-2.8c.4-.3 1-.3 1.5 0l4.9 2.8c.5.3.8.8.8 1.3v5.8c0 .5-.3 1-.8 1.3L12.8 19c-.5.3-1.1.3-1.5 0l-5-2.8c-.5-.3-.8-.8-.8-1.3V9.1c0-.5.3-1 .8-1.3z" } },
	  custom40: { "path": { "d": "M17.8 6.7H6.2c-.8 0-1.4.7-1.4 1.5v8.1c0 .8.6 1.5 1.4 1.5h11.6c.8 0 1.4-.7 1.4-1.5V8.2c0-.8-.6-1.5-1.4-1.5zm0 1.5v1.4H6.2V8.2h11.6zM6.2 16.3V12h11.6v4.3H6.2zm4.1-3.1c-.3 0-.6.2-.7.4-.1.1-.1.1-.2 0-.1-.2-.4-.4-.8-.4-.5 0-.9.4-.9 1s.4.9.9.9c.4 0 .7-.1.8-.4.1-.1.1-.1.2 0 .1.3.4.4.7.4h.1c.5 0 .9-.4.9-.9v-.1c0-.5-.4-.9-1-.9zm5.5.2H13c-.3 0-.5.3-.5.5v.5c0 .3.2.5.5.5h2.8c.3 0 .5-.2.5-.5v-.5c0-.2-.2-.5-.5-.5z" } },
	  custom41: { "g": { "path": { "d": "M18.2 7H5.8c-.8 0-1.5.6-1.5 1.4v7c0 .8.7 1.4 1.5 1.4h12.4c.8 0 1.5-.6 1.5-1.4v-7c0-.8-.7-1.4-1.5-1.4zM7.4 15.4c0-1-.7-1.7-1.6-1.7v-3.6c.9 0 1.6-.8 1.6-1.7h9.2c0 .9.7 1.7 1.6 1.7v3.6c-.9 0-1.6.7-1.6 1.7H7.4z" }, "circle": { "cx": "12", "cy": "11.76", "r": "2.4" } } },
	  custom42: { "path": { "d": "M17.8 5.3H6.2c-.8 0-1.4.6-1.4 1.4v1.5c0 .2.2.4.5.4h13.4c.3 0 .5-.2.5-.4V6.7c0-.8-.6-1.4-1.4-1.4zm0 4.8H6.2c-.2 0-.4.2-.4.5v6.7c0 .8.6 1.4 1.4 1.4h9.6c.8 0 1.4-.6 1.4-1.4v-6.7c0-.3-.2-.5-.4-.5zm-3.2 2.1c0 .4-.3.8-.7.8h-3.8c-.4 0-.7-.4-.7-.8 0-.3.3-.7.7-.7h3.8c.4 0 .7.3.7.7z" } },
	  custom43: { "path": { "d": "M19.6 10.4c0-.1.1-.1.1-.2v-.3l-.1-.1v-.1s-.1 0-.1-.1l-2.8-4c-.2-.2-.4-.3-.6-.3H7.4c-.2 0-.4.1-.6.3L4 9.7h-.1v.1c0 .1-.1.1-.1.1v.3c0 .1.1.1.1.2v.1H4v.1l7.2 7.9.1.1h.1v.1h.6v-.1h.1v-.1h.1l7.2-7.9v-.1l.2-.1zm-7.8-1h-1.2l1.2-2 1.1 2h-1.1zm0 1.4h1.4l-1.4 4.7-1.5-4.7h1.5zM13 6.7h1.8l-.7 1.9L13 6.7zM9.4 8.6l-.7-1.9h1.8L9.4 8.6zm-.6 2.2l1.4 4.3-4-4.3h2.6zm5.9 0h2.6l-3.9 4.3 1.3-4.3zm2.9-1.4h-2.2l.7-2.1 1.5 2.1zM7.4 7.3l.7 2.1H6l1.4-2.1z" } },
	  custom44: { "path": { "d": "M16.7 6.9c-1.2-1.5-2.3-2.1-4.5-2.1-.9 0-2.1.4-2.6.5 0-.3-.2-.5-.5-.5h-.9c-.3 0-.5.2-.5.5v1.9c0 .3.2.5.5.5h.9c.3 0 .5-.2.5-.5h.5c.4 0 .7.3.7.7 0 .4.3.7.7.7v3.9c-.5 0-.9.4-.9.9v4.4c0 .8.6 1.4 1.4 1.4h.5c.8 0 1.4-.6 1.4-1.4v-4.4c0-.5-.4-.9-.9-.9V8.6c.4 0 .7-.5.7-.9s.3-.7.6-.7c1 0 1.5.3 1.8.6.1.1.4.1.5 0 .2-.2.3-.4.1-.7z" } },
	  custom45: { "path": { "d": "M7.9 10.3h8.2v3.4H7.9zm11.8-.4V8.6c0-.8-.7-1.4-1.5-1.4H5.8c-.8 0-1.5.6-1.5 1.4v1.3c0 .2.1.3.3.4.5.4.9 1 .9 1.7s-.4 1.3-.9 1.6c-.2.1-.3.3-.3.4v1.4c0 .8.7 1.4 1.5 1.4h12.4c.8 0 1.5-.6 1.5-1.4v-1.3c0-.2-.1-.3-.3-.4-.5-.4-.9-1-.9-1.7s.4-1.3.9-1.6c.2-.2.3-.3.3-.5zM17 15.1H7c-.3 0-.5-.2-.5-.5V9.4c0-.3.2-.5.5-.5h10c.3 0 .5.2.5.5v5.2c0 .3-.2.5-.5.5z" } },
	  custom46: { "path": { "d": "M14.6 8.9H9.4c-.3 0-.5.2-.5.5v5.2c0 .3.2.5.5.5h5.2c.3 0 .5-.2.5-.5V9.4c0-.3-.2-.5-.5-.5zm4.2-2.4c.3 0 .4-.2.4-.4v-.8c0-.3-.2-.5-.5-.5h-.8c-.2 0-.4.1-.4.4-.2.4-.6.8-1.2.8s-1-.4-1.1-.8c-.1-.3-.3-.4-.5-.4h-1.1c-.2 0-.4.1-.4.4-.2.4-.6.8-1.2.8s-1-.4-1.2-.8c0-.3-.2-.4-.4-.4H9.3c-.2 0-.4.1-.5.4-.1.4-.6.8-1.1.8-.5 0-1-.4-1.2-.8 0-.3-.2-.4-.4-.4h-.8c-.3 0-.5.2-.5.5v.8c0 .2.1.4.4.4.4.2.8.6.8 1.2s-.4 1-.8 1.1c-.3.1-.4.3-.4.5v1.1c0 .2.1.4.4.4.4.2.8.6.8 1.2s-.4 1-.8 1.2c-.3 0-.4.2-.4.4v1.1c0 .2.1.4.4.5.4.1.8.6.8 1.1s-.4 1-.8 1.2c-.3 0-.4.2-.4.4v.8c0 .3.2.5.5.5h.8c.2 0 .4-.1.4-.4.2-.4.6-.8 1.2-.8.5 0 1 .4 1.1.8.1.3.3.4.5.4h1.1c.2 0 .4-.1.4-.4.2-.4.6-.8 1.2-.8s1 .4 1.2.8c0 .3.2.4.4.4h1.1c.2 0 .4-.1.5-.4.1-.4.6-.8 1.1-.8s1 .4 1.2.8c0 .3.2.4.4.4h.8c.3 0 .5-.2.5-.5v-.8c0-.2-.1-.4-.4-.4-.4-.2-.8-.6-.8-1.2s.4-1 .8-1.1c.3-.1.4-.3.4-.5v-1.1c0-.2-.1-.4-.4-.4-.4-.2-.8-.6-.8-1.2s.4-1 .8-1.2c.3 0 .4-.2.4-.4V9.3c0-.2-.1-.4-.4-.5-.4-.1-.8-.6-.8-1.1s.4-1 .8-1.2zm-2.2 8.6c0 .8-.7 1.5-1.5 1.5H8.9c-.8 0-1.5-.7-1.5-1.5V8.9c0-.8.7-1.5 1.5-1.5h6.2c.8 0 1.5.7 1.5 1.5v6.2z" } },
	  custom47: { "path": { "d": "M15.4 17.3H7.2c-.8 0-1.4.6-1.4 1.4 0 .3.2.5.4.5h10.1c.3 0 .5-.2.5-.5 0-.8-.6-1.4-1.4-1.4zm3.2-7.6l-3.8-3.6.6-.9c.1-.1 0-.3-.2-.4-1.1-.2-1.9.6-1.9.6-7.3 0-6.1 8.2-5.8 10.1.1.2.3.3.5.3h6.5c.2 0 .3-.2.2-.3-1.3-1.7-2-3.5-2.5-4.6 0-.2.2-.4.4-.3 1.7.9 2.4-.1 3.6.7.6.3 1.3.2 1.8-.3l.6-.6c.2-.2.2-.5 0-.7zm-4.9-.8c-.4 0-.7-.3-.7-.7s.3-.8.7-.8.7.4.7.8-.3.7-.7.7z" } },
	  custom48: { "path": { "d": "M18.7 5.8h-2.4v-.5c0-.3-.2-.5-.5-.5H8.2c-.3 0-.5.2-.5.5v.5H5.3c-.3 0-.5.2-.5.4v3.2c0 1.2 1 2.1 2.2 2.1h1.1c.6 1.6 2.1 2.6 3.9 2.7 1.8 0 3.3-1.1 4-2.7h1c1.2 0 2.2-.9 2.2-2.1V6.2c0-.2-.2-.4-.5-.4zM7 10.1c-.4 0-.8-.3-.8-.7V7.2h1.5v2.9H7zm10.8-.7c0 .4-.4.7-.8.7h-.7V7.2h1.5v2.2zm-3.4 8.4h-.2c-.8 0-1.5-.7-1.5-1.5v-.5c0-.1-.1-.2-.2-.2h-1c-.1 0-.2.1-.2.2v.5c0 .8-.7 1.5-1.5 1.5h-.2c-.3 0-.5.2-.5.4v.5c0 .3.2.5.5.5h4.8c.3 0 .5-.2.5-.5v-.5c0-.2-.2-.4-.5-.4z" } },
	  custom49: { "path": { "d": "M12 9.8c-1.2 0-2.2 1-2.2 2.2s1 2.2 2.2 2.2 2.2-1 2.2-2.2-1-2.2-2.2-2.2zm0 3.4c-.7 0-1.2-.5-1.2-1.2s.5-1.2 1.2-1.2 1.2.5 1.2 1.2-.5 1.2-1.2 1.2zm0-8.4C8 4.8 4.8 8 4.8 12S8 19.2 12 19.2s7.2-3.2 7.2-7.2S16 4.8 12 4.8zm0 12.7c0 .3-.2.5-.5.5-2.9-.3-5.2-2.6-5.5-5.5 0-.3.2-.5.5-.5H7c.2 0 .4.2.5.4.2 2.2 1.9 3.9 4.1 4.1.2.1.4.3.4.5v.5zm0-1.9c-2 0-3.6-1.6-3.6-3.6S10 8.4 12 8.4s3.6 1.6 3.6 3.6-1.6 3.6-3.6 3.6zm5.5-3.6H17c-.2 0-.4-.2-.5-.4-.2-2.2-1.9-3.9-4.1-4.1-.2-.1-.4-.3-.4-.5v-.5c0-.3.2-.5.5-.5 2.9.3 5.2 2.6 5.5 5.5 0 .3-.2.5-.5.5z" } },
	  custom5: { "path": { "d": "M18.9 6.1c-2.4-.9-5.3-1.1-7.8-.3-2.2.7-4.5 2.4-4.8 4.9-.1.5-.1 1.1 0 1.6.1.2.2.5.3.8 0 .1.1.2.1.3l-.2.5C5.8 15 5.3 16.2 5 17.4c-.1.6-.4 1.3.1 1.7.3.1.6.1.8 0 .3-.1.3-.4.4-.7.2-1.3.6-2.6 1.3-3.7.3-.5.7-1 1.1-1.5.4-.4.9-1.1 1.5-.9.6.2.6.9.2 1.3s-.8.7-.8 1.3c0 .4.2.8.6 1.1.5.4 1.4.5 2 .5 1.3-.1 2.3-.5 3.3-1.2 1.4-1 1.9-2.6 2.2-4.2.1-.9.3-1.9.6-2.8.1-.4.3-.8.5-1.1.1-.2.3-.4.4-.6 0-.2-.1-.4-.3-.5z" } },
	  custom50: { "path": { "d": "M18.4 13.5c-.6.3-1.2.4-1.8.4-.8 0-1.6-.2-2.2-.6h-.2c-.7.4-1.4.6-2.2.6s-1.5-.2-2.2-.6h-.2c-.6.4-1.4.6-2.2.6-.6 0-1.2-.1-1.8-.4-.1-.1-.3.1-.3.2v2.9c0 .6.3 1.1.8 1.4 1.2.5 2.5.9 3.9 1.1.3 0 .6-.2.6-.5v-1.8c0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4v1.8c0 .3.3.5.6.5 1.3-.2 2.6-.6 3.8-1.1.6-.3.9-.8.9-1.4v-2.9c0-.1-.2-.3-.3-.2zm-11-1c.9 0 1.6-.4 2.1-1 .1-.1.3-.1.4 0 .5.6 1.2 1 2.1 1 .8 0 1.6-.4 2.1-1 .1-.1.2-.1.3 0 .5.6 1.3 1 2.1 1 1.4 0 2.5-1 2.6-2.1.1-.2 0-.4-.2-.5l-6-4.8c-.6-.4-1.3-.4-1.8 0L5 9.9c-.2.1-.2.3-.2.5.2 1.2 1.3 2.1 2.6 2.1z" } },
	  custom51: { "path": { "d": "M9.7 6.1c.6.5 1.2 1.4 1.5 2.2 0 .1.2.3.3.3h.5c.3 0 .5 0 .7-.1.6-.2 1.1-.4 1.6-.9.7-.7 1-1.8.7-2.7-.9-.2-1.9 0-2.7.7-.2.3-.3.5-.5.8-.4-.6-.8-1.2-1.4-1.5-.3-.2-.8-.1-1 .3-.1.3 0 .7.3.9zm7.4 3.5c-2.5-1.3-3 .5-5.1.5s-2.6-1.8-5.1-.5c-2.4 1.4-1.7 5.8-.7 7.5.8 1.5 2.4 3 5.6 1.5h.4c3.2 1.5 4.8 0 5.6-1.5 1-1.7 1.7-6.1-.7-7.5z" } },
	  custom52: { "path": { "d": "M19.2 8.4c0-.7 0-1.5-.1-2.3-.1-.6-.6-1.1-1.2-1.2-.8-.1-1.6-.1-2.3-.1-.2 0-.3.3-.2.4l3.4 3.4c.1.1.4 0 .4-.2zm-5.7-3c-.1-.2-.3-.2-.4-.2-1.8.5-3.6 1.5-5 2.9s-2.3 3.1-2.8 4.8c-.1.2 0 .4.1.5l5.2 5.2c.1.2.3.2.5.2 1.7-.6 3.4-1.5 4.8-2.9s2.4-3.1 2.9-4.9c0-.2 0-.4-.1-.5l-5.2-5.1zm-2 9.4c-.3.3-.7.3-1 0l-1.4-1.4c-.2-.2-.2-.7 0-1 .3-.3.8-.3 1.1 0l1.3 1.4c.3.2.3.7 0 1zm1.7-1.7c-.3.3-.8.3-1 0l-1.4-1.3c-.3-.3-.3-.8 0-1 .3-.3.8-.3 1 0l1.4 1.3c.3.3.3.7 0 1zm1.7-1.7c-.3.3-.8.3-1.1 0l-1.3-1.3c-.3-.3-.3-.8 0-1.1.3-.2.7-.2 1 0l1.4 1.4c.2.3.2.7 0 1zm-10.1 4c0 .8 0 1.7.1 2.5.1.6.6 1.1 1.2 1.2.9.1 1.7.1 2.5.1.2 0 .3-.3.2-.4l-3.6-3.5c-.1-.2-.4-.1-.4.1z" } },
	  custom53: { "path": { "d": "M17.9 13.7h-.1c-.6 0-1-.5-1-1V9.5c0-2.8-2.5-5-5.4-4.7-2.4.3-4.2 2.4-4.2 4.9v2.9c0 .6-.5 1.1-1.1 1.1-.5 0-.8.3-.8.8v.5c0 .5.3.8.8.8h11.8c.5 0 .8-.3.8-.8v-.5c0-.5-.3-.8-.8-.8zm-4.3 3.6h-3.2c-.2 0-.3.1-.3.3.2.9 1 1.6 1.9 1.6s1.8-.6 1.9-1.6c0-.2-.1-.3-.3-.3z" } },
	  custom54: { "path": { "d": "M6.5 11.8c1.6-.3 3-.9 4.4-1.6.5-.2 1.4-.7 1.8-.9.2 0 .3-.2.2-.3-.1-.7-.7-1.3-1.4-1.3H11v-.9c0-.3-.2-.5-.4-.5v-1c0-.3-.3-.5-.5-.5h-1c-.2 0-.5.2-.5.5v1c-.2 0-.4.2-.4.5v.9h-.5c-.8 0-1.5.7-1.5 1.5v2.3c0 .2.2.3.3.3zm10.8 4.8s1.7-2.7 1.9-6.6c0-.3-.2-.5-.5-.5-5.7.2-8.4 3.7-13.4 3.9-.3 0-.5.3-.5.5v1.8c0 .8.6 1.4 1.3 1.5 2.6.2 8 .5 11.1 1 .3.1.6-.2.5-.5-.1-.4-.2-.8-.4-1.1zm-.3-4.4c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.8.3.8.7-.4.7-.8.7z" } },
	  custom55: { "path": { "d": "M7.7 14.6h3.1c.3 0 .5-.2.5-.4V7c0-.6-.5-1-1-1H7.8c-.4 0-.6.2-.6.6v7.6c0 .2.2.4.5.4zm10.5-7.2v7.7c0 .5-.4 1-.9 1H6.7c-.5 0-.9-.5-.9-1V7.4c-.8 0-1.5.7-1.5 1.5v7.2c0 .8.7 1.4 1.5 1.4h4.5c.3 0 .5.2.5.5s.2.5.5.5h1.4c.3 0 .5-.2.5-.5s.2-.5.5-.5h4.5c.8 0 1.5-.6 1.5-1.4V8.9c0-.8-.7-1.5-1.5-1.5zm-5 7.2h3c.4 0 .6-.2.6-.5V6.5c0-.3-.2-.5-.5-.5h-2.6c-.5 0-1 .4-1 1v7.2c0 .2.2.4.5.4z" } },
	  custom56: { "path": { "d": "M15 7.3c-1.5 1.5-3.3-.4-5 1.3l-4.8 4.8c-.5.6-.5 1.5 0 2l1.7 1.7 1.7 1.7c.5.5 1.4.5 2 0l4.8-4.9c1.7-1.6-.2-3.5 1.4-5l.3-.4c.1-.1.1-.2 0-.3l-1.3-1.3c-.1-.1-.2-.1-.3 0l-.5.4zm-1.1 6.1l-1.7 1.7c-.2.2-.5.2-.7 0l-1.3-1.3-1.3-1.4c-.2-.2-.2-.4 0-.6l1.6-1.7c.2-.2.5-.2.7 0l1.4 1.3 1.3 1.4c.2.2.2.4 0 .6zm5.2-7.5l-.5-.5-.6-.5c-.1-.2-.4-.2-.6 0l-.6.6c-.1.1-.1.3 0 .4l1.3 1.3c.1.1.2.1.3 0l.6-.6c.2-.2.2-.5.1-.7z" } },
	  custom57: { "path": { "d": "M12.7 12.6v5.9c0 .2.2.3.4.2 1.1-.7 4.6-2.6 4.6-2.6.5-.3.8-.8.8-1.3V9.5c0-.2-.2-.3-.4-.2L13 12.2c-.2.1-.3.3-.3.4zm-.5-1.6l5.2-2.9c.2-.1.2-.3 0-.4C16.3 7 12.7 5 12.7 5c-.4-.2-1-.2-1.4 0 0 0-3.6 2-4.7 2.7-.2.1-.2.3 0 .4l5.2 2.9c.1.1.3.1.4 0zM11 12.2L5.9 9.3c-.2-.1-.4 0-.4.2v5.3c0 .5.3 1 .8 1.2 0 0 3.5 2 4.6 2.7.2.1.4-.1.4-.2v-5.9c0-.1-.1-.3-.3-.4z" } },
	  custom58: { "path": { "d": "M16.1 11c-.4 0-.8-.3-.7-.7 0-.4.3-.7.7-.7h2.1c.1 0 .2 0 .2-.1.2-.4.3-.7.5-1 0-.2-.1-.3-.3-.3h-1.5c-.4 0-.7-.3-.8-.7 0-.4.4-.8.8-.8H19c.1 0 .2-.1.2-.2v-.7c0-.3-.2-.5-.5-.5h-2.5c-.7 0-1.3.6-1.3 1.3 0 1.3-.9 2.5-2.2 2.9v-2c.5-.3.8-.9.7-1.5-.1-.6-.6-1.1-1.2-1.2-.9-.1-1.6.6-1.6 1.4 0 .6.3 1 .7 1.3v2C10 9.2 9.1 8 9.1 6.6c0-.7-.5-1.3-1.3-1.3H5.3c-.3 0-.5.2-.5.5v.7c0 .1.1.2.2.2h1.9c.4 0 .8.3.8.7 0 .4-.3.8-.7.8H5.4c-.2 0-.3.2-.2.3.1.3.2.7.4 1 .1.1.2.1.3.1h2c.4 0 .8.3.8.7 0 .4-.3.8-.7.8h-.6c-.2 0-.3.3-.2.4 1.1.9 2.4 1.5 4.1 1.5v5.5c0 .3.3.7.7.7.4 0 .8-.3.8-.7V13c1.7 0 3-.7 4-1.5.2-.2.1-.5-.1-.5h-.6z" } },
	  custom59: { "path": { "d": "M16.4 7.4c.2 0 .4-.2.4-.4 0-.1-.1-.3-.3-.4-.3-.2-.8-1-.9-1.5-.1-.2-.3-.3-.5-.3H9.3c-.2 0-.4.1-.4.3-.2.5-.7 1.3-1 1.5-.1.1-.2.2-.2.4 0 .3.2.4.4.4h8.3zM7.7 17.7c0 .9.6 1.5 1.4 1.5h6.3c.8 0 1.4-.6 1.4-1.4v-.1c0-.2-.2-.4-.5-.4H8.1c-.2 0-.4.2-.4.4zm9.1-2.3v-6c0-.3-.2-.5-.5-.5H8.2c-.3 0-.5.2-.5.5v6c0 .2.2.4.5.4h8.1c.3 0 .5-.2.5-.4z" } },
	  custom6: { "path": { "d": "M12 18.2H5.8c-.8 0-1.2-.8-.9-1.4l6.3-10.6c.3-.6 1.3-.6 1.6 0l6.3 10.6c.4.6-.1 1.4-.8 1.4H12z" } },
	  custom60: { "path": { "d": "M19.2 10.9c-.6-3.5-3.6-6.1-7.2-6.1s-6.6 2.6-7.2 6.1c0 .2.2.4.4.2.3-.3.8-.5 1.3-.5.7 0 1.3.3 1.7.8.1.1.2.1.3 0 .4-.5 1-.8 1.7-.8s1.2.3 1.6.8c.1.1.3.1.4 0 .4-.5 1-.8 1.6-.8s1.3.3 1.7.8c.1.1.2.1.3 0 .4-.5 1-.8 1.7-.8.5 0 1 .2 1.3.5.2.2.4 0 .4-.2zm-4.3 5.4c-.4 0-.7.3-.7.7s-.4.8-.8.8-.7-.4-.7-.8v-3.3c0-.4-.3-.7-.7-.7s-.7.3-.7.7V17c0 1.2.9 2.2 2.1 2.2s2.2-1 2.2-2.2c0-.4-.3-.7-.7-.7z" } },
	  custom61: { "path": { "d": "M17.5 4.8h-.9c-.3 0-.5.2-.5.5v.9c0 .3-.2.5-.5.5h-.5c-.2 0-.5-.2-.5-.5v-.9c0-.3-.2-.5-.4-.5h-1c-.3 0-.5.2-.5.5v.9c0 .3-.2.5-.5.5h-.4c-.3 0-.5-.2-.5-.5v-.9c0-.3-.2-.5-.5-.5h-1c-.2 0-.4.2-.4.5v.9c0 .3-.3.5-.5.5h-.5c-.3 0-.5-.2-.5-.5v-.9c0-.3-.2-.5-.5-.5h-.9c-.3 0-.5.2-.5.5v2.4c0 .8.6 1.4 1.4 1.4h9.2c.8 0 1.4-.6 1.4-1.4V5.3c0-.3-.2-.5-.5-.5zM16.4 11c0-.3-.2-.4-.4-.4H8c-.2 0-.4.1-.4.4l-1.1 7.6c-.1.3.2.6.5.6h3.1c.2 0 .5-.2.5-.5v-2.3c0-.8.6-1.5 1.4-1.5.8 0 1.4.6 1.4 1.4v2.4c0 .3.3.5.5.5H17c.3 0 .6-.2.5-.5L16.4 11z" } },
	  custom62: { "path": { "d": "M18.5 16.8h-13c-.4 0-.7.3-.7.7 0 .4.3.7.7.7h13c.4 0 .7-.3.7-.7s-.3-.7-.7-.7zM5.8 15.4h8.1v-1c0-.3.2-.5.5-.5h2.4c.3 0 .5.2.5.5v1h.9c.3 0 .5-.3.5-.5V6.7c0-.2-.2-.5-.5-.5H5.8c-.3 0-.5.3-.5.5v8.2c0 .2.2.5.5.5zm2.1-6.3c0-.2.2-.5.5-.5h7c.2 0 .4.3.4.5v.5c0 .3-.2.5-.4.5h-7c-.3 0-.5-.2-.5-.5v-.5zm0 2.9c0-.3.2-.5.5-.5H13c.2 0 .4.2.4.5v.5c0 .2-.2.5-.4.5H8.4c-.3 0-.5-.3-.5-.5V12z" } },
	  custom63: { "path": { "d": "M10.1 14.4h3.8c.3 0 .5-.2.5-.5v-3.8c0-.3-.2-.5-.5-.5h-3.8c-.3 0-.5.2-.5.5v3.8c0 .3.2.5.5.5zm8.4-1.7c.4 0 .7-.3.7-.7s-.3-.7-.7-.7h-1.2V9.8h1.2c.4 0 .7-.3.7-.7s-.3-.7-.7-.7h-1.2v-.2c0-.8-.7-1.5-1.5-1.5h-.2V5.5c0-.4-.3-.7-.7-.7s-.7.3-.7.7v1.2h-1.5V5.5c0-.4-.3-.7-.7-.7s-.7.3-.7.7v1.2H9.8V5.5c0-.4-.3-.7-.7-.7s-.7.3-.7.7v1.2h-.2c-.8 0-1.5.7-1.5 1.5v.2H5.5c-.4 0-.7.3-.7.7s.3.7.7.7h1.2v1.5H5.5c-.4 0-.7.3-.7.7s.3.7.7.7h1.2v1.5H5.5c-.4 0-.7.3-.7.7s.3.7.7.7h1.2v.2c0 .8.7 1.5 1.5 1.5h.2v1.2c0 .4.3.7.7.7s.7-.3.7-.7v-1.2h1.5v1.2c0 .4.3.7.7.7s.7-.3.7-.7v-1.2h1.5v1.2c0 .4.3.7.7.7s.7-.3.7-.7v-1.2h.2c.8 0 1.5-.7 1.5-1.5v-.2h1.2c.4 0 .7-.3.7-.7s-.3-.7-.7-.7h-1.2v-1.5h1.2zm-2.7 2.4c0 .4-.3.7-.7.7H8.9c-.4 0-.7-.3-.7-.7V8.9c0-.4.3-.7.7-.7h6.2c.4 0 .7.3.7.7v6.2z" } },
	  custom64: { "path": { "d": "M12 4.8C8 4.8 4.8 8 4.8 12S8 19.2 12 19.2s7.2-3.2 7.2-7.2S16 4.8 12 4.8zm0 12.5c-2.9 0-5.3-2.4-5.3-5.3S9.1 6.7 12 6.7s5.3 2.4 5.3 5.3-2.4 5.3-5.3 5.3zm2.8-8.4l-4 1.4c-.2.1-.4.3-.5.5l-1.4 4c-.1.2.1.4.3.3l4-1.4c.2-.1.4-.3.5-.5l1.4-4c.1-.2-.1-.4-.3-.3zM12 13c-.5 0-1-.5-1-1s.5-1 1-1 1 .5 1 1-.5 1-1 1z" } },
	  custom65: { "path": { "d": "M17.3 16.1h-12c-.3 0-.5.2-.5.4v.1c0 .8.6 1.4 1.4 1.4h10.1c.8 0 1.5-.6 1.5-1.4v-.1c0-.2-.3-.4-.5-.4zm-.5-9.6H5.3c-.2 0-.4.2-.5.5 0 .6 0 1.8.1 2.5.3 2.2 1.5 4.1 3.1 5.1.1 0 .2.1.3.1h5c.1 0 .2-.1.2-.1 1-.6 1.8-1.4 2.3-2.5.3.1.6.1 1 .1 1.6 0 2.9-1.3 2.9-2.8s-1.3-2.9-2.9-2.9zm0 4.3h-.4c.3-.8.4-1.6.4-2.5v-.4c.8 0 1.4.7 1.4 1.5s-.6 1.4-1.4 1.4z" } },
	  custom66: { "path": { "d": "M18.8 13.3l-3.5-3.5c-.6-.6-1.5-.6-2 0l-3.5 3.5c-.6.5-.6 1.4 0 2l3.5 3.5c.5.5 1.4.5 2 0l3.5-3.5c.5-.6.5-1.5 0-2zm-6.6 1.6c-.4.3-.9.3-1.2 0-.3-.4-.3-.9 0-1.2.3-.3.9-.3 1.2 0 .3.3.3.8 0 1.2zm2.7 2.7c-.4.3-.9.3-1.2 0-.3-.3-.3-.9 0-1.2.3-.3.9-.3 1.2 0 .3.3.3.9 0 1.2zm0-5.4c-.4.3-.9.3-1.2 0-.3-.4-.3-.9 0-1.2.3-.3.9-.3 1.2 0 .3.3.3.8 0 1.2zm2.7 2.7c-.3.3-.9.3-1.2 0-.3-.4-.3-.9 0-1.2.4-.3.9-.3 1.2 0 .3.3.3.8 0 1.2zM12.7 8V6.2c0-.8-.6-1.4-1.4-1.4H6.2c-.8 0-1.4.6-1.4 1.4v5.1c0 .8.6 1.4 1.4 1.4H8c.2 0 .3-.1.4-.1l.3-.3 3.5-3.6.3-.3c.1-.1.2-.2.2-.4zm-5.9 3.5c-.4 0-.8-.4-.8-.8s.4-.9.8-.9.9.4.9.9-.4.8-.9.8zm2-1.9c-.5 0-.9-.4-.9-.8s.4-.9.9-.9.8.4.8.9-.4.8-.8.8zm1.9-1.9c-.5 0-.9-.4-.9-.9s.4-.8.9-.8.8.4.8.8-.4.9-.8.9z" } },
	  custom67: { "path": { "d": "M13 12.7l-.3-.5c-.1-.2-.3-.3-.6-.3 0 0-.1.1-.2.1l-.8.3c-.3-.3-.7-.5-1.1-.6l-.2-.9c0-.3-.3-.5-.6-.5h-.6c-.2 0-.5.2-.6.5l-.1.9c-.4.1-.8.3-1.1.6L6 12h-.3c-.2 0-.4.1-.5.3l-.3.5c-.1.2-.1.5.2.7l.7.6c-.1.2-.1.4-.1.6s0 .5.1.7l-.7.6c-.3.2-.3.5-.2.7l.3.5c.1.2.3.3.5.3H6l.8-.3c.3.3.7.5 1.1.6l.1.9c.1.3.4.5.6.5h.6c.3 0 .6-.2.6-.5l.2-.9c.4-.1.8-.4 1.1-.7l.8.3c.1.1.2.1.2.1.3 0 .5-.1.6-.3l.3-.5c.1-.2.1-.6-.2-.8l-.7-.5c.1-.3.1-.5.1-.7 0-.2 0-.4-.1-.6l.7-.6c.2-.2.3-.5.2-.8zm-4.1 3.7c-.9 0-1.6-.7-1.6-1.6s.7-1.7 1.6-1.7c.9 0 1.7.7 1.7 1.7s-.8 1.6-1.7 1.6zm10.1-7l-.5-.5v-.5-.5l.5-.5c.2-.1.2-.4.1-.6l-.2-.4c-.1-.1-.3-.2-.4-.2h-.2l-.7.3c-.3-.3-.6-.5-.9-.5l-.1-.8c-.1-.2-.3-.4-.5-.4h-.5c-.2 0-.4.2-.5.4l-.1.7c-.3.1-.6.3-.9.6l-.7-.4h-.1c-.2 0-.4.1-.5.3l-.2.4c-.1.2-.1.4.1.6l.6.4c-.1.2-.1.4-.1.6 0 .1 0 .3.1.5l-.6.4c-.2.2-.2.4-.1.6l.2.4c.1.2.3.3.5.3h.1l.7-.3c.3.2.6.4.9.5l.1.7c.1.2.3.4.5.4h.5c.2 0 .5-.2.5-.4l.1-.7c.3-.1.7-.3.9-.6l.7.3h.2c.1 0 .3-.1.4-.2l.2-.4c.1-.1.1-.4-.1-.5zm-3.1.3c-.8 0-1.4-.6-1.4-1.3s.6-1.3 1.4-1.3 1.3.6 1.3 1.3-.6 1.3-1.3 1.3z" } },
	  custom68: { "path": { "d": "M12 4.8C8 4.8 4.8 8 4.8 12S8 19.2 12 19.2s7.2-3.2 7.2-7.2S16 4.8 12 4.8zm5.7 6.5h-1.9c-.1-1.7-.4-3.2-1-4.3 1.6.8 2.7 2.4 2.9 4.3zm-6.4-4.7v4.7H9.6c.1-2.3.9-4.1 1.7-4.7zm0 6.1v4.7c-.8-.6-1.6-2.4-1.7-4.7h1.7zm1.4 4.7v-4.7h1.7c-.1 2.3-.9 4.1-1.7 4.7zm0-6.1V6.6c.8.6 1.6 2.4 1.7 4.7h-1.7zM9.2 7c-.6 1.1-.9 2.6-1 4.3H6.3C6.5 9.4 7.6 7.8 9.2 7zm-2.9 5.7h1.9c.1 1.7.4 3.2 1 4.3-1.6-.8-2.7-2.4-2.9-4.3zm8.5 4.3c.6-1.1.9-2.6 1-4.3h1.9c-.2 1.9-1.3 3.5-2.9 4.3z" } },
	  custom69: { "path": { "d": "M12.6 10.8c-1.3-1-2.7-.5-3.6.4-.4.3-.9.5-1.5.6-.7.2-1.4.5-1.9 1-1.3 1.3-1 2.9.8 4.7h.1v.1c1.1 1 2.1 1.6 3 1.6.7 0 1.3-.3 1.9-.8.5-.5.7-1.2.9-1.9.2-.5.4-1.1.7-1.4.6-.5.9-1.1.9-1.8.1-.4 0-1.1-.5-1.7 0 0-.3-.4-.8-.8zm-3 5.8c-.1.1-.2.2-.4.2s-.4-.1-.5-.2l-1.3-1.3c-.3-.3-.3-.7 0-.9s.7-.3.9 0l1.3 1.3c.3.2.3.6 0 .9zm1.2-2c-.7 0-1.2-.5-1.2-1.2s.5-1.2 1.2-1.2 1.2.6 1.2 1.2-.5 1.2-1.2 1.2zM19.1 6L18 4.9c-.2-.1-.6-.1-.8 0L16 6.2c-.2.2-.2.5 0 .7V7l-2.4 2.4c-.1.1-.1.3 0 .4.2.2.5.4.7.6.1.1.2.1.3 0L17 8h.1c.2.2.5.2.7 0l1.3-1.2c.1-.2.1-.5 0-.8z" } },
	  custom7: { "path": { "d": "M6.7 18.7c-.8 0-1.4-.6-1.4-1.4V6.7c0-.8.6-1.4 1.4-1.4h10.6c.8 0 1.4.6 1.4 1.4v10.6c0 .8-.6 1.4-1.4 1.4H6.7z" } },
	  custom70: { "path": { "d": "M11.5 15.3l-2.8-2.7c-.5-.6-1.5-.6-2 0l-1.8 1.7c-.1.2-.1.5 0 .7l.4.3.3.3 2.8 2.8.2.2.5.5c.2.1.5.1.7 0l1.7-1.7c.6-.6.6-1.5 0-2.1zm-4.5-1l.4-.3c.2-.2.4-.2.6 0l2.1 2c.2.2.2.5 0 .7l-.3.3c-.2.2-.5.2-.7 0L7 15c-.2-.2-.2-.5 0-.7zm3-2.5l2.2 2.2c.1 0 .1.1.2.1l1-.1c.2 0 .3-.1.3-.2v-.9c0-.1.1-.2.2-.2h.9c.1 0 .2-.1.2-.2v-.9c0-.1.1-.2.3-.2h.9c.1 0 .2-.1.2-.3v-.9c0-.1.1-.2.2-.2h.9c.2 0 .3-.1.3-.2v-.9c0-.1.1-.2.2-.2l1-.2c.1 0 .2-.2.1-.3L17 5c-.2-.2-.5-.2-.7 0L10 11.2c-.2.2-.2.4 0 .6z" } },
	  custom71: { "path": { "d": "M17.1 7.4c-1.4-1.4-3.3-2.2-5.3-2.1-3.9.1-7 3.4-7 7.3v2.3c0 .8.6 1.4 1.4 1.4h1v1.2c0 .6.5 1.1 1.1 1.2.7.1 1.3-.5 1.3-1.2v-4.3c0-.6-.5-1.1-1.1-1.2-.7-.1-1.3.5-1.3 1.2v1.7h-.5c-.2 0-.5-.2-.5-.5v-1.8c0-3.1 2.6-5.8 5.6-5.9 1.6 0 3.1.5 4.2 1.7 1.1 1.1 1.8 2.5 1.8 4.1v1.9c0 .3-.3.5-.5.5h-.5v-1.7c0-.6-.5-1.1-1.1-1.2-.7-.1-1.3.5-1.3 1.2v4.3c0 .6.5 1.1 1.1 1.2.7.1 1.3-.5 1.3-1.2v-1.2h1c.8 0 1.4-.6 1.4-1.4v-2.3c0-1.9-.7-3.8-2.1-5.2z" } },
	  custom72: { "g": { "path": { "d": "M18.5 4.8h-13c-.4 0-.7.3-.7.7s.3.7.7.7h5.8v1.5c-2.6.4-4.6 2.6-4.6 5.2v1.7c0 1.7 1.4 3.2 3.2 3.2h4.2c1.8 0 3.2-1.5 3.2-3.2v-1.7c0-2.7-2-4.9-4.6-5.2V6.2h5.8c.4 0 .7-.3.7-.7s-.3-.7-.7-.7zm-3.1 8.1c0 .7-.6 1.3-1.3 1.3H9.9c-.7 0-1.2-.6-1.3-1.3.1-1.8 1.5-3.3 3.4-3.3s3.3 1.5 3.4 3.3z" }, "circle": [{ "cx": "6.24", "cy": "18.24", "r": ".96" }, { "cx": "17.76", "cy": "18.24", "r": ".96" }] } },
	  custom73: { "path": { "d": "M5.6 8.4h12.8c.3 0 .5-.3.4-.6-.3-1-.7-1.9-1.3-2.7-.1-.2-.5-.3-.7-.1-.6.6-1.3.9-2.2.9-.9 0-1.7-.4-2.3-1-.2-.1-.5-.1-.6 0-.6.6-1.5 1-2.3 1-.9 0-1.6-.3-2.2-.9-.3-.2-.6-.1-.7.1-.6.8-1.1 1.7-1.3 2.7-.1.3.1.6.4.6zm13.6 1.9c0-.2-.2-.5-.5-.5H5.3c-.3 0-.5.3-.5.5v.1c0 4.5 3.1 8.2 7.2 8.8 4.1-.6 7.2-4.3 7.2-8.8v-.1z" } },
	  custom74: { "path": { "d": "M13.4 17.5H11c-.2 0-.4.2-.4.5v.7c0 .3.2.5.4.5h2.4c.3 0 .5-.2.5-.5V18c0-.3-.2-.5-.5-.5zM12.2 4.8C9.3 4.8 7 7.1 7 9.8c0 1.8.9 3.4 2.5 4.3.5.3.9.9 1 1.6.1.2.3.4.5.4h2.5c.3 0 .4-.2.5-.4.1-.7.5-1.3 1.1-1.6 1.4-.9 2.4-2.5 2.4-4.3 0-2.7-2.3-5-5.3-5zm-1.6 2.3c-.5.9-.7 1.9-.8 2.8 0 .9.2 1.8.5 2.6.1.2-.1.4-.3.3-2.2-1.1-2.1-5.3.3-6.1.2-.1.4.2.3.4zm1.9 5.7c-.1.2-.4.2-.5 0-.4-1-.5-2.1-.5-3.1s.1-2.1.5-3c.1-.2.4-.2.5 0 .3.9.4 2 .5 3-.1 1-.2 2.1-.5 3.1zm1.9 0c-.2.1-.4-.1-.3-.3.3-.9.4-1.8.5-2.7-.1-.8-.3-1.9-.8-2.7-.1-.2.1-.5.3-.4 2.4.8 2.5 5 .3 6.1z" } },
	  custom75: { "path": { "d": "M12 4.8c-.4 0-.7.3-.7.7v13c0 .4.3.7.7.7 4 0 7.2-3.2 7.2-7.2S16 4.8 12 4.8zm5.7 6.5h-1.9c-.1-1.7-.4-3.2-1-4.3 1.6.8 2.7 2.4 2.9 4.3zm-5 6.1v-4.7h1.7c-.1 2.3-.9 4.1-1.7 4.7zm0-6.1V6.6c.8.6 1.6 2.4 1.7 4.7h-1.7zm2.1 5.7c.6-1.1.9-2.6 1-4.3h1.9c-.2 1.9-1.3 3.5-2.9 4.3zM8 9.6c.2.1.5.1.7-.1L10 8c.2-.2.2-.5 0-.6L8.7 6c-.2-.1-.4-.1-.6 0-.1 0-.2.1-.3.1-1.8 1.3-3 3.5-3 5.9 0 2.4 1.2 4.6 3 5.9.1 0 .2.1.3.1.2.1.4.1.6 0l1.3-1.4c.2-.1.2-.4 0-.6l-1.3-1.5c-.2-.2-.5-.2-.7-.1l-.5.4C7 14 6.7 13 6.7 12s.3-2 .8-2.8l.5.4z" } },
	  custom76: { "path": { "d": "M12.7 13.3c-.1-.2-.3-.4-.5-.3H12c-2.6 0-4.8-2.2-4.8-4.8V8c0-.2-.3-.3-.4-.1-.2.2-.3.5-.4.8-.4 1.4.1 2.9 1.3 3.7.5.4 1 .6 1.6.7l.2.4c0 .1.1.1.1.2l.7.3c.1 0 .2.2.1.3l-.2.7c0 .1 0 .2.1.3l.4.1c.1.1.2.2.1.3l-.2.8c0 .1 0 .2.1.3l.6.2c.1.1.1.2.1.3l-.2.8c0 .1 0 .2.2.3l1.6.7c.1.1.2 0 .3-.1l.7-1.6c.1-.1.1-.3 0-.4l-1.3-3.7zm6.4-.3l-3.9-4c.2-.6.2-1.2 0-1.9-.5-1.3-1.7-2.2-3-2.3-2.1-.1-3.8 1.7-3.6 3.8.2 1.4 1.3 2.6 2.7 2.9.6.1 1.2 0 1.8-.1l.3.3c.1.1.1.1.2.1h.8c.1 0 .2.1.2.2l.1.8c0 .1.1.2.3.2h.4c.1 0 .2.1.2.2l.1.8c0 .1.1.2.3.2h.6c.1 0 .2.1.2.2l.1.8c0 .1.1.2.3.2H19c.1 0 .2-.1.2-.3v-1.7c0-.2 0-.3-.1-.4zm-7.6-4.1c-.7 0-1.2-.5-1.2-1.2s.5-1.2 1.2-1.2 1.2.5 1.2 1.2c0 .6-.5 1.2-1.2 1.2z" } },
	  custom77: { "path": { "d": "M7.7 10.1h.9c.2 0 .3-.1.3-.3v-.3c0-1.8 1.3-3.3 3.1-3.3s3.1 1.5 3.1 3.3v.3c0 .2.1.3.3.3h.9c.2 0 .3-.1.3-.3v-.3c0-2.6-2-4.7-4.6-4.7S7.4 6.9 7.4 9.5v.3c0 .2.1.3.3.3zm9.1 1.4H7.4c-.8 0-1.4.7-1.4 1.5v4.8c0 .8.6 1.4 1.4 1.4h9.4c.8 0 1.4-.6 1.4-1.4V13c0-.8-.6-1.5-1.4-1.5zm-3.5 3.9c-.2.3-.4.7-.3 1.1l.2.7c0 .3-.1.6-.4.6h-1.6c-.3 0-.4-.3-.4-.6l.2-.7c.1-.4-.1-.8-.3-1.1-.2-.3-.3-.7-.2-1.1.1-.6.6-1 1.2-1.1 1-.2 1.8.5 1.8 1.4 0 .3-.1.5-.2.8z" } },
	  custom78: { "path": { "d": "M18.8 7l-4.3-2.1c-.2-.1-.5-.1-.7 0l-4 2-4-2c-.2-.1-.4-.1-.7 0-.2.1-.3.4-.3.6v10.8c0 .3.1.5.4.7l4.3 2.1c.2.1.5.1.7 0l4-2 4 2c.1.1.2.1.3.1.1 0 .2 0 .4-.1s.3-.4.3-.6V7.7c0-.3-.1-.5-.4-.7zm-1 1.4v5.7c0 .3-.4.6-.7.5-1.1-.5-.2-2.3-1-3.3s-1.7 0-2.7-1.5c-.8-1.4.4-2.4 1.4-2.9.2-.1.3-.1.4 0L17.5 8c.2.1.3.2.3.4zm-6.2 8.4c-.1.1-.3 0-.5-.1-.3-.3-.5-.7-.5-1.1 0-.7-1.2-.5-1.2-1.9 0-1.2-1.5-1.5-2.6-1.4-.3 0-.6-.2-.6-.5V7.5c0-.4.4-.6.7-.5l2.6 1.3c.1 0 .1.1.1.1h.1c1.1.6.9 1.2.4 1.9-.5.9-.7 0-1.4-.2s-1.5.2-1.2.7.9 0 1.4.5.5 1.2 1.9.7 1.7-.2 2.2.2.7 1.5 0 2.2c-.4.4-.6 1.3-.8 1.9-.1.1-.1.3-.2.3l-.4.2z" } },
	  custom79: { "path": { "d": "M9.4 9.8c-1 0-1.7.8-1.7 1.7s.7 1.7 1.7 1.7 1.6-.7 1.6-1.7-.7-1.7-1.6-1.7zm9.6 5.3h-4.6v-1.9h.5c.2 0 .5-.2.5-.5v-1.4c0-.3-.3-.5-.5-.5h-.6c-.4-2.4-2.4-4.3-4.9-4.3-2.8-.1-5.1 2.3-5.1 5.1.1 2.8 2.4 5 5.2 5h8.7v.4c0 .3.3.5.5.5h.5c.3 0 .5-.2.5-.5v-1.2c0-.4-.3-.7-.7-.7zm-9.6-.5c-1.8 0-3.2-1.4-3.2-3.1s1.4-3.1 3.2-3.1 3.1 1.4 3.1 3.1-1.4 3.1-3.1 3.1z" } },
	  custom8: { "path": { "d": "M11.3 5.1l-5.8 6.3c-.3.3-.3.9 0 1.2l5.8 6.3c.4.4 1 .4 1.4 0l5.8-6.3c.3-.3.3-.9 0-1.2l-5.8-6.3c-.4-.4-1-.4-1.4 0z" } },
	  custom80: { "path": { "d": "M7 14.4c-1.4 0-2.4 1.1-2.4 2.4s1 2.4 2.4 2.4 2.4-1.1 2.4-2.4-1.1-2.4-2.4-2.4zm0 3.4c-.6 0-1-.5-1-1s.4-1 1-1 .9.5.9 1-.4 1-.9 1zm10-3.4c-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4 2.4-1.1 2.4-2.4-1-2.4-2.4-2.4zm0 3.4c-.5 0-.9-.5-.9-1s.4-1 .9-1 1 .5 1 1-.4 1-1 1zm-.1-4.8c.5-.1 1 0 1.5.2.2.1.5 0 .6-.2 1.3-2.4-.7-3.4-2-4.1-.3-.1-.7.1-.7.5v1.4c0 .2-.2.5-.5.5-1.7-.3-3.3-2.2-5.2-2.2S8.4 11 8.4 11c-1.3 0-2.7-.1-3.3-.2-.3-.1-.5.2-.5.5 0 0 0 1.7 2.4 1.7 1.9 0 3.6 1.4 3.8 3.4 0 .5 0 1-.2 1.5 0 .1.1.3.3.3h2.2c.2 0 .3-.2.3-.3-.2-.5-.2-1-.2-1.5.2-1.8 1.8-3.4 3.7-3.4zM4.6 11.3zm6.3-3.7c0 .2.1.3.3.4l2.6.8c.2.1.4 0 .6-.2l.2-.4c.1-.2-.1-.4-.2-.4-.8-.1-2.3-.4-1.9-1.2.4-.7 1.3-.5 1.8-.3.2.1.5-.1.4-.3-.4-.8-1.2-1.3-2.1-1.2-1.2.1-1.9 1.2-1.8 2.4l.1.4z" } },
	  custom81: { "path": { "d": "M18.5 4.8h-1.2c-3.7.2-8 1.1-8.2 1.2-.3.1-.5.4-.5.7v7.8c-.2-.1-.6-.1-.9-.1-1.6 0-2.9 1-2.9 2.4s1.3 2.4 2.9 2.4 2.9-1.1 2.9-2.4v-4.9c0-.3.1-.5.3-.5 1.2-.3 2.8-.6 5.9-.8.3 0 .5.2.5.5v2.5c-.3-.1-.6-.2-1-.2-1.6 0-2.9 1.1-2.9 2.4s1.3 2.4 2.9 2.4 2.9-1.1 2.9-2.4V5.5c0-.4-.3-.7-.7-.7zm-1.7 3.8c-2.9.2-4.4.4-5.7.7-.3.1-.5-.1-.5-.4v-.8c0-.2.1-.4.3-.5 1.3-.3 2.8-.6 5.9-.8.3 0 .5.2.5.5v.8c0 .3-.2.5-.5.5z" } },
	  custom82: { "path": { "d": "M19.2 10.6h-5c-.3 0-.5.2-.5.4v.3c0 .4-.3.7-.7.7-.4 0-.8-.3-.8-.7V11c0-.2-.2-.4-.4-.4h-1.2c-1.4 0-2.7.8-3.3 2-.3-.1-.5-.1-.8-.1-1.2 0-2.2.9-2.2 2.1s1 2.2 2.2 2.2c.3 0 .5 0 .8-.1.6 1.1 1.9 1.9 3.3 2 2.3.1 4.3-1.7 4.3-4.1v-.4c-.1-.2.1-.5.3-.5l4.1-.9c.2-.1.4-.2.4-.5V11c0-.2-.2-.4-.5-.4zM6.5 15.4c-.4 0-.7-.4-.7-.8s.3-.7.7-.7c.1 0 .2 0 .3.1-.1.3-.1.6-.1.9 0 .1 0 .3.1.4-.1 0-.2.1-.3.1zM13 8.9c.4 0 .7-.3.7-.7V6c0-.4-.3-.7-.7-.7s-.8.3-.8.7v2.2c0 .4.4.7.8.7zm-3.5.2c.2.2.4.3.6.3.1 0 .3-.1.5-.2.3-.3.3-.7 0-1L9.2 6.5c-.3-.3-.7-.3-1-.1-.3.3-.4.8-.1 1l1.4 1.7zm6.3.3c.2 0 .4-.1.6-.3l1.4-1.7c.3-.3.2-.7 0-1-.4-.2-.8-.2-1 .1l-1.5 1.7c-.3.3-.2.8.1 1 .1.1.3.2.4.2z" } },
	  custom83: { "path": { "d": "M17.9 9.4c.1.1.2.1.3 0l.4-.3c.8-.8.8-2.1 0-2.9l-1-1c-.8-.7-2-.4-2.6.3l-.4.3c-.1.1-.1.2 0 .3l3.3 3.3zm-4.3-2.2c-.1-.1-.3-.1-.4 0l-6.6 6.5c-.3.4-.6.8-.7 1.3l-1.1 3.2c0 .2 0 .5.1.6.1.3.4.4.6.4h.2s2.2-.7 3.3-1.1c.5-.1.9-.4 1.3-.7l6.6-6.6c.1-.1.1-.2 0-.3l-3.3-3.3zm-5 9.6c-.5.1-1.3.4-2 .6l.6-2c.1-.2.3-.4.5-.6l1.6 1.6c-.2.2-.5.3-.7.4z" } },
	  custom84: { "path": { "d": "M18 15.4H6c-.4 0-.7.3-.7.7s.3.7.7.7h1l.4 2c0 .3.2.4.4.4h7.9c.2 0 .4-.1.5-.4l.4-2H18c.4 0 .7-.3.7-.7s-.3-.7-.7-.7zM7.9 13.9h3.4v-1.3c-.3-.2-.5-.5-.5-.8 0-.6.4-1 1-1s.9.4.9 1c0 .3-.2.6-.5.8v1.3h3.4c.3 0 .5-.2.5-.5v-.7c0-1.4-1.4-1.9-2.5-2.4-.8-.3-.9-.6-.9-.9 0-.3.2-.6.5-.8.4-.4.7-.9.7-1.6 0-1.2-.8-2.2-2.1-2.2-1.4 0-2.2 1-2.2 2.2 0 .7.3 1.2.7 1.6.3.2.5.5.5.8 0 .3-.1.6-.9.9-1.1.5-2.5 1-2.5 2.4v.7c0 .3.3.5.5.5z" } },
	  custom85: { "path": { "d": "M18.7 5.8h-12v-.5c0-.3-.2-.5-.5-.5h-.9c-.3 0-.5.2-.5.5v13.4c0 .3.2.5.5.5h.9c.3 0 .5-.2.5-.5v-11h12c.3 0 .5-.2.5-.5v-1c0-.2-.2-.4-.5-.4zm-.9 3.3H9.6c-.8 0-1.4.7-1.4 1.5v5.2c0 .8.6 1.5 1.4 1.5h8.2c.8 0 1.4-.7 1.4-1.5v-5.2c0-.8-.6-1.5-1.4-1.5zm-1.4 4.1h-.6v2.4c0 .1-.1.2-.2.2h-1c-.1 0-.2-.1-.2-.2v-1.4c0-.2-.1-.3-.2-.3h-1c-.1 0-.2.1-.2.3v1.4c0 .1-.1.2-.3.2h-.9c-.2 0-.3-.1-.3-.2v-2.4h-.6c-.1 0-.1-.1-.1-.2l2.7-2.6c.1-.1.3-.1.3 0l2.7 2.6c.1.1.1.2-.1.2z" } },
	  custom86: { "path": { "d": "M9.1 7.2h1c.1 0 .2-.1.2-.2v-.8h3.4V7c0 .1.1.2.2.2h1c.1 0 .2-.1.2-.2v-.8c0-.8-.6-1.4-1.4-1.4h-3.4c-.8 0-1.4.6-1.4 1.4V7c0 .1.1.2.2.2zm8.7 1.4H6.2c-.8 0-1.4.7-1.4 1.5v7.7c0 .8.6 1.4 1.4 1.4h11.6c.8 0 1.4-.6 1.4-1.4v-7.7c0-.8-.6-1.5-1.4-1.5zM12 17.3c-1.8 0-3.4-1.5-3.4-3.4s1.6-3.3 3.4-3.3 3.4 1.5 3.4 3.3-1.6 3.4-3.4 3.4zm1.4-4.1h-.7v-.7c0-.3-.2-.5-.5-.5h-.4c-.3 0-.5.2-.5.5v.7h-.7c-.3 0-.5.2-.5.5v.5c0 .2.2.4.5.4h.7v.8c0 .2.2.4.5.4h.4c.3 0 .5-.2.5-.4v-.8h.7c.3 0 .5-.2.5-.4v-.5c0-.3-.2-.5-.5-.5z" } },
	  custom87: { "path": { "d": "M18 4.8H6c-.4 0-.7.3-.7.7V17c0 .4.3.8.7.8h.2v.7c0 .4.4.7.8.7h.4c.4 0 .8-.3.8-.7v-.7h7.6v.7c0 .4.4.7.8.7h.4c.4 0 .8-.3.8-.7v-.7h.2c.4 0 .7-.4.7-.8V5.5c0-.4-.3-.7-.7-.7zM7.4 16.3c-.4 0-.7-.3-.7-.7V7c0-.4.3-.8.7-.8h9.2c.4 0 .7.4.7.8v8.6c0 .4-.3.7-.7.7H7.4zm8-8.6H8.6c-.2 0-.4.2-.4.5v6.2c0 .3.2.5.4.5h6.8c.2 0 .4-.2.4-.5V8.2c0-.3-.2-.5-.4-.5zM14.2 12h-2c-.2.5-.8 1-1.4 1-1 0-1.7-.8-1.7-1.7s.7-1.7 1.7-1.7c.6 0 1.2.5 1.4 1h2c.4 0 .7.3.7.7s-.3.7-.7.7z" } },
	  custom88: { "path": { "d": "M18.7 16.8H5.3c-.3 0-.5.2-.5.4v.1c0 1 1.3 1.9 2.4 1.9h9.6c1.1 0 2.4-.9 2.4-1.9v-.1c0-.2-.2-.4-.5-.4zM5.5 15.4h4.3c.3 0 .5-.3.5-.6V6.6c0-.1-.1-.2-.2-.1L5.3 15c-.1.1 0 .4.2.4zm6.7 0h6c.3 0 .5-.3.5-.6-.2-1.7-.5-7.1-6.6-10-.1 0-.3 0-.3.2v9.8c0 .3.2.6.4.6z" } },
	  custom89: { "path": { "d": "M13.9 10.4c-.1-.1-.3-.1-.4.1-.3.4-.5 1-.5 1.7v2.7c0 .4-.4.7-.8.7-.3 0-.7-.3-.7-.7V6.7c0-1.9-1.6-2.2-2.8-1.7-.3.1-.6.3-.8.5-.1.2-.3.3-.5.4-.4.1-1.2-.3-1.6-.5-.2-.1-.5-.1-.6.1l-.3.4c-.2.2-.1.6.1.7.5.3 1.2.8 1.7.9.9.1 1.7-.2 2.3-.7.1-.2.4-.4.6-.1.5.7-1.4 3.8-1.4 8.4v.4c0 1.9 1.9 3.6 3.9 3.7 2 .1 3.7-1.5 3.7-3.6 0-1 .4-1.7.8-2.1.1-.1.1-.2 0-.3l-2.7-2.8zm4.6 2.3c-.2 0-.4-.1-.5-.2l-3.9-3.8c-.3-.3-.3-.8 0-1 .3-.3.8-.3 1 0l3.9 3.8c.3.3.3.7 0 1-.2.1-.3.2-.5.2z" } },
	  custom9: { "path": { "d": "M14.9 4.8h-4.1c-.6 0-1.1.4-1.3.9L7 12.2c-.2.5.1 1 .6 1h4.2l-1.6 5.4c-.1.5.5.8.8.4l6.4-7.5c.4-.4 0-1.2-.6-1.2h-3.1l2.7-4.4c.3-.5 0-1.1-.6-1.1h-.9z" } },
	  custom90: { "path": { "d": "M18.6 6.2l-5.9.9v8.3c0 .1-.1.2-.2.2h-1c-.1 0-.2-.1-.2-.2V7.3l-5.7.9h-.1c-.3 0-.7-.3-.7-.7 0-.3.2-.7.6-.8L9.9 6c.4-.7 1.2-1.2 2.1-1.2.6 0 1.2.2 1.7.7l4.7-.7c.4 0 .8.2.8.6 0 .4-.2.8-.6.8zm-8.7 8.9c.2-.2.2-.5.1-.7L8.1 9.8c-.1-.3-.4-.4-.7-.4s-.5.1-.6.4l-2 4.6c0 .2 0 .4.1.6 0 .1 1 1.5 2.5 1.5.9 0 1.7-.4 2.5-1.4zm-2.5-3.2l1.1 2.5H6.4l1-2.5zm9.8-3.5c-.1-.3-.4-.5-.6-.5s-.6.2-.7.5L14 12.9c-.1.2-.1.5 0 .7.1.1 1 1.5 2.5 1.5.9 0 1.7-.5 2.5-1.4.2-.3.2-.5.1-.8l-1.9-4.5zm-.6 2.1l1 2.5h-2.1l1.1-2.5zM12 17c-1.3 0-2.7.5-3.7 1.3-.1.1-.1.3-.1.4 0 .3.2.5.4.5h6.8c.2 0 .4-.2.4-.5 0-.1 0-.3-.1-.4-1-.8-2.4-1.3-3.7-1.3z" } },
	  custom91: { "path": { "d": "M18.7 7.8c-.7-.2-1.4-.7-1.8-1.3-.3-.5-.3-1.7-1.1-1.7H8.2c-.8 0-.8 1.2-1.1 1.7-.5.7-1.2.9-1.9 1.4-.8.5-.1 2.4.1 3 .7 2.7 2.1 5.2 4.3 6.9.7.5 1.3 1 2.1 1.3.6.4 1.7-.6 2.2-.9 1.2-.9 2.3-2 3.1-3.3.7-1.1 1.2-2.3 1.6-3.6.1-.5.3-1 .4-1.5.1-.4.3-1.1.1-1.5 0-.2-.2-.4-.4-.5-1.1-.3.3.1 0 0zm-1.1 1.7c-.6 3.2-2.4 6.2-5.2 8l-.4.2-.4-.2c-3.4-2.1-4.7-5.5-5.2-8L6.3 9l.4-.3c.8-.4 1.5-1.2 1.9-2.1l.2-.4h6.4l.2.3c.4.9 1.1 1.8 2 2.3l.3.2-.1.5zm-5.9-1.8c-.5 0-1.9 0-2.1.2-.5.4-.7 1-1.2 1.4-.5.5-.3.9-.1 1.5.3 1 .8 2 1.4 2.9.3.4.7.8 1.1 1.2.1.1 1.2 1.3 1.2.6V8.2c0-.3 0-.5-.3-.5z" } },
	  custom92: { "path": { "d": "M17.7 13.5L12.2 11h-.4l-5.5 2.5c-.3.2-.4.5-.2.8.6.8.9 1.9 1.1 2.4 0 .2.2.3.4.3 1.9.5 3.4 1.6 4.1 2.1.2.1.4.1.6 0 .7-.5 2.2-1.6 4.1-2.1.2 0 .4-.1.4-.3.1-.5.5-1.6 1.1-2.4.2-.2.1-.6-.2-.8zm-7.1 1.4c-.4 0-.8-.5-.8-1s.4-.9.8-.9.7.4.7.9-.3 1-.7 1zm2.8 0c-.4 0-.7-.5-.7-1s.3-.9.7-.9.8.4.8.9-.4 1-.8 1zm-5.1-3.8l2.9-1.4c.3-.1.7-.2 1.1-.1.2 0 .4.1.5.1l2.9 1.4c.2.1.4-.1.4-.2V9.8c0-.1-.1-.2-.2-.3-.2-.3-.5-.6-1.3-.6V7.5c0-.2-.1-.4-.2-.4-.3-.2-.7-.4-1.4-.5V5.3c0-.3-.3-.5-.5-.5h-1c-.2 0-.5.2-.5.5v1.3c-.7.1-1.1.3-1.4.5-.1 0-.2.2-.2.4v1.4c-.8 0-1.1.3-1.3.5-.1.1-.2.2-.2.4v1c0 .2.2.3.4.3z" } },
	  custom93: { "g": { "path": { "d": "M10.2 12h7.1c.2 0 .4-.1.4-.4L19 7.1c.1-.3-.1-.6-.4-.6h-11l-.2-.7c-.1-.3-.4-.5-.7-.5H5.6c-.4 0-.8.3-.8.7 0 .4.3.7.7.7h.7l2.2 7.7c.1.3.4.5.7.5h8.4c.4 0 .7-.3.8-.7 0-.4-.3-.8-.8-.8h-7.3c-.3 0-.6-.2-.7-.5-.1-.4.2-.9.7-.9z" }, "circle": [{ "cx": "10.32", "cy": "17.52", "r": "1.2" }, { "cx": "16.08", "cy": "17.52", "r": "1.2" }] } },
	  custom94: { "path": { "d": "M13.4 9.1V5.5c0-.4-.3-.7-.7-.7h-.9c-.4 0-.8.3-.8.7s.4.7.8.7h.2v2.9c0 1.6-1.3 2.9-2.9 2.9s-2.9-1.3-2.9-2.9V6.2h.3c.4 0 .7-.3.7-.7s-.3-.7-.7-.7h-1c-.4 0-.7.3-.7.7v3.6c0 2.4 1.9 4.3 4.3 4.3s4.3-1.9 4.3-4.3zm5.8 2.9c0-1.2-1-2.2-2.2-2.2s-2.1 1-2.1 2.2c0 .9.6 1.7 1.4 2v.6c0 1.7-1.4 3.2-3.2 3.2-1.6 0-2.8-1.1-3.2-2.5 0-.3-.2-.4-.4-.4H9c-.3 0-.6.3-.5.6.4 2.1 2.3 3.7 4.5 3.7h.1c2.6 0 4.7-2.1 4.7-4.6V14c.8-.3 1.4-1.1 1.4-2zm-2.2.7c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.8.3.8.7-.4.7-.8.7z" } },
	  custom95: { "path": { "d": "M12.7 7.2v-1h.3c.3 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7h-2c-.3 0-.7.3-.7.7 0 .4.3.7.7.7h.3v1c-3 .4-5.3 2.9-5.3 6 0 3.3 2.7 6 6 6s6-2.7 6-6c0-3.1-2.3-5.6-5.3-6zM12 17.8c-2.5 0-4.6-2.1-4.6-4.6S9.5 8.6 12 8.6s4.6 2.1 4.6 4.6-2.1 4.6-4.6 4.6zm1.6-7l-1.1 1.1c-.2-.1-.3-.1-.5-.1-.8 0-1.4.6-1.4 1.4s.6 1.4 1.4 1.4 1.4-.6 1.4-1.4c0-.2 0-.3-.1-.5l1.1-1.1c.3-.2.3-.6 0-.8-.2-.3-.6-.3-.8 0z" } },
	  custom96: { "path": { "d": "M19.1 6.9L17.8 6c-.2-.2-.4-.2-.6-.2H13v-.5c0-.3-.3-.5-.5-.5h-1c-.2 0-.5.2-.5.5v.5H6.2c-.2 0-.4.2-.4.4v2c0 .2.2.4.4.4h11c.2 0 .4 0 .6-.2l1.2-.9c.2-.2.2-.4.1-.6zM17.8 11H13v-.7c0-.1-.1-.2-.3-.2h-1.4c-.2 0-.3.1-.3.2v.7H6.8c-.2 0-.4.1-.6.2l-1.2 1c-.2.1-.2.4 0 .6l1.2.9c.2.1.4.2.6.2h11c.2 0 .4-.2.4-.5v-1.9c0-.2-.2-.5-.4-.5zM13 17.2v-1.6c0-.1-.1-.2-.3-.2h-1.4c-.2 0-.3.1-.3.2v1.6c-.9.2-1.4.8-1.6 1.5-.1.3.1.5.3.5h4.6c.2 0 .4-.2.3-.5-.2-.7-.7-1.3-1.6-1.5z" } },
	  custom97: { "path": { "d": "M14.4 13.1V7c0-1.5-1.2-2.7-2.6-2.7h-.1c-1.4 0-2.6 1.2-2.6 2.7v6.1c-.7.7-1.2 1.7-1.2 2.7 0 2.2 1.7 3.9 3.9 3.9s3.8-1.7 3.8-3.9c0-1-.4-2-1.2-2.7zm-.6 2.7H9.7c-.2 0-.3-.2-.3-.4.1-.6.4-1.1.8-1.4.2-.2.3-.4.3-.6V7c0-.7.6-1.2 1.2-1.2h.1c.6 0 1.1.5 1.1 1.2v.2h-.7c-.4 0-.7.3-.7.7s.3.7.7.7h.7v1h-.7c-.4 0-.7.3-.7.7s.3.7.7.7h.7v1h-.7c-.4 0-.7.3-.7.7s.3.7.7.7h.7c.1.3.2.4.3.6.5.3.8.9.9 1.4.1.2-.1.4-.3.4z" } },
	  custom98: { "g": { "path": [{ "d": "M19.5 11.1l-1.8-1.8c-.1-.1-.3-.2-.4-.2h-1.9c-.3 0-.5.2-.5.5v3.8c0 .2.1.3.3.3.4-.2.7-.3 1.1-.3 1.1 0 2 .6 2.5 1.5.1.1.3.2.4.1.3-.3.5-.6.5-1.1v-2.4c0-.1-.1-.3-.2-.4z" }, { "d": "M13 7H4.8c-.3 0-.5.2-.5.4v6.5c0 .5.2.8.5 1.1.1.1.3.1.4-.1.4-.9 1.4-1.5 2.5-1.5 1.2 0 2.2.8 2.6 1.8.1.1.2.2.3.2H12c.8 0 1.4-.7 1.4-1.5V7.4c0-.2-.2-.4-.4-.4z" }], "circle": [{ "cx": "16.32", "cy": "16.32", "r": "1.44" }, { "cx": "7.68", "cy": "16.32", "r": "1.44" }] } },
	  custom99: { "path": { "d": "M17.8 8.6h-4.1c-.1-.2-.3-.5-.5-.7L14.7 6c.3-.4.2-.8-.1-1.1s-.8-.1-1 .2l-1.7 2.1h-.8L9.5 5.1c-.3-.3-.7-.4-1.1-.2-.3.3-.3.7-.1 1.1l1.5 1.9c-.2.2-.3.5-.5.7H6.2c-.8 0-1.4.7-1.4 1.5v6.7c0 .8.6 1.4 1.4 1.4h11.6c.8 0 1.4-.6 1.4-1.4v-6.7c0-.8-.6-1.5-1.4-1.5zm-2 7.7c0 .3-.2.5-.4.5H6.7c-.2 0-.5-.2-.5-.5v-5.7c0-.3.3-.5.5-.5h8.7c.2 0 .4.2.4.5v5.7zm1.7-2.4c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7zm0-2.4c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z" } }
	};
	module.exports.viewBox = '0 0 24 24';

/***/ },
/* 41 */
/***/ function(module, exports) {

	/*  Copyright (c) 2015, salesforce.com, inc. All rights reserved.    Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:  Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.  Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.  Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.  */
	"use strict";
	
	module.exports = {
	  ai: { "path": [{ "d": "M3.4 0c-1 0-1.9.9-1.9 1.9v20.2c0 1 .9 1.9 1.9 1.9h17.2c1 0 1.9-.9 1.9-1.9V7.6L15.4 0h-12z", "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "#FFC35E" }, { "d": "M22.5 7.6V8h-4.8s-2.4-.5-2.3-2.5c0 0 .1 2.1 2.2 2.1h4.9z", "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "#FFB446" }, { "d": "M15.4 0v5.5c0 .6.4 2.1 2.3 2.1h4.8L15.4 0z", "opacity": ".5", "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "#fff" }, { "d": "M9.1 20.2c-.2 0-.3 0-.3-.2l-.4-.8H6.2l-.3.8c-.1.2-.2.2-.3.2-.2 0-.3-.1-.3-.3v-.1l1.6-3.9c0-.1.2-.3.4-.3s.4.2.5.3l1.5 3.9c0 .1.1.1.1.1 0 .2-.2.3-.3.3zm-1.8-3.9l-.9 2.4h1.9l-1-2.4zm3.2 3.9c-.1 0-.3-.1-.3-.3v-4c0-.1.2-.3.3-.3.2 0 .3.2.3.3v4c0 .2-.1.3-.3.3z", "fill": "#fff" }] },
	  attachment: { "g": { "fill-rule": "evenodd", "clip-rule": "evenodd", "path": [{ "d": "M3.4 0c-1 0-1.9.8-1.9 1.9v20.2c0 1 .9 1.9 1.9 1.9h17.2c1 0 1.9-.9 1.9-1.9V7.6L15.4 0h-12z", "fill": "#8199AF" }, { "d": "M22.5 7.6V8h-4.8s-2.4-.5-2.3-2.5c0 0 .1 2.1 2.2 2.1h4.9z", "fill": "#617F9B" }, { "d": "M15.4 0v5.5c0 .6.4 2.1 2.3 2.1h4.8L15.4 0z", "opacity": ".5", "fill": "#fff" }] }, "path": { "d": "M11.5 15.6c.4-.5.4-1.2 0-1.6s-1.1-.4-1.6 0l-3.4 3.4c-.4.5-.4 1.2 0 1.6s1.1.4 1.5 0l2.1-2.1c.2-.1.2-.3 0-.5s-.3-.1-.4 0l-1.3 1.4c-.2.2-.5.2-.7 0-.2-.2-.2-.5 0-.7L9 15.8c.5-.5 1.3-.5 1.8 0s.5 1.3 0 1.7l-2.1 2.2c-.8.7-2.1.7-2.9 0-.8-.8-.8-2.1 0-2.9l3.5-3.5c.8-.8 2-.8 2.8 0 .8.8.8 2.1 0 2.9l-.3.4c0-.4-.1-.7-.4-1l.1-.1z", "fill": "#fff" } },
	  audio: { "g": { "fill-rule": "evenodd", "clip-rule": "evenodd", "path": [{ "d": "M3.4 0c-1 0-1.9.9-1.9 1.9v20.2c0 1 .9 1.9 1.9 1.9h17.2c1 0 1.9-.9 1.9-1.9V7.6L15.4 0h-12z", "fill": "#379FD3" }, { "d": "M22.5 7.6V8h-4.8s-2.4-.5-2.3-2.5c0 0 .1 2.1 2.3 2.1h4.8z", "fill": "#2987C8" }, { "d": "M15.4 0v5.5c0 .6.4 2.1 2.3 2.1h4.8L15.4 0z", "opacity": ".5", "fill": "#fff" }, { "d": "M12.7 12.8l-5.3.6v5.1c-.3-.1-.6-.1-1 0-.7.1-1.2.6-1.1 1.1.2.4.9.7 1.6.5.7-.1 1.2-.5 1.2-.9v-4l3.9-.5v3.1c-.3-.1-.6-.1-1 0-.8.1-1.3.6-1.1 1.1.1.4.9.7 1.6.5.7-.1 1.2-.5 1.2-1v-5.6z", "fill": "#fff" }] } },
	  box_notes: { "path": [{ "fill": "#277A84", "d": "M3.4 0c-1 0-1.9.9-1.9 1.9v20.2c0 1 .9 1.9 1.9 1.9h17.2c1 0 1.9-.9 1.9-1.9V7.6L15.4 0h-12z" }, { "fill": "#1E5B60", "d": "M22.5 7.6V8h-4.8s-2.4-.5-2.3-2.5c0 0 .1 2.1 2.2 2.1h4.9z" }, { "opacity": ".5", "fill": "#fff", "d": "M15.4 0v5.5c0 .6.4 2.1 2.3 2.1h4.8L15.4 0z" }, { "fill": "#fff", "d": "M11.7 14.8l.8-.8H5.4s-.1 0-.1.1v.5c0 .1.1.1.1.1h6.3zm-2.8 2.7l.8-.8H5.4s-.1 0-.1.1v.5l.1.2h3.5zM7 20.2l.1-.8H5.4s-.1 0-.1.2v.5c0 .1.1.1.1.1H7zm.3 0h.8c.1-.1.2-.1.2-.1l4.9-5s-.2.2-.6-.2c-.3-.3-.2-.5-.2-.5l-4.8 4.8c-.1.1-.1.2-.1.2 0 .1-.2.8-.2.8zm5.7-6.4l-.4.4v.2c0 .1.2.5.6.6 0 0 .1 0 .2-.1.1 0 .4-.4.4-.4s.1 0 0-.2c0-.2-.3-.5-.6-.6-.1 0-.2.1-.2.1z" }] },
	  csv: { "path": [{ "d": "M3.4 0c-1 0-1.9.9-1.9 1.9v20.2c0 1 .9 1.9 1.9 1.9h17.2c1 0 1.9-.9 1.9-1.9V7.6L15.4 0h-12z", "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "#45B058" }, { "d": "M9.1 16.2c.1.1.1.1.1.2s-.1.3-.3.3c0 0-.1-.1-.2-.1-.2-.3-.7-.5-1.1-.5-1 0-1.7.7-1.7 1.8s.7 1.8 1.7 1.8c.4 0 .9-.2 1.1-.5.1-.1.2-.1.2-.1.2 0 .3.2.3.3 0 .1 0 .1-.1.2-.3.3-.8.6-1.5.6-1.3 0-2.3-.9-2.3-2.3s1-2.3 2.3-2.3c.7 0 1.2.2 1.5.6zm2.6 4c-.7 0-1.2-.2-1.6-.5-.1-.1-.1-.2-.1-.2 0-.2.1-.3.3-.3h.1c.3.3.8.5 1.3.5.8 0 1-.4 1-.8 0-1.1-2.6-.5-2.6-2.1 0-.7.6-1.2 1.5-1.2.6 0 1.1.1 1.5.4 0 .1.1.2.1.2 0 .2-.2.3-.3.3h-.2c-.3-.3-.7-.4-1.1-.4-.6 0-.9.3-.9.7 0 1 2.6.4 2.6 2.1 0 .6-.4 1.3-1.6 1.3zM18 16l-1.5 3.9c-.1.2-.3.3-.5.3s-.4-.1-.4-.3L14 16v-.1c0-.1.1-.3.3-.3.1 0 .2.1.3.2l1.4 3.7 1.5-3.7c0-.1.1-.2.3-.2.1 0 .3.1.3.3 0 0 0 .1-.1.1z", "fill": "#fff" }], "g": { "fill-rule": "evenodd", "clip-rule": "evenodd", "path": [{ "d": "M22.5 7.6V8h-4.8s-2.4-.5-2.3-2.5c0 0 .1 2.1 2.3 2.1h4.8z", "fill": "#349C42" }, { "d": "M15.4 0v5.5c0 .6.4 2.1 2.3 2.1h4.8L15.4 0z", "opacity": ".5", "fill": "#fff" }] } },
	  eps: { "path": [{ "d": "M3.4 0c-1 0-1.9.9-1.9 1.9v20.2c0 1 .9 1.9 1.9 1.9h17.2c1 0 1.9-.9 1.9-1.9V7.6L15.4 0h-12z", "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "#FFC35E" }, { "d": "M8 20.2H5.7c-.2 0-.4-.2-.4-.4v-3.7c0-.2.2-.4.4-.4H8c.2 0 .3.1.3.3 0 .1-.1.2-.3.2H5.9v1.5H8c.1 0 .2.1.2.2 0 .2-.1.3-.2.3H5.9v1.5H8c.2 0 .3.1.3.3 0 .1-.1.2-.3.2zm3.1-1.8H9.9V20c0 .1-.2.3-.3.3-.2 0-.3-.2-.3-.3v-3.9c0-.2.2-.4.4-.4h1.4c.9 0 1.4.6 1.4 1.4 0 .7-.5 1.3-1.4 1.3zm-.1-2.2H9.9v1.7H11c.6 0 .9-.3.9-.8s-.3-.9-.9-.9zm3.9 4.1c-.7 0-1.2-.2-1.6-.6 0 0-.1-.1-.1-.2s.1-.2.3-.2h.2c.3.3.7.5 1.2.5.8 0 1.1-.4 1.1-.8 0-1.1-2.7-.5-2.7-2.1 0-.7.7-1.3 1.6-1.3.5 0 1 .2 1.4.5.1.1.1.2.1.2 0 .2-.1.3-.3.3 0 0-.1 0-.1-.1-.4-.2-.8-.4-1.2-.4-.5 0-.9.3-.9.8 0 1 2.7.4 2.7 2.1 0 .6-.5 1.3-1.7 1.3z", "fill": "#fff" }], "g": { "fill-rule": "evenodd", "clip-rule": "evenodd", "path": [{ "d": "M22.5 7.6V8h-4.8c-.9 0-2.4-.5-2.3-2.5 0 0 .1 2.1 2.3 2.1h4.8z", "fill": "#FFB446" }, { "d": "M15.4 0v5.5c0 .6.4 2.1 2.3 2.1h4.8L15.4 0z", "opacity": ".5", "fill": "#fff" }] } },
	  excel: { "path": [{ "d": "M3.4 0c-1 0-1.9.9-1.9 1.9v20.2c0 1 .9 1.9 1.9 1.9h17.2c1 0 1.9-.9 1.9-1.9V7.6L15.4 0h-12z", "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "#45B058" }, { "d": "M8.8 20.2c-.1 0-.2 0-.2-.1l-1.4-1.8-1.4 1.8c-.1.1-.1.1-.2.1-.2 0-.3-.1-.3-.2s0-.2.1-.2l1.4-1.9-1.3-1.8c-.1-.1-.1-.1-.1-.2s.1-.3.3-.3c.1 0 .1.1.2.1l1.3 1.8 1.3-1.8s.1-.1.2-.1.3.2.3.3c0 .1-.1.1-.1.2l-1.3 1.8L9 19.8l.1.1c0 .2-.2.3-.3.3zm3.7 0h-2c-.2 0-.4-.2-.4-.4v-3.9c0-.1.1-.3.3-.3.1 0 .2.2.2.3v3.8h1.9c.2 0 .3.1.3.2 0 .2-.1.3-.3.3zm2.6.1c-.6 0-1.1-.3-1.5-.6-.1-.1-.1-.1-.1-.2s.1-.3.2-.3.2 0 .2.1c.3.2.8.5 1.3.5.8 0 1-.5 1-.8 0-1.2-2.6-.5-2.6-2.1 0-.8.6-1.3 1.5-1.3.6 0 1.1.2 1.5.5v.2c0 .1-.1.3-.2.3s-.1-.1-.2-.1c-.3-.3-.7-.4-1.1-.4-.6 0-1 .3-1 .7 0 1 2.7.5 2.7 2.1 0 .7-.4 1.4-1.6 1.4z", "fill": "#fff" }, { "d": "M22.5 7.6V8h-4.8s-2.4-.5-2.3-2.5c0 0 .1 2.1 2.2 2.1h4.9z", "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "#349C42" }, { "d": "M15.4 0v5.5c0 .6.4 2.1 2.3 2.1h4.8L15.4 0z", "opacity": ".5", "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "#fff" }] },
	  exe: { "path": [{ "d": "M3.4 0c-1 0-1.9.9-1.9 1.9v20.2c0 1.1.9 1.9 1.9 1.9h17.2c1 0 1.9-.8 1.9-1.9V7.6L15.4 0h-12z", "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "#8199AF" }, { "d": "M8 20.2H5.7c-.2 0-.4-.2-.4-.4v-3.7c0-.2.2-.4.4-.4H8c.2 0 .3.1.3.3 0 .1-.1.2-.3.2H5.9v1.5H8c.1 0 .2.1.2.2 0 .2-.1.3-.2.3H5.9v1.5H8c.2 0 .3.1.3.3 0 .1-.1.2-.3.2zm4.6.1c-.1 0-.2-.1-.2-.1L11 18.3l-1.4 1.9c-.1 0-.1.1-.2.1-.2 0-.3-.1-.3-.3 0-.1 0-.1.1-.2l1.4-1.9-1.3-1.8c-.1 0-.1-.1-.1-.2s.1-.2.3-.2c.1 0 .1 0 .2.1l1.3 1.7 1.3-1.7c0-.1.1-.1.2-.1s.2.1.2.2v.2l-1.4 1.8 1.5 1.9c0 .1.1.1.1.2s-.2.3-.3.3zm4-.1h-2.3c-.2 0-.4-.2-.4-.4v-3.7c0-.2.2-.4.4-.4h2.3c.2 0 .3.1.3.3 0 .1-.1.2-.3.2h-2.2v1.5h2.2c.1 0 .2.1.2.2 0 .2-.1.3-.2.3h-2.2v1.5h2.2c.2 0 .3.1.3.3 0 .1-.1.2-.3.2z", "fill": "#fff" }], "g": { "fill-rule": "evenodd", "clip-rule": "evenodd", "path": [{ "d": "M22.5 7.6V8h-4.8s-2.4-.5-2.3-2.5c0 0 .1 2.1 2.2 2.1h4.9z", "fill": "#617F9B" }, { "d": "M15.4 0v5.5c0 .6.4 2.1 2.3 2.1h4.8L15.4 0z", "opacity": ".5", "fill": "#fff" }] } },
	  flash: { "path": [{ "d": "M3.4 0c-1 0-1.9.9-1.9 1.9v20.2c0 1 .9 1.9 1.9 1.9h17.2c1 0 1.9-.9 1.9-1.9V7.6L15.4 0h-12z", "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "#E53C3C" }, { "d": "M8 16.2H5.9v1.4H8c.1 0 .2.1.2.3 0 .1-.1.2-.2.2H5.9v1.8c0 .2-.2.3-.3.3-.2 0-.3-.1-.3-.3v-3.8c0-.3.2-.4.4-.4h2.4c.1 0 .2.1.2.2 0 .2-.1.3-.3.3zm3.6 4h-2c-.2 0-.4-.2-.4-.4v-3.9c0-.2.1-.3.3-.3.1 0 .2.1.2.3v3.8h1.9c.2 0 .3.1.3.2 0 .2-.1.3-.3.3zm4.6 0c-.1 0-.2-.1-.3-.2l-.3-.8h-2.2l-.4.8c0 .1-.1.2-.2.2-.2 0-.3-.1-.3-.3v-.1l1.5-3.9c.1-.2.3-.3.5-.3s.4.1.4.3l1.6 3.9v.1c0 .1-.1.3-.3.3zm-1.7-4l-1 2.5h1.9l-.9-2.5z", "fill": "#fff" }], "g": { "fill-rule": "evenodd", "clip-rule": "evenodd", "path": [{ "d": "M22.5 7.6V8h-4.8s-2.4-.5-2.3-2.5c0 0 .1 2.1 2.2 2.1h4.9z", "fill": "#DE2D2D" }, { "d": "M15.4 0v5.5c0 .6.4 2.1 2.3 2.1h4.8L15.4 0z", "opacity": ".5", "fill": "#fff" }] } },
	  gdoc: { "path": [{ "d": "M3.4 0c-1 0-1.9.9-1.9 1.9v20.2c0 1 .9 1.9 1.9 1.9h17.2c1 0 1.9-.9 1.9-1.9V7.6L15.4 0h-12z", "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "#3C8CEA" }, { "d": "M5.3 14h8.1v.8H5.3zm0 1.8h8.1v.8H5.3zm0 1.8h8.1v.8H5.3zm0 1.8h4.6v.8H5.3z", "fill": "#fff" }], "g": { "fill-rule": "evenodd", "clip-rule": "evenodd", "path": [{ "d": "M22.5 7.6V8h-4.8s-2.4-.5-2.3-2.5c0 0 .1 2.1 2.2 2.1h4.9z", "fill": "#2D6FE4" }, { "d": "M15.4 0v5.5c0 .6.4 2.1 2.3 2.1h4.8L15.4 0z", "opacity": ".5", "fill": "#fff" }] } },
	  gdocs: { "g": { "fill-rule": "evenodd", "clip-rule": "evenodd", "path": [{ "d": "M3.4 0c-1 0-1.9.9-1.9 1.9v20.2c0 1 .9 1.9 1.9 1.9h17.2c1 0 1.9-.9 1.9-1.9V7.6L15.4 0h-12z", "fill": "#3C8CEA" }, { "d": "M22.5 7.6V8h-4.8s-2.4-.5-2.3-2.5c0 0 .1 2.1 2.2 2.1h4.9z", "fill": "#2D6FE4" }, { "d": "M15.4 0v5.5c0 .6.4 2.1 2.3 2.1h4.8L15.4 0z", "opacity": ".5", "fill": "#fff" }, { "d": "M11 19.8l-1.2.3c-.5.1-.9.1-1.3.1-2.3 0-3.2-1.7-3.2-3 0-1.6 1.2-3.1 3.4-3.1.4 0 .8.1 1.2.2.6.2.9.4 1.1.5l-.7.7H10l.2-.3c-.2-.3-.8-.8-1.7-.8-1.3 0-2.3 1-2.3 2.5s1.1 3 2.9 3c.5 0 .8-.1 1.1-.2v-1.4l-1.3.1.7-.3h1.7l-.2.2-.1.1v1.4z", "fill": "#fff" }] } },
	  gpres: { "path": [{ "d": "M3.4 0c-1 0-1.9.9-1.9 1.9v20.2c0 1 .9 1.9 1.9 1.9h17.2c1 0 1.9-.9 1.9-1.9V7.6L15.4 0h-12z", "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "#F8BE46" }, { "d": "M5.3 14v4.5H10V14H5.3zm4.2 3.7H5.7v-2.8h3.8v2.8zm.3-2v.9h3.1v2.8H9.1v-1.1h-.4v1.9h4.7v-4.5H9.8z", "fill": "#fff" }], "g": { "fill-rule": "evenodd", "clip-rule": "evenodd", "path": [{ "d": "M22.5 7.6V8h-4.8s-2.4-.5-2.3-2.5c0 0 .1 2.1 2.2 2.1h4.9z", "fill": "#F6AD34" }, { "d": "M15.4 0v5.5c0 .6.4 2.1 2.3 2.1h4.8L15.4 0z", "opacity": ".5", "fill": "#fff" }] } },
	  gsheet: { "path": [{ "d": "M3.4 0c-1 0-1.9.9-1.9 1.9v20.2c0 1 .9 1.9 1.9 1.9h17.2c1 0 1.9-.9 1.9-1.9V7.6L15.4 0h-12z", "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "#20A971" }, { "d": "M5.3 14v6.2h8.1V14H5.3zm2.4 5.7H5.8v-1.3h1.9v1.3zm0-1.9H5.8v-1.3h1.9v1.3zm0-1.9H5.8v-1.3h1.9v1.3zm5.1 3.8H8.3v-1.3h4.5v1.3zm0-1.9H8.3v-1.3h4.5v1.3zm0-1.9H8.3v-1.3h4.5v1.3z", "fill": "#fff" }], "g": { "fill-rule": "evenodd", "clip-rule": "evenodd", "path": [{ "d": "M22.5 7.6V8h-4.8s-2.4-.5-2.3-2.5c0 0 .1 2.1 2.2 2.1h4.9z", "fill": "#189355" }, { "d": "M15.4 0v5.4c0 .7.4 2.2 2.3 2.2h4.8L15.4 0z", "opacity": ".5", "fill": "#fff" }] } },
	  html: { "path": [{ "d": "M3.4 0c-1 0-1.9.9-1.9 1.9v20.2c0 1 .9 1.9 1.9 1.9h17.2c1 0 1.9-.9 1.9-1.9V7.6L15.4 0h-12z", "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "#F7622C" }, { "d": "M8.6 19.1s-.1 0-.1-.1l-2.9-1.2c-.1-.1-.3-.3-.3-.5s.2-.4.3-.5l2.9-1.2c0-.1.1-.1.1-.1.2 0 .3.2.3.4 0 .1 0 .2-.2.3l-2.6 1.1 2.6 1.1c.2.1.2.2.2.3 0 .2-.1.4-.3.4zm3.2-4.2l-1.7 5c0 .2-.2.2-.3.2-.2 0-.4-.1-.4-.3 0 0 0-.1.1-.1l1.6-5c.1-.1.2-.2.4-.2s.3.1.3.3v.1zm3.8 2.9L12.8 19c-.1.1-.1.1-.2.1s-.3-.2-.3-.4c0-.1.1-.2.2-.3l2.6-1.1-2.6-1.1c-.1-.1-.2-.2-.2-.3 0-.2.2-.4.3-.4.1 0 .1 0 .2.1l2.8 1.2c.2.1.3.3.3.5s-.1.4-.3.5z", "fill": "#fff" }], "g": { "fill-rule": "evenodd", "clip-rule": "evenodd", "path": [{ "d": "M22.5 7.6V8h-4.8s-2.4-.5-2.3-2.5c0 0 .1 2.1 2.2 2.1h4.9z", "fill": "#F54921" }, { "d": "M15.4 0v5.5c0 .6.4 2.1 2.3 2.1h4.8L15.4 0z", "opacity": ".5", "fill": "#fff" }] } },
	  image: { "g": { "fill-rule": "evenodd", "clip-rule": "evenodd", "path": [{ "d": "M3.4 0c-1 0-1.9.9-1.9 1.9v20.2c0 1.1.9 1.9 1.9 1.9h17.2c1 0 1.9-.8 1.9-1.9V7.6L15.4 0h-12z", "fill": "#49C9A7" }, { "d": "M22.5 7.6V8h-4.8s-2.4-.5-2.3-2.5c0 0 .1 2.1 2.2 2.1h4.9z", "fill": "#37BB91" }, { "d": "M15.4 0v5.5c0 .6.4 2.1 2.3 2.1h4.8L15.4 0z", "opacity": ".5", "fill": "#fff" }] }, "path": { "d": "M5.3 20.2v-7.9h7.8v7.9H5.3zm7-7.1H6.1v4.7h6.2v-4.7zm-3.5 3.1l1.4-1.9.5.8.5-.2.4 2.1H6.7L8 15.8l.8.4zm-1.5-1.3c-.3 0-.6-.3-.6-.6s.3-.6.6-.6.6.3.6.6-.3.6-.6.6z", "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "#fff" } },
	  keynote: { "path": [{ "d": "M3.4 0c-1 0-1.9.9-1.9 1.9v20.2c0 1 .9 1.9 1.9 1.9h17.2c1 0 1.9-.9 1.9-1.9V7.6L15.4 0h-12z", "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "#DB7A2A" }, { "d": "M8.2 20.3c-.1 0-.2-.1-.2-.1l-1.7-2-.4.5V20c0 .1-.2.2-.3.2-.2 0-.3-.1-.3-.2v-4.1c0-.1.1-.2.3-.2.1 0 .3.1.3.2V18l1.9-2.2c.1-.1.1-.1.2-.1.2 0 .3.1.3.2s0 .1-.1.2l-1.5 1.7 1.7 2c0 .1.1.1.1.2s-.2.3-.3.3zm4.1-.1H9.9c-.2 0-.4-.2-.4-.4v-3.7c0-.2.2-.4.4-.4h2.4c.1 0 .2.1.2.3 0 .1-.1.2-.2.2h-2.2v1.5h2.1c.2 0 .3.1.3.2s-.1.3-.3.3h-2.1v1.5h2.2c.1 0 .2.1.2.3 0 .1-.1.2-.2.2zm4.6-4.1l-1.5 2.2V20c0 .1-.1.2-.3.2-.1 0-.3-.1-.3-.2v-1.7l-1.5-2.2v-.2c0-.1.1-.2.3-.2 0 0 .1 0 .2.1l1.3 2 1.4-2c0-.1.1-.1.2-.1s.3.1.3.2-.1.1-.1.2z", "fill": "#fff" }], "g": { "fill-rule": "evenodd", "clip-rule": "evenodd", "path": [{ "d": "M22.5 7.6V8h-4.8s-2.4-.5-2.3-2.5c0 0 .1 2.1 2.2 2.1h4.9z", "fill": "#D25B1F" }, { "d": "M15.4 0v5.5c0 .6.4 2.1 2.3 2.1h4.8L15.4 0z", "opacity": ".5", "fill": "#fff" }] } },
	  link: { "path": [{ "d": "M3.4 0c-1 0-1.9.9-1.9 1.9v20.2c0 1 .9 1.9 1.9 1.9h17.2c1 0 1.9-.9 1.9-1.9V7.6L15.4 0h-12z", "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "#0C8FE8" }, { "d": "M12.1 13.4c-.8-.8-2-.8-2.8 0l-1.2 1.1c-.8.8-.8 2 0 2.8.2.2.5.2.7 0 .2-.2.2-.4 0-.6-.5-.4-.5-1.1 0-1.5L9.9 14c.4-.4 1.1-.4 1.5 0 .5.4.5 1.1 0 1.5l-.5.6c.1.3.2.7.2 1.1l1-1c.8-.8.8-2.1 0-2.8zm-2.9 2.2c-.2.2-.2.5 0 .6.4.5.4 1.1 0 1.6l-1.1 1.1c-.5.4-1.1.4-1.6 0-.4-.4-.4-1.1 0-1.5l.6-.6c-.2-.3-.2-.7-.2-1.1l-1 1c-.8.8-.8 2.1 0 2.9.8.7 2 .7 2.8 0l1.2-1.2c.7-.8.7-2 0-2.8-.2-.2-.5-.2-.7 0z", "fill": "#fff" }], "g": { "fill-rule": "evenodd", "clip-rule": "evenodd", "path": [{ "d": "M22.5 7.6V8h-4.8s-2.4-.5-2.3-2.5c0 0 .1 2.1 2.2 2.1h4.9z", "fill": "#0973E2" }, { "d": "M15.4 0v5.5c0 .6.4 2.1 2.3 2.1h4.8L15.4 0z", "opacity": ".5", "fill": "#fff" }] } },
	  mp4: { "g": { "fill-rule": "evenodd", "clip-rule": "evenodd", "path": [{ "d": "M3.4 0c-1 0-1.9.9-1.9 1.9v20.2c0 1 .9 1.9 1.9 1.9h17.2c1 0 1.9-.9 1.9-1.9V7.6L15.4 0h-12z", "fill": "#9B64B2" }, { "d": "M22.5 7.6V8h-4.8s-2.4-.5-2.3-2.5c0 0 .1 2.1 2.2 2.1h4.9z", "fill": "#824B9E" }, { "d": "M15.4 0v5.5c0 .6.4 2.1 2.3 2.1h4.8L15.4 0z", "opacity": ".5", "fill": "#fff" }] }, "path": { "d": "M9.4 20.2c-.1 0-.3-.1-.3-.3v-3.4l-1.5 3.6c0 .1 0 .1-.1.1s-.1 0-.1-.1l-1.5-3.6v3.4c0 .2-.2.3-.3.3-.2 0-.3-.1-.3-.3v-3.8c0-.3.2-.5.5-.5.1 0 .3.1.4.3L7.5 19l1.3-3.1c.1-.2.3-.3.4-.3.3 0 .5.2.5.5v3.8c0 .2-.1.3-.3.3zm3.3-1.8h-1.2v1.5c0 .2-.1.3-.3.3-.2 0-.3-.1-.3-.3v-3.8c0-.3.2-.4.4-.4h1.4c.9 0 1.4.6 1.4 1.3 0 .8-.5 1.4-1.4 1.4zm0-2.2h-1.2v1.7h1.2c.5 0 .9-.4.9-.9s-.4-.8-.9-.8zm5.2 2.8h-.5v.9c0 .2-.1.3-.2.3-.2 0-.3-.1-.3-.3V19H15c-.2 0-.3-.1-.3-.3 0 0 0-.1.1-.2l1.8-2.7c.1-.1.2-.2.4-.2s.4.2.4.5v2.4h.5c.1 0 .2.1.2.3 0 .1-.1.2-.2.2zm-1-2.8l-1.6 2.3h1.6v-2.3z", "fill": "#fff" } },
	  overlay: { "path": [{ "d": "M3.4 0c-1 0-1.9.9-1.9 1.9v20.2c0 1 .9 1.9 1.9 1.9h17.2c1 0 1.9-.9 1.9-1.9V7.6L15.4 0h-12z", "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "#A382D8" }, { "d": "M5.3 12.9v5.3h5.5v-5.3H5.3zm2 2v5.3h5.5v-5.3H7.3z", "fill": "#fff" }, { "fill": "#CBBBEF", "d": "M7.3 14.9h3.5v3.3H7.3z" }], "g": { "fill-rule": "evenodd", "clip-rule": "evenodd", "path": [{ "d": "M22.5 7.6V8h-4.8s-2.4-.5-2.3-2.5c0 0 .1 2.1 2.2 2.1h4.9z", "fill": "#8C62CE" }, { "d": "M15.4 0v5.5c0 .6.4 2.1 2.3 2.1h4.8L15.4 0z", "opacity": ".5", "fill": "#fff" }] } },
	  pack: { "path": [{ "d": "M3.4 0c-1 0-1.9.9-1.9 1.9v20.2c0 1 .9 1.9 1.9 1.9h17.2c1 0 1.9-.9 1.9-1.9V7.6L15.4 0h-12z", "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "#4E74B7" }, { "d": "M12.4 15.3v4.5c0 .2-.2.4-.4.4H5.7c-.2 0-.4-.2-.4-.4v-4.5-.1l.6-1.8c.1-.2.2-.3.4-.3h5.1c.2 0 .4.1.4.3l.6 1.8v.1zm-.9 0l-.4-1.3H6.7l-.5 1.3h5.3z", "fill": "#fff" }], "g": { "fill-rule": "evenodd", "clip-rule": "evenodd", "path": [{ "d": "M22.5 7.6V8h-4.8s-2.4-.5-2.3-2.5c0 0 .1 2.1 2.2 2.1h4.9z", "fill": "#3A57A5" }, { "d": "M15.4 0v5.5c0 .6.4 2.1 2.3 2.1h4.8L15.4 0z", "opacity": ".5", "fill": "#fff" }] } },
	  pages: { "path": [{ "d": "M3.4 0c-1 0-1.9.8-1.9 1.9v20.2c0 1 .9 1.9 1.9 1.9h17.2c1 0 1.9-.9 1.9-1.9V7.6L15.4 0h-12z", "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "#6A6AE2" }, { "d": "M7.1 18.4H5.9v1.5c0 .2-.2.3-.3.3-.2 0-.3-.1-.3-.3v-3.8c0-.3.2-.4.4-.4h1.4c.9 0 1.4.6 1.4 1.3s-.5 1.4-1.4 1.4zM7 16.2H5.9v1.7H7c.6 0 .9-.4.9-.9s-.3-.8-.9-.8zm4.6 4.1c-1.3 0-2.4-1-2.4-2.4s1.1-2.3 2.4-2.3c.6 0 1.2.2 1.5.6.1.1.1.1.1.2s-.1.3-.3.3c0 0-.1-.1-.2-.1-.2-.3-.7-.5-1.1-.5-1 0-1.8.7-1.8 1.8s.8 1.9 1.8 1.9c.5 0 .9-.3 1.2-.5v-1h-1.4c-.1 0-.2-.1-.2-.2s.1-.2.2-.2h1.5c.3 0 .4.1.4.4v.8c0 .7-.9 1.2-1.7 1.2zm4.3-.1c-.7 0-1.2-.2-1.6-.5-.1-.1-.1-.1-.1-.2 0-.2.1-.3.3-.3 0 0 .1 0 .1.1.3.2.8.4 1.3.4.8 0 1.1-.4 1.1-.7 0-1.2-2.7-.5-2.7-2.2 0-.7.6-1.2 1.5-1.2.6 0 1.1.2 1.5.5 0 0 .1.1.1.2s-.1.2-.3.2h-.2c-.3-.3-.7-.4-1.1-.4-.6 0-.9.3-.9.7 0 1 2.6.4 2.6 2.1 0 .7-.4 1.3-1.6 1.3z", "fill": "#fff" }], "g": { "fill-rule": "evenodd", "clip-rule": "evenodd", "path": [{ "d": "M22.5 7.6V8h-4.8s-2.4-.5-2.3-2.5c0 0 .1 2.1 2.2 2.1h4.9z", "fill": "#4F4FDA" }, { "d": "M15.4 0v5.5c0 .6.4 2.1 2.3 2.1h4.8L15.4 0z", "opacity": ".5", "fill": "#fff" }] } },
	  pdf: { "path": [{ "fill": "#8C181A", "d": "M3.4 0c-1 0-1.9.9-1.9 1.9v20.2c0 1 .9 1.9 1.9 1.9h17.2c1 0 1.9-.9 1.9-1.9V7.6L15.4 0h-12z" }, { "fill": "#6B0D12", "d": "M22.5 7.6V8h-4.8s-2.4-.5-2.3-2.5c0 0 .1 2.1 2.3 2.1h4.8z" }, { "opacity": ".5", "fill": "#fff", "d": "M15.4 0v5.5c0 .6.4 2.1 2.3 2.1h4.8L15.4 0z" }, { "fill": "#fff", "d": "M7.1 18.4H5.8v1.5c0 .2-.1.3-.3.3-.1 0-.2-.1-.2-.3v-3.8c0-.2.2-.4.4-.4h1.4c.9 0 1.4.6 1.4 1.3 0 .8-.5 1.4-1.4 1.4zM7 16.2H5.8v1.7H7c.6 0 .9-.3.9-.9s-.3-.8-.9-.8zm3.9 4H9.8c-.2 0-.4-.2-.4-.4v-3.7c0-.2.2-.4.4-.4h1.1c1.4 0 2.4.9 2.4 2.2s-.9 2.3-2.4 2.3zm0-4H10v3.5h.9c1.1 0 1.8-.8 1.8-1.8 0-.9-.6-1.7-1.8-1.7zm6.2 0h-2.2v1.4H17c.2 0 .3.1.3.3s-.2.2-.3.2h-2.1v1.8c0 .2-.1.3-.3.3-.2 0-.3-.1-.3-.3v-3.8c0-.2.2-.4.4-.4h2.4c.1 0 .2.1.2.2s-.1.3-.2.3z" }] },
	  ppt: { "path": [{ "d": "M3.4 0c-1 0-1.9.9-1.9 1.9v20.2c0 1 .9 1.9 1.9 1.9h17.2c1 0 1.9-.9 1.9-1.9V7.6L15.4 0h-12z", "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "#E34221" }, { "d": "M7.1 18.4H5.9v1.5c0 .2-.2.3-.3.3-.2 0-.3-.1-.3-.3v-3.8c0-.3.2-.4.4-.4h1.4c.9 0 1.4.6 1.4 1.3 0 .8-.5 1.4-1.4 1.4zM7 16.2H5.9v1.7H7c.6 0 .9-.4.9-.9s-.3-.8-.9-.8zm4.2 2.2H10v1.5c0 .2-.1.3-.3.3-.1 0-.3-.1-.3-.3v-3.8c0-.3.2-.4.4-.4h1.4c.9 0 1.5.6 1.5 1.3 0 .8-.6 1.4-1.5 1.4zm0-2.2H10v1.7h1.2c.5 0 .9-.4.9-.9s-.4-.8-.9-.8zm5.3 0h-1.3v3.7c0 .2-.1.3-.2.3-.2 0-.3-.1-.3-.3v-3.7h-1.2c-.2 0-.3-.1-.3-.3 0-.1.1-.2.3-.2h3c.1 0 .2.1.2.2 0 .2-.1.3-.2.3z", "fill": "#fff" }], "g": { "fill-rule": "evenodd", "clip-rule": "evenodd", "path": [{ "d": "M22.5 7.6V8h-4.8s-2.4-.5-2.3-2.5c0 0 .1 2.1 2.2 2.1h4.9z", "fill": "#DC3119" }, { "d": "M15.4 0v5.5c0 .6.4 2.1 2.3 2.1h4.8L15.4 0z", "opacity": ".5", "fill": "#fff" }] } },
	  psd: { "path": [{ "d": "M3.4 0c-1 0-1.9.9-1.9 1.9v20.2c0 1.1.9 1.9 1.9 1.9h17.2c1 0 1.9-.8 1.9-1.9V7.6L15.4 0h-12z", "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "#0C77C6" }, { "d": "M7.1 18.4H5.9v1.5c0 .2-.2.3-.3.3-.2 0-.3-.1-.3-.3v-3.8c0-.3.2-.4.4-.4h1.4c.9 0 1.4.6 1.4 1.3 0 .8-.5 1.4-1.4 1.4zM7 16.2H5.9v1.7H7c.6 0 .9-.4.9-.9s-.3-.8-.9-.8zm3.9 4.1c-.7 0-1.2-.3-1.6-.6-.1-.1-.1-.1-.1-.2s.1-.3.3-.3c0 0 .1 0 .1.1.4.2.8.4 1.3.4.8 0 1.1-.4 1.1-.7 0-1.2-2.7-.5-2.7-2.2 0-.7.7-1.2 1.5-1.2.6 0 1.1.2 1.5.5.1 0 .1.1.1.2s-.1.2-.3.2H12c-.4-.3-.8-.4-1.2-.4-.5 0-.9.3-.9.7 0 1 2.6.4 2.6 2.1 0 .7-.4 1.3-1.6 1.3zm4.2-.1H14c-.3 0-.4-.2-.4-.4v-3.7c0-.3.1-.4.4-.4h1.1c1.4 0 2.3.9 2.3 2.2 0 1.3-.9 2.3-2.3 2.3zm0-4h-1v3.5h1c1.1 0 1.7-.8 1.7-1.8s-.6-1.7-1.7-1.7z", "fill": "#fff" }], "g": { "fill-rule": "evenodd", "clip-rule": "evenodd", "path": [{ "d": "M22.5 7.6V8h-4.8s-2.4-.5-2.3-2.5c0 0 .1 2.1 2.2 2.1h4.9z", "fill": "#0959B7" }, { "d": "M15.4 0v5.5c0 .6.4 2.1 2.3 2.1h4.8L15.4 0z", "opacity": ".5", "fill": "#fff" }] } },
	  rtf: { "path": [{ "d": "M3.4 0c-1 0-1.9.9-1.9 1.9v20.2c0 1 .9 1.9 1.9 1.9h17.2c1 0 1.9-.9 1.9-1.9V7.6L15.4 0h-12z", "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "#00A1EE" }, { "d": "M7.4 18.3l.9 1.5.1.1c0 .2-.2.3-.3.3-.1 0-.2-.1-.2-.1l-1.1-1.7h-.9v1.5c0 .2-.2.3-.3.3-.2 0-.3-.1-.3-.3V16c0-.2.2-.4.4-.4h1.4c.8 0 1.4.6 1.4 1.4 0 .8-.5 1.3-1.1 1.3zm-1.5-2.2v1.8H7c.6 0 .9-.4.9-.9s-.3-.9-.9-.9H5.9zm6.5 0h-1.2v3.8c0 .2-.1.3-.3.3-.2 0-.3-.1-.3-.3v-3.8H9.4c-.1 0-.2-.1-.2-.2s.1-.3.2-.3h3c.1 0 .3.2.3.3 0 .1-.2.2-.3.2zm3.9 0h-2.2v1.5h2.1c.2 0 .3.1.3.3 0 .1-.1.2-.3.2h-2.1v1.8c0 .2-.1.3-.3.3-.2 0-.3-.1-.3-.3V16c0-.2.2-.4.4-.4h2.4c.1 0 .2.2.2.3 0 .1-.1.2-.2.2z", "fill": "#fff" }], "g": { "fill-rule": "evenodd", "clip-rule": "evenodd", "path": [{ "d": "M22.5 7.6V8h-4.8s-2.4-.5-2.3-2.5c0 0 .1 2.1 2.2 2.1h4.9z", "fill": "#0089E9" }, { "d": "M15.4 0v5.5c0 .6.4 2.1 2.3 2.1h4.8L15.4 0z", "opacity": ".5", "fill": "#fff" }] } },
	  slide: { "path": [{ "d": "M3.4 0c-1 0-1.9.9-1.9 1.9v20.2c0 1 .9 1.9 1.9 1.9h17.2c1 0 1.9-.9 1.9-1.9V7.6L15.4 0h-12z", "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "#1AB6D9" }, { "d": "M5.3 13v7.2h7.5V13H5.3zm6.8 5.8H6v-4.4h6.1v4.4z", "fill": "#fff" }, { "d": "M22.5 7.6V8h-4.8s-2.4-.5-2.3-2.5c0 0 .1 2.1 2.2 2.1h4.9z", "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "#13A3CF" }, { "d": "M15.4 0v5.5c0 .6.4 2.1 2.3 2.1h4.8L15.4 0z", "opacity": ".5", "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "#fff" }] },
	  stypi: { "g": { "fill-rule": "evenodd", "clip-rule": "evenodd", "path": [{ "d": "M3.4 0c-1 0-1.9.9-1.9 1.9v20.2c0 1 .9 1.9 1.9 1.9h17.2c1 0 1.9-.9 1.9-1.9V7.6L15.4 0h-12z", "fill": "#DDD965" }, { "d": "M22.5 7.6V8h-4.8s-2.4-.5-2.3-2.5c0 0 .1 2.1 2.2 2.1h4.9z", "fill": "#C1BC45" }, { "d": "M15.4 0v5.5c0 .6.4 2.1 2.3 2.1h4.8L15.4 0z", "opacity": ".5", "fill": "#fff" }, { "d": "M12.5 13.1H5.9c-.3 0-.6.2-.6.5v6c0 .4.3.6.6.6h5l2.2-2.2v-4.4c0-.3-.2-.5-.6-.5z", "fill": "#fff" }, { "fill": "#DBD75D", "d": "M6.7 16.3h5.1v.6H6.7zm0-1.3h5.1v.6H6.7zm0 2.7H10v.6H6.7z" }] } },
	  txt: { "path": [{ "d": "M3.4 0c-1 0-1.9.8-1.9 1.9v20.2c0 1 .9 1.9 1.9 1.9h17.2c1 0 1.9-.9 1.9-1.9V7.6L15.4 0h-12z", "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "#F9CA06" }, { "d": "M8.5 16.1H7.3v3.8c0 .2-.1.3-.3.3-.1 0-.3-.1-.3-.3v-3.8H5.5c-.1 0-.2-.1-.2-.2s.1-.3.2-.3h3c.2 0 .3.2.3.3 0 .1-.1.2-.3.2zm4.4 4.1c-.1 0-.1 0-.2-.1l-1.4-1.9-1.4 1.9c0 .1-.1.1-.2.1s-.3-.1-.3-.3l.1-.1 1.5-2L9.6 16l-.1-.1c0-.2.2-.3.3-.3.1 0 .2 0 .2.1l1.3 1.7 1.3-1.7c.1-.1.1-.1.2-.1.2 0 .3.1.3.3 0 0 0 .1-.1.1l-1.3 1.8 1.4 2c.1 0 .1.1.1.1 0 .2-.1.3-.3.3zm4.2-4.1h-1.2v3.8c0 .2-.1.3-.3.3-.1 0-.3-.1-.3-.3v-3.8h-1.2c-.1 0-.2-.1-.2-.2s.1-.3.2-.3h3c.2 0 .3.2.3.3 0 .1-.1.2-.3.2z", "fill": "#fff" }], "g": { "fill-rule": "evenodd", "clip-rule": "evenodd", "path": [{ "d": "M22.5 7.6V8h-4.8s-2.4-.5-2.3-2.5c0 0 .1 2.1 2.3 2.1h4.8z", "fill": "#F7BC04" }, { "d": "M15.4 0v5.4c0 .7.4 2.2 2.3 2.2h4.8L15.4 0z", "opacity": ".5", "fill": "#fff" }] } },
	  unknown: { "g": { "fill-rule": "evenodd", "clip-rule": "evenodd", "path": [{ "d": "M3.4 0c-1 0-1.9.9-1.9 1.9v20.2c0 1 .9 1.9 1.9 1.9h17.2c1 0 1.9-.9 1.9-1.9V7.6L15.4 0h-12z", "fill": "#8199AF" }, { "d": "M22.5 7.6V8h-4.8s-2.4-.5-2.3-2.5c0 0 .1 2.1 2.2 2.1h4.9z", "fill": "#617F9B" }, { "d": "M15.4 0v5.5c0 .6.4 2.1 2.3 2.1h4.8L15.4 0z", "opacity": ".5", "fill": "#fff" }] } },
	  video: { "path": [{ "d": "M3.4 0c-1 0-1.9.9-1.9 1.9v20.2c0 1 .9 1.9 1.9 1.9h17.2c1 0 1.9-.9 1.9-1.9V7.6L15.4 0h-12z", "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "#8E4C9E" }, { "d": "M10.7 17.1c0 .1-.1.2-.2.3 0 .1-1.9 1.7-4.4 2.7h-.5c-.1-.1-.2-.2-.2-.4 0-.1-.1-1.3-.1-2.6s.1-2.6.1-2.6c0-.2.1-.3.2-.4.1-.1.2-.1.3-.1h.2c2.5 1 4.4 2.6 4.4 2.7.1.1.2.2.2.4z", "fill": "#fff" }], "g": { "fill-rule": "evenodd", "clip-rule": "evenodd", "path": [{ "d": "M22.5 7.6V8h-4.8s-2.4-.5-2.3-2.5c0 0 .1 2.1 2.2 2.1h4.9z", "fill": "#713985" }, { "d": "M15.4 0v5.5c0 .6.4 2.1 2.3 2.1h4.8L15.4 0z", "opacity": ".5", "fill": "#fff" }] } },
	  visio: { "path": [{ "d": "M3.4 0c-1 0-1.9.9-1.9 1.9v20.2c0 1 .9 1.9 1.9 1.9h17.2c1 0 1.9-.9 1.9-1.9V7.6L15.4 0h-12z", "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "#496AB3" }, { "d": "M9.3 16l-1.5 3.9c-.1.2-.3.3-.5.3s-.4-.1-.4-.3L5.3 16v-.1c0-.1.1-.3.3-.3.1 0 .2.1.3.2l1.4 3.7 1.5-3.7c0-.1.1-.2.3-.2.1 0 .3.1.3.3 0 0 0 .1-.1.1zm1.2 4.2c-.1 0-.3-.1-.3-.3v-4c0-.2.2-.3.3-.3.2 0 .3.1.3.3v4c0 .2-.1.3-.3.3zm3 0c-.7 0-1.2-.2-1.6-.5-.1-.1-.1-.2-.1-.2 0-.2.1-.3.3-.3h.1c.4.3.8.5 1.3.5.8 0 1.1-.4 1.1-.7 0-1.2-2.7-.6-2.7-2.2 0-.7.7-1.2 1.5-1.2.6 0 1.1.2 1.5.5.1 0 .1.1.1.2s-.1.2-.3.2h-.1c-.4-.3-.8-.4-1.2-.4-.5 0-.9.3-.9.7 0 1 2.6.4 2.6 2.1 0 .7-.4 1.3-1.6 1.3z", "fill": "#fff" }], "g": { "fill-rule": "evenodd", "clip-rule": "evenodd", "path": [{ "d": "M22.5 7.6V8h-4.8s-2.4-.5-2.3-2.5c0 0 .1 2.1 2.2 2.1h4.9z", "fill": "#374FA0" }, { "d": "M15.4 0v5.5c0 .6.4 2.1 2.3 2.1h4.8L15.4 0z", "opacity": ".5", "fill": "#fff" }] } },
	  webex: { "g": { "fill-rule": "evenodd", "clip-rule": "evenodd", "path": [{ "d": "M3.4 0c-1 0-1.9.9-1.9 1.9v20.2c0 1 .9 1.9 1.9 1.9h17.2c1 0 1.9-.9 1.9-1.9V7.6L15.4 0h-12z", "fill": "#80BC4B" }, { "d": "M22.5 7.6V8h-4.8s-2.4-.5-2.3-2.5c0 0 .1 2.1 2.2 2.1h4.9z", "fill": "#60AB38" }, { "d": "M15.4 0v5.5c0 .6.4 2.1 2.3 2.1h4.8L15.4 0z", "opacity": ".5", "fill": "#fff" }] }, "path": [{ "d": "M9.2 20.2c1.9-.1 3.4-1.7 3.4-3.7 0-1.9-1.5-3.5-3.4-3.6v7.3z", "fill": "#CFE8AF" }, { "d": "M8.8 20.2c-2-.1-3.5-1.7-3.5-3.7s1.5-3.5 3.5-3.6v7.3z", "fill": "#fff" }] },
	  word: { "path": [{ "d": "M3.4 0c-1 0-1.9.8-1.9 1.9v20.2c0 1 .9 1.9 1.9 1.9h17.2c1 0 1.9-.9 1.9-1.9V7.6L15.4 0h-12z", "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "#14A9DA" }, { "d": "M6.8 20.2H5.7c-.2 0-.4-.2-.4-.4v-3.7c0-.2.2-.4.4-.4h1.1c1.4 0 2.4 1 2.4 2.3 0 1.2-1 2.2-2.4 2.2zm0-4h-.9v3.5h.9c1.1 0 1.8-.8 1.8-1.7 0-1-.6-1.8-1.8-1.8zm5.4 4.1c-1.3 0-2.2-1-2.2-2.3s.9-2.4 2.2-2.4c1.4 0 2.3 1 2.3 2.4 0 1.3-.9 2.3-2.3 2.3zm0-4.2c-1 0-1.6.8-1.6 1.9 0 1 .6 1.8 1.6 1.8 1.1 0 1.7-.8 1.7-1.8 0-1.1-.6-1.9-1.7-1.9zm7 .2v.2c0 .1-.1.2-.2.2s-.2 0-.2-.1c-.3-.3-.7-.5-1.1-.5-1 0-1.8.8-1.8 1.9 0 1 .8 1.8 1.8 1.8.4 0 .8-.2 1.1-.5 0-.1.1-.1.2-.1s.2.1.2.3v.1c-.4.4-.9.7-1.5.7-1.3 0-2.4-1-2.4-2.4s1.1-2.3 2.4-2.3c.6 0 1.1.3 1.5.7z", "fill": "#fff" }], "g": { "fill-rule": "evenodd", "clip-rule": "evenodd", "path": [{ "d": "M22.5 7.6V8h-4.8s-2.4-.5-2.3-2.5c0 0 .1 2.1 2.2 2.1h4.9z", "fill": "#0F93D0" }, { "d": "M15.4 0v5.5c0 .6.4 2.1 2.3 2.1h4.8L15.4 0z", "opacity": ".5", "fill": "#fff" }] } },
	  xml: { "path": [{ "d": "M3.4 0c-1 0-1.9.8-1.9 1.9v20.2c0 1 .9 1.9 1.9 1.9h17.2c1 0 1.9-.9 1.9-1.9V7.6L15.4 0h-12z", "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "#FC7B24" }, { "d": "M8.8 20.2c-.1 0-.2 0-.2-.1l-1.4-1.9-1.4 1.9c-.1.1-.2.1-.2.1-.2 0-.3-.1-.3-.3v-.1l1.5-2L5.4 16v-.1c0-.2.1-.3.3-.3 0 0 .1 0 .2.1l1.3 1.7 1.3-1.7c0-.1.1-.1.2-.1s.2.1.2.3v.1l-1.4 1.8 1.5 2v.1c0 .2-.1.3-.2.3zm5.4 0c-.2 0-.3-.1-.3-.3v-3.5l-1.5 3.7c0 .1-.1.1-.1.1-.1 0-.2 0-.2-.1l-1.5-3.7v3.5c0 .2-.1.3-.3.3-.1 0-.2-.1-.2-.3v-3.8c0-.3.2-.5.4-.5s.4.1.5.3l1.3 3.1 1.3-3.1c0-.2.2-.3.4-.3.3 0 .5.2.5.5v3.8c0 .2-.2.3-.3.3zm3.9-.1h-2c-.2 0-.4-.1-.4-.4v-3.8c0-.2.1-.3.3-.3.1 0 .2.1.2.3v3.7h1.9c.2 0 .3.2.3.3 0 .1-.1.2-.3.2z", "fill": "#fff" }], "g": { "fill-rule": "evenodd", "clip-rule": "evenodd", "path": [{ "d": "M22.5 7.6V8h-4.8s-2.4-.5-2.3-2.5c0 0 .1 2.1 2.2 2.1h4.9z", "fill": "#FB5C1B" }, { "d": "M15.4 0v5.5c0 .6.4 2.1 2.3 2.1h4.8L15.4 0z", "opacity": ".5", "fill": "#fff" }] } },
	  zip: { "path": [{ "d": "M3.4 0c-1 0-1.9.8-1.9 1.9v20.2c0 1 .9 1.9 1.9 1.9h17.2c1 0 1.9-.9 1.9-1.9V7.6L15.4 0h-12z", "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "#8199AF" }, { "d": "M8.4 20.2H5.6c-.2 0-.3-.1-.3-.3v-.2l2.6-3.5H5.5c-.1 0-.2-.1-.2-.2 0-.2.1-.3.2-.3h2.8c.2 0 .3.1.3.3 0 .1 0 .2-.1.2L6 19.7h2.4c.1 0 .3.1.3.3 0 .1-.2.2-.3.2zm1.5.1c-.1 0-.3-.2-.3-.3v-4.1c0-.1.2-.2.3-.2.2 0 .3.1.3.2V20c0 .1-.1.3-.3.3zm3.3-1.9H12V20c0 .1-.1.3-.3.3-.2 0-.3-.2-.3-.3v-3.9c0-.2.2-.4.4-.4h1.4c.9 0 1.4.6 1.4 1.4s-.5 1.3-1.4 1.3zm0-2.2H12v1.7h1.2c.5 0 .9-.3.9-.8s-.4-.9-.9-.9z", "fill": "#fff" }], "g": { "fill-rule": "evenodd", "clip-rule": "evenodd", "path": [{ "d": "M22.5 7.6V8h-4.8s-2.4-.5-2.3-2.5c0 0 .1 2.1 2.2 2.1h4.9z", "fill": "#617F9B" }, { "d": "M15.4 0v5.5c0 .6.4 2.1 2.3 2.1h4.8L15.4 0z", "opacity": ".5", "fill": "#fff" }] } }
	};
	module.exports.viewBox = '0 0 24 24';

/***/ },
/* 42 */
/***/ function(module, exports) {

	/*  Copyright (c) 2015, salesforce.com, inc. All rights reserved.    Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:  Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.  Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.  Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.  */
	"use strict";
	
	module.exports = {
	  account: { "path": { "d": "M19 12.3c0-.5-.4-.7-.5-.7h-5.3c-.4 0-.5.5-.5.5v5.7H19v-5.5zm-3.6 4c0 .3-.3.5-.5.5h-.5c-.3 0-.5-.2-.5-.5v-.5c0-.2.2-.5.5-.5h.5c.2 0 .5.3.5.5v.5zm0-2.5c0 .3-.3.5-.5.5h-.5c-.3 0-.5-.2-.5-.5v-.4c0-.3.2-.5.5-.5h.5c.2 0 .5.2.5.5v.4zm2.4 2.5c0 .3-.3.5-.5.5h-.5c-.3 0-.5-.2-.5-.5v-.5c0-.2.2-.5.5-.5h.5c.2 0 .5.3.5.5v.5zm0-2.5c0 .3-.3.5-.5.5h-.5c-.3 0-.5-.2-.5-.5v-.4c0-.3.2-.5.5-.5h.5c.2 0 .5.2.5.5v.4zm-3.6-4.1V6.9c0-.5-.4-.7-.5-.7H5.6c-.5 0-.6.5-.6.6v11h6.3v-7.1s0-.5.5-.5h1.9s.5-.3.5-.5zm-6.5 6.4c0 .2-.2.4-.5.4h-.5c-.2 0-.5-.2-.5-.4v-.5c0-.3.3-.5.5-.5h.5c.3 0 .5.2.5.5v.5zm0-2.5c0 .2-.2.5-.5.5h-.5c-.2 0-.5-.3-.5-.5v-.5c0-.3.3-.5.5-.5h.5c.3 0 .5.2.5.5v.5zm0-2.5c0 .3-.2.5-.5.5h-.5c-.2 0-.5-.2-.5-.5v-.4c0-.3.3-.5.5-.5h.5c.3 0 .5.2.5.5v.4zm0-2.4c0 .3-.2.5-.5.5h-.5c-.2 0-.5-.2-.5-.5v-.5c0-.3.3-.5.5-.5h.5c.3 0 .5.2.5.5v.5zm2.6 7.4c0 .2-.2.4-.5.4h-.4c-.3 0-.5-.2-.5-.4v-.5c0-.3.2-.5.5-.5h.4c.3 0 .5.2.5.5v.5zm0-2.5c0 .2-.2.5-.5.5h-.4c-.3 0-.5-.3-.5-.5v-.5c0-.3.2-.5.5-.5h.4c.3 0 .5.2.5.5v.5zm0-2.5c0 .3-.2.5-.5.5h-.4c-.3 0-.5-.2-.5-.5v-.4c0-.3.2-.5.5-.5h.4c.3 0 .5.2.5.5v.4zm0-2.4c0 .3-.2.5-.5.5h-.4c-.3 0-.5-.2-.5-.5v-.5c0-.3.2-.5.5-.5h.4c.3 0 .5.2.5.5v.5zm2.7 0c0 .3-.3.5-.5.5H12c-.3 0-.5-.2-.5-.5v-.5c0-.3.2-.5.5-.5h.5c.2 0 .5.2.5.5v.5z" } },
	  announcement: { "path": { "d": "M11 17.8l-.3-.3c-.5-.3-.5-.9-.5-1.2v-.8c0-.3-.2-.5-.4-.5H8c-.3 0-.5.2-.5.5v2.3c0 .8.5 1.4 1.2 1.4h1.5c.9 0 1-.6 1-.6s.1-.5-.2-.8zm6.8-8.2V5.5c0-.7-1-.9-1.4-.4l-2.7 2.5c-.5.3-1 .5-1.5.5H7.6C6 8.1 4.8 9.5 4.8 11v.1c0 1.5 1.2 2.7 2.8 2.7h4.6c.6 0 1.1.2 1.5.6l2.7 2.6c.4.4 1.4.3 1.4-.4v-4.1c.9 0 1.4-.6 1.4-1.5 0-.8-.6-1.4-1.4-1.4z" } },
	  answer_best: { "title": {}, "path": [{ "d": "M11.9 5.2c-4 0-7.2 3-7.2 6.7 0 1.2.3 2.3.9 3.3.1.1.1.2 0 .4L5 17.7c-.2.4.2.7.6.6l2.1-.8c.1 0 .3 0 .4.1 1.1.6 2.4 1 3.8 1 4 0 7.2-3 7.2-6.7s-3.2-6.7-7.2-6.7zm3.4 5.2l-3.6 3.7c-.2.1-.3.2-.5.2s-.4-.1-.5-.2l-1.8-1.8c-.2-.2-.2-.4 0-.5l.5-.5c.1-.2.3-.2.5 0l1.3 1.3 3.1-3.2c.2-.2.4-.2.5 0l.5.5c.2.1.2.4 0 .5z" }, { "fill-opacity": ".65", "d": "M24 24v-9.1L14.9 24H24zm-1-3.2l-.8.7v.1l.2 1.1c0 .1-.1.1-.1.1l-.9-.5c-.1-.1-.1-.1-.1 0l-1 .5s-.1 0-.1-.1l.2-1.1v-.1l-.8-.7c0-.1 0-.2.1-.2l1-.2h.1l.4-1c0-.1.1-.1.2 0l.4 1h.1l1 .2c.1 0 .1.1.1.2z" }] },
	  answer_private: { "title": {}, "path": [{ "fill-opacity": ".65", "d": "M21.4 20.2c-.3 0-.5.2-.5.4v.3h.9v-.3c0-.2-.2-.4-.4-.4z" }, { "fill-opacity": ".65", "d": "M24 24v-9.1L14.9 24H24zm-1.2-1.6c0 .2-.2.4-.4.4h-2.1c-.2 0-.4-.2-.4-.4v-1.2c0-.2.2-.3.4-.3h.1v-.3c0-.5.4-.9 1-.9s.9.4.9.9v.3h.1c.2 0 .4.1.4.3v1.2z" }, { "d": "M12 5.3c-4 0-7.2 3-7.2 6.7 0 1.2.3 2.3.9 3.3.1.1.1.3 0 .4l-.6 2.1c-.2.4.2.7.6.6l2.1-.7c.1-.1.3-.1.4 0 1.1.7 2.4 1 3.8 1 4 0 7.2-3 7.2-6.7S16 5.3 12 5.3zm3.5 5.2l-3.7 3.7c-.2.1-.3.2-.5.2s-.4-.1-.5-.2L9 12.4c-.1-.1-.1-.4 0-.5l.5-.5c.1-.1.4-.1.5 0l1.3 1.3 3.1-3.2c.2-.1.4-.1.6 0l.5.5c.1.2.1.4 0 .5z" }] },
	  answer_public: { "path": { "d": "M12 5.3c-4 0-7.2 3-7.2 6.7 0 1.2.3 2.3.9 3.3.1.1.1.3.1.4l-.7 2.1c-.1.4.2.7.6.6l2.1-.7c.2-.1.3-.1.4 0 1.1.7 2.4 1 3.8 1 4 0 7.2-3 7.2-6.7S16 5.3 12 5.3zm3.5 5.2l-3.7 3.7c-.2.1-.3.2-.5.2s-.4-.1-.5-.2L9 12.4c-.1-.1-.1-.4 0-.5l.5-.5c.1-.1.4-.1.5 0l1.3 1.3 3.1-3.2c.2-.1.4-.1.6 0l.5.5c.1.2.1.4 0 .5z" } },
	  approval: { "path": { "d": "M17.8 13h-2.7c-.8 0-1.4-.7-1.4-1.5.1-2.1 1.1-2.2 1.2-3.6.1-1.4-.8-2.7-2.3-3.1-1.8-.3-3.5 1.1-3.5 2.9 0 1.6 1.1 1.6 1.2 3.8 0 .8-.6 1.5-1.4 1.5H6.2c-.8 0-1.4.6-1.4 1.4v1c0 .2.2.4.5.4h13.4c.3 0 .5-.2.5-.4v-1c0-.8-.6-1.4-1.4-1.4zm0 4.3H6.2c-.2 0-.4.2-.4.4v.1c0 .8.6 1.4 1.4 1.4h9.6c.8 0 1.4-.6 1.4-1.4v-.1c0-.2-.2-.4-.4-.4z" } },
	  apps: { "path": { "d": "M7.7 4.8H5.8c-.6 0-1 .4-1 1v1.9c0 .5.4.9 1 .9h1.9c.5 0 .9-.4.9-.9V5.8c0-.6-.4-1-.9-1zm5.3 0h-2c-.5 0-.9.4-.9 1v1.9c0 .5.4.9.9.9h2c.5 0 .9-.4.9-.9V5.8c0-.6-.4-1-.9-1zm5.2 0h-1.9c-.5 0-.9.4-.9 1v1.9c0 .5.4.9.9.9h1.9c.6 0 1-.4 1-.9V5.8c0-.6-.4-1-1-1zM7.7 10.1H5.8c-.6 0-1 .4-1 .9v2c0 .5.4.9 1 .9h1.9c.5 0 .9-.4.9-.9v-2c0-.5-.4-.9-.9-.9zm5.3 0h-2c-.5 0-.9.4-.9.9v2c0 .5.4.9.9.9h2c.5 0 .9-.4.9-.9v-2c0-.5-.4-.9-.9-.9zm5.2 0h-1.9c-.5 0-.9.4-.9.9v2c0 .5.4.9.9.9h1.9c.6 0 1-.4 1-.9v-2c0-.5-.4-.9-1-.9zM7.7 15.4H5.8c-.6 0-1 .4-1 .9v1.9c0 .6.4 1 1 1h1.9c.5 0 .9-.4.9-1v-1.9c0-.5-.4-.9-.9-.9zm5.3 0h-2c-.5 0-.9.4-.9.9v1.9c0 .6.4 1 .9 1h2c.5 0 .9-.4.9-1v-1.9c0-.5-.4-.9-.9-.9zm5.2 0h-1.9c-.5 0-.9.4-.9.9v1.9c0 .6.4 1 .9 1h1.9c.6 0 1-.4 1-1v-1.9c0-.5-.4-.9-1-.9z" } },
	  apps_admin: { "path": { "d": "M17.5 5h-11C5.7 5 5 5.7 5 6.5v11c0 .8.7 1.5 1.5 1.5h11c.8 0 1.5-.7 1.5-1.5v-11c0-.8-.7-1.5-1.5-1.5zM17 17.5H7c-.3 0-.5-.2-.5-.5V7c0-.3.2-.5.5-.5h10c.3 0 .5.2.5.5v10c0 .3-.2.5-.5.5zm-6.2-9.6H8.4c-.3 0-.5.2-.5.5v2.4c0 .3.2.5.5.5h2.4c.3 0 .5-.2.5-.5V8.4c0-.3-.2-.5-.5-.5zm4.8 0h-2.4c-.3 0-.5.2-.5.5v2.4c0 .3.2.5.5.5h2.4c.3 0 .5-.2.5-.5V8.4c0-.3-.2-.5-.5-.5zm-4.8 4.8H8.4c-.3 0-.5.2-.5.5v2.4c0 .3.2.5.5.5h2.4c.3 0 .5-.2.5-.5v-2.4c0-.3-.2-.5-.5-.5zm4.8 0h-2.4c-.3 0-.5.2-.5.5v2.4c0 .3.2.5.5.5h2.4c.3 0 .5-.2.5-.5v-2.4c0-.3-.2-.5-.5-.5z" } },
	  article: { "path": { "d": "M7.7 14.2h3.1c.3 0 .5-.3.5-.5V6.5c0-.5-.5-1-1-1H7.8c-.4 0-.6.3-.6.6v7.6c0 .2.2.5.5.5zM18.2 7v7.6c0 .6-.4 1-.9 1H6.7c-.5 0-.9-.4-.9-1V7c-.8 0-1.5.6-1.5 1.4v7.2c0 .8.7 1.4 1.5 1.4h4.5c.3 0 .5.3.5.5s.2.5.5.5h1.4c.3 0 .5-.2.5-.5s.2-.5.5-.5h4.5c.8 0 1.5-.6 1.5-1.4V8.4c0-.8-.7-1.4-1.5-1.4zm-5 7.2h3c.4 0 .6-.3.6-.6V6c0-.3-.2-.5-.5-.5h-2.6c-.5 0-1 .5-1 1v7.2c0 .2.2.5.5.5z" } },
	  avatar: { "path": { "d": "M19.2 17.1v.7c0 .8-.6 1.4-1.4 1.4H6.2c-.8 0-1.4-.6-1.4-1.4v-.7c0-1.8 2-2.8 4-3.7 0 0 .1 0 .2-.1.1 0 .3 0 .4.1.8.5 1.7.8 2.6.8.9 0 1.8-.3 2.6-.8.1-.1.3-.1.4 0 .1 0 .2 0 .2.1 2 .8 4 1.8 4 3.6z" }, "ellipse": { "cx": "12", "cy": "8.76", "rx": "3.576", "ry": "3.96" } },
	  avatar_loading: { "g": { "opacity": ".5", "path": { "d": "M19.2 17.1v.7c0 .8-.6 1.4-1.4 1.4H6.2c-.8 0-1.4-.6-1.4-1.4v-.7c0-1.8 2-2.8 4-3.7 0 0 .1 0 .2-.1.1 0 .3 0 .4.1.8.5 1.7.8 2.6.8s1.8-.3 2.6-.8c.1-.1.3-.1.4 0 .1 0 .2 0 .2.1 2 .8 4 1.8 4 3.6z" }, "ellipse": { "cx": "12", "cy": "8.76", "rx": "3.576", "ry": "3.96" } } },
	  calibration: { "path": { "d": "M7.7 11.9c-.2.1-.3.1-.5.1-.1 0-.3 0-.5-.1-.1 0-.2.1-.2.3v6.5c0 .3.2.5.5.5h.4c.3 0 .5-.2.5-.5v-6.5c0-.2-.1-.3-.2-.3zm4.8 5.1h-1c-.1-.1-.2.1-.2.2v1.5c0 .3.2.5.5.5h.4c.3 0 .5-.2.5-.5v-1.5c0-.2-.1-.3-.2-.2zm4.8-3.6h-1c-.1-.1-.2.1-.2.2v5.1c0 .3.2.5.5.5h.4c.3 0 .5-.2.5-.5v-5.1c0-.2-.1-.3-.2-.2zm-9.4-6V5.3c0-.3-.2-.5-.5-.5H7c-.3 0-.5.2-.5.5v2.1c-.6.2-1 .8-1 1.5 0 .9.8 1.7 1.7 1.7s1.7-.8 1.7-1.7c0-.7-.4-1.3-1-1.5zm4.8 5V5.3c0-.3-.2-.5-.5-.5h-.4c-.3 0-.5.2-.5.5v7.1c-.6.3-1 .8-1 1.5 0 1 .8 1.7 1.7 1.7s1.7-.7 1.7-1.7c0-.7-.4-1.2-1-1.5zm4.8-3.6V5.3c0-.3-.2-.5-.5-.5h-.4c-.3 0-.5.2-.5.5v3.5c-.6.3-1 .8-1 1.5 0 1 .8 1.7 1.7 1.7s1.7-.7 1.7-1.7c0-.7-.4-1.2-1-1.5z" } },
	  call: { "path": { "d": "M18.6 15.3l-1.4-1.2c-.5-.4-1.3-.4-1.8 0l-1.4 1c-.2.2-.5.1-.6 0L11 13l-2.1-2.4c-.2-.2-.2-.4 0-.6l1-1.4c.4-.6.3-1.3-.1-1.8L8.6 5.3c-.5-.6-1.5-.7-2.1-.1L5.2 6.5c-.3.3-.4.7-.4 1.1.1 3 1.5 5.9 3.6 8s4.9 3.4 8 3.6c.4 0 .8-.2 1-.5l1.3-1.3c.7-.5.6-1.5-.1-2.1z" } },
	  call_history: { "path": { "d": "M6.7 11.5v.5H5.3v-.5h1.4zM12 5.3c-3.6 0-6.5 2.7-6.7 6.2v.3H4.2c-.3 0-.5.3-.3.5l1.8 2.2c.2.2.4.2.6 0l1.8-2.2c.2-.2 0-.5-.3-.5H6.7v-.3C7 8.8 9.2 6.7 12 6.7c3.1 0 5.6 2.7 5.2 5.9-.2 2.3-2.4 4.4-4.7 4.7-1.7.1-3.3-.5-4.4-1.7-.2-.2-.3-.3-.5 0l-.6.6c-.1.2 0 .3.1.4 1.3 1.4 3.1 2.1 5 2.1 3.4 0 6.3-2.8 6.6-6.2.3-3.9-2.8-7.2-6.7-7.2zm-.7 5c.2-.2.2-.6 0-.8l-.5-.6c-.2-.3-.7-.3-.9-.1l-.6.6c-.1.1-.2.3-.2.5.1 1.3.7 2.6 1.6 3.4s2.1 1.5 3.4 1.6c.2 0 .4 0 .5-.2l.6-.6c.2-.2.2-.7-.1-.9l-.6-.5c-.2-.2-.6-.2-.8 0l-.6.4c-.1.1-.2.1-.3 0l-1-.9-.9-1c-.1-.1-.1-.2 0-.3l.4-.6z" } },
	  campaign: { "path": { "d": "M12 4.8C8 4.8 4.8 8 4.8 12S8 19.2 12 19.2s7.2-3.2 7.2-7.2S16 4.8 12 4.8zm0 13c-3.2 0-5.8-2.6-5.8-5.8S8.8 6.2 12 6.2s5.8 2.6 5.8 5.8-2.6 5.8-5.8 5.8zm0-10.1c-2.4 0-4.3 1.9-4.3 4.3s1.9 4.3 4.3 4.3 4.3-1.9 4.3-4.3-1.9-4.3-4.3-4.3zm0 7.2c-1.6 0-2.9-1.3-2.9-2.9s1.3-2.9 2.9-2.9 2.9 1.3 2.9 2.9-1.3 2.9-2.9 2.9zm0-4.3c-.8 0-1.4.6-1.4 1.4s.6 1.4 1.4 1.4 1.4-.6 1.4-1.4-.6-1.4-1.4-1.4z" } },
	  campaign_members: { "path": [{ "fill-opacity": ".65", "d": "M24 14.9V24h-9.1l9.1-9.1zm-1.9 6.6c-.3-.1-.3-.2-.3-.4 0-.1.1-.2.2-.3.2-.2.2-.4.2-.7 0-.5-.3-.9-.8-.9s-.9.5-.9.9c0 .3.1.5.3.7.1.1.2.2.2.3s-.1.3-.4.4c-.5.2-.9.4-.9.8 0 .3.2.5.5.5h2.4c.2 0 .4-.2.4-.5 0-.4-.4-.6-.9-.8z" }, { "d": "M12 4.8C8 4.8 4.8 8 4.8 12S8 19.2 12 19.2s7.2-3.2 7.2-7.2S16 4.8 12 4.8zm0 13c-3.2 0-5.8-2.6-5.8-5.8S8.8 6.2 12 6.2s5.8 2.6 5.8 5.8-2.6 5.8-5.8 5.8zm0-10.1c-2.4 0-4.3 1.9-4.3 4.3s1.9 4.3 4.3 4.3 4.3-1.9 4.3-4.3-1.9-4.3-4.3-4.3zm0 7.2c-1.6 0-2.9-1.3-2.9-2.9s1.3-2.9 2.9-2.9 2.9 1.3 2.9 2.9-1.3 2.9-2.9 2.9zm0-4.3c-.8 0-1.4.6-1.4 1.4s.6 1.4 1.4 1.4 1.4-.6 1.4-1.4-.6-1.4-1.4-1.4z" }] },
	  canvas: { "path": { "d": "M17.7 15.8c0 .8-.1 1.7-.3 2.6 0 .2-.2.5-.5.5-1.6.2-3.3.3-4.9.3-1.6 0-3.2-.1-4.8-.3-.3 0-.6-.3-.6-.5-.2-1.4-.4-2.8-.4-4.1 0-1.4.2-2.7.4-4.1 0-.2.3-.5.5-.5 1-.1 2-.2 3-.2 0 0 .7-.1.7-.8 0-.7-1.2-1.1-1.2-2.3 0-.9.9-1.6 2.4-1.6 1.4 0 2.4.7 2.4 1.6 0 1.2-1.2 1.6-1.2 2.3-.1.7.7.8.7.8 1 0 2 .1 3 .2.2 0 .5.3.5.5.2 1 .3 1.8.3 2.7.1.3-.2.5-.5.5H17c-.3 0-.7-.2-.9-.4 0 0-.7-.6-1.3-.6-1.1-.1-2 .9-2 2s.8 2.1 1.9 2c.7 0 1.4-.7 1.4-.7.2-.1.6-.3.8-.3.1-.1.2-.1.3-.1.3.1.6.3.5.5z" } },
	  "case": { "path": { "d": "M9.1 7h1c.1 0 .2-.1.2-.3V6h3.4v.7c0 .2.1.3.2.3h1c.1 0 .2-.1.2-.3V6c0-.8-.6-1.4-1.4-1.4h-3.4c-.8 0-1.4.6-1.4 1.4v.7c0 .2.1.3.2.3zm8.7 1.4H6.2c-.8 0-1.4.6-1.4 1.4v7.7c0 .8.6 1.5 1.4 1.5h11.6c.8 0 1.4-.7 1.4-1.5V9.8c0-.8-.6-1.4-1.4-1.4z" } },
	  case_change_status: { "path": { "d": "M9.1 7.2h1c.1 0 .2-.1.2-.2v-.8h3.4V7c0 .1.1.2.2.2h1c.1 0 .2-.1.2-.2v-.8c0-.8-.6-1.4-1.4-1.4h-3.4c-.8 0-1.4.6-1.4 1.4V7c0 .1.1.2.2.2zm8.7 1.4H6.2c-.8 0-1.4.7-1.4 1.5v7.7c0 .8.6 1.4 1.4 1.4h11.6c.8 0 1.4-.6 1.4-1.4v-7.7c0-.8-.6-1.5-1.4-1.5zM14 13.9L11.5 17c-.1.1-.4 0-.3-.2l.6-2.2h-1.6c-.2 0-.4-.2-.3-.3l1-2.6c.1-.3.3-.4.5-.4h2c.2 0 .4.2.3.4l-1.1 1.7h1.2c.3 0 .4.4.2.5z" } },
	  case_comment: { "path": { "d": "M9.1 7.2h1c.1 0 .2-.1.2-.2v-.8h3.4V7c0 .1.1.2.2.2h1c.1 0 .2-.1.2-.2v-.8c0-.8-.6-1.4-1.4-1.4h-3.4c-.8 0-1.4.6-1.4 1.4V7c0 .1.1.2.2.2zm8.7 1.4H6.2c-.8 0-1.4.7-1.4 1.5v7.7c0 .8.6 1.4 1.4 1.4h11.6c.8 0 1.4-.6 1.4-1.4v-7.7c0-.8-.6-1.5-1.4-1.5zm-5.6 7.7c-.5 0-1-.1-1.5-.4h-.1l-1 .4c-.1.1-.3-.1-.2-.2l.4-1c0-.1 0-.1-.1-.1-.2-.4-.3-.9-.3-1.3 0-1.5 1.3-2.7 2.8-2.7s2.8 1.2 2.8 2.7c0 1.4-1.2 2.6-2.8 2.6z" } },
	  case_email: { "path": { "d": "M9.1 7.2h1c.1 0 .2-.1.2-.2v-.8h3.4V7c0 .1.1.2.2.2h1c.1 0 .2-.1.2-.2v-.8c0-.8-.6-1.4-1.4-1.4h-3.4c-.8 0-1.4.6-1.4 1.4V7c0 .1.1.2.2.2zm8.7 1.4H6.2c-.8 0-1.4.7-1.4 1.5v7.7c0 .8.6 1.4 1.4 1.4h11.6c.8 0 1.4-.6 1.4-1.4v-7.7c0-.8-.6-1.5-1.4-1.5zm-8.7 2.7h5.8c.2 0 .2.2.2.3l-3 2.7c0 .1-.1.1-.2 0l-3-2.7c-.1-.2 0-.3.2-.3zm6 4.1c0 .3-.4.7-.7.7H9.6c-.3 0-.7-.4-.7-.7v-2.7c0-.1.1-.2.2-.1l2.3 2.2c.2.1.4.2.6.2s.4-.1.6-.2l2.2-2.2c.1-.1.3 0 .3.1v2.7z" } },
	  case_log_a_call: { "path": { "d": "M9.1 7.2h1c.1 0 .2-.1.2-.2v-.8h3.4V7c0 .1.1.2.2.2h1c.1 0 .2-.1.2-.2v-.8c0-.8-.6-1.4-1.4-1.4h-3.4c-.8 0-1.4.6-1.4 1.4V7c0 .1.1.2.2.2zm8.7 1.4H6.2c-.8 0-1.4.7-1.4 1.5v7.7c0 .8.6 1.4 1.4 1.4h11.6c.8 0 1.4-.6 1.4-1.4v-7.7c0-.8-.6-1.5-1.4-1.5zM15 15.9l-.6.5c-.1.1-.2.2-.4.2-1.2-.1-2.4-.7-3.2-1.5-.8-.8-1.4-1.9-1.4-3.2 0-.1 0-.3.1-.4l.6-.5c.2-.3.6-.2.8 0l.5.6c.2.2.2.5 0 .7l-.4.6v.2l.9 1 .9.8c.1.1.2.1.3 0l.5-.4c.2-.1.5-.1.7 0l.6.5c.3.2.3.6.1.9z" } },
	  case_transcript: { "path": { "d": "M9.1 7.2h1c.1 0 .2-.1.2-.2v-.8h3.4V7c0 .1.1.2.2.2h1c.1 0 .2-.1.2-.2v-.8c0-.8-.6-1.4-1.4-1.4h-3.4c-.8 0-1.4.6-1.4 1.4V7c0 .1.1.2.2.2zm8.7 1.4H6.2c-.8 0-1.4.7-1.4 1.5v7.7c0 .8.6 1.4 1.4 1.4h11.6c.8 0 1.4-.6 1.4-1.4v-7.7c0-.8-.6-1.5-1.4-1.5zm-3.2 7.5c0 .4-.3.7-.7.7h-3.3c-.4 0-.8-.3-.8-.7v-4.6c0-.4.4-.7.8-.7h1.6c.2 0 .3.1.3.2v1.5c0 .2.2.5.5.5h1.4c.1 0 .2.1.2.2v2.9zm0-3.8c0 .1 0 .2-.1.2h-1.1c-.2 0-.4-.2-.4-.5v-1c0-.1 0-.2.1-.2h.1l1.4 1.4v.1z" } },
	  client: { "path": { "d": "M10.8 14c.8-.5 1.7-.8 2.6-.8.3 0 .5.1.8.1.1 0 .1 0 0-.1-.4-.3-1-.5-1.5-.7-1-.5-1.2-.8-1.2-1.3 0-.4.3-.8.7-1.1.6-.5.9-1.3.9-2.2 0-1.6-1-3.1-2.9-3.1-1.8 0-2.8 1.5-2.8 3.1 0 .9.3 1.7.9 2.2.4.3.7.7.7 1.1 0 .4-.2.8-1.2 1.3-1.5.6-2.9 1.3-3 2.7 0 .9.7 1.6 1.6 1.6h3.4c.2 0 .4-.2.4-.4v-1.6c.1-.3.2-.6.6-.8zm7.8 1.4c-2.3.7-4.1-1.4-6.6-.4-.1 0-.2.2-.2.4V18c0 .3.2.6.6.5 2.4-.8 4.2 1.3 6.5.4.2-.1.3-.3.3-.5v-2.5c0-.3-.3-.6-.6-.5zm-3 2.4c-.6 0-1-.4-1-1s.4-.9 1-.9.9.4.9.9-.4 1-.9 1z" } },
	  coaching: { "path": { "d": "M11.3 12.7c-.3 0-.6.1-.9.4-.4.4-.4 1.2 0 1.7.3.2.6.3.9.3.3 0 .6-.1.8-.3.5-.5.5-1.2 0-1.7-.2-.3-.5-.4-.8-.4zm7.8-5.4L17.5 5c-.2-.2-.5-.3-.7-.2l-8 5c-.8.5-1.4 1.1-1.9 2.2-.4 1-.5 2.1-.2 3.1-1.1.1-1.9 1-1.9 2.1s.9 2 2 2c.9 0 1.6-.5 1.9-1.2 1.9 1.2 4.4.9 6-.7 1.5-1.5 1.8-3.6.9-5.4-.2-.7-.1-1.4.5-1.8L19 8c.2-.1.2-.4.1-.7zM6.8 17.8c-.3 0-.6-.3-.6-.6s.3-.6.6-.6.6.2.6.6-.2.6-.6.6zm6.4-2c-.6.5-1.2.8-1.9.8s-1.4-.3-1.9-.8c-1-1-1-2.7 0-3.8.5-.5 1.2-.7 1.9-.7s1.3.2 1.9.7c1 1.1 1 2.8 0 3.8z" } },
	  connected_apps: { "path": { "d": "M17.5 5h-11C5.7 5 5 5.7 5 6.5v11c0 .8.7 1.5 1.5 1.5h11c.8 0 1.5-.7 1.5-1.5v-11c0-.8-.7-1.5-1.5-1.5zM17 17.5H7c-.3 0-.5-.2-.5-.5V7c0-.3.2-.5.5-.5h10c.3 0 .5.2.5.5v10c0 .3-.2.5-.5.5zm-3-6.2h-1.5L13.8 9c.2-.2 0-.6-.3-.6h-2c-.2 0-.5.2-.6.5l-1.3 3.3c-.1.2.1.5.4.5h1.5l-.7 2.6c-.1.3.2.4.4.2l3.1-3.7c.2-.2.1-.5-.3-.5z" } },
	  contact: { "path": { "d": "M17.8 7H6.2c-.8 0-1.4.6-1.4 1.4v7c0 .8.6 1.4 1.4 1.4h11.6c.8 0 1.4-.6 1.4-1.4v-7c0-.8-.6-1.4-1.4-1.4zm-6.1 8.1H7.5c-.4 0-.8-.5-.8-1 0-.7.8-1.1 1.6-1.5.5-.2.6-.4.6-.7s-.1-.4-.3-.6c-.3-.3-.5-.7-.5-1.2 0-.9.5-1.7 1.5-1.7s1.5.8 1.5 1.7c0 .5-.2.9-.5 1.2-.2.2-.4.4-.4.6s.1.5.7.7c.8.3 1.5.8 1.5 1.5.1.5-.3 1-.7 1zm5.6-1.7c0 .3-.2.5-.5.5h-2.2c-.2 0-.4-.2-.4-.5v-.7c0-.2.2-.5.4-.5h2.2c.3 0 .5.3.5.5v.7zm0-2.6c0 .3-.2.5-.5.5h-3.6c-.3 0-.5-.2-.5-.5v-.7c0-.3.2-.5.5-.5h3.6c.3 0 .5.2.5.5v.7z" } },
	  contract: { "path": { "d": "M17.9 8.1l-3.2-3.2c0-.1-.1-.1-.2-.1-.2 0-.3.1-.3.3v2.6c0 .5.4.9.9.9h2.6c.2 0 .3-.1.3-.3 0-.1 0-.2-.1-.2zm-.4 2h-3.3c-.8 0-1.5-.7-1.5-1.5V5.3c0-.3-.2-.5-.5-.5H7.4c-.8 0-1.4.6-1.4 1.4v11.6c0 .8.6 1.4 1.4 1.4h9.2c.8 0 1.4-.6 1.4-1.4v-7.2c0-.3-.2-.5-.5-.5zM7.7 7.8l1.2-.1v-.1l.6-1.1h.1l.6 1.1v.1l1.2.1c.1 0 .1.1.1.2l-.9.8v.1l.2 1.2c0 .1-.1.1-.2.1l-1-.6h-.1l-1.1.6s-.1 0-.1-.1l.2-1.2-.1-.1-.8-.8c0-.1 0-.2.1-.2zm7.4 8c0 .3-.2.5-.5.5H8.4c-.3 0-.5-.2-.5-.5v-.4c0-.3.2-.5.5-.5h6.2c.3 0 .5.2.5.5v.4zm1-2.8c0 .2-.2.4-.5.4H8.4c-.3 0-.5-.2-.5-.4v-.5c0-.3.2-.5.5-.5h7.2c.3 0 .5.2.5.5v.5z" } },
	  custom: { "path": { "d": "M19 7.9c0-.2-.3-.2-.4-.1l-2.4 2.4c-.2.2-.5.2-.7 0l-1.7-1.7c-.2-.2-.2-.5 0-.7l2.4-2.4c.2-.1.1-.4 0-.4-.5-.1-.9-.2-1.3-.2-2.6 0-4.6 2.2-4.3 4.8 0 .4.1.8.3 1.1l-5.6 5.6c-.7.7-.7 1.8 0 2.4.3.4.7.5 1.2.5s.8-.1 1.2-.5l5.6-5.6c.3.2.7.3 1.1.3 2.6.3 4.8-1.7 4.8-4.3 0-.4-.1-.8-.2-1.2z" } },
	  dashboard: { "path": { "d": "M12 4.8C8 4.8 4.8 8 4.8 12S8 19.2 12 19.2s7.2-3.2 7.2-7.2S16 4.8 12 4.8zm0 1.9c2.9 0 5.3 2.4 5.3 5.3 0 .2 0 .5-.1.7h-2.1c-.2 0-.4.2-.5.4-.2 1.3-1.3 2.3-2.6 2.3s-2.4-1-2.6-2.3c0-.2-.3-.4-.5-.4H6.8c-.1-.2-.1-.5-.1-.7 0-2.9 2.4-5.3 5.3-5.3zm-.6 7.1c.6.3 1.4 0 1.7-.5.4-.9 1.3-4.6 1.1-4.7-.2-.1-2.8 2.7-3.2 3.6-.4.5-.2 1.3.4 1.6z" } },
	  "default": { "path": { "opacity": ".5", "d": "M10.7 7.9c.5-.5 1.2-.8 1.9-.8 1.1 0 1.9.5 2.4 1.3.4-.1.9-.3 1.4-.3 1.8.1 3.3 1.5 3.3 3.3 0 1.8-1.5 3.3-3.3 3.3-.2 0-.5 0-.7-.1-.4.8-1.2 1.3-2.1 1.3-.4 0-.7-.1-1-.3-.5 1-1.4 1.7-2.6 1.7-1.2 0-2.2-.8-2.6-1.8-.2 0-.3.1-.5.1-1.4 0-2.6-1.2-2.6-2.6 0-.9.5-1.8 1.3-2.2-.2-.4-.2-.7-.2-1.2 0-1.6 1.3-2.9 2.9-2.9 1 0 1.9.5 2.4 1.2" } },
	  document: { "path": { "d": "M17.5 10.1h-3.3c-.8 0-1.5-.7-1.5-1.5V5.3c0-.3-.2-.5-.5-.5H7.4c-.8 0-1.4.6-1.4 1.4v11.6c0 .8.6 1.4 1.4 1.4h9.2c.8 0 1.4-.6 1.4-1.4v-7.2c0-.3-.2-.5-.5-.5zm.4-2l-3.2-3.2c0-.1-.1-.1-.2-.1-.2 0-.3.1-.3.3v2.6c0 .5.4.9.9.9h2.6c.2 0 .3-.1.3-.3 0-.1 0-.2-.1-.2z" } },
	  drafts: { "path": { "d": "M17.5 4.8H9.8c-.8 0-1.4.6-1.4 1.4v.3c0 .1.1.2.2.2h7c.8 0 1.4.7 1.4 1.5v7.4c0 .1.1.2.3.2h.2c.8 0 1.5-.6 1.5-1.4V6.2c0-.8-.7-1.4-1.5-1.4zm-3.3 3.4H6.5c-.8 0-1.5.6-1.5 1.4v8.2c0 .8.7 1.4 1.5 1.4h7.7c.8 0 1.4-.6 1.4-1.4V9.6c0-.8-.6-1.4-1.4-1.4zM7 10.6c0-.3.2-.5.4-.5h4.8c.3 0 .5.2.5.5v.4c0 .3-.2.5-.5.5H7.4c-.2 0-.4-.2-.4-.5v-.4zm5.7 6.2c0 .3-.2.5-.5.5H7.4c-.2 0-.4-.2-.4-.5v-.5c0-.2.2-.5.4-.5h4.8c.3 0 .5.3.5.5v.5zm1-2.9c0 .3-.2.5-.5.5H7.4c-.2 0-.4-.2-.4-.5v-.5c0-.2.2-.4.4-.4h5.8c.3 0 .5.2.5.4v.5z" } },
	  email: { "path": { "d": "M11.7 13.2c.2.2.4.2.6 0l6.8-6.3c.1-.2.1-.6-.4-.6H5.3c-.4 0-.6.3-.4.6l6.8 6.3zm7.5-3.6c0-.3-.4-.5-.6-.3l-5.3 4.9c-.3.4-.8.5-1.3.5s-.9-.1-1.3-.5L5.4 9.3c-.2-.2-.6 0-.6.3v6.2c0 .8.7 1.5 1.5 1.5h11.5c.8 0 1.4-.7 1.4-1.5V9.6z" } },
	  email_chatter: { "path": { "d": "M11.7 13.2c.2.2.4.2.6 0l6.8-6.3c.1-.2.1-.6-.4-.6H5.3c-.4 0-.6.3-.4.6l6.8 6.3zm7.5-3.6c0-.3-.4-.5-.6-.3l-5.3 4.9c-.3.4-.8.5-1.3.5s-.9-.1-1.3-.5L5.4 9.3c-.2-.2-.6 0-.6.3v6.2c0 .8.7 1.5 1.5 1.5h11.5c.8 0 1.4-.7 1.4-1.5V9.6z" } },
	  empty: { "path": { "opacity": ".5", "d": "M17.3 18.7H6.7c-.8 0-1.4-.6-1.4-1.4V6.7c0-.8.6-1.4 1.4-1.4h10.6c.8 0 1.4.6 1.4 1.4v10.6c0 .8-.6 1.4-1.4 1.4zM6.7 7.2v9.6c0 .3.2.5.5.5h9.6c.3 0 .5-.2.5-.5V7.2c0-.3-.2-.5-.5-.5H7.2c-.3 0-.5.2-.5.5z" } },
	  endorsement: { "path": { "d": "M6.7 10.1H5.3c-.3 0-.5.2-.5.5v7.7c0 .3.2.4.5.4h.5c.8 0 1.4-.6 1.4-1.4v-6.7c0-.3-.2-.5-.5-.5zm10.6.2h-1.5c-.8 0-1.4-.6-1.4-1.4V6c0-.8-.6-1.4-1.4-1.4h-1c-.3 0-.5.2-.5.4v2c0 1.6-.8 3.3-2.4 3.3-.2 0-.5.2-.5.5v6.7c0 .3.2.5.5.5 2.1.1 3.5.9 5.8.9 2.4 0 4.3-.7 4.3-3v-3.7c0-1-.9-1.9-1.9-1.9z" } },
	  environment_hub: { "path": { "d": "M10.3 11.3c.1-1 .4-2 .9-2.9.8-1.3 2.1-2.1 3.8-2.2.3-.8 1.1-1.4 2-1.4 1.2 0 2.2 1 2.2 2.2s-1 2.1-2.2 2.1c-.9 0-1.7-.6-2-1.4-1.9.1-3 1.6-3.2 3.6H15c.3-.9 1.1-1.5 2-1.5 1.2 0 2.2 1 2.2 2.2s-1 2.2-2.2 2.2c-.9 0-1.7-.6-2-1.5h-3.2c.2 2.2 1.2 3.6 3.2 3.6.3-.8 1.1-1.4 2-1.4 1.2 0 2.2.9 2.2 2.1s-1 2.2-2.2 2.2c-.9 0-1.7-.6-2-1.4-1.8 0-3.1-.8-3.9-2.2-.4-.9-.7-1.8-.8-2.9H9c-.3.9-1.1 1.5-2 1.5-1.2 0-2.2-1-2.2-2.2s1-2.2 2.2-2.2c.9 0 1.7.6 2 1.5h1.3zM17 7.7c.4 0 .8-.3.8-.7s-.4-.8-.8-.8-.7.4-.7.8.3.7.7.7zm0 10.1c.4 0 .8-.4.8-.8s-.4-.7-.8-.7-.7.3-.7.7.3.8.7.8zm0-5.1c.4 0 .8-.3.8-.7s-.4-.7-.8-.7-.7.3-.7.7.3.7.7.7zm-10 0c.4 0 .7-.3.7-.7s-.3-.7-.7-.7-.8.3-.8.7.4.7.8.7z" } },
	  event: { "path": { "d": "M18.2 10.1H5.8c-.3 0-.5.2-.5.5v7.2c0 .8.6 1.4 1.4 1.4h10.6c.8 0 1.4-.6 1.4-1.4v-7.2c0-.3-.2-.5-.5-.5zm-8.6 6.7c0 .3-.2.5-.5.5h-.9c-.3 0-.5-.2-.5-.5v-1c0-.2.2-.4.5-.4h.9c.3 0 .5.2.5.4v1zm0-3.4c0 .3-.2.5-.5.5h-.9c-.3 0-.5-.2-.5-.5v-.9c0-.3.2-.5.5-.5h.9c.3 0 .5.2.5.5v.9zm3.4 3.4c0 .3-.3.5-.5.5h-1c-.2 0-.5-.2-.5-.5v-1c0-.2.3-.4.5-.4h1c.2 0 .5.2.5.4v1zm0-3.4c0 .3-.3.5-.5.5h-1c-.2 0-.5-.2-.5-.5v-.9c0-.3.3-.5.5-.5h1c.2 0 .5.2.5.5v.9zm3.3 3.4c0 .3-.2.5-.5.5h-.9c-.3 0-.5-.2-.5-.5v-1c0-.2.2-.4.5-.4h.9c.3 0 .5.2.5.4v1zm0-3.4c0 .3-.2.5-.5.5h-.9c-.3 0-.5-.2-.5-.5v-.9c0-.3.2-.5.5-.5h.9c.3 0 .5.2.5.5v.9zm1-7.2h-1.2v-.4c0-.6-.5-1-1-1s-.9.4-.9 1v.4H9.8v-.4c0-.6-.4-1-.9-1s-1 .4-1 1v.4H6.7c-.8 0-1.4.7-1.4 1.5v.5c0 .2.2.4.5.4h12.4c.3 0 .5-.2.5-.4v-.5c0-.8-.6-1.5-1.4-1.5z" } },
	  feed: { "path": { "d": "M11.8 17.3c-.1 0-.3 0-.4-.1-.2-.1-.3-.3-.4-.5L9.2 9.2l-1.6 3.5c-.1.3-.4.5-.6.5H4.8c-.3 0-.5-.2-.5-.5v-.5c0-.2.2-.4.5-.4h1.7l2.2-5.1c.1-.3.4-.5.7-.5.3.1.6.3.7.6l1.9 7.6 2.4-5.6c.2-.3.5-.4.8-.4.2 0 .5.2.6.5l1.2 2.9h2.2c.3 0 .5.2.5.4v.5c0 .3-.2.5-.5.5h-2.6c-.3 0-.6-.2-.7-.4l-.8-1.9-2.7 5.9c-.1.3-.4.5-.6.5z" } },
	  feedback: { "path": { "d": "M19 13.6v-.3c.4-.8.7-1.6.7-2.5 0-2.8-2.4-5-5.3-5-1.2 0-2.4.4-3.3 1.1 3 .6 5.2 3.2 5.2 6.3 0 .9-.1 1.7-.5 2.4.5-.1 1-.3 1.4-.5.1-.1.2-.1.3-.1l1.5.6c.3.1.5-.2.5-.5l-.5-1.5zM9.6 8.2c-2.9 0-5.3 2.2-5.3 5 0 .9.3 1.7.7 2.5 0 .1.1.2 0 .3l-.5 1.6c-.1.3.2.5.5.4l1.5-.5c.1-.1.2-.1.3 0 .8.5 1.8.7 2.8.7 2.9 0 5.3-2.2 5.3-5s-2.4-5-5.3-5zm-2.9 6c-.5 0-.9-.5-.9-1s.4-1 .9-1 1 .5 1 1-.5 1-1 1zm2.9 0c-.5 0-1-.5-1-1s.5-1 1-1 1 .5 1 1-.5 1-1 1zm2.9 0c-.5 0-1-.5-1-1s.5-1 1-1 .9.5.9 1-.4 1-.9 1z" } },
	  file: { "path": { "d": "M7 15.1V7.4c-.8 0-1.5.7-1.5 1.5V18c0 .8.7 1.4 1.5 1.4h7.2c.8 0 1.4-.6 1.4-1.4H9.8C8.3 18 7 18 7 15.1zm11-6.2h-2.4c-.8 0-1.4-.7-1.4-1.5V5c0-.2-.3-.4-.5-.4H9.8c-.8 0-1.4.6-1.4 1.4v9.1c0 .8.6 1.5 1.4 1.5H17c.8 0 1.5-.7 1.5-1.5V9.4c0-.3-.2-.5-.5-.5zm.4-2l-2.2-2.2c-.1-.1-.2-.1-.3-.1-.2 0-.3.1-.3.3v1.6c0 .5.4.9 1 .9h1.5c.2 0 .4-.1.4-.3 0-.1 0-.2-.1-.2z" } },
	  flow: { "path": { "d": "M19.2 7.4C18.6 6.1 17 3.9 14 5.2c-1.8.8-2.8 1.3-2.8 1.3L8.5 7.7c-.7.3-2.4-.2-3.3-.5-.2-.1-.5.2-.4.5.7 1.2 2.3 3.5 5.2 2.1 1.8-.8 5.5-2.4 5.5-2.4.7-.4 2.4.1 3.3.5.3 0 .5-.2.4-.5zm-6.4 3.8c-.3.2-1.6.8-1.6.8l-1.3.6c-.7.4-2.1-.1-2.9-.5-.3-.1-.5.2-.4.5.6 1.2 2 3.3 4.6 2 1.6-.8 2.9-1.3 2.9-1.3.7-.4 2.1.1 2.9.4.3.1.5-.2.4-.4-.6-1.2-2-3.4-4.6-2.1zm-.9 5.3c-.3.2-.7.5-.7.5-.5.3-1.6-.1-2.2-.4-.2-.1-.4.2-.3.4.4 1.1 1.5 3 3.4 1.8l.7-.4c.6-.3 1.6.1 2.2.4.2.1.4-.2.3-.5-.4-1-1.4-2.9-3.4-1.8z" } },
	  folder: { "path": { "d": "M18 8.3h-6.8c-.4 0-.8-.2-1.1-.6l-1-1.8c-.2-.4-.6-.6-1.1-.6H6c-.7 0-1.2.5-1.2 1.2v11c0 .7.5 1.2 1.2 1.2h12c.7 0 1.2-.5 1.2-1.2V9.6c0-.7-.5-1.3-1.2-1.3zm0-2.4h-7.2c-.1 0-.2.1-.1.2l.4.8c.1.1.2.2.3.2H18c.3 0 .7.1.9.2.2.1.3 0 .3-.2 0-.7-.5-1.2-1.2-1.2z" } },
	  generic_loading: { "path": { "opacity": ".15", "d": "M12.4 5.3h-.8c-.2 0-.3.1-.3.3v3.2c0 .2.1.3.3.3h.8c.2 0 .3-.1.3-.3V5.6c0-.2-.1-.3-.3-.3zm6 6h-3.2c-.2 0-.3.1-.3.3v.8c0 .2.1.3.3.3h3.2c.2 0 .3-.1.3-.3v-.8c0-.2-.1-.3-.3-.3zm-6 3.6h-.8c-.2 0-.3.1-.3.3v3.2c0 .2.1.3.3.3h.8c.2 0 .3-.1.3-.3v-3.2c0-.2-.1-.3-.3-.3zm-3.3-2.5v-.8c0-.2-.1-.3-.3-.3H5.6c-.2 0-.3.1-.3.3v.8c0 .2.1.3.3.3h3.2c.2 0 .3-.1.3-.3zm5.2-2.2c.1.2.3.2.5 0L17 8c.1-.1.1-.3 0-.5l-.5-.5c-.2-.1-.4-.1-.5 0l-2.2 2.2c-.2.2-.2.4 0 .5l.5.5zm.5 3.6c-.1-.2-.4-.2-.5 0l-.5.5c-.1.1-.1.3 0 .5L16 17c.2.1.4.1.5 0l.5-.5c.2-.2.2-.4 0-.5l-2.2-2.2zm-5.1 0c-.1-.2-.3-.2-.5 0L7 16c-.1.1-.1.3 0 .5l.5.5c.2.1.4.1.5 0l2.2-2.2c.2-.2.2-.4 0-.5l-.5-.5zM8 7c-.1-.2-.3-.2-.5 0l-.5.5c-.1.1-.1.3 0 .5l2.2 2.2c.2.1.4.1.5 0l.5-.5c.2-.1.2-.4 0-.5L8 7z" } },
	  goals: { "path": { "d": "M6.2 4.8c-.8 0-1.4.6-1.4 1.4 0 .5.2.9.5 1.1v10.9c0 .6.4 1 .9 1s1-.4 1-1V7.3c.3-.2.5-.6.5-1.1 0-.8-.7-1.4-1.5-1.4zm12.2 2.6c-3.8 2-5.9-1.4-9.4-.1-.2 0-.4.2-.4.4v6.2c0 .3.4.6.7.5 3.4-1.1 5.5 2.2 9.2.1.1-.1.2-.2.2-.4V7.6c0-.2-.2-.3-.3-.2zm-1.1 3.3c-.5.1-.9.1-1.4.1h-.1v1.4h.1c.5 0 .9 0 1.4-.1v1.4c-.5.2-.9.2-1.4.2h-.1v-1.4c-.4 0-.9-.1-1.4-.2v1.4c-.3 0-.7-.1-1-.2-.2-.1-.3-.1-.4-.2v-1.4c-.6-.2-1-.3-1.5-.4v1.5c-.2-.1-.5-.1-.8-.1-.2 0-.4 0-.6.1v-1.5h1.4V10c-.2-.1-.5-.1-.8-.1h-.6V8.5c.2-.1.4-.1.6-.1.3 0 .6.1.8.1V10c.4.1.7.2 1.3.3 0 .1.1.1.2.1V9c.4.1.9.2 1.4.3v1.4c.5.1.9.1 1.4.1V9.4h.1c.5 0 .9 0 1.4-.1v1.4zm-4.3-.3v1.3c.1 0 .2.1.3.1.4.1.7.2 1.1.3v-1.4c-.5-.1-1-.2-1.4-.3z" } },
	  group_loading: { "path": { "opacity": ".5", "d": "M8.8 12.6c-.4-.7-.6-1.4-.6-2.3 0-1.4.6-2.6 1.5-3.3-.3-.6-.9-1-1.8-1-1.4 0-2.1 1.1-2.1 2.4 0 .7.2 1.3.7 1.7.2.2.4.6.4.9 0 .3-.1.6-.9 1-1.1.5-2.1 1.1-2.2 2.2 0 .7.5 1.2 1.1 1.2H6c.1 0 .3-.1.4-.3.5-.9 1.4-1.5 2.2-1.9.3-.1.4-.4.2-.6zM18 12c-.8-.4-.9-.7-.9-1 0-.3.2-.7.4-.9.5-.4.7-1 .7-1.7 0-1.3-.7-2.4-2.1-2.4-.9 0-1.5.4-1.8 1 .9.7 1.5 1.9 1.5 3.3 0 .9-.2 1.6-.6 2.3-.2.2-.1.5.2.7.8.4 1.7.9 2.2 1.8.1.2.3.3.4.3h1.1c.6 0 1.1-.5 1.1-1.2-.1-1.1-1.1-1.7-2.2-2.2zm-3.9 2.3c-.9-.4-1-.7-1-1.1 0-.4.2-.7.5-1 .5-.4.8-1.1.8-1.9 0-1.4-.8-2.6-2.4-2.6s-2.4 1.2-2.4 2.6c0 .8.3 1.4.8 1.9.3.3.5.6.5 1s-.1.7-.9 1.1c-1.3.5-2.5 1.1-2.6 2.3 0 .7.6 1.4 1.3 1.4h6.6c.7 0 1.3-.7 1.3-1.4-.1-1.2-1.3-1.8-2.5-2.3z" } },
	  groups: { "path": { "d": "M8.8 12.6c-.4-.7-.6-1.4-.6-2.3 0-1.4.6-2.6 1.5-3.3-.3-.6-.9-1-1.8-1-1.4 0-2.1 1.1-2.1 2.4 0 .7.2 1.3.7 1.7.2.2.4.6.4.9 0 .3-.1.6-.9 1-1.1.5-2.1 1.1-2.2 2.2 0 .7.5 1.2 1.1 1.2H6c.1 0 .3-.1.4-.3.5-.9 1.4-1.5 2.2-1.9.3-.1.4-.4.2-.6zM18 12c-.8-.4-.9-.7-.9-1 0-.3.2-.7.4-.9.5-.4.7-1 .7-1.7 0-1.3-.7-2.4-2.1-2.4-.9 0-1.5.4-1.8 1 .9.7 1.5 1.9 1.5 3.3 0 .9-.2 1.6-.6 2.3-.2.2-.1.5.2.7.8.4 1.7.9 2.2 1.8.1.2.3.3.4.3h1.1c.6 0 1.1-.5 1.1-1.2-.1-1.1-1.1-1.7-2.2-2.2zm-3.9 2.3c-.9-.4-1-.7-1-1.1 0-.4.2-.7.5-1 .5-.4.8-1.1.8-1.9 0-1.4-.8-2.6-2.4-2.6s-2.4 1.2-2.4 2.6c0 .8.3 1.4.8 1.9.3.3.5.6.5 1s-.1.7-.9 1.1c-1.3.5-2.5 1.1-2.6 2.3 0 .7.6 1.4 1.3 1.4h6.6c.7 0 1.3-.7 1.3-1.4-.1-1.2-1.3-1.8-2.5-2.3z" } },
	  home: { "path": { "d": "M18.9 12.3h-1.5v6.6c0 .2-.1.3-.3.3h-3c-.2 0-.3-.1-.3-.3v-5.1h-3.6v5.1c0 .2-.1.3-.3.3h-3c-.2 0-.3-.1-.3-.3v-6.6H5.1c-.1 0-.3-.1-.3-.2s0-.2.1-.3l6.9-7c.1-.1.3-.1.4 0l7 7v.3s-.2.2-.3.2z" } },
	  household: { "path": { "d": "M12.4 4.9c-.3-.1-.6-.1-.8 0L5 11.1c-.4.3-.2.9.3.9h.9v5.8c0 .8.7 1.4 1.5 1.4h8.6c.8 0 1.5-.6 1.5-1.4V12h.9c.5 0 .7-.6.3-.9l-6.6-6.2zM8.9 15.3c-.1.1-.2.1-.3.1H8c-.3 0-.6-.2-.6-.6.1-.6.6-.9 1.3-1.1.4-.2.5-.4.5-.6 0-.2-.2-.4-.3-.5-.3-.2-.4-.6-.4-1 0-.7.5-1.3 1.2-1.3.5 0 .8.2 1 .5-.5.5-.9 1.1-.9 1.9 0 .5.2.9.4 1.3.1.1 0 .3-.1.3-.4.2-1 .5-1.2 1zm4.9 1.7h-3.6c-.4 0-.7-.3-.7-.8 0-.6.7-1 1.3-1.3.5-.2.6-.4.6-.6 0-.2-.1-.4-.3-.5-.3-.3-.4-.6-.4-1.1 0-.8.5-1.5 1.3-1.5s1.4.7 1.4 1.5c0 .5-.2.8-.5 1.1-.1.1-.3.3-.3.5s.1.4.6.6c.7.3 1.4.7 1.4 1.3-.1.5-.4.8-.8.8zm2.2-1.6h-.6c-.1 0-.2 0-.3-.1-.2-.5-.8-.7-1.2-.9-.1-.1-.2-.2-.1-.4.2-.3.4-.8.4-1.2 0-.8-.4-1.5-.9-1.9.2-.3.5-.6 1-.6.8 0 1.2.7 1.2 1.4 0 .4-.1.7-.4.9-.1.2-.2.4-.2.6s0 .3.5.5c.6.3 1.2.6 1.2 1.1 0 .4-.3.6-.6.6z" } },
	  insights: { "path": { "d": "M18.8 6.5H7.4c-.2 0-.4.1-.4.4v8.4c0 .3-.3.6-.6.6-.3-.1-.5-.3-.5-.6V9.2c0-.1-.1-.2-.3-.2h-.4c-.2 0-.4.1-.4.4v7c0 .6.5 1.1 1.1 1.1h12.2c.6 0 1.1-.5 1.1-1.1V6.9c0-.3-.2-.4-.4-.4zm-6.2 8c0 .2-.2.3-.3.3H9c-.2 0-.3-.1-.3-.3v-.6c0-.1.1-.2.3-.2h3.3c.1 0 .3.1.3.2v.6zm0-2.2c0 .2-.2.3-.3.3H9c-.2 0-.3-.1-.3-.3v-.6c0-.1.1-.3.3-.3h3.3c.1 0 .3.2.3.3v.6zm4.9 2.2c0 .2-.1.3-.2.3h-3.4c-.1 0-.2-.1-.2-.3v-.6c0-.1.1-.2.2-.2h3.4c.1 0 .2.1.2.2v.6zm0-2.2c0 .2-.1.3-.2.3h-3.4c-.1 0-.2-.1-.2-.3v-.6c0-.1.1-.3.2-.3h3.4c.1 0 .2.2.2.3v.6zm0-2.2c0 .1-.1.2-.2.2H9c-.2 0-.3-.1-.3-.2V8.4c0-.2.1-.3.3-.3h8.3c.1 0 .2.1.2.3v1.7z" } },
	  investment_account: { "path": { "d": "M17.8 6.5H6.2c-.8 0-1.4.6-1.4 1.4v8.2c0 .8.6 1.4 1.4 1.4h11.6c.8 0 1.4-.6 1.4-1.4V7.9c0-.8-.6-1.4-1.4-1.4zM16.6 13c0 .2-.3.3-.4.1L15 12l-2.5 2.2c-.3.3-.7.3-1 0L10 12.5l-2.8 2.4c-.1.1-.2.1-.3 0l-.1-.2c-.1-.1-.1-.2 0-.3l2.7-3.7c.2-.3.7-.3 1 0l1.5 1.6 1.6-1.8-1-.9c-.2-.2-.1-.5.1-.5h3.4c.2 0 .4.3.4.5V13z" } },
	  lead: { "circle": { "cx": "12", "cy": "6.96", "r": "2.16" }, "path": { "d": "M18.7 10.6H5.3c-.5 0-.7.6-.3.8l3.5 2.3c.2.1.3.3.2.5l-1.3 4.4c-.2.5.5.8.8.5l3.4-3.6c.2-.3.6-.3.8 0l3.4 3.6c.3.3.9 0 .8-.5l-1.3-4.4c-.1-.2 0-.4.2-.5l3.5-2.3c.4-.2.2-.8-.3-.8z" } },
	  link: { "path": { "d": "M12.4 16.7c-.3-.1-.4-.1-.7-.1-.2-.1-.4-.1-.6-.2-.1-.1-.3 0-.4.1l-.1.1c-.9.9-2.3 1-3.2.2-1-.9-1.1-2.4-.1-3.4l2.3-2.3c.2-.3.6-.5 1-.6.5-.1 1-.1 1.4.1.3.2.6.3.8.5.1.2.2.3.3.4.1.2.4.3.5.1l.9-.8c.1-.1.1-.3 0-.5-.1-.1-.3-.3-.4-.5-.2-.2-.5-.4-.7-.5-.5-.3-.9-.5-1.4-.6-1-.2-2 0-2.8.4-.4.2-.7.5-1 .7L6 12c-1.6 1.6-1.7 4.2-.2 5.8 1.6 1.8 4.3 1.8 6 .2l.7-.8c.3-.2.1-.5-.1-.5zm5.5-10.8c-1.7-1.5-4.2-1.4-5.8.2l-.7.6c-.2.2-.1.6.2.6.4 0 .9.1 1.3.3.1 0 .3 0 .3-.1l.2-.2c.9-.8 2.2-.9 3.2-.1 1 .9 1 2.4.1 3.3l-2.3 2.3c-.3.3-.6.5-1 .6-.5.1-1 .1-1.4-.1-.3-.1-.6-.3-.8-.5-.1-.1-.2-.2-.3-.4-.1-.2-.4-.2-.6 0l-.8.8c-.1.1-.1.3 0 .5.1.1.2.3.4.4.2.3.4.4.7.6.4.3.9.4 1.4.5.9.2 1.9.1 2.8-.4.3-.2.7-.4.9-.7l2.3-2.3c1.6-1.6 1.6-4.3-.1-5.9z" } },
	  log_a_call: { "path": { "d": "M16.7 4.8h-9c-.8 0-1.5.7-1.5 1.4v.5h-.4c-.6 0-1 .5-1 1s.4.9 1 .9h.4V11h-.4c-.6 0-1 .5-1 1s.4 1 1 1h.4v2.4h-.4c-.6 0-1 .4-1 .9s.4 1 1 1h.4v.5c0 .7.7 1.4 1.5 1.4h9c.8 0 1.5-.7 1.5-1.5V6.2c0-.8-.7-1.4-1.5-1.4zm-.8 9.7l-.7.6c-.2.2-.4.3-.6.3-1.5-.1-3-.9-4.1-1.9-1-1-1.8-2.5-1.8-4.1 0-.2 0-.4.2-.6l.7-.6c.3-.4.8-.3 1.1 0l.6.8c.2.3.2.6 0 .9l-.5.8c-.1.1-.1.2 0 .3l1.1 1.2 1.2 1.1c.1.1.2.1.3 0l.8-.5c.2-.2.6-.2.9 0l.8.6c.3.2.3.8 0 1.1z" } },
	  marketing_actions: { "path": { "d": "M11.4 6.2c-1.2.1-2.2 1.1-2.3 2.3.1-1.2 1.1-2.2 2.3-2.3zm2.5 2.3c-.1-1.2-1-2.2-2.3-2.3 1.3.1 2.3 1.1 2.3 2.3zm1.4 4.7l-2.5-.9c-.2-.1-.3-.2-.3-.4V8.6c0-.5-.4-.9-.9-.9h-.1c-.5 0-.9.4-.9.9V15c0 .6-.7.8-1 .3L9 14c-.4-.6-1.1-.7-1.7-.3L7 14l2 4.9c.1.2.3.3.6.3H15c.2 0 .5-.2.5-.4l1-3.5c.2-.9-.3-1.8-1.2-2.1zm-6.2-2.1V8.5c.1-1.2 1.1-2.2 2.3-2.3h.2c1.3.1 2.2 1.1 2.3 2.3v2.6c0 .2.3.3.4.2.7-.7 1.1-1.7 1.1-2.7 0-2.2-2-4-4.2-3.8C9.4 5 8 6.3 7.7 8c-.2 1.2.2 2.4 1 3.3.2.1.4 0 .4-.2z" } },
	  marketing_resources: { "path": { "d": "M9.4 10.6c.6 0 1.2-.6 1.2-1.2v.4c0 .4-.4.8-.8.8h-.4zm-2.9 0c-.4 0-.7-.4-.7-.8V6.5c0-.4.3-.7.7-.7h3.3c.4 0 .8.3.8.7V7c0-.7-.6-1.2-1.2-1.2H7c-.7 0-1.2.5-1.2 1.2v2.4c0 .6.5 1.2 1.2 1.2h-.5zM9.8 5H6.5C5.7 5 5 5.7 5 6.5v3.3c0 .8.7 1.5 1.5 1.5h3.3c.8 0 1.5-.7 1.5-1.5V6.5c0-.8-.7-1.5-1.5-1.5zM7 9.8c-.3 0-.5-.2-.5-.4V7c0-.3.2-.5.5-.5h2.4c.2 0 .4.2.4.5v2.4c0 .2-.2.4-.4.4H7zm2.4 8.4c.6 0 1.2-.5 1.2-1.2v.5c0 .4-.4.7-.8.7h-.4zm-2.9 0c-.4 0-.7-.3-.7-.7v-3.3c0-.4.3-.8.7-.8h3.3c.4 0 .8.4.8.8v.4c0-.6-.6-1.2-1.2-1.2H7c-.7 0-1.2.6-1.2 1.2V17c0 .7.5 1.2 1.2 1.2h-.5zm3.3-5.5H6.5c-.8 0-1.5.7-1.5 1.5v3.3c0 .8.7 1.5 1.5 1.5h3.3c.8 0 1.5-.7 1.5-1.5v-3.3c0-.8-.7-1.5-1.5-1.5zM7 17.5c-.3 0-.5-.2-.5-.5v-2.4c0-.2.2-.4.5-.4h2.4c.2 0 .4.2.4.4V17c0 .3-.2.5-.4.5H7zm10 .7c.7 0 1.2-.5 1.2-1.2v.5c0 .4-.3.7-.7.7H17zm-2.8 0c-.4 0-.8-.3-.8-.7v-3.3c0-.4.4-.8.8-.8h3.3c.4 0 .7.4.7.8v.4c0-.6-.5-1.2-1.2-1.2h-2.4c-.6 0-1.2.6-1.2 1.2V17c0 .7.6 1.2 1.2 1.2h-.4zm3.3-5.5h-3.3c-.8 0-1.5.7-1.5 1.5v3.3c0 .8.7 1.5 1.5 1.5h3.3c.8 0 1.5-.7 1.5-1.5v-3.3c0-.8-.7-1.5-1.5-1.5zm-2.9 4.8c-.2 0-.4-.2-.4-.5v-2.4c0-.2.2-.4.4-.4H17c.3 0 .5.2.5.4V17c0 .3-.2.5-.5.5h-2.4zm-.4-6.9c-.4 0-.8-.4-.8-.8V6.5c0-.4.4-.7.8-.7h3.3c.4 0 .7.3.7.7v3.3c0 .4-.3.8-.7.8h-3.3zm3.3-4.1v3.3h-3.3V6.5h3.3m0-1.5h-3.3c-.8 0-1.5.7-1.5 1.5v3.3c0 .8.7 1.5 1.5 1.5h3.3c.8 0 1.5-.7 1.5-1.5V6.5c0-.8-.7-1.5-1.5-1.5z" } },
	  metrics: { "path": { "d": "M17.3 5.3H6.7c-.8 0-1.4.6-1.4 1.4v10.6c0 .8.6 1.4 1.4 1.4h10.6c.8 0 1.4-.6 1.4-1.4V6.7c0-.8-.6-1.4-1.4-1.4zM9.1 15.8c0 .3-.2.5-.5.5h-.4c-.3 0-.5-.2-.5-.5v-2.6c0-.3.2-.5.5-.5h.4c.3 0 .5.2.5.5v2.6zm2.4 0c0 .3-.2.5-.5.5h-.4c-.3 0-.5-.2-.5-.5V9.6c0-.3.2-.5.5-.5h.4c.3 0 .5.2.5.5v6.2zm2.4 0c0 .3-.2.5-.5.5H13c-.3 0-.5-.2-.5-.5V8.2c0-.3.2-.5.5-.5h.4c.3 0 .5.2.5.5v7.6zm2.4 0c0 .3-.2.5-.5.5h-.4c-.3 0-.5-.2-.5-.5v-4.5c0-.3.2-.5.5-.5h.4c.3 0 .5.2.5.5v4.5z" } },
	  news: { "path": { "d": "M18.8 6.5H7.4c-.2 0-.4.1-.4.4v8.4c0 .3-.3.6-.6.6-.3-.1-.5-.3-.5-.6V9.2c0-.1-.1-.2-.3-.2h-.4c-.2 0-.4.1-.4.4v7c0 .6.5 1.1 1.1 1.1h12.2c.6 0 1.1-.5 1.1-1.1V6.9c0-.3-.2-.4-.4-.4zm-6.2 8c0 .2-.2.3-.3.3H9c-.2 0-.3-.1-.3-.3v-.6c0-.1.1-.2.3-.2h3.3c.1 0 .3.1.3.2v.6zm0-2.2c0 .2-.2.3-.3.3H9c-.2 0-.3-.1-.3-.3v-.6c0-.1.1-.3.3-.3h3.3c.1 0 .3.2.3.3v.6zm4.9 2.2c0 .2-.1.3-.2.3h-3.4c-.1 0-.2-.1-.2-.3v-.6c0-.1.1-.2.2-.2h3.4c.1 0 .2.1.2.2v.6zm0-2.2c0 .2-.1.3-.2.3h-3.4c-.1 0-.2-.1-.2-.3v-.6c0-.1.1-.3.2-.3h3.4c.1 0 .2.2.2.3v.6zm0-2.2c0 .1-.1.2-.2.2H9c-.2 0-.3-.1-.3-.2V8.4c0-.2.1-.3.3-.3h8.3c.1 0 .2.1.2.3v1.7z" } },
	  note: { "path": { "d": "M17.1 16.1l-.3.2c-.2.3-.6.5-1.1.5H15c-.8 0-1.6-.6-1.6-1.6v-.7c0-.6.3-1 .5-1.2l3.2-3.2c.1-.1.2-.3.2-.4V7.2c0-.8-.7-1.4-1.5-1.4H8.2c-.8 0-1.5.7-1.5 1.4h-.5c-.5 0-.9.4-.9 1s.4.9.9.9h.5V11h-.5c-.5 0-.9.5-.9 1s.4 1 .9 1h.5v1.9h-.5c-.5 0-.9.4-.9.9s.4 1 .9 1h.5c0 1 .7 1.4 1.5 1.4h7.6c.8 0 1.5-.6 1.5-1.4v-.6c0-.2-.1-.2-.2-.1zm-2.5-6.7c0 .2-.2.4-.4.4H9.4c-.3 0-.5-.2-.5-.4v-.5c0-.3.2-.5.5-.5h4.8c.2 0 .4.2.4.5v.5zm-2.1 5.7c0 .3-.2.5-.5.5H9.4c-.3 0-.5-.2-.5-.5v-.5c0-.2.2-.4.5-.4H12c.3 0 .5.2.5.4v.5zm.7-2.9c0 .3-.2.5-.5.5H9.4c-.3 0-.5-.2-.5-.5v-.4c0-.3.2-.5.5-.5h3.3c.3 0 .5.2.5.5v.4zm6.3-1.3l-.3-.2c-.1-.2-.4-.2-.6 0l-3.7 3.7v.8c0 .1 0 .2.1.2h.7c.1 0 .1-.1.1-.1l3.7-3.7c.2-.2.2-.5 0-.7z" } },
	  opportunity: { "path": { "d": "M17.1 16.6H6.9c-.2 0-.4.2-.4.4 0 .8.6 1.5 1.4 1.5h8.2c.8 0 1.4-.7 1.4-1.5 0-.2-.2-.4-.4-.4zm1.1-9.9c-.8 0-1.4.7-1.4 1.5 0 .4.2.8.5 1.1-.4.9-1.3 1.5-2.4 1.5-1.3-.1-2.3-1.1-2.4-2.4v-.6c.6-.2.9-.7.9-1.3 0-.8-.6-1.5-1.4-1.5s-1.4.7-1.4 1.5c0 .6.3 1.1.9 1.3v.6c-.1 1.3-1.1 2.3-2.4 2.4-1.1.1-2-.6-2.4-1.5.3-.3.5-.7.5-1.1 0-.8-.6-1.5-1.4-1.5s-1.5.7-1.5 1.5.7 1.4 1.5 1.4l.6 5.1c.1.3.2.4.5.4h10.2c.2 0 .4-.1.5-.4l.6-5.1c.8 0 1.5-.6 1.5-1.4s-.7-1.5-1.5-1.5z" } },
	  orders: { "path": { "d": "M18.9 14.9l-.9-.4c-.1-.1-.2-.1-.4 0l-5.1 2.4c-.3.2-.7.2-1 0l-5.1-2.4c-.2-.1-.3-.1-.4 0l-.9.4c-.4.2-.4.7 0 .9l6.4 3c.3.2.7.2 1 0l6.4-3c.4-.2.4-.7 0-.9zm0-3.4l-.9-.4h-.4l-5.1 2.5c-.3.1-.7.1-1 0l-5.1-2.5H6l-.9.4c-.4.2-.4.7 0 .9l6.4 3.1c.3.1.7.1 1 0l6.4-3c.4-.2.4-.8 0-1zM5.1 9.1l6.4 3c.3.2.7.2 1 0l6.4-3c.4-.2.4-.7 0-.9l-6.4-3.1c-.3-.1-.7-.1-1 0L5.1 8.2c-.4.2-.4.7 0 .9z" } },
	  people: { "path": { "d": "M19.2 17.1v.7c0 .8-.6 1.4-1.4 1.4H6.2c-.8 0-1.4-.6-1.4-1.4v-.7c0-1.8 2-2.8 4-3.7 0 0 .1 0 .2-.1.1 0 .3 0 .4.1.8.5 1.7.8 2.6.8.9 0 1.8-.3 2.6-.8.1-.1.3-.1.4 0 .1 0 .2 0 .2.1 2 .8 4 1.8 4 3.6z" }, "ellipse": { "cx": "12", "cy": "8.76", "rx": "3.576", "ry": "3.96" } },
	  performance: { "path": { "d": "M7.2 4.8h-.5c-.8 0-1.4.7-1.4 1.4v11.6c0 .7.6 1.4 1.4 1.4h.5c.3 0 .5-.2.5-.5V5.3c0-.3-.2-.5-.5-.5zm10.1 0H9.6c-.3 0-.5.2-.5.5v13.4c0 .3.2.5.5.5h7.7c.8 0 1.4-.6 1.4-1.4V6.2c0-.8-.6-1.4-1.4-1.4zm-.5 6.4l-1.3 1.3v.1l.2 1.8c.1.2-.1.3-.2.2l-1.5-.8c-.1-.1-.1-.1-.2 0l-1.5.8c-.2.1-.3 0-.3-.2l.3-1.8v-.1L11 11.2c-.1-.1 0-.2.1-.2l1.7-.3c.1 0 .1 0 .2-.1l.7-1.6c.1-.2.2-.2.3 0l.8 1.6c0 .1 0 .1.1.1l1.7.3c.2 0 .2.1.2.2z" } },
	  person_account: { "path": [{ "d": "M16.7 14.2c-.9-.4-1-.7-1-1.1 0-.4.2-.7.5-1 .5-.4.8-1.1.8-1.8 0-1.4-.9-2.6-2.5-2.6s-2.4 1.2-2.4 2.6c0 .7.3 1.4.8 1.8.3.3.5.6.5 1s-.1.7-1 1.1c-1.3.5-2.5 1.2-2.5 2.3 0 .8.6 1.5 1.3 1.5h6.7c.7 0 1.3-.7 1.3-1.5 0-1.1-1.2-1.8-2.5-2.3zm-5.8 1.1" }, { "d": "M11.2 12.3c-.1-.1-.6-.7-.5-2.3 0-1.6.7-2 .7-2V6.5c0-.3-.3-.5-.5-.5H5.3s-.5.2-.5.5v10.4H8c.1-2.6 3.2-3.7 3.2-3.7.4-.2.1-.7 0-.9zm-3.8 3.3c0 .3-.2.5-.5.5h-.5c-.3 0-.5-.2-.5-.5v-.5c0-.2.2-.4.5-.4h.5c.3 0 .5.2.5.4v.5zm0-2.4c0 .3-.2.5-.5.5h-.5c-.3 0-.5-.2-.5-.5v-.4c0-.3.2-.5.5-.5h.5c.3 0 .5.2.5.5v.4zm0-2.3c0 .2-.2.5-.5.5h-.5c-.3 0-.5-.3-.5-.5v-.5c0-.3.2-.5.5-.5h.5c.3 0 .5.2.5.5v.5zm0-2.4c0 .3-.2.5-.5.5h-.5c-.3 0-.5-.2-.5-.5V8c0-.2.2-.5.5-.5h.5c.3 0 .5.3.5.5v.5zm2.7 4.7c0 .3-.3.5-.5.5h-.5c-.3 0-.5-.2-.5-.5v-.4c0-.3.2-.5.5-.5h.5c.2 0 .5.2.5.5v.4zm0-2.3c0 .2-.3.5-.5.5h-.5c-.3 0-.5-.3-.5-.5v-.5c0-.3.2-.5.5-.5h.5c.2 0 .5.2.5.5v.5zm0-2.4c0 .3-.3.5-.5.5h-.5c-.3 0-.5-.2-.5-.5V8c0-.2.2-.5.5-.5h.5c.2 0 .5.3.5.5v.5z" }] },
	  photo: { "path": { "d": "M8.6 7.4h6.8c.2 0 .3-.2.2-.3l-.8-1.2c-.3-.5-.8-.8-1.3-.8h-3c-.5 0-1 .3-1.3.8l-.8 1.2c-.1.1 0 .3.2.3zm3.4 4.4c-1.1 0-1.9.8-1.9 1.9s.8 1.9 1.9 1.9 1.9-.9 1.9-1.9-.8-1.9-1.9-1.9zm5.8-2.9H6.2c-.8 0-1.4.6-1.4 1.4V17c0 .8.6 1.5 1.4 1.5h11.6c.8 0 1.4-.7 1.4-1.5v-6.7c0-.8-.6-1.4-1.4-1.4zM12 17c-1.8 0-3.4-1.5-3.4-3.3s1.6-3.4 3.4-3.4 3.4 1.5 3.4 3.4S13.8 17 12 17z" } },
	  poll: { "path": { "d": "M18.2 4.8H5.8c-.6 0-1 .4-1 1v1.9c0 .5.4.9 1 .9h12.4c.6 0 1-.4 1-.9V5.8c0-.6-.4-1-1-1zm-6 2.9V5.8h6v1.9h-6zm6 2.4H5.8c-.6 0-1 .4-1 .9v2c0 .5.4.9 1 .9h12.4c.6 0 1-.4 1-.9v-2c0-.5-.4-.9-1-.9zM10.1 13v-2h8.1v2h-8.1zm8.1 2.4H5.8c-.6 0-1 .4-1 .9v1.9c0 .6.4 1 1 1h12.4c.6 0 1-.4 1-1v-1.9c0-.5-.4-.9-1-.9zm-3.8 2.8v-1.9h3.8v1.9h-3.8z" } },
	  portal: { "path": { "d": "M17.3 5.3H6.7c-.8 0-1.4.6-1.4 1.4v10.6c0 .8.6 1.4 1.4 1.4h10.6c.8 0 1.4-.6 1.4-1.4V6.7c0-.8-.6-1.4-1.4-1.4zM14.2 15c0 .3-.2.6-.5.6h-3.4c-.3 0-.5-.3-.4-.6l.7-2.6c-.7-.5-1.1-1.5-1-2.5.2-1 1-1.7 1.9-1.9 1.6-.3 2.9.9 2.9 2.4 0 .8-.4 1.5-1 2l.8 2.6z" } },
	  post: { "path": { "d": "M11.8 5.2c-4 0-7.2 3-7.2 6.7 0 1.2.3 2.3.9 3.3.1.1.1.3.1.4l-.7 2.1c-.1.4.2.8.6.6l2.1-.7c.2-.1.3 0 .4 0 1.1.7 2.4 1 3.8 1 4 0 7.2-3 7.2-6.7s-3.2-6.7-7.2-6.7z" } },
	  pricebook: { "path": { "d": "M17.2 4.8h-9c-.8 0-1.5.7-1.5 1.4v.5h-.5c-.5 0-.9.5-.9 1s.4.9.9.9h.5V11h-.5c-.5 0-.9.5-.9 1s.4 1 .9 1h.5v2.4h-.5c-.5 0-.9.4-.9.9s.4 1 .9 1h.5v.4c0 .7.7 1.5 1.5 1.5h9c.8 0 1.5-.8 1.5-1.6V6.1c0-.8-.7-1.3-1.5-1.3zm-6.9 9.8c0 .2-.1.3-.2.3h-1c-.1 0-.2-.1-.2-.3V9.4c0-.2.1-.3.2-.3h1c.1 0 .2.1.2.3v5.2zm1.9 0c0 .2-.1.3-.2.3h-.5c-.1 0-.2-.1-.2-.3V9.4c0-.2.1-.3.2-.3h.5c.1 0 .2.1.2.3v5.2zm2.4 0c0 .2-.1.3-.2.3h-1c-.1 0-.2-.1-.2-.3V9.4c0-.2.1-.3.2-.3h1c.1 0 .2.1.2.3v5.2zm2 0c0 .2-.1.3-.3.3h-.5c-.1 0-.2-.1-.2-.3V9.4c0-.2.1-.3.2-.3h.5c.2 0 .3.1.3.3v5.2z" } },
	  process: { "path": { "d": "M9 11.1l2.6-3.2c.2-.2.6-.2.8 0l2.6 3.2c0 .1.2.2.3.2h2.9c.3 0 .5-.2.5-.5V6.7c0-.8-.6-1.4-1.4-1.4H6.7c-.8 0-1.4.6-1.4 1.4v4.1c0 .3.2.5.5.5h2.8c.2 0 .3-.1.4-.2zm6 1.8l-2.6 3.2c-.2.2-.6.2-.8 0L9 12.9c-.1-.1-.2-.2-.4-.2H5.8c-.3 0-.5.2-.5.5v4.1c0 .8.6 1.4 1.4 1.4h10.6c.8 0 1.4-.6 1.4-1.4v-4.1c0-.3-.2-.5-.5-.5h-2.9c-.1 0-.3.1-.3.2z" } },
	  product: { "path": { "d": "M5.3 15.8h1.2c.2 0 .5-.2.5-.4V7.9c0-.2-.3-.5-.5-.5H5.3c-.3 0-.5.3-.5.5v7.5c0 .2.2.4.5.4zm13.4-8.4h-1.2c-.2 0-.5.3-.5.5v7.5c0 .2.3.4.5.4h1.2c.3 0 .5-.2.5-.4V7.9c0-.2-.2-.5-.5-.5zm-6 8.4c.3 0 .5-.2.5-.4V7.9c0-.2-.2-.5-.5-.5h-1.4c-.3 0-.5.3-.5.5v7.5c0 .2.2.4.5.4h1.4zm2.9 0c.3 0 .5-.2.5-.4V7.9c0-.2-.2-.5-.5-.5h-.5c-.2 0-.5.3-.5.5v7.5c0 .2.3.4.5.4h.5zm-6.2 0c.2 0 .4-.2.4-.4V7.9c0-.2-.2-.5-.4-.5h-.5c-.3 0-.5.3-.5.5v7.5c0 .2.2.4.5.4h.5zm9.3 1.5H5.3c-.3 0-.5.2-.5.5v.4c0 .3.2.5.5.5h13.4c.3 0 .5-.2.5-.5v-.4c0-.3-.2-.5-.5-.5zm0-12.5H5.3c-.3 0-.5.2-.5.5v.5c0 .2.2.4.5.4h13.4c.3 0 .5-.2.5-.4v-.5c0-.3-.2-.5-.5-.5z" } },
	  question_best: { "title": {}, "g": { "path": [{ "d": "M24 24v-9.1L14.9 24H24zm-.9-3.5l-.8.8v.1l.2 1.1s-.1.1-.2.1l-.9-.5c0-.1 0-.1 0 0l-1 .5c-.1 0-.1-.1-.1-.1l.1-1.1v-.1l-.7-.8c-.1 0 0-.1 0-.1l1.1-.2.5-1c0-.1.1-.1.2 0l.4 1h.1l1 .2c.1 0 .1.1.1.1z", "fill-opacity": ".65" }, { "d": "M12 5.3c-4 0-7.2 3-7.2 6.7 0 1.2.3 2.3.9 3.3.1.1.1.3 0 .4l-.6 2.1c-.2.4.2.7.6.6l2.1-.7c.1-.1.3-.1.4 0 1.1.7 2.4 1 3.8 1 4 0 7.2-3 7.2-6.7S16 5.3 12 5.3zm.7 10.8c0 .2-.2.5-.5.5h-.5c-.2 0-.4-.3-.4-.5v-.5c0-.3.2-.5.4-.5h.5c.3 0 .5.2.5.5v.5zm.2-3.1c-.1.1-.2.2-.2.3v.4c0 .2-.2.5-.5.5h-.4c-.3 0-.5-.3-.5-.5v-.4c0-.7.5-1.4 1.2-1.6.2-.1.5-.3.6-.5.8-1 0-2.3-1.1-2.3-.4 0-.7.1-1 .4-.2.2-.4.4-.4.7-.1.2-.3.3-.5.3h-.5c-.3 0-.5-.2-.5-.5.2-.6.4-1.1.9-1.5.5-.6 1.3-.9 2-.9 1.6.1 2.8 1.3 2.9 2.8 0 1.3-.8 2.4-2 2.8z" }] } },
	  question_feed: { "path": { "d": "M12 5.3c-4 0-7.2 3-7.2 6.7 0 1.2.3 2.3.9 3.3.1.1.1.3.1.4l-.7 2.1c-.1.4.2.7.6.6l2.1-.7c.2-.1.3-.1.4 0 1.1.7 2.4 1 3.8 1 4 0 7.2-3 7.2-6.7S16 5.3 12 5.3zm.7 10.8c0 .2-.2.5-.5.5h-.4c-.3 0-.5-.3-.5-.5v-.5c0-.3.2-.5.5-.5h.4c.3 0 .5.2.5.5v.5zm.2-3.1c-.1.1-.2.2-.2.3v.4c0 .2-.2.5-.5.5h-.4c-.3 0-.5-.3-.5-.5v-.4c0-.7.5-1.4 1.2-1.6.2-.1.5-.3.6-.5.8-1 0-2.3-1.1-2.3-.4 0-.7.1-1 .4-.2.2-.4.4-.4.7-.1.2-.3.3-.5.3h-.5c-.3 0-.5-.2-.5-.5.2-.6.4-1.1.9-1.5.5-.6 1.3-.9 2-.9 1.6.1 2.8 1.3 2.9 2.8 0 1.3-.8 2.4-2 2.8z" } },
	  quotes: { "path": { "d": "M17.3 5.3H12c-.3 0-.6.1-.8.4l-6.5 6.4c-.5.6-.5 1.5 0 2.1l5.1 5c.6.6 1.5.6 2.1 0l6.5-6.5c.2-.2.3-.6.3-.9V6.7c0-.8-.6-1.4-1.4-1.4zm-5.2 10.5l-.3.4c-.2.2-.5.2-.7 0l-3.3-3.3c-.2-.2-.2-.5 0-.7l.4-.3c.2-.2.4-.2.6 0l3.3 3.3c.2.2.2.4 0 .6zm1.9-1.9l-.3.4c-.2.1-.5.1-.7 0L9.7 11c-.1-.2-.1-.5 0-.7l.4-.3c.2-.2.5-.2.7 0l3.2 3.2c.2.2.2.5 0 .7zm1.4-4.1c-.7 0-1.2-.5-1.2-1.2s.5-1.2 1.2-1.2 1.2.6 1.2 1.2-.6 1.2-1.2 1.2z" } },
	  recent: { "path": { "d": "M6.7 11.5v.5H5.3v-.5h1.4zm5.7-2.9h-.8c-.2 0-.3.2-.3.4v3.1c0 .1 0 .2.1.3l2 2c.1.2.4.2.5 0l.5-.5c.1-.1.1-.3 0-.5l-1.7-1.7V9c0-.2-.1-.4-.3-.4zM12 5.3c-3.6 0-6.5 2.7-6.7 6.2v.3H4.2c-.3 0-.5.3-.3.5l1.8 2.2c.2.2.4.2.6 0l1.8-2.2c.2-.2 0-.5-.3-.5H6.7v-.3C7 8.8 9.2 6.7 12 6.7c3.1 0 5.6 2.7 5.2 5.9-.2 2.3-2.4 4.4-4.7 4.7-1.7.1-3.3-.5-4.4-1.7-.2-.2-.3-.3-.5 0l-.6.6c-.1.2 0 .3.1.4 1.3 1.4 3.1 2.1 5 2.1 3.4 0 6.3-2.8 6.6-6.2.3-3.9-2.8-7.2-6.7-7.2z" } },
	  record: { "path": { "d": "M9.4 7.7h5.2c.3 0 .5-.2.5-.5v-1c0-.8-.6-1.4-1.4-1.4h-3.4c-.8 0-1.4.6-1.4 1.4v1c0 .3.2.5.5.5zM17.3 6h-.5c-.1 0-.2.1-.2.2v1c0 1.1-.9 1.9-2 1.9H9.4c-1.1 0-2-.8-2-1.9v-1c0-.1-.1-.2-.2-.2h-.5c-.8 0-1.4.6-1.4 1.4v10.4c0 .8.6 1.4 1.4 1.4h10.6c.8 0 1.4-.6 1.4-1.4V7.4c0-.8-.6-1.4-1.4-1.4zM9.4 16.3c0 .3-.3.5-.5.5h-.5c-.3 0-.5-.2-.5-.5v-.5c0-.2.2-.4.5-.4h.5c.2 0 .5.2.5.4v.5zm0-2.4c0 .3-.3.5-.5.5h-.5c-.3 0-.5-.2-.5-.5v-.5c0-.2.2-.4.5-.4h.5c.2 0 .5.2.5.4v.5zm0-2.4c0 .3-.3.5-.5.5h-.5c-.3 0-.5-.2-.5-.5V11c0-.2.2-.4.5-.4h.5c.2 0 .5.2.5.4v.5zm6.7 4.8c0 .3-.2.5-.5.5h-4.8c-.3 0-.5-.2-.5-.5v-.5c0-.2.2-.4.5-.4h4.8c.3 0 .5.2.5.4v.5zm0-2.4c0 .3-.2.5-.5.5h-4.8c-.3 0-.5-.2-.5-.5v-.5c0-.2.2-.4.5-.4h4.8c.3 0 .5.2.5.4v.5zm0-2.4c0 .3-.2.5-.5.5h-4.8c-.3 0-.5-.2-.5-.5V11c0-.2.2-.4.5-.4h4.8c.3 0 .5.2.5.4v.5z" } },
	  related_list: { "path": { "d": "M17.8 4.8h-7.7c-.8 0-1.5.6-1.5 1.4v.3c0 .1.1.2.3.2h6.9c.8 0 1.5.7 1.5 1.5v7.4c0 .1.1.2.2.2.9 0 1.7-.7 1.7-1.6v-8c0-.8-.6-1.4-1.4-1.4zM6.7 8.2c-.8 0-1.4.6-1.4 1.4v8.2c0 .8.6 1.4 1.4 1.4h7.7c.8 0 1.4-.6 1.4-1.4V9.6c0-.8-.6-1.4-1.4-1.4H6.7zm1.9 3.3c0 .3-.2.5-.4.5h-.5c-.3 0-.5-.2-.5-.5V11c0-.2.2-.4.5-.4h.5c.2 0 .4.2.4.4v.5zm5.3 0c0 .3-.2.5-.5.5h-3.3c-.3 0-.5-.2-.5-.5V11c0-.2.2-.4.5-.4h3.3c.3 0 .5.2.5.4v.5zm-5.3 2.4c0 .3-.2.5-.4.5h-.5c-.3 0-.5-.2-.5-.5v-.5c0-.2.2-.4.5-.4h.5c.2 0 .4.2.4.4v.5zm5.3 0c0 .3-.2.5-.5.5h-3.3c-.3 0-.5-.2-.5-.5v-.5c0-.2.2-.4.5-.4h3.3c.3 0 .5.2.5.4v.5zm-5.3 2.4c0 .3-.2.5-.4.5h-.5c-.3 0-.5-.2-.5-.5v-.5c0-.2.2-.4.5-.4h.5c.2 0 .4.2.4.4v.5zm5.3 0c0 .3-.2.5-.5.5h-3.3c-.3 0-.5-.2-.5-.5v-.5c0-.2.2-.4.5-.4h3.3c.3 0 .5.2.5.4v.5z" } },
	  report: { "path": { "d": "M9.4 7.7h5.2c.3 0 .5-.2.5-.5v-1c0-.8-.6-1.4-1.4-1.4h-3.4c-.8 0-1.4.6-1.4 1.4v1c0 .3.2.5.5.5zM17.3 6h-.5c-.1 0-.2.1-.2.2v1c0 1.1-.9 1.9-2 1.9H9.4c-1.1 0-2-.8-2-1.9v-1c0-.1-.1-.2-.2-.2h-.5c-.8 0-1.4.6-1.4 1.4v10.4c0 .8.6 1.4 1.4 1.4h10.6c.8 0 1.4-.6 1.4-1.4V7.4c0-.8-.6-1.4-1.4-1.4zm-7 9.8c0 .3-.2.5-.5.5h-.4c-.3 0-.5-.2-.5-.5v-2.4c0-.2.2-.4.5-.4h.4c.3 0 .5.2.5.4v2.4zm2.4 0c0 .3-.2.5-.5.5h-.4c-.3 0-.5-.2-.5-.5v-4.5c0-.3.2-.5.5-.5h.4c.3 0 .5.2.5.5v4.5zm2.4 0c0 .3-.2.5-.5.5h-.4c-.3 0-.5-.2-.5-.5v-3.6c0-.2.2-.4.5-.4h.4c.3 0 .5.2.5.4v3.6z" } },
	  reward: { "path": { "d": "M11.2 15.2l-2.8 4-.7-1.9H5.8l2.4-3.4c.5.3 1 .4 1.4.5h.3s.2.1.2.2c.3.2.7.5 1.1.6zm4.6-1.3c-.5.3-1 .4-1.4.5h-.3c-.1 0-.2.1-.3.2-.2.2-.6.5-1 .6l2.8 4 .7-1.9h1.9l-2.4-3.4zM12 7.7c-.9 0-1.7.7-1.7 1.7S11.1 11 12 11s1.7-.7 1.7-1.6-.8-1.7-1.7-1.7zm4.6 1.7c0 .5-.7 1-.9 1.5-.2.5-.1 1.3-.5 1.7-.4.4-1.1.3-1.7.5-.5.2-.9.8-1.5.8s-1-.6-1.5-.8c-.6-.2-1.3-.1-1.7-.5-.4-.4-.3-1.2-.5-1.7s-.9-1-.9-1.5c0-.6.7-1.1.9-1.6.2-.5.1-1.3.5-1.7.4-.3 1.1-.2 1.7-.5.5-.2.9-.8 1.5-.8s1 .6 1.5.8c.6.3 1.3.1 1.7.5.4.4.3 1.2.5 1.7s.9 1 .9 1.6zm-1.5 0c0-1.8-1.4-3.2-3.1-3.2S8.9 7.6 8.9 9.4s1.4 3.1 3.1 3.1 3.1-1.4 3.1-3.1z" } },
	  scan_card: { "path": { "d": "M17.8 7.2H6.2c-.8 0-1.4.6-1.4 1.4v6.8c0 .8.6 1.4 1.4 1.4h11.6c.8 0 1.4-.6 1.4-1.4V8.6c0-.8-.6-1.4-1.4-1.4zM6 12.7c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7zm11.3 2.2c0 .2-.2.5-.5.5H7.7c-.3 0-.5-.3-.5-.5V9.1c0-.2.2-.5.5-.5h9.1c.3 0 .5.3.5.5v5.8zm-1.9-4.8H9.1c-.2 0-.5.2-.5.5v2.8c0 .3.3.5.5.5h6.3c.2 0 .4-.2.4-.5v-2.8c0-.3-.2-.5-.4-.5z" } },
	  skill_entity: { "path": { "d": "M18.6 13.4l-1.8-2.6v-.2c0-3.2-2.6-5.8-5.8-5.8-.4 0-.9 0-1.3.2-2.6.5-4.4 2.9-4.4 5.6 0 1.1.3 2.2.8 3 1.1 1.4 1.7 2.6 1.3 4.2-.1.3 0 .7.2 1 .2.3.6.4.9.4h4.7c.6 0 1.1-.4 1.2-.9V18c.1-.3.3-.5.6-.5h.3c.6 0 1-.3 1.2-.8.1-.5.3-1.3.3-2.3h1.3c.2 0 .4-.2.5-.4.1-.2.1-.5 0-.6zm-3.9-3.3c-.2.3-.5.5-1.1.5-2.9 0-3.2 2.1-3.2 3.2 0 .4-.3.8-.8.8h-.1c-.4 0-.7-.2-.8-.7-.1-.4-.4-.6-.7-.8-.2-.2-.4-.3-.5-.5-.3-.6-.5-1.2-.5-2.1C7 8.7 8.3 7 10 6.6c.4 0 .7-.1 1-.1 1.6 0 3.1 1 3.7 2.5.1 0 .3.6 0 1.1z" } },
	  social: { "path": { "d": "M16.8 13.7c-1.2 0-2.1.8-2.4 1.9h-3.1c-.2 0-.3.1-.3.3V16.8c-.1.1.1.2.2.2h3.4c.4.9 1.2 1.5 2.2 1.5 1.3 0 2.4-1.1 2.4-2.4s-1.1-2.4-2.4-2.4zm-6.4-2.8c-.3-.1-.6-.3-.8-.5-.1-.1-.3 0-.4.1l-1.7 3.2h-.3c-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4 2.4-1.1 2.4-2.4c0-.7-.3-1.3-.7-1.8l1.6-3c.1-.2 0-.3-.1-.4zM12 9.8c.2 0 .5 0 .7-.1l1.6 3.1c.1.1.2.2.4.1.2-.2.5-.3.8-.4.1-.1.2-.2.1-.4l-1.7-3.2c.3-.4.5-.9.5-1.5C14.4 6.1 13.3 5 12 5S9.6 6.1 9.6 7.4s1.1 2.4 2.4 2.4z" } },
	  solution: { "path": { "d": "M11.4 4.8C9.1 5.1 7.2 6.9 7 9.2c-.2 1.7.6 3.3 1.8 4.2.3.3.6.8.6 1.2 0 .7.5 1.3 1.2 1.3h2.8c.7 0 1.2-.6 1.2-1.3 0-.4.3-.9.6-1.2 1.1-.9 1.8-2.2 1.8-3.7 0-2.9-2.5-5.2-5.6-4.9zm2.8 12.5H9.8c-.2 0-.4.2-.4.5 0 .8.6 1.4 1.4 1.4h2.4c.8 0 1.4-.6 1.4-1.4 0-.3-.2-.5-.4-.5z" } },
	  sossession: { "path": { "d": "M11.9 4.3c-4.2.1-7.6 3.6-7.6 7.8.1 4.2 3.6 7.6 7.8 7.6 4.2-.1 7.6-3.6 7.6-7.8-.1-4.2-3.6-7.6-7.8-7.6zm0 1c1.2 0 2.2.3 3.2.8L14 7.8c-.6-.3-1.3-.5-2-.5s-1.4.2-2 .5L8.9 6.1c.9-.5 1.9-.8 3-.8zM7.8 14l-1.7 1.1c-.5-.9-.8-1.9-.8-3 0-1.2.3-2.3.8-3.2l1.7 1c-.3.7-.5 1.4-.5 2.1s.2 1.4.5 2zm4.3 4.7c-1.2 0-2.2-.3-3.2-.8l1.1-1.7c.6.3 1.3.5 2 .5s1.4-.2 2-.5l1.1 1.7c-.9.5-1.9.8-3 .8zm-.1-3c-2 0-3.7-1.7-3.7-3.7S10 8.3 12 8.3s3.7 1.7 3.7 3.7-1.7 3.7-3.7 3.7zm4.2-1.7c.3-.6.5-1.3.5-2s-.2-1.4-.5-2l1.7-1.1c.5.9.8 1.9.8 3 0 1.2-.3 2.3-.8 3.2L16.2 14z" } },
	  task: { "path": { "d": "M11.2 5.7l-.5-.5c-.2-.2-.4-.2-.5 0L7 8.4 5.7 7.1c-.1-.2-.3-.2-.5 0l-.5.5c-.1.1-.1.3 0 .5l1.8 1.8c.1.1.3.2.5.2s.4-.1.5-.2l3.7-3.7c.1-.1.1-.4 0-.5zm7.3 3.4h-6.3c-.2 0-.4-.2-.4-.5v-.9c0-.3.2-.5.4-.5h6.3c.2 0 .5.2.5.5v.9c0 .3-.3.5-.5.5zm0 4.3h-7.7c-.3 0-.5-.2-.5-.4v-1c0-.3.2-.5.5-.5h7.7c.2 0 .5.2.5.5v1c0 .2-.3.4-.5.4zm-10.6 0H7c-.3 0-.5-.2-.5-.4v-1c0-.3.2-.5.5-.5h.9c.3 0 .5.2.5.5v1c0 .2-.2.4-.5.4zm0 4.4H7c-.3 0-.5-.3-.5-.5v-1c0-.2.2-.5.5-.5h.9c.3 0 .5.3.5.5v1c0 .2-.2.5-.5.5zm10.6 0h-7.7c-.3 0-.5-.3-.5-.5v-1c0-.2.2-.5.5-.5h7.7c.2 0 .5.3.5.5v1c0 .2-.3.5-.5.5z" } },
	  task2: { "path": { "d": "M10.2 17c-.3 0-.6-.1-.8-.3l-4.5-4.5c-.1-.2-.1-.5 0-.7l.9-.8c.2-.2.5-.2.7 0l3.7 3.7 7.3-7.3c.2-.2.5-.2.7 0l.9.9c.1.2.1.4 0 .6L11 16.7c-.2.2-.5.3-.8.3z" } },
	  team_member: { "path": [{ "d": "M13.7 10.6h-2.9c-.8 0-1.4.6-1.4 1.4v2.2c0 .2.1.5.2.6.2.2.5.3.7.3v2.2c0 .8.7 1.4 1.5 1.4h.9c.8 0 1.5-.6 1.5-1.4v-2.2c.2 0 .5-.1.6-.3.2-.1.3-.4.3-.6V12c0-.8-.6-1.4-1.4-1.4z" }, { "d": "M8.8 16c-.1 0-.1-.1-.2-.1-.4-.5-.7-1.1-.7-1.7V12c0-.8.3-1.5.8-2 .2-.1 0-.4-.2-.4H6.2c-.8 0-1.4.6-1.4 1.4v2.2c0 .3.1.5.3.7.2.1.4.3.7.3v2.1c0 .8.6 1.5 1.4 1.5h1c.2 0 .4-.1.5-.2.1 0 .2-.1.2-.2v-1.2c0-.1 0-.1-.1-.2z" }, { "d": "M18.2 9.6h-2.3c-.2 0-.3.2-.1.4.5.5.8 1.2.8 2v2.2c0 .6-.3 1.2-.7 1.7-.1 0-.1.1-.2.1-.1.1-.1.1-.1.2v1.2c0 .1 0 .2.1.2.2.1.4.2.6.2h1c.8 0 1.4-.7 1.4-1.5v-2.1c.3 0 .5-.1.7-.3.2-.2.3-.4.3-.7V11c0-.8-.7-1.4-1.5-1.4z" }], "circle": [{ "cx": "12.24", "cy": "7.92", "r": "1.68" }, { "cx": "7.68", "cy": "6.96", "r": "1.68" }, { "cx": "16.8", "cy": "6.96", "r": "1.68" }] },
	  thanks: { "path": { "d": "M17.8 8.4h-2.1c.6-.9.5-2.2-.2-3-.4-.4-1-.6-1.6-.6-.6 0-1.2.3-1.7.8-.1.1-.1.2-.2.3-.1-.1-.1-.2-.2-.3-.5-.5-1.1-.8-1.7-.8-.6 0-1.1.2-1.6.6-.7.8-.7 2.1-.1 3H6.2c-.8 0-1.4.6-1.4 1.4v1c0 .3.2.5.5.5h13.4c.3 0 .5-.2.5-.5v-1c0-.8-.6-1.4-1.4-1.4zm-6.5 0c-.5 0-1.2-.2-1.7-.6-.3-.4-.4-1 0-1.3.1-.2.3-.2.5-.2s.4.1.6.3c.4.4.6 1.2.6 1.7v.1zm3.1-.6c-.5.4-1.2.6-1.7.6v-.1c0-.5.2-1.3.6-1.7.2-.2.4-.4.6-.4.2 0 .4.1.5.2.3.4.3 1 0 1.4zm3.4 4.9h-5.1v6.5h4.1c.8 0 1.4-.6 1.4-1.4v-4.6c0-.3-.2-.5-.4-.5zm-12 .5v4.6c0 .8.6 1.4 1.4 1.4h4.1v-6.5H6.2c-.2 0-.4.2-.4.5z" } },
	  thanks_loading: { "path": { "opacity": ".5", "d": "M17.8 8.4h-2.1c.6-.9.5-2.2-.2-3-.4-.4-1-.6-1.6-.6-.6 0-1.2.3-1.7.8-.1.1-.1.2-.2.3-.1-.1-.1-.2-.2-.3-.5-.5-1.1-.8-1.7-.8-.6 0-1.1.2-1.6.6-.7.8-.7 2.1-.1 3H6.2c-.8 0-1.4.6-1.4 1.4v1c0 .3.2.5.5.5h13.4c.3 0 .5-.2.5-.5v-1c0-.8-.6-1.4-1.4-1.4zm-6.5 0c-.5 0-1.2-.2-1.7-.6-.3-.4-.4-1 0-1.3.1-.2.3-.2.5-.2s.4.1.6.3c.4.4.6 1.2.6 1.7v.1zm3.1-.6c-.5.4-1.2.6-1.7.6v-.1c0-.5.2-1.3.6-1.7.2-.2.4-.4.6-.4.2 0 .4.1.5.2.3.4.3 1 0 1.4zm3.4 4.9h-5.1v6.5h4.1c.8 0 1.4-.6 1.4-1.4v-4.6c0-.3-.2-.5-.4-.5zm-12 .5v4.6c0 .8.6 1.4 1.4 1.4h4.1v-6.5H6.2c-.2 0-.4.2-.4.5z" } },
	  today: { "path": { "d": "M12 4.8C8 4.8 4.8 8 4.8 12S8 19.2 12 19.2s7.2-3.2 7.2-7.2S16 4.8 12 4.8zm0 13c-3.2 0-5.8-2.6-5.8-5.8S8.8 6.2 12 6.2s5.8 2.6 5.8 5.8-2.6 5.8-5.8 5.8zm.7-6.1V8.6c0-.2-.2-.4-.5-.4h-.4c-.3 0-.5.2-.5.4V12c0 .2.1.4.2.5l2.3 2.3c.2.2.5.2.7 0l.3-.3c.2-.2.2-.5 0-.7l-2.1-2.1z" } },
	  topic: { "path": { "d": "M14.7 8.9c.1.2.2.3.4.4l.5.1c.1 0 .2 0 .3-.1l1.1-2c.3-.4.1-.6-.4-.3l-1.9 1.1c-.1.1-.2.2-.1.3l.1.5zm-6.6.4c.1.1.2.1.3.1l.5-.1c.2-.1.3-.2.4-.4l.1-.5c0-.1 0-.2-.1-.3L7.3 7c-.4-.3-.6-.1-.3.4l1.1 1.9zm7.8 5.4c-.1-.1-.2-.1-.3-.1l-.5.1c-.2.1-.3.2-.4.4l-.1.5c0 .1 0 .2.1.3l2 1.1c.4.3.6.1.3-.4l-1.1-1.9zm-6.6.4c-.1-.2-.2-.3-.4-.4l-.5-.1c-.1 0-.2 0-.3.1l-1.1 2c-.3.4-.1.6.4.3l1.9-1.1c.1-.1.2-.2.1-.3l-.1-.5zm9.5-3.3l-4.9-1.4c-.2 0-.3-.1-.3-.3l-1.4-4.9c-.1-.5-.3-.5-.5 0l-1.3 4.9c0 .2-.2.3-.3.3l-4.9 1.4c-.5.1-.5.3 0 .5l4.9 1.3c.2 0 .3.2.3.3l1.4 4.9c.1.5.3.5.5 0l1.3-4.9c0-.2.2-.3.3-.3l4.9-1.4c.5-.1.5-.3 0-.4zM12 13.2c-.7 0-1.2-.5-1.2-1.2s.5-1.2 1.2-1.2 1.2.5 1.2 1.2-.5 1.2-1.2 1.2z" } },
	  unmatched: { "path": { "d": "M15.8 11.2c-.1-.1-.2-.2-.3-.2h-7c-.1 0-.2.1-.3.2v1.6c.1.1.2.2.3.2h7c.1 0 .2-.1.3-.2V12v-.8zM12 4.8C8 4.8 4.8 8 4.8 12S8 19.2 12 19.2s7.2-3.2 7.2-7.2S16 4.8 12 4.8zm0 12.5c-2.9 0-5.3-2.4-5.3-5.3S9.1 6.7 12 6.7s5.3 2.4 5.3 5.3-2.4 5.3-5.3 5.3z" } },
	  user: { "path": { "d": "M19.2 17.1v.7c0 .8-.6 1.4-1.4 1.4H6.2c-.8 0-1.4-.6-1.4-1.4v-.7c0-1.8 2-2.8 4-3.7 0 0 .1 0 .2-.1.1 0 .3 0 .4.1.8.5 1.7.8 2.6.8.9 0 1.8-.3 2.6-.8.1-.1.3-.1.4 0 .1 0 .2 0 .2.1 2 .8 4 1.8 4 3.6z" }, "ellipse": { "cx": "12", "cy": "8.76", "rx": "3.576", "ry": "3.96" } },
	  work_order: { "path": { "d": "M15.6 12.5c-.8.4-1.2 1.2-1.2 1.3-.1.2-.2.2-.2.2H9.9c-.1 0-.2-.1-.2-.2-.4-.8-1.2-1.4-2.2-1.4-.9 0-1.6.4-2 1.2-.1.1-.2.1-.3 0-.3-.2-.4-.5-.4-.9 0 0-.1-2.7.8-4.2.2-.2.3-.3.5-.3h9.1c.1 0 .2 0 .3.1 0 0 1 1.5 1.2 1.6.1.2.2.3.5.3.2.1 2 .7 2 .7v1.8c0 .4-.1.7-.3.9-.1.1-.2 0-.3-.1-.4-.7-1.1-1.2-2-1.2-.4 0-.7.1-1 .2" }, "ellipse": [{ "cx": "16.56", "cy": "14.664", "rx": "1.176", "ry": "1.176" }, { "cx": "7.56", "cy": "14.664", "rx": "1.176", "ry": "1.176" }] },
	  work_order_item: { "path": { "d": "M9.4 7.7h5.2c.3 0 .5-.2.5-.5v-1c0-.8-.6-1.4-1.4-1.4h-3.4c-.8 0-1.4.6-1.4 1.4v1c0 .3.2.5.5.5zM17.3 6h-.5c-.1 0-.2.1-.2.2v1c0 1.1-.9 1.9-2 1.9H9.4c-1.1 0-2-.8-2-1.9v-1c0-.1-.1-.2-.2-.2h-.5c-.8 0-1.4.6-1.4 1.4v10.4c0 .8.6 1.4 1.4 1.4h10.6c.8 0 1.4-.6 1.4-1.4V7.4c0-.8-.6-1.4-1.4-1.4zM16 11.8l-4.6 4.6c-.1.1-.2.2-.4.2s-.3-.1-.5-.2L8 13.8c-.2-.1-.2-.3 0-.4l.5-.5c.1-.1.2-.1.4 0L11 15l4.1-4.1c.1-.1.3-.1.4 0l.5.5c.1.1.1.3 0 .4z" } }
	};
	module.exports.viewBox = '0 0 24 24';

/***/ },
/* 43 */
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
	
	var _listItemLabel = __webpack_require__(44);
	
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
/* 44 */
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
/* 45 */
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
	
	var _SLDSPopover = __webpack_require__(3);
	
	var _SLDSPopover2 = _interopRequireDefault(_SLDSPopover);
	
	var _list = __webpack_require__(46);
	
	var _list2 = _interopRequireDefault(_list);
	
	var _listItem = __webpack_require__(47);
	
	var _listItem2 = _interopRequireDefault(_listItem);
	
	var _listItemLabel = __webpack_require__(48);
	
	var _listItemLabel2 = _interopRequireDefault(_listItemLabel);
	
	var _utilsCreateChainedFunction = __webpack_require__(49);
	
	var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);
	
	var _SLDSButton = __webpack_require__(50);
	
	var _SLDSButton2 = _interopRequireDefault(_SLDSButton);
	
	var _SLDSIcons = __webpack_require__(13);
	
	var _SLDSIcons2 = __webpack_require__(13);
	
	var _utils = __webpack_require__(6);
	
	var _lodashOmit = __webpack_require__(51);
	
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
	    if (this.props.initialFocus) {
	      this.setFocus();
	    }
	    if (this.props.openOn === 'hover') {
	      //TODO:Add functionality here
	    }
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
	    return !this.props.disabled && this.state.isOpen ? _react2['default'].createElement('div', {
	      className: 'slds-dropdown slds-dropdown--left slds-dropdown--small slds-dropdown--menu',
	      style: { maxHeight: '20em' } }, this.getPopoverContent()) : null;
	  },
	
	  getModalPopover: function getModalPopover() {
	    var className = 'slds-dropdown slds-dropdown--small slds-dropdown--menu slds-dropdown--' + this.props.horizontalAlign;
	    return !this.props.disabled && this.state.isOpen ? _react2['default'].createElement(_SLDSPopover2['default'], {
	      className: className,
	      horizontalAlign: this.props.horizontalAlign,
	      targetElement: this.refs.button,
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
	
	    var props = (0, _lodashOmit2['default'])(this.props, ['aria-haspopup', 'label', 'className', 'style', 'variant', 'iconName', 'iconVariant', 'onBlur', 'onFocus', 'onClick', 'onMouseDown', 'onMouseEnter', 'onMouseLeave', 'tabIndex', 'onKeyDown']);
	
	    return _react2['default'].createElement(_SLDSButton2['default'], _extends({
	      ref: 'button',
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
	    }, props), this.props.modal ? this.getModalPopover() : this.getSimplePopover());
	  }
	
	});
	
	module.exports.ListItem = _listItem2['default'];
	module.exports.ListItemLabel = _listItemLabel2['default'];

/***/ },
/* 46 */
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
	
	var _listItem = __webpack_require__(47);
	
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
	        isHover: _this.props.isHover,
	        onCancel: _this.handleCancel });
	    });
	  },
	
	  render: function render() {
	    return _react2["default"].createElement("div", {
	      ref: "scroll",
	      className: 'slds-wrap slds-grow slds-scrollable--y ' + this.props.className,
	      onMouseEnter: this.props.onMouseEnter,
	      onMouseLeave: this.props.onMouseLeave,
	      style: {
	        maxHeight: 260
	      }
	    }, _react2["default"].createElement("ul", {
	      ref: "scroll",
	      className: "slds-dropdown__list slds-theme--" + this.props.theme,
	      role: "menu"
	    }, this.getItems()));
	  },
	
	  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {}
	
	});

/***/ },
/* 47 */
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
	
	var _listItemLabel = __webpack_require__(48);
	
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
	      this.setFocus();
	    }
	  },
	
	  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
	    if (!prevProps.isHighlighted && this.props.isHighlighted) {
	      this.setFocus();
	    }
	  },
	
	  setFocus: function setFocus() {
	    if (!this.props.isHover) {
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
	      onMouseEnter: this.props.onMouseEnter,
	      onMouseLeave: this.props.onMouseLeave,
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
/* 48 */
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
/* 49 */
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
/* 50 */
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
	        receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
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
	
	var _utilsCreateChainedFunction = __webpack_require__(49);
	
	var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);
	
	var _SLDSIconsJs = __webpack_require__(13);
	
	var _lodashOmit = __webpack_require__(51);
	
	var _lodashOmit2 = _interopRequireDefault(_lodashOmit);
	
	var classNames = __webpack_require__(69);
	
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
	      return classNames(this.props.className, 'slds-button', (_classNames = {}, _defineProperty(_classNames, 'slds-button--' + this.props.variant, this.props.variant), _defineProperty(_classNames, 'slds-button--icon-' + this.props.iconVariant, this.props.iconVariant), _defineProperty(_classNames, 'slds-max-small-button--stretch', this.props.responsive), _defineProperty(_classNames, 'slds-not-selected', notSelected), _defineProperty(_classNames, 'slds-is-selected', isSelected), _defineProperty(_classNames, 'slds-button--icon-inverse', this.props.inverse), _classNames));
	    }
	  }, {
	    key: 'renderIcon',
	    value: function renderIcon(name) {
	      if (this.props.iconName || this.props.notSelectedIcon || this.props.selectedIcon || this.props.selectedFocusIcon) {
	        return _react2['default'].createElement(_SLDSIconsJs.ButtonIcon, {
	          variant: this.props.variant,
	          disabled: this.props.disabled,
	          inverse: this.props.inverse,
	          stateful: this.props.stateful,
	          hint: this.props.hint,
	          name: name,
	          size: this.props.iconSize,
	          position: this.props.iconPosition
	        });
	      }
	    }
	  }, {
	    key: 'renderIconMore',
	    value: function renderIconMore() {
	      if (this.props.iconVariant === 'more') {
	        return _react2['default'].createElement(_SLDSIconsJs.ButtonIcon, {
	          variant: this.props.variant,
	          disabled: this.props.disabled,
	          inverse: this.props.inverse,
	          name: 'down',
	          size: 'x-small'
	        });
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var props = (0, _lodashOmit2['default'])(this.props, 'className');
	      var click = (0, _utilsCreateChainedFunction2['default'])(this.props.onClick, this.onClick.bind(this));
	      var labelClasses = this.props.variant === 'icon' ? 'slds-assistive-text' : '';
	      if (this.props.disabled) {
	        props['disabled'] = 'disabled';
	      };
	
	      if (this.props.stateful) {
	        return _react2['default'].createElement('button', _extends({ tabIndex: this.props.tabindex, className: this.getClassName() }, props, { onClick: click }), _react2['default'].createElement('span', { className: 'slds-text-not-selected' }, this.renderIcon(this.props.notSelectedIcon), this.props.notSelectedLabel), _react2['default'].createElement('span', { className: 'slds-text-selected' }, this.renderIcon(this.props.selectedIcon), this.props.selectedLabel), _react2['default'].createElement('span', { className: 'slds-text-selected-focus' }, this.renderIcon(this.props.selectedFocusIcon), this.props.selectedFocusLabel));
	      } else {
	        return _react2['default'].createElement('button', _extends({ tabIndex: this.props.tabindex, className: this.getClassName() }, props, { onClick: click }), this.props.iconPosition === 'right' ? _react2['default'].createElement('span', { className: labelClasses }, this.props.label) : null, this.renderIcon(this.props.iconName), this.renderIconMore(), this.props.iconPosition === 'left' || !this.props.iconPosition ? _react2['default'].createElement('span', { className: labelClasses }, this.props.label) : null, this.props.children);
	      }
	    }
	  }]);
	
	  return Button;
	})(_react2['default'].Component);
	
	Button.propTypes = {
	  label: _react2['default'].PropTypes.string.isRequired,
	  variant: _react2['default'].PropTypes.oneOf(['base', 'neutral', 'brand', 'destructive', 'icon']),
	  tabindex: _react2['default'].PropTypes.string,
	  disabled: _react2['default'].PropTypes.bool,
	  inverse: _react2['default'].PropTypes.bool,
	  hint: _react2['default'].PropTypes.bool,
	  stateful: _react2['default'].PropTypes.bool,
	  responsive: _react2['default'].PropTypes.bool,
	  iconName: _react2['default'].PropTypes.string,
	  iconVariant: _react2['default'].PropTypes.oneOf(['bare', 'container', 'border', 'border-filled', 'small', 'more']),
	  iconSize: _react2['default'].PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
	  iconPosition: _react2['default'].PropTypes.oneOf(['left', 'right']),
	  onClick: _react2['default'].PropTypes.func
	};
	
	module.exports = Button;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.1.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var arrayMap = __webpack_require__(52),
	    baseDifference = __webpack_require__(53),
	    baseFlatten = __webpack_require__(58),
	    bindCallback = __webpack_require__(61),
	    pickByArray = __webpack_require__(62),
	    pickByCallback = __webpack_require__(63),
	    keysIn = __webpack_require__(65),
	    restParam = __webpack_require__(68);
	
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
/* 52 */
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
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var baseIndexOf = __webpack_require__(54),
	    cacheIndexOf = __webpack_require__(55),
	    createCache = __webpack_require__(56);
	
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
/* 54 */
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
/* 55 */
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
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var getNative = __webpack_require__(57);
	
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
/* 57 */
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
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.1.4 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var isArguments = __webpack_require__(59),
	    isArray = __webpack_require__(60);
	
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
/* 60 */
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
/* 61 */
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
/* 62 */
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
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var baseFor = __webpack_require__(64),
	    keysIn = __webpack_require__(65);
	
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
/* 64 */
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
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.8 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var isArguments = __webpack_require__(66),
	    isArray = __webpack_require__(67);
	
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
/* 66 */
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
/* 67 */
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
/* 68 */
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
/* 69 */
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
/* 70 */
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
	        receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
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
	
	var _SLDSIconsJs = __webpack_require__(13);
	
	var classNames = __webpack_require__(69);
	
	var ButtonGroup = (function (_React$Component) {
	  _inherits(ButtonGroup, _React$Component);
	
	  function ButtonGroup(props) {
	    _classCallCheck(this, ButtonGroup);
	
	    _get(Object.getPrototypeOf(ButtonGroup.prototype), 'constructor', this).call(this, props);
	    this.state = {};
	  }
	
	  _createClass(ButtonGroup, [{
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement('div', { className: 'slds-button-group', role: 'group' }, this.props.children);
	    }
	  }]);
	
	  return ButtonGroup;
	})(_react2['default'].Component);
	
	ButtonGroup.propTypes = {};
	module.exports = ButtonGroup;

/***/ },
/* 71 */
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
	        receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
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
	
	var _Menu = __webpack_require__(72);
	
	var _Menu2 = _interopRequireDefault(_Menu);
	
	var _SLDSPopover = __webpack_require__(3);
	
	var _SLDSPopover2 = _interopRequireDefault(_SLDSPopover);
	
	var _SLDSIcons = __webpack_require__(13);
	
	var _SLDSButton = __webpack_require__(50);
	
	var _SLDSButton2 = _interopRequireDefault(_SLDSButton);
	
	var _utils = __webpack_require__(6);
	
	var _lodashEscaperegexp = __webpack_require__(74);
	
	var _lodashEscaperegexp2 = _interopRequireDefault(_lodashEscaperegexp);
	
	var _MenuDefaultFooter = __webpack_require__(76);
	
	var _MenuDefaultFooter2 = _interopRequireDefault(_MenuDefaultFooter);
	
	var _MenuDefaultHeader = __webpack_require__(77);
	
	var _MenuDefaultHeader2 = _interopRequireDefault(_MenuDefaultHeader);
	
	var _classnames = __webpack_require__(69);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var defaultFilter = function defaultFilter(term, item) {
	  if (!term) return true;
	  return item.label.match(new RegExp((0, _lodashEscaperegexp2['default'])(term), 'ig'));
	};
	
	var SLDSLookup = (function (_React$Component) {
	  _inherits(SLDSLookup, _React$Component);
	
	  function SLDSLookup(props) {
	    _classCallCheck(this, SLDSLookup);
	
	    _get(Object.getPrototypeOf(SLDSLookup.prototype), 'constructor', this).call(this, props);
	
	    //Dynamically assign ids to list items to reference for focusing and selecting items
	
	    this.state = {
	      searchTerm: '',
	      isOpen: false,
	      currentFocus: null,
	      focusIndex: null,
	      selectedIndex: null,
	      listLength: this.props.items.length,
	      items: []
	    };
	  }
	
	  _createClass(SLDSLookup, [{
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps, prevState) {
	      var lookup = this.props.type + 'Lookup';
	      if (!isNaN(parseInt(prevState.selectedIndex)) && isNaN(parseInt(this.state.selectedIndex))) {
	        if (this.refs[lookup]) {
	          _react2['default'].findDOMNode(this.refs[lookup]).focus();
	        }
	      } else if (isNaN(parseInt(prevState.selectedIndex)) && !isNaN(parseInt(this.state.selectedIndex))) {
	        var selectedItem = 'pill-' + this.state.selectedIndex;
	        if (this.refs[selectedItem]) {
	          _react2['default'].findDOMNode(this.refs[selectedItem]).focus();
	        }
	      }
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(newProps) {
	      if (newProps.items) {
	        this.modifyItems(newProps.items);
	      }
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.modifyItems(this.props.items);
	    }
	  }, {
	    key: 'modifyItems',
	    value: function modifyItems(itemsToModify) {
	      var items = itemsToModify.map(function (item, index) {
	        return {
	          id: 'item-' + index,
	          label: item.label,
	          data: item
	        };
	      });
	
	      this.setState({ items: items });
	    }
	
	    //=================================================
	    // Using down/up keys, set Focus on list item and assign it to aria-activedescendant attribute in input.
	    // Need to keep track of filtered list length to be able to increment/decrement the focus index so it's contained to the number of available list items.
	    // Adding/subtracting 1 from focusIndex to account for fixed action items (searchRecords and addNewItem buttons)
	  }, {
	    key: 'increaseIndex',
	    value: function increaseIndex() {
	      var numFocusable = this.getNumFocusableItems();
	      this.setState({ focusIndex: this.state.focusIndex < numFocusable - 1 ? this.state.focusIndex + 1 : 0 });
	    }
	  }, {
	    key: 'decreaseIndex',
	    value: function decreaseIndex() {
	      var numFocusable = this.getNumFocusableItems();
	      this.setState({ focusIndex: this.state.focusIndex > 0 ? this.state.focusIndex - 1 : numFocusable - 1 });
	    }
	  }, {
	    key: 'setFocus',
	    value: function setFocus(id) {
	      this.setState({ currentFocus: id });
	    }
	  }, {
	    key: 'getListLength',
	    value: function getListLength(qty) {
	      if (qty !== this.state.listLength) {
	        this.setState({ listLength: qty });
	      }
	    }
	  }, {
	    key: 'getNumFocusableItems',
	    value: function getNumFocusableItems() {
	      var offset = 0;
	      if (this.refs.footer) {
	        offset += 1;
	      }
	      if (this.refs.header) {
	        offset += 1;
	      }
	      return this.state.listLength + offset;
	    }
	
	    //=================================================
	    // Select menu item (onClick or on key enter/space)
	  }, {
	    key: 'selectItem',
	    value: function selectItem(itemId) {
	      if (itemId) {
	        var index = itemId.replace('item-', '');
	        this.selectItemByIndex(index);
	      }
	    }
	  }, {
	    key: 'selectItemByIndex',
	    value: function selectItemByIndex(index) {
	      if (index >= 0 && index < this.state.items.length) {
	        this.setState({
	          selectedIndex: index,
	          searchTerm: null
	        });
	        var data = this.state.items[index].data;
	        if (this.props.onItemSelect) {
	          this.props.onItemSelect(data);
	        }
	      }
	    }
	  }, {
	    key: 'handleDeleteSelected',
	    value: function handleDeleteSelected() {
	      this.setState({
	        selectedIndex: null,
	        isOpen: true
	      });
	      if (this.props.onItemUnselect) {
	        this.props.onItemUnselect();
	      }
	    }
	
	    //=================================================
	    // Event Listeners on Input
	  }, {
	    key: 'handleClose',
	    value: function handleClose() {
	      this.setState({
	        isOpen: false,
	        focusIndex: null,
	        currentFocus: null
	      });
	    }
	  }, {
	    key: 'handleCancel',
	    value: function handleCancel() {
	      this.setState({
	        isOpen: false,
	        focusIndex: null,
	        currentFocus: null
	      });
	    }
	  }, {
	    key: 'handleClick',
	    value: function handleClick() {
	      this.setState({ isOpen: true });
	    }
	  }, {
	    key: 'handleBlur',
	    value: function handleBlur(event) {
	      this.handleClose();
	      if (this.props.onBlur) {
	        var target = event.target || event.currentTarget;
	        this.props.onBlur(target.value);
	      }
	    }
	  }, {
	    key: 'handleFocus',
	    value: function handleFocus() {
	      this.setState({ isOpen: true });
	    }
	  }, {
	    key: 'handleChange',
	    value: function handleChange(event) {
	      var target = event.target || event.currentTarget;
	      this.setState({ searchTerm: target.value });
	      if (this.props.onChange) {
	        this.props.onChange(target.value);
	      }
	    }
	  }, {
	    key: 'handleKeyDown',
	    value: function handleKeyDown(event) {
	      if (event.keyCode) {
	        //If user hits esc key, close menu
	        event.keyCode === _utils.KEYS.ESCAPE ? this.handleClose() : this.handleClick();
	
	        //If user hits down key, advance aria activedescendant to next item
	        if (event.keyCode === _utils.KEYS.DOWN) {
	          _utils.EventUtil.trapImmediate(event);
	          this.state.focusIndex === null ? this.setState({ focusIndex: 0 }) : this.increaseIndex();
	        }
	        //If user hits up key, advance aria activedescendant to previous item
	        else if (event.keyCode === _utils.KEYS.UP) {
	            _utils.EventUtil.trapImmediate(event);
	            var numFocusable = this.getNumFocusableItems();
	            this.state.focusIndex === null ? this.setState({ focusIndex: numFocusable - 1 }) : this.decreaseIndex();
	          }
	          //If user hits enter/space key, select current activedescendant item
	          else if ((event.keyCode === _utils.KEYS.ENTER || event.keyCode === _utils.KEYS.SPACE) && this.state.focusIndex !== null) {
	              _utils.EventUtil.trapImmediate(event);
	              //If the focus is on the first fixed Action Item in Menu, click it
	              if (this.refs.header && this.state.focusIndex === 0) {
	                _react2['default'].findDOMNode(this.refs.header).click();
	              }
	              //If the focus is on the last fixed Action Item in Menu, click it
	              else if (this.refs.footer && this.state.focusIndex === this.state.listLength + 1) {
	                  _react2['default'].findDOMNode(this.refs.footer).click();
	                }
	                //If not, then select menu item
	                else {
	                    this.selectItem(this.state.currentFocus);
	                  }
	            }
	      }
	    }
	  }, {
	    key: 'handlePillKeyDown',
	    value: function handlePillKeyDown(event) {
	      if (event.keyCode) {
	        if (event.keyCode === _utils.KEYS.DELETE || event.keyCode === _utils.KEYS.BACKSPACE) {
	          _utils.EventUtil.trapImmediate(event);
	          this.handleDeleteSelected();
	        }
	      }
	    }
	  }, {
	    key: 'getHeader',
	    value: function getHeader() {
	      if (this.props.headerRenderer) {
	        var headerActive = false;
	        var isActiveClass = null;
	        if (this.state.focusIndex === 0) {
	          headerActive = true;
	          isActiveClass = 'slds-theme--shade';
	        } else {
	          headerActive = false;
	          isActiveClass = '';
	        }
	        var Header = this.props.headerRenderer;
	        return _react2['default'].createElement('div', { className: isActiveClass }, _react2['default'].createElement(Header, _extends({ ref: 'header' }, this.props, {
	          searchTerm: this.state.searchTerm,
	          focusIndex: this.state.focusIndex,
	          listLength: this.state.listLength,
	          onClose: this.handleClose.bind(this)
	        })));
	      }
	    }
	  }, {
	    key: 'getFooter',
	    value: function getFooter() {
	      if (this.props.footerRenderer) {
	        var Footer = this.props.footerRenderer;
	        return _react2['default'].createElement(Footer, _extends({ ref: 'footer' }, this.props, {
	          focusIndex: this.state.focusIndex,
	          listLength: this.state.listLength,
	          onClose: this.handleClose.bind(this)
	        }));
	      }
	    }
	
	    //=================================================
	    // Rendering Things
	  }, {
	    key: 'renderMenuContent',
	    value: function renderMenuContent() {
	      if (this.state.isOpen) {
	        return _react2['default'].createElement(_Menu2['default'], {
	          searchTerm: this.state.searchTerm,
	          label: this.props.label,
	          type: this.props.type,
	          iconCategory: this.props.iconCategory,
	          iconName: this.props.iconName ? this.props.iconName : this.props.type,
	          focusIndex: this.state.focusIndex,
	          listLength: this.state.listLength,
	          items: this.state.items,
	          emptyMessage: this.props.emptyMessage,
	          messages: this.props.messages,
	          errors: this.props.errors,
	          filterWith: this.props.filterWith,
	          getListLength: this.getListLength.bind(this),
	          setFocus: this.setFocus.bind(this),
	          onSelect: this.selectItem.bind(this),
	          header: this.getHeader(),
	          footer: this.getFooter(),
	          boldRegex: this.props.boldRegex,
	          listItemLabelRenderer: this.props.listItemLabelRenderer
	        });
	      }
	    }
	  }, {
	    key: 'renderSimpleMenu',
	    value: function renderSimpleMenu() {
	      if (this.state.isOpen) {
	        return _react2['default'].createElement('div', { className: 'ignore-react-onclickoutside slds-lookup__menu', role: 'listbox', ref: 'scroll' }, this.renderMenuContent());
	      }
	    }
	  }, {
	    key: 'renderModalMenu',
	    value: function renderModalMenu() {
	      var targetElem = this.props.type + 'Lookup';
	      if (this.state.isOpen) {
	        return _react2['default'].createElement(_SLDSPopover2['default'], {
	          className: 'slds-dropdown slds-dropdown--left slds-dropdown--small slds-dropdown--menu',
	          targetElement: this.refs[targetElem],
	          closeOnTabKey: true,
	          onClose: this.handleCancel.bind(this) }, this.renderMenuContent());
	      }
	    }
	  }, {
	    key: 'renderSelectedItem',
	    value: function renderSelectedItem() {
	      var selectedItem = this.props.items[this.state.selectedIndex].label;
	      return _react2['default'].createElement('span', { tabIndex: '0', className: 'slds-pill', ref: 'pill-' + this.state.selectedIndex, onKeyDown: this.handlePillKeyDown.bind(this) }, _react2['default'].createElement('span', { className: 'slds-pill__label' }, _react2['default'].createElement(_SLDSIcons.Icon, { category: this.props.iconCategory, name: this.props.iconName ? this.props.iconName : this.props.type, className: this.props.iconClasses }), selectedItem), _react2['default'].createElement(_SLDSButton2['default'], {
	        label: 'Press delete to remove',
	        tabIndex: '-1',
	        variant: 'icon',
	        iconName: 'close',
	        iconSize: 'medium',
	        onClick: this.handleDeleteSelected.bind(this),
	        ref: 'clearSelectedItemButton'
	      }));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var inputClasses = this.state.selectedIndex === null ? 'slds-input' : 'slds-input slds-hide';
	      var componentClasses = this.state.selectedIndex === null ? "slds-lookup ignore-react-onclickoutside" : "slds-lookup ignore-react-onclickoutside slds-has-selection";
	
	      var inputContainerClasses = {
	        'slds-lookup__control': true,
	        'slds-input-has-icon': true,
	        'slds-input-has-icon--right': true,
	        'slds-input': this.state.selectedIndex !== null,
	        'slds-has-error': this.props.hasError
	      };
	
	      var inputContainerStyle = this.state.selectedIndex === null ? {} : { padding: '5px' };
	      var inputLabel = this.props.label ? _react2['default'].createElement('label', { className: 'slds-form-element__label', htmlFor: this.props.type + "Lookup" }, this.props.label) : null;
	
	      return _react2['default'].createElement('div', { className: componentClasses, 'data-select': 'multi', 'data-scope': 'single', 'data-typeahead': 'true' }, _react2['default'].createElement('section', { className: 'slds-form-element' }, inputLabel, _react2['default'].createElement('div', { className: (0, _classnames2['default'])(inputContainerClasses), style: inputContainerStyle }, this.state.selectedIndex !== null ? this.renderSelectedItem() : null, _react2['default'].createElement(_SLDSIcons.InputIcon, { name: 'search' }), _react2['default'].createElement('input', {
	        id: this.props.type + "Lookup",
	        ref: this.props.type + "Lookup",
	        className: inputClasses,
	        type: 'text',
	        'aria-haspopup': 'true',
	        'aria-autocomplete': 'list',
	        'aria-activedescendant': this.state.currentFocus ? this.state.currentFocus : "",
	        'aria-expanded': this.state.isOpen,
	        role: 'combobox',
	        onChange: this.handleChange.bind(this),
	        onFocus: this.handleFocus.bind(this),
	        onBlur: this.handleBlur.bind(this),
	        onClick: this.handleClick.bind(this),
	        onKeyDown: this.handleKeyDown.bind(this),
	        value: this.state.searchTerm
	      })), this.props.modal ? this.renderModalMenu() : this.renderSimpleMenu()));
	    }
	  }]);
	
	  return SLDSLookup;
	})(_react2['default'].Component);
	
	SLDSLookup.propTypes = {
	  items: _react2['default'].PropTypes.array,
	  emptyMessage: _react2['default'].PropTypes.string,
	  messages: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.string),
	  errors: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.string),
	  label: _react2['default'].PropTypes.string,
	  type: _react2['default'].PropTypes.string,
	  iconCategory: _react2['default'].PropTypes.string,
	  iconName: _react2['default'].PropTypes.string,
	  filterWith: _react2['default'].PropTypes.func,
	  onItemSelect: _react2['default'].PropTypes.func,
	  onItemUnselect: _react2['default'].PropTypes.func,
	  onChange: _react2['default'].PropTypes.func,
	  onBlur: _react2['default'].PropTypes.func,
	  modal: _react2['default'].PropTypes.bool,
	  disabled: _react2['default'].PropTypes.bool,
	  hasError: _react2['default'].PropTypes.bool,
	  boldRegex: _react2['default'].PropTypes.instanceOf(RegExp),
	  listItemLabelRenderer: _react2['default'].PropTypes.func
	};
	
	SLDSLookup.defaultProps = {
	  filterWith: defaultFilter,
	  modal: false,
	  disabled: false
	};
	
	module.exports = SLDSLookup;
	module.exports.DefaultHeader = _MenuDefaultHeader2['default'];
	module.exports.DefaultFooter = _MenuDefaultFooter2['default'];

/***/ },
/* 72 */
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
	        receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
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
	
	var _Item = __webpack_require__(73);
	
	var _Item2 = _interopRequireDefault(_Item);
	
	var _SLDSIcons = __webpack_require__(13);
	
	var Menu = (function (_React$Component) {
	  _inherits(Menu, _React$Component);
	
	  function Menu(props) {
	    _classCallCheck(this, Menu);
	
	    _get(Object.getPrototypeOf(Menu.prototype), 'constructor', this).call(this, props);
	    this.state = {};
	  }
	
	  //Set filtered list length in parent to determine active indexes for aria-activedescendent
	
	  _createClass(Menu, [{
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps, prevState) {
	      // make an array of the children of the list
	      // but only count the actual items (ignore errors/messages)
	      var list = [].slice.call(_react2['default'].findDOMNode(this.refs.list).children).filter(function (child) {
	        return child.className.indexOf("slds-lookup__item") > -1;
	      }).length;
	      this.props.getListLength(list);
	    }
	  }, {
	    key: 'filter',
	    value: function filter(item) {
	      return this.props.filterWith(this.props.searchTerm, item);
	    }
	
	    //Scroll menu up/down when using mouse keys
	  }, {
	    key: 'handleItemFocus',
	    value: function handleItemFocus(itemIndex, itemHeight) {
	      if (this.refs.list) {
	        _react2['default'].findDOMNode(this.refs.list).scrollTop = itemIndex * itemHeight;
	      }
	    }
	  }, {
	    key: 'renderHeader',
	    value: function renderHeader() {
	      return this.props.header;
	    }
	  }, {
	    key: 'renderFooter',
	    value: function renderFooter() {
	      if (this.props.footer) {
	        var footerActive = false;
	        var isActiveClass = null;
	        if (this.props.focusIndex === this.props.listLength + 1) {
	          footerActive = true;
	          isActiveClass = 'slds-theme--shade';
	        } else {
	          footerActive = false;
	          isActiveClass = '';
	        }
	        return _react2['default'].createElement('div', { className: isActiveClass }, this.props.footer);
	      }
	    }
	  }, {
	    key: 'renderErrors',
	    value: function renderErrors() {
	      return this.props.errors.map(function (error) {
	        return _react2['default'].createElement('li', { className: 'slds-lookup__error', 'aria-live': 'polite' }, _react2['default'].createElement('span', null, error));
	      });
	    }
	  }, {
	    key: 'renderItems',
	    value: function renderItems() {
	      var _this = this;
	
	      return this.props.items.filter(this.filter, this).map(function (c, i) {
	        //isActive means it is aria-activedescendant
	        var id = c.id;
	        var isActive = false;
	        if (_this.props.header) {
	          isActive = _this.props.focusIndex === i + 1 ? true : false;
	        } else {
	          isActive = _this.props.focusIndex === i ? true : false;
	        }
	        return _react2['default'].createElement(_Item2['default'], {
	          key: id,
	          id: id,
	          type: _this.props.type,
	          iconCategory: _this.props.iconCategory,
	          iconName: _this.props.iconName,
	          searchTerm: _this.props.searchTerm,
	          index: i,
	          isActive: isActive,
	          setFocus: _this.props.setFocus,
	          handleItemFocus: _this.handleItemFocus.bind(_this),
	          onSelect: _this.props.onSelect,
	          data: c.data,
	          boldRegex: _this.props.boldRegex,
	          listItemLabelRenderer: _this.props.listItemLabelRenderer
	        }, c);
	      });
	    }
	  }, {
	    key: 'renderMessages',
	    value: function renderMessages() {
	      return this.props.messages.map(function (message) {
	        return _react2['default'].createElement('li', { className: 'slds-lookup__message', 'aria-live': 'polite' }, _react2['default'].createElement('span', null, message));
	      });
	    }
	  }, {
	    key: 'renderContent',
	    value: function renderContent() {
	      if (this.props.errors.length > 0) return this.renderErrors();else if (this.props.items.length === 0) return _react2['default'].createElement('li', { className: 'slds-lookup__message', 'aria-live': 'polite' }, _react2['default'].createElement('span', null, this.props.emptyMessage));
	
	      var elements = this.renderItems();
	      if (this.props.messages.length > 0) {
	        elements.concat(this.renderMessages());
	      }
	      return elements;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement('section', { id: 'menuContainer' }, this.renderHeader(), _react2['default'].createElement('ul', { id: 'list', className: 'slds-lookup__list', role: 'presentation', ref: 'list' }, this.renderContent()), this.renderFooter());
	    }
	  }]);
	
	  return Menu;
	})(_react2['default'].Component);
	
	Menu.propTypes = {
	  searchTerm: _react2['default'].PropTypes.string,
	  label: _react2['default'].PropTypes.string,
	  type: _react2['default'].PropTypes.string,
	  iconCategory: _react2['default'].PropTypes.string,
	  focusIndex: _react2['default'].PropTypes.number,
	  listLength: _react2['default'].PropTypes.number,
	  items: _react2['default'].PropTypes.array,
	  emptyMessage: _react2['default'].PropTypes.string,
	  errors: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.string),
	  filterWith: _react2['default'].PropTypes.func,
	  getListLength: _react2['default'].PropTypes.func,
	  setFocus: _react2['default'].PropTypes.func,
	  boldRegex: _react2['default'].PropTypes.instanceOf(RegExp)
	};
	
	Menu.defaultProps = {
	  emptyMessage: "No matches found.",
	  messages: [],
	  errors: []
	};
	
	module.exports = Menu;

/***/ },
/* 73 */
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
	        receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
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
	
	var _SLDSIcons = __webpack_require__(13);
	
	var _utils = __webpack_require__(6);
	
	var _lodashEscaperegexp = __webpack_require__(74);
	
	var _lodashEscaperegexp2 = _interopRequireDefault(_lodashEscaperegexp);
	
	var Item = (function (_React$Component) {
	  _inherits(Item, _React$Component);
	
	  function Item(props) {
	    _classCallCheck(this, Item);
	
	    _get(Object.getPrototypeOf(Item.prototype), 'constructor', this).call(this, props);
	  }
	
	  _createClass(Item, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (nextProps.isActive !== this.props.isActive && nextProps.isActive === true) {
	        this.scrollFocus();
	        this.props.setFocus(this.props.id);
	      }
	    }
	  }, {
	    key: 'boldSearchText',
	    value: function boldSearchText(children) {
	      var regex = this.props.boldRegex;
	      if (!regex) {
	        var term = this.props.searchTerm;
	        if (!children || !term) return children;
	        regex = new RegExp('(' + (0, _lodashEscaperegexp2['default'])(term) + ')', 'gi');
	      }
	      return _react2['default'].Children.map(children, function (c) {
	        return typeof c === 'string' ? _react2['default'].createElement('span', { dangerouslySetInnerHTML: { __html: c.replace(regex, '<mark>$1</mark>') } }) : c;
	      });
	    }
	  }, {
	    key: 'handleClick',
	    value: function handleClick(e) {
	      return this.props.onSelect(this.props.id, this.props.data);
	    }
	  }, {
	    key: 'handleMouseDown',
	    value: function handleMouseDown(e) {
	      _utils.EventUtil.trapImmediate(e);
	    }
	
	    //Scroll menu item based on up/down mouse keys (assumes all items are the same height)
	  }, {
	    key: 'scrollFocus',
	    value: function scrollFocus() {
	      var height = _react2['default'].findDOMNode(this).offsetHeight;
	      if (height && this.props.handleItemFocus) this.props.handleItemFocus(this.props.index, height);
	    }
	  }, {
	    key: 'getLabel',
	    value: function getLabel() {
	      if (this.props.listItemLabelRenderer) {
	        var ListItemLabel = this.props.listItemLabelRenderer;
	        return _react2['default'].createElement(ListItemLabel, this.props);
	      }
	      return [_react2['default'].createElement(_SLDSIcons.Icon, { name: this.props.iconName, category: this.props.iconCategory }), this.boldSearchText(this.props.children.label)];
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var className = 'slds-lookup__item';
	      var id = this.props.id;
	      if (this.props.isActive) className += ' slds-theme--shade';
	
	      return(
	        //IMPORTANT: anchor id is used to set lookup's input's aria-activedescendant
	        _react2['default'].createElement('li', { className: className, role: 'presentation' }, _react2['default'].createElement('a', {
	          href: this.props.href,
	          id: id,
	          ref: id,
	          tabIndex: '-1',
	          'aria-disabled': this.props.isDisabled,
	          role: 'option',
	          onClick: this.handleClick.bind(this),
	          onMouseDown: this.handleMouseDown.bind(this) }, this.getLabel()))
	      );
	    }
	  }]);
	
	  return Item;
	})(_react2['default'].Component);
	
	Item.propTypes = {
	  key: _react2['default'].PropTypes.string,
	  id: _react2['default'].PropTypes.string,
	  href: _react2['default'].PropTypes.string,
	  type: _react2['default'].PropTypes.string,
	  iconCategory: _react2['default'].PropTypes.string,
	  searchTerm: _react2['default'].PropTypes.string,
	  index: _react2['default'].PropTypes.number,
	  isActive: _react2['default'].PropTypes.bool,
	  isDisabled: _react2['default'].PropTypes.bool,
	  setFocus: _react2['default'].PropTypes.func,
	  handleItemFocus: _react2['default'].PropTypes.func,
	  onSelect: _react2['default'].PropTypes.func,
	  data: _react2['default'].PropTypes.object,
	  boldRegex: _react2['default'].PropTypes.instanceOf(RegExp),
	  listItemLabelRenderer: _react2['default'].PropTypes.func
	};
	
	Item.defaultProps = {};
	
	module.exports = Item;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var baseToString = __webpack_require__(75);
	
	/**
	 * Used to match `RegExp` [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns)
	 * and those outlined by [`EscapeRegExpPattern`](http://ecma-international.org/ecma-262/6.0/#sec-escaperegexppattern).
	 */
	var reRegExpChars = /^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g,
	    reHasRegExpChars = RegExp(reRegExpChars.source);
	
	/** Used to escape characters for inclusion in compiled regexes. */
	var regexpEscapes = {
	  '0': 'x30', '1': 'x31', '2': 'x32', '3': 'x33', '4': 'x34',
	  '5': 'x35', '6': 'x36', '7': 'x37', '8': 'x38', '9': 'x39',
	  'A': 'x41', 'B': 'x42', 'C': 'x43', 'D': 'x44', 'E': 'x45', 'F': 'x46',
	  'a': 'x61', 'b': 'x62', 'c': 'x63', 'd': 'x64', 'e': 'x65', 'f': 'x66',
	  'n': 'x6e', 'r': 'x72', 't': 'x74', 'u': 'x75', 'v': 'x76', 'x': 'x78'
	};
	
	/** Used to escape characters for inclusion in compiled string literals. */
	var stringEscapes = {
	  '\\': '\\',
	  "'": "'",
	  '\n': 'n',
	  '\r': 'r',
	  '\u2028': 'u2028',
	  '\u2029': 'u2029'
	};
	
	/**
	 * Used by `_.escapeRegExp` to escape characters for inclusion in compiled regexes.
	 *
	 * @private
	 * @param {string} chr The matched character to escape.
	 * @param {string} leadingChar The capture group for a leading character.
	 * @param {string} whitespaceChar The capture group for a whitespace character.
	 * @returns {string} Returns the escaped character.
	 */
	function escapeRegExpChar(chr, leadingChar, whitespaceChar) {
	  if (leadingChar) {
	    chr = regexpEscapes[chr];
	  } else if (whitespaceChar) {
	    chr = stringEscapes[chr];
	  }
	  return '\\' + chr;
	}
	
	/**
	 * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
	 * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
	 *
	 * @static
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The string to escape.
	 * @returns {string} Returns the escaped string.
	 * @example
	 *
	 * _.escapeRegExp('[lodash](https://lodash.com/)');
	 * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
	 */
	function escapeRegExp(string) {
	  string = baseToString(string);
	  return (string && reHasRegExpChars.test(string))
	    ? string.replace(reRegExpChars, escapeRegExpChar)
	    : (string || '(?:)');
	}
	
	module.exports = escapeRegExp;


/***/ },
/* 75 */
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
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` or `undefined` values.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  return value == null ? '' : (value + '');
	}
	
	module.exports = baseToString;


/***/ },
/* 76 */
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
	        receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
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
	
	var _SLDSIcons = __webpack_require__(13);
	
	var _utils = __webpack_require__(6);
	
	var DefaultFooter = (function (_React$Component) {
	  _inherits(DefaultFooter, _React$Component);
	
	  function DefaultFooter(props) {
	    _classCallCheck(this, DefaultFooter);
	
	    _get(Object.getPrototypeOf(DefaultFooter.prototype), 'constructor', this).call(this, props);
	  }
	
	  _createClass(DefaultFooter, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (nextProps.isActive !== this.props.isActive && nextProps.isActive === true) this.props.setFocus(this.props.id);
	    }
	  }, {
	    key: 'handleClick',
	    value: function handleClick() {
	      console.log('=====> Lookup Footer Clicked');
	    }
	  }, {
	    key: 'handleMouseDown',
	    value: function handleMouseDown(event) {
	      _utils.EventUtil.trapImmediate(event);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var className = 'slds-button';
	      if (this.props.isActive) className += ' slds-theme--shade';
	
	      return _react2['default'].createElement('div', { className: 'slds-lookup__item', onClick: this.handleClick.bind(this), onMouseDown: this.handleMouseDown.bind(this) }, _react2['default'].createElement('button', { id: 'newItem', tabIndex: '-1', className: className }, _react2['default'].createElement(_SLDSIcons.Icon, { name: 'add', category: 'utility', size: 'x-small', className: 'slds-icon-text-default' }), this.props.newItemLabel));
	    }
	  }]);
	
	  return DefaultFooter;
	})(_react2['default'].Component);
	
	DefaultFooter.propTypes = {};
	
	DefaultFooter.defaultProps = {};
	
	module.exports = DefaultFooter;

/***/ },
/* 77 */
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
	        receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
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
	
	var _SLDSIcons = __webpack_require__(13);
	
	var _utils = __webpack_require__(6);
	
	var DefaultHeader = (function (_React$Component) {
	  _inherits(DefaultHeader, _React$Component);
	
	  function DefaultHeader(props) {
	    _classCallCheck(this, DefaultHeader);
	
	    _get(Object.getPrototypeOf(DefaultHeader.prototype), 'constructor', this).call(this, props);
	  }
	
	  _createClass(DefaultHeader, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (nextProps.isActive !== this.props.isActive && nextProps.isActive === true) this.props.setFocus(this.props.id);
	    }
	  }, {
	    key: 'handleClick',
	    value: function handleClick() {
	      console.log('=====> Lookup Header Clicked');
	      if (this.props.onClose) {
	        this.props.onClose();
	      }
	    }
	  }, {
	    key: 'handleMouseDown',
	    value: function handleMouseDown(event) {
	      _utils.EventUtil.trapImmediate(event);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var className = 'slds-button';
	      if (this.props.isActive) className += ' slds-theme--shade aaa';
	
	      return _react2['default'].createElement('div', { className: 'slds-lookup__item', onMouseDown: this.handleMouseDown, onClick: this.handleClick.bind(this) }, _react2['default'].createElement('button', { id: 'searchRecords', tabIndex: '-1', className: className }, _react2['default'].createElement(_SLDSIcons.Icon, { name: 'search', category: 'utility', size: 'x-small', className: 'slds-icon-text-default' }), this.props.searchLabel));
	    }
	  }]);
	
	  return DefaultHeader;
	})(_react2['default'].Component);
	
	DefaultHeader.propTypes = {};
	
	DefaultHeader.defaultProps = {};
	
	module.exports = DefaultHeader;

/***/ },
/* 78 */
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
	
	var _SLDSButton = __webpack_require__(50);
	
	var _SLDSButton2 = _interopRequireDefault(_SLDSButton);
	
	var _utils = __webpack_require__(6);
	
	var _SLDSSettings = __webpack_require__(14);
	
	var _SLDSSettings2 = _interopRequireDefault(_SLDSSettings);
	
	var _classnames = __webpack_require__(69);
	
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
	      tagline: '',
	      isOpen: false,
	      content: [],
	      footer: [],
	      returnFocusTo: null,
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
	      'slds-modal--large': this.props.size === 'large',
	      'slds-modal--prompt': this.isPrompt()
	    };
	
	    return _react2['default'].createElement('div', {
	      className: (0, _classnames2['default'])(modalClass),
	      style: { pointerEvents: 'inherit' },
	      onClick: this.isPrompt() ? undefined : this.closeModal
	    }, _react2['default'].createElement('div', {
	      role: 'dialog',
	      className: 'slds-modal__container',
	      onClick: this.handleModalClick
	    }, this.headerComponent(), _react2['default'].createElement('div', { className: 'slds-modal__content' }, this.props.children), this.footerComponent()));
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
	      'slds-modal__footer--directional': this.props.directional,
	      'slds-theme--default': this.isPrompt()
	    };
	
	    var hasFooter = this.props.footer && this.props.footer.length > 0;
	
	    if (hasFooter) {
	      footer = _react2['default'].createElement('div', { className: (0, _classnames2['default'])(footerClass) }, this.props.footer);
	    }
	
	    return footer;
	  },
	
	  renderTagline: function renderTagline() {
	    if (this.props.tagline) {
	      return _react2['default'].createElement('p', { className: 'slds-m-top--x-small' }, this.props.tagline);
	    }
	  },
	
	  headerComponent: function headerComponent() {
	    var headingClasses = [],
	        headerClasses = ['slds-modal__header'];
	    var closeButton = undefined;
	
	    if (this.isPrompt()) {
	      headerClasses.push('slds-theme--' + this.props.prompt);
	      headerClasses.push('slds-theme--alert-texture');
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
	
	    return _react2['default'].createElement('div', { className: (0, _classnames2['default'])(headerClasses) }, this.props.toast, _react2['default'].createElement('h2', { className: (0, _classnames2['default'])(headingClasses) }, this.props.title), this.renderTagline(), closeButton);
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
/* 79 */
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
	
	var _index = __webpack_require__(78);
	
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

/***/ },
/* 80 */
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
	        receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
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
	
	var _SLDSButton = __webpack_require__(50);
	
	var _SLDSButton2 = _interopRequireDefault(_SLDSButton);
	
	var _SLDSIcons = __webpack_require__(13);
	
	var classNames = __webpack_require__(69);
	
	var SLDSNotification = (function (_React$Component) {
	  _inherits(SLDSNotification, _React$Component);
	
	  function SLDSNotification(props) {
	    _classCallCheck(this, SLDSNotification);
	
	    _get(Object.getPrototypeOf(SLDSNotification.prototype), 'constructor', this).call(this, props);
	    this.state = { isOpen: true };
	  }
	
	  _createClass(SLDSNotification, [{
	    key: 'renderIcon',
	    value: function renderIcon() {
	      if (this.props.icon) {
	        var classes = '';
	        if (this.props.variant === 'alert') {
	          classes = 'slds-m-right--x-small';
	        } else if (this.props.variant === 'toast') {
	          classes = 'slds-m-right--small slds-col slds-no-flex';
	        }
	        return _react2['default'].createElement(_SLDSIcons.Icon, { category: 'utility', name: this.props.icon, size: 'small', className: classes });
	      }
	    }
	  }, {
	    key: 'renderClose',
	    value: function renderClose() {
	      var that = this;
	      if (this.props.dismissible) {
	        var size = '';
	        if (this.props.variant === 'alert') {
	          size = 'medium';
	        } else if (this.props.variant === 'toast') {
	          size = 'large';
	        }
	        return _react2['default'].createElement(_SLDSButton2['default'], {
	          label: 'Dismiss Notification',
	          variant: 'icon',
	          iconName: 'close',
	          iconSize: size,
	          inverse: true,
	          className: 'slds-button slds-notify__close',
	          onClick: that.onDismiss.bind(that)
	        });
	      }
	    }
	  }, {
	    key: 'onDismiss',
	    value: function onDismiss() {
	      if (this.props.onDismiss) this.props.onDismiss();
	      this.setState({ isOpen: false });
	    }
	  }, {
	    key: 'renderAlertContent',
	    value: function renderAlertContent() {
	      if (this.props.variant === 'alert') {
	        return _react2['default'].createElement('h2', null, this.renderIcon(), this.props.content);
	      }
	    }
	  }, {
	    key: 'renderToastContent',
	    value: function renderToastContent() {
	      if (this.props.variant === 'toast') {
	        return _react2['default'].createElement('section', { className: 'notify__content slds-grid' }, this.renderIcon(), _react2['default'].createElement('div', { className: 'slds-col slds-align-middle' }, _react2['default'].createElement('h2', { className: 'slds-text-heading--small ' }, this.props.content)));
	      }
	    }
	  }, {
	    key: 'getClassName',
	    value: function getClassName() {
	      var _classNames;
	
	      return classNames(this.props.className, 'slds-notify ', (_classNames = {}, _defineProperty(_classNames, 'slds-notify--' + this.props.variant, this.props.variant), _defineProperty(_classNames, 'slds-theme--' + this.props.theme, this.props.theme), _defineProperty(_classNames, 'slds-theme--alert-texture-animated', this.props.texture), _classNames));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (this.state.isOpen) {
	        return _react2['default'].createElement('div', { className: 'slds-notify-container' }, _react2['default'].createElement('div', { className: this.getClassName(), role: 'alert' }, _react2['default'].createElement('span', { className: 'slds-assistive-text' }, this.props.theme), this.renderClose(), this.renderAlertContent(), this.renderToastContent()));
	      } else {
	        return null;
	      }
	    }
	  }]);
	
	  return SLDSNotification;
	})(_react2['default'].Component);
	
	SLDSNotification.propTypes = {
	  content: _react2['default'].PropTypes.node,
	  icon: _react2['default'].PropTypes.string,
	  variant: _react2['default'].PropTypes.oneOf(['alert', 'toast']),
	  theme: _react2['default'].PropTypes.oneOf(['success', 'warning', 'error', 'offline']),
	  texture: _react2['default'].PropTypes.bool,
	  dismissible: _react2['default'].PropTypes.bool,
	  onDismiss: _react2['default'].PropTypes.func
	};
	
	SLDSNotification.defaultProps = {
	  dismissible: true
	};
	
	module.exports = SLDSNotification;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=design-system-react.js.map