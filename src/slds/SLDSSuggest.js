import React, { Component } from 'react';
import SLDSDatePicker from './SLDSDatePicker';


export default class SLDSSuggest extends Component {
  handleFocus() {
    console.log('yes!');
    this.setState({isOpen:true})
  }
  handleBlur() {
    console.log('yes!');
    this.setState({isOpen:false})
  }
  popover() {
    if(this.state && this.state.isOpen){
      return <SLDSDatePicker>
        <div style={{backgroundColor:'green'}}>!!AAA!!</div>
        <div style={{backgroundColor:'green'}}>!!AAA!!</div>
        <div style={{backgroundColor:'green'}}>!!AAA!</div>
        <div style={{backgroundColor:'green'}}>!!AAA!</div>
        <div style={{backgroundColor:'green'}}>!!AAA!</div>
        <div style={{backgroundColor:'green'}}>!!AAA!</div>
        <div style={{backgroundColor:'green'}}>!!AAA!</div>
      </SLDSDatePicker>;
    }
    return null;
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