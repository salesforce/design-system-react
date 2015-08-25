import React, { Component } from 'react';
import SLDSPopover from '../SLDSPopover';
import SLDSDatePicker from './SLDSDatePicker/index';
import Moment from 'moment';
import {InputIcon} from "./../SLDSIcons";

module.exports = React.createClass( {

  getDefaultProps(){
    return {
      string:'',
      selected: null,
      placeholder: 'Pick a Date',
      format: 'MM/DD/YYYY',
      onDateChange: function(moment){
        console.log('onDateChage should be defined');
      }
    }
  },

  getInitialState(){
    return {
      isOpen:false,
      selected:this.props.selected,
      string:this.props.selected?this.props.selected.format(this.props.format):null
    };
  },

  handleChange(moment) {
    this.setState({
      selected:moment,
      isOpen:false,
      string:moment.format(this.props.format)
    })
    if(this.props.onDateChange){
      this.props.onDateChange(moment)
    }
  },

  handleClose() {
    this.setState({isOpen:false})
  },

  handleClick() {
    this.setState({isOpen:true})
  },

  handleFocus() {
    this.setState({isOpen:true})
  },

  popover() {
    if(this.state && this.state.isOpen){
      return <SLDSPopover targetElement={this.refs.date} onClose={this.handleClose}>
        <SLDSDatePicker 
          onChange={this.handleChange}
          selected={this.state.selected} 
          month={this.state.selected?this.state.selected:Moment()} />
      </SLDSPopover>;
    }
    return <span />;
  },

  handleInputChange() {
    var string = this.refs.date.getDOMNode().value;
    if(Moment().isValid(string)){
      var selected = Moment(string,this.props.format);
      this.setState({
        selected:selected,
        string:string
      });
      if(this.props.onDateChage){
        this.props.onDateChange(selected)
      }
    }
    else{
      this.setState({
        selected:null,
        string:string
      });
    }
  },

  render() {
    return (
      <div className="slds-form-element">
        <label className="slds-form-element__label" htmlFor="date">{this.props.label}</label>
        <div className="slds-form-element__control">
          <div className="slds-input-has-icon slds-input-has-icon--right">
            <InputIcon name="event"/>
            <input 
              name="date"
              ref="date" 
              className="slds-input" 
              type="text" 
              placeholder={this.props.placeholder} 
              value={this.state.selected?this.state.string:''}
              onChange={this.handleInputChange}
              onClick={this.handleClick}
              onFocus={this.handleFocus}/>
          </div>
        </div>
        {this.popover()}
      </div>
    );
  }
});