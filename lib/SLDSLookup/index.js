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

var _BodyIndex = require('./Body/index');

var _BodyIndex2 = _interopRequireDefault(_BodyIndex);

var _SLDSIcons = require("./../SLDSIcons");

var _SLDSIcons2 = require("../SLDSIcons");

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var defaultFilter = function defaultFilter(term, item) {
  if (!term) return true;
  return item.match(new RegExp(_lodash2['default'].escapeRegExp(term), 'ig'));
};

module.exports = _react2['default'].createClass({
  displayName: 'exports',

  getDefaultProps: function getDefaultProps() {
    return {
      placeholder: 'Select an Item',
      filterWith: defaultFilter,
      onItemSelect: function onItemSelect(item) {
        console.log('onItemSelect should be defined');
      }
    };
  },

  getInitialState: function getInitialState() {
    return {
      searchTerm: '',
      isOpen: false
    };
  },

  handleChange: function handleChange(event) {
    var target = event.target || event.currentTarget;
    this.setState({ searchTerm: target.value });
  },

  handleClose: function handleClose() {
    this.setState({ isOpen: false });
  },

  handleClick: function handleClick() {
    this.setState({ isOpen: true });
  },

  handleBlur: function handleBlur() {
    this.setState({ isOpen: false });
  },

  handleFocus: function handleFocus() {
    this.setState({ isOpen: true });
  },

  selectedItem: function selectedItem(item) {
    console.log('SELECTED: ', item);
    if (this.props.onItemSelect) this.props.onItemSelect(item);

    this.setState({
      currentSelectedItem: item,
      searchTerm: null
    });
  },

  selectedItemContents: function selectedItemContents() {
    return _react2['default'].createElement(
      'span',
      null,
      _react2['default'].createElement(_SLDSIcons2.Icon, { name: 'account' }),
      this.state.currentSelectedItem.props.children
    );
  },

  handleDeleteSelected: function handleDeleteSelected() {
    this.setState({
      currentSelectedItem: null,
      isOpen: false
    });
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    if (prevState.currentSelectedItem && !this.state.currentSelectedItem) {
      if (this.refs.date) {
        this.refs.date.getDOMNode().focus();
      }
    } else if (!prevState.currentSelectedItem && this.state.currentSelectedItem) {
      if (this.refs.clearSelectedItemButton && this.refs.clearSelectedItemButton.getDOMNode && this.refs.clearSelectedItemButton.getDOMNode()) {
        this.refs.clearSelectedItemButton.getDOMNode().focus();
      }
    }
  },

  selectedItemPill: function selectedItemPill() {
    return _react2['default'].createElement(
      'span',
      { className: 'slds-pill slds-pill--bare' },
      _react2['default'].createElement(
        'a',
        { href: '#', className: 'slds-pill__label' },
        this.selectedItemContents()
      ),
      _react2['default'].createElement(
        'button',
        { className: 'slds-button slds-button--icon-bare', onClick: this.handleDeleteSelected, ref: 'clearSelectedItemButton' },
        _react2['default'].createElement(_SLDSIcons.ButtonIcon, { name: 'close' }),
        _react2['default'].createElement(
          'span',
          { className: 'slds-assistive-text' },
          'Remove'
        )
      )
    );
  },

  popover: function popover() {
    return this.state.isOpen ? _react2['default'].createElement(
      _SLDSPopover2['default'],
      { className: 'slds-dropdown', targetElement: this.refs.date, onClose: this.handleClose },
      _react2['default'].createElement(_BodyIndex2['default'], {
        ref: 'list',
        searchTerm: this.state.searchTerm,
        filterWith: this.props.filterWith,
        selectedItem: this.selectedItem,
        items: this.props.items,
        label: this.props.label,
        onChange: this.handleChange })
    ) : null;
  },

  getPlaceholder: function getPlaceholder() {
    return this.state.currentSelectedItem ? '' : this.props.placeholder;
  },

  handleKeyDown: function handleKeyDown(event) {
    if (event.keyCode) {
      if (event.keyCode === 40) {
        console.log('down');
      } else if (event.keyCode === 38) {
        console.log('up');
      } else if (event.keyCode === 13) {
        console.log('enter');
        var list = this.refs.list;
        if (list && list.items) {
          var items = list.items();
          if (items && items.length) {
            var item = items[0];
            this.selectedItem(item);
            console.log('FIRST ITEM: ', item);
          }
        }
      }
    }
  },

  render: function render() {
    var className = this.state.currentSelectedItem ? 'slds-input--bare slds-hide' : 'slds-input--bare';
    return _react2['default'].createElement(
      'div',
      { className: 'slds-lookup ignore-react-onclickoutside', 'data-select': 'multi', 'data-scope': 'single', 'data-typeahead': 'true' },
      _react2['default'].createElement(
        'div',
        { className: 'slds-form-element' },
        _react2['default'].createElement(
          'label',
          { className: 'slds-form-element__label', forHTML: 'lookup' },
          this.props.label
        ),
        _react2['default'].createElement(
          'div',
          { className: 'slds-lookup__control slds-input-has-icon slds-input-has-icon--right' },
          this.state.currentSelectedItem ? this.selectedItemPill() : null,
          _react2['default'].createElement(_SLDSIcons.InputIcon, { name: 'search' }),
          _react2['default'].createElement('input', {
            id: 'lookup',
            ref: 'date',
            className: className,
            type: 'text',
            'aria-label': 'lookup',
            'aria-haspopup': 'true',
            'aria-autocomplete': 'list',
            role: 'combobox',
            onChange: this.handleChange,
            onBlur: this.handleBlur,
            onFocus: this.handleFocus,
            onClick: this.handleClick,
            onKeyDown: this.handleKeyDown,
            value: this.state.searchTerm })
        ),
        this.popover()
      )
    );
  }
});