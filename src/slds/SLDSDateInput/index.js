import React, { Component } from 'react';
import SLDSPopover from '../SLDSPopover/index';
import SLDSDatePicker from './SLDSDatePicker/index';
import moment from 'moment';

export default class SLDSSuggest extends Component {

  handleSelectDate(day) {
    this.setState({selectedDate:day})
  }

  handleClose() {
    this.setState({isOpen:false})
  }

  handleClick() {
    this.setState({isOpen:true})
  }

  handleFocus() {
    this.setState({isOpen:true})
  }

  handleBlur() {
//    this.setState({isOpen:false})
  }

  popover() {
    if(this.state && this.state.isOpen){
      return <SLDSPopover targetElement={this.refs.date}>
        <SLDSDatePicker 
          onClose={this.handleClose.bind(this)}
          onSelectDate={this.handleSelectDate.bind(this)}
          selected={this.state.selectedDate} 
          month={this.state.selectedDate?this.state.selectedDate:moment()} />
      </SLDSPopover>;
    }
    return <span />;
  }
  render() {
    return (
      <div className="sds-form-element">
        <label className="sds-form-element__label" for="date">Date Picker Label</label>
        <div className="sds-form-element__control">
          <div className="sds-input-has-icon sds-input-has-icon--right">
            <input 
              ref="date" 
              className="sds-input" 
              type="text" 
              placeholder="Pick a Date" 
              label="Date Picker Label" 
              onClick={this.handleClick.bind(this)}
              onFocus={this.handleFocus.bind(this)} 
              onBlur={this.handleBlur.bind(this)} />
          </div>
        </div>
        {this.popover()}
      </div>
    );
  }
}