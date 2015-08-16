import React, { Component } from 'react';
import SLDSPopover from './SLDSPopover';


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
      return <SLDSPopover><div style={{backgroundColor:'green'}}>!!AAA!</div></SLDSPopover>
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