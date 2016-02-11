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
import omit from "lodash.omit";

const displayName = 'SLDSContextBar';
const propTypes = {
  // onClick: React.PropTypes.func,
};
const defaultProps = {
  // responsive: false,
};

/**
 * The SLDSContextBar component is the Lightning Design System Context Bar component. The SLDSContextBar is a container with dropdown menus.
 */
class SLDSContextBar extends React.Component {

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

  // handleClick() {
  //   if(this.props.onClick) this.props.onClick();
  //   this.setState({ active: !this.state.active });
  // }

  getClassName() {
    return classNames(this.props.className, "slds2-context-bar", {
      // [`slds-button--${this.props.variant}`]: !base && !iconOnly,
      // [`slds-button--icon-${this.props.iconVariant}`]: this.props.iconVariant,
      // ["slds-max-small-button--stretch"]: this.props.responsive,
    });
  }

  render() {
    const props = omit(this.props, ["className", "label", "onClick"]);

    return (
      <div className={this.getClassName()} {...props}>
        coming soon ... !!!
        {this.props.children}
      </div>
    )
  }
}

SLDSContextBar.displayName = displayName;
SLDSContextBar.propTypes = propTypes;
SLDSContextBar.defaultProps = defaultProps;

module.exports = SLDSContextBar;
