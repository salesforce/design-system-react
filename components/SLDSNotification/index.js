/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React from "react";
const classNames = require("classnames");
import SLDSButton from "../SLDSButton";
import {Icon} from "../SLDSIcons";

const displayName = 'SLDSNotification';
const propTypes = {
  className: React.PropTypes.string,
  content: React.PropTypes.node,
  dismissible: React.PropTypes.bool,
  duration: React.PropTypes.number,
  icon: React.PropTypes.string,
  isOpen: React.PropTypes.bool,
  onDismiss: React.PropTypes.func,
  texture: React.PropTypes.bool,
  theme: React.PropTypes.oneOf(["success", "warning", "error", "offline"]),
  variant: React.PropTypes.oneOf(["alert", "toast"]),
};

const defaultProps = {
  dismissible: true,
  isOpen: false
};

class SLDSNotification extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      interval: null,
      revealForScreenreader: false,
    };
  }

  componentDidMount() {
    if(this.props.duration) {
      setTimeout(() => {
        this.onDismiss();
      }, this.props.duration)
    }
  }

  componentWillUnmount(){
    this.setState({
      interval: null
    });
  }

  componentWillReceiveProps(nextProps){
    if(this.props.isOpen !== nextProps.isOpen){
      if(nextProps.isOpen && !this.state.interval){
        this.setState({interval: setTimeout(() => {
          this.setState({revealForScreenreader: true});
        }, 500)})
      }
      //console.log('revealForScreen', this.state.revealForScreenreader);
    }
  }

  renderIcon(){
    if(this.props.icon){
      let classes = "";
      if(this.props.variant === "alert") {
        classes = "slds-m-right--x-small";
      }
      else if(this.props.variant === "toast") {
        classes = "slds-m-right--small slds-col slds-no-flex";
      }
      return <Icon category="utility" name={this.props.icon} size="small" className={classes} />;
    }
  }

  renderClose(){
    if(this.props.dismissible){
      let size = "";
      if(this.props.variant === "alert") {
        size = "medium";
      }
      else if(this.props.variant === "toast") {
        size = "large";
      }
      return <SLDSButton
            assistiveText="Dismiss Notification"
            variant="icon-inverse"
            iconName="close"
            iconSize={size}
            className="slds-button slds-notify__close"
            onClick={this.onDismiss.bind(this)}
          />
    }
  }

  onDismiss(){
    if(this.props.onDismiss) this.props.onDismiss();
    this.setState({
      revealForScreenreader: false,
      interval: null,
    });
  }

  renderAlertContent(){
    if(this.props.variant === "alert"){
      return(
          <h2>
            {this.renderIcon()}
            {this.props.content}
          </h2>
      );
    }
  }

  renderToastContent(){
    if(this.props.variant === "toast"){
      return(
        <section className="notify__content slds-grid">
          {this.renderIcon()}
          <div className="slds-col slds-align-middle">
          <h2 className="slds-text-heading--small ">{this.props.content}</h2>
          </div>
        </section>
      );
    }
  }

  getClassName() {
    return classNames(this.props.className, "slds-notify", {
      [`slds-transition-hide`]: !this.state.revealForScreenreader,
      [`slds-notify--${this.props.variant}`]: this.props.variant,
      [`slds-theme--${this.props.theme}`]: this.props.theme,
      [`slds-theme--alert-texture-animated`]: this.props.texture,
    });
  }

  renderContent() {
    if(this.state.revealForScreenreader) {
      return (
        <div>
          <p ref="test" className="slds-assistive-text">{this.props.theme}</p>
          {this.renderClose()}
          {this.renderAlertContent()}
          {this.renderToastContent()}
        </div>
      )
    }
    else {
      return (
        <div className="slds-hidden">
          Notification loading
        </div>
      )
    }
  }

  render(){
    if(this.props.isOpen){
      return (
        <div className="slds-notify-container">
          <div ref="alertContent" className={this.getClassName()} role="alert">
          {this.renderContent()}
          </div>
        </div>
      );
    }else{
      return null;
    }
  }
}

SLDSNotification.displayName = displayName;
SLDSNotification.propTypes = propTypes;
SLDSNotification.defaultProps = defaultProps;

module.exports = SLDSNotification;

