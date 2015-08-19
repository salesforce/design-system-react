import React, { Component } from 'react';
import SLDSPopover from '../SLDSPopover/index';
import SLDSDatePicker from './SLDSDatePicker/index';
import Moment from 'moment';

module.exports = React.createClass( {

  getDefaultProps(){
    return {
      string:'',
      selected: null,
      placeholder: 'Pick a Date',
      format: 'MM/DD/YYYY'
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
      this.setState({
        selected:Moment(string,this.props.format),
        string:string
      });
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
      <div className="sds-form-element">
        <label className="sds-form-element__label" htmlFor="date">{this.props.label}</label>
        <div className="sds-form-element__control">
          <div className="sds-input-has-icon sds-input-has-icon--right">
            <input 
              name="date"
              ref="date" 
              className="sds-input" 
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