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
        role="gridcell" 
        aria-disabled={isCurrentMonth}
        aria-selected={isToday}
        className={(isToday ? " slds-is-today" : "") + (isCurrentMonth ? "" : " slds-disabled-text") + (this.props.date.isSame(this.props.selected) ? " slds-is-selected" : "")} 
        onClick={this.handleClick}
      >
        <span className="slds-day">
          {this.props.date.date()}
        </span>
      </td>
    );
  }
});
