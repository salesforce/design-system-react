import React, { Component } from 'react';
import SLDSPopover from './SLDSPopover';
import SLDSDatePicker from './SLDSDatePicker';


export default class SLDSSuggest extends Component {
  handleFocus() {
    this.setState({isOpen:true})
  }
  handleBlur() {
    this.setState({isOpen:false})
  }
  popover() {
    if(this.state && this.state.isOpen){
      return <SLDSPopover>
{/*
        <div style={{backgroundColor:'green'}}>!!AAA!!</div>
        <div style={{backgroundColor:'green'}}>!!AAA!!</div>
        <div style={{backgroundColor:'green'}}>!!AAA!</div>
        <div style={{backgroundColor:'green'}}>!!AAA!</div>
        <div style={{backgroundColor:'green'}}>!!AAA!</div>
        <div style={{backgroundColor:'green'}}>!!AAA!</div>
        <div style={{backgroundColor:'green'}}>!!AAA!</div>
*/}
        <SLDSDatePicker />
      </SLDSPopover>;
    }
    return <span />;
  }
  render() {
    return (
      <section>
        <input type="text" 
          onFocus={this.handleFocus.bind(this)} 
          onBlur={this.handleBlur.bind(this)}></input>
        {this.popover()}
      </section>
    );
  }
}