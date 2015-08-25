import React, { Component } from 'react';
import moment from 'moment';
import SLDSSelectYear from '../../SLDSYearSelector/index';
import {ButtonIcon} from "./../../../SLDSIcons";

module.exports = React.createClass( {

  getDefaultProps: function(){
    return {
      selectedMoment:moment(),
      moment:moment(),
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

  handleYearSelect(moment) {
    if(this.props.onChangeMonth){
      this.props.onChangeMonth(moment);
    }
  },

  render() {
    return (

      <div className="slds-datepicker__filter slds-grid">
        <div className="slds-datepicker__filter--month slds-grid slds-grid--align-spread slds-size--3-of-4">
          <div className="slds-align-middle" role="button" aria-labelledby="bn_prev-label" tabIndex="0">
            <button className="slds-button slds-button--icon-container" onClick={this.previousMonth}>
              <ButtonIcon name="left"/>
              <span className="slds-assistive-text">Previous Month</span>
            </button>
          </div>

          <div id="month" className="slds-align-middle" role="heading" aria-live="assertive" aria-atomic="true">{this.props.moment.format("MMMM YYYY")}</div>
          <div className="slds-align-middle" role="button" aria-labelledby="bn_next-label" tabIndex="0">
            <button className="slds-button slds-button--icon-container" onClick={this.nextMonth}>
              <ButtonIcon name="right"/>
              <span className="slds-assistive-text">Next Month</span>
            </button>
          </div>
        </div>
        <div className="slds-picklist datepicker__filter--year slds-shrink-none">
          <SLDSSelectYear 
            moment={this.props.moment} 
            selected={this.props.selected} 
            onSelect={this.handleYearSelect} />
        </div>
      </div>

    );
  }
});

