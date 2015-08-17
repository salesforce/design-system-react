import React, { Component } from 'react';
import SLDSPopover from '../SLDSPopover/index';
import SLDSDatePicker from './SLDSDatePicker';


export default class SLDSSuggest extends Component {



  handleClose() {
    console.log('close!');
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
      return <SLDSPopover targetElement={this.refs.date} onClose={this.handleClose.bind(this)}>
        <SLDSDatePicker />
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
{/*
            <svg aria-hidden="true" class="slds-input__icon slds-icon-text-default">
              <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#event"></use>
            </svg>
*/}

            <input 
              ref="date" 
              className="sds-input" 
              type="text" 
              placeholder="Pick a Date" 
              label="Date Picker Label" 
              onClick={this.handleClick.bind(this)}
              onFocus={this.handleFocus.bind(this)} 
              onBlur={this.handleBlur.bind(this)}
            />

          </div>
        </div>
        {this.popover()}

      </div>

    );
  }
}