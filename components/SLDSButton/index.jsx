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
import createChainedFunction from "../utils/create-chained-function";
import {ButtonIcon} from "../SLDSIcons";
import omit from "lodash.omit";

const displayName = 'SLDSButton';
const propTypes = {
  /**
   * text that is visually hidden but read aloud by screenreaders to tell the user what the icon means.
   * If the button has an icon and a visible label, you can omit the assistiveText prop and use the label prop.
   */
  assistiveText: React.PropTypes.string,
  buttonSize: React.PropTypes.oneOf(["small"]),
  disabled: React.PropTypes.bool,
  hint: React.PropTypes.bool,
  /**
   * name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System - Icons</a> to reference icon names.
   */
  iconName: React.PropTypes.string,
  iconPosition: React.PropTypes.oneOf(["left", "right"]),
  iconSize: React.PropTypes.oneOf(["x-small", "small", "medium", "large"]),
  /**
   * For icon variants, please reference <a href="https://design-system-dev.herokuapp.com/components/buttons#icon">Lightning Design System - Icons</a>
   */
  iconVariant: React.PropTypes.oneOf(["bare", "container", "border", "border-filled", "small", "more"]),
  label: React.PropTypes.string,
  onClick: React.PropTypes.func,
  responsive: React.PropTypes.bool,
  tabindex: React.PropTypes.string,
  /**
   * use "icon-inverse" for white icons.
   */
  variant: React.PropTypes.oneOf(["base", "neutral", "brand", "destructive", "icon", "inverse", "icon-inverse"]),
};
const defaultProps = {};

/**
 * The SLDSButton component should be used for label buttons, icon buttons, or buttons that have both. <br />
 * Use the SLDSButton component for all variants except for stateful buttons (use the SLDSButtonStateful component). <br />
 * For more details, please reference <a href="http://www.lightningdesignsystem.com/components/buttons">Lightning Design System - Buttons</a>.
 */
class SLDSButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = { active: false };
  }

  onClick() {
    this.setState({ active: !this.state.active });
  }

  getClassName() {
    const iconOnly = this.props.variant === 'icon' ? true : false;
    return classNames(this.props.className, "slds-button", {
      [`slds-button--${this.props.variant}`]: !iconOnly,
      [`slds-button--icon-${this.props.iconVariant}`]: this.props.iconVariant,
      ["slds-max-small-button--stretch"]: this.props.responsive,
      ["slds-button--small"]: this.props.buttonSize,
    });
  }

  renderIcon(name){
    if(this.props.iconName){
      return (
        <ButtonIcon
          hint={this.props.hint}
          name={name}
          position={this.props.iconPosition}
          size={this.props.iconSize}
          />
      );
    }
  }

  renderIconMore(){
    if(this.props.iconVariant === "more"){
      return(
        <ButtonIcon
          name="down"
          size="x-small"
          />
      );
    }
  }

  renderLabel() {
    const iconOnly = this.props.variant === "icon" || this.props.variant === "icon-inverse";
    return iconOnly && this.props.assistiveText ? <span className="slds-assistive-text">{this.props.assistiveText}</span> : <span>{this.props.label}</span>;
  }


  render() {
    const props = omit(this.props, "className");
    const click = createChainedFunction(this.props.onClick, this.onClick.bind(this));

    if (this.props.disabled) {
      props["disabled"] = "disabled"
    }

    return (
      <button tabIndex={this.props.tabindex} className={this.getClassName()} {...props} onClick={click}>
        {this.props.iconPosition === "right" ? this.renderLabel(): null}

        {this.renderIcon(this.props.iconName)}
        {this.renderIconMore()}

        {(this.props.iconPosition !== "right")? this.renderLabel(): null}
        {this.props.children}
      </button>
    )
  }
}

SLDSButton.displayName = displayName;
SLDSButton.propTypes = propTypes;
SLDSButton.defaultProps = defaultProps;

module.exports = SLDSButton;
