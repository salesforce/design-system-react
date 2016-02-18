/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import TetherDrop from 'tether-drop';
import {EventUtil,KEYS} from './utils';
//import { TransitionSpring, Spring } from 'react-motion';

module.exports = React.createClass( {

  displayName: 'SLDSPopover',

  mixins: [ require( 'react-onclickoutside' ) ],

  handleClickOutside () {
    this.handleClose();
  },

  handleClose () {
    if(this.props.onClose){
      this.props.onClose();
    }
  },

  propTypes: {
//    targetAttachment: React.PropTypes.string,
  },

  getDefaultProps () {
    return {
      verticalAlign: 'bottom',
      horizontalAlign: 'left',
      className: 'slds-dropdown',
      closeOnTabKey: false,
      marginTop:'0.20rem',
      marginBottom:'0.35rem',
      marginLeft:0,
      marginRight:0,
      flippable:true,
      constrainToScrollParent:false,
      inheritTargetWidth: false
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

  handleKeyDown (event) {
    if(event.keyCode === KEYS.TAB){
      if(this.props.closeOnTabKey){
        EventUtil.trap(event);
        this.handleClose();
      }
    }
  },

  handleMouseEnter (event) {
    if(this.props.onMouseEnter){
      this.props.onMouseEnter(event);
    }
  },

  handleMouseLeave (event) {
    if(this.props.onMouseLeave){
      this.props.onMouseLeave(event);
    }
  },

  popoverComp () {
    if(!this.state.isOpen){
      return <span></span>;
    }
    const style = {
      transform:'none',
      WebkitTransform:'none',
      'marginTop':this.props.marginTop,
      'marginBottom':this.props.marginBottom,
      'marginLeft':this.props.marginLeft,
      'marginRight':this.props.marginRight,
      'float':'inherit',
      'position':'inherit'
    }
    if (this.props.inheritTargetWidth)  {
      style.width = this.target().getBoundingClientRect().width
    }

    return (
      <div className={'SLDSPopover ignore-react-onclickoutside '+this.props.className}
        style={style}
        onKeyDown={this.handleKeyDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
{
                this.props.children
              }
      </div>
    );

  },

  beforeClose (){
  },

  getHorizontalAlign (align) {
    if (align.indexOf('left')>-1) {
      return 'left';
    }
    else if (align.indexOf('right')>-1) {
      return 'right';
    }
    return 'center';
  },

  getVerticalAlign (align) {
    if (align.indexOf('bottom')>-1) {
      return 'bottom';
    }
    else if (align.indexOf('top')>-1) {
      return 'top';
    }
    return 'middle';
  },

  isHorizontalAlign (align) {
    if (align === 'left') {
      return true;
    }
    else if (align === 'right') {
      return true;
    }
    else if (align === 'center') {
      return true;
    }
  },

  isVerticalAlign (align) {
    if (align === 'bottom') {
      return true;
    }
    else if (align === 'top') {
      return true;
    }
    else if (align === 'middle') {
      return true;
    }
  },

  getPosition () {

    if(this.props.align){


    let align = [];
    if(this.props.align){
      const splits = this.props.align.split(' ');
      if(this.isHorizontalAlign(splits[0])){
        const verticalAlign = splits.length > 1?this.getVerticalAlign(splits[1]):this.getVerticalAlign('');
        align = [
          this.getHorizontalAlign(splits[0]),
          verticalAlign
        ];
      }
      else {
        const horizontalAlign = splits.length > 1?this.getHorizontalAlign(splits[1]):this.getHorizontalAlign('');
        align = [
          this.getVerticalAlign(splits[0]),
          horizontalAlign
        ];
      }
    }
    return align.join(' ');
    }

    let positions = [];
    if (this.props.verticalAlign === 'top' || this.props.verticalAlign === 'bottom') {
      positions.push(this.props.verticalAlign);
      positions.push(this.props.horizontalAlign);
    }
    else {
      positions.push(this.props.horizontalAlign);
      positions.push(this.props.verticalAlign);
    }
    return positions.join(' ');
  },

  target () {
    return this.props.targetElement?ReactDOM.findDOMNode(this.props.targetElement):ReactDOM.findDOMNode(this).parentNode;
  },

  dropOptions () {
    const position = this.getPosition();

    return {
      beforeClose:this.beforeClose,
      classes: this.props.dropClass,
      constrainToWindow:this.props.flippable,
      constrainToScrollParent:this.props.constrainToScrollParent,
      content: this.popoverElement,
      openOn: 'always',
      position: position,
      remove:true,
      target: this.target()
    };
  },

  handleOpen () {
    this.setState({isOpen:true});
  },

  renderPopover () {

    ReactDOM.render( this.popoverComp(), this.popoverElement );

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
    ReactDOM.unmountComponentAtNode( this.popoverElement );
    if ( this.popoverElement.parentNode ) {
      this.popoverElement.parentNode.removeChild( this.popoverElement );
    }
    if(this.props.onClose){
      this.props.onClose();
    }
  },

  render () {
    return <noscript></noscript>;
  }

} );

