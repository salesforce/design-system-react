import React, { Component } from 'react';

var Day = React.createClass({


  render: function() {

    return <td 
              key={this.props.day.date.toString()}
              role="gridcell" 
              aria-disabled={this.props.day.isCurrentMonth}
              aria-selected={this.props.day.isToday}
              className={"sds-day" + (this.props.day.isToday ? " sds-is-today" : "") + (this.props.day.isCurrentMonth ? "" : " sds-disabled-text") + (this.props.day.date.isSame(this.props.selected) ? " sds-is-selected" : "")} 
              onClick={this.props.onSelect.bind(null, this.props.day)}
            >
          <span className="sds-day">
            {this.props.day.number}
          </span>
      </td>
  }
});

module.exports = Day;