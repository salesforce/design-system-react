import React, { Component } from 'react';
import Week from './SLDSCalendarWeek/index';
import moment from 'moment';

module.exports = React.createClass({

  displayName: "SLDSCalendar",

  getDefaultProps: function(){
    return {
      month:moment(),
      selected:moment()
    };
  },

  handleSelectDate: function(day) {
    this.setState({selected:day});
    if(this.props.onSelectDate){
      this.props.onSelectDate(day);
    }
  },

  render: function() {
    return <div className="SLDSCalendar">
      <table className="datepicker__month" role="grid" aria-labelledby="month" tabIndex="0">
        <thead>
          <tr ref="weekdays">
            <th ref="Sunday">
              <abbr title="Sunday">S</abbr>
            </th>
            <th ref="Monday">
              <abbr title="Monday">M</abbr>
            </th>
            <th ref="Tuesday">
              <abbr title="Tuesday">T</abbr>
            </th>
            <th ref="Wednesday">
              <abbr title="Wednesday">W</abbr>
            </th>
            <th ref="Thursday">
              <abbr title="Thursday">T</abbr>
            </th>
            <th ref="Friday">
              <abbr title="Friday">F</abbr>
            </th>
            <th ref="Saturday">
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
    var extra = 0;
    while(weeks.length < 6){
      weeks.push(<tr key={'extra_'+extra++} className="week"><td><span className="slds-day">&nbsp;</span></td></tr>);
    }

    return weeks;
  },


});