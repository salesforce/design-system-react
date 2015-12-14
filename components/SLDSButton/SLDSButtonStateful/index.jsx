/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React from "react";
import {ButtonIcon} from '../../SLDSIcons';
const classNames = require("classnames");

const displayName = "SLDSButtonStateful";
const propTypes = {
  /**
   * text that is visually hidden but read aloud by screenreaders to tell the user what the icon means.
   * If the button has an icon and a visible label, you can omit the assistiveText prop and use the label prop.
   */
  assistiveText: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  iconName: React.PropTypes.string,
  iconSize: React.PropTypes.string,
  /**
   * join - join, member, leave
   * follow - follow, following, unfollow
   * icon - "selected", "unselect", "not selected" communicated through background color
   */
  type: React.PropTypes.oneOf(["join", "follow", "icon"]),
  variant: React.PropTypes.oneOf(["base", "neutral", "brand", "destructive", "icon", "inverse", "icon-inverse"]),
};
const defaultProps = {};

class SLDSButtonStateful extends React.Component {

  constructor(props) {
    super(props);
    this.state = {active: false};
  }

  handleClick() {
    this.setState({ active: !this.state.active });
  }

  getClassName() {
    return classNames(this.props.className, "slds-button", {
      ["slds-button--neutral"]: this.props.type !== "icon",
      ["slds-button--inverse"]: this.props.variant === "inverse",
      ["slds-not-selected"]: !this.state.active,
      ["slds-is-selected"]: this.state.active,
      ["slds-button--icon-border"]: this.props.type === "icon",
    });
  }

  render() {
    if(this.props.type === "follow") {
      return (
        <button className={this.getClassName()} aria-live="assertive" onClick={this.handleClick.bind(this)}>
          <span className="slds-text-not-selected">
            <ButtonIcon disabled={this.props.disabled} name="add" size="small" position="left" className="slds-button__icon--stateful" />
            Follow
          </span>
          <span className="slds-text-selected">
            <ButtonIcon disabled={this.props.disabled} name="check" size="small" position="left" className="slds-button__icon--stateful"  />
            Following
          </span>
          <span className="slds-text-selected-focus">
            <ButtonIcon disabled={this.props.disabled} name="close" size="small" position="left" className="slds-button__icon--stateful"  />
            Unfollow
          </span>
        </button>
      )
    }
    else if(this.props.type === "join") {
      return (
        <button className={this.getClassName()} aria-live="assertive" onClick={this.handleClick.bind(this)}>
          <span className="slds-text-not-selected">
            <ButtonIcon disabled={this.props.disabled} name="add" size="small" position="left" className="slds-button__icon--stateful" />
            Join
          </span>
          <span className="slds-text-selected">
            <ButtonIcon disabled={this.props.disabled} name="check" size="small" position="left" className="slds-button__icon--stateful"  />
            Member
          </span>
          <span className="slds-text-selected-focus">
            <ButtonIcon disabled={this.props.disabled} name="close" size="small" position="left" className="slds-button__icon--stateful"  />
            Leave
          </span>
        </button>
      )
    }
    else if(this.props.type === "icon") {
      return (
        <button className={this.getClassName()} onClick={this.handleClick.bind(this)}>
          <ButtonIcon disabled={this.props.disabled} name={this.props.iconName} size={this.props.iconSize} assistiveText={this.props.assistiveText} className="slds-button__icon--stateful"  />
        </button>
      )
    }
    else {
      return (
        <div className="">SLDS Stateful Button needs proper type prop: follow, join, or icon.</div>
      )
    }

  }
}

SLDSButtonStateful.displayName = displayName;
SLDSButtonStateful.propTypes = propTypes;
SLDSButtonStateful.defaultProps = defaultProps;

module.exports = SLDSButtonStateful;

