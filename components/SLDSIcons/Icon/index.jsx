/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React from 'react';
import SLDSUtilityIcon from '../../SLDSUtilityIcon';
const classNames = require("classnames");

const displayName = "Icon";
const propTypes = {
  /**
   * text that is visually hidden but read aloud by screenreaders to tell the user what the icon means.
   * Naked icons must have assistive text, however, if you also have visible descriptive text with the icon,
   * declare this prop as assistiveText="".
   */
  assistiveText: React.PropTypes.string,
  category: React.PropTypes.oneOf(["action", "custom", "doctype", "standard", "utility"]),
  /**
   * css classes that are applied to the svg
   */
  className: React.PropTypes.string,
  /**
   * name of the icon. Visit http://www.lightningdesignsystem.com/resources/icons to reference icon names.
   */
  name: React.PropTypes.string,
  size: React.PropTypes.oneOf(["x-small", "small", "medium", "large"]),
};
const defaultProps = {
  category: 'standard',
};

/**
 * The SLDS Icon component should be used for icons only. For icons that are buttons, use the SLDS Button component. <br />
 * The icon color is white by default. Add the class, "slds-icon-text-default", to create a text-colored fill color for utility icons. <br />
 * For more details, please reference <a href="http://www.lightningdesignsystem.com/components/icons">Lightening Design System - Icons</a>.
 */
class Icon extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  getContainerClassName() {
    const name = this.props.name ? this.props.name.replace(/_/g,'-') : '';
    const renderName = (this.props.category === "action");

    return classNames({
      ["slds-icon__container"]: this.props.category !== "utility",
      [`slds-icon-${this.props.category}-${name}`]: renderName,
    })
  }

  getClassName() {
    const name = this.props.name ? this.props.name.replace(/_/g,'-') : '';
    const customName = this.props.name ? this.props.name.replace("custom", "custom-"): null;

    return classNames(this.props.className, "slds-icon", {
      [`slds-icon--${this.props.size}`]: this.props.size,
      [`slds-icon-${customName}`]: this.props.category === "custom",
      [`slds-icon-${this.props.category}-${name}`]: this.props.category === "standard",
    });
  }

  render() {
    let label = null;
    const styles = this.props.category === "action" ? {padding: "0.5rem"}:null;

    if(this.props.assistiveText) {
      label = <span className="slds-assistive-text">{this.props.assistiveText}</span>;
    }
    return (
      <span className={this.getContainerClassName()} style={styles}>
      {label}
      <SLDSUtilityIcon className={this.getClassName()} name={this.props.name} category={this.props.category} aria-hidden='true' />
      </span>
    )
  }
}

Icon.displayName = displayName;
Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

module.exports = Icon;

