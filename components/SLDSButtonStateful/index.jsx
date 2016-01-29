/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React from "react";
import ButtonIcon from '../SLDSIcon/ButtonIcon';
import SLDSTooltipTrigger from "../SLDSPopoverTooltip/trigger"
const classNames = require("classnames");
import omit from "lodash.omit";

const blurElement = e => e.currentTarget.blur()

const displayName = "SLDSButtonStateful";
const propTypes = {
  /**
   * Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means.
   * If the button has an icon and a visible label, you can omit the <code>assistiveText</code> prop and use the <code>label</code> prop.
   */
  assistiveText: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  /**
   * Name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon names.
   */
  iconName: React.PropTypes.string,
  iconSize: React.PropTypes.oneOf(["x-small", "small", "medium", "large"]),
  onClick: React.PropTypes.func,
  /**
   * If true, button scales to 100% width on small form factors
   */
  responsive: React.PropTypes.bool,
  /**
   * Write <code>"-1"</code> if you don't want the user to tab to the button.
   */
  tabIndex: React.PropTypes.string,
  /**
   * Initial label and icon (optional) of button.
   */
  stateOne: React.PropTypes.object,
  /**
   * Selected label and icon (optional) of button.
   */
  stateTwo: React.PropTypes.object,
  /**
   *  Deselect label and icon (optional) of button.
   */
  stateThree: React.PropTypes.object,
  tooltip: React.PropTypes.node,
  /**
   * Use <code>icon-inverse</code> for white icons.
   */
  variant: React.PropTypes.oneOf(["base", "neutral", "brand", "destructive", "icon", "inverse", "icon-inverse"]),
};
const defaultProps = {
  disabled: false,
  iconSize: "medium",
  responsive: false,
  stateOne: { iconName: "add", label: "Follow" },
  stateTwo: { iconName: "check", label: "Following" },
  stateThree: { iconName: "close", label: "Unfollow" },
};

/**
 * The SLDSButtonStateful component is a variant of the Lightning Design System Button component. It is used for buttons that have a state of unselected or selected.
 * For icon buttons, use <code>variant="icon"</code>. For buttons with labels or buttons with labels and icons, pass data to the state props (ie. <code>stateOne={{iconName: "add", label: "Follow"}}</code>).
 */
class SLDSButtonStateful extends SLDSTooltipTrigger {

  constructor(props) {
    super(props);
    this.state = {active: false};
  }

  componentDidMount() {
    super.componentDidMount()
  }

  componentWillUnmount() {
    super.componentWillUnmount()
  }

  handleClick() {
    if(this.props.onClick) this.props.onClick();
    this.setState({ active: !this.state.active });
  }

  getClassName() {
    return classNames(this.props.className, "slds-button", {
      ["slds-button--neutral"]: this.props.variant !== "icon",
      ["slds-button--inverse"]: this.props.variant === "inverse",
      ["slds-not-selected"]: !this.state.active,
      ["slds-is-selected"]: this.state.active,
      ["slds-max-small-button--stretch"]: this.props.responsive,
      ["slds-button--icon-border"]: this.props.variant === "icon",
    });
  }

  render() {
    const props = omit(this.props, ["className", "label", "onClick", "type"]);
    if (this.props.disabled) props["disabled"] = "disabled";

    if(this.props.variant === "icon") {
      return (
        <button onMouseLeave={blurElement} className={this.getClassName()} onClick={this.handleClick.bind(this)} {...props} aria-live="polite">
          <ButtonIcon assistiveText={this.state.active ?  this.props.assistiveText + " selected" : this.props.assistiveText} disabled={this.props.disabled} name={this.props.iconName} size={this.props.iconSize}  className="slds-button__icon--stateful"  />
          { this.getTooltip() }
        </button>
      )
    }
    else {
      return (
        <button onMouseLeave={blurElement} className={this.getClassName()} aria-live="assertive" onClick={this.handleClick.bind(this)} {...props}>
          <span className="slds-text-not-selected">
            <ButtonIcon disabled={this.props.disabled} name={this.props.stateOne.iconName} size="small" position="left" className="slds-button__icon--stateful" />
            {this.props.stateOne.label}
          </span>
          <span className="slds-text-selected">
            <ButtonIcon disabled={this.props.disabled} name={this.props.stateTwo.iconName} size="small" position="left" className="slds-button__icon--stateful"  />
            {this.props.stateTwo.label}
          </span>
          <span className="slds-text-selected-focus">
            <ButtonIcon disabled={this.props.disabled} name={this.props.stateThree.iconName} size="small" position="left" className="slds-button__icon--stateful"  />
            {this.props.stateThree.label}
          </span>
          { this.getTooltip() }
        </button>
      )
    }
  }
}

SLDSButtonStateful.displayName = displayName;
SLDSButtonStateful.propTypes = propTypes;
SLDSButtonStateful.defaultProps = defaultProps;

module.exports = SLDSButtonStateful;

