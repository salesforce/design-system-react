/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _menuPicklist = require('../../menu-picklist');

var _menuPicklist2 = _interopRequireDefault(_menuPicklist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _react2.default.createClass({

  displayName: 'YearSelector',

  getDefaultProps: function getDefaultProps() {
    return {
      displayedDate: new Date(),
      relativeYearFrom: -5,
      relativeYearTo: 5,
      onChange: function onChange(displayedDate) {
        console.log('onChange should be defined: ', displayedDate);
      }
    };
  },
  getOptions: function getOptions() {
    var now = new Date();
    var fromYear = now.getFullYear() + this.props.relativeYearFrom;
    var toYear = now.getFullYear() + this.props.relativeYearTo;
    var opts = [];

    for (var year = fromYear; year < toYear; year++) {
      opts.push({ label: year, value: year });
    }
    return opts;
  },
  handleSelect: function handleSelect(selectedValue) {
    if (selectedValue) {
      if (this.props.onChange) {
        this.props.onChange(new Date(this.props.displayedDate.setFullYear(parseInt(selectedValue.value))));
      }
    }
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'slds-form-element' },
      _react2.default.createElement(_menuPicklist2.default, {
        options: this.getOptions(),
        placeholder: 'Year',
        checkmark: false,
        modal: false,
        value: this.props.displayedDate.getFullYear(),
        onSelect: this.handleSelect,
        className: 'slds-picklist--fluid slds-shrink-none',
        initialFocus: true })
    );
  }
});