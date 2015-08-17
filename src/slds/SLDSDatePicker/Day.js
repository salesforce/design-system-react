import React, { Component } from 'react';

var Day = React.createClass({
  render: function() {

    return <td role="gridcell" aria-disabled="true">
        <span 
          key={this.props.day.date.toString()} 
          className={"sds-day" + (this.props.day.isToday ? " sds-is-selected" : "") + (this.props.day.isCurrentMonth ? "" : " different-month") + (this.props.day.date.isSame(this.props.selected) ? " selected" : "")} 
          ariaSelected={this.props.day.isToday}
          onClick={this.props.onSelect.bind(null, this.props.day)}>
            {this.props.day.number}
          </span>
      </td>
  }
});

module.exports = Day;