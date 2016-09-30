/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

'use strict';

import React from 'react';

import Day from '../calendar-day/index';
import {DateUtil} from '../../../../utilities';


module.exports = React.createClass({

  getDefaultProps () {
    return {
      displayedDate:new Date(),
      selectedDate:new Date()
    };
  },

  handleSelectDate (day) {
    if(this.props.onSelectDate){
      this.props.onSelectDate(day);
    }
  },

  handleCancel () {
    if(this.props.onCancel){
      this.props.onCancel();
    }
  },

  handlePrevDay (date) {
    if(this.props.onPrevDay){
      this.props.onPrevDay(date);
    }
  },

  handleNextDay (date) {
    if(this.props.onNextDay){
      this.props.onNextDay(date);
    }
  },

  handlePrevWeek (date) {
    if(this.props.onPrevWeek){
      this.props.onPrevWeek(date);
    }
  },

  handleNextWeek (date) {
    if(this.props.onNextWeek){
      this.props.onNextWeek(date);
    }
  },

  render: function() {
    let days = [];
    let date = this.props.date;
    for (var i = 0; i < 7; i++) {
      days.push(<Day
          key={date.toString()}
          date={date}
          month={this.props.month}
          selectedDate={this.props.selectedDate}
          onSelectDate={this.handleSelectDate}
          displayedDate={this.props.displayedDate}
          highlightedDate={this.props.highlightedDate}
          focused={this.props.calendarHasFocus && DateUtil.isSameDay(this.props.highlightedDate, date)}
          calendarHasFocus={this.props.calendarHasFocus}
          onPrevDay={this.handlePrevDay}
          onNextDay={this.handleNextDay}
          onPrevWeek={this.handlePrevWeek}
          onNextWeek={this.handleNextWeek}
          onCancel={this.handleCancel} />);
        date = DateUtil.addDays(date,1);
    }

    return <tr className='week' key={days[0].toString()}>
      {days}
    </tr>
  }
});
