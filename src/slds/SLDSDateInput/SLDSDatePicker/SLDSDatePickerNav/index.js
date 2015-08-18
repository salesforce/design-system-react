import React, { Component } from 'react';
import moment from 'moment';
import SLDSSelect from '../../../SLDSSelect/index';

module.exports = React.createClass( {

  getDefaultProps: function(){
    return {
      selectedMoment:moment(),
      month:moment(),
      onChangeMonth:function(){
        console.log('onChangeMonth should be defined');
      }
    }
  },

  handleClick: function(event){
    event.preventDefault();
    event.stopPropagation();
  },

  handleChangeMonth: function(moment){
    if(this.props.onChangeMonth){
      this.props.onChangeMonth(moment);
    }
  },

  previousMonth: function(event){
    event.preventDefault();
    event.stopPropagation();
    if(this.props.selectedMoment && this.handleChangeMonth){
      this.props.selectedMoment.subtract(1, 'months');
      this.handleChangeMonth(this.props.selectedMoment)
    }
  },

  nextMonth: function(event){
    event.preventDefault();
    event.stopPropagation();
    if(this.props.selectedMoment && this.handleChangeMonth){
      this.props.selectedMoment.add(1, 'months');
      this.handleChangeMonth(this.props.selectedMoment)
    }
  },

  render() {
    return (

      <div className="sds-datepicker__filter sds-grid">
        <div className="sds-datepicker__filter--month sds-grid sds-grid--align-spread sds-size--3-of-4">
          <div className="sds-align-middle" role="button" aria-labelledby="bn_prev-label" tabIndex="0">
            <button className="sds-button sds-button--icon-container" onClick={this.previousMonth}>
              <span style={{color:'black'}}>&laquo;</span>
              <span className="sds-assistive-text">Previous Month</span>
            </button>
          </div>

          <div id="month" className="sds-align-middle" role="heading" aria-live="assertive" aria-atomic="true">{this.props.month.format("MMMM YYYY")}</div>
          <div className="sds-align-middle" role="button" aria-labelledby="bn_next-label" tabIndex="0">
            <button className="sds-button sds-button--icon-container" onClick={this.nextMonth}>
              <span style={{color:'black'}}>&raquo;</span>
              <span className="sds-assistive-text">Next Month</span>
            </button>
          </div>
        </div>
        <div className="sds-picklist datepicker__filter--year sds-shrink-none">
          <SLDSSelect>
            <button id="year" className="sds-button sds-button--neutral sds-picklist__label" aria-haspopup="true" aria-expanded="false">2015
              <span style={{color:'black'}}>&nbsp;&nbsp;&darr;</span>
            </button>
          </SLDSSelect>
{/*

*/}
        </div>
      </div>

    );
  }
});

