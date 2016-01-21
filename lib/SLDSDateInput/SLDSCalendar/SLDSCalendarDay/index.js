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

var _utils = require('../../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _react2.default.createClass({
  displayName: 'exports',
  getDefaultProps: function getDefaultProps() {
    return {

      displayedDate: new Date(),

      selectedDate: new Date(),

      onSelectDate: function onSelectDate(date) {
        console.log('onSelectDate should be defined ', date);
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
      },
      onCancel: function onCancel() {
        console.log('onCancel should be defined');
      }
    };
  },
  handleClick: function handleClick(event) {
    if (this.props.onSelectDate) {
      this.props.onSelectDate(this.props.date);
    }
    if (event.nativeEvent) {
      event.nativeEvent.stopImmediatePropagation();
      event.nativeEvent.preventDefault();
    }
  },
  handleToPrevDay: function handleToPrevDay() {
    if (this.props.onPrevDay) {
      this.props.onPrevDay(this.props.date);
    }
  },
  handleToNextDay: function handleToNextDay() {
    if (this.props.onNextDay) {
      this.props.onNextDay(this.props.date);
    }
  },
  handleToPrevWeek: function handleToPrevWeek() {
    console.log('>>> handleToPrevWeek');
    if (this.props.onPrevWeek) {
      console.log('>>> this.props.onPrevWeek');
      this.props.onPrevWeek(this.props.date);
    }
  },
  handleToNextWeek: function handleToNextWeek() {
    console.log('>>> handleToNextWeek');
    if (this.props.onNextWeek) {
      console.log('>>> this.props.onNextWeek');
      this.props.onNextWeek(this.props.date);
    }
  },
  handleKeyDown: function handleKeyDown(event) {
    if (event.keyCode) {
      if (event.keyCode === _utils.KEYS.ENTER || event.keyCode === _utils.KEYS.SPACE) {
        _utils.EventUtil.trapEvent(event);
        if (this.props.onSelectDate) {
          this.props.onSelectDate(this.props.date);
        }
      } else if (event.keyCode === _utils.KEYS.ESCAPE) {
        _utils.EventUtil.trapEvent(event);
        if (this.props.onCancel) {
          this.props.onCancel();
        }
      } else if (event.keyCode === _utils.KEYS.TAB) {
        if (!event.shiftKey) {
          _utils.EventUtil.trapEvent(event);
          if (this.props.onCancel) {
            this.props.onCancel();
          }
        }
      } else if (event.keyCode === _utils.KEYS.RIGHT) {
        _utils.EventUtil.trapEvent(event);
        this.handleToNextDay();
      } else if (event.keyCode === _utils.KEYS.LEFT) {
        _utils.EventUtil.trapEvent(event);
        this.handleToPrevDay();
      } else if (event.keyCode === _utils.KEYS.RIGHT) {
        _utils.EventUtil.trapEvent(event);
        this.handleToNextDay();
      } else if (event.keyCode === _utils.KEYS.UP) {
        _utils.EventUtil.trapEvent(event);
        this.handleToPrevWeek();
      } else if (event.keyCode === _utils.KEYS.DOWN) {
        _utils.EventUtil.trapEvent(event);
        this.handleToNextWeek();
      } else {
        _utils.EventUtil.trapEvent(event);
      }
    }
  },
  setFocus: function setFocus() {
    this.getDOMNode().focus();
  },
  render: function render() {

    var isCurrentMonth = _utils.DateUtil.isSameMonth(this.props.date, this.props.displayedDate);
    var isToday = _utils.DateUtil.isToday(this.props.date);
    var isSelectedDay = _utils.DateUtil.isSameDay(this.props.date, this.props.selectedDate);
    var isFirstDayOfMonth = _utils.DateUtil.isFirstDayOfMonth(this.props.date);

    return _react2.default.createElement(
      'td',
      { role: 'gridcell',
        'aria-disabled': !isCurrentMonth,
        'aria-selected': isSelectedDay,
        autoFocus: this.props.focused,
        tabIndex: isCurrentMonth && isFirstDayOfMonth && this.props.focused ? 0 : -1,
        className: (isToday ? ' slds-is-today' : '') + (isCurrentMonth ? '' : ' slds-disabled-text') + (isSelectedDay ? ' slds-is-selected' : ''),
        onClick: this.handleClick,
        onMouseDown: this.handleClick,
        onKeyDown: this.handleKeyDown },
      _react2.default.createElement(
        'span',
        { className: 'slds-day' },
        this.props.date.getDate()
      )
    );
  },
  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    if (this.props.focused && !prevProps.focused) {
      this.setFocus();
    }
  }
});