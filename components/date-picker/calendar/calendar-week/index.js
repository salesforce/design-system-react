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

var _index = require('../calendar-day/index');

var _index2 = _interopRequireDefault(_index);

var _utilities = require('../../../../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _react2.default.createClass({
  displayName: 'exports',
  getDefaultProps: function getDefaultProps() {
    return {
      displayedDate: new Date(),
      selectedDate: new Date()
    };
  },
  handleSelectDate: function handleSelectDate(day) {
    if (this.props.onSelectDate) {
      this.props.onSelectDate(day);
    }
  },
  handleCancel: function handleCancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  },
  handlePrevDay: function handlePrevDay(date) {
    if (this.props.onPrevDay) {
      this.props.onPrevDay(date);
    }
  },
  handleNextDay: function handleNextDay(date) {
    if (this.props.onNextDay) {
      this.props.onNextDay(date);
    }
  },
  handlePrevWeek: function handlePrevWeek(date) {
    if (this.props.onPrevWeek) {
      this.props.onPrevWeek(date);
    }
  },
  handleNextWeek: function handleNextWeek(date) {
    if (this.props.onNextWeek) {
      this.props.onNextWeek(date);
    }
  },


  render: function render() {
    var days = [];
    var date = this.props.date;
    for (var i = 0; i < 7; i++) {
      days.push(_react2.default.createElement(_index2.default, {
        key: date.toString(),
        date: date,
        month: this.props.month,
        selectedDate: this.props.selectedDate,
        onSelectDate: this.handleSelectDate,
        displayedDate: this.props.displayedDate,
        highlightedDate: this.props.highlightedDate,
        focused: this.props.calendarHasFocus && _utilities.DateUtil.isSameDay(this.props.highlightedDate, date),
        calendarHasFocus: this.props.calendarHasFocus,
        onPrevDay: this.handlePrevDay,
        onNextDay: this.handleNextDay,
        onPrevWeek: this.handlePrevWeek,
        onNextWeek: this.handleNextWeek,
        onCancel: this.handleCancel }));
      date = _utilities.DateUtil.addDays(date, 1);
    }

    return _react2.default.createElement(
      'tr',
      { className: 'week', key: days[0].toString() },
      days
    );
  }
});