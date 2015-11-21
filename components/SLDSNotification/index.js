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
  onDismiss: React.PropTypes.func,
  texture: React.PropTypes.bool,
  theme: React.PropTypes.oneOf(["success", "warning", "error", "offline"]),
  variant: React.PropTypes.oneOf(["alert", "toast"]),
};

const defaultProps = {
  dismissible: true,
};

class SLDSNotification extends React.Component {
  constructor(props){
    super(props);
    this.state = { isOpen: true };
  }

  componentDidMount() {
    if(this.props.duration) {
      const that = this;
      setTimeout(function() {
        that.setState({ isOpen: false});
      }, that.props.duration);
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
    let that = this;
    if(this.props.dismissible){
      let size = "";
      if(this.props.variant === "alert") {
        size = "medium";
      }
      else if(this.props.variant === "toast") {
        size = "large";
      }
      return <SLDSButton
            assistiveText="Click enter to dismiss Notification"
            variant="icon-inverse"
            iconName="close"
            iconSize={size}
            inverse={true}
            className="slds-button slds-notify__close"
            onClick={that.onDismiss.bind(that)}
          />
    }
  }

  onDismiss(){
    if(this.props.onDismiss) this.props.onDismiss();
    this.setState({isOpen: false});
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
      [`slds-notify--${this.props.variant}`]: this.props.variant,
      [`slds-theme--${this.props.theme}`]: this.props.theme,
      [`slds-theme--alert-texture-animated`]: this.props.texture,
    });
  }

  render(){
    if(this.state.isOpen){
      return (
        <div className="slds-notify-container">
          <div className={this.getClassName()} role="alert">
            <span className="slds-assistive-text">{this.props.theme}</span>
            {this.renderClose()}
            {this.renderAlertContent()}
            {this.renderToastContent()}
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

