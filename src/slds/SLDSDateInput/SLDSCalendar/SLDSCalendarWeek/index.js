import React, { Component } from 'react';

import Day from '../SLDSCalendarDay/index';

var Week = React.createClass({

  handleSelectDate: function(day){
    if(this.props.onSelectDate){
      this.props.onSelectDate(day);
    }
  },

  render: function() {
    var days = [],
      date = this.props.date,
      month = this.props.month;

    for (var i = 0; i < 7; i++) {
      var day = {
        name: date.format("dd").substring(0, 1),
        number: date.date(),
        isCurrentMonth: date.month() === month.month(),
        isToday: date.isSame(new Date(), "day"),
        date: date
      };
      days.push(<Day 
          day={day} 
          selectedDay={this.props.selectedDay}
          onSelectDate={this.handleSelectDate}/>);
      date = date.clone();
      date.add(1, "d");

    }

    return <tr className="week" key={days[0].toString()}>
      {days}
    </tr>
  }
});

module.exports = Week;