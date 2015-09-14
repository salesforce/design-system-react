/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

'use strict';

import React from "react";
import TetherDrop from "tether-drop";
import { TransitionSpring, Spring } from 'react-motion';

module.exports = React.createClass( {

  displayName: 'SLDSPopover',

  mixins: [ require( "react-onclickoutside" ) ],

  handleClickOutside (e) {
    if(this.props.onClose){
      this.props.onClose();
    }
  },

  propTypes: {
    targetAttachment: React.PropTypes.string,
  },

  getDefaultProps () {
    return {
      targetAttachment: "bottom left",
      className: "slds-dropdown"
    };
  },

  getInitialState () {
    return {
      isOpen: false
    }
  },

  componentWillMount () {

    this.popoverElement = document.createElement( "span" );
    document.querySelector( "body" ).appendChild( this.popoverElement );

  },

  componentDidMount () {
    this.renderPopover();
  },

  componentDidUpdate () {
    this.renderPopover();
  },



  handleClick (event){
    if(event.nativeEvent){
      event.nativeEvent.preventDefault();
      event.nativeEvent.stopPropagation();
    }
  },

  popoverComp () {
    if(!this.state.isOpen){
      return <span></span>;
    }
    return (
      <div className={'SLDSPopover '+this.props.className}
            style={{
              transform:'none',
              marginTop:'0.20rem',
              marginBottom:'0.35rem',
              float:'inherit',
              position:'inherit',
            }}>

        <Spring 
          defaultValue={{ val:0 }}
          endValue={{ val:1, config: [70, 10] }}>
          {currentVal => {
              return (<div style={{opacity:currentVal.val}}>{this.props.children}</div>);
            }.bind(this)
          }
        </Spring>
      </div>
    );

  },

  beforeClose (){
  },

  dropOptions () {
    let target = this.props.targetElement?this.props.targetElement.getDOMNode():this.getDOMNode().parentNode;
    return {
      target: target,
      content: this.popoverElement,
      position: this.props.targetAttachment,
      openOn: 'always',
      beforeClose:this.beforeClose,
      constrainToWindow:true,
      constrainToScrollParent:false,
      remove:true
    };
  },

  handleOpen () {
    this.setState({isOpen:true});
  },

  renderPopover () {

    React.render( this.popoverComp(), this.popoverElement );

    if(this.popoverElement && 
        this.popoverElement.parentNode && 
        this.popoverElement.parentNode.parentNode &&
        this.popoverElement.parentNode.parentNode.className &&
        this.popoverElement.parentNode.parentNode.className.indexOf('drop ') > -1 ){
      this.popoverElement.parentNode.parentNode.style.zIndex = 10001;
    }

    if ( this.drop != null ) {
      if(this.drop && this.drop){
        this.drop.position();
      }
    } else if ( window && document ) {
      this.drop = new TetherDrop( this.dropOptions() );
      this.drop.once('open', this.handleOpen)
    }
  },

  componentWillUnmount () {

    this.drop.destroy();
    React.unmountComponentAtNode( this.popoverElement );
    if ( this.popoverElement.parentNode ) {
      this.popoverElement.parentNode.removeChild( this.popoverElement );
    }
    if(this.props.onClose){
      this.props.onClose();
    }
  },

  render () {
    return <span></span>;
  }

} );

