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
import {ButtonIcon} from "../SLDSIcons.js";
import omit from "lodash.omit";

const displayName = 'SLDSButton';
const propTypes = {
  disabled: React.PropTypes.bool,
  hint: React.PropTypes.bool,
  iconName: React.PropTypes.string,
  iconPosition: React.PropTypes.oneOf(["left", "right"]),
  iconSize: React.PropTypes.oneOf(["x-small", "small", "medium", "large"]),
  iconVariant: React.PropTypes.oneOf(["bare", "container", "border", "border-filled", "small", "more"]),
  inverse: React.PropTypes.bool,
  label: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
  responsive: React.PropTypes.bool,
  stateful: React.PropTypes.bool,
  tabindex: React.PropTypes.string,
  variant: React.PropTypes.oneOf(["base", "neutral", "brand", "destructive", "icon"]),
};
const defaultProps = {};


class Button extends React.Component {

  constructor(props) {
    super(props);
    this.state = { active: false };
  }

  onClick() {
    this.setState({ active: !this.state.active });
  }

  getClassName() {
    let isSelected = this.props.stateful && this.state.active ? true : false;
    let notSelected = this.props.stateful && !this.state.active ? true : false;
    const iconOnly = this.props.variant === 'icon' ? true : false;
    return classNames(this.props.className, "slds-button", {
      [`slds-button--${this.props.variant}`]: !iconOnly,
      [`slds-button--icon-${this.props.iconVariant}`]: this.props.iconVariant,
      ["slds-max-small-button--stretch"]: this.props.responsive,
      ["slds-not-selected"]: notSelected,
      ["slds-is-selected"]: isSelected,
      ["slds-button--icon-inverse"]: this.props.inverse,
    });
  }

  renderIcon(name){
    if(this.props.iconName || this.props.notSelectedIcon || this.props.selectedIcon || this.props.selectedFocusIcon){
      return (
        <ButtonIcon
          disabled={this.props.disabled}
          hint={this.props.hint}
          inverse={this.props.inverse}
          name={name}
          position={this.props.iconPosition}
          size={this.props.iconSize}
          stateful={this.props.stateful}
          variant={this.props.variant}
          />
      );
    }
  }

  renderIconMore(){
    if(this.props.iconVariant === "more"){
      return(
        <ButtonIcon
          disabled={this.props.disabled}
          inverse={this.props.inverse}
          name="down"
          size="x-small"
          variant={this.props.variant}
          />
      );
    }
  }


  render() {
    const props = omit(this.props, "className");
    const click = createChainedFunction(this.props.onClick, this.onClick.bind(this));
    const labelClasses = this.props.variant === "icon" ? "slds-assistive-text": "";
    if (this.props.disabled) {
      props["disabled"] = "disabled"
    }

    if(this.props.stateful){
      return (
        <button tabIndex={this.props.tabindex} className={this.getClassName()} {...props} onClick={click}>
          <span className="slds-text-not-selected">
            {this.renderIcon(this.props.notSelectedIcon)}
            {this.props.notSelectedLabel}
          </span>
          <span className="slds-text-selected">
            {this.renderIcon(this.props.selectedIcon)}
            {this.props.selectedLabel}
          </span>
          <span className="slds-text-selected-focus">
            {this.renderIcon(this.props.selectedFocusIcon)}
            {this.props.selectedFocusLabel}
          </span>
        </button>
      )
    }else{
      return (
        <button tabIndex={this.props.tabindex} className={this.getClassName()} {...props} onClick={click}>
          {this.props.iconPosition === "right" ? <span className={labelClasses}>{this.props.label}</span>: null}
          {this.renderIcon(this.props.iconName)}
          {this.renderIconMore()}
          {(this.props.iconPosition === "left" || !this.props.iconPosition) ? <span className={labelClasses}>{this.props.label}</span>: null}
          {this.props.children}
        </button>
      );
    }
  }
}

Button.displayName = displayName;
Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

module.exports = Button;
