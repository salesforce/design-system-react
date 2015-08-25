/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React from "react";
import TetherDrop from "tether-drop";
import { TransitionSpring, Spring } from 'react-motion';

module.exports = React.createClass( {

  displayName: "SLDSPopover",

  mixins: [ require( "react-onclickoutside" ) ],

  handleClickOutside: function(e) {
    if(this.props.onClose){
      this.props.onClose();
    }
  },

  propTypes: {
    targetAttachment: React.PropTypes.string,
  },

  getDefaultProps: function() {
    return {
      targetAttachment: "bottom left",
    };
  },

  componentWillMount: function() {


    var popoverContainer = document.createElement( "span" );
    popoverContainer.className = "datepicker__container";

    this.popoverElement = popoverContainer;

    document.querySelector( "body" ).appendChild( this.popoverElement );

  },

  componentDidMount: function() {
    this.renderPopover();
  },

  componentDidUpdate: function() {
    this.renderPopover();
  },

  handleClick: function(event){
    event.preventDefault();
    event.stopPropagation();
  },

  popoverComp: function() {
    var className = this.props.className;
    return (
      <div className={className} 
        onClick={this.handleClick} 
        onMousedown={this.handleClick} 
        onMouseup={this.handleClick}>
        <div className="slds-dropdown" 
              style={{
                transform:'none',
                marginTop:'0.25rem',
                marginBottom:'0.35rem',

              }}>

          <Spring 
            defaultValue={{ val:0 }}
            endValue={{ val:1, config: [70, 10] }}>
            {currentVal => {
                var style = {opacity:currentVal.val};
                return (<div style={style}>{this.props.children}</div>);
              }.bind(this)
            }
          </Spring>
        </div>
      </div>
    );

  },

  beforeClose: function(){
  },

  dropOptions: function() {
    let target = this.props.targetElement?this.props.targetElement.getDOMNode():this.getDOMNode().parentNode;
    return {
      target: target,
      content: this.popoverElement,
      position: this.props.targetAttachment,
      openOn: 'always',
      beforeClose:this.beforeClose,
      constrainToWindow:true,
      constrainToScrollParent:false
    };
  },

  renderPopover: function() {

    React.render( this.popoverComp(), this.popoverElement );

    if(this.popoverElement && 
        this.popoverElement.parentNode && 
        this.popoverElement.parentNode.parentNode &&
        this.popoverElement.parentNode.parentNode.className &&
        this.popoverElement.parentNode.parentNode.className.indexOf('drop ') > -1 ){
      this.popoverElement.parentNode.parentNode.style.zIndex = 10001;
    }

    if ( this.drop != null ) {
      if(this.drop.setOptions){
        this.drop.setOptions( this.dropOptions() );
      }
    } else if ( window && document ) {
      this.drop = new TetherDrop( this.dropOptions() );
    }
  },

  componentWillUnmount: function() {

    this.drop.destroy();
    React.unmountComponentAtNode( this.popoverElement );
    if ( this.popoverElement.parentNode ) {
      this.popoverElement.parentNode.removeChild( this.popoverElement );
    }
    if(this.props.onClose){
      this.props.onClose();
    }
  },

  render: function() {
    return <span></span>;
  }
} );

