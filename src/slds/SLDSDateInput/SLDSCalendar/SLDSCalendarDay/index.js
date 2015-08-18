import React, { Component } from 'react';

var Day = React.createClass({

  handleClick: function() {
    if(this.props.onSelectDate){
      console.log('>>> DAY: ',this.props.day);
      this.props.onSelectDate(this.props.day);
    }
  },

  render: function() {

    return (
      <td 
        key={this.props.day.date.toString()}
        role="gridcell" 
        aria-disabled={this.props.day.isCurrentMonth}
        aria-selected={this.props.day.isToday}
        className={(this.props.day.isToday ? " sds-is-today" : "") + (this.props.day.isCurrentMonth ? "" : " sds-disabled-text") + (this.props.day.date.isSame(this.props.selectedDate.date) ? " sds-is-selected" : "")} 
        onClick={this.handleClick}
      >
        <span className="sds-day">
          {this.props.day.number}
        </span>
      </td>
    );
  }
});

module.exports = Day;