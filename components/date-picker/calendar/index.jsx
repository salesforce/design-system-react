/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
'use strict';

import React from 'react';
import Week from './calendar-week/index';
import {EventUtil, DateUtil, KEYS} from '../../../utilities';

module.exports = React.createClass({

  displayName: 'Calendar',

  getDefaultProps () {
    return {
      displayedDate:new Date(),
      selectedDate:new Date(),
      weekDayLabels:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
      abbrWeekDayLabels:['S','M','T','W','T','F','S'],
      todayLabel:'Today',
      onSelectDate (date) {
        console.log('onSelectDate should be defined ',date);
      },

      onCancel () {
        console.log('onCancel should be defined');
      }

    };
  },

  getInitialState () {
    return {
      highlightedDate: DateUtil.firstDayOfMonth(this.props.displayedDate),
      hasFocus: false,
      todayFocus: false,
    };
  },

  handleSelectDate (day) {
    this.setState({selected:day});
    if(this.props.onSelectDate){
      this.props.onSelectDate(day);
    }
  },

  handleCancel () {
    if(this.props.onCancel){
      this.props.onCancel();
    }
  },

  handleChangeDisplayedDate (date) {
    if(this.props.onChange){
      this.props.onChange(date);
    }
  },

  handlePrevDay (date) {
    const prevDate = DateUtil.addDays(date,-1);
    if(!DateUtil.isSameMonth(prevDate,date)){
      this.handleChangeDisplayedDate(prevDate);
    }
    else{
      this.setState({highlightedDate:prevDate});
    }
  },

  handleNextDay (date) {
    const nextDate = DateUtil.addDays(date,1);
    if(!DateUtil.isSameMonth(nextDate,date)){
      this.handleChangeDisplayedDate(nextDate);
    }
    else{
      this.setState({highlightedDate:nextDate});
    }
  },

  handlePrevWeek (date) {
    const prevDate = DateUtil.addDays(date,-7);
    if(!DateUtil.isSameMonth(prevDate,date)){
      this.handleChangeDisplayedDate(prevDate);
    }
    else{
      this.setState({highlightedDate:prevDate});
    }
  },

  handleNextWeek (date) {
    const nextDate = DateUtil.addDays(date,7);
    if(!DateUtil.isSameMonth(nextDate,date)){
      this.handleChangeDisplayedDate(nextDate);
    }
    else{
      this.setState({highlightedDate:nextDate});
    }
  },

  handleTodaySelect () {
    this.handleSelectDate(new Date());
  },

  handleFocus () {
    if(!this.state.todayFocus){
      this.setState({hasFocus:true});
    }
  },

  handleBlur () {
    this.setState({hasFocus:false});
  },

  handleTodayFocus () {
    this.state.todayFocus = true;
  },

  handleTodayBlur () {
    this.state.todayFocus = false;
  },

  handleKeyDown(event) {
    if(event.keyCode){
      if(event.keyCode === KEYS.TAB){
        if(!event.shiftKey){
          EventUtil.trapEvent(event);
          if(this.props.onCancel){
            this.props.onCancel();
          }
        }
      }
    }
  },

  render () {
    return (<div className='Calendar'
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
      <table className='datepicker__month' role='grid' aria-labelledby='month'>
        <thead>
          <tr ref='weekdays'>
            <th ref='Sunday'>
              <abbr title={this.props.weekDayLabels[0]}>{this.props.abbrWeekDayLabels[0]}</abbr>
            </th>
            <th ref='Monday'>
              <abbr title={this.props.weekDayLabels[1]}>{this.props.abbrWeekDayLabels[1]}</abbr>
            </th>
            <th ref='Tuesday'>
              <abbr title={this.props.weekDayLabels[2]}>{this.props.abbrWeekDayLabels[2]}</abbr>
            </th>
            <th ref='Wednesday'>
              <abbr title={this.props.weekDayLabels[3]}>{this.props.abbrWeekDayLabels[3]}</abbr>
            </th>
            <th ref='Thursday'>
              <abbr title={this.props.weekDayLabels[4]}>{this.props.abbrWeekDayLabels[4]}</abbr>
            </th>
            <th ref='Friday'>
              <abbr title={this.props.weekDayLabels[5]}>{this.props.abbrWeekDayLabels[5]}</abbr>
            </th>
            <th ref='Saturday'>
              <abbr title={this.props.weekDayLabels[6]}>{this.props.abbrWeekDayLabels[6]}</abbr>
            </th>
          </tr>
        </thead>
        <tbody>
          {this.renderWeeks()}
          {this.renderToday()}
        </tbody>
      </table>
    </div>);
  },

  renderToday () {
    return <tr>
      <td
        colSpan="7"
        role="gridcell">
        <a href="javascript:void(0)"
          onFocus={this.handleTodayFocus}
          onBlur={this.handleTodayBlur}
          tabIndex="0"
          onKeyDown={this.handleKeyDown}
          className="slds-show--inline-block slds-p-bottom--x-small"
          onClick={this.handleTodaySelect} >
            {this.props.todayLabel}
          </a>
        </td>
    </tr>;
  },

  renderWeeks () {
    const firstDayOfMonth = DateUtil.firstDayOfMonth(this.props.displayedDate);

    let date = firstDayOfMonth;
    if(firstDayOfMonth.getDay()>0){
      const prevWeek = DateUtil.addWeeks(firstDayOfMonth,-1);
      const nextSunday = DateUtil.nearestWeekDay(prevWeek,0);
      date = nextSunday;
    }

    let weeks = [];
    let done = false;


    let monthIndex = date.getMonth();
    let count = 0;
    while (!done) {
      weeks.push(<Week
          key={date.toString()}
          date={date}
          month={this.props.month}
          onSelectDate={this.handleSelectDate}
          selectedDate={this.props.selectedDate}
          displayedDate={this.props.displayedDate}
          highlightedDate={this.state.highlightedDate}
          onPrevDay={this.handlePrevDay}
          onNextDay={this.handleNextDay}
          onPrevWeek={this.handlePrevWeek}
          onNextWeek={this.handleNextWeek}
          calendarHasFocus={this.state.hasFocus}
          onCancel={this.handleCancel} />);
      date = DateUtil.addWeeks(date,1);
      done = count++ > 2 && monthIndex !== date.getMonth();
      monthIndex = date.getMonth();
    }
    var extra = 0;
    while(weeks.length < 6){
      weeks.push(<tr key={'extra_'+extra++} className='week'><td><span className='slds-day'>&nbsp;</span></td></tr>);
    }

    return weeks;
  },

  componentDidUpdate (prevProps) {
    if( !DateUtil.isEqual(this.props.displayedDate,prevProps.displayedDate) ){
      this.setState({highlightedDate:this.props.displayedDate});
    }
  }

});
