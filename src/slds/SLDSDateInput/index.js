import React, { Component } from 'react';
import SLDSPopover from '../SLDSPopover/index';
import SLDSDatePicker from './SLDSDatePicker/index';
import Moment from 'moment';

module.exports = React.createClass( {

  getDefaultProps(){
    return {
      selected: null,
      placeholder: 'Pick a Date',
      format: 'MM/DD/YYYY'
    }
  },

  getInitialState(){
    return {
      selected:this.props.selected
    };
  },

  handleChange(moment) {
    this.setState({
      selected:moment,
      isOpen:false
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
      return <SLDSPopover targetElement={this.refs.date} onClose={this.handleClose.bind(this)}>
        <SLDSDatePicker 
          onChange={this.handleChange.bind(this)}
          selected={this.state.selected} 
          month={this.state.selected?this.state.selected:Moment()} />
      </SLDSPopover>;
    }
    return <span />;
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
              value={this.state.selected?this.state.selected.format(this.props.format):''}
              onClick={this.handleClick}
              onFocus={this.handleFocus}/>
          </div>
        </div>
        {this.popover()}
      </div>
    );
  }
});