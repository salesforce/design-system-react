/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _SLDSIcons = require("./../SLDSIcons");

var _SLDSIcons2 = require("../SLDSIcons");

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _utils = require('../utils');

var defaultFilter = function defaultFilter(term, item) {
  if (!term) return true;
  return item.label.match(new RegExp(_lodash2['default'].escapeRegExp(term), 'ig'));
};

var SLDSLookup = (function (_React$Component) {
  _inherits(SLDSLookup, _React$Component);

  function SLDSLookup(props) {
    _classCallCheck(this, SLDSLookup);

    _get(Object.getPrototypeOf(SLDSLookup.prototype), 'constructor', this).call(this, props);

    //Dynamically assign ids to list items to reference for focusing and selecting items
    this.props.items.map(function (item, index) {
      return item.id = 'item-' + index;
    });

    this.state = {
      searchTerm: '',
      isOpen: false,
      currentFocus: null,
      focusIndex: null,
      selectedIndex: null,
      listLength: this.props.items.length
    };
  }

  //=================================================
  // Using down/up keys, set Focus on list item and assign it to aria-activedescendant attribute in input.
  // Need to keep track of filtered list length to be able to increment/decrement the focus index so it's contained to the number of available list items.

  _createClass(SLDSLookup, [{
    key: 'increaseIndex',
    value: function increaseIndex() {
      var items = this.state.listLength - 1;
      this.setState({ focusIndex: this.state.focusIndex < items ? this.state.focusIndex + 1 : 0 });
    }
  }, {
    key: 'decreaseIndex',
    value: function decreaseIndex() {
      var items = this.state.listLength - 1;
      this.setState({ focusIndex: this.state.focusIndex > 0 ? this.state.focusIndex - 1 : items });
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

    //=================================================
    // Select menu item (onClick or on key enter/space)
  }, {
    key: 'selectItem',
    value: function selectItem(itemId) {
      var index = itemId.replace('item-', '');
      this.setState({
        selectedIndex: index,
        searchTerm: null
      });
    }
  }, {
    key: 'handleDeleteSelected',
    value: function handleDeleteSelected() {
      this.setState({
        selectedIndex: null,
        isOpen: false
      });
    }

    //=================================================
    // Basic Event Listeners on Input
  }, {
    key: 'handleClose',
    value: function handleClose() {
      this.setState({
        isOpen: false,
        focusIndex: null
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      this.setState({ isOpen: true });
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur() {
      this.handleClose();
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
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(event) {
      if (event.keyCode) {
        //If user hits esc key, close menu
        event.keyCode === _utils.KEYS.ESCAPE ? this.handleClose() : this.handleClick();

        //If user hits tab key, move aria activedescendant to first menu item
        if (event.keyCode === _utils.KEYS.TAB && this.state.focusIndex === null) {
          this.setState({ focusIndex: 0 });
          _utils.EventUtil.trapImmediate(event);
        }
        //If user hits down key, advance aria activedescendant to next item
        else if (event.keyCode === _utils.KEYS.DOWN && this.state.focusIndex !== null) {
            _utils.EventUtil.trapImmediate(event);
            this.increaseIndex();
          }
          //If user hits up key, advance aria activedescendant to previous item
          else if (event.keyCode === _utils.KEYS.UP && this.state.focusIndex !== null) {
              _utils.EventUtil.trapImmediate(event);
              this.decreaseIndex();
            }

            //If user hits enter/space key, select current activedescendant item
            else if ((event.keyCode === _utils.KEYS.ENTER || event.keyCode === _utils.KEYS.SPACE) && this.state.focusIndex !== null) {
                _utils.EventUtil.trapImmediate(event);
                this.selectItem(this.state.currentFocus);
              }
      }
    }

    //=================================================
    // Rendering Things
  }, {
    key: 'renderMenu',
    value: function renderMenu() {
      if (this.state.isOpen) {
        return _react2['default'].createElement(_Menu2['default'], {
          searchTerm: this.state.searchTerm,
          filterWith: this.props.filterWith,
          onSelect: this.selectItem.bind(this),
          label: this.props.label,
          items: this.props.items,
          setFocus: this.setFocus.bind(this),
          getListLength: this.getListLength.bind(this),
          listLength: this.state.listLength,
          focusIndex: this.state.focusIndex });
      } else {
        return null;
      }
    }
  }, {
    key: 'renderSelectedItem',
    value: function renderSelectedItem() {
      return _react2['default'].createElement(
        'div',
        { className: 'slds-pill' },
        _react2['default'].createElement(
          'a',
          { href: '#', className: 'slds-pill__label' },
          _react2['default'].createElement(
            'span',
            null,
            _react2['default'].createElement(_SLDSIcons2.Icon, { name: 'account' }),
            this.props.items[this.state.selectedIndex].label
          )
        ),
        _react2['default'].createElement(
          'button',
          { className: 'slds-button slds-button--icon-bare', onClick: this.handleDeleteSelected.bind(this), ref: 'clearSelectedItemButton' },
          _react2['default'].createElement(_SLDSIcons.ButtonIcon, { name: 'close' }),
          _react2['default'].createElement(
            'span',
            { className: 'slds-assistive-text' },
            'Remove'
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var inputClasses = this.state.selectedIndex === null ? 'slds-input' : 'slds-input slds-hide';
      var componentClasses = this.state.selectedIndex === null ? "slds-lookup ignore-react-onclickoutside" : "slds-lookup ignore-react-onclickoutside slds-has-selection";

      return _react2['default'].createElement(
        'div',
        { className: componentClasses, 'data-select': 'single', 'data-scope': 'single', 'data-typeahead': 'true' },
        _react2['default'].createElement(
          'section',
          { className: 'slds-form-element' },
          _react2['default'].createElement(
            'label',
            { className: 'slds-form-element__label', forHTML: 'lookup' },
            this.props.label
          ),
          _react2['default'].createElement(
            'div',
            { className: 'slds-lookup__control slds-input-has-icon slds-input-has-icon--right' },
            this.state.selectedIndex !== null ? this.renderSelectedItem() : null,
            _react2['default'].createElement(_SLDSIcons.InputIcon, { name: 'search' }),
            _react2['default'].createElement('input', {
              id: 'lookup',
              className: inputClasses,
              type: 'text',
              'aria-label': 'lookup',
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
              value: this.state.searchTerm })
          ),
          this.renderMenu()
        )
      );
    }
  }]);

  return SLDSLookup;
})(_react2['default'].Component);

SLDSLookup.propTypes = {
  items: _react2['default'].PropTypes.array,
  label: _react2['default'].PropTypes.string
};

SLDSLookup.defaultProps = {
  filterWith: defaultFilter,
  onItemSelect: function onItemSelect(item) {
    //console.log('onItemSelect should be defined');
  }
};

module.exports = SLDSLookup;