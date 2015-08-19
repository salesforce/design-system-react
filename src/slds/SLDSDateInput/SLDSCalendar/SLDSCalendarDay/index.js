import React, { Component } from 'react';

module.exports = React.createClass({

  handleClick: function() {
    if(this.props.onSelectDate){
      this.props.onSelectDate(this.props.date);
    }
  },

  render: function() {

    var isCurrentMonth = this.props.date.month() === this.props.month.month();
    var isToday = this.props.date.isSame(new Date(), "day");

    return (
      <td 
        key={this.props.date.toString()}
        role="gridcell" 
        aria-disabled={isCurrentMonth}
        aria-selected={isToday}
        className={(isToday ? " sds-is-today" : "") + (isCurrentMonth ? "" : " sds-disabled-text") + (this.props.date.isSame(this.props.selected.date) ? " sds-is-selected" : "")} 
        onClick={this.handleClick}
      >
        <span className="sds-day">
          {this.props.date.date()}
        </span>
      </td>
    );
  }
});
