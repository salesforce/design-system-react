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
import ButtonIcon from "../icon/button-icon";
import TooltipTrigger from "../popover-tooltip/trigger"
import omit from "lodash.omit";

const displayName = 'Button';
const propTypes = {
  /**
   * Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means.
   * If the button has an icon and a visible label, you can omit the <code>assistiveText</code> prop and use the <code>label</code> prop.
   */
  assistiveText: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  /**
   * Please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#hint">Lightning Design System Buttons > Hint</a>.
   */
  hint: React.PropTypes.bool,
  /**
   * Name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon names.
   */
  iconName: React.PropTypes.string,

  iconCategory: React.PropTypes.oneOf(["action", "custom", "doctype", "standard", "utility"]).isRequired,
  /**
   * If omitted, icon position is centered.
   */
  iconPosition: React.PropTypes.oneOf(["left", "right"]),
  iconSize: React.PropTypes.oneOf(["x-small", "small", "medium", "large"]),
  /**
   * For icon variants, please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#icon">Lightning Design System Icons</a>.
   */
  iconVariant: React.PropTypes.oneOf(["bare", "container", "border", "border-filled", "small", "more"]),
  /**
   * Visible label on the button. If the button is an icon button with no label, you must use the <code>assistiveText</code> prop.
   */
  label: React.PropTypes.string,
  onClick: React.PropTypes.func,
  /**
   * If true, button scales to 100% width on small form factors.
   */
  responsive: React.PropTypes.bool,
  /**
   * Write <code>"-1"</code> if you don't want the user to tab to the button.
   */
  tabIndex: React.PropTypes.string,
  tooltip: React.PropTypes.node,
  /**
   * Use <code>icon-inverse</code> for white icons.
   */
  variant: React.PropTypes.oneOf(["base", "neutral", "brand", "destructive", "icon", "inverse", "icon-inverse"]),
};
const defaultProps = {
  disabled: false,
  hint: false,
  iconSize: "medium",
  iconCategory: 'utility',
  responsive: false,
  variant: "neutral",
};

/**
 * The Button component is the Lightning Design System Button component. The Button should be used for label buttons, icon buttons, or buttons that have both labels and icons.
 * Either a <code>label</code> or <code>assistiveText</code> is required; see the Prop Details table below.
 * For buttons that maintain selected/unselected states, use the <a href="#/button-stateful">ButtonStateful</a> component.
 */
class Button extends TooltipTrigger {

  constructor(props) {
    super(props);
    this.state = { active: false };
  }

  componentDidMount() {
    super.componentDidMount()
  }

  componentWillUnmount() {
    super.componentWillUnmount()
  }

  handleClick(event) {
    // Note that you can't read properties directly from the Synthetic event but you can read them by calling the specific property (ie. event.target, event.type, etc).
    // http://stackoverflow.com/questions/22123055/react-keyboard-event-handlers-all-null
    if(this.props.onClick) this.props.onClick(event);
    this.setState({ active: !this.state.active });
  }

  getClassName() {
    const iconOnly = this.props.variant === 'icon' ? true : false;
    const base = this.props.variant === 'base' ? true : false;

    return classNames(this.props.className, "slds-button", {
      [`slds-button--${this.props.variant}`]: !base && !iconOnly,
      [`slds-button--icon-${this.props.iconVariant}`]: this.props.iconVariant,
      ["slds-max-small-button--stretch"]: this.props.responsive,
    });
  }

  renderIcon(name){
    if(this.props.iconName){
      let iconSize = this.props.iconSize === '' ? null : this.props.iconSize;
      return (
        <ButtonIcon
          hint={this.props.hint}
          name={name}
          category={this.props.iconCategory}
          position={this.props.iconPosition}
          size={iconSize}
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
    const props = omit(this.props, ["className", "label", "onClick"]);
    if (this.props.disabled) props["disabled"] = "disabled";

    return (
      <button className={this.getClassName()} {...props} onClick={this.handleClick.bind(this)}>
        {this.props.iconPosition === "right" ? this.renderLabel(): null}

        {this.renderIcon(this.props.iconName)}
        {this.renderIconMore()}

        {(this.props.iconPosition !== "right")? this.renderLabel(): null}
        {this.props.children}
        {
          this.getTooltip()
        }
      </button>
    )
  }
}

Button.displayName = displayName;
Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

module.exports = Button;
