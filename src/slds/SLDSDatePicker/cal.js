import React, { Component } from 'react';
import Week from './Week';

var Calendar = React.createClass({
  getInitialState: function() {
    return {
      month: this.props.selected.clone()
    };
  },

  previous: function() {
    var month = this.state.month;
    month.add(-1, "M");
    this.setState({ month: month });
  },

  next: function() {
    var month = this.state.month;
    month.add(1, "M");
    this.setState({ month: month });
  },

  select: function(day) {
    this.props.selected = day.date;
    this.forceUpdate();
  },

  render: function() {
    return <div>
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
      date = this.state.month.clone().startOf("month").add("w" -1).day("Sunday"),
      monthIndex = date.month(),
      count = 0;

    while (!done) {
      weeks.push(<Week key={date.toString()} date={date.clone()} month={this.state.month} select=    {this.select} selected={this.props.selected} />);
      date.add(1, "w");
      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }

    return weeks;
  },


});

module.exports = Calendar;