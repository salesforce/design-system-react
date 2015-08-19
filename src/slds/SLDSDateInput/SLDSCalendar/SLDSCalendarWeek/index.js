import React, { Component } from 'react';

import Day from '../SLDSCalendarDay/index';

module.exports = React.createClass({

  handleSelectDate: function(day){
    if(this.props.onSelectDate){
      this.props.onSelectDate(day);
    }
  },

  render: function() {
    var days = [];
    var date = this.props.date;
    for (var i = 0; i < 7; i++) {
      days.push(<Day 
          key={date.toString()}
          date={date} 
          month={this.props.month}
          selected={this.props.selectedDate}
          onSelectDate={this.handleSelectDate}/>);
      date = date.clone();
      date.add(1, "d");
    }

    return <tr className="week" key={days[0].toString()}>
      {days}
    </tr>
  }
});
