import React, { Component } from 'react';
import Week from './SLDSCalendarWeek/index';
import moment from 'moment';

require('./index.css');

var Calendar = React.createClass({

  getDefaultProps: function(){
    return {
      month:moment(),
      selected:moment()
    };
  },

  handleSelectDate: function(day) {
    console.log('>>> MONTH: ',day);
    this.setState({selected:day});
//    this.forceUpdate();
    if(this.props.onSelectDate){
      this.props.onSelectDate(day);
    }
  },

  render: function() {
    console.log('RENDER CALENDAR: ',this.props.selected)
    return <div className="SLDSCalendar">
      <table className="datepicker__month" role="grid" aria-labelledby="month" tabIndex="0">
        <thead>
          <tr id="weekdays">
            <th id="Sunday">
              <abbr title="Sunday">S</abbr>
            </th>
            <th id="Monday">
              <abbr title="Monday">M</abbr>
            </th>
            <th id="Tuesday">
              <abbr title="Tuesday">T</abbr>
            </th>
            <th id="Wednesday">
              <abbr title="Wednesday">W</abbr>
            </th>
            <th id="Thursday">
              <abbr title="Thursday">T</abbr>
            </th>
            <th id="Friday">
              <abbr title="Friday">F</abbr>
            </th>
            <th id="Saturday">
              <abbr title="Saturday">S</abbr>
            </th>
          </tr>
        </thead>
        <tbody>
          {this.renderWeeks()}
        </tbody>
      </table>
    </div>;
  },

  renderWeeks: function() {
    var weeks = [],
      done = false,
      date = this.props.month.clone().startOf("month").add("w" -1).day("Sunday"),
      monthIndex = date.month(),
      count = 0;

    while (!done) {
      weeks.push(<Week 
          key={date.toString()} 
          date={date.clone()} 
          month={this.props.month} 
          onSelectDate={this.handleSelectDate} 
          selectedDate={this.props.selected} />);
      date.add(1, "w");
      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }
    while(weeks.length < 6){
      weeks.push(<tr className="week"><td><span className="sds-day">&nbsp;</span></td></tr>);
    }

    return weeks;
  },


});

module.exports = Calendar;